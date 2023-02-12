const mongoose = require('mongoose')
const {Schema} = mongoose

const businessSchema = new Schema ({

    name: {
        type: 'string', 
        required:[true, 'Please include your name']
    }, 
    email:{
        type:'string', 
        required:[true, 'Please Include your Email Address']
    },
    password:{
        type:'string',
        required:[true, 'Please Include a Password']
    }

})

module.exports= mongoose.model('Business', businessSchema)
