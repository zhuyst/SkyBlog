package indi.zhuyst.security.pojo;

import com.fasterxml.jackson.annotation.JsonIgnore;
import indi.zhuyst.skyblog.entity.User;
import indi.zhuyst.skyblog.pojo.UserDTO;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.ToString;
import org.springframework.security.core.CredentialsContainer;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.List;

/**
 * 用户权限对象
 * @author zhuyst
 */
@ToString
public class SecurityUser extends UserDTO implements UserDetails, CredentialsContainer {

    private static final long serialVersionUID = -5625371204361074651L;

    /**
     * 角色前缀
     */
    @ApiModelProperty(hidden = true)
    private static final String PREFIX = "ROLE_";

    /**
     * 权限集合
     */
    @JsonIgnore
    @Getter
    @ApiModelProperty(hidden = true)
    private List<GrantedAuthority> authorities = new ArrayList<>();

    public SecurityUser(User user){
        super(user);

        SimpleGrantedAuthority authority = new SimpleGrantedAuthority(PREFIX +
                this.getRoleEnum().getName());
        authorities.add(authority);
    }

    @Override
    @JsonIgnore
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    @JsonIgnore
    public boolean isAccountNonLocked() {
        return getLocked();
    }

    @Override
    @JsonIgnore
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    @JsonIgnore
    public boolean isEnabled() {
        return true;
    }

    @Override
    public void eraseCredentials() {
        this.setPassword(null);
    }
}
