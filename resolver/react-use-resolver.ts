import { promises } from 'fs'
import { resolve } from 'path'
import { ImportInfo } from 'unplugin-auto-import/dist/types'

const defaultPath = resolve(__dirname, '../node_modules/react-use/lib')
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
        } else if ((!stats || stats.isFile()) && valid(file)) {
          const fileName = file.split('.')
          arr = [...arr, fileName[0]]
        }
      }
    }
  } catch (e) {
    console.error(e)
  }
}

function valid(name: string) {
  return (
    !name.toLowerCase().startsWith('readme') &&
    !name.toLowerCase().startsWith('package') &&
    !name.toLowerCase().startsWith('component') &&
    !name.toLowerCase().startsWith('factory') &&
    !name.toLowerCase().startsWith('misc') &&
    !name.toLowerCase().startsWith('index')
  )
}

const Resolver: () => (name: string) => ImportInfo | undefined = () => {
  scan(defaultPath)
  return (name: string) => {
    if (arr.includes(name)) {
      return {
        module: 'react-use',
        name,
      }
    }
  }
}

export default Resolver
