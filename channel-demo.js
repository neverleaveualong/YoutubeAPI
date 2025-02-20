const express = require('express')
const app = express()
app.listen(7777)
app.use(express.json()) 

let db = new Map()
var id = 1

app
    .route('/channels')
    .get((req, res) => {
        if(db.size){
            var channels = []
        
            db.forEach(function(value, key) {
                channels.push(value)
            })
            res.status(200).json(channels)
        } else {
            res.status(404).json({
                message : "조회할 채널이 없습니다."
            })
        }
    })

    .post((req, res) => {
        if (req.body.channeltitle) {
            db.set(id++, req.body)

            res.status(201).json({
            message : `${db.get(id-1).channeltitle}채널을 응원합니다!`
            })
        } else {
            res.status(400).json({
                message : "채널명을 확인해주세요!"
            })
        }
    })

app
    .route('/channels/:id')
    .get((req, res) => {
        let {id} = req.params
        id = parseInt(id)

        var channel = db.get(id)
        if(channel){
            res.status(200).json(channel)
        } else {
            res.status(404).json({
                message : "채널 정보를 찾을 수 없습니다."
            })
        }
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
            res.status(404).json({
                message : "채널 정보를 찾을 수 없습니다"
            })
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
            res.status(404).json({
                message : "채널 정보를 찾을 수 없습니다."
            })
        }
    })

