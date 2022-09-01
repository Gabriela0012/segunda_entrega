const persistence = 'MongoDB';

let productsService;
let cartsService;

switch (persistence) {
  case 'Memory':
    const {default:Memproducts} = await import('./MemoryDAO/products.js')
    productsService = new Memproducts();
    break;
    case 'MongoDB':
    const {default:Mongoproducts} = await import('./MongoDAO/products.js')
    const {default:Mongocarts} = await import('./MongoDAO/carts.js')
    productsService = new Mongoproducts();
    cartsService = new Mongocarts();
    break;
    case 'Files':
    const {default:Filesproducts} = await import('./FilesDAO/products.js')
    const {default:Filescarts} = await import('./FilesDAO/carts.js')
    productsService = new Filesproducts();
    cartsService = new Filescarts();
    break;
}


const services = {
  productsService,
  cartsService,
}


export default services;