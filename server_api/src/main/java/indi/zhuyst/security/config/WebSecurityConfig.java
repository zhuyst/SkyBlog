package indi.zhuyst.security.config;

import indi.zhuyst.common.pojo.R;
import indi.zhuyst.security.filter.TokenFilter;
import indi.zhuyst.security.pojo.AccessToken;
import indi.zhuyst.security.pojo.SecurityUser;
import indi.zhuyst.security.service.SecurityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.MediaType;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

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
    private SecurityService securityService;

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

                // 设置TokenFilter作为Token认证
                .addFilterBefore(tokenFilter,UsernamePasswordAuthenticationFilter.class)
                
                // 配置CORS
                .cors()
                    .configurationSource(corsConfigurationSource())
                    .and()

                // 设置安全拦截
                .authorizeRequests()
                // SwaggerUI、公共接口、授权接口放行
                .antMatchers("/api/",
                        "/api/**/public/**",
                        "/auth/**")
                    .permitAll()

                // 其他请求均进行权限拦截
                .anyRequest()
                    .authenticated()
                    .and()

                // 配置表单登陆路径
                .formLogin()
                    .loginPage("/auth/login")
                    .successHandler(loginSuccessHandlerBean())
                    .failureHandler(loginFailureHandlerBean())
                    .permitAll();
    }

    /**
     * Restful API，配置CORS解决跨域问题
     * @return CORS配置
     */
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();

        configuration.addAllowedOrigin("*");
        configuration.addAllowedMethod("*");

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);

        return source;
    }

    /**
     * 登陆验证成功时返回的内容 - 返回{@link AccessToken}
     * @return 登陆验证成功Handler
     */
    @Bean
    public AuthenticationSuccessHandler loginSuccessHandlerBean(){
        return (request, response, authentication) -> {
            response.setContentType(MediaType.APPLICATION_JSON_UTF8_VALUE);

            SecurityUser user = (SecurityUser) authentication.getPrincipal();
            AccessToken token = securityService.generateToken(user);
            token.setUser(user);

            response.getWriter().write(R.ok(token).toJsonStr());
        };
    }

    /**
     * 登陆验证失败时返回的内容
     * @return 登陆验证失败Handler
     */
    @Bean
    public AuthenticationFailureHandler loginFailureHandlerBean(){
        return (request, response, authentication) -> {
            response.setContentType(MediaType.APPLICATION_JSON_UTF8_VALUE);
            response.getWriter().write(R.error("用户名/密码不正确").toJsonStr());
        };
    }
}
