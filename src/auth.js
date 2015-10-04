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
    // Check if the validation is valid before performing the submit
    if (this.isRegister) {

    }
    else {
      this.login();
    }
  }

  login() {
    this.api.getToken(this.username, this.password).then(result => {
      this.router.navigate('profile');
    });
  }

  signUpClick() {
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
