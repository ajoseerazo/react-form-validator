# react-form-validator
Form Validator Mixin for React

To use it must to add the **FormValidatorMixin** to the array of mixins of the component and an object **validations** who describe what validations must to be done. The keys of the object are **refs** to the values in the DOM

This allow to have a function into the component called **validate()** that return true or false regarding the validations performed. So, to perform the validations must to call the function **this.validate()**

### Example
```javascript
LoginForm = React.createClass({

    ...
    
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
    
    ...
    
    doLogin: function() {
        if(this.validate()){ // this.validate() is the function who perform the validations
            // Your code
        }else{
            // Your code
        }
    }
    
    ...
    
  });
```

In the example we have validations for two inputs (email, password). Each key in the object **validations** make reference to two inputs who references are **email** and **password**. Each validation performed have a message associated to it and must to be defined in the key **messages** with its respective validation type. For example for **email** we have two kinds of validations, **required** and **is_email**, and in the object **messages** we define the messages that must to be displayed for each one in case of validation fails.
