import { http } from './http';

export default class AuthService {
    static login(email: string, password: string) {
        return http.post(`${process.env.api}/api/v1/auth/login`, {email, password});
    }
    // static canI(action: string, resource: string, namespace: string) {
    //     return http.post(`${process.env.api}/api/v1/auth/login`, {email, password});
    // }
}