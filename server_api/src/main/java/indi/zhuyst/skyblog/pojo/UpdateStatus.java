package indi.zhuyst.skyblog.pojo;

import indi.zhuyst.skyblog.entity.UserDO;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;

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
     * @see UserDO#status
     * @see indi.zhuyst.security.enums.StatusEnum
     */
    @ApiModelProperty("状态ID")
    @NotNull(message = "缺失状态ID")
    private Integer statusId;
}
