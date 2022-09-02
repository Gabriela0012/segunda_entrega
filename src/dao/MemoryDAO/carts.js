import MemoryContainer from './MemoryContainer.js';

export default class Carts extends MemoryContainer{
  
  
  saveCart = () => {
    let cart={}
    if (this.data.length === 0) {
        cart.id = 1
        cart.time_stamp = Date.now().toLocaleString()
    }else{
        cart.id = this.data[this.data.length - 1].id + 1
        cart.time_stamp = Date.now().toLocaleString()
    }
    cart.products = []
    this.save(cart)
    return cart.id
  }

  updateCart = (cid, pid, qty) => {
    let cart = this.getById(cid)
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
    this.update(cart)
  }

  //borrar el producto del carrito
  deleteProductCart = (cid, pid) => {
    let cart = this.getById(cid)

    let newCartProduts = []

    if(cart.products.some(e =>e.id === pid)){
        for (const item of cart.products){
            if(item.id === pid){
                continue
            }
            newCartProduts.push(item)
        }
        cart.products = newCartProduts
        this.update(cart)
    }
  }
  
}