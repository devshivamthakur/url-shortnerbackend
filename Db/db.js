const mongoose = require('mongoose');

const connectDb = async()=>{
    try {

       await mongoose.connect(`${process.env.DB_URL}/${process.env.DB_NAME}`,{
        writeConcern: { w: 'majority' },
        dbName: process.env.DB_NAME,  // Specify the database name here
       })

       return 'connected'
        
    } catch (error) {
        
    }
}

module.exports = connectDb