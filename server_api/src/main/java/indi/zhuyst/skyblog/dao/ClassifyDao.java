package indi.zhuyst.skyblog.dao;

import indi.zhuyst.common.dao.BaseDao;
import indi.zhuyst.skyblog.entity.Classify;
import org.springframework.stereotype.Repository;

/**
 * 文章分类DAO
 * @author zhuyst
 */
@Repository
public interface ClassifyDao extends BaseDao<Classify> {
}