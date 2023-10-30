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
export interface Login {
    login: string;
    password: string;
    captcha?: number | string;
}