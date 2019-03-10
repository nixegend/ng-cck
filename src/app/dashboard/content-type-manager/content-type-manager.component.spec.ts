import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentTypeManagerComponent } from './content-type-manager.component';

describe('ContentTypeManagerComponent', () => {
  let component: ContentTypeManagerComponent;
  let fixture: ComponentFixture<ContentTypeManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContentTypeManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentTypeManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
