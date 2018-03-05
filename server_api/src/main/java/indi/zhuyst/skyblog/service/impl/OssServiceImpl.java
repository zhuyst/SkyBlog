package indi.zhuyst.skyblog.service.impl;

import com.aliyun.oss.ClientConfiguration;
import com.aliyun.oss.OSSClient;
import com.aliyun.oss.common.auth.CredentialsProvider;
import com.aliyun.oss.common.auth.DefaultCredentialProvider;
import com.aliyun.oss.model.ObjectMetadata;
import com.aliyun.oss.model.PutObjectRequest;
import indi.zhuyst.common.exception.CommonException;
import indi.zhuyst.skyblog.pojo.OssFile;
import indi.zhuyst.skyblog.service.OssService;
import indi.zhuyst.skyblog.setting.OssSettings;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.PreDestroy;

/**
 * 阿里云OSS服务实现类
 * @author zhuyst
 */
@Service("ossService")
public class OssServiceImpl implements OssService,CommandLineRunner{

    private final OssSettings ossSettings;

    private OSSClient ossClient;

    @Autowired
    public OssServiceImpl(OssSettings ossSettings) {
        this.ossSettings = ossSettings;
    }

    /**
     * 通过{@link #ossSettings}初始化{@link #ossClient}
     */
    @Override
    public void run(String... args) {
        CredentialsProvider credentialsProvider =
                new DefaultCredentialProvider(ossSettings.getAccessKeyId(),
                        ossSettings.getAccessKeySecret());

        ClientConfiguration clientConfiguration = new ClientConfiguration();

        ossClient = new OSSClient(ossSettings.getEndPoint(),
                credentialsProvider,clientConfiguration);
    }

    /**
     * 关闭{@link #ossClient}
     */
    @PreDestroy
    private void destroy(){
        ossClient.shutdown();
    }

    @Override
    public OssFile upload(MultipartFile file) {
        try {
            String fileName = System.currentTimeMillis() + file.getOriginalFilename();
            ObjectMetadata metadata = new ObjectMetadata();
            metadata.setContentType(file.getContentType());
            metadata.setContentLength(file.getSize());

            PutObjectRequest request = new PutObjectRequest(
                    ossSettings.getBucketName(),
                    fileName,file.getInputStream());

            ossClient.putObject(request);
            String url = ossSettings.getAccessDomain() + "/" + fileName;
            return new OssFile(url);
        } catch (Exception e) {
            throw new CommonException("文件上传失败");
        }
    }
}
