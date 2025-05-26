import { Injectable } from '@nestjs/common';
import { Category } from '../models/category.model';
import { CategoryDto } from '../dtos/category.dto';
import { CreateCategoryDto } from '../dtos/create-category.dto';
import { UpdateCategoryDto } from '../dtos/update-category.dto';

@Injectable()
export class CategoryMapper {
  toEntity(createCategoryDto: CreateCategoryDto): Category {
    const category = new Category();
    category.name = createCategoryDto.name;
    category.description = createCategoryDto.description;
    category.color = createCategoryDto.color;
    category.icon = createCategoryDto.icon;
    return category;
  }

  toDto(category: Category): CategoryDto {
    const categoryDto = new CategoryDto();
    categoryDto.id = category.id;
    categoryDto.name = category.name;
    categoryDto.description = category.description;
    categoryDto.color = category.color;
    categoryDto.icon = category.icon;
    categoryDto.createdAt = category.createdAt;
    categoryDto.updatedAt = category.updatedAt;
    return categoryDto;
  }

  updateEntityFromDto(category: Category, updateCategoryDto: UpdateCategoryDto): Category {
    if (updateCategoryDto.name !== undefined) {
      category.name = updateCategoryDto.name;
    }
    if (updateCategoryDto.description !== undefined) {
      category.description = updateCategoryDto.description;
    }
    if (updateCategoryDto.color !== undefined) {
      category.color = updateCategoryDto.color;
    }
    if (updateCategoryDto.icon !== undefined) {
      category.icon = updateCategoryDto.icon;
    }
    return category;
  }
}
