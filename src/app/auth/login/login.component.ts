import {Component, OnDestroy, Renderer2, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthStore} from '../../core/store/auth.store';
import {UtilsService} from '../../core/service/utils.service';

@Component({
  selector: 'agri-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnDestroy {
  formLogin: FormGroup;
  isShowPassword = false;
  loading$ = this.authStore.loginLoading$;

  constructor(
    private fb: FormBuilder,
    private authStore: AuthStore,
    private render: Renderer2,
    private utilService: UtilsService
  ) {
    this.render.addClass(document.body, 'login-body');
    this.formLogin = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      saveLogin: [true]
    })
  }

  hasErrorInput(controlName: string, errorName: string): boolean {
    const control = this.formLogin.get(controlName);
    if (control == null) {
      return false;
    }
    return (control.dirty || control.touched) && control.hasError(errorName);
  }

  toggleShowPass() {
    this.isShowPassword = !this.isShowPassword;
  }

  doLogin() {
    if (this.formLogin.valid) {
      const value = this.formLogin.value;
      this.authStore.login({
        username: value.username,
        password: value.password
      });
    } else {
      this.utilService.validateAllFields(this.formLogin);
    }
  }

  ngOnDestroy() {
    this.render.removeClass(document.body, 'login-body');
  }
}
