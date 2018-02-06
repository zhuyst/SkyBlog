package indi.zhuyst.security.controller;

import indi.zhuyst.common.controller.BaseController;
import indi.zhuyst.common.enums.CodeEnum;
import indi.zhuyst.common.pojo.R;
import indi.zhuyst.security.pojo.AccessToken;
import indi.zhuyst.security.service.SecurityService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
@Api(value = "AuthApi",description = "授权相关API")
public class AuthController extends BaseController{

    @Autowired
    private SecurityService securityService;

    /**
     * 欺骗Swagger的扫描，正式的登陆授权由Spring Security完成
     * @see indi.zhuyst.security.config.WebSecurityConfig#configure(HttpSecurity)
     * @param username 用户名
     * @param password 密码
     * @return AccessToken
     */
    @ApiOperation(value = "登陆，获取Token",httpMethod = "POST")
    @RequestMapping(value = "/login",method = RequestMethod.PUT)
    public R<AccessToken> login(String username, String password) {
        return R.ok(new AccessToken());
    }

    /**
     * 当需要登陆的请求没包含Token时访问的地址
     * @return Token缺失提醒
     */
    @RequestMapping(value = "/login",method = RequestMethod.GET)
    public R loginGET(){
        return R.error(CodeEnum.FORBIDDEN.getCode(),"请求参数中没有包含Token");
    }

    @ApiOperation("通过老Token换取新Token")
    @RequestMapping(value = "/refresh",method = RequestMethod.POST)
    public R<AccessToken> refresh(String token){
        String username = securityService.getUsernameByToken(token);
        AccessToken accessToken = securityService.generateToken(username);
        return R.ok(accessToken);
    }
}
