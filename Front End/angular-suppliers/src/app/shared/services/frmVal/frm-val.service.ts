import { Injectable } from '@angular/core';
import { AbstractControl, FormGroup, ValidationErrors } from '@angular/forms';

@Injectable({
	providedIn: 'root',
})
export class FrmValService {
	constructor() {}

	public isValidField(form: FormGroup, field: string) {
		return form.controls[field].errors && form.controls[field].touched;
	}
}
