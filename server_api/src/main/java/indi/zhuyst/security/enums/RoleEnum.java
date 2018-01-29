package indi.zhuyst.security.enums;

import com.fasterxml.jackson.annotation.JsonCreator;

public enum RoleEnum {
    SYS_ADMIN(1,"系统管理员"),ADMIN(2,"管理员"),VISITOR(3,"访客");

    private int id;
    private String description;

    RoleEnum(int id, String description){
        this.id = id;
        this.description = description;
    }

    @JsonCreator
    public static RoleEnum getById(int id){
        for(RoleEnum roleEnum : RoleEnum.values()){
            if(roleEnum.getId() == id){
                return roleEnum;
            }
        }
        return VISITOR;
    }

    public boolean checkAdmin(){
        return id == 1 || id == 2;
    }

    public int getId() {
        return id;
    }

    public String getDescription() {
        return description;
    }

    public String getName(){
        return this.toString();
    }
}
