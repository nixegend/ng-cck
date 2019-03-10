import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentTypeEditorComponent } from './content-type-editor.component';

describe('ContentTypeEditorComponent', () => {
  let component: ContentTypeEditorComponent;
  let fixture: ComponentFixture<ContentTypeEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContentTypeEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentTypeEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
