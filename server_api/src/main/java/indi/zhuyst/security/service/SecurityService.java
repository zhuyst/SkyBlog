package indi.zhuyst.security.service;

import indi.zhuyst.security.pojo.AccessToken;
import indi.zhuyst.security.pojo.SecurityUser;
import io.jsonwebtoken.Claims;

public interface SecurityService{

    AccessToken generateToken(SecurityUser user);

    Integer getIDByToken(String token);

    SecurityUser getUserByToken(String token);

    Claims getClaimByToken(String token);

    boolean isTokenValid(String token);

    String getHeader();

    Long getExpire();
}
