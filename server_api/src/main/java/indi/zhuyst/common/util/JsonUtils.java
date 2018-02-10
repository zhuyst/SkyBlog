package indi.zhuyst.common.util;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.IOException;

/**
 * Json工具类
 * @author zhuyst
 */
public class JsonUtils {

    /**
     * Jackson Mapper
     */
    private static ObjectMapper objectMapper = new ObjectMapper();

    /**
     * 将对象转为JSON字符串
     * @param object 实体对象
     * @return 转换后的JSON字符串
     * @throws JsonProcessingException 转换错误异常
     */
    public static String toJsonString(Object object) throws JsonProcessingException {
        return objectMapper.writeValueAsString(object);
    }

    /**
     * 将JSON字符串转为对象
     * @param jsonStr JSON字符串
     * @param clazz 要转换的类
     * @param <T> 转换类的类型
     * @return 转换后的实体类
     * @throws IOException IO异常
     */
    public static <T> T fromJson(String jsonStr,Class<T> clazz) throws IOException {
        return objectMapper.readValue(jsonStr,clazz);
    }
}
