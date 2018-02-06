package indi.zhuyst.skyblog.service;

import com.github.pagehelper.PageInfo;
import indi.zhuyst.common.pojo.Query;
import indi.zhuyst.common.service.BaseCrudService;
import indi.zhuyst.skyblog.entity.Article;
import indi.zhuyst.skyblog.pojo.ArticleDTO;

public interface ArticleService extends BaseCrudService<Article> {

    ArticleDTO getArticleDTO(int id);

    PageInfo<ArticleDTO> listArticle(Query<Article> query);

    ArticleDTO saveArticle(Article article);

}
