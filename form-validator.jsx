FormValidatorMixin = {
  validate: function() {
    var form_is_valid = true;

    for(var key in this.validations) {
      for(var validation in this.validations[key]) {
        var is_valid = true;

        switch(validation) {
          case 'required':
            if (this.validations[key][validation]) {
              is_valid = this._validateRequired(key);
            }
            break;
          case 'is_email':
            if (this.validations[key][validation]) {
              is_valid = this._validateEmail(key);
            }
            break;
          case 'equal_to':
            is_valid = this._validateEqualTo(key, this.validations[key][validation]);
            break;
        }

        if(!is_valid) {
          this.errorMessage = this.validations[key]['messages'][validation];
          form_is_valid = false;

          $(this.refs[key]).addClass('rfv-has-error');
        }
      }
    }

    return form_is_valid;
  },

  _validateRequired: function(key) {
    if(this.refs[key].value.trim() === "") {
      return false;
    }
    return true;
  },

  _validateEmail: function(key) {
    var email_regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return this._testRegex(email_regex, this.refs[key].value);
  },

  _validateEqualTo: function(key, target) {
    if(this.refs[key].value === this.refs[target].value) {
      return true;
    }
    return false;
  },

  _testRegex: function(regex, value) {
    if(!regex.test(value)) {
      return false;
    }
    return true;
  }
}
