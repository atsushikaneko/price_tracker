function myFunction() {
  const scraper = new Scraper();

  Setting.target_sheet_names.forEach(sheet_name => {
    scraper.execute(sheet_name)
  })
}