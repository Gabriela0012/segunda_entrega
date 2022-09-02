import FilesContainer from './FilesContainer.js'
import __dirname from '../../utils.js'
import moment from 'moment'
import fs from 'fs'
import Products from './products.js'

// const productService = new productContainer();
// const path = "src/files/carts.json"
const moments = moment().format('YYYY-MM-DD HH:mm:ss');
const productsService = new Products();

export default class Carts extends FilesContainer {
  constructor() { 
    let filename = ('carts')
    super(filename)

    this.path = __dirname + '/DataFiles/' + filename + '.json';
    console.log(this.path)
  }
 

  saveCart = async(cart) =>{
    try{
      let carts = await this.getAll();
      if(carts.length===0){
          cart.id=1;
          cart.timestamp= moments;
          cart.products=[];
          
          carts.push(cart);
          await this.save(cart)
      }else{
          cart.id = carts[carts.length-1].id+1;
          cart.products=[];
          cart.timestamp= moments;
          carts.push(cart);
          await this.save(cart)
      }
    }catch(error){
      console.log("Cannot write file: "+error)

    }
  }

  // agregar al carrito un porducto por Id
  updateCart = async (cid, pid, qty) => {
    let cart = await this.getById(cid)
    if(cart.products.some(e => e.id === pid)){
        for (const item of cart.products){
            if(item.id === pid){
                let condition = (item.quantity += qty)
                if(condition < 1){
                    item.quantity = 1
                }else{
                    item.quantity = condition
                }
            }
        }
    }else{
        if(qty < 1){
            throw new Error("Cart manager error:{addProductCart} invalid quantity")
        }else{
            cart.products.push({id:pid, quantity:qty})
        }
    }
    await this.update(cart)
  }


 


  

 //  borrar un producto del carrito
 deleteProductCart = async (cid, pid) => {
  let cart = await this.getById(cid)

  let newCartProduts = []

  if(cart.products.some(e =>e.id === pid)){
      for (const item of cart.products){
          if(item.id === pid){
              continue
          }
          newCartProduts.push(item)
      }
  }
  cart.products = newCartProduts
  await this.update(cart)
  
}

  
  

}





    
    


  


  
 





