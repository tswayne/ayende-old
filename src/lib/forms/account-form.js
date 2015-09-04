'use strict';

var forms = require('forms');
var fields = forms.fields;
var validators = forms.validators;
var widgets = require('forms').widgets;

var accountForm = forms.create({
    username: fields.string({
        required: true,
        widget: widgets.text({ classes: ['form-control'] }),
        errorAfterField: true
    }),
    password: fields.string({
        required: true,
        errorAfterField: true,
        widget: widgets.text({ classes: ['form-control'] })
    })
});

module.exports = accountForm;