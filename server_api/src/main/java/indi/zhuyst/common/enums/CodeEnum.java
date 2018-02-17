package indi.zhuyst.common.enums;

import lombok.Getter;

/**
 * 状态码枚举类
 * @see indi.zhuyst.common.pojo.R#code
 * @author zhuyst
 */
public enum CodeEnum{
    /**
     * 成功
     */
    SUCCESS(200,"OK"),

    /**
     * 未经授权
     */
    UNAUTHORIZED(401,"未经授权，请先获取Token"),

    /**
     * 没有权限
     */
    FORBIDDEN(403,"您没有权限访问这个资源"),

    /**
     * 没有找到该资源
     */
    NOT_FOUND(404,"NOT FOUND"),

    /**
     * 服务器错误
     */
    ERROR(500,"未知错误，请联系管理员");

    /**
     * 状态码
     */
    @Getter
    private int code;

    /**
     * 状态码对应默认信息
     */
    @Getter
    private String defaultMessage;

    CodeEnum(int code,String defaultMessage){
        this.code = code;
        this.defaultMessage = defaultMessage;
    }

    /**
     * 通过code获取对应的枚举类
     * @param code 状态码
     * @return 状态码枚举类
     */
    public static CodeEnum getByCode(int code){
        for(CodeEnum codeEnum : values()){
            if(code == codeEnum.getCode()){
                return codeEnum;
            }
        }
        return ERROR;
    }
}
