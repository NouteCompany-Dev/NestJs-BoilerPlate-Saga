import { RegisterEvent } from './../events/register.event';
import { Injectable, Logger } from "@nestjs/common";
import { ICommand, ofType, Saga } from "@nestjs/cqrs";
import { Observable } from "rxjs";
import { delay, map } from "rxjs/operators";
import { RegisterCommand } from '../commands/register.command';

@Injectable()
export class AuthSaga {
    @Saga()
    register = (events$: Observable<any>): Observable<ICommand> => {
        return events$.pipe(
            ofType(RegisterEvent),
            delay(1000),
            map(event => {
                Logger.log('saga call RegisterCommand');
                return new RegisterCommand(event.email, event.password, event.phone);
            }),
        );
    }

}