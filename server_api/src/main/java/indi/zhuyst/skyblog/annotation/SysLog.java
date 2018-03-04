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
     * @see indi.zhuyst.skyblog.entity.SysLogDO#type
     * @return 操作类型
     */
    SysLogTypeEnum type() default SysLogTypeEnum.UNDEFINED;

    /**
     * @see indi.zhuyst.skyblog.entity.SysLogDO#resource
     * @return 资源
     */
    String resource() default "";
}
