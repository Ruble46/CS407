import { Injectable, Inject } from "@angular/core";
import { Observable } from "rxjs";
import { HttpHeaders, HttpClient } from "@angular/common/http";
import { Post } from "../Models/Post";

@Injectable()
export class PostService {
    apiBaseUrl: string;
    private http: HttpClient;

    constructor(private HTTP: HttpClient, @Inject('BASE_URL') apiURL: string) {
        this.http = HTTP;
        this.apiBaseUrl = apiURL;
    }

    getAllPosts() {
        let options: Object = {
            observe: 'response'
        }

        return this.http.get<any>(this.apiBaseUrl + 'api/post', options);
    }

    createPost(post: Post) {
        let body: Object = {
            email: post.Creator,
            title: post.Title,
            content: post.Description,
            game: post.Game,
            gameType: post.Mode,
            platform: post.Platform,
        }

        // let body: Object = {
        //     userPost: formattedPost
        // }

        let options: Object = {
            observe: 'response'
        }

        return this.http.post<any>(this.apiBaseUrl + 'api/post', body, options);
    }

    getPostByEmail(email: string) {
        let options: Object = {
            observe: 'response'
        }

        return this.http.get<any>(this.apiBaseUrl + 'api/post/' + email, options);
    }
}