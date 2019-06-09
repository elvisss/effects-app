import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import * as usersActions from '../actions';
import { UsersService } from '../../services/users.service';

import { map, mergeMap, catchError } from 'rxjs/operators';

@Injectable()
export class UsersEffects {

    constructor(
        private actions$: Actions,
        public usersService: UsersService
    ) { }

    @Effect()
    loadUsers$: Observable<Action> = this.actions$
        .pipe(
            ofType( usersActions.LOAD_USERS ),
            mergeMap( () => this.usersService.getUsers()
                .pipe(
                    map( users => new usersActions.LoadUsersSuccess(users) ),
                    catchError(error => of(new usersActions.LoadUsersFail(error)) )
                )
            )
        );

}
