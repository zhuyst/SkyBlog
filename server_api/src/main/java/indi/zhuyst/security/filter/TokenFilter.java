package indi.zhuyst.security.filter;

import indi.zhuyst.security.pojo.SecurityUser;
import indi.zhuyst.security.service.SecurityService;
import indi.zhuyst.security.util.SecurityUtil;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetails;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * Token认证核心，通过获取请求中的Token来判断用户
 * @author zhuyst
 */
@Component
public class TokenFilter extends OncePerRequestFilter{

    @Autowired
    private SecurityService securityService;

    /**
     * 通过获取请求中的Token来设置Spring Security的Authentication
     * @param request 当前request，用于获取Token
     * @param response 当前response
     * @param chain chain
     * @throws ServletException Servlet异常
     * @throws IOException IO异常
     */
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain) throws ServletException, IOException {

        // 有时请求会错误发送null与undefined
        final String nullStr = "null";
        final String undefinedStr = "undefined";

        String token = getRequestToken(request);

        // 如果token不存在，则直接放行，由之后的Filter拦截
        if(StringUtils.isBlank(token) ||
                nullStr.equals(token) ||
                undefinedStr.equals(token)) {
            chain.doFilter(request,response);
            return;
        }

        // 从Token中读取User，设置Authentication
        SecurityUser user = securityService.getUserByToken(token);
        if(user != null && SecurityUtil.getAuthentication() == null){
            UsernamePasswordAuthenticationToken authenticationToken =
                    new UsernamePasswordAuthenticationToken(user,null,user.getAuthorities());
            authenticationToken.setDetails(new WebAuthenticationDetails(request));
            SecurityContextHolder.getContext().setAuthentication(authenticationToken);
        }

        chain.doFilter(request,response);
    }

    /**
     * 获取请求的token
     */
    private String getRequestToken(HttpServletRequest httpRequest){
        // 从header中获取token
        String token = httpRequest.getHeader(securityService.getHeader());

        // 如果header中不存在token，则从参数中获取token
        if(StringUtils.isBlank(token)){
            token = httpRequest.getParameter(securityService.getHeader());
        }

        return token;
    }

}
