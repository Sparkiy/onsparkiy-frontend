/**
 * Created by Aleksandar Toplek on 14.6.2015..
 */

import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {WebAPI} from './web-api';
import {Validation} from 'aurelia-validation';
import {computedFrom} from 'aurelia-framework';
import "jquery";

export class Auth {
  isRegister = false;
  headerText = "Registered User";
  actionButtonText = "Log in";

  static inject = [Router, WebAPI];
  constructor(router, api) {
    this.router = router;
    this.api = api;

    this.username = "";
    this.email = "";
    this.password = "";
  }

  submitForm() {
    this.setEnabledSubmitCommand(false);

    // Check if the validation is valid before performing the submit
    if (this.isRegister) {
      this.register();
    }
    else {
      this.login();
    }
  }

  setEnabledSubmitCommand(isEnabled) {
    if (isEnabled)
      // Enable submit button
      $("#submit-form-signin").removeAttr("disabled");
    else
      // Disable submit button
      $("#submit-form-signin").attr("disabled", "disabled");
  }

  register() {
    // Check if username already exists
    this.api.checkUsername(this.username).then(isValid => {
      // Continue to registration if username is valid
      if (isValid) {
        this.api.register(this.username, this.password, this.email).then(result => {
          if (result)
            this.login();
          else console.error("Failed to register");

          this.setEnabledSubmitCommand(true);
        });
      }
      else {
        // Show user name taken message
      }

      this.setEnabledSubmitCommand(true);
    });
  }

  login() {
    this.api.getToken(this.username, this.password).then(result => {
      this.router.navigate('profile');
    });
  }

  signUpClick() {
    this.isRegister = true;

    // Show username field
    $(".signup-field").removeClass("hidden").addClass("appear-vertical");
    $(".signup-field input").focus();

    // Change header
    this.headerText = "New User";

    // Remove secondary class from action button
    // Change text to "Sign up"
    $(".action-button").removeClass("secondary");
    this.actionButtonText = "Sign up";

    // Remove signup message
    $(".signup-message").hide();
  }
}
