# Pendule

Time-based one-time passcodes (TOTP) for the web

```bash
npm install @hazae41/pendule
```

[**📦 NPM**](https://www.npmjs.com/package/@hazae41/pendule)

## Features

### Current features
- 100% TypeScript and ESM
- No external dependencies
- SHA-1 TOTP

## Usage

### SHA-1 TOTP

Parse generator secret

```tsx
const totp = Sha1Totp.parseOrThrow("JBSWY3DPEHPK3PXP")
```

Parse generator url

```tsx
const totp = Sha1Totp.parseOrThrow("otpauth://totp/?secret=AAAABBBB22223333YYYYZZZZ66667777")
```

### Codes

Generate the current code

```tsx
const code = await totp.generate()
```

Automatically update code (with a margin of error of 1 second)

```tsx
setInterval(() => {
  code = await totp.generate()
}, 1000)
```

Log codes every time there is a new one

```tsx
const period = totp.period * 1000

const elapsed = Date.now() % period

const remaining = period - elapsed

setTimeout(() => {
  console.log(await totp.generate())

  setInterval(() => {
    console.log(await totp.generate())
  }, period)

  // New codes will now be displayed
}, remaining)
```