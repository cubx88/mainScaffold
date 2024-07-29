import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environments';

@Injectable({
    providedIn: 'root'
})
export class PasswordResetService {
    private API_URL = environment.API_URL;
    constructor(private http: HttpClient) { }
    completeResetPassword(password: string, token: string, tokenId: string) {
        const resetData = {
            password: password,
            token: token,
            tokenId: tokenId
        };
        return this.http.post(`${this.API_URL}`, resetData);
    }
}
