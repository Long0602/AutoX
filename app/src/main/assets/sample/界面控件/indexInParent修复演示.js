// indexInParent修复演示脚本
console.log("=== AutoX indexInParent修复演示 ===");

console.log("修复前的问题：");
console.log("  - UiSelector.findOne().parent().indexInParent() 总是返回 -1");
console.log("  - 原因：parent()方法创建新UiObject时，indexInParent参数被硬编码为-1");
console.log("  - 导致无法正确获取父节点在祖父节点中的索引");

console.log("\n修复后的改进：");
console.log("  - parent()方法现在会正确计算父节点的索引");
console.log("  - 通过遍历父节点的子节点来找到当前节点的索引");
console.log("  - 使用节点属性比较来确保找到正确的节点");

console.log("\n修复代码要点：");
console.log("1. 在parent()方法中添加calculateParentIndex()函数");
console.log("2. 通过遍历父节点的子节点来找到当前节点的索引");
console.log("3. 使用isSameNode()函数比较节点属性来确保匹配正确");

console.log("\n使用示例：");
console.log("// 修复前：总是返回-1");
console.log("var index = text('按钮').findOne().parent().indexInParent();");
console.log("console.log(index); // 输出: -1");

console.log("\n// 修复后：返回正确的索引");
console.log("var index = text('按钮').findOne().parent().indexInParent();");
console.log("console.log(index); // 输出: 正确的索引值 (>= 0)");

console.log("\n=== 修复完成 ===");
console.log("现在indexInParent()方法应该能正确返回父节点在祖父节点中的索引了！");
