package indi.zhuyst.skyblog.pojo;

import indi.zhuyst.skyblog.entity.ArticleDO;
import indi.zhuyst.skyblog.entity.ClassifyDO;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import org.springframework.beans.BeanUtils;

/**
 * 文章DTO，包含分类对象以及作者对象
 * @author zhuyst
 */
@Data
@NoArgsConstructor
@EqualsAndHashCode(callSuper = false)
public class ArticleDTO extends ArticleDO {

    private static final long serialVersionUID = -1201642195559990379L;

    /**
     * 分类对象
     * @see #classifyId
     */
    @ApiModelProperty("分类对象")
    private ClassifyDO classify;

    /**
     * 作者对象
     * @see #authorId
     */
    @ApiModelProperty("作者对象")
    private UserDTO author;

    public ArticleDTO(ArticleDO article){
        BeanUtils.copyProperties(article,this);
    }
}
