package indi.zhuyst.skyblog.service.impl;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import indi.zhuyst.common.enums.CodeEnum;
import indi.zhuyst.common.exception.CommonException;
import indi.zhuyst.common.pojo.Query;
import indi.zhuyst.common.service.BaseCrudServiceImpl;
import indi.zhuyst.common.util.PageUtils;
import indi.zhuyst.security.util.SecurityUtils;
import indi.zhuyst.skyblog.dao.ArticleDao;
import indi.zhuyst.skyblog.entity.Article;
import indi.zhuyst.skyblog.entity.Classify;
import indi.zhuyst.skyblog.entity.User;
import indi.zhuyst.skyblog.pojo.ArticleDTO;
import indi.zhuyst.skyblog.pojo.UserDTO;
import indi.zhuyst.skyblog.service.ArticleService;
import indi.zhuyst.skyblog.service.ClassifyService;
import indi.zhuyst.skyblog.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class ArticleServiceImpl extends BaseCrudServiceImpl<ArticleDao,Article> implements ArticleService{
    @Autowired
    private UserService userService;

    @Autowired
    private ClassifyService classifyService;

    @Override
    public Article getByID(int id) {
        checkExcept(id);
        return super.getByID(id);
    }

    @Override
    @Transactional(rollbackFor = RuntimeException.class)
    public Article save(Article article) {
        if(article.getId() == null){
            article.setCreateDate(new Date());
        }
        else {
            checkExcept(article.getId());
        }

        article.setUpdateDate(new Date());

        if(article.getClassifyId() == null){
            article.setClassifyId(ClassifyService.NOT_CLASSIFY_KEY);
        }

        User user = SecurityUtils.getUser();
        article.setAuthorId(user.getId());
        return super.save(article);
    }

    @Override
    @CacheEvict(cacheNames = {CACHE_OBJECT,CACHE_PAGE},allEntries = true)
    public boolean delete(int id) {
        checkExcept(id);
        return super.delete(id);
    }

    @Override
    @Cacheable(cacheNames = CACHE_OBJECT,key = "#id")
    public ArticleDTO getArticleDTO(int id){
        Article article = getByID(id);
        return this.produceDTO(article);
    }

    @Override
    @Cacheable(CACHE_PAGE)
    public PageInfo<ArticleDTO> listArticle(Query<Article> query){
        PageInfo<Article> pageInfo =
                PageHelper.startPage(query.getPageNum(),query.getPageSize())
                        .setOrderBy("update_date desc")
                        .doSelectPageInfo(() -> dao.selectWithoutIDs(
                                query.getEntity(), EXCEPT_IDS));
        return this.produceDTOPageInfo(pageInfo);
    }

    @Override
    @Transactional(rollbackFor = RuntimeException.class)
    @CacheEvict(cacheNames = {CACHE_OBJECT,CACHE_PAGE},allEntries = true)
    public ArticleDTO saveArticle(Article article){
        ArticleDTO pojo = null;

        article = this.save(article);
        if(article != null){
            pojo = this.getArticleDTO(article.getId());
        }

        return pojo;
    }

    private void checkExcept(int id){
        for(Integer exceptId : EXCEPT_IDS){
            if(id == exceptId){
                throw new CommonException(CodeEnum.NOT_FOUND.getCode(),"未找到该文章");
            }
        }
    }

    private ArticleDTO produceDTO(Article article){
        if(article == null){
            return null;
        }

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

        return PageUtils.copyNewInfo(pageInfo,pojoList);
    }
}
