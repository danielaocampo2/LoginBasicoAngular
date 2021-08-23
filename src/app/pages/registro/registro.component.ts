import { Component, OnInit } from '@angular/core';
import { callNgModuleLifecycle } from '@angular/core/src/view/ng_module';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UsuarioModel } from '../../models/usuario.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

usuario:UsuarioModel;
recordarme=false;

  constructor(private auth:AuthService,
              private router:Router) { }

  ngOnInit() {
    this.usuario= new UsuarioModel();

    // this.usuario.email ='danielaocampoo@gmail.com';
   }


   onSubmit(form:NgForm){

    if(form.invalid){
       console.log("Formulario invalido");
       return;
    }

    Swal.fire({
      allowOutsideClick:false,
      icon:'info',
      text:'Espere por favor...'
    });
    Swal.showLoading();
    this.auth.nuevoUsuario(this.usuario).subscribe(resp=>{
      console.log(resp);
      Swal.close();

      if(this.recordarme){
        localStorage.setItem('email',this.usuario.email);
      }
      this.router.navigateByUrl('/home')

    },(err)=>{
        console.log(err.error.error.message);
        Swal.fire({
          icon:'error',
          title:'Error en registro',
          text:err.error.error.message
        });
    });

   }

}
