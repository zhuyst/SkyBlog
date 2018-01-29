const expiresDay = 7 * 24 * 60 * 60 * 1000;

export const setCookie = (name,value) => {
    let date = new Date();
    date.setTime(date.getTime() + expiresDay);
    const expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + ";" + expires;
};

export const getCookie = (name) => {
    name += "=";
    const ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++)
    {
        const c = ca[i].trim();
        if (c.indexOf(name) === 0) {
            return c.substring(name.length,c.length);
        }
    }
    return null;
};

export const deleteCookie = (name) => {
    let date = new Date();
    date.setTime(date.getTime() - 1);
    const value = getCookie(name);
    if(value !== null){
        document.cookie= name + "=" + value + ";expires=" + date.toUTCString();
    }
};