package indi.zhuyst.skyblog.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import indi.zhuyst.common.entity.BaseEntity;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.Length;

import javax.persistence.Column;
import javax.persistence.OrderBy;
import javax.persistence.Table;
import javax.validation.constraints.Pattern;
import java.util.Date;

/**
 * 用户
 * @author zhuyst
 */
@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
@Table(name = "user")
public class UserDO extends BaseEntity {

    private static final long serialVersionUID = 955034318028237994L;

    /**
     * 用户名
     */
    @ApiModelProperty("用户名")
    @Length(min = 4, max = 10, message = "用户名长度应在{min}与{max}之间")
    @Pattern(regexp = "^[a-zA-Z0-9]*$", message = "用户名应为字母或数字的组合")
    private String username;

    /**
     * 密码
     */
    @ApiModelProperty("密码")
    @Length(min = 6, max = 20, message = "密码长度应在{min}与{max}之间")
    @Pattern(regexp = "^[a-zA-Z0-9]*$", message = "密码应为字母或数字的组合")
    private String password;

    /**
     * 昵称
     */
    @ApiModelProperty("昵称")
    @Length(min = 2,max = 8, message = "昵称长度应在{min}与{max}之间")
    private String nickname;

    /**
     * 角色ID
     * @see indi.zhuyst.security.enums.RoleEnum
     */
    @ApiModelProperty("角色ID")
    @OrderBy
    private Integer role;

    /**
     * 状态ID
     * @see indi.zhuyst.security.enums.StatusEnum
     */
    @ApiModelProperty("状态ID")
    private Integer status;

    /**
     * 创建时间
     */
    @ApiModelProperty("创建时间")
    @Column(name = "create_date")
    @JsonFormat(locale="zh", timezone="GMT+8", pattern="yyyy-MM-dd HH:mm")
    private Date createDate;
}