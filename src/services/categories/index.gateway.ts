import type { Category } from "../../entities/Category"

export interface CategoriesServiceGateway {
  getAll(): Promise<Category[]>
  delete(id: number): Promise<void>
  update(id: number, name: string): Promise<void>
}