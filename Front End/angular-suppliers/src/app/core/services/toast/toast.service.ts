import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Toast } from 'src/app/shared/models/interfaces/toast.interfaces';

@Injectable({
	providedIn: 'root',
})
export class ToastService {
	toast$ = new Subject<Toast>();

	toast: Toast = {
		summary: '',
		detail: '',
		severity: '',
	};

	constructor() {}

	addProperties(
		severity: string = 'warn',
		summary: string = 'Oops!',
		detail: string = 'Something went wrong'
	) {
		this.toast.detail = detail;
		this.toast.summary = summary;
		this.toast.severity = severity;
		this.toast$.next(this.toast);
	}
}
