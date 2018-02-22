package indi.zhuyst.skyblog.controller;

import com.github.pagehelper.PageInfo;
import indi.zhuyst.common.controller.BaseController;
import indi.zhuyst.common.enums.CodeEnum;
import indi.zhuyst.common.exception.CommonException;
import indi.zhuyst.common.pojo.Query;
import indi.zhuyst.common.pojo.R;
import indi.zhuyst.security.enums.RoleEnum;
import indi.zhuyst.security.pojo.AccessToken;
import indi.zhuyst.security.pojo.SecurityUser;
import indi.zhuyst.security.service.SecurityService;
import indi.zhuyst.skyblog.entity.User;
import indi.zhuyst.skyblog.pojo.UserDTO;
import indi.zhuyst.skyblog.service.UserService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.method.P;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@Api(value = "UserApi",description = "用户相关API")
@RequestMapping("/users")
public class UserController extends BaseController{

    @Autowired
    private UserService userService;

    @Autowired
    private SecurityService securityService;

    @RequestMapping(value = "/{id}",method = RequestMethod.PUT)
    @ApiOperation("更新用户信息")
    @PreAuthorize("hasAnyRole('SYS_ADMIN','ADMIN') or #id == authentication.principal.id")
    public R<UserDTO> updateUser(@ApiParam("用户ID") @PathVariable("id") @P("id") Integer id,
                                 @ApiParam("用户对象") @Valid @RequestBody User user){
        user.setId(id);
        UserDTO pojo = userService.saveUser(user);
        return produceResult(pojo,"用户信息更新失败");
    }

    @RequestMapping(value = "/{id}",method = RequestMethod.GET)
    @ApiOperation("根据id获取用户信息")
    @PreAuthorize("hasAnyRole('SYS_ADMIN','ADMIN') or #id == authentication.principal.id")
    public R<UserDTO> getUser(@ApiParam("用户ID") @PathVariable("id") @P("id") Integer id){
        UserDTO user = userService.getUserDTO(id);
        return produceResult(user, CodeEnum.NOT_FOUND.getCode(),"未找到该用户");
    }

    @RequestMapping(value = "/public/",method = RequestMethod.POST)
    @ApiOperation("注册新用户")
    public R<AccessToken> register(@ApiParam("用户对象") @Valid @RequestBody User newUser){
        newUser.setId(null);

        User user = userService.save(newUser);
        if(user == null){
            throw new CommonException("用户注册失败");
        }

        SecurityUser securityUser = new SecurityUser(user);
        AccessToken accessToken = securityService.generateToken(securityUser);
        return R.ok(accessToken);
    }

    @RequestMapping(value = "/{id}",method = RequestMethod.DELETE)
    @ApiOperation("根据id删除用户")
    @PreAuthorize("hasAnyRole('SYS_ADMIN','ADMIN')")
    public R deleteUser(@ApiParam("用户ID") @PathVariable("id")Integer id){
        return produceResult(userService.delete(id),"不存在该用户");
    }

    @RequestMapping(value = "/list/",method = RequestMethod.GET)
    @ApiOperation("查询用户列表")
    @PreAuthorize("hasAnyRole('SYS_ADMIN','ADMIN')")
    public R<PageInfo<UserDTO>> listUser(Query query){
        PageInfo<UserDTO> pageInfo = userService.listUser(new Query<>(query));
        return R.ok(pageInfo);
    }

    @RequestMapping(value = "/role/{id}/{roleId}",method = RequestMethod.PATCH)
    @ApiOperation("更新用户角色")
    @PreAuthorize("hasRole('SYS_ADMIN')")
    public R updateUserRole(@ApiParam("用户ID") @PathVariable("id")Integer id,
                            @ApiParam("角色ID") @PathVariable("roleId")Integer roleId){
        boolean isSuccess = false;
        if(roleId == RoleEnum.ADMIN.getId()){
            isSuccess = userService.promoteAdmin(id);
        }
        else if(roleId == RoleEnum.VISITOR.getId()){
            isSuccess = userService.demoteAdmin(id);
        }

        return produceResult(isSuccess,"更新用户角色失败");
    }
}
