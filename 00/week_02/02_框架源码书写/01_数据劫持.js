const obj = {};
let newObj = {};
newObj = obj;
Object.defineProperty(obj,'name',{
    set(val){
        console.log('正常尝试给name属性写入: ', val);
        newObj = val;
	},
    get(){
    	console.log('正常尝试读取obj对象的值');
        return newObj;
    }
})

obj.name = 'marron';
console.log(obj.name)
