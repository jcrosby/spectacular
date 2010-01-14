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
});
