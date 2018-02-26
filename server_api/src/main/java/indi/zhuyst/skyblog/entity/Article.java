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
import javax.validation.constraints.NotNull;
import java.util.Date;

/**
 * 文章
 * @author zhuyst
 */
@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
public class Article extends BaseEntity {

    private static final long serialVersionUID = 8343236688927410161L;

    /**
     * 文章标题
     */
    @ApiModelProperty("文章标题")
    @NotBlank(message = "标题不能为空")
    private String title;

    /**
     * 文章副标题
     */
    @ApiModelProperty("文章副标题")
    @Column(name = "sub_title")
    private String subTitle;

    /**
     * 分类ID
     * @see Classify
     */
    @ApiModelProperty("分类ID")
    @Column(name = "classify_id")
    private Integer classifyId;

    /**
     * 作者ID
     * @see User
     */
    @ApiModelProperty("作者ID")
    @Column(name = "author_id")
    private Integer authorId;

    /**
     * 创建时间
     */
    @ApiModelProperty("创建时间")
    @Column(name = "create_date")
    @JsonFormat(locale="zh", timezone="GMT+8", pattern="yyyy-MM-dd HH:mm")
    private Date createDate;

    /**
     * 更新时间
     */
    @ApiModelProperty("更新时间")
    @Column(name = "update_date")
    @OrderBy("desc")
    @JsonFormat(locale="zh", timezone="GMT+8", pattern="yyyy-MM-dd HH:mm")
    private Date updateDate;

    /**
     * 文章正文
     */
    @ApiModelProperty("文章正文")
    @NotBlank(message = "正文不能为空")
    private String content;

    public Article(Integer id,String title, String subTitle,
                   Integer classifyId, Integer authorId,
                   Date createDate, Date updateDate) {
        this.id = id;
        this.title = title;
        this.subTitle = subTitle;
        this.classifyId = classifyId;
        this.authorId = authorId;
        this.createDate = createDate;
        this.updateDate = updateDate;
    }

    public Article(Integer id,String title, String subTitle,
                   Integer classifyId, Integer authorId,
                   Date createDate, Date updateDate,
                   String content) {
        this.id = id;
        this.title = title;
        this.subTitle = subTitle;
        this.classifyId = classifyId;
        this.authorId = authorId;
        this.createDate = createDate;
        this.updateDate = updateDate;
        this.content = content;
    }
}