import { Injectable } from '@angular/core';
import {
	HttpRequest,
	HttpHandler,
	HttpEvent,
	HttpInterceptor,
	HttpErrorResponse,
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { ToastService } from '../../services/toast/toast.service';
import {
	BAD_REQUEST,
	INTERNAL_SERVER_ERROR,
	NOT_FOUND,
	UNAUTHORIZED,
	COULD_NOT_FIND_DATA,
	COULD_NOT_FIND_USER_OR_INCORRECT_PASSWORD,
} from '../../global/constants/http-errors.constants';
import { LoaderService } from '../../services/loader/loader.service';

@Injectable()
export class ErrHandlerInterceptor implements HttpInterceptor {
	constructor(
		private toastService: ToastService,
		private loaderService: LoaderService
	) {}

	intercept(
		request: HttpRequest<unknown>,
		next: HttpHandler
	): Observable<HttpEvent<unknown>> {
		return next
			.handle(request)
			.pipe(
				catchError((error: HttpErrorResponse) =>
					this.handleRequestError(error)
				)
			);
	}

	private handleRequestError(error: HttpErrorResponse): Observable<any> {
		this.getErrMessage(error);
		this.loaderService.hideLoader();
		return throwError(() => error);
	}

	private getErrMessage(error: HttpErrorResponse) {
		if (error.status == 0) {
			this.toastService.addProperties(
				'error',
				'Error de servidor',
				'Fallo de conexión con el servidor'
			);
		} else if (error.status === BAD_REQUEST) {
			const msg = this.getErrorMsgFromList(error.error);
			this.toastService.addProperties('warn', 'Mensaje de servidor', msg);
		} else if (error.status === UNAUTHORIZED) {
			this.toastService.addProperties(
				'warn',
				'Mensaje de servidor',
				'Debe autenticarse'
			);
		} else if (error.status === NOT_FOUND) {
			const message = this.getErrorMsgFromList(error.error);
			this.toastService.addProperties(
				'warn',
				'Mensaje de servidor',
				message
			);
		} else if (error.status === INTERNAL_SERVER_ERROR) {
			this.toastService.addProperties(
				'error',
				'Error de servidor',
				'Disculpe la molestia, vuelva a intentarlo mas tarde'
			);
		} else if (error.status === COULD_NOT_FIND_DATA) {
			this.toastService.addProperties(
				'error',
				'Error',
				'La busqueda no trajo datos, pruebe otro proveedor u otra página'
			);
		} else if (error.status === COULD_NOT_FIND_USER_OR_INCORRECT_PASSWORD) {
			this.toastService.addProperties(
				'error',
				'Error',
				'El usuario o contraseña que ha puesto son incorrectos'
			);
		} else {
			this.toastService.addProperties(
				'error',
				'Mensaje de servidor',
				'Fallo de conexión con el servidor'
			);
		}
	}

	private getErrorMsgFromList(err: any): string {
		if (!err.errList || err.errList.length === 0) {
			return 'Fallo de conexión con el servidor';
		}
		return err.errList[0].message;
	}
}
