import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductTypeCreationFormComponent } from './product-type-creation-form.component';

describe('ProductTypeCreationFormComponent', () => {
  let component: ProductTypeCreationFormComponent;
  let fixture: ComponentFixture<ProductTypeCreationFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductTypeCreationFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductTypeCreationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
