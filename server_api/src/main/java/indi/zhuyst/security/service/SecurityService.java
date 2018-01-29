package indi.zhuyst.security.service;

import indi.zhuyst.security.pojo.AccessToken;
import indi.zhuyst.security.pojo.SecurityUser;
import io.jsonwebtoken.Claims;

import java.util.Date;

public interface SecurityService{

    AccessToken generateToken(String username);

    String getUsernameByToken(String token);

    SecurityUser getUserByToken(String token);

    Claims getClaimByToken(String token);

    boolean isTokenExpired(Date expiration);

    String getHeader();

    Long getExpire();
}
