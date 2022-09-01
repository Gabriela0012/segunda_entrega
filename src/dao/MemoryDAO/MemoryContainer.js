import moment from 'moment'



const moments = moment().format('YYYY-MM-DD HH:mm:ss');


export default class MemoryContainer{
  constructor(){
    this.data = [];
  } 
  getAll = ()=>{
    return this.data;
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
    return (data) 
  }

 
  
  

  deleteAll= async()=> {
    const arrayEmpty = []
    await this.saveData(arrayEmpty);
}
  
}