function myFunction() {
  const target_sheet_names = ["携帯空間", "買取ベストワン"]
  const scraper = new Scraper();

  target_sheet_names.forEach(sheet_name => {
    scraper.execute(sheet_name)
  })
}