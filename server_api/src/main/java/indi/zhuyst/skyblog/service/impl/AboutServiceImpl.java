package indi.zhuyst.skyblog.service.impl;

import indi.zhuyst.common.service.BaseService;
import indi.zhuyst.skyblog.dao.ArticleDao;
import indi.zhuyst.skyblog.entity.ArticleDO;
import indi.zhuyst.skyblog.pojo.About;
import indi.zhuyst.skyblog.service.AboutService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * 关于服务实现
 * @author zhuyst
 */
@Service("aboutService")
public class AboutServiceImpl extends BaseService implements AboutService,
        CommandLineRunner{

    private final ArticleDao articleDao;

    @Autowired
    public AboutServiceImpl(ArticleDao articleDao) {
        this.articleDao = articleDao;
    }

    /**
     * 初始化留言板
     * @see #ABOUT_KEY
     */
    @Override
    @Transactional(rollbackFor = RuntimeException.class)
    public void run(String... args) {
        ArticleDO about = articleDao.selectByPrimaryKey(ABOUT_KEY);
        if(about == null){
            final String defaultTitle = "关于";

            about = new ArticleDO();

            about.setId(ABOUT_KEY);
            about.setTitle(defaultTitle);
            about.setContent("");

            articleDao.insertSelective(about);
        }
    }

    @Override
    @Cacheable(CACHE_OBJECT)
    public About getAbout() {
        ArticleDO article = this.getAboutArticle();
        return new About(article);
    }

    @Override
    @Transactional(rollbackFor = RuntimeException.class)
    @CacheEvict(cacheNames = CACHE_OBJECT,allEntries = true)
    public About updateAbout(About about) {
        ArticleDO article = this.getAboutArticle();
        article.setContent(about.getContent());

        return articleDao.updateByPrimaryKeySelective(article) > 0 ?
                this.getAbout() : null;
    }

    private ArticleDO getAboutArticle(){
        return articleDao.selectByPrimaryKey(ABOUT_KEY);
    }
}
