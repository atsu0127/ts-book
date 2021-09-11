import { readFile } from 'fs';

function promisify<T, A>(
  f: (arg: A, f: (error: unknown, result: T | null) => void) => void
): (arg: A) => Promise<T> {
  return (arg: A) => 
    new Promise<T>((resolve, reject) => {
      f(arg, (error, result) => {
        if (error) {
          return reject(error)
        }
        if (result === null) {
          return reject(null)
        }
        resolve(result)
      })
    })
}

let readFilePromise = promisify(readFile)

/**
 * Promiseの場合
 */
readFilePromise('/Users/atabata/1.txt')
  .then((result) => {
    console.info(result.toString())
  })
  .catch((err) => {
    console.error(err)
  });

readFilePromise('/Users/atabata/3.txt')
  .then((result) => {
    console.info(result.toString())
  })
  .catch((err) => {
    console.error(err)
  });

/**
 * Async/Awaitの場合
 */
async function test() {
  try {
    const first = await readFilePromise('/Users/atabata/1.txt')
    console.info(first.toString())
    const third = await readFilePromise('/Users/atabata/3.txt')
    console.info(third)
  } catch (e) {
    console.error(e)
  }
}
test()
