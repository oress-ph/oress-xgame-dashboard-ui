import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CollectionDetailComponent } from 'src/app/components/collection/collection-detail/collection-detail.component';
import { CollectionComponent } from './collection.component';

const routes: Routes = [
  {
    path: '',
    // canActivate: [MarketplaceRouterActivate],
    component: CollectionComponent,
    children: [
      { path: '',component: CollectionDetailComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CollectionRoutingModule { }
