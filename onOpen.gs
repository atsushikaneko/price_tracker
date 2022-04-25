function onOpen() { 
 var ui = SpreadsheetApp.getUi(); 
 var menu = ui.createMenu("スクリプト"); //メニュー名 
 menu.addItem('クロール実行','main'); //表示名、スクリプト名 
 menu.addToUi(); 
}