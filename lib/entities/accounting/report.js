var _ = require('lodash'),
    Entity = require('../entity'),
    logger = require('../../logger');

var ReportSchema = Entity.SchemaObject({
    ReportID: { type: String, toObject: 'always' },
    ReportName: { type: String, toObject: 'always' },
    ReportType: { type: String, toObject: 'always' },
    ReportTitles: { type: Array, arrayType: ReportTitleSchema, toObject: 'always' },
    ReportDate: { type: String, toObject: 'always' },
    UpdatedDateUTC: { type: String, toObject: 'always' },
    Rows: { type: Array, arrayType: ReportRowSchema, toObject: 'always' }
});

var ReportTitleSchema = Entity.SchemaObject({
    ReportTitle: { type: String, toObject: 'always' }
});

var ReportRowSchema = Entity.SchemaObject({
    RowType: { type: String, toObject: 'always' },
    Title: { type: String, toObject: 'always' },
    Cells: { type: Array, arrayType: ReportCellSchema, toObject: 'always' }
});

var ReportCellSchema = Entity.SchemaObject({
    Value: { type: String, toObject: 'always' },
    Attributes: { type: Array, arrayType: ReportAttributeSchema, toObject: 'always' }
});

var ReportAttributeSchema = Entity.SchemaObject({
    Value: { type: String, toObject: 'always' },
    Id: { type: String, toObject: 'always' }
});

var Report = Entity.extend(ReportSchema, {
    constructor: function(application, data, options) {
        logger.debug('Report::constructor');
        this.Entity.apply(this, arguments);
    },
    initialize: function(data, options) {}
});

module.exports.Report = Report;
module.exports.ReportSchema = ReportSchema;