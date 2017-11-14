# scroller 

tags: scroller 

这是个移动端和pc端通用的检测滑动的库。

## 功能

1. 触顶/触底的触发函数。
    即：在滑块在一定范围内到达顶部或者打到底部，亦或者二者均可的触发指定函数。
2. 离开触顶/触底触发函数。
    有些情况我们不仅需要滑块触顶或者触底，在滑块离开二者的一定范围时也需要触发一些函数。
3. 设置触顶/触底的阈值。
4. 集成节流阀，可设置频率，提高性能。

## 用法
```
scroller({
    fElement:dom<obj>,
    threshold?:<number>,
    arrived:<function>,
    unarrived:<function>,
    up?:<number>,
    down?:<number>,
    modal?:'debounce'/'throttle'<string>,
    frequency?:250<number>
})
```

往 scroller中添加一个对象即可

* fElement: 父元素对象
* threshold: 默认的到达底部的阈值，比如默认值20，也就是说在到达底部的20px范围呢可触发arrived函数。
* arrived:达到顶部或者底部的触发函数
* unarrived:离开顶部或者底部的触发函数
* up:阈值，如果设置则触发下拉到达顶部的函数（默认为null)
* down:阈值，如果设置则为到达底部的阈值。（默认值等于threshold
* modal:节流阀模式。`debounce`：防抖；`throttle`:减少频率;
* frequency:节流阀的频率，默认为250。

## 例子

`html`

```
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
  <style>
    .f {
      width: 200px;
      height: 250px;
      overflow-y: auto;
    }
  </style>
</head>

<body>

  <div class="f">

    <div class="s">
      <p>项目_1</p>
      <p>项目_2</p>
      <p>项目_3</p>
      <p>项目_4</p>
      <p>项目_5</p>
      <p>项目_6</p>
      <p>项目_7</p>
      <p>项目_8</p>
      <p>项目_9</p>
      <p>项目_10</p>

    </div>
  </div>

  <script src="../dist/scroller.umd.js"></script>
  <script>
    var f = document.querySelector('.f')
    let fun = {
      arrived: function () {
        console.log(`到了`)
      },
      unarrived: function () {
        console.log(`离开了`)
      }
    }
    let config1 = {
      fElement: f,
      modal: 'throttle',
      frequency: '250',
      up: 10,
    },
    config2={
      fElement: f,
      modal: 'throttle',
      frequency: '250',
      up: 10,
      down:20
    },
    config3={
      fElement: f,
      frequency: '250',
    };

    var config = Object.assign({},fun,config1)
    // var config = Object.assign({},fun,config2)
    // var config = Object.assign({},fun,config3)
    var scroller = new scroller(config)
  </script>
</body>

</html>
```