package indi.zhuyst.common.service;

import indi.zhuyst.common.config.CacheConfig;

/**
 * 标记可以进行缓存的服务接口
 * @author zhuyst
 */
public interface CacheableService {

    /**
     * Redis缓存KEY使用的前缀
     */
    String CACHE_PREFIX = CacheConfig.CACHE_KEY_PREFIX;
}
