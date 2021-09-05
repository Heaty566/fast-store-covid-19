import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

//---- Entity

@Entity()
export class User {
      @PrimaryGeneratedColumn('uuid')
      id: string;

      @Column({ nullable: false })
      name: string;

      @Column({ default: null, unique: true })
      googleId: string;

      @Column({ default: null })
      email: string;
}

export default User;
