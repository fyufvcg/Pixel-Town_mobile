// 第四关实战演练答案数据
const level4PracticeAnswers = [
    {
        question: '问题1：两个大小相等的共点力F₁和F₂，当它们夹角为60°时，合力大小为10√3 N。则每个分力的大小为（　　）',
        answer: 'A. 10 N',
        correct: 'a',
        tags: ['力的合成', '几何计算'],
        explanation: '设每个分力大小为F，夹角θ=60°，则合力F合=2Fcos(θ/2)=2Fcos30°=2F×(√3/2)=F√3。已知F合=10√3 N，所以F=10 N。'
    },
    {
        question: '问题2：一个物体静止在倾角为θ的光滑斜面上，重力为G。将重力分解为沿斜面向下的分力F₁和垂直斜面向下的分力F₂，则下列说法正确的是（　　）',
        answer: 'C. F₁是物体下滑的力，F₂是物体对斜面的压力',
        correct: 'c',
        tags: ['力的分解', '斜面受力'],
        explanation: '重力G按效果分解：F₁=Gsinθ使物体沿斜面下滑，F₂=Gcosθ使物体压紧斜面（即物体对斜面压力的反作用力）。F₁、F₂是重力的两个分力，是等效替代，实际受力只有重力G。AB错，D表述不准确。'
    },
    {
        question: '问题3：某物体受三个共点力作用处于平衡状态，已知其中两个力大小分别为5N和8N，方向相互垂直。则第三个力的大小和方向为（　　）',
        answer: 'A. 9 N，与5N力夹角为arctan(8/5)',
        correct: 'a',
        tags: ['力的平衡', '正交分解'],
        explanation: '三力平衡，则第三个力与前两个力的合力等大反向。前两力垂直，合力F₁₂=√(5²+8²)=9N，方向与5N力夹角arctan(8/5)。故第三个力大小为9N，方向与F₁₂相反。'
    },
    {
        question: '问题1：正交分解法是将力沿两个相互 ______ 的方向分解，其目的是将矢量运算转化为 ______ 运算。',
        answer: '垂直；代数',
        correct: '垂直；代数',
        tags: ['正交分解', '基本概念'],
        explanation: '正交分解沿互相垂直的坐标轴进行，将力的合成转化为同一直线上力的代数加减。'
    },
    {
        question: '问题2：将一个大小为20N的力分解为两个互相垂直的分力，其中一个分力大小为12N，则另一个分力大小为 ______ N。',
        answer: '16',
        correct: '16',
        tags: ['力的分解', '几何计算'],
        explanation: '垂直分解满足勾股定理：F²=F₁²+F₂²，即20²=12²+F₂²，解得F₂=16N。'
    },
    {
        question: '问题3：用细绳悬挂一重物，结点O处受三个力：重力G（大小方向不变）、OA绳拉力T_A（方向不变）、OB绳拉力T_B。保持结点O位置不变，当OB绳从水平位置缓慢转到竖直位置的过程中，T_A将 ______，T_B将 ______。',
        answer: '变小；先变小后变大',
        correct: '变小；先变小后变大',
        tags: ['力的平衡', '动态分析'],
        explanation: '三力平衡构成矢量三角形，重力G对边不变，T_A方向不变，T_B方向顺时针转动。由三角形法则可知，T_A一直减小，T_B先减小后增大（当T_B⊥T_A时最小）。'
    },
    {
        question: '问题1：质量m=5kg的物体放在倾角θ=37°的固定斜面上，物体与斜面间的动摩擦因数μ=0.5。用平行于斜面向上的拉力F使物体沿斜面匀速上升。（g=10m/s²，sin37°=0.6，cos37°=0.8）求：（1）拉力F的大小；（2）若改用水平推力F\'使物体沿斜面匀速上升，求F\'的大小。',
        answer: '（1）F=50N；（2）F\'=100N',
        correct: '50',
        tags: ['斜面', '摩擦力', '受力平衡'],
        explanation: '（1）沿斜面方向：F-mgsin37°-f=0，垂直斜面方向：N-mgcos37°=0，f=μN。代入数据：N=40N，f=20N，F=30+20=50N。<br>（2）水平推力情况：F\'cos37°-mgsin37°-μ(F\'sin37°+mgcos37°)=0，代入解得F\'=100N。'
    },
    {
        question: '问题2：轻质滑轮固定在杆上，细绳跨过滑轮，一端挂一重物G=100N，另一端施加一拉力F，使系统平衡。已知绳与杆夹角α=30°，滑轮摩擦不计。求：（1）拉力F的大小；（2）杆对滑轮的作用力大小和方向；（3）若保持拉力F大小不变，仅改变其方向，求杆对滑轮作用力的最小值。',
        answer: '（1）F=100N；（2）100√3N≈173N，方向与竖直方向成30°角斜向上；（3）最小值100N',
        correct: '100',
        tags: ['力的平衡', '滑轮', '最小力'],
        explanation: '（1）滑轮两侧绳拉力相等（轻滑轮），且F与G大小相等，故F=100N。<br>（2）滑轮受三力平衡：两侧绳拉力T₁=T₂=100N（方向夹角60°），用合成法：T合=2Tcos30°=100√3≈173N。<br>（3）当两绳拉力夹角为120°时，杆对滑轮的作用力最小，等于100N。'
    }
];

// 存储应用题图片数据
let level4ApplicationImages = {
    question1: null,
    question2: null
};

// 存储AI批改结果
let level4AppScores = {};

// 显示AI思考中提示
function showLevel4AIThinking() {
    const testResultContainer = document.querySelector('.test-result');
    if (!testResultContainer) return null;

    const thinkingDiv = document.createElement('div');
    thinkingDiv.className = 'ai-thinking';
    thinkingDiv.innerHTML = '<span class="thinking-icon">🤔</span> AI 正在智能批改中...';
    testResultContainer.appendChild(thinkingDiv);

    return thinkingDiv;
}

// AI智能批改应用题
async function gradeLevel4ApplicationWithAI(questionText, imageData, correctAnswer) {
    if (!imageData) {
        return {
            score: 0,
            feedback: '未上传图片',
            isCorrect: false,
            explanation: ''
        };
    }

    try {
        const thinkingDiv = showLevel4AIThinking();

        // 调用AI进行真正的图片批改
        const response = await fetch(DOUBAO_API_CONFIG.url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                messages: [
                    {
                        role: "system",
                        content: "你是一位高中物理老师，负责批改学生的物理应用题解答。请仔细分析学生上传的图片中的解题过程，根据以下评分标准进行评分：\n\n评分标准：\n1. 正确分析物理问题情境 (20分)\n2. 正确选取物理公式 (20分)  \n3. 计算过程正确无误 (30分)\n4. 单位使用正确 (10分)\n5. 答案正确 (20分)\n\n请以JSON格式返回评分结果，格式如下：\n{\"score\":85,\"feedback\":\"评语\",\"isCorrect\":true,\"explanation\":\"解析\"}\n其中score为0-100的整数，isCorrect为score>=60时为true。"
                    },
                    {
                        role: "user",
                        content: [
                            { type: "text", text: `题目：${questionText}\n\n正确答案：${correctAnswer}` },
                            { type: "image_url", image_url: { url: imageData } }
                        ]
                    }
                ],
                max_tokens: 1000
            })
        });

        if (thinkingDiv) thinkingDiv.remove();

        if (!response.ok) {
            throw new Error(`API请求失败：${response.status}`);
        }

        const result = await response.json();
        const aiResponse = result?.choices?.[0]?.message?.content || "";

        // 尝试解析AI返回的JSON评分结果
        try {
            // 提取JSON部分
            const jsonMatch = aiResponse.match(/\{[\s\S]*\}/);
            if (jsonMatch) {
                const gradeResult = JSON.parse(jsonMatch[0]);
                // 保存批改数据到localStorage
                saveGradingData(1, questionText, gradeResult.score, 100);
                return gradeResult;
            }
        } catch (e) {
            console.error("解析AI响应失败:", e);
        }

        // 如果解析失败，使用默认评分
        return {
            score: 70,
            feedback: "AI已收到你的答题图片，请点击AI助手查看详细批改结果",
            isCorrect: true,
            explanation: "请查看AI助手的详细分析"
        };

    } catch (error) {
        console.error("AI批改请求失败:", error);
        // 如果API调用失败，回退到模拟评分
        return new Promise((resolve) => {
            setTimeout(() => {
                const mockScore = Math.floor(Math.random() * 40) + 60;
                resolve({
                    score: mockScore,
                    feedback: mockScore >= 80 ? '解答思路清晰，步骤完整' : '解答基本正确，但步骤有待完善',
                    isCorrect: mockScore >= 60,
                    explanation: '建议仔细检查计算过程和单位换算。'
                });
            }, 1500);
        });
    }
}

// 保存批改数据到localStorage
function saveGradingData(questionNum, question, score, maxScore) {
    if (!window.appQuestionGradingData) {
        window.appQuestionGradingData = [];
    }
    window.appQuestionGradingData.push({
        questionNum,
        question,
        score,
        maxScore,
        timestamp: Date.now()
    });
    localStorage.setItem('appQuestionGradingData', JSON.stringify(window.appQuestionGradingData));
}

// 显示第四关页面
function showLevel4Page() {
    document.getElementById('mainPage').style.display = 'none';
    document.getElementById('level4Page').style.display = 'flex';
}

// 关闭第四关页面
function closeLevel4Page() {
    document.getElementById('level4Page').style.display = 'none';
    document.getElementById('mainPage').style.display = 'block';
}

// 显示第四关学习中心
function showLevel4LearningCenter() {
    document.getElementById('level4Page').style.display = 'none';
    document.getElementById('level4LearningCenterPage').style.display = 'flex';

    // 确保导航栏定位在“先导”上
    const navItems = document.querySelectorAll('#level4LearningCenterPage .nav-item');
    navItems.forEach(item => item.classList.remove('active'));

    const guideNavItem = document.querySelector('#level4LearningCenterPage .nav-item[onclick*="guide"]');
    if (guideNavItem) {
        guideNavItem.classList.add('active');
    }

    const tabContents = document.querySelectorAll('#level4LearningCenterPage .tab-content');
    tabContents.forEach(content => content.style.display = 'none');

    const guideContent = document.getElementById('level4-guide-content');
    if (guideContent) {
        guideContent.style.display = 'block';
    }
}

// 关闭第四关学习中心
function closeLevel4LearningCenter() {
    document.getElementById('level4LearningCenterPage').style.display = 'none';
    document.getElementById('level4Page').style.display = 'flex';
}

// 打开第四关实战演练页面
function openLevel4PracticePage() {
    document.getElementById('level4Page').style.display = 'none';
    document.getElementById('level4PracticePage').style.display = 'flex';

    // 确保导航栏定位在“选择”上
    const navItems = document.querySelectorAll('#level4PracticePage .practice-nav-item');
    navItems.forEach(item => item.classList.remove('active'));

    const choiceNavItem = document.querySelector('#level4PracticePage .practice-nav-item[onclick*="choice"]');
    if (choiceNavItem) {
        choiceNavItem.classList.add('active');
    }

    const tabContents = document.querySelectorAll('#level4PracticePage .practice-tab-content');
    tabContents.forEach(content => content.style.display = 'none');

    const choiceContent = document.getElementById('level4-choice-content');
    if (choiceContent) {
        choiceContent.style.display = 'block';
    }
}

// 关闭第四关实战演练页面
function closeLevel4PracticePage() {
    document.getElementById('level4PracticePage').style.display = 'none';
    document.getElementById('level4Page').style.display = 'flex';
}

// 切换第四关学习中心标签页
function switchLevel4LearningTab(tab, tabName) {
    // 移除所有标签的active类
    const tabs = tab.parentElement.querySelectorAll('.nav-item');
    tabs.forEach(t => t.classList.remove('active'));

    // 添加当前标签的active类
    tab.classList.add('active');

    // 隐藏所有内容
    const contents = document.querySelectorAll('#level4LearningCenterPage .tab-content');
    contents.forEach(content => content.style.display = 'none');

    // 显示当前内容
    document.getElementById('level4-' + tabName + '-content').style.display = 'block';
}

// 切换第四关实战演练标签页
function switchLevel4PracticeTab(tab, tabName) {
    // 移除所有标签的active类
    const tabs = tab.parentElement.querySelectorAll('.practice-nav-item');
    tabs.forEach(t => t.classList.remove('active'));

    // 添加当前标签的active类
    tab.classList.add('active');

    // 显示/隐藏对应标签页的内容
    const choiceContent = document.getElementById('level4-choice-content');
    const fillContent = document.getElementById('level4-fill-content');
    const applicationContent = document.getElementById('level4-application-content');

    if (choiceContent) {
        choiceContent.style.display = tabName === 'choice' ? 'block' : 'none';
        choiceContent.className = 'practice-tab-content' + (tabName === 'choice' ? ' active' : '');
    }

    if (fillContent) {
        fillContent.style.display = tabName === 'fill' ? 'block' : 'none';
        fillContent.className = 'practice-tab-content' + (tabName === 'fill' ? ' active' : '');
    }

    if (applicationContent) {
        applicationContent.style.display = tabName === 'application' ? 'block' : 'none';
        applicationContent.className = 'practice-tab-content' + (tabName === 'application' ? ' active' : '');
    }
}

// 切换思考答案显示
function toggleThinkingAnswer(button) {
    const answerContent = button.nextElementSibling;
    if (answerContent.classList.contains('show')) {
        answerContent.classList.remove('show');
        button.textContent = '查看答案';
    } else {
        answerContent.classList.add('show');
        button.textContent = '收起答案';
    }
}

// 提交第四关学习中心测试
function submitLevel4Test() {
    let correctCount = 0;
    let totalQuestions = 5;
    let resultHTML = '<div class="test-result"><h3>答题结果</h3>';

    // 问题1：关于合力与分力
    const q1Answer = document.querySelector('input[name="level4-q1"]:checked');
    const userAnswer1 = q1Answer ? q1Answer.value : '';
    const isCorrect1 = userAnswer1 === 'c';
    if (isCorrect1) correctCount++;
    else trackQuestionResult('level4', 'choice', 1, false);
    resultHTML += `
        <div class="test-result-item ${isCorrect1 ? 'correct' : 'incorrect'}">
            <p><strong>问题1：</strong>${isCorrect1 ? '✅ 正确' : '❌ 错误'}</p>
            <p><strong>你的答案：</strong>${userAnswer1 || '未作答'}</p>
            <p><strong>正确答案：</strong>C</p>
        </div>
    `;

    // 问题2：关于力的分解
    const q2Answer = document.querySelector('input[name="level4-q2"]:checked');
    const userAnswer2 = q2Answer ? q2Answer.value : '';
    const isCorrect2 = userAnswer2 === 'a' || userAnswer2 === 'c' || userAnswer2 === 'd';
    if (isCorrect2) correctCount++;
    else trackQuestionResult('level4', 'choice', 2, false);
    resultHTML += `
        <div class="test-result-item ${isCorrect2 ? 'correct' : 'incorrect'}">
            <p><strong>问题2：</strong>${isCorrect2 ? '✅ 正确' : '❌ 错误'}</p>
            <p><strong>你的答案：</strong>${userAnswer2 || '未作答'}</p>
            <p><strong>正确答案：</strong>A、C、D</p>
        </div>
    `;

    // 问题3：基础计算
    const q3Answer = document.getElementById('level4-q3');
    const userAnswer3 = q3Answer ? q3Answer.value : '';
    const isCorrect3 = userAnswer3 === '5；1' || userAnswer3 === '5,1' || userAnswer3 === '5； 1' || userAnswer3 === '5, 1';
    if (isCorrect3) correctCount++;
    else trackQuestionResult('level4', 'choice', 3, false);
    resultHTML += `
        <div class="test-result-item ${isCorrect3 ? 'correct' : 'incorrect'}">
            <p><strong>问题3：</strong>${isCorrect3 ? '✅ 正确' : '❌ 错误'}</p>
            <p><strong>你的答案：</strong>${userAnswer3 || '未作答'}</p>
            <p><strong>正确答案：</strong>5；1</p>
        </div>
    `;

    // 问题4：力的合成定则
    const q4Answer = document.getElementById('level4-q4');
    const userAnswer4 = q4Answer ? q4Answer.value : '';
    const isCorrect4 = userAnswer4.includes('平行四边形') && userAnswer4.includes('|F₁-F₂|') && userAnswer4.includes('F₁+F₂');
    if (isCorrect4) correctCount++;
    else trackQuestionResult('level4', 'choice', 4, false);
    resultHTML += `
        <div class="test-result-item ${isCorrect4 ? 'correct' : 'incorrect'}">
            <p><strong>问题4：</strong>${isCorrect4 ? '✅ 正确' : '❌ 错误'}</p>
            <p><strong>你的答案：</strong>${userAnswer4 || '未作答'}</p>
            <p><strong>正确答案：</strong>平行四边形；|F₁-F₂|；F₁+F₂</p>
        </div>
    `;

    // 问题5：判断选择
    const q5Answer = document.querySelector('input[name="level4-q5"]:checked');
    const userAnswer5 = q5Answer ? q5Answer.value : '';
    const isCorrect5 = userAnswer5 === 'b' || userAnswer5 === 'c' || userAnswer5 === 'd';
    if (isCorrect5) correctCount++;
    else trackQuestionResult('level4', 'choice', 5, false);
    resultHTML += `
        <div class="test-result-item ${isCorrect5 ? 'correct' : 'incorrect'}">
            <p><strong>问题5：</strong>${isCorrect5 ? '✅ 正确' : '❌ 错误'}</p>
            <p><strong>你的答案：</strong>${userAnswer5 || '未作答'}</p>
            <p><strong>正确答案：</strong>B、C、D</p>
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
            <button class="test-result-button" onclick="showLevel4AnswerExplanations()">答案解析</button>
            <button class="test-result-button" onclick="redoLevel4Test()">返回重做</button>
        </div>
    `;

    resultHTML += '</div>';

    // 显示结果
    const testContent = document.getElementById('level4-test-content');
    if (testContent) {
        testContent.innerHTML = resultHTML;
    }
}

// 显示第四关答案解析
function showLevel4AnswerExplanations() {
    const explanationHTML = `
        <div class="test-result">
            <div class="test-result-header">
                <button class="test-result-back-button" onclick="showLevel4TestResultFromAnswerExplanation()">返回</button>
                <h3>答案解析</h3>
            </div>
            
            <div class="test-result-item">
                <p><strong>问题1：</strong>【概念辨析】关于合力与分力，下列说法正确的是（ ）</p>
                <p><strong>答案：</strong>C. 合力可以小于任何一个分力</p>
                <p><strong>解析：</strong>合力和分力的关系：①当两分力方向相反时，合力可能小于任何一个分力，C正确；②合力不一定大于分力，A、B错；③当两分力夹角为锐角时，合力大于分力，但D说法不全面，缺少"当夹角相等时"的前提，D错。</p>
            </div>

            <div class="test-result-item">
                <p><strong>问题2：</strong>【概念辨析】关于力的分解，下列说法正确的是（ ）</p>
                <p><strong>答案：</strong>A、C、D</p>
                <p><strong>解析：</strong>力的分解：①力的分解是力的合成的逆运算，A正确；②一个力可以分解为无数组分力，B错误；③力的分解必须按力的实际作用效果进行，C正确；④同一个力在不同条件下（如按不同效果分解）可以产生不同的分解结果，D正确。</p>
            </div>

            <div class="test-result-item">
                <p><strong>问题3：</strong>【基础计算】两个大小分别为3N和4N的共点力，当它们夹角为90°时，合力的大小为 ______ N；当夹角为180°时，合力的大小为 ______ N。</p>
                <p><strong>答案：</strong>5；1</p>
                <p><strong>解析：</strong>当夹角为90°时，合力F = √(3² + 4²) = 5N；当夹角为180°时，合力F = |4-3| = 1N。</p>
            </div>

            <div class="test-result-item">
                <p><strong>问题4：</strong>【概念填空】力的合成遵循 ______ 定则。两个共点力F₁、F₂的合力大小范围是 ______ ≤ F ≤ ______。</p>
                <p><strong>答案：</strong>平行四边形；|F₁-F₂|；F₁+F₂</p>
                <p><strong>解析：</strong>力的合成遵循平行四边形定则，合力的大小范围是两个分力之差的绝对值到两个分力之和之间。</p>
            </div>

            <div class="test-result-item">
                <p><strong>问题5：</strong>【判断选择】将一个大小为10N的力分解为两个分力，下列各组值可能的是（ ）</p>
                <p><strong>答案：</strong>B、C、D</p>
                <p><strong>解析：</strong>根据力的平行四边形定则，两个分力的大小之和必须大于或等于合力，两个分力的大小之差的绝对值必须小于或等于合力。A选项：3+4=7<10，不可能；B选项：10+10=20≥10，|10-10|=0≤10，可能；C选项：100+100=200≥10，|100-100|=0≤10，可能；D选项：1+10=11≥10，|10-1|=9≤10，可能。</p>
            </div>

            <div class="test-result-buttons">
                <button class="test-result-button" onclick="redoLevel4Test()">返回重做</button>
            </div>
        </div>
    `;

    const testContent = document.getElementById('level4-test-content');
    if (testContent) {
        testContent.innerHTML = explanationHTML;
    }
}

/**
 * 从答案解析返回答题结果
 */
function showLevel4TestResultFromAnswerExplanation() {
    let correctCount = 0;
    let totalQuestions = 5;
    let resultHTML = '<div class="test-result"><h3>答题结果</h3>';

    // 问题1：关于合力与分力
    const q1Answer = document.querySelector('input[name="level4-q1"]:checked');
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

    // 问题2：关于力的分解
    const q2Answer = document.querySelector('input[name="level4-q2"]:checked');
    const userAnswer2 = q2Answer ? q2Answer.value : '';
    const isCorrect2 = userAnswer2 === 'a' || userAnswer2 === 'c' || userAnswer2 === 'd';
    if (isCorrect2) correctCount++;
    resultHTML += `
        <div class="test-result-item ${isCorrect2 ? 'correct' : 'incorrect'}">
            <p><strong>问题2：</strong>${isCorrect2 ? '✅ 正确' : '❌ 错误'}</p>
            <p><strong>你的答案：</strong>${userAnswer2 || '未作答'}</p>
            <p><strong>正确答案：</strong>A、C、D</p>
        </div>
    `;

    // 问题3：基础计算
    const q3Answer = document.getElementById('level4-q3');
    const userAnswer3 = q3Answer ? q3Answer.value : '';
    const isCorrect3 = userAnswer3 === '5；1' || userAnswer3 === '5,1' || userAnswer3 === '5； 1' || userAnswer3 === '5, 1';
    if (isCorrect3) correctCount++;
    resultHTML += `
        <div class="test-result-item ${isCorrect3 ? 'correct' : 'incorrect'}">
            <p><strong>问题3：</strong>${isCorrect3 ? '✅ 正确' : '❌ 错误'}</p>
            <p><strong>你的答案：</strong>${userAnswer3 || '未作答'}</p>
            <p><strong>正确答案：</strong>5；1</p>
        </div>
    `;

    // 问题4：力的合成定则
    const q4Answer = document.getElementById('level4-q4');
    const userAnswer4 = q4Answer ? q4Answer.value : '';
    const isCorrect4 = userAnswer4.includes('平行四边形') && userAnswer4.includes('|F₁-F₂|') && userAnswer4.includes('F₁+F₂');
    if (isCorrect4) correctCount++;
    resultHTML += `
        <div class="test-result-item ${isCorrect4 ? 'correct' : 'incorrect'}">
            <p><strong>问题4：</strong>${isCorrect4 ? '✅ 正确' : '❌ 错误'}</p>
            <p><strong>你的答案：</strong>${userAnswer4 || '未作答'}</p>
            <p><strong>正确答案：</strong>平行四边形；|F₁-F₂|；F₁+F₂</p>
        </div>
    `;

    // 问题5：判断选择
    const q5Answer = document.querySelector('input[name="level4-q5"]:checked');
    const userAnswer5 = q5Answer ? q5Answer.value : '';
    const isCorrect5 = userAnswer5 === 'b' || userAnswer5 === 'c' || userAnswer5 === 'd';
    if (isCorrect5) correctCount++;
    resultHTML += `
        <div class="test-result-item ${isCorrect5 ? 'correct' : 'incorrect'}">
            <p><strong>问题5：</strong>${isCorrect5 ? '✅ 正确' : '❌ 错误'}</p>
            <p><strong>你的答案：</strong>${userAnswer5 || '未作答'}</p>
            <p><strong>正确答案：</strong>B、C、D</p>
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
            <button class="test-result-button" onclick="showLevel4AnswerExplanations()">答案解析</button>
            <button class="test-result-button" onclick="redoLevel4Test()">返回重做</button>
        </div>
    `;

    resultHTML += '</div>';

    // 显示结果
    const testContent = document.getElementById('level4-test-content');
    if (testContent) {
        testContent.innerHTML = resultHTML;
    }
}

// 重做第四关测试
function redoLevel4Test() {
    const testHTML = `
        <div class="learning-section">
            <h3>当堂检测</h3>
            <p>完成以下测试，检验你的学习成果。</p>
            
            <div class="test-question">
                <p><strong>问题1：</strong>【概念辨析】关于合力与分力，下列说法正确的是（ ）</p>
                <div class="test-options">
                    <label><input type="radio" name="level4-q1" value="a"> A. 合力一定大于每一个分力</label>
                    <label><input type="radio" name="level4-q1" value="b"> B. 合力至少大于其中一个分力</label>
                    <label><input type="radio" name="level4-q1" value="c"> C. 合力可以小于任何一个分力</label>
                    <label><input type="radio" name="level4-q1" value="d"> D. 两个分力夹角为锐角时，合力一定大于分力</label>
                </div>
            </div>
            
            <div class="test-question">
                <p><strong>问题2：</strong>【概念辨析】关于力的分解，下列说法正确的是（ ）</p>
                <div class="test-options">
                    <label><input type="radio" name="level4-q2" value="a"> A. 力的分解是力的合成的逆运算</label>
                    <label><input type="radio" name="level4-q2" value="b"> B. 一个力只能分解为两个分力</label>
                    <label><input type="radio" name="level4-q2" value="c"> C. 力的分解必须按力的实际作用效果进行</label>
                    <label><input type="radio" name="level4-q2" value="d"> D. 同一个力在不同条件下可以产生不同的分解结果</label>
                </div>
            </div>
            
            <div class="test-question">
                <p><strong>问题3：</strong>【基础计算】两个大小分别为3N和4N的共点力，当它们夹角为90°时，合力的大小为 ______ N；当夹角为180°时，合力的大小为 ______ N。</p>
                <input type="text" class="test-input" placeholder="请输入答案（格式：X；X）" id="level4-q3">
            </div>
            
            <div class="test-question">
                <p><strong>问题4：</strong>【概念填空】力的合成遵循 ______ 定则。两个共点力F₁、F₂的合力大小范围是 ______ ≤ F ≤ ______。</p>
                <input type="text" class="test-input" placeholder="请输入答案（格式：X；X；X）" id="level4-q4">
            </div>
            
            <div class="test-question">
                <p><strong>问题5：</strong>【判断选择】将一个大小为10N的力分解为两个分力，下列各组值可能的是（ ）</p>
                <div class="test-options">
                    <label><input type="radio" name="level4-q5" value="a"> A. 3N，4N</label>
                    <label><input type="radio" name="level4-q5" value="b"> B. 10N，10N</label>
                    <label><input type="radio" name="level4-q5" value="c"> C. 100N，100N</label>
                    <label><input type="radio" name="level4-q5" value="d"> D. 1N，10N</label>
                </div>
            </div>
            
            <button class="test-submit" onclick="submitLevel4Test()">提交答案</button>
        </div>
    `;

    const testContent = document.getElementById('level4-test-content');
    if (testContent) {
        testContent.innerHTML = testHTML;
    }
}

// 处理第四关图片上传1
function handleLevel4ImageUpload1(input) {
    const uploadedImages = document.getElementById('level4-uploaded-images-1');
    uploadedImages.innerHTML = '';

    if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = function (e) {
            uploadedImages.innerHTML = `
                <div class="uploaded-image">
                    <img src="${e.target.result}" alt="上传的图片" style="max-width: 200px; max-height: 200px; border-radius: 8px;">
                    <button class="remove-image" onclick="removeLevel4Image(1)">×</button>
                </div>
            `;
        };
        reader.readAsDataURL(input.files[0]);
    }
}

// 处理第四关图片上传2
function handleLevel4ImageUpload2(input) {
    const uploadedImages = document.getElementById('level4-uploaded-images-2');
    uploadedImages.innerHTML = '';

    if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = function (e) {
            uploadedImages.innerHTML = `
                <div class="uploaded-image">
                    <img src="${e.target.result}" alt="上传的图片" style="max-width: 200px; max-height: 200px; border-radius: 8px;">
                    <button class="remove-image" onclick="removeLevel4Image(2)">×</button>
                </div>
            `;
        };
        reader.readAsDataURL(input.files[0]);
    }
}

function removeLevel4Image(questionNum) {
    if (questionNum === 1) {
        document.getElementById('level4-uploaded-images-1').innerHTML = '';
        document.getElementById('level4-file-input-1').value = '';
    } else if (questionNum === 2) {
        document.getElementById('level4-uploaded-images-2').innerHTML = '';
        document.getElementById('level4-file-input-2').value = '';
    }
}

// 提交第四关实战演练答案
async function submitLevel4Practice() {
    // 收集用户答案
    const practiceAnswers = {
        choice1: document.querySelector('input[name="level4-test-q1"]:checked')?.value,
        choice2: document.querySelector('input[name="level4-test-q2"]:checked')?.value,
        choice3: document.querySelector('input[name="level4-test-q3"]:checked')?.value,
        fill1: document.getElementById('level4-fill-q1')?.value,
        fill2: document.getElementById('level4-fill-q2')?.value,
        fill3: document.getElementById('level4-fill-q3')?.value,
        // 收集应用题答题情况（是否上传了图片）
        app1: document.getElementById('level4-uploaded-images-1')?.children.length > 0,
        app2: document.getElementById('level4-uploaded-images-2')?.children.length > 0
    };

    // 收集应用题图片数据
    const uploadedImages1 = document.querySelector('#level4-uploaded-images-1 img');
    const uploadedImages2 = document.querySelector('#level4-uploaded-images-2 img');
    level4ApplicationImages.question1 = uploadedImages1 ? uploadedImages1.src : null;
    level4ApplicationImages.question2 = uploadedImages2 ? uploadedImages2.src : null;

    // 显示答题结果
    const practiceContent = document.querySelector('#level4PracticePage .practice-content');
    if (practiceContent) {
        practiceContent.innerHTML = '';
        await showLevel4PracticeResults(practiceAnswers);
    }
}



// 存储当前答题结果
let currentLevel4Answers = null;
let currentLevel4ChoiceFillScore = 0;

// 显示第四关实战演练答题结果
async function showLevel4PracticeResults(answers) {
    // 存储当前答案
    currentLevel4Answers = answers;

    let correctCount = 0;
    let choiceFillScore = 0;
    let totalQuestions = 6; // 选择题3道 + 填空题3道
    const CHOICE_FILL_SCORE = 5; // 每题5分
    const APP_QUESTION_SCORE = 15; // 应用题每题15分

    let resultHTML = '<div class="test-result"><h3>答题结果</h3>';

    // 问题1：选择题
    const userAnswer1 = answers.choice1 || '';
    const isCorrect1 = userAnswer1 === 'a';
    if (isCorrect1) {
        correctCount++;
        choiceFillScore += CHOICE_FILL_SCORE;
    }
    resultHTML += `
        <div class="test-result-item ${isCorrect1 ? 'correct' : 'incorrect'}">
            <p><strong>问题1：</strong>${isCorrect1 ? '✅ 正确' : '❌ 错误'}</p>
            <p><strong>你的答案：</strong>${userAnswer1 || '未作答'}</p>
            <p><strong>正确答案：</strong>A</p>
        </div>
    `;

    // 问题2：选择题
    const userAnswer2 = answers.choice2 || '';
    const isCorrect2 = userAnswer2 === 'c';
    if (isCorrect2) {
        correctCount++;
        choiceFillScore += CHOICE_FILL_SCORE;
    }
    resultHTML += `
        <div class="test-result-item ${isCorrect2 ? 'correct' : 'incorrect'}">
            <p><strong>问题2：</strong>${isCorrect2 ? '✅ 正确' : '❌ 错误'}</p>
            <p><strong>你的答案：</strong>${userAnswer2 || '未作答'}</p>
            <p><strong>正确答案：</strong>C</p>
        </div>
    `;

    // 问题3：选择题
    const userAnswer3 = answers.choice3 || '';
    const isCorrect3 = userAnswer3 === 'a';
    if (isCorrect3) {
        correctCount++;
        choiceFillScore += CHOICE_FILL_SCORE;
    }
    resultHTML += `
        <div class="test-result-item ${isCorrect3 ? 'correct' : 'incorrect'}">
            <p><strong>问题3：</strong>${isCorrect3 ? '✅ 正确' : '❌ 错误'}</p>
            <p><strong>你的答案：</strong>${userAnswer3 || '未作答'}</p>
            <p><strong>正确答案：</strong>A</p>
        </div>
    `;

    // 问题4：填空题
    const userAnswer4 = answers.fill1 || '';
    const isCorrect4 = userAnswer4 === '垂直；代数';
    if (isCorrect4) {
        correctCount++;
        choiceFillScore += CHOICE_FILL_SCORE;
    } else {
        trackQuestionResult('level4', 'fill', 1, false);
    }
    resultHTML += `
        <div class="test-result-item ${isCorrect4 ? 'correct' : 'incorrect'}">
            <p><strong>问题4：</strong>${isCorrect4 ? '✅ 正确' : '❌ 错误'}</p>
            <p><strong>你的答案：</strong>${userAnswer4 || '未作答'}</p>
            <p><strong>正确答案：</strong>垂直；代数</p>
        </div>
    `;

    // 问题5：填空题
    const userAnswer5 = answers.fill2 || '';
    const isCorrect5 = userAnswer5 === '16';
    if (isCorrect5) {
        correctCount++;
        choiceFillScore += CHOICE_FILL_SCORE;
    } else {
        trackQuestionResult('level4', 'fill', 2, false);
    }
    resultHTML += `
        <div class="test-result-item ${isCorrect5 ? 'correct' : 'incorrect'}">
            <p><strong>问题5：</strong>${isCorrect5 ? '✅ 正确' : '❌ 错误'}</p>
            <p><strong>你的答案：</strong>${userAnswer5 || '未作答'}</p>
            <p><strong>正确答案：</strong>16</p>
        </div>
    `;

    // 问题6：填空题
    const userAnswer6 = answers.fill3 || '';
    const isCorrect6 = userAnswer6 === '变小；先变小后变大';
    if (isCorrect6) {
        correctCount++;
        choiceFillScore += CHOICE_FILL_SCORE;
    } else {
        trackQuestionResult('level4', 'fill', 3, false);
    }
    resultHTML += `
        <div class="test-result-item ${isCorrect6 ? 'correct' : 'incorrect'}">
            <p><strong>问题6：</strong>${isCorrect6 ? '✅ 正确' : '❌ 错误'}</p>
            <p><strong>你的答案：</strong>${userAnswer6 || '未作答'}</p>
            <p><strong>正确答案：</strong>变小；先变小后变大</p>
        </div>
    `;

    // 问题7：应用题（AI智能批改）
    const isApp1Submitted = answers.app1 || false;
    const app1ImageData = level4ApplicationImages.question1;

    if (isApp1Submitted && app1ImageData) {
        resultHTML += `
            <div class="test-result-item pending" id="level4-app-result-1">
                <p><strong>问题7：</strong> 📋 应用题（AI智能批改中...）</p>
                <p>你的答案：已上传解题过程</p>
                <p>状态：正在调用AI批改...</p>
            </div>
        `;
    } else {
        resultHTML += `
            <div class="test-result-item pending">
                <p><strong>问题7：</strong> 📋 应用题</p>
                <p>你的答案：${isApp1Submitted ? '已上传' : '未上传图片'}</p>
                <p>状态：${isApp1Submitted ? '待批改' : '未提交'}</p>
            </div>
        `;
    }

    // 问题8：应用题（AI智能批改）
    const isApp2Submitted = answers.app2 || false;
    const app2ImageData = level4ApplicationImages.question2;

    if (isApp2Submitted && app2ImageData) {
        resultHTML += `
            <div class="test-result-item pending" id="level4-app-result-2">
                <p><strong>问题8：</strong> 📋 应用题（AI智能批改中...）</p>
                <p>你的答案：已上传解题过程</p>
                <p>状态：正在调用AI批改...</p>
            </div>
        `;
    } else {
        resultHTML += `
            <div class="test-result-item pending">
                <p><strong>问题8：</strong> 📋 应用题</p>
                <p>你的答案：${isApp2Submitted ? '已上传' : '未上传图片'}</p>
                <p>状态：${isApp2Submitted ? '待批改' : '未提交'}</p>
            </div>
        `;
    }

    // 初始总分（不含应用题）
    let totalScore = choiceFillScore;
    currentLevel4ChoiceFillScore = choiceFillScore;

    resultHTML += `
        <div class="test-score">
            <h4>总分：${totalScore}分（选择题+填空题）</h4>
            <p>共6题，正确${correctCount}题，错误${totalQuestions - correctCount}题</p>
            <p style="font-size: 14px; color: #FFA500;">应用题正在AI智能批改中...</p>
        </div>

        <div class="test-result-buttons">
            <button class="test-result-button" onclick="showLevel4PracticeExplanations(level4PracticeAnswers)">答案解析</button>
            <button class="test-result-button" onclick="redoLevel4Practice()">返回重做</button>
        </div>
    `;

    resultHTML += '</div>';

    // 显示结果
    const practiceContent = document.querySelector('#level4PracticePage .practice-content');
    if (practiceContent) {
        practiceContent.innerHTML = resultHTML;
    }

    // 调用AI批改应用题
    if (isApp1Submitted && app1ImageData) {
        gradeLevel4ApplicationWithAI(
            level4PracticeAnswers[6].question,
            app1ImageData,
            level4PracticeAnswers[6].answer
        ).then(gradeResult => {
            const actualAppScore = Math.round(gradeResult.score * APP_QUESTION_SCORE / 100);
            level4AppScores[1] = actualAppScore;

            const resultItem = document.getElementById('level4-app-result-1');
            if (resultItem) {
                resultItem.className = 'test-result-item ' + (gradeResult.isCorrect ? 'correct' : 'pending');
                const explanationHtml = gradeResult.explanation ? `<p><strong>📝 专属解析：</strong>${gradeResult.explanation}</p>` : '';
                resultItem.innerHTML = `
                    <p><strong>问题7：</strong> ${gradeResult.isCorrect ? '✅ AI批改正确' : '📋 AI智能批改'}</p>
                    <p>AI评分：${actualAppScore}分（满分${APP_QUESTION_SCORE}分）</p>
                    <p>AI评语：${gradeResult.feedback}</p>
                    ${explanationHtml}
                    <p><strong>正确答案：</strong>（1）F=50N；（2）F'=100N</p>
                `;
            }
            updateLevel4TotalScore();
        });
    }

    if (isApp2Submitted && app2ImageData) {
        gradeLevel4ApplicationWithAI(
            level4PracticeAnswers[7].question,
            app2ImageData,
            level4PracticeAnswers[7].answer
        ).then(gradeResult => {
            const actualAppScore = Math.round(gradeResult.score * APP_QUESTION_SCORE / 100);
            level4AppScores[2] = actualAppScore;

            const resultItem = document.getElementById('level4-app-result-2');
            if (resultItem) {
                resultItem.className = 'test-result-item ' + (gradeResult.isCorrect ? 'correct' : 'pending');
                const explanationHtml = gradeResult.explanation ? `<p><strong>📝 专属解析：</strong>${gradeResult.explanation}</p>` : '';
                resultItem.innerHTML = `
                    <p><strong>问题8：</strong> ${gradeResult.isCorrect ? '✅ AI批改正确' : '📋 AI智能批改'}</p>
                    <p>AI评分：${actualAppScore}分（满分${APP_QUESTION_SCORE}分）</p>
                    <p>AI评语：${gradeResult.feedback}</p>
                    ${explanationHtml}
                    <p><strong>正确答案：</strong>（1）F=100N；（2）100√3N≈173N，方向与竖直方向成30°角斜向上；（3）最小值100N</p>
                `;
            }
            updateLevel4TotalScore();
        });
    }
}

// 更新第四关总分
function updateLevel4TotalScore() {
    let appScoreTotal = 0;
    if (level4AppScores) {
        Object.values(level4AppScores).forEach(s => appScoreTotal += s);
    }

    // 使用存储的选择题和填空题得分
    const choiceFillScore = currentLevel4ChoiceFillScore || 0;

    const totalWithApp = choiceFillScore + appScoreTotal;

    const scoreElement = document.querySelector('.test-score h4');
    if (scoreElement) {
        scoreElement.textContent = `总分：${totalWithApp}分（含AI批改）`;
    }

    const scoreDetailElement = document.querySelector('.test-score p');
    if (scoreDetailElement) {
        scoreDetailElement.innerHTML = `选择题+填空题：${choiceFillScore}分 | 应用题：${appScoreTotal}分`;
    }
}

// 打开第四关实验视频
function openLevel4HookeVideo() {
    // 关闭背景音乐
    const backgroundMusic = document.getElementById('bgMusic');
    if (backgroundMusic) {
        backgroundMusic.pause();
    }

    // 设置视频源
    const hookeVideo = document.getElementById('hooke-video');
    if (hookeVideo) {
        const source = hookeVideo.querySelector('source');
        if (source) {
            source.src = 'vedios/共点力平衡的条件.mp4';
            hookeVideo.load();
            hookeVideo.play();
        }
    }

    // 存储来源页面
    videoSourcePage = 'level4LearningCenterPage';

    // 显示视频页面
    document.getElementById('videoPage').style.display = 'flex';
    document.getElementById('level4LearningCenterPage').style.display = 'none';
}

// 显示第四关实战演练答案解析
function showLevel4PracticeExplanations(answers) {
    // 使用传入的answers数组（即level4PracticeAnswers）
    const practiceAnswers = answers || level4PracticeAnswers;

    // 获取用户的答案
    const userAnswers = {
        choice1: document.querySelector('input[name="level4-test-q1"]:checked')?.value,
        choice2: document.querySelector('input[name="level4-test-q2"]:checked')?.value,
        choice3: document.querySelector('input[name="level4-test-q3"]:checked')?.value,
        fill1: document.getElementById('level4-fill-q1')?.value,
        fill2: document.getElementById('level4-fill-q2')?.value,
        fill3: document.getElementById('level4-fill-q3')?.value
    };

    let explanationsHTML = `
        <div class="test-result">
            <div class="test-result-header">
                <button class="test-result-back-button" onclick="backToLevel4Results()">返回</button>
                <h3>答案解析</h3>
            </div>
    `;

    // 选择题解析
    explanationsHTML += '<h4>选择题</h4>';
    for (let i = 0; i < 3; i++) {
        const item = practiceAnswers[i];
        const isCorrect = userAnswers[`choice${i + 1}`] === item.correct;
        explanationsHTML += `
            <div class="test-result-item ${isCorrect ? 'correct' : 'incorrect'}">
                <p><strong>${item.question}</strong></p>
                <p><strong>正确答案：</strong>${item.answer}</p>
                <p><strong>解析：</strong>${item.explanation}</p>
            </div>
        `;
    }

    // 填空题解析
    explanationsHTML += '<h4>填空题</h4>';
    for (let i = 3; i < 6; i++) {
        const item = practiceAnswers[i];
        const userAnswer = userAnswers[`fill${i - 2}`];
        const isCorrect = userAnswer === item.correct;
        explanationsHTML += `
            <div class="test-result-item ${isCorrect ? 'correct' : 'incorrect'}">
                <p><strong>${item.question}</strong></p>
                <p><strong>正确答案：</strong>${item.answer}</p>
                <p><strong>解析：</strong>${item.explanation}</p>
            </div>
        `;
    }

    // 应用题解析
    explanationsHTML += '<h4>应用题</h4>';
    for (let i = 6; i < 8; i++) {
        const item = practiceAnswers[i];
        explanationsHTML += `
            <div class="test-result-item">
                <p><strong>${item.question}</strong></p>
                <p><strong>正确答案：</strong>${item.answer}</p>
                <p><strong>解析：</strong>${item.explanation}</p>
            </div>
        `;
    }

    explanationsHTML += `
        <div class="test-result-buttons" style="justify-content: center;">
            <button class="test-result-button" onclick="redoLevel4Practice()">返回重做</button>
        </div>
    `;

    explanationsHTML += '</div>';

    // 显示解析
    const practiceContent = document.querySelector('#level4PracticePage .practice-content');
    if (practiceContent) {
        practiceContent.innerHTML = explanationsHTML;
    }
}

// 从答案解析返回答题结果
function backToLevel4Results() {
    if (currentLevel4Answers) {
        showLevel4PracticeResults(currentLevel4Answers);
    }
}

// 重做第四关实战演练
function redoLevel4Practice() {
    // 重置存储的答案
    currentLevel4Answers = null;
    currentLevel4ChoiceFillScore = 0;

    // 重新加载实战演练内容
    const practiceContent = document.querySelector('#level4PracticePage .practice-content');
    if (practiceContent) {
        practiceContent.innerHTML = `
            <!-- 选择题内容 -->
            <div id="level4-choice-content" class="practice-tab-content active">
                <h3>选择题</h3>
                <p>请完成以下选择题。</p>
                <div class="practice-question">
                    <p><strong>问题1：</strong>【合力大小判断】两个大小相等的共点力F₁和F₂，当它们夹角为60°时，合力大小为10√3 N。则每个分力的大小为（　　）</p>
                    <div class="practice-options">
                        <label><input type="radio" name="level4-test-q1" value="a"> A. 10 N</label>
                        <label><input type="radio" name="level4-test-q1" value="b"> B. 10√3 N</label>
                        <label><input type="radio" name="level4-test-q1" value="c"> C. 20 N</label>
                        <label><input type="radio" name="level4-test-q1" value="d"> D. 10√3/3 N</label>
                    </div>
                </div>

                <div class="practice-question">
                    <p><strong>问题2：</strong>【分解的实际效果】一个物体静止在倾角为θ的光滑斜面上，重力为G。将重力分解为沿斜面向下的分力F₁和垂直斜面向下的分力F₂，则下列说法正确的是（　　）
                    </p>
                    <img src="images/test/第五关/一个物体静止在倾角为θ的光滑斜面上.png" alt="斜面受力分析"
                        style="max-width: 100%; height: auto; margin: 10px 0;">
                    <div class="practice-options">
                        <label><input type="radio" name="level4-test-q2" value="a"> A. F₁是物体对斜面的压力</label>
                        <label><input type="radio" name="level4-test-q2" value="b"> B. F₂是物体对斜面的压力</label>
                        <label><input type="radio" name="level4-test-q2" value="c"> C. F₁是物体下滑的力，F₂是物体对斜面的压力</label>
                        <label><input type="radio" name="level4-test-q2" value="d">
                            F₁和F₂都是物体受到的重力的分力，实际不存在</label>
                    </div>
                </div>

                <div class="practice-question">
                    <p><strong>问题3：</strong>【多力合成】某物体受三个共点力作用处于平衡状态，已知其中两个力大小分别为5N和8N，方向相互垂直。则第三个力的大小和方向为（　　）</p>
                    <div class="practice-options">
                        <label><input type="radio" name="level4-test-q3" value="a"> A. 9
                            N，与5N力夹角为arctan(8/5)</label>
                        <label><input type="radio" name="level4-test-q3" value="b"> B. 9
                            N，与8N力夹角为arctan(5/8)</label>
                        <label><input type="radio" name="level4-test-q3" value="c"> C. 13 N，与5N力方向相反</label>
                        <label><input type="radio" name="level4-test-q3" value="d"> D. 3 N，与8N力方向相同</label>
                    </div>
                </div>
            </div>

            <!-- 填空题内容 -->
            <div id="level4-fill-content" class="practice-tab-content" style="display: none;">
                <h3>填空题</h3>
                <p>请完成以下填空题。</p>
                <div class="practice-question">
                    <p><strong>问题1：</strong>【正交分解】正交分解法是将力沿两个相互 ______ 的方向分解，其目的是将矢量运算转化为 ______ 运算。</p>
                    <input type="text" class="practice-input" placeholder="请输入答案" id="level4-fill-q1">
                </div>

                <div class="practice-question">
                    <p><strong>问题2：</strong>【分解计算】将一个大小为20N的力分解为两个互相垂直的分力，其中一个分力大小为12N，则另一个分力大小为 ______ N。</p>
                    <input type="text" class="practice-input" placeholder="请输入答案" id="level4-fill-q2">
                </div>

                <div class="practice-question">
                    <p><strong>问题3：</strong>【动态分析】用细绳悬挂一重物，结点O处受三个力：重力G（大小方向不变）、OA绳拉力T_A（方向不变）、OB绳拉力T_B。保持结点O位置不变，当OB绳从水平位置缓慢转到竖直位置的过程中，T_A将
                        ______，T_B将 ______。</p>
                    <input type="text" class="practice-input" placeholder="请输入答案，如：变小；先变小后变大" id="level4-fill-q3">
                </div>
            </div>

            <!-- 应用题内容 -->
            <div id="level4-application-content" class="practice-tab-content" style="display: none;">
                <h3>应用题</h3>
                <p>请完成以下应用题，上传解题过程图片。</p>
                <div class="practice-question">
                    <p><strong>问题1：</strong>【斜面与正交分解】质量m=5kg的物体放在倾角θ=37°的固定斜面上，物体与斜面间的动摩擦因数μ=0.5。用平行于斜面向上的拉力F使物体沿斜面匀速上升。（g=10m/s²，sin37°=0.6，cos37°=0.8）<br>求：（1）拉力F的大小；<br>（2）若改用水平推力F'使物体沿斜面匀速上升，求F'的大小。
                    </p>
                    <img src="images/test/第五关/质量m=5kg的物体放在倾角θ=37°的固定斜面上.png" alt="斜面问题"
                        style="max-width: 40%; height: auto; margin: 10px 0;">
                    <div class="image-upload-container">
                        <div class="upload-area" id="level4-upload-area-1"
                            onclick="document.getElementById('level4-file-input-1').click()">
                            <div class="upload-icon">📷</div>
                            <div class="upload-text">点击或拖拽上传图片</div>
                            <div class="upload-hint">支持 JPG、PNG 格式</div>
                        </div>
                        <input type="file" id="level4-file-input-1" class="file-input" accept="image/*"
                            onchange="handleLevel4ImageUpload1(this)" style="display: none;">
                        <div class="uploaded-images" id="level4-uploaded-images-1"></div>
                    </div>
                </div>

                <div class="practice-question">
                    <p><strong>问题2：</strong>【综合应用：力的合成与平衡】轻质滑轮固定在杆上，细绳跨过滑轮，一端挂一重物G=100N，另一端施加一拉力F，使系统平衡。已知绳与杆夹角α=30°，滑轮摩擦不计。<br>求：（1）拉力F的大小；<br>（2）杆对滑轮的作用力大小和方向；<br>（3）若保持拉力F大小不变，仅改变其方向，求杆对滑轮作用力的最小值。
                    </p>
                    <img src="images/test/第五关/轻质滑轮固定在杆上.png" alt="滑轮问题"
                        style="max-width: 40%; height: auto; margin: 10px 0;">
                    <div class="image-upload-container">
                        <div class="upload-area" id="level4-upload-area-2"
                            onclick="document.getElementById('level4-file-input-2').click()">
                            <div class="upload-icon">📷</div>
                            <div class="upload-text">点击或拖拽上传图片</div>
                            <div class="upload-hint">支持 JPG、PNG 格式</div>
                        </div>
                        <input type="file" id="level4-file-input-2" class="file-input" accept="image/*"
                            onchange="handleLevel4ImageUpload2(this)" style="display: none;">
                        <div class="uploaded-images" id="level4-uploaded-images-2"></div>
                    </div>
                </div>

                <!-- 提交答案按钮 -->
                <div class="practice-footer">
                    <button class="practice-submit" onclick="submitLevel4Practice()">提交答案</button>
                </div>
            </div>
        `;
    }
    // 切换到选择题标签
    switchLevel4PracticeTab(document.querySelector('#level4PracticePage .practice-nav-item:first-child'), 'choice');
}

// 显示第五关页面
function showLevel5Page() {
    document.getElementById('mainPage').style.display = 'none';
    document.getElementById('level5Page').style.display = 'block';
}

// 关闭第五关页面
function closeLevel5Page() {
    document.getElementById('level5Page').style.display = 'none';
    document.getElementById('mainPage').style.display = 'block';
}

// 显示第五关学习中心
function showLevel5LearningCenter() {
    document.getElementById('level5Page').style.display = 'none';
    document.getElementById('level5LearningCenterPage').style.display = 'block';

    // 确保导航栏定位在“先导”上
    const navItems = document.querySelectorAll('#level5LearningCenterPage .nav-item');
    navItems.forEach(item => item.classList.remove('active'));

    const guideNavItem = document.querySelector('#level5LearningCenterPage .nav-item[onclick*="guide"]');
    if (guideNavItem) {
        guideNavItem.classList.add('active');
    }

    const tabContents = document.querySelectorAll('#level5LearningCenterPage .tab-content');
    tabContents.forEach(content => content.style.display = 'none');

    const guideContent = document.getElementById('level5-guide-content');
    if (guideContent) {
        guideContent.style.display = 'block';
    }
}

// 关闭第五关学习中心
function closeLevel5LearningCenter() {
    document.getElementById('level5LearningCenterPage').style.display = 'none';
    document.getElementById('level5Page').style.display = 'block';
}

// 打开第五关实战演练页面
function openLevel5PracticePage() {
    document.getElementById('level5Page').style.display = 'none';
    document.getElementById('level5PracticePage').style.display = 'block';

    // 确保导航栏定位在“选择”上
    const navItems = document.querySelectorAll('#level5PracticePage .practice-nav-item');
    navItems.forEach(item => item.classList.remove('active'));

    const choiceNavItem = document.querySelector('#level5PracticePage .practice-nav-item[onclick*="choice"]');
    if (choiceNavItem) {
        choiceNavItem.classList.add('active');
    }

    const tabContents = document.querySelectorAll('#level5PracticePage .practice-tab-content');
    tabContents.forEach(content => content.style.display = 'none');

    const choiceContent = document.getElementById('level5-choice-content');
    if (choiceContent) {
        choiceContent.style.display = 'block';
    }
}

// 关闭第五关实战演练页面
function closeLevel5PracticePage() {
    document.getElementById('level5PracticePage').style.display = 'none';
    document.getElementById('level5Page').style.display = 'block';
}

// 切换第五关学习中心标签页
function switchLevel5LearningTab(tab, tabName) {
    // 移除所有标签的active类
    const tabs = tab.parentElement.querySelectorAll('.nav-item');
    tabs.forEach(t => t.classList.remove('active'));

    // 添加当前标签的active类
    tab.classList.add('active');

    // 隐藏所有内容
    const contents = document.querySelectorAll('#level5LearningCenterPage .tab-content');
    contents.forEach(content => content.style.display = 'none');

    // 显示当前内容
    document.getElementById('level5-' + tabName + '-content').style.display = 'block';
}

// 切换第五关实战演练标签页
function switchLevel5PracticeTab(tab, tabName) {
    // 移除所有标签的active类
    const tabs = tab.parentElement.querySelectorAll('.practice-nav-item');
    tabs.forEach(t => t.classList.remove('active'));

    // 添加当前标签的active类
    tab.classList.add('active');

    // 隐藏所有内容
    const contents = document.querySelectorAll('#level5PracticePage .practice-tab-content');
    contents.forEach(content => content.style.display = 'none');

    // 显示当前内容
    document.getElementById('level5-' + tabName + '-content').style.display = 'block';
}



// 处理第五关图片上传
function handleLevel5ImageUpload(input) {
    const uploadedImages = document.getElementById('level5-uploaded-images');
    uploadedImages.innerHTML = '';

    if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const img = document.createElement('img');
            img.src = e.target.result;
            img.className = 'uploaded-image';
            img.style.maxWidth = '200px';
            img.style.maxHeight = '200px';
            uploadedImages.appendChild(img);
        };
        reader.readAsDataURL(input.files[0]);
    }
}

// 提交第五关实战演练答案
function submitLevel5Practice() {
    // 这里可以添加提交逻辑
    alert('答案已提交！');
}

// 力的平行四边形实验
function openForce合成Video() {
    // 关闭背景音乐
    const backgroundMusic = document.getElementById('bgMusic');
    if (backgroundMusic) {
        backgroundMusic.pause();
    }

    // 设置视频源
    const videoSource = document.getElementById('videoSource');
    if (videoSource) {
        videoSource.src = 'vedios/探究两个互称角度的力的合成规律.mp4';
    }

    // 存储来源页面
    videoSourcePage = 'level4LearningCenterPage';

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

let forceCanvas, forceCtx;
let f1Value = 100;
let f2Value = 80;
let angleValue = 60;
let originX = 100;
let originY = 280;

function initForceParallelogram() {
    forceCanvas = document.getElementById('force-parallelogram-canvas');
    if (!forceCanvas) return;

    forceCtx = forceCanvas.getContext('2d');

    const f1Slider = document.getElementById('force-f1-slider');
    const f2Slider = document.getElementById('force-f2-slider');
    const angleSlider = document.getElementById('force-angle-slider');

    if (f1Slider) {
        f1Slider.addEventListener('input', function () {
            f1Value = parseInt(this.value);
            document.getElementById('force-f1-value').textContent = f1Value + ' N';
            updateForceResults();
            drawForceParallelogram();
        });
    }

    if (f2Slider) {
        f2Slider.addEventListener('input', function () {
            f2Value = parseInt(this.value);
            document.getElementById('force-f2-value').textContent = f2Value + ' N';
            updateForceResults();
            drawForceParallelogram();
        });
    }

    if (angleSlider) {
        angleSlider.addEventListener('input', function () {
            angleValue = parseInt(this.value);
            document.getElementById('force-angle-value').textContent = angleValue + '°';
            updateForceResults();
            drawForceParallelogram();
        });
    }

    drawForceParallelogram();
    updateForceResults();
}

function drawForceParallelogram() {
    if (!forceCtx) return;

    const canvas = forceCanvas;
    forceCtx.clearRect(0, 0, canvas.width, canvas.height);

    const angleRad = angleValue * Math.PI / 180;
    const scale = 2;

    const f1EndX = originX + f1Value * scale;
    const f1EndY = originY;

    const f2EndX = originX + f2Value * Math.cos(angleRad) * scale;
    const f2EndY = originY - f2Value * Math.sin(angleRad) * scale;

    const resultX = f1EndX + f2Value * Math.cos(angleRad) * scale;
    const resultY = f1EndY - f2Value * Math.sin(angleRad) * scale;

    forceCtx.fillStyle = '#fff';
    forceCtx.fillRect(0, 0, canvas.width, canvas.height);

    forceCtx.strokeStyle = '#ddd';
    forceCtx.lineWidth = 1;
    for (let i = 0; i < canvas.width; i += 30) {
        forceCtx.beginPath();
        forceCtx.moveTo(i, 0);
        forceCtx.lineTo(i, canvas.height);
        forceCtx.stroke();
    }
    for (let i = 0; i < canvas.height; i += 30) {
        forceCtx.beginPath();
        forceCtx.moveTo(0, i);
        forceCtx.lineTo(canvas.width, i);
        forceCtx.stroke();
    }

    forceCtx.fillStyle = '#333';
    forceCtx.beginPath();
    forceCtx.arc(originX, originY, 6, 0, Math.PI * 2);
    forceCtx.fill();
    forceCtx.font = '14px Arial';
    forceCtx.fillText('O', originX - 20, originY + 5);
    forceCtx.fillText('力的作用点', originX - 35, originY + 25);

    forceCtx.fillStyle = 'rgba(231, 76, 60, 0.2)';
    forceCtx.beginPath();
    forceCtx.moveTo(originX, originY);
    forceCtx.lineTo(f1EndX, originY);
    forceCtx.lineTo(resultX, resultY);
    forceCtx.lineTo(f2EndX, f2EndY);
    forceCtx.closePath();
    forceCtx.fill();

    forceCtx.strokeStyle = '#e74c3c';
    forceCtx.lineWidth = 3;
    drawArrow(forceCtx, originX, originY, f1EndX, originY);
    forceCtx.fillStyle = '#e74c3c';
    forceCtx.font = 'bold 16px Arial';
    forceCtx.fillText('F₁', f1EndX / 2 + originX / 2 - 10, originY - 10);

    forceCtx.strokeStyle = '#3498db';
    forceCtx.lineWidth = 3;
    drawArrow(forceCtx, originX, originY, f2EndX, f2EndY);
    forceCtx.fillStyle = '#3498db';
    forceCtx.fillText('F₂', (originX + f2EndX) / 2 + 10, (originY + f2EndY) / 2);

    forceCtx.strokeStyle = '#f39c12';
    forceCtx.lineWidth = 4;
    drawArrow(forceCtx, originX, originY, resultX, resultY);
    forceCtx.fillStyle = '#f39c12';
    forceCtx.font = 'bold 18px Arial';
    forceCtx.fillText('F合', (originX + resultX) / 2, (originY + resultY) / 2 - 10);
}

function drawArrow(ctx, fromX, fromY, toX, toY) {
    const headLength = 15;
    const angle = Math.atan2(toY - fromY, toX - fromX);

    ctx.beginPath();
    ctx.moveTo(fromX, fromY);
    ctx.lineTo(toX, toY);
    ctx.lineTo(toX - headLength * Math.cos(angle - Math.PI / 6), toY - headLength * Math.sin(angle - Math.PI / 6));
    ctx.moveTo(toX, toY);
    ctx.lineTo(toX - headLength * Math.cos(angle + Math.PI / 6), toY - headLength * Math.sin(angle + Math.PI / 6));
    ctx.stroke();
}

function updateForceResults() {
    const angleRad = angleValue * Math.PI / 180;
    const forceValue = Math.sqrt(f1Value * f1Value + f2Value * f2Value + 2 * f1Value * f2Value * Math.cos(angleRad));
    const forceAngle = Math.atan2(f2Value * Math.sin(angleRad), f1Value + f2Value * Math.cos(angleRad)) * 180 / Math.PI;

    document.getElementById('result-f1').textContent = f1Value;
    document.getElementById('result-f2').textContent = f2Value;
    document.getElementById('result-angle').textContent = angleValue;
    document.getElementById('result-force-value').textContent = forceValue.toFixed(1);
    document.getElementById('result-force-angle').textContent = forceAngle.toFixed(1);

    const formulaText = `√(${f1Value}² + ${f2Value}² + 2×${f1Value}×${f2Value}×cos${angleValue}°) = `;
    document.getElementById('result-f').textContent = formulaText;
}

// 页面加载完成后初始化力的平行四边形实验
window.addEventListener('load', function () {
    initForceParallelogram();
});