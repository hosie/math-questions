

/*for details on how to use the elemnet locator, https://angular.github.io/protractor/#/locators*/

describe('basic (quick) end to end tests',function(){
  afterEach(function() {
    browser.manage().logs().get('browser').then(function(browserLog) {
      expect(browserLog.length).toEqual(0);
      // Uncomment to actually see the log.
      console.log('log: ' + require('util').inspect(browserLog));
    });
  });
  
  describe('question preview',function(){
    beforeEach(function() {
      browser.get('http://localhost:8000/mathQuestions/#/questionPreview');    
    });
    
    it('populates selection box',function(){
      var select = element(by.id('topicDropDown'));
      var allOptions = element.all(by.options('topic.id as topic.description for topic in availableTopics'));
      expect(allOptions.count()).toBe(8);//TODO this is the total number of topics plus 1  Not sure how to get rid of the plus 1
    });
    
    
  });

  xdescribe('worksheet generator',function(){

    beforeEach(function() {
      browser.get('http://localhost:8000/mathQuestions/#/worksheet');
      element(by.id("generateButton")).click();
    });

    

    it('generates correct number of weeks',function(){
      var weeks = element.all(by.repeater('week in weeks'));
      expect(weeks.count()).toBe(39);
    });

    it('generates correct number of sheets in week 1',function(){
      var weeks = element.all(by.repeater('week in weeks'));
      
      
      var sheets = weeks.get(0).all(by.repeater('sheet in week.worksheets'));

      expect(sheets.count()).toBe(5);
      
    });
    
    xit('generates correct week and sheet numbers in subheading',function(){
      
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
    
    describe('mental strategites table',function(){
      it('has 10 rows',function(){
        var tables = element.all(by.css('.mentalStrategiesTable'));
        expect (tables.count()).not.toEqual(0);      
        var table = tables.get(0);
        var rows = table.all(by.css('.questionRow'));
        expect(rows.count()).toEqual(10,"expected 10 rows");
        
                
              
      }); 
      
      it('each row has correct quesion number',function(){
        var tables = element.all(by.css('.mentalStrategiesTable'));
        expect (tables.count()).not.toEqual(0);      
        var table = tables.get(0);
        var rows = table.all(by.css('.questionRow'));
        rows.each(function(row,rowIndex){
          var expectedQuestionNumber=rowIndex+1;
          var expectedText = ''+expectedQuestionNumber;
          var questionNumber = row.element(by.css('.questionNumber')).getText();
          expect(questionNumber).toEqual(expectedText,'wrong question number in row');        
        });
      });
    });

    describe('times table table',function(){

      it('has 10 rows',function(){
        var tables = element.all(by.css('.timesTableTable'));
        expect (tables.count()).not.toEqual(0);
        var table = tables.get(0);
        var rows = table.all(by.css('.questionRow'));
        expect (rows.count()).toEqual(10,"expected 10 rows");              
        
      });

      it('each row has a correct question numeber',function(){
        var tables = element.all(by.css('.timesTableTable'));
        var table = tables.get(0);
        var rows = table.all(by.css('.questionRow'));
        rows.each(function(row,rowIndex){
          var expectedQuestionNumber=rowIndex+1;
          var expectedText = ''+expectedQuestionNumber;
          var questionNumber = row.element(by.css('.questionNumber')).getText();
          expect(questionNumber).toEqual(expectedText,'wrong question number in row');        
        });        
        
      });
      
    });
    
  });

  
});

  
  

