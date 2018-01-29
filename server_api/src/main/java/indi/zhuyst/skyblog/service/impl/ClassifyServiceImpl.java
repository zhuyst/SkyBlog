package indi.zhuyst.skyblog.service.impl;

import indi.zhuyst.skyblog.dao.ArticleDao;
import indi.zhuyst.skyblog.dao.ClassifyDao;
import indi.zhuyst.skyblog.entity.Article;
import indi.zhuyst.skyblog.entity.Classify;
import indi.zhuyst.skyblog.pojo.ClassifyAndArticlesTitle;
import indi.zhuyst.skyblog.service.ClassifyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ClassifyServiceImpl implements ClassifyService{

    @Autowired
    private ClassifyDao dao;

    @Autowired
    private ArticleDao articleDao;

    @Override
    public Classify getById(int id){
        return dao.selectByPrimaryKey(id);
    }

    @Override
    public List<Classify> listClassify(){
        return dao.selectAll();
    }

    @Override
    public List<ClassifyAndArticlesTitle> listClassifyAndArticlesTitle(){
        List<ClassifyAndArticlesTitle> list = new ArrayList<>();

        List<Classify> classifies = this.listClassify();
        for(Classify classify : classifies){
            ClassifyAndArticlesTitle pojo = new ClassifyAndArticlesTitle(classify);

            Article article = new Article();
            article.setClassifyId(classify.getId());
            List<Article> articles = articleDao.select(article);

            List<String> titles = new ArrayList<>();
            for(Article a : articles){
                titles.add(a.getTitle());
            }
            pojo.setTitles(titles);

            list.add(pojo);
        }

        return list;
    }

    public List<Classify> saveClassify(Classify classify){
        boolean isSuccess;
        if(classify.getId() == null){
            isSuccess = dao.insertUseGeneratedKeys(classify) > 0;
        }
        else {
            isSuccess = dao.updateByPrimaryKeySelective(classify) > 0;
        }

        return this.produceList(isSuccess);
    }

    public List<Classify> deleteClassify(Integer id){
        boolean isSuccess = dao.deleteByPrimaryKey(id) > 0;
        return this.produceList(isSuccess);
    }

    private List<Classify> produceList(boolean isSuccess){
        List<Classify> list = null;

        if(isSuccess){
            list = this.listClassify();
        }

        return list;
    }
}
