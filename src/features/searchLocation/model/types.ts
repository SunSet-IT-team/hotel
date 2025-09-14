export type Option = {
  name: string
  city: string
  id: number
}

export type FetchData<T extends Option> = (query: string) => Promise<T[]>