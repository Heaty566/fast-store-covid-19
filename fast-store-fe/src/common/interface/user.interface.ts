export interface User {
        id: string;
        name: string;
        email: string;
}

export interface AuthState extends User {
        isLogin: boolean;
}
