package indi.zhuyst.skyblog.service;

import com.github.pagehelper.PageInfo;
import indi.zhuyst.common.pojo.Query;
import indi.zhuyst.common.service.BaseCrudService;
import indi.zhuyst.common.service.CacheableService;
import indi.zhuyst.skyblog.entity.Article;
import indi.zhuyst.skyblog.pojo.ArticleDTO;

import java.util.Arrays;
import java.util.List;

/**
 * 文章服务接口
 * @author zhuyst
 */
public interface ArticleService extends BaseCrudService<Article>,
        CacheableService{

    /**
     * 留言板和关于各占用了一个ID
     * @see MsgBoardService#MSG_BOARD_KEY
     * @see AboutService#ABOUT_KEY
     */
    List<Integer> EXCEPT_IDS = Arrays.asList(
            MsgBoardService.MSG_BOARD_KEY,
            AboutService.ABOUT_KEY);

    /**
     * 缓存名 - 对象
     */
    String CACHE_OBJECT = CACHE_PREFIX + "article";

    /**
     * 缓存名 - 分页对象
     */
    String CACHE_PAGE = CACHE_PREFIX + "article_page";

    /**
     * 获取文章DTO
     * @param id 文章ID
     * @return 文章DTO
     */
    ArticleDTO getArticleDTO(int id);

    /**
     * 获取文章DTO分页对象
     * @param query 查询对象
     * @return 文章DTO分页对象
     */
    PageInfo<ArticleDTO> listArticle(Query<Article> query);

    /**
     * 保存并返回文章DTO
     * @param article 文章对象
     * @return 保存后的文章DTO
     */
    ArticleDTO saveArticle(Article article);

}
