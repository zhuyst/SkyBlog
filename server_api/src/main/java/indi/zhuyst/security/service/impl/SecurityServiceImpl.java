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
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.security.access.AccessDeniedException;
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
     * {@link SecurityUser#username}在Claims中的name
     */
    private static final String CLAIM_USERNAME = "username";

    /**
     * {@link SecurityUser#role}在Claims中的name
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

        // 构建JWT
        String token = Jwts.builder()

                // 将User的标识信息放入JWT中
                .setSubject(String.valueOf(user.getId()))
                .claim(CLAIM_USERNAME,user.getUsername())
                .claim(CLAIM_ROLE,user.getRole())

                // 设置过期时间
                .setIssuedAt(nowDate)
                .setExpiration(expireDate)

                // 设置加密方式
                .signWith(SignatureAlgorithm.HS512, secret)
                .compact();

        accessToken.setToken(token);
        accessToken.setExpire(expire);
        accessToken.setUser(user);

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

        // 从JWT中读取信息，构建User
        User user = new User();
        user.setId(Integer.valueOf(claims.getSubject()));
        user.setUsername(claims.get(CLAIM_USERNAME,String.class));
        user.setRole(claims.get(CLAIM_ROLE,Integer.class));

        return new SecurityUser(user);
    }

    @Override
    public boolean isTokenValid(String token) {
        Claims claims = this.getClaimByToken(token);
        return isTokenValid(claims);
    }

    /**
     * 获取JWT的Claims
     * @param token JWT
     * @return Claims
     */
    private Claims getClaimByToken(String token) {
        try {
            Claims claims = Jwts.parser()
                    .setSigningKey(secret)
                    .parseClaimsJws(token)
                    .getBody();

            // 如果Token不可用，抛出异常
            if(this.isTokenValid(claims)){
                throw new AccessDeniedException("token失效，请重新登录");
            }

            return claims;
        }catch (Exception e){

            // Token转换异常，表示不合法，抛出异常
            throw new AccessDeniedException("invalid token");
        }
    }

    /**
     * 通过Claims判断Token是否合法
     * @param claims Claims
     * @return 是否合法
     */
    private boolean isTokenValid(Claims claims){
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
