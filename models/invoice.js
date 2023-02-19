import mongoose from 'mongoose'
const invoiceSchema = new mongoose.Schema({
    user: {
        _id: {
          type: String,
          index: true,
        },
        username: {
          type: String,
          trim: true,
        },
       
      },
      items: [
        {
          _id: {
            type: String,
            required: true,
          },
          name: {
            type: String,
            trim: true,
          },
          description: {
            type: String,
          },
          price: {
            type: Number,
            default: 0,
          },
        },
      ],

      Customer: [
        {
          _id: {
            type: String,
            required: true,
          },
          name: {
            type: String,
            trim: true,
          },
          description: {
            type: String,
          },
        },
      ],
      totalBill: {
        type: Number,
        required: true,
      },
      invoiceId: {
        type: String,
        required: true,
      },
      createdAt: String,
    });
    
})

mongoose.model("Invoice",invoiceSchema)