const id = document.querySelector('#id');
const pw = document.querySelector('#pw');
const nick = document.querySelector('#nick');
const btn = document.querySelector('button');

btn.addEventListener('click',()=>{
    const req = {
        id : id.value,
        pw : pw.value,
        nick : nick.value,
    }
    fetch('/userInfo/changeNick/:id',{
        method : 'post',
        headers : {
            'Content-Type' : 'application/json',
        },
        body : JSON.stringify(req),
    }).then((result)=>result.json())
      .then((result)=>{
        if(result.success){
            alert(result.msg);
            location.href='/login';
        }else{
            alert(result.msg);
        }
      })
})

        