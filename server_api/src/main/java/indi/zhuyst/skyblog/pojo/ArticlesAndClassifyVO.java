package indi.zhuyst.skyblog.pojo;

import com.github.pagehelper.PageInfo;
import indi.zhuyst.skyblog.entity.Classify;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

/**
 * 包含了Article的分页信息以及分类信息的VO
 * @author zhuyst
 */
@Data
@NoArgsConstructor
public class ArticlesAndClassifyVO implements Serializable{

    private static final long serialVersionUID = 1361576107638548813L;

    /**
     * 文章的分页信息
     */
    @ApiModelProperty("文章的分页信息")
    private PageInfo<ArticleDTO> articles;

    /**
     * 分类实体
     */
    @ApiModelProperty("分类实体")
    private Classify classify;
}
