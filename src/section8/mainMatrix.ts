export type Matrix = number[][]

export type MatrixProtocol = {
  determinant: {
    in: [Matrix]
    out: number
  }
  'dot-product': {
    in: [Matrix, Matrix]
    out: Matrix
  }
  invert: {
    in: [Matrix]
    out: Matrix
  }
}

export type Protocol = {
  [command: string]: {
    in: unknown[]
    out: unknown
  }
}

function createProtocol<P extends Protocol>(script: string) {
  return <K extends keyof P>(command: K) =>
    (...args: P[K]['in']) => 
      new Promise<P[K]['out']>((resolve, reject) => {
        let worker = new Worker(script)
        worker.onerror = reject
        worker.onmessage = event => resolve(event.data)
        worker.postMessage({command, args})
      })
}

let runWithMatrixProtocol = createProtocol<MatrixProtocol>('/Users/atabata/src/github.com/atsu0127/ts-book/dist/section8/MatrixWorkerScript.js')
let parallelDeterminant = runWithMatrixProtocol('determinant')
parallelDeterminant([[1, 2], [3, 4]])
  .then(determinant => console.log(determinant))

let parallelProd = runWithMatrixProtocol('dot-product')
parallelProd([[1, 2], [3, 4]], [[1, 2], [3, 4]])
  .then(prod => console.log('成功: ', prod))
