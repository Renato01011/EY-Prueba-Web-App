import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { LOADING_MESSAGE } from '../../global/constants/constants';

export interface Loader {
	status: boolean;
	msg: string;
}

@Injectable({
	providedIn: 'root',
})
export class LoaderService {
	loader: Loader = {
		status: false,
		msg: LOADING_MESSAGE,
	};

	loader$ = new Subject<Loader>();

	showLoader(msg: string = ''): void {
		this.loader.status = true;
		this.loader.msg = msg;
		this.loader$.next(this.loader);
	}

	hideLoader(): void {
		this.loader.status = false;
		this.loader.msg = '';
		this.loader$.next(this.loader);
	}
}
