package indi.zhuyst.skyblog.pojo;

import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * 向OSS上传文件后返回的内容
 * @author zhuyst
 */
@Data
public class OssFile {

    /**
     * 访问文件的完整文件URL
     */
    @ApiModelProperty("文件URL")
    private String url;
    
    public OssFile(String url){
        this.url = url;
    }
}
