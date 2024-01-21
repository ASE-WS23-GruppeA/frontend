import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class UserService {

    private apiGatewayBaseUrl = environment.apiGatewayBaseUrl;

    constructor(private http: HttpClient) { }


    getUserPublicContent() {
        return this.http.request('post', `${this.apiGatewayBaseUrl}/api/v1/user/resource`, {
            withCredentials: true,
            responseType: "text"
        })
    }

    getAdminPublicContent() {
        return this.http.request('get', `${this.apiGatewayBaseUrl}/api/v1/admin/resource`, {
            withCredentials: true,
            responseType: "text"
        })
    }
}
