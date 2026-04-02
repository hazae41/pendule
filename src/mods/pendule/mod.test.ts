import { Sha1Totp } from "@/mods/pendule/mod.ts";
import { assert, test } from "@hazae41/phobos";

test("code", async () => {
  const totp = Sha1Totp.parseOrThrow("JBSWY3DPEHPK3PXP")

  const code = await totp.generate(new Date(1775108194537))

  assert(code === "831624")
})