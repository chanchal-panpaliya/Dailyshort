import moment from "moment";

//label
export const getLabelNote = (data,checkedlist)=>{
    if(checkedlist.length === 0) {
        return data
    }else{
       return data.filter((item) => checkedlist.includes(item.label));   
    }      
}
//priority
export const getPriority =(data,priority)=>{
    if(priority){
        return data.filter((item) => item.priority === priority);
    }
    return data;
}
//pin
export const getpin=(data,pin)=>{
    if(pin === "pin"){
        return data.filter((item) => item.pin === true);
    }
    if(pin === "unpin"){
        return data.filter((item) => item.pin === false);
    }
    return data;
}
//date
export const getdate=(data,date)=>{
    if (date === "Oldest"){
          return [...data].sort((item1,item2)=>{
              let date1 = item1.date
              let date2 = item2.date
                    return date1.localeCompare(date2)
          })
    }
    if (date === "Newest"){
        return [...data].sort((item1,item2)=>{
            let date1 = item1.date
            let date2 = item2.date
                  return date2.localeCompare(date1)
        })
    }
  return data;
}
//search
export const getSearchCart=(data,name)=>{
    return data.filter((item) =>
        item.title.toLowerCase().includes(name.toLowerCase())
      )
}