package indi.zhuyst.skyblog.service.impl;

import indi.zhuyst.common.service.BaseService;
import indi.zhuyst.skyblog.dao.ArticleDao;
import indi.zhuyst.skyblog.entity.Article;
import indi.zhuyst.skyblog.pojo.About;
import indi.zhuyst.skyblog.service.AboutService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AboutServiceImpl extends BaseService implements AboutService,
        CommandLineRunner{

    @Autowired
    private ArticleDao articleDao;

    @Override
    @Transactional
    public void run(String... args) throws Exception {
        Article about = articleDao.selectByPrimaryKey(ABOUT_KEY);
        if(about == null){
            about = new Article();

            about.setId(ABOUT_KEY);
            about.setTitle("关于");
            about.setContent("");

            articleDao.insertSelective(about);
        }
    }

    @Override
    public About getAbout() {
        Article article = this.getAboutArticle();
        return new About(article);
    }

    @Override
    @Transactional
    public About updateAbout(About about) {
        Article article = this.getAboutArticle();
        article.setContent(about.getContent());

        return articleDao.updateByPrimaryKeySelective(article) > 0 ?
                this.getAbout() : null;
    }

    private Article getAboutArticle(){
        return articleDao.selectByPrimaryKey(ABOUT_KEY);
    }
}