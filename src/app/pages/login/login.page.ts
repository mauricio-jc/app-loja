import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
  passwordType: string = 'password';
  passwordIcon: string = 'eye-outline';

  constructor(
    private authService: AuthService,
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
    this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
    this.passwordIcon = this.passwordIcon === 'eye-outline' ? 'eye-off-outline' : 'eye-outline';
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
