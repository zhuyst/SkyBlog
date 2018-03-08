package indi.zhuyst.security.util;

import indi.zhuyst.skyblog.util.StringUtils;

import javax.servlet.http.HttpServletRequest;

/**
 * IP工具类
 * @author zhuyst
 */
public class IpUtils {

    /**
     * 获取Ip地址
     * @param request 请求
     * @return Ip地址
     */
    public static String getIpAdrress(HttpServletRequest request) {
        final String unknown = "unknown";

        String headerIp = request.getHeader("X-Real-IP");
        String headerFor = request.getHeader("X-Forwarded-For");
        if(StringUtils.isNotEmpty(headerFor) && !unknown.equalsIgnoreCase(headerFor)){

            //多次反向代理后会有多个ip值，第一个ip才是真实ip
            int index = headerFor.indexOf(",");
            if(index != -1){
                return headerFor.substring(0,index);
            }else{
                return headerFor;
            }
        }
        headerFor = headerIp;
        if(StringUtils.isNotEmpty(headerFor) && !unknown.equalsIgnoreCase(headerFor)){
            return headerFor;
        }
        if (StringUtils.isBlank(headerFor) || unknown.equalsIgnoreCase(headerFor)) {
            headerFor = request.getHeader("Proxy-Client-IP");
        }
        if (StringUtils.isBlank(headerFor) || unknown.equalsIgnoreCase(headerFor)) {
            headerFor = request.getHeader("WL-Proxy-Client-IP");
        }
        if (StringUtils.isBlank(headerFor) || unknown.equalsIgnoreCase(headerFor)) {
            headerFor = request.getHeader("HTTP_CLIENT_IP");
        }
        if (StringUtils.isBlank(headerFor) || unknown.equalsIgnoreCase(headerFor)) {
            headerFor = request.getHeader("HTTP_X_FORWARDED_FOR");
        }
        if (StringUtils.isBlank(headerFor) || unknown.equalsIgnoreCase(headerFor)) {
            headerFor = request.getRemoteAddr();
        }
        return headerFor;
    }
}
