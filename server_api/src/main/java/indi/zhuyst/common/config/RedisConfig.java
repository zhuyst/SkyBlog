package indi.zhuyst.common.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.connection.RedisConnection;
import org.springframework.data.redis.core.RedisTemplate;

import java.util.Set;

/**
 * Redis、缓存设置
 * @author zhuyst
 */
@Configuration
@EnableCaching
public class RedisConfig implements CommandLineRunner{

    /**
     * 缓存KEY使用的前缀，用于{@link #run(String...)}清除缓存
     */
    public static final String CACHE_KEY_PREFIX = "CACHE:";

    /**
     * 业务数据KEY使用的前缀
     */
    public static final String DATA_KEY_PREFIX = "DATA:";

    private final RedisTemplate<Object,Object> redisTemplate;

    @Autowired
    public RedisConfig(RedisTemplate<Object, Object> redisTemplate) {
        this.redisTemplate = redisTemplate;
    }

    /**
     * 清空缓存
     */
    @Override
    public void run(String... args) {
        String pattern = CACHE_KEY_PREFIX + "*";
        RedisConnection connection = redisTemplate
                .getConnectionFactory().getConnection();

        Set<byte[]> caches = connection.keys(pattern.getBytes());
        if(!caches.isEmpty()){
            connection.del(caches.toArray(new byte[][]{}));
        }
    }
}
