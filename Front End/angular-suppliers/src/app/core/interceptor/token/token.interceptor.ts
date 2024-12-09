import { Injectable } from '@angular/core';
import {
	HttpRequest,
	HttpHandler,
	HttpEvent,
	HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { STORAGE_CURRENT_TOKEN } from '../../global/constants/constants';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
	constructor() {}

	intercept(
		request: HttpRequest<unknown>,
		next: HttpHandler
	): Observable<HttpEvent<unknown>> {
		//const token = sessionStorage.getItem(STORAGE_CURRENT_TOKEN) ?? '';
		const token = JSON.parse(
			sessionStorage.getItem(STORAGE_CURRENT_TOKEN) || '{}'
		);

		if (!request.url.includes('/auth/login')) {
			request = this.addAuthorizationHeader(request, token);
		}

		return next.handle(request);
	}

	private addAuthorizationHeader(
		request: HttpRequest<unknown>,
		token: string
	): HttpRequest<unknown> {
		return request.clone({
			setHeaders: {
				authorization: `Bearer ${token}`,
			},
		});
	}
}
