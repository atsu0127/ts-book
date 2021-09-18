enum Language {
  English = 1,
  Japanese = 2
}

namespace Language {
  export function randomCreate(seed: number): Language {
    if (seed % 2 == 0) {
      return Language.Japanese
    }
    return Language.English
  }
}

console.log(Language.randomCreate(5))
console.log(Language.randomCreate(4))
