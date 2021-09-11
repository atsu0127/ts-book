import { fork } from 'child_process'
import { MatrixProtocol, Protocol, Matrix } from "./mainMatrix"

function createProtocolCP<P extends Protocol>(script: string) {
  return <K extends keyof P>(command: K) =>
    (...args: P[K]['in']) =>
       new Promise<P[K]['out']>((resolve, reject) => {
        let child = fork(script)
        child.on('message', resolve)
        child.on('error', reject)
        child.send({command, args})
      })
}

let runWithMatrixProtocolCP = createProtocolCP<MatrixProtocol>('/Users/tabata/src/github.com/atsu0127/ts-book/dist/section8/ChildThread.js')

let dotProduct = runWithMatrixProtocolCP('dot-product')
dotProduct([[1, 1], [2, 2]], [[1, 1], [2, 2]])
  .then(product => console.info(product))