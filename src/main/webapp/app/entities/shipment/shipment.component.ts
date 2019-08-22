import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IShipment } from 'app/shared/model/shipment.model';
import { AccountService } from 'app/core';
import { ShipmentService } from './shipment.service';

@Component({
  selector: 'jhi-shipment',
  templateUrl: './shipment.component.html'
})
export class ShipmentComponent implements OnInit, OnDestroy {
  shipments: IShipment[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected shipmentService: ShipmentService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.shipmentService
      .query()
      .pipe(
        filter((res: HttpResponse<IShipment[]>) => res.ok),
        map((res: HttpResponse<IShipment[]>) => res.body)
      )
      .subscribe(
        (res: IShipment[]) => {
          this.shipments = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInShipments();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IShipment) {
    return item.id;
  }

  registerChangeInShipments() {
    this.eventSubscriber = this.eventManager.subscribe('shipmentListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
