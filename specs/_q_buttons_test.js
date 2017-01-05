describe("buttons", function() {
  var frame, el;

  beforeEach(function(done){
    frame = quixote.createFrame({
      stylesheet: "/base/assets/stylesheets/bootstrap.css"
    }, done);
  });

  describe("default button style", function() {
    beforeEach(function() {
      frame.reset();
      el = frame.add(
        // Standard button
        '<button type="button" class="btn btn-default">Default</button>',
        "bs buttons"
      );
    });

    it("should have rounded corners", function() {
      var buttons = frame.get(".btn");
      expect(buttons.getRawStyle("border-radius")).toEqual("4px");
    });

    it("should have a solid border", function() {
      var buttons = frame.get(".btn");
      expect(buttons.getRawStyle("border-style")).toEqual("solid");
      expect(buttons.getRawStyle("border-width")).toEqual("1px");
    });
  });

  describe("primary button style", function() {
    beforeEach(function() {
      frame.reset();
      el = frame.add(
        '<button type="button" class="btn btn-primary">Primary</button>',
        "bs buttons"
      );
    });

    it("should have a blue background", function() {
      var primary_btn = frame.get(".btn-primary");
      expect(primary_btn.getRawStyle("background-color")).toEqual('rgb(51, 122, 183)');
    });

    it("should have white text", function() {
      var primary_btn = frame.get(".btn-primary");
      expect(primary_btn.getRawStyle("color")).toEqual('rgb(255, 255, 255)');
    });

    it("should have a dark blue border", function() {
      var primary_btn = frame.get(".btn-primary");
      expect(primary_btn.getRawStyle("border-color")).toEqual('rgb(46, 109, 164)');
    });
  });

  describe("success button style", function() {
    beforeEach(function() {
      frame.reset();
      el = frame.add(
        '<button type="button" class="btn btn-success">Success</button>',
        "bs buttons"
      );
    });

    it("should have a green background", function() {
      var success_btn = frame.get(".btn-success");
      expect(success_btn.getRawStyle("background-color")).toEqual('rgb(92, 184, 92)');
    });

    it("should have white text", function() {
      var success_btn = frame.get(".btn-success");
      expect(success_btn.getRawStyle("color")).toEqual('rgb(255, 255, 255)');
    });

    it("should have a dark green border", function() {
      var success_btn = frame.get(".btn-success");
      expect(success_btn.getRawStyle("border-color")).toEqual('rgb(76, 174, 76)');
    });
  });

  describe("info button style", function() {
    beforeEach(function() {
      frame.reset();
      el = frame.add(
        '<button type="button" class="btn btn-info">Info</button>',
        "bs buttons"
      );
    });

    it("should have a cyan background", function() {
      var info_btn = frame.get(".btn-info");
      expect(info_btn.getRawStyle("background-color")).toEqual('rgb(91, 192, 222)');
    });

    it("should have white text", function() {
      var info_btn = frame.get(".btn-info");
      expect(info_btn.getRawStyle("color")).toEqual('rgb(255, 255, 255)');
    });

    it("should have a dark cyan border", function() {
      var info_btn = frame.get(".btn-info");
      expect(info_btn.getRawStyle("border-color")).toEqual('rgb(70, 184, 218)');
    });
  });

  describe("warning button style", function() {
    beforeEach(function() {
      frame.reset();
      el = frame.add(
        '<button type="button" class="btn btn-warning">Warning</button>',
        "bs buttons"
      );
    });

    it("should have a mustard background", function() {
      var warning_btn = frame.get(".btn-warning");
      expect(warning_btn.getRawStyle("background-color")).toEqual('rgb(240, 173, 78)');
    });

    it("should have white text", function() {
      var warning_btn = frame.get(".btn-warning");
      expect(warning_btn.getRawStyle("color")).toEqual('rgb(255, 255, 255)');
    });

    it("should have a dark mustard border", function() {
      var warning_btn = frame.get(".btn-warning");
      expect(warning_btn.getRawStyle("border-color")).toEqual('rgb(238, 162, 54)');
    });
  });

  describe("danger button style", function() {
    beforeEach(function() {
      frame.reset();
      el = frame.add(
        '<button type="button" class="btn btn-danger">Danger</button>',
        "bs buttons"
      );
    });

    it("should have a scarlet background", function() {
      var danger_btn = frame.get(".btn-danger");
      expect(danger_btn.getRawStyle("background-color")).toEqual('rgb(217, 83, 79)');
    });

    it("should have white text", function() {
      var danger_btn = frame.get(".btn-danger");
      expect(danger_btn.getRawStyle("color")).toEqual('rgb(255, 255, 255)');
    });

    it("should have a dark scarlet border", function() {
      var danger_btn = frame.get(".btn-danger");
      expect(danger_btn.getRawStyle("border-color")).toEqual('rgb(212, 63, 58)');
    });
  });

  describe("link button style", function() {
    beforeEach(function() {
      frame.reset();
      el = frame.add(
        '<button type="button" class="btn btn-link">Link</button>',
        "bs buttons"
      );
    });

    it("should have no background", function() {
      var link_btn = frame.get(".btn-link");
      expect(link_btn.getRawStyle("background-color")).toEqual('rgba(0, 0, 0, 0)');
    });

    it("should have blue text", function() {
      var link_btn = frame.get(".btn-link");
      expect(link_btn.getRawStyle("color")).toEqual('rgb(51, 122, 183)');
    });

    it("should have no border", function() {
      var link_btn = frame.get(".btn-link");
      expect(link_btn.getRawStyle("border-color")).toEqual('rgba(0, 0, 0, 0)');
    });
  });
});
