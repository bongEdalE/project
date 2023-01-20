const id = document.querySelector('#id');
const nick = document.querySelector('#nick');
const name = document.querySelector('#name');
const pw = document.querySelector('#pw');
const pw2 = document.querySelector('#pw2');
const registBtn = document.querySelector('#regist');

registBtn.addEventListener('click',()=>{
    const req = {
        id : id.value,
        nick : nick.value,
        name : name.value,
        pw : pw.value,
        pw2 : pw2.value,
    }
    fetch('/regist',{
        method : 'post',
        headers : {
            'Content-Type' : 'application/json',
        },
        body : JSON.stringify(req),
    }).then((result)=>result.json())
      .then((result)=>{
        if(result.success){
            alert(result.msg);
            location.href = '/login';
        }else{
            alert(result.msg);
        }
      })
})
