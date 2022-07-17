import { http } from "./http";

export default class OtherService {
    static listNamespaces(sort?: string) {
        return http.get(`${process.env.api}/api/v1/namespaces`, { params: { sort } });
    }
    static createNamespace(name: string) {
        return http.post(`${process.env.api}/api/v1/namespaces`, { namespace: name });
    }
}