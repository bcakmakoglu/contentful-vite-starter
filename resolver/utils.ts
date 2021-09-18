export function camelToKebab(key: string) {
  const result = key
    .replace(/:/g, '-')
    .replace(/([A-Z])/g, ' $1')
    .trim()
  return result.split(/\s+/g).join('-').toLowerCase()
}

export function camelize(str: string) {
  return str.replace(/-([a-z0-9])/g, (g) => g[1].toUpperCase())
}

export function pascalize(str: string) {
  const camel = camelize(str)
  return camel[0].toUpperCase() + camel.slice(1)
}

export function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}
