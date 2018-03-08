package indi.zhuyst.skyblog.service.impl;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import indi.zhuyst.common.enums.CodeEnum;
import indi.zhuyst.common.exception.CommonException;
import indi.zhuyst.common.pojo.Query;
import indi.zhuyst.common.service.impl.BaseCrudServiceImpl;
import indi.zhuyst.common.util.PageUtils;
import indi.zhuyst.security.util.SecurityUtils;
import indi.zhuyst.skyblog.dao.ArticleDao;
import indi.zhuyst.skyblog.entity.ArticleDO;
import indi.zhuyst.skyblog.entity.ClassifyDO;
import indi.zhuyst.skyblog.entity.UserDO;
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

/**
 * 文章服务实现类
 * @author zhuyst
 */
@Service("articleService")
public class ArticleServiceImpl extends BaseCrudServiceImpl<ArticleDao,ArticleDO>
        implements ArticleService{

    private final UserService userService;

    private final ClassifyService classifyService;

    @Autowired
    public ArticleServiceImpl(UserService userService, ClassifyService classifyService) {
        this.userService = userService;
        this.classifyService = classifyService;
    }

    @Override
    public ArticleDO getByID(int id) {
        checkExcept(id);
        return super.getByID(id);
    }

    @Override
    @Transactional(rollbackFor = RuntimeException.class)
    public ArticleDO save(ArticleDO article) {
        Integer classifyId = article.getClassifyId();
        if(classifyId == null){
            article.setClassifyId(ClassifyService.NOT_CLASSIFY_KEY);
        } else {
            ClassifyDO classify = classifyService.getByID(classifyId);
            if(classify == null){
                throw new CommonException("文章分类有误，不存在该分类");
            }
        }

        Date date = new Date();

        if(article.getId() == null){
            article.setCreateDate(date);
        } else {
            checkExcept(article.getId());
        }

        article.setUpdateDate(date);

        UserDO user = SecurityUtils.getUser();
        article.setAuthorId(user.getId());
        return super.save(article);
    }

    @Override
    @CacheEvict(cacheNames = {CACHE_OBJECT,CACHE_PAGE,
            ClassifyService.CACHE_OBJECT,ClassifyService.CACHE_LIST},
            allEntries = true)
    @Transactional(rollbackFor = RuntimeException.class)
    public boolean delete(int id) {
        checkExcept(id);
        return super.delete(id);
    }

    @Override
    @Cacheable(cacheNames = CACHE_OBJECT,key = "#id")
    public ArticleDTO getArticleDTO(int id){
        ArticleDO article = getByID(id);
        return this.produceDTO(article);
    }

    @Override
    @Cacheable(CACHE_PAGE)
    public PageInfo<ArticleDTO> listArticle(Query<ArticleDO> query){
        PageInfo<ArticleDO> pageInfo =
                PageHelper.startPage(query.getPageNum(),query.getPageSize())
                        .setOrderBy("update_date DESC")
                        .doSelectPageInfo(() -> dao.selectWithoutIDs(
                                query.getEntity(), EXCEPT_IDS));
        return this.produceDTOPageInfo(pageInfo);
    }

    @Override
    @Transactional(rollbackFor = RuntimeException.class)
    @CacheEvict(cacheNames = {CACHE_OBJECT,CACHE_PAGE,
            ClassifyService.CACHE_OBJECT,ClassifyService.CACHE_LIST},
            allEntries = true)
    public ArticleDTO saveArticle(ArticleDO article){
        ArticleDTO pojo = null;

        article = this.save(article);
        if(article != null){
            pojo = this.getArticleDTO(article.getId());
        }

        return pojo;
    }

    /**
     * 检查是否为排除的ID {@link #EXCEPT_IDS}
     * 如果为排除的ID则会抛出NOT FOUND异常{@link CommonException}
     * @param id 检查的ID
     */
    private void checkExcept(int id){
        for(Integer exceptId : EXCEPT_IDS){
            if(id == exceptId){
                throw new CommonException(CodeEnum.NOT_FOUND.getCode(),"未找到该文章");
            }
        }
    }

    /**
     * 将DO封装为DTO
     * @param article DO
     * @return 封装后的DTO
     */
    private ArticleDTO produceDTO(ArticleDO article){
        if(article == null){
            return null;
        }

        ArticleDTO pojo = new ArticleDTO(article);

        UserDTO user = userService.getUserDTO(article.getAuthorId());
        if(user != null){
            pojo.setAuthor(user);
        }

        if(article.getClassifyId() != null){
            ClassifyDO classify = classifyService.getByID(article.getClassifyId());
            pojo.setClassify(classify);
        }

        return pojo;
    }

    /**
     * 将DO分页对象封装为DTO分页对象
     * @param pageInfo DO分页对象
     * @return DTO分页对象
     */
    private PageInfo<ArticleDTO> produceDTOPageInfo(PageInfo<ArticleDO> pageInfo){
        List<ArticleDTO> pojoList = new ArrayList<>(pageInfo.getSize());
        for(ArticleDO a : pageInfo.getList()){
            ArticleDTO pojo = this.produceDTO(a);
            pojoList.add(pojo);
        }

        return PageUtils.copyNewInfo(pageInfo,pojoList);
    }
}
