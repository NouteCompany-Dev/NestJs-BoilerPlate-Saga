import { Logger } from '@nestjs/common';
import { RegisterEvent } from './../register.event';
import { EventsHandler, IEventHandler } from "@nestjs/cqrs";

@EventsHandler(RegisterEvent)
export class RegisterHandlerEvent implements IEventHandler<RegisterEvent> {
    handle(event: RegisterEvent) {
        Logger.log('RegisterHadnlerEvent called');
        return event;
    }
}