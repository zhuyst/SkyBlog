package indi.zhuyst.common.entity;

import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import javax.persistence.Id;
import java.io.Serializable;

/**
 * 基础实体类，包含表共有字段
 * @author zhuyst
 */
@Data
public abstract class BaseEntity implements Serializable{

    private static final long serialVersionUID = 9155075099270404125L;

    /**
     * 唯一标识ID
     */
    @Id
    @ApiModelProperty("唯一标识ID")
    protected Integer id;
}
