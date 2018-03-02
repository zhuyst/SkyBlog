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