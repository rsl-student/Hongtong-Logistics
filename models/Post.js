const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    ID_No : String,
    CNTRNO : String,
    IMPORTER: String,
    CLIENT: String,
    SHIPPING_LINE: String,
    FRT: String,
    SOB: Date,
    ETA: Date,
    VESSEL: String,
    SUBMIT: Boolean,
    RESULT: Boolean,
    STATUS: String,
    DEL:  Date
});

module.exports = mongoose.model('Logistics', PostSchema);