const fs = require('fs')
const path = require('path')
const jwt = require('jsonwebtoken')
const multer = require('multer');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(__dirname + '/upload'))
  },
  filename: function (req, file, cb) {
    console.log(file)
    let n = file.originalname.split('.');
    cb(null, n[0] + '-' + Date.now() + '.' + n[1])
  }
})

const upload = multer({
  storage: storage
})
//定义接口
module.exports = function (app) {

  app.get('/', function (req, res, next) {
    res.render('index', {
      title: 'HTML'
    });
  });
  app.get('/index/home', function (req, res, next) {
    res.render('index', {
      title: 'HTML'
    });
  });
  

  //首页商品列表的接口
  const goodsPath = path.resolve(__dirname + '/goodslist')
  app.get('/api/index/recommend.action', (req, res) => {

    if (req.query.page * 1 > 4) {
      res.json({
        code: 1000,
        msg: '没有更多数据了'
      })
    } else {
      let list = fs.readFileSync(goodsPath + `/list${req.query.page}.json`, 'utf-8')
      setTimeout(() => {
        res.json(list)
      }, 1000)
    }

  })

  const queryApi = require('./queryApi')
  //分类借口
  app.get('/api/catagory', (req, res) => {

    queryApi(`/index.php?ctl=goods_class&act=ajaxGetClassList&cid=${req.query.cid}`).then(data => {
      res.end(data)
    })
  })

  const userpath = path.resolve(__dirname + '/user')
  //注册接口
  app.post('/api/user/register', (req, res) => {

    let userlist = JSON.parse(fs.readFileSync(userpath + '/userlist.json', 'utf-8'))

    if (userlist.some(element => {
        return element.username == req.body.username
      })) {
      res.json({
        msg: 'failed',
        imfo: '该用户已存在',
        code: 1
      })
      return
    };
    userlist.push(req.body)
    fs.writeFile(userpath + '/userlist.json', JSON.stringify(userlist), function (err) {
      if (err) {
        res.json({
          msg: err,
          code: 0
        })
      } else {
        res.json({
          msg: 'success',
          code: 1
        })
      }
    })
  })

  //登录接口
  app.post('/api/user/login', (req, res) => {
    let userlist = JSON.parse(fs.readFileSync(userpath + '/userlist.json', 'utf-8'));
    let flag = false; //用户名密码都不匹配
    userlist.forEach(item => {
      if (item.username == req.body.username && item.password == req.body.password) {
        flag = true;
      }
    })

    if (flag) {
      let token = jwt.sign(req.body, '1601E', {
        expiresIn: 60 * 60
      });
      res.json({
        msg: 'success',
        code: 1,
        token
      })
    } else {
      res.json({
        msg: '用户名或者密码错误',
        code: 0
      })
    }
  })

  //购物车商品列表
  app.post('/api/goodslist', (req, res) => {
    jwt.verify(req.body.token, "1601E", function (err, decoded) {
      if (err) {
        res.json({
          msg: err,
          code: 0
        })

      } else {
        let goods = JSON.parse(fs.readFileSync(__dirname + '/cartlist/cartlist.json', 'utf-8'))
        res.json({
          msg: 'success',
          code: 1,
          data: goods[decoded.username] || []
        })
      }

    })
  })

  //添加购物车
  app.post('/api/addcart', (req, res) => {

    if (!req.body.token) {
      res.status(304)
      res.json({
        msg: '参数错误，必传字段：token缺失',
        code: 2
      })
      return;
    }
    jwt.verify(req.body.token, "1601E", (err, decoded) => {
      if (err) {
        res.json({
          msg: '登录超时，请重新登陆',
          code: '0'
        })
      } else {
        const cartpath = __dirname + '/cartlist/cartlist.json';
        let cartlist = JSON.parse(fs.readFileSync(cartpath, 'utf-8'))
        if (cartlist[decoded.username]) {
          let flag = false; //判断商品是否已经存在
          cartlist[decoded.username].forEach((item, index) => {
            if (item.wname == req.body.data.wname) {
              ++item.count;
              flag = true
            }
          })
          if (!flag) {

            let o = {
              ...req.body.data,
              count: 1
            }
            cartlist[decoded.username].push(o)
          }

        } else {
          cartlist[decoded.username] = [{
            count: 1,
            ...req.body.data
          }];
        }

        fs.writeFile(cartpath, JSON.stringify(cartlist), (err) => {
          if (err) {

            res.json({
              msg: '写入错误',
              code: '0'
            })
          } else {
            res.json({
              msg: '添加成功',
              code: 1
            })
          }

        })

      }
    })

  })

  //删除购物车
  app.post('/api/cart/del', (req, res) => {
    if (!req.body.token) {
      res.status(304)
      res.json({
        msg: '参数错误，必传字段：token缺失',
        code: 2
      })
      return;
    }
    jwt.verify(req.body.token, "1601E", (err, decoded) => {

      if (err) {
        res.json({
          msg: '登录超时，请重新登陆',
          code: '0'
        })
      } else {
        const cartpath = __dirname + '/cartlist/cartlist.json';
        let cartlist = JSON.parse(fs.readFileSync(cartpath, 'utf-8'))
        let goodslist = cartlist[decoded.username]
        //操作数据库
        let delindex = [];
        //收集要删除的索引
        goodslist = goodslist.forEach((item, index) => {
          req.body.goodsname.forEach((v, i) => {
            if (item.wname == v) {
              delindex.push(index)
            }
          })

        })

        return;

        //逻辑题：从指定数组中删除指定索引
        //let arr = ['a','b','c','d','e']
        //let delindex = [1,2,4]
        //从goodslist里面删除指定的索引
        goodslist.splice(delindex, 1)
        //更新goodslist
        cartlist[decoded.username] = goodslist

        fs.writeFile(cartpath, JSON.stringify(cartlist), (err) => {
          if (err) {

            res.json({
              msg: '写入错误',
              code: '0'
            })
          } else {
            res.json({
              msg: '删除成功',
              code: 1
            })
          }

        })

      }
    })
  })

  //修改购物车数量
  app.post('/api/cart/count', (req, res) => {

    if (!req.body.token) {
      res.status(304)
      res.json({
        msg: '参数错误，必传字段：token缺失',
        code: 2
      })
      return;
    }
    jwt.verify(req.body.token, "1601E", (err, decoded) => {

      if (err) {
        res.json({
          msg: '登录超时，请重新登陆',
          code: '0'
        })
      } else {
        const cartpath = __dirname + '/cartlist/cartlist.json';
        let cartlist = JSON.parse(fs.readFileSync(cartpath, 'utf-8'))
        let goodslist = cartlist[decoded.username]

        //操作数据库
        goodslist = goodslist.map((item, index) => {
          if (item.wname == req.body.goodsname) {
            item.count = req.body.count
          }
          return item
        })
        cartlist[decoded.username] = goodslist

        fs.writeFile(cartpath, JSON.stringify(cartlist), (err) => {
          if (err) {

            res.json({
              msg: '写入错误',
              code: '0'
            })
          } else {
            res.json({
              msg: '修改成功',
              code: 1
            })
          }

        })

      }
    })
  });

  //添加邮寄地址
  app.post('/api/addaddr', (req, res) => {
    console.log(req.body)
    let addrlist = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'addr/addr.json'), 'utf-8'))
    jwt.verify(req.body.token, '1601E', (err, decoded) => {
      if (err) {
        res.json({
          code: 0,
          msg: '登录超时，请重新登陆'
        })
      } else {
        if (addrlist[decoded.username]) {
          addrlist[decoded.username].push(req.body.data)
        } else {
          addrlist[decoded.username] = [req.body.data]
        }
        fs.writeFile(path.resolve(__dirname, 'addr/addr.json'), JSON.stringify(addrlist), function (error) {
          if (error) {
            res.json({
              code: 0,
              msg: '服务器报错,请重新尝试',
              data: error
            })
          } else {
            res.json({
              code: 1,
              msg: '添加成功'
            })
          }
        })
      }
    })
  });

  //获取邮寄地址列表
  app.post('/api/addrlist', (req, res) => {

    let addrlist = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'addr/addr.json'), 'utf-8'))
    jwt.verify(req.body.token, '1601E', (err, decoded) => {
      if (err) {
        res.json({
          code: 0,
          msg: '登录超时，请重新登陆'
        })
      } else {
        res.json({
          code: 1,
          msg: '请求成功',
          data: addrlist[decoded.username]
        })
      }
    })
  })

  //文件上传接口
  app.post('/api/upload', upload.single('images'), (req, res) => {

    res.json({
      code: 0,
      msg: 'success',
      url: 'http://localhost:3000/server/upload/' + req.file.filename
    })

  })
}
