package indi.zhuyst.skyblog.setting;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;

/**
 * 阿里云OSS服务相关配置
 * @author zhuyst
 */
@Data
@ConfigurationProperties(prefix = "skyblog.oss")
public class OssSettings {

    /**
     * Bucket的EndPoint
     */
    private String endPoint;

    /**
     * 阿里云账号的AccessKeyId
     */
    private String accessKeyId;

    /**
     * 阿里云账号的AccessKeySecret
     */
    private String accessKeySecret;
}
