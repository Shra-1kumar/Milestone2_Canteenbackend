const newDate = (extendBy) => {
    const date = new Date();
    const d =  date.setDate(date.getDate()+extendBy);
    return new Date(d);
}

const b = new Date();
const c = Date.now();
const a = new Date(Date.now()+ 86400*1000);  //24hr forward
//console.log(c,b,a);
//console.log(newDate(1));
// const obj = {
//     name:"hello"
// }
// console.log(obj.name);
// delete obj.name;
// console.log(obj.name);
// console.log(obj);
module.exports = { newDate };