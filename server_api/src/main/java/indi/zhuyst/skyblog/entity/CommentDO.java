package indi.zhuyst.skyblog.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import indi.zhuyst.common.entity.BaseEntity;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.NotBlank;

import javax.persistence.Column;
import javax.persistence.OrderBy;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import java.util.Date;

/**
 * 评论
 * @author zhuyst
 */
@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
@Table(name = "comment")
public class CommentDO extends BaseEntity {

    private static final long serialVersionUID = -6237119613422043750L;

    /**
     * 评论正文
     */
    @ApiModelProperty("评论正文")
    @NotBlank(message = "正文不能为空")
    private String content;

    /**
     * 文章ID
     * @see ArticleDO
     */
    @ApiModelProperty("文章ID")
    @Column(name = "article_id")
    @NotNull(message = "缺失文章ID")
    private Integer articleId;

    /**
     * 作者ID
     * @see UserDO
     */
    @ApiModelProperty("作者ID")
    @Column(name = "author_id")
    private Integer authorId;

    /**
     * 上级评论ID
     * @see CommentDO
     */
    @ApiModelProperty("上级评论ID")
    @Column(name = "previous_comment_id")
    private Integer previousCommentId;

    /**
     * 创建时间
     */
    @ApiModelProperty("创建时间")
    @Column(name = "create_date")
    @JsonFormat(locale="zh", timezone="GMT+8", pattern="yyyy-MM-dd HH:mm")
    @OrderBy("DESC")
    private Date createDate;
}