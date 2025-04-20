export interface User {
    id: number;
    username: string;
    email: string;
  }
  
  export interface AuthTokens {
    access: string;
    refresh: string;
  }
  
  export interface AuthResponse {
    user: User;
    tokens: AuthTokens;
  }
  
  export interface LoginData {
    username: string;
    password: string;
  }
  
  export interface RegisterData extends LoginData {
    email: string;
  }