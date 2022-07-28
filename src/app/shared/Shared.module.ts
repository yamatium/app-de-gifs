import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { sidebarcomponent } from './sidebar/sidebar.component';




@NgModule({
  declarations: [
    sidebarcomponent
  ],
  exports:[
    sidebarcomponent
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
