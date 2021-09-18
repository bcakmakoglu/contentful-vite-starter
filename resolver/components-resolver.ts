import { promises } from 'fs'
import { resolve } from 'path'
import { ImportInfo } from 'unplugin-auto-import/dist/types'

import { camelToKebab, pascalize } from './utils'

interface Options {
  componentPrefix?: string // set to '' for no prefix
}

const path = resolve(__dirname, '../src/components')
let arr: string[] = []

async function scan(folder: string) {
  try {
    const files = await promises.readdir(folder)
    if (files) {
      for (const file of files) {
        const item = resolve(folder, file)
        const stats = await promises.lstat(item)
        if (stats && stats.isDirectory()) {
          await scan(item)
        } else if (!stats || stats.isFile()) {
          const fileName = file.split('.')
          arr = [...arr, fileName[0]]
        }
      }
    }
  } catch (e) {
    console.error(e)
  }
}

const Resolver: (options?: Options) => (name: string) => ImportInfo | undefined = (options = {}) => {
  const { componentPrefix: rawPrefix = options?.componentPrefix ?? '' } = options
  scan(path)
  return (name) => {
    const prefix = rawPrefix ? `${camelToKebab(rawPrefix)}-` : ''
    const kebab = camelToKebab(name)
    if (!kebab.startsWith(prefix)) return
    const slice = kebab.slice(prefix.length)
    if (arr.includes(name)) {
      return {
        module: `~/components/${pascalize(slice)}`,
        name: pascalize(slice),
        from: 'default',
      }
    }
  }
}

export default Resolver
