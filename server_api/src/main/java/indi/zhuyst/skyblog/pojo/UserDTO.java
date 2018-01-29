package indi.zhuyst.skyblog.pojo;

import com.fasterxml.jackson.annotation.JsonIgnore;
import indi.zhuyst.skyblog.entity.User;
import indi.zhuyst.security.enums.RoleEnum;
import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.BeanUtils;

public class UserDTO extends User {

    @Getter
    @Setter
    @JsonIgnore
    private RoleEnum roleEnum;

    private Boolean isAdmin;

    public UserDTO(User user){
        BeanUtils.copyProperties(user,this);
        roleEnum = RoleEnum.getById(user.getRole());
        isAdmin = roleEnum.checkAdmin();
    }

    public boolean isAdmin(){
        return isAdmin;
    }
}
