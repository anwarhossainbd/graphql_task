
import mongoose from 'mongoose'
const ProductSchema = new mongoose.Schema({
   name:{
       type:String,
       required:true
   },
   createdBy:{
       type:mongoose.Schema.Types.ObjectId,
       ref:"User"
   },
   totalProduct:{
    type: Number,
    default: 0,
   },

   description: {
    type: String,
  },
  price: {
    type: Number,
    default: 0,
  },

    
})

mongoose.model("Product",ProductSchema)