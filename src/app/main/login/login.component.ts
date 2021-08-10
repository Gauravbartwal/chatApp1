import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import {ApiService} from '../../services/api.service'
import { HttpParams } from '@angular/common/http';
import { HttpHeaders } from "@angular/common/http";
import { User } from 'src/app/classes/user';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  private user: User;
  constructor(
    private _api : ApiService,
    private _auth: AuthService,
    private router: Router,
    public fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

  }

  login(){
    // const HTTP_OPTIONS = {
    //   headers: new HttpHeaders({
    //     "Content-Type": 'application/x-www-form-urlencoded',
    //   })
    // };

    // const body = new HttpParams()
    //   .set('username', this.form.value.username)
    //   .set("password", this.form.value.password)
    //   .set('grant_type', 'password');
    let b = this.form.value
    //console.log(b)
    this._api.postTypeRequest('login', b).subscribe((res: any) => {
      console.log(res.user.username)
      this.user = new User({firstName: res.user.firstname, lastName: res.user.lastname, photoUrl: 'https://via.placeholder.com/50x50'});
      if(res.access_token){
        console.log(this.user);
        this._auth.setDataInLocalStorage('token', res.access_token);
        this._auth.setDataInLocalStorage('first', res.user.firstname);
        this._auth.setDataInLocalStorage('last', res.user.lastname)
        this._auth.setDataInLocalStorage('url', 'https://via.placeholder.com/50x50')
        this.router.navigate(['/chat']);
      }
      this._api.openWebSocket(res.user.firstname);
    }, err => {
      alert("username or password is incorrect");
      console.log(err)
    });
  }

}
