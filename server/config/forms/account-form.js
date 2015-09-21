'use strict';

var forms = require('forms');
var fields = forms.fields;
var validators = forms.validators;
var widgets = require('forms').widgets;

var accountForm = forms.create({
    username: fields.string({
        required: true,
        widget: widgets.text({ classes: ['form-control'] }),
        errorAfterField: true,
        validators: [validators.minlength('2'), validators.maxlength('20')]
    }),
    password: fields.password({
        required: true,
        errorAfterField: true,
        widget: widgets.password({ classes: ['form-control'] }),
        validators: [validators.minlength('2'), validators.maxlength('20')]
    })
});

module.exports = accountForm;