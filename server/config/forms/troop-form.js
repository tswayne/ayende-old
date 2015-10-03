'use strict';

var forms = require('forms');
var fields = forms.fields;
var validators = forms.validators;
var widgets = require('forms').widgets;

var purchaseTroopsForm = forms.create({
    soldierAmount: fields.number({
        required: true,
        label: 'Soldiers',
        errorAfterField: true,
        widget: widgets.text({ classes: ['form-control'] }),
        validators: [validators.min('1')]
    })
});

module.exports.purchaseTroops = purchaseTroopsForm;
