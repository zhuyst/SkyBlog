# SkyBlog中的Token认证机制

## Session认证与Token认证的取舍

在项目刚刚开始的时候，我还是规划使用`Session认证`的，期间遇到了不少问题。

1. Session认证是通过把Cookie交给服务端管理的，而fetch在设置credentials时又会要求CORS的`Access-Control-Allow-Origin`不能设置为*，必须指定域名。
2. 前后端分离中，前端还是自行管理状态才是真正的前后端分离
3. 后台提供的RESTfulAPI，指定域名不符合RESTful的设计要求

所以最终我决定改用`Token认证`，不过不使用OAuth2，而是自己编写相关逻辑

Token的生成使用的是`JWT`，减少请求时对数据库的查询

## Token认证源码解析

项目是使用`Spring Security`作为安全框架，对用户进行认证、权限管理，所以要集成`JWT`的话，有几点要关注：

1. 将存储在Header中的`JWT`转换为`Spring Security`的`UserDetails`
2. 将必要的信息存储在Token当中，返回给用户
3. 提供获取、刷新Token的接口

所以就有了以下几个类

### TokenFilter

负责将请求中的Token转换为`UsernamePasswordAuthenticationToken`

```java
        // 有时请求会错误发送null与undefined
        final String nullStr = "null";
        final String undefinedStr = "undefined";

        String token = getRequestToken(request);

        // 如果token不存在，则直接放行，由之后的Filter拦截
        if(StringUtils.isBlank(token) ||
                nullStr.equals(token) ||
                undefinedStr.equals(token)) {
            chain.doFilter(request,response);
            return;
        }

        // 从Token中读取User，设置Authentication
        SecurityUser user = securityService.getUserByToken(token);
        if(user != null && SecurityUtils.getAuthentication() == null){
            UsernamePasswordAuthenticationToken authenticationToken =
                    new UsernamePasswordAuthenticationToken(user,null,user.getAuthorities());
            authenticationToken.setDetails(new WebAuthenticationDetails(request));
            SecurityContextHolder.getContext().setAuthentication(authenticationToken);
        }

        chain.doFilter(request,response);
```

### SecurityService

负责提供Token相关的服务

1. 登陆时，调用`Spring Security`的`AuthenticationManager`，对用户进行验证，并在验证通过时生成Token
2. Token中包装了三段重要的信息：`id、username、role`，通过这些信息便足以组成一个用户的基本对象
3. 服务提供了从Token中获取各类信息的方法，也提供了验证Token是否合法、过期的方法，确保Token的可靠性

```java
   @Override
    public AccessToken login(String username, String password) {
        UsernamePasswordAuthenticationToken authRequest = new UsernamePasswordAuthenticationToken(
                username, password);

        HttpServletRequest request = ServletUtils.getRequest();
        authRequest.setDetails(new WebAuthenticationDetails(request));

        try{
            Authentication authentication = authenticationManager.authenticate(authRequest);
            SecurityUser user = (SecurityUser) authentication.getPrincipal();

            return generateToken(user);
        }catch (BadCredentialsException e){
            throw new CommonException("用户名/密码不正确");
        }catch (LockedException e){
            throw new CommonException("账号被锁定，请联系管理员");
        }
    }

    @Override
    public AccessToken generateToken(SecurityUser user) {
        if(user.getLocked()){
            throw new CommonException("账号被锁定，请联系管理员");
        }

        AccessToken accessToken = new AccessToken();
        long expire = jwtSettings.getExpire();

        Date nowDate = new Date();
        Date expireDate = new Date(nowDate.getTime() + expire * 1000);

        // 构建JWT
        String token = Jwts.builder()

                // 将User的标识信息放入JWT中
                .setSubject(String.valueOf(user.getId()))
                .claim(CLAIM_USERNAME,user.getUsername())
                .claim(CLAIM_ROLE,user.getRole())

                // 设置过期时间
                .setIssuedAt(nowDate)
                .setExpiration(expireDate)

                // 设置加密方式
                .signWith(SignatureAlgorithm.HS512,
                        jwtSettings.getSecret())
                .compact();

        accessToken.setToken(token);
        accessToken.setExpire(expire);
        accessToken.setUser(user);

        return accessToken;
    }
``` 

### AuthController

负责提供登陆以及刷新Token的接口

```java
   /**
     * @param username 用户名
     * @param password 密码
     * @return AccessToken
     */
    @ApiOperation(value = "登陆，获取Token")
    @RequestMapping(value = "/login",method = RequestMethod.POST)
    public Result<AccessToken> login(@ApiParam("用户名") @RequestParam String username,
                                     @ApiParam("密码") @RequestParam String password) {
        AccessToken accessToken = securityService.login(username,password);
        return Result.ok(accessToken);
    }

    /**
     * 通过老Token换取新Token
     * @param token 老Token
     * @return 新Token
     */
    @ApiOperation("通过老Token换取新Token")
    @RequestMapping(value = "/refresh",method = RequestMethod.POST)
    public Result<AccessToken> refresh(@ApiParam("老Token") @RequestParam String token){
        Integer userId = securityService.getIDByToken(token);
        UserDO user = userService.getByID(userId);

        AccessToken accessToken = securityService.generateToken(new SecurityUser(user));
        return Result.ok(accessToken);
    }
```

至此，便完成了`Spring Security`和`JWT`的整合便完成了。

