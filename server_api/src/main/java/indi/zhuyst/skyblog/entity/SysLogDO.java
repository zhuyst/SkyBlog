package indi.zhuyst.skyblog.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import indi.zhuyst.common.entity.BaseEntity;
import indi.zhuyst.skyblog.enums.SysLogTypeEnum;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.Column;
import javax.persistence.OrderBy;
import javax.persistence.Table;
import java.util.Date;

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
     * @see SysLogTypeEnum
     */
    @ApiModelProperty("操作类型")
    private String type;

    /**
     * 资源
     */
    @ApiModelProperty("资源")
    private String resource;

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
    @OrderBy("DESC")
    @JsonFormat(locale="zh", timezone="GMT+8", pattern="yyyy-MM-dd HH:mm")
    @ApiModelProperty("操作时间")
    private Date createDate;

    /**
     * 调用方法参数
     */
    @ApiModelProperty("调用方法参数")
    private String params;
}