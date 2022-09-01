import MemoryContainer from './MemoryContainer.js';

export default class Carts extends MemoryContainer{

  
  getById = async(id) => {
    try {
      let carts = await this.getAll()
      let cart = carts.filter(cart => cart.id == id)
      return cart
    } catch (error) {
      console.log('GetById: '+error)
      return null
    }
  } 
  
}