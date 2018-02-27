package indi.zhuyst.security.enums;

import com.fasterxml.jackson.annotation.JsonCreator;
import indi.zhuyst.skyblog.entity.UserDO;
import lombok.Getter;

/**
 * 用户角色枚举类
 * @see UserDO#role
 * @author zhuyst
 */
public enum RoleEnum {
    /**
     * 系统管理员
     */
    SYS_ADMIN(1,"系统管理员"),

    /**
     * 管理员
     */
    ADMIN(2,"管理员"),

    /**
     * 访客
     */
    VISITOR(3,"访客");

    /**
     * 角色ID
     * @see UserDO#role
     */
    @Getter
    private int id;

    /**
     * 角色简介
     */
    @Getter
    private String description;

    RoleEnum(int id, String description){
        this.id = id;
        this.description = description;
    }

    /**
     * 通过ID获取枚举类
     * @param id 角色ID {@link UserDO#role}
     * @return 枚举类
     */
    @JsonCreator
    public static RoleEnum getById(int id){
        for(RoleEnum roleEnum : RoleEnum.values()){
            if(roleEnum.getId() == id){
                return roleEnum;
            }
        }
        return VISITOR;
    }

    /**
     * 判断是否为管理员角色
     * @return 是否为管理员
     */
    public boolean isAdmin(){
        return id == 1 || id == 2;
    }

    /**
     * 获取角色枚举名
     * @return {@link #toString()}
     */
    public String getName(){
        return this.toString();
    }
}
