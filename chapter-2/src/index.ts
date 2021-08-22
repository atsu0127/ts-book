const getMethods = (obj: object): string[] => {
  const getOwnMethods = (obj: object) =>
    Object.entries(Object.getOwnPropertyDescriptors(obj))
      .filter(([name, {value}]) => typeof value === 'function' && name !== 'constructor')
      .map(([name]) => name)
  const _getMethods = (o: object, methods: string[]): string[] =>
    o === Object.prototype ? methods : _getMethods(Object.getPrototypeOf(o), methods.concat(getOwnMethods(o)))
  return _getMethods(obj, [])
}

interface BuildableRequest {
  data?: object
  method: 'get' | 'post'
  url: string
}

class RequestBuilder {
  data?: object
  method?: 'get' | 'post'
  url?: string

  setMethod(method: 'get' | 'post'): this & Pick<BuildableRequest, 'method'> {
    // return Object.assign(this, {method})
    return {
      ...this,
      method
    }
  }

  setData(data: object): this & Pick<BuildableRequest, 'data'> {
    // console.log(getMethods(this))
    // let self = Object.assign(this, {data})
    console.log(getMethods(this))
    let self2 = {
      ...this,
      data
    }
    // console.log(getMethods(self))
    console.log(getMethods(self2))
    return self2
    // return {
    //   ...this,
    //   data
    // }
  }

  setURL(url: string): this & Pick<BuildableRequest, 'url'> {
    // return Object.assign(this, {url})
    return {
      ...this,
      url
    }
  }

  build(this: BuildableRequest) {
    console.log(`send`)
  }
}

let builder = new RequestBuilder()
builder.setData({name: 'aa'})
.setMethod('get')
.setURL('hoge.co.jp')
.build()
