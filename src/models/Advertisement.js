const { Schema, model } = require('mongoose');

const advertisementSchema = new Schema({
    shortText: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    images: {
        type: [String],
        required: false
    },
    userId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    createdAt: {
        type: Date,
        required: true
    },
    updatedAt: {
        type: Date,
        required: true
    },
    tags: {
        type: [String],
        required: false
    },
    isDeleted: {
        type: Boolean,
        required: true
    }
});

module.exports = model('Advertisement', advertisementSchema);