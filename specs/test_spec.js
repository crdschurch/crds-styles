describe("Test CSS", function() {
  var frame;

  beforeEach(function(done){
    frame = quixote.createFrame({
      stylesheet: "/base/assets/stylesheets/test.css"
    }, done);
  });

  it("should render black background", function() {
    body = frame.get("body");
    expect(body.getRawStyle("background-color")).toEqual('rgb(0, 0, 0)');
  });
});
