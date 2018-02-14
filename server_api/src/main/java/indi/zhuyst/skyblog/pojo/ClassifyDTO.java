package indi.zhuyst.skyblog.pojo;

import indi.zhuyst.skyblog.entity.Article;
import indi.zhuyst.skyblog.entity.Classify;
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
public class ClassifyDTO extends Classify{

    private static final long serialVersionUID = -8733947910859840369L;

    /**
     * 该分类下的文章列表
     * 通过{@link indi.zhuyst.skyblog.entity.Article#classifyId}获得
     */
    @ApiModelProperty("该分类下的文章列表")
    private List<Article> articles;

    public ClassifyDTO(Classify classify){
        BeanUtils.copyProperties(classify,this);
    }
}