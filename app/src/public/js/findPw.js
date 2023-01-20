const id = document.querySelector('#id');
const nick =document.querySelector('#nick');
const name = document.querySelector('#name');
const findIdBtn = document.querySelector('#findPw');
const resultPw = document.getElementById('result');

findIdBtn.addEventListener('click',()=>{
   const req = {
    id:id.value,
    nick:nick.value,
    name:name.value,
   }
   fetch('/findPw',{
    method : 'post',
    headers : {
        'Content-Type' : 'application/json',
    },
    body:JSON.stringify(req),
   })
   .then((result)=>result.json())
     .then((result)=>{
        if(result.success){
         resultPw.innerHTML = result.pw;
        }else{
            alert(result.msg);
        }
     })
})
