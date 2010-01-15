describe("A test", function(){

  it("should pass sync", function(){ assert(true);  });
  it("should fail sync", function(){ assert(false); });

  it("should pass async", function(promise){
    promise.addCallback(function(){
      assert(true);
    })
    setTimeout(function(){ promise.emitSuccess() }, 500);
  });

  it("should fail async", function(promise){
    promise.addCallback(function(){
      assert(false);
    })
    setTimeout(function(){ promise.emitSuccess() }, 500);
  });

  it("should fail a timeout", 300, function(promise){
    promise.addCallback(function(){
      assert(true);
    })
    setTimeout(function(){ promise.emitSuccess() }, 1000);
  });

  it("Should pass simple sync tests after async ones", function(){
    assert(true);
  });
});
