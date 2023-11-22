export interface Stock {
    id: number;
    name: string;
    amount: number;
    password?: string,
    mobile?: string;
    avatar?: string;
    email?: string;
}
export interface Currency {
    code: string;
}
export interface ColDef {
    field: string;
    sortable?: boolean;
    filter?: boolean,
}
