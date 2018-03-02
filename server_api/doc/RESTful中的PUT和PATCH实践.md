# RESTful中的PUT和PATCH实践

先放上后台的在线API文档：[SkyBlog Swagger API](https://api.zhuyst.cc/swagger-ui.html)

在UserApi中，有这样三个接口
1. PUT /users/{id} 更新用户信息
2. PATCH /users/role/{id} 更新用户角色
3. PATCH /users/status/{id} 更新用户状态

在这三个接口便可以看出PUT和PATCH的区别
PUT方法主要是用来`更新整个资源`的，而PATCH方法主要是用来`执行某项操作并更新资源的某些字段`

而在项目中，这三个接口需要的用户权限也不一样

### PUT /users/{id} 更新用户信息

要求是系统管理员、管理员或者是用户本人，才能使用该接口

```java
    /**
     * 更新用户信息
     * @param id 用户ID
     * @param user 用户对象
     * @return 更新后的用户
     */
    @PutMapping("/{id}")
    @ApiOperation("更新用户信息")
    @PreAuthorize("hasAnyRole('SYS_ADMIN','ADMIN') or #id == authentication.principal.id")
    @SysLog(resource = RESOURCE_USER,type = SysLogTypeEnum.UPDATE)
    public Result<UserDTO> updateUser(@ApiParam("用户ID") @PathVariable("id") @P("id") Integer id,
                                      @ApiParam("用户对象") @Valid @RequestBody UserDO user)
```

### PATCH /users/role/{id} 更新用户角色

要求是系统管理员才能使用该接口

```java
    /**
     * 更新用户角色
     * @param id 用户ID
     * @param update 更新角色对象
     * @return 结果对象
     */
    @PatchMapping("/role/{id}")
    @ApiOperation("更新用户角色")
    @PreAuthorize("hasRole('SYS_ADMIN')")
    @SysLog(resource = "用户权限",type = SysLogTypeEnum.UPDATE)
    public Result updateUserRole(@ApiParam("用户ID") @PathVariable("id")Integer id,
                                 @ApiParam("角色ID") @Valid @RequestBody UpdateRole update)
```

### PATCH /users/status/{id} 更新用户状态

要求是系统管理员、管理员才能使用该接口

```java
    /**
     * 更新用户状态
     * @param id 用户ID
     * @param update 更新状态对象
     * @return 结果对象
     */
    @ApiOperation("更新用户状态")
    @PatchMapping("/status/{id}")
    @PreAuthorize("hasAnyRole('SYS_ADMIN','ADMIN')")
    @SysLog(resource = "用户状态",type = SysLogTypeEnum.UPDATE)
    public Result updateUserStatus(@ApiParam("角色ID") @PathVariable("id") Integer id,
                                   @ApiParam("状态ID") @Valid @RequestBody UpdateStatus update)
```

所以PUT和PATCH的使用场景，便可以在这三个接口中体现