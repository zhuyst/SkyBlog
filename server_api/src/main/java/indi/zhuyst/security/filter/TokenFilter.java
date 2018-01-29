package indi.zhuyst.security.filter;

import indi.zhuyst.security.pojo.SecurityUser;
import indi.zhuyst.security.service.SecurityService;
import indi.zhuyst.security.util.SecurityUtil;
import io.jsonwebtoken.Claims;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetails;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
public class TokenFilter extends OncePerRequestFilter{

    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private SecurityService securityService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain) throws ServletException, IOException {
        String token = getRequestToken(request);
        if(StringUtils.isBlank(token) || token.equals("null")) {
            chain.doFilter(request,response);
            return;
        }

        Claims claims = securityService.getClaimByToken(token);
        if(securityService.isTokenExpired(claims.getExpiration())) {
            throw new AccessDeniedException("token失效，请重新登录");
        }

        String username = securityService.getUsernameByToken(token);
        SecurityUser user = (SecurityUser) userDetailsService.loadUserByUsername(username);

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
        //从header中获取token
        String token = httpRequest.getHeader(securityService.getHeader());

        //如果header中不存在token，则从参数中获取token
        if(StringUtils.isBlank(token)){
            token = httpRequest.getParameter(securityService.getHeader());
        }

        return token;
    }

}
