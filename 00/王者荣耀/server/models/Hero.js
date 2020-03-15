const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  // 姓名
  name: { type: String },
  // 头像
  avatar: { type: String },
  // 称号
  title: { type: String },
  // 分类
  categories: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Category' }],
  // 各项评分
  scores: {
    // 难度
    difficult: { type: Number },
    // 技能
    skills: { type: Number },
    // 攻击
    attack: { type: Number },
    // 生存
    servive: { type: Number }
  },
  // 技能
  skills: [
    {
      icon: { type: String }, // 技能图标
      name: { type: String }, // 技能名称
      description: { type: String }, // 技能描述
      tips: { type: String }  // 小提示
    }
  ],
  // 顺风出装
  items1: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Item' }],
  // 逆风出装
  items2: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Item' }],
  // 使用技巧
  usageTips: { type: String },
  // 对抗技巧
  battleTips: { type: String },
  // 团战思路
  teamTips: { type: String },
  // 英雄关系
  partners: [
    {
      hero: { type: mongoose.SchemaTypes.ObjectId, ref: 'Hero' },
      description: { type: String }
    }
  ]
})

module.exports = mongoose.model('Hero', schema)
