package indi.zhuyst.skyblog.entity;

import indi.zhuyst.common.entity.BaseEntity;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import java.util.Date;

/**
 * 评论
 * @author zhuyst
 */
@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
public class Comment extends BaseEntity {

    /**
     * 评论正文
     */
    @ApiModelProperty("评论正文")
    private String content;

    /**
     * 文章ID
     */
    @ApiModelProperty("文章ID")
    @Column(name = "article_id")
    private Integer articleId;

    /**
     * 作者ID
     */
    @ApiModelProperty("作者ID")
    @Column(name = "author_id")
    private Integer authorId;

    /**
     * 上级评论ID
     */
    @ApiModelProperty("上级评论ID")
    @Column(name = "previous_comment_id")
    private Integer previousCommentId;

    /**
     * 创建时间
     */
    @ApiModelProperty("创建时间")
    @Column(name = "create_date")
    private Date createDate;
}