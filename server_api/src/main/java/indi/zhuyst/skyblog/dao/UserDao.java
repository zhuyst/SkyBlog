package indi.zhuyst.skyblog.dao;

import indi.zhuyst.common.dao.BaseDao;
import indi.zhuyst.skyblog.entity.User;
import org.springframework.stereotype.Repository;

/**
 * 用户DAO
 * @author zhuyst
 */
@Repository
public interface UserDao extends BaseDao<User> {
}