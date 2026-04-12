// 工作台功能 - 移动端适配

// API基础URL
const API_BASE_URL = 'http://47.98.245.103:5000';

/**
 * 初始化工作台
 */
function initWorkspace() {
    const workspaceContainer = document.getElementById('workspace-container');
    if (!workspaceContainer) return;

    // 加载工作台数据
    loadWorkspaceData();
}

/**
 * 加载工作台数据
 */
function loadWorkspaceData() {
    const userId = localStorage.getItem('pixelTownUserId');
    if (!userId) {
        showLoginPrompt();
        return;
    }

    // 加载用户进度数据
    fetch(`${API_BASE_URL}/get_progress?user_id=${userId}`)
        .then(res => res.json())
        .then(data => {
            if (data.status === 'success' && data.data) {
                const user = data.data;
                updateWorkspaceStats(user);
                renderLevelProgress(user);
            }
        })
        .catch(() => {
            console.log('加载进度数据失败');
        });

    // 加载错题数
    fetch(`${API_BASE_URL}/get_user_tags?user_id=${userId}`)
        .then(res => res.json())
        .then(data => {
            let wrongCount = 0;
            if (data.data && Array.isArray(data.data)) {
                data.data.forEach(t => wrongCount += t.wrong_count || 0);
            }
            document.getElementById('stat-wrong').textContent = wrongCount;
        })
        .catch(() => {
            console.log('加载错题数据失败');
        });

    // 加载并渲染学习热力图
    renderStudyHeatmap();
}

/**
 * 显示登录提示
 */
function showLoginPrompt() {
    const workspaceContainer = document.getElementById('workspace-container');
    if (workspaceContainer) {
        workspaceContainer.innerHTML = `
            <div style="text-align: center; padding: 20px; color: #fff;">
                <p>请先登录查看工作台数据</p>
                <button onclick="showLoginDialog()" style="margin-top: 10px; padding: 8px 16px; background: #FFD700; color: #2c1810; border: none; border-radius: 4px; font-weight: bold;">
                    去登录
                </button>
            </div>
        `;
    }
}

/**
 * 更新工作台统计数据
 */
function updateWorkspaceStats(user) {
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
}

/**
 * 渲染关卡进度
 */
function renderLevelProgress(user) {
    const levelProgressContainer = document.getElementById('level-progress');
    if (!levelProgressContainer) return;

    const maxScores = {
        1: 60, 2: 60, 3: 60, 4: 171, 5: 60, 6: 60, 7: 178
    };

    let progressHTML = '';
    for (let i = 1; i <= 7; i++) {
        const score = user[`level${i}_score`] || 0;
        const maxScore = maxScores[i];
        const percent = maxScore > 0 ? (score / maxScore * 100) : 0;

        progressHTML += `
            <div class="level-item">
                <span class="level-name">第${i}关</span>
                <div class="level-bar">
                    <div class="level-fill" style="width:${percent}%"></div>
                </div>
                <span class="level-score">${score}分</span>
            </div>
        `;
    }

    levelProgressContainer.innerHTML = progressHTML;
}

/**
 * 渲染学习热力图
 */
function renderStudyHeatmap() {
    const container = document.getElementById('study-heatmap');
    if (!container) return;

    const userId = localStorage.getItem('pixelTownUserId');
    if (!userId) {
        container.innerHTML = '<p style="color:rgba(255,255,255,0.5); text-align: center; padding: 20px;">请先登录查看学习记录</p>';
        return;
    }

    fetch(`${API_BASE_URL}/get_user_activity?user_id=${userId}&year=2026`)
        .then(res => res.json())
        .then(result => {
            if (result.status !== 'success') {
                container.innerHTML = '<p style="color:rgba(255,255,255,0.5); text-align: center; padding: 20px;">暂无学习记录</p>';
                return;
            }

            const activityData = result.data || [];
            const studyData = {};
            activityData.forEach(item => {
                // 直接使用秒数，不转分钟
                studyData[item.activity_date] = item.play_seconds || 0;
            });

            renderHeatmapContent(studyData);
        })
        .catch((err) => {
            console.log('【热力图】加载错误:', err);
            container.innerHTML = '<p style="color:rgba(255,255,255,0.5); text-align: center; padding: 20px;">加载失败</p>';
        });
}

/**
 * 渲染热力图内容
 */
function renderHeatmapContent(studyData) {
    const container = document.getElementById('study-heatmap');
    if (!container) return;

    // 创建提示框元素
    let tooltipEl = document.getElementById('heatmap-tooltip');
    if (!tooltipEl) {
        tooltipEl = document.createElement('div');
        tooltipEl.id = 'heatmap-tooltip';
        tooltipEl.className = 'heatmap-tooltip';
        tooltipEl.innerHTML = '<div class="tooltip-date"></div><div class="tooltip-time"><span class="tooltip-icon">⏱️</span><span class="tooltip-value"></span></div><div class="tooltip-level"></div>';
        document.body.appendChild(tooltipEl);
    }

    /**
     * 格式化时间
     */
    const formatTime = (seconds) => {
        if (!seconds || seconds === 0) return '无学习';
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        if (hours > 0) return hours + '小时' + (minutes > 0 ? minutes + '分钟' : '');
        return minutes + '分钟';
    };

    /**
     * 获取学习级别文本
     */
    const getLevelText = (seconds) => {
        if (!seconds || seconds === 0) return '没有学习';
        if (seconds < 1800) return '轻度学习';
        if (seconds < 3600) return '中度学习';
        return '深度学习';
    };

    const currentYear = new Date().getFullYear();
    const startDate = new Date(currentYear + '-01-01');
    const endDate = new Date(currentYear + '-12-31');
    const totalDays = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1;

    const today = new Date();
    const todayStr = today.getFullYear() === currentYear ? today.toISOString().split('T')[0] : null;

    /**
     * 获取学习级别
     */
    const getLevel = (seconds) => {
        if (!seconds || seconds === 0) return 0;
        if (seconds < 1800) return 1;
        if (seconds < 3600) return 2;
        return 3;
    };

    let html = '<div class="year-heatmap">';
    html += '<div class="heatmap-months">';
    const monthLabels = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];

    const monthWeekStarts = [];
    for (let m = 0; m < 12; m++) {
        const monthStart = new Date(currentYear, m, 1);
        const firstDayOfYear = new Date(currentYear, 0, 1);
        const daysDiff = Math.floor((monthStart - firstDayOfYear) / (1000 * 60 * 60 * 24));
        monthWeekStarts[m] = Math.floor(daysDiff / 7);
    }

    monthLabels.forEach((label, idx) => {
        const marginLeft = idx === 0 ? 0 : (monthWeekStarts[idx] - monthWeekStarts[idx - 1] - 1) * 14;
        html += '<span class="month-label" style="margin-left: ' + marginLeft + 'px;">' + label + '</span>';
    });
    html += '</div>';

    html += '<div class="heatmap-content">';
    html += '<div class="weekday-labels"><span></span><span>一</span><span></span><span>三</span><span></span><span>五</span><span></span></div>';
    html += '<div class="heatmap-grid-year">';

    const weeks = [];
    for (let w = 0; w < 53; w++) weeks[w] = new Array(7).fill(null);

    for (let d = 0; d < totalDays; d++) {
        const date = new Date(startDate);
        date.setDate(date.getDate() + d);
        const dayOfWeek = date.getDay();
        const adjustedDay = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
        const weekNum = Math.floor(d / 7);
        const dateStr = date.toISOString().split('T')[0];
        const seconds = studyData[dateStr] || 0;
        const level = getLevel(seconds);

        weeks[weekNum][adjustedDay] = { date: dateStr, level: level, seconds: seconds, isToday: dateStr === todayStr };
    }

    weeks.forEach((week, wi) => {
        html += '<div class="heatmap-week">';
        for (let day = 0; day < 7; day++) {
            const cell = week[day];
            if (cell) {
                html += '<div class="heatmap-cell level-' + cell.level + (cell.isToday ? ' today' : '') + '" data-date="' + cell.date + '" data-seconds="' + cell.seconds + '"></div>';
            } else {
                html += '<div class="heatmap-cell empty"></div>';
            }
        }
        html += '</div>';
    });

    html += '</div></div></div>';

    html += '<div class="heatmap-legend">';
    html += '<span class="legend-text">少</span>';
    html += '<span class="legend-cell level-0" title="无学习"></span>';
    html += '<span class="legend-cell level-1" title="<30分钟"></span>';
    html += '<span class="legend-cell level-2" title="30-60分钟"></span>';
    html += '<span class="legend-cell level-3" title=">60分钟"></span>';
    html += '<span class="legend-text">多</span>';
    html += '</div>';

    container.innerHTML = html;

    // 添加鼠标事件
    const cells = container.querySelectorAll('.heatmap-cell:not(.empty)');
    const weekdays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];

    cells.forEach(function (cell) {
        cell.addEventListener('mouseenter', function (e) {
            const date = cell.getAttribute('data-date');
            const seconds = parseInt(cell.getAttribute('data-seconds')) || 0;
            const dateObj = new Date(date);
            const month = dateObj.getMonth() + 1;
            const day = dateObj.getDate();

            tooltipEl.querySelector('.tooltip-date').textContent = month + '月' + day + '日 ' + weekdays[dateObj.getDay()];
            tooltipEl.querySelector('.tooltip-value').textContent = formatTime(seconds);
            tooltipEl.querySelector('.tooltip-level').textContent = getLevelText(seconds);

            const rect = cell.getBoundingClientRect();
            let left = rect.left + rect.width / 2 - 60;
            let top = rect.bottom + 10;

            if (left < 10) left = 10;
            if (left + 120 > window.innerWidth) left = window.innerWidth - 130;
            if (top + 70 > window.innerHeight) top = rect.top - 80;

            tooltipEl.style.left = left + 'px';
            tooltipEl.style.top = top + 'px';
            tooltipEl.classList.add('visible');
        });

        cell.addEventListener('mouseleave', function () {
            tooltipEl.classList.remove('visible');
        });
    });
}

// 页面加载时初始化工作台
if (typeof window !== 'undefined') {
    window.addEventListener('DOMContentLoaded', function () {
        initWorkspace();
    });
}
