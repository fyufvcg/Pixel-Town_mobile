/**
 * 成就系统脚本
 * 用于处理成就面板的显示和交互功能
 */

// 成就数据（全局变量）
window.achievements = {
    'first_visit': {
        id: 'first_visit',
        title: '初次造访',
        description: '第一次来到像素小镇',
        icon: '🎉',
        unlocked: false
    },
    'tea_master': {
        id: 'tea_master',
        title: '茶艺大师',
        description: '进入茶馆',
        icon: '🍵',
        unlocked: false
    },
    'street_explorer': {
        id: 'street_explorer',
        title: '街道探险家',
        description: '探索街道',
        icon: '🗺️',
        unlocked: false
    },
    'level_1_complete': {
        id: 'level_1_complete',
        title: '第一关',
        description: '完成第一关',
        icon: '1️⃣',
        unlocked: false
    },
    'level_2_complete': {
        id: 'level_2_complete',
        title: '第二关',
        description: '完成第二关',
        icon: '2️⃣',
        unlocked: false
    },
    'level_3_complete': {
        id: 'level_3_complete',
        title: '第三关',
        description: '完成第三关',
        icon: '3️⃣',
        unlocked: false
    },
    'level_4_complete': {
        id: 'level_4_complete',
        title: '第四关',
        description: '完成第四关',
        icon: '4️⃣',
        unlocked: false
    },
    'level_5_complete': {
        id: 'level_5_complete',
        title: '第五关',
        description: '完成第五关',
        icon: '5️⃣',
        unlocked: false
    },
    'level_6_complete': {
        id: 'level_6_complete',
        title: '第六关',
        description: '完成第六关',
        icon: '6️⃣',
        unlocked: false
    },
    'level_7_complete': {
        id: 'level_7_complete',
        title: '第七关',
        description: '完成第七关',
        icon: '7️⃣',
        unlocked: false
    },
    'all_levels_complete': {
        id: 'all_levels_complete',
        title: '通关大师',
        description: '完成所有关卡',
        icon: '👑',
        unlocked: false
    },
    'ai_helper': {
        id: 'ai_helper',
        title: 'AI助手',
        description: '使用AI助手',
        icon: '🤖',
        unlocked: false
    },
    'note_taker': {
        id: 'note_taker',
        title: '笔记达人',
        description: '使用笔记功能',
        icon: '📝',
        unlocked: false
    }
};

/**
 * 显示成就面板
 */
async function showAchievementPanel() {
    // 隐藏所有页面
    document.querySelectorAll('.page').forEach(page => {
        page.style.display = 'none';
    });

    // 加载最新的成就数据
    await loadProgressFromDatabaseAndApply();

    // 检查并解锁成就
    await checkAndUnlockAchievements();

    // 检查是否已存在成就面板
    let achievementPanel = document.getElementById('achievementPanel');
    if (!achievementPanel) {
        // 创建成就面板
        achievementPanel = document.createElement('div');
        achievementPanel.id = 'achievementPanel';
        achievementPanel.className = 'page achievement-panel';
    }

    // 重新计算成就统计数据
    const totalAchievements = Object.keys(window.achievements).length;
    const unlockedAchievements = Object.values(window.achievements).filter(ach => ach.unlocked).length;
    const progressPercentage = Math.round((unlockedAchievements / totalAchievements) * 100);

    // 更新成就面板内容
    achievementPanel.innerHTML = `
        <div class="achievement-panel-header">
            <div class="achievement-panel-title">成就系统</div>
            <button class="achievement-panel-close" onclick="closeAchievementPanel()">×</button>
        </div>
        <div class="achievement-stats">
            <div class="achievement-stat">
                <div class="achievement-stat-value">${unlockedAchievements}/${totalAchievements}</div>
                <div class="achievement-stat-label">已解锁</div>
            </div>
            <div class="achievement-stat">
                <div class="achievement-stat-value">${progressPercentage}%</div>
                <div class="achievement-stat-label">完成度</div>
            </div>
        </div>
        <div class="achievement-progress-bar">
            <div class="achievement-progress-fill" style="width: ${progressPercentage}%"></div>
        </div>
        <div class="achievement-container">
            ${Object.values(window.achievements).map(ach => `
                <div class="achievement-item ${ach.unlocked ? 'unlocked' : 'locked'}" data-id="${ach.id}">
                    <div class="achievement-icon">${ach.icon}</div>
                    <div class="achievement-lock-overlay">🔒</div>
                    <div class="achievement-tooltip">
                        <div class="achievement-tooltip-title">${ach.title}</div>
                        <div class="achievement-tooltip-desc">${ach.description}</div>
                        <div class="achievement-tooltip-status ${ach.unlocked ? 'unlocked' : 'locked'}">
                            ${ach.unlocked ? '✓ 已解锁' : '🔒 未解锁'}
                        </div>
                    </div>
                </div>
            `).join('')}
        </div>
    `;

    // 将成就面板添加到页面
    if (!document.getElementById('achievementPanel')) {
        document.body.appendChild(achievementPanel);
    } else {
        // 显示已存在的成就面板
        achievementPanel.style.display = 'block';
    }
}

/**
 * 关闭成就面板
 */
function closeAchievementPanel() {
    const achievementPanel = document.getElementById('achievementPanel');
    if (achievementPanel) {
        achievementPanel.style.display = 'none';
    }

    // 显示主页面和我的页面
    const mainPage = document.getElementById('mainPage');
    if (mainPage) {
        mainPage.style.display = 'block';
    }

    const minePage = document.getElementById('minePage');
    if (minePage) {
        minePage.style.display = 'block';
    }
}

/**
 * 解锁成就
 * @param {string} achievementId - 成就ID
 */
function unlockAchievement(achievementId) {
    const achievement = window.achievements[achievementId];
    if (!achievement || achievement.unlocked) return;

    achievement.unlocked = true;

    // 保存进度到数据库
    if (typeof saveProgressToDatabase === 'function') {
        saveProgressToDatabase();
    }

    // 更新成就面板
    const achievementPanel = document.getElementById('achievementPanel');
    if (achievementPanel) {
        const achievementItem = achievementPanel.querySelector(`[data-id="${achievementId}"]`);
        if (achievementItem) {
            achievementItem.classList.remove('locked');
            achievementItem.classList.add('unlocked', 'new');

            // 更新工具提示状态
            const statusElement = achievementItem.querySelector('.achievement-tooltip-status');
            if (statusElement) {
                statusElement.classList.remove('locked');
                statusElement.classList.add('unlocked');
                statusElement.textContent = '✓ 已解锁';
            }

            // 3秒后移除new类
            setTimeout(() => {
                achievementItem.classList.remove('new');
            }, 3000);
        }

        // 更新统计数据
        updateAchievementStats();
    }

    // 显示成就解锁通知
    showAchievementNotification(achievement);
}

/**
 * 显示成就解锁通知
 * @param {object} achievement - 成就对象
 */
function showAchievementNotification(achievement) {
    // 检查是否已存在通知元素
    let achievementNotification = document.getElementById('achievementNotification');
    if (!achievementNotification) {
        // 创建通知元素
        achievementNotification = document.createElement('div');
        achievementNotification.id = 'achievementNotification';
        achievementNotification.className = 'achievement-notification';
        achievementNotification.innerHTML = `
            <div class="achievement-notification-icon"></div>
            <div class="achievement-notification-text"></div>
        `;
        document.body.appendChild(achievementNotification);
    }

    const icon = achievementNotification.querySelector('.achievement-notification-icon');
    const text = achievementNotification.querySelector('.achievement-notification-text');

    icon.textContent = achievement.icon;
    text.textContent = achievement.title;

    achievementNotification.classList.add('show');

    // 4秒后隐藏通知
    setTimeout(() => {
        achievementNotification.classList.remove('show');
    }, 4000);
}

/**
 * 更新成就统计
 */
function updateAchievementStats() {
    const achievementPanel = document.getElementById('achievementPanel');
    if (!achievementPanel) return;

    const totalAchievements = Object.keys(window.achievements).length;
    const unlockedAchievements = Object.values(window.achievements).filter(ach => ach.unlocked).length;
    const progressPercentage = Math.round((unlockedAchievements / totalAchievements) * 100);

    const statsContainer = achievementPanel.querySelector('.achievement-stats');
    const progressBar = achievementPanel.querySelector('.achievement-progress-fill');

    if (statsContainer) {
        const statValues = statsContainer.querySelectorAll('.achievement-stat-value');
        if (statValues[0]) {
            statValues[0].textContent = `${unlockedAchievements}/${totalAchievements}`;
        }
        if (statValues[1]) {
            statValues[1].textContent = `${progressPercentage}%`;
        }
    }

    if (progressBar) {
        progressBar.style.width = `${progressPercentage}%`;
    }
}

/**
 * 保存进度到数据库
 */
async function saveProgressToDatabase() {
    console.log('========== saveProgressToDatabase 开始 ==========');
    const userId = localStorage.getItem('pixelTownUserId');
    console.log('【保存进度】调用 - userId:', userId);

    if (!userId || isNaN(userId)) {
        console.log('【保存进度】失败: 用户ID无效');
        return;
    }

    // 只保存已解锁的成就，避免覆盖数据库中的其他数据
    const unlockedAchievements = {};
    Object.keys(window.achievements).forEach(key => {
        if (window.achievements[key].unlocked) {
            unlockedAchievements[key] = true;
        }
    });
    const achievementsData = JSON.stringify(unlockedAchievements);
    console.log('【保存进度】window.achievements:', window.achievements);
    console.log('【保存进度】已解锁成就:', unlockedAchievements);
    console.log('【保存进度】JSON字符串:', achievementsData);

    // 获取当前关卡进度，避免覆盖
    const currentLevel = currentUserLevel || 1;

    const progressData = {
        user_id: userId,
        achievements_data: achievementsData,
        game_level: currentLevel
    };

    console.log('【保存进度】发送数据:', JSON.stringify(progressData));

    try {
        const API_BASE_URL = 'http://47.98.245.103:5000';
        const response = await fetch(`${API_BASE_URL}/update_progress`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(progressData)
        });
        const result = await response.json();
        console.log('【保存进度】结果:', result);

        // 保存成功后，也保存到 localStorage 作为备份
        console.log('【保存进度】保存到 localStorage:', achievementsData);
        localStorage.setItem('savedAchievements', achievementsData);
        console.log('【保存进度】已保存，验证:', localStorage.getItem('savedAchievements'));
        console.log('========== saveProgressToDatabase 结束 ==========');
    } catch (e) {
        console.log('【保存进度】失败:', e);
    }
}

/**
 * 从数据库加载进度
 */
async function loadProgressFromDatabase() {
    const userId = localStorage.getItem('pixelTownUserId');
    if (!userId || isNaN(userId)) return null;

    try {
        const API_BASE_URL = 'http://47.98.245.103:5000';
        const response = await fetch(`${API_BASE_URL}/get_progress?user_id=${userId}`);
        const data = await response.json();
        if (data.status === 'success' && data.data) {
            return data.data;
        }
    } catch (e) {
        console.log('从数据库加载进度失败:', e);
    }
    return null;
}

/**
 * 从数据库加载进度并应用
 */
async function loadProgressFromDatabaseAndApply() {
    console.log('========== 开始加载成就 ==========');
    console.log('userId:', localStorage.getItem('pixelTownUserId'));
    console.log('加载前 unlocked 成就:', Object.keys(window.achievements).filter(k => window.achievements[k].unlocked));
    
    // 先尝试从 localStorage 备份加载
    const savedAchievements = localStorage.getItem('savedAchievements');
    console.log('localStorage savedAchievements:', savedAchievements);
    
    if (savedAchievements) {
        try {
            const achievementsData = JSON.parse(savedAchievements);
            if (achievementsData && typeof achievementsData === 'object' && Object.keys(achievementsData).length > 0) {
                console.log('从 localStorage 加载成就数据...');
                
                Object.keys(achievementsData).forEach(key => {
                    if (window.achievements[key]) {
                        const dbValue = achievementsData[key];
                        if (typeof dbValue === 'boolean') {
                            window.achievements[key].unlocked = dbValue;
                        } else if (typeof dbValue === 'object' && dbValue !== null) {
                            window.achievements[key].unlocked = dbValue.unlocked || false;
                        }
                    }
                });
                console.log('加载后 unlocked 成就:', Object.keys(window.achievements).filter(k => window.achievements[k].unlocked));
                console.log('========== 加载完成 ==========');
                return;
            }
        } catch (e) {
            console.log('解析失败:', e);
        }
    }
    console.log('========== 加载完成（无数据） ==========');
}

/**
 * 检查并更新成就状态
 */
async function checkAchievements() {
    // 从数据库加载最新的成就数据
    await loadProgressFromDatabaseAndApply();

    // 这里可以根据用户的行为和进度检查成就解锁条件
    // 例如：检查关卡完成情况、访问特定地点等

    // 示例：检查用户是否已完成第一关
    const userId = localStorage.getItem('pixelTownUserId');
    if (userId) {
        // 可以从API获取用户进度，然后更新成就状态
        // 这里只是示例，实际实现需要根据API返回的数据

        // 模拟解锁第一个成就
        // unlockAchievement('first_visit');
    }
}

/**
 * 检查并解锁成就（在进入成就页面时调用）
 */
async function checkAndUnlockAchievements() {
    const userId = localStorage.getItem('pixelTownUserId');
    if (!userId || isNaN(userId)) return;

    try {
        const API_BASE_URL = 'http://47.98.245.103:5000';
        const response = await fetch(`${API_BASE_URL}/get_progress?user_id=${userId}`);
        const result = await response.json();

        if (result.status === 'success' && result.data) {
            const user = result.data;

            // 检查并解锁关卡完成成就
            for (let i = 1; i <= 7; i++) {
                const score = user[`level${i}_score`] || 0;
                if (score > 0 && typeof unlockAchievement === 'function') {
                    unlockAchievement(`level_${i}_complete`);
                }
            }

            // 检查并解锁完成所有关卡成就
            const unlockedLevelAchievements = Object.keys(window.achievements).filter(key =>
                key.startsWith('level_') && key.endsWith('_complete') && window.achievements[key].unlocked
            ).length;

            if (unlockedLevelAchievements === 7 && typeof unlockAchievement === 'function') {
                unlockAchievement('all_levels_complete');
            }
        }
    } catch (error) {
        console.error('检查成就失败:', error);
    }
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function () {
    // 检查是否有已登录用户
    const userId = localStorage.getItem('pixelTownUserId');
    if (userId && !isNaN(userId)) {
        // 已登录用户，从数据库加载成就
        checkAchievements();
    } else {
        console.log('【成就系统】游客访问，不加载成就数据');
    }
});

// ========== 关卡解锁功能 ==========

let currentUserLevel = 1;

function initLevelUnlock() {
    const userId = localStorage.getItem('pixelTownUserId');
    if (!userId || isNaN(userId)) {
        return;
    }
    
    fetch(`${API_BASE_URL}/get_progress?user_id=${userId}`)
        .then(res => res.json())
        .then(data => {
            if (data.status === 'success' && data.data) {
                currentUserLevel = parseInt(data.data.game_level) || 1;
                console.log('【关卡解锁】当前关卡:', currentUserLevel);
                updateLevelDisplay();
            }
        })
        .catch(err => console.log('【关卡解锁】加载失败:', err));
}

function updateLevelDisplay() {
    const levelMap = {
        1: ['level-item-1'],
        2: ['level-item-1', 'level-item-2'],
        3: ['level-item-1', 'level-item-2', 'level-item-3'],
        4: ['level-item-1', 'level-item-2', 'level-item-3', 'level-item-quiz'],
        5: ['level-item-1', 'level-item-2', 'level-item-3', 'level-item-quiz', 'level-item-4'],
        6: ['level-item-1', 'level-item-2', 'level-item-3', 'level-item-quiz', 'level-item-4', 'level-item-5'],
        7: ['level-item-1', 'level-item-2', 'level-item-3', 'level-item-quiz', 'level-item-4', 'level-item-5', 'level-item-chapter-test']
    };
    
    const visibleLevels = levelMap[currentUserLevel] || ['level-item-1'];
    
    const allLevels = ['level-item-1', 'level-item-2', 'level-item-3', 'level-item-quiz', 'level-item-4', 'level-item-5', 'level-item-chapter-test'];
    
    allLevels.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            el.style.display = visibleLevels.includes(id) ? 'flex' : 'none';
        }
    });
    
    console.log('【关卡解锁】显示关卡:', visibleLevels);
}

function handleLevelClick(level) {
    if (level === 'quiz') {
        openQuizPage();
    } else if (level === 'chapter-test') {
        openChapterTestPage();
    } else {
        switch(level) {
            case 1: showLevel1Page(); break;
            case 2: showLevel2Page(); break;
            case 3: showLevel3Page(); break;
            case 4: showLevel4Page(); break;
            case 5: showLevel5Page(); break;
        }
    }
}

async function unlockNextLevel(currentLevel) {
    const nextLevel = currentLevel + 1;
    if (nextLevel > 7) {
        console.log('【关卡解锁】已解锁所有关卡');
        return;
    }
    
    const userId = localStorage.getItem('pixelTownUserId');
    if (!userId || isNaN(userId)) {
        console.log('【关卡解锁】未登录，无法解锁关卡');
        if (typeof Modal !== 'undefined' && typeof Modal.info === 'function') {
            Modal.info('请先登录后再解锁关卡', '提示');
        } else {
            alert('请先登录后再解锁关卡');
        }
        return;
    }
    
    console.log('【关卡解锁】当前关卡:', currentLevel, '解锁下一关:', nextLevel);
    
    try {
        const response = await fetch(`${API_BASE_URL}/update_progress`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                user_id: userId,
                game_level: nextLevel
            })
        });
        const result = await response.json();
        console.log('【关卡解锁】保存结果:', result);
        
        if (result.status === 'success') {
            currentUserLevel = nextLevel;
            updateLevelDisplay();
            console.log('【关卡解锁】已成功解锁第' + nextLevel + '关');
            
            // 显示游戏内弹窗提示
            if (typeof Modal !== 'undefined' && typeof Modal.info === 'function') {
                Modal.info(`恭喜你解锁了第${nextLevel}关！`, '关卡解锁');
            }
        }
    } catch (err) {
        console.log('【关卡解锁】保存失败:', err);
    }
}