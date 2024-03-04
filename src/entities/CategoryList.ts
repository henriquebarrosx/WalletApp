import { Observable } from "./Observable";
import { Category } from "./Category";

export class CategoryList extends Observable {
  items: Category[] = []
  isLoading: boolean = true

  get isEmpty(): boolean {
    return this.items.length === 0
  }

  startLoader() {
    this.isLoading = true
  }

  stopLoader() {
    this.isLoading = false
  }

  replace(categories: Category[] = []) {
    this.items = categories
  }

  update(id: number, name: string) {
    this.items = this.items.reduce<Category[]>((categories, category) => {
      if (category.id !== id) return categories
      categories.push(new Category(id, name))
      return categories
    }, [])

    this.notify('DELETE_CATEGORY', { id, name })
  }

  delete(category: Category) {
    this.items = this.items.filter((item) => item.id !== category.id)
    this.notify('DELETE_CATEGORY', category.id)
  }
}