package indi.zhuyst.common.pojo;

import com.fasterxml.jackson.core.JsonProcessingException;
import indi.zhuyst.common.enums.CodeEnum;
import indi.zhuyst.common.util.JsonUtil;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.cache.annotation.Cacheable;

import java.io.Serializable;
import java.util.Arrays;
import java.util.Collection;
import java.util.HashMap;
import java.util.Map;

/**
 * 返回结果对象
 * @param <T> 返回的实体类
 * @author zhuyst
 */
@NoArgsConstructor
public class R<T> implements Serializable{

    private static final long serialVersionUID = -3712751146584906976L;

    /**
     * 状态码
     */
    @ApiModelProperty("状态码")
    @Getter
    private Integer code;

    /**
     * 结果信息
     */
    @ApiModelProperty("结果信息")
    @Getter
    @Setter
    private String message;

    /**
     * 返回实体对象
     */
    @ApiModelProperty("返回实体对象")
    @Getter
    @Setter
    private T entity;

    /**
     * 字段验证错误信息
     */
    @ApiModelProperty("字段验证错误信息")
    @Getter
    private Map<String,String> errors;

    /**
     * 通过code实例化对象，调用{@link #setCode(int)}
     * @param code 状态码
     */
    private R(int code){
        this.setCode(code);
    }

    /**
     * 通过codeEnum实例化对象，调用{@link #setCode(CodeEnum)}
     * @param codeEnum 状态码枚举类
     */
    private R(CodeEnum codeEnum){
        this.setCode(codeEnum);
    }

    /**
     * 通过code与message直接实例化
     * @param code 状态码
     * @param message 结果信息
     */
    private R(int code, String message){
        this.code = code;
        this.message = message;
    }

    /**
     * 成功 - 获取结果对象
     * @return 结果对象
     */
    public static R ok(){
        R r = new R();
        r.setCode(CodeEnum.SUCCESS);
        return r;
    }

    /**
     * 成功 - 通过CodeEnum获取带有实体的结果对象
     * @param entity 实体类
     * @param <T> 实体类的类型
     * @return 带有实体的结果对象
     */
    public static <T> R<T> ok(T entity){
        R<T> r = new R<>();
        r.setCode(CodeEnum.SUCCESS);
        r.setEntity(entity);
        return r;
    }

    /**
     * 错误 - 通过CodeEnum获取结果对象
     * @param codeEnum 状态码枚举类
     * @return 结果对象
     */
    public static R error(CodeEnum codeEnum){
        return new R(codeEnum);
    }

    /**
     * 错误 - 通过message获取结果对象，code默认为{@link CodeEnum#ERROR}
     * @param message 错误信息
     * @return 结果对象
     */
    public static R error(String message){
        R r = error(CodeEnum.ERROR);
        r.setMessage(message);
        return r;
    }

    /**
     * 错误 - 通过code和message直接获取结果对象
     * @param code 状态码
     * @param message 错误信息
     * @return 结果对象
     */
    public static R error(int code,String message){
        return new R(code,message);
    }

    /**
     * 设置code，调用{@link CodeEnum#getByCode(int)}
     * @param code code
     */
    public void setCode(int code) {
        CodeEnum codeEnum = CodeEnum.getByCode(code);
        this.setCode(codeEnum);
    }

    /**
     * 通过CodeEnum设置code与message
     * @param codeEnum 状态码枚举类
     */
    public void setCode(CodeEnum codeEnum){
        this.code = codeEnum.getCode();
        this.message = codeEnum.getDefaultMessage();
    }

    /**
     * 添加字段错误
     * @param errors 字段错误数组
     */
    public void addError(Error... errors){
        this.addError(Arrays.asList(errors));
    }

    /**
     * 添加字段错误
     * @param errors 字段错误集合
     */
    public void addError(Collection<Error> errors){
        if(this.errors == null){
            this.errors = new HashMap<>();
        }

        for(Error error : errors){
            this.errors.put(error.getField(),error.getMessage());
        }
    }

    /**
     * 判断是否有字段错误
     * @return 是否有字段错误
     */
    public boolean hasErrors(){
        return errors != null && !errors.isEmpty();
    }

    /**
     * 将结果对象转为JSON字符串
     * @return 转换后的JSON字符串
     */
    public String toJsonStr(){
        try {
            return JsonUtil.toJsonString(this);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        return null;
    }
}
