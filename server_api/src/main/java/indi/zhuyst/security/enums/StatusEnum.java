package indi.zhuyst.security.enums;

import com.fasterxml.jackson.annotation.JsonCreator;
import indi.zhuyst.skyblog.entity.UserDO;
import lombok.Getter;

/**
 * 用户状态枚举类
 * @see UserDO#status
 * @author zhuyst
 */
public enum StatusEnum {
    /**
     * 正常
     */
    NORMAL(0,"正常"),

    /**
     * 账户被锁定，验证时会触发异常
     * @see org.springframework.security.authentication.LockedException
     */
    LOCKED(1,"锁定");

    /**
     * 状态ID
     * @see UserDO#status
     */
    @Getter
    private int id;

    /**
     * 状态名
     */
    @Getter
    private String description;

    StatusEnum(int id,String description){
        this.id = id;
        this.description = description;
    }

    /**
     * 通过ID获取枚举类
     * @param id 状态ID {@link UserDO#status}
     * @return 枚举类
     */
    @JsonCreator
    public static StatusEnum getById(int id){
        for(StatusEnum statusEnum : values()){
            if(statusEnum.getId() == id){
                return statusEnum;
            }
        }
        return NORMAL;
    }

    /**
     * 判断账户是否被锁定
     * @return 账户是否被锁定
     */
    public boolean isLocked(){
        return this == LOCKED;
    }

    /**
     * 获取状态枚举名
     * @return {@link #toString()}
     */
    public String getName(){
        return this.toString();
    }
}
