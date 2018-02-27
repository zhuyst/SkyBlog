package indi.zhuyst.common.annotation;

import indi.zhuyst.common.enums.SysLogType;
import org.springframework.core.annotation.AliasFor;

import java.lang.annotation.*;

/**
 * 系统日志注解
 * @see indi.zhuyst.common.aspect.SysLogAspect
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
