import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { v4 as uuid } from 'uuid';

import { Exclude } from 'class-transformer';

export enum Role {
  common = 'common',
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
  @Exclude()
  public password: string;

  @Column()
  public role: Role;

  @CreateDateColumn({ name: 'created_at' })
  public createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  public updatedAt: Date;

  @Column({ default: true })
  public active: boolean;

  @BeforeInsert()
  public generateId(): void {
    if (this.id) {
      return;
    }

    this.id = uuid();
  }
}

export default User;
