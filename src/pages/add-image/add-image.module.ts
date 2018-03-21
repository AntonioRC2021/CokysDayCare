import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddImagePage } from './add-image';

@NgModule({
  declarations: [
    AddImagePage,
  ],
  imports: [
    IonicPageModule.forChild(AddImagePage),
  ],
})
export class AddParentPageModule {}
