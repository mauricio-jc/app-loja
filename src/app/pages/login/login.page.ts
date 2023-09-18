import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm!: FormGroup;
  isToastOpen: boolean = false;
  message: string = "";

  constructor(
    private authService: AuthService,
    private router: Router,
    private usersService: UsersService,
    private loadingCtrl: LoadingController,
    private navController: NavController
  ) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  get username() {
    return this.loginForm.get('username')!;
  }

  get password() {
    return this.loginForm.get('password')!;
  }

  async showLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Autenticando...'
    })
    loading.present();
  }

  async closeLoading() {
    await this.loadingCtrl.dismiss();
  }

  setOpen() {
    this.isToastOpen = false;
  }

  showHidePassword () {
    alert('Clicou');
  }

  async login() {
    if(this.loginForm.invalid) {
      return;
    }

    await this.showLoading();

    const data = this.loginForm.value;

    this.authService.login(data)
    .subscribe({
      next: async (response) => {
        localStorage.setItem('access_token', response.access_token);
        this.usersService.set(response.access_token);
        await this.closeLoading();
        this.navController.navigateRoot(['/home'])
      },
      error: async (responseError) => {
        await this.closeLoading();
        this.isToastOpen = true;
        this.message = "Usuário ou senha incorretos";
      },
    });
  }
}
