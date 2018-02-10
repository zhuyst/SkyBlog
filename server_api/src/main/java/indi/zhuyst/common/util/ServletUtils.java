package indi.zhuyst.common.util;

import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpServletRequest;

/**
 * Servlet相关工具类
 */
public class ServletUtils {

    /**
     * 获取当前线程的HttpServletRequest
     * @return 当前线程的HttpServletRequest
     */
    public static HttpServletRequest getRequest(){
        return ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();
    }
}
