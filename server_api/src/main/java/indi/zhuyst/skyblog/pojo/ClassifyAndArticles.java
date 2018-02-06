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
 * 分类以及分类下的文章列表
 * @author zhuyst
 */
@NoArgsConstructor
@Data
@EqualsAndHashCode(callSuper = false)
public class ClassifyAndArticles extends Classify{

    /**
     * 文章列表
     */
    @ApiModelProperty("文章列表")
    private List<Article> articles;

    public ClassifyAndArticles(Classify classify){
        BeanUtils.copyProperties(classify,this);
    }
}
