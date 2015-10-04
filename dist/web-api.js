System.register([], function (_export) {
  "use strict";

  var WebAPI;

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  return {
    setters: [],
    execute: function () {
      WebAPI = (function () {
        function WebAPI() {
          _classCallCheck(this, WebAPI);

          this.isRequesting = false;
          this.loginData = null;
          this.SparkiyTokenCookieKey = "sparkiyToken";
          this.apiUrl = "https://microsoft-apiapp0ce6e00ab5d74279b1ffee5602d2b5a0.azurewebsites.net/";
          this.apiToken = "token";
          this.apiProfile = "profile";
        }

        WebAPI.prototype.getToken = function getToken(username, password) {
          var _this = this;

          this.isRequesting = true;
          return new Promise(function (resolve) {
            var content = {
              grant_type: "password",
              username: username,
              password: password
            };

            $.ajax({
              method: "POST",
              url: _this.apiUrl + _this.apiToken,
              data: content
            }).done(function (result) {
              var token = result.access_token;

              _this.loginData = _this.createLoginData(token);

              _this.saveLoginData();

              resolve(_this.loginData);
              _this.isRequesting = false;
            });
          });
        };

        WebAPI.prototype.getProfile = function getProfile() {
          var _this2 = this;

          this.isRequesting = true;
          return new Promise(function (resolve) {
            if (!_this2.isLoggedIn()) {
              resolve(null);
              _this2.isRequesting = false;
            }

            $.ajax({
              method: "GET",
              url: _this2.apiUrl + _this2.apiProfile,
              headers: {
                Authorization: _this2.loginData.Authorization
              }
            }).done(function (result) {
              resolve(result);

              _this2.isRequesting = false;
            });
          });
        };

        WebAPI.prototype.isLoggedIn = function isLoggedIn() {
          if (this.loginData == null) {
            var token = this.loadToken();

            if (!token || token == "") {
              return false;
            } else {
              this.loginData = this.createLoginData(token);
            }
          }
          return true;
        };

        WebAPI.prototype.createLoginData = function createLoginData(token) {
          return { Authorization: "Bearer " + token };
        };

        WebAPI.prototype.saveLoginData = function saveLoginData() {
          var token = this.loginData.Authorization.split(" ")[1];

          if (token && token != "") this.saveToken(token);
        };

        WebAPI.prototype.getCookie = function getCookie(cname) {
          var name = cname + "=";
          var ca = document.cookie.split(";");
          for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == " ") c = c.substring(1);
            if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
          }
          return "";
        };

        WebAPI.prototype.loadToken = function loadToken() {
          return this.getCookie(this.SparkiyTokenCookieKey);
        };

        WebAPI.prototype.saveToken = function saveToken(token) {
          this.setCookie(this.SparkiyTokenCookieKey, token, 1);
        };

        WebAPI.prototype.setCookie = function setCookie(cname, cvalue, exdays) {
          var d = new Date();
          d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
          var expires = "expires=" + d.toUTCString();
          document.cookie = cname + "=" + cvalue + "; " + expires;
        };

        return WebAPI;
      })();

      _export("WebAPI", WebAPI);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,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QUFFLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztTQUN0RDs7QUE1SFUsY0FBTSxXQThIakIsU0FBUyxHQUFBLG1CQUFDLEtBQUssRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFO0FBRS9CLGNBQUksQ0FBQyxHQUFHLElBQUksSUFBSSxFQUFFLENBQUM7QUFDbkIsV0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsT0FBTyxFQUFFLEdBQUksTUFBTSxHQUFDLEVBQUUsR0FBQyxFQUFFLEdBQUMsRUFBRSxHQUFDLElBQUksQUFBQyxDQUFDLENBQUM7QUFDaEQsY0FBSSxPQUFPLEdBQUcsVUFBVSxHQUFDLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQztBQUN6QyxrQkFBUSxDQUFDLE1BQU0sR0FBRyxLQUFLLEdBQUcsR0FBRyxHQUFHLE1BQU0sR0FBRyxJQUFJLEdBQUcsT0FBTyxDQUFDO1NBQ3pEOztlQXBJVSxNQUFNOzs7d0JBQU4sTUFBTSIsImZpbGUiOiJ3ZWItYXBpLmpzIiwic291cmNlUm9vdCI6Ii4uL3NyYy8ifQ==