import { Logger } from '@nestjs/common';

export class RegisterEvent {
    public constructor(
        public readonly email: string,
        public readonly password: string,
        public readonly phone: string
    ) {
        Logger.log('RegisterEvent called');
    }
}