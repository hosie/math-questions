'use strict';

describe('GreatMath.topic-provider module', function() {
  beforeEach(module('GreatMath.topic-provider'));
  
  var topicProvider;
  
  beforeEach(inject(function( _topicProvider_) {
    
    topicProvider=_topicProvider_;
  }));
    
  describe('getTopics',function(){
    
    var topics;
    beforeEach(function(done){
      topicProvider.getTopics(function(result){
        topics=result;
        done();        
      })      
    });
    
    it('returns 26 topics',function(){
      expect(topics.length).toBe(26);
    });
    
    it('calls back asynchrously',function(done){
      //otherwise we don't know whether or not we are in a digest.
      //best to ensure that it is always async and consumer must make any scope updates in a digest block
      var sync=true;
      topicProvider.getTopics(function(result){
        expect(sync).toBe(false);
        done();
      });
      sync=false;
    });
        
  });
});