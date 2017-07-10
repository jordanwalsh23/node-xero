var _ = require('lodash'),
    Entity = require('../entity'),
    logger = require('../../logger');

var TaxRateSchema = Entity.SchemaObject({
    Name: { type: String, toObject: 'always' },
    TaxType: { type: String, toObject: 'always' },
    CanApplyToAssets: { type: Boolean, toObject: 'always' },
    CanApplyToEquity: { type: Boolean, toObject: 'always' },
    CanApplyToExpenses: { type: Boolean, toObject: 'always' },
    CanApplyToLiabilities: { type: Boolean, toObject: 'always' },
    CanApplyToRevenue: { type: Boolean, toObject: 'always' },
    DisplayTaxRate: { type: Number, toObject: 'always' },
    EffectiveRate: { type: Number, toObject: 'always' },
    Status: { type: String, toObject: 'always' },
    TaxComponents: { type: Array, arrayType: TaxComponentSchema, toObject: 'always' },
    ReportTaxType: { type: String, toObject: 'hasValue' }
});

var TaxComponentSchema = Entity.SchemaObject({
    Name: { type: String, toObject: 'always' },
    Rate: { type: Number, toObject: 'always' },
    IsCompound: { type: Boolean, toObject: 'always' },
});

var TaxRate = Entity.extend(TaxRateSchema, {
    constructor: function(application, data, options) {
        logger.debug('TaxRate::constructor');
        this.Entity.apply(this, arguments);
    },
    initialize: function(data, options) {},
    save: function(options) {
        var self = this;
        var path = 'TaxRates',
            method;
        if (this.Status) {
            method = 'post'
        } else {
            method = 'put'
        }
        return this.application.putOrPostEntity(method, path, JSON.stringify(self), { entityPath: 'TaxRates', entityConstructor: function(data) { return self.application.core.taxRates.newTaxRate(data) } });
    },
    delete: function(options) {
        this.Status = "DELETED";
        return this.save();
    }
});


module.exports.TaxRate = TaxRate;
module.exports.TaxRateSchema = TaxRateSchema;
module.exports.TaxComponentSchema = TaxComponentSchema;