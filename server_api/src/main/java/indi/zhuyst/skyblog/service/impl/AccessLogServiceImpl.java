package indi.zhuyst.skyblog.service.impl;

import com.github.pagehelper.PageInfo;
import indi.zhuyst.common.config.RedisConfig;
import indi.zhuyst.common.pojo.Query;
import indi.zhuyst.common.service.impl.BaseCrudServiceImpl;
import indi.zhuyst.common.util.PageUtils;
import indi.zhuyst.security.pojo.SecurityUser;
import indi.zhuyst.security.util.IpUtils;
import indi.zhuyst.security.util.SecurityUtils;
import indi.zhuyst.skyblog.dao.AccessLogDao;
import indi.zhuyst.skyblog.entity.AccessLogDO;
import indi.zhuyst.skyblog.pojo.AccessLogDTO;
import indi.zhuyst.skyblog.pojo.UserDTO;
import indi.zhuyst.skyblog.service.AccessLogService;
import indi.zhuyst.skyblog.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.support.atomic.RedisAtomicLong;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * 访问日志服务实现类
 * @author zhuyst
 */
@Service("accessLogService")
public class AccessLogServiceImpl extends BaseCrudServiceImpl<AccessLogDao,AccessLogDO> 
        implements AccessLogService,CommandLineRunner{

    private static final String LOG_COUNT_KEY = RedisConfig.DATA_KEY_PREFIX + "ACCESS_LOG_COUNT";

    private final UserService userService;

    private final RedisConnectionFactory connectionFactory;

    private RedisAtomicLong logCount;

    @Autowired
    public AccessLogServiceImpl(UserService userService,
                                RedisConnectionFactory connectionFactory){
        this.userService = userService;
        this.connectionFactory = connectionFactory;
    }

    @Override
    public void run(String... strings) {
        logCount = new RedisAtomicLong(LOG_COUNT_KEY, connectionFactory);
    }

    @Override
    @Transactional(rollbackFor = RuntimeException.class)
    public AccessLogDO save(AccessLogDO entity) {
        logCount.incrementAndGet();
        entity.setAccessDate(new Date());
        return super.save(entity);
    }

    @Override
    public long countAll() {
        return logCount.get();
    }

    @Override
    public AccessLogDTO getAccessLogDTO(int id) {
        AccessLogDO accessLog = super.getByID(id);
        return this.produceDTO(accessLog);
    }

    @Override
    public PageInfo<AccessLogDTO> listAccessLogDTO(Query<AccessLogDO> query) {
        PageInfo<AccessLogDO> pageInfo = super.listByCondition(query);
        return this.produceDTOPageInfo(pageInfo);
    }

    @Override
    @Transactional(rollbackFor = RuntimeException.class)
    public AccessLogDO save(HttpServletRequest request) {
        AccessLogDO accessLog = new AccessLogDO();

        String ip = IpUtils.getIpAdrress(request);
        accessLog.setIp(ip);

        if(SecurityUtils.checkLogin()){
            SecurityUser user = SecurityUtils.getUser();
            accessLog.setUserId(user.getId());
        }

        return this.save(accessLog);
    }

    /**
     * 将DO封装为DTO
     * @param accessLog DO
     * @return 封装后的DTO
     */
    private AccessLogDTO produceDTO(AccessLogDO accessLog){
        if(accessLog == null){
            return null;
        }

        AccessLogDTO dto = new AccessLogDTO(accessLog);

        Integer userId = accessLog.getUserId();
        if(userId != null){
            UserDTO user = userService.getUserDTO(userId);
            if(user != null){
                dto.setUser(user);
            }
        }

        return dto;
    }

    /**
     * 将DO分页对象封装为DTO分页对象
     * @param pageInfo DO分页对象
     * @return DTO分页对象
     */
    private PageInfo<AccessLogDTO> produceDTOPageInfo(PageInfo<AccessLogDO> pageInfo){
        List<AccessLogDTO> list = new ArrayList<>(pageInfo.getSize());
        for(AccessLogDO accessLog : pageInfo.getList()){
            AccessLogDTO dto = this.produceDTO(accessLog);
            list.add(dto);
        }
        return PageUtils.copyNewInfo(pageInfo,list);
    }
}
