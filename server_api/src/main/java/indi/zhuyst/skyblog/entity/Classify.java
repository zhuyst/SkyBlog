package indi.zhuyst.skyblog.entity;

import indi.zhuyst.common.entity.BaseEntity;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

/**
 * 分类
 * @author zhuyst
 */
@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
public class Classify extends BaseEntity {

    private static final long serialVersionUID = 6077264447508816892L;

    /**
     * 文章名
     */
    @ApiModelProperty("分类名")
    private String name;
}