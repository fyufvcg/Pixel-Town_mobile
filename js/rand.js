/**
 * 排行榜功能脚本
 * 用于处理排行榜面板的显示和交互功能
 */

/**
 * 显示排行榜面板
 */
function showLeaderboardPanel() {
    // 隐藏所有页面
    document.querySelectorAll('.page').forEach(page => {
        page.style.display = 'none';
    });

    // 检查是否已存在排行榜面板
    let leaderboardPanel = document.getElementById('leaderboardPanel');
    if (!leaderboardPanel) {
        // 创建排行榜面板
        leaderboardPanel = document.createElement('div');
        leaderboardPanel.id = 'leaderboardPanel';
        leaderboardPanel.className = 'page leaderboard-panel';
        leaderboardPanel.innerHTML = `
            <div class="leaderboard-header">
                <h1 class="leaderboard-title">排行榜</h1>
                <button class="leaderboard-close" onclick="closeLeaderboardPanel()">×</button>
            </div>
            <div class="leaderboard-content">
                <div class="leaderboard-list" id="leaderboard-list">
                    <div class="leaderboard-loading">加载中...</div>
                </div>
            </div>
            <div class="leaderboard-my-position-container" id="leaderboard-my-position"></div>
        `;
        document.body.appendChild(leaderboardPanel);
    } else {
        // 显示已存在的排行榜面板
        leaderboardPanel.style.display = 'block';
    }

    // 加载排行榜数据
    loadLeaderboardData();
}

/**
 * 关闭排行榜面板
 */
function closeLeaderboardPanel() {
    const leaderboardPanel = document.getElementById('leaderboardPanel');
    if (leaderboardPanel) {
        leaderboardPanel.style.display = 'none';
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
 * 加载排行榜数据
 */
async function loadLeaderboardData() {
    const listContainer = document.getElementById('leaderboard-list');
    if (!listContainer) return;

    listContainer.innerHTML = '<div class="leaderboard-loading">加载中...</div>';

    try {
        const response = await fetch('http://47.98.245.103:5000/get_leaderboard');
        const result = await response.json();

        if (result.status === 'success' && result.data && result.data.length > 0) {
            renderLeaderboard(result.data);
        } else {
            listContainer.innerHTML = '<div class="leaderboard-empty">暂无排行数据</div>';
        }
    } catch (error) {
        console.error('加载排行榜失败:', error);
        listContainer.innerHTML = '<div class="leaderboard-empty">加载失败，请稍后重试</div>';
    }
}

/**
 * 渲染排行榜
 */
function renderLeaderboard(data) {
    const listContainer = document.getElementById('leaderboard-list');
    const myPositionContainer = document.getElementById('leaderboard-my-position');
    const currentUserId = localStorage.getItem('pixelTownUserId');

    let myRank = -1;
    let myInfo = null;

    const defaultAvatar = 'https://api.dicebear.com/7.x/avataaars/svg?seed=default';

    listContainer.innerHTML = data.map((item, index) => {
        const rank = index + 1;
        let rankClass = '';
        if (rank === 1) rankClass = 'top-1';
        else if (rank === 2) rankClass = 'top-2';
        else if (rank === 3) rankClass = 'top-3';

        const isCurrentUser = String(item.user_id) === String(currentUserId);
        if (isCurrentUser) {
            myRank = rank;
            myInfo = item;
        }
        const style = isCurrentUser ? 'border-color: #ffd700; background: rgba(255, 215, 0, 0.2);' : '';

        const avatarUrl = item.avatar || defaultAvatar;

        return `
            <div class="leaderboard-item ${rankClass}" style="${style}">
                <div class="leaderboard-rank">${rank}</div>
                <div class="leaderboard-user">
                    <img src="${avatarUrl}" alt="头像" class="leaderboard-avatar" onerror="this.src='${defaultAvatar}'">
                    <span class="leaderboard-username">${escapeHtml(item.username)}</span>
                </div>
                <div class="leaderboard-level">第${item.game_level || 1}关</div>
                <div class="leaderboard-score">${item.game_score || 0}分</div>
            </div>
        `;
    }).join('');

    // 添加用户自己的位置（固定在底部）
    if (currentUserId) {
        if (myRank > 0) {
            // 用户在排行榜中，显示自己的排名
            const myAvatar = myInfo.avatar || defaultAvatar;
            myPositionContainer.innerHTML = `
                <div class="leaderboard-my-position">
                    <div class="leaderboard-rank">${myRank}</div>
                    <div class="leaderboard-user">
                        <img src="${myAvatar}" alt="头像" class="leaderboard-avatar" onerror="this.src='${defaultAvatar}'">
                        <span class="leaderboard-username">${escapeHtml(myInfo.username)}（你）</span>
                    </div>
                    <div class="leaderboard-level">第${myInfo.game_level || 1}关</div>
                    <div class="leaderboard-score">${myInfo.game_score || 0}分</div>
                </div>
            `;
        } else {
            // 用户不在排行榜中，获取用户进度并显示
            loadMyRankInfo(myPositionContainer, currentUserId);
        }
    }
}

/**
 * 获取用户自己的排名信息（不在榜单中时）
 */
async function loadMyRankInfo(myPositionContainer, userId) {
    try {
        const response = await fetch(`http://47.98.245.103:5000/get_progress?user_id=${userId}`);
        const result = await response.json();

        if (result.status === 'success' && result.data) {
            const userData = result.data;
            const userScore = userData.game_score || 0;
            const userLevel = userData.game_level || 1;

            // 计算排名：统计有多少人分数高于当前用户
            const rankResponse = await fetch('http://47.98.245.103:5000/get_leaderboard?limit=1000');
            const rankResult = await rankResponse.json();

            let myRank = -1;
            if (rankResult.status === 'success' && rankResult.data) {
                myRank = rankResult.data.findIndex(item => String(item.user_id) === String(userId)) + 1;
            }

            if (myRank > 0) {
                const username = localStorage.getItem('pixelTownUsername') || '未知用户';
                const userAvatar = userData.avatar || defaultAvatar;
                myPositionContainer.innerHTML = `
                    <div class="leaderboard-my-position">
                        <div class="leaderboard-rank">${myRank}</div>
                        <div class="leaderboard-user">
                            <img src="${userAvatar}" alt="头像" class="leaderboard-avatar" onerror="this.src='${defaultAvatar}'">
                            <span class="leaderboard-username">${escapeHtml(username)}（你）</span>
                        </div>
                        <div class="leaderboard-level">第${userLevel}关</div>
                        <div class="leaderboard-score">${userScore}分</div>
                    </div>
                `;
            } else {
                myPositionContainer.innerHTML = `<div class="leaderboard-no-rank">暂未上榜，继续加油！</div>`;
            }
        } else {
            myPositionContainer.innerHTML = `<div class="leaderboard-no-rank">暂未上榜，继续加油！</div>`;
        }
    } catch (error) {
        console.error('获取排名信息失败:', error);
        myPositionContainer.innerHTML = `<div class="leaderboard-no-rank">暂未上榜，继续加油！</div>`;
    }
}

/**
 * HTML转义函数
 */
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}
