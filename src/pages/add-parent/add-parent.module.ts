import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddParentPage } from './add-parent';

@NgModule({
  declarations: [
    AddParentPage,
  ],
  imports: [
    IonicPageModule.forChild(AddParentPage),
  ],
})
export class AddParentPageModule {}
