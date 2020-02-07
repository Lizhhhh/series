/**
 * 统计页面中出现的标签数
 * 考点:
 * 1. dom基础操作
 * 2. ES6数组的遍历
 */

new Set([...document.getElementsByTagName('*')].map(v => v.tagName)).size

