# react-form-validator
Form Validator Mixin for React

Example
```javascript
LoginForm = React.createClass({
    mixins: [FormValidatorMixin],
  
    validations: {
      email: {
        required: true,
        is_email: true,
        messages: {
          required: 'Email is required',
          is_email: 'Please enter a valid email'
        }
      },
      password: {
        required: true,
        messages: {
          required: 'A password is required',
        }
      }
    },
  });
```
