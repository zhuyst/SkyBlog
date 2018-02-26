package indi.zhuyst.skyblog.setting;

import indi.zhuyst.skyblog.entity.User;
import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

/**
 * 初始化系统管理员默认配置
 * @author zhuyst
 */
@Data
@Component
@ConfigurationProperties(prefix = "skyblog.admin")
public class DefaultAdminSettings {

    /**
     * 管理员的默认用户名
     * @see User#username
     */
    private String username;

    /**
     * 管理员的默认密码
     * @see User#password
     */
    private String password;

    /**
     * 管理员的默认昵称
     * @see User#nickname
     */
    private String nickname;
}
