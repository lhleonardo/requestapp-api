import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { v4 as uuid } from 'uuid';

export enum Role {
  commom = 'commom',
  reviewer = 'reviewer',
  payer = 'payer',
  admin = 'admin',
}

@Entity('users')
class User {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column()
  public name: string;

  @Column()
  public email: string;

  @Column()
  public role: Role;

  @CreateDateColumn('created_at')
  public createdAt: Date;

  @UpdateDateColumn('updated_at')
  public updatedAt: Date;

  @BeforeInsert()
  public generateId(): void {
    if (this.id) {
      return;
    }

    this.id = uuid();
  }
}

export default User;
