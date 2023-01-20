const id = document.querySelector('#id');
const nick = document.querySelector('#nick');
const pw = document.querySelector('#pw');
const btn = document.querySelector('button');
const agree = document.querySelector('#agree');

btn.addEventListener('click',()=>{
    const req = {
        id : id.value,
        nick : nick.value,
        pw : pw.value,
        agree : agree.value,
    }
    fetch('/userInfo/secession/:id',{
        method : 'post',
        headers : {
            'Content-Type' : 'application/json',
        },
        body : JSON.stringify(req),
    }).then((result)=>result.json())
      .then((result)=>{
        if(result.success){
            alert(result.msg);
            location.href = '/'
        }else{
            alert(result.msg);
        }
      })
})