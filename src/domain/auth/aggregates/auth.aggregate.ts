import { RegisterEvent } from './../events/register.event';
import { AggregateRoot } from "@nestjs/cqrs";

export class AuthAggregate extends AggregateRoot {
    constructor(
        private readonly email: string
    ) {
        super();
    }

    public register(email: string, password: string, phone: string) {
        this.apply(new RegisterEvent(email, password, phone));
    }
}