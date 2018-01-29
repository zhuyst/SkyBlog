package indi.zhuyst.skyblog.controller;

import indi.zhuyst.common.controller.BaseController;
import indi.zhuyst.common.pojo.R;
import indi.zhuyst.common.util.ServletUtil;
import indi.zhuyst.security.pojo.AccessToken;
import indi.zhuyst.security.service.SecurityService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
@Api(value = "AuthApi",description = "授权相关API")
public class AuthController extends BaseController{

    @Autowired
    private SecurityService securityService;

    @ApiOperation("登陆，获取Token")
    @RequestMapping(value = "/login",method = RequestMethod.POST)
    public R<AccessToken> login(String username, String password) {
        return null;
    }

    @ApiOperation("通过老Token换取新Token")
    @RequestMapping(value = "/refresh",method = RequestMethod.POST)
    public R<AccessToken> refresh(String token){
        String username = securityService.getUsernameByToken(token);
        AccessToken accessToken = securityService.generateToken(username);
        return R.ok(accessToken);
    }
}
