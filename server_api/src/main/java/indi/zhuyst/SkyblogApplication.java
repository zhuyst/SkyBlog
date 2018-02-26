package indi.zhuyst;

import indi.zhuyst.common.dao.BaseDao;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * Spring Boot启动类
 * @author zhuyst
 */
@SpringBootApplication
@MapperScan(basePackages = "indi.zhuyst.skyblog.dao",markerInterface = BaseDao.class)
public class SkyblogApplication {

	public static void main(String[] args) {
		SpringApplication.run(SkyblogApplication.class, args);
	}
}
