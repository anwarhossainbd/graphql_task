import {gql} from "apollo-server"
const typeDefs = gql`

type Query{
    users:[User]
    user(_id:ID!):User
    product:[ProductItem]
    userOwnProduct(by:ID!):[Product]
    getInvoicesList: [ReturnInvoice]
 }



 type ProductItem{
     name:String
     createdBy:IdName
 }
 
 type IdName{
     _id:String
     firstName:String
 }

 type User{
     _id:ID!
     firstName:String!
     lastName:String!
     email:String!
     password:String!
     products:[Product]
 }

 type ReturnInvoice {
    user: ReturnUser
    product: [Product]
    customer:Customer
    totalBill: Int
    invoiceId: String
    createdAt: String
  }


 type Product{
     name:String!
     createdBy:ID!
     currentStock: Int!
     description: String!
     price: Int!
 }

 type Customer{
    name:String!
    description: String!
}

 type Token{
     token:String!
 }

 type Mutation{
     signupUser(userNew:UserInput!):User
     signinUser(userSignin:UserSigninInput!):Token
     createProduct(name:String!):String
     deleteProduct(_id:String!):String
     archiveProduct(_id:String!):String
     createInvoice(invoiceInput: [InvoiceInput]): ReturnInvoice

 }

 input UserInput{
    firstName:String!
    lastName:String!
    email:String!
    password:String!
 }
 input UserSigninInput{
    email:String!
    password:String!
 }

 input InvoiceInput {
    name: String
    quantity: Int
  }


`
export default typeDefs