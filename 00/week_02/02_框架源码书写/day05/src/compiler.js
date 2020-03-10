/* 由HTML DOM -> VNode: 将这个函数当做 compiler函数 */
function getVNode(node) {
  let nodeType = node.nodeType
  let _vnode = null
  if (nodeType == 1) {
    // 元素节点
    let nodeName = node.nodeName
    let attrs = node.attributes
    let _attrObj = {}
    for (let i = 0; i < attrs.length; i++) {
      _attrObj[attrs[i].nodeName] = attrs[i].nodeValue
    }
    _vnode = new VNode(nodeName, _attrObj, undefined, nodeType)

    // 考虑子元素
    let childNodes = node.childNodes
    for (let i = 0; i < childNodes.length; i++) {
      _vnode.appendChild(getVNode(childNodes[i]))
    }
  } else if (nodeType == 3) {
    _vnode = new VNode(undefined, undefined, node.nodeValue, nodeType)
  }
  return _vnode
}

/* 将虚拟DOM 转换为真正的 DOM */
function parseVNode(vnode) {
  let type = vnode.type
  let _node = null
  if (type == 3) {
    return document.createTextNode(vnode.value)
  } else if (type == 1) {
    _node = document.createElement(vnode.tag)

    // 属性
    let data = vnode.data
    Object.keys(data).forEach(key => {
      let attrName = key
      let attrValue = data[key]
      _node.setAttribute(attrName, attrValue)
    })

    // 子元素
    let children = vnode.children
    children.forEach(subvnode => {
      _node.appendChild(parseVNode(subvnode))
    })
    return _node
  }
}

/* 根据路径访问成员 */
function getValueByPath(obj, path) {
  let res = obj,
    currProp,
    props = path.split('.')
  while ((currProp = props.shift())) {
    if (res && res[currProp]) {
      res = res[currProp]
    }
  }
  return res
}

/* 将带有坑的 VNode与数据 data结合,得到填充数据的VNode -> 模拟AST -> VNode */
function combine(vnode, data) {
  let _type = vnode.type
  let _data = vnode.data
  let _tag = vnode.tag
  let _value = vnode.value
  let _children = vnode.children
  let _vnode = null
  if (_type == 3) {
    _value = _value.replace(/\{\{(.+?)\}\}/g, function(_, g) {
      return getValueByPath(data, g.trim())
    })
    _vnode = new VNode(_tag, _data, _value, _type)
  } else if (_type == 1) {
    _vnode = new VNode(_tag, _data, _value, _type)
    _children.forEach(_subVNode => _vnode.appendChild(combine(_subVNode, data)))
  }
  return _vnode
}
