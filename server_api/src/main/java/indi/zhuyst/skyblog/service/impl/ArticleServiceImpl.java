package indi.zhuyst.skyblog.service.impl;

import com.github.pagehelper.PageInfo;
import com.github.pagehelper.PageRowBounds;
import indi.zhuyst.common.service.BaseCrudServiceImpl;
import indi.zhuyst.skyblog.dao.ArticleDao;
import indi.zhuyst.skyblog.entity.Article;
import indi.zhuyst.skyblog.entity.Classify;
import indi.zhuyst.skyblog.entity.User;
import indi.zhuyst.skyblog.pojo.ArticleDTO;
import indi.zhuyst.skyblog.pojo.UserDTO;
import indi.zhuyst.skyblog.service.ArticleService;
import indi.zhuyst.skyblog.service.ClassifyService;
import indi.zhuyst.skyblog.service.UserService;
import indi.zhuyst.common.util.PageUtil;
import indi.zhuyst.security.util.SecurityUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class ArticleServiceImpl extends BaseCrudServiceImpl<ArticleDao,Article> implements ArticleService{
    private static final int ARTICLE_PAGE_SZE = 5;

    @Autowired
    private UserService userService;

    @Autowired
    private ClassifyService classifyService;

    @Override
    public Article save(Article article) {
        if(article.getId() == null){
            article.setCreateDate(new Date());
        }
        article.setUpdateDate(new Date());

        User user = SecurityUtil.getUser();
        article.setAuthorId(user.getId());
        return super.save(article);
    }

    public ArticleDTO getArticleDTO(int id){
        Article article = super.getByID(id);
        return this.produceDTO(article);
    }

    public PageInfo<ArticleDTO> listArticleByClassify(int classifyId, Integer pageNum){
        PageRowBounds bounds = PageUtil.getPageRowBounds(pageNum,ARTICLE_PAGE_SZE);

        Article article = new Article();
        article.setClassifyId(classifyId);

        PageInfo<Article> pageInfo = super.listByCondition(bounds,article);
        return this.produceDTOPageInfo(pageInfo);
    }

    public PageInfo<ArticleDTO> listArticle(Integer pageNum){
        PageRowBounds bounds = PageUtil.getPageRowBounds(pageNum,ARTICLE_PAGE_SZE);
        PageInfo<Article> pageInfo = super.listByCondition(bounds,null);
        return this.produceDTOPageInfo(pageInfo);
    }

    public ArticleDTO saveArticle(Article article){
        ArticleDTO pojo = null;

        article = this.save(article);
        if(article != null){
            pojo = this.getArticleDTO(article.getId());
        }

        return pojo;
    }

    private ArticleDTO produceDTO(Article article){
        ArticleDTO pojo = new ArticleDTO(article);

        UserDTO user = userService.getUserDTO(article.getAuthorId());
        pojo.setAuthor(user);

        if(article.getClassifyId() != null){
            Classify classify = classifyService.getById(article.getClassifyId());
            pojo.setClassify(classify);
        }

        return pojo;
    }

    private PageInfo<ArticleDTO> produceDTOPageInfo(PageInfo<Article> pageInfo){
        List<ArticleDTO> pojoList = new ArrayList<>();
        for(Article a : pageInfo.getList()){
            ArticleDTO pojo = this.produceDTO(a);
            pojoList.add(pojo);
        }

        return PageUtil.copyNewInfo(pageInfo,pojoList);
    }
}
