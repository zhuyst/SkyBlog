package indi.zhuyst.common.config;

import indi.zhuyst.security.service.SecurityService;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.context.request.async.DeferredResult;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.ParameterBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.schema.ModelRef;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.service.ApiKey;
import springfox.documentation.service.Contact;
import springfox.documentation.service.Parameter;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

import java.util.Collections;
import java.util.List;

/**
 * Swagger - API文档配置类
 * @author zhuyst
 */
@Configuration
@EnableSwagger2
public class SwaggerConfig extends WebMvcConfigurerAdapter {

    private final SecurityService securityService;

    @Autowired
    public SwaggerConfig(SecurityService securityService) {
        this.securityService = securityService;
    }

    /**
     * 将路径/映射到SwaggerUI主界面
     * @param registry 映射记录
     */
    @Override
    public void addViewControllers(ViewControllerRegistry registry) {
        registry.addRedirectViewController("/","/swagger-ui.html");
    }

    /**
     * Bean注册：配置Swagger扫描参数
     * 扫描注解了{@link ApiOperation}的接口
     * @return Docket
     */
    @Bean
    public Docket api(){
        return new Docket(DocumentationType.SWAGGER_2)

                // 配置公共请求参数以及授权方式
                .securitySchemes(apiKey())
                .globalOperationParameters(headerToken())

                // Restful API均生成JSON字符串
                .produces(Collections.singleton("application/json;charset=UTF-8"))

                .genericModelSubstitutes(DeferredResult.class)
                .useDefaultResponseMessages(false)
                .forCodeGeneration(true)
                .pathMapping("/")
                .apiInfo(apiInfo())
                .select()

                // 扫描有ApiOperation注解的接口
                .apis(RequestHandlerSelectors.withMethodAnnotation(ApiOperation.class))
                .paths(PathSelectors.any())
                .build();
    }

    /**
     * API基本信息
     * @return ApiInfo
     */
    private ApiInfo apiInfo(){
        String name = "zhuyst";
        String url = "http://zhuyst.github.io/";
        String email = "13553371651@139.com";

        Contact contact = new Contact(name,url,email);

        return new ApiInfoBuilder().title("SkyBlog")
                .description("SkyBlog接口一览")
                .contact(contact)
                .termsOfServiceUrl("")
                .version("1.0").build();
    }

    /**
     * 加入授权Header - Token
     * @see indi.zhuyst.security.filter.TokenFilter
     * @return 授权Key
     */
    private List<ApiKey> apiKey(){
        ApiKey apiKey = new ApiKey(securityService.getHeader(),
                securityService.getHeader(),"header");
        return Collections.singletonList(apiKey);
    }

    /**
     * 所有的接口加入公共请求参数 - Token
     * @see indi.zhuyst.security.filter.TokenFilter
     * @return 公共请求参数列表
     */
    private List<Parameter> headerToken(){
        ParameterBuilder tokenPar = new ParameterBuilder();

        tokenPar.name(securityService.getHeader())
                .description(securityService.getHeader())
                .modelRef(new ModelRef("string"))
                .parameterType("header")
                .required(false)
                .build();

        return Collections.singletonList(tokenPar.build());
    }
}
