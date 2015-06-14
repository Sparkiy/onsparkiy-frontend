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
            config.map([{ route: ["", "auth"], moduleId: "./auth", nav: false, title: "Login" }]);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Y0FRYSxHQUFHOzs7Ozs7OEJBSlIsTUFBTTs7O0FBSUQsU0FBRztBQUtILGlCQUxBLEdBQUcsQ0FLRixNQUFNLEVBQUU7Z0NBTFQsR0FBRzs7QUFNWixjQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztBQUNyQixjQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxVQUFBLE1BQU0sRUFBSTtBQUM5QixrQkFBTSxDQUFDLEtBQUssR0FBRyxTQUFTLENBQUM7QUFDekIsa0JBQU0sQ0FBQyxHQUFHLENBQUMsQ0FDVCxFQUFDLEtBQUssRUFBRSxDQUFDLEVBQUUsRUFBRSxNQUFNLENBQUMsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBQyxDQUN0RSxDQUFDLENBQUM7V0FDSixDQUFDLENBQUM7U0FDSjs7QUFiVSxXQUFHLENBQ1AsTUFBTSxHQUFBLGtCQUFHO0FBQ2QsaUJBQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztTQUNqQjs7ZUFIVSxHQUFHOzs7cUJBQUgsR0FBRyIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VSb290IjoiLi4vc3JjLyJ9