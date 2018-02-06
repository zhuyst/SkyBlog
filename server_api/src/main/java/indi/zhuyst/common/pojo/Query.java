package indi.zhuyst.common.pojo;

import lombok.Data;

@Data
public class Query<E> {

    private Integer pageNum;

    private Integer pageSize;

    private E entity;
}
