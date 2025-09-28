// 测试灰度处理修复效果
console.log("开始测试灰度处理修复效果...");

// 测试1：验证grayscale函数是否正确转换颜色空间
function testGrayscaleConversion() {
    console.log("测试1：验证grayscale函数颜色空间转换");
    
    // 创建一个彩色测试图像
    var testImg = images.read("/sdcard/test_color.png");
    if (!testImg) {
        console.log("请先准备测试图像 /sdcard/test_color.png");
        return;
    }
    
    // 测试灰度转换
    var grayImg = images.grayscale(testImg);
    console.log("原图像通道数:", testImg.mat.channels());
    console.log("灰度图像通道数:", grayImg.mat.channels());
    
    // 保存结果用于对比
    images.save(grayImg, "/sdcard/test_grayscale_result.png");
    console.log("灰度图像已保存到 /sdcard/test_grayscale_result.png");
    
    testImg.recycle();
    grayImg.recycle();
}

// 测试2：验证findImage函数灰度处理是否生效
function testFindImageGrayscale() {
    console.log("测试2：验证findImage函数灰度处理");
    
    var img = images.read("/sdcard/test_image.png");
    var template = images.read("/sdcard/test_template.png");
    
    if (!img || !template) {
        console.log("请先准备测试图像和模板");
        return;
    }
    
    // 方法1：手动灰度处理
    var grayImg = images.grayscale(img);
    var grayTemplate = images.grayscale(template);
    var result1 = images.findImage(grayImg, grayTemplate);
    
    // 方法2：直接使用findImage（现在应该内部使用灰度处理）
    var result2 = images.findImage(img, template);
    
    console.log("手动灰度查找结果:", result1);
    console.log("直接查找结果:", result2);
    
    // 验证结果是否相同（应该相同，因为现在都使用灰度处理）
    if (result1 && result2) {
        var distance = Math.sqrt(Math.pow(result1.x - result2.x, 2) + Math.pow(result1.y - result2.y, 2));
        console.log("结果差异距离:", distance);
        if (distance < 5) {
            console.log("✓ 灰度处理修复成功！");
        } else {
            console.log("✗ 灰度处理可能仍有问题");
        }
    } else if (!result1 && !result2) {
        console.log("✓ 两种方法都未找到匹配，灰度处理正常");
    } else {
        console.log("✗ 灰度处理结果不一致");
    }
    
    img.recycle();
    template.recycle();
    grayImg.recycle();
    grayTemplate.recycle();
}

// 测试3：验证matchTemplate函数灰度处理
function testMatchTemplateGrayscale() {
    console.log("测试3：验证matchTemplate函数灰度处理");
    
    var img = images.read("/sdcard/test_image.png");
    var template = images.read("/sdcard/test_template.png");
    
    if (!img || !template) {
        console.log("请先准备测试图像和模板");
        return;
    }
    
    // 测试matchTemplate
    var result = images.matchTemplate(img, template, {
        threshold: 0.8
    });
    
    console.log("matchTemplate结果数量:", result.matches.length);
    if (result.matches.length > 0) {
        console.log("第一个匹配点:", result.matches[0]);
        console.log("相似度:", result.matches[0].similarity);
    }
    
    img.recycle();
    template.recycle();
}

// 运行所有测试
console.log("=== 灰度处理修复测试 ===");
testGrayscaleConversion();
testFindImageGrayscale();
testMatchTemplateGrayscale();
console.log("=== 测试完成 ===");
