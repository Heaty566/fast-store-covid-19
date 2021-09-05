import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

//---- Entity

@Entity()
export class Product {
      @PrimaryGeneratedColumn('uuid')
      id: string;

      @Column({ nullable: false })
      name: string;

      @Column({ nullable: false })
      price: number;

      @Column({ nullable: false })
      quantity: number;

      @Column({ nullable: false })
      imageUrl: string;

      constructor() {
            this.price = 0;
            this.imageUrl = '';
            this.quantity = 0;
            this.name = '';
      }
}

export default Product;
