class Scraper{
  constructor() {
    this.ss = SpreadsheetApp.getActiveSpreadsheet();
    this.cacheStore = new CacheStore();
  }

  execute(sheet_name){
    const sheet = this.ss.getSheetByName(sheet_name);
    const values = sheet.getDataRange().getValues()
    const lastColumn = sheet.getLastColumn();

    const modelNameRow         = 0
    const urlRow               = 2
    const modelNameSelectorRow = 3
    const priceSelectorRow     = 4
    
    const today = new Date();
    const arr = [today]

    for(let i = 1; i < lastColumn; i++) {
    let modelName = values[modelNameRow][i];
    if(!(modelName)){
      arr.push("")
      continue 
    }

    const url = values[urlRow][i]
    if(!(url)){
      arr.push("URLを入力ください")
      continue 
    }
    let $

    // 同URLはキャッシュしたパース済HTMLを使い回し無駄な通信を防ぐ
    if (this.cacheStore.hasValue(url)){
      $ = this.cacheStore.read(url)
    } else {
      try {
        let html = UrlFetchApp.fetch(url).getContentText()
        $ = Cheerio.load(html,{ decodeEntities: false });
      } catch(e) {
        arr.push(e.message.replace(/\r?\n/g, ''))
        continue
      }
      this.cacheStore.write(url, $)
    }

    let model_name_selector = values[modelNameSelectorRow][i]
    if(!(model_name_selector)){
      arr.push("機種名selectorを入力ください")
      continue 
    }
    let scraped_model_name = $(model_name_selector).text();
    if(!(scraped_model_name.replace(/\s+/g, '').match(modelName.replace(/\s+/g, '')))){
      arr.push("ページ構造が変化したか機種名selectorが正しくないので、ご確認ください")
      continue
    }
    
    let price_selector = values[priceSelectorRow][i]
    if(!(price_selector)){
      arr.push("価格selectorを入力ください")
      continue 
    }
    let scraped_price = $(price_selector).text();
    if(!(scraped_price)){ 
      arr.push("指定の価格selectorで要素を取得できません") 
      continue
    }

    arr.push(scraped_price)
  }
  sheet.appendRow(arr)
  }
}
