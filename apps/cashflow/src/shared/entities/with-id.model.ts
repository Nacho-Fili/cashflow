import { PrimaryGeneratedColumn } from "typeorm";

export class WithIdModel {
    @PrimaryGeneratedColumn('uuid')
  id: string;
}
