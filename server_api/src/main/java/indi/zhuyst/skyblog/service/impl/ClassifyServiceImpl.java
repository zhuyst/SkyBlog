package indi.zhuyst.skyblog.service.impl;

import indi.zhuyst.skyblog.dao.ClassifyDao;
import indi.zhuyst.skyblog.entity.Classify;
import indi.zhuyst.skyblog.service.ClassifyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class ClassifyServiceImpl implements ClassifyService,CommandLineRunner{

    @Autowired
    private ClassifyDao dao;

    @Override
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
    public Classify getById(int id){
        return dao.selectByPrimaryKey(id);
    }

    @Override
    public List<Classify> listClassify(){
        return dao.selectAll();
    }

    @Override
    @Transactional
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

    @Override
    @Transactional
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
