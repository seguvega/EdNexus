const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CourseSchema = new Schema(
    {
        name:
        {
           type: String
        } ,
        tags: [],
        status: 
        {
            type: String
        },
        owner: {
            type: String
        }
    },
    {
        collection: "courses"
    }
);

// Ensure virtual fields are serialised.
CourseSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function(doc, ret){
        delete ret._id
    }
});

module.exports = mongoose.model('Course', CourseSchema);