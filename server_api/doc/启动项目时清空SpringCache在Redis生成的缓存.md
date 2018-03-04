# 启动项目时清空SpringCache在Redis生成的缓存

在开发项目中，因为没有明确进行设计，所以经常会碰到需要修改表，从而导致需要修改实体类的情况，所以在序列化上常常会出现问题。

**所以我在开发的时候，需要在启动项目时候就清空缓存**

## 定义一个缓存公用的前缀

`public static final String CACHE_KEY_PREFIX = "CACHE:";`

## 让一个类实现`CommandLineRunner`

这个接口会让你实现一个`run`方法，方法会在项目初始化完成后立即执行，也是我们清空缓存最佳的时候。

## 在`run`方法中清空以缓存公用前缀为前缀的缓存

```java
      String pattern = CACHE_KEY_PREFIX + "*";
        RedisConnection connection = redisTemplate
                .getConnectionFactory().getConnection();

        Set<byte[]> caches = connection.keys(pattern.getBytes());
        if(!caches.isEmpty()){
            connection.del(caches.toArray(new byte[][]{}));
        }
```

使用`KEYS`命令，搜索以`CACHE:`开头的缓存，然后再调用`DEL`方法删除，便可以清空`Spring Cache`生成的缓存了。