FormValidatorMixin = {
  validate: function() {
    var form_is_valid = true;

    for(var key in this.validations) {
      var key_valid = true;
      for(var validation in this.validations[key]) {
        var is_valid = true;

        switch(validation) {
          case 'required':
            if (this.validations[key][validation]) {
              is_valid = this._validateRequired(this.refs[key].value);
            }
            break;
          case 'is_email':
            if (this.validations[key][validation]) {
              is_valid = this._validateEmail(this.refs[key].value);
            }
            break;
          case 'equal_to':
            is_valid = this._validateEqualTo(this.refs[key].value, this.refs[this.validations[key][validation]].value);
            break;
          case 'is_url':
            is_valid = this._validateURL(this.refs[key].value);
            break;
          case 'func':
            is_valid = this.refs[key][this.validations[key][validation]].call(this);

            if(!is_valid) {
              if(this.refs[key][this.validations[key]['onError']]) {
                this.refs[key][this.validations[key]['onError']].call(this);
              }
            }else{
              if(this.refs[key][this.validations[key]['onNoError']]) {
                this.refs[key][this.validations[key]['onNoError']].call(this);
              }
            }
            break;
        }

        if(!is_valid) {
          this.errorMessage = this.validations[key]['messages'][validation];
          form_is_valid = false;

          $(this.refs[key]).addClass('rfv-has-error');

          if(this.formValidatorConfig) {
            if(this.formValidatorConfig.showErrorMessages) {
              $(this.refs[key]).append('<span class="rfv-error-msg">'+this.validations[key]['messages'][validation]+'</span>');
            }
          }

          key_valid = false;
        }else{
          //$(this.refs[key]).removeClass('rfv-has-error');
          //$(this.refs[key]).find('span.rfv-error-msg').remove();
        }
      }

      if(key_valid) {
        $(this.refs[key]).removeClass('rfv-has-error');
      }
    }

    return form_is_valid;
  },

  _validateURL: function(value) {
    var url_regex = /(https?:\/\/(?:www\.|(?!www))[^\s\.]+\.[^\s]{2,}|www\.[^\s]+\.[^\s]{2,})/;
    return this._testRegex(url_regex, value);
  },

  _validateRequired: function(value) {
    if(value.trim() === "") {
      return false;
    }
    return true;
  },

  _validateEmail: function(value) {
    var email_regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return this._testRegex(email_regex, value);
  },

  _validateEqualTo: function(value, target) {
    if(value === target) {
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
