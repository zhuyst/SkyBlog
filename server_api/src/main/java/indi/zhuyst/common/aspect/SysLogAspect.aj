package indi.zhuyst.common.aspect;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.springframework.stereotype.Component;

/**
 * 对{@link indi.zhuyst.common.annotation.SysLog}进行的切面
 * @author zhuyst
 */
@Aspect
@Component
public class SysLogAspect {

    @Pointcut("@annotation(indi.zhuyst.common.annotation.SysLog)")
    public void pointCut() {}

    @Around("pointCut()")
    public Object doAround(ProceedingJoinPoint point) throws Throwable {
        return point.proceed();
    }

}
