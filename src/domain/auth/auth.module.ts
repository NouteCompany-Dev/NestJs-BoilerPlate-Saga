import { TypeOrmModule } from '@nestjs/typeorm';
import { RegisterHandlerEvent } from './events/handlers/register.handler.event';
import { AuthSaga } from './sagas/auth.saga';
import { AuthStore } from './stores/auth.stores';
import { AuthService } from './services/auth.service';
import { CommandHandlers } from './commands/handlers/index';
import { AuthController } from './controllers/auth.controllers';
import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { Seller } from 'src/entities/Seller.entity';

@Module({
    imports: [
        CqrsModule,
        TypeOrmModule.forFeature([
            Seller
        ]),
    ],
    controllers: [AuthController],
    providers: [
        ...CommandHandlers,
        AuthService,
        AuthStore,
        AuthSaga,
        RegisterHandlerEvent
    ],
})
export class AuthModule {}