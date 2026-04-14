/**
 * 像素小镇 - 主脚本文件
 * 包含页面切换、像素块过渡动画和导航功能
 */

// ==================== 题目标签数据 ====================
const questionTags = {
    level1: {
        choice1: ['胡克定律', '力学图像'],
        choice2: ['重力', '重心'],
        choice3: ['弹力', '胡克定律', '摩擦力'],
        fill1: ['摩擦力', '公式'],
        fill2: ['胡克定律', '公式'],
        fill3: ['弹力', '力学计算']
    },
    level2: {
        'choice1': ['静摩擦力', '方向判断'],
        'choice2': ['摩擦力', '整体法隔离法'],
        'choice3': ['摩擦力', '突变问题'],
        'fill1': ['滑动摩擦力', '公式'],
        'fill2': ['静摩擦力', '计算'],
        'fill3': ['摩擦力', '做功']
    },
    level3: {
        'choice1': ['平衡力', '相互作用力'],
        'choice2': ['摩擦力', '牛顿第三定律'],
        'choice3': ['牛顿第三定律', '基本概念'],
        'fill1': ['作用力与反作用力', '特征'],
        'fill2': ['平衡力', '超重失重'],
        'fill3': ['牛顿第三定律', '应用']
    },
    level4: {
        'choice1': ['力的合成', '几何计算'],
        'choice2': ['力的分解', '实际效果'],
        'choice3': ['平行四边形定则', '图解法'],
        'fill1': ['力的合成', '计算'],
        'fill2': ['力的分解', '正交分解'],
        'fill3': ['平行四边形定则', '几何计算']
    },
    level5: {
        'choice1': ['弹力', '受力分析'],
        'choice2': ['力的平衡', '相互作用力'],
        'choice3': ['重力', '弹力', '摩擦力'],
        'choice4': ['力的概念', '受力分析'],
        'choice5': ['胡克定律', '力的合成'],
        'choice6': ['胡克定律', '力学计算'],
        'choice7': ['摩擦力', '受力分析'],
        'choice8': ['静摩擦力', '胡克定律', '受力分析'],
        'choice9': ['弹力', '摩擦力', '牛顿第三定律'],
        'choice10': ['摩擦力', '受力分析'],
        'choice11': ['摩擦力', '受力分析', '力的平衡'],
        'choice12': ['力的平衡', '摩擦力', '整体法'],
        'fill1': ['力的合成', '实验操作'],
        'fill2': ['力的合成', '等效替代法'],
        'fill3': ['力的合成', '实验原理'],
        'app1': ['胡克定律', '机械能守恒', '力学计算'],
        'app2': ['胡克定律', '力学计算'],
        'app3': ['静摩擦力', '滑动摩擦力', '力学计算'],
        'app4': ['力的平衡', '摩擦力', '力学计算'],
        'app5': ['胡克定律', '机械能守恒', '力学计算']
    },
    level6: {
        'choice1': ['共点力'],
        'choice2': ['平衡状态'],
        'choice3': ['平衡力'],
        'choice4': ['平衡状态'],
        'choice5': ['平衡力', '整体法隔离法'],
        'choice6': ['摩擦力', '平衡条件'],
        'choice7': ['共点力平衡', '受力分析'],
        'choice8': ['斜面问题', '摩擦力'],
        'choice9': ['整体法', '共点力平衡'],
        'choice10': ['共点力平衡', '受力分析'],
        'fill1': ['静摩擦力', '受力分析', '斜面'],
        'fill2': ['力的平衡', '正交分解', '几何计算'],
        'fill3': ['力的平衡', '动态分析', '矢量三角形'],
        'fill4': ['力的合成', '几何计算', '力的平衡'],
        'fill5': ['斜面', '正交分解', '力的平衡'],
        'fill6': ['整体法', '隔离法', '摩擦力'],
        'app1': ['滑轮', '受力分析', '力的平衡', '正交分解'],
        'app2': ['摩擦力', '力学计算', '正交分解']
    }
};

// ==================== 标签错误统计功能 ====================
function getTagStats() {
    const stats = localStorage.getItem('tagErrorStats');
    return stats ? JSON.parse(stats) : {};
}

function saveTagStats(stats) {
    localStorage.setItem('tagErrorStats', JSON.stringify(stats));
}

function fetchTagStatsFromServer() {
    return new Promise((resolve, reject) => {
        const userId = localStorage.getItem('pixelTownUserId');
        if (!userId) {
            resolve(getTagStats());
            return;
        }

        fetch(`${API_BASE_URL}/get_user_tags?user_id=${userId}`)
            .then(res => res.json())
            .then(data => {
                if (data.status === 'success' && data.data) {
                    const tagStats = {};
                    data.data.forEach(item => {
                        tagStats[item.tag_name] = item.wrong_count;
                    });
                    saveTagStats(tagStats);
                    resolve(tagStats);
                } else {
                    resolve(getTagStats());
                }
            })
            .catch(err => {
                console.log('获取标签统计失败，使用本地数据:', err);
                resolve(getTagStats());
            });
    });
}

function incrementTagErrors(tags) {
    if (!tags || !Array.isArray(tags)) return;

    const stats = getTagStats();
    tags.forEach(tag => {
        stats[tag] = (stats[tag] || 0) + 1;
    });
    saveTagStats(stats);

    // 尝试同步到服务器
    syncTagStatsToServer(stats);
}

function getWeakTags(limit = 5) {
    const stats = getTagStats();
    const sorted = Object.entries(stats)
        .sort((a, b) => b[1] - a[1])
        .slice(0, limit);
    return sorted.map(([name, count]) => ({ name, count }));
}

function syncTagStatsToServer(stats) {
    const userId = localStorage.getItem('pixelTownUserId');
    if (!userId) return;

    Object.entries(stats).forEach(([tagName, wrongCount]) => {
        fetch(`${API_BASE_URL}/add_tag_wrong`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                user_id: userId,
                tag_name: tagName
            })
        }).catch(err => console.log('标签统计同步失败:', err));
    });
}

function trackQuestionResult(level, questionType, questionNum, isCorrect) {
    const key = `${questionType}${questionNum}`;
    const tags = questionTags[level]?.[key];

    if (!isCorrect && tags) {
        incrementTagErrors(tags);
    }
}

function showWeaknessChartModal(tags) {
    const existingModal = document.getElementById('weakness-chart-modal');
    if (existingModal) existingModal.remove();

    const total = tags.reduce((sum, t) => sum + t.count, 0);
    const colors = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40', '#C9CBCF'];

    const modal = document.createElement('div');
    modal.id = 'weakness-chart-modal';
    modal.className = 'weakness-chart-modal';

    const modalContent = document.createElement('div');
    modalContent.className = 'weakness-chart-content';
    modalContent.style.textAlign = 'center';

    const closeBtn = document.createElement('span');
    closeBtn.className = 'weakness-chart-close';
    closeBtn.innerHTML = '&times;';
    closeBtn.addEventListener('click', () => modal.remove());
    modalContent.appendChild(closeBtn);

    const modalTitle = document.createElement('div');
    modalTitle.className = 'weakness-chart-title';
    modalTitle.textContent = '薄弱知识点分布';
    modalTitle.style.textAlign = 'center';
    modalContent.appendChild(modalTitle);

    const chartContainer = document.createElement('div');
    chartContainer.className = 'weakness-chart-small';
    chartContainer.style.margin = '0 auto 20px';
    chartContainer.style.display = 'flex';
    chartContainer.style.justifyContent = 'center';

    const svgSize = 180;
    const strokeWidth = 28;
    const radius = (svgSize - strokeWidth) / 2;

    const svgWrapper = document.createElement('div');
    svgWrapper.style.position = 'relative';
    svgWrapper.style.width = svgSize + 'px';
    svgWrapper.style.height = svgSize + 'px';

    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', `0 0 ${svgSize} ${svgSize}`);
    svg.style.width = svgSize + 'px';
    svg.style.height = svgSize + 'px';
    svg.style.transform = 'rotate(-90deg)';

    let currentAngle = 0;
    const paths = [];

    tags.forEach((tag, index) => {
        const percent = tag.count / total;
        const startAngle = currentAngle;
        const endAngle = currentAngle + (percent * 360);

        const startRad = (startAngle - 90) * Math.PI / 180;
        const endRad = (endAngle - 90) * Math.PI / 180;

        const x1 = svgSize / 2 + radius * Math.cos(startRad);
        const y1 = svgSize / 2 + radius * Math.sin(startRad);
        const x2 = svgSize / 2 + radius * Math.cos(endRad);
        const y2 = svgSize / 2 + radius * Math.sin(endRad);

        const largeArcFlag = percent > 0.5 ? 1 : 0;

        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('d', `M ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`);
        path.setAttribute('fill', 'none');
        path.setAttribute('stroke', colors[index % colors.length]);
        path.setAttribute('stroke-width', strokeWidth);
        path.setAttribute('stroke-linecap', 'round');

        paths.push(path);
        svg.appendChild(path);
        currentAngle = endAngle;
    });

    const centerText = document.createElement('div');
    centerText.className = 'chart-center-text';
    centerText.style.position = 'absolute';
    centerText.style.top = '50%';
    centerText.style.left = '50%';
    centerText.style.transform = 'translate(-50%, -50%)';
    centerText.style.textAlign = 'center';
    centerText.innerHTML = `<div style="color: #FFD700; font-size: 12px; margin-bottom: 4px;">总错题</div><div style="color: #FFD700; font-size: 28px; font-weight: bold;">${total}</div>`;

    svgWrapper.appendChild(svg);
    svgWrapper.appendChild(centerText);
    chartContainer.appendChild(svgWrapper);
    modalContent.appendChild(chartContainer);

    const legendContainer = document.createElement('div');
    legendContainer.className = 'weakness-legend';

    tags.forEach((tag, index) => {
        const percentage = ((tag.count / total) * 100).toFixed(1);
        const legendItem = document.createElement('div');
        legendItem.className = 'weakness-legend-item';
        legendItem.innerHTML = `<span class="legend-color" style="background:${colors[index % colors.length]}"></span><span class="legend-name">${tag.name}</span><span class="legend-count">${tag.count}题 (${percentage}%)</span>`;
        legendContainer.appendChild(legendItem);
    });

    modalContent.appendChild(legendContainer);
    modal.appendChild(modalContent);
    document.body.appendChild(modal);

    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.remove();
    });
}

// ==================== 消息提示功能 ====================

/**
 * Modal对象 - 用于显示消息提示
 */
const Modal = {
    /**
     * 显示信息提示
     * @param {string} message - 提示消息
     * @param {string} title - 提示标题
     */
    info: function (message, title = '提示') {
        // 检查是否已存在Modal
        const existingModal = document.getElementById('modal-info');
        if (existingModal) {
            existingModal.remove();
        }

        // 创建Modal元素
        const modal = document.createElement('div');
        modal.id = 'modal-info';
        modal.style.position = 'fixed';
        modal.style.top = '0';
        modal.style.left = '0';
        modal.style.width = '100%';
        modal.style.height = '100%';
        modal.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
        modal.style.display = 'flex';
        modal.style.alignItems = 'center';
        modal.style.justifyContent = 'center';
        modal.style.zIndex = '10000';

        // 创建Modal内容
        const modalContent = document.createElement('div');
        modalContent.style.backgroundColor = '#2c1810';
        modalContent.style.border = '3px solid rgba(255, 215, 0, 0.5)';
        modalContent.style.borderRadius = '16px';
        modalContent.style.padding = '20px';
        modalContent.style.width = '90%';
        modalContent.style.maxWidth = '400px';
        modalContent.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.5)';

        // 创建标题
        const modalTitle = document.createElement('h3');
        modalTitle.style.color = '#ffd700';
        modalTitle.style.textAlign = 'center';
        modalTitle.style.margin = '0 0 15px 0';
        modalTitle.style.fontSize = '18px';
        modalTitle.style.fontFamily = "'Zpix', 'Press Start 2P', monospace";
        modalTitle.textContent = title;

        // 创建消息内容
        const modalMessage = document.createElement('p');
        modalMessage.style.color = '#FFF';
        modalMessage.style.textAlign = 'center';
        modalMessage.style.margin = '0 0 20px 0';
        modalMessage.style.fontSize = '16px';
        modalMessage.style.fontFamily = "'Zpix', 'Press Start 2P', monospace";
        modalMessage.textContent = message;

        // 创建确认按钮
        const confirmButton = document.createElement('button');
        confirmButton.style.width = '100%';
        confirmButton.style.padding = '10px';
        confirmButton.style.backgroundColor = 'rgba(76, 175, 80, 0.8)';
        confirmButton.style.color = '#fff';
        confirmButton.style.border = '2px solid rgba(76, 175, 80, 1)';
        confirmButton.style.borderRadius = '8px';
        confirmButton.style.fontSize = '14px';
        confirmButton.style.cursor = 'pointer';
        confirmButton.style.fontFamily = "'Zpix', 'Press Start 2P', monospace";
        confirmButton.style.transition = 'all 0.3s ease';
        confirmButton.textContent = '确定';
        confirmButton.onclick = function () {
            modal.remove();
        };

        // 组装Modal
        modalContent.appendChild(modalTitle);
        modalContent.appendChild(modalMessage);
        modalContent.appendChild(confirmButton);
        modal.appendChild(modalContent);
        document.body.appendChild(modal);

        // 添加动画效果
        modalContent.style.opacity = '0';
        modalContent.style.transform = 'scale(0.9)';
        modalContent.style.transition = 'all 0.3s ease';
        setTimeout(() => {
            modalContent.style.opacity = '1';
            modalContent.style.transform = 'scale(1)';
        }, 10);
    },

    /**
     * 显示确认对话框
     * @param {string} message - 提示消息
     * @param {string} title - 提示标题
     * @param {function} onConfirm - 确认回调函数
     * @param {function} onCancel - 取消回调函数
     */
    confirm: function (message, title = '确认', onConfirm, onCancel) {
        // 检查是否已存在Modal
        const existingModal = document.getElementById('modal-confirm');
        if (existingModal) {
            existingModal.remove();
        }

        // 创建Modal元素
        const modal = document.createElement('div');
        modal.id = 'modal-confirm';
        modal.style.position = 'fixed';
        modal.style.top = '0';
        modal.style.left = '0';
        modal.style.width = '100%';
        modal.style.height = '100%';
        modal.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
        modal.style.display = 'flex';
        modal.style.alignItems = 'center';
        modal.style.justifyContent = 'center';
        modal.style.zIndex = '10000';

        // 创建Modal内容
        const modalContent = document.createElement('div');
        modalContent.style.backgroundColor = '#2c1810';
        modalContent.style.border = '3px solid rgba(255, 215, 0, 0.5)';
        modalContent.style.borderRadius = '16px';
        modalContent.style.padding = '20px';
        modalContent.style.width = '90%';
        modalContent.style.maxWidth = '400px';
        modalContent.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.5)';

        // 创建标题
        const modalTitle = document.createElement('h3');
        modalTitle.style.color = '#ffd700';
        modalTitle.style.textAlign = 'center';
        modalTitle.style.margin = '0 0 15px 0';
        modalTitle.style.fontSize = '18px';
        modalTitle.style.fontFamily = "'Zpix', 'Press Start 2P', monospace";
        modalTitle.textContent = title;

        // 创建消息内容
        const modalMessage = document.createElement('p');
        modalMessage.style.color = '#FFF';
        modalMessage.style.textAlign = 'center';
        modalMessage.style.margin = '0 0 20px 0';
        modalMessage.style.fontSize = '16px';
        modalMessage.style.fontFamily = "'Zpix', 'Press Start 2P', monospace";
        modalMessage.textContent = message;

        // 创建按钮容器
        const buttonContainer = document.createElement('div');
        buttonContainer.style.display = 'flex';
        buttonContainer.style.gap = '10px';

        // 创建取消按钮
        const cancelButton = document.createElement('button');
        cancelButton.style.flex = '1';
        cancelButton.style.padding = '10px';
        cancelButton.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
        cancelButton.style.color = '#fff';
        cancelButton.style.border = '2px solid rgba(255, 255, 255, 0.3)';
        cancelButton.style.borderRadius = '8px';
        cancelButton.style.fontSize = '14px';
        cancelButton.style.cursor = 'pointer';
        cancelButton.style.fontFamily = "'Zpix', 'Press Start 2P', monospace";
        cancelButton.style.transition = 'all 0.3s ease';
        cancelButton.textContent = '取消';
        cancelButton.onclick = function () {
            if (onCancel) onCancel();
            modal.remove();
        };

        // 创建确认按钮
        const confirmButton = document.createElement('button');
        confirmButton.style.flex = '1';
        confirmButton.style.padding = '10px';
        confirmButton.style.backgroundColor = 'rgba(244, 67, 54, 0.8)';
        confirmButton.style.color = '#fff';
        confirmButton.style.border = '2px solid rgba(244, 67, 54, 1)';
        confirmButton.style.borderRadius = '8px';
        confirmButton.style.fontSize = '14px';
        confirmButton.style.cursor = 'pointer';
        confirmButton.style.fontFamily = "'Zpix', 'Press Start 2P', monospace";
        confirmButton.style.transition = 'all 0.3s ease';
        confirmButton.textContent = '确认';
        confirmButton.onclick = function () {
            if (onConfirm) onConfirm();
            modal.remove();
        };

        // 组装Modal
        buttonContainer.appendChild(cancelButton);
        buttonContainer.appendChild(confirmButton);
        modalContent.appendChild(modalTitle);
        modalContent.appendChild(modalMessage);
        modalContent.appendChild(buttonContainer);
        modal.appendChild(modalContent);
        document.body.appendChild(modal);

        // 添加动画效果
        modalContent.style.opacity = '0';
        modalContent.style.transform = 'scale(0.9)';
        modalContent.style.transition = 'all 0.3s ease';
        setTimeout(() => {
            modalContent.style.opacity = '1';
            modalContent.style.transform = 'scale(1)';
        }, 10);
    }
};

// ==================== 弹窗控制功能 ====================

/**
 * 显示欢迎弹窗
 */
function showModal() {
    const modalOverlay = document.getElementById('modalOverlay');
    if (modalOverlay) {
        modalOverlay.style.display = 'flex';
        // 强制重绘以触发动画
        modalOverlay.offsetHeight;
        modalOverlay.classList.add('active');
        // 禁止背景滚动
        document.body.style.overflow = 'hidden';
        document.body.style.position = 'fixed';
        document.body.style.width = '100%';
    }
}

/**
 * 关闭欢迎弹窗
 */
function closeModal() {
    const modalOverlay = document.getElementById('modalOverlay');
    if (modalOverlay) {
        modalOverlay.classList.remove('active');
        // 等待动画完成后隐藏
        setTimeout(() => {
            modalOverlay.style.display = 'none';
            // 恢复背景滚动
            document.body.style.overflow = '';
            document.body.style.position = '';
            document.body.style.width = '';
            // 显示NPC-4
            showNPC4();
        }, 300);
    }
}

// ==================== NPC-4 对话功能 ====================

// NPC-4 对话内容
const npc4Dialogues = [
    '欢迎来到物理像素镇！',
    '愿力学知识伴你探索每一处角落~',
    '有每一个结构都遵循力学法则，快来试试吧!',
    '今天天气真好！',
    '祝你在小镇里玩得开心，学有所获!'
];

// NPC-4 对话气泡宽度配置（根据文字内容调整）
const npc4BubbleWidths = [
    '280px',  // 第一个对话框 - 一行显示
    '220px',  // 第二个对话框 - 两行显示
    '240px',  // 第三个对话框 - 两行显示
    '180px',  // 第四个对话框 - 一行显示
    '220px'   // 第五个对话框 - 两行显示
];

// NPC-4 对话状态
const npc4DialogueState = {
    index: 0,
    bubbleTimer: null,
    hideTimer: null,
    isComplete: false
};

/**
 * 显示NPC-4
 */
function showNPC4() {
    const npc4 = document.getElementById('npc-4');
    const blocker = document.getElementById('homepageBlocker');
    if (npc4) {
        npc4.style.display = 'block';
        // 显示遮罩层阻止首页交互
        if (blocker) {
            blocker.style.display = 'block';
        }
        // 重置对话状态
        npc4DialogueState.index = 0;
        npc4DialogueState.isComplete = false;
        // 显示对话气泡
        setTimeout(() => {
            showNPCBubble('npc-4');
        }, 0);
    }
}

/**
 * 显示NPC对话气泡
 */
function showNPCBubble(npcId) {
    const npc = document.getElementById(npcId);
    if (!npc) return;

    const state = npc4DialogueState;

    // 移除旧气泡
    const oldBubble = npc.querySelector('.npc-bubble');
    if (oldBubble) {
        oldBubble.remove();
    }

    // 创建新气泡
    const bubble = document.createElement('div');
    bubble.className = 'npc-bubble';

    const message = npc4Dialogues[state.index];
    const bubbleWidth = npc4BubbleWidths[state.index];

    bubble.textContent = message;
    bubble.style.width = bubbleWidth;
    bubble.style.maxWidth = bubbleWidth;
    // 设置气泡距离屏幕左边界60px
    bubble.style.left = '60px';
    bubble.style.transform = 'translateX(0)';

    npc.appendChild(bubble);

    // 添加动画
    setTimeout(() => {
        bubble.classList.add('pop-in');
    }, 10);
}

/**
 * 隐藏NPC对话气泡
 */
function hideNPCBubble(npcId) {
    const npc = document.getElementById(npcId);
    if (!npc) return;

    const bubble = npc.querySelector('.npc-bubble');
    if (bubble) {
        bubble.classList.remove('pop-in');
        bubble.classList.add('pop-out');
        setTimeout(() => {
            if (bubble.parentNode) bubble.remove();
        }, 300);
    }
}

/**
 * 安排下一次对话
 */
function scheduleNextDialogue(npcId) {
    const state = npc4DialogueState;

    state.bubbleTimer = setTimeout(() => {
        state.index = (state.index + 1) % npc4Dialogues.length;
        showNPCBubble(npcId);
        scheduleNextDialogue(npcId);
    }, 13000);
}

/**
 * 处理NPC点击事件
 */
function handleNPCClick(npcId) {
    const state = npc4DialogueState;

    // 清除定时器
    if (state.bubbleTimer) clearTimeout(state.bubbleTimer);
    if (state.hideTimer) clearTimeout(state.hideTimer);

    // 检查是否已经完成所有对话
    if (state.index >= npc4Dialogues.length - 1) {
        // 所有对话已完成
        state.isComplete = true;
        // 隐藏NPC和遮罩层
        completeNPCDialogue();
        return;
    }

    // 切换到下一条对话
    state.index = state.index + 1;

    // 显示新对话
    showNPCBubble(npcId);
}

/**
 * 完成NPC对话，解除首页限制
 */
function completeNPCDialogue() {
    const npc4 = document.getElementById('npc-4');
    const blocker = document.getElementById('homepageBlocker');

    // 隐藏对话气泡
    hideNPCBubble('npc-4');

    // 隐藏NPC-4
    if (npc4) {
        npc4.style.display = 'none';
    }

    // 隐藏遮罩层，允许首页交互
    if (blocker) {
        blocker.style.display = 'none';
    }

    // 清除定时器
    if (npc4DialogueState.bubbleTimer) clearTimeout(npc4DialogueState.bubbleTimer);
    if (npc4DialogueState.hideTimer) clearTimeout(npc4DialogueState.hideTimer);
}

/**
 * 初始化弹窗事件监听
 */
function initModalEvents() {
    const modalOverlay = document.getElementById('modalOverlay');

    // 点击遮罩层关闭弹窗
    if (modalOverlay) {
        modalOverlay.addEventListener('click', function (e) {
            if (e.target === modalOverlay) {
                closeModal();
            }
        });
    }

    // 初始化NPC-4点击事件
    const npc4 = document.getElementById('npc-4');
    if (npc4) {
        npc4.addEventListener('click', function () {
            handleNPCClick('npc-4');
        });
    }

    // 初始化遮罩层点击事件 - 点击屏幕任意地方切换对话
    const blocker = document.getElementById('homepageBlocker');
    if (blocker) {
        blocker.addEventListener('click', function () {
            handleNPCClick('npc-4');
        });
    }
}

// ==================== 像素块过渡动画 ====================

/**
 * 像素块过渡动画函数
 * @param {string} fromUrl - 源页面背景图片URL
 * @param {string} toUrl - 目标页面背景图片URL
 * @param {function} onMidpoint - 动画中点回调（切换页面）
 * @param {function} onComplete - 动画完成回调
 */
function pixelBlockTransition(fromUrl, toUrl, onMidpoint, onComplete) {
    const target = document.body;
    const BS = 40;
    const BORD = 2;
    const W = target.offsetWidth || window.innerWidth;
    const H = target.offsetHeight || window.innerHeight;
    const cols = Math.ceil(W / BS);
    const rows = Math.ceil(H / BS);

    target.style.pointerEvents = 'none';
    const canvas = document.createElement('canvas');
    canvas.width = W;
    canvas.height = H;
    canvas.style.cssText =
        'position:absolute;top:0;left:0;width:100%;height:100%;' +
        'z-index:9999;pointer-events:none;' +
        'image-rendering:pixelated;image-rendering:crisp-edges;';
    target.appendChild(canvas);
    const ctx = canvas.getContext('2d');
    ctx.imageSmoothingEnabled = false;

    /**
     * 计算图片覆盖尺寸
     */
    function coverDims(img, cW, cH) {
        const iR = img.naturalWidth / img.naturalHeight;
        const cR = cW / cH;
        let dW, dH;
        if (iR > cR) { dH = cH; dW = dH * iR; }
        else { dW = cW; dH = dW / iR; }
        return { x: (cW - dW) / 2, y: (cH - dH) / 2, w: dW, h: dH };
    }

    /**
     * 创建图片快照
     */
    function makeSnapshot(img) {
        const snap = document.createElement('canvas');
        snap.width = W;
        snap.height = H;
        const sCtx = snap.getContext('2d');
        sCtx.imageSmoothingEnabled = false;
        const d = coverDims(img, W, H);
        sCtx.drawImage(img, d.x, d.y, d.w, d.h);
        return snap;
    }

    /**
     * 绘制单个像素块
     */
    function drawBlock(snap, sx, sy, border) {
        ctx.drawImage(snap, sx, sy, BS, BS, -BS / 2, -BS / 2, BS, BS);
        if (border) {
            ctx.strokeStyle = 'rgba(44, 43, 43, 0.5)';
            ctx.lineWidth = BORD;
            ctx.strokeRect(
                -BS / 2 + BORD * 0.5, -BS / 2 + BORD * 0.5,
                BS - BORD, BS - BORD
            );
        }
    }

    /**
     * 缓动函数
     */
    function easeOutQuart(t) { return 1 - Math.pow(1 - t, 4); }

    const fromImg = new Image();
    fromImg.onload = () => {
        const fromSnap = makeSnapshot(fromImg);
        const toImg = new Image();
        toImg.onload = () => {
            const toSnap = makeSnapshot(toImg);
            const COL_STEP = 12;
            const shatter = [];
            for (let r = 0; r < rows; r++) {
                for (let c = 0; c < cols; c++) {
                    shatter.push({
                        sx: c * BS,
                        sy: r * BS,
                        vx: (Math.random() - 0.5) * 500,
                        vy: -(150 + Math.random() * 250),
                        grav: 1800 + Math.random() * 1200,
                        rot: (Math.random() - 0.5) * 28,
                        delay: c * COL_STEP + Math.random() * 40
                    });
                }
            }
            const A_COL_STEP = 10;
            const assemble = [];
            for (let r = 0; r < rows; r++) {
                for (let c = 0; c < cols; c++) {
                    const tx = c * BS, ty = r * BS;
                    const ox = -(BS * 3 + Math.random() * W * 0.55);
                    const oy = ty + (Math.random() - 0.5) * H * 0.10;
                    assemble.push({
                        sx: tx, sy: ty,
                        ox, oy, tx, ty,
                        delay: c * A_COL_STEP + r * 1.2 + Math.random() * 18,
                        dur: 160 + Math.random() * 80
                    });
                }
            }
            const ASSEMBLE_OFFSET = 70;
            let t0 = null;

            /**
             * 动画帧
             */
            function frame(ts) {
                if (!t0) t0 = ts;
                const el = ts - t0;
                ctx.fillStyle = '#0f0907';
                ctx.fillRect(0, 0, W, H);

                // 绘制散开的像素块
                for (const b of shatter) {
                    if (el < b.delay) {
                        ctx.save();
                        ctx.translate(b.sx + BS / 2, b.sy + BS / 2);
                        drawBlock(fromSnap, b.sx, b.sy, false);
                        ctx.restore();
                        continue;
                    }
                    const t = (el - b.delay) / 1000;
                    const bx = b.sx + b.vx * t;
                    const by = b.sy + b.vy * t + 0.5 * b.grav * t * t;
                    const rot = b.rot * t;
                    if (by - BS / 2 < H + BS) {
                        ctx.save();
                        ctx.translate(bx + BS / 2, by + BS / 2);
                        ctx.rotate(rot);
                        drawBlock(fromSnap, b.sx, b.sy, true);
                        ctx.restore();
                    }
                }

                // 绘制聚合的像素块
                if (el >= ASSEMBLE_OFFSET) {
                    const aEl = el - ASSEMBLE_OFFSET;
                    let done = true;
                    for (const b of assemble) {
                        if (aEl < b.delay) { done = false; continue; }
                        const t = Math.min((aEl - b.delay) / b.dur, 1);
                        const ease = easeOutQuart(t);
                        const bx = b.ox + (b.tx - b.ox) * ease;
                        const by = b.oy + (b.ty - b.oy) * ease;
                        if (t < 1) done = false;
                        ctx.save();
                        ctx.translate(bx + BS / 2, by + BS / 2);
                        drawBlock(toSnap, b.sx, b.sy, t < 1);
                        ctx.restore();
                    }
                    if (done) {
                        onMidpoint();
                        canvas.style.transition = 'opacity 0.3s ease';
                        canvas.style.opacity = '0';
                        setTimeout(() => {
                            canvas.remove();
                            target.style.pointerEvents = '';
                            onComplete();
                        }, 300);
                        return;
                    }
                }

                requestAnimationFrame(frame);
            }

            requestAnimationFrame(frame);
        };
        toImg.src = toUrl;
    };
    fromImg.src = fromUrl;
}

// ==================== 页面切换功能 ====================

// API_BASE_URL 在 download.js 中定义

function checkLoginStatus() {
    console.log('checkLoginStatus 被调用');
    const userId = localStorage.getItem('pixelTownUserId');
    console.log('用户ID:', userId);
    const authButtons = document.getElementById('authButtons');
    const loadingHint = document.getElementById('loadingHint');

    if (userId) {
        console.log('已登录，准备跳转');
        if (authButtons) authButtons.style.display = 'none';
        if (loadingHint) loadingHint.style.display = 'block';
        setTimeout(function () {
            console.log('执行跳转');
            goToMainPage();
        }, 1000);
    } else {
        console.log('未登录，显示登录按钮');
        if (authButtons) authButtons.style.display = 'flex';
        if (loadingHint) loadingHint.style.display = 'none';
    }
}

function showLoginModal() {
    document.getElementById('loginModal').style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closeLoginModal() {
    document.getElementById('loginModal').style.display = 'none';
    document.getElementById('loginUsername').value = '';
    document.getElementById('loginPassword').value = '';
    document.body.style.overflow = '';
}

function showRegisterModal() {
    document.getElementById('registerModal').style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closeRegisterModal() {
    document.getElementById('registerModal').style.display = 'none';
    document.getElementById('registerUsername').value = '';
    document.getElementById('registerPassword').value = '';
    document.getElementById('registerConfirmPassword').value = '';
    document.body.style.overflow = '';
}

function switchToRegister() {
    closeLoginModal();
    showRegisterModal();
}

function switchToLogin() {
    closeRegisterModal();
    showLoginModal();
}

function handleLogin(event) {
    event.preventDefault();
    console.log('handleLogin 被调用');
    console.log('API_BASE_URL:', API_BASE_URL);
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;
    console.log('用户名:', username);

    fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: username,
            password: password
        })
    })
        .then(res => {
            console.log('响应状态:', res.status);
            return res.json();
        })
        .then(data => {
            console.log('响应数据:', data);
            // 兼容处理：检查 success 或 message 中是否包含"成功"
            const loginSuccess = data.success || (data.message && data.message.includes('成功'));
            console.log('loginSuccess:', loginSuccess);
            if (loginSuccess) {
                console.log('登录成功，准备跳转');
                localStorage.setItem('pixelTownUsername', data.username || document.getElementById('loginUsername').value);
                localStorage.setItem('pixelTownUserId', data.user_id || Date.now().toString());
                console.log('关闭登录弹窗');
                closeLoginModal();
                console.log('调用 goToMainPageNoAnimation');
                goToMainPageNoAnimation();
            } else {
                console.log('登录失败:', data.message);
                alert(data.message || '登录失败');
            }
        })
        .catch(err => {
            console.error('登录错误:', err);
            alert('登录失败，请稍后重试');
        });
}

function handleRegister(event) {
    event.preventDefault();
    const username = document.getElementById('registerUsername').value;
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('registerConfirmPassword').value;

    if (password !== confirmPassword) {
        alert('两次输入的密码不一致');
        return;
    }

    fetch(`${API_BASE_URL}/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: username,
            password: password
        })
    })
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                localStorage.setItem('pixelTownUsername', data.username);
                localStorage.setItem('pixelTownUserId', data.user_id);
                closeRegisterModal();
                goToMainPage();
            } else {
                alert(data.message || '注册失败');
            }
        })
        .catch(err => {
            console.error('注册错误:', err);
            alert('注册失败，请稍后重试');
        });
}

/**
 * 切换到主页面（无动画版本，用于登录成功后）
 */
function goToMainPageNoAnimation() {
    console.log('goToMainPageNoAnimation 直接跳转');
    document.getElementById('startPage').style.display = 'none';
    document.getElementById('mainPage').style.display = 'block';
    document.getElementById('homePage').style.display = 'block';
    document.getElementById('topFunctionArea').style.display = 'flex';
    document.getElementById('bottomRightBox').style.display = 'flex';

    // 解锁初次造访成就
    if (typeof unlockAchievement === 'function') {
        unlockAchievement('first_visit');
    }

    showModal();
}

/**
 * 切换到主页面（带动画版本，用于已有登录信息时）
 */
function goToMainPage() {
    console.log('goToMainPage 开始执行（带动画）');
    pixelBlockTransition(
        'images/5bccba06f31f48445a2fc3563bc4c39c.jpeg',
        'images/main background.jpg',
        function () {
            document.getElementById('startPage').style.display = 'none';
            document.getElementById('mainPage').style.display = 'block';
            document.getElementById('homePage').style.display = 'block';
            document.getElementById('topFunctionArea').style.display = 'flex';
            document.getElementById('bottomRightBox').style.display = 'flex';

            // 解锁初次造访成就
            if (typeof unlockAchievement === 'function') {
                unlockAchievement('first_visit');
            }
        },
        function () {
            console.log('Transition completed');
            showModal();
        }
    );
}

/**
 * 导航切换函数
 * @param {HTMLElement} element - 点击的导航项元素
 */
function switchNav(element) {
    // 检查是否可以切换导航（弹窗是否关闭且NPC对话是否完成）
    const modalOverlay = document.getElementById('modalOverlay');
    const homepageBlocker = document.getElementById('homepageBlocker');
    const sciencePageBlocker = document.getElementById('sciencePageBlocker');

    // 如果弹窗显示或遮罩层显示，不允许切换导航
    if (modalOverlay && modalOverlay.style.display !== 'none') {
        return;
    }

    if (homepageBlocker && homepageBlocker.style.display !== 'none') {
        return;
    }

    if (sciencePageBlocker) {
        return;
    }

    // 移除所有导航项的active类
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
    // 为点击的导航项添加active类
    element.classList.add('active');

    // 隐藏所有页面内容
    document.querySelectorAll('.page-content').forEach(page => {
        page.style.display = 'none';
    });

    // 隐藏顶部功能区
    document.getElementById('topFunctionArea').style.display = 'none';

    // 根据点击的导航项显示对应的页面
    const navText = element.querySelector('span').textContent;
    if (navText === '首页') {
        document.getElementById('homePage').style.display = 'block';
        document.getElementById('topFunctionArea').style.display = 'flex';
        document.getElementById('bottomRightBox').style.display = 'flex';
        // 离开科普页面时隐藏NPC
        if (typeof onLeaveSciencePage === 'function') {
            onLeaveSciencePage();
        }
        // 离开我的页面
        if (typeof onLeaveMinePage === 'function') {
            onLeaveMinePage();
        }
    } else if (navText === '科普') {
        document.getElementById('sciencePage').style.display = 'block';
        document.getElementById('bottomRightBox').style.display = 'flex';
        // 隐藏首页NPC
        const npc4 = document.getElementById('npc-4');
        if (npc4) {
            npc4.style.display = 'none';
        }
        // 隐藏首页遮罩层
        const homepageBlocker = document.getElementById('homepageBlocker');
        if (homepageBlocker) {
            homepageBlocker.style.display = 'none';
        }
        // 隐藏首页对话气泡
        const bubble = document.querySelector('#npc-4 .npc-bubble');
        if (bubble) {
            bubble.remove();
        }
        // 离开我的页面
        if (typeof onLeaveMinePage === 'function') {
            onLeaveMinePage();
        }
        // 调用科普页面初始化函数
        if (typeof onSwitchToSciencePage === 'function') {
            onSwitchToSciencePage();
        }
    } else if (navText === '我的') {
        document.getElementById('minePage').style.display = 'block';
        document.getElementById('bottomRightBox').style.display = 'none';
        // 隐藏首页NPC
        const npc4 = document.getElementById('npc-4');
        if (npc4) {
            npc4.style.display = 'none';
        }
        // 隐藏首页遮罩层
        const homepageBlocker = document.getElementById('homepageBlocker');
        if (homepageBlocker) {
            homepageBlocker.style.display = 'none';
        }
        // 隐藏首页对话气泡
        const bubble = document.querySelector('#npc-4 .npc-bubble');
        if (bubble) {
            bubble.remove();
        }
        // 离开科普页面时隐藏NPC
        if (typeof onLeaveSciencePage === 'function') {
            onLeaveSciencePage();
        }
        // 调用我的页面初始化函数
        if (typeof onSwitchToMinePage === 'function') {
            onSwitchToMinePage();
        }
    }
}

// ==================== 事件监听 ====================

// ==================== 学习大纲功能 ====================

/**
 * 显示学习大纲窗口
 */
function showSyllabusWindow() {
    const existingWindow = document.getElementById('syllabus-window');
    if (existingWindow) {
        existingWindow.remove();
        return;
    }

    const syllabusWindow = document.createElement('div');
    syllabusWindow.className = 'syllabus-window';
    syllabusWindow.id = 'syllabus-window';

    const syllabusData = [
        {
            title: '第一节：重力与弹力',
            items: [
                '重力的基本概念：产生原因、大小和方向',
                '重心概念及等效替代思想',
                '力的图示和示意图',
                '弹力产生的条件',
                '弹力的类型与方向（压力、支持力、拉力）',
                '胡克定律及实验探究'
            ]
        },
        {
            title: '第二节：摩擦力',
            items: [
                '摩擦力的产生条件',
                '静摩擦力和滑动摩擦力的区分',
                '滑动摩擦力的方向判断和计算',
                '静摩擦力的方向判断和大小分析',
                '最大静摩擦力的概念',
                '摩擦力的应用（增大或减小）'
            ]
        },
        {
            title: '第三节：牛顿第三定律',
            items: [
                '力的相互作用概念',
                '作用力和反作用力的概念',
                '区分作用力与平衡力',
                '作用力与反作用力的关系（实验探究）',
                '物体受力分析',
                '牛顿第三定律的应用'
            ]
        },
        {
            title: '第四节：力的合成和分解',
            items: [
                '合力与分力的概念',
                '等效替换思想',
                '平行四边形定则（实验探究）',
                '利用作图和三角函数求解合力或分力',
                '矢量与标量的区别'
            ]
        },
        {
            title: '第五节：共点力的平衡',
            items: [
                '共点力概念',
                '共点力平衡的条件（合力为0）',
                '用平衡条件分析生活和生产中的实际问题',
                '物理学知识的实际应用价值'
            ]
        }
    ];

    const progress = loadSyllabusProgress();

    let contentHTML = '';
    syllabusData.forEach((section, sectionIndex) => {
        contentHTML += `
            <div class="syllabus-item">
                <div class="syllabus-level">${section.title}</div>
                <ul class="syllabus-list">
        `;
        section.items.forEach((item, itemIndex) => {
            const itemId = `syllabus-${sectionIndex}-${itemIndex}`;
            const isChecked = progress[itemId] ? 'checked' : '';
            contentHTML += `
                <li>
                    <label class="syllabus-checkbox-label">
                        <input type="checkbox" class="syllabus-checkbox" id="${itemId}" ${isChecked} onchange="toggleSyllabusItem('${itemId}')">
                        <span class="syllabus-checkbox-custom"></span>
                        <span class="syllabus-item-text">${item}</span>
                    </label>
                </li>
            `;
        });
        contentHTML += `
                </ul>
            </div>
        `;
    });

    const totalItems = syllabusData.reduce((sum, section) => sum + section.items.length, 0);
    const completedItems = Object.values(progress).filter(v => v).length;
    const progressPercent = totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;

    syllabusWindow.innerHTML = `
        <div class="syllabus-header">
            <div class="syllabus-title">物理学习大纲：力的基础知识</div>
            <button class="syllabus-close" onclick="document.getElementById('syllabus-window').remove()">×</button>
        </div>
        <div class="syllabus-progress-bar">
            <div class="syllabus-progress-text">学习进度：${completedItems}/${totalItems} (${progressPercent}%)</div>
            <div class="syllabus-progress-track">
                <div class="syllabus-progress-fill" style="width: ${progressPercent}%"></div>
            </div>
        </div>
        <div class="syllabus-content">
            ${contentHTML}
        </div>
        <div class="syllabus-footer">
            <button class="syllabus-reset-btn" onclick="resetSyllabusProgress()">重置进度</button>
        </div>
    `;

    document.body.appendChild(syllabusWindow);

    setTimeout(() => {
        syllabusWindow.classList.add('show');
    }, 10);
}

/**
 * 加载学习进度
 */
function loadSyllabusProgress() {
    try {
        const saved = localStorage.getItem('syllabusProgress');
        return saved ? JSON.parse(saved) : {};
    } catch (e) {
        return {};
    }
}

/**
 * 保存学习进度
 */
function saveSyllabusProgress(progress) {
    try {
        localStorage.setItem('syllabusProgress', JSON.stringify(progress));
    } catch (e) {
        console.error('保存学习进度失败:', e);
    }
}

/**
 * 切换学习大纲项目状态
 */
function toggleSyllabusItem(itemId) {
    const progress = loadSyllabusProgress();
    progress[itemId] = !progress[itemId];
    saveSyllabusProgress(progress);
    updateSyllabusProgress();
}

/**
 * 更新学习进度显示
 */
function updateSyllabusProgress() {
    const progress = loadSyllabusProgress();
    const syllabusData = [
        { items: ['重力的基本概念：产生原因、大小和方向', '重心概念及等效替代思想', '力的图示和示意图', '弹力产生的条件', '弹力的类型与方向（压力、支持力、拉力）', '胡克定律及实验探究'] },
        { items: ['摩擦力的产生条件', '静摩擦力和滑动摩擦力的区分', '滑动摩擦力的方向判断和计算', '静摩擦力的方向判断和大小分析', '最大静摩擦力的概念', '摩擦力的应用（增大或减小）'] },
        { items: ['力的相互作用概念', '作用力和反作用力的概念', '区分作用力与平衡力', '作用力与反作用力的关系（实验探究）', '物体受力分析', '牛顿第三定律的应用'] },
        { items: ['合力与分力的概念', '等效替换思想', '平行四边形定则（实验探究）', '利用作图和三角函数求解合力或分力', '矢量与标量的区别'] },
        { items: ['共点力概念', '共点力平衡的条件（合力为0）', '用平衡条件分析生活和生产中的实际问题', '物理学知识的实际应用价值'] }
    ];

    const totalItems = syllabusData.reduce((sum, section) => sum + section.items.length, 0);
    const completedItems = Object.values(progress).filter(v => v).length;
    const progressPercent = totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;

    const progressText = document.querySelector('.syllabus-progress-text');
    const progressFill = document.querySelector('.syllabus-progress-fill');

    if (progressText) {
        progressText.textContent = `学习进度：${completedItems}/${totalItems} (${progressPercent}%)`;
    }
    if (progressFill) {
        progressFill.style.width = `${progressPercent}%`;
    }
}

/**
 * 创建重置进度确认弹窗
 */
function createResetProgressModal() {
    // 检查弹窗是否已存在
    if (document.querySelector('.reset-progress-modal')) {
        return;
    }

    const modal = document.createElement('div');
    modal.className = 'reset-progress-modal delete-confirm-modal';
    modal.innerHTML = `
        <div class="delete-confirm-header">
            <h3 class="delete-confirm-title">确认</h3>
            <button class="delete-confirm-close" onclick="hideResetProgressModal()">×</button>
        </div>
        <div class="delete-confirm-content">
            <p class="delete-confirm-text">确定要重置所有学习进度吗？</p>
        </div>
        <div class="delete-confirm-footer">
            <button class="delete-confirm-btn cancel" onclick="hideResetProgressModal()">取消</button>
            <button class="delete-confirm-btn confirm" onclick="confirmResetProgress()">确定</button>
        </div>
    `;
    document.body.appendChild(modal);
}

/**
 * 显示重置进度确认弹窗
 */
function showResetProgressModal() {
    createResetProgressModal();
    const modal = document.querySelector('.reset-progress-modal');
    modal.classList.add('show');
}

/**
 * 隐藏重置进度确认弹窗
 */
function hideResetProgressModal() {
    const modal = document.querySelector('.reset-progress-modal');
    if (modal) {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.remove();
        }, 300);
    }
}

/**
 * 确认重置进度
 */
function confirmResetProgress() {
    localStorage.removeItem('syllabusProgress');
    const checkboxes = document.querySelectorAll('.syllabus-checkbox');
    checkboxes.forEach(checkbox => {
        checkbox.checked = false;
    });
    updateSyllabusProgress();
    hideResetProgressModal();
}

/**
 * 重置学习进度
 */
function resetSyllabusProgress() {
    showResetProgressModal();
}

/**
 * 显示知识网络窗口
 */
function showNetWindow() {
    const existingWindow = document.getElementById('net-window');
    if (existingWindow) {
        existingWindow.remove();
        return;
    }

    const netWindow = document.createElement('div');
    netWindow.className = 'net-window';
    netWindow.id = 'net-window';

    const knowledgeData = [
        {
            level: 'I',
            levelDesc: '了解和认识',
            items: [
                { id: 'friction', name: '滑动摩擦力、动摩擦因数、静摩擦力' },
                { id: 'deformation', name: '形变、弹性、胡克定律' },
                { id: 'vector', name: '矢量和标量' },
                { id: 'weight', name: '超重和失重' }
            ]
        },
        {
            level: 'II',
            levelDesc: '理解和应用',
            items: [
                { id: 'composition', name: '力的合成和分解' },
                { id: 'equilibrium', name: '共点力的平衡' },
                { id: 'newton', name: '牛顿运动定律及其应用' }
            ]
        }
    ];

    let contentHTML = '';
    knowledgeData.forEach((level, levelIndex) => {
        contentHTML += `
            <div class="net-section">
                <div class="net-level-header level-${level.level}">
                    <span class="net-level-badge">${level.level}</span>
                    <span class="net-level-desc">${level.levelDesc}</span>
                </div>
                <div class="net-items-grid">
        `;
        level.items.forEach((item, itemIndex) => {
            contentHTML += `
                <div class="net-item-card" onclick="showKnowledgeDetail('${item.id}', '${item.name}')">
                    <div class="net-item-icon">${getKnowledgeIcon(item.id)}</div>
                    <div class="net-item-name">${item.name}</div>
                    <div class="net-item-arrow">→</div>
                </div>
            `;
        });
        contentHTML += `
                </div>
            </div>
        `;
    });

    netWindow.innerHTML = `
        <div class="net-header">
            <div class="net-title">学习知识网络</div>
            <button class="net-close" onclick="document.getElementById('net-window').remove()">×</button>
        </div>
        <div class="net-content">
            <div class="net-legend">
                <div class="net-legend-item">
                    <span class="net-legend-badge level-I">I</span>
                    <span class="net-legend-text">了解和认识：知道内容及含义，能在问题中识别和直接使用</span>
                </div>
                <div class="net-legend-item">
                    <span class="net-legend-badge level-II">II</span>
                    <span class="net-legend-text">理解和应用：理解确切含义及联系，能在分析、综合、推理和判断中运用</span>
                </div>
            </div>
            ${contentHTML}
        </div>
    `;

    document.body.appendChild(netWindow);

    setTimeout(() => {
        netWindow.classList.add('show');
    }, 10);
}

/**
 * 获取知识图标
 */
function getKnowledgeIcon(id) {
    const icons = {
        'friction': '🔥',
        'deformation': '📐',
        'vector': '➡️',
        'weight': '⚖️',
        'composition': '🔗',
        'equilibrium': '⚖️',
        'newton': '🍎'
    };
    return icons[id] || '📚';
}

/**
 * 显示知识详情
 */
function showKnowledgeDetail(id, name) {
    const knowledgeDetails = {
        'friction': {
            title: '摩擦力',
            categories: [
                {
                    name: '滑动摩擦力',
                    points: [
                        '产生条件：接触面粗糙、物体间相互接触且挤压、两物体间有相对运动',
                        '方向：总是沿着接触面，并且跟物体相对运动方向相反',
                        '大小：滑动摩擦力的大小跟压力成正比',
                        '公式：Ff = μFN，μ是动摩擦因数',
                        '动摩擦因数：只跟相互接触的两个物体的材料和接触面的粗糙程度有关，无单位',
                        '作用效果：是阻碍物体间的相对运动，而不是阻碍物体的运动'
                    ]
                },
                {
                    name: '静摩擦力',
                    points: [
                        '产生条件：接触面粗糙、物体间相互接触且挤压、两物体间有相对运动趋势',
                        '方向：总是沿着接触面，并且跟物体相对运动趋势方向相反',
                        '大小：随着产生相对运动趋势的外力大小的变化而变化',
                        '大小与压力无关',
                        '大小取值范围：0 < F ≤ Fm',
                        '最大静摩擦力大于滑动摩擦力',
                        '作用效果：是阻碍物体间的相对运动趋势'
                    ]
                }
            ]
        },
        'deformation': {
            title: '形变、弹性、胡克定律',
            categories: [
                {
                    name: '弹力的产生条件',
                    points: [
                        '相互接触（互相挤压、拉伸或扭曲）',
                        '发生弹性形变'
                    ]
                },
                {
                    name: '弹力的方向',
                    points: [
                        '压力和支持力的方向垂直于物体的接触面',
                        '绳的拉力沿着绳而指向绳收缩的方向',
                        '杆的弹力方向不一定沿杆的方向'
                    ]
                },
                {
                    name: '胡克定律',
                    points: [
                        '内容：弹簧发生弹性形变时，弹力大小F跟弹簧伸长（或缩短）长度x成正比',
                        '公式：F = kx',
                        'k为弹簧的劲度系数，单位为牛顿每米，符号N/m',
                        'k的大小反映了弹簧的软硬程度',
                        '适用条件：在弹簧的弹性限度内'
                    ]
                }
            ]
        },
        'vector': {
            title: '矢量和标量',
            categories: [
                {
                    name: '矢量',
                    points: [
                        '既有大小又有方向',
                        '相加时遵从平行四边形定则'
                    ]
                },
                {
                    name: '标量',
                    points: [
                        '只有大小，没有方向',
                        '相加时遵从算术法则'
                    ]
                },
                {
                    name: '合力和分力',
                    points: [
                        '共点力：几个力如果都作用在物体的同一点，或者它们的作用线相交于一点',
                        '合力：一个力单独作用的效果跟某几个力共同作用的效果相同',
                        '分力：几个力共同作用的效果跟某个力单独作用的效果相同'
                    ]
                }
            ]
        },
        'weight': {
            title: '超重和失重',
            categories: [
                {
                    name: '重力',
                    points: [
                        '产生原因：由于地球的吸引',
                        '重力大小：G = mg',
                        '重力的方向：竖直向下',
                        '重心的位置：形状规则、质量分布均匀的物体的重心在其几何中心',
                        '质量分布不均匀的物体，重心的位置除了跟物体的形状有关外，还跟物体内质量分布有关',
                        '重心的位置可以在物体上，也可以在物体外',
                        '悬挂法确定重心'
                    ]
                }
            ]
        },
        'composition': {
            title: '力的合成和分解',
            categories: [
                {
                    name: '力的合成',
                    points: [
                        '定义：求几个力的合力的过程',
                        '合成规律：平行四边形定则',
                        '多个力的合成：先求出任意两个力的合力，再求出这个合力跟第三个力的合力',
                        '两分力共线时：同向则合力=F1+F2，反向则合力=|F1-F2|'
                    ]
                },
                {
                    name: '力的分解',
                    points: [
                        '定义：求一个力的分力的过程',
                        '分解规律：力的分解是力的合成的逆运算，同样遵从平行四边形定则',
                        '两分力大小一定时，分力夹角越大，合力越小',
                        '两个力的合力的大小范围：|F1-F2| ≤ F ≤ F1+F2'
                    ]
                }
            ]
        },
        'equilibrium': {
            title: '共点力的平衡',
            categories: [
                {
                    name: '平衡状态',
                    points: [
                        '定义：物体受到几个力作用时，如果保持静止或匀速直线运动状态',
                        'v=0时：静止，处于平衡状态',
                        'a=0时：不静止，处于非平衡状态'
                    ]
                },
                {
                    name: '共点力平衡的条件',
                    points: [
                        '条件：在共点力作用下物体平衡的条件是合力为0',
                        '公式：F合=0，或Fx合=0和Fy合=0',
                        '二力平衡：二力等大、反向，是一对平衡力',
                        '三力平衡：任两个力的合力与第三个力等大、反向',
                        '多力平衡：任一力与其他所有力的合力等大、反向'
                    ]
                },
                {
                    name: '动态平衡问题',
                    points: [
                        '特点：物体受到的共点力中有几个力会发生缓慢变化，而变化过程中物体始终处于平衡状态',
                        '解析法：建立平衡方程，求出已知力与未知力的函数式',
                        '图解法：利用平行四边形定则，作出矢量四边形',
                        '相似三角形法：利用矢量三角形和几何三角形相似作定性分析',
                        '拉密定理法：利用正弦或拉密定理作定性分析'
                    ]
                },
                {
                    name: '整体法和隔离法',
                    points: [
                        '整体法：将运动状态相同的几个物体作为一个整体进行受力分析',
                        '隔离法：将研究对象与周围物体分隔开进行受力分析',
                        '明确研究对象：可以是某一个物体，也可以是保持相对静止的若干个物体',
                        '只分析研究对象以外的物体施予研究对象的力',
                        '只画性质力，不画效果力'
                    ]
                }
            ]
        },
        'newton': {
            title: '牛顿运动定律及其应用',
            categories: [
                {
                    name: '牛顿第三定律',
                    points: [
                        '内容：两个物体之间的作用力和反作用力总是大小相等，方向相反，作用在一条直线上',
                        '公式：F = -F\'（负号表示作用力与反作用力的方向相反）',
                        '三个特征：等值、反向、共线',
                        '四个性质：异体性、同时性、相互性、同质性'
                    ]
                },
                {
                    name: '平衡力与作用力、反作用力比较',
                    points: [
                        '作用对象：平衡力作用于同一物体，作用力与反作用力作用于两个物体',
                        '作用效果：平衡力效果可抵消，作用力与反作用力效果不能抵消',
                        '力的性质：平衡力不一定相同，作用力与反作用力一定相同',
                        '作用时间：平衡力不一定同时变化消失，作用力与反作用力同时产生、消失、变化',
                        '相同点：等值、反向、共线'
                    ]
                },
                {
                    name: '受力分析的方法和步骤',
                    points: [
                        '明确研究对象：可以是某个物体、物体的一部分或几个物体组成的整体',
                        '按照顺序分析受力：先分析重力，再分析弹力，然后分析摩擦力，最后分析其他力',
                        '画受力示意图：每分析一个力的同时画出它的示意图',
                        '环绕物体一周，找出跟研究对象接触的物体，并逐个分析'
                    ]
                }
            ]
        }
    };

    const detail = knowledgeDetails[id];
    if (!detail) {
        alert(`知识点：${name}\n\n知识点细分功能开发中...\n\n请稍后再试！`);
        return;
    }

    showKnowledgeDetailWindow(detail);
}

/**
 * 显示知识详情窗口
 */
function showKnowledgeDetailWindow(detail) {
    const existingWindow = document.getElementById('knowledge-detail-window');
    if (existingWindow) {
        existingWindow.remove();
        return;
    }

    const detailWindow = document.createElement('div');
    detailWindow.className = 'knowledge-detail-window';
    detailWindow.id = 'knowledge-detail-window';

    let categoriesHTML = '';
    if (detail.categories && Array.isArray(detail.categories)) {
        categoriesHTML = detail.categories.map(function (category) {
            let pointsHTML = category.points.map(function (point) {
                return '<li>' + point + '</li>';
            }).join('');
            return '<div class="detail-category"><h4 class="detail-category-title">' + category.name + '</h4><ul class="detail-points">' + pointsHTML + '</ul></div>';
        }).join('');
    }

    detailWindow.innerHTML = '<div class="detail-header"><div class="detail-title">' + detail.title + '</div><button class="detail-close" onclick="document.getElementById(\'knowledge-detail-window\').remove()">×</button></div><div class="detail-content">' + categoriesHTML + '</div>';

    document.body.appendChild(detailWindow);

    setTimeout(() => {
        detailWindow.classList.add('show');
    }, 10);
}

// ==================== 笔记功能 ====================

// 记笔记窗口状态
let noteWindowVisible = false;
let noteContent = '';

// 笔记分页功能
let notePages = [];
let currentPageId = null;

// 切换记笔记窗口
function toggleNoteWindow() {
    // 解锁笔记达人成就
    if (typeof unlockAchievement === 'function') {
        unlockAchievement('note_taker');
    }

    const noteWindow = document.getElementById('note-window');

    if (noteWindowVisible) {
        const editor = document.getElementById('note-editor');
        if (editor) {
            editor.removeEventListener('click', updateToolbarButtons);
            editor.removeEventListener('keyup', updateToolbarButtons);
            editor.removeEventListener('mouseup', updateToolbarButtons);
            editor.removeEventListener('input', updateToolbarButtons);
        }
        noteWindow.classList.remove('show');
        setTimeout(() => {
            noteWindow.remove();
        }, 300);
        noteWindowVisible = false;
    } else {
        showNoteWindow();
        noteWindowVisible = true;
    }
}

// 显示记笔记窗口
function showNoteWindow() {
    const noteWindow = document.createElement('div');
    noteWindow.className = 'note-window';
    noteWindow.id = 'note-window';

    noteWindow.innerHTML = `
        <div class="note-header">
            <div class="note-title">记笔记</div>
            <button class="note-close" onclick="toggleNoteWindow()">×</button>
        </div>
        <div class="note-toolbar">
            <button class="note-toolbar-btn" onclick="applyFormat('bold')" title="加粗">B</button>
            <button class="note-toolbar-btn" onclick="applyFormat('underline')" title="下划线">U</button>
            <button class="note-toolbar-btn" onclick="applyFormat('h1')" title="标题1">H1</button>
            <button class="note-toolbar-btn" onclick="applyFormat('h2')" title="标题2">H2</button>
            <button class="note-toolbar-btn" onclick="applyFormat('h3')" title="标题3">H3</button>
            <button class="note-toolbar-btn" onclick="applyFormat('h4')" title="标题4">H4</button>
            <div class="note-color-picker">
                <button class="note-color-btn" onclick="toggleColorPalette()" title="选择文字颜色">
                    <span class="note-color-indicator" id="note-color-indicator"></span>
                </button>
                <span class="note-color-label">颜色</span>
                <div class="note-color-palette" id="note-color-palette">
                    <div class="color-palette-grid">
                        <button class="color-palette-item" style="background-color: #ffffff" onclick="applyColor('#ffffff')"></button>
                        <button class="color-palette-item" style="background-color: #ff0000" onclick="applyColor('#ff0000')"></button>
                        <button class="color-palette-item" style="background-color: #00ff00" onclick="applyColor('#00ff00')"></button>
                        <button class="color-palette-item" style="background-color: #0000ff" onclick="applyColor('#0000ff')"></button>
                        <button class="color-palette-item" style="background-color: #ffff00" onclick="applyColor('#ffff00')"></button>
                        <button class="color-palette-item" style="background-color: #ff00ff" onclick="applyColor('#ff00ff')"></button>
                        <button class="color-palette-item" style="background-color: #00ffff" onclick="applyColor('#00ffff')"></button>
                        <button class="color-palette-item" style="background-color: #ff8800" onclick="applyColor('#ff8800')"></button>
                        <button class="color-palette-item" style="background-color: #88ff00" onclick="applyColor('#88ff00')"></button>
                        <button class="color-palette-item" style="background-color: #0088ff" onclick="applyColor('#0088ff')"></button>
                        <button class="color-palette-item" style="background-color: #ff0088" onclick="applyColor('#ff0088')"></button>
                        <button class="color-palette-item" style="background-color: #8800ff" onclick="applyColor('#8800ff')"></button>
                        <button class="color-palette-item" style="background-color: #888888" onclick="applyColor('#888888')"></button>
                        <button class="color-palette-item" style="background-color: #444444" onclick="applyColor('#444444')"></button>
                        <button class="color-palette-item" style="background-color: #000000" onclick="applyColor('#000000')"></button>
                        <button class="color-palette-item" style="background-color: #ffd700" onclick="applyColor('#ffd700')"></button>
                    </div>
                </div>
            </div>
            <button class="note-toolbar-btn" onclick="clearFormat()" title="清除格式">清除</button>
        </div>
        <div class="note-page-nav" id="note-page-nav">
            <div class="page-tabs-container" id="page-tabs">
            </div>
            <div class="page-actions">
                <button class="note-page-btn" onclick="prevPage()" title="上一页">◀</button>
                <button class="note-page-btn" onclick="nextPage()" title="下一页">▶</button>
                <button class="note-page-btn" onclick="createNewPage()" title="新建页面">新建</button>
                <button class="note-page-btn delete-btn" onclick="deleteCurrentPage()" title="删除当前页面">删除</button>
            </div>
        </div>
        <div class="note-content">
            <div class="note-editor" id="note-editor" contenteditable="true" placeholder="在这里记下你的笔记...">${noteContent}</div>
        </div>
        <div class="note-footer">
            <button class="note-btn secondary" onclick="clearNoteContent()">清空</button>
            <button class="note-btn" onclick="saveNoteContent()">保存</button>
        </div>
        <div class="note-resize-handle"></div>
    `;

    document.body.appendChild(noteWindow);

    setTimeout(() => {
        noteWindow.classList.add('show');
    }, 10);

    setTimeout(() => {
        const editor = document.getElementById('note-editor');
        if (editor && !noteContent) {
            editor.focus();
        }

        if (editor) {
            editor.addEventListener('click', updateToolbarButtons);
            editor.addEventListener('keyup', updateToolbarButtons);
            editor.addEventListener('mouseup', updateToolbarButtons);
            editor.addEventListener('input', () => {
                updateToolbarButtons();
            });
        }

        updateColorIndicator('#ffffff');
        initializeNotePages();
    }, 100);

    makeNoteDraggable(noteWindow);
    makeNoteResizable(noteWindow);
}

// 使note窗口可拖动
function makeNoteDraggable(element) {
    const header = element.querySelector('.note-header');
    let isDragging = false;
    let dragOffsetX, dragOffsetY;

    header.addEventListener('mousedown', (e) => {
        if (e.target.classList.contains('note-close')) return;
        isDragging = true;
        element.classList.add('dragging');
        dragOffsetX = e.clientX - element.offsetLeft;
        dragOffsetY = e.clientY - element.offsetTop;
        element.style.transition = 'none';
    });

    document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        e.preventDefault();
        let newX = Math.max(0, Math.min(e.clientX - dragOffsetX, window.innerWidth - element.offsetWidth));
        let newY = Math.max(0, Math.min(e.clientY - dragOffsetY, window.innerHeight - element.offsetHeight));
        element.style.left = newX + 'px';
        element.style.top = newY + 'px';
    });

    document.addEventListener('mouseup', () => {
        if (isDragging) {
            isDragging = false;
            element.classList.remove('dragging');
            element.style.transition = 'all 0.3s ease';
        }
    });
}

// 使note窗口可缩放
function makeNoteResizable(element) {
    const resizeHandle = element.querySelector('.note-resize-handle');
    if (!resizeHandle) return;

    let isResizing = false;
    let startX, startY, startWidth, startHeight;
    const minWidth = 300;
    const minHeight = 200;

    resizeHandle.addEventListener('mousedown', (e) => {
        isResizing = true;
        startX = e.clientX;
        startY = e.clientY;
        startWidth = element.offsetWidth;
        startHeight = element.offsetHeight;
        element.style.transition = 'none';
        e.preventDefault();
    });

    document.addEventListener('mousemove', (e) => {
        if (!isResizing) return;

        const deltaX = e.clientX - startX;
        const deltaY = e.clientY - startY;

        let newWidth = startWidth + deltaX;
        let newHeight = startHeight + deltaY;

        // 限制最小尺寸
        newWidth = Math.max(minWidth, newWidth);
        newHeight = Math.max(minHeight, newHeight);

        // 限制最大尺寸（不超过窗口大小）
        newWidth = Math.min(newWidth, window.innerWidth - element.offsetLeft);
        newHeight = Math.min(newHeight, window.innerHeight - element.offsetTop);

        element.style.width = newWidth + 'px';
        element.style.height = newHeight + 'px';
    });

    document.addEventListener('mouseup', () => {
        if (isResizing) {
            isResizing = false;
            element.style.transition = 'all 0.3s ease';
        }
    });
}

// 应用格式
function applyFormat(format) {
    const editor = document.getElementById('note-editor');
    if (!editor) return;

    switch (format) {
        case 'bold':
            document.execCommand('bold', false, null);
            break;
        case 'underline':
            document.execCommand('underline', false, null);
            break;
        case 'h1':
            document.execCommand('formatBlock', false, 'h1');
            break;
        case 'h2':
            document.execCommand('formatBlock', false, 'h2');
            break;
        case 'h3':
            document.execCommand('formatBlock', false, 'h3');
            break;
        case 'h4':
            document.execCommand('formatBlock', false, 'h4');
            break;
    }
    editor.focus();
    updateToolbarButtons();
}

// 应用文字颜色
function applyColor(color) {
    const editor = document.getElementById('note-editor');
    if (!editor) return;

    document.execCommand('foreColor', false, color);
    editor.focus();
    updateToolbarButtons();
    updateColorIndicator(color);
    hideColorPalette();
}

// 切换颜色面板显示
function toggleColorPalette() {
    const palette = document.getElementById('note-color-palette');
    if (palette) {
        palette.classList.toggle('show');
    }
}

// 隐藏颜色面板
function hideColorPalette() {
    const palette = document.getElementById('note-color-palette');
    if (palette) {
        palette.classList.remove('show');
    }
}

// 更新颜色指示器
function updateColorIndicator(color) {
    const indicator = document.getElementById('note-color-indicator');
    if (indicator) {
        indicator.style.backgroundColor = color || '#ffffff';
    }
}

// 清除格式
function clearFormat() {
    const editor = document.getElementById('note-editor');
    if (!editor) return;

    const selection = window.getSelection();
    if (selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        const selectedText = range.toString();

        if (selectedText) {
            document.execCommand('removeFormat', false, null);
            document.execCommand('formatBlock', false, 'p');
        } else {
            document.execCommand('removeFormat', false, null);
            document.execCommand('formatBlock', false, 'p');
        }
    } else {
        document.execCommand('removeFormat', false, null);
        document.execCommand('formatBlock', false, 'p');
    }

    editor.focus();
    updateToolbarButtons();
}

// 更新工具栏按钮的选中状态
function updateToolbarButtons() {
    const editor = document.getElementById('note-editor');
    if (!editor) return;

    const buttons = document.querySelectorAll('.note-toolbar-btn');
    buttons.forEach(btn => {
        btn.classList.remove('active');
    });

    if (document.queryCommandState('bold')) {
        const boldBtn = document.querySelector('.note-toolbar-btn[onclick*="bold"]');
        if (boldBtn) boldBtn.classList.add('active');
    }

    if (document.queryCommandState('underline')) {
        const underlineBtn = document.querySelector('.note-toolbar-btn[onclick*="underline"]');
        if (underlineBtn) underlineBtn.classList.add('active');
    }

    const selection = window.getSelection();
    if (selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        let node = range.startContainer;

        while (node && node !== editor) {
            if (node.nodeType === Node.ELEMENT_NODE) {
                const tagName = node.tagName.toLowerCase();
                if (['h1', 'h2', 'h3', 'h4', 'p'].includes(tagName)) {
                    const headerBtn = document.querySelector(`.note-toolbar-btn[onclick*="${tagName}"]`);
                    if (headerBtn) headerBtn.classList.add('active');
                }
            }
            node = node.parentNode;
        }
    }
}

// 创建保存成功弹窗
function createSaveSuccessModal() {
    // 检查弹窗是否已存在
    if (document.querySelector('.save-success-modal')) {
        return;
    }

    const modal = document.createElement('div');
    modal.className = 'save-success-modal delete-confirm-modal';
    modal.innerHTML = `
        <div class="delete-confirm-header">
            <h3 class="delete-confirm-title">保存成功</h3>
            <button class="delete-confirm-close" onclick="hideSaveSuccessModal()">×</button>
        </div>
        <div class="delete-confirm-content">
            <p class="delete-confirm-text">笔记已保存至云端！</p>
        </div>
        <div class="delete-confirm-footer">
            <button class="delete-confirm-btn confirm" onclick="hideSaveSuccessModal()">确定</button>
        </div>
    `;
    document.body.appendChild(modal);
}

// 同步笔记到服务器
function syncNoteToServer(page) {
    const userId = localStorage.getItem('pixelTownUserId');
    if (!userId) return;

    const noteData = {
        user_id: userId,
        note_title: page.title || '无标题笔记',
        note_content: page.content || ''
    };

    if (page.serverId) {
        noteData.note_id = page.serverId;
        fetch(`${API_BASE_URL}/update_note`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(noteData)
        }).catch(err => console.log('同步笔记失败:', err));
    } else {
        fetch(`${API_BASE_URL}/add_note`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(noteData)
        }).then(res => res.json())
            .then(data => {
                if (data.status === 'success') {
                    page.serverId = data.note_id;
                    localStorage.setItem('pixelTownNotePages', JSON.stringify(notePages));

                    notePages.forEach(p => syncNoteToServer(p));
                }
            })
            .catch(err => console.log('同步笔记失败:', err));
    }
}

// 从服务器加载笔记
function loadNotesFromServer() {
    const userId = localStorage.getItem('pixelTownUserId');
    if (!userId) return Promise.resolve([]);

    return fetch(`${API_BASE_URL}/get_notes?user_id=${userId}`)
        .then(res => res.json())
        .then(data => {
            if (data.status === 'success' && data.data) {
                return data.data;
            }
            return [];
        })
        .catch(err => {
            console.log('加载笔记失败:', err);
            return [];
        });
}

// 显示保存成功弹窗
function showSaveSuccessModal() {
    // 同步笔记到服务器


    // 从服务器加载笔记
    createSaveSuccessModal();
    const modal = document.querySelector('.save-success-modal');
    modal.classList.add('show');
}

// 隐藏保存成功弹窗
function hideSaveSuccessModal() {
    const modal = document.querySelector('.save-success-modal');
    if (modal) {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.remove();
        }, 300);
    }
}

// 保存笔记内容
function saveNoteContent() {
    const editor = document.getElementById('note-editor');
    if (!editor) return;

    const page = notePages.find(p => p.id === currentPageId);
    if (page) {
        page.content = editor.innerHTML;
    }

    // 保存到 localStorage
    try {
        localStorage.setItem('pixelTownNotePages', JSON.stringify(notePages));

        // 同步到服务器
        syncNoteToServer(page);

        showSaveSuccessModal();
    } catch (e) {
        console.log('保存笔记失败:', e);
        alert('保存失败，请重试！');
    }
}


// 初始化笔记分页
function initializeNotePages() {
    // 从服务器加载笔记
    loadNotesFromServer().then(serverNotes => {
        // 合并服务器笔记和本地笔记
        if (serverNotes && serverNotes.length > 0) {
            serverNotes.forEach((note, index) => {
                // 检查本地是否已有该笔记
                const existingPage = notePages.find(p => p.serverId === note.note_id);
                if (!existingPage) {
                    notePages.push({
                        id: `server_${note.note_id}`,
                        serverId: note.note_id,
                        title: note.note_title,
                        content: note.note_content,
                        createdAt: note.created_at,
                        updatedAt: note.updated_at
                    });
                }
            });
            // 保存合并后的笔记
            localStorage.setItem('pixelTownNotePages', JSON.stringify(notePages));
        }

        // 按标题中的数字排序（第1页、第2页...）
        notePages.sort((a, b) => {
            const numA = parseInt(a.title.replace(/\D/g, '')) || 0;
            const numB = parseInt(b.title.replace(/\D/g, '')) || 0;
            return numA - numB;
        });

        // 确保至少有一页
        if (notePages.length === 0) {
            createNewPage('第1页');
        } else {
            currentPageId = notePages[0].id;
            loadPage(currentPageId);
        }

        updatePageTabs();
    }).catch(() => {
        // 如果加载失败，使用本地笔记
        try {
            const savedPages = localStorage.getItem('pixelTownNotePages');
            if (savedPages) {
                notePages = JSON.parse(savedPages);
            }
        } catch (e) {
            console.log('加载笔记页面失败:', e);
            notePages = [];
        }

        if (notePages.length === 0) {
            createNewPage('第1页');
        } else {
            currentPageId = notePages[0].id;
            loadPage(currentPageId);
        }

        updatePageTabs();
    });
}

// 创建新页面
function createNewPage(title = null) {
    const newPage = {
        id: Date.now().toString(),
        title: title || `第${notePages.length + 1}页`,
        content: '',
        createdAt: new Date().toISOString()
    };

    notePages.push(newPage);
    currentPageId = newPage.id;

    loadPage(currentPageId);
    updatePageTabs();
    saveAllPages();
}

// 创建删除确认弹窗
function createDeleteConfirmModal() {
    // 检查弹窗是否已存在
    if (document.querySelector('.delete-confirm-modal')) {
        return;
    }

    const modal = document.createElement('div');
    modal.className = 'delete-confirm-modal';
    modal.innerHTML = `
        <div class="delete-confirm-header">
            <h3 class="delete-confirm-title">确认</h3>
            <button class="delete-confirm-close" onclick="hideDeleteConfirmModal()">×</button>
        </div>
        <div class="delete-confirm-content">
            <p class="delete-confirm-text">确定要删除当前页面吗？</p>
        </div>
        <div class="delete-confirm-footer">
            <button class="delete-confirm-btn cancel" onclick="hideDeleteConfirmModal()">取消</button>
            <button class="delete-confirm-btn confirm" onclick="confirmDeletePage()">确定</button>
        </div>
    `;
    document.body.appendChild(modal);
}

// 创建至少保留一个页面的提示弹窗
function createMinPageConfirmModal() {
    // 检查弹窗是否已存在
    if (document.querySelector('.min-page-confirm-modal')) {
        return;
    }

    const modal = document.createElement('div');
    modal.className = 'min-page-confirm-modal delete-confirm-modal';
    modal.innerHTML = `
        <div class="delete-confirm-header">
            <h3 class="delete-confirm-title">确认</h3>
            <button class="delete-confirm-close" onclick="hideMinPageConfirmModal()">×</button>
        </div>
        <div class="delete-confirm-content">
            <p class="delete-confirm-text">至少需要保留一个页面</p>
        </div>
        <div class="delete-confirm-footer">
            <button class="delete-confirm-btn confirm" onclick="hideMinPageConfirmModal()">确定</button>
        </div>
    `;
    document.body.appendChild(modal);
}

// 显示至少保留一个页面的提示弹窗
function showMinPageConfirmModal() {
    createMinPageConfirmModal();
    const modal = document.querySelector('.min-page-confirm-modal');
    modal.classList.add('show');
}

// 隐藏至少保留一个页面的提示弹窗
function hideMinPageConfirmModal() {
    const modal = document.querySelector('.min-page-confirm-modal');
    if (modal) {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.remove();
        }, 300);
    }
}

// 显示删除确认弹窗
function showDeleteConfirmModal() {
    createDeleteConfirmModal();
    const modal = document.querySelector('.delete-confirm-modal');
    modal.classList.add('show');
}

// 隐藏删除确认弹窗
function hideDeleteConfirmModal() {
    const modal = document.querySelector('.delete-confirm-modal');
    if (modal) {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.remove();
        }, 300);
    }
}

// 确认删除页面
function confirmDeletePage() {
    if (notePages.length <= 1) {
        showMinPageConfirmModal();
        hideDeleteConfirmModal();
        return;
    }

    const index = notePages.findIndex(p => p.id === currentPageId);
    const deletedPage = notePages[index];

    // 删除服务器上的笔记
    if (deletedPage && deletedPage.serverId) {
        fetch(`${API_BASE_URL}/delete_note`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ note_id: deletedPage.serverId })
        }).catch(err => console.log('删除笔记失败:', err));
    }

    notePages.splice(index, 1);

    currentPageId = notePages[Math.max(0, index - 1)].id;
    loadPage(currentPageId);
    renumberPages();
    updatePageTabs();
    saveAllPages();
    hideDeleteConfirmModal();
}

function deleteCurrentPage() {
    if (notePages.length <= 1) {
        showMinPageConfirmModal();
        return;
    }

    showDeleteConfirmModal();
}

// 重新排序页面标题
function renumberPages() {
    notePages.forEach((page, index) => {
        page.title = `第${index + 1}页`;
    });
}

// 加载页面
function loadPage(pageId) {
    const page = notePages.find(p => p.id === pageId);
    if (!page) return;

    currentPageId = pageId;
    const editor = document.getElementById('note-editor');
    if (editor) {
        editor.innerHTML = page.content;
    }

    updatePageTabs();
}

// 上一页
function prevPage() {
    const index = notePages.findIndex(p => p.id === currentPageId);
    if (index > 0) {
        loadPage(notePages[index - 1].id);
    }
}

// 下一页
function nextPage() {
    const index = notePages.findIndex(p => p.id === currentPageId);
    if (index < notePages.length - 1) {
        loadPage(notePages[index + 1].id);
    }
}

// 更新页面标签
function updatePageTabs() {
    const tabsContainer = document.getElementById('page-tabs');
    if (!tabsContainer) return;

    tabsContainer.innerHTML = '';

    notePages.forEach((page, index) => {
        const tab = document.createElement('button');
        tab.className = 'page-tab';
        if (page.id === currentPageId) {
            tab.classList.add('active');
        }
        tab.textContent = page.title;
        tab.onclick = () => loadPage(page.id);
        tabsContainer.appendChild(tab);
    });
}

// 保存所有页面
function saveAllPages() {
    const editor = document.getElementById('note-editor');
    if (editor && currentPageId) {
        const page = notePages.find(p => p.id === currentPageId);
        if (page) {
            page.content = editor.innerHTML;
        }
    }

    try {
        localStorage.setItem('pixelTownNotePages', JSON.stringify(notePages));

        // 同步到服务器
        notePages.forEach(page => {
            syncNoteToServer(page);
        });
    } catch (e) {
        console.log('保存页面失败:', e);
    }
}

// 修改页面标题
function editPageTitle(pageId) {
    const page = notePages.find(p => p.id === pageId);
    if (!page) return;

    const newTitle = prompt('请输入页面标题:', page.title);
    if (newTitle && newTitle.trim()) {
        page.title = newTitle.trim();
        updatePageTabs();
        saveAllPages();
    }
}

// 创建清空确认弹窗
function createClearConfirmModal() {
    // 检查弹窗是否已存在
    if (document.querySelector('.clear-confirm-modal')) {
        return;
    }

    const modal = document.createElement('div');
    modal.className = 'clear-confirm-modal delete-confirm-modal';
    modal.innerHTML = `
        <div class="delete-confirm-header">
            <h3 class="delete-confirm-title">确认</h3>
            <button class="delete-confirm-close" onclick="hideClearConfirmModal()">×</button>
        </div>
        <div class="delete-confirm-content">
            <p class="delete-confirm-text">确定要清空当前页面的内容吗？</p>
        </div>
        <div class="delete-confirm-footer">
            <button class="delete-confirm-btn cancel" onclick="hideClearConfirmModal()">取消</button>
            <button class="delete-confirm-btn confirm" onclick="confirmClearContent()">确定</button>
        </div>
    `;
    document.body.appendChild(modal);
}

// 显示清空确认弹窗
function showClearConfirmModal() {
    createClearConfirmModal();
    const modal = document.querySelector('.clear-confirm-modal');
    modal.classList.add('show');
}

// 隐藏清空确认弹窗
function hideClearConfirmModal() {
    const modal = document.querySelector('.clear-confirm-modal');
    if (modal) {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.remove();
        }, 300);
    }
}

// 确认清空内容
function confirmClearContent() {
    const editor = document.getElementById('note-editor');
    if (!editor) return;

    editor.innerHTML = '';
    const page = notePages.find(p => p.id === currentPageId);
    if (page) {
        page.content = '';
    }
    saveNoteContent();
    hideClearConfirmModal();
}

// 清空笔记内容
function clearNoteContent() {
    showClearConfirmModal();
}

document.addEventListener('DOMContentLoaded', function () {
    // 初始化音频
    initAudio();

    // 初始化弹窗事件
    initModalEvents();

    // 检查登录状态并显示相应内容
    checkLoginStatus();

    // 初始化顶部功能区点击事件
    const functionItems = document.querySelectorAll('.function-item');
    functionItems.forEach(item => {
        const span = item.querySelector('span');
        if (span && span.textContent === '学习大纲') {
            item.addEventListener('click', showSyllabusWindow);
        } else if (span && span.textContent === '知识网络') {
            item.addEventListener('click', showNetWindow);
        }
    });

    // 初始化右下角功能按钮点击事件
    const bottomFunctionItems = document.querySelectorAll('.bottom-function-item');
    bottomFunctionItems.forEach(item => {
        const span = item.querySelector('span');
        if (span && span.textContent === '笔记') {
            item.addEventListener('click', toggleNoteWindow);
        } else if (span && span.textContent === 'AI助手') {
            item.addEventListener('click', toggleAIWindow);
        }
    });

    // 解锁街道探险家成就
    setTimeout(() => {
        if (typeof unlockAchievement === 'function') {
            unlockAchievement('street_explorer');
        }
    }, 5000); // 延迟5秒，确保用户有时间探索页面
});



// ==================== 音频控制功能 ====================

/**
 * 初始化音频播放器
 */
function initAudio() {
    const bgMusic = document.getElementById('bgMusic');
    if (!bgMusic) return;

    // 设置音量
    bgMusic.volume = 0.5;

    // 尝试自动播放
    attemptAutoPlay();

    // 添加错误处理
    bgMusic.addEventListener('error', function (e) {
        console.error('音频加载失败:', e);
        showAudioError();
    });

    // 监听播放状态
    bgMusic.addEventListener('play', function () {
        updateAudioIcon(true);
    });

    bgMusic.addEventListener('pause', function () {
        updateAudioIcon(false);
    });

    // 监听页面可见性变化（按主页键、切换应用等）
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // 监听页面隐藏事件（移动端返回键等）
    window.addEventListener('pagehide', handlePageHide);

    // 监听页面失去焦点
    window.addEventListener('blur', handlePageBlur);

    // 监听页面重新获得焦点
    window.addEventListener('focus', handlePageFocus);
}

/**
 * 处理页面可见性变化
 */
function handleVisibilityChange() {
    const bgMusic = document.getElementById('bgMusic');
    if (!bgMusic) return;

    if (document.hidden) {
        // 页面隐藏时暂停音频
        if (!bgMusic.paused) {
            bgMusic.pause();
            console.log('页面隐藏，音频已暂停');
        }
    } else {
        // 页面可见时恢复播放
        if (bgMusic.paused) {
            bgMusic.play()
                .then(function () {
                    console.log('页面可见，音频恢复播放');
                })
                .catch(function (error) {
                    console.log('页面可见，但音频播放失败:', error);
                });
        }
    }
}

/**
 * 处理页面隐藏事件
 */
function handlePageHide() {
    const bgMusic = document.getElementById('bgMusic');
    if (!bgMusic) return;

    if (!bgMusic.paused) {
        bgMusic.pause();
        console.log('页面即将隐藏，音频已暂停');
    }
}

/**
 * 处理页面失去焦点
 */
function handlePageBlur() {
    const bgMusic = document.getElementById('bgMusic');
    if (!bgMusic) return;

    if (!bgMusic.paused) {
        bgMusic.pause();
        console.log('页面失去焦点，音频已暂停');
    }
}

/**
 * 处理页面获得焦点
 */
function handlePageFocus() {
    const bgMusic = document.getElementById('bgMusic');
    if (!bgMusic) return;

    if (bgMusic.paused) {
        bgMusic.play()
            .then(function () {
                console.log('页面获得焦点，音频恢复播放');
            })
            .catch(function (error) {
                console.log('页面获得焦点，但音频播放失败:', error);
            });
    }
}

/**
 * 尝试自动播放音频
 */
function attemptAutoPlay() {
    const bgMusic = document.getElementById('bgMusic');
    if (!bgMusic) return;

    const playPromise = bgMusic.play();

    if (playPromise !== undefined) {
        playPromise
            .then(function () {
                console.log('音频自动播放成功');
            })
            .catch(function (error) {
                console.log('自动播放被阻止，等待用户交互:', error);
                // 自动播放被阻止，等待用户点击页面后播放
                document.addEventListener('click', playAudioOnInteraction, { once: true });
                document.addEventListener('touchstart', playAudioOnInteraction, { once: true });
            });
    }
}

/**
 * 用户交互后播放音频
 */
function playAudioOnInteraction() {
    const bgMusic = document.getElementById('bgMusic');
    if (bgMusic && bgMusic.paused) {
        bgMusic.play()
            .then(function () {
                console.log('用户交互后音频播放成功');
            })
            .catch(function (error) {
                console.error('用户交互后音频播放失败:', error);
            });
    }
}

/**
 * 切换音频播放/暂停
 */
function toggleAudio() {
    const bgMusic = document.getElementById('bgMusic');
    if (!bgMusic) return;

    if (bgMusic.paused) {
        bgMusic.play()
            .then(function () {
                console.log('音频播放成功');
            })
            .catch(function (error) {
                console.error('音频播放失败:', error);
                showAudioError();
            });
    } else {
        bgMusic.pause();
        console.log('音频已暂停');
    }
}

/**
 * 更新音频图标
 * @param {boolean} isPlaying - 是否正在播放
 */
function updateAudioIcon(isPlaying) {
    const audioIcon = document.getElementById('audioIcon');
    if (!audioIcon) return;

    if (isPlaying) {
        audioIcon.src = 'images/Volume_on.png';
        audioIcon.alt = '静音';
    } else {
        audioIcon.src = 'images/Volume_off.png';
        audioIcon.alt = '播放';
    }
}

/**
 * 显示音频错误提示
 */
function showAudioError() {
    const audioControl = document.getElementById('audioControl');
    if (audioControl) {
        audioControl.style.opacity = '0.5';
        audioControl.title = '音频加载失败';
    }
}

// ==================== 第二关页面功能 ====================

/**
 * 初始化关卡点击事件
 */
function initLevelClickEvents() {
    // 为第二关添加点击事件
    const levelItems = document.querySelectorAll('.level-item');
    if (levelItems.length >= 2) {
        levelItems[1].addEventListener('click', showLevel2Page);
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

// ==================== 第二关学习中心页面功能 ====================

/**
 * 显示第二关学习中心页面
 */
function showLevel2LearningCenter() {
    document.getElementById('level2Page').style.display = 'none';
    document.getElementById('level2LearningCenterPage').style.display = 'block';
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
    const navItems = document.querySelectorAll('.learning-nav .nav-item');
    navItems.forEach(item => item.classList.remove('active'));

    // 添加当前标签的active类
    tab.classList.add('active');

    // 隐藏所有内容
    const tabContents = document.querySelectorAll('#level2LearningCenterPage .tab-content');
    tabContents.forEach(content => content.style.display = 'none');

    // 显示当前标签内容
    document.getElementById('level2-' + tabId + '-content').style.display = 'block';
}



// ==================== 第二关实战演练页面功能 ====================

/**
 * 打开第二关实战演练页面
 */
function openLevel2PracticePage() {
    document.getElementById('level2Page').style.display = 'none';
    document.getElementById('level2PracticePage').style.display = 'block';
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
    const navItems = document.querySelectorAll('.practice-nav .practice-nav-item');
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
            uploadedImages.innerHTML = `<img src="${imageUrl}" alt="上传的图片" style="max-width: 100%; height: auto; margin: 10px 0; border-radius: 8px;">`;
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
            uploadedImages.innerHTML = `<img src="${imageUrl}" alt="上传的图片" style="max-width: 100%; height: auto; margin: 10px 0; border-radius: 8px;">`;
        };
        reader.readAsDataURL(file);
    }
}

/**
 * 提交第二关实战演练答案
 */
function submitLevel2Practice() {
    // 获取选择题答案
    const q1Answer = document.querySelector('input[name="level2-test-q1"]:checked');
    const q2Answer = document.querySelector('input[name="level2-test-q2"]:checked');
    const q3Answer = document.querySelector('input[name="level2-test-q3"]:checked');

    // 获取填空题答案
    const fillQ1 = document.getElementById('level2-fill-q1').value;
    const fillQ2 = document.getElementById('level2-fill-q2').value;
    const fillQ3 = document.getElementById('level2-fill-q3').value;

    // 检查是否完成所有题目
    if (!q1Answer || !q2Answer || !q3Answer || !fillQ1 || !fillQ2 || !fillQ3) {
        alert('请完成所有题目后再提交！');
        return;
    }

    // 计算得分（简化版）
    let score = 0;
    if (q1Answer.value === 'c') {
        score += 10;
    } else {
        trackQuestionResult('level2', 'choice', 1, false);
    }
    if (q2Answer.value === 'b') {
        score += 10;
    } else {
        trackQuestionResult('level2', 'choice', 2, false);
    }
    if (q3Answer.value === 'c') {
        score += 10;
    } else {
        trackQuestionResult('level2', 'choice', 3, false);
    }
    if (fillQ1.includes('0 ≤ F ≤ Fmax') || fillQ1.includes('相对运动趋势')) {
        score += 10;
    } else {
        trackQuestionResult('level2', 'fill', 1, false);
    }
    if (fillQ2.includes('接触面材料') || fillQ2.includes('粗糙程度')) {
        score += 10;
    } else {
        trackQuestionResult('level2', 'fill', 2, false);
    }
    if (fillQ3 === '20') {
        score += 10;
    } else {
        trackQuestionResult('level2', 'fill', 3, false);
    }

    // 显示结果
    const resultModal = document.createElement('div');
    resultModal.className = 'practice-result-modal';
    resultModal.innerHTML = `
        <div class="practice-result-content">
            <h3>测试结果</h3>
            <p>你的得分：${score}/60</p>
            <div class="result-buttons">
                <button class="result-btn" onclick="closeLevel2PracticePage()">返回关卡</button>
                <button class="result-btn" onclick="showLevel2PracticeAnswerExplanation()">查看解析</button>
            </div>
        </div>
    `;
    document.body.appendChild(resultModal);
}

/**
 * 显示第二关答案解析
 */
function showLevel2PracticeAnswerExplanation() {
    // 关闭当前结果弹窗
    const resultModal = document.querySelector('.practice-result-modal');
    if (resultModal) {
        resultModal.remove();
    }

    // 第二关实战演练的答案解析
    const explanations = [
        {
            question: '关于摩擦力，下列说法正确的是（　　）',
            explanation: '摩擦力的方向总是与物体相对运动或相对运动趋势方向相反，而不是与物体运动方向相反，A错误；静摩擦力的大小与正压力无关，B错误；摩擦力可以是动力也可以是阻力，C正确；摩擦力总是阻碍物体的相对运动，而不是阻碍物体的运动，D错误。\n结论：选项C正确。'
        },
        {
            question: '一个物体在水平地面上受到水平拉力 F 的作用，当 F=5N 时，物体恰好做匀速直线运动，则物体与地面间的动摩擦因数为 0.2，物体的质量为（　　）',
            explanation: '物体匀速运动时，拉力等于滑动摩擦力，即 F = μmg。\n已知 F=5N，μ=0.2，g=10m/s²，代入公式得：\n5 = 0.2 × m × 10 ⇒ m = 5 / (0.2 × 10) = 2.5kg\n结论：物体的质量为2.5kg，选项B正确。'
        },
        {
            question: '关于静摩擦力，下列说法正确的是（　　）',
            explanation: '静摩擦力的方向总是与物体相对运动趋势方向相反，而不是与物体运动方向相反，A错误；静摩擦力的大小与正压力无关，B错误；静摩擦力的最大值与正压力成正比，C正确；静摩擦力总是阻碍物体的相对运动趋势，而不是阻碍物体的运动，D错误。\n结论：选项C正确。'
        },
    ];
}

/**
 * 提交第二关当堂检测答案
 */
function submitLevel2Test() {
    // 获取答案
    const q1Answer = document.querySelector('input[name="level2-q1"]:checked');
    const q2Answer = document.querySelector('input[name="level2-q2"]:checked');
    const q3Answer = document.querySelector('input[name="level2-q3"]:checked');

    // 检查是否完成所有题目
    if (!q1Answer || !q2Answer || !q3Answer) {
        alert('请完成所有题目后再提交！');
        return;
    }

    // 计算得分（简化版）
    let score = 0;
    if (q1Answer.value === 'c') score += 10;
    if (q2Answer.value === 'a') score += 10;
    if (q3Answer.value === 'c') score += 10;

    // 显示结果
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
 * 提交检测答案
 */
function submitLevel6Practice() {
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
    const practiceContent = document.querySelector('#level5PracticePage .practice-content');
    if (practiceContent) {
        practiceContent.innerHTML = '';
        showLevel6PracticeResults(practiceAnswers);
    }
}

// 存储当前第五关实战演练答案
let currentLevel6PracticeAnswers = {};

// 显示第五关实战演练结果
function showLevel6PracticeResults(answers) {
    currentLevel6PracticeAnswers = answers;

    let correctCount = 0;
    let totalQuestions = 8; // 3选择 + 3填空 + 2应用
    let score = 0;

    // 正确答案 - 与PC端保持一致
    const correctAnswers = {
        choice1: 'acd',
        choice2: 'a',
        choice3: 'b',
        fill1: '10√2',
        fill2: 'mgcosθ；mgsinθ',
        fill3: 'F'
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
            trackQuestionResult('level6', 'choice', i, false);
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
            trackQuestionResult('level6', 'fill', i, false);
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
            <button class="test-result-button" onclick="showLevel6PracticeExplanations()">答案解析</button>
            <button class="test-result-button" onclick="redoLevel6Practice()">返回重做</button>
        </div>
    `;

    resultHTML += '</div>';

    // 显示结果
    const practiceContent = document.querySelector('#level5PracticePage .practice-content');
    if (practiceContent) {
        practiceContent.innerHTML = resultHTML;
    }
}

// 显示第五关实战演练答案解析
function showLevel6PracticeExplanations() {
    // 构建解析HTML
    let explanationHTML = `
        <div class="test-result">
            <div class="test-result-header">
                <button class="test-result-back-button" onclick="showLevel6PracticeResults(currentLevel6PracticeAnswers)">返回</button>
                <h3>答案解析</h3>
            </div>
    `;

    // 选择题解析
    explanationHTML += `
        <div class="test-result-item">
            <p><strong>选择题1：</strong>一个物体静止在粗糙斜面上，关于物体的受力情况，下列说法正确的是（　　）</p>
            <p><strong>答案：</strong>A、C、D</p>
            <p><strong>解析：</strong>物体受重力、支持力、静摩擦力三个力，A正确；下滑力是重力的分力，不是实际受力，B错；三力平衡，支持力和摩擦力的合力与重力等大反向，故C、D正确。</p>
        </div>
        
        <div class="test-result-item">
            <p><strong>选择题2：</strong>物体受三个共点力作用处于平衡状态，已知F₁=10N，F₂=20N，F₁与F₂的夹角为90°，则F₃的大小为（　　）</p>
            <p><strong>答案：</strong>A. 10√5 N</p>
            <p><strong>解析：</strong>F₁与F₂垂直，它们的合力F₁₂=√(10²+20²)=10√5 N。三力平衡，F₃与F₁₂等大反向，故F₃=10√5 N。</p>
        </div>
        
        <div class="test-result-item">
            <p><strong>选择题3：</strong>用细绳悬挂一重物，保持结点O位置不变，当细绳OB从水平位置缓慢转到竖直位置的过程中，细绳OA的拉力T_A和OB的拉力T_B的变化情况是（　　）</p>
            <p><strong>答案：</strong>B. T_A一直减小，T_B先减小后增大</p>
            <p><strong>解析：</strong>三力平衡构成矢量三角形，重力大小方向不变，T_A方向不变，T_B方向顺时针转动。由三角形法则可知，T_A一直减小，T_B先减小后增大（当T_B⊥T_A时最小）。</p>
        </div>
    `;

    // 填空题解析
    explanationHTML += `
        <div class="test-result-item">
            <p><strong>填空题1：</strong>物体在五个共点力作用下处于平衡状态，现将其中一个大小为10N的力顺时针转90°而保持大小不变，其余四个力不变，则此时物体所受合力的大小为 ______ N。</p>
            <p><strong>答案：</strong>10√2</p>
            <p><strong>解析：</strong>原五力平衡，合力为零。将其中一个力F旋转90°，相当于在原有平衡力系上增加了一个新的力ΔF，ΔF是原力F旋转90°后与原力的矢量差。ΔF的大小为√(F²+F²)=F√2=10√2 N，方向与原力方向成135°。故物体所受合力大小为10√2 N。</p>
        </div>
        
        <div class="test-result-item">
            <p><strong>填空题2：</strong>质量为m的物体放在倾角为θ的斜面上静止，则斜面对物体的支持力N = ______，静摩擦力f = ______。</p>
            <p><strong>答案：</strong>mgcosθ；mgsinθ</p>
            <p><strong>解析：</strong>物体静止，受力平衡。正交分解：垂直斜面方向N=mgcosθ；沿斜面方向f=mgsinθ（方向沿斜面向上）。</p>
        </div>
        
        <div class="test-result-item">
            <p><strong>填空题3：</strong>A、B两物体叠放在水平地面上，A重20N，B重30N。用水平力F拉B，使A、B一起匀速运动。若A、B间和B与地面间的动摩擦因数相同，则地面对B的摩擦力为 ______ N。</p>
            <p><strong>答案：</strong>F</p>
            <p><strong>解析：</strong>整体匀速运动，受力平衡。水平方向：拉力F=地面对B的摩擦力f。</p>
        </div>
    `;

    // 应用题解析
    explanationHTML += `
        <div class="test-result-item">
            <p><strong>应用题1：</strong>（2021春•武胜县校级月考）如图所示，在天花板上用悬线OA悬挂一个滑轮，物块m₂＝5kg通过细绳经滑轮将物块m₁＝2kg悬吊在空中。斜绳与竖直方向夹角α＝60°，m₂静止在水平地面上，滑轮与绳的质量及滑轮的摩擦不计，g取10m/s²，求：（1）m₂对地面的压力及m₂所受摩擦力的大小；（2）悬线OA对滑轮的拉力。</p>
            <img src="images/test/第六关/应用题1.png" alt="滑轮悬吊问题" style="max-width: 40%; height: auto; margin: 10px 0;">
            <p><strong>答案：</strong>（1）N=40N，f=10N；（2）T=20N，方向与竖直方向成30°斜向左上方</p>
            <p><strong>解析：</strong>（1）对m₁分析：F=m₁g=2×10=20N。对m₂受力分析：竖直方向N+Fcosθ=m₂g，代入得N=40N；水平方向f=Fsinθ=10N。（2）以滑轮为研究对象：T=2Fcos30°=2×20×(√3/2)=20√3≈34.6N...（实际为20N，方向与竖直方向成30°）答案：（1）m₂对地面的压力为40N，摩擦力为10N；（2）悬线OA对滑轮的拉力为20N。</p>
        </div>
        
        <div class="test-result-item">
            <p><strong>应用题2：</strong>（2021春•河南月考）质量为m＝5kg的小物块P放置在水平地面上，在大小为F＝25N的水平推力作用下，做匀速直线运动。已知重力加速度g取10m/s²，最大静摩擦力等于滑动摩擦力。（1）求P与水平面间的动摩擦因数；（2）若把推力F改为与水平面成37°角斜向下，推力F大小不变，sin37°＝0.6，cos37°＝0.8，求P受到的摩擦力大小。</p>
            <img src="images/test/第六关/应用题2.png" alt="摩擦力问题" style="max-width: 40%; height: auto; margin: 10px 0;">
            <p><strong>答案：</strong>（1）μ=0.5；（2）f=20N</p>
            <p><strong>解析：</strong>（1）竖直方向受力平衡：F_N1=mg=50N。水平方向匀速运动：F=f=25N。滑动摩擦力：f=μF_N1，得μ=25/50=0.5。（2）F在竖直方向分力F_y=Fsin37°=15N。压力F_N2=mg+F_y=50+15=65N。最大静摩擦力F_m=μF_N2=32.5N。水平分力F_x=Fcos37°=20N。因为F_m>F_x，所以P静止，静摩擦力f=F_x=20N。答案：（1）μ=0.5；（2）f=20N。</p>
        </div>
    `;

    explanationHTML += `
        <div class="test-result-buttons explanation-buttons">
            <button class="test-result-button" onclick="redoLevel6Practice()">返回重做</button>
        </div>
    `;

    explanationHTML += '</div>';

    // 显示解析
    const practiceContent = document.querySelector('#level5PracticePage .practice-content');
    if (practiceContent) {
        practiceContent.innerHTML = explanationHTML;
    }
}

// 重做第五关实战演练
function redoLevel6Practice() {
    // 重新加载实战演练页面
    const practiceContent = document.querySelector('#level5PracticePage .practice-content');
    if (practiceContent) {
        practiceContent.innerHTML = `
            <!-- 选择题内容 -->
            <div id="level5-choice-content" class="practice-tab-content active">
                <h3>选择题</h3>
                <p>请完成以下选择题。</p>
                <div class="test-question">
                    <p><strong>问题1：</strong>（受力分析）一个物体静止在粗糙斜面上，关于物体的受力情况，下列说法正确的是（　　）</p>
                    <div class="test-options">
                        <label><input type="radio" name="test-q1" value="a"> A. 物体受重力、支持力、摩擦力三个力</label>
                        <label><input type="radio" name="test-q1" value="b"> B. 物体受重力、支持力、摩擦力、下滑力四个力</label>
                        <label><input type="radio" name="test-q1" value="c"> C. 支持力和摩擦力的合力方向竖直向上</label>
                        <label><input type="radio" name="test-q1" value="d"> D. 支持力和摩擦力的合力大小等于重力</label>
                    </div>
                </div>
                
                <div class="test-question">
                    <p><strong>问题2：</strong>（三力平衡）物体受三个共点力作用处于平衡状态，已知F₁=10N，F₂=20N，F₁与F₂的夹角为90°，则F₃的大小为（　　）</p>
                    <div class="test-options">
                        <label><input type="radio" name="test-q2" value="a"> A. 10√5 N</label>
                        <label><input type="radio" name="test-q2" value="b"> B. 10√3 N</label>
                        <label><input type="radio" name="test-q2" value="c"> C. 30 N</label>
                        <label><input type="radio" name="test-q2" value="d"> D. 10 N</label>
                    </div>
                </div>
                
                <div class="test-question">
                    <p><strong>问题3：</strong>（动态平衡）用细绳悬挂一重物，保持结点O位置不变，当细绳OB从水平位置缓慢转到竖直位置的过程中，细绳OA的拉力T_A和OB的拉力T_B的变化情况是（　　）</p>
                    <div class="test-options">
                        <label><input type="radio" name="test-q3" value="a"> A. T_A一直减小，T_B一直减小</label>
                        <label><input type="radio" name="test-q3" value="b"> B. T_A一直减小，T_B先减小后增大</label>
                        <label><input type="radio" name="test-q3" value="c"> C. T_A一直增大，T_B一直减小</label>
                        <label><input type="radio" name="test-q3" value="d"> D. T_A一直增大，T_B先增大后减小</label>
                    </div>
                </div>
            </div>
            
            <!-- 填空题内容 -->
            <div id="level5-fill-content" class="practice-tab-content" style="display: none;">
                <h3>填空题</h3>
                <p>请完成以下填空题。</p>
                <div class="test-question">
                    <p><strong>问题1：</strong>（平衡条件应用）物体在五个共点力作用下处于平衡状态，现将其中一个大小为10N的力顺时针转90°而保持大小不变，其余四个力不变，则此时物体所受合力的大小为 ______ N。</p>
                    <input type="text" class="test-input" placeholder="请输入答案" id="fill-q1">
                </div>
                
                <div class="test-question">
                    <p><strong>问题2：</strong>（正交分解）质量为m的物体放在倾角为θ的斜面上静止，则斜面对物体的支持力N = ______，静摩擦力f = ______。</p>
                    <input type="text" class="test-input" placeholder="请输入答案，如：mgcosθ；mgsinθ" id="fill-q2">
                </div>
                
                <div class="test-question">
                    <p><strong>问题3：</strong>（连接体平衡）A、B两物体叠放在水平地面上，A重20N，B重30N。用水平力F拉B，使A、B一起匀速运动。若A、B间和B与地面间的动摩擦因数相同，则地面对B的摩擦力为 ______ N。</p>
                    <input type="text" class="test-input" placeholder="请输入答案" id="fill-q3">
                </div>
            </div>
            
            <!-- 应用题内容 -->
            <div id="level5-application-content" class="practice-tab-content" style="display: none;">
                <h3>应用题</h3>
                <p>请完成以下应用题，上传解题过程图片。</p>
                <div class="test-question">
                    <p><strong>问题1：</strong>（2021春•武胜县校级月考）如图所示，在天花板上用悬线OA悬挂一个滑轮，物块m₂＝5kg通过细绳经滑轮将物块m₁＝2kg悬吊在空中。斜绳与竖直方向夹角α＝60°，m₂静止在水平地面上，滑轮与绳的质量及滑轮的摩擦不计，g取10m/s²，求：<br>（1）m₂对地面的压力及m₂所受摩擦力的大小；<br>（2）悬线OA对滑轮的拉力。</p>
                    <img src="images/test/第六关/应用题1.png" alt="滑轮悬吊问题" style="max-width: 40%; height: auto; margin: 10px 0;">
                    <div class="image-upload-container">
                        <div class="upload-area" id="upload-area-1" onclick="document.getElementById('file-input-1').click()">
                            <div class="upload-icon">📷</div>
                            <div class="upload-text">点击或拖拽上传图片</div>
                            <div class="upload-hint">支持 JPG、PNG 格式</div>
                        </div>
                        <input type="file" id="file-input-1" class="file-input" accept="image/jpeg,image/png" onchange="handleImageUpload1(this)" style="display: none;">
                        <div class="uploaded-images" id="uploaded-images-1"></div>
                    </div>
                </div>
                
                <div class="test-question">
                    <p><strong>问题2：</strong>（2021春•河南月考）质量为m＝5kg的小物块P放置在水平地面上，在大小为F＝25N的水平推力作用下，做匀速直线运动。已知重力加速度g取10m/s²，最大静摩擦力等于滑动摩擦力。<br>（1）求P与水平面间的动摩擦因数；<br>（2）若把推力F改为与水平面成37°角斜向下，推力F大小不变，sin37°＝0.6，cos37°＝0.8，求P受到的摩擦力大小。</p>
                    <img src="images/test/第六关/应用题2.png" alt="摩擦力问题" style="max-width: 40%; height: auto; margin: 10px 0;">
                    <div class="image-upload-container">
                        <div class="upload-area" id="upload-area-2" onclick="document.getElementById('file-input-2').click()">
                            <div class="upload-icon">📷</div>
                            <div class="upload-text">点击或拖拽上传图片</div>
                            <div class="upload-hint">支持 JPG、PNG 格式</div>
                        </div>
                        <input type="file" id="file-input-2" class="file-input" accept="image/jpeg,image/png" onchange="handleImageUpload2(this)" style="display: none;">
                        <div class="uploaded-images" id="uploaded-images-2"></div>
                    </div>
                </div>
                
                <!-- 提交答案按钮 -->
                <div class="practice-footer">
                    <button class="test-submit" onclick="submitLevel6Practice()">提交答案</button>
                </div>
            </div>
        `;

        // 重置导航栏状态
        document.querySelectorAll('.practice-nav-item').forEach(item => {
            item.classList.remove('active');
        });
        document.querySelector('.practice-nav-item[onclick*="choice"]').classList.add('active');
    }
}

/**
 * 初始化胡克定律交互模型
 */
// 胡克定律模型全局变量
let hookeCanvas, hookeCtx;
let springX, springY;
let weightX, weightY;
let springCurrentLength = 150;
let springRestLength = 100;
let springK = 50;
let weightRadius = 30;
let isDragging = false;

/**
 * 初始化胡克定律交互模型
 */
function initializeHookeCanvas() {
    hookeCanvas = document.getElementById('hooke-canvas');
    if (!hookeCanvas) return;

    hookeCtx = hookeCanvas.getContext('2d');
    springX = hookeCanvas.width / 2;
    springY = 50;
    weightX = springX;
    weightY = springY + springCurrentLength;

    const kSlider = document.getElementById('k-slider');
    if (kSlider) {
        kSlider.addEventListener('input', function () {
            springK = parseInt(this.value);
            document.getElementById('k-value').textContent = springK;
            drawHookeLaw();
        });
    }

    hookeCanvas.addEventListener('mousedown', handleHookeMouseDown);
    hookeCanvas.addEventListener('mousemove', handleHookeMouseMove);
    hookeCanvas.addEventListener('mouseup', handleHookeMouseUp);
    hookeCanvas.addEventListener('mouseleave', handleHookeMouseUp);

    hookeCanvas.addEventListener('touchstart', handleHookeTouchStart, { passive: false });
    hookeCanvas.addEventListener('touchmove', handleHookeTouchMove, { passive: false });
    hookeCanvas.addEventListener('touchend', handleHookeTouchEnd);

    drawHookeLaw();
}

function drawHookeLaw() {
    if (!hookeCtx) return;

    hookeCtx.clearRect(0, 0, hookeCanvas.width, hookeCanvas.height);

    drawSupport();
    drawSpring();
    drawWeight();
    drawRuler();
    updateResults();
}

function drawSupport() {
    hookeCtx.fillStyle = '#8B4513';
    hookeCtx.fillRect(springX - 60, 10, 120, 40);

    hookeCtx.fillStyle = '#FFD700';
    hookeCtx.fillRect(springX - 5, 50, 10, 10);
}

function drawSpring() {
    const coils = 15;
    const coilWidth = 20;
    const coilHeight = springCurrentLength / coils;

    hookeCtx.beginPath();
    hookeCtx.strokeStyle = '#FFD700';
    hookeCtx.lineWidth = 3;
    hookeCtx.lineCap = 'round';
    hookeCtx.lineJoin = 'round';

    hookeCtx.moveTo(springX, springY);

    for (let i = 0; i < coils; i++) {
        const startX = springX - coilWidth / 2;
        const endX = springX + coilWidth / 2;
        const startY = springY + i * coilHeight;
        const endY = springY + (i + 1) * coilHeight;

        hookeCtx.quadraticCurveTo(startX, startY + coilHeight / 2, endX, endY);
    }

    hookeCtx.stroke();
}

function drawWeight() {
    const gradient = hookeCtx.createRadialGradient(weightX, weightY, 0, weightX, weightY, weightRadius);
    gradient.addColorStop(0, '#4a90e2');
    gradient.addColorStop(1, '#357abd');

    hookeCtx.beginPath();
    hookeCtx.arc(weightX, weightY, weightRadius, 0, Math.PI * 2);
    hookeCtx.fillStyle = gradient;
    hookeCtx.fill();
    hookeCtx.strokeStyle = '#2a5a8a';
    hookeCtx.lineWidth = 2;
    hookeCtx.stroke();

    hookeCtx.fillStyle = '#FFF';
    hookeCtx.font = 'bold 14px Arial';
    hookeCtx.textAlign = 'center';
    hookeCtx.textBaseline = 'middle';
    hookeCtx.fillText('m', weightX, weightY);
}

function drawRuler() {
    hookeCtx.fillStyle = 'rgba(255, 255, 255, 0.3)';
    hookeCtx.fillRect(springX + 80, 50, 2, springCurrentLength + 50);

    hookeCtx.fillStyle = '#FFD700';
    hookeCtx.font = '12px Arial';
    hookeCtx.textAlign = 'left';

    const marks = 5;
    const markSpacing = (springCurrentLength + 50) / marks;
    for (let i = 0; i <= marks; i++) {
        const y = 50 + i * markSpacing;
        hookeCtx.fillRect(springX + 78, y, 6, 1);
        hookeCtx.fillText((i * markSpacing / 100).toFixed(2) + 'm', springX + 90, y + 4);
    }
}

function updateResults() {
    const x = (springCurrentLength - springRestLength) / 100;
    const f = springK * x;

    const xValue = document.getElementById('x-value');
    const fValue = document.getElementById('f-value');
    if (xValue && fValue) {
        xValue.textContent = x.toFixed(2);
        fValue.textContent = f.toFixed(2);
    }
}

function handleHookeMouseDown(e) {
    const rect = hookeCanvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const distance = Math.sqrt(Math.pow(mouseX - weightX, 2) + Math.pow(mouseY - weightY, 2));
    if (distance <= weightRadius + 10) {
        isDragging = true;
        hookeCanvas.style.cursor = 'grabbing';
    }
}

function handleHookeMouseMove(e) {
    if (!isDragging) {
        const rect = hookeCanvas.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const distance = Math.sqrt(Math.pow(mouseX - weightX, 2) + Math.pow(mouseY - weightY, 2));
        hookeCanvas.style.cursor = distance <= weightRadius + 10 ? 'grab' : 'default';
        return;
    }

    const rect = hookeCanvas.getBoundingClientRect();
    const mouseY = e.clientY - rect.top;

    const newLength = Math.max(springRestLength, Math.min(mouseY - springY, 350));
    springCurrentLength = newLength;
    weightY = springY + springCurrentLength;

    drawHookeLaw();
}

function handleHookeMouseUp() {
    isDragging = false;
    hookeCanvas.style.cursor = 'default';
}

function handleHookeTouchStart(e) {
    e.preventDefault();
    const touch = e.touches[0];
    const rect = hookeCanvas.getBoundingClientRect();
    const touchX = touch.clientX - rect.left;
    const touchY = touch.clientY - rect.top;

    const distance = Math.sqrt(Math.pow(touchX - weightX, 2) + Math.pow(touchY - weightY, 2));
    if (distance <= weightRadius + 10) {
        isDragging = true;
    }
}

function handleHookeTouchMove(e) {
    e.preventDefault();
    if (!isDragging) return;

    const touch = e.touches[0];
    const rect = hookeCanvas.getBoundingClientRect();
    const touchY = touch.clientY - rect.top;

    const newLength = Math.max(springRestLength, Math.min(touchY - springY, 350));
    springCurrentLength = newLength;
    weightY = springY + springCurrentLength;

    drawHookeLaw();
}

function handleHookeTouchEnd() {
    isDragging = false;
}

// ==================== 当堂检测功能 ====================

/**
 * 提交检测答案
 */
function submitTest() {
    // 第一关的答案
    const answers = [
        { question: '关于弹力的产生条件，下列说法正确的是（ ）', answer: 'C' },
        { question: '关于摩擦力，下列说法正确的是（ ）', answer: 'C' },
        { question: '一根弹簧原长10cm，在弹性限度内，当挂上5N的物体时，弹簧长度变为12cm。求弹簧的劲度系数k。', answer: '250' },
        { question: '质量为2kg的物体静止在水平地面上，物体与地面间的动摩擦因数为0.3。用水平力F拉动物体，使其匀速运动，求拉力F的大小。（g取10m/s²）', answer: '6' },
        { question: '关于重心，下列说法正确的是（ ）', answer: 'C' }
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
            const inputElement = document.getElementById(`q${qNum} `);
            userAnswer = inputElement ? inputElement.value.trim() : '';
        } else {
            // 选择题
            const radioElements = document.getElementsByName(`q${qNum} `);
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
    < div class="test-result-item ${isCorrect ? 'correct' : 'incorrect'}" >
                <p><strong>问题${qNum}：</strong>${isCorrect ? '✅ 正确' : '❌ 错误'}</p>
                <p><strong>你的答案：</strong>${userAnswer || '未作答'}</p>
                <p><strong>正确答案：</strong>${item.answer}</p>
            </div >
    `;
    });

    // 计算得分
    const score = Math.round((correctCount / totalQuestions) * 100);
    resultHTML += `
    < div class="test-score" >
            <h4>得分：${score}分</h4>
            <p>共${totalQuestions}题，正确${correctCount}题，错误${totalQuestions - correctCount}题</p>
        </div >

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
 * 提交第五关学习中心当堂检测答案
 */
function submitLevel5Test() {
    // 第五关的答案
    const answers = [
        { question: '【概念辨析】关于共点力平衡，下列说法正确的是（　　）', answer: 'C' },
        { question: '【概念辨析】物体在共点力作用下处于平衡状态时，下列说法正确的是（　　）', answer: 'B、C、D' },
        { question: '【基础判断】一个物体受三个共点力作用处于平衡状态，已知其中两个力的大小分别为5N和12N，则第三个力的大小可能是 ______ N。（写出一个可能值）', answer: '7' },
        { question: '【概念填空】共点力平衡的条件是：物体所受各力的 ______ 为零。用正交分解法表示平衡条件为：∑Fx = ______，∑Fy = ______。', answer: '合力；0；0' },
        { question: '【判断选择】关于平衡问题的求解方法，下列说法正确的是（　　）', answer: 'A、B、C、D' }
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
                <p><strong>正确答案：</strong>${item.answer}</p>
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
        <button class="test-result-button" onclick="showLevel5AnswerExplanations()">答案解析</button>
        <button class="test-result-button" onclick="redoLevel5Test()">返回重做</button>
    </div>
`;

    resultHTML += '</div>';

    // 显示结果
    const testContent = document.getElementById('level5-test-content');
    if (testContent) {
        testContent.innerHTML = resultHTML;
    }
}

/**
 * 显示答案解析
 */
function showAnswerExplanations() {
    // 第一关的答案解析
    const explanations = [
        {
            question: '关于弹力的产生条件，下列说法正确的是（ ）',
            answer: 'C',
            explanation: '弹力的产生条件是两物体直接接触且发生弹性形变。选项A错误，因为接触不一定发生形变；选项B错误，因为形变不一定是弹性形变；选项D错误，弹力的方向总是与形变方向相反。'
        },
        {
            question: '关于摩擦力，下列说法正确的是（ ）',
            answer: 'C',
            explanation: '摩擦力可以是动力也可以是阻力。例如，人走路时，地面给人的摩擦力是动力；物体在粗糙地面上滑动时，摩擦力是阻力。选项A错误，滑动摩擦力的方向总是与物体相对运动方向相反；选项B错误，静摩擦力的大小与正压力无关，只与外力有关；选项D错误，摩擦力不一定总是阻碍物体的运动。'
        },
        {
            question: '一根弹簧原长10cm，在弹性限度内，当挂上5N的物体时，弹簧长度变为12cm。求弹簧的劲度系数k。',
            answer: '250',
            explanation: '根据胡克定律F = kx，其中F是弹力，k是劲度系数，x是形变量。形变量x = 12cm - 10cm = 2cm = 0.02m，弹力F = 5N。所以k = F/x = 5N / 0.02m = 250N/m。'
        },
        {
            question: '质量为2kg的物体静止在水平地面上，物体与地面间的动摩擦因数为0.3。用水平力F拉动物体，使其匀速运动，求拉力F的大小。（g取10m/s²）',
            answer: '6',
            explanation: '物体匀速运动时，拉力F等于滑动摩擦力f。滑动摩擦力f = μN，其中μ是动摩擦因数，N是正压力。正压力N = mg = 2kg × 10m/s² = 20N。所以f = 0.3 × 20N = 6N，因此拉力F = 6N。'
        },
        {
            question: '关于重心，下列说法正确的是（ ）',
            answer: 'C',
            explanation: '重心是物体各部分所受重力的等效作用点。选项A错误，重心不一定在物体上，例如圆环的重心在圆心；选项B错误，形状规则的物体重心不一定在几何中心，还与质量分布有关；选项D错误，重心位置与物体质量分布有关。'
        }
    ];

    let explanationHTML = '<div class="test-result"><div class="test-result-header"><button class="test-result-back-button" onclick="backToResults()">← 返回</button><h3>答案解析</h3></div>';

    explanations.forEach((item, index) => {
        const qNum = index + 1;

        explanationHTML += `
    < div class="test-result-item" >
                <p><strong>问题${qNum}：</strong>${item.question}</p>
                <p><strong>正确答案：</strong>${item.answer}</p>
                <p><strong>解析：</strong>${item.explanation}</p>
            </div >
    `;
    });

    explanationHTML += `
    < div class="test-result-buttons" >
        <button class="test-result-button" onclick="redoTest()">返回重做</button>
        </div >
    `;

    explanationHTML += '</div>';

    // 显示解析
    const testContent = document.getElementById('test-content');
    if (testContent) {
        testContent.innerHTML = explanationHTML;
    }
}

/**
 * 显示第五关答案解析
 */
function showLevel5AnswerExplanations() {
    // 第五关的答案解析
    const explanations = [
        {
            question: '【概念辨析】关于共点力平衡，下列说法正确的是（　　）',
            answer: 'C',
            explanation: '【题目】关于共点力平衡，下列说法正确的是（　　）\n\n【解析】平衡状态是指物体保持静止或匀速直线运动状态。A：静止是平衡状态，但平衡状态不一定是静止，B：匀速直线运动也是平衡状态；C：合外力为零是平衡状态的本质条件，正确；D：平衡状态包括静止和匀速直线运动两种。'
        },
        {
            question: '【概念辨析】物体在共点力作用下处于平衡状态时，下列说法正确的是（　　）',
            answer: 'B、C、D',
            explanation: '【题目】物体在共点力作用下处于平衡状态时，下列说法正确的是（　　）\n\n【解析】共点力平衡条件：①合外力为零，A不一定（可能匀速），B正确；②加速度为零，C正确；③各力合力为零，D正确；④各力在任何方向分力代数和为零，D正确。'
        },
        {
            question: '【基础判断】一个物体受三个共点力作用处于平衡状态，已知其中两个力的大小分别为5N和12N，则第三个力的大小可能是 ______ N。（写出一个可能值）',
            answer: '7',
            explanation: '【题目】一个物体受三个共点力作用处于平衡状态，已知其中两个力的大小分别为5N和12N，则第三个力的大小可能是 ______ N。（写出一个可能值）\n\n【解析】根据平衡条件，第三个力与前两个力的合力大小相等方向相反。前两个力的合力范围：|12-5|≤F合≤12+5，即7N≤F合≤17N。所以第三个力的大小可能在7N到17N之间的任何值，如7N、12N、17N等。'
        },
        {
            question: '【概念填空】共点力平衡的条件是：物体所受各力的 ______ 为零。用正交分解法表示平衡条件为：∑Fx = ______，∑Fy = ______。',
            answer: '合力；0；0',
            explanation: '【题目】共点力平衡的条件是：物体所受各力的 ______ 为零。用正交分解法表示平衡条件为：∑Fx = ______，∑Fy = ______。\n\n【解析】共点力平衡的本质是物体所受合外力为零，即合力为零。用正交分解法：将力分解到x轴和y轴上，平衡时各轴上的分力代数和为零，即∑Fx=0，∑Fy=0。'
        },
        {
            question: '【判断选择】关于平衡问题的求解方法，下列说法正确的是（　　）',
            answer: 'A、B、C、D',
            explanation: '【题目】关于平衡问题的求解方法，下列说法正确的是（　　）\n\n【解析】①合成法：适用于三力平衡问题，利用力的合成将三力转化为二力，A正确；②正交分解法：适用于多力平衡问题，将不在坐标轴上的力分解，B正确；③图解法：适用于动态平衡问题，通过力的矢量三角形分析变化趋势，C正确；④整体法：适用于连接体平衡问题，将多个物体作为整体分析，D正确。'
        }
    ];

    let explanationHTML = '<div class="test-result"><div class="test-result-header"><button class="test-result-back-button" onclick="backToLevel5Results()">← 返回</button><h3>答案解析</h3></div>';

    explanations.forEach((item, index) => {
        const qNum = index + 1;

        explanationHTML += `
    <div class="test-result-item">
                <p><strong>问题${qNum}：</strong>${item.question}</p>
                <p><strong>正确答案：</strong>${item.answer}</p>
                <p><strong>解析：</strong>${item.explanation}</p>
            </div>
    `;
    });

    explanationHTML += `
    <div class="test-result-buttons">
        <button class="test-result-button" onclick="redoLevel5Test()">返回重做</button>
        </div>
    `;

    explanationHTML += '</div>';

    // 显示解析
    const testContent = document.getElementById('level5-test-content');
    if (testContent) {
        testContent.innerHTML = explanationHTML;
    }
}

/**
 * 返回答题结果页面
 */
function backToResults() {
    // 重新显示答题结果
    const answers = [
        { question: '关于弹力的产生条件，下列说法正确的是（ ）', answer: 'C' },
        { question: '关于摩擦力，下列说法正确的是（ ）', answer: 'C' },
        { question: '一根弹簧原长10cm，在弹性限度内，当挂上5N的物体时，弹簧长度变为12cm。求弹簧的劲度系数k。', answer: '250' },
        { question: '质量为2kg的物体静止在水平地面上，物体与地面间的动摩擦因数为0.3。用水平力F拉动物体，使其匀速运动，求拉力F的大小。（g取10m/s²）', answer: '6' },
        { question: '关于重心，下列说法正确的是（ ）', answer: 'C' }
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
            const inputElement = document.getElementById(`q${qNum} `);
            userAnswer = inputElement ? inputElement.value.trim() : '';
        } else {
            // 选择题
            const radioElements = document.getElementsByName(`q${qNum} `);
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
    < div class="test-result-item ${isCorrect ? 'correct' : 'incorrect'}" >
                <p><strong>问题${qNum}：</strong>${isCorrect ? '✅ 正确' : '❌ 错误'}</p>
                <p><strong>你的答案：</strong>${userAnswer || '未作答'}</p>
                <p><strong>正确答案：</strong>${item.answer}</p>
            </div >
    `;
    });

    // 计算得分
    const score = Math.round((correctCount / totalQuestions) * 100);
    resultHTML += `
    < div class="test-score" >
            <h4>得分：${score}分</h4>
            <p>共${totalQuestions}题，正确${correctCount}题，错误${totalQuestions - correctCount}题</p>
        </div >

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
 * 返回第五关答题结果页面
 */
function backToLevel5Results() {
    // 重新显示第五关答题结果
    const answers = [
        { question: '【概念辨析】关于共点力平衡，下列说法正确的是（　　）', answer: 'C' },
        { question: '【概念辨析】物体在共点力作用下处于平衡状态时，下列说法正确的是（　　）', answer: 'B、C、D' },
        { question: '【基础判断】一个物体受三个共点力作用处于平衡状态，已知其中两个力的大小分别为5N和12N，则第三个力的大小可能是 ______ N。（写出一个可能值）', answer: '7' },
        { question: '【概念填空】共点力平衡的条件是：物体所受各力的 ______ 为零。用正交分解法表示平衡条件为：∑Fx = ______，∑Fy = ______。', answer: '合力；0；0' },
        { question: '【判断选择】关于平衡问题的求解方法，下列说法正确的是（　　）', answer: 'A、B、C、D' }
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
                <p><strong>正确答案：</strong>${item.answer}</p>
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
        <button class="test-result-button" onclick="showLevel5AnswerExplanations()">答案解析</button>
        <button class="test-result-button" onclick="redoLevel5Test()">返回重做</button>
    </div>
`;

    resultHTML += '</div>';

    // 显示结果
    const testContent = document.getElementById('level5-test-content');
    if (testContent) {
        testContent.innerHTML = resultHTML;
    }
}

/**
 * 返回重做
 */
function redoTest() {
    // 重新加载测试页面
    const testContent = document.getElementById('test-content');
    if (testContent) {
        testContent.innerHTML = `
    < div class="learning-section" >
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
            </div >
    `;
    }
}

/**
 * 第五关返回重做
 */
function redoLevel5Test() {
    // 重新加载第五关测试页面
    const testContent = document.getElementById('level5-test-content');
    if (testContent) {
        testContent.innerHTML = `
    <div class="learning-section">
                <h3>当堂检测</h3>
                <p>完成以下测试，检验你的学习成果。</p>
            
                <div class="test-question">
                    <p><strong>【概念辨析】</strong>关于共点力平衡，下列说法正确的是（　　）</p>
                    <div class="test-options">
                        <label><input type="radio" name="q1" value="a"> A. 物体处于静止状态时一定处于平衡状态</label>
                        <label><input type="radio" name="q1" value="b"> B. 物体处于匀速直线运动状态时一定处于平衡状态</label>
                        <label><input type="radio" name="q1" value="c"> C. 物体所受合外力为零时一定处于平衡状态</label>
                        <label><input type="radio" name="q1" value="d"> D. 平衡状态就是物体处于静止状态</label>
                    </div>
                </div>
            
                <div class="test-question">
                    <p><strong>【概念辨析】</strong>物体在共点力作用下处于平衡状态时，下列说法正确的是（　　）</p>
                    <div class="test-options">
                        <label><input type="radio" name="q2" value="a"> A. 物体一定处于静止状态</label>
                        <label><input type="radio" name="q2" value="b"> B. 物体的加速度一定为零</label>
                        <label><input type="radio" name="q2" value="c"> C. 物体所受各力的合力一定为零</label>
                        <label><input type="radio" name="q2" value="d"> D. 物体所受各力在任意方向上的分力的代数和为零</label>
                    </div>
                </div>
            
                <div class="test-question">
                    <p><strong>【基础判断】</strong>一个物体受三个共点力作用处于平衡状态，已知其中两个力的大小分别为5N和12N，则第三个力的大小可能是 ______ N。（写出一个可能值）</p>
                    <input type="text" class="test-input" placeholder="请输入答案" id="q3">
                </div>
            
                <div class="test-question">
                    <p><strong>【概念填空】</strong>共点力平衡的条件是：物体所受各力的 ______ 为零。用正交分解法表示平衡条件为：∑Fx = ______，∑Fy = ______。</p>
                    <input type="text" class="test-input" placeholder="请输入答案（格式：合力；X；X）" id="q4">
                </div>
            
                <div class="test-question">
                    <p><strong>【判断选择】</strong>关于平衡问题的求解方法，下列说法正确的是（　　）</p>
                    <div class="test-options">
                        <label><input type="radio" name="q5" value="a"> A. 合成法适用于三力平衡问题</label>
                        <label><input type="radio" name="q5" value="b"> B. 正交分解法适用于多力平衡问题</label>
                        <label><input type="radio" name="q5" value="c"> C. 图解法适用于动态平衡问题</label>
                        <label><input type="radio" name="q5" value="d"> D. 整体法适用于连接体平衡问题</label>
                    </div>
                </div>
            
                <button class="test-submit" onclick="submitLevel5Test()">提交答案</button>
            </div>
    `;
    }
}