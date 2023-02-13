import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Target {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column()
  surname: string

  @Column()
  patronymic: string

  @Column()
  email: boolean
}
