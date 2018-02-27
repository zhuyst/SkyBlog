package indi.zhuyst.skyblog.enums;

import indi.zhuyst.skyblog.annotation.SysLog;

/**
 * 系统日志类型
 * @see SysLog
 * @author zhuyst
 */
public enum SysLogType {

    /**
     * 未定义
     * @see SysLog#type() 默认值
     */
    UNDEFINED("未定义"),

    /**
     * 查询
     */
    QUERY("查询"),

    /**
     * 新增
     */
    INSERT("新增"),

    /**
     * 更新
     */
    UPDATE("更新"),

    /**
     * 删除
     */
    DELETE("删除");

    private String name;

    SysLogType(String name){
        this.name = name;
    }

    public String getName() {
        return name;
    }
}
