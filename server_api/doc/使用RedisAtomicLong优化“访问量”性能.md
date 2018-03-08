# 使用RedisAtomicLong优化"访问量"性能

在每一个网站中，如果要设计`访问量`这个功能的话，那么将无疑会是请求量最多的接口，那么使用`MySQL`来进行`count(*)`查询明显性能就会显差了，并且这个数据要求`实时`，也不能作缓存，那么便需要`Redis`这种`内存型数据库`出场了。

## RedisAtomicLong

这是一个`spring-data-redis`包中提供的，可以对数据中的`Long`类型进行`原子性操作`的类，下面是这个类的头：

```java
/**
 * Atomic long backed by Redis. Uses Redis atomic increment/decrement and watch/multi/exec operations for CAS
 * operations.
 *
 * @see java.util.concurrent.atomic.AtomicLong
 * @author Costin Leau
 * @author Thomas Darimont
 * @author Christoph Strobl
 * @author Mark Paluch
 */
public class RedisAtomicLong extends Number implements Serializable, BoundKeyOperations<String> {
```

我们可以看到`java.util.concurrent.atomic.AtomicLong`，和java自带的`atomic`包一样进行原子性操作，两者不同的是：

* `AtomicLong`只能在一个应用中使用
* `RedisAtomicLong`可以在所有与Redis有连接的应用中使用

## 开始优化

首先，我们需要在应用初始化时创建`RedisAtomicLong`实例。

```java
    /**
     * 初始化{@link #logCount}
     * 同时防止Redis中的次数与数据库的次数不一致
     */
    @Override
    public void run(String... strings) {
        logCount = new RedisAtomicLong(LOG_COUNT_KEY, connectionFactory);
        long databaseCount = super.countAll();

        // 检查Redis中的次数与数据库的次数
        if(databaseCount != logCount.get()){
            logCount.set(databaseCount);
        }
    }
```

这里我在启动时进行了检查，防止数据库的`count(*)`会和Redis中保存的次数不一致。

接下来就是当`新增访问日志`的时候，要将Redis中的次数`自增`。

```java
    public AccessLogDO save(AccessLogDO entity) {
        // 对Redis中的次数进行自增
        logCount.incrementAndGet();

        entity.setAccessDate(new Date());
        return super.save(entity);
    }
```

最后便是改写获取次数的方法了，我们不通过`count(*)`获取，而是直接从`RedisAtomicLong`中获取。

```java
    /**
     * 从Redis中获取访问次数
     * @return 访问次数
     */
    @Override
    public long countAll() {
        return logCount.get();
    }
```

至此，访问量的性能优化便完成了！