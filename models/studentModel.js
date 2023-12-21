const mongoose = require("mongoose")

const studentSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'please enter your name ']
        },
        class: {
            type: Number,
             required: [true, 'please enter a  class numbeer ']

        },
        number: {
               type: Number,
             required: [true, 'please enter a  class numbeer ']

        },
        image:{
            type: String,
            required: false,

        }

    },
    {
        timeStamp: true
    }
)

const Student = mongoose.model('Student', studentSchema)

module.exports = Student