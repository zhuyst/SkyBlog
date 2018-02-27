package indi.zhuyst.skyblog.pojo;

import indi.zhuyst.skyblog.entity.ArticleDO;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.NotBlank;

import java.io.Serializable;

/**
 * 关于 - 该实体存于{@link ArticleDO}中
 * @see indi.zhuyst.skyblog.service.AboutService#ABOUT_KEY
 * @author zhuyst
 */
@Data
@NoArgsConstructor
public class About implements Serializable{

    private static final long serialVersionUID = 5673499178730633138L;

    /**
     * 文章正文
     */
    @ApiModelProperty("文章正文")
    @NotBlank(message = "正文不能为空")
    private String content;

    public About(ArticleDO article){
        this.content = article.getContent();
    }
}
