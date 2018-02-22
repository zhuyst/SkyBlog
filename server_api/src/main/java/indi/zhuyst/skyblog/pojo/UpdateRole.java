package indi.zhuyst.skyblog.pojo;

import lombok.Data;
import lombok.NoArgsConstructor;

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
    private Integer roleId;
}
