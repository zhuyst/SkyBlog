package indi.zhuyst.skyblog.service;

import com.github.pagehelper.PageInfo;
import indi.zhuyst.common.pojo.Query;
import indi.zhuyst.common.service.BaseCrudService;
import indi.zhuyst.common.service.CacheableService;
import indi.zhuyst.skyblog.entity.Article;
import indi.zhuyst.skyblog.pojo.ArticleDTO;

import java.util.Arrays;
import java.util.List;

public interface ArticleService extends BaseCrudService<Article>,
        CacheableService{

    List<Integer> EXCEPT_IDS = Arrays.asList(
            MsgBoardService.MSG_BOARD_KEY,
            AboutService.ABOUT_KEY);

    String CACHE_OBJECT = CACHE_PREFIX + "article";

    String CACHE_PAGE = CACHE_PREFIX + "article_page";

    ArticleDTO getArticleDTO(int id);

    PageInfo<ArticleDTO> listArticle(Query<Article> query);

    ArticleDTO saveArticle(Article article);

}
