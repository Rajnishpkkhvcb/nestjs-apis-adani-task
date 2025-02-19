import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity() 
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  username: string;

  @Column()
  age: number;

  @Column("text", { array: true }) 
  hobbies: string[];
}
