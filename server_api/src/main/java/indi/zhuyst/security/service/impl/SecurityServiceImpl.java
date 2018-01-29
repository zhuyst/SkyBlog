package indi.zhuyst.security.service.impl;

import indi.zhuyst.common.service.BaseService;
import indi.zhuyst.security.pojo.AccessToken;
import indi.zhuyst.security.pojo.SecurityUser;
import indi.zhuyst.security.service.SecurityService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
@ConfigurationProperties(prefix = "skyblog.jwt")
public class SecurityServiceImpl extends BaseService implements SecurityService{

    @Autowired
    private UserDetailsService userDetailsService;

    @Getter
    @Setter
    private String secret;

    @Getter
    @Setter
    private String header;

    @Getter
    @Setter
    private Long expire;

    @Override
    public AccessToken generateToken(String username) {
        AccessToken accessToken = new AccessToken();

        Date nowDate = new Date();
        Date expireDate = new Date(nowDate.getTime() + expire * 1000);

        String token = Jwts.builder()
                .setSubject(username)
                .setIssuedAt(nowDate)
                .setExpiration(expireDate)
                .signWith(SignatureAlgorithm.HS512, secret)
                .compact();

        accessToken.setToken(token);
        accessToken.setExpire(expire);

        return accessToken;
    }

    @Override
    public String getUsernameByToken(String token) {
        Claims claims = this.getClaimByToken(token);
        return claims.getSubject();
    }

    @Override
    public SecurityUser getUserByToken(String token) {
        String username = this.getUsernameByToken(token);
        return (SecurityUser) userDetailsService.loadUserByUsername(username);
    }

    @Override
    public Claims getClaimByToken(String token) {
        if(this.isTokenValid(token)){
            throw new AccessDeniedException("token失效，请重新登录");
        }

        try {
            return Jwts.parser()
                    .setSigningKey(secret)
                    .parseClaimsJws(token)
                    .getBody();
        }catch (Exception e){
            throw new AccessDeniedException("invalid token");
        }
    }

    @Override
    public boolean isTokenValid(String token) {
        Claims claims = this.getClaimByToken(token);
        return isTokenExpired(claims.getExpiration());
    }

    private boolean isTokenExpired(Date expiration) {
        return expiration.before(new Date());
    }
}
