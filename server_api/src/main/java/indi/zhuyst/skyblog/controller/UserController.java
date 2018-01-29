package indi.zhuyst.skyblog.controller;

import com.github.pagehelper.PageInfo;
import indi.zhuyst.common.controller.BaseController;
import indi.zhuyst.skyblog.entity.User;
import indi.zhuyst.common.pojo.R;
import indi.zhuyst.skyblog.pojo.UserDTO;
import indi.zhuyst.skyblog.service.UserService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.method.P;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@Api(value = "UserApi",description = "用户相关API")
@RequestMapping("/api/users")
public class UserController extends BaseController{

    @Autowired
    private UserService userService;

//    @RequestMapping(value = "/public/isLogin",method = RequestMethod.GET)
//    @ApiOperation(value = "判断用户是否登陆")
//    public R<User> isLogin(){
//
//        boolean isLogin = SecurityUtil.isLogin();
//        if(isLogin){
//            r.setCode(R.SUCCESS_CODE);
//
//            User user = SecurityUtil.getUser();
//            r.setEntity(user);
//        }
//        else {
//            r.setCode(R.ERROR_CODE);
//            r.setMessage("用户未登录");
//        }
//
//        return r;
//    }

    @RequestMapping(value = "/{id}",method = RequestMethod.PUT)
    @ApiOperation(value = "更新用户信息")
    @PreAuthorize("hasAnyRole('SYS_ADMIN','ADMIN') or #id==authentication.principal.id")
    public R<UserDTO> updateUser(@PathVariable("id") @P("id") Integer id,
                                 @Valid @RequestBody User user){
        user.setId(id);
        UserDTO pojo = userService.saveUser(user);
        return produceResult(pojo,"用户信息更新失败");
    }

    @RequestMapping(value = "/{id}",method = RequestMethod.GET)
    @ApiOperation(value = "根据id获取用户信息")
    @PreAuthorize("hasAnyRole('SYS_ADMIN','ADMIN') or #id==authentication.principal.id")
    public R<UserDTO> getUser(@PathVariable("id") @P("id") Integer id){
        UserDTO user = userService.getUserDTO(id);
        return produceResult(user,"未找到该用户");
    }

    @RequestMapping(value = "/public/",method = RequestMethod.POST)
    @ApiOperation(value = "注册新用户")
    public R<UserDTO> register(@Valid @RequestBody User newUser){
        UserDTO pojo = userService.saveUser(newUser);
        return produceResult(pojo,"用户注册失败");
    }

    @RequestMapping(value = "/{id}",method = RequestMethod.DELETE)
    @ApiOperation(value = "根据id删除用户")
    @PreAuthorize("hasAnyRole('SYS_ADMIN','ADMIN')")
    public R deleteUser(@PathVariable("id")Integer id){
        return produceResult(userService.delete(id),"不存在该用户");
    }

    @RequestMapping(value = "/list/{pageNum}",method = RequestMethod.GET)
    @ApiOperation(value = "查询用户列表")
    @PreAuthorize("hasAnyRole('SYS_ADMIN','ADMIN')")
    public R<PageInfo<UserDTO>> listUser(@PathVariable("pageNum")Integer pageNum){
        PageInfo<UserDTO> pageInfo = userService.listUser(pageNum,new User());
        return R.ok(pageInfo);
    }
}
