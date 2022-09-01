import MemoryContainer from './MemoryContainer.js';

export default class Products extends MemoryContainer{

  
  getById = async(data) => {
    let products = await this.getAll()
      let product = null
      for(const item of products){
          if(item.data===data){
              product =item
          }
      }
      return product
   
  }
  
}