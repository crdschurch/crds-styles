describe("Test CSS", function() {
  var frame, el;

  beforeEach(function(done){
    frame = quixote.createFrame({
      stylesheet: "/base/assets/stylesheets/bootstrap.css"
    }, done);
  });

  describe("Body tests", function() {
    beforeEach(function() {
      frame.reset();
      el = frame.add(
        "<a href='#' class='btn btn-primary'>Primary</a>",
        "btn primary"
      );
    });

    it("should render black background", function() {
      body = frame.get("body");
      expect(body.getRawStyle("background-color")).toEqual('rgb(0, 0, 0)');
    });
  });
});
