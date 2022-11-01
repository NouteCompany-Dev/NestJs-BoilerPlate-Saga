import { Body, Controller, Post } from "@nestjs/common";
import { Seller } from "src/entities/Seller.entity";
import { SellerRegisterDto } from "../dto/register.dto";
import { AuthService } from "../services/auth.service";

@Controller('auth')
export class AuthController {
    public constructor(
        private readonly authService: AuthService
    ) {}

    @Post()
    public Register(@Body() body: SellerRegisterDto): Promise<Seller | Error> {
        const { email, password, phone } = body;
        return this.authService.register(email, password, phone);
    }

}