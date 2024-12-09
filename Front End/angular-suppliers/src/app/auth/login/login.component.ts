import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { STORAGE_CURRENT_TOKEN } from '../../core/global/constants/constants';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { FrmValService } from 'src/app/shared/services/frmVal/frm-val.service';
import { LoaderService } from 'src/app/core/services/loader/loader.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
	invalidCredentials: boolean = false;

	loginForm = this.formBuilder.group({
		username: ['', [Validators.required]],
		password: ['', [Validators.required]]
	});

	constructor(private router: Router, private formBuilder: FormBuilder, private formValidator: FrmValService, private authService: AuthService, private loaderService: LoaderService) {}

	ngOnInit(): void {
		this.OnUsernameChange();
		this.OnPasswordChange();
	}

	OnUsernameChange() {
		this.loginForm
			.get('username')!
			.valueChanges
			.subscribe(() => {
			this.invalidCredentials = false;
		});
	}
	
	OnPasswordChange() {
		this.loginForm
			.get('password')!
			.valueChanges
			.subscribe(() => {
			this.invalidCredentials = false;
		});
	}

	ValidateAllFormFields(formGroup: FormGroup) {
		Object.keys(formGroup.controls).forEach((field) => {
		  const control = formGroup.get(field);
		  if (control instanceof FormControl) {
			control.markAsTouched({ onlySelf: true });
		  } else if (control instanceof FormGroup) {
			this.ValidateAllFormFields(control);
		  }
		});
	  }
	
	  isValidField(field: string) {
		return this.formValidator.isValidField(this.loginForm, field);
	  }
	
	onLogin() {
		if (this.loginForm.valid) {
			this.loaderService.showLoader();
			this.authService.loginUser(this.loginForm.get('username')!.value, this.loginForm.get('password')!.value).subscribe({
			next: (token) => {
				if (token != null && token.token != '') {
					sessionStorage.setItem(STORAGE_CURRENT_TOKEN, JSON.stringify(token.token));
					this.loaderService.hideLoader();
					this.router.navigateByUrl('/home');
				}
		    },
		    error: (error) => {
				this.loaderService.hideLoader();
				this.invalidCredentials = true;
		    }});
		}
		else {
			this.ValidateAllFormFields(this.loginForm);
		}
	}

}
