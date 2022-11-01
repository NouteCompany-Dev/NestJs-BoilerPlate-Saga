import { Seller } from './../../../../entities/Seller.entity';
import { RegisterCommand } from './../register.command';
import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { Logger } from '@nestjs/common';
import { AuthStore } from '../../stores/auth.stores';
import { AuthAggregate } from '../../aggregates/auth.aggregate';

@CommandHandler(RegisterCommand)
export class RegisterHandler implements ICommandHandler<RegisterCommand> {
    public constructor(
        private readonly authStore: AuthStore,
        private readonly publisher: EventPublisher,
    ) {}

    public async execute(command: RegisterCommand): Promise<Seller | Error> {
        try {
            const { email, password, phone } = command;
            const sellerEntity = new Seller();
            sellerEntity.email = email;
            sellerEntity.password = password;
            sellerEntity.phone = phone;
            const seller = await this.authStore.register(sellerEntity);
            if(seller instanceof Error) {
                throw seller;
            }
            const authAggregate = this.publisher.mergeObjectContext(
                new AuthAggregate(email)
            );
            authAggregate.register(email, password, phone);
            authAggregate.commit();
            return seller;
        } catch (err) {
            Logger.error(err, 'RegisterHandler.execute() Error Handler: ');
            return err;
        }
    }
}