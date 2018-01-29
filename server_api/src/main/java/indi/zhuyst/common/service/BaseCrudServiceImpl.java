package indi.zhuyst.common.service;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.github.pagehelper.PageRowBounds;
import indi.zhuyst.common.dao.BaseDao;
import indi.zhuyst.common.entity.BaseEntity;
import indi.zhuyst.common.util.PageUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Transactional(readOnly = true,rollbackFor = RuntimeException.class)
public abstract class BaseCrudServiceImpl<D extends BaseDao<E>,E extends BaseEntity>
        extends BaseService implements BaseCrudService<E>{

    private static final int DEFAULT_PAGE_SIZE = 10;

    @Autowired
    protected D dao;

    public E getByID(int id){
        return dao.selectByPrimaryKey(id);
    }

    public PageInfo<E> listByCondition(Integer pageNum,E entity){
        PageRowBounds rowBounds = PageUtil.getPageRowBounds(pageNum,DEFAULT_PAGE_SIZE);
        return this.listByCondition(rowBounds,entity);
    }

    public PageInfo<E> listByCondition(PageRowBounds rowBounds,E entity){
        List<E> list = dao.selectByRowBounds(entity,rowBounds);
        return new PageInfo<>(list);
    }

    public List<E> listAll(){
        return dao.selectAll();
    }

    public long countAll(){
        return PageHelper.count(() -> dao.selectAll());
    }

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

    public boolean delete(int id){
        return dao.deleteByPrimaryKey(id) > 0;
    }
}
