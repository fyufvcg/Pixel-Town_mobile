/**
 * 科普页面脚本
 * 用于科普页面的交互功能
 */

// Swiper实例
let scienceSwiper = null;

// 科普页面NPC对话内容
const scienceNPCDialogues = [
    "1.受力分析搞不懂?茶馆帮你搞定!",
    "玩法攻略、知识点，点我全知道!",
    "有问题?点我，秒回!",
    "请随便坐坐！",
    "享受茶香时光！"
];

// 科普页面NPC对话气泡宽度配置（根据文字内容调整）
const scienceNPCBubbleWidths = [
    '280px',  // 第一个对话框
    '240px',  // 第二个对话框
    '200px',  // 第三个对话框
    '180px',  // 第四个对话框
    '200px'   // 第五个对话框
];

// 科普页面NPC对话状态
const scienceNPCDialogueState = {
    index: 0,
    isComplete: false
};

/**
 * 初始化科普页面
 */
function initSciencePage() {
    const sciencePage = document.getElementById('sciencePage');
    if (!sciencePage) return;

    // 初始化轮播图
    initCarousel();
}

/**
 * 初始化Swiper轮播图
 */
function initCarousel() {
    const swiperContainer = document.querySelector('.science-swiper');
    if (!swiperContainer) return;

    // 销毁已存在的实例
    if (scienceSwiper) {
        scienceSwiper.destroy(true, true);
    }

    // 初始化Swiper
    scienceSwiper = new Swiper('.science-swiper', {
        // 基础配置
        slidesPerView: 'auto',
        centeredSlides: true,
        spaceBetween: 20,
        grabCursor: true,

        // 循环播放
        loop: false,

        // 滑动效果
        effect: 'slide',
        speed: 400,

        // 移动端触摸滑动
        touchRatio: 1,
        touchAngle: 45,
        simulateTouch: true,
        allowTouchMove: true,

        // 防止快速滑动时的闪烁
        preventInteractionOnTransition: false,

        // 滑动事件监听
        on: {
            touchStart: function () {
                // 触摸开始时添加反馈
                swiperContainer.style.cursor = 'grabbing';
            },
            touchEnd: function () {
                // 触摸结束时恢复
                swiperContainer.style.cursor = 'grab';
            }
        }
    });
}

/**
 * 创建科普页面弹窗
 */
function createScienceModal() {
    // 检查是否已存在弹窗
    if (document.getElementById('scienceModalOverlay')) {
        return;
    }

    // 创建遮罩层
    const modalOverlay = document.createElement('div');
    modalOverlay.className = 'modal-overlay';
    modalOverlay.id = 'scienceModalOverlay';

    // 创建弹窗内容
    const modalContent = document.createElement('div');
    modalContent.className = 'modal-content';

    // 填充弹窗内容
    modalContent.innerHTML = `
        <!-- 关闭按钮 -->
        <button class="modal-close" onclick="closeScienceModal()">
            <span>×</span>
        </button>

        <!-- 标题栏 -->
        <div class="modal-header">
            <h2>欢迎来到科普天地！</h2>
        </div>

        <!-- 内容区 -->
        <div class="modal-body">
            <p>这里有各种有趣的科普知识，涵盖玩具游戏、建筑结构、流体力学、生活用品、体育运动、生物自然和交通工具等多个领域。滑动浏览，探索科学的奥秘吧！</p>
        </div>

        <!-- 确定按钮 -->
        <div class="modal-footer">
            <button class="modal-confirm-btn" onclick="closeScienceModal()">开始探索</button>
        </div>
    `;

    // 组装弹窗
    modalOverlay.appendChild(modalContent);
    document.body.appendChild(modalOverlay);

    // 添加显示动画
    setTimeout(() => {
        modalOverlay.classList.add('active');
    }, 10);

    // 禁止背景滚动
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.width = '100%';

    // 点击遮罩层关闭弹窗
    modalOverlay.addEventListener('click', function (e) {
        if (e.target === modalOverlay) {
            closeScienceModal();
        }
    });
}

/**
 * 关闭科普页面弹窗
 */
function closeScienceModal() {
    const modalOverlay = document.getElementById('scienceModalOverlay');
    if (modalOverlay) {
        modalOverlay.classList.remove('active');
        // 等待动画完成后隐藏
        setTimeout(() => {
            modalOverlay.remove();
            // 恢复背景滚动
            document.body.style.overflow = '';
            document.body.style.position = '';
            document.body.style.width = '';

            // 显示科普页面NPC并开始对话
            setTimeout(() => {
                showScienceNPC();
            }, 0);
        }, 300);
    }
}

/**
 * 显示科普页面NPC
 */
function showScienceNPC() {
    const npc = document.getElementById('npc-6');
    if (npc) {
        npc.style.display = 'block';

        // 重置对话状态
        scienceNPCDialogueState.index = 0;
        scienceNPCDialogueState.isComplete = false;

        // 显示对话气泡
        setTimeout(() => {
            showScienceNPCTalk();
        }, 0);

        // 移除旧的点击事件，避免重复添加
        npc.removeEventListener('click', handleScienceNPCClick);
        npc.addEventListener('click', function () {
            handleScienceNPCClick();
        });
    }
}

/**
 * 创建科普页面遮罩层
 */
function createSciencePageBlocker() {
    // 检查是否已存在遮罩层
    if (document.getElementById('sciencePageBlocker')) {
        return;
    }

    // 创建遮罩层
    const blocker = document.createElement('div');
    blocker.className = 'science-page-blocker';
    blocker.id = 'sciencePageBlocker';
    document.body.appendChild(blocker);
}

/**
 * 显示科普页面NPC对话
 */
function showScienceNPCTalk() {
    const npc = document.getElementById('npc-6');
    if (!npc) return;

    const state = scienceNPCDialogueState;

    // 移除旧气泡
    const oldBubble = document.getElementById('scienceNpcBubble');
    if (oldBubble) {
        oldBubble.remove();
    }

    // 创建新气泡
    const bubble = document.createElement('div');
    bubble.id = 'scienceNpcBubble';
    bubble.className = 'npc-bubble';

    const message = scienceNPCDialogues[state.index];
    const bubbleWidth = scienceNPCBubbleWidths[state.index];

    bubble.textContent = message;
    bubble.style.width = bubbleWidth;
    bubble.style.maxWidth = bubbleWidth;
    // 设置气泡位置
    bubble.style.left = '60px';
    bubble.style.transform = 'translateX(0)';

    npc.appendChild(bubble);

    // 添加动画
    setTimeout(() => {
        bubble.classList.add('pop-in');
    }, 10);
}

/**
 * 处理科普页面NPC点击事件
 */
function handleScienceNPCClick() {
    const state = scienceNPCDialogueState;

    // 切换到下一条对话
    state.index = state.index + 1;
    
    // 如果超过最后一条，回到第一条（循环轮换）
    if (state.index >= scienceNPCDialogues.length) {
        state.index = 0;
    }

    // 显示新对话
    showScienceNPCTalk();
    
    // 保持未完成状态
    state.isComplete = false;
}

/**
 * 完成科普页面NPC对话，解除页面限制
 */
function completeScienceNPCDialogue() {
    const npc = document.getElementById('npc-6');
    const blocker = document.getElementById('sciencePageBlocker');

    // 隐藏对话气泡
    const bubble = document.getElementById('scienceNpcBubble');
    if (bubble) {
        bubble.classList.remove('pop-in');
        bubble.classList.add('pop-out');
        setTimeout(() => {
            if (bubble.parentNode) bubble.remove();
        }, 300);
    }

    // NPC保持显示（常驻）
    if (npc) {
        npc.style.display = 'block';
    }

    // 隐藏遮罩层，允许科普页面交互
    if (blocker) {
        blocker.remove();
    }
}

/**
 * 页面加载完成后初始化
 */
document.addEventListener('DOMContentLoaded', function () {
    initFluidRandomArticles();
    initSciencePage();
});

/**
 * 当切换到科普页面时调用
 */
function onSwitchToSciencePage() {
    // 检查是否需要显示弹窗（刷新页面后第一次进入或关闭网页后重新打开）
    const hasShownScienceModal = sessionStorage.getItem('hasShownScienceModal');
    if (!hasShownScienceModal) {
        // 显示科普页面弹窗
        createScienceModal();
        // 标记弹窗已显示（会话期间）
        sessionStorage.setItem('hasShownScienceModal', 'true');
    } else {
        // 弹窗已显示过，仍然需要显示NPC
        setTimeout(() => {
            showScienceNPC();
        }, 100);
    }

    // 确保轮播图已初始化
    if (!scienceSwiper) {
        initCarousel();
    } else {
        // 更新轮播图尺寸
        scienceSwiper.update();
        scienceSwiper.updateSize();
    }
}

/**
 * 当离开科普页面时调用
 */
function onLeaveSciencePage() {
    // 隐藏NPC
    const npc = document.getElementById('npc-6');
    if (npc) {
        npc.style.display = 'none';
    }

    // 隐藏对话气泡
    const bubble = document.getElementById('scienceNpcBubble');
    if (bubble) {
        bubble.remove();
    }

    // 移除遮罩层
    const blocker = document.getElementById('sciencePageBlocker');
    if (blocker) {
        blocker.remove();
    }

    // 重置对话状态
    scienceNPCDialogueState.index = 0;
    scienceNPCDialogueState.isComplete = false;
}

/**
 * 销毁轮播图（页面切换时调用）
 */
function destroyScienceCarousel() {
    if (scienceSwiper) {
        scienceSwiper.destroy(true, true);
        scienceSwiper = null;
    }
}

const categoryArticlesMap = {
    '流体力学': typeof fluidMechanicsArticles !== 'undefined' ? fluidMechanicsArticles : [],
    '体育运动': typeof sportsArticles !== 'undefined' ? sportsArticles : [],
    '建筑结构': typeof architectureArticles !== 'undefined' ? architectureArticles : [],
    '玩具游戏': typeof toyGameArticles !== 'undefined' ? toyGameArticles : [],
    '交通工具': typeof vehicleArticles !== 'undefined' ? vehicleArticles : [],
    '生活用品': typeof dailyUseArticles !== 'undefined' ? dailyUseArticles : [],
    '生物自然': typeof bioNatureArticles !== 'undefined' ? bioNatureArticles : []
    
};

let fluidRandomArticles = [];

function initFluidRandomArticles() {
    const fluidArticles = categoryArticlesMap['流体力学'] || [];
    const shuffled = [...fluidArticles].sort(() => Math.random() - 0.5);
    fluidRandomArticles = shuffled.slice(0, 5);
}

function getTagStats() {
    try {
        const stats = localStorage.getItem('tagErrorStats');
        return stats ? JSON.parse(stats) : {};
    } catch {
        return {};
    }
}

function calculateTagWeight(article) {
    const tagStats = getTagStats();
    if (!article.tags || !Array.isArray(article.tags)) return 0;
    let weight = 0;
    article.tags.forEach(tag => {
        weight += (tagStats[tag] || 0);
    });
    return weight;
}

function getSmartArticles(category, limit = 5) {
    const articles = categoryArticlesMap[category];
    if (!articles || articles.length === 0) return [];
    
    if (category === '流体力学') {
        return fluidRandomArticles.slice(0, limit);
    }
    
    const articlesWithWeight = articles.map((article, index) => ({
        article: article,
        index: index,
        weight: calculateTagWeight(article)
    }));
    
    articlesWithWeight.sort((a, b) => b.weight - a.weight);
    
    return articlesWithWeight.slice(0, limit).map(item => ({
        ...item.article,
        originalIndex: item.index
    }));
}

function showCategoryArticles(category) {
    const smartArticles = getSmartArticles(category, 5);
    if (!smartArticles || smartArticles.length === 0) {  // ← 修改这里
        alert('暂无该分类的文章');
        return;
    }
    
    let articlesHTML = `<div class="articles-list">`;
    smartArticles.forEach((article) => {               // ← 修改这里
        const index = article.originalIndex;             // ← 添加这行
        articlesHTML += `
            <div class="article-item" onclick="showArticleDetail(${index}, '${category}')">
                <div class="article-thumb">
                    <img src="${article.image}" alt="${article.title}" onerror="this.src='images/科普/${category === '流体力学' ? 'fluid' : category === '体育运动' ? 'sport' : category === '建筑结构' ? 'building' : category === '玩具游戏' ? 'toy' : category === '交通工具' ? 'traffic' : category === '生活用品' ? 'household' : 'nature'}.jpg'">
                </div>
                <div class="article-info">
                    <h3>${article.title}</h3>
                    <p>${article.background.substring(0, 60)}...</p>
                </div>
            </div>
        `;
    });
    articlesHTML += `</div>`;
    
    createArticleListModal(category, articlesHTML);
}

function showArticleDetail(articleIndex, category) {
    const articles = categoryArticlesMap[category];
    const article = articles[articleIndex];
    if (!article) return;
    
    let articleHTML = `
        <div class="article-detail">
            <div class="article-image">
                <img src="${article.image}" alt="${article.title}" onerror="this.src='images/科普/${category === '流体力学' ? 'fluid' : category === '体育运动' ? 'sport' : category === '建筑结构' ? 'building' : category === '玩具游戏' ? 'toy' : category === '交通工具' ? 'traffic' : category === '生活用品' ? 'household' : 'nature'}.jpg'">
            </div>
            <h2 class="article-title">${article.title}</h2>
            <div class="article-tags">
                ${article.tags ? article.tags.map(tag => `<span class="tag">${tag}</span>`).join('') : ''}
            </div>
            <div class="article-content">
                <p>${article.background}</p>
            </div>
            <div class="article-question">
                <h3>思考题</h3>
                <p class="question-text">${article.question}</p>
                <div class="question-options">
                    ${article.options.map((option, idx) => `
                        <label class="option-item">
                            <input type="radio" name="article-question" value="${option.charAt(0)}">
                            <span class="option-text">${option}</span>
                        </label>
                    `).join('')}
                </div>
                <button class="check-answer-btn" onclick="checkArticleAnswer('${category}', ${articleIndex})">查看答案</button>
                <div class="answer-result" id="answer-result"></div>
            </div>
        </div>
    `;
    
    createArticleDetailModal(article.title, articleHTML);
}

function checkArticleAnswer(category, articleIndex) {
    const articles = categoryArticlesMap[category];
    const article = articles[articleIndex];
    if (!article) return;
    
    const selectedOption = document.querySelector('input[name="article-question"]:checked');
    const resultDiv = document.getElementById('answer-result');
    
    if (!selectedOption) {
        resultDiv.innerHTML = '<p class="error">请选择一个选项</p>';
        return;
    }
    
    const userAnswer = selectedOption.value;
    const correctAnswer = article.correctAnswer;
    
    if (userAnswer === correctAnswer) {
        resultDiv.innerHTML = '<p class="correct">✓ 回答正确！</p>';
    } else {
        resultDiv.innerHTML = `<p class="wrong">✗ 回答错误，正确答案是：${correctAnswer}</p>`;
    }
}

function createArticleListModal(category, content) {
    closeAllModals();
    
    const modalOverlay = document.createElement('div');
    modalOverlay.className = 'modal-overlay article-list-modal';
    modalOverlay.id = 'articleListModal';
    
    const modalContent = document.createElement('div');
    modalContent.className = 'modal-content article-list-content';
    
    modalContent.innerHTML = `
        <button class="modal-close" onclick="closeArticleListModal()">
            <span>×</span>
        </button>
        <div class="modal-header">
            <h2>${category}</h2>
        </div>
        <div class="modal-body">
            ${content}
        </div>
    `;
    
    modalOverlay.appendChild(modalContent);
    document.body.appendChild(modalOverlay);
    
    setTimeout(() => {
        modalOverlay.classList.add('active');
    }, 10);
    
    document.body.style.overflow = 'hidden';
    
    modalOverlay.addEventListener('click', function(e) {
        if (e.target === modalOverlay) {
            closeArticleListModal();
        }
    });
}

function createArticleDetailModal(title, content) {
    closeAllModals();
    
    const modalOverlay = document.createElement('div');
    modalOverlay.className = 'modal-overlay article-detail-modal';
    modalOverlay.id = 'articleDetailModal';
    
    const modalContent = document.createElement('div');
    modalContent.className = 'modal-content article-detail-content';
    
    modalContent.innerHTML = `
        <button class="modal-close" onclick="closeArticleDetailModal()">
            <span>×</span>
        </button>
        <div class="modal-header">
            <h2>${title}</h2>
        </div>
        <div class="modal-body">
            ${content}
        </div>
    `;
    
    modalOverlay.appendChild(modalContent);
    document.body.appendChild(modalOverlay);
    
    setTimeout(() => {
        modalOverlay.classList.add('active');
    }, 10);
    
    document.body.style.overflow = 'hidden';
    
    modalOverlay.addEventListener('click', function(e) {
        if (e.target === modalOverlay) {
            closeArticleDetailModal();
        }
    });
}

function closeArticleListModal() {
    const modal = document.getElementById('articleListModal');
    if (modal) {
        modal.classList.remove('active');
        setTimeout(() => {
            modal.remove();
            document.body.style.overflow = '';
        }, 300);
    }
}

function closeArticleDetailModal() {
    const modal = document.getElementById('articleDetailModal');
    if (modal) {
        modal.classList.remove('active');
        setTimeout(() => {
            modal.remove();
            document.body.style.overflow = '';
        }, 300);
    }
}

function closeAllModals() {
    closeArticleListModal();
    closeArticleDetailModal();
    closeScienceModal();
}