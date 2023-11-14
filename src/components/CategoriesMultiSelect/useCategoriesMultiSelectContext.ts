import { createContext, useState } from "react"
import { Category } from "types/category"

export type CategoriesMultiSelectContextType = {
  categoriesMultiSelectValue: Category[]
  setCategoriesMultiSelectValue: React.Dispatch<React.SetStateAction<any[]>>
}
export const CategoriesMultiSelectContext =
  createContext<CategoriesMultiSelectContextType>({
    categoriesMultiSelectValue: [],
    setCategoriesMultiSelectValue: () => {},
  })

export const useCategoriesMultiSelectContext = () => {
  const [savedCategoriesMultiSelectValue, setSavedCategoriesMultiSelectValue] =
    useState<Category[]>([])
  const [categoriesMultiSelectValue, setCategoriesMultiSelectValue] = useState<
    Category[]
  >([])

  return {
    categoriesMultiSelectValue,
    setCategoriesMultiSelectValue,
    savedCategoriesMultiSelectValue,
    setSavedCategoriesMultiSelectValue,
  }
}
