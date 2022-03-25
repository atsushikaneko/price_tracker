class CacheStore{
  constructor() {
    this.store = {}
  }

  read(url){
    return this.store[url]
  }

  write(url, html){
    this.store[url] = html
  }

  hasValue(url){
    return !!(this.store[url])
  }
}
