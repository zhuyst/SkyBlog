package indi.zhuyst.skyblog.pojo;

import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;

/**
 * 更新用户角色，为Spring MVC反射使用
 * @see indi.zhuyst.skyblog.controller.UserController#updateUserRole(Integer, UpdateRole)
 * @author zhuyst
 */
@Data
@NoArgsConstructor
public class UpdateRole {

    /**
     * 角色ID
     * @see indi.zhuyst.skyblog.entity.User#role
     * @see indi.zhuyst.security.enums.RoleEnum
     */
    @ApiModelProperty("角色ID")
    @NotNull(message = "缺失角色ID")
    private Integer roleId;
}
