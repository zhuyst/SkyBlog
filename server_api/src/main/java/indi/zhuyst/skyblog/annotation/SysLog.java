package indi.zhuyst.skyblog.annotation;

import indi.zhuyst.skyblog.enums.SysLogTypeEnum;

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

    /**
     * 操作类型
     * @see indi.zhuyst.skyblog.entity.SysLogDO#type
     */
    SysLogTypeEnum type() default SysLogTypeEnum.UNDEFINED;

    /**
     * 资源
     * @see indi.zhuyst.skyblog.entity.SysLogDO#resource
     */
    String resource() default "";
}
