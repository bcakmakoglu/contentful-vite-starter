import { promises } from 'fs'
import { resolve } from 'path'

export async function scan(path: string, validCb: (file: string) => boolean = () => true): Promise<string[]> {
  let arr: string[] = []
  const scanDir = async (dir: string) => {
    try {
      const files = await promises.readdir(dir)
      if (files) {
        for (const file of files) {
          const item = resolve(dir, file)
          const stats = await promises.lstat(item)
          if (stats && stats.isDirectory()) {
            await scanDir(item)
          } else if ((!stats || stats.isFile()) && validCb(file)) {
            const fileName = file.split('.')
            arr = [...arr, fileName[0]]
          }
        }
      }
    } catch (e) {
      console.error(e)
    }
  }

  await scanDir(path)
  return arr
}
