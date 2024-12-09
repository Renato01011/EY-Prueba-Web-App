import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './components/loader/loader.component';

import { ToastComponent } from './components/toast/toast.component';
import { MaterialModule } from '../shared/material/material.module';

@NgModule({
  declarations: [LoaderComponent, ToastComponent],
  imports: [CommonModule, MaterialModule],
  exports: [LoaderComponent, ToastComponent],
})
export class CoreModule {}
