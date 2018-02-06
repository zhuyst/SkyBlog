package indi.zhuyst.common.service;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import indi.zhuyst.common.dao.BaseDao;
import indi.zhuyst.common.entity.BaseEntity;
import indi.zhuyst.common.pojo.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public abstract class BaseCrudServiceImpl<D extends BaseDao<E>,E extends BaseEntity>
        extends BaseService implements BaseCrudService<E>{

    private static final int DEFAULT_PAGE_SIZE = 10;

    @Autowired
    protected D dao;

    @Override
    public E getByID(int id){
        return dao.selectByPrimaryKey(id);
    }

    @Override
    public PageInfo<E> listByCondition(Query<E> query){
        if(query.getPageSize() == null){
            query.setPageSize(DEFAULT_PAGE_SIZE);
        }
        return PageHelper.startPage(query.getPageNum(),query.getPageSize()).doSelectPageInfo(
                () -> dao.select(query.getEntity())
        );
    }

    @Override
    public List<E> listAll(){
        return dao.selectAll();
    }

    @Override
    public long countAll(){
        return PageHelper.count(() -> dao.selectAll());
    }

    @Override
    @Transactional
    public E save(E entity){
        boolean isSuccess;

        if(entity.getId() == null){
            isSuccess = dao.insertUseGeneratedKeys(entity) > 0;
        }
        else {
            isSuccess = dao.updateByPrimaryKeySelective(entity) > 0;
        }

        return isSuccess ? this.getByID(entity.getId()) : null;
    }

    @Override
    @Transactional
    public boolean delete(int id){
        return dao.deleteByPrimaryKey(id) > 0;
    }
}
