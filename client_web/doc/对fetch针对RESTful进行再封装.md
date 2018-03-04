# 对fetch针对RESTful进行再封装

因为后台使用到了`RESTful API`，而且是使用`Token`进行认证，所以最好是将`fetch`再封装一层

## 首先定义几个常量

1. 由于API的请求有`表单`和`JSON`两种，所以先定义好`ContentType`的常量
2. RESTful API一般使用五种方法`GET/POST/PUT/PATCH/DELETE`，也定义为`HttpMethod`的常量

```javascript
export const ContentType = {
    JSON : "application/json;charset=UTF-8",
    FORM : "application/x-www-form-urlencoded; charset=UTF-8"
};

export const HttpMethod = {
    GET : "GET",
    POST : "POST",
    PUT : "PUT",
    PATCH : "PATCH",
    DELETE : "DELETE"
};
```

## 定义Header的获取函数

由于使用`Token认证`，所以编写一个`getHeaders`函数来从`Cookie`中获取`Token`。

```javascript
const getHeaders = () => {
    const token = Cookies.get(COOKIE_TOKEN);
    return {
        "Content-Type": ContentType.JSON,
        "Token": token
    }
};
```

## 封装请求方法

这里以GET和POST作为举例，然后我们调用方法只需要关注请求的URL以及body即可。

```javascript
export const _get = (url,body = null) => {
    if(body !== null){
        url = new URL(url);
        Object.keys(body).forEach(key => url.searchParams.append(key, body[key]));
    }

    const promise = fetch(url,{
        method : HttpMethod.GET,
        headers: getHeaders(),
    });
    return handleFetch(promise);
};

export const _post = (url,body) => {
    const promise = fetch(url,{
        method : HttpMethod.POST,
        headers: getHeaders(),
        body : JSON.stringify(body)
    });
    return handleFetch(promise);
};
```

## 两个辅助函数

1. `checkStatus`用来检查Response的状态是否为200，如果为200则转换为对象，不为200则抛出异常给其他地方处理
2. `handleFetch`用来捕获异常并且调用`reapop`通知请求错误

```javascript
export const checkStatus = response => {
    if(response.status === 200){
        return response.json();
    }
    else {
        throw new Error();
    }
};

const handleFetch = promise => {
    return promise
        .then(response => checkStatus(response))
        .catch(() => dispatch(error(FAIL_RESULT.message)))
};
```

