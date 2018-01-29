package indi.zhuyst.security.util;

import indi.zhuyst.security.pojo.SecurityUser;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

public class SecurityUtil {

    public static Authentication getAuthentication(){
        return SecurityContextHolder.getContext().getAuthentication();
    }

    public static boolean isLogin(){
        return getAuthentication() != null &&
                getAuthentication().isAuthenticated() &&
                !(getAuthentication() instanceof AnonymousAuthenticationToken);
    }

    public static SecurityUser getUser(){
        return (SecurityUser) getAuthentication().getPrincipal();
    }
}
