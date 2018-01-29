package indi.zhuyst.skyblog.service;

import com.github.pagehelper.PageInfo;
import indi.zhuyst.common.service.BaseCrudService;
import indi.zhuyst.skyblog.entity.User;
import indi.zhuyst.skyblog.pojo.UserDTO;
import org.springframework.security.core.userdetails.UserDetailsService;

public interface UserService extends BaseCrudService<User>,UserDetailsService{

    UserDTO getUserDTO(int id);

    User getByUsername(String username);

    User getByNickName(String nickname);

    UserDTO saveUser(User user);

    PageInfo<UserDTO> listUser(Integer pageNum, User user);

}
