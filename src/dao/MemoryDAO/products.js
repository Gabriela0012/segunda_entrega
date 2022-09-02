import MemoryContainer from './MemoryContainer.js';
import moment from 'moment'


const moments = moment().format('YYYY-MM-DD HH:mm:ss');

export default class Products extends MemoryContainer{

  save = (product) => {
    if (this.data.length === 0) {
        product.id = 1
        product.timestamp = moments
        this.save(product)
        return product.id
    } else {
        product.id = this.data[this.data.length - 1].id + 1
        product.timestamp = moments
        this.save(product)
        return product.id
    }
    
}
  
  
}