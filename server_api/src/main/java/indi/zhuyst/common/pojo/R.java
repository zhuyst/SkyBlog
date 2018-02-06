package indi.zhuyst.common.pojo;

import com.fasterxml.jackson.core.JsonProcessingException;
import indi.zhuyst.common.util.JsonUtil;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

import java.util.Arrays;
import java.util.Collection;
import java.util.HashMap;
import java.util.Map;

/**
 * 返回结果对象
 * @param <T> 返回的实体类
 * @author zhuyst
 */
public class R<T>{

    /**
     * CODE:成功
     * @see #code
     */
    public static final int SUCCESS_CODE = 200;

    /**
     * CODE:没有权限
     * @see #code
     */
    public static final int FORBIDDEN_CODE = 403;

    /**
     * CODE:没有找到该资源
     * @see #code
     */
    public static final int NOT_FOUND_CODE = 404;

    /**
     * CODE:服务器错误
     * @see #code
     */
    public static final int ERROR_CODE = 500;

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

    private R() {}

    private R(int code){
        this.setCode(code);
    }

    private R(int code, String message){
        this.code = code;
        this.message = message;
    }

    public static R ok(){
        R r = new R();
        r.setCode(SUCCESS_CODE);
        return r;
    }

    public static <T> R<T> ok(T entity){
        R<T> r = new R<>();
        r.setCode(SUCCESS_CODE);
        r.setEntity(entity);
        return r;
    }

    public static R error(int code){
        return new R(code);
    }

    public static R error(String message){
        R r = error(ERROR_CODE);
        r.setMessage(message);
        return r;
    }

    public static R error(int code,String message){
        return new R(code,message);
    }

    public void setCode(int code) {
        this.code = code;

        String msg;
        switch (code){
            case SUCCESS_CODE:
                msg = "OK";
                break;
            case FORBIDDEN_CODE:
                msg = "您没有权限访问这个资源";
                break;
            case NOT_FOUND_CODE:
                msg = "NOT FOUND";
                break;
            case ERROR_CODE:
                msg = "ERROR";
                break;
            default:
                msg = "未知错误，请联系管理员";
                break;
        }
        this.setMessage(msg);
    }

    public void addError(Error... errors){
        this.addError(Arrays.asList(errors));
    }

    public void addError(Collection<Error> errors){
        if(this.errors == null){
            this.errors = new HashMap<>();
        }

        for(Error error : errors){
            this.errors.put(error.getField(),error.getMessage());
        }
    }

    public boolean hasErrors(){
        return errors != null && !errors.isEmpty();
    }

    public String toJsonStr(){
        try {
            return JsonUtil.toJsonString(this);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        return null;
    }
}
