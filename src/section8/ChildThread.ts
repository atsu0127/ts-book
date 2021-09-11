import { MatrixProtocol, Protocol, Matrix } from './mainMatrix'

export type Data<
  P extends Protocol,
  C extends keyof P = keyof P // 初期値っぽい
> = C extends C
  ? {command: C, args: P[C]['in']}
  : never

function handleCP(data: Data<MatrixProtocol>): MatrixProtocol[typeof data.command]['out'] {
  switch (data.command) {
    case 'dot-product':
      return dotProduct(...data.args)
    default:
      throw Error('No Command')
  }
}

function dotProduct(m1: Matrix, m2: Matrix): Matrix {
  let res: number[][] = [];
  let row1 = m1.length;
  let row2 = m2.length;
  let col1 = m1[0].length;
  let col2 = m2[0].length;

  for(let i1 = 0; i1 < row1; i1++){
    let tmp: number[] = []
    for(let i2 = 0; i2 < col2; i2++){
      tmp.push(0);
      for(let i3 = 0; i3 < col1; i3++){
        tmp[i2] += m1[i1][i3] * m2[i3][i2];
      }
    }
    res.push(tmp)
  }

  return res;
}

process.on('message', (data: Data<MatrixProtocol>) => process.send!(handleCP(data)))