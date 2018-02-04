import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddKidPage } from './add-kid';

@NgModule({
  declarations: [
    AddKidPage,
  ],
  imports: [
    IonicPageModule.forChild(AddKidPage),
  ],
})
export class AddKidPageModule {}
