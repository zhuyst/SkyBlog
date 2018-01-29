package indi.zhuyst.common.pojo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Error {

    private static final String UNKNOWN_ERROR = "unknown";

    private String field;

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
