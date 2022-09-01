import fs from 'fs'
import __dirname from '../../utils.js'
import moment from 'moment'



const moments = moment().format('YYYY-MM-DD HH:mm:ss');

export default class FilesContainer {
  constructor(filename) { 
    this.path = __dirname + '/DataFiles/' + filename + '.json';
    
  }

  save= async(object)  =>{   
    const data = await this.getAll();
    if (data.length) {
        const results= await { ...object, id: data[data.length-1].id+1, timestamp:moments };
        data.push(results);
    } else {
        const results = await { ...object, id: 1, timestamp: moments};
        data.push(results);
    }
    return await this.saveData(data) 
  }
  getAll = async()=> {
    return  await this.getData()
  }
  getData= async()=> {
    try{
        if(fs.existsSync(this.path )){
            const data = await fs.promises.readFile(this.path , 'utf-8');
            return JSON.parse(data)
        }else{
            return [];
        }
    }
    catch(e){
        console.warn(`Fix : ${e}`)
        return[];
    }
  }
  saveData= async(data)=> {
    try{
        await fs.promises.writeFile(this.path , JSON.stringify(data, null, '\t'));
    }
    catch(e){
        console.warn(`Fix : ${e}`)
    }
  }
  deleteById= async(id)=> {
    const data = await this.getAll();
    const nuevoArray = data.filter( result => result.id != id);
    await this.saveData(nuevoArray);
  }
  update = async(id, body)=>{
    let name = body.name;
    let price = body.price;
 
    let productsArray = await this.getAll()
    productsArray.map(function(item){
       if(item.id == id){
         item.name = name,
         item.price = price
 
       }
    })
    console.log(name, price)
    console.log(productsArray)
    await fs.promises.writeFile(this.path,JSON.stringify(productsArray, null, '\t'))
  }

  deleteAll= async()=> {
    const arrayEmpty = []
    await this.saveData(arrayEmpty);
}


 

}