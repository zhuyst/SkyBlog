package indi.zhuyst.skyblog.setting;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

/**
 * 阿里云OSS服务相关配置
 * @author zhuyst
 */
@Data
@Component
@ConfigurationProperties(prefix = "skyblog.oss")
public class OssSettings {

    /**
     * Bucket的EndPoint
     */
    private String endPoint;

    /**
     * 访问文件时的域名
     */
    private String accessDomain;

    /**
     * 阿里云账号的AccessKeyId
     */
    private String accessKeyId;

    /**
     * 阿里云账号的AccessKeySecret
     */
    private String accessKeySecret;

    /**
     * 上传的Bucket
     */
    private String bucketName;
}
