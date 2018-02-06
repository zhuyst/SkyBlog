package indi.zhuyst.common.dao;

import indi.zhuyst.common.entity.BaseEntity;
import tk.mybatis.mapper.common.BaseMapper;
import tk.mybatis.mapper.common.MySqlMapper;
import tk.mybatis.mapper.common.rowbounds.SelectRowBoundsMapper;

/**
 * 基础DAO，通用Mapper使用
 * @param <T> 操作实体类
 * @author zhuyst
 */
public interface BaseDao<T extends BaseEntity> extends BaseMapper<T>,
        SelectRowBoundsMapper<T>,
        MySqlMapper<T> {
}
