import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MenuItem } from 'primeng/api';
import { SupplierService } from 'src/app/core/services/supplier/supplier.service';
import { LoaderService } from 'src/app/core/services/loader/loader.service';
import { OFACModel, OffshoreModel, SupplierModel, WorldBankModel } from 'src/app/shared/models/interfaces/master.interfaces';
import { ToastService } from 'src/app/core/services/toast/toast.service';
import { ScraperService } from 'src/app/core/services/scraper/scraper.service';
import { Table } from 'primeng/table';

@Component({
	selector: 'app-suppliers',
	templateUrl: './suppliers.component.html',
	styleUrls: ['./suppliers.component.scss'],
})
export class SuppliersComponent implements OnInit {
	cols: any[] = [];
	colsOffshore: any[] = [];
	colsWorldBank: any[] = [];
	colsOFAC: any[] = [];

	suppliers: SupplierModel[] = [];
	offshore: OffshoreModel[] = [];
	worldBank: WorldBankModel[] = [];
	OFAC: OFACModel[] = [];

	public screeningDialog: boolean = false;
	tempId: number = 0;

	moreOptionsOP: MenuItem[] = [];

	constructor(
		private router: Router,
		private supplierService: SupplierService,
		private confirmationService: ConfirmationService,
		private loaderService: LoaderService,
		private toastService: ToastService,
		private scraperService: ScraperService,
	) {}

	ngOnInit(): void {
		this.loaderService.showLoader();

		this.cols = [
			{ header: 'ID', field: 'id' },
			{ header: 'Razon social', field: 'companyName' },
			{ header: 'Nombre comercial', field: 'name' },
			{ header: 'Identificación tributaria', field: 'taxIdentification' },
			{ header: 'Número Telefónico', field: 'phoneNumber' },
			{ header: 'Correo Electrónico', field: 'email' },
			{ header: 'Sitio web', field: 'webSite' },
			{ header: 'Dirección física', field: 'address' },
			{ header: 'País', field: 'country' },
			{ header: 'Facturación anual en dólares', field: 'annualBilling' },
			{ header: 'Fecha de última edición', field: 'lastModified' },
		];

		this.colsOffshore = [
			{ header: 'Entidad', field: 'entity' },
			{ header: 'Jurisdicción', field: 'juristiction' },
			{ header: 'Vinculado a', field: 'linkedTo' },
			{ header: 'Datos de', field: 'dataFrom' },
		];

		this.colsWorldBank = [
			{ header: 'Nombre de la Empresa', field: 'firmName' },
			{ header: 'Dirección', field: 'address' },
			{ header: 'País', field: 'country' },
			{ header: 'Desde la Fecha', field: 'fromDate' },
			{ header: 'Hasta la Fecha', field: 'toDate' },
			{ header: 'Datos de', field: 'grounds' },
		];

		this.colsOFAC = [
			{ header: 'Nombre de la Empresa', field: 'name' },
			{ header: 'Dirección', field: 'address' },
			{ header: 'Tipo', field: 'type' },
			{ header: 'Programas', field: 'programs' },
			{ header: 'Lista', field: 'list' },
			{ header: 'Puntaje', field: 'score' },
		];

		this.supplierService.getSuppliers().subscribe(
			(suppliers) => {
				this.loaderService.hideLoader();
				this.suppliers = JSON.parse(JSON.stringify(suppliers)).suppliers;
			},
			(error) => {
				this.loaderService.hideLoader();
			}
		);

		this.moreOptionsOP = [
			{
				label: 'Editar',
				icon: 'pi pi-fw pi-pencil',
				command: (event) => {
					this.router.navigate([
						'/home/edit',
						{
							titleText: 'Editar Proveedor',
							supplier: JSON.stringify(
								this.suppliers[this.tempId]
							),
						},
					]);
				},
			},
			{
				label: 'Eliminar',
				icon: 'pi pi-fw pi-trash',
				command: (event) => this.EliminateSupplier(),
			},
			{
				label: 'Screening',
				icon: 'pi pi-fw pi-search',
				command: (event) => this.OpenScreeningDialog(),
			},
		];
	}

	private EliminateSupplier() {
		this.confirmationService.confirm({
			message: '¿Está seguro que quiere eliminar este proveedor?',
			header: 'Eliminar',
			icon: 'pi pi-exclamation-triangle',
			accept: () => {
				this.loaderService.showLoader();
				this.supplierService.deleteSupplier(JSON.stringify(this.suppliers[this.tempId])).subscribe(
					(response) => {
						this.suppliers = this.suppliers.slice(0, this.tempId).concat( this.suppliers.slice(this.tempId+1) );
						this.loaderService.hideLoader();
						this.toastService.addProperties(
							'success',
							'Éxito',
							'Se eliminó correctamente'
						);
						this.router.navigateByUrl('/home/dashboard');
					},
					(error) => {
						this.loaderService.hideLoader();
					}
				);
			},
		});
	}

	AddSupplier() {
		this.router.navigate([
			'/home/edit',
			{ titleText: 'Añadir Proveedor', supplier: null },
		]);
	}

	ToggleOverlayPanelId(id: number) {
		this.tempId = id;
	}

	OpenScreeningDialog() {
		this.screeningDialog = true;
	}

	CrossReferenceOffshore() {
		this.loaderService.showLoader();
		this.scraperService.getOffshoreReference(JSON.stringify(this.suppliers[this.tempId])).subscribe(
			(response) => {
				this.loaderService.hideLoader();
				this.offshore = response.rows;
			},
			(error) => {
				this.loaderService.hideLoader();
			}
		);
	}

	CrossReferenceWorldBank() {
		this.loaderService.showLoader();
		this.scraperService.getWorldBankReference(JSON.stringify(this.suppliers[this.tempId])).subscribe(
			(response) => {
				this.loaderService.hideLoader();
				this.worldBank = response.rows;
			},
			(error) => {
				this.loaderService.hideLoader();
			}
		);
	}

	CrossReferenceOFAC() {
		this.loaderService.showLoader();
		this.scraperService.getOFACReference(JSON.stringify(this.suppliers[this.tempId])).subscribe(
			(response) => {
				this.loaderService.hideLoader();
				this.OFAC = response.rows;
			},
			(error) => {
				this.loaderService.hideLoader();
			}
		);
	}
}
