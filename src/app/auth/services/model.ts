export interface User {
    id: number;
    name: string;
    nickname?: string;
    password?: string,
    mobile?: string;
    avatar?: string;
    email?: string;
}
export interface Auth {
    loginname: string;
    password: string;
    token:string;
    avatar?: string;
    captcha?: number | string;
    osso?: string;
    redirectUrl?: string;
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