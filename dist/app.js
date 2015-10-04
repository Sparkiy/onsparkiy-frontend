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
        App.inject = function inject() {
          return [Router];
        };

        function App(router) {
          _classCallCheck(this, App);

          this.router = router;
          this.router.configure(function (config) {
            config.title = "Sparkiy";
            config.map([{ route: ["", "auth"], moduleId: "./auth", nav: false, title: "Login" }, { route: ["profile"], moduleId: "./user-router" }]);
          });
        }

        return App;
      })();

      _export("App", App);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Y0FRYSxHQUFHOzs7Ozs7OEJBSlIsTUFBTTs7O0FBSUQsU0FBRztBQUFILFdBQUcsQ0FDUCxNQUFNLEdBQUEsa0JBQUc7QUFDZCxpQkFBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQ2pCOztBQUVVLGlCQUxBLEdBQUcsQ0FLRixNQUFNLEVBQUU7Z0NBTFQsR0FBRzs7QUFNWixjQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztBQUNyQixjQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxVQUFBLE1BQU0sRUFBSTtBQUM5QixrQkFBTSxDQUFDLEtBQUssR0FBRyxTQUFTLENBQUM7QUFDekIsa0JBQU0sQ0FBQyxHQUFHLENBQUMsQ0FDVCxFQUFDLEtBQUssRUFBRSxDQUFDLEVBQUUsRUFBRSxNQUFNLENBQUMsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBQyxFQUNyRSxFQUFDLEtBQUssRUFBRSxDQUFDLFNBQVMsQ0FBQyxFQUFFLFFBQVEsRUFBRSxlQUFlLEVBQUMsQ0FDaEQsQ0FBQyxDQUFDO1dBQ0osQ0FBQyxDQUFDO1NBQ0o7O2VBZFUsR0FBRyIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VSb290IjoiLi4vc3JjLyJ9
