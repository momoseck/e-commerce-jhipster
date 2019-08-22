import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { StoreSharedCommonModule, JhiLoginModalComponent, HasAnyAuthorityDirective } from './';

@NgModule({
  imports: [StoreSharedCommonModule],
  declarations: [JhiLoginModalComponent, HasAnyAuthorityDirective],
  entryComponents: [JhiLoginModalComponent],
  exports: [StoreSharedCommonModule, JhiLoginModalComponent, HasAnyAuthorityDirective],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class StoreSharedModule {
  static forRoot() {
    return {
      ngModule: StoreSharedModule
    };
  }
}
