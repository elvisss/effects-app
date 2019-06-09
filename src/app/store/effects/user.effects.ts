import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import * as userActions from '../actions';
import { UsersService } from '../../services/users.service';

import { map, mergeMap, catchError } from 'rxjs/operators';

@Injectable()
export class UserEffects {

    constructor(
        private actions$: Actions,
        public usersService: UsersService
    ) { }

    @Effect()
    loadUser$: Observable<Action> = this.actions$
        .pipe(
            ofType( userActions.LOAD_USER ),
            mergeMap( (action: any) => this.usersService.getUserByID( action.id )
                .pipe(
                    map( users => new userActions.LoadUserSuccess(users) ),
                    catchError(error => of(new userActions.LoadUserFail(error)) )
                )
            )
        );

}
