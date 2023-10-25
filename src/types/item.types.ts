import { Descendant } from "slate"

export type Item = {
  id: string
  title: string
} | null

export type ItemDetailed =
  | ({
      description: Descendant[]
      photos: Array<string>
      // notes: string
    } & Item)
  | null
