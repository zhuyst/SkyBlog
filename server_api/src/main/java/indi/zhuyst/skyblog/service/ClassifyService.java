package indi.zhuyst.skyblog.service;

import indi.zhuyst.skyblog.entity.Classify;

import java.util.List;

public interface ClassifyService {

    int NOT_CLASSIFY_KEY = 1;

    Classify getById(int id);

    List<Classify> listClassify();

    List<Classify> saveClassify(Classify classify);

    List<Classify> deleteClassify(Integer id);

}
