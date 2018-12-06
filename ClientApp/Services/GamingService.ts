import { Injectable, Inject } from "@angular/core";
import { Observable } from "rxjs";
import { HttpHeaders, HttpClient } from "@angular/common/http";

@Injectable()
export class GamingService {
    apiBaseUrl: string;
    private http: HttpClient;

    constructor(private HTTP: HttpClient, @Inject('BASE_URL') apiURL: string) {
        this.http = HTTP;
        this.apiBaseUrl = apiURL;
    }

    setSteamId(email: string, id: string) {
        let body: Object = {
            
        };

        let options: Object = {
            observe: 'response'   
        }

        return this.http.post<any>(this.apiBaseUrl + 'api/game/add/' + email + '/' + id, body, options);
    }

    getGames(email: string) {
        return this.http.get<any>(this.apiBaseUrl + 'api/game/' + email);
    }
}