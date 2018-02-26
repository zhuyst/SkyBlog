package indi.zhuyst.skyblog.service;

import indi.zhuyst.common.service.CacheableService;
import indi.zhuyst.skyblog.pojo.About;

/**
 * 关于服务接口
 * @author zhuyst
 */
public interface AboutService extends CacheableService{

    /**
     * 关于存储在{@link indi.zhuyst.skyblog.entity.Article#id}当中
     * ID == 2
     */
    int ABOUT_KEY = 2;

    /**
     * 缓存名 - 对象
     */
    String CACHE_OBJECT = CACHE_PREFIX + "about";

    /**
     * 获取关于
     * @return 关于对象
     */
    About getAbout();

    /**
     * 更新关于
     * @param about 关于对象
     * @return 更新后的关于对象
     */
    About updateAbout(About about);
}
