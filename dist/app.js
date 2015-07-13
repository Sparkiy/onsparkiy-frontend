System.register(["aurelia-router", "modernizr", "fastclick"], function (_export) {
  "use strict";

  var Router, App;

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  return {
    setters: [function (_aureliaRouter) {
      Router = _aureliaRouter.Router;
    }, function (_modernizr) {}, function (_fastclick) {}],
    execute: function () {
      App = (function () {
        function App(router) {
          _classCallCheck(this, App);

          this.router = router;
          this.router.configure(function (config) {
            config.title = "Sparkiy";
            config.map([{ route: ["", "auth"], moduleId: "./auth", nav: false, title: "Login" }, { route: ["profile"], moduleId: "./user-router" }]);
          });
        }

        App.inject = function inject() {
          return [Router];
        };

        return App;
      })();

      _export("App", App);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Y0FRYSxHQUFHOzs7Ozs7OEJBSlIsTUFBTTs7O0FBSUQsU0FBRztBQUtILGlCQUxBLEdBQUcsQ0FLRixNQUFNLEVBQUU7Z0NBTFQsR0FBRzs7QUFNWixjQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztBQUNyQixjQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxVQUFBLE1BQU0sRUFBSTtBQUM5QixrQkFBTSxDQUFDLEtBQUssR0FBRyxTQUFTLENBQUM7QUFDekIsa0JBQU0sQ0FBQyxHQUFHLENBQUMsQ0FDVCxFQUFDLEtBQUssRUFBRSxDQUFDLEVBQUUsRUFBRSxNQUFNLENBQUMsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBQyxFQUNyRSxFQUFDLEtBQUssRUFBRSxDQUFDLFNBQVMsQ0FBQyxFQUFFLFFBQVEsRUFBRSxlQUFlLEVBQUMsQ0FDaEQsQ0FBQyxDQUFDO1dBQ0osQ0FBQyxDQUFDO1NBQ0o7O0FBZFUsV0FBRyxDQUNQLE1BQU0sR0FBQSxrQkFBRztBQUNkLGlCQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDakI7O2VBSFUsR0FBRzs7O3FCQUFILEdBQUciLCJmaWxlIjoiYXBwLmpzIiwic291cmNlUm9vdCI6Ii4uL3NyYy8ifQ==