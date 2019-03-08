import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductTypeManagerComponent } from './product-type-manager.component';

describe('ProductTypeManagerComponent', () => {
  let component: ProductTypeManagerComponent;
  let fixture: ComponentFixture<ProductTypeManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductTypeManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductTypeManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
