const express = require('express')
const app = express()
app.listen(7777)
app.use(express.json()) //http 외 모듈 사용 'json'

let db = new Map()
var id = 1

// 로그인
app.post('/login', function(req,res) {
    console.log(req.body) //userID, pwd

    const {userID, password} = req.body
    var loginUser = {}

    db.forEach(function(user, id) {
        if (user.userID === userID) {
            loginUser = user
        }
    })
    
    if(isExist(loginUser)){
        console.log("SAME ID")

        if (loginUser.password === password) {
            console.log("SAME PASSWORD")
        } else {
            console.log("Wrong PASSWORD")
        }
    } else {
        console.log("입력하신 아이디는 없는 아이디입니다.")
    }
})

function isExist(obj) {
    if (Object.keys(obj).length) {
        return true 
    } else {
        return false
    }
}
// 회원가입
app.post('/join', function(req,res) {
    console.log(req.body)
    db.set(id++, req.body)
    
    if (Object.keys(req.body).length > 0) { 
        res.status(201).json({
            message : `${db.get(id-1).name}님 환영합니다!`
        })
    } else {
        res.status(404).json({
            message : `입력값을 다시 확인해주세요.`
        })
    }
})

app
    .route('/users/:id')
    .get(function(req,res) {
        let {id} = req.params
    id = parseInt(id)

    const user = db.get(id)
    if (user == undefined) {
        res.status(404).json({
            message : "회원 정보가 없습니다."
        })
    } else {
        res.status(200).json({
            userID : user.userID,
            name : user.name
        })
    }
    })
    .delete(function(req,res){
        let {id} = req.params
    id = parseInt(id)

    const user = db.get(id)

    if(user == undefined) {
        res.status(404).json({
            message : "회원 정보가 없습니다."
        })
    } else {
        db.delete(id)

        res.status(200).json({
            message : `${user.name}님 다음에 다시 뵙겠습니다.`
        })
    }
    })