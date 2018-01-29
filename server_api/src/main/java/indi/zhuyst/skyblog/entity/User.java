package indi.zhuyst.skyblog.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import indi.zhuyst.common.entity.BaseEntity;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.Pattern;

@NoArgsConstructor
public class User extends BaseEntity {

    @Length(min = 4, max = 10, message = "用户名长度应在{min}与{max}之间")
    @Pattern(regexp = "^[a-zA-Z0-9]*$", message = "用户名应为字母或数字的组合")
    @Getter
    @Setter
    private String username;

    @Length(min = 6, max = 20, message = "密码长度应在{min}与{max}之间")
    @Pattern(regexp = "^[a-zA-Z0-9]*$", message = "密码应为字母或数字的组合")
    @Setter
    private String password;

    @Length(min = 2,max = 8, message = "昵称长度应在{min}与{max}之间")
    @Getter
    @Setter
    private String nickname;

    @JsonIgnore
    @Getter
    @Setter
    private Integer role;

    @JsonIgnore
    public String getPassword() {
        return password;
    }
}