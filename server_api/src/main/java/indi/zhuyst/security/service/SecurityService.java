package indi.zhuyst.security.service;

import indi.zhuyst.security.pojo.AccessToken;
import indi.zhuyst.security.pojo.SecurityUser;
import io.jsonwebtoken.Claims;

public interface SecurityService{

    AccessToken generateToken(String username);

    String getUsernameByToken(String token);

    SecurityUser getUserByToken(String token);

    Claims getClaimByToken(String token);

    boolean isTokenValid(String token);

    String getHeader();

    Long getExpire();
}
