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

        // 初始化NPC点击事件
        npc.addEventListener('click', function () {
            handleScienceNPCClick();
        });

        // 初始化遮罩层点击事件 - 点击屏幕任意地方切换对话
        const blocker = document.getElementById('sciencePageBlocker');
        if (blocker) {
            blocker.addEventListener('click', function () {
                handleScienceNPCClick();
            });
        }
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

    // 检查是否已经完成所有对话
    if (state.index >= scienceNPCDialogues.length - 1) {
        // 所有对话已完成
        state.isComplete = true;
        // 隐藏NPC和遮罩层
        completeScienceNPCDialogue();
        return;
    }

    // 切换到下一条对话
    state.index = state.index + 1;

    // 显示新对话
    showScienceNPCTalk();
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

    // 隐藏NPC
    if (npc) {
        npc.style.display = 'none';
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
    // 初始化科普页面
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