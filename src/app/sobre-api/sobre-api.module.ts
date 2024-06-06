import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SobreAPIPageRoutingModule } from './sobre-api-routing.module';

import { SobreAPIPage } from './sobre-api.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SobreAPIPageRoutingModule
  ],
  declarations: [SobreAPIPage]
})
export class SobreAPIPageModule {}
