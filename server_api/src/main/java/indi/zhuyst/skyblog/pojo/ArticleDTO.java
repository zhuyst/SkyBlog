package indi.zhuyst.skyblog.pojo;

import indi.zhuyst.skyblog.entity.Article;
import indi.zhuyst.skyblog.entity.Classify;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import org.springframework.beans.BeanUtils;

@Data
@NoArgsConstructor
@EqualsAndHashCode(callSuper = false)
public class ArticleDTO extends Article{
    private Classify classify;

    private UserDTO author;

    public ArticleDTO(Article article){
        BeanUtils.copyProperties(article,this);
    }
}
