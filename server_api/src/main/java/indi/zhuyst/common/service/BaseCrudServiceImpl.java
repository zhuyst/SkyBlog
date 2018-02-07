package indi.zhuyst.common.service;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import indi.zhuyst.common.dao.BaseDao;
import indi.zhuyst.common.entity.BaseEntity;
import indi.zhuyst.common.pojo.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * BaseCrudService的实现类
 * @param <D> 操作对应实体的DAO
 * @param <E> 操作的实体类
 * @author zhuyst
 */
public abstract class BaseCrudServiceImpl<D extends BaseDao<E>,E extends BaseEntity>
        extends BaseService implements BaseCrudService<E>{

    /**
     * 默认页面大小
     */
    private static final int DEFAULT_PAGE_SIZE = 10;

    /**
     * 操作DAO
     */
    @Autowired
    protected D dao;

    @Override
    public E getByID(int id){
        return dao.selectByPrimaryKey(id);
    }

    @Override
    public PageInfo<E> listByCondition(Query<E> query){

        // 如果没有指定页面大小，设定一个默认值
        if(query.getPageSize() == null){
            query.setPageSize(DEFAULT_PAGE_SIZE);
        }

        // 进行分页
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
    public long countByCondition(Query<E> query) {
        return PageHelper.count(() -> dao.select(query.getEntity()));
    }

    @Override
    @Transactional
    public E save(E entity){
        boolean isSuccess;

        // 如果ID为NULL，执行INSERT操作
        if(entity.getId() == null){
            isSuccess = dao.insertUseGeneratedKeys(entity) > 0;
        }

        // 反则执行UPDATE操作
        else {
            isSuccess = dao.updateByPrimaryKeySelective(entity) > 0;
        }

        // 如果成功则访问对象，反则访问NULL
        return isSuccess ? this.getByID(entity.getId()) : null;
    }

    @Override
    @Transactional
    public boolean delete(int id){
        return dao.deleteByPrimaryKey(id) > 0;
    }
}
