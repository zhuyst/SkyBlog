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
public class Article extends BaseEntity {

    private String title;

    @Column(name = "sub_title")
    private String subTitle;

    @Column(name = "classify_id")
    private Integer classifyId;

    @Column(name = "author_id")
    private Integer authorId;

    @Column(name = "create_date")
    private Date createDate;

    @Column(name = "update_date")
    private Date updateDate;

    private String content;
}