package indi.zhuyst.skyblog.service;

import com.github.pagehelper.PageInfo;
import indi.zhuyst.common.pojo.Query;
import indi.zhuyst.common.service.BaseCrudService;
import indi.zhuyst.skyblog.entity.UserDO;
import indi.zhuyst.skyblog.pojo.UserDTO;
import org.springframework.security.core.userdetails.UserDetailsService;

/**
 * 用户服务接口
 * @author zhuyst
 */
public interface UserService extends BaseCrudService<UserDO>,UserDetailsService{

    /**
     * 管理员的ID
     * @see UserDO#id
     */
    int ADMIN_KEY = 1;

    /**
     * 缓存 - 对象
     */
    String CACHE_OBJECT = "user";

    /**
     * 缓存 - 分页对象
     */
    String CACHE_PAGE = "user_page";

    /**
     * 根据ID获取用户DTO
     * @param id 用户ID
     * @return 用户DTO
     */
    UserDTO getUserDTO(int id);

    /**
     * 根据用户名获取用户对象
     * @param username 用户名
     * @return 用户对象
     */
    UserDO getByUsername(String username);

    /**
     * 根据昵称获取用户对象
     * @param nickname 昵称
     * @return 用户对象
     */
    UserDO getByNickName(String nickname);

    /**
     * 保存用户并且返回用户DTO
     * @param user 用户对象
     * @return 保存后的用户DTO
     */
    UserDTO saveUser(UserDO user);

    /**
     * 提升用户为管理员{@link indi.zhuyst.security.enums.RoleEnum#ADMIN}
     * @see UserDO#role
     * @param id 用户ID
     * @return 结果
     */
    boolean promoteAdmin(int id);

    /**
     * 降低用户为访客{@link indi.zhuyst.security.enums.RoleEnum#VISITOR}
     * @see UserDO#role
     * @param id 用户ID
     * @return 结果
     */
    boolean demoteAdmin(int id);

    /**
     * 锁定用户{@link indi.zhuyst.security.enums.StatusEnum#LOCKED}
     * @see UserDO#status
     * @param id 用户ID
     * @return 结果
     */
    boolean lockUser(int id);

    /**
     * 解锁用户{@link indi.zhuyst.security.enums.StatusEnum#NORMAL}
     * @see UserDO#status
     * @param id 用户ID
     * @return 结果
     */
    boolean unlockUser(int id);

    /**
     * 获取用户DTO分页对象
     * @param query 查询对象
     * @return 用户DTO分页对象
     */
    PageInfo<UserDTO> listUser(Query<UserDO> query);

}
