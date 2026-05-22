import { base32 } from "@/libs/base32/mod.ts";
import { assert, test } from "@hazae41/phobos";

test("base32 random", async () => {
  for (let i = 0; i < 1024; i++) {
    const length = crypto.getRandomValues(new Uint8Array(1))[0] + 1

    const sourced = crypto.getRandomValues(new Uint8Array(length))

    const encoded = base32.encode(sourced)
    const decoded = base32.decode(encoded)

    try {
      assert(sourced.toHex() === decoded.toHex())
    } catch (error) {
      console.debug(sourced.toHex())

      console.debug(encoded)

      console.debug(decoded.toHex())

      throw error
    }
  }
})

test("base32 #1", async () => {
  const sourced = Uint8Array.fromHex("DEADBEEF")

  const encoded = base32.encode(sourced)
  const decoded = base32.decode(encoded)

  assert(encoded === "32W353Y=")

  assert(sourced.toHex() === decoded.toHex())
})

test("base32 #2", async () => {
  const sourced = Uint8Array.fromHex("FFFFFFFFFF")

  const encoded = base32.encode(sourced)
  const decoded = base32.decode(encoded)

  assert(encoded === "77777777")

  assert(sourced.toHex() === decoded.toHex())
})

test("base32 #3", async () => {
  const sourced = Uint8Array.fromHex("0000000000")

  const encoded = base32.encode(sourced)
  const decoded = base32.decode(encoded)

  assert(encoded === "AAAAAAAA")

  assert(sourced.toHex() === decoded.toHex())
})

test("base32 #4", async () => {
  const sourced = Uint8Array.fromHex("d8dA6BF26964aF9D7eEd9e03E53415D37aA96045")

  const encoded = base32.encode(sourced)
  const decoded = base32.decode(encoded)

  assert(encoded === "3DNGX4TJMSXZ27XNTYB6KNAV2N5KSYCF")

  assert(sourced.toHex() === decoded.toHex())
})