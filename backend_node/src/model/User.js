//
//
const mongoose = require('mongoose')


const objSchema = new mongoose.Schema(
    {
		email: {
            type: String,
            required: true,
            unique: true
        },
		password: {
            type: String,
            required: true
        },
		name: String
    },
    {
        strict: false,
        timestamps: true,
        collection: 'user'
    }
)

module.exports = mongoose.model('User', objSchema)
