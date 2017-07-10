var _ = require('lodash'),
    Entity = require('../entity'),
    logger = require('../../logger'),
    AddressSchema = require('../shared').AddressSchema,
    PhoneSchema = require('../shared').PhoneSchema,
    ContactPersonSchema = require('../shared').ContactPerson,
    PaymentTermSchema = require('../shared').PaymentTermSchema;

var BatchPaymentSchema = Entity.SchemaObject({
    BankAccountNumber: { type: String },
    BankAccountName: { type: String },
    Details: { type: String }
});

var ContactSchema = Entity.SchemaObject({
    ContactID: { type: String, toObject: 'hasValue' },
    ContactNumber: { type: String, toObject: 'hasValue', validators: { maxLength: 50 } },
    AccountNumber: { type: String, toObject: 'hasValue', validators: { maxLength: 50 } },
    ContactStatus: { type: String, toObject: 'hasValue' },
    Name: { type: String, toObject: 'always', validators: { required: true, maxLength: 255 } },
    FirstName: { type: String, toObject: 'always', validators: { maxLength: 255 } },
    LastName: { type: String, toObject: 'always', validators: { maxLength: 255 } },
    EmailAddress: { type: String, toObject: 'hasValue' },
    SkypeUserName: { type: String, toObject: 'hasValue' },
    ContactPersons: { type: Array, arrayType: ContactPersonSchema, toObject: 'hasValue' },
    BankAccountDetails: { type: String, toObject: 'hasValue' },
    TaxNumber: { type: String, validators: { maxLength: 50 } },
    AccountsReceivableTaxType: { type: String, toObject: 'hasValue' },
    AccountsPayableTaxType: { type: String, toObject: 'hasValue' },
    Addresses: { type: Array, arrayType: AddressSchema, toObject: 'always' },
    Phones: { type: Array, arrayType: PhoneSchema, toObject: 'always' },
    UpdatedDateUTC: { type: Date, toObject: 'never' },
    IsSupplier: { type: Boolean },
    IsCustomer: { type: Boolean },
    DefaultCurrency: { type: String, toObject: 'hasValue' },
    XeroNetworkKey: { type: String, toObject: 'never' },
    SalesDefaultAccountCode: { type: String, toObject: 'never' },
    PurchasesDefaultAccountCode: { type: String, toObject: 'never' },
    //The following properties are only retrieved on GET requests for specific contacts or with pagination
    ContactGroups: { type: String },
    Website: { type: String },
    BatchPayments: { type: BatchPaymentSchema, toObject: 'hasValue', readOnly: 'true' },
    Discount: { type: String },
    Balances: {
        type: {
            AccountsReceivable: {
                Outstanding: { type: Number },
                Overdue: { type: Number }
            },
            AccountsPayable: {
                Outstanding: { type: Number },
                Overdue: { type: Number }
            }
        },
        toObject: 'hasValue'
    },
    PaymentTerms: {
        type: {
            Bills: PaymentTermSchema,
            Sales: PaymentTermSchema
        },
        toObject: 'hasValue'
    }
});

var Contact = Entity.extend(ContactSchema, {
    constructor: function(application, data, options) {
        logger.debug('Contact::constructor');
        this.Entity.apply(this, arguments);
    },
    initialize: function(data, options) {},
    changes: function(options) {
        return this._super(options);
    },
    _toObject: function(options) {
        return this._super(options);
    },
    getAttachments: function(options) {
        return this.application.core.attachments.getAttachments('Contacts/' + this.ContactID, options)
    },
    save: function() {
        var self = this;
        var path, method;
        if (this.ContactID) {
            path = 'Contacts/' + this.ContactID;
            method = 'post'
        } else {
            path = 'Contacts';
            method = 'put'
        }

        return this.application.putOrPostEntity(method, path, JSON.stringify(self), { entityPath: 'Contacts', entityConstructor: function(data) { return self.application.core.contacts.newContact(data) } })
    }
});


module.exports.Contact = Contact;
module.exports.ContactSchema = ContactSchema;