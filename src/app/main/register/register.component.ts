import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import {ApiService} from '../../services/api.service'
import { HttpHeaders } from '@angular/common/http';
import { User } from 'src/app/classes/user';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  private user: User;
  form: FormGroup
  constructor(
    private _api : ApiService,
    private _auth: AuthService,
    private router: Router,
    public fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  register(){
    let b = this.form.value
    console.log(b)
    this._api.postTypeRequest('register', b).subscribe((res: any) => {
      console.log(res)
      if(res){
        this.user = new User({firstName: res.user.firstname, lastName: res.user.lastname, photoUrl: 'https://via.placeholder.com/50x50'});
        console.log(res.user.username)
        this._auth.setDataInLocalStorage('token', res.access_token);
        this._auth.setDataInLocalStorage('first', res.user.firstname);
        this._auth.setDataInLocalStorage('last', res.user.lastname)
        this._auth.setDataInLocalStorage('url', 'https://via.placeholder.com/50x50')
        alert('User is Registerd');
        this.router.navigate(['login'])
      }
    }, err => {
      console.log(err)
    });
  }

}
