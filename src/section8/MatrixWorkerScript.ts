type Data<
  P extends Protocol,
  C extends keyof P = keyof P // 初期値っぽい
> = C extends C
  ? {command: C, args: P[C]['in']}
  : never

onmessage = ({data}) => {
  postMessage(handle(data))
}

function handle(data: Data<MatrixProtocol>): MatrixProtocol[typeof data.command]['out'] {
  switch (data.command) {
    case 'determinant':
      return calcDeterminant(...data.args)
    default:
      return 0
  }
}

function calcDeterminant(matrix: Matrix): number {
  if (matrix.length != 2 || matrix[0].length != 2 || matrix.length != matrix[0].length) {
    console.error('2 x 2の正方行列のみです')
    return 0
  }

  return matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0]
}
