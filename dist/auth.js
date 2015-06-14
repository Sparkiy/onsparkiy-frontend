System.register(['aurelia-validation', 'aurelia-framework', 'jquery'], function (_export) {
  'use strict';

  var Validation, computedFrom, inject, Auth;

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  return {
    setters: [function (_aureliaValidation) {
      Validation = _aureliaValidation.Validation;
    }, function (_aureliaFramework) {
      computedFrom = _aureliaFramework.computedFrom;
      inject = _aureliaFramework.inject;
    }, function (_jquery) {}],
    execute: function () {
      Auth = (function () {
        function Auth() {
          _classCallCheck(this, Auth);

          this.isRegister = false;
          this.headerText = 'Registered User';
          this.actionButtonText = 'Log in';

          this.username = '';
          this.email = '';
          this.password = '';
        }

        Auth.prototype.submitForm = function submitForm() {
          this.validation.validate().then(function () {
            console.log('submit');
          });
        };

        Auth.prototype.signUpClick = function signUpClick() {
          $('.signup-field').removeClass('hidden').addClass('appear-vertical');
          $('.signup-field input').focus();

          this.headerText = 'New User';

          $('.action-button').removeClass('secondary');
          this.actionButtonText = 'Sign up';

          $('.signup-message').hide();
        };

        return Auth;
      })();

      _export('Auth', Auth);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF1dGguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O3dDQVNhLElBQUk7Ozs7OztzQ0FMVCxVQUFVOzt1Q0FDVixZQUFZO2lDQUNaLE1BQU07OztBQUdELFVBQUk7QUFLSixpQkFMQSxJQUFJLEdBS0Q7Z0NBTEgsSUFBSTs7ZUFDZixVQUFVLEdBQUcsS0FBSztlQUNsQixVQUFVLEdBQUcsaUJBQWlCO2VBQzlCLGdCQUFnQixHQUFHLFFBQVE7O0FBR3pCLGNBQUksQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDO0FBQ25CLGNBQUksQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDO0FBQ2hCLGNBQUksQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDO1NBQ3BCOztBQVRVLFlBQUksV0FXZixVQUFVLEdBQUEsc0JBQUc7QUFFWCxjQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsRUFBRSxDQUFDLElBQUksQ0FBQyxZQUFNO0FBQ3BDLG1CQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1dBQ3ZCLENBQUMsQ0FBQztTQUNKOztBQWhCVSxZQUFJLFdBa0JmLFdBQVcsR0FBQSx1QkFBRztBQUVaLFdBQUMsQ0FBQyxlQUFlLENBQUMsQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLENBQUMsUUFBUSxDQUFDLGlCQUFpQixDQUFDLENBQUM7QUFDckUsV0FBQyxDQUFDLHFCQUFxQixDQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7O0FBR2pDLGNBQUksQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDOztBQUk3QixXQUFDLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDLENBQUM7QUFDN0MsY0FBSSxDQUFDLGdCQUFnQixHQUFHLFNBQVMsQ0FBQzs7QUFHbEMsV0FBQyxDQUFDLGlCQUFpQixDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7U0FDN0I7O2VBakNVLElBQUk7OztzQkFBSixJQUFJIiwiZmlsZSI6ImF1dGguanMiLCJzb3VyY2VSb290IjoiLi4vc3JjLyJ9