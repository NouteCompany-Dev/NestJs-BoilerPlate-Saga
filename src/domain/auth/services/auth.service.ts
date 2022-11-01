import { RegisterCommand } from './../commands/register.command';
import { Injectable } from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";
import { Seller } from "src/entities/Seller.entity";

@Injectable()
export class AuthService {
    public constructor(
        private commandBus: CommandBus,
    ) {}

    public async register(email: string, password: string, phone: string): Promise<Seller | Error> {
        return this.commandBus.execute(new RegisterCommand(email, password, phone));
    }
    
}