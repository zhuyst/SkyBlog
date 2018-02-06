package indi.zhuyst.common.service;

import com.github.pagehelper.PageInfo;
import indi.zhuyst.common.entity.BaseEntity;
import indi.zhuyst.common.pojo.Query;

import java.util.List;

public interface BaseCrudService<E extends BaseEntity> {

    E getByID(int id);

    PageInfo<E> listByCondition(Query<E> query);

    long countAll();

    List<E> listAll();

    E save(E entity);

    boolean delete(int id);
}
