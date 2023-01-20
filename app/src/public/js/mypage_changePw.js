const curPw = document.querySelector('#curPw');
const chaPw1 = document.querySelector('#chaPw1');
const chaPw2 = document.querySelector('#chaPw2');
const btn = document.querySelector('button');

btn.addEventListener('click',()=>{
    const req = {
        curPw : curPw.value,
        chaPw1 : chaPw1.value,
        chaPw2 : chaPw2.value,
    }
    fetch('/userInfo/changePw/:id',{
        method : 'post',
        headers : {
            'Content-Type' : 'application/json',
        },
        body : JSON.stringify(req),

    }).then((result)=>result.json())
      .then((result)=>{
        if(result.success){
            alert(result.msg);
            location.href='/';
        }else{
            alert(result.msg);
        }
      })

   
})