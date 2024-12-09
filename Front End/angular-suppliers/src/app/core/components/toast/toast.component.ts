import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ToastService } from '../../services/toast/toast.service';
import { Subject } from 'rxjs';
import { Toast } from 'src/app/shared/models/interfaces/toast.interfaces';

@Component({
	selector: 'core-toast',
	templateUrl: './toast.component.html',
	styleUrls: ['./toast.component.scss'],
	providers: [MessageService],
})
export class ToastComponent implements OnInit {
	constructor(
		private messageService: MessageService,
		private changeDetectorRef: ChangeDetectorRef,
		private toastService: ToastService
	) {}

	toast$: Subject<Toast> = this.toastService.toast$;

	ngOnInit(): void {
		this.toast$.subscribe((toast) => {
			this.messageService.add({
				severity: toast.severity,
				summary: toast.summary,
				detail: toast.detail,
			});
			this.changeDetectorRef.detectChanges();
		});
	}
}
