package indi.zhuyst.skyblog.pojo;

import indi.zhuyst.skyblog.entity.ArticleDO;
import indi.zhuyst.skyblog.entity.ClassifyDO;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import org.springframework.beans.BeanUtils;

import java.util.List;

/**
 * 分类DTO，包含该分类下的标题列表
 * @author zhuyst
 */
@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
public class ClassifyDTO extends ClassifyDO {

    private static final long serialVersionUID = -8733947910859840369L;

    /**
     * 该分类下的文章列表
     * 通过{@link ArticleDO#classifyId}获得
     */
    @ApiModelProperty("该分类下的文章列表")
    private List<ArticleDO> articles;

    public ClassifyDTO(ClassifyDO classify){
        BeanUtils.copyProperties(classify,this);
    }
}
