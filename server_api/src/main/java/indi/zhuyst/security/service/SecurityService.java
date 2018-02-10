package indi.zhuyst.security.service;

import indi.zhuyst.security.pojo.AccessToken;
import indi.zhuyst.security.pojo.SecurityUser;

/**
 * Spring Security相关服务接口
 * @author zhuyst
 */
public interface SecurityService{

    /**
     * 使用User生成JWT
     * @param user 要生成Token的用户
     * @return
     */
    AccessToken generateToken(SecurityUser user);

    /**
     * 从Token中获取授权用户ID
     * @param token JWT
     * @return 授权用户ID
     */
    Integer getIDByToken(String token);

    /**
     * 从Token中获取授权用户
     * @param token JWT
     * @return 授权用户
     */
    SecurityUser getUserByToken(String token);

    /**
     * 判断Token是否可用/合法
     * @param token 要判断的Token
     * @return 是否可用/合法
     */
    boolean isTokenValid(String token);

    /**
     * 获取Token在Header中的Name
     * @return Token在Header中的Name
     */
    String getHeader();

    /**
     * 获取Token过期时间
     * @return Token过期时间
     */
    Long getExpire();
}
