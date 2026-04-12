/**
 * 第三关页面交互逻辑
 */

/**
 * 切换思考答案显示/隐藏
 * @param {Element} button - 点击的按钮元素
 */
function toggleLevel3ThinkingAnswer(button) {
    const answerContent = button.nextElementSibling;
    if (answerContent && answerContent.classList.contains('thinking-answer-content')) {
        answerContent.classList.toggle('show');
        button.textContent = answerContent.classList.contains('show') ? '隐藏答案' : '查看答案';
    }
}

// 页面加载完成后初始化
window.addEventListener('DOMContentLoaded', function () {
    // 初始化第三关相关功能
    initLevel3Functions();
});

/**
 * 初始化第三关相关功能
 */
function initLevel3Functions() {
    // 初始化学习中心标签页
    initLevel3LearningTabs();

    // 初始化实战演练标签页
    initLevel3PracticeTabs();

    // 初始化答案提交功能
    initLevel3SubmitFunctions();
}

/**
 * 初始化第三关学习中心标签页
 */
function initLevel3LearningTabs() {
    // 默认显示第一个标签页
    const firstTab = document.querySelector('#level3LearningCenterPage .nav-item:first-child');
    if (firstTab) {
        firstTab.click();
    }
}

/**
 * 初始化第三关实战演练标签页
 */
function initLevel3PracticeTabs() {
    // 默认显示第一个标签页
    const firstTab = document.querySelector('#level3PracticePage .practice-nav-item:first-child');
    if (firstTab) {
        firstTab.click();
    }
}

/**
 * 初始化第三关答案提交功能
 */
function initLevel3SubmitFunctions() {
    // 为实战演练提交按钮添加事件监听
    const practiceSubmitBtn = document.getElementById('level3-practice-submit');
    if (practiceSubmitBtn) {
        practiceSubmitBtn.addEventListener('click', submitLevel3Practice);
    }

    // 为当堂检测提交按钮添加事件监听
    const testSubmitBtn = document.getElementById('level3-test-submit');
    if (testSubmitBtn) {
        testSubmitBtn.addEventListener('click', submitLevel3Test);
    }
}

/**
 * 显示第三关页面
 */
function showLevel3Page() {
    document.getElementById('mainPage').style.display = 'none';
    document.getElementById('level3Page').style.display = 'block';
}

/**
 * 关闭第三关页面
 */
function closeLevel3Page() {
    document.getElementById('level3Page').style.display = 'none';
    document.getElementById('mainPage').style.display = 'block';
}

/**
 * 显示第三关学习中心页面
 */
function showLevel3LearningCenter() {
    document.getElementById('level3Page').style.display = 'none';
    document.getElementById('level3LearningCenterPage').style.display = 'block';
}

/**
 * 关闭第三关学习中心页面
 */
function closeLevel3LearningCenter() {
    document.getElementById('level3LearningCenterPage').style.display = 'none';
    document.getElementById('level3Page').style.display = 'block';
}

/**
 * 切换第三关学习中心标签页
 * @param {Element} tab - 点击的标签元素
 * @param {string} tabId - 标签ID
 */
function switchLevel3LearningTab(tab, tabId) {
    // 移除所有标签的active类
    const navItems = document.querySelectorAll('#level3LearningCenterPage .nav-item');
    navItems.forEach(item => item.classList.remove('active'));

    // 添加当前标签的active类
    tab.classList.add('active');

    // 隐藏所有内容
    const tabContents = document.querySelectorAll('#level3LearningCenterPage .tab-content');
    tabContents.forEach(content => content.style.display = 'none');

    // 显示当前标签内容
    document.getElementById('level3-' + tabId + '-content').style.display = 'block';
}

/**
 * 打开第三关实战演练页面
 */
function openLevel3PracticePage() {
    document.getElementById('level3Page').style.display = 'none';
    document.getElementById('level3PracticePage').style.display = 'block';
}

/**
 * 关闭第三关实战演练页面
 */
function closeLevel3PracticePage() {
    document.getElementById('level3PracticePage').style.display = 'none';
    document.getElementById('level3Page').style.display = 'block';
}

/**
 * 切换第三关实战演练标签页
 * @param {Element} tab - 点击的标签元素
 * @param {string} tabId - 标签ID
 */
function switchLevel3PracticeTab(tab, tabId) {
    // 移除所有标签的active类
    const navItems = document.querySelectorAll('#level3PracticePage .practice-nav-item');
    navItems.forEach(item => item.classList.remove('active'));

    // 添加当前标签的active类
    tab.classList.add('active');

    // 隐藏所有内容
    const tabContents = document.querySelectorAll('#level3PracticePage .practice-tab-content');
    tabContents.forEach(content => content.style.display = 'none');

    // 显示当前标签内容
    document.getElementById('level3-' + tabId + '-content').style.display = 'block';
}

/**
 * 处理第三关应用题图片上传
 * @param {Event} input - 文件输入元素
 */
function handleLevel3ImageUpload1(input) {
    const file = input.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const imageUrl = e.target.result;
            const uploadedImages = document.getElementById('level3-uploaded-images-1');
            if (uploadedImages) {
                uploadedImages.innerHTML = `<img src="${imageUrl}" alt="上传的图片" style="max-width: 100%; height: auto; margin: 10px 0; border-radius: 8px;">`;
            }
        };
        reader.readAsDataURL(file);
    }
}

function handleLevel3ImageUpload2(input) {
    const file = input.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const imageUrl = e.target.result;
            const uploadedImages = document.getElementById('level3-uploaded-images-2');
            if (uploadedImages) {
                uploadedImages.innerHTML = `<img src="${imageUrl}" alt="上传的图片" style="max-width: 100%; height: auto; margin: 10px 0; border-radius: 8px;">`;
            }
        };
        reader.readAsDataURL(file);
    }
}

/**
 * 提交第三关实战演练答案
 */
function submitLevel3Practice() {
    let correctCount = 0;
    let totalQuestions = 0;
    let choiceFillScore = 0;
    let resultHTML = '<div class="test-result"><h3>答题结果</h3>';

    const PRACTICE_CHOICE_COUNT = 3;
    const PRACTICE_FILL_COUNT = 3;
    const PRACTICE_APP_COUNT = 2;
    const CHOICE_FILL_SCORE = 10;
    const APP_QUESTION_SCORE = 15;

    const practiceAnswers = [
        { question: '问题1', correct: 'cd' },
        { question: '问题2', correct: 'bd' },
        { question: '问题3', correct: 'c' },
        { question: '填空题1', correct: '等值' },
        { question: '填空题2', correct: '作用力与反作用' },
        { question: '填空题3', correct: '大于' }
    ];

    for (let i = 1; i <= PRACTICE_CHOICE_COUNT; i++) {
        const radio = document.querySelector(`input[name="level3-test-q${i}"]:checked`);
        const userAnswer = radio ? radio.value : '';
        const correctAnswer = practiceAnswers[i - 1].correct;
        let isCorrect = false;

        if (correctAnswer.length > 1) {
            isCorrect = correctAnswer.includes(userAnswer);
        } else {
            isCorrect = userAnswer === correctAnswer;
        }

        totalQuestions++;
        if (isCorrect) {
            correctCount++;
            choiceFillScore += CHOICE_FILL_SCORE;
        }

        resultHTML += `
            <div class="test-result-item ${isCorrect ? 'correct' : 'incorrect'}">
                <p><strong>选择题${i}：</strong> ${isCorrect ? '✅ 正确' : '❌ 错误'}</p>
                <p>你的答案：${userAnswer || '未作答'}</p>
                <p>正确答案：${correctAnswer.toUpperCase()}</p>
            </div>
        `;
    }

    for (let i = 1; i <= PRACTICE_FILL_COUNT; i++) {
        const input = document.getElementById(`level3-fill-q${i}`);
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

    for (let i = 1; i <= PRACTICE_APP_COUNT; i++) {
        const uploadedImages = document.getElementById(`level3-uploaded-images-${i}`);
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
    resultHTML += `<div class="test-score"><h4>总分：${totalScore}分</h4></div></div>`;

    showLevel3PracticeResult(resultHTML);
}

/**
 * 显示第三关实战演练结果
 * @param {string} resultHTML - 结果HTML
 */
function showLevel3PracticeResult(resultHTML) {
    // 创建结果弹窗
    const resultModal = document.createElement('div');
    resultModal.className = 'practice-result-modal';
    resultModal.innerHTML = `
        <div class="practice-result-content">
            <div class="practice-result-header">
                <h3>答题结果</h3>
            </div>
            <div class="practice-result-body">
                ${resultHTML}
            </div>
            <div class="practice-result-footer">
                <button class="practice-result-button" onclick="showLevel3PracticeAnswerExplanation()">答案解析</button>
                <button class="practice-result-button" onclick="redoLevel3Practice()">返回重做</button>
            </div>
        </div>
    `;

    document.body.appendChild(resultModal);
}

/**
 * 显示第三关答案解析
 */
function showLevel3PracticeAnswerExplanation() {
    const resultModal = document.querySelector('.practice-result-modal');
    if (resultModal) {
        resultModal.remove();
    }

    const explanations = [
        {
            question: '【平衡力与相互作用力判断】杯子静止在水平桌面上。下列说法正确的是（　　）',
            explanation: '杯子对桌面的压力与桌面对杯子的支持力是相互作用力，A错；杯子对桌面的压力作用在桌上，重力作用在杯子上，不是平衡力，B错；支持力与重力都作用在杯子上，是平衡力，C正确；支持力与压力是相互作用力，D正确。'
        },
        {
            question: '【叠加体、摩擦力、相互作用力】物体A、B叠放在水平地面上，用水平力F拉A，使A、B一起匀速运动。下列说法正确的是（　　）',
            explanation: 'A对B的摩擦力与B对A的摩擦力是相互作用力，作用在不同物体上，A错；B对地面的摩擦力与地面对B的摩擦力是相互作用力，B正确；地面对B的支持力等于A和B的总重力，与B的重力不是平衡力，C错；A对B的压力与B对A的支持力是相互作用力，D正确。'
        },
        {
            question: '【牛顿第三定律应用】关于牛顿第三定律，下列说法正确的是（　　）',
            explanation: '火箭升空时喷出的气体对火箭的推力与火箭对气体的推力是相互作用力，不是平衡力，A错；鸡蛋碰石头，鸡蛋碎了，但石头对鸡蛋的作用力与鸡蛋对石头的作用力大小相等，B错；人走路时，地对脚的力与脚蹬地的力是相互作用力，大小相等，C正确；作用力与反作用力一定是同种性质的力，D错。'
        },
        {
            question: '【作用力与反作用力特征】作用力与反作用力的四个特征：______、______、______、______。',
            explanation: '作用力与反作用力的四个特征：等值（大小相等）、反向（方向相反）、共线（作用在同一直线上）、同性质（性质相同）。'
        },
        {
            question: '【磁铁吸附、平衡力判断】磁铁吸附在竖直白板上静止。磁铁受到白板的吸引力与白板受到磁铁的压力是 ______ 力；磁铁受到的重力与白板对磁铁的 ______ 力是一对平衡力。',
            explanation: '磁铁受到白板的吸引力与白板受到磁铁的压力是作用力与反作用力，它们作用在不同物体上，大小相等、方向相反。磁铁受到的重力与白板对磁铁的摩擦力都作用在磁铁上，大小相等、方向相反，是一对平衡力。'
        },
        {
            question: '【超重现象、相互作用力】电梯加速上升时，人对电梯地板的压力 ______ 人的重力，这种现象称为 ______。此时，人对电梯地板的压力与电梯地板对人的支持力是一对 ______ 力。',
            explanation: '电梯加速上升时，人处于超重状态，人对电梯地板的压力大于人的重力。人对电梯地板的压力与电梯地板对人的支持力是一对作用力与反作用力，它们大小相等、方向相反、作用在不同物体上。'
        }
    ];

    let explanationHTML = '<div class="test-result">';
    explanations.forEach((item, index) => {
        explanationHTML += `
            <div class="test-result-item">
                <p><strong>问题${index + 1}：</strong>${item.question}</p>
                <p><strong>解析：</strong>${item.explanation.replace(/\n/g, '<br>')}</p>
            </div>
        `;
    });
    explanationHTML += '</div>';

    const explanationModal = document.createElement('div');
    explanationModal.className = 'practice-result-modal';
    explanationModal.innerHTML = `
        <div class="practice-result-content">
            <div class="practice-result-header">
                <button class="test-result-back-button" onclick="showLevel3PracticeResultFromExplanation()">返回</button>
                <h3>答案解析</h3>
            </div>
            <div class="practice-result-body">
                ${explanationHTML}
            </div>
            <div class="practice-result-footer">
                <button class="practice-result-button" onclick="redoLevel3Practice()">返回重做</button>
            </div>
        </div>
    `;
    document.body.appendChild(explanationModal);
}

/**
 * 从实战演练答案解析返回答题结果
 */
function showLevel3PracticeResultFromExplanation() {
    // 关闭当前解析弹窗
    const explanationModal = document.querySelector('.practice-result-modal');
    if (explanationModal) {
        explanationModal.remove();
    }

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
        { question: '问题1', correct: 'b' },
        { question: '问题2', correct: 'a' },
        { question: '问题3', correct: 'c' },
        { question: '填空题1', correct: 'f=ma' },
        { question: '填空题2', correct: '固有' },
        { question: '填空题3', correct: '2' }
    ];

    // 检查选择题
    for (let i = 1; i <= PRACTICE_CHOICE_COUNT; i++) {
        const radio = document.querySelector(`input[name="level3-test-q${i}"]:checked`);
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
        const input = document.getElementById(`level3-fill-q${i}`);
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
        const uploadedImages = document.getElementById(`level3-uploaded-images-${i}`);
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
    resultHTML += `<div class="test-score"><h4>总分：${totalScore}分</h4></div></div>`;

    // 显示结果
    const resultModal = document.createElement('div');
    resultModal.className = 'practice-result-modal';
    resultModal.innerHTML = `
        <div class="practice-result-content">
            <div class="practice-result-header">
                <h3>答题结果</h3>
            </div>
            <div class="practice-result-body">
                ${resultHTML}
            </div>
            <div class="practice-result-footer">
                <button class="practice-result-button" onclick="showLevel3PracticeAnswerExplanation()">答案解析</button>
                <button class="practice-result-button" onclick="redoLevel3Practice()">返回重做</button>
            </div>
        </div>
    `;

    document.body.appendChild(resultModal);
}

/**
 * 重新做第三关实战演练
 */
function redoLevel3Practice() {
    // 关闭当前弹窗
    const resultModal = document.querySelector('.practice-result-modal');
    if (resultModal) {
        resultModal.remove();
    }

    // 重置所有问题
    resetLevel3PracticeForm();

    // 确保实战演练页面显示
    document.getElementById('level3PracticePage').style.display = 'block';
}

/**
 * 提交第三关当堂检测答案
 */
function submitLevel3Test() {
    let correctCount = 0;
    let totalQuestions = 5;
    let resultHTML = '<div class="test-result"><h3>答题结果</h3>';

    // 问题1：关于作用力与反作用力
    const q1Answer = document.querySelector('input[name="level3-q1"]:checked');
    const userAnswer1 = q1Answer ? q1Answer.value : '';
    const isCorrect1 = userAnswer1 === 'c';
    if (isCorrect1) correctCount++;
    resultHTML += `
        <div class="test-result-item ${isCorrect1 ? 'correct' : 'incorrect'}">
            <p><strong>问题1：</strong>${isCorrect1 ? '✅ 正确' : '❌ 错误'}</p>
            <p><strong>你的答案：</strong>${userAnswer1 || '未作答'}</p>
            <p><strong>正确答案：</strong>C</p>
        </div>
    `;

    // 问题2：关于平衡力和作用力与反作用力
    const q2Answer = document.querySelector('input[name="level3-q2"]:checked');
    const userAnswer2 = q2Answer ? q2Answer.value : '';
    const isCorrect2 = userAnswer2 === 'd';
    if (isCorrect2) correctCount++;
    resultHTML += `
        <div class="test-result-item ${isCorrect2 ? 'correct' : 'incorrect'}">
            <p><strong>问题2：</strong>${isCorrect2 ? '✅ 正确' : '❌ 错误'}</p>
            <p><strong>你的答案：</strong>${userAnswer2 || '未作答'}</p>
            <p><strong>正确答案：</strong>D</p>
        </div>
    `;

    // 问题3：体重计问题（填空题）
    const q3Answer1 = document.getElementById('level3-q3-answer1');
    const q3Answer2 = document.getElementById('level3-q3-answer2');
    const userAnswer3_1 = q3Answer1 ? q3Answer1.value : '';
    const userAnswer3_2 = q3Answer2 ? q3Answer2.value : '';
    const isCorrect3_1 = userAnswer3_1 === '作用力与反作用';
    const isCorrect3_2 = userAnswer3_2 === '平衡';
    const isCorrect3 = isCorrect3_1 && isCorrect3_2;
    if (isCorrect3) correctCount++;
    resultHTML += `
        <div class="test-result-item ${isCorrect3 ? 'correct' : 'incorrect'}">
            <p><strong>问题3：</strong>${isCorrect3 ? '✅ 正确' : '❌ 错误'}</p>
            <p><strong>你的答案：</strong>${userAnswer3_1}；${userAnswer3_2}</p>
            <p><strong>正确答案：</strong>作用力与反作用；平衡</p>
        </div>
    `;

    // 问题4：牛顿第三定律内容（填空题）
    const q4Answer1 = document.getElementById('level3-q4-answer1');
    const q4Answer2 = document.getElementById('level3-q4-answer2');
    const q4Answer3 = document.getElementById('level3-q4-answer3');
    const userAnswer4_1 = q4Answer1 ? q4Answer1.value : '';
    const userAnswer4_2 = q4Answer2 ? q4Answer2.value : '';
    const userAnswer4_3 = q4Answer3 ? q4Answer3.value : '';
    const isCorrect4_1 = userAnswer4_1 === '相等';
    const isCorrect4_2 = userAnswer4_2 === '相反';
    const isCorrect4_3 = userAnswer4_3 === '同一条直线';
    const isCorrect4 = isCorrect4_1 && isCorrect4_2 && isCorrect4_3;
    if (isCorrect4) correctCount++;
    resultHTML += `
        <div class="test-result-item ${isCorrect4 ? 'correct' : 'incorrect'}">
            <p><strong>问题4：</strong>${isCorrect4 ? '✅ 正确' : '❌ 错误'}</p>
            <p><strong>你的答案：</strong>${userAnswer4_1}；${userAnswer4_2}；${userAnswer4_3}</p>
            <p><strong>正确答案：</strong>相等；相反；同一条直线</p>
        </div>
    `;

    // 问题5：拔河比赛问题
    const q5Answer = document.querySelector('input[name="level3-q5"]:checked');
    const userAnswer5 = q5Answer ? q5Answer.value : '';
    const isCorrect5 = userAnswer5 === 'b';
    if (isCorrect5) correctCount++;
    resultHTML += `
        <div class="test-result-item ${isCorrect5 ? 'correct' : 'incorrect'}">
            <p><strong>问题5：</strong>${isCorrect5 ? '✅ 正确' : '❌ 错误'}</p>
            <p><strong>你的答案：</strong>${userAnswer5 || '未作答'}</p>
            <p><strong>正确答案：</strong>B</p>
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
            <button class="test-result-button" onclick="showLevel3AnswerExplanations()">答案解析</button>
            <button class="test-result-button" onclick="redoLevel3Test()">返回重做</button>
        </div>
    `;

    resultHTML += '</div>';

    // 显示结果
    const testContent = document.getElementById('level3-test-content');
    if (testContent) {
        testContent.innerHTML = resultHTML;
    }
}

/**
 * 显示第三关答案解析
 */
function showLevel3AnswerExplanations() {
    const explanations = [
        {
            question: '关于作用力与反作用力，下列说法正确的是（　　）',
            explanation: '作用力与反作用力的特点：①大小相等；②方向相反；③作用在同一条直线上；④性质相同；⑤同时产生、同时变化、同时消失。A错误，作用力与反作用力作用在不同物体上；B错误，作用力与反作用力一定是同种性质的力；D错误，作用力与反作用力作用在不同物体上，不能合成，合力不为零。'
        },
        {
            question: '关于一对平衡力和一对作用力与反作用力，下列说法正确的是（　　）',
            explanation: '平衡力和相互作用力的区别：①平衡力作用在同一物体上，相互作用力作用在两个物体上；②平衡力可以是不同性质的力，相互作用力一定是同种性质的力；③平衡力的效果可以相互抵消，相互作用力的效果不能相互抵消。A、B、C都正确，所以选D。'
        },
        {
            question: '人站在体重计上静止时，体重计示数等于人的重力。这是因为人对体重计的压力与体重计对人的支持力是 ______ 力，而体重计对人的支持力与人的重力是 ______ 力。',
            explanation: '人对体重计的压力与体重计对人的支持力是一对作用力与反作用力，它们作用在不同物体上，大小相等、方向相反。体重计对人的支持力与人的重力都作用在人身上，大小相等、方向相反，是一对平衡力。'
        },
        {
            question: '牛顿第三定律指出：两个物体之间的作用力和反作用力总是大小 ______，方向 ______，作用在 ______ 上。',
            explanation: '牛顿第三定律的内容：两个物体之间的作用力和反作用力总是大小相等，方向相反，作用在同一条直线上。'
        },
        {
            question: '在拔河比赛中，甲队胜乙队。关于两队对绳子的拉力，下列说法正确的是（　　）',
            explanation: '拔河比赛中，绳子处于平衡状态，甲队对绳子的拉力等于乙队对绳子的拉力。甲队获胜是因为地面对甲队的摩擦力大于地面对乙队的摩擦力。'
        }
    ];

    let explanationHTML = '<div class="test-result">';
    explanationHTML += '<div class="test-result-header">';
    explanationHTML += '<button class="test-result-back-button" onclick="showLevel3TestResultFromAnswerExplanation()">返回</button>';
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
            <button class="test-result-button" onclick="redoLevel3Test()">返回重做</button>
        </div>
    `;

    explanationHTML += '</div>';

    const testContent = document.getElementById('level3-test-content');
    if (testContent) {
        testContent.innerHTML = explanationHTML;
    }
}

/**
 * 从答案解析返回答题结果
 */
function showLevel3TestResultFromAnswerExplanation() {
    // 获取答案
    const q1Answer = document.querySelector('input[name="level3-q1"]:checked');
    const q2Answer = document.querySelector('input[name="level3-q2"]:checked');
    const q3Answer = document.querySelector('input[name="level3-q3"]:checked');

    // 检查是否完成所有题目
    if (!q1Answer || !q2Answer || !q3Answer) {
        alert('请完成所有题目后再提交！');
        return;
    }

    // 定义正确答案
    const answers = [
        { answer: 'b' },
        { answer: 'a' },
        { answer: 'c' }
    ];

    // 计算得分和正确题数
    let correctCount = 0;
    const totalQuestions = 3;

    // 问题1
    const userAnswer1 = q1Answer ? q1Answer.value : '';
    const isCorrect1 = userAnswer1 === answers[0].answer;
    if (isCorrect1) correctCount++;

    // 问题2
    const userAnswer2 = q2Answer ? q2Answer.value : '';
    const isCorrect2 = userAnswer2 === answers[1].answer;
    if (isCorrect2) correctCount++;

    // 问题3
    const userAnswer3 = q3Answer ? q3Answer.value : '';
    const isCorrect3 = userAnswer3 === answers[2].answer;
    if (isCorrect3) correctCount++;

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

    // 得分和按钮
    resultHTML += `
        <div class="test-score">
            <h4>得分：${score}分</h4>
            <p>共${totalQuestions}题，正确${correctCount}题，错误${totalQuestions - correctCount}题</p>
        </div>

        <div class="test-result-buttons">
            <button class="test-result-button" onclick="showLevel3AnswerExplanations()">答案解析</button>
            <button class="test-result-button" onclick="redoLevel3Test()">返回重做</button>
        </div>
    `;

    resultHTML += '</div>';

    // 显示结果
    const testContent = document.getElementById('level3-test-content');
    if (testContent) {
        testContent.innerHTML = resultHTML;
    }
}

/**
 * 重新做第三关当堂检测
 */
function redoLevel3Test() {
    // 重置所有问题
    resetLevel3TestForm();

    // 重新显示测试内容
    const testContent = document.getElementById('level3-test-content');
    if (testContent) {
        // 这里可以重新加载测试内容，或者确保测试表单已经重置
        testContent.innerHTML = `
            <h3>当堂检测</h3>
            <p>完成以下测试，检验你的学习成果。</p>

            <div class="test-question">
                <p><strong>问题1：</strong>关于牛顿第一定律，下列说法正确的是（ ）</p>
                <div class="test-options">
                    <label><input type="radio" name="level3-q1" value="a"> A. 物体只有在不受力时才会保持匀速直线运动状态</label>
                    <label><input type="radio" name="level3-q1" value="b"> B. 物体只有在受力时才会改变运动状态</label>
                    <label><input type="radio" name="level3-q1" value="c"> C. 惯性是物体的固有属性，与物体的质量无关</label>
                    <label><input type="radio" name="level3-q1" value="d"> D. 牛顿第一定律只适用于匀速直线运动</label>
                </div>
            </div>

            <div class="test-question">
                <p><strong>问题2：</strong>一个质量为 5 kg 的物体受到 10 N 的水平拉力，物体的加速度为（ ）</p>
                <div class="test-options">
                    <label><input type="radio" name="level3-q2" value="a"> A. 2 m/s²</label>
                    <label><input type="radio" name="level3-q2" value="b"> B. 5 m/s²</label>
                    <label><input type="radio" name="level3-q2" value="c"> C. 10 m/s²</label>
                    <label><input type="radio" name="level3-q2" value="d"> D. 50 m/s²</label>
                </div>
            </div>

            <div class="test-question">
                <p><strong>问题3：</strong>关于牛顿第三定律，下列说法正确的是（ ）</p>
                <div class="test-options">
                    <label><input type="radio" name="level3-q3" value="a"> A. 作用力和反作用力是作用在同一个物体上的</label>
                    <label><input type="radio" name="level3-q3" value="b"> B. 作用力和反作用力可以相互抵消</label>
                    <label><input type="radio" name="level3-q3" value="c"> C. 作用力和反作用力总是大小相等，方向相反</label>
                    <label><input type="radio" name="level3-q3" value="d"> D. 作用力和反作用力的性质一定相同</label>
                </div>
            </div>

            <button class="test-submit" onclick="submitLevel3Test()">提交答案</button>
        `;
    }
}

/**
 * 重置第三关实战演练表单
 */
function resetLevel3PracticeForm() {
    // 重置选择题
    const radioButtons = document.querySelectorAll('#level3PracticePage input[type="radio"]');
    radioButtons.forEach(radio => {
        radio.checked = false;
    });

    // 重置填空题
    const inputFields = document.querySelectorAll('#level3PracticePage input[type="text"]');
    inputFields.forEach(input => {
        input.value = '';
    });

    // 重置图片上传
    const uploadedImages1 = document.getElementById('level3-uploaded-images-1');
    const uploadedImages2 = document.getElementById('level3-uploaded-images-2');
    if (uploadedImages1) uploadedImages1.innerHTML = '';
    if (uploadedImages2) uploadedImages2.innerHTML = '';
}

/**
 * 重置第三关当堂检测表单
 */
function resetLevel3TestForm() {
    // 重置选择题
    const radioButtons = document.querySelectorAll('#level3LearningCenterPage input[type="radio"]');
    radioButtons.forEach(radio => {
        radio.checked = false;
    });
}

// 初始化第三关点击事件
function initLevel3ClickEvents() {
    // 第三关点击事件
    document.querySelector('.level-item:nth-child(3)').addEventListener('click', showLevel3Page);
}

// 页面加载完成后初始化
window.addEventListener('load', initLevel3ClickEvents);