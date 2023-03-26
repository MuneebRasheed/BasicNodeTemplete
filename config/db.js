const mongoose = require('mongoose');


const connectDB = async () => {
    console.log(process.env.MONGO_URI)
    const connect = await mongoose.connect(process.env.MONGO_URI);

    console.log(`MongoDB connected :${connect.connection.host}`)
}
mongoose.set('strictQuery', true);

module.exports = connectDB;