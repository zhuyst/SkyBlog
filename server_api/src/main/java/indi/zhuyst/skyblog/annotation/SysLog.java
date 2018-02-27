package indi.zhuyst.skyblog.annotation;

import indi.zhuyst.skyblog.enums.SysLogType;
import org.springframework.core.annotation.AliasFor;

import java.lang.annotation.*;

/**
 * 系统日志注解
 * @see indi.zhuyst.skyblog.aspect.SysLogAspect
 * @author zhuyst
 */
@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
@Documented
public @interface SysLog {

    SysLogType type() default SysLogType.UNDEFINED;

    @AliasFor("message")
    String value() default "";

    @AliasFor("value")
    String message() default "";
}
