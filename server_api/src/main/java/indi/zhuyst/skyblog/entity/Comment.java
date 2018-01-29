package indi.zhuyst.skyblog.entity;

import indi.zhuyst.common.entity.BaseEntity;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.util.Date;
import javax.persistence.*;

@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
public class Comment extends BaseEntity {

    private String content;

    @Column(name = "article_id")
    private Integer articleId;

    @Column(name = "author_id")
    private Integer authorId;

    @Column(name = "previous_comment_id")
    private Integer previousCommentId;

    @Column(name = "create_date")
    private Date createDate;
}