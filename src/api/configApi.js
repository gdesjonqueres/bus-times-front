import storage from './storageApi'

const STORAGE_CONFIG_KEY = '@config'

export default {
  load:() => storage.get(STORAGE_CONFIG_KEY),
  save: config => storage.set(STORAGE_CONFIG_KEY, config)
}
