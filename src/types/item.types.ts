import { Descendant } from "slate"
import { Category } from "./category"
import { ModelTimestamps } from "./common"

export type Item = {
  id: string
  title: string
} | null

export type ItemDetailed =
  | ({
      description: Descendant[]
      photos: string[]
      Categories: Category
      // notes: string
    } & Item &
      ModelTimestamps)
  | null

export type GetListCatalogueReturnItemDetailed = {
  id: string
  title: string
  description: string
}
