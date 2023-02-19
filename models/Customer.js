import mongoose from 'mongoose'
const CustomerSchema = new mongoose.Schema({
   name:{
       type:String,
       required:true
   },


   address:{
    type:String,
    required:true
},
   
    
})

mongoose.model("Customer",CustomerSchema)