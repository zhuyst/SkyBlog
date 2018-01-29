package indi.zhuyst.common.dao;

import indi.zhuyst.common.entity.BaseEntity;
import tk.mybatis.mapper.common.BaseMapper;
import tk.mybatis.mapper.common.MySqlMapper;
import tk.mybatis.mapper.common.rowbounds.SelectRowBoundsMapper;

public interface BaseDao<T extends BaseEntity> extends BaseMapper<T>,
        SelectRowBoundsMapper<T>,
        MySqlMapper<T> {
}
