import { Seller } from './../../../entities/Seller.entity';
import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AuthStore {
    public constructor(
        @InjectRepository(Seller)
        private sellerRepository: Repository<Seller>,
    ) {}

    public async register(sellerEntity: Seller): Promise<Seller | Error> {
        return await this.create(sellerEntity);
    }

    public async create(sellerEntity: Seller): Promise<Seller | Error> {
        try {
            const seller = this.sellerRepository.create(sellerEntity);
            return await this.sellerRepository.save(seller);
        } catch (err) {
            return new Error(err);
        }
    }

}