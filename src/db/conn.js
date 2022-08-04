const mongoose = require("mongoose");
// const mongoPath ='mongodb+srv://last2002:asdfg12345@olyampic1.1faaixp.mongodb.net/test?retryWrites=true&w=majority'
// const mongoPath ='mongodb+srv://<username>:<password>@olyampic1.1faaixp.mongodb.net/test?retryWrites=true&w=majority'
const mongoPath ='mongodb+srv://scam123:scam123@cluster0.4ons8hh.mongodb.net/1stdata?retryWrites=true&w=majority'

module.exports= async ()=>{
    await mongoose.connect(mongoPath ,{
    useNewUrlParser: true,
    // useUnifiedTopology: true,
        // useCreateIndex: true,
    // useFindAndModify:false

    }).then(()=>{
        console.log('Successfull')
    })
    return mongoose
}

// mongoose.connect("mongodb://localhost:27017/youtube", {
//     useNewUrlParser: true,
//     // useUnifiedTopology: true,
//     // useCreateIndex: true
// }).then(() => {
//     console.log(`connection Successful`);
// }).catch((e) => {
//     console.log(`no connections `)
// })