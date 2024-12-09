import { Component, OnInit } from '@angular/core';
import {
	AbstractControl,
	FormArray,
	FormBuilder,
	FormControl,
	FormGroup,
	Validators,
} from '@angular/forms';

import { FrmValService } from 'src/app/shared/services/frmVal/frm-val.service';
import { LoaderService } from 'src/app/core/services/loader/loader.service';
import { ToastService } from 'src/app/core/services/toast/toast.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SupplierModel } from 'src/app/shared/models/interfaces/master.interfaces';
import { ConfirmationService } from 'primeng/api';
import { SupplierService } from 'src/app/core/services/supplier/supplier.service';

const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const urlRegex =
	/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;

@Component({
	selector: 'app-edit-supplier',
	templateUrl: './edit-supplier.component.html',
	styleUrls: ['./edit-supplier.component.scss'],
})
export class EditSupplierComponent implements OnInit {
	TitleText: string = '';
	tempId: number = 0;

	SupplierForm = this.formBuilder.group({
		companyName: [
			'',
			[Validators.required, Validators.max(50)],
		],
		name: [
			'',
			[Validators.required , Validators.max(50)],
		],
		taxIdentification: [
			'',
			[
				Validators.required,
				Validators.pattern('^((\\+91-?)|0)?[0-9]{11}$'),
			],
		],
		phoneNumber: [
			'',
			[
				Validators.required,
				Validators.pattern('^((\\+91-?)|0)?[0-9]{9}$'),
			],
		],
		email: [
			'',
			[
				Validators.required,
				Validators.pattern(emailRegex),
				Validators.minLength(2),
				Validators.max(255),
			],
		],
		webSite: [
			'',
			[
				Validators.required,
				Validators.pattern(urlRegex),
				Validators.minLength(2),
				Validators.max(50),
			],
		],
		address: [
			'',
			[Validators.required],
		],
		country: [
			'',
			[Validators.required , Validators.max(50)],
		],
		annualBilling: [, [Validators.required]],
	});

	constructor(
		private formBuilder: FormBuilder,
		private formValidator: FrmValService,
		private toastService: ToastService,
		private router: Router,
		private route: ActivatedRoute,
		private confirmationService: ConfirmationService,
		private supplierService : SupplierService,
		private loaderService: LoaderService,
	) {}

	ngOnInit(): void {
		this.route.params.subscribe((params) => {
			this.TitleText = params['titleText'];
			if (this.TitleText[0] == 'E') {
				let Supplier = JSON.parse(params['supplier']);
				this.tempId = Supplier['id'];
				const companyName = Supplier['companyName'];
				const name = Supplier['name'];
				const taxIdentification = Supplier['taxIdentification'];
				const phoneNumber = Supplier['phoneNumber'];
				const email = Supplier['email'];
				const webSite = Supplier['webSite'];
				const address = Supplier['address'];
				const country = Supplier['country'];
				const annualBilling = Supplier['annualBilling'];
				this.SupplierForm.reset({
					companyName,
					name,
					taxIdentification,
					phoneNumber,
					email,
					webSite,
					address,
					country,
					annualBilling,
				});
			}
		});
	}

	isValidField(field: string) {
		return this.formValidator.isValidField(this.SupplierForm, field);
	}

	AddEditSupplier() {
		if (this.SupplierForm.valid) {
			this.confirmationService.confirm({
				header: 'Confirmar',
				message: '¿Está conforme con los datos ingresados?',
				icon: 'pi pi-info-circle',
				accept: () => {
					this.loaderService.showLoader();
					let supplier: SupplierModel = {
						Id: this.tempId,
						CompanyName: this.SupplierForm.get('companyName')?.value,
						Name: this.SupplierForm.get('name')?.value,
						TaxIdentification: this.SupplierForm.get('taxIdentification')?.value as number,
						PhoneNumber: this.SupplierForm.get('phoneNumber')?.value.toString(),
						Email: this.SupplierForm.get('email')?.value,
						WebSite: this.SupplierForm.get('webSite')?.value,
						Address: this.SupplierForm.get('address')?.value,
						Country: this.SupplierForm.get('country')?.value,
						AnnualBilling: this.SupplierForm.get('annualBilling')?.value,
						LastModified: new Date()
					};
					console.log(supplier);
					if (this.TitleText[0] == 'A') {
						this.supplierService.addSupplier(supplier).subscribe(
							(response) => {
								this.loaderService.hideLoader();
								this.toastService.addProperties('success', 'Éxito', 'Se añadió correctamente');
								this.SupplierForm.reset();
          						this.router.navigateByUrl('/home/dashboard');
							},
							(error) => {
								this.loaderService.hideLoader();
							}
						);
					} else if (this.TitleText[0] == 'E') {
						this.supplierService.editSupplier(supplier).subscribe(
							(response) => {
								this.loaderService.hideLoader();
								this.toastService.addProperties('success', 'Éxito', 'Se editó correctamente');
								this.SupplierForm.reset();
								this.router.navigateByUrl('/home/dashboard');
							},
							(error) => {
								this.loaderService.hideLoader();
							}
						);
					}
				},
			});
		} else {
			this.toastService.addProperties(
				'error',
				'Ocurrió un problema',
				'Revise los campos ingresados'
			);
			this.ValidateAllFormFields(this.SupplierForm);
		}
	}

	onBack() {
		this.SupplierForm.reset();
		this.router.navigateByUrl('/home/dashboard');
	}

	ValidateAllFormFields(formGroup: FormGroup) {
		Object.keys(formGroup.controls).forEach((field) => {
			const control = formGroup.get(field);
			if (control instanceof FormControl) {
				control.markAsTouched({ onlySelf: true });
			} else if (control instanceof FormGroup) {
				this.ValidateAllFormFields(control);
			} else if (control instanceof FormArray) {
				for (let group of control.controls) {
					this.ValidateAllFormFields(group as FormGroup);
				}
			}
		});
	}
}
