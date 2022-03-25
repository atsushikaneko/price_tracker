function myFunction() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheets()[0];

  const cacheStore = new CacheStore();
  const scraper = new Scraper();

  scraper.execute(sheet, cacheStore)
}