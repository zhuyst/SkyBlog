package indi.zhuyst.skyblog.service.impl;

import indi.zhuyst.common.exception.CommonException;
import indi.zhuyst.common.exception.FieldErrorException;
import indi.zhuyst.common.pojo.Error;
import indi.zhuyst.common.service.BaseCrudServiceImpl;
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

/**
 * 文章分类服务实现类
 * @author zhuyst
 */
@Service("classifyService")
public class ClassifyServiceImpl extends BaseCrudServiceImpl<ClassifyDao,Classify>
        implements ClassifyService,CommandLineRunner{

    @Autowired
    private ArticleDao articleDao;

    /**
     * 初始化未分类
     * @see #NOT_CLASSIFY_KEY
     */
    @Override
    @Transactional(rollbackFor = RuntimeException.class)
    public void run(String... args) throws Exception {
        Classify classify = this.getByID(NOT_CLASSIFY_KEY);
        if(classify == null){
            classify = new Classify();

            classify.setId(NOT_CLASSIFY_KEY);
            classify.setName("未分类");

            dao.insertSelective(classify);
        }
    }

    @Override
    @Cacheable(cacheNames = CACHE_OBJECT,key = "#id")
    public Classify getByID(int id) {
        return super.getByID(id);
    }


    @Override
    @Transactional(rollbackFor = RuntimeException.class)
    @CacheEvict(cacheNames = {CACHE_OBJECT,CACHE_LIST},allEntries = true)
    public Classify save(Classify entity) {
        checkClassify(entity);
        return super.save(entity);
    }

    @Override
    @Transactional(rollbackFor = RuntimeException.class)
    @CacheEvict(cacheNames = {CACHE_OBJECT,CACHE_LIST},allEntries = true)
    public boolean delete(int id) {
        if(id == NOT_CLASSIFY_KEY){
            throw new CommonException("未分类不能被删除");
        }

        // 将分类下的文章归为未分类
        List<Article> articles = articleDao.selectBaseInfoByClassify(id);
        for(Article article : articles){
            article.setClassifyId(NOT_CLASSIFY_KEY);
            articleDao.updateByPrimaryKeySelective(article);
        }

        return super.delete(id);
    }

    @Override
    public ClassifyDTO getClassifyDTO(int id) {
        Classify classify = this.getByID(id);
        return this.produceDTO(classify);
    }

    @Override
    public Classify getByName(String name) {
        Classify classify = new Classify();
        classify.setName(name);

        return dao.selectOne(classify);
    }

    @Override
    @Cacheable(CACHE_LIST)
    public List<ClassifyDTO> listClassify(){
        List<Classify> list = super.listAll();
        List<ClassifyDTO> dtoList = new ArrayList<>();

        for(Classify classify : list){
            ClassifyDTO dto = this.produceDTO(classify);
            dtoList.add(dto);
        }

        return dtoList;
    }

    /**
     * 检查分类名是否存在重名
     * 如果存在重复则会抛出异常{@link FieldErrorException}
     * @param classify 分类对象
     */
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

    /**
     * 将DO封装为DTO
     * @param classify DO
     * @return DTO
     */
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
