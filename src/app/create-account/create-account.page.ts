import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup , FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.page.html',
  styleUrls: ['./create-account.page.scss'],
})
export class CreateAccountPage implements OnInit {

  firstName;

  passwordType = 'password';
  passwordIcon = 'eye-off';

  confirmPasswordType = 'password';
  confirmPasswordIcon = 'eye-off';

  constructor() { }

  ngOnInit() {
  }

  showHidePassword() {
    if (this.passwordType === 'password' && this.passwordIcon === 'eye-off') {
        this.passwordType = 'text';
        this.passwordIcon = 'eye';
    } else {
      this.passwordType = 'password';
      this.passwordIcon = 'eye-off';
    }
  }

  showHideConfirmPassword() {
    if (this.confirmPasswordType === 'password' && this.confirmPasswordIcon === 'eye-off') {
        this.confirmPasswordType = 'text';
        this.confirmPasswordIcon = 'eye';
    } else {
      this.confirmPasswordType = 'password';
      this.confirmPasswordIcon = 'eye-off';
    }
  }

}
