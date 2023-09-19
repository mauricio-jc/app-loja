import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoadingController, NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  signupForm!: FormGroup;
  isToastOpenSuccess: boolean = false;
  isToastOpenError: boolean = false;
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
    this.signupForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      username: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  get name() {
    return this.signupForm.get('name')!;
  }

  get username() {
    return this.signupForm.get('username')!;
  }

  get email() {
    return this.signupForm.get('email')!;
  }

  get password() {
    return this.signupForm.get('password')!;
  }

  async showLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Cadastrando...'
    })
    loading.present();
  }

  async closeLoading() {
    await this.loadingCtrl.dismiss();
  }

  setOpen() {
    this.isToastOpenError = false;
  }

  redirectLogin() {
    this.isToastOpenSuccess = false;
    this.navController.pop();
  }

  showHidePassword () {
    this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
    this.passwordIcon = this.passwordIcon === 'eye-outline' ? 'eye-off-outline' : 'eye-outline';
  }

  async signup() {
    if(this.signupForm.invalid) {
      return;
    }

    await this.showLoading();

    const data = this.signupForm.value;

    this.authService.signUp(data)
    .subscribe({
      next: async (response) => {
        await this.closeLoading();
        this.isToastOpenSuccess = true;
        this.message = 'Cadastro efetuado com sucesso.';
      },
      error: async (responseError) => {
        await this.closeLoading();
        this.isToastOpenError = true;
        this.message = responseError.error.message;
      },
    });
  }
}
