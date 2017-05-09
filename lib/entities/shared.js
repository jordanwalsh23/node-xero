//@ts-check
var Entity = require('./entity')

module.exports.AddressSchema = Entity.SchemaObject({
    AddressLine1: { type: String, toObject: 'always' },
    AddressLine2: { type: String, toObject: 'always' },
    AddressLine3: { type: String, toObject: 'always' },
    AddressLine4: { type: String, toObject: 'always' },
    City: { type: String, toObject: 'always' },
    Region: { type: String, toObject: 'always' },
    PostalCode: { type: String, toObject: 'always' },
    Country: { type: String, toObject: 'always' },
    AttentionTo: { type: String, toObject: 'always' },
    AddressType: { type: String, toObject: 'always' }
});

module.exports.PhoneSchema = Entity.SchemaObject({
    PhoneNumber: { type: String, toObject: 'always' },
    PhoneAreaCode: { type: String, toObject: 'always' },
    PhoneType: { type: String, toObject: 'always' }
});

module.exports.ExternalLinkSchema = Entity.SchemaObject({
    LinkType: { type: String },
    Url: { type: String }
});

module.exports.ContactPerson = Entity.SchemaObject({
    FirstName: { type: String },
    LastName: { type: String },
    EmailAddress: { type: String },
    IncludeInEmails: { type: Boolean }
});

module.exports.PaymentTermSchema = Entity.SchemaObject({
    Day: { type: Number },
    Type: { type: String }
});

module.exports.BrandingScheme = Entity.SchemaObject({
    BrandingThemeID: { type: String },
    Name: { type: String },
    SortOrder: { type: Number },
    CreatedDateUTC: { type: Date }
});

var InvoiceIDSchema = Entity.SchemaObject({
    InvoiceID: { type: String, toObject: 'hasValue' },
    InvoiceNumber: { type: String, toObject: 'hasValue' }
});

var CreditNoteIDSchema = Entity.SchemaObject({
    CreditNoteID: { type: String, toObject: 'hasValue' },
    CreditNoteNumber: { type: String, toObject: 'hasValue' }
});

var AccountIDorCodeSchema = Entity.SchemaObject({
    AccountID: { type: String, toObject: 'hasValue' },
    Code: { type: String, toObject: 'hasValue' }
});

module.exports.PaymentSchema = Entity.SchemaObject({
    Invoice: { type: InvoiceIDSchema, toObject: 'always' },
    CreditNote: { type: CreditNoteIDSchema, toObject: 'always' },
    Account: { type: AccountIDorCodeSchema, toObject: 'always' },
    Date: { type: String, toObject: 'always' },
    CurrencyRate: { type: Number, toObject: 'hasValue' },
    Amount: { type: Number, toObject: 'hasValue' },
    Reference: { type: String, toObject: 'hasValue' },
    IsReconciled: { type: Boolean, toObject: 'hasValue' },
    Status: { type: String, toObject: 'hasValue' },
    PaymentType: { type: String, toObject: 'hasValue' },
    UpdatedDateUTC: { type: String, toObject: 'hasValue' }
});

module.exports.TrackingOptionSchema = Entity.SchemaObject({
    TrackingOptionID: { type: String, toObject: 'always' },
    Name: { type: String, toObject: 'always' },
    Status: { type: String, toObject: 'always' }
});

var TrackingCategoryOptionsSchema = Entity.SchemaObject({
    TrackingCategoryID: { type: String, toObject: 'hasValue' },
    Name: { type: String, toObject: 'hasValue' },
    Option: { type: String, toObject: 'hasValue' }
});

var TrackingCategorySchema = Entity.SchemaObject({
    TrackingCategory: { type: TrackingCategoryOptionsSchema, toObject: 'hasValue' }
});

module.exports.LineItemSchema = Entity.SchemaObject({
    Description: { type: String },
    Quantity: { type: Number },
    UnitAmount: { type: Number },
    ItemCode: { type: String },
    AccountCode: { type: String },
    TaxType: { type: String },
    TaxAmount: { type: Number },
    LineAmount: { type: Number },
    Tracking: { type: Array, arrayType: TrackingCategorySchema, toObject: 'hasValue' },
    DiscountRate: { type: Number }
});