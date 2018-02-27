package indi.zhuyst.skyblog.aspect;

import com.fasterxml.jackson.core.JsonProcessingException;
import indi.zhuyst.common.exception.CommonException;
import indi.zhuyst.common.util.JsonUtils;
import indi.zhuyst.security.pojo.SecurityUser;
import indi.zhuyst.security.util.SecurityUtils;
import indi.zhuyst.skyblog.annotation.SysLog;
import indi.zhuyst.skyblog.entity.SysLogDO;
import indi.zhuyst.skyblog.service.SysLogService;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.aspectj.lang.reflect.MethodSignature;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import java.lang.reflect.Method;
import java.util.Date;

/**
 * 对{@link SysLog}进行的切面
 * @author zhuyst
 */
@Aspect
@Component
@Order(-100)
public class SysLogAspect {

    @Autowired
    private SysLogService sysLogService;

    @Pointcut("@annotation(indi.zhuyst.skyblog.annotation.SysLog)")
    public void pointCut() {}

    @Around("pointCut()")
    public Object doAround(ProceedingJoinPoint point) throws Throwable {
        Object result = point.proceed();
        this.saveLog(point);
        return result;
    }

    /**
     * 保存系统日志
     * @param point 切面
     */
    private void saveLog(ProceedingJoinPoint point) throws JsonProcessingException {
        SysLogDO log = new SysLogDO();

        MethodSignature signature = (MethodSignature) point.getSignature();
        Method method = signature.getMethod();

        // 设置操作类型以及信息
        SysLog annotation = method.getAnnotation(SysLog.class);
        log.setType(annotation.type().getName());
        log.setResource(annotation.resource());

        // 设置方法名
        String className = point.getTarget().getClass().getName();
        String methodName = signature.getName();
        log.setMethod(className + "." + methodName + "()");

        // 设置方法参数
        Object[] args = point.getArgs();
        log.setParams(JsonUtils.toJsonString(args));

        // 设置操作用户ID
        SecurityUser user = SecurityUtils.getUser();
        log.setUserId(user.getId());

        // 设置操作时间
        log.setCreateDate(new Date());

        log = sysLogService.save(log);
        if(log == null){
            throw new CommonException("系统日志保存失败");
        }
    }

}
