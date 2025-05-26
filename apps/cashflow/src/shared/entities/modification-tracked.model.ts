import { CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from "typeorm";
import { WithIdModel } from "./with-id.model";

export class ModificationTrackedModel extends WithIdModel{
    @CreateDateColumn({  name: 'createdAt'})
    createdAt: Date;

    @UpdateDateColumn({ name: 'updatedAt' })
    updatedAt: Date;

    @DeleteDateColumn({ name: 'deletedAt' })
    deletedAt: Date | null;
}