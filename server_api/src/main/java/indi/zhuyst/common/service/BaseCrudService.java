package indi.zhuyst.common.service;

import com.github.pagehelper.PageInfo;
import com.github.pagehelper.PageRowBounds;
import indi.zhuyst.common.entity.BaseEntity;

import java.util.List;

public interface BaseCrudService<E extends BaseEntity> {

    E getByID(int id);

    PageInfo<E> listByCondition(Integer pageNum, E entity);

    PageInfo<E> listByCondition(PageRowBounds rowBounds, E entity);

    long countAll();

    List<E> listAll();

    E save(E entity);

    boolean delete(int id);
}
