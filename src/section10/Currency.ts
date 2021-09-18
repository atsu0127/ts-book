/**
 * 1-a
 */
type Unit = 'EUR' | 'GBP' | 'JPY'

interface Currency {
  unit: Unit
  value: number
}

namespace Currency {
  function from(value: number, unit: Unit): Currency {
    return {
      unit: unit,
      value
    }
  }
}
