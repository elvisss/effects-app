import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.reducer';

import * as fromUser from '../../store/actions';
import { User } from 'src/app/models/user.model';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styles: []
})
export class UserComponent implements OnInit {

  user: User;
  loading: boolean;
  loaded: boolean;
  error: any = null;

  constructor( private router: ActivatedRoute,
               private store: Store<AppState> ) { }

  ngOnInit() {

    this.store.select('user').subscribe( resp => {
      this.user = resp.user;
      this.loading = resp.loading;
      this.error = resp.error;
      this.loaded = resp.loaded;
    });

    this.router.params
      .subscribe( (params: any) => {
        const id = params.id;

        this.store.dispatch( new fromUser.LoadUser(id) );

      });

  }

}
