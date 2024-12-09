import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeaturesRoutingModule } from './features-routing.module';
import { LayoutComponent } from './layout/layout.component';
import { MaterialModule } from '../shared/material/material.module';
import { SharedModule } from '../shared/shared.module';
import { SuppliersComponent } from './suppliers/suppliers.component';
import { EditSupplierComponent } from './edit-supplier/edit-supplier.component';
import { ConfirmationService } from 'primeng/api';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
	declarations: [LayoutComponent, SuppliersComponent, EditSupplierComponent],
	imports: [
		CommonModule,
		FeaturesRoutingModule,
		MaterialModule,
		SharedModule,
		FormsModule,
		ReactiveFormsModule,
	],
	providers: [ConfirmationService],
})
export class FeaturesModule {}
