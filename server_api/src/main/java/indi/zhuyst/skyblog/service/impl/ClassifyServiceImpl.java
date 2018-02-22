package indi.zhuyst.skyblog.service.impl;

import indi.zhuyst.common.exception.CommonException;
import indi.zhuyst.common.exception.FieldErrorException;
import indi.zhuyst.common.pojo.Error;
import indi.zhuyst.skyblog.dao.ArticleDao;
import indi.zhuyst.skyblog.dao.ClassifyDao;
import indi.zhuyst.skyblog.entity.Article;
import indi.zhuyst.skyblog.entity.Classify;
import indi.zhuyst.skyblog.pojo.ClassifyDTO;
import indi.zhuyst.skyblog.service.ClassifyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
public class ClassifyServiceImpl implements ClassifyService,CommandLineRunner{

    @Autowired
    private ClassifyDao dao;

    @Autowired
    private ArticleDao articleDao;

    @Override
    @Transactional(rollbackFor = RuntimeException.class)
    public void run(String... args) throws Exception {
        Classify classify = this.getById(NOT_CLASSIFY_KEY);
        if(classify == null){
            classify = new Classify();

            classify.setId(NOT_CLASSIFY_KEY);
            classify.setName("未分类");

            dao.insertSelective(classify);
        }
    }

    @Override
    @Cacheable(cacheNames = CACHE_OBJECT,key = "#id")
    public Classify getById(int id){
        Classify classify = dao.selectByPrimaryKey(id);
        return this.produceDTO(classify);
    }

    @Override
    public ClassifyDTO getClassifyDTO(int id) {
        Classify classify = this.getById(id);
        return this.produceDTO(classify);
    }

    @Override
    public Classify getByName(String name) {
        Classify classify = new Classify();
        classify.setName(name);

        classify = dao.selectOne(classify);
        return this.produceDTO(classify);
    }

    @Override
    @Cacheable(CACHE_LIST)
    public List<ClassifyDTO> listClassify(){
        List<Classify> list = dao.selectAll();
        List<ClassifyDTO> dtoList = new ArrayList<>();

        for(Classify classify : list){
            ClassifyDTO dto = this.produceDTO(classify);
            dtoList.add(dto);
        }

        return dtoList;
    }

    @Override
    @Transactional(rollbackFor = RuntimeException.class)
    @CacheEvict(cacheNames = {CACHE_OBJECT,CACHE_LIST},allEntries = true)
    public ClassifyDTO saveClassify(Classify classify){
        checkClassify(classify);

        boolean isSuccess;
        if(classify.getId() == null){
            isSuccess = dao.insertUseGeneratedKeys(classify) > 0;
        }
        else {
            isSuccess = dao.updateByPrimaryKeySelective(classify) > 0;
        }

        return isSuccess ? this.getClassifyDTO(classify.getId()) : null;
    }

    @Override
    @Transactional(rollbackFor = RuntimeException.class)
    @CacheEvict(cacheNames = {CACHE_OBJECT,CACHE_LIST},allEntries = true)
    public boolean deleteClassify(int id){


        // 将分类下的文章归为未分类
        List<Article> articles = articleDao.selectBaseInfoByClassify(id);
        for(Article article : articles){
            article.setClassifyId(NOT_CLASSIFY_KEY);
            articleDao.updateByPrimaryKeySelective(article);
        }

        if(id == NOT_CLASSIFY_KEY){
            throw new CommonException("未分类不能被删除");
        }

        return dao.deleteByPrimaryKey(id) > 0;
    }

    private void checkClassify(Classify classify){
        final String fieldName = "name";
        Classify oldClassify = this.getByName(classify.getName());

        if(oldClassify != null){
            Error error = new Error();
            error.setField(fieldName);
            error.setMessage("该分类名已存在");
            throw new FieldErrorException(error);
        }
    }

    private ClassifyDTO produceDTO(Classify classify){
        if(classify == null){
            return null;
        }

        ClassifyDTO dto = new ClassifyDTO(classify);

        List<Article> articles = articleDao.selectBaseInfoByClassify(classify.getId());
        dto.setArticles(articles);

        return dto;
    }
}
