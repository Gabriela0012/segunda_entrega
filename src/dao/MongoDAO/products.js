import mongoose from 'mongoose';
import moment from 'moment'
import MongoDBContainer from './MongoDBContainer.js';

const collection = 'products';

const productsSchema = mongoose.Schema({
  name:{
    type: 'string',
    required:true
  },
  price:Number,
  thumbnail:String,
  description:String,
  code:String,
  stock:Number,
  timestamp:{
    type: String,
    default: ()=>moment().format('dddd, MMMM Do YYYY, h:mm:ss a'),
  }
})


export default class Products extends MongoDBContainer {
  constructor(){
    super(collection,productsSchema);
  }
  getById = async(id) => {
    let result = await this.model.findById({_id:id});
    return result;
      
  }
  update = async(id, body)=>{
    let conditions = {_id:id}
    await this.model.updateOne(conditions, body)
  }

  deleteById = async(id) => {
    let conditions = {_id:id}
    await this.model.deleteOne(conditions)
  }
  getByIdP= async(id) => {
    let result = await this.model.findById(id);
    return result;
      
  }
}