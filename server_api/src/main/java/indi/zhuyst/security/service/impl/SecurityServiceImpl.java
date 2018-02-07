package indi.zhuyst.security.service.impl;

import indi.zhuyst.common.service.BaseService;
import indi.zhuyst.security.pojo.AccessToken;
import indi.zhuyst.security.pojo.SecurityUser;
import indi.zhuyst.security.service.SecurityService;
import indi.zhuyst.skyblog.entity.User;
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

/**
 * SecurityService实现类
 * @author zhuyst
 */
@Service
@ConfigurationProperties(prefix = "skyblog.jwt")
public class SecurityServiceImpl extends BaseService implements SecurityService{

    /**
     * username在Claims中的name
     */
    private static final String CLAIM_USERNAME = "username";

    /**
     * role在Claims中的name
     */
    private static final String CLAIM_ROLE = "role";

    /**
     * 密钥
     */
    @Getter
    @Setter
    private String secret;

    /**
     * Token在Header中的Name
     */
    @Getter
    @Setter
    private String header;

    /**
     * Token过期时间
     */
    @Getter
    @Setter
    private Long expire;

    @Override
    public AccessToken generateToken(SecurityUser user) {
        AccessToken accessToken = new AccessToken();

        Date nowDate = new Date();
        Date expireDate = new Date(nowDate.getTime() + expire * 1000);

        String token = Jwts.builder()
                .setSubject(String.valueOf(user.getId()))
                .claim(CLAIM_USERNAME,user.getUsername())
                .claim(CLAIM_ROLE,user.getRole())
                .setIssuedAt(nowDate)
                .setExpiration(expireDate)
                .signWith(SignatureAlgorithm.HS512, secret)
                .compact();

        accessToken.setToken(token);
        accessToken.setExpire(expire);

        return accessToken;
    }

    @Override
    public Integer getIDByToken(String token) {
        Claims claims = this.getClaimByToken(token);
        return Integer.valueOf(claims.getSubject());
    }

    @Override
    public SecurityUser getUserByToken(String token) {
        Claims claims = this.getClaimByToken(token);

        User user = new User();
        user.setId(Integer.valueOf(claims.getSubject()));
        user.setUsername(claims.get(CLAIM_USERNAME,String.class));
        user.setRole(claims.get(CLAIM_ROLE,Integer.class));

        return new SecurityUser(user);
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

    /**
     * 判断Token是否过期
     * @param expiration 过期时间
     * @return 是否过期
     */
    private boolean isTokenExpired(Date expiration) {
        return expiration.before(new Date());
    }
}
