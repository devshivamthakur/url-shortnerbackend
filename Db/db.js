const mongoose = require('mongoose');

const connectDb = async()=>{
    try {

       await mongoose.connect(`${process.env.DB_URL}/${process.env.DB_NAME}`,{
        writeConcern: { w: 'majority' },
        dbName: process.env.DB_NAME,  // Specify the database name here
       })

       return 'connected'
        
    } catch (error) {
        console.log(error, 'Error in connecting to db', process.env.DB_URL, process.env.DB_NAME)
        throw new Error('Error in connecting to db')

    }
}

module.exports = connectDb