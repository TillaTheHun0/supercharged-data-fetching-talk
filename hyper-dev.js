import 'dotenv/config'

import { existsSync } from 'fs'
import { execSync } from 'child_process'
import { platform, arch } from 'os'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)

function getBinary () {
  const binaries = {
    linux: 'hyper-x86_64-unknown-linux-gnu',
    win32: 'hyper-x86_64-pc-windows-msvc.exe',
    darwinx86_64: 'hyper-x86_64-apple-darwin',
    darwinarm64: 'hyper-aarch64-apple-darwin'
  }

  const os = platform()
  let binary

  if (os === 'linux' || os === 'win32') {
    binary = binaries[os]
  } else if (os === 'darwin') {
    // darwin, so if arm64, use aarch64 binary, otherwise use darwin x86-64 binary
    const architecture = arch() === 'arm64' ? 'arm64' : 'x86_64'
    binary = binaries[`${os}${architecture}`]
  }

  return binary
}

if (!existsSync('./hyper-nano')) {
  const binary = getBinary()
  if (binary) {
    execSync(
      `curl https://hyperland.s3.amazonaws.com/${binary} -o ./hyper-nano && chmod +x ./hyper-nano`,
      {
        stdio: 'inherit',
        cwd: join(dirname(__filename))
      }
    )
  } else {
    console.log(
      `Platform ${platform()} not supported by hyper nano. Skipping hyper nano binary install...`
    )
  }
}

if (existsSync('./hyper-nano')) {
  execSync(
    `./hyper-nano --domain='${process.env.HYPER.split('/').pop()}' --experimental --data --cache`,
    {
      stdio: 'inherit',
      cwd: dirname(__filename)
    }
  )
}
