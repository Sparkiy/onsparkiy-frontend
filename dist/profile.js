System.register(['aurelia-framework', 'aurelia-router', './web-api', 'jquery'], function (_export) {
  'use strict';

  var inject, Router, WebAPI, Profile;

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  return {
    setters: [function (_aureliaFramework) {
      inject = _aureliaFramework.inject;
    }, function (_aureliaRouter) {
      Router = _aureliaRouter.Router;
    }, function (_webApi) {
      WebAPI = _webApi.WebAPI;
    }, function (_jquery) {}],
    execute: function () {
      Profile = (function () {
        function Profile(router, api) {
          var _this = this;

          _classCallCheck(this, Profile);

          this.router = null;
          this.api = null;
          this.username = '';

          this.router = router;
          this.api = api;

          this.api.getProfile().then(function (result) {
            if (result) {
              console.log(result);
              _this.username = result.user.userName;
            }
          });
        }

        _createClass(Profile, null, [{
          key: 'inject',
          value: [Router, WebAPI],
          enumerable: true
        }]);

        return Profile;
      })();

      _export('Profile', Profile);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByb2ZpbGUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OzhCQVNhLE9BQU87Ozs7Ozs7O2lDQUxaLE1BQU07OzhCQUNOLE1BQU07O3VCQUNOLE1BQU07OztBQUdELGFBQU87QUFPUCxpQkFQQSxPQUFPLENBT04sTUFBTSxFQUFFLEdBQUcsRUFBRTs7O2dDQVBkLE9BQU87O2VBQ2xCLE1BQU0sR0FBRyxJQUFJO2VBQ2IsR0FBRyxHQUFHLElBQUk7ZUFFVixRQUFRLEdBQUcsRUFBRTs7QUFJWCxjQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztBQUNyQixjQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQzs7QUFFZixjQUFJLENBQUMsR0FBRyxDQUFDLFVBQVUsRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFBLE1BQU0sRUFBSTtBQUNuQyxnQkFBSSxNQUFNLEVBQUU7QUFDVixxQkFBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUNwQixvQkFBSyxRQUFRLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7YUFDdEM7V0FDRixDQUFDLENBQUM7U0FDSjs7cUJBakJVLE9BQU87O2lCQU1GLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQzs7OztlQU5yQixPQUFPOzs7eUJBQVAsT0FBTyIsImZpbGUiOiJwcm9maWxlLmpzIiwic291cmNlUm9vdCI6Ii4uL3NyYy8ifQ==