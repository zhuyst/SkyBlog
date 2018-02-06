package indi.zhuyst.skyblog.pojo;

import com.fasterxml.jackson.annotation.JsonIgnore;
import indi.zhuyst.security.enums.RoleEnum;
import indi.zhuyst.skyblog.entity.User;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.BeanUtils;

/**
 * 用户DTO，包含角色枚举类
 * @author zhuyst
 */
public class UserDTO extends User {

    /**
     * 角色枚举类，通过{@link #role}获取
     */
    @Getter
    @Setter
    @JsonIgnore
    @ApiModelProperty("角色枚举类")
    private RoleEnum roleEnum;

    /**
     * 是否为管理员
     */
    @ApiModelProperty("是否为管理员")
    @Getter
    private Boolean admin;

    public UserDTO(User user){
        BeanUtils.copyProperties(user,this);
        roleEnum = RoleEnum.getById(user.getRole());
        admin = roleEnum.checkAdmin();
    }

    public Boolean isAdmin(){
        return admin;
    }
}
