const id = document.querySelector('#id');
const pw = document.querySelector('#pw');
const loginBtn = document.querySelector('#login');

loginBtn.addEventListener('click',()=>{
    const req = {
        id : id.value,
        pw : pw.value,
    }
    fetch('/login',{
        method : 'post',
        headers : {
            'Content-Type' : 'application/json',
        },
        body : JSON.stringify(req),
    }).then((result)=>result.json())
      .then((result)=>{
        if(result.success==true){
            alert(result.msg);
            window.location = document.referrer;
        }else{
            alert(result.msg);
        }
      })
})