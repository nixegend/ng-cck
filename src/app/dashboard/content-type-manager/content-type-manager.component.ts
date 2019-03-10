import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';

import { ICurrentUser } from '../../common/models';
import { IMainReducerState } from '../../app.reducers';
import { getAllUsersFromState } from './selectors';
import { StartLoadAllUsers } from '../../auth/ngrx/actions';

import { ContentTypeEditorComponent } from '../content-type-editor/content-type-editor.component';

@Component({
  selector: 'app-product-type-manager',
  templateUrl: './content-type-manager.component.html',
  styleUrls: ['./content-type-manager.component.css']
})
export class ContentTypeManagerComponent implements OnInit {
  users$: Observable<ICurrentUser[]>;
  createNewContentTypeFormDialogRef: MatDialogRef<ContentTypeEditorComponent>;

  constructor(
    private dialog: MatDialog,
    private store: Store<IMainReducerState>
  ) { }

  ngOnInit() {
    this.store.dispatch(new StartLoadAllUsers());
    this.users$ = this.store.pipe(select(getAllUsersFromState));
  }

  protected openCreationContentTypeFormDialog(): void {
    this.createNewContentTypeFormDialogRef = this.dialog.open(ContentTypeEditorComponent);
  }
}