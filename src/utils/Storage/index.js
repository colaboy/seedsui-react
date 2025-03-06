import Storage from './Storage'
import useCacheState from './useCacheState'
import clearCache from './useCacheState/clearCache'
import setCache from './useCacheState/setCache'
import getCache from './useCacheState/getCache'

Storage.useCacheState = useCacheState
Storage.clearCache = clearCache
Storage.setCache = setCache
Storage.getCache = getCache
export default Storage
