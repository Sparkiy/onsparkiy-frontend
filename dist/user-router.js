System.register([], function (_export) {
  'use strict';

  var UserRouter;

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  return {
    setters: [],
    execute: function () {
      UserRouter = (function () {
        function UserRouter() {
          _classCallCheck(this, UserRouter);
        }

        UserRouter.prototype.configureRouter = function configureRouter(config, router) {
          config.map([{ route: ['', 'me'], moduleId: './profile', nav: true, title: 'My profile' }]);

          this.router = router;
        };

        return UserRouter;
      })();

      _export('UserRouter', UserRouter);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVzZXItcm91dGVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztNQUlhLFVBQVU7Ozs7Ozs7QUFBVixnQkFBVTtpQkFBVixVQUFVO2dDQUFWLFVBQVU7OztBQUFWLGtCQUFVLFdBQ3JCLGVBQWUsR0FBQSx5QkFBQyxNQUFNLEVBQUUsTUFBTSxFQUFDO0FBQzdCLGdCQUFNLENBQUMsR0FBRyxDQUFDLENBQ1QsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLEVBQUcsUUFBUSxFQUFFLFdBQVcsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxZQUFZLEVBQUUsQ0FDOUUsQ0FBQyxDQUFDOztBQUVILGNBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1NBQ3RCOztlQVBVLFVBQVU7Ozs0QkFBVixVQUFVIiwiZmlsZSI6InVzZXItcm91dGVyLmpzIiwic291cmNlUm9vdCI6Ii4uL3NyYy8ifQ==