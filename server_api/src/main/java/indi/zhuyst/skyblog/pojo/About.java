package indi.zhuyst.skyblog.pojo;

import indi.zhuyst.skyblog.entity.Article;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@NoArgsConstructor
public class About implements Serializable{

    private static final long serialVersionUID = 5673499178730633138L;

    /**
     * 文章正文
     */
    @ApiModelProperty("文章正文")
    private String content;

    public About(Article article){
        this.content = article.getContent();
    }
}
