const express = require('express')
const router = express.Router()
const conn = require('../mariadb')

router.use(express.json()) 

router
    .route('/')
    .get((req, res) => {
        var {user_id} = req.body

        let sql = `SELECT * FROM channels WHERE user_id= ?`
        if(user_id){
            conn.query(sql, user_id,
                function (err, results) {
                    if(results.length){
                        res.status(200).json(results)
                        res.end()
                    } else {
                        notFoundChannel(res)
                    }
                }
            )
        } else {
            res.status(400).end()
        }
    })

    .post((req, res) => {
        const {name, user_id} = req.body
        if (name && user_id) {

            let sql = `INSERT INTO channels (name, user_id)
                    values (?, ?)`
            let values = [name, user_id]

            conn.query(sql, values,
                function (err, results, fields) {
                    res.status(201).json(results)
                }
            )
        } else {
            res.status(400).json({
                message : "요청 값을 제대로 보내주세요."
            })
        }
    })

router
    .route('/:id')
    .get((req, res) => {
        let {id} = req.params
        id = parseInt(id)

        let sql = `SELECT * FROM channels WHERE id = ?`
        conn.query(sql,id, 
            function(err, results) {
                if(results.length){
                    res.status(200).json(results)
                }else {
                    notFoundChannel(res)
                }
            }
        )
    })

    .put((req, res) => {
        let {id} = req.params
        id = parseInt(id)

        var channel = db.get(id)
        var oldtitle = channel.channeltitle
        if (channel) {
            var newTitle = req.body.channeltitle

            channel.channeltitle =newTitle
            db.set(id, channel)
            res.status(201).json({
                message : `채널명이 정상적으로 수정되었습니다. 기존${oldtitle}에서 -> 수정${newTitle}로 변경`
            })
        } else {
            notFoundChannel()
        }
    })

    .delete((req, res) => {
        let {id} = req.params
        id = parseInt(id)

        var channel = db.get(id)
        if(channel){
            db.delete(id)
            res.status(200).json({
                message : `${channel.channeltitle}님 정상적으로 삭제되었습니다.`
            })
        } else {
            notFoundChannel()
        }
    })

function notFoundChannel(res) {
    res.status(404).json({
        message : "채널 정보를 찾을 수 없습니다."
    })
}

module.exports = router