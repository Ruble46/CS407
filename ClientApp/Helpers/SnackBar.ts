import { Injectable } from "@angular/core";
import { MatSnackBar } from '@angular/material';

@Injectable()
export class SnackBarHelper {
    public snackBar: MatSnackBar;

    constructor(public _snackBar: MatSnackBar) {
        this.snackBar = _snackBar;
    }

    openSnackBar(message: string, action: string, lengthMs: number) {
        this.snackBar.open(message, action, {
            duration: lengthMs,
        });
    }
}