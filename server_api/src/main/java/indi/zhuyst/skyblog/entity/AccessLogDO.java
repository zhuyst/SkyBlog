package indi.zhuyst.skyblog.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import indi.zhuyst.common.entity.BaseEntity;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.Date;
import javax.persistence.*;

/**
 * 访问日志
 * @author zhuyst
 */
@EqualsAndHashCode(callSuper = true)
@Table(name = "access_log")
@Data
public class AccessLogDO extends BaseEntity{

    private static final long serialVersionUID = -6902942334575584596L;

    /**
     * 访问IP
     */
    @ApiModelProperty("访问ID")
    private String ip;

    /**
     * 访问用户ID
     */
    @Column(name = "user_id")
    @ApiModelProperty("访问用户ID")
    private Integer userId;

    /**
     * 访问日期
     */
    @Column(name = "access_date")
    @ApiModelProperty("访问日期")
    @OrderBy("DESC")
    @JsonFormat(locale="zh", timezone="GMT+8", pattern="yyyy-MM-dd HH:mm")
    private Date accessDate;
}