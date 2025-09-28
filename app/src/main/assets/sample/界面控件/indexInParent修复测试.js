// 测试indexInParent修复效果
console.log("=== 测试indexInParent修复效果 ===");

// 等待无障碍服务启动
auto.waitFor();

console.log("开始测试indexInParent功能...");

// 测试1：验证parent().indexInParent()是否能正确返回索引
function testParentIndexInParent() {
    console.log("\n测试1：验证parent().indexInParent()功能");
    
    try {
        // 获取根节点
        var root = auto.root;
        if (!root) {
            console.log("无法获取根节点");
            return;
        }
        
        // 查找一个有子节点的控件
        var parentNode = root.findOne(textContains("设置") || className("android.widget.LinearLayout"));
        if (!parentNode) {
            console.log("未找到合适的父节点");
            return;
        }
        
        console.log("找到父节点:", parentNode.className(), parentNode.text());
        
        // 获取父节点的子节点
        var children = parentNode.children();
        console.log("子节点数量:", children.size());
        
        if (children.size() > 0) {
            // 测试第一个子节点
            var firstChild = children.get(0);
            if (firstChild) {
                console.log("第一个子节点:", firstChild.className(), firstChild.text());
                
                // 测试修复后的indexInParent功能
                var parentOfChild = firstChild.parent();
                if (parentOfChild) {
                    var indexInParent = parentOfChild.indexInParent();
                    console.log("父节点的indexInParent:", indexInParent);
                    
                    if (indexInParent >= 0) {
                        console.log("✓ parent().indexInParent()修复成功！");
                    } else {
                        console.log("✗ parent().indexInParent()仍然返回-1");
                    }
                } else {
                    console.log("无法获取父节点");
                }
            }
        }
        
    } catch (e) {
        console.log("测试过程中出现错误:", e.message);
    }
}

// 测试2：验证直接使用indexInParent()的功能
function testDirectIndexInParent() {
    console.log("\n测试2：验证直接使用indexInParent()功能");
    
    try {
        var root = auto.root;
        if (!root) {
            console.log("无法获取根节点");
            return;
        }
        
        // 查找一个控件
        var node = root.findOne(textContains("设置") || className("android.widget.TextView"));
        if (node) {
            var index = node.indexInParent();
            console.log("控件的indexInParent:", index);
            
            if (index >= 0) {
                console.log("✓ 直接indexInParent()功能正常");
            } else {
                console.log("✗ 直接indexInParent()返回-1");
            }
        } else {
            console.log("未找到测试控件");
        }
        
    } catch (e) {
        console.log("测试过程中出现错误:", e.message);
    }
}

// 测试3：验证选择器链式调用的indexInParent
function testSelectorChainIndexInParent() {
    console.log("\n测试3：验证选择器链式调用的indexInParent");
    
    try {
        // 使用选择器链式调用
        var selector = textContains("设置").findOne();
        if (selector) {
            var parent = selector.parent();
            if (parent) {
                var index = parent.indexInParent();
                console.log("选择器链式调用的indexInParent:", index);
                
                if (index >= 0) {
                    console.log("✓ 选择器链式调用indexInParent修复成功！");
                } else {
                    console.log("✗ 选择器链式调用indexInParent仍然返回-1");
                }
            } else {
                console.log("无法获取父节点");
            }
        } else {
            console.log("未找到匹配的控件");
        }
        
    } catch (e) {
        console.log("测试过程中出现错误:", e.message);
    }
}

// 运行所有测试
testParentIndexInParent();
testDirectIndexInParent();
testSelectorChainIndexInParent();

console.log("\n=== 测试完成 ===");
console.log("如果看到'修复成功'的消息，说明indexInParent问题已解决！");
