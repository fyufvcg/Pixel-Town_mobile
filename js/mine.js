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
            alert('工作台功能开发中');
        });
    }

    // 初始化薄弱点查看点击事件
    const weakPointsSection = document.querySelector('.weak-points-section');
    if (weakPointsSection) {
        weakPointsSection.addEventListener('click', function () {
            alert('薄弱点查看功能开发中');
        });
    }

    // 初始化排行榜点击事件
    const leaderboardSection = document.querySelector('.leaderboard-section');
    if (leaderboardSection) {
        leaderboardSection.addEventListener('click', function () {
            alert('排行榜功能开发中');
        });
    }

    // 初始化成就点击事件
    const achievementsSection = document.querySelector('.achievements-section');
    if (achievementsSection) {
        achievementsSection.addEventListener('click', function () {
            alert('成就系统开发中');
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