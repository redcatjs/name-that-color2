const ntc = require('./ntc')

function colName(n) {
  var ordA = 'a'.charCodeAt(0)
  var ordZ = 'z'.charCodeAt(0)
  var len = ordZ - ordA + 1

  var s = "";
  while(n >= 0) {
    s = String.fromCharCode(n % len + ordA) + s
    n = Math.floor(n / len) - 1
  }
  return s
}

function toSnakeCase(name){
  name = name.replace(/\'/g, '')
  name = name.replace(/^[^A-Za-z0-9]*|[^A-Za-z0-9]*$/g, '')
    .replace(/([a-z])([A-Z])/g, (m, a, b) => a + '-' + b.toLowerCase())
    .replace(/[^A-Za-z0-9]+|_+/g, '-')
    .toLowerCase()
  return name
}

async function main(){

  let lastName
  let cursor = 0
  const totalColors = Math.pow(256,3)
  const map = {}

  console.log("generating map of "+totalColors+" colors ...\n")

  let i = 0

  const interval = setInterval(function(){
    console.log(i+'/'+totalColors+"\n")
  },10000)


  await new Promise(resolve=>{
    function nextColor(){
      
      for(let j=0;j<1000000;j++){
      
        const hex = i.toString(16).padStart(6, '0')
        let name = ntc.name(hex)
        name = name[1]
        name = toSnakeCase(name)
        if(!lastName)
          lastName = name
        name += '-'+(colName(cursor).padStart(3, 'a'))
        map[hex] = name
        
        lastName = name
        
        cursor++
        
        if(lastName!==name)
          cursor = 0
          
        if(i===totalColors)
          break
        
        i++
      }
      
      if(i<totalColors){
        setImmediate(nextColor)
      }
      else{
        resolve()
      }
    }

    nextColor()
  })

  clearInterval(interval)


  console.log("writing file ...\n")

  require('fs').writeFileSync('./colorsMap.json',JSON.stringify(map, 2, null))

  console.log("OK\n")
}

main()
