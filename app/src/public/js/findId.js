const nick = document.querySelector('#nick');
const name =document.querySelector('#name');
const pw = document.querySelector('#pw');
const findIdBtn = document.querySelector('#findId');
const resultId = document.getElementById('result');

findIdBtn.addEventListener('click',()=>{
   const req = {
    nick : nick.value,
    name : name.value,
    pw : pw.value,
   }
   fetch('/findId',{
    method : 'post',
    headers : {
        'Content-Type' : 'application/json',
    },
    body:JSON.stringify(req),
   })
   .then((result)=>result.json())
     .then((result)=>{
        if(result.success){
         resultId.innerHTML = result.id;
        }else{
            alert(result.msg);
        }
     })
})
