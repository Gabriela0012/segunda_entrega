import moment from 'moment'



const moments = moment().format('YYYY-MM-DD HH:mm:ss');


export default class MemoryContainer{
  constructor(){
    this.data = [];
  } 
  getAll = ()=>{
    return this.data;
  }
 
  save = async(object)  =>{   
    const data = await this.getAll();
    if (data.length) {
        const results= await { ...object, id: data[data.length-1].id+1, timestamp:moments };
        data.push(results);
    } else {
        const results = await { ...object, id: 1, timestamp: moments};
        data.push(results);
    }
    return (data) 
  }
  getById = (id) => {
    let result = this.data.find((element) => element.id == id)
    return result
  }

  deleteById = (id) => {
    let newData = this.data.filter((element) => element.id != id)
    this.data = newData
  }

  update = (object) => {
    let index = this.data.findIndex((element) => element.id == object.id)
    this.data[index] = object
    return true
  }

  deleteAll = ()=>{
    this.data = []
  }

 
  
  


  
}