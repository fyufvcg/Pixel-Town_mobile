// ==================== AI助手功能 ====================

// AI对话历史（内存存储）
let aiConversationHistory = [];
let aiWindowVisible = false;

// AI API配置
const DOUBAO_API_CONFIG = {
    url: "https://doubao-ai-proxy-eombayqiis.cn-hangzhou.fcapp.run/api/v3/chat/completions"
};

// 初始化时从localStorage加载历史记录
window.addEventListener('load', () => {
    const saved = localStorage.getItem('aiConversationHistory');
    if (saved) {
        try {
            aiConversationHistory = JSON.parse(saved);
        } catch (e) {
            aiConversationHistory = [];
        }
    }
});

// 切换AI对话窗口
function toggleAIWindow() {
    const aiWindow = document.getElementById('ai-window');

    if (aiWindowVisible) {
        saveAIConversationHistory();
        aiWindow.classList.remove('show');
        setTimeout(() => {
            aiWindow.remove();
        }, 300);
        aiWindowVisible = false;
    } else {
        showAIWindow();
        aiWindowVisible = true;
    }
}

// 保存AI对话历史到内存和localStorage
function saveAIConversationHistory() {
    const messagesContainer = document.getElementById('ai-messages');
    if (!messagesContainer) return;

    aiConversationHistory = [];
    messagesContainer.querySelectorAll('.ai-message').forEach(msg => {
        const messageContent = msg.querySelector('.message-content');
        if (messageContent) {
            aiConversationHistory.push({
                type: msg.classList.contains('ai-user') ? 'user' : 'assistant',
                message: messageContent.innerHTML
            });
        }
    });

    // 保存到localStorage持久化
    localStorage.setItem('aiConversationHistory', JSON.stringify(aiConversationHistory));
}

// 恢复AI对话历史
function restoreAIConversationHistory() {
    const messagesContainer = document.getElementById('ai-messages');
    if (!messagesContainer) return;

    messagesContainer.innerHTML = '';
    aiConversationHistory.forEach(msg => {
        const messageDiv = document.createElement('div');
        messageDiv.className = `ai-message ai-${msg.type}`;
        messageDiv.innerHTML = `<div class="message-content">${msg.message}</div>`;
        messagesContainer.appendChild(messageDiv);
    });
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// 显示AI对话窗口
function showAIWindow() {

    // 从localStorage恢复批改数据
    const savedGradingData = localStorage.getItem('appQuestionGradingData');
    if (savedGradingData) {
        window.appQuestionGradingData = JSON.parse(savedGradingData);
    }
    const aiWindow = document.createElement('div');
    aiWindow.className = 'ai-window';
    aiWindow.id = 'ai-window';

    aiWindow.innerHTML = `
        <div class="ai-header">
            <div class="ai-title">师傅</div>
            <button class="ai-close" onclick="toggleAIWindow()">×</button>
        </div>
        <div class="ai-content">
            <div class="ai-messages" id="ai-messages"></div>
            <div class="ai-input-area">
                <textarea class="ai-input" id="ai-input" placeholder="请输入你的问题..." onkeypress="handleAIKeyPress(event)" rows="1"></textarea>
                <button class="ai-send" onclick="sendAIMessage()">发送</button>
            </div>
        </div>
    `;

    document.body.appendChild(aiWindow);

    setTimeout(() => {
        aiWindow.classList.add('show');
    }, 10);

    setTimeout(() => {
        if (aiConversationHistory.length > 0) {
            restoreAIConversationHistory();
        } else {
            addAIMessage('你好！我是你的专属ai助手，有什么可以帮助你的吗？', 'assistant');
        }

        // 始终显示批改记录（无论是否有对话历史）
        if (window.appQuestionGradingData && window.appQuestionGradingData.length > 0) {
            const lastGrading = window.appQuestionGradingData[window.appQuestionGradingData.length - 1];
            const gradingMsg = `📋 应用题批改完成！\n\n问题${lastGrading.questionNum}：${lastGrading.question.substring(0, 30)}...\n评分：${lastGrading.score}分（满分${lastGrading.maxScore}分）\n\n你可以问我关于这道题的任何问题，我会为你详细解答！`;
            addAIMessage(gradingMsg, 'assistant');
            aiConversationHistory.push({ type: 'assistant', message: gradingMsg });
        }

        document.getElementById('ai-input').focus();
    }, 100);

    makeDraggable(aiWindow);
    // 添加粘贴事件监听
    setTimeout(() => {
        const aiInput = document.getElementById('ai-input');
        if (aiInput) {
            aiInput.addEventListener('paste', handleAIPaste);
        }
    }, 100);

    makeDraggable(aiWindow);
}

// 使窗口可拖动
function makeDraggable(element) {
    const header = element.querySelector('.ai-header');
    let isDragging = false;
    let dragOffsetX, dragOffsetY;

    header.addEventListener('mousedown', (e) => {
        if (e.target.classList.contains('ai-close')) return;
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

    // 点击外部关闭颜色面板
    document.addEventListener('click', (e) => {
        const colorPicker = element.querySelector('.note-color-picker');
        const palette = element.querySelector('.note-color-palette');

        if (colorPicker && palette && !colorPicker.contains(e.target)) {
            palette.classList.remove('show');
        }
    });
}

// 处理AI输入框回车事件
function handleAIKeyPress(event) {
    if (event.key === 'Enter') {
        sendAIMessage();
    }
}

// 添加AI消息到对话窗口（返回创建的消息元素，方便后续直接修改）
function addAIMessage(message, type) {
    const messagesContainer = document.getElementById('ai-messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `ai-message ai-${type}`; // 与原有样式完全兼容
    messageDiv.innerHTML = `<div class="message-content">${message}</div>`;
    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
    // 关键：必须返回刚创建的元素！
    return messageDiv;
}

// 处理AI窗口中的粘贴事件（支持Ctrl+V粘贴图片）
function handleAIPaste(e) {
    // 阻止默认粘贴行为
    e.preventDefault();
    e.stopPropagation();

    const items = e.clipboardData.items;
    if (!items) return;

    for (let i = 0; i < items.length; i++) {
        if (items[i].type.indexOf('image') !== -1) {
            const file = items[i].getAsFile();
            handleAIImagePaste(file);
            return;
        }
    }
}

// 处理粘贴的图片
function handleAIImagePaste(file) {
    if (!file || !file.type.match(/image.*/)) {
        alert('请粘贴有效的图片文件！');
        return;
    }

    if (file.size > 5 * 1024 * 1024) {
        alert('图片大小不能超过5MB！');
        return;
    }

    const reader = new FileReader();
    reader.onload = function (e) {
        const imageData = e.target.result;

        // 在对话框中添加图片预览（待发送状态）
        const messagesContainer = document.getElementById('ai-messages');
        if (!messagesContainer) return;

        // 移除之前的待发送图片
        const existingPending = document.getElementById('pending-image-msg');
        if (existingPending) existingPending.remove();

        const previewDiv = document.createElement('div');
        previewDiv.className = 'ai-message ai-user';
        previewDiv.id = 'pending-image-msg';
        previewDiv.innerHTML = `
            <div class="message-content">
                <img src="${imageData}" class="pasted-image" style="max-width: 200px; max-height: 200px; border-radius: 8px; margin: 5px 0; border: 2px dashed #4CAF50;">
                <div style="font-size: 12px; color: #4CAF50; margin-top: 4px;">📎 图片已粘贴，点击发送按钮发送</div>
            </div>
        `;
        messagesContainer.appendChild(previewDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;

        // 保存图片到全局变量
        window.aiPastedImage = imageData;

        // 聚焦到输入框
        const aiInput = document.getElementById('ai-input');
        if (aiInput) {
            aiInput.focus();
        }
    };
    reader.readAsDataURL(file);
}

function sendAIMessage() {
    const input = document.getElementById('ai-input');
    const message = input.value.trim();
    const pastedImage = window.aiPastedImage;

    // 非空校验
    if (!message && !pastedImage) {
        alert('消息不能为空，请输入内容后再发送');
        return;
    }

    // 处理图片+文本的展示
    let userMessage = message;
    let displayMessage = message;
    if (pastedImage) {
        userMessage = message || '[图片]';
        displayMessage = message + (message ? '<br><br>' : '') + `<img src="${pastedImage}" class="sent-image" style="max-width: 220px; max-height: 220px; border-radius: 8px; margin: 8px 0; border: 1px solid #ddd;">`;
    }

    // 移除待发送的图片预览，添加正式用户消息
    const pendingMsg = document.getElementById('pending-image-msg');
    if (pendingMsg) pendingMsg.remove();
    addAIMessage(displayMessage, 'user');
    input.value = '';
    window.aiPastedImage = null;

    // 同步更新对话历史
    aiConversationHistory.push({ type: 'user', message: displayMessage });

    // 显示思考中状态
    const thinkingMsg = addAIMessage('<div class="thinking-indicator">思考中<span class="thinking-dots">...</span></div>', 'assistant');

    // 发起API请求
    (async () => {
        try {
            console.log("发起API请求，代理地址：", DOUBAO_API_CONFIG.url);
            // 取最近6条对话历史，避免上下文过长
            const recentHistory = aiConversationHistory.slice(-6);
            const historyMessages = recentHistory.map(msg => ({
                role: msg.type === 'user' ? 'user' : 'assistant',
                content: msg.message.replace(/<img[^>]*src="([^"]+)"[^>]*>/g, '[图片]')
            }));

            // 构建用户发送的内容（兼容纯文本/图片多模态）
            let userContent;
            if (pastedImage) {
                userContent = [
                    { type: "text", text: message || "请识别这张图片中的内容并给出解答" },
                    { type: "image_url", image_url: { url: pastedImage } }
                ];
            } else {
                userContent = message;
            }

            // 构造最终请求体
            const requestBody = {
                messages: [
                    {
                        role: "system",
                        content: "你是一位名为'师傅'的AI助手，同时也是物理力学专家。你性格温和友善，善于与人交流，能够自然流畅地进行对话。当用户询问物理力学相关问题时(主要是高中物理,包括大学物理前瞻)，你会深入浅出地讲解原理，必要时配合公式和图示说明。当用户发送图片时，请仔细识别图片中的内容（可能是物理题目、公式推导、图表等），并给出专业的解答。对于其他领域的问题，你也能正常回答，保持沉稳内敛的风格。回答时语气平和，措辞简练，不用网络流行语，让用户感到亲切自然。你是用户的朋友和导师，会耐心解答用户的各种问题。"
                    },
                    ...historyMessages,
                    { role: "user", content: userContent }
                ],
                max_tokens: 1500
            };

            // 发送请求到本地代理
            const response = await fetch(DOUBAO_API_CONFIG.url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(requestBody)
            });

            if (!response.ok) {
                const errText = await response.text();
                throw new Error(`API请求失败：${response.status} - ${errText}`);
            }

            // 解析并渲染AI回复
            const result = await response.json();
            const aiReply = result?.choices?.[0]?.message?.content || "抱歉，我暂时无法回答你的问题~";
            thinkingMsg.innerHTML = `<div class="message-content">${aiReply}</div>`;

            // 保存AI回复到历史记录
            aiConversationHistory.push({ type: 'assistant', message: aiReply });
            saveAIConversationHistory();

        } catch (error) {
            console.error("请求错误：", error);
            thinkingMsg.innerHTML = `<div class="message-content" style="color:red;">请求失败：${error.message}</div>`;
        }
    })();
}
