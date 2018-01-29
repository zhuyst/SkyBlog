package indi.zhuyst.skyblog.pojo;

import indi.zhuyst.skyblog.entity.Classify;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import org.springframework.beans.BeanUtils;

import java.util.List;

@NoArgsConstructor
@Data
@EqualsAndHashCode(callSuper = false)
public class ClassifyAndArticlesTitle extends Classify{
    private List<String> titles;

    public ClassifyAndArticlesTitle(Classify classify){
        BeanUtils.copyProperties(classify,this);
    }
}
