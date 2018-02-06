package indi.zhuyst.common.pojo;

import com.fasterxml.jackson.core.JsonProcessingException;
import indi.zhuyst.common.util.JsonUtil;
import lombok.Getter;
import lombok.Setter;

import java.util.Arrays;
import java.util.Collection;
import java.util.HashMap;
import java.util.Map;

public class R<T>{

    public static final int SUCCESS_CODE = 200;

    public static final int FORBIDDEN_CODE = 403;

    public static final int NOT_FOUND_CODE = 404;

    public static final int ERROR_CODE = 500;

    @Getter
    private Integer code;

    @Getter
    @Setter
    private String message;

    @Getter
    @Setter
    private T entity;

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
