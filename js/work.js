/**
 * 学习工作台页面脚本
 * 用于处理学习工作台页面的显示和交互功能
 */

/**
 * 显示学习工作台页面
 */
function showWorkbenchPage() {
  // 隐藏所有页面
  document.querySelectorAll('.page').forEach(page => {
    page.style.display = 'none';
  });

  // 检查是否已存在工作台页面
  let workbenchPage = document.getElementById('workbenchPage');
  if (!workbenchPage) {
    // 创建工作台页面
    workbenchPage = document.createElement('div');
    workbenchPage.id = 'workbenchPage';
    workbenchPage.className = 'page workbench-page';
    workbenchPage.innerHTML = `
            <div class="workbench-header">
                <h1 class="workbench-title">学习工作台</h1>
                <button class="workbench-close" onclick="closeWorkbenchPage()">×</button>
            </div>
            <div class="workbench-content">
                <div class="workspace-stats" id="workspace-stats">
                    <div class="stat-card">
                        <div class="stat-icon">🎮</div>
                        <div class="stat-info">
                            <div class="stat-value" id="stat-levels">-</div>
                            <div class="stat-label">已完成关卡</div>
                        </div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-icon">⭐</div>
                        <div class="stat-info">
                            <div class="stat-value" id="stat-score">-</div>
                            <div class="stat-label">总得分</div>
                        </div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-icon">❌</div>
                        <div class="stat-info">
                            <div class="stat-value" id="stat-wrong">-</div>
                            <div class="stat-label">错题数</div>
                        </div>
                    </div>
                </div>
                <div class="workspace-chart">
                    <h3>关卡进度</h3>
                    <div class="level-progress" id="level-progress"></div>
                </div>
            </div>
        `;
    document.body.appendChild(workbenchPage);
  } else {
    // 显示已存在的工作台页面
    workbenchPage.style.display = 'block';
  }

  // 加载工作台数据
  loadWorkspaceData();
}

/**
 * 关闭学习工作台页面，返回我的页面
 */
function closeWorkbenchPage() {
  const workbenchPage = document.getElementById('workbenchPage');
  if (workbenchPage) {
    workbenchPage.style.display = 'none';
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

  // 确保其他页面内容隐藏
  document.querySelectorAll('.page-content').forEach(page => {
    if (page.id !== 'minePage') {
      page.style.display = 'none';
    }
  });
}

/**
 * 当切换到工作台页面时调用
 */
function onSwitchToWorkbenchPage() {
  // 初始化工作台页面
  // 这里可以添加加载数据的逻辑
}

/**
 * 当离开工作台页面时调用
 */
function onLeaveWorkbenchPage() {
  // 清理工作台页面的资源
}

/**
 * 加载工作台数据
 */
function loadWorkspaceData() {
  const API_BASE_URL = 'http://47.98.245.103:5000';
  const userId = localStorage.getItem('pixelTownUserId');
  if (!userId) return;

  // 加载进度数据
  fetch(`${API_BASE_URL}/get_progress?user_id=${userId}`)
    .then(res => res.json())
    .then(data => {
      if (data.status === 'success' && data.data) {
        const user = data.data;
        let completedLevels = 0;
        const maxScores = {
          1: 60, 2: 60, 3: 60, 4: 171, 5: 60, 6: 60, 7: 178
        };
        for (let i = 1; i <= 7; i++) {
          const score = user[`level${i}_score`] || 0;
          if (score > 0) completedLevels++;
        }
        document.getElementById('stat-levels').textContent = `${completedLevels}/7`;
        document.getElementById('stat-score').textContent = user.game_score || 0;

        // 渲染关卡进度条
        let progressHTML = '';
        for (let i = 1; i <= 7; i++) {
          const score = user[`level${i}_score`] || 0;
          const maxScore = maxScores[i];
          const percent = maxScore > 0 ? (score / maxScore * 100) : 0;
          progressHTML += `<div class="level-item"><span class="level-name">第${i}关</span><div class="level-bar"><div class="level-fill" style="width:${percent}%"></div></div><span class="level-score">${score}分</span></div>`;
        }
        document.getElementById('level-progress').innerHTML = progressHTML;
      }
    })
    .catch(() => { });

  // 加载错题数据
  fetch(`${API_BASE_URL}/get_user_tags?user_id=${userId}`)
    .then(res => res.json())
    .then(data => {
      let wrongCount = 0;
      if (data.data && Array.isArray(data.data)) {
        data.data.forEach(t => wrongCount += t.wrong_count || 0);
      }
      document.getElementById('stat-wrong').textContent = wrongCount;
    })
    .catch(() => { });
}

/**
 * 页面加载完成后初始化
 */
document.addEventListener('DOMContentLoaded', function () {
  // 工作台页面初始化
});
