package indi.zhuyst.skyblog.service;

import indi.zhuyst.skyblog.entity.Classify;
import indi.zhuyst.skyblog.pojo.ClassifyAndArticles;

import java.util.List;

public interface ClassifyService {

    Classify getById(int id);

    List<Classify> listClassify();

    List<ClassifyAndArticles> listClassifyAndArticles();

    List<Classify> saveClassify(Classify classify);

    List<Classify> deleteClassify(Integer id);

}
