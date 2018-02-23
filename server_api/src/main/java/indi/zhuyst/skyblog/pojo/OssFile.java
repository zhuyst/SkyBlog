package indi.zhuyst.skyblog.pojo;

import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * 向OSS上传文件后返回的内容
 * @author zhuyst
 */
@Data
public class OssFile {

    private String url;
    
    public OssFile(String url){
        this.url = url;
    }
}
