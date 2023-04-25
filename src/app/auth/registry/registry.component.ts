import { RegisterAccountService } from 'src/app/core/service/register-account.service';
import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MessageService} from "primeng/api";
import {Router} from "@angular/router";

@Component({
  selector: 'agri-registry',
  templateUrl: './registry.component.html',
  styleUrls: ['./registry.component.scss']
})
export class RegistryComponent implements OnInit {
  formRegister: FormGroup;
  isShowPassword = false;
  isShowRePassword = false;
  isShowLoading = false;
  validateEmailFromServer = '';
  validatePhoneFromServer = '';
  isAgree: boolean = false;
  validateUserFromServer = '';
  msgInvalidForm = '';
  readonly posInputPass = {
    PASSWORD: 'PASSWORD',
    RE_PASSWORD: 'RE-PASSWORD'
  };
  readonly PASSWORD_PATTERN = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[#?!@$%^&*-]).{8,}$/i;

  constructor(
    private fb: FormBuilder,
    private registerAccountService: RegisterAccountService,
    private messageService: MessageService,
    private router: Router
  ) {
    this.formRegister = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      phoneNumber: ['',
        Validators.compose([
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10),
          Validators.pattern(/(0|[3|5|7|8|9])+([0-9]{9})\b/i)
        ])
      ],
      userName: ['', Validators.compose([Validators.required, Validators.maxLength(50)])],
      password: ['', Validators.compose([
        Validators.required,
        Validators.pattern(this.PASSWORD_PATTERN)
      ])],
      rePassword: ['', [
        Validators.required,
        Validators.pattern(this.PASSWORD_PATTERN),
      ]]
    }, {validators: this.validateMatchingPassword('password', 'rePassword')});

  }

  ngOnInit(): void {
  }

  register(): void {
    this.msgInvalidForm = '';
 
    this.isShowLoading = true;
    const body = {
      confirmPassword: this.formRegister.value.rePassword,
      email:this.formRegister.value.email,
      password: this.formRegister.value.password,
      phoneNumber: this.formRegister.value.phoneNumber,
      username: this.formRegister.value.userName,
    }
    this.registerAccountService.registerAccount(body).pipe().subscribe(res => {
      if (res) {
        this.isShowLoading = false;
        if (res.code === 1) {
          this.formRegister.reset();
          this.messageService.add({
            severity:'success',
            summary: 'Đăng ký tài khoản thành công',
            detail: 'Vui lòng kiểm tra email để kích hoạt tài khoản'});
          setTimeout(()=>{
            this.router.navigate(['/auth/login']);// <<<---using ()=> syntax
          }, 2000);

        } else {
          this.messageService.add({severity:'error', summary: 'Thông báo', detail: 'Đăng ký tài khoản thất bại'});
        }
      }
    }, error => {
      this.isShowLoading = false;
    })
  }


  toggleShowPass(pos: string) {
    switch (pos) {
      case this.posInputPass.PASSWORD:
        this.isShowPassword = !this.isShowPassword;
        break;
      case this.posInputPass.RE_PASSWORD:
        this.isShowRePassword = !this.isShowRePassword;
        break;
      default:
        break;
    }
  }

  hasErrorInput(controlName: string, errorName: string): boolean {
    const control = this.formRegister.get(controlName);
    if (control == null) {
      return false;
    }
    return (control.dirty || control.touched) && control.hasError(errorName);
  }

  validateMatchingPassword(firstControlName: string, secondControlName: string) {
    return function (formGroup: FormGroup) {
      // @ts-ignore
      const {value: firstControlValue} = formGroup.get(firstControlName);
      // @ts-ignore
      const {value: secondControlValue} = formGroup.get(secondControlName);
      return firstControlValue === secondControlValue
        ? null
        : {
          valueNotMatch: {
            firstControlValue,
            secondControlValue
          }
        };
    };
  }
}
