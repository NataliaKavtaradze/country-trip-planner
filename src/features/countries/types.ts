export interface Country {
  cca3: string
  name: {
    common: string
    official: string
  }
  capital?: string[]
  region: string
  subregion?: string
  population: number
  flags: {
    png: string
    svg: string
    alt?: string
  }
  languages?: Record<string, string>
  currencies?: Record<
    string,
    {
      name: string
      symbol: string
    }
  >
}