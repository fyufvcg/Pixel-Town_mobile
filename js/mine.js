/**
 * 我的页面脚本
 * 用于处理我的页面的交互功能
 */

/**
 * 初始化我的页面
 */
function initMinePage() {
    const minePage = document.getElementById('minePage');
    if (!minePage) return;

    // 初始化用户信息点击事件
    const userInfoSection = document.querySelector('.user-info-section');
    if (userInfoSection) {
        userInfoSection.addEventListener('click', function () {
            showEditProfileModal();
        });
    }

    // 初始化工作台点击事件
    const workbenchSection = document.querySelector('.workbench-section');
    if (workbenchSection) {
        workbenchSection.addEventListener('click', function () {
            showWorkbenchPage();
        });
    }

    // 初始化薄弱点查看点击事件
    const weakPointsSection = document.querySelector('.weak-points-section');
    if (weakPointsSection) {
        weakPointsSection.addEventListener('click', async function () {
            const userId = localStorage.getItem('pixelTownUserId');
            if (!userId) {
                alert('请先登录后再查看薄弱点');
                return;
            }

            const response = await fetch(`${API_BASE_URL}/get_user_tags?user_id=${userId}`);
            const data = await response.json();

            if (data.status === 'success' && data.data && data.data.length > 0) {
                const tags = data.data.map(item => ({
                    name: item.tag_name,
                    count: item.wrong_count
                }));
                showWeaknessChartModal(tags);
            } else {
                alert('暂无错题记录，快去答题吧！');
            }
        });
    }

    // 初始化排行榜点击事件
    const leaderboardSection = document.querySelector('.leaderboard-section');
    if (leaderboardSection) {
        leaderboardSection.addEventListener('click', function () {
            showLeaderboardPanel();
        });
    }

    // 初始化成就点击事件
    const achievementsSection = document.querySelector('.achievements-section');
    if (achievementsSection) {
        achievementsSection.addEventListener('click', async function () {
            await showAchievementPanel();
        });
    }
}

/**
 * 当切换到我的页面时调用
 */
function onSwitchToMinePage() {
    // 初始化我的页面
    initMinePage();
}

/**
 * 当离开我的页面时调用
 */
function onLeaveMinePage() {
    // 关闭可能存在的弹窗
    closeEditProfileModal();
}

/**
 * 页面加载完成后初始化
 */
document.addEventListener('DOMContentLoaded', function () {
    // 初始化我的页面
    initMinePage();
});