import { useEffect, useCallback, useState } from "react"
import { Category } from "types/category"
import { useCategoriesMultiSelectContext } from "./useCategoriesMultiSelectContext"

export type UseCategoriesMultiSelectProps = {
  categoriesMultiSelectContextValue: ReturnType<
    typeof useCategoriesMultiSelectContext
  >
}

export const useCategoriesMultiSelect = ({
  categoriesMultiSelectContextValue,
}: UseCategoriesMultiSelectProps) => {
  const { categoriesMultiSelectValue, setCategoriesMultiSelectValue } =
    categoriesMultiSelectContextValue
  const [allCategories, setAllCategories] = useState<Category[]>([])
  console.log("allCategories", allCategories)

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const loadCategoriesList = useCallback(async (searchPhase?: string) => {
    setIsLoading(true)
    const categoriesList = (await (
      window as any
    ).electronAPI.getListCategories()) as Category[]
    console.log("allCategories", categoriesList)
    setAllCategories(categoriesList)
    setIsLoading(false)
  }, [])
  useEffect(() => {
    const search = ""
    const shouldLoadCategories = isOpen && allCategories.length === 0
    if (shouldLoadCategories) {
      loadCategoriesList(search)
    }
  }, [loadCategoriesList, isOpen, allCategories])

  const createCategory = useCallback(async (newCategoryName: string) => {
    console.log("createCategory", newCategoryName)
    let result: null | Category = null
    try {
      setIsLoading(true)
      const createdCategoryJSON = (await (
        window as any
      ).electronAPI.createCategory(newCategoryName)) as string
      result = JSON.parse(createdCategoryJSON) as Category
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
    return result
  }, [])

  const onChange = async (event: any, newArrayValues: any[]) => {
    const newValue = newArrayValues[newArrayValues.length - 1]
    if (newValue && newValue.inputValue) {
      const newCategory = await createCategory(newValue.inputValue)
      console.log("created category", newCategory)
      if (newCategory) {
        setCategoriesMultiSelectValue([
          ...newArrayValues.slice(0, -1),
          newCategory,
        ])
      }
    } else {
      setCategoriesMultiSelectValue(newArrayValues)
    }
  }

  return {
    allCategories,
    setAllCategories,
    createCategory,
    isLoading,
    setIsOpen,
    categoriesMultiSelectValue,
    onChange,
  }
}
