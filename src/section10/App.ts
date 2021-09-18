import { Network } from './Get'

namespace App {
  Network.get()
    .then((data) => {
      console.info(data)
    })
}
