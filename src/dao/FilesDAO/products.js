import FilesContainer from './FilesContainer.js'
import __dirname from '../../utils.js'
import fs from 'fs'
import moment from 'moment'


const moments = moment().format('YYYY-MM-DD HH:mm:ss');

export default class Products extends FilesContainer {
  constructor() { 
    let filename = ('products')
    super(filename)

    this.path = __dirname + '/DataFiles/' + filename + '.json';
    console.log(this.path)
  }
 
  saveCart = async(product) =>{
    try{
      let products = await this.getAll();
      if(products.length===0){
          product.id=1;
          product.timestamp= moments;
          products.push(product);
          await fs.promises.writeFile(this.path,JSON.stringify(products,null,'\t'));
      }else{
          product.id = products[products.length-1].id+1;
          product.timestamp= moments;
          products.push(product);
          await fs.promises.writeFile(this.path,JSON.stringify(products,null,'\t'));
      }
    }catch(error){
      console.log("Cannot write file: "+error)

    }
  }



    
}
    


  
// product{ id, name, price, timestamp,description,code,thumbnail(url),stock}

  
 




