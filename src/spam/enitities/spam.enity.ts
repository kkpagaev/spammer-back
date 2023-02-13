import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Spam {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  title: string

  @Column()
  content: string
}
