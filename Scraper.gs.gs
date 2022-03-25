class Scraper{
  // constructor(sheet) {
  //   this.sheet = sheet
  // }

  execute(sheet, cacheStore){
    const values = sheet.getDataRange().getValues()
    const lastColumn = sheet.getLastColumn();

    const modelRow         = 0
    const urlRow           = 2
    const modelSelectorRow = 3
    const priceSelectorRow = 4
    
    const today = new Date();
    const arr = [today]

    for(let i = 1; i < lastColumn; i++) {
    let model = values[modelRow][i];
    if(!(model)){
      arr.push("")
      continue 
    }

    console.log(values[urlRow][i]);
    const url = values[urlRow][i]
    if(!(url)){
      arr.push("URLを入力ください")
      continue 
    }
    let $

    if (cacheStore.hasValue(url)){
      $ = cacheStore.read(url)
    } else {
      try {
        let html = UrlFetchApp.fetch(url).getContentText()
        $ = Cheerio.load(html,{ decodeEntities: false });
      } catch(e) {
        arr.push(e.message.replace(/\r?\n/g, ''))
        continue
      }
      cacheStore.write(url, $)
    }

    let model_selector = values[modelSelectorRow][i]
    if(!(model_selector)){
      arr.push("機種selectorを入力ください")
      continue 
    }
    let model_scraped = $(model_selector).text();
    console.log(model_scraped.replace(/\s+/g, ''));
    console.log(model.replace(/\s+/g, ''));
    console.log(model.replace(/\s+/g, '').match(new RegExp(model_scraped.replace(/\s+/g, '')),"i"));
    if(!(model_scraped.replace(/\s+/g, '').match(model.replace(/\s+/g, '')))){
      arr.push("ページ構造が変化したか機種selectorが正しくないので、ご確認ください")
      continue
    }
    
    let price_selector = values[priceSelectorRow][i]
    if(!(price_selector)){
      arr.push("価格selectorを入力ください")
      continue 
    }
    let price = $(price_selector).text();
    if(!(price)){ 
      arr.push("指定の価格selectorで要素を取得できません") 
      continue
    }

    arr.push(price)
  }
  sheet.appendRow(arr)
  }
}
