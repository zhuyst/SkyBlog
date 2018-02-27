package indi.zhuyst.skyblog.entity;

import indi.zhuyst.common.entity.BaseEntity;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.Date;
import javax.persistence.*;

/**
 * 系统日志
 * @author zhuyst
 */
@EqualsAndHashCode(callSuper = true)
@Table(name = "sys_log")
@Data
public class SysLogDO extends BaseEntity {

    private static final long serialVersionUID = -7383283970879751197L;

    /**
     * 操作类型
     * @see indi.zhuyst.skyblog.enums.SysLogType
     */
    @ApiModelProperty("操作类型")
    private String type;

    /**
     * 信息
     */
    @ApiModelProperty("信息")
    private String message;

    /**
     * 方法名
     */
    @ApiModelProperty("方法名")
    private String method;

    /**
     * 操作用户ID
     * @see UserDO#id
     */
    @Column(name = "user_id")
    @ApiModelProperty("操作用户ID")
    private Integer userId;

    /**
     * 操作时间
     */
    @Column(name = "create_date")
    @ApiModelProperty("操作时间")
    private Date createDate;

    /**
     * 调用方法参数
     */
    @ApiModelProperty("调用方法参数")
    private String params;
}