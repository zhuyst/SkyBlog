package indi.zhuyst.common.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.serializer.RedisSerializer;
import org.springframework.data.redis.serializer.StringRedisSerializer;

import java.util.Set;

/**
 * 缓存设置
 * @author zhuyst
 */
@Configuration
@EnableCaching
public class CacheConfig implements CommandLineRunner{

    /**
     * 缓存KEY使用的前缀，用于{@link #run(String...)}清除缓存
     */
    public static final String CACHE_KEY_PREFIX = "CACHE:";

    @Autowired
    private RedisTemplate<Object,Object> redisTemplate;

    /**
     * 设置RedisTemplate的序列化方式，并且清除缓存
     */
    @Override
    public void run(String... args) {

        // 将Key值的序列化方式改为使用StringRedisSerializer
        RedisSerializer<String> serializer = new StringRedisSerializer();
        redisTemplate.setKeySerializer(serializer);
        redisTemplate.setHashKeySerializer(serializer);
        redisTemplate.afterPropertiesSet();

        // 清除缓存
        Set<Object> caches = redisTemplate.keys(CACHE_KEY_PREFIX + "*");
        redisTemplate.delete(caches);
    }
}
