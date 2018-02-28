package indi.zhuyst.skyblog.service.impl;

import com.github.pagehelper.PageInfo;
import indi.zhuyst.common.exception.CommonException;
import indi.zhuyst.common.exception.FieldErrorException;
import indi.zhuyst.common.pojo.Error;
import indi.zhuyst.common.pojo.Query;
import indi.zhuyst.common.service.impl.BaseCrudServiceImpl;
import indi.zhuyst.common.util.PageUtils;
import indi.zhuyst.security.enums.RoleEnum;
import indi.zhuyst.security.enums.StatusEnum;
import indi.zhuyst.security.pojo.SecurityUser;
import indi.zhuyst.skyblog.dao.UserDao;
import indi.zhuyst.skyblog.entity.UserDO;
import indi.zhuyst.skyblog.pojo.UserDTO;
import indi.zhuyst.skyblog.service.UserService;
import indi.zhuyst.skyblog.setting.DefaultAdminSettings;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

/**
 * 用户服务实现类
 * @author zhuyst
 */
@Service("userService")
public class UserServiceImpl extends BaseCrudServiceImpl<UserDao,UserDO>
        implements UserService,CommandLineRunner{

    @Autowired
    private DefaultAdminSettings defaultAdminSettings;

    @Autowired
    private PasswordEncoder passwordEncoder;

    /**
     * 初始化管理员
     */
    @Override
    @Transactional(rollbackFor = RuntimeException.class)
    public void run(String... strings) throws Exception {
        UserDO user = super.getByID(ADMIN_KEY);
        if(user == null){
            user = new UserDO();

            user.setId(ADMIN_KEY);
            user.setUsername(defaultAdminSettings.getUsername());
            user.setPassword(passwordEncoder.encode(defaultAdminSettings.getPassword()));
            user.setNickname(defaultAdminSettings.getNickname());
            user.setRole(RoleEnum.SYS_ADMIN.getId());

            dao.insertSelective(user);
        }
    }

    @Override
    @Cacheable(cacheNames = CACHE_OBJECT,key = "#username")
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        if(username == null){
            throw new UsernameNotFoundException("用户名/密码错误");
        }

        UserDO user = this.getByUsername(username);

        if(user == null){
            throw new UsernameNotFoundException("用户名/密码错误");
        }

        return new SecurityUser(user);
    }

    @Override
    @Transactional(rollbackFor = RuntimeException.class)
    @CacheEvict(cacheNames = {CACHE_OBJECT,CACHE_PAGE},allEntries = true)
    public UserDO save(UserDO user) {
        if(user.getId() == null){

            // 设置初始角色及状态
            user.setRole(RoleEnum.VISITOR.getId());
            user.setStatus(StatusEnum.NORMAL.getId());
        } else {
            UserDO oldUser = super.getByID(user.getId());

            // 如果两者相等，则表示nickname不需要修改
            if(oldUser.getNickname().equals(user.getNickname())){
                user.setNickname(null);
            }

            // 保证角色及状态不被修改
            user.setRole(oldUser.getRole());
            user.setStatus(oldUser.getStatus());

            // 保证username不被修改
            user.setUsername(null);
        }

        this.checkUserInfo(user);

        String password = user.getPassword();
        if(password != null){
            password = passwordEncoder.encode(user.getPassword());
            user.setPassword(password);
        }

        return super.save(user);
    }

    @Override
    @CacheEvict(cacheNames = {CACHE_OBJECT,CACHE_PAGE},allEntries = true)
    public boolean delete(int id) {
        UserDTO user = this.getUserDTO(id);
        if(user.getAdmin()){
            throw new CommonException("管理员不能被删除");
        }

        return super.delete(id);
    }

    @Override
    public UserDTO getUserDTO(int id){
        UserDO user = super.getByID(id);
        return this.produceDTO(user);
    }

    @Override
    public UserDO getByUsername(String username){
        UserDO user = new UserDO();
        user.setUsername(username);

        return dao.selectOne(user);
    }

    @Override
    public UserDO getByNickName(String nickname){
        UserDO user = new UserDO();
        user.setNickname(nickname);

        return dao.selectOne(user);
    }

    @Override
    @Transactional(rollbackFor = RuntimeException.class)
    @CacheEvict(cacheNames = {CACHE_OBJECT,CACHE_PAGE},allEntries = true)
    public UserDTO saveUser(UserDO user){
        UserDTO dto = null;

        user = this.save(user);
        if(user != null){
            dto = this.getUserDTO(user.getId());
        }

        return dto;
    }

    @Override
    @Transactional(rollbackFor = RuntimeException.class)
    @CacheEvict(cacheNames = {CACHE_OBJECT,CACHE_PAGE},allEntries = true)
    public boolean promoteAdmin(int id) {
        final RoleEnum admin = RoleEnum.ADMIN;

        UserDO user = super.getByID(id);
        if(user.getRole() == admin.getId()){
            throw new CommonException("该用户已经是管理员了！");
        }
        
        user.setRole(admin.getId());
        return dao.updateByPrimaryKeySelective(user) > 0;
    }

    @Override
    @Transactional(rollbackFor = RuntimeException.class)
    @CacheEvict(cacheNames = {CACHE_OBJECT,CACHE_PAGE},allEntries = true)
    public boolean demoteAdmin(int id) {
        final RoleEnum visitor = RoleEnum.VISITOR;

        UserDO user = super.getByID(id);
        if(user.getRole() == visitor.getId()){
            throw new CommonException("该用户已经是访客了！");
        }

        user.setRole(visitor.getId());
        return dao.updateByPrimaryKeySelective(user) > 0;
    }

    @Override
    @Transactional(rollbackFor = RuntimeException.class)
    @CacheEvict(cacheNames = {CACHE_OBJECT,CACHE_PAGE},allEntries = true)
    public boolean lockUser(int id) {
        final StatusEnum locked = StatusEnum.LOCKED;

        UserDO user = super.getByID(id);
        if(user.getStatus() == locked.getId()){
            throw new CommonException("该用户已经被锁定了！");
        }

        user.setStatus(locked.getId());
        return dao.updateByPrimaryKeySelective(user) > 0;
    }

    @Override
    @Transactional(rollbackFor = RuntimeException.class)
    @CacheEvict(cacheNames = {CACHE_OBJECT,CACHE_PAGE},allEntries = true)
    public boolean unlockUser(int id) {
        final StatusEnum normal = StatusEnum.NORMAL;

        UserDO user = super.getByID(id);
        if(user.getStatus() == normal.getId()){
            throw new CommonException("该用户没有被锁定");
        }

        user.setStatus(normal.getId());
        return dao.updateByPrimaryKeySelective(user) > 0;
    }

    @Override
    @Cacheable(cacheNames = CACHE_PAGE)
    public PageInfo<UserDTO> listUser(Query<UserDO> query){
        PageInfo<UserDO> pageInfo = super.listByCondition(query);
        return this.produceDTOPageInfo(pageInfo);
    }

    /**
     * 检查{@link UserDO#username}和{@link UserDO#nickname}是否存在重复
     * 如果存在重复则会抛出{@link FieldErrorException}
     * @param user 检查的用户对象
     */
    private void checkUserInfo(UserDO user){
        final String fieldUsername = "username";
        final String fieldNickname = "nickname";

        UserDO oldUser;
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

    /**
     * 将DO封装为DTO
     * @param user DO
     * @return DTO
     */
    private UserDTO produceDTO(UserDO user){
        if(user == null){
            return null;
        }

        user.setPassword(null);
        return new UserDTO(user);
    }

    /**
     * 将DO分页对象封装为DTO分页对象
     * @param pageInfo DO分页对象
     * @return DTO分页对象
     */
    private PageInfo<UserDTO> produceDTOPageInfo(PageInfo<UserDO> pageInfo) {
        List<UserDTO> pojoList = new ArrayList<>();
        for (UserDO u : pageInfo.getList()) {
            u.setPassword(null);
            UserDTO pojo = this.produceDTO(u);
            pojoList.add(pojo);
        }

        return PageUtils.copyNewInfo(pageInfo, pojoList);
    }
}
