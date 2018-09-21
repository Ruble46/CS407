import { Injectable } from "@angular/core";

@Injectable()
export class SelfService {
    public currentUser: string;

    constructor() {
        this.currentUser = 'craig@purdue.edu'
    }

}