/**
 * 个人信息栏功能
 * 用于处理个人信息编辑和退出登录等功能
 */

const API_BASE_URL = 'http://47.98.245.103:5000';

/**
 * 更新我的页面的个人信息栏
 */
function updateMinePageInfo() {
  const username = localStorage.getItem('pixelTownUsername') || '用户名';
  const userId = localStorage.getItem('pixelTownUserId') || '12345';

  // 更新用户名
  const userNameElement = document.querySelector('#minePage .user-name');
  if (userNameElement) {
    userNameElement.textContent = username;
  }

  // 更新用户ID
  const userIdElement = document.querySelector('#minePage .user-id');
  if (userIdElement) {
    userIdElement.textContent = `用户ID: ${userId}`;
  }

  // 更新用户头像
  const userAvatarElement = document.querySelector('#minePage .user-avatar');
  if (userAvatarElement && userId) {
    fetch(`${API_BASE_URL}/get_leaderboard?limit=1000`).then(res => res.json()).then(data => {
      if (data.status === 'success' && data.data) {
        const myData = data.data.find(item => String(item.user_id) === String(userId));
        if (myData && myData.avatar) {
          // 检查是否已经有img元素
          let avatarImg = userAvatarElement.querySelector('img');
          if (!avatarImg) {
            avatarImg = document.createElement('img');
            avatarImg.style.width = '100%';
            avatarImg.style.height = '100%';
            avatarImg.style.borderRadius = '50%';
            avatarImg.style.objectFit = 'cover';
            userAvatarElement.innerHTML = '';
            userAvatarElement.appendChild(avatarImg);
          }
          avatarImg.src = myData.avatar;
        } else {
          // 如果没有头像，显示用户名首字母
          userAvatarElement.innerHTML = username.charAt(0).toUpperCase();
        }
      }
    }).catch(() => {
      // 如果API调用失败，显示用户名首字母
      userAvatarElement.innerHTML = username.charAt(0).toUpperCase();
    });
  }
}

// 页面加载时更新个人信息
window.addEventListener('load', updateMinePageInfo);

/**
 * 显示个人信息编辑弹窗
 */
function showEditProfileModal() {
  // 检查是否已存在弹窗
  if (document.getElementById('editProfileModal')) {
    // 如果已存在，直接显示
    const modal = document.getElementById('editProfileModal');
    modal.classList.add('active');
    return;
  }

  const username = localStorage.getItem('pixelTownUsername') || '未知用户';
  const userId = localStorage.getItem('pixelTownUserId') || '未知ID';

  // 创建弹窗遮罩层
  const modalOverlay = document.createElement('div');
  modalOverlay.className = 'edit-profile-modal';
  modalOverlay.id = 'editProfileModal';

  // 创建弹窗内容
  const modalContent = document.createElement('div');
  modalContent.className = 'edit-profile-content';

  // 填充弹窗内容
  modalContent.innerHTML = `
        <!-- 关闭按钮 -->
        <button class="modal-close" onclick="closeEditProfileModal()">
            <span>×</span>
        </button>

        <!-- 标题栏 -->
        <div class="modal-header">
            <h2>个人信息编辑</h2>
        </div>

        <!-- 编辑表单 -->
        <div class="edit-profile-form">
            <div class="account-avatar" onclick="showAvatarSelector()" title="点击更换头像">
                <img id="user-avatar-img" src="" style="display:none;" />
                <span id="user-avatar-letter">${username.charAt(0).toUpperCase()}</span>
            </div>

            <div class="account-details">
                <div class="account-item">
                    <span class="account-label">用户名</span>
                    <span class="account-value">${username}</span>
                </div>

                <div class="account-item">
                    <span class="account-label">用户ID</span>
                    <span class="account-value">${userId}</span>
                </div>

                <div class="account-item">
                    <span class="account-label">密码</span>
                    <span class="account-value"> <a href="javascript:void(0)" class="change-password-link" onclick="showChangePasswordModal()">修改</a></span>
                </div>

                <div class="account-item">
                    <span class="account-label">登录状态</span>
                    <span class="account-value status-active">已登录</span>
                </div>
            </div>

            <!-- 退出登录按钮 -->
            <button class="logout-btn" onclick="handleLogout()">退出登录</button>
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

  // 加载用户头像
  loadUserAvatar();
}

/**
 * 关闭个人信息编辑弹窗
 */
function closeEditProfileModal() {
  const modalOverlay = document.getElementById('editProfileModal');
  if (modalOverlay) {
    modalOverlay.classList.remove('active');
    // 等待动画完成后隐藏
    setTimeout(() => {
      modalOverlay.remove();
      // 恢复背景滚动
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    }, 300);
  }
}

/**
 * 处理退出登录
 */
function handleLogout() {
  Modal.confirm('确定要退出登录吗？', '退出登录', function () {
    // 清除本地存储
    localStorage.clear();
    console.log('已清除所有本地存储');
    Modal.info('退出登录成功', '成功');
    closeEditProfileModal();

    // 重新加载页面，实现页面初始化
    setTimeout(() => {
      location.reload();
    }, 1000);
  });
}

/**
 * 加载用户头像
 */
function loadUserAvatar() {
  const userId = localStorage.getItem('pixelTownUserId');
  if (!userId) return;

  fetch(`${API_BASE_URL}/get_leaderboard?limit=1000`).then(res => res.json()).then(data => {
    if (data.status === 'success' && data.data) {
      const myData = data.data.find(item => String(item.user_id) === String(userId));
      if (myData && myData.avatar) {
        const avatarImg = document.getElementById('user-avatar-img');
        const avatarLetter = document.getElementById('user-avatar-letter');
        if (avatarImg && avatarLetter) {
          avatarImg.src = myData.avatar;
          avatarImg.style.display = 'block';
          avatarLetter.style.display = 'none';
        }
      }
    }
  }).catch(() => { });
}

const avatarOptions = [
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Bailey',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Charlie',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Dana',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Ellie',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Frank',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Grace',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Henry',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Ivy',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Jack',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Kelly'
];

/**
 * 显示头像选择器
 */
function showAvatarSelector() {
  const existing = document.getElementById('avatar-selector-modal');
  if (existing) existing.remove();

  const modal = document.createElement('div');
  modal.id = 'avatar-selector-modal';
  modal.className = 'avatar-selector-overlay';
  modal.onclick = function (e) {
    if (e.target === modal) modal.remove();
  };

  let optionsHTML = '<div class="avatar-grid">';
  avatarOptions.forEach((url, idx) => {
    optionsHTML += '<div class="avatar-option" onclick="selectAvatar(\'' + url + '\')">';
    optionsHTML += '<img src="' + url + '" alt="头像' + (idx + 1) + '" />';
    optionsHTML += '</div>';
  });
  optionsHTML += '</div>';
  optionsHTML += '<input type="file" id="avatar-upload-input" class="avatar-upload-input" accept="image/*" onchange="uploadCustomAvatar(event)">';
  optionsHTML += '<button class="avatar-upload-btn" onclick="document.getElementById(\'avatar-upload-input\').click()">📤 上传自定义头像</button>';

  modal.innerHTML = `
        <div class="avatar-selector-box">
            <h3>选择头像</h3>
            ${optionsHTML}
            <button class="avatar-selector-close" onclick="this.closest('#avatar-selector-modal').remove()">取消</button>
        </div>
    `;
  document.body.appendChild(modal);
  setTimeout(() => modal.classList.add('show'), 10);
}

/**
 * 上传自定义头像
 */
function uploadCustomAvatar(event) {
  const file = event.target.files[0];
  if (!file) return;

  if (!file.type.startsWith('image/')) {
    Modal.info('请选择图片文件', '提示');
    return;
  }

  if (file.size > 2 * 1024 * 1024) {
    Modal.info('图片大小不能超过2MB', '提示');
    return;
  }

  const reader = new FileReader();
  reader.onload = function (e) {
    const base64Data = e.target.result;
    selectAvatar(base64Data);
  };
  reader.readAsDataURL(file);
}

/**
 * 选择头像
 */
function selectAvatar(avatarUrl) {
  const userId = localStorage.getItem('pixelTownUserId');
  if (!userId) return;

  fetch(`${API_BASE_URL}/update_user_avatar`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ user_id: userId, avatar_url: avatarUrl })
  }).then(res => res.json()).then(data => {
    if (data.status === 'success') {
      const avatarImg = document.getElementById('user-avatar-img');
      const avatarLetter = document.getElementById('user-avatar-letter');
      if (avatarImg && avatarLetter) {
        avatarImg.src = avatarUrl;
        avatarImg.style.display = 'block';
        avatarLetter.style.display = 'none';
      }
      const selector = document.getElementById('avatar-selector-modal');
      if (selector) selector.remove();

      // 更新我的页面的头像
      updateMinePageInfo();
    } else {
      Modal.info(data.message || '头像更新失败', '错误');
    }
  }).catch(() => {
    Modal.info('网络错误，请稍后重试', '错误');
  });
}

/**
 * 显示修改密码弹窗
 */
function showChangePasswordModal() {
  const existing = document.getElementById('change-password-modal');
  if (existing) existing.remove();

  const modal = document.createElement('div');
  modal.id = 'change-password-modal';
  modal.className = 'change-password-modal';
  modal.onclick = function (e) {
    if (e.target === modal) modal.remove();
  };

  modal.innerHTML = `
        <div class="change-password-content">
            <button class="modal-close" onclick="this.closest('#change-password-modal').remove()">×</button>
            <h3>修改密码</h3>
            <div class="form-group">
                <label>旧密码</label>
                <input type="password" class="form-input" id="old-password" placeholder="请输入旧密码">
            </div>
            <div class="form-group">
                <label>新密码</label>
                <input type="password" class="form-input" id="new-password" placeholder="请输入新密码">
            </div>
            <div class="form-group">
                <label>确认新密码</label>
                <input type="password" class="form-input" id="confirm-password" placeholder="请确认新密码">
            </div>
            <button class="submit-btn" onclick="changePassword()">确认修改</button>
        </div>
    `;

  document.body.appendChild(modal);
  setTimeout(() => modal.classList.add('active'), 10);
}

/**
 * 修改密码
 */
function changePassword() {
  const userId = localStorage.getItem('pixelTownUserId');
  const oldPassword = document.getElementById('old-password').value;
  const newPassword = document.getElementById('new-password').value;
  const confirmPassword = document.getElementById('confirm-password').value;

  if (!oldPassword || !newPassword || !confirmPassword) {
    Modal.info('请填写完整信息', '提示');
    return;
  }

  if (newPassword !== confirmPassword) {
    Modal.info('两次输入的新密码不一致', '提示');
    return;
  }

  if (newPassword.length < 6) {
    Modal.info('新密码长度至少6位', '提示');
    return;
  }

  fetch(`${API_BASE_URL}/change_password`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ user_id: userId, old_password: oldPassword, new_password: newPassword })
  }).then(res => res.json()).then(data => {
    if (data.status === 'success') {
      Modal.info('密码修改成功', '成功');
      document.getElementById('change-password-modal').remove();
    } else {
      Modal.info(data.message || '原密码错误', '错误');
    }
  }).catch(() => { Modal.info('网络错误', '错误'); });
}

