import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesController } from './controllers/categories.controller';
import { CategoriesService } from './services/categories.service';
import { Category } from './models/category.model';
import { CategoryMapper } from './mappers/category.mapper';

@Module({
  imports: [TypeOrmModule.forFeature([Category])],
  controllers: [CategoriesController],
  providers: [CategoriesService, CategoryMapper],
  exports: [CategoriesService],
})
export class CategoriesModule {}
