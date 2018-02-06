package indi.zhuyst.skyblog.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import indi.zhuyst.common.entity.BaseEntity;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.Pattern;

/**
 * 用户
 * @author zhuyst
 */
@NoArgsConstructor
public class User extends BaseEntity {

    /**
     * 用户名
     */
    @ApiModelProperty("用户名")
    @Length(min = 4, max = 10, message = "用户名长度应在{min}与{max}之间")
    @Pattern(regexp = "^[a-zA-Z0-9]*$", message = "用户名应为字母或数字的组合")
    @Getter
    @Setter
    private String username;

    /**
     * 密码
     */
    @ApiModelProperty("密码")
    @Length(min = 6, max = 20, message = "密码长度应在{min}与{max}之间")
    @Pattern(regexp = "^[a-zA-Z0-9]*$", message = "密码应为字母或数字的组合")
    @Setter
    private String password;

    /**
     * 昵称
     */
    @ApiModelProperty("昵称")
    @Length(min = 2,max = 8, message = "昵称长度应在{min}与{max}之间")
    @Getter
    @Setter
    private String nickname;

    /**
     * 角色ID
     * @see indi.zhuyst.security.enums.RoleEnum
     */
    @ApiModelProperty(hidden = true)
    @JsonIgnore
    @Getter
    @Setter
    private Integer role;

    @JsonIgnore
    public String getPassword() {
        return password;
    }
}