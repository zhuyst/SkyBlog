package indi.zhuyst.security.config;

import indi.zhuyst.common.enums.CodeEnum;
import indi.zhuyst.common.pojo.R;
import indi.zhuyst.security.filter.TokenFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * Spring Security配置类
 */
@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class WebSecurityConfig extends WebSecurityConfigurerAdapter{

    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private TokenFilter tokenFilter;

    @Autowired
    private PasswordEncoder passwordEncoder;

    /**
     * 配置UserDetailService与PasswordEncoder
     * @param auth 配置
     * @throws Exception 异常
     */
    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userDetailsService)
                .passwordEncoder(passwordEncoder);
        auth.eraseCredentials(false);
    }

    /**
     * 配置不进行拦截的静态资源
     * @param web 配置
     * @throws Exception 异常
     */
    @Override
    public void configure(WebSecurity web) throws Exception {
        // 无视Swagger相关资源
        web.ignoring().antMatchers("/v2/api-docs/**",
                "/swagger-resources/**",
                "/swagger-ui.html",
                "/webjars/**");
    }

    /**
     * 配置安全相关项
     * @param http 配置
     * @throws Exception 异常
     */
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        // Restful API不需要CSRF验证机制
        http.csrf().disable()

                // 设置Header
                .headers()
                // 禁用CacheControl
                    .cacheControl().disable()
                    .and()

                // 使用Token认证，不需要Session
                .sessionManagement()
                    .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                    .and()

                // 处理异常
                .exceptionHandling()
                    .accessDeniedHandler(accessDeniedHandler())
                    .and()

                // 设置TokenFilter作为Token认证
                .addFilterBefore(tokenFilter,UsernamePasswordAuthenticationFilter.class)

                // 设置安全拦截
                .authorizeRequests()
                .antMatchers(HttpMethod.OPTIONS).permitAll()

                // SwaggerUI、公共接口、授权接口放行
                .antMatchers("/api/",
                        "/api/**/public/**",
                        "/auth/**")
                    .permitAll()

                // 其他请求均进行权限拦截
                .anyRequest()
                    .authenticated();
    }

    /**
     * 设置未授权或没有权限时访问的内容
     * @return Handler
     */
    @Bean
    public AccessDeniedHandler accessDeniedHandler(){
        return (request, response, accessDeniedException) -> {
            response.setContentType(MediaType.APPLICATION_JSON_UTF8_VALUE);
            response.getWriter().write(R.error(CodeEnum.FORBIDDEN.getCode(),
                    "未授权或没有权限访问该接口").toJsonStr());
        };
    }
}
