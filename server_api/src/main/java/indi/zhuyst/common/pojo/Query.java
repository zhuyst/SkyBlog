package indi.zhuyst.common.pojo;

import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import springfox.documentation.annotations.ApiIgnore;

@Data
public class Query<E> {

    /**
     * 页码
     */
    @ApiModelProperty("页码")
    private Integer pageNum;

    /**
     * 页面大小
     */
    @ApiModelProperty("页面大小")
    private Integer pageSize;

    /**
     * 查询对象（等号查询）
     */
    @ApiModelProperty(hidden = true)
    private E entity;

    public Query(Query query){
        this.setPageNum(query.getPageNum());
        this.setPageSize(query.getPageSize());
    }

    public Query(Query query,E entity){
        this.setPageNum(query.getPageNum());
        this.setPageSize(query.getPageSize());
        this.setEntity(entity);
    }
}
