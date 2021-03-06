import { Injectable } from '@angular/core';
import { CanActivate,  Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { callNgModuleLifecycle } from '@angular/core/src/view/ng_module';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor( private auth:AuthService,
              private router:Router){

  }
  canActivate(): boolean {
    if(this.auth.estaAutenticado()){
      return true;
    }else{
      this.router.navigateByUrl('/login');
      return false;
    }
  }

}
