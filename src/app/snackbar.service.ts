import { Injectable, } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarConfig,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {  
 
  
  setAutoHide: boolean = true;
  autoHide: number = 3000;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(public snackBar: MatSnackBar) { }

  openSnackBar(data: { vpos: any; hpos: any; class: string; message: any; name: any; }){    
    let config = new MatSnackBarConfig();
    config.verticalPosition = data.vpos?data.vpos:this.verticalPosition;
    config.horizontalPosition = data.hpos?data.hpos:this.horizontalPosition;
    config.duration = this.setAutoHide ? this.autoHide : 0;
    if(data.class ==='error'){
      config.panelClass = 'gradient-red';
    }else if(data.class ==='success'){
      config.panelClass = 'gradient-green';
    }else{
      config.panelClass = '';
    }
    
    this.snackBar.open(data.message, data.name?data.name:'', config);
  }
}
