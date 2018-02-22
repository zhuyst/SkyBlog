package indi.zhuyst.skyblog.pojo;

import com.fasterxml.jackson.annotation.JsonIgnore;
import indi.zhuyst.security.enums.RoleEnum;
import indi.zhuyst.security.enums.StatusEnum;
import indi.zhuyst.skyblog.entity.User;
import io.swagger.annotations.ApiModelProperty;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.springframework.beans.BeanUtils;

/**
 * 用户DTO，包含角色枚举类
 * @author zhuyst
 */
@ToString
@EqualsAndHashCode(callSuper = false)
@NoArgsConstructor
public class UserDTO extends User {

    private static final long serialVersionUID = -733620414805243891L;

    /**
     * 角色枚举类，通过{@link #role}获取
     */
    @Getter
    @JsonIgnore
    private RoleEnum roleEnum;

    /**
     * 状态枚举类，通过{@link #status}获取
     */
    @Getter
    @JsonIgnore
    private StatusEnum statusEnum;

    /**
     * 是否为管理员
     * @see RoleEnum#isAdmin()
     */
    @ApiModelProperty("是否为管理员")
    @Getter
    private Boolean admin;

    /**
     * 账户是否被锁定
     * @see StatusEnum#isLocked()
     */
    @ApiModelProperty("账户是否被锁定")
    @Getter
    private Boolean locked;

    public UserDTO(User user){
        BeanUtils.copyProperties(user,this);

        // 设置RoleEnum
        roleEnum = RoleEnum.getById(user.getRole());
        admin = roleEnum.isAdmin();

        // 设置StatusEnum
        statusEnum = StatusEnum.getById(user.getStatus());
        locked = statusEnum.isLocked();
    }

    @Override
    public void setRole(Integer role) {
        super.setRole(role);
        roleEnum = RoleEnum.getById(role);
        admin = roleEnum.isAdmin();
    }

    @Override
    public void setStatus(Integer status) {
        super.setStatus(status);
        statusEnum = StatusEnum.getById(status);
        locked = statusEnum.isLocked();
    }
}
