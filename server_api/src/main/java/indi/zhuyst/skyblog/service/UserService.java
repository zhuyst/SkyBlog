package indi.zhuyst.skyblog.service;

import com.github.pagehelper.PageInfo;
import indi.zhuyst.common.pojo.Query;
import indi.zhuyst.common.service.BaseCrudService;
import indi.zhuyst.skyblog.entity.User;
import indi.zhuyst.skyblog.pojo.UserDTO;
import org.springframework.security.core.userdetails.UserDetailsService;

public interface UserService extends BaseCrudService<User>,UserDetailsService{

    int ADMIN_KEY = 1;

    String ADMIN_DEFAULT_USERNAME = "admin";
    String ADMIN_DEFAULT_PASSWORD = "admin123";
    String ADMIN_DEFAULT_NICKNAME = "系统管理员";

    UserDTO getUserDTO(int id);

    User getByUsername(String username);

    User getByNickName(String nickname);

    UserDTO saveUser(User user);

    boolean promoteAdmin(int id);

    boolean demoteAdmin(int id);

    PageInfo<UserDTO> listUser(Query<User> query);

}
