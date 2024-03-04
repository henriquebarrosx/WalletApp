import { Category } from "../../entities/Category"
import type { CategoryModel } from "./index.models"
import type { CategoriesServiceGateway } from "./index.gateway"
import axios from "axios"

export class CategoriesService implements CategoriesServiceGateway {
  async getAll(): Promise<Category[]> {
    const { data } = await axios.get<CategoryModel[]>('http://localhost:8080/api/v1/payments/categories')
    return data.map((raw) => new Category(raw.id, raw.name))
  }

  async delete(id: number): Promise<void> {
    await axios.delete(`http://localhost:8080/api/v1/payments/categories/${id}`)
  }
}