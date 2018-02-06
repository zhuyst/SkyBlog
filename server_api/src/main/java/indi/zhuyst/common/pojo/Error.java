package indi.zhuyst.common.pojo;

import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

/**
 * 字段错误对象，与{@link indi.zhuyst.common.exception.FieldErrorException}配合使用
 * @see indi.zhuyst.common.exception.FieldErrorException#errors
 * @author zhuyst
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Error implements Serializable{

    private static final long serialVersionUID = 4926021473074809322L;

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

    /**
     * 发生未知错误使用字段错误构造器
     * @param isUnknown 是否为未知错误
     */
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
