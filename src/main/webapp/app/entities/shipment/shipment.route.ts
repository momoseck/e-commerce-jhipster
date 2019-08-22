import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Shipment } from 'app/shared/model/shipment.model';
import { ShipmentService } from './shipment.service';
import { ShipmentComponent } from './shipment.component';
import { ShipmentDetailComponent } from './shipment-detail.component';
import { ShipmentUpdateComponent } from './shipment-update.component';
import { ShipmentDeletePopupComponent } from './shipment-delete-dialog.component';
import { IShipment } from 'app/shared/model/shipment.model';

@Injectable({ providedIn: 'root' })
export class ShipmentResolve implements Resolve<IShipment> {
  constructor(private service: ShipmentService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IShipment> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Shipment>) => response.ok),
        map((shipment: HttpResponse<Shipment>) => shipment.body)
      );
    }
    return of(new Shipment());
  }
}

export const shipmentRoute: Routes = [
  {
    path: '',
    component: ShipmentComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'storeApp.shipment.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: ShipmentDetailComponent,
    resolve: {
      shipment: ShipmentResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'storeApp.shipment.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: ShipmentUpdateComponent,
    resolve: {
      shipment: ShipmentResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'storeApp.shipment.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: ShipmentUpdateComponent,
    resolve: {
      shipment: ShipmentResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'storeApp.shipment.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const shipmentPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: ShipmentDeletePopupComponent,
    resolve: {
      shipment: ShipmentResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'storeApp.shipment.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
