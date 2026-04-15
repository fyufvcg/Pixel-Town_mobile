/**
 * 第二关页面交互逻辑
 */

// 页面加载完成后初始化
window.addEventListener('DOMContentLoaded', function () {
    // 初始化第二关相关功能
    initLevel2Functions();
});

/**
 * 初始化第二关相关功能
 */
function initLevel2Functions() {
    // 初始化学习中心标签页
    initLevel2LearningTabs();

    // 初始化实战演练标签页
    initLevel2PracticeTabs();

    // 初始化答案提交功能
    initLevel2SubmitFunctions();
}

/**
 * 初始化第二关学习中心标签页
 */
function initLevel2LearningTabs() {
    // 默认显示第一个标签页
    const firstTab = document.querySelector('#level2LearningCenterPage .nav-item:first-child');
    if (firstTab) {
        firstTab.click();
    }
}

/**
 * 初始化第二关实战演练标签页
 */
function initLevel2PracticeTabs() {
    // 默认显示第一个标签页
    const firstTab = document.querySelector('#level2PracticePage .practice-nav-item:first-child');
    if (firstTab) {
        firstTab.click();
    }
}

/**
 * 初始化第二关答案提交功能
 */
function initLevel2SubmitFunctions() {
    // 为实战演练提交按钮添加事件监听
    const practiceSubmitBtn = document.getElementById('level2-practice-submit');
    if (practiceSubmitBtn) {
        practiceSubmitBtn.addEventListener('click', submitLevel2Practice);
    }

    // 为当堂检测提交按钮添加事件监听
    const testSubmitBtn = document.getElementById('level2-test-submit');
    if (testSubmitBtn) {
        testSubmitBtn.addEventListener('click', submitLevel2Test);
    }
}

/**
 * 显示第二关页面
 */
function showLevel2Page() {
    document.getElementById('mainPage').style.display = 'none';
    document.getElementById('level2Page').style.display = 'block';
}

/**
 * 关闭第二关页面
 */
function closeLevel2Page() {
    document.getElementById('level2Page').style.display = 'none';
    document.getElementById('mainPage').style.display = 'block';
}

/**
 * 显示第二关学习中心页面
 */
function showLevel2LearningCenter() {
    document.getElementById('level2Page').style.display = 'none';
    document.getElementById('level2LearningCenterPage').style.display = 'block';

    // 确保导航栏定位在“先导”上
    const navItems = document.querySelectorAll('#level2LearningCenterPage .nav-item');
    navItems.forEach(item => item.classList.remove('active'));

    const guideNavItem = document.querySelector('#level2LearningCenterPage .nav-item[onclick*="guide"]');
    if (guideNavItem) {
        guideNavItem.classList.add('active');
    }

    const tabContents = document.querySelectorAll('#level2LearningCenterPage .tab-content');
    tabContents.forEach(content => content.style.display = 'none');

    const guideContent = document.getElementById('level2-guide-content');
    if (guideContent) {
        guideContent.style.display = 'block';
    }
}

/**
 * 关闭第二关学习中心页面
 */
function closeLevel2LearningCenter() {
    document.getElementById('level2LearningCenterPage').style.display = 'none';
    document.getElementById('level2Page').style.display = 'block';
}

/**
 * 切换第二关学习中心标签页
 * @param {Element} tab - 点击的标签元素
 * @param {string} tabId - 标签ID
 */
function switchLevel2LearningTab(tab, tabId) {
    // 移除所有标签的active类
    const navItems = document.querySelectorAll('#level2LearningCenterPage .nav-item');
    navItems.forEach(item => item.classList.remove('active'));

    // 添加当前标签的active类
    tab.classList.add('active');

    // 隐藏所有内容
    const tabContents = document.querySelectorAll('#level2LearningCenterPage .tab-content');
    tabContents.forEach(content => content.style.display = 'none');

    // 显示当前标签内容
    document.getElementById('level2-' + tabId + '-content').style.display = 'block';
}

/**
 * 打开第二关实战演练页面
 */
function openLevel2PracticePage() {
    document.getElementById('level2Page').style.display = 'none';
    document.getElementById('level2PracticePage').style.display = 'block';

    // 确保导航栏定位在“选择”上
    const navItems = document.querySelectorAll('#level2PracticePage .practice-nav-item');
    navItems.forEach(item => item.classList.remove('active'));

    const choiceNavItem = document.querySelector('#level2PracticePage .practice-nav-item[onclick*="choice"]');
    if (choiceNavItem) {
        choiceNavItem.classList.add('active');
    }

    const tabContents = document.querySelectorAll('#level2PracticePage .practice-tab-content');
    tabContents.forEach(content => content.style.display = 'none');

    const choiceContent = document.getElementById('level2-choice-content');
    if (choiceContent) {
        choiceContent.style.display = 'block';
    }
}

/**
 * 关闭第二关实战演练页面
 */
function closeLevel2PracticePage() {
    document.getElementById('level2PracticePage').style.display = 'none';
    document.getElementById('level2Page').style.display = 'block';
}

/**
 * 切换第二关实战演练标签页
 * @param {Element} tab - 点击的标签元素
 * @param {string} tabId - 标签ID
 */
function switchLevel2PracticeTab(tab, tabId) {
    // 移除所有标签的active类
    const navItems = document.querySelectorAll('#level2PracticePage .practice-nav-item');
    navItems.forEach(item => item.classList.remove('active'));

    // 添加当前标签的active类
    tab.classList.add('active');

    // 隐藏所有内容
    const tabContents = document.querySelectorAll('#level2PracticePage .practice-tab-content');
    tabContents.forEach(content => content.style.display = 'none');

    // 显示当前标签内容
    document.getElementById('level2-' + tabId + '-content').style.display = 'block';
}

/**
 * 处理第二关应用题图片上传
 * @param {Event} input - 文件输入元素
 */
function handleLevel2ImageUpload1(input) {
    const file = input.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const imageUrl = e.target.result;
            const uploadedImages = document.getElementById('level2-uploaded-images-1');
            if (uploadedImages) {
                uploadedImages.innerHTML = `<img src="${imageUrl}" alt="上传的图片" style="max-width: 100%; height: auto; margin: 10px 0; border-radius: 8px;">`;
            }
        };
        reader.readAsDataURL(file);
    }
}

function handleLevel2ImageUpload2(input) {
    const file = input.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const imageUrl = e.target.result;
            const uploadedImages = document.getElementById('level2-uploaded-images-2');
            if (uploadedImages) {
                uploadedImages.innerHTML = `<img src="${imageUrl}" alt="上传的图片" style="max-width: 100%; height: auto; margin: 10px 0; border-radius: 8px;">`;
            }
        };
        reader.readAsDataURL(file);
    }
}

/**
 * 提交第二关实战演练答案
 */
function submitLevel2Practice() {
    let correctCount = 0;
    let totalQuestions = 0;
    let choiceFillScore = 0;
    let resultHTML = '<div class="test-result"><h3>答题结果</h3>';

    const PRACTICE_CHOICE_COUNT = 3;
    const PRACTICE_FILL_COUNT = 3;
    const PRACTICE_APP_COUNT = 2;
    const CHOICE_FILL_SCORE = 10;
    const APP_QUESTION_SCORE = 15;

    // 正确答案
    const practiceAnswers = [
        { question: '问题1', correct: 'a' },
        { question: '问题2', correct: 'a' },
        { question: '问题3', correct: 'b' },
        { question: '填空题1', correct: 'f=μF_N' },
        { question: '填空题2', correct: '10' },
        { question: '填空题3', correct: '负' }
    ];

    // 检查选择题
    for (let i = 1; i <= PRACTICE_CHOICE_COUNT; i++) {
        const radio = document.querySelector(`input[name="level2-test-q${i}"]:checked`);
        const userAnswer = radio ? radio.value : '';
        const correctAnswer = practiceAnswers[i - 1].correct;
        const isCorrect = userAnswer === correctAnswer;

        totalQuestions++;
        if (isCorrect) {
            correctCount++;
            choiceFillScore += CHOICE_FILL_SCORE;
        } else {
            trackQuestionResult('level2', 'choice', i, false);
        }

        resultHTML += `
            <div class="test-result-item ${isCorrect ? 'correct' : 'incorrect'}">
                <p><strong>选择题${i}：</strong> ${isCorrect ? '✅ 正确' : '❌ 错误'}</p>
                <p>你的答案：${userAnswer || '未作答'}</p>
                <p>正确答案：${correctAnswer}</p>
            </div>
        `;
    }

    // 检查填空题
    for (let i = 1; i <= PRACTICE_FILL_COUNT; i++) {
        const input = document.getElementById(`level2-fill-q${i}`);
        const userAnswer = input ? input.value.trim() : '';
        const correctAnswer = practiceAnswers[PRACTICE_CHOICE_COUNT + i - 1].correct;
        const isCorrect = userAnswer.toLowerCase().includes(correctAnswer.toLowerCase());

        totalQuestions++;
        if (isCorrect) {
            correctCount++;
            choiceFillScore += CHOICE_FILL_SCORE;
        } else {
            trackQuestionResult('level2', 'fill', i, false);
        }

        resultHTML += `
            <div class="test-result-item ${isCorrect ? 'correct' : 'incorrect'}">
                <p><strong>填空题${i}：</strong> ${isCorrect ? '✅ 正确' : '❌ 错误'}</p>
                <p>你的答案：${userAnswer || '未作答'}</p>
                <p>正确答案：${correctAnswer}</p>
            </div>
        `;
    }

    // 检查应用题
    for (let i = 1; i <= PRACTICE_APP_COUNT; i++) {
        const uploadedImages = document.getElementById(`level2-uploaded-images-${i}`);
        const hasImage = uploadedImages && uploadedImages.innerHTML.trim() !== '';

        if (hasImage) {
            resultHTML += `
                <div class="test-result-item pending">
                    <p><strong>应用题${i}：</strong> 📋 已上传图片（待批改）</p>
                    <p>状态：已提交</p>
                </div>
            `;
        } else {
            resultHTML += `
                <div class="test-result-item pending">
                    <p><strong>应用题${i}：</strong> 📋 未上传图片</p>
                    <p>状态：未提交</p>
                </div>
            `;
        }
    }

    let totalScore = choiceFillScore;
    resultHTML += `
        <div class="test-score"><h4>总分：${totalScore}分</h4></div>
        
        <div class="test-result-buttons">
            <button class="test-result-button" onclick="showLevel2PracticeAnswerExplanation()">答案解析</button>
            <button class="test-result-button" onclick="redoLevel2Practice()">返回重做</button>
        </div>
    </div>`;

    // 显示结果
    const practiceContent = document.querySelector('#level2PracticePage .practice-content');
    if (practiceContent) {
        practiceContent.innerHTML = resultHTML;
    }
}



/**
 * 显示第二关答案解析
 */
function showLevel2PracticeAnswerExplanation() {
    // 第二关实战演练的答案解析
    const explanations = [
        {
            question: '【静摩擦力方向判断】物体A、B叠放在水平地面上，A受水平向右的拉力F作用，A、B均保持静止。则A对B的摩擦力方向为（　　）',
            explanation: '对A进行受力分析，A受水平向右的拉力F和B对A水平向左的静摩擦力，根据牛顿第三定律，A对B的摩擦力方向与B对A的摩擦力方向相反，即水平向右。\n结论：选项A正确。'
        },
        {
            question: '【摩擦力大小比较】三个相同的木块A、B、C叠放在水平地面上，用水平力F拉B，使三者一起匀速运动。设A与B、B与C、C与地面间的摩擦力大小分别为f₁、f₂、f₃，则（　　）',
            explanation: '对A进行受力分析，A随B一起匀速运动，水平方向不受力，所以f₁=0；对B进行受力分析，B受水平向右的拉力F和C对B水平向左的摩擦力，所以f₂=F；对C进行受力分析，C受B对C水平向右的摩擦力（与f₂大小相等，方向相反）和地面对C水平向左的摩擦力，所以f₃=F。\n结论：选项A正确。'
        },
        {
            question: '【摩擦力突变问题】一木块放在水平桌面上，用水平力F拉木块，当F从零开始逐渐增大时，木块所受的摩擦力（　　）',
            explanation: '当F从零开始逐渐增大时，木块先静止，此时受到的是静摩擦力，大小随F的增大而增大；当F增大到超过最大静摩擦力时，木块开始滑动，此时受到的是滑动摩擦力，大小保持不变。\n结论：选项B正确。'
        },
        {
            question: '【滑动摩擦力公式】滑动摩擦力的大小公式为 ______，其中μ称为 ______，其大小与接触面的材料和粗糙程度有关。',
            explanation: '滑动摩擦力的大小公式为f=μF_N，其中μ称为动摩擦因数，其大小与接触面的材料和粗糙程度有关，与接触面积无关。'
        },
        {
            question: '【静摩擦力计算】质量为2 kg的物体静止在倾角为30°的斜面上，物体与斜面间的静摩擦因数为0.6。则物体所受静摩擦力的大小为 ______ N，方向 ______。（g取10 m/s²）',
            explanation: '物体静止在斜面上，受力平衡。重力沿斜面向下的分力为mgsinθ=2×10×sin30°=10N，所以静摩擦力大小为10N，方向沿斜面向上。'
        },
        {
            question: '【摩擦力做功】一个物体在水平地面上滑动，滑动摩擦力对物体做 ______ 功，对地面做 ______ 功。（填"正"、"负"或"零"）',
            explanation: '滑动摩擦力方向与物体运动方向相反，所以对物体做负功；地面在摩擦力方向上没有位移，所以对地面做功为零。'
        }
    ];

    // 创建解析HTML
    let explanationHTML = `
        <div class="test-result">
            <div class="test-result-header">
                <button class="test-result-back-button" onclick="showLevel2PracticeResultFromExplanation()">返回</button>
                <h3>答案解析</h3>
            </div>
    `;
    explanations.forEach((item, index) => {
        explanationHTML += `
            <div class="test-result-item">
                <p><strong>问题${index + 1}：</strong>${item.question}</p>
                <p><strong>解析：</strong>${item.explanation.replace(/\n/g, '<br>')}</p>
            </div>
        `;
    });
    explanationHTML += `
            <div class="test-result-buttons" style="justify-content: center;">
                <button class="test-result-button" onclick="redoLevel2Practice()">返回重做</button>
            </div>
        </div>
    `;

    // 显示解析
    const practiceContent = document.querySelector('#level2PracticePage .practice-content');
    if (practiceContent) {
        practiceContent.innerHTML = explanationHTML;
    }
}

/**
 * 从实战演练答案解析返回答题结果
 */
function showLevel2PracticeResultFromExplanation() {
    let correctCount = 0;
    let totalQuestions = 0;
    let choiceFillScore = 0;
    let resultHTML = `
        <div class="test-result">
            <div class="test-result-header">
                <h3>答题结果</h3>
            </div>
    `;

    const PRACTICE_CHOICE_COUNT = 3;
    const PRACTICE_FILL_COUNT = 3;
    const PRACTICE_APP_COUNT = 2;
    const CHOICE_FILL_SCORE = 10;
    const APP_QUESTION_SCORE = 15;

    // 正确答案
    const practiceAnswers = [
        { question: '问题1', correct: 'a' },
        { question: '问题2', correct: 'a' },
        { question: '问题3', correct: 'b' },
        { question: '填空题1', correct: 'f=μF_N' },
        { question: '填空题2', correct: '10' },
        { question: '填空题3', correct: '负' }
    ];

    // 检查选择题
    for (let i = 1; i <= PRACTICE_CHOICE_COUNT; i++) {
        const radio = document.querySelector(`input[name="level2-test-q${i}"]:checked`);
        const userAnswer = radio ? radio.value : '';
        const correctAnswer = practiceAnswers[i - 1].correct;
        const isCorrect = userAnswer === correctAnswer;

        totalQuestions++;
        if (isCorrect) {
            correctCount++;
            choiceFillScore += CHOICE_FILL_SCORE;
        }

        resultHTML += `
            <div class="test-result-item ${isCorrect ? 'correct' : 'incorrect'}">
                <p><strong>选择题${i}：</strong> ${isCorrect ? '✅ 正确' : '❌ 错误'}</p>
                <p>你的答案：${userAnswer || '未作答'}</p>
                <p>正确答案：${correctAnswer}</p>
            </div>
        `;
    }

    // 检查填空题
    for (let i = 1; i <= PRACTICE_FILL_COUNT; i++) {
        const input = document.getElementById(`level2-fill-q${i}`);
        const userAnswer = input ? input.value.trim() : '';
        const correctAnswer = practiceAnswers[PRACTICE_CHOICE_COUNT + i - 1].correct;
        const isCorrect = userAnswer.toLowerCase().includes(correctAnswer.toLowerCase());

        totalQuestions++;
        if (isCorrect) {
            correctCount++;
            choiceFillScore += CHOICE_FILL_SCORE;
        }

        resultHTML += `
            <div class="test-result-item ${isCorrect ? 'correct' : 'incorrect'}">
                <p><strong>填空题${i}：</strong> ${isCorrect ? '✅ 正确' : '❌ 错误'}</p>
                <p>你的答案：${userAnswer || '未作答'}</p>
                <p>正确答案：${correctAnswer}</p>
            </div>
        `;
    }

    // 检查应用题
    for (let i = 1; i <= PRACTICE_APP_COUNT; i++) {
        const uploadedImages = document.getElementById(`level2-uploaded-images-${i}`);
        const hasImage = uploadedImages && uploadedImages.innerHTML.trim() !== '';

        if (hasImage) {
            resultHTML += `
                <div class="test-result-item pending">
                    <p><strong>应用题${i}：</strong> 📋 已上传图片（待批改）</p>
                    <p>状态：已提交</p>
                </div>
            `;
        } else {
            resultHTML += `
                <div class="test-result-item pending">
                    <p><strong>应用题${i}：</strong> 📋 未上传图片</p>
                    <p>状态：未提交</p>
                </div>
            `;
        }
    }

    let totalScore = choiceFillScore;
    resultHTML += `
        <div class="test-score"><h4>总分：${totalScore}分</h4></div>
        
        <div class="test-result-buttons">
            <button class="test-result-button" onclick="showLevel2PracticeAnswerExplanation()">答案解析</button>
            <button class="test-result-button" onclick="redoLevel2Practice()">返回重做</button>
        </div>
    </div>`;

    // 显示结果
    const practiceContent = document.querySelector('#level2PracticePage .practice-content');
    if (practiceContent) {
        practiceContent.innerHTML = resultHTML;
    }
}

/**
 * 重新做第二关实战演练
 */
function redoLevel2Practice() {
    // 重置存储的答案
    currentLevel2Answers = null;
    currentLevel2ChoiceFillScore = 0;

    // 确保导航栏定位在"选择"上
    const navItems = document.querySelectorAll('#level2PracticePage .practice-nav-item');
    navItems.forEach(item => item.classList.remove('active'));

    const choiceNavItem = document.querySelector('#level2PracticePage .practice-nav-item[onclick*="choice"]');
    if (choiceNavItem) {
        choiceNavItem.classList.add('active');
    }

    const tabContents = document.querySelectorAll('#level2PracticePage .practice-tab-content');
    tabContents.forEach(content => content.style.display = 'none');

    const choiceContent = document.getElementById('level2-choice-content');
    if (choiceContent) {
        choiceContent.style.display = 'block';
    }

    // 重置所有问题
    resetLevel2PracticeForm();

    // 确保实战演练页面显示
    document.getElementById('level2PracticePage').style.display = 'block';
}

/**
 * 提交第二关当堂检测答案
 */
function submitLevel2Test() {
    // 获取答案
    const q1Answer = document.querySelector('input[name="level2-q1"]:checked');
    const q2Answer = document.querySelector('input[name="level2-q2"]:checked');
    const q3Answer = document.getElementById('level2-q3-answer').value;
    const q4Answer1 = document.getElementById('level2-q4-answer1').value;
    const q4Answer2 = document.getElementById('level2-q4-answer2').value;
    const q5Answer = document.querySelector('input[name="level2-q5"]:checked');

    // 检查是否完成所有题目
    if (!q1Answer || !q2Answer || !q3Answer || !q4Answer1 || !q4Answer2 || !q5Answer) {
        alert('请完成所有题目后再提交！');
        return;
    }

    // 计算得分（简化版）
    let score = 0;
    if (q1Answer.value === 'a') score += 6;
    if (q2Answer.value === 'b' || q2Answer.value === 'c') score += 6;
    if (q3Answer === '30') score += 6;
    if (q4Answer1 === '大于' && q4Answer2 === '大于') score += 6;
    if (q5Answer.value === 'a' || q5Answer.value === 'd') score += 6;

    // 显示结果
    showLevel2TestResult(score);
}

/**
 * 显示第二关当堂检测结果
 * @param {number} score - 得分
 */
function showLevel2TestResult(score) {
    // 创建结果弹窗
    const resultModal = document.createElement('div');
    resultModal.className = 'practice-result-modal';
    resultModal.innerHTML = `
        <div class="practice-result-content">
            <h3>测试结果</h3>
            <p>你的得分：${score}/30</p>
            <div class="result-buttons">
                <button class="result-btn" onclick="closeLevel2LearningCenter()">返回关卡</button>
            </div>
        </div>
    `;
    document.body.appendChild(resultModal);
}

/**
 * 重置第二关实战演练表单
 */
function resetLevel2PracticeForm() {
    // 重置选择题
    const radioButtons = document.querySelectorAll('#level2PracticePage input[type="radio"]');
    radioButtons.forEach(radio => {
        radio.checked = false;
    });

    // 重置填空题
    const inputFields = document.querySelectorAll('#level2PracticePage input[type="text"]');
    inputFields.forEach(input => {
        input.value = '';
    });

    // 重置图片上传
    const uploadedImages1 = document.getElementById('level2-uploaded-images-1');
    const uploadedImages2 = document.getElementById('level2-uploaded-images-2');
    if (uploadedImages1) uploadedImages1.innerHTML = '';
    if (uploadedImages2) uploadedImages2.innerHTML = '';
}

/**
 * 重置第二关当堂检测表单
 */
function resetLevel2TestForm() {
    // 重置选择题
    const radioButtons = document.querySelectorAll('#level2LearningCenterPage input[type="radio"]');
    radioButtons.forEach(radio => {
        radio.checked = false;
    });

    // 重置填空题
    const inputFields = document.querySelectorAll('#level2LearningCenterPage input[type="number"]');
    inputFields.forEach(input => {
        input.value = '';
    });

    // 重置下拉选择
    const selectFields = document.querySelectorAll('#level2LearningCenterPage select');
    selectFields.forEach(select => {
        select.value = '';
    });
}

/**
 * 打开摩擦力与压力关系视频
 */
function openFrictionPressureVideo() {
    // 关闭背景音乐
    const backgroundMusic = document.getElementById('bgMusic');
    if (backgroundMusic) {
        backgroundMusic.pause();
    }

    // 设置视频源
    const videoSource = document.getElementById('videoSource');
    if (videoSource) {
        videoSource.src = 'vedios/摩擦力于压力的关系.mp4';
    }

    // 加载并播放视频
    const video = document.getElementById('experimentVideo');
    if (video) {
        video.load();
        video.play();
    }

    // 显示视频播放页面
    const videoPlayerPage = document.getElementById('videoPlayerPage');
    if (videoPlayerPage) {
        videoPlayerPage.style.display = 'flex';
        videoPlayerPage.style.alignItems = 'center';
        videoPlayerPage.style.justifyContent = 'center';
        videoPlayerPage.style.background = 'linear-gradient(145deg, rgba(0, 0, 0, 0.9), rgba(139, 69, 19, 0.8))';
        videoPlayerPage.style.height = '100vh';
        videoPlayerPage.style.padding = '20px';
        videoPlayerPage.style.position = 'fixed';
        videoPlayerPage.style.top = '0';
        videoPlayerPage.style.left = '0';
        videoPlayerPage.style.width = '100%';
        videoPlayerPage.style.zIndex = '1000';
    }
}

/**
 * 打开静摩擦力随拉力变化视频
 */
function openStaticFrictionVideo() {
    // 关闭背景音乐
    const backgroundMusic = document.getElementById('bgMusic');
    if (backgroundMusic) {
        backgroundMusic.pause();
    }

    // 设置视频源
    const videoSource = document.getElementById('videoSource');
    if (videoSource) {
        videoSource.src = 'vedios/静摩擦力随拉力的变化.mp4';
    }

    // 加载并播放视频
    const video = document.getElementById('experimentVideo');
    if (video) {
        video.load();
        video.play();
    }

    // 显示视频播放页面
    const videoPlayerPage = document.getElementById('videoPlayerPage');
    if (videoPlayerPage) {
        videoPlayerPage.style.display = 'flex';
        videoPlayerPage.style.alignItems = 'center';
        videoPlayerPage.style.justifyContent = 'center';
        videoPlayerPage.style.background = 'linear-gradient(145deg, rgba(0, 0, 0, 0.9), rgba(139, 69, 19, 0.8))';
        videoPlayerPage.style.height = '100vh';
        videoPlayerPage.style.padding = '20px';
        videoPlayerPage.style.position = 'fixed';
        videoPlayerPage.style.top = '0';
        videoPlayerPage.style.left = '0';
        videoPlayerPage.style.width = '100%';
        videoPlayerPage.style.zIndex = '1000';
    }
}

/**
 * 关闭视频播放器
 */
function closeVideoPlayer() {
    // 暂停视频
    const video = document.getElementById('experimentVideo');
    if (video) {
        video.pause();
    }

    // 显示学习中心页面
    document.getElementById('videoPlayerPage').style.display = 'none';

    // 继续播放背景音乐
    const backgroundMusic = document.getElementById('bgMusic');
    if (backgroundMusic) {
        backgroundMusic.play();
    }
}

/**
 * 提交第二关当堂检测答案
 */
function submitLevel2Test() {
    // 第二关的答案
    const answers = [
        { question: '关于滑动摩擦力，下列说法正确的是（　　）', answer: 'a' },
        { question: '关于静摩擦力，下列说法正确的是（　　）', answer: 'b' },
        { question: '质量为10 kg的木箱放在水平地面上，木箱与地面间的动摩擦因数为0.3。用水平力F拉木箱，使其匀速运动，则拉力F的大小为 ______ N。（g取10 m/s²）', answer: '30' },
        { question: '最大静摩擦力 ______，通常最大静摩擦力 ______ 滑动摩擦力。（填"大于"、"等于"或"小于"）', answer1: '大于', answer2: '大于' },
        { question: '关于摩擦力，下列说法正确的是（　　）', answer: 'a' }
    ];

    let correctCount = 0;
    let totalQuestions = answers.length;
    let resultHTML = '<div class="test-result"><h3>答题结果</h3>';

    // 问题1
    const q1Answer = document.querySelector('input[name="level2-q1"]:checked');
    const userAnswer1 = q1Answer ? q1Answer.value : '';
    const isCorrect1 = userAnswer1 === answers[0].answer;
    if (isCorrect1) correctCount++;
    resultHTML += `
        <div class="test-result-item ${isCorrect1 ? 'correct' : 'incorrect'}">
            <p><strong>问题1：</strong>${isCorrect1 ? '✅ 正确' : '❌ 错误'}</p>
            <p><strong>你的答案：</strong>${userAnswer1 || '未作答'}</p>
            <p><strong>正确答案：</strong>${answers[0].answer}</p>
        </div>
    `;

    // 问题2
    const q2Answer = document.querySelector('input[name="level2-q2"]:checked');
    const userAnswer2 = q2Answer ? q2Answer.value : '';
    const isCorrect2 = userAnswer2 === answers[1].answer;
    if (isCorrect2) correctCount++;
    resultHTML += `
        <div class="test-result-item ${isCorrect2 ? 'correct' : 'incorrect'}">
            <p><strong>问题2：</strong>${isCorrect2 ? '✅ 正确' : '❌ 错误'}</p>
            <p><strong>你的答案：</strong>${userAnswer2 || '未作答'}</p>
            <p><strong>正确答案：</strong>${answers[1].answer}</p>
        </div>
    `;

    // 问题3
    const q3Answer = document.getElementById('level2-q3-answer').value;
    const userAnswer3 = q3Answer.trim();
    const isCorrect3 = userAnswer3 === answers[2].answer;
    if (isCorrect3) correctCount++;
    resultHTML += `
        <div class="test-result-item ${isCorrect3 ? 'correct' : 'incorrect'}">
            <p><strong>问题3：</strong>${isCorrect3 ? '✅ 正确' : '❌ 错误'}</p>
            <p><strong>你的答案：</strong>${userAnswer3 || '未作答'}</p>
            <p><strong>正确答案：</strong>${answers[2].answer}</p>
        </div>
    `;

    // 问题4
    const q4Answer1 = document.getElementById('level2-q4-answer1').value;
    const q4Answer2 = document.getElementById('level2-q4-answer2').value;
    const isCorrect4 = q4Answer1 === answers[3].answer1 && q4Answer2 === answers[3].answer2;
    if (isCorrect4) correctCount++;
    resultHTML += `
        <div class="test-result-item ${isCorrect4 ? 'correct' : 'incorrect'}">
            <p><strong>问题4：</strong>${isCorrect4 ? '✅ 正确' : '❌ 错误'}</p>
            <p><strong>你的答案：</strong>${q4Answer1 || '未作答'}，${q4Answer2 || '未作答'}</p>
            <p><strong>正确答案：</strong>${answers[3].answer1}，${answers[3].answer2}</p>
        </div>
    `;

    // 问题5
    const q5Answer = document.querySelector('input[name="level2-q5"]:checked');
    const userAnswer5 = q5Answer ? q5Answer.value : '';
    const isCorrect5 = userAnswer5 === answers[4].answer;
    if (isCorrect5) correctCount++;
    resultHTML += `
        <div class="test-result-item ${isCorrect5 ? 'correct' : 'incorrect'}">
            <p><strong>问题5：</strong>${isCorrect5 ? '✅ 正确' : '❌ 错误'}</p>
            <p><strong>你的答案：</strong>${userAnswer5 || '未作答'}</p>
            <p><strong>正确答案：</strong>${answers[4].answer}</p>
        </div>
    `;

    // 计算得分
    const score = Math.round((correctCount / totalQuestions) * 100);
    resultHTML += `
        <div class="test-score">
            <h4>得分：${score}分</h4>
            <p>共${totalQuestions}题，正确${correctCount}题，错误${totalQuestions - correctCount}题</p>
        </div>

        <div class="test-result-buttons">
            <button class="test-result-button" onclick="showLevel2AnswerExplanations()">答案解析</button>
            <button class="test-result-button" onclick="redoLevel2Test()">返回重做</button>
        </div>
    `;

    resultHTML += '</div>';

    // 显示结果
    const testContent = document.getElementById('level2-test-content');
    if (testContent) {
        testContent.innerHTML = resultHTML;
    }
}

/**
 * 显示第二关答案解析
 */
function showLevel2AnswerExplanations() {
    // 第二关的答案解析
    const explanations = [
        {
            question: '关于滑动摩擦力，下列说法正确的是（　　）',
            explanation: '滑动摩擦力公式 F=μF_N，与正压力成正比，与接触面积无关；方向与相对运动方向相反，不一定与运动方向相反；可以是动力（如传送带上的物体）。'
        },
        {
            question: '关于静摩擦力，下列说法正确的是（　　）',
            explanation: '静摩擦力大小由平衡条件决定，与正压力无关；方向与相对运动趋势方向相反；大小在0到最大静摩擦力之间变化；可以是动力（如人走路时静摩擦力向前）。'
        },
        {
            question: '质量为10 kg的木箱放在水平地面上，木箱与地面间的动摩擦因数为0.3。用水平力F拉木箱，使其匀速运动，则拉力F的大小为 ______ N。（g取10 m/s²）',
            explanation: '正压力 F_N = mg = 10 × 10 = 100 N；滑动摩擦力 F_f = μF_N = 0.3 × 100 = 30 N；匀速运动时，拉力 F = F_f = 30 N。'
        },
        {
            question: '最大静摩擦力 ______，通常最大静摩擦力 ______ 滑动摩擦力。（填"大于"、"等于"或"小于"）',
            explanation: '最大静摩擦力公式 F_max = μ_s F_N，其中μ_s为静摩擦因数；通常 μ_s > μ，故最大静摩擦力大于滑动摩擦力。'
        },
        {
            question: '关于摩擦力，下列说法正确的是（　　）',
            explanation: '摩擦力是相互作用力，成对出现；摩擦力可以做正功（如传送带）；摩擦力方向与相对运动（趋势）方向在同一直线上，不一定与运动方向在同一直线上；弹力是摩擦力产生的必要条件。'
        }
    ];

    let explanationHTML = '<div class="test-result">';
    explanationHTML += '<div class="test-result-header">';
    explanationHTML += '<button class="test-result-back-button" onclick="showLevel2TestResultFromAnswerExplanation()">返回</button>';
    explanationHTML += '<h3>答案解析</h3>';
    explanationHTML += '</div>';

    explanations.forEach((item, index) => {
        explanationHTML += `
            <div class="test-result-item">
                <p><strong>问题${index + 1}：</strong>${item.question}</p>
                <p><strong>解析：</strong>${item.explanation}</p>
            </div>
        `;
    });

    explanationHTML += `
        <div class="test-result-buttons">
            <button class="test-result-button" onclick="redoLevel2Test()">返回重做</button>
        </div>
    `;

    explanationHTML += '</div>';

    // 显示解析
    const testContent = document.getElementById('level2-test-content');
    if (testContent) {
        testContent.innerHTML = explanationHTML;
    }
}

/**
 * 从答案解析返回答题结果
 */
function showLevel2TestResultFromAnswerExplanation() {
    // 获取答案
    const q1Answer = document.querySelector('input[name="level2-q1"]:checked');
    const q2Answer = document.querySelector('input[name="level2-q2"]:checked');
    const q3Answer = document.getElementById('level2-q3-answer');
    const q4Answer1 = document.getElementById('level2-q4-answer1');
    const q4Answer2 = document.getElementById('level2-q4-answer2');
    const q5Answer = document.querySelector('input[name="level2-q5"]:checked');

    // 定义正确答案
    const answers = [
        { answer: 'a' },
        { answer: 'c' },
        { answer: '30' },
        { answer1: '大于', answer2: '大于' },
        { answer: 'a' }
    ];

    // 计算得分和正确题数
    let correctCount = 0;
    const totalQuestions = 5;

    // 问题1
    const userAnswer1 = q1Answer ? q1Answer.value : '';
    const isCorrect1 = userAnswer1 === answers[0].answer;
    if (isCorrect1) correctCount++;

    // 问题2
    const userAnswer2 = q2Answer ? q2Answer.value : '';
    const isCorrect2 = userAnswer2 === answers[1].answer;
    if (isCorrect2) correctCount++;

    // 问题3
    const userAnswer3 = q3Answer ? q3Answer.value.trim() : '';
    const isCorrect3 = userAnswer3 === answers[2].answer;
    if (isCorrect3) correctCount++;

    // 问题4
    const q4Answer1Value = q4Answer1 ? q4Answer1.value : '';
    const q4Answer2Value = q4Answer2 ? q4Answer2.value : '';
    const isCorrect4 = q4Answer1Value === answers[3].answer1 && q4Answer2Value === answers[3].answer2;
    if (isCorrect4) correctCount++;

    // 问题5
    const userAnswer5 = q5Answer ? q5Answer.value : '';
    const isCorrect5 = userAnswer5 === answers[4].answer;
    if (isCorrect5) correctCount++;

    // 计算得分
    const score = Math.round((correctCount / totalQuestions) * 100);

    // 生成结果HTML
    let resultHTML = '<div class="test-result"><h3>答题结果</h3>';

    // 问题1
    resultHTML += `
        <div class="test-result-item ${isCorrect1 ? 'correct' : 'incorrect'}">
            <p><strong>问题1：</strong>${isCorrect1 ? '✅ 正确' : '❌ 错误'}</p>
            <p><strong>你的答案：</strong>${userAnswer1 || '未作答'}</p>
            <p><strong>正确答案：</strong>${answers[0].answer}</p>
        </div>
    `;

    // 问题2
    resultHTML += `
        <div class="test-result-item ${isCorrect2 ? 'correct' : 'incorrect'}">
            <p><strong>问题2：</strong>${isCorrect2 ? '✅ 正确' : '❌ 错误'}</p>
            <p><strong>你的答案：</strong>${userAnswer2 || '未作答'}</p>
            <p><strong>正确答案：</strong>${answers[1].answer}</p>
        </div>
    `;

    // 问题3
    resultHTML += `
        <div class="test-result-item ${isCorrect3 ? 'correct' : 'incorrect'}">
            <p><strong>问题3：</strong>${isCorrect3 ? '✅ 正确' : '❌ 错误'}</p>
            <p><strong>你的答案：</strong>${userAnswer3 || '未作答'}</p>
            <p><strong>正确答案：</strong>${answers[2].answer}</p>
        </div>
    `;

    // 问题4
    resultHTML += `
        <div class="test-result-item ${isCorrect4 ? 'correct' : 'incorrect'}">
            <p><strong>问题4：</strong>${isCorrect4 ? '✅ 正确' : '❌ 错误'}</p>
            <p><strong>你的答案：</strong>${q4Answer1Value || '未作答'}，${q4Answer2Value || '未作答'}</p>
            <p><strong>正确答案：</strong>${answers[3].answer1}，${answers[3].answer2}</p>
        </div>
    `;

    // 问题5
    resultHTML += `
        <div class="test-result-item ${isCorrect5 ? 'correct' : 'incorrect'}">
            <p><strong>问题5：</strong>${isCorrect5 ? '✅ 正确' : '❌ 错误'}</p>
            <p><strong>你的答案：</strong>${userAnswer5 || '未作答'}</p>
            <p><strong>正确答案：</strong>${answers[4].answer}</p>
        </div>
    `;

    // 得分和按钮
    resultHTML += `
        <div class="test-score">
            <h4>得分：${score}分</h4>
            <p>共${totalQuestions}题，正确${correctCount}题，错误${totalQuestions - correctCount}题</p>
        </div>

        <div class="test-result-buttons">
            <button class="test-result-button" onclick="showLevel2AnswerExplanations()">答案解析</button>
            <button class="test-result-button" onclick="redoLevel2Test()">返回重做</button>
        </div>
    `;

    resultHTML += '</div>';

    // 显示结果
    const testContent = document.getElementById('level2-test-content');
    if (testContent) {
        testContent.innerHTML = resultHTML;
    }
}

/**
 * 重新做第二关当堂检测
 */
function redoLevel2Test() {
    // 重置所有问题
    resetLevel2TestForm();

    // 重新显示测试内容
    const testContent = document.getElementById('level2-test-content');
    if (testContent) {
        // 这里可以重新加载测试内容，或者确保测试表单已经重置
        testContent.innerHTML = `
            <h3>当堂检测</h3>
            <p>完成以下测试，检验你的学习成果。</p>

            <div class="test-question">
                <p><strong>【概念辨析】</strong>关于滑动摩擦力，下列说法正确的是（　　）</p>
                <div class="test-options">
                    <label><input type="radio" name="level2-q1" value="a"> A. 滑动摩擦力的大小总是与正压力成正比</label>
                    <label><input type="radio" name="level2-q1" value="b"> B. 滑动摩擦力的方向总是与物体运动方向相反</label>
                    <label><input type="radio" name="level2-q1" value="c"> C. 滑动摩擦力总是阻碍物体的运动</label>
                    <label><input type="radio" name="level2-q1" value="d"> D. 滑动摩擦力的大小与接触面积有关</label>
                </div>
            </div>

            <div class="test-question">
                <p><strong>【概念辨析】</strong>关于静摩擦力，下列说法正确的是（　　）</p>
                <div class="test-options">
                    <label><input type="radio" name="level2-q2" value="a"> A. 静摩擦力的大小总是与正压力成正比</label>
                    <label><input type="radio" name="level2-q2" value="b"> B. 静摩擦力的方向总是与物体运动趋势方向相反</label>
                    <label><input type="radio" name="level2-q2" value="c"> C. 静摩擦力的大小可以是零到最大静摩擦力之间的任意值</label>
                    <label><input type="radio" name="level2-q2" value="d"> D. 静摩擦力一定是阻力</label>
                </div>
            </div>

            <div class="test-question">
                <p><strong>【基础计算】</strong>质量为10 kg的木箱放在水平地面上，木箱与地面间的动摩擦因数为0.3。用水平力F拉木箱，使其匀速运动，则拉力F的大小为 ______ N。（g取10 m/s²）</p>
                <div class="test-input">
                    <input type="number" id="level2-q3-answer" placeholder="请输入答案">
                    <span>N</span>
                </div>
            </div>

            <div class="test-question">
                <p><strong>【概念填空】</strong>最大静摩擦力 ______，通常最大静摩擦力 ______ 滑动摩擦力。（填"大于"、"等于"或"小于"）</p>
                <div class="test-input-row">
                    <label>第一个空：</label>
                    <select id="level2-q4-answer1">
                        <option value="">请选择</option>
                        <option value="大于">大于</option>
                        <option value="等于">等于</option>
                        <option value="小于">小于</option>
                    </select>
                </div>
                <div class="test-input-row">
                    <label>第二个空：</label>
                    <select id="level2-q4-answer2">
                        <option value="">请选择</option>
                        <option value="大于">大于</option>
                        <option value="等于">等于</option>
                        <option value="小于">小于</option>
                    </select>
                </div>
            </div>

            <div class="test-question">
                <p><strong>【判断选择】</strong>关于摩擦力，下列说法正确的是（　　）</p>
                <div class="test-options">
                    <label><input type="radio" name="level2-q5" value="a"> A. 摩擦力总是成对出现，一个物体受摩擦力，另一个物体也一定受摩擦力</label>
                    <label><input type="radio" name="level2-q5" value="b"> B. 摩擦力总是做负功</label>
                    <label><input type="radio" name="level2-q5" value="c"> C. 摩擦力的方向一定与物体运动方向在同一直线上</label>
                    <label><input type="radio" name="level2-q5" value="d"> D. 有摩擦力必有弹力，有弹力不一定有摩擦力</label>
                </div>
            </div>
            
            <button class="test-submit" onclick="submitLevel2Test()">提交答案</button>
        `;
    }
}

/**
 * 切换思考答案的显示/隐藏
 * @param {Element} button - 点击的按钮元素
 */
function toggleThinkingAnswer(button) {
    const answerContent = button.nextElementSibling;
    if (answerContent && answerContent.classList.contains('thinking-answer-content')) {
        answerContent.classList.toggle('show');
        button.textContent = answerContent.classList.contains('show') ? '隐藏答案' : '查看答案';
    }
}