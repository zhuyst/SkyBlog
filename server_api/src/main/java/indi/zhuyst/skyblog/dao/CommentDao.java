package indi.zhuyst.skyblog.dao;

import indi.zhuyst.common.dao.BaseDao;
import indi.zhuyst.skyblog.entity.Comment;
import org.springframework.stereotype.Repository;

@Repository
public interface CommentDao extends BaseDao<Comment> {
}