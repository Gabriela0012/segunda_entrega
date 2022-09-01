import FilesContainer from './FilesContainer.js'
import __dirname from '../../utils.js'

export default class Products extends FilesContainer {
  constructor() { 
    let filename = ('products')
    super(filename)

    this.path = __dirname + '/DataFiles/' + filename + '.json';
    console.log(this.path)
  }
 
  getById = async(id) => {
    try {
      let products = await this.getAll()
      let product = products.filter(product => product.id == id)
      return product
    } catch (error) {
      console.log('GetById: '+error)
      return null
    }
  } 




    
}
    


  
// product{ id, name, price, timestamp,description,code,thumbnail(url),stock}

  
 




