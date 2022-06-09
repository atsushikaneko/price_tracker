function main() {
  const scraper = new Scraper();

  Setting.targetSheetNames.forEach(sheet_name => {
    scraper.execute(sheet_name)
  })
}