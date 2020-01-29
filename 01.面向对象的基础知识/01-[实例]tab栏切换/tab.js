var that;
class Tab {
  constructor(id) {
    // 获取元素
    that = this;
    this.main = document.querySelector(id)
    this.lis = this.main.querySelectorAll('li')
    this.sections = this.main.querySelectorAll('section');
    this.init();
  }
  init() {
    // init 初始化操作让相关的元素绑定事件
    for(var i =0; i< this.lis.length; i++){
      this.lis[i].index = i;
      this.lis[i].onclick = this.toggleTab;
    }
  }

  // 1. 切换功能
  toggleTab() {
    that.clearClass();
    that.className = 'liactive';
    that.sections[this.index].className = 'conactive';
  };
  clearClass() {
    for(var i = 0; i< this.lis.length; i++){
      this.lis[i].className = '';
      this.sections[i].className = '';
    }
  }

  // 2. 添加功能
  addTab() {}

  // 3. 删除功能
  removeTab() {}

  // 4. 修改功能
  editTab() {}
}
new Tab('#tab')