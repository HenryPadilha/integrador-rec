import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class User {

  @PrimaryGeneratedColumn()
  id!: number;
  @Column()
  nome!: string;
  @Column({ unique: true, nullable:false })
  email!: string;
  @Column({nullable: false})
  senha!: string;
}