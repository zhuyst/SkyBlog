package indi.zhuyst.security.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

/**
 * CORS配置 - 解决跨域问题
 * @author zhuyst
 */
@Configuration
public class CorsConfig extends WebMvcConfigurerAdapter{

    /**
     * 设置CORS Header
     * @param registry CORS配置
     */
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("*")
                .allowedMethods("*")
                .allowedHeaders("*");
    }
}
