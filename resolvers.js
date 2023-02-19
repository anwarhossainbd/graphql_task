
import mongoose from 'mongoose'
import {randomBytes} from 'crypto'
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from './config.js';

const User  = mongoose.model("User")
const Product = mongoose.model("Product")  
const Invoice = mongoose.model("Invoice")  




const resolvers = {
    Query:{
        product:async ()=>await Product.find({}).populate("createdBy","_id firstName"),
        userOwnProduct:async (_,{createdBy})=> await Product.find({createdBy}),
        async getInvoicesList() {
            try {
              const invoices = await Invoice.find();
              return invoices;
            } catch (err) {
              throw new Error(err);
            }
          },


     },
     User:{
        product:async (ur)=> await Product.find({createdBy:ur._id})
     },
    Mutation:{

        signupUser:async (_,{userNew})=>{
            const user = await User.findOne({email:userNew.email})
            if(user){
                throw new Error("User already exists with that email")
            }
            const hashedPassword =  await bcrypt.hash(userNew.password,12)
  
          const newUser =  new User({
               ...userNew,
               password:hashedPassword
           })
          return await newUser.save()
          },
          signinUser:async (_,{userSignin})=>{
           const user = await User.findOne({email:userSignin.email})
           if(!user){
               throw new Error("User dosent exists with that email")
           }
           const doMatch =await bcrypt.compare(userSignin.password,user.password)
           if(!doMatch){
               throw new Error("email or password in invalid")
           }
           const token = jwt.sign({userId:user._id},JWT_SECRET)
           return {token}
          },
       
        createProduct:async (_,{name},{userId})=>{
            if(!userId) throw new Error("You must be logged in")
           const newProduct = new Product({
               name,
               by:userId
           })
           await newProduct.save()
           return "Product saved successfully"
        },

        deleteProduct:async (_,{_id},{userId})=>{
            if(!userId) throw new Error("You must be logged in")
            const item = await Product.findById(_id);
            await item.delete();
            return 'Product deleted successfully';

        },

        archiveProduct:async (_,{_id},{userId})=>{
            if(!userId) throw new Error("You must be logged in")
            const archiveproduct = await Product.findById(_id);
            return archiveproduct

        },

        ListOfAllProduct:async (_,{userId})=>{
            if(!userId) throw new Error("You must be logged in")
            const allProduct = await Product.find();
            return allProduct;

        },

        async createInvoice(_, args, context) {
            try {

                let items = [];

             
              for (let i = 0; i < args.invoiceInput.length; i++) {
                let res = await Product.findOne(
                  { name: args.invoiceInput[i].name },
                  { currentStock: 0}
                );
      
                let currentStock = await Product.findOne(
                  { name: args.invoiceInput[i].name },
                  { currentStock: 1 }
                );
                console.log(currentStock);
                if (args.invoiceInput[i].quantity > currentStock.currentStock) {
                  throw new Error(
                    'orderd item quantity cross the stock item quantity'
                  );
                }
      
                items.push(res);
              }
     
      
              let finalItem = [];
              let totalBill = 0;
      
              items.map((item, index) => {
                totalBill += Product.price * args.invoiceInput[index].quantity;
              });
      
              let invoice_id = voucher_codes.generate({
                length: 7,
                count: 1,
                pattern: '##-###-##',
              });
      
              console.log('Total bill : ');
              console.log(totalBill);



              console.log('Products : ');
              console.log(items);

            
              const newInvoice = new Invoice({
                
                Products: items,
                totalBill: totalBill,
              });
              await newInvoice.save();
              return newInvoice;
            } catch (err) {
              throw new Error(err);
            }
          },
    }
}

export default resolvers