const now = new Date();
const today = now.getFullYear()-2000 +'/'+ now.getMonth()+1 +'/'+ now.getDate() +' '+ now.getHours() +':'+ now.getMinutes() +':'+ now.getSeconds();

const { connect, beginTransaction } = require('../database/db');
const db = require('../database/db');
const output = {
    home :(req,res)=>{
        //req.session.userInfo - 로그인 정보
        const sql = 'select * from board order by board_key desc';
        db.query(sql,(err,rows,fields)=>{
            var board1=[];
            var board2=[];
            var board3=[];
            for(var i =0;i<rows.length;i++){
                if(rows[i].boardName == 'board1'){
                    board1[i] = rows[i];
                }else if(rows[i].boardName == 'board2'){
                    board2[i] = rows[i];
                }else{
                    board3[i] = rows[i];
                }
            }
            board1 = board1.filter((i)=>i!=undefined);
            board2 = board2.filter((i)=>i!=undefined);
            board3 = board3.filter((i)=>i!=undefined);
            for(var i=0;i<10;i++){
                if(board1[i]==undefined){
                    board1[i]={
                        board_key:'',
                        title:'',
                        script:'',
                        id:'',
                        name:'',
                        nick:'',
                        boardName:'',
                        date:'',
                    }
                }
            }
            for(var i=0;i<10;i++){
                if(board2[i]==undefined){
                    board2[i]={
                        board_key:'',
                        title:'',
                        script:'',
                        id:'',
                        name:'',
                        nick:'',
                        boardName:'',
                        date:'',
                    }
                }
            }
            for(var i=0;i<5;i++){
                if(board3[i]==undefined){
                    board3[i]={
                        board_key:'',
                        title:'',
                        script:'',
                        id:'',
                        name:'',
                        nick:'',
                        boardName:'',
                        date:'',
                    }
                }
            }
            if(!req.session.userInfo){
            res.render('home',{
                board1 : board1,
                board2 : board2,
                board3 : board3,
                logined :false,
            });
            }else{
            res.render('home',{
                board1 : board1,
                board2 : board2,
                board3 : board3,
                logined : true,
                id : req.session.userInfo.id,
                nick: req.session.userInfo.nick,
                name: req.session.userInfo.name,
            });
            }
            
        })

       
    },
    login :(req,res)=>{
        if(req.session.userInfo){ //url로 접근시 리다이렉트로 메인으로 보내버리기
            res.redirect('/');
        }else{
        res.render('login');
        }
    },
    regist : (req,res)=>{
        if(req.session.userInfo) res.redirect('/');
        res.render('regist');
    },
    find : (req,res)=>{
        if(req.session.userInfo) res.redirect('/');
        res.render('find');
    },
    findId : (req,res)=>{
        if(req.session.userInfo) res.redirect('/');
        res.render('findId');
    },
    findPw : (req,res)=>{
        if(req.session.userInfo) res.redirect('/');
        res.render('findPw');
    },
    mypage : (req,res)=>{
        if(!req.session.userInfo) res.redirect('/');
        const sql1 = 'select * from board;';
        const sql2 = 'select * from comment;';
        db.query(sql1+sql2,(err,rows,fields)=>{
           const rows1 = rows[0];
           const rows2 = rows[1];
           var boardData =[];
           var commData =[];
           for(var i =0;i<rows1.length;i++){
                if(rows1[i].id==req.session.userInfo.id){
                    boardData.push(rows1[i]);
                }
           }
           for(var i=0;i<rows2.length;i++){
            if(rows2[i].id==req.session.userInfo.id){
                commData.push(rows2[i]);
            }
           }
           console.log(boardData);
           if(req.session.userInfo){
            res.render('mypage',{logined:true,
                nick : req.session.userInfo.nick,
                name : req.session.userInfo.name,
                id : req.session.userInfo.id,
                board : boardData,
                comment : commData,
               });
           }else{
            res.render('mypage',{logined:false,
                nick : req.session.userInfo.nick,
                name : req.session.userInfo.name,
                id : req.session.userInfo.id,
                board : boardData,
                comment : commData,
               });
           }
          
        })
        
    },
    mypage_changeNick : (req,res)=>{
        if(req.session.userInfo) res.render('mypage_changeNick',{logined : true});
        else res.render('mypage_changeNick',{logined : false});
    },
    mypage_changePw : (req,res)=>{
        if(req.session.userInfo) res.render('mypage_changePw',{logined : true});
        else res.render('mypage_changePw',{logined : false});
    },
    mypage_secession : (req,res)=>{
        if(req.session.userInfo) res.render('mypage_secession',{logined : true});
        else res.render('mypage_secession',{logined : false});
    },
    chat : (req,res)=>{
        res.render('chat');
    },
    boardList:(req,res)=>{
        const boardName = req.params.boardName;
        const boardListPage = req.params.boardListPage;
        const sql = 'select * from board order by board_key desc';
        db.query(sql,(err,rows,fields)=>{
            var boardData = [];
            for(var i =0;i<rows.length;i++){
                if(rows[i].boardName == boardName){
                    boardData.push(rows[i]);
                }
            }
            var count =Math.ceil(boardData.length/10); // ul태그 갯수
            for(var i=0;i<10*count;i++){
                if(boardData[i]==undefined){
                    boardData[i]={
                        nick :'',
                        script:'',
                        date:'',
                    }
                }
            }if(req.session.userInfo){
            res.render('boardList',
            {boardData : boardData,
             boardListPage : boardListPage,       
             count : count ,
             logined : true });
            }else{
            res.render('boardList',
            {boardData : boardData,
            boardListPage : boardListPage,       
            count : count ,
            logined : false });
            }
        })
        
    },
    board:(req,res)=>{
        const boardName = req.params.boardName;
        const board_key = req.params.boardNum;
        const comPage = req.params.comPage;
        var comPagelen;
        const sql1 = 'select * from board; ';
        const sql2 = 'select * from comment; ';
        db.query(sql1+sql2,(err,rows,fields)=>{
            var rows1 = rows[0];
            var rows2 = rows[1];
            var idx = -1;
            for(var i=0;i<rows1.length;i++){
                if(rows1[i].board_key==board_key){
                    idx = i;
                }0

            }
            const boardData = rows1[idx];
             
            comPagelen =Math.ceil(rows2.length/13);

           var commentDate=[];
            for(var i=0;i<rows2.length;i++){
                if(rows2[i].board_key == board_key){
                    commentDate.push(rows2[i]);
                }
            }
            for(var i=0;i<comPagelen*13;i++){
                if(commentDate[i]==undefined){
                    commentDate.push({
                        comment_key:'',
                        board_key:'',
                        script:'',
                        id:'',
                        name:'',
                        nick:'',
                        date:'',
                    });
                }
            }
            
            if(req.session.userInfo){
                res.render('board',{boardData:boardData,
                                    comment :commentDate,
                                    comPage : comPage,
                                    comPagelen : comPagelen,
                                    id : req.session.userInfo.id,
                                    logined : true    });
                }else{
                    res.render('board',{boardData:boardData,
                                        comment :commentDate,
                                        comPage : comPage,
                                        comPagelen : comPagelen,
                                    id:false,
                                     logined : false           });
                }
        })
       
    },
    write:(req,res)=>{
        const boardName = req.params.boardName;
        if(boardName == 'board3'){
            if(req.session.userInfo.id !='admin'){
                res.redirect('/');
            }else res.render('write',{boardName : boardName,logined : true});
        }else{
        if(req.session.userInfo) res.render('write',{boardName : boardName,logined : true});
        else res.redirect('/');
        }
       
    },
    update:(req,res)=>{
        if(req.session.userInfo.id != req.params.id){
            return res.redirect('/');
        }else{
            const board_key = req.params.boardNum;
            const sql = 'select * from board'
            var boardData;
            db.query(sql,(err,rows,fields)=>{
                for(var i=0;i<rows.length;i++){
                    if(rows[i].board_key == board_key) boardData = rows[i];
                }
                res.render('update',{boardData:boardData , logined : true});
            })
        }
    },
}
const process = {
    home : (req,res)=>{
        if(req.body.logout){
            req.session.destroy((err)=>{
                if(err){
                    console.log(err);
                }
                else{
                    res.redirect('/login');
                }
            });
           }
    },
    login : (req,res)=>{
        const client = {
            id : req.body.id,
            pw : req.body.pw,
        }
        const sql = 'select id,pw,name,nick from user';
        db.query(sql,(err,rows,fields)=>{
            var idx = -1;
            for(var i =0;i<rows.length;i++){
                if(rows[i].id==client.id){
                    idx = i;
                }
            }
            if(idx ==-1){
                return res.json({
                    success : false,
                    msg : '아이디가 일치하지 않습니다',
                })
            }
            if(rows[idx].id==client.id && rows[idx].pw == client.pw){
                req.session.userInfo = {
                    id : rows[idx].id,
                    name : rows[idx].name,
                    nick : rows[idx].nick,
                }
                return res.json({
                    success : true,
                    msg : `환영합니다 ${rows[idx].name} 님`
                })
            }
            return res.json({
                success:false,
                msg: '비밀번호가 일치하지 않습니다',
            })
        })
    },
    regist : (req,res)=>{
        const client = {
            id : req.body.id,
            nick :req.body.nick,
            name :req.body.name,
            pw : req.body.pw,
            pw2 :req.body.pw2,
        }
        
        if(client.id.length<8 || client.id.length>15) return res.json({success:false,msg:'아이디는 8자리 이상 15자리 보다 작아야합니다'});
        if(client.nick.length<2 || client.nick.length>8) return res.json({success:false,msg:'닉네임은 2자리 이상 8자리 보다 작아야합니다'});
        if(client.name.length<2 || client.name.length>5) return res.json({success:false,msg:'이름이 이상해요'});
        if(client.pw.length<8 || client.pw.length>15) return res.json({success:false,msg:'패스워드는 8자리 이상 15자리 보다 작아야합니다'});
        if(client.pw != client.pw2) return res.json({success:false,msg:'비밀번호 확인이 일치하지않습니다'});
        else{
            const sql = 'select id from user';
            db.query(sql,(err,rows,fields)=>{
                for(var i =0;i<rows.length;i++){
                    if(client.id==rows[i].id){
                        return res.json({
                            success : false,
                            msg : '중복되는 아이디입니다',
                        })
                    }}
                        const sql2 = `insert into user(id,name,nick,pw,date) values('${client.id}','${client.name}','${client.nick}','${client.pw}','${today}') `
                        db.query(sql2,(err,rows,fields)=>{
                            return res.json({
                                success : true,
                                msg : '회원가입에 성공하셨습니다',
                            })
                        })
                    
                
            })
        }
    },
    find : (req,res)=>{
    
    }, 
    findId : (req,res)=>{
        const client = {
            nick : req.body.nick,
            name : req.body.name,
            pw : req.body.pw,
        }
        const sql = 'select id,nick,name,pw from user';
        db.query(sql,(err,rows,fields)=>{
            var idx = -1;
            for(var i =0;i<rows.length;i++){
                if(rows[i].nick==client.nick && rows[i].name==client.name && rows[i].pw==client.pw ){
                    idx = i;
                }
            }
            if(idx == -1){
                return res.json({
                    success : false,
                    msg : '일치하는 정보가 없습니다',
                })
            }
            return res.json({
                success : true,
                id : rows[idx].id,
            })
        })
    },
    findPw : (req,res)=>{
       const client = {
        id : req.body.id,
        nick : req.body.nick,
        name : req.body.name,
       }
       const sql = 'select user_key,id,nick,name,pw from user';
        db.query(sql,(err,rows,fields)=>{
            var idx = -1;
            for(var i =0;i<rows.length;i++){
                if(rows[i].id==client.id && rows[i].nick==client.nick && rows[i].name==client.name){
                    idx = i;
                }
            }
            if(idx == -1){
                return res.json({
                    success : false,
                    msg : '일치하는 정보가 없습니다',
                })
            }
            const result_pw = Math.random().toString(36).substring(2, 12);
            const sql2 = `update user set pw = '${result_pw}' where user_key = '${rows[idx].user_key}'`
            db.query(sql2,(err,rows,fields)=>{
                return res.json({
                    success : true,
                    pw : result_pw,
                })
            })


            
      
        })

    },
    mypage : (req,res)=>{
        if(req.body.logout){
            req.session.destroy((err)=>{
                if(err){
                    console.log(err);
                }
                else{
                    res.redirect('/login');
                }
            });
           }
    },
    mypage_changeNick : (req,res)=>{
        if(req.body.logout){
            req.session.destroy((err)=>{
                if(err){
                    console.log(err);
                }
                else{
                    res.redirect('/login');
                }
            });
           }else{
      const client = {
        id : req.body.id,
        pw : req.body.pw,
        nick : req.body.nick,
      }
      const sql = 'select * from user';
      db.query(sql,(err,rows,fields)=>{
        var idx = -1;
        for(var i =0;i<rows.length;i++){
            if(rows[i].id==client.id){
                idx = i;
            }
        }
        if(idx == -1){
            return res.json({
                success : false,
                msg : '일치하는 아이디가 없습니다',
            })
        }
     
        if(client.nick.length<2 || client.nick.length>8) return res.json({success:false,msg:'닉네임은 2자리 이상 8자리 보다 작아야합니다'});
        if(rows[idx].id == client.id && rows[idx].pw ==client.pw){
            const sql = `update user set nick='${client.nick}' where user_key=${rows[idx].user_key} `
            db.query(sql,(err,rows,fields)=>{})
            const sql3 = `update board set nick='${client.nick}' where id='${req.session.userInfo.id}'`
            db.query(sql3,(err,rows,fields)=>{});
            const sql4 = `update comment set nick ='${client.nick}' where id='${req.session.userInfo.id}'`
            db.query(sql4,(err,rows,fields)=>{});
            req.session.destroy();
            return res.json({
                success : true,
                msg : '닉네임이 변경되었습니다 새로 로그인바랍니다'
            })
        }
        return res.json({
            success : false,
            msg : '일치하는 정보가 없습니다',
        })
      })
    }
    },
    mypage_changePw : (req,res)=>{
        if(req.body.logout){
            req.session.destroy((err)=>{
                if(err){
                    console.log(err);
                }
                else{
                    res.redirect('/login');
                }
            });
           }else{
        const client = {
            curPw : req.body.curPw,
            chaPw1 : req.body.chaPw1,
            chaPw2 : req.body.chaPw2,
        }
        sql = 'select * from user'
        db.query(sql,(err,rows,fields)=>{
            var idx = -1;
            for(var i=0;i<rows.length;i++){
                if(rows[i].id == req.session.userInfo.id){
                    idx = i
                }
            }
            if(idx ==-1) {
                return res.json({
                    success : false,
                    msg : '기존비밀번호가 일치하지않습니다',
                })
            }
            if(client.chaPw1.length<8 || client.chaPw1.length>15) return res.json({success:false,msg:'패스워드는 8자리 이상 15자리 보다 작아야합니다'});
            if(rows[idx].pw == client.chaPw1){
                return res.json({
                    success : false,
                    msg : '동일한 비밀번호로는 변경할수없습니다',
                })
            }
            if(rows[idx].pw == client.curPw && client.chaPw1 == client.chaPw2){
                const sql2 = `update user set pw='${client.chaPw1}' where user_key =${rows[idx].user_key}`;
                db.query(sql2,(err,rows,fields)=>{
                })
                req.session.destroy();
                return res.json({
                    success : true,
                    msg : '비밀번호가 변경되었습니다 새로 로그인 바랍니다',
                })
            }
            return res.json({
                success : false,
                msg : '정보가 일치하지 않습니다',
            })
        })
    }
    },
    mypage_secession : (req,res)=>{
        if(req.body.logout){
            req.session.destroy((err)=>{
                if(err){
                    console.log(err);
                }
                else{
                    res.redirect('/login');
                }
            });
           }else{
        const client = {
            id :  req.body.id,
            nick : req.body.nick,
            pw : req.body.pw,
            agree : req.body.agree,
        }
        const sql = 'select * from user';
        db.query(sql,(err,rows,fields)=>{
            var idx = -1;
            for(var i =0;i<rows.length;i++){
                if(rows[i].id == client.id){
                    idx =i;
                }
            }
            if(idx ==-1){
                return res.json({
                    success : false,
                    msg : '정보가 일치하지않습니다',
                })
            }
            if(rows[idx].id == client.id && rows[idx].nick==client.nick &&rows[idx].pw == client.pw && client.agree == '회원탈퇴에 동의합니다'){
                
                const sql2 = `delete from board where id='${req.session.userInfo.id}'`
                db.query(sql2,(err,rows,fields)=>{});
                const sql3 = `delete from comment where id='${req.session.userInfo.id}'`
                db.query(sql3,(err,rows,fields)=>{});
                const sql1 = `delete from user where user_key=${rows[idx].user_key}`
            
                db.query(sql1,(err,rows,fields)=>{});
               
                req.session.destroy();
                return res.json({
                    success : true,
                    msg : '회원 탈퇴가 완료되었습니다.',
                })
            }
            return res.json({
                success : false,
                msg : '정보가 일치하지않습니다',
            })
        })
    }
        
    },
    chat : (req,res)=>{
        console.log(req.body);
    },
    boardList:(req,res)=>{
            if(req.body.logout){
                req.session.destroy((err)=>{
                    if(err){
                        console.log(err);
                    }
                    else{
                        res.redirect('/login');
                    }
                });
               }
        
    },
    board:(req,res)=>{
        if(req.body.logout){
            req.session.destroy((err)=>{
                if(err){
                    console.log(err);
                }
                else{
                    res.redirect('/login');
                }
            });
        }else{
        if(req.body.board_delete){ // 게시글 삭제
            const client = {
                board_key : req.body.board_delete,
                boardName : req.body.boardName,
            }
            const sql1 = `delete from board where board_key=${client.board_key} ;`
            const sql2 = `delete from comment where board_key=${client.board_key} ;`
            db.query(sql1+sql2,(err,fows,fields)=>{
                return res.redirect(`/board/${client.boardName}/1`);
            })
        }else{ // 댓글 입력,삭제
        if(!req.body.comment){ //삭제로직
            const client = {
                comment_key : req.body.comment_key,
                id : req.body.id,
                boardName : req.body.boardName,
                board_key : req.body.board_key,
            }
            if(client.id == req.session.userInfo.id){
                console.log(client.comment_key);
            const sql = `delete from comment where comment_key=${client.comment_key}`
            db.query(sql,(err,fows,fields)=>{
                return res.redirect(`/boardScript/${client.boardName}/${client.board_key}/1`)
            })
            }
        }else{//댓글로직
            const client = {
                boardName : req.body.boardName,
                board_key : req.body.board_key,
                comment : req.body.comment,
                id : req.session.userInfo.id,
                name : req.session.userInfo.name,
                nick : req.session.userInfo.nick,
                date : today,
            }
            const sql = `insert into comment(board_key,script,id,name,nick,date) values('${client.board_key}','${client.comment}','${client.id}','${client.name}','${client.nick}','${client.date}')`
            db.query(sql,(err,fows,fields)=>{
                return res.redirect(`/boardScript/${client.boardName}/${client.board_key}/1`)
            })
        }
    }
    }
    },
    write:(req,res)=>{
        if(req.body.logout){
            req.session.destroy((err)=>{
                if(err){
                    console.log(err);
                }
                else{
                    res.redirect('/login');
                }
            });
        }else{
        const client = {
            title : req.body.title,
            boardName : req.body.boardName,
            script : req.body.script,
            id : req.session.userInfo.id,
            name : req.session.userInfo.name,
            nick : req.session.userInfo.nick,
            date : today,
        }
        const sql = `insert into board(title,script,id,name,nick,boardName,date) values(
            '${client.title}','${client.script}','${client.id}','${client.name}','${client.nick}','${client.boardName}','${client.date}'
        )`
        db.query(sql,(err,rows,fields)=>{
           res.redirect(`/board/${client.boardName}/1`)
        })
    }
    },
    update:(req,res)=>{
        if(req.body.logout){
            req.session.destroy((err)=>{
                if(err){
                    console.log(err);
                }
                else{
                    res.redirect('/login');
                }
            });
        }else{
        const client = {
            boardName : req.body.boardName,
            board_key : req.body.board_key,
            title : req.body.title,
            script : req.body.script,
        }
        const sql = `update board set title='${client.title}',script='${client.script}' where board_key =${client.board_key}`
        db.query(sql,(err,rows,fields)=>{
            return res.redirect(`/boardScript/${client.boardName}/${client.board_key}/1`);
        })
     }
    },
}
module.exports={
    output,
    process,
}
