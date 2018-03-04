# 解析SkyBlog中store中存储的state

说到state，我们肯定从`Reducer`入手，先来看下`AppReducer`

```javascript
const AppReducer = combineReducers({
    navigation : NavigationReducer,
    articles : ArticlesReducer,
    content : ContentReducer,
    upload : UploadReducer,
    login : LoginReducer,
    users : UsersReducer,
    classify : ClassifyReducer,
    about : AboutReducer,
    msg : MsgBoardReducer,
    github : GithubReducer,
    sys_log : SysLogReducer,
    form : formReducer,
    router: routerReducer,
    notifications: notificationsReducer()
});
```

除了倒数3个分别是`redux-form`、`react-router-redux`、`reapop`提供的Reducer，其他均是项目本身的Reducer，存储着页面中所有的数据。

## Navigation State

存储了项目中使用的所有`Modal`的显示状态，当然默认全是`false`啦。

```javascript
const initialState = {
    modal : {
        loginModal_show : false,
        registerModal_show : false,
        userInfoModal_show : false,
        userManagementModal_show : false,
        sysLogModal_show : false
    }
};
```

## Login State

登陆相关的state，是非常重要的state，存储了
1. 登录是否成功
2. 登录用户信息
3. 还有`是否开启管理模式`的信息

其中这个`management`便是SkyBlog实现`阅读与管理合一`的核心。

```javascript
const initialUser = {
    id: 0,
    username : "",
    nickname : "",
    admin : false
};

const initialState = {
    ok : null,
    message : null,
    management : false,
    user : initialUser
};
```

## Articles State - 文章列表

存储了文章和分类文章的分页信息

其中`loading`属性在之后不少地方也有出现，这个属性是实现`加载中`的属性

```javascript
const initialClassify = {
    loading: true,
    id : 0,
    name : "",
    page : {
        list : [],
        page_num : 1,
        pages : 0,
        total : 0,
    }
};

const initialState = {
    page : {
        list : [],
        page_num : 1,
        pages : 0,
        total : 0,
    },
    loading: true,
    classify : initialClassify
};
```

## Classify State - 文章分类

存储分类信息，`/articles`的右侧导航栏数据便出自于此

`show`则是`编辑器`用于判断是否显示`新增分类`的属性

```javascript
const initialState = {
    list : [],
    show : false
};
```

## Content State - 文章内容

整个项目最重的一个state，也是博客的核心——`文章页面`的state，存储了
1. 文章信息
2. 文章下的评论列表
3. 选择回复的评论

```javascript
export const initialArticle = {
    id : 0,
    title : "文章标题",
    sub_title : "文章副标题",

    classify : {
        id : 1,
        name : "未分类"
    },
    classify_id : 1,

    content : {
        text: "#### 文章内容\n`Markdown编辑器`",
        selection: null
    }
};

const initialComments = {
    list : [],
    page_num : 1,
    pages : 0,
    total : 0
};

export const initialPreviousComment = {
    id : 0,
    author : {
        id : 0,
        nickname : ""
    },
    content : ""
};

const initialState = {
    comments : initialComments,
    comments_loading : true,

    article : initialArticle,
    article_loading: true,

    previous_comment : initialPreviousComment
};
```

## Upload State - 上传

存储了上传文件Modal的显示、服务器访问的信息

```javascript
const initialState = {
    uploadModal_show : false,
    response : {
        ok : null,
        message : null,
        url : ""
    }
};
```

## About State - 关于

存储了关于的信息

```javascript
const initialState = {
    content : {
        text: "",
        selection: null
    },
    loading : true
};
```

## MsgBoard State - 留言板

存储了留言列表、选择回复的留言的信息

```javascript
const initialState = {
    page : {
        list : [],
        page_num : 1,
        pages : 0,
        total : 0
    },
    loading : true,
    previous_comment : initialPreviousComment
};
```

## Users State - 用户

存储了用户列表的信息，只在`UserManagementModal`显示

```javascript
const initialState = {
    list : [],
    page_num : 1,
    pages : 0,
    total : 0,
};
```

## Github State - SkyBlog动态

存储了SkyBlog的项目Commits信息

```javascript
const initialState = {
    commits : [],
    loading : true
};
```

## SysLog State - 系统日志

存储了系统日志列表的信息，只在`SysLogModal`显示

```javascript
const initialState = {
    list : [],
    page_num : 1,
    pages : 0,
    total : 0,
};
```

以上便是项目中存储的State，然后还有三个第三方State：
1. `react-router-redux` - 存储路由信息
2. `redux-form` - 存储表单信息
3. `notifications` - 通知系统`reapop`存储的信息

以上便是项目中`ViewModel`中存储的信息啦，不得不说`Redux`可以说是SkyBlog的MVP，没有状态管理工具估计要写半天上下文的代码。 