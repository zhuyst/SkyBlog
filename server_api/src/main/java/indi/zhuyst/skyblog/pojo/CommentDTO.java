package indi.zhuyst.skyblog.pojo;

import indi.zhuyst.skyblog.entity.Comment;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import org.springframework.beans.BeanUtils;

@Data
@NoArgsConstructor
@EqualsAndHashCode(callSuper = false)
public class CommentDTO extends Comment{
    private UserDTO author;

    private Comment previousComment;

    public CommentDTO(Comment comment){
        BeanUtils.copyProperties(comment,this);
    }
}
