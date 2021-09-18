import * as Components from '@contentful/forma-36-react-components'
import { ImportInfo } from 'unplugin-auto-import/dist/types'

import { camelToKebab, pascalize } from './utils'

interface Options {
  module: string
  componentPrefix?: string // set to '' for no prefix
  enabledComponents?: string[] // which components to enable, i.e. accordion, asset etc.
}

function resolve(name: string, collection: string[]): name is string {
  return collection.includes(pascalize(name)) && name !== 'default'
}

const inCollection = (name: string, enabledComponents?: string[]) => {
  return (
    (enabledComponents && enabledComponents.find((component) => component.toLowerCase().startsWith(name.toLowerCase()))) ||
    !enabledComponents ||
    !enabledComponents.length
  )
}

const Resolver: (options: Options) => (name: string) => ImportInfo | undefined = (options: Options) => {
  const { componentPrefix: rawPrefix = options.componentPrefix ?? 'cf', enabledComponents, module } = options

  return (name: string) => {
    const prefix = rawPrefix ? `${camelToKebab(rawPrefix)}-` : ''
    const kebab = camelToKebab(name)
    if (!kebab.startsWith(prefix)) return
    const slice = kebab.slice(prefix.length)
    if (!inCollection(slice, enabledComponents)) return
    if (resolve(slice, [...Object.keys(Components)])) {
      return {
        module,
        name,
        from: pascalize(slice),
      }
    }
  }
}

export default Resolver
