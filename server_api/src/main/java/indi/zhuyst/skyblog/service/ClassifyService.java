package indi.zhuyst.skyblog.service;

import indi.zhuyst.common.service.BaseCrudService;
import indi.zhuyst.common.service.CacheableService;
import indi.zhuyst.skyblog.entity.ClassifyDO;
import indi.zhuyst.skyblog.pojo.ClassifyDTO;

import java.util.List;

/**
 * 文章分类Service接口
 * @author zhuyst
 */
public interface ClassifyService extends BaseCrudService<ClassifyDO>,
        CacheableService{

    /**
     * 未分类ID
     */
    int NOT_CLASSIFY_KEY = 1;

    /**
     * 缓存 - 对象
     */
    String CACHE_OBJECT = CACHE_PREFIX + "classify";

    /**
     * 缓存 - 分页对象
     */
    String CACHE_LIST = CACHE_PREFIX + "classify_list";

    /**
     * 获取分类DTO
     * @param id 分类ID
     * @return 分类DTO
     */
    ClassifyDTO getClassifyDTO(int id);

    /**
     * 根据{@link ClassifyDO#name}进行精确查询
     * @param name 分类名
     * @return 分类对象
     */
    ClassifyDO getByName(String name);

    /**
     * 查询分类DTO列表
     * @return 分类DTO列表
     */
    List<ClassifyDTO> listClassify();

}
