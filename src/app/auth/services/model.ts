export interface User {
    id: number;
    name: string;
    nickname?: string;
    mobile?: string;
    avatar?: string;
    email?: string;
}
export interface Auth {
    user:User | null;
    errMsg: string;
    redirectUrl: string;
}
export interface Loginfo {
    loginname: string;
    password: string;
    captcha?: number | string;
    osso?: string;
}
export interface Quote {
    cn: string;
    en: string;
    imgUrl: string;
  }
export interface Captcha {
    captcha_token: string,
    captcha_url: string;
  }