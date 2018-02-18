package indi.zhuyst.skyblog.service;

import indi.zhuyst.skyblog.entity.Classify;
import indi.zhuyst.skyblog.pojo.ClassifyDTO;

import java.util.List;

public interface ClassifyService {

    int NOT_CLASSIFY_KEY = 1;

    Classify getById(int id);

    Classify getByName(String name);

    List<ClassifyDTO> listClassify();

    List<ClassifyDTO> saveClassify(Classify classify);

    List<ClassifyDTO> deleteClassify(int id);

}
