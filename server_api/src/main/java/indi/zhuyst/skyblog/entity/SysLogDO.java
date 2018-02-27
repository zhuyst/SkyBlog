package indi.zhuyst.skyblog.entity;

import indi.zhuyst.common.entity.BaseEntity;
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

    private String type;

    private String message;

    private String method;

    @Column(name = "user_id")
    private Integer userId;

    @Column(name = "create_date")
    private Date createDate;

    private String params;
}