package indi.zhuyst.skyblog.pojo;

import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * 更新用户状态，为Spring MVC反射使用
 * @see indi.zhuyst.skyblog.controller.UserController#updateUserStatus(Integer, UpdateStatus)
 * @author zhuyst
 */
@Data
@NoArgsConstructor
public class UpdateStatus {

    /**
     * 状态ID
     * @see indi.zhuyst.skyblog.entity.User#status
     * @see indi.zhuyst.security.enums.StatusEnum
     */
    private Integer statusId;
}
