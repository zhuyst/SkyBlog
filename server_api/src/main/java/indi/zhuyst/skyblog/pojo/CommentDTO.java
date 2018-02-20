package indi.zhuyst.skyblog.pojo;

import indi.zhuyst.skyblog.entity.Comment;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import org.springframework.beans.BeanUtils;

/**
 * 评论DTO，包含作者对象以及上级评论对象
 * @author zhuyst
 */
@Data
@NoArgsConstructor
@EqualsAndHashCode(callSuper = false)
public class CommentDTO extends Comment{

    private static final long serialVersionUID = -8051478888596801720L;

    /**
     * 作者对象
     * @see #authorId
     */
    @ApiModelProperty("作者对象")
    private UserDTO author;

    /**
     * 上级评论对象
     * @see #previousCommentId
     */
    @ApiModelProperty("上级评论对象")
    private CommentDTO previousComment;

    public CommentDTO(Comment comment){
        BeanUtils.copyProperties(comment,this);
    }
}
