package indi.zhuyst.skyblog.service.impl;

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
    @Transactional
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
    public ClassifyDTO getById(int id){
        Classify classify = dao.selectByPrimaryKey(id);
        return this.produceDTO(classify);
    }

    @Override
    public ClassifyDTO getByName(String name) {
        Classify classify = new Classify();
        classify.setName(name);

        classify = dao.selectOne(classify);
        return this.produceDTO(classify);
    }

    @Override
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
    @Transactional
    public List<ClassifyDTO> saveClassify(Classify classify){
        checkClassify(classify);

        boolean isSuccess;
        if(classify.getId() == null){
            isSuccess = dao.insertUseGeneratedKeys(classify) > 0;
        }
        else {
            isSuccess = dao.updateByPrimaryKeySelective(classify) > 0;
        }

        return this.produceDTOList(isSuccess);
    }

    @Override
    @Transactional
    public List<ClassifyDTO> deleteClassify(Integer id){
        boolean isSuccess = dao.deleteByPrimaryKey(id) > 0;

        if(isSuccess){

            // 删除分类后，将分类下的文章归为未分类
            List<Article> articles = articleDao.selectBaseInfoByClassify(id);
            for(Article article : articles){
                article.setClassifyId(NOT_CLASSIFY_KEY);
                articleDao.updateByPrimaryKeySelective(article);
            }
        }

        return this.produceDTOList(isSuccess);
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

    private List<ClassifyDTO> produceDTOList(boolean isSuccess){
        List<ClassifyDTO> list = null;

        if(isSuccess){
            list = this.listClassify();
        }

        return list;
    }
}
