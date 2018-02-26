package indi.zhuyst.skyblog.service;

import indi.zhuyst.common.service.BaseCrudService;
import indi.zhuyst.common.service.CacheableService;
import indi.zhuyst.skyblog.entity.Classify;
import indi.zhuyst.skyblog.pojo.ClassifyDTO;

import java.util.List;

public interface ClassifyService extends BaseCrudService<Classify>,
        CacheableService{

    int NOT_CLASSIFY_KEY = 1;

    String CACHE_OBJECT = CACHE_PREFIX + "classify";

    String CACHE_LIST = CACHE_PREFIX + "classify_list";

    ClassifyDTO getClassifyDTO(int id);

    Classify getByName(String name);

    List<ClassifyDTO> listClassify();

    ClassifyDTO saveClassify(Classify classify);

}
