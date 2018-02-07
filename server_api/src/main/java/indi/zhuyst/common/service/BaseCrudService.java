package indi.zhuyst.common.service;

import com.github.pagehelper.PageInfo;
import indi.zhuyst.common.entity.BaseEntity;
import indi.zhuyst.common.pojo.Query;

import java.util.List;

/**
 * 基础的CRUD服务接口
 * @param <E> 服务的实体类
 * @author zhuyst
 */
public interface BaseCrudService<E extends BaseEntity> {

    /**
     * 通过ID获取对应实体类
     * @param id 要获取的ID
     * @return 实体类
     */
    E getByID(int id);

    /**
     * 通过Query进行分页查询
     * @param query 查询对象
     * @return 分页对象
     */
    PageInfo<E> listByCondition(Query<E> query);

    /**
     * 通过Query查询记录数
     * @param query 查询对象
     * @return 记录数
     */
    long countByCondition(Query<E> query);

    /**
     * 查询总记录数
     * @return 总记录数
     */
    long countAll();

    /**
     * 查询所有实体对象
     * @return 实体对象列表
     */
    List<E> listAll();

    /**
     * 新增或更新一条记录，通过{@link BaseEntity#id}是否为NULL来判断
     * ID为NULL - 新增
     * ID不为NULL - 更新
     * @param entity 实体对象
     * @return 成功时返回实体对象，失败则返回NULL
     */
    E save(E entity);

    /**
     * 删除一条记录
     * @param id 要删除的ID
     * @return 是否删除成功
     */
    boolean delete(int id);
}
