// const mongoose = require('mongoose');
// const MONGO_URI = 'mongodb://localhost:27017/Sports';
// mongoose.set('strictQuery', true);
// mongoose.connect(MONGO_URI, (error) => {
//     if(error){
//         console.error(error)
//     } else {
//         console.log("Database connected")
//     }
// })


const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
// main().catch(err => console.log(err));
// async function main() {
 mongoose.connect('mongodb://127.0.0.1:27017/Sport',{
    useNewUrlParser: true,
useUnifiedTopology: true,
// useCreateIndex: true,
// useFindAndModify:false,

},(err)=>{
    if(err){
        console.log(err);
    }else{
        console.log("Database Connected");
    }
});
module.exports = mongoose
