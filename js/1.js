/**
 * 像素小镇 - 第一关脚本文件
 * 包含第一关页面功能、学习中心功能和实战演练功能
 */

// ==================== 第一关页面功能 ====================

/**
 * 初始化关卡点击事件
 */
function initLevelClickEvents() {
  // 为第一关添加点击事件
  const level1 = document.querySelector('.level-item:first-child');
  if (level1) {
    level1.addEventListener('click', showLevel1Page);
  }

  // 为第二关添加点击事件
  const levelItems = document.querySelectorAll('.level-item');
  if (levelItems.length >= 2) {
    levelItems[1].addEventListener('click', showLevel2Page);
  }

  // 为第三关添加点击事件
  if (levelItems.length >= 3) {
    levelItems[2].addEventListener('click', showLevel3Page);
  }
}

/**
 * 显示第一关页面
 */
function showLevel1Page() {
  document.getElementById('mainPage').style.display = 'none';
  document.getElementById('level1Page').style.display = 'block';
}

/**
 * 关闭第一关页面
 */
function closeLevelPage() {
  document.getElementById('level1Page').style.display = 'none';
  document.getElementById('mainPage').style.display = 'block';
}

// 页面加载完成后初始化关卡点击事件
document.addEventListener('DOMContentLoaded', function () {
  initLevelClickEvents();
});

// ==================== 学习中心页面功能 ====================

/**
 * 显示学习中心页面
 */
function showLearningCenter() {
  document.getElementById('level1Page').style.display = 'none';
  document.getElementById('learningCenterPage').style.display = 'block';

  // 确保导航栏定位在“先导”上
  const navItems = document.querySelectorAll('#learningCenterPage .nav-item');
  navItems.forEach(item => item.classList.remove('active'));

  const guideNavItem = document.querySelector('#learningCenterPage .nav-item[onclick*="guide"]');
  if (guideNavItem) {
    guideNavItem.classList.add('active');
  }

  const tabContents = document.querySelectorAll('#learningCenterPage .tab-content');
  tabContents.forEach(content => content.style.display = 'none');

  const guideContent = document.getElementById('guide-content');
  if (guideContent) {
    guideContent.style.display = 'block';
  }
}

/**
 * 关闭学习中心页面
 */
function closeLearningCenter() {
  document.getElementById('learningCenterPage').style.display = 'none';
  document.getElementById('level1Page').style.display = 'block';
}

/**
 * 切换学习中心标签页
 * @param {Element} tab - 点击的标签元素
 * @param {string} tabId - 标签ID
 */
function switchLearningTab(tab, tabId) {
  // 移除所有标签的active类
  const navItems = document.querySelectorAll('.learning-nav .nav-item');
  navItems.forEach(item => item.classList.remove('active'));

  // 添加当前标签的active类
  tab.classList.add('active');

  // 隐藏所有内容
  const tabContents = document.querySelectorAll('.tab-content');
  tabContents.forEach(content => content.style.display = 'none');

  // 显示当前标签内容
  document.getElementById(tabId + '-content').style.display = 'block';

  // 如果切换到学习标签，初始化胡克定律画布
  if (tabId === 'study') {
    setTimeout(function () {
      initializeHookeCanvas();
    }, 100);
  }
}

// ==================== 学习中心功能函数 ====================

/**
 * 显示/隐藏思考问题的答案
 * @param {Element} button - 点击的按钮元素
 */
function toggleThinkingAnswer(button) {
  const answerContent = button.nextElementSibling;
  if (answerContent && answerContent.classList.contains('thinking-answer-content')) {
    answerContent.classList.toggle('show');
    button.textContent = answerContent.classList.contains('show') ? '隐藏答案' : '查看答案';
  }
}

/**
 * 打开胡克定律实验视频
 */
function openHookeVideo() {
  // 暂停背景音乐
  const bgMusic = document.getElementById('bgMusic');
  if (bgMusic) {
    bgMusic.pause();
  }

  // 设置视频源为胡克定律.mp4
  const hookeVideo = document.getElementById('hooke-video');
  if (hookeVideo) {
    const source = hookeVideo.querySelector('source');
    if (source) {
      source.src = 'vedios/胡克定律.mp4';
      hookeVideo.load();
    }
  }

  // 显示视频页面
  document.getElementById('videoPage').style.display = 'flex';
  document.getElementById('learningCenterPage').style.display = 'none';
}

// 存储视频页面的来源
let videoSourcePage = 'learningCenterPage';

function closeVideoPage() {
  // 隐藏视频页面，显示来源页面
  document.getElementById('videoPage').style.display = 'none';
  document.getElementById(videoSourcePage).style.display = 'flex';

  // 恢复背景音乐
  const bgMusic = document.getElementById('bgMusic');
  if (bgMusic) {
    bgMusic.play();
  }

  // 停止视频播放
  const video = document.getElementById('hooke-video');
  if (video) {
    video.pause();
    video.currentTime = 0;
  }

  // 重置来源页面为默认值
  videoSourcePage = 'learningCenterPage';
}

// 存储应用题上传的图片数据
let applicationQuestionImages = {
  question1: null,
  question2: null
};

// 存储当前的结果HTML
let currentPracticeResultHTML = '';

// 显示答案解析
function showPracticeAnswerExplanation() {
  // 关闭当前结果弹窗
  const resultModal = document.querySelector('.practice-result-modal');
  if (resultModal) {
    resultModal.remove();
  }

  // 第一关实战演练的答案解析
  const explanations = [
    {
      question: '（2021春•儋州校级月考）为测量一弹簧的劲度系数，某同学根据实验数据作出了该弹簧弹力与弹簧长度的关系图象如图所示，弹簧始终处于弹性限度内，则该弹簧的劲度系数为（　　）',
      explanation: '由胡克定律 F=k(l−l0)（l0为原长），图象斜率即为劲度系数k。\n由图可知：当F=0时，弹簧原长l0=0.04m；取两点(l1=0.08m,F1=4N)、(l2=0.12m,F2=8N)。\n计算斜率：\nk=Δl/ΔF=(0.12-0.08)/(8-4)=0.04/4=100N/m\n结论：劲度系数为100N/m，选项C正确。'
    },
    {
      question: '（2020秋•克拉玛依区校级期末）有一圆形的均匀薄板，若将其中央再挖掉一个小圆板成一个圆环，如图所示，下面说法正确的是（　　）',
      explanation: '重力：均匀薄板挖掉一部分后，总质量减小，由G=mg可知重力减小。\n重心：原圆形薄板和挖去的小圆板均为均匀物体，重心都在几何中心；挖去后形成的圆环仍为对称结构，其重心仍在几何中心（圆心），位置不变。\n结论：重力减小，重心位置不变，选项C正确。'
    },
    {
      question: '（2021・聊城二模）如图所示，劲度系数为 k 的轻弹簧一端系于墙上，另一端连接质量为 m 的物体 A，用相同质量的物体 B 推 A 使弹簧压缩，A、B 与水平面间的动摩擦因数分别为μ_A和μ_B且μ_A<μ_B。将 A、B 由静止释放后，A、B 向右运动一段距离后分离，则 A、B 即将分离时（）',
      explanation: '分离瞬间：A、B间弹力为0，且两者加速度a相同。\n对B：水平方向仅受摩擦力，由牛顿第二定律得 μ_B·mg=ma，即 a=μ_B·g。\n对A：水平方向受摩擦力μ_A·mg和弹簧弹力kx（因μ_B>μ_A，a=μ_B·g>μ_A·g，故弹簧对A的弹力向左，弹簧处于伸长状态），由牛顿第二定律得 μ_A·mg+kx=ma。\n联立代入a=μ_B·g：\nμ_A·mg+kx=m·μ_B·g ⇒ kx=(μ_B−μ_A)mg ⇒ x=(μ_B−μ_A)mg/k\n结论：弹簧伸长量为(μ_B−μ_A)mg/k，选项C正确'
    },
  ];
}

/**
 * 处理图片上传
 */
function handleImageUpload1(input) {
  const file = input.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function (e) {
    const imageData = e.target.result;
    applicationQuestionImages.question1 = imageData;

    // 显示上传的图片
    const uploadedImages = document.getElementById('uploaded-images-1');
    uploadedImages.innerHTML = `
      <div class="uploaded-image">
        <img src="${imageData}" alt="上传的图片" style="max-width: 100%; height: auto;">
        <button class="remove-image" onclick="removeImage(1)">×</button>
      </div>
    `;
  };
  reader.readAsDataURL(file);
}

function handleImageUpload2(input) {
  const file = input.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function (e) {
    const imageData = e.target.result;
    applicationQuestionImages.question2 = imageData;

    // 显示上传的图片
    const uploadedImages = document.getElementById('uploaded-images-2');
    uploadedImages.innerHTML = `
      <div class="uploaded-image">
        <img src="${imageData}" alt="上传的图片" style="max-width: 100%; height: auto;">
        <button class="remove-image" onclick="removeImage(2)">×</button>
      </div>
    `;
  };
  reader.readAsDataURL(file);
}

/**
 * 移除上传的图片
 */
function removeImage(questionNum) {
  if (questionNum === 1) {
    applicationQuestionImages.question1 = null;
    document.getElementById('uploaded-images-1').innerHTML = '';
  } else if (questionNum === 2) {
    applicationQuestionImages.question2 = null;
    document.getElementById('uploaded-images-2').innerHTML = '';
  }
}

/**
 * 提交实战演练答案
 */
// 提交第一关实战演练答案
function submitPractice() {
  // 收集用户答案
  const practiceAnswers = {
    choice1: document.querySelector('input[name="test-q1"]:checked')?.value,
    choice2: document.querySelector('input[name="test-q2"]:checked')?.value,
    choice3: document.querySelector('input[name="test-q3"]:checked')?.value,
    fill1: document.getElementById('fill-q1')?.value,
    fill2: document.getElementById('fill-q2')?.value,
    fill3: document.getElementById('fill-q3')?.value,
    // 收集应用题答题情况（是否上传了图片）
    app1: document.getElementById('uploaded-images-1')?.children.length > 0,
    app2: document.getElementById('uploaded-images-2')?.children.length > 0
  };

  // 显示答题结果
  const practiceContent = document.querySelector('#practicePage .practice-content');
  if (practiceContent) {
    practiceContent.innerHTML = '';
    showPracticeResults(practiceAnswers);
  }
}

// 存储当前实战演练答案
let currentPracticeAnswers = {};

// 显示实战演练结果
function showPracticeResults(answers) {
  currentPracticeAnswers = answers;

  let correctCount = 0;
  let totalQuestions = 8; // 3选择 + 3填空 + 2应用
  let score = 0;

  // 正确答案
  const correctAnswers = {
    choice1: 'c',
    choice2: 'c',
    choice3: 'c',
    fill1: 'μN',
    fill2: 'N/m',
    fill3: '8.33'
  };

  // 分值设置
  const choiceScore = 10;
  const fillScore = 10;
  const appScore = 20;

  // 构建结果HTML
  let resultHTML = `
        <div class="test-result">
            <div class="test-result-header">
                <h3>答题结果</h3>
            </div>
    `;

  // 选择题结果
  for (let i = 1; i <= 3; i++) {
    const userAnswer = answers[`choice${i}`];
    const correctAnswer = correctAnswers[`choice${i}`];
    const isCorrect = userAnswer === correctAnswer;

    if (isCorrect) {
      correctCount++;
      score += choiceScore;
    } else {
      trackQuestionResult('level1', 'choice', i, false);
    }

    resultHTML += `
            <div class="test-result-item ${isCorrect ? 'correct' : 'incorrect'}">
                <p><strong>选择题${i}：</strong>${isCorrect ? '✅ 正确' : '❌ 错误'}</p>
                <p><strong>你的答案：</strong>${userAnswer || '未作答'}</p>
                <p><strong>正确答案：</strong>${correctAnswer.toUpperCase()}</p>
            </div>
    `;
  }

  // 填空题结果
  for (let i = 1; i <= 3; i++) {
    const userAnswer = answers[`fill${i}`]?.trim() || '';
    const correctAnswer = correctAnswers[`fill${i}`];
    const isCorrect = userAnswer.toLowerCase().includes(correctAnswer.toLowerCase());

    if (isCorrect) {
      correctCount++;
      score += fillScore;
    } else {
      trackQuestionResult('level1', 'fill', i, false);
    }

    resultHTML += `
            <div class="test-result-item ${isCorrect ? 'correct' : 'incorrect'}">
                <p><strong>填空题${i}：</strong>${isCorrect ? '✅ 正确' : '❌ 错误'}</p>
                <p><strong>你的答案：</strong>${userAnswer || '未作答'}</p>
                <p><strong>正确答案：</strong>${correctAnswer}</p>
            </div>
        `;
  }

  // 应用题结果
  for (let i = 1; i <= 2; i++) {
    const isSubmitted = answers[`app${i}`];

    resultHTML += `
            <div class="test-result-item pending">
                <p><strong>应用题${i}：</strong>${isSubmitted ? '📋 已上传图片（待批改）' : '📋 未上传图片'}</p>
                <p><strong>状态：</strong>${isSubmitted ? '已提交' : '未提交'}</p>
            </div>
        `;

    if (isSubmitted) {
      score += appScore;
    }
  }

  // 总分
  resultHTML += `
        <div class="test-score">
            <h4>总分：${score}分</h4>
            <p>正确率：${Math.round((correctCount / 6) * 100)}%</p>
        </div>
        
        <div class="test-result-buttons">
            <button class="test-result-button" onclick="showPracticeExplanations()">答案解析</button>
            <button class="test-result-button" onclick="redoPractice()">返回重做</button>
        </div>
    `;

  resultHTML += '</div>';

  // 显示结果
  const practiceContent = document.querySelector('#practicePage .practice-content');
  if (practiceContent) {
    practiceContent.innerHTML = resultHTML;
  }
}

// 显示实战演练答案解析
function showPracticeExplanations() {
  // 构建解析HTML
  let explanationHTML = `
        <div class="test-result">
            <div class="test-result-header">
                <button class="test-result-back-button" onclick="showPracticeResults(currentPracticeAnswers)">返回</button>
                <h3>答案解析</h3>
            </div>
    `;

  // 选择题解析
  explanationHTML += `
        <div class="test-result-item">
            <p><strong>选择题1：</strong>（2021春•儋州校级月考）为测量一弹簧的劲度系数，某同学根据实验数据作出了该弹簧弹力与弹簧长度的关系图象如图所示，弹簧始终处于弹性限度内，则该弹簧的劲度系数为（　　）</p>
            <img src="images/test/第一关/第一关选择1.png" alt="弹簧弹力与长度关系图" style="max-width: 100%; height: auto; margin: 10px 0;">
            <p><strong>答案：</strong>C. 100N/m</p>
            <p><strong>解析：</strong>由胡克定律 F=k(l−l0)（l0为原长），图象斜率即为劲度系数k。由图可知：当F=0时，弹簧原长l0=0.04m；取两点(l1=0.08m,F1=4N)、(l2=0.12m,F2=8N)。计算斜率：k=ΔF/Δl=(8-4)/(0.12-0.08)=4/0.04=100N/m。结论：劲度系数为100N/m，选项C正确。</p>
        </div>
        
        <div class="test-result-item">
            <p><strong>选择题2：</strong>（2020秋•克拉玛依区校级期末）有一圆形的均匀薄板，若将其中央再挖掉一个小圆板成一个圆环，如图所示，下面说法正确的是（　　）</p>
            <img src="images/test/第一关/第一关选择2.png" alt="圆环示意图" style="max-width: 100%; height: auto; margin: 10px 0;">
            <p><strong>答案：</strong>C. 重力减小，重心位置没有变</p>
            <p><strong>解析：</strong>重力：均匀薄板挖掉一部分后，总质量减小，由G=mg可知重力减小。重心：原圆形薄板和挖去的小圆板均为均匀物体，重心都在几何中心；挖去后形成的圆环仍为对称结构，其重心仍在几何中心（圆心），位置不变。结论：重力减小，重心位置不变，选项C正确。</p>
        </div>
        
        <div class="test-result-item">
            <p><strong>选择题3：</strong>（2021・聊城二模）如图所示，劲度系数为 k 的轻弹簧一端系于墙上，另一端连接质量为 m 的物体 A，用相同质量的物体 B 推 A 使弹簧压缩，A、B 与水平面间的动摩擦因数分别为μ_A和μ_B且μ_A<μ_B。将 A、B 由静止释放后，A、B 向右运动一段距离后分离，则 A、B 即将分离时（）</p>
            <img src="images/test/第一关/第一关选择题3.png" alt="弹簧分离问题示意图" style="max-width: 100%; height: auto; margin: 10px 0;">
            <p><strong>答案：</strong>C. 弹簧的伸长量为(μ_B−μ_A)mg/k</p>
            <p><strong>解析：</strong>分离瞬间：A、B间弹力为0，且两者加速度a相同。对B：水平方向仅受摩擦力，由牛顿第二定律得 μ_B·mg=ma，即 a=μ_B·g。对A：水平方向受摩擦力μ_A·mg和弹簧弹力kx（因μ_B>μ_A，a=μ_B·g>μ_A·g，故弹簧对A的弹力向左，弹簧处于伸长状态），由牛顿第二定律得 μ_A·mg+kx=ma。联立代入a=μ_B·g：μ_A·mg+kx=m·μ_B·g ⇒ kx=(μ_B−μ_A)mg ⇒ x=(μ_B−μ_A)mg/k。结论：弹簧伸长量为(μ_B−μ_A)mg/k，选项C正确。</p>
        </div>
    `;

  // 填空题解析
  explanationHTML += `
        <div class="test-result-item">
            <p><strong>填空题1：</strong>滑动摩擦力的大小公式为______，方向与物体______方向相反。</p>
            <p><strong>答案：</strong>μN；相对运动</p>
        </div>
        
        <div class="test-result-item">
            <p><strong>填空题2：</strong>弹簧劲度系数k的单位是______，它反映了弹簧的______特性。</p>
            <p><strong>答案：</strong>N/m；软硬（或弹性）</p>
        </div>
        
        <div class="test-result-item">
            <p><strong>填空题3：</strong>质量为5 kg的物体，在月球表面所受重力约为地球表面的1/6，则它在月球表面所受重力大小为______ N。（g地取10 m/s²）</p>
            <p><strong>答案：</strong>8.33 或 25/3</p>
            <p><strong>解析：</strong>地球表面重力G地=mg=5×10=50N，月球表面重力G月=G地/6=50/6≈8.33N。</p>
        </div>
    `;

  // 应用题解析
  explanationHTML += `
        <div class="test-result-item">
            <p><strong>应用题1：</strong>物体 A 质量为 4 kg，放在倾角为 30° 的斜面上，A 与斜面间的动摩擦因数为 0.5。用平行于斜面的力 F 向上拉 A，使 A 沿斜面匀速上升。求力 F 的大小。（g 取 10 m/s²）</p>
`;

  explanationHTML += '</div>';

  // 显示解析
  const practiceContent = document.querySelector('#practicePage .practice-content');
  if (practiceContent) {
    practiceContent.innerHTML = explanationHTML;
  }
}

// 重做实战演练
function redoPractice() {
  const practiceContent = document.querySelector('#practicePage .practice-content');
  if (practiceContent) {
    practiceContent.innerHTML = '';
    loadPracticeContent();
  }
}

// 加载实战演练内容
function loadPracticeContent() {
  // 重置答案存储
  applicationQuestionImages = {
    question1: null,
    question2: null
  };

  // 重置上传图片显示
  const uploadedImages1 = document.getElementById('uploaded-images-1');
  const uploadedImages2 = document.getElementById('uploaded-images-2');
  if (uploadedImages1) uploadedImages1.innerHTML = '';
  if (uploadedImages2) uploadedImages2.innerHTML = '';

  // 重置表单元素
  const radioInputs = document.querySelectorAll('input[type="radio"][name^="test-q"]');
  radioInputs.forEach(input => input.checked = false);

  const textInputs = document.querySelectorAll('input[type="text"][id^="fill-q"]');
  textInputs.forEach(input => input.value = '');
}

// 提交实战演练答案
function submitPractice() {
  // 收集用户答案
  const practiceAnswers = {
    choice1: document.querySelector('input[name="test-q1"]:checked')?.value,
    choice2: document.querySelector('input[name="test-q2"]:checked')?.value,
    choice3: document.querySelector('input[name="test-q3"]:checked')?.value,
    fill1: document.getElementById('fill-q1')?.value,
    fill2: document.getElementById('fill-q2')?.value,
    fill3: document.getElementById('fill-q3')?.value,
    // 收集应用题答题情况（是否上传了图片）
    app1: document.getElementById('uploaded-images-1')?.children.length > 0,
    app2: document.getElementById('uploaded-images-2')?.children.length > 0
  };

  // 显示答题结果
  showPracticeResults(practiceAnswers);
}

// 显示实战演练结果
function showPracticeResults(answers) {
  currentPracticeAnswers = answers;

  let correctCount = 0;
  let totalQuestions = 8; // 3选择 + 3填空 + 2应用
  let score = 0;

  // 正确答案
  const correctAnswers = {
    choice1: 'c',
    choice2: 'c',
    choice3: 'c',
    fill1: 'μN',
    fill2: 'N/m',
    fill3: '8.33'
  };

  // 分值设置
  const choiceScore = 10;
  const fillScore = 10;
  const appScore = 20;

  // 构建结果HTML
  let resultHTML = `
        <div class="test-result">
            <div class="test-result-header">
                <h3>答题结果</h3>

            </div>
    `;

  // 选择题结果
  for (let i = 1; i <= 3; i++) {
    const userAnswer = answers[`choice${i}`];
    const correctAnswer = correctAnswers[`choice${i}`];
    const isCorrect = userAnswer === correctAnswer;

    if (isCorrect) {
      correctCount++;
      score += choiceScore;
    }

    resultHTML += `
            <div class="test-result-item ${isCorrect ? 'correct' : 'incorrect'}">
                <p><strong>选择题${i}：</strong>${isCorrect ? '✅ 正确' : '❌ 错误'}</p>
                <p><strong>你的答案：</strong>${userAnswer || '未作答'}</p>
                <p><strong>正确答案：</strong>${correctAnswer.toUpperCase()}</p>
            </div>
        `;
  }

  // 填空题结果
  for (let i = 1; i <= 3; i++) {
    const userAnswer = answers[`fill${i}`]?.trim() || '';
    const correctAnswer = correctAnswers[`fill${i}`];
    const isCorrect = userAnswer.toLowerCase().includes(correctAnswer.toLowerCase());

    if (isCorrect) {
      correctCount++;
      score += fillScore;
    }

    resultHTML += `
            <div class="test-result-item ${isCorrect ? 'correct' : 'incorrect'}">
                <p><strong>填空题${i}：</strong>${isCorrect ? '✅ 正确' : '❌ 错误'}</p>
                <p><strong>你的答案：</strong>${userAnswer || '未作答'}</p>
                <p><strong>正确答案：</strong>${correctAnswer}</p>
            </div>
        `;
  }

  // 应用题结果
  for (let i = 1; i <= 2; i++) {
    const isSubmitted = answers[`app${i}`];

    resultHTML += `
            <div class="test-result-item pending">
                <p><strong>应用题${i}：</strong>${isSubmitted ? '📋 已上传图片（待批改）' : '📋 未上传图片'}</p>
                <p><strong>状态：</strong>${isSubmitted ? '已提交' : '未提交'}</p>
            </div>
        `;

    if (isSubmitted) {
      score += appScore;
    }
  }

  // 总分
  resultHTML += `
        <div class="test-score">
            <h4>总分：${score}分</h4>
            <p>正确率：${Math.round((correctCount / 6) * 100)}%</p>
        </div>
        
        <div class="test-result-buttons">
            <button class="test-result-button" onclick="showPracticeExplanations()">答案解析</button>
            <button class="test-result-button" onclick="redoPractice()">返回重做</button>
        </div>
    `;

  resultHTML += '</div>';

  // 显示结果
  const practiceContent = document.querySelector('#practicePage .practice-content');
  if (practiceContent) {
    practiceContent.innerHTML = resultHTML;
  }
}

// 显示实战演练答案解析
function showPracticeExplanations() {
  // 构建解析HTML
  let explanationHTML = `
        <div class="test-result">
            <div class="test-result-header">
                <button class="test-result-back-button" onclick="showPracticeResults(currentPracticeAnswers)">返回</button>
                <h3>答案解析</h3>
            </div>
    `;

  // 选择题解析
  explanationHTML += `
        <div class="test-result-item">
            <p><strong>选择题1：</strong>（2021春•儋州校级月考）为测量一弹簧的劲度系数，某同学根据实验数据作出了该弹簧弹力与弹簧长度的关系图象如图所示，弹簧始终处于弹性限度内，则该弹簧的劲度系数为（　　）</p>
            <img src="images/test/第一关/第一关选择1.png" alt="弹簧弹力与长度关系图" style="max-width: 100%; height: auto; margin: 10px 0;">
            <p><strong>答案：</strong>C. 100N/m</p>
            <p><strong>解析：</strong>由胡克定律 F=k(l−l0)（l0为原长），图象斜率即为劲度系数k。由图可知：当F=0时，弹簧原长l0=0.04m；取两点(l1=0.08m,F1=4N)、(l2=0.12m,F2=8N)。计算斜率：k=ΔF/Δl=(8-4)/(0.12-0.08)=4/0.04=100N/m。结论：劲度系数为100N/m，选项C正确。</p>
        </div>
        
        <div class="test-result-item">
            <p><strong>选择题2：</strong>（2020秋•克拉玛依区校级期末）有一圆形的均匀薄板，若将其中央再挖掉一个小圆板成一个圆环，如图所示，下面说法正确的是（　　）</p>
            <img src="images/test/第一关/第一关选择2.png" alt="圆环示意图" style="max-width: 100%; height: auto; margin: 10px 0;">
            <p><strong>答案：</strong>C. 重力减小，重心位置没有变</p>
            <p><strong>解析：</strong>重力：均匀薄板挖掉一部分后，总质量减小，由G=mg可知重力减小。重心：原圆形薄板和挖去的小圆板均为均匀物体，重心都在几何中心；挖去后形成的圆环仍为对称结构，其重心仍在几何中心（圆心），位置不变。结论：重力减小，重心位置不变，选项C正确。</p>
        </div>
        
        <div class="test-result-item">
            <p><strong>选择题3：</strong>（2021・聊城二模）如图所示，劲度系数为 k 的轻弹簧一端系于墙上，另一端连接质量为 m 的物体 A，用相同质量的物体 B 推 A 使弹簧压缩，A、B 与水平面间的动摩擦因数分别为μ_A和μ_B且μ_A<μ_B。将 A、B 由静止释放后，A、B 向右运动一段距离后分离，则 A、B 即将分离时（）</p>
            <img src="images/test/第一关/第一关选择题3.png" alt="弹簧分离问题示意图" style="max-width: 100%; height: auto; margin: 10px 0;">
            <p><strong>答案：</strong>C. 弹簧的伸长量为(μ_B−μ_A)mg/k</p>
            <p><strong>解析：</strong>分离瞬间：A、B间弹力为0，且两者加速度a相同。对B：水平方向仅受摩擦力，由牛顿第二定律得 μ_B·mg=ma，即 a=μ_B·g。对A：水平方向受摩擦力μ_A·mg和弹簧弹力kx（因μ_B>μ_A，a=μ_B·g>μ_A·g，故弹簧对A的弹力向左，弹簧处于伸长状态），由牛顿第二定律得 μ_A·mg+kx=ma。联立代入a=μ_B·g：μ_A·mg+kx=m·μ_B·g ⇒ kx=(μ_B−μ_A)mg ⇒ x=(μ_B−μ_A)mg/k。结论：弹簧伸长量为(μ_B−μ_A)mg/k，选项C正确。</p>
        </div>
    `;

  // 填空题解析
  explanationHTML += `
        <div class="test-result-item">
            <p><strong>填空题1：</strong>滑动摩擦力的大小公式为______，方向与物体______方向相反。</p>
            <p><strong>答案：</strong>μN；相对运动</p>
        </div>
        
        <div class="test-result-item">
            <p><strong>填空题2：</strong>弹簧劲度系数k的单位是______，它反映了弹簧的______特性。</p>
            <p><strong>答案：</strong>N/m；软硬（或弹性）</p>
        </div>
        
        <div class="test-result-item">
            <p><strong>填空题3：</strong>质量为5 kg的物体，在月球表面所受重力约为地球表面的1/6，则它在月球表面所受重力大小为______ N。（g地取10 m/s²）</p>
            <p><strong>答案：</strong>8.33 或 25/3</p>
            <p><strong>解析：</strong>地球表面重力G地=mg=5×10=50N，月球表面重力G月=G地/6=50/6≈8.33N。</p>
        </div>
    `;

  // 应用题解析
  explanationHTML += `
        <div class="test-result-item">
            <p><strong>应用题1：</strong>物体 A 质量为 4 kg，放在倾角为 30° 的斜面上，A 与斜面间的动摩擦因数为 0.5。用平行于斜面的力 F 向上拉 A，使 A 沿斜面匀速上升。求力 F 的大小。（g 取 10 m/s²）</p>
        </div>
    `;

  explanationHTML += `
            <div class="test-result-buttons" style="justify-content: center;">
                <button class="test-result-button" onclick="redoPractice()">返回重做</button>
            </div>
        </div>
    `;

  // 显示解析
  const practiceContent = document.querySelector('#practicePage .practice-content');
  if (practiceContent) {
    practiceContent.innerHTML = explanationHTML;
  }
}

// 重做实战演练
function redoPractice() {
  // 重置存储的答案
  currentPracticeAnswers = null;
  currentChoiceFillScore = 0;

  // 确保导航栏定位在"选择"上
  const navItems = document.querySelectorAll('#practicePage .practice-nav-item');
  navItems.forEach(item => item.classList.remove('active'));

  const choiceNavItem = document.querySelector('#practicePage .practice-nav-item[onclick*="choice"]');
  if (choiceNavItem) {
    choiceNavItem.classList.add('active');
  }

  const tabContents = document.querySelectorAll('#practicePage .practice-tab-content');
  tabContents.forEach(content => content.style.display = 'none');

  const choiceContent = document.getElementById('choice-content');
  if (choiceContent) {
    choiceContent.style.display = 'block';
  }

  // 重新加载实战演练内容
  loadPracticeContent();

  // 重新加载实战演练页面的原始内容
  const practiceContent = document.querySelector('#practicePage .practice-content');
  if (practiceContent) {
    // 重新加载原始的标签页结构
    practiceContent.innerHTML = `
      <!-- 选择题内容 -->
      <div id="choice-content" class="practice-tab-content active">
        <h3>选择题</h3>
        <p>请完成以下选择题。</p>
        <div class="practice-question">
          <p><strong>问题1：</strong>（2021春•儋州校级月考）为测量一弹簧的劲度系数，某同学根据实验数据作出了该弹簧弹力与弹簧长度的关系图象如图所示，弹簧始终处于弹性限度内，则该弹簧的劲度系数为（　　）
          </p>
          <div class="question-image">
            <img src="images/test/第一关/第一关选择1.png" alt="弹簧弹力与长度关系图"
              style="max-width: 100%; height: auto; margin: 10px 0;">
          </div>
          <div class="practice-options">
            <label><input type="radio" name="test-q1" value="a"> A．50N/m</label>
            <label><input type="radio" name="test-q1" value="b"> B．200/3N/m</label>
            <label><input type="radio" name="test-q1" value="c"> C．100N/m</label>
            <label><input type="radio" name="test-q1" value="d"> D．200N/m</label>
          </div>
        </div>

        <div class="practice-question">
          <p><strong>问题2：</strong>（2020秋•克拉玛依区校级期末）有一圆形的均匀薄板，若将其中央再挖掉一个小圆板成一个圆环，如图所示，下面说法正确的是（　　）</p>
          <div class="question-image">
            <img src="images/test/第一关/第一关选择2.png" alt="圆环示意图"
              style="max-width: 100%; height: auto; margin: 10px 0;">
          </div>
          <div class="practice-options">
            <label><input type="radio" name="test-q2" value="a"> A．重心向外侧偏移，重力减小</label>
            <label><input type="radio" name="test-q2" value="b"> B．重力和重心都没有变</label>
            <label><input type="radio" name="test-q2" value="c"> C．重力减小，重心位置没有变</label>
            <label><input type="radio" name="test-q2" value="d"> D．重力减小，重心位置不存在</label>
          </div>
        </div>

        <div class="practice-question">
          <p><strong>问题3：</strong>（2021・聊城二模）如图所示，劲度系数为 k 的轻弹簧一端系于墙上，另一端连接质量为 m 的物体 A，用相同质量的物体 B 推 A
            使弹簧压缩，A、B 与水平面间的动摩擦因数分别为μ<sub>A</sub>和μ<sub>B</sub>且μ<sub>A</sub>
            <μ<sub>B</sub>。将 A、B 由静止释放后，A、B 向右运动一段距离后分离，则 A、B 即将分离时（）
          </p>
          <div class="question-image">
            <img src="images/test/第一关/第一关选择题3.png" alt="弹簧分离问题示意图"
              style="max-width: 100%; height: auto; margin: 10px 0;">
          </div>
          <div class="practice-options">
            <label><input type="radio" name="test-q3" value="a"> A. 弹簧形变量为零</label>
            <label><input type="radio" name="test-q3" value="b"> B.
              弹簧的压缩量为(μ<sub>B</sub>−μ<sub>A</sub>)mg/k</label>
            <label><input type="radio" name="test-q3" value="c"> C.
              弹簧的伸长量为(μ<sub>B</sub>−μ<sub>A</sub>)mg/k</label>
            <label><input type="radio" name="test-q3" value="d"> D.
              弹簧的压缩量为(μ<sub>A</sub>+μ<sub>B</sub>)mg/k</label>
          </div>
        </div>
      </div>

      <!-- 填空题内容 -->
      <div id="fill-content" class="practice-tab-content" style="display: none;">
        <h3>填空题</h3>
        <p>请完成以下填空题。</p>
        <div class="practice-question">
          <p><strong>问题1：</strong>滑动摩擦力的大小公式为______，方向与物体______方向相反。</p>
          <input type="text" class="practice-input" placeholder="请输入答案" id="fill-q1">
        </div>

        <div class="practice-question">
          <p><strong>问题2：</strong>弹簧劲度系数k的单位是______，它反映了弹簧的______特性。</p>
          <input type="text" class="practice-input" placeholder="请输入答案" id="fill-q2">
        </div>

        <div class="practice-question">
          <p><strong>问题3：</strong>质量为5 kg的物体，在月球表面所受重力约为地球表面的1/6，则它在月球表面所受重力大小为______ N。（g地取10 m/s²）</p>
          <input type="text" class="practice-input" placeholder="请输入答案" id="fill-q3">
        </div>
      </div>

      <!-- 应用题内容 -->
      <div id="application-content" class="practice-tab-content" style="display: none;">
        <h3>应用题</h3>
        <p>请完成以下应用题，上传解题过程图片。</p>
        <div class="practice-question">
          <p><strong>问题1：</strong>物体 A 质量为 4 kg，放在倾角为 30° 的斜面上，A 与斜面间的动摩擦因数为 0.5。用平行于斜面的力 F 向上拉 A，使 A
            沿斜面匀速上升。求力 F 的大小。（g 取 10 m/s²）</p>
          <img src="images/test/第一关/第一关应用题1.png" alt="斜面拉力示意图"
            style="max-width: 40%; height: auto; margin: 10px 0;">
          <div class="image-upload-container">
            <div class="upload-area" id="upload-area-1"
              onclick="document.getElementById('file-input-1').click()">
              <div class="upload-icon">📷</div>
              <div class="upload-text">点击或拖拽上传图片</div>
              <div class="upload-hint">支持 JPG、PNG 格式</div>
            </div>
            <input type="file" id="file-input-1" class="file-input" accept="image/*"
              onchange="handleImageUpload1(this)" style="display: none;">
            <div class="uploaded-images" id="uploaded-images-1"></div>
          </div>
        </div>

        <!-- 提交答案按钮 -->
        <div class="practice-footer">
          <button class="practice-submit" onclick="submitPractice()">提交答案</button>
        </div>
      </div>
    `;
  }
}

// 关闭实战演练结果
function closePracticeResult() {
  // 重置标签页显示
  const navItems = document.querySelectorAll('.practice-nav .practice-nav-item');
  navItems.forEach((item, index) => {
    item.classList.remove('active');
    if (index === 0) item.classList.add('active');
  });

  const tabContents = document.querySelectorAll('.practice-tab-content');
  tabContents.forEach((content, index) => {
    content.style.display = index === 0 ? 'block' : 'none';
  });

  // 重置内容
  loadPracticeContent();
}

// 切换实战演练标签页
function switchPracticeTab(tab, tabId) {
  // 移除所有标签的active类
  const navItems = document.querySelectorAll('.practice-nav .practice-nav-item');
  navItems.forEach(item => item.classList.remove('active'));

  // 添加当前标签的active类
  tab.classList.add('active');

  // 隐藏所有内容
  const tabContents = document.querySelectorAll('.practice-tab-content');
  tabContents.forEach(content => content.style.display = 'none');

  // 显示当前标签内容
  document.getElementById(tabId + '-content').style.display = 'block';
}

// 打开实战演练页面
function openPracticePage() {
  document.getElementById('level1Page').style.display = 'none';
  document.getElementById('practicePage').style.display = 'block';

  // 确保导航栏定位在“选择”上
  const navItems = document.querySelectorAll('#practicePage .practice-nav-item');
  navItems.forEach(item => item.classList.remove('active'));

  const choiceNavItem = document.querySelector('#practicePage .practice-nav-item[onclick*="choice"]');
  if (choiceNavItem) {
    choiceNavItem.classList.add('active');
  }

  const tabContents = document.querySelectorAll('#practicePage .practice-tab-content');
  tabContents.forEach(content => content.style.display = 'none');

  const choiceContent = document.getElementById('choice-content');
  if (choiceContent) {
    choiceContent.style.display = 'block';
  }

  // 不需要调用loadPracticeContent，因为HTML中已经有完整的标签页结构
}

// 关闭实战演练页面
function closePracticePage() {
  document.getElementById('practicePage').style.display = 'none';
  document.getElementById('level1Page').style.display = 'block';
}

// ==================== 学习中心当堂检测功能 ====================

/**
 * 提交当堂检测答案
 */
function submitTest() {
  // 第一关的答案
  const answers = [
    { question: '关于弹力的产生条件，下列说法正确的是（ ）', answer: 'c' },
    { question: '关于摩擦力，下列说法正确的是（ ）', answer: 'c' },
    { question: '一根弹簧原长10cm，在弹性限度内，当挂上5N的物体时，弹簧长度变为12cm。求弹簧的劲度系数k。', answer: '250' },
    { question: '质量为2kg的物体静止在水平地面上，物体与地面间的动摩擦因数为0.3。用水平力F拉动物体，使其匀速运动，求拉力F的大小。（g取10m/s²）', answer: '6' },
    { question: '关于重心，下列说法正确的是（ ）', answer: 'c' }
  ];

  let correctCount = 0;
  let totalQuestions = answers.length;
  let resultHTML = '<div class="test-result"><h3>答题结果</h3>';

  answers.forEach((item, index) => {
    const qNum = index + 1;
    let userAnswer;

    // 根据问题类型获取用户答案
    if (qNum === 3 || qNum === 4) {
      // 填空题
      const inputElement = document.getElementById(`q${qNum}`);
      userAnswer = inputElement ? inputElement.value.trim() : '';
    } else {
      // 选择题
      const radioElements = document.getElementsByName(`q${qNum}`);
      for (const radio of radioElements) {
        if (radio.checked) {
          userAnswer = radio.value;
          break;
        }
      }
    }

    // 判断答案是否正确
    const isCorrect = userAnswer === item.answer;
    if (isCorrect) {
      correctCount++;
    }

    // 生成结果HTML
    resultHTML += `
      <div class="test-result-item ${isCorrect ? 'correct' : 'incorrect'}">
        <p><strong>问题${qNum}：</strong>${isCorrect ? '✅ 正确' : '❌ 错误'}</p>
        <p><strong>你的答案：</strong>${userAnswer || '未作答'}</p>
        <p><strong>正确答案：</strong>${item.answer.toUpperCase()}</p>
      </div>
    `;
  });

  // 计算得分
  const score = Math.round((correctCount / totalQuestions) * 100);
  resultHTML += `
    <div class="test-score">
      <h4>得分：${score}分</h4>
      <p>共${totalQuestions}题，正确${correctCount}题，错误${totalQuestions - correctCount}题</p>
    </div>

    <div class="test-result-buttons">
      <button class="test-result-button" onclick="showAnswerExplanations()">答案解析</button>
      <button class="test-result-button" onclick="redoTest()">返回重做</button>
    </div>
  `;

  resultHTML += '</div>';

  // 显示结果
  const testContent = document.getElementById('test-content');
  if (testContent) {
    testContent.innerHTML = resultHTML;
  }
}

/**
 * 显示答案解析
 */
function showAnswerExplanations() {
  const explanations = [
    {
      question: '关于弹力的产生条件，下列说法正确的是（ ）',
      explanation: '弹力产生的条件是两物体直接接触且发生弹性形变。选项A缺少弹性形变，选项B缺少直接接触，选项D弹力方向与形变方向相反，因此正确答案是C。'
    },
    {
      question: '关于摩擦力，下列说法正确的是（ ）',
      explanation: '滑动摩擦力方向与相对运动方向相反，静摩擦力大小与外力有关，摩擦力可以是动力（如行走）也可以是阻力，因此正确答案是C。'
    },
    {
      question: '一根弹簧原长10cm，在弹性限度内，当挂上5N的物体时，弹簧长度变为12cm。求弹簧的劲度系数k。',
      explanation: '根据胡克定律F=kx，其中x是形变量。x=12cm-10cm=2cm=0.02m，F=5N，所以k=F/x=5/0.02=250N/m。'
    },
    {
      question: '质量为2kg的物体静止在水平地面上，物体与地面间的动摩擦因数为0.3。用水平力F拉动物体，使其匀速运动，求拉力F的大小。（g取10m/s²）',
      explanation: '匀速运动时，拉力等于滑动摩擦力。滑动摩擦力f=μN=μmg=0.3×2×10=6N，因此F=6N。'
    },
    {
      question: '关于重心，下列说法正确的是（ ）',
      explanation: '重心是物体各部分所受重力的等效作用点，不一定在物体上（如圆环），形状规则的物体重心在几何中心的前提是质量分布均匀，重心位置与质量分布有关，因此正确答案是C。'
    }
  ];

  let explanationHTML = '<div class="test-result">';
  explanationHTML += '<div class="test-result-header">';
  explanationHTML += '<button class="test-result-back-button" onclick="showTestResultFromAnswerExplanation()">返回</button>';
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
      <button class="test-result-button" onclick="redoTest()">返回重做</button>
    </div>
  `;

  explanationHTML += '</div>';

  // 显示解析
  const testContent = document.getElementById('test-content');
  if (testContent) {
    testContent.innerHTML = explanationHTML;
  }
}

/**
 * 从答案解析返回答题结果
 */
function showTestResultFromAnswerExplanation() {
  // 第一关的答案
  const answers = [
    { question: '关于弹力的产生条件，下列说法正确的是（ ）', answer: 'c' },
    { question: '关于摩擦力，下列说法正确的是（ ）', answer: 'c' },
    { question: '一根弹簧原长10cm，在弹性限度内，当挂上5N的物体时，弹簧长度变为12cm。求弹簧的劲度系数k。', answer: '250' },
    { question: '质量为2kg的物体静止在水平地面上，物体与地面间的动摩擦因数为0.3。用水平力F拉动物体，使其匀速运动，求拉力F的大小。（g取10m/s²）', answer: '6' },
    { question: '关于重心，下列说法正确的是（ ）', answer: 'c' }
  ];

  let correctCount = 0;
  let totalQuestions = answers.length;
  let resultHTML = '<div class="test-result"><h3>答题结果</h3>';

  answers.forEach((item, index) => {
    const qNum = index + 1;
    let userAnswer;

    // 根据问题类型获取用户答案
    if (qNum === 3 || qNum === 4) {
      // 填空题
      const inputElement = document.getElementById(`q${qNum}`);
      userAnswer = inputElement ? inputElement.value.trim() : '';
    } else {
      // 选择题
      const radioElements = document.getElementsByName(`q${qNum}`);
      for (const radio of radioElements) {
        if (radio.checked) {
          userAnswer = radio.value;
          break;
        }
      }
    }

    // 判断答案是否正确
    const isCorrect = userAnswer === item.answer;
    if (isCorrect) {
      correctCount++;
    }

    // 生成结果HTML
    resultHTML += `
      <div class="test-result-item ${isCorrect ? 'correct' : 'incorrect'}">
        <p><strong>问题${qNum}：</strong>${isCorrect ? '✅ 正确' : '❌ 错误'}</p>
        <p><strong>你的答案：</strong>${userAnswer || '未作答'}</p>
        <p><strong>正确答案：</strong>${item.answer.toUpperCase()}</p>
      </div>
    `;
  });

  // 计算得分
  const score = Math.round((correctCount / totalQuestions) * 100);
  resultHTML += `
    <div class="test-score">
      <h4>得分：${score}分</h4>
      <p>共${totalQuestions}题，正确${correctCount}题，错误${totalQuestions - correctCount}题</p>
    </div>

    <div class="test-result-buttons">
      <button class="test-result-button" onclick="showAnswerExplanations()">答案解析</button>
      <button class="test-result-button" onclick="redoTest()">返回重做</button>
    </div>
  `;

  resultHTML += '</div>';

  // 显示结果
  const testContent = document.getElementById('test-content');
  if (testContent) {
    testContent.innerHTML = resultHTML;
  }
}

/**
 * 重新做测试
 */
function redoTest() {
  // 重置表单元素
  const radioInputs = document.querySelectorAll('input[type="radio"][name^="q"]');
  radioInputs.forEach(input => input.checked = false);

  const textInputs = document.querySelectorAll('input[type="text"][id^="q"]');
  textInputs.forEach(input => input.value = '');

  // 恢复原始测试内容
  const testContent = document.getElementById('test-content');
  if (testContent) {
    // 重新加载测试内容
    testContent.innerHTML = `
      <div class="learning-section">
        <h3>当堂检测</h3>
        <p>完成以下测试，检验你的学习成果。</p>

        <div class="test-question">
          <p><strong>问题1：</strong>关于弹力的产生条件，下列说法正确的是（ ）</p>
          <div class="test-options">
            <label><input type="radio" name="q1" value="a"> A. 只要两物体接触就一定有弹力</label>
            <label><input type="radio" name="q1" value="b"> B. 只要两物体发生形变就一定有弹力</label>
            <label><input type="radio" name="q1" value="c"> C. 两物体直接接触且发生弹性形变时才有弹力</label>
            <label><input type="radio" name="q1" value="d"> D. 弹力的方向总是与形变方向相同</label>
          </div>
        </div>

        <div class="test-question">
          <p><strong>问题2：</strong>关于摩擦力，下列说法正确的是（ ）</p>
          <div class="test-options">
            <label><input type="radio" name="q2" value="a"> A. 滑动摩擦力的方向总是与物体运动方向相反</label>
            <label><input type="radio" name="q2" value="b"> B. 静摩擦力的大小与正压力成正比</label>
            <label><input type="radio" name="q2" value="c"> C. 摩擦力可以是动力也可以是阻力</label>
            <label><input type="radio" name="q2" value="d"> D. 摩擦力总是阻碍物体的运动</label>
          </div>
        </div>

        <div class="test-question">
          <p><strong>问题3：</strong>一根弹簧原长10cm，在弹性限度内，当挂上5N的物体时，弹簧长度变为12cm。求弹簧的劲度系数k。</p>
          <input type="text" class="test-input" placeholder="请输入答案（单位：N/m）" id="q3">
        </div>

        <div class="test-question">
          <p><strong>问题4：</strong>质量为2kg的物体静止在水平地面上，物体与地面间的动摩擦因数为0.3。用水平力F拉动物体，使其匀速运动，求拉力F的大小。（g取10m/s²）
          </p>
          <input type="text" class="test-input" placeholder="请输入答案（单位：N）" id="q4">
        </div>

        <div class="test-question">
          <p><strong>问题5：</strong>关于重心，下列说法正确的是（ ）</p>
          <div class="test-options">
            <label><input type="radio" name="q5" value="a"> A. 重心一定在物体上</label>
            <label><input type="radio" name="q5" value="b"> B. 形状规则的物体重心一定在几何中心</label>
            <label><input type="radio" name="q5" value="c"> C. 重心是物体各部分所受重力的等效作用点</label>
            <label><input type="radio" name="q5" value="d"> D. 重心位置与物体质量分布无关</label>
          </div>
        </div>

        <button class="test-submit" onclick="submitTest()">提交答案</button>
      </div>
    `;
  }
}