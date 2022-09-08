class CacheStore {
  constructor() {
    this.store = {}
  }

  read(key) {
    return this.store[key]
  }

  write(key, value) {
    this.store[key] = value
  }

  hasValue(key) {
    return !!(this.store[key])
  }
}
