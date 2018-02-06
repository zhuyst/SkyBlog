package indi.zhuyst.common.pojo;

import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * 字段错误对象
 * @author zhuyst
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Error {

    /**
     * 未知错误使用字段
     * @see #field
     */
    private static final String UNKNOWN_ERROR = "unknown";

    /**
     * 错误字段
     */
    @ApiModelProperty("字段")
    private String field;

    /**
     * 错误信息
     */
    @ApiModelProperty("错误信息")
    private String message;

    public Error(boolean isUnknown){
        if(isUnknown){
            this.field = UNKNOWN_ERROR;
            this.message = "未知错误";
        }
    }

    @Override
    public String toString(){
        return field + ":" + message;
    }
}
