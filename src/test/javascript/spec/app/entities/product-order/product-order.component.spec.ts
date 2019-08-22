/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { StoreTestModule } from '../../../test.module';
import { ProductOrderComponent } from 'app/entities/product-order/product-order.component';
import { ProductOrderService } from 'app/entities/product-order/product-order.service';
import { ProductOrder } from 'app/shared/model/product-order.model';

describe('Component Tests', () => {
  describe('ProductOrder Management Component', () => {
    let comp: ProductOrderComponent;
    let fixture: ComponentFixture<ProductOrderComponent>;
    let service: ProductOrderService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [StoreTestModule],
        declarations: [ProductOrderComponent],
        providers: []
      })
        .overrideTemplate(ProductOrderComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ProductOrderComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ProductOrderService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new ProductOrder(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.productOrders[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
