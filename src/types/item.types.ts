export type Item = {
  id: number
  name: string
} | null

export type ItemDetailed = {
  description: string
  photos: Array<string>
  notes: string
} & Item
