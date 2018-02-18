package indi.zhuyst.skyblog.dao;

import indi.zhuyst.common.dao.BaseDao;
import indi.zhuyst.skyblog.entity.Article;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ArticleDao extends BaseDao<Article> {

    List<Article> selectWithoutIDs(@Param("article") Article article,
                                   @Param("list") List<Integer> ids);

    List<Article> selectBaseInfoByClassify(int classifyId);
}