package indi.zhuyst.skyblog.service.impl;

import com.github.pagehelper.PageInfo;
import indi.zhuyst.common.exception.FieldErrorException;
import indi.zhuyst.common.pojo.Error;
import indi.zhuyst.common.pojo.Query;
import indi.zhuyst.common.service.BaseCrudServiceImpl;
import indi.zhuyst.common.util.PageUtils;
import indi.zhuyst.security.enums.RoleEnum;
import indi.zhuyst.security.pojo.SecurityUser;
import indi.zhuyst.skyblog.dao.UserDao;
import indi.zhuyst.skyblog.entity.User;
import indi.zhuyst.skyblog.pojo.UserDTO;
import indi.zhuyst.skyblog.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserServiceImpl extends BaseCrudServiceImpl<UserDao,User>
        implements UserService,CommandLineRunner{
    private static final int ADMIN_KEY = 1;

    private static final String ADMIN_DEFAULT_USERNAME = "admin";
    private static final String ADMIN_DEFAULT_PASSWORD = "admin123";
    private static final String ADMIN_DEFAULT_NICKNAME = "系统管理员";

    @Autowired
    private UserDao userDao;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    @Transactional
    public void run(String... strings) throws Exception {
        User user = super.getByID(ADMIN_KEY);
        if(user == null){
            user = new User();

            user.setId(ADMIN_KEY);
            user.setUsername(ADMIN_DEFAULT_USERNAME);
            user.setPassword(passwordEncoder.encode(ADMIN_DEFAULT_PASSWORD));
            user.setNickname(ADMIN_DEFAULT_NICKNAME);
            user.setRole(RoleEnum.SYS_ADMIN.getId());

            userDao.insertSelective(user);
        }
    }

    @Override
    @Transactional
    public User save(User user) {
        if(user.getId() == null){
            user.setRole(RoleEnum.VISITOR.getId());
        }
        else {
            User oldUser = super.getByID(user.getId());

            if(oldUser.getNickname().equals(user.getNickname())){
                user.setNickname(null);
            }

            user.setRole(oldUser.getRole());

            user.setUsername(null);
        }

        String password = user.getPassword();
        if(password != null){
            password = passwordEncoder.encode(user.getPassword());
            user.setPassword(password);
        }

        this.checkUserInfo(user);
        return super.save(user);
    }

    @Override
    public UserDTO getUserDTO(int id){
        User user = super.getByID(id);
        return this.produceDTO(user);
    }

    @Override
    public User getByUsername(String username){
        User user = new User();
        user.setUsername(username);

        return userDao.selectOne(user);
    }

    @Override
    public User getByNickName(String nickname){
        User user = new User();
        user.setNickname(nickname);

        return userDao.selectOne(user);
    }

    @Override
    @Transactional
    public UserDTO saveUser(User user){
        UserDTO dto = null;

        user = this.save(user);
        if(user != null){
            dto = this.getUserDTO(user.getId());
        }

        return dto;
    }

    @Override
    public PageInfo<UserDTO> listUser(Query<User> query){
        PageInfo<User> pageInfo = super.listByCondition(query);
        return this.produceDTOPageInfo(pageInfo.getList());
    }

    private void checkUserInfo(User user){
        final String fieldUsername = "username";
        final String fieldNickname = "nickname";

        User oldUser;
        List<Error> errors = new ArrayList<>();
        if(user.getUsername() != null){
            oldUser = this.getByUsername(user.getUsername());
            if(oldUser != null){
                Error error = new Error(fieldUsername,"该用户名已被使用，请换一个用户名试试");
                errors.add(error);
            }
        }

        if(user.getNickname() != null){
            oldUser = this.getByNickName(user.getNickname());
            if(oldUser != null){
                Error error = new Error(fieldNickname,"该昵称已被使用，请换一个昵称试试");
                errors.add(error);
            }
        }

        if(!errors.isEmpty()){
            throw new FieldErrorException(errors);
        }
    }

    private UserDTO produceDTO(User user){
        if(user == null){
            return null;
        }

        user.setPassword(null);
        return new UserDTO(user);
    }

    private PageInfo<UserDTO> produceDTOPageInfo(List<User> list){
        PageInfo<User> pageInfo = new PageInfo<>(list);

        List<UserDTO> pojoList = new ArrayList<>();
        for(User u : list){
            u.setPassword(null);
            UserDTO pojo = this.produceDTO(u);
            pojoList.add(pojo);
        }

        return PageUtils.copyNewInfo(pageInfo,pojoList);
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        if(username == null){
            throw new UsernameNotFoundException("用户名/密码错误");
        }

        User user = this.getByUsername(username);

        if(user == null){
            throw new UsernameNotFoundException("用户名/密码错误");
        }

        return new SecurityUser(user);
    }
}
