package indi.zhuyst.skyblog.entity;

import indi.zhuyst.common.entity.BaseEntity;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.NotBlank;

import javax.persistence.Table;

/**
 * 分类
 * @author zhuyst
 */
@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
@Table(name = "classify")
public class ClassifyDO extends BaseEntity {

    private static final long serialVersionUID = 6077264447508816892L;

    /**
     * 文章名
     */
    @ApiModelProperty("分类名")
    @NotBlank(message = "分类名不能为空")
    private String name;
}