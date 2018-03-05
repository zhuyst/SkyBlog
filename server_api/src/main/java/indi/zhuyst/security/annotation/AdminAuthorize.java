package indi.zhuyst.security.annotation;

import org.springframework.security.access.prepost.PreAuthorize;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * Spring Security权限验证
 * 需要系统管理员或管理员权限
 * @author zhuyst
 */
@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
@PreAuthorize("hasAnyRole('SYS_ADMIN','ADMIN')")
public @interface AdminAuthorize {}