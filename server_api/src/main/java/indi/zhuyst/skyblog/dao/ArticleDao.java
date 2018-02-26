package indi.zhuyst.skyblog.dao;

import indi.zhuyst.common.dao.BaseDao;
import indi.zhuyst.skyblog.entity.Article;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * 文章DAO
 * @author zhuyst
 */
@Repository
public interface ArticleDao extends BaseDao<Article> {

    /**
     * 在{@link #select(Object)}基础上可以排除IDs
     * @param article {@link #select(Object)}一致
     * @param ids 要排除的Ids
     * @return 文章对象列表
     */
    List<Article> selectWithoutIDs(@Param("article") Article article,
                                   @Param("list") List<Integer> ids);

    /**
     * 查询除了{@link Article#content}以外的分类文章
     * @param classifyId 分类ID
     * @return 文章对象列表
     */
    List<Article> selectBaseInfoByClassify(int classifyId);
}