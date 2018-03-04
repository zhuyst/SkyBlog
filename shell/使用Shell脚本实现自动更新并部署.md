# 使用Shell脚本实现自动更新并部署

先放上前端与后台的Shell代码

## deploy_client_web

```sh
# 引用工程路径
PROJECT_PATH=/data/SkyBlog/client_web/

# 工程构建完成后存放的路径
BUILD_PATH=${PROJECT_PATH}/build/

# 页面部署在Apache的路径
APACHE_DEPLOY_PATH=/data/wwwroot/default/skyblog/

# 更新工程
git pull

# 检查工程依赖项
npm install $PROJECT_PATH

# 构建工程
npm run build $PROJECT_PATH

# 删除旧构建文件
rm -r ${APACHE_DEPLOY_PATH}*

# 将新构建的文件移至Apache目录下
cp -R ${BUILD_PATH}* $APACHE_DEPLOY_PATH
```

## deploy_server_api

```sh
# 应用名，用来查找进程
APP_NAME=skyblog

# 引用工程路径
PROJECT_PATH=/data/SkyBlog/server_api/

# 打包JAR的路径
PROJECT_JAR_PATH=${PROJECT_PATH}/target/skyblog-1.0.0-RELEASE.jar

# 获取应用的PID
PID=$(ps aux | grep $APP_NAME | grep -v grep | awk '{printf $2}')

# 更新工程
git pull

# 如果应用正在运行，则强制终止进程
if [ -n "$PID" ];then
	kill $PID
fi

# 构建工程
sh mvn clean package -f $PROJECT_PATH

# 启动应用
nohup java -jar $PROJECT_JAR_PATH &
```

## 解析
两个更新部署思路非常相似，都是这样一个流程

1. git仓库更新
2. 停止/删除旧的构建
3. 构建新的工程
4. 部署/启动工程

因为前端是部署在`Apache`上的，所以只需要删除旧文件再放进新文件就可以

而后台则是使用`Spring Boot`构建的`jar`来启动的，所以就需要`kill`掉进程再构建与启动