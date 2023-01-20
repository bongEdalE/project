const express = require('express');
const router = express.Router();
const ctrl = require('./route.ctrl');

router.get('/',ctrl.output.home);
router.get('/login',ctrl.output.login);
router.get('/regist',ctrl.output.regist);
router.get('/find',ctrl.output.find);
router.get('/findId',ctrl.output.findId);
router.get('/findPw',ctrl.output.findPw);
router.get('/mypage/:userid',ctrl.output.mypage);
router.get('/chat',ctrl.output.chat);
router.get('/board/:boardName/:boardListPage',ctrl.output.boardList);
router.get('/boardScript/:boardName/:boardNum/:comPage',ctrl.output.board);
router.get('/write/:boardName',ctrl.output.write);
router.get('/update/:boardNum/:id',ctrl.output.update);
router.get('/userInfo/changePw/:id',ctrl.output.mypage_changePw);
router.get('/userInfo/changeNick/:id',ctrl.output.mypage_changeNick);
router.get('/userInfo/secession/:id',ctrl.output.mypage_secession);

router.post('/',ctrl.process.home);
router.post('/login',ctrl.process.login);
router.post('/regist',ctrl.process.regist);
router.post('/find',ctrl.process.find);
router.post('/findId',ctrl.process.findId);
router.post('/findPw',ctrl.process.findPw);
router.post('/mypage/:userid',ctrl.process.mypage);
router.post('/userInfo/changePw/:id',ctrl.process.mypage_changePw);
router.post('/userInfo/changeNick/:id',ctrl.process.mypage_changeNick);
router.post('/userInfo/secession/:id',ctrl.process.mypage_secession);
router.post('/chat',ctrl.process.chat);
router.post('/board/:boardName/:boardListPage',ctrl.process.boardList);
router.post('/boardScript/:boardName/:boardNum/:comPage',ctrl.process.board);
router.post('/write/:boardName',ctrl.process.write);
router.post('/update/:boardNum/:id',ctrl.process.update);


module.exports = router;