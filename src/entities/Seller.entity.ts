import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity({ name: 'Sellers' })
export class Seller {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ length: 50, unique: true })
    email: string

    @Column({ length: 255 })
    password: string

    @Column({ length: 255 })
    phone: string
}