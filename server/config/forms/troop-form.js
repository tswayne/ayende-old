'use strict';

var forms = require('forms');
var fields = forms.fields;
var validators = forms.validators;
var widgets = require('forms').widgets;

var purchaseTroopsForm = forms.create({
    type: fields.string({
        required: true,
        widget: widgets.hidden(),
        errorAfterField: true
    }),
    amount: fields.string({
        required: true,
        errorAfterField: true,
        widget: widgets.text({ classes: ['form-control'] }),
        validators: [validators.min('1'), validators.integer]
    })
});

module.exports.purchaseTroops = purchaseTroopsForm;
