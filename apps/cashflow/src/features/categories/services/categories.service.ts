import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from '../models/category.model';
import { CreateCategoryDto } from '../dtos/create-category.dto';
import { UpdateCategoryDto } from '../dtos/update-category.dto';
import { CategoryMapper } from '../mappers/category.mapper';
import { CategoryDto } from '../dtos/category.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    private categoryMapper: CategoryMapper,
  ) {}

  async findAll(): Promise<CategoryDto[]> {
    const categories = await this.categoryRepository.find();
    return categories.map(category => this.categoryMapper.toDto(category));
  }

  async findOne(id: string): Promise<CategoryDto> {
    const category = await this.categoryRepository.findOne({ where: { id } });
    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }
    return this.categoryMapper.toDto(category);
  }

  async create(createCategoryDto: CreateCategoryDto): Promise<CategoryDto> {
    const category = this.categoryMapper.toEntity(createCategoryDto);
    const savedCategory = await this.categoryRepository.save(category);
    return this.categoryMapper.toDto(savedCategory);
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto): Promise<CategoryDto> {
    const category = await this.categoryRepository.findOne({ where: { id } });
    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }
    
    const updatedCategory = this.categoryMapper.updateEntityFromDto(category, updateCategoryDto);
    const savedCategory = await this.categoryRepository.save(updatedCategory);
    return this.categoryMapper.toDto(savedCategory);
  }

  async remove(id: string): Promise<void> {
    const category = await this.categoryRepository.findOne({ where: { id } });
    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }
    await this.categoryRepository.softDelete(id);
  }
}
