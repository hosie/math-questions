/*for details on how to use the elemnet locator, https://angular.github.io/protractor/#/locators*/

describe('worksheet generator',function(){

  beforeEach(function() {
    browser.get('http://localhost:8000/mathQuestions/#/worksheet');
    element(by.id("generateButton")).click();
  });

  afterEach(function() {
    browser.manage().logs().get('browser').then(function(browserLog) {
      expect(browserLog.length).toEqual(0);
      // Uncomment to actually see the log.
      console.log('log: ' + require('util').inspect(browserLog));
    });
  });

  it('generates correct number of weeks',function(){
    var weeks = element.all(by.repeater('week in weeks'));
    expect(weeks.count()).toBe(39);
  });

  it('generates correct number of sheets per week',function(){
    var weeks = element.all(by.repeater('week in weeks'));
    
    for(var i=0;i<39;i++){
      var sheets = weeks.get(i).all(by.repeater('sheet in week.worksheets'));

      expect(sheets.count()).toBe(5);
    }
  });
  
  it('generates correct week and sheet numbers in subheading',function(){
    
    var weeks = element.all(by.repeater('week in weeks'));
    weeks.each(function(week,weekIndex){
      var sheets = week.all(by.repeater('sheet in week.worksheets'));
      sheets.each(function(sheet,sheetIndex){
        var subHeading=sheet.element(by.css(".subheading"));
        var weekNumber=weekIndex+1;
        var sheetNumber = sheetIndex+1;
        expect(subHeading.getText()).toEqual("Year 7 Week " + weekNumber + " Session " + sheetNumber);
      });
    });    
  });
  
  xdescribe('mental strategites table',function(){
    it('has 10 rows',function(){
      var tables = element.all(by.css('.mentalStrategiesTable'));
      expect (tables.count()).not.toEqual(0);      
      tables.each(function(table,tableIndex){
        var rows = table.all(by.css('.questionRow'));
        expect(rows.count()).toEqual(10,"expected 10 rows");
        
        rows.each(function(row,rowIndex){
          var expectedQuestionNumber=rowIndex+1;
          var expectedText = ''+expectedQuestionNumber;
          var questionNumber = row.element(by.css('.questionNumber')).getText();
          expect(questionNumber).toEqual(expectedText,'wrong question number in row');        
        });        
      });      
    },120000);    
  });

  describe('times table table',function(){
    it('has 10 rows',function(){
      var tables = element.all(by.css('.timesTableTable'));
      expect (tables.count()).not.toEqual(0);
      tables.each(function(table,tableIndex){
        var rows = table.all(by.css('.questionRow'));
        expect (rows.count()).toEqual(10,"expected 10 rows");
        rows.each(function(row,rowIndex){
          var expectedQuestionNumber=rowIndex+1;
          var expectedText = ''+expectedQuestionNumber;
          var questionNumber = row.element(by.css('.questionNumber')).getText();
          expect(questionNumber).toEqual(expectedText,'wrong question number in row');        
        });        
      });
    },180000);
    
  });
  
});
  
  

