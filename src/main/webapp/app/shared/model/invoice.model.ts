import { Moment } from 'moment';
import { IShipment } from 'app/shared/model/shipment.model';
import { IProductOrder } from 'app/shared/model/product-order.model';

export const enum InvoiceStatus {
  PAID = 'PAID',
  ISSUED = 'ISSUED',
  CANCELLED = 'CANCELLED'
}

export const enum PaymentMethod {
  CREDIT_CARD = 'CREDIT_CARD',
  CASH_ON_DELIVERY = 'CASH_ON_DELIVERY',
  PAYPAL = 'PAYPAL'
}

export interface IInvoice {
  id?: number;
  date?: Moment;
  details?: string;
  status?: InvoiceStatus;
  paymentMethod?: PaymentMethod;
  paymentDate?: Moment;
  paymentAmount?: number;
  shipments?: IShipment[];
  order?: IProductOrder;
}

export class Invoice implements IInvoice {
  constructor(
    public id?: number,
    public date?: Moment,
    public details?: string,
    public status?: InvoiceStatus,
    public paymentMethod?: PaymentMethod,
    public paymentDate?: Moment,
    public paymentAmount?: number,
    public shipments?: IShipment[],
    public order?: IProductOrder
  ) {}
}
