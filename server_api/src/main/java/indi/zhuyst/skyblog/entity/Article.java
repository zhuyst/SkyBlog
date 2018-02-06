package indi.zhuyst.skyblog.entity;

import indi.zhuyst.common.entity.BaseEntity;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import java.util.Date;

/**
 * 文章
 * @author zhuyst
 */
@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
public class Article extends BaseEntity {

    /**
     * 文章标题
     */
    @ApiModelProperty("文章标题")
    private String title;

    /**
     * 文章副标题
     */
    @ApiModelProperty("文章副标题")
    @Column(name = "sub_title")
    private String subTitle;

    /**
     * 分类ID
     */
    @ApiModelProperty("分类ID")
    @Column(name = "classify_id")
    private Integer classifyId;

    /**
     * 作者ID
     */
    @ApiModelProperty("作者ID")
    @Column(name = "author_id")
    private Integer authorId;

    /**
     * 创建时间
     */
    @ApiModelProperty("创建时间")
    @Column(name = "create_date")
    private Date createDate;

    /**
     * 更新时间
     */
    @ApiModelProperty("更新时间")
    @Column(name = "update_date")
    private Date updateDate;

    /**
     * 文章正文
     */
    @ApiModelProperty("文章正文")
    private String content;
}