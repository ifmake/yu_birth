 // 全局变量
 var page = 1;
 // 鼠标点击出现❤️
 document.addEventListener('click', function(ev) {
     ev.stopPropagation();
     var color = randColor();
     var Heart = document.createElement("div");
     var loveText = document.createElement("div");
     Heart.className = 'heart';
     loveText.className = 'love_text';
     loveText.innerHTML = '爱你雨'
     Heart.style.backgroundColor = color;
     loveText.style.color = color;
     Heart.style.left = ev.pageX + 'px';
     Heart.style.top = ev.pageY + 'px';
     loveText.style.left = ev.pageX + 'px';
     loveText.style.top = (ev.pageY - 25) + 'px';
     document.body.append(Heart);
     document.body.append(loveText);
     var i = 1;
     var t = setInterval(function () {
         Heart.style.top = Heart.offsetTop - 2 + 'px';
         loveText.style.top = loveText.offsetTop - 2 + 'px';
         i -= 0.01;
         Heart.style.opacity = i;
         loveText.style.opacity = i;
         var scale = 1 + (1 - i);
         Heart.style.transform = 'scale(' + scale + ',' + scale + ') rotate(45deg)';
         if (i < 0.01 || Heart.style.top + Heart.offsetTop >= window.innerHeight) {
             Heart.remove();
             loveText.remove();
             clearInterval(t);
         }
     }, 30)
 },false)
  // 随机色
   function randColor() {        
       var r=parseInt(Math.random()*256);
       var g=parseInt(Math.random()*256);
       var b=parseInt(Math.random()*256);
     //   var a=Math.random().toFixed(1)
       var a = 1;
       var color='rgba('+r+','+g+','+b+','+a+')';
       return color;
   }

 // 页面序列
 var pageQueue = (function() {
     function exchangePage() {
         this._pages = []
     }
     exchangePage.prototype.next = function (node, nodes = []) {
         for (let item = 0; item < nodes.length; item++) {
             nodes[item].style.display = 'none'
         }
         if(node.nextElementSibling&& node.nextElementSibling.className.indexOf('pages') !==-1) {
             node.nextElementSibling.style.display ='block'
         }else {
            node.style.display = 'block';
         }
     }
     exchangePage.prototype.prev = function (node, nodes = []) {
         console.dir(node.previousElementSibling)
         for (let item = 0; item < nodes.length; item++) {
             nodes[item].style.display = 'none'
         }
         if(node.previousElementSibling && node.previousElementSibling.className.indexOf('pages') !==-1) {
             node.previousElementSibling.style.display ='block'
         }else {
            node.style.display = 'block';
         }
     }
     return  exchangePage
 })()
 var pages = new pageQueue();
    // 页面切换
    function changePage(type) {
     var Nodes = document.body.getElementsByClassName('pages');
     for (let i = 0; i < Nodes.length; i++) {
         if(Nodes[i].style.display === 'block') {
             if(type === 'next') {
                 pages.next(Nodes[i], Nodes)
             }else {
                 pages.prev(Nodes[i], Nodes)
             }
             break;
         }
     }
 }

 // 信息存储
 var Sure = document.getElementById('sureBtn');
 Sure.addEventListener('click', function() {
     var Supply = document.getElementById('SupplyVolume');
     var yuName = document.getElementById('YuName')
     var tip = document.getElementById('Success')
     console.log('是否监听到')
     if(window.localStorage) {
         if(yuName.value && yuName.value !== '丁雨') {
             alert('请填写正确的名称')
             return;
         }
         var SaveObj = {
             supply: Supply.value,
             name : yuName.value,
         }
         window.localStorage.setItem('save', JSON.stringify(SaveObj))
         tip.style.display = 'block'
     }
 })
 // 初始化加载完成
 window.onload = function (){
    var Supply = document.getElementById('SupplyVolume');
    var yuName = document.getElementById('YuName')
    if(window.localStorage) {
    //   window.localStorage.clear();
      var NewObj = JSON.parse(window.localStorage.getItem('save'))
      if(NewObj) {
        Supply.value = NewObj.supply;
        if(NewObj.name && NewObj.name === '丁雨') {
          yuName.value = NewObj.name;
          yuName.disabled = true;
        }
      }
     
    }
 }
