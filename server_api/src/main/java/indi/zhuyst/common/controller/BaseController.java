package indi.zhuyst.common.controller;

import indi.zhuyst.common.enums.CodeEnum;
import indi.zhuyst.common.pojo.Result;
import indi.zhuyst.security.pojo.SecurityUser;
import indi.zhuyst.security.util.SecurityUtils;
import io.swagger.annotations.ApiOperation;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * 基础Controller
 * @author zhuyst
 */
public abstract class BaseController {

    /**
     * 日志对象
     */
    protected Logger logger = LoggerFactory.getLogger(this.getClass());

    /**
     * 公共接口，无需授权
     * @see ApiOperation#notes()
     */
    protected static final String NOTES_PUBLIC = "公共接口，无需授权";

    /**
     * 需要授权后才能使用
     * @see indi.zhuyst.security.annotation.LoginAuthorize
     * @see ApiOperation#notes()
     */
    protected static final String NOTES_PROTECTED = "需要授权后才能使用";

    /**
     * 需要系统管理员或管理员权限，或者操作者是调用者本人
     * @see indi.zhuyst.security.annotation.SelfAuthorize
     * @see ApiOperation#notes()
     */
    protected static final String NOTES_SELF = "需要系统管理员或管理员权限，或者操作者是调用者本人";

    /**
     * 需要系统管理员或管理员权限
     * @see indi.zhuyst.security.annotation.AdminAuthorize
     * @see ApiOperation#notes()
     */
    protected static final String NOTES_ADMIN = "需要系统管理员或管理员权限";

    /**
     * 需要系统管理员权限
     * @see indi.zhuyst.security.annotation.SysAdminAuthorize
     * @see ApiOperation#notes()
     */
    protected static final String NOTES_SYS_ADMIN = "需要系统管理员权限";

    /**
     * 通过判断pojo是否为NULL，生成结果对象
     * NULL - 错误，{@link indi.zhuyst.common.enums.CodeEnum#ERROR}
     * NOT NULL - 成功，{@link indi.zhuyst.common.enums.CodeEnum#SUCCESS}
     * @param pojo 要判断的pojo
     * @param errorMsg 错误信息
     * @param <T> 对象类型
     * @return 结果对象
     */
    protected <T> Result<T> produceResult(T pojo, String errorMsg){
        return this.produceResult(pojo, CodeEnum.ERROR.getCode(),errorMsg);
    }

    /**
     * 通过判断pojo是否为NULL，生成结果对象
     * NULL - 错误，指定错误码
     * NOT NULL - 成功，{@link indi.zhuyst.common.enums.CodeEnum#SUCCESS}
     * @param pojo 要判断的pojo
     * @param code 错误码
     * @param errorMsg 错误信息
     * @param <T> 对象类型
     * @return 结果对象
     */
    protected <T> Result<T> produceResult(T pojo, int code, String errorMsg){
        return pojo == null ? Result.error(code,errorMsg) : Result.ok(pojo);
    }

    /**
     * 通过判断是否成功，生成结果对象
     * TRUE - 成功，{@link indi.zhuyst.common.enums.CodeEnum#SUCCESS}
     * FALSE - 错误，{@link indi.zhuyst.common.enums.CodeEnum#ERROR}
     * @param isSuccess 是否成功
     * @param errorMsg 错误信息
     * @return 结果对象
     */
    protected Result produceResult(boolean isSuccess, String errorMsg){
        return isSuccess ? Result.ok() : Result.error(errorMsg);
    }

    /**
     * 获取当前登录用户
     * @return 用户对象
     */
    protected SecurityUser getUser(){
        return SecurityUtils.getUser();
    }
}
