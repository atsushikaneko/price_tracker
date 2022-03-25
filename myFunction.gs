function myFunction() {
  // const ss = SpreadsheetApp.getActiveSpreadsheet();
  const target_sheet_names = ["携帯空間", "買取ベストワン"]

  // const sheet = ss.getSheets()[0];

  const cacheStore = new CacheStore();
  const scraper = new Scraper();

  target_sheet_names.forEach(sheet_name => {
    scraper.execute(sheet_name)
  })
}