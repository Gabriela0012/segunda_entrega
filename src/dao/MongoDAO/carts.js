import mongoose from 'mongoose';
import moment from 'moment'
import MongoDBContainer from './MongoDBContainer.js';
import productService from './products.js'

const collection = 'carts';
const products = new productService

const cartsSchema = mongoose.Schema({
  title:{
    type: 'string',
    required:true
  },
  timestamp:{
    type: String,
    default: ()=>moment().format('dddd, MMMM Do YYYY, h:mm:ss a'),
  },
  products: [],
})


export default class Carts extends MongoDBContainer {
  constructor(){
    super(collection,cartsSchema);
    this.pepe = 0
  }
  getById = async(id) => {
    let result = await this.model.findById({_id:id});
    return result;
  }


  deleteById = async(id) => {
    let conditions = {_id:id}
    await this.model.deleteOne(conditions)
  }
  
  updateCart = async(cid, id, quantity) => {
    let conditions = {_id:cid}
    let product = await products.getById(id)
    console.log(quantity)
    console.log(product)
   
      await this.model.updateOne(conditions, {products:(product={name:product.name,
        price:product.price, id:product.id, timestamp:product.timestamp, quantity})})

    
  }
  

  deleteProductCart = async (cid, pid) => {
    let conditions = {_id:cid}
    let productID = await products.getById(pid)

    if (conditions===cid) {
      await this.model.deleteOne(productID)
    } else {
      return false
      
    }
  }

  

 
            
  
}