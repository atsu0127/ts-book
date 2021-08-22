type Request = {
  base: {
    url: string
    method: 'POST' | 'GET'
    data: {
      content: string
    }[]
  }
}

type Data = Request['base']['data'][number]
type BaseType = keyof Request['base']
