/**
 * 2問目
 */
 type O = {
  a: {
    b: {
      c: string
    }
  }
}

// keyof O -> 'a'
type P2_1 = keyof O

// keyof O['a']['b'] -> "c"
type P2_2 = keyof O['a']['b']

/**
 * 3問目
 */
type Exclusive<T, U> = Exclude<T, U> | Exclude<U, T>
type MyExclusive<T, U> = (T extends U ? never : T) | (U extends T ? never : U)

// 1 | 4
type P3 = Exclusive<1 | 2 | 3, 2 | 3 | 4>
type P3_2 = MyExclusive<1 | 2 | 3, 2 | 3 | 4>

/**
 * 4問目
 */
let userId: string
userId = fetchUser()

const UserId = userId.toUpperCase()

function fetchUser(): string {
  return 'hoge'
}

console.log(UserId)
