package indi.zhuyst.skyblog.dao;

import indi.zhuyst.common.dao.BaseDao;
import indi.zhuyst.skyblog.entity.Article;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ArticleDao extends BaseDao<Article> {

    List<Article> selectAllWithoutID(int id);

    List<String> selectTitleByClassify(int classifyId);
}