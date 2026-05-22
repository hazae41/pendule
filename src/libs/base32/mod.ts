export namespace base32 {

  export const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567"

  export function encode(data: Uint8Array): string {
    let text = ""

    let buffer = 0
    let remain = 0

    for (let i = 0; i < data.length; i++) {
      buffer = (buffer << 8) | data[i]

      for (remain += 8; remain >= 5; remain -= 5)
        text += alphabet[(buffer >> (remain - 5)) & 0x1f]

      continue
    }

    if (remain > 0)
      text += alphabet[(buffer << (5 - remain)) & 0x1f]

    return text.padEnd(Math.ceil(text.length / 8) * 8, "=")
  }

  export function decode(text: string): Uint8Array {
    const data = new Uint8Array(Math.ceil(text.length * 5 / 8))

    let buffer = 0
    let remain = 0

    let cursor = 0

    for (let i = 0; i < text.length; i++) {
      const value = alphabet.indexOf(text[i])

      if (value === -1)
        continue

      buffer = (buffer << 5) | value

      for (remain += 5; remain >= 8; remain -= 8)
        data[cursor++] = (buffer >> (remain - 8)) & 0xff

      continue
    }

    return data.slice(0, cursor)
  }

}