describe('Directive data preperation',function(){
  beforeEach(module('GreatMath.directives'));
  
  var dataPreperation;
  var $rootScope;
  
  beforeEach(inject(function( _dataPreperation_,_$rootScope_) {
    
    dataPreperation=_dataPreperation_;
    $rootScope = _$rootScope_;
  }));
  
  describe('prepare leaderboard data',function(){
    
    var prepareLeaderboardData;
    var scope = {
        player:{
          score:
          {
            correct:10,
            incorrect:1
          }
        },
        opponents:[
          {
            name:"Fred",
            score:
              {
                correct:5,
                incorrect:3                
              }              
          },
          {
            name:"Barney",
            score:
              {
                correct:10,
                incorrect:3                
              }              
          },
          {
            name:"Willma",
            score:
              {
                correct:9,
                incorrect:1                
              }              
          }
          
        ]
      };
      
    beforeEach(function(){
      prepareLeaderboardData=dataPreperation.prepareLeaderboardData;
    });
    
    it('preserves scope data',function(done){    
      prepareLeaderboardData(scope)
      .then(function(data){
        expect(data.player).toEqual(scope.player);
        expect(data.opponents).toEqual(scope.opponents);
        done();
      });
      $rootScope.$digest();
    });
    
    it('calculates lead gross scorer',function(done){
      prepareLeaderboardData(scope)
      .then(function(data){
        expect(data.maxCorrectScorer.index).toEqual(1);
        expect(data.maxCorrectScorer.score).toEqual(10);        
        done();
      });
      $rootScope.$digest();
    });

    it('calculates lead net scorer',function(done){
      prepareLeaderboardData(scope)
      .then(function(data){
        expect(data.maxNetScorer.index).toEqual(2);
        expect(data.maxNetScorer.netScore).toEqual(8);
        done();
      });
      $rootScope.$digest();
    });
  });
});