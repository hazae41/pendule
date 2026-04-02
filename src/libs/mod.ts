export namespace Url {

  export function parseOrNull(text: string) {
    try {
      return new URL(text)
    } catch {
      return
    }
  }

}