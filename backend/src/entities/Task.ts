import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./User";

@Entity()
export class Task {

@PrimaryGeneratedColumn()
  id!: number;

@Column()
  titulo!: string;

@Column()
  descricao!: string;

@Column({ default: false })
  concluida!: boolean;

@ManyToOne(() => User)
  usuario!: User;
}