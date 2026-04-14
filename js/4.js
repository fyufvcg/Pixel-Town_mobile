// 小测页面功能

// 打开小测前导说明页面
function openQuizPage() {
  // 创建前导说明页面
  const introPage = document.createElement('div');
  introPage.className = 'quiz-intro';
  introPage.id = 'quizIntroPage';

  introPage.innerHTML = `
    <div class="quiz-intro-header">
      <h2 class="quiz-intro-title">小测</h2>
      <button class="quiz-intro-close" onclick="closeQuizIntroPage()">×</button>
    </div>
    <div class="quiz-intro-content">
      <h3>阶段性综合测试</h3>
      <p>你已完成重力与弹力、摩擦力、牛顿第三定律三关学习，对三种常见力与相互作用规律有了初步掌握。</p>
      <p>本关为阶段性综合测试，聚焦基础概念辨析、受力判断与简单规律应用，检验你对核心知识的理解是否扎实，帮你巩固前半段力学基础，为后续更复杂的力的合成与平衡做好准备。</p>
    </div>
    <div class="quiz-intro-footer">
      <button class="start-test-btn" onclick="startQuiz()">开始测试</button>
    </div>
  `;

  document.body.appendChild(introPage);
  document.body.style.overflow = 'hidden';
}

// 开始小测
function startQuiz() {
  // 移除前导说明页面
  const introPage = document.getElementById('quizIntroPage');
  if (introPage) {
    introPage.remove();
  }

  // 显示小测页面
  document.getElementById('mainPage').style.display = 'none';
  document.getElementById('quizPage').style.display = 'block';
}

// 关闭小测前导说明页面
function closeQuizIntroPage() {
  // 移除前导说明页面
  const introPage = document.getElementById('quizIntroPage');
  if (introPage) {
    introPage.remove();
  }
  // 显示主页面
  document.getElementById('mainPage').style.display = 'block';
  document.body.style.overflow = '';
}

// 关闭小测页面
function closeQuizPage() {
  // 关闭小测页面
  document.getElementById('quizPage').style.display = 'none';
  // 移除可能存在的前导说明页面
  const introPage = document.getElementById('quizIntroPage');
  if (introPage) {
    introPage.remove();
  }
  // 显示小测前导说明页面
  openQuizPage();
  document.body.style.overflow = 'hidden';
}

// 重新加载小测内容
function loadQuizContent() {
  const quizContent = document.querySelector('#quizPage .quiz-content');
  if (quizContent) {
    quizContent.innerHTML = `
      <!-- 选择题内容 -->
      <div id="quiz-choice-content" class="quiz-tab-content active">
        <h3>选择题</h3>
        <p>请完成以下选择题。</p>
        <div class="quiz-question">
          <p><strong>问题1：</strong>（2021春•河南月考）地球上的物体都会受到重力作用，下列关于重力的说法正确的是（　　）</p>
          <div class="quiz-options">
            <label><input type="radio" name="quiz-q1" value="a"> A．地球表面的物体，受到的重力方向都相同</label>
            <label><input type="radio" name="quiz-q1" value="b"> B．形状规则的物体，重心都在物体几何中心处</label>
            <label><input type="radio" name="quiz-q1" value="c"> C．同一个物体在地球表面不同位置，所受重力大小不一定相同</label>
            <label><input type="radio" name="quiz-q1" value="d"> D．形状不规则的物体，都可以用悬挂法测重心</label>
          </div>
        </div>
        <div class="quiz-question">
          <p><strong>问题2：</strong>（2021春•儋州校级月考）为测量一弹簧的劲度系数，某同学根据实验数据作出了该弹簧弹力与弹簧长度的关系图象如图所示，弹簧始终处于弹性限度内，则该弹簧的劲度系数为（　　）
          </p>
          <div class="question-image">
            <img src="images/test/第四关/第四关选择2.png" alt="弹簧弹力与长度关系图">
          </div>
          <div class="quiz-options">
            <label><input type="radio" name="quiz-q2" value="a"> A．50N/m</label>
            <label><input type="radio" name="quiz-q2" value="b"> B．N/m</label>
            <label><input type="radio" name="quiz-q2" value="c"> C．100N/m</label>
            <label><input type="radio" name="quiz-q2" value="d"> D．200N/m</label>
          </div>
        </div>
        <div class="quiz-question">
          <p><strong>问题3：</strong>（2021春•浙江期中）下面关于摩擦力的说法，正确的是（　　）</p>
          <div class="quiz-options">
            <label><input type="radio" name="quiz-q3" value="a"> A．滑动摩擦力的大小可以用公式F＝μFN 直接计算</label>
            <label><input type="radio" name="quiz-q3" value="b"> B．拉不动物体，是因为拉力小于摩擦力</label>
            <label><input type="radio" name="quiz-q3" value="c"> C．静摩擦力的方向总是与物体运动趋势的方向相反</label>
            <label><input type="radio" name="quiz-q3" value="d"> D．滑动摩擦力总是阻碍物体运动</label>
          </div>
        </div>
        <div class="quiz-question">
          <p><strong>问题4：</strong>（2021春•浙江期中）如图所示，一机械臂铁夹竖直夹起一个金属小球，铁夹与球接触面保持竖直，则（　　）</p>
          <div class="question-image">
            <img src="images/test/第四关/第四关选择4.png" alt="机械臂铁夹示意图">
          </div>
          <div class="quiz-options">
            <label><input type="radio" name="quiz-q4" value="a"> A．若小球在空中处于静止状态，小球受到的静摩擦力方向竖直向下</label>
            <label><input type="radio" name="quiz-q4" value="b"> B．若小球在空中处于静止状态，小球受到的摩擦力与重力大小相等</label>
            <label><input type="radio" name="quiz-q4" value="c"> C．若小球在空中处于静止状态，增大铁夹对小球的压力，小球受到的摩擦力变大</label>
            <label><input type="radio" name="quiz-q4" value="d"> D．若铁夹夹金属小球一起水平移动，小球受到的是滑动摩擦力</label>
          </div>
        </div>
        <div class="quiz-question">
          <p><strong>问题5：</strong>（2021•石景山区一模）如图所示，物块放在一与水平面夹角为θ的传送带上，且始终与传送带相对静止。关于物块受到的静摩擦力f，下列说法正确的是（　　）
          </p>
          <div class="question-image">
            <img src="images/test/第四关/第四关选择5.png" alt="传送带示意图">
          </div>
          <div class="quiz-options">
            <label><input type="radio" name="quiz-q5" value="a"> A．当传送带加速向上运动时，f的方向一定沿传送带向上</label>
            <label><input type="radio" name="quiz-q5" value="b"> B．当传送带加速向上运动时，f的方向一定沿传送带向下</label>
            <label><input type="radio" name="quiz-q5" value="c"> C．当传送带加速向下运动时，f的方向一定沿传送带向下</label>
            <label><input type="radio" name="quiz-q5" value="d"> D．当传送带加速向下运动时，f的方向一定沿传送带向上</label>
          </div>
        </div>
        <div class="quiz-question">
          <p><strong>问题6：</strong>（2020秋•仙游县校级期末）如图所示，一水平传送带，当传送带静止时，一物体以一定的初速度在传送带上向右滑动，设它受到摩擦力大小为F1；当传送带上表面水平向左运动时，该物体仍以一定的初速度在传送带上向右滑动，设它受到的摩擦力大小为F2，则这两个力的大小关系是（　　）
          </p>
          <div class="question-image">
            <img src="images/test/第四关/第四关选择6.png" alt="传送带滑动示意图">
          </div>
          <div class="quiz-options">
            <label><input type="radio" name="quiz-q6" value="a"> A．F1＝F2</label>
            <label><input type="radio" name="quiz-q6" value="b"> B．F1＞F2</label>
            <label><input type="radio" name="quiz-q6" value="c"> C．F1＜F2</label>
            <label><input type="radio" name="quiz-q6" value="d"> D．难以确定</label>
          </div>
        </div>
        <div class="quiz-question">
          <p><strong>问题7：</strong>（2020秋•克拉玛依区校级期末）有一圆形的均匀薄板，若将其中央再挖掉一个小圆板成一个圆环，如图所示，下面说法正确的是（　　）</p>
          <div class="question-image">
            <img src="images/test/第四关/第四关选择7.png" alt="圆环示意图">
          </div>
          <div class="quiz-options">
            <label><input type="radio" name="quiz-q7" value="a"> A．重心向外侧偏移，重力减小</label>
            <label><input type="radio" name="quiz-q7" value="b"> B．重力和重心都没有变</label>
            <label><input type="radio" name="quiz-q7" value="c"> C．重力减小，重心位置没有变</label>
            <label><input type="radio" name="quiz-q7" value="d"> D．重力减小，重心位置不存在</label>
          </div>
        </div>
        <div class="quiz-question">
          <p><strong>问题8：</strong>（2021春•浙江月考）如图所示，轻质弹簧上端固定，下端与小球A连接，小球A通过细线与小球B连接。整体静止时弹簧的长度为L。现对小球A施加一个水平向右的恒力，并对小球B施加一个水平向左的同样大小的恒力，最后达平衡时弹簧的长度记为L′。则下列说法正确的是（　　）
          </p>
          <div class="question-image">
            <img src="images/test/第四关/第四关选择8.png" alt="弹簧平衡示意图">
          </div>
          <div class="quiz-options">
            <label><input type="radio" name="quiz-q8" value="a"> A．L′＝L，弹簧仍竖直</label>
            <label><input type="radio" name="quiz-q8" value="b"> B．L′＝L，弹簧向右偏</label>
            <label><input type="radio" name="quiz-q8" value="c"> C．L′＞L，弹簧向右偏</label>
            <label><input type="radio" name="quiz-q8" value="d"> D．L′＞L，弹簧向左偏</label>
          </div>
        </div>
        <div class="quiz-question">
          <p><strong>问题9：</strong>（2021•株洲模拟）黑板擦在手施加的恒定推力F作用下匀速擦拭黑板，已知黑板擦与竖直黑板间的动摩擦因数为μ，不计黑板擦的重力，则它所受的摩擦力大小为（　　）
          </p>
          <div class="question-image">
            <img src="images/test/第四关/第四关选择9.png" alt="黑板擦示意图">
          </div>
          <div class="quiz-options">
            <label><input type="radio" name="quiz-q9" value="a"> A．F</label>
            <label><input type="radio" name="quiz-q9" value="b"> B．μF</label>
            <label><input type="radio" name="quiz-q9" value="c"> C．F/μ</label>
            <label><input type="radio" name="quiz-q9" value="d"> D．Fsinθ</label>
          </div>
        </div>
        <div class="quiz-question">
          <p><strong>问题10：</strong>（2021春•龙凤区校级期中）关于重力和弹力的下列说法中，不正确的是（　　）</p>
          <div class="quiz-options">
            <label><input type="radio" name="quiz-q10" value="a"> A．挂在电线下的电灯受到向上的拉力，是因为电线发生微小形变产生的</label>
            <label><input type="radio" name="quiz-q10" value="b"> B．绳对物体的拉力方向总是沿绳方向的，且一定指向绳收缩的方向</label>
            <label><input type="radio" name="quiz-q10" value="c"> C．质量均匀分布、几何形状规则的物体的重心必与其几何中心重合</label>
            <label><input type="radio" name="quiz-q10" value="d"> D．轻杆的弹力方向总是沿杆方向，但可以沿杆向外</label>
          </div>
        </div>
        <div class="quiz-question">
          <p><strong>问题11：</strong>（2021春•泸县校级月考）下列对公式的理解正确的是（　　）</p>
          <div class="quiz-options">
            <label><input type="radio" name="quiz-q11" value="a"> A．由公式μ＝Ff/FN可知，动摩擦因数是两个力的比值，没有单位</label>
            <label><input type="radio" name="quiz-q11" value="b"> B．由公式a＝Δv/Δt可知，物体运动的时间越短，则加速度越大</label>
            <label><input type="radio" name="quiz-q11" value="c"> C．由公式v＝s/t可知，物体运动位移越大，则平均速度越大</label>
            <label><input type="radio" name="quiz-q11" value="d"> D．由公式k＝F/x可知，弹簧的劲度系数与所受弹力成正比</label>
          </div>
        </div>
        <div class="quiz-question">
          <p><strong>问题12：</strong>（2021•全国四模）如图，建筑工人用砖夹竖直搬运四块相同的砖，每块砖的质量均为m，重力加速度大小为g。下列说法正确的是（　　）</p>
          <div class="question-image">
            <img src="images/test/第四关/第四关选择12.png" alt="砖夹示意图">
          </div>
          <div class="quiz-options">
            <label><input type="radio" name="quiz-q12" value="a"> A．当砖静止时，砖块4对砖块3的摩擦力大小为mg</label>
            <label><input type="radio" name="quiz-q12" value="b"> B．当砖静止时，砖块2对砖块3的摩擦力为mg</label>
            <label><input type="radio" name="quiz-q12" value="c"> C．当将四块砖一起竖直向上加速提起时，砖块4对砖块3的摩擦力大小为mg</label>
            <label><input type="radio" name="quiz-q12" value="d"> D．当将四块砖一起竖直向上加速提起时，砖块2对砖块3的摩擦力为零</label>
          </div>
        </div>
        <div class="quiz-question">
          <p><strong>问题13：</strong>（2021春•浙江月考）如图所示，在平直路面上，旅客水平推着行李箱加速前行，则（　　）</p>
          <div class="question-image">
            <img src="images/test/第四关/第四关选择13.png" alt="行李箱示意图">
          </div>
          <div class="quiz-options">
            <label><input type="radio" name="quiz-q13" value="a"> A．行李箱所受的推力和地面对行李箱的摩擦力是一对平衡力</label>
            <label><input type="radio" name="quiz-q13" value="b"> B．行李箱对地面的压力和行李箱所受重力是一对作用和反作用力</label>
            <label><input type="radio" name="quiz-q13" value="c"> C．行李箱对地面的压力和地面对行李箱的支持力是一对平衡力</label>
            <label><input type="radio" name="quiz-q13" value="d"> D．行李箱所受的重力和地面对行李箱的支持力是一对平衡力</label>
          </div>
        </div>
        <div class="quiz-question">
          <p><strong>问题14：</strong>（2020秋•东城区期末）撑杆跳高是一项技术性很强的体育运动，完整的过程可以简化成三个阶段：持杆助跑、撑杆起跳上升、越杆下落。撑杆跳高的过程中包含很多物理知识，下列说法正确的是（　　）
          </p>
          <div class="question-image">
            <img src="images/test/第四关/第四关选择14.png" alt="撑杆跳高示意图">
          </div>
          <div class="quiz-options">
            <label><input type="radio" name="quiz-q14" value="a"> A．持杆助跑过程，重力的反作用力是地面对运动员的支持力</label>
            <label><input type="radio" name="quiz-q14" value="b"> B．撑杆起跳上升阶段，弯曲的撑杆对人的作用力大于人对撑杆的作用力</label>
            <label><input type="radio" name="quiz-q14" value="c"> C．撑杆起跳上升阶段，弯曲的撑杆对人的作用力大小等于人对撑杆的作用力大小</label>
            <label><input type="radio" name="quiz-q14" value="d"> D．最高点手已离开撑杆，运动员还能继续越过横杆，是因为受到了一个向前的冲力</label>
          </div>
        </div>
        <div class="quiz-question">
          <p><strong>问题15：</strong>（2020•南京学业考试）2020年12月1日，乒乓球男子世界杯决赛中，中国选手樊振东以4：2击败张本智和，成功卫冕世界杯冠军。在樊振东击球的瞬间，下列说法正确的是（　　）
          </p>
          <div class="question-image">
            <img src="images/test/第四关/第四关选择15.png" alt="乒乓球击球示意图">
          </div>
          <div class="quiz-options">
            <label><input type="radio" name="quiz-q15" value="a"> A．球拍对乒乓球的作用力大于乒乓球对球拍的作用力</label>
            <label><input type="radio" name="quiz-q15" value="b"> B．球拍对乒乓球的作用力与乒乓球对球拍的作用力大小相等</label>
            <label><input type="radio" name="quiz-q15" value="c"> C．球拍对乒乓球的作用力与乒乓球所受到的重力是一对平衡力</label>
            <label><input type="radio" name="quiz-q15" value="d"> D．球拍对乒乓球的作用力与乒乓球对球拍的作用力是一对平衡力</label>
          </div>
        </div>
      </div>
      <!-- 填空题内容 -->
      <div id="quiz-fill-content" class="quiz-tab-content" style="display: none;">
        <h3>填空题</h3>
        <p>请完成以下填空题。</p>
        <div class="quiz-question">
          <p><strong>问题1：</strong>（2020秋•赫山区校级期末）某弹簧发生弹性形变时，弹力的大小F与弹簧伸长量x的关系如图所示。当弹簧的伸长量为0.4m时，弹簧的弹力F＝　　N，弹簧的劲度系数k＝　　N/m。
          </p>
          <div class="question-image">
            <img src="images/test/第四关/第四关填空1.png" alt="弹力与伸长量关系图">
          </div>
          <input type="text" class="quiz-input" placeholder="第1空答案" id="fill-q1-1">
          <input type="text" class="quiz-input" placeholder="第2空答案" id="fill-q1-2">
        </div>
        <div class="quiz-question">
          <p><strong>问题2：</strong>（2020秋•隆德县期末）某物理兴趣小组的同学在研究一轻质弹簧的劲度系数时，测得弹力的大小F和弹簧长度L的关系如图所示，则弹簧的原长为　　cm，劲度系数为　　N/m。
          </p>
          <div class="question-image">
            <img src="images/test/第四关/第四关填空2.png" alt="弹力与长度关系图">
          </div>
          <input type="text" class="quiz-input" placeholder="第1空答案" id="fill-q2-1">
          <input type="text" class="quiz-input" placeholder="第2空答案" id="fill-q2-2">
        </div>
        <div class="quiz-question">
          <p><strong>问题3：</strong>（2020秋•三门峡期末）在探究作用力和反作用力的关系实验中，把A、B两个轻质弹簧测力计连接在一起，B的一端固定，用手拉测力计A。</p>
          <p>（1）B弹簧秤读数F为　　 N；</p>
          <p>（2）F和F′的关系为　　 ；</p>
          <p>（3）手对弹簧秤A的拉力大小为　　 N。</p>
          <input type="text" class="quiz-input" placeholder="第1空答案" id="fill-q3-1">
          <input type="text" class="quiz-input" placeholder="第2空答案" id="fill-q3-2">
          <input type="text" class="quiz-input" placeholder="第3空答案" id="fill-q3-3">
        </div>
      </div>
      <!-- 应用题内容 -->
      <div id="quiz-application-content" class="quiz-tab-content" style="display: none;">
        <h3>应用题</h3>
        <p>请完成以下应用题，上传解题过程图片。</p>
        <div class="quiz-question">
          <p><strong>问题1：</strong>（2020秋•福州期中）如图，质量m＝30kg的沙发，放置在水平地面上，小红用平行于地面的水平力推沙发，当推力F1＝80N时，沙发静止；当推力F2＝120N时，沙发做匀速运动，g＝10m/s²。求：
          </p>
          <p>（1）沙发与地面间的最大静摩擦力fmax；</p>
          <p>（2）沙发与地面间的动摩擦因数μ。</p>
          <div class="question-image">
            <img src="images/test/第四关/第四关应用1.png" alt="沙发示意图">
          </div>
          <div class="image-upload-container">
            <div class="upload-area" id="quiz-upload-area-1" onclick="document.getElementById('quiz-file-input-1').click()">
              <div class="upload-icon">📷</div>
              <div class="upload-text">点击或拖拽上传图片</div>
              <div class="upload-hint">支持 JPG、PNG 格式</div>
            </div>
            <input type="file" id="quiz-file-input-1" class="file-input" accept="image/*" onchange="handleQuizImageUpload1(this)" style="display: none;">
            <div class="uploaded-images" id="quiz-uploaded-images-1"></div>
          </div>
        </div>
        <div class="quiz-question">
          <p><strong>问题2：</strong>（2020秋•福州期中）质量m＝2kg的物体静止在水平地面上，物体与地面间的动摩擦因数μ＝0.5，最大静摩擦力近似等于滑动摩擦力。现对物体施加一水平向右的拉力F，g＝10m/s²。求：
          </p>
          <p>（1）当拉力F1＝5N时，物体受到的摩擦力大小和方向；</p>
          <p>（2）当拉力F2＝15N时，物体受到的摩擦力大小和方向。</p>
          <div class="image-upload-container">
            <div class="upload-area" id="quiz-upload-area-2" onclick="document.getElementById('quiz-file-input-2').click()">
              <div class="upload-icon">📷</div>
              <div class="upload-text">点击或拖拽上传图片</div>
              <div class="upload-hint">支持 JPG、PNG 格式</div>
            </div>
            <input type="file" id="quiz-file-input-2" class="file-input" accept="image/*" onchange="handleQuizImageUpload2(this)" style="display: none;">
            <div class="uploaded-images" id="quiz-uploaded-images-2"></div>
          </div>
        </div>
        <div class="quiz-question">
          <p><strong>问题3：</strong>（2020秋•福州期中）如图所示，质量m1=2kg的物体A静止在水平地面上，物体A与地面间的动摩擦因数μ=0.5，最大静摩擦力近似等于滑动摩擦力。现对物体A施加一水平向右的拉力F，g=10m/s²。求：
          </p>
          <p>（1）当拉力F1=8N时，物体A受到的摩擦力大小和方向；</p>
          <p>（2）当拉力F2=15N时，物体A受到的摩擦力大小和方向。</p>
          <div class="question-image">
            <img src="images/test/第四关/第四关应用3.png" alt="物体A受力示意图">
          </div>
          <div class="image-upload-container">
            <div class="upload-area" id="quiz-upload-area-3" onclick="document.getElementById('quiz-file-input-3').click()">
              <div class="upload-icon">📷</div>
              <div class="upload-text">点击或拖拽上传图片</div>
              <div class="upload-hint">支持 JPG、PNG 格式</div>
            </div>
            <input type="file" id="quiz-file-input-3" class="file-input" accept="image/*" onchange="handleQuizImageUpload3(this)" style="display: none;">
            <div class="uploaded-images" id="quiz-uploaded-images-3"></div>
          </div>
        </div>
        <div class="quiz-question">
          <p><strong>问题4：</strong>（2020秋•福州期中）如图所示，质量m=10kg的木箱，放置在水平地面上，木箱与地面间的动摩擦因数μ=0.4，最大静摩擦力近似等于滑动摩擦力。现对木箱施加一水平向右的拉力F，g=10m/s²。求：
          </p>
          <p>（1）当拉力F1=30N时，木箱受到的摩擦力大小和方向；</p>
          <p>（2）当拉力F2=50N时，木箱受到的摩擦力大小和方向。</p>
          <div class="question-image">
            <img src="images/test/第四关/第四关应用4.png" alt="木箱受力示意图">
          </div>
          <div class="image-upload-container">
            <div class="upload-area" id="quiz-upload-area-4" onclick="document.getElementById('quiz-file-input-4').click()">
              <div class="upload-icon">📷</div>
              <div class="upload-text">点击或拖拽上传图片</div>
              <div class="upload-hint">支持 JPG、PNG 格式</div>
            </div>
            <input type="file" id="quiz-file-input-4" class="file-input" accept="image/*" onchange="handleQuizImageUpload4(this)" style="display: none;">
            <div class="uploaded-images" id="quiz-uploaded-images-4"></div>
          </div>
        </div>
        <div class="quiz-question">
          <p><strong>问题5：</strong>（2020秋•福州期中）如图所示，质量m=5kg的物体静止在水平地面上，物体与地面间的动摩擦因数μ=0.3，最大静摩擦力近似等于滑动摩擦力。现对物体施加一水平向右的拉力F，g=10m/s²。求：
          </p>
          <p>（1）当拉力F1=10N时，物体受到的摩擦力大小和方向；</p>
          <p>（2）当拉力F2=20N时，物体受到的摩擦力大小和方向。</p>
          <div class="image-upload-container">
            <div class="upload-area" id="quiz-upload-area-5" onclick="document.getElementById('quiz-file-input-5').click()">
              <div class="upload-icon">📷</div>
              <div class="upload-text">点击或拖拽上传图片</div>
              <div class="upload-hint">支持 JPG、PNG 格式</div>
            </div>
            <input type="file" id="quiz-file-input-5" class="file-input" accept="image/*" onchange="handleQuizImageUpload5(this)" style="display: none;">
            <div class="uploaded-images" id="quiz-uploaded-images-5"></div>
          </div>
        </div>
      </div>
    `;
  }
}

// 切换小测标签
function switchQuizTab(element, tabName) {
  // 移除所有标签的active类
  const navItems = document.querySelectorAll('.quiz-nav-item');
  navItems.forEach(item => item.classList.remove('active'));

  // 添加当前标签的active类
  element.classList.add('active');

  // 隐藏所有内容
  const tabContents = document.querySelectorAll('.quiz-tab-content');
  tabContents.forEach(content => {
    content.classList.remove('active');
    content.style.display = 'none';
  });

  // 显示当前标签内容
  const targetContent = document.getElementById('quiz-' + tabName + '-content');
  if (targetContent) {
    targetContent.classList.add('active');
    targetContent.style.display = 'block';
  }

  // 清除答题结果内容，确保返回原始页面
  // 移除重新加载内容的代码，避免切换标签时显示错误的内容

  // 控制提交按钮的显示/隐藏，只有在应用题标签页时显示
  const quizFooter = document.querySelector('#quizPage .quiz-footer');
  if (quizFooter) {
    if (tabName === 'application') {
      quizFooter.style.display = 'block';
    } else {
      quizFooter.style.display = 'none';
    }
  }
}

// 处理小测图片上传1
function handleQuizImageUpload1(input) {
  const files = input.files;
  const uploadedImages = document.getElementById('quiz-uploaded-images-1');

  if (!uploadedImages) return;

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    if (!file.type.startsWith('image/')) continue;

    const reader = new FileReader();

    reader.onload = function (e) {
      const imgContainer = document.createElement('div');
      imgContainer.style.position = 'relative';
      imgContainer.style.display = 'inline-block';

      const img = document.createElement('img');
      img.src = e.target.result;
      img.style.maxWidth = '120px';
      img.style.maxHeight = '120px';
      img.style.borderRadius = '6px';
      img.style.border = '3px solid #FFD700';
      img.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.3)';

      const deleteBtn = document.createElement('button');
      deleteBtn.innerHTML = '×';
      deleteBtn.style.position = 'absolute';
      deleteBtn.style.top = '-8px';
      deleteBtn.style.right = '-8px';
      deleteBtn.style.width = '24px';
      deleteBtn.style.height = '24px';
      deleteBtn.style.borderRadius = '50%';
      deleteBtn.style.background = '#FF4444';
      deleteBtn.style.color = 'white';
      deleteBtn.style.border = '2px solid white';
      deleteBtn.style.cursor = 'pointer';
      deleteBtn.style.fontSize = '16px';
      deleteBtn.style.lineHeight = '1';
      deleteBtn.onclick = function () {
        imgContainer.remove();
      };

      imgContainer.appendChild(img);
      imgContainer.appendChild(deleteBtn);
      uploadedImages.appendChild(imgContainer);
    };

    reader.readAsDataURL(file);
  }

  // 清空input，允许重复选择同一文件
  input.value = '';
}

// 处理小测图片上传2
function handleQuizImageUpload2(input) {
  const files = input.files;
  const uploadedImages = document.getElementById('quiz-uploaded-images-2');

  if (!uploadedImages) return;

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    if (!file.type.startsWith('image/')) continue;

    const reader = new FileReader();

    reader.onload = function (e) {
      const imgContainer = document.createElement('div');
      imgContainer.style.position = 'relative';
      imgContainer.style.display = 'inline-block';

      const img = document.createElement('img');
      img.src = e.target.result;
      img.style.maxWidth = '120px';
      img.style.maxHeight = '120px';
      img.style.borderRadius = '6px';
      img.style.border = '3px solid #FFD700';
      img.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.3)';

      const deleteBtn = document.createElement('button');
      deleteBtn.innerHTML = '×';
      deleteBtn.style.position = 'absolute';
      deleteBtn.style.top = '-8px';
      deleteBtn.style.right = '-8px';
      deleteBtn.style.width = '24px';
      deleteBtn.style.height = '24px';
      deleteBtn.style.borderRadius = '50%';
      deleteBtn.style.background = '#FF4444';
      deleteBtn.style.color = 'white';
      deleteBtn.style.border = '2px solid white';
      deleteBtn.style.cursor = 'pointer';
      deleteBtn.style.fontSize = '16px';
      deleteBtn.style.lineHeight = '1';
      deleteBtn.onclick = function () {
        imgContainer.remove();
      };

      imgContainer.appendChild(img);
      imgContainer.appendChild(deleteBtn);
      uploadedImages.appendChild(imgContainer);
    };

    reader.readAsDataURL(file);
  }

  // 清空input，允许重复选择同一文件
  input.value = '';
}

// 处理小测图片上传3
function handleQuizImageUpload3(input) {
  const files = input.files;
  const uploadedImages = document.getElementById('quiz-uploaded-images-3');

  if (!uploadedImages) return;

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    if (!file.type.startsWith('image/')) continue;

    const reader = new FileReader();

    reader.onload = function (e) {
      const imgContainer = document.createElement('div');
      imgContainer.style.position = 'relative';
      imgContainer.style.display = 'inline-block';

      const img = document.createElement('img');
      img.src = e.target.result;
      img.style.maxWidth = '120px';
      img.style.maxHeight = '120px';
      img.style.borderRadius = '6px';
      img.style.border = '3px solid #FFD700';
      img.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.3)';

      const deleteBtn = document.createElement('button');
      deleteBtn.innerHTML = '×';
      deleteBtn.style.position = 'absolute';
      deleteBtn.style.top = '-8px';
      deleteBtn.style.right = '-8px';
      deleteBtn.style.width = '24px';
      deleteBtn.style.height = '24px';
      deleteBtn.style.borderRadius = '50%';
      deleteBtn.style.background = '#FF4444';
      deleteBtn.style.color = 'white';
      deleteBtn.style.border = '2px solid white';
      deleteBtn.style.cursor = 'pointer';
      deleteBtn.style.fontSize = '16px';
      deleteBtn.style.lineHeight = '1';
      deleteBtn.onclick = function () {
        imgContainer.remove();
      };

      imgContainer.appendChild(img);
      imgContainer.appendChild(deleteBtn);
      uploadedImages.appendChild(imgContainer);
    };

    reader.readAsDataURL(file);
  }

  // 清空input，允许重复选择同一文件
  input.value = '';
}

// 处理小测图片上传4
function handleQuizImageUpload4(input) {
  const files = input.files;
  const uploadedImages = document.getElementById('quiz-uploaded-images-4');

  if (!uploadedImages) return;

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    if (!file.type.startsWith('image/')) continue;

    const reader = new FileReader();

    reader.onload = function (e) {
      const imgContainer = document.createElement('div');
      imgContainer.style.position = 'relative';
      imgContainer.style.display = 'inline-block';

      const img = document.createElement('img');
      img.src = e.target.result;
      img.style.maxWidth = '120px';
      img.style.maxHeight = '120px';
      img.style.borderRadius = '6px';
      img.style.border = '3px solid #FFD700';
      img.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.3)';

      const deleteBtn = document.createElement('button');
      deleteBtn.innerHTML = '×';
      deleteBtn.style.position = 'absolute';
      deleteBtn.style.top = '-8px';
      deleteBtn.style.right = '-8px';
      deleteBtn.style.width = '24px';
      deleteBtn.style.height = '24px';
      deleteBtn.style.borderRadius = '50%';
      deleteBtn.style.background = '#FF4444';
      deleteBtn.style.color = 'white';
      deleteBtn.style.border = '2px solid white';
      deleteBtn.style.cursor = 'pointer';
      deleteBtn.style.fontSize = '16px';
      deleteBtn.style.lineHeight = '1';
      deleteBtn.onclick = function () {
        imgContainer.remove();
      };

      imgContainer.appendChild(img);
      imgContainer.appendChild(deleteBtn);
      uploadedImages.appendChild(imgContainer);
    };

    reader.readAsDataURL(file);
  }

  // 清空input，允许重复选择同一文件
  input.value = '';
}

// 处理小测图片上传5
function handleQuizImageUpload5(input) {
  const files = input.files;
  const uploadedImages = document.getElementById('quiz-uploaded-images-5');

  if (!uploadedImages) return;

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    if (!file.type.startsWith('image/')) continue;

    const reader = new FileReader();

    reader.onload = function (e) {
      const imgContainer = document.createElement('div');
      imgContainer.style.position = 'relative';
      imgContainer.style.display = 'inline-block';

      const img = document.createElement('img');
      img.src = e.target.result;
      img.style.maxWidth = '120px';
      img.style.maxHeight = '120px';
      img.style.borderRadius = '6px';
      img.style.border = '3px solid #FFD700';
      img.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.3)';

      const deleteBtn = document.createElement('button');
      deleteBtn.innerHTML = '×';
      deleteBtn.style.position = 'absolute';
      deleteBtn.style.top = '-8px';
      deleteBtn.style.right = '-8px';
      deleteBtn.style.width = '24px';
      deleteBtn.style.height = '24px';
      deleteBtn.style.borderRadius = '50%';
      deleteBtn.style.background = '#FF4444';
      deleteBtn.style.color = 'white';
      deleteBtn.style.border = '2px solid white';
      deleteBtn.style.cursor = 'pointer';
      deleteBtn.style.fontSize = '16px';
      deleteBtn.style.lineHeight = '1';
      deleteBtn.onclick = function () {
        imgContainer.remove();
      };

      imgContainer.appendChild(img);
      imgContainer.appendChild(deleteBtn);
      uploadedImages.appendChild(imgContainer);
    };

    reader.readAsDataURL(file);
  }

  // 清空input，允许重复选择同一文件
  input.value = '';
}

// 存储当前答题结果
let currentQuizAnswers = null;
let currentQuizChoiceFillScore = 0;

// 小测答案解析数据
const practiceAnswer = [
  {
    question: "1. 选择题 - 弹力与弹簧伸长量",
    answer: "C",
    tags: ['胡克定律', '弹力', '力学图像'],
    explanation: "【详细解析】本题考察胡克定律和弹力与伸长量的关系。\n\n由F-x图象可知，当弹簧伸长量x=0.4m时，对应的弹力F=400N。\n\n根据胡克定律F=kx，可求得劲度系数k=F/x=400/0.4=1000N/m。\n\n【逐项分析】A错误：地球表面的物体，受到的重力方向都相同——实际上，重力方向指向地心，不同位置方向不同；\nB错误：形状规则的物体，重心都在物体几何中心处——只有质量均匀分布的物体才满足；\nC正确：同一个物体在地球表面不同位置，所受重力大小不一定相同——因为重力加速度g随纬度和高海拔变化；\nD错误：形状不规则的物体，都可以用悬挂法测重心——只有薄板状物体才能用悬挂法。\n\n【关键点】胡克定律F=kx，k是劲度系数，由弹簧本身性质决定，与外力无关。"
  },
  {
    question: "2. 选择题 - 弹簧劲度系数",
    answer: "C",
    tags: ['胡克定律', '力学计算'],
    explanation: "【详细解析】本题考察弹簧劲度系数的计算。\n\n由F-L图象可知，弹簧长度L与弹力F成正比，说明弹簧始终在弹性限度内。\n\n【逐项分析】A、B、D选项给出了不同的数值，需要根据图中数据计算。\n从图中读数：当F=100N时，L=30cm；当F=0时，L=20cm。\n所以弹力从0增加到100N时，弹簧长度增加了10cm，即伸长量Δx=10cm=0.1m。\n\n根据胡克定律：k=ΔF/Δx=100N/0.1m=1000N/m。\n\n【易错点】注意区分弹簧长度L和伸长量x，原长为20cm，当F=100N时长30cm，伸长量是10cm。\n\n【关键点】F-x（或F-L）图象的斜率就是弹簧的劲度系数k。"
  },
  {
    question: "3. 选择题 - 摩擦力说法",
    answer: "A",
    tags: ['摩擦力', '基本概念'],
    explanation: "【详细解析】本题考察摩擦力的基本概念和性质。\n\n【逐项分析】A正确：滑动摩擦力的大小确实可以用公式F=μF_N直接计算，其中μ是动摩擦因数（无单位），F_N是正压力。\n\nB错误：拉不动物体时，静摩擦力等于拉力，大小相等，不存在'小于'的说法；如果拉力小于最大静摩擦力，物体就拉不动。\n\nC错误：静摩擦力的方向总是与相对运动趋势的方向相反，而不是与运动方向相反。例如：人走路时，脚相对于地面向后滑动的趋势，静摩擦力向前推动人前进。\n\nD错误：滑动摩擦力总是阻碍相对运动，但可能帮助物体运动。例如：人走路时，脚相对于地面向后滑动，静摩擦力向前，推动人前进。\n\n【关键点】摩擦力的方向由相对运动或相对运动趋势决定，大小计算公式不同：滑动摩擦力f=μN，静摩擦力0＜f≤f_max。"
  },
  {
    question: "4. 选择题 - 机械臂摩擦力",
    answer: "B",
    tags: ['静摩擦力', '受力分析', '力的平衡'],
    explanation: "【详细解析】本题考察静摩擦力的分析。\n\n机械臂铁夹竖直夹起金属小球，铁夹与球接触面保持竖直。\n\n【逐项分析】当小球在空中处于静止状态时：\n- 小球受重力G（竖直向下）\n- 小球受铁夹对它的两个支持力（水平方向，互相平衡）\n- 小球受静摩擦力f（竖直方向）\n\nA错误：摩擦力方向竖直向上，不是向下；\nB正确：根据二力平衡，重力G与静摩擦力f大小相等、方向相反，故f=G；\nC错误：静摩擦力大小与压力无关，只与重力平衡；\nD错误：水平移动时，小球与铁夹相对静止（无相对滑动），受到的是静摩擦力，不是滑动摩擦力。\n\n【关键点】静止状态下，静摩擦力由二力平衡条件确定，大小等于需要平衡的另一个力。"
  },
  {
    question: "5. 选择题 - 传送带静摩擦力",
    answer: "A",
    tags: ['静摩擦力', '传送带', '相对运动趋势'],
    explanation: "【详细解析】本题考察传送带模型中静摩擦力方向的判断。\n\n物块放在与水平面夹角为θ的传送带上，始终与传送带相对静止。\n\n【逐项分析】当传送带加速向上运动时：\n- 物块有向下滑动的相对运动趋势（因为传送带加速向上，物块由于惯性保持原来运动状态）\n- 静摩擦力方向应沿传送带向上，才能提供物块向上的加速度分量\n- 满足a≥g·sinθ时，物块不向下滑动\n\nA正确：f的方向沿传送带向上；\nB错误：摩擦力方向应向上，不是向下；\nC错误：向下加速时，物块有向下滑动趋势，但传送带加速向下，物块相对传送带有向上滑动趋势，摩擦力方向沿传送带向下；\nD错误：摩擦力方向与运动趋势相反，不是相同。\n\n【关键点】判断静摩擦力方向，先判断相对运动趋势方向（可用'假设法'：假设接触面光滑，物块的运动方向即为趋势方向）。"
  },
  {
    question: "6. 选择题 - 传送带滑动摩擦力",
    answer: "A",
    tags: ['滑动摩擦力', '传送带', '公式应用'],
    explanation: "【详细解析】本题考察滑动摩擦力公式的应用。\n\n传送带静止时和向左运动时，物体以相同初速度向右滑动。\n\n【逐项分析】滑动摩擦力公式：f=μF_N\n- μ是动摩擦因数，由接触面材料决定，不变\n- F_N是正压力，等于物体重力mg（因为传送带水平），不变\n\n当传送带静止时：物体受滑动摩擦力F_1=μmg\n当传送带向左运动时：物体受滑动摩擦力F_2=μmg（方向也是向左）\n\n所以F_1=F_2，大小相等。\n\nA正确：B、C、D错误。\n\n【关键点】滑动摩擦力大小只与动摩擦因数和正压力有关，与接触面相对速度无关。传送带运动不影响正压力和动摩擦因数，所以摩擦力不变。"
  },
  {
    question: "7. 选择题 - 重心与重力",
    answer: "C",
    tags: ['重力', '重心', '质量分布'],
    explanation: "【详细解析】本题考察重力和重心的概念。\n\n均匀圆形薄板挖去一个小圆板后变成圆环。\n\n【逐项分析】A错误：重心确实向外侧偏移（向有质量的一侧），但说法不完整，重力减小是明确的；\nB错误：重力减小（因为质量减少），重心位置也发生变化（不在几何中心）；\nC正确：重力减小（质量减少），但圆环的重心位置可以通过几何对称性确定，仍在中心处（但该处无质量）；\nD错误：重心仍然存在，只是位置不在几何中心。\n\n【关键点】重力G=mg，与质量成正比；重心是重力的作用点，与质量分布有关。挖去部分后，质量减少，重心偏移。"
  },
  {
    question: "8. 选择题 - 弹簧平衡",
    answer: "A",
    tags: ['弹力', '力的平衡', '受力分析'],
    explanation: "【详细解析】本题考察弹簧的受力分析和平衡条件。\n\n轻质弹簧上端固定，下端与小球A连接，A通过细线与小球B连接。整体静止时弹簧长度为L。\n\n对小球A施加水平向右的恒力F，对小球B施加水平向左的同样大小的恒力F。\n\n【分析】对系统整体：\n- 水平方向：左侧力F向右，右侧力F向左\n- 两个力大小相等、方向相反，合力为零\n- 弹簧在竖直方向不受影响\n\n因此弹簧的长度不变，仍为L，且弹簧保持竖直方向。\n\nA正确：B、C、D错误。\n\n【关键点】当外力系统对称、互相抵消时，系统的状态不变。本题中两个水平力是一对平衡力，对弹簧的竖直状态无影响。"
  },
  {
    question: "9. 选择题 - 黑板擦摩擦力",
    answer: "D",
    tags: ['摩擦力', '力的分解', '受力分析'],
    explanation: "【详细解析】本题考察竖直方向摩擦力的计算。\n\n黑板擦在手施加的恒定推力F作用下匀速擦拭竖直黑板，不计黑板擦重力。\n\n【分析】黑板擦在竖直方向匀速运动，受力平衡：\n- 竖直方向：摩擦力f需要与某个力平衡\n- 推力F与竖直方向夹角为θ（推力方向）\n\n将推力F分解：\n- 垂直黑板方向的分力F_⊥=F·cosθ（产生正压力）\n- 沿黑板方向的分力F_∥=F·sinθ（需要摩擦力平衡）\n\n由于黑板擦匀速运动，摩擦力f=F_∥=F·sinθ。\n\nA、B、C不符合上述分析。\nD正确：f=Fsinθ。\n\n【关键点】将力分解到需要的方向，竖直方向摩擦力与沿黑板方向的分力平衡。"
  },
  {
    question: "10. 选择题 - 重力弹力说法",
    answer: "D",
    tags: ['重力', '弹力', '基本概念', '轻杆'],
    explanation: "【详细解析】本题考察重力和弹力的基本概念。\n\n【逐项分析】A正确：电灯受到向上的拉力，是由于电线发生微小形变（被拉伸）产生的弹力，这就是弹力的产生原因。\n\nB正确：绳子的拉力是弹力，方向总是沿绳收缩的方向（指向绳的内部），一定指向绳收缩的方向。\n\nC正确：质量均匀分布、几何形状规则的物体的重心必与其几何中心重合，这是重心的性质。\n\nD错误：轻杆的弹力方向不一定沿杆方向。轻杆的弹力方向取决于实际受力情况：\n- 如果杆是铰链连接，弹力垂直于杆\n- 如果杆是一端固定，弹力可以沿任何方向\n- 只有当杆是'拉杆'或'压杆'时，弹力才沿杆方向\n\n【关键点】轻杆的弹力方向是分析出来的，不是必然沿杆，这是易错点。"
  },
  {
    question: "11. 选择题 - 物理公式理解",
    answer: "A",
    tags: ['比值定义', '物理概念'],
    explanation: "【详细解析】本题考察对物理公式的理解。\n\n【逐项分析】A正确：动摩擦因数μ=F_f/F_N，是两个力的比值，没有单位（是比值常数）。\n\nB错误：加速度公式a=Δv/Δt，但加速度与时间无关，取决于速度变化率。加速度a大说明速度变化快，但'时间越短加速度越大'是错误的，因为a=Δv/Δt中Δv也是变量。\n\nC错误：平均速度公式v̄=s/t，但平均速度与位移和时间都有关。位移大时，若时间也长，平均速度不一定大。\n\nD错误：弹簧劲度系数k=F/x是弹簧本身的性质，与所受弹力无关。弹力增大时x也增大，但k=F/x的比值不变，k由弹簧材料、长度、粗细等因素决定。\n\n【关键点】理解物理公式中各量的因果关系，哪些是变量、哪些是常量（或性质）。"
  },
  {
    question: "12. 选择题 - 砖块摩擦力",
    answer: "D",
    tags: ['摩擦力', '整体法隔离法', '超重失重'],
    explanation: "【详细解析】本题考察多个物体叠放时的摩擦力分析。\n\n四块相同的砖叠放，每块砖质量为m，用砖夹竖直搬运。\n\n【逐项分析】当砖静止时：\n- 砖4最上面，不受上方压力，只有重力\n- 砖3受砖4压力，受力分析...\n- 各砖间摩擦力需要具体计算\n\n当四块砖一起竖直向上加速提起时（加速度a向上，处于超重状态）：\n设每块砖质量为m，则每块砖视重为m(g+a)。\n从下往上分析：\n- 砖1：受重力m(g+a)，不受摩擦力（最底层与砖夹接触）\n- 砖2：受砖1向上的摩擦力f_21，受重力m(g+a)，需平衡\n- 砖3：受砖2向上的摩擦力f_32，受砖4向下的压力，受重力m(g+a)\n- 砖4：受重力m(g+a)，不受上方压力\n\n计算可得：砖2对砖3的摩擦力需要提供砖3的加速度，由于超重且各砖之间力的传递，砖2对砖3的摩擦力为零。\n\nA、B、C错误，D正确。\n\n【关键点】分析多物体系统时，从上到下或从下到上逐个分析，注意加速度带来的超重或失重效应。"
  },
  {
    question: "13. 选择题 - 行李箱受力",
    answer: "D",
    tags: ['平衡力', '相互作用力', '受力分析'],
    explanation: "【详细解析】本题考察平衡力和作用力反作用力的区分。\n\n旅客水平推着行李箱加速前行。\n\n【逐项分析】A错误：行李箱加速前行，推力大于摩擦力，不是一对平衡力（一对平衡力要求合力为零）。\n\nB错误：行李箱对地面的压力作用在地面上，行李箱所受重力作用在行李箱上，两者方向相同（竖直向下），不是作用力和反作用力（作用力反作用力必须作用在不同物体上，方向相反）。\n\nC错误：行李箱对地面的压力作用在地面上，地面对行李箱的支持力作用在行李箱上，这两个力是一对作用力和反作用力，不是一对平衡力。\n\nD正确：行李箱所受的重力作用在行李箱上，地面对行李箱的支持力也作用在行李箱上，两者大小相等、方向相反、作用在同一物体上，是一对平衡力。\n\n【关键点】平衡力：同物体、等大、反向、共线；作用力反作用力：异物体、等大、反向、共线。"
  },
  {
    question: "14. 选择题 - 撑杆跳高",
    answer: "C",
    tags: ['牛顿第三定律', '惯性', '运动概念'],
    explanation: "【详细解析】本题考察力学中的常见概念。\n\n【逐项分析】A错误：重力的反作用力是物体对地球的引力（地球吸引物体，物体也吸引地球），不是地面对运动员的支持力。支持力的反作用力是物体对地面的压力。\n\nB错误：根据牛顿第三定律，作用力与反作用力大小相等、方向相反、作用在不同物体上。弯曲的撑杆对人的作用力与人对撑杆的作用力是一对作用力和反作用力，大小一定相等。\n\nC正确：撑杆起跳上升阶段，弯曲的撑杆对人的作用力与人对撑杆的作用力是一对作用力和反作用力，大小相等。\n\nD错误：运动员手离开撑杆后能继续越过横杆，是由于惯性（保持原有运动状态），而不是受到一个'向前的冲力'。惯性不是力，不能说'受到'。\n\n【关键点】区分各种力的性质：重力（万有引力）、弹力（接触力）、惯性（不是力）。"
  },
  {
    question: "15. 选择题 - 乒乓球击球",
    answer: "B",
    tags: ['牛顿第三定律', '作用力反作用力'],
    explanation: "【详细解析】本题考察牛顿第三定律——作用力与反作用力。\n\n樊振东击球的瞬间，球拍对乒乓球有力的作用。\n\n【逐项分析】A错误：根据牛顿第三定律，球拍对乒乓球的作用力与乒乓球对球拍的作用力大小相等，不是'大于'关系。\n\nB正确：球拍对乒乓球的作用力与乒乓球对球拍的作用力是一对作用力与反作用力，大小一定相等。\n\nC错误：球拍对乒乓球的作用力远大于乒乓球所受重力（击球力通常是几百甚至上千牛，重力只有约0.3牛），不可能是一对平衡力。\n\nD错误：作用力与反作用力作用在不同物体上（球拍vs乒乓球），不是平衡力。平衡力必须作用在同一物体上。\n\n【关键点】作用力与反作用力的关系：同大小、反方向、异物体、同时生灭。一定注意：平衡力与作用力反作用力的根本区别在于是否作用在同一物体上。"
  },
  {
    question: "1. 填空题 - 弹力与伸长量",
    answer: "400, 1000",
    tags: ['胡克定律', '弹力', '力学图像'],
    explanation: "由图象可知弹簧伸长量为0.4m时弹力为400N；由胡克定律F＝kx可得，图象的斜率表示劲度系数，故k＝400/0.4＝1000N/m。"
  },
  {
    question: "2. 填空题 - 弹簧原长和劲度系数",
    answer: "10, 400",
    tags: ['胡克定律', '力学计算'],
    explanation: "由图读出，弹簧的弹力F＝0时，弹簧的长度为L0＝10cm，即弹簧的原长为10cm。弹力为F1＝40N时，弹簧的长度为L1＝20cm，弹簧压缩的长度x1＝L1-L0＝10cm＝0.1m，由胡克定律F＝kx得：k＝40/0.1＝400N/m。"
  },
  {
    question: "3. 填空题 - 作用力和反作用力",
    answer: "4.0, 等值反向, 4.0",
    tags: ['牛顿第三定律', '相互作用力', '力的测量'],
    explanation: "（1）弹簧测力计的分度值为0.2N，读数为4.0N；（2）F和F′是一对相互作用力，大小相等、方向相反；（3）手对弹簧秤A的拉力大小与A受到B的拉力F′大小相等，所以也是4.0N。"
  },
  {
    question: "26. 应用题 - 沙发摩擦力",
    answer: "f1=80N, μ=0.4, f2=120N",
    tags: ['静摩擦力', '滑动摩擦力', '受力平衡', '力学计算'],
    explanation: "（1）当推力F1＝80N时，沙发静止，受静摩擦力，根据二力平衡得f1＝F1＝80N。\n（2）当推力F2＝120N时，沙发做匀速运动，受滑动摩擦力，由二力平衡得Ff＝F2＝120N，由Ff＝μmg得μ＝120/(30×10)＝0.4。\n（3）当推力为140N时，大于最大静摩擦力，沙发滑动，受滑动摩擦力，f2＝μmg＝0.4×30×10＝120N。"
  },
  {
    question: "27. 应用题 - 弹簧胡克定律",
    answer: "l0=10cm, k=1000N/m",
    tags: ['胡克定律', '力学计算'],
    explanation: "根据胡克定律：用F1压弹簧：F1＝k(l0－l1)，即10＝k(l0－0.09)；用F2拉弹簧：F2＝k(l2－l0)，即20＝k(0.12－l0)。联立求解：l0＝0.1m＝10cm，k＝1000N/m。"
  },
  {
    question: "28. 应用题 - 木板摩擦力",
    answer: "n≥6（第6块到第10块）",
    tags: ['摩擦力', '整体法隔离法', '受力分析'],
    explanation: "设水平力F作用在第n块木板上，对n及以上木板为研究对象，由力的平衡得：F－fn＝0，fn≤μnmg。整体匀速运动：F＝0.6μ⋅10mg，解得n≥6，故水平力F可以作用在第6块及以上的木板上。"
  },
  {
    question: "29. 应用题 - 木块叠放摩擦力",
    answer: "Ff1=0, Ff2=16N, μ=0.2",
    tags: ['传送带', '相对运动', '运动学计算'],
    explanation: "（1）A做匀速运动，根据平衡条件A受摩擦力为零，所以B上表面Ff1＝0；对B受力分析，根据平衡条件水平方向：Ff2＝F1＝16N。\n（2）以AB整体为研究对象，竖直方向：FN＝(mA+mB)g＝80N，又Ff2＝μFN，解得μ＝0.2。"
  },
  {
    question: "30. 应用题 - 木块弹力摩擦力综合",
    answer: "(1)f2=14N, f1=0; (2)F2=16N, A对B弹力=8N",
    tags: ['整体法', '隔离法', '受力平衡'],
    explanation: "（1）地面对B的最大静摩擦力Fmax＝μN＝0.2×2mg＝16N，F1＜Fmax，故B静止，地面对B的摩擦力f2＝F1＝14N；A水平方向没有外力，故A不受摩擦力，f1＝0。\n（2）AB整体匀速运动：F2＝fA+fB＝2μmg＝2×0.2×40＝16N；隔离B受力分析：A对B的弹力NAB＝fB＝μmg＝0.2×40＝8N。"
  }
];

// 提交小测答案
function submitQuiz() {
  // 收集选择题答案
  const choiceAnswers = {};
  for (let i = 1; i <= 15; i++) {
    const selected = document.querySelector(`input[name="quiz-q${i}"]:checked`);
    choiceAnswers[`q${i}`] = selected ? selected.value : null;
  }

  // 收集填空题答案
  const fillAnswers = {
    q1: [document.getElementById('fill-q1-1')?.value?.trim(), document.getElementById('fill-q1-2')?.value?.trim()],
    q2: [document.getElementById('fill-q2-1')?.value?.trim(), document.getElementById('fill-q2-2')?.value?.trim()],
    q3: [document.getElementById('fill-q3-1')?.value?.trim(), document.getElementById('fill-q3-2')?.value?.trim(), document.getElementById('fill-q3-3')?.value?.trim()]
  };

  // 收集应用题答题情况（是否上传了图片）
  const appAnswers = {
    app1: document.getElementById('quiz-uploaded-images-1')?.children.length > 0,
    app2: document.getElementById('quiz-uploaded-images-2')?.children.length > 0,
    app3: document.getElementById('quiz-uploaded-images-3')?.children.length > 0,
    app4: document.getElementById('quiz-uploaded-images-4')?.children.length > 0,
    app5: document.getElementById('quiz-uploaded-images-5')?.children.length > 0
  };

  // 正确答案
  const correctAnswers = {
    choice: {
      q1: 'c', // 同一个物体在地球表面不同位置，所受重力大小不一定相同
      q2: 'c', // 100N/m
      q3: 'c', // 静摩擦力的方向总是与物体运动趋势的方向相反
      q4: 'b', // 若小球在空中处于静止状态，小球受到的摩擦力与重力大小相等
      q5: 'a', // 当传送带加速向上运动时，f的方向一定沿传送带向上
      q6: 'a', // F1=F2
      q7: 'c', // 重力减小，重心位置没有变
      q8: 'a', // L'=L，弹簧仍竖直
      q9: 'b', // μF
      q10: 'd', // 轻杆的弹力方向总是沿杆方向，但可以沿杆向外
      q11: 'a', // 由公式μ=Ff/FN可知，动摩擦因数是两个力的比值，没有单位
      q12: 'd', // 当将四块砖一起竖直向上加速提起时，砖块2对砖块3的摩擦力为零
      q13: 'd', // 行李箱所受的重力和地面对行李箱的支持力是一对平衡力
      q14: 'c', // 撑杆起跳上升阶段，弯曲的撑杆对人的作用力大小等于人对撑杆的作用力大小
      q15: 'b'  // 球拍对乒乓球的作用力与乒乓球对球拍的作用力大小相等
    },
    fill: {
      q1: ['8', '20'], // 弹力F=8N，劲度系数k=20N/m
      q2: ['10', '100'], // 原长10cm，劲度系数100N/m
      q3: ['2.0', '大小相等方向相反', '2.0'] // B弹簧秤读数2.0N，F和F'关系，手对A的拉力2.0N
    }
  };

  // 显示答题结果
  const quizContent = document.querySelector('#quizPage .quiz-content');
  if (quizContent) {
    quizContent.innerHTML = '';
    showQuizResults(choiceAnswers, fillAnswers, appAnswers, correctAnswers);
  }
}

// 显示小测答题结果
function showQuizResults(choiceAnswers, fillAnswers, appAnswers, correctAnswers) {
  // 存储当前答案
  currentQuizAnswers = { choiceAnswers, fillAnswers, appAnswers };

  let correctChoiceCount = 0;
  let choiceScore = 0;
  let correctFillCount = 0;
  let fillScore = 0;
  const totalChoiceQuestions = 15; // 选择题总数
  const totalFillBlanks = 7; // 填空题总空数
  const CHOICE_SCORE = 4; // 选择题每题4分
  const APP_QUESTION_SCORE = 6; // 应用题每题6分

  let resultHTML = '<div class="test-result"><h3>答题结果</h3>';

  // 选择题结果
  for (let i = 1; i <= totalChoiceQuestions; i++) {
    const userAnswer = choiceAnswers[`q${i}`] || '';
    const isCorrect = userAnswer === correctAnswers.choice[`q${i}`];
    if (isCorrect) {
      correctChoiceCount++;
      choiceScore += CHOICE_SCORE;
    }
    resultHTML += `
      <div class="test-result-item ${isCorrect ? 'correct' : 'incorrect'}">
        <p><strong>选择题${i}：</strong>${isCorrect ? '✅ 正确' : '❌ 错误'}</p>
        <p><strong>你的答案：</strong>${userAnswer || '未作答'}</p>
        <p><strong>正确答案：</strong>${correctAnswers.choice[`q${i}`].toUpperCase()}</p>
      </div>
    `;
  }

  // 填空题结果
  // 填空题1
  const fill1Answers = fillAnswers.q1;
  const correctFill1 = correctAnswers.fill.q1;
  for (let i = 0; i < fill1Answers.length; i++) {
    const userAnswer = fill1Answers[i] || '';
    const isCorrect = userAnswer === correctFill1[i];
    if (isCorrect) {
      correctFillCount++;
      fillScore += 3;
    }
    resultHTML += `
      <div class="test-result-item ${isCorrect ? 'correct' : 'incorrect'}">
        <p><strong>填空题1-${i + 1}：</strong>${isCorrect ? '✅ 正确' : '❌ 错误'}</p>
        <p><strong>你的答案：</strong>${userAnswer || '未作答'}</p>
        <p><strong>正确答案：</strong>${correctFill1[i]}</p>
      </div>
    `;
  }

  // 填空题2
  const fill2Answers = fillAnswers.q2;
  const correctFill2 = correctAnswers.fill.q2;
  for (let i = 0; i < fill2Answers.length; i++) {
    const userAnswer = fill2Answers[i] || '';
    const isCorrect = userAnswer === correctFill2[i];
    if (isCorrect) {
      correctFillCount++;
      fillScore += 3;
    }
    resultHTML += `
      <div class="test-result-item ${isCorrect ? 'correct' : 'incorrect'}">
        <p><strong>填空题2-${i + 1}：</strong>${isCorrect ? '✅ 正确' : '❌ 错误'}</p>
        <p><strong>你的答案：</strong>${userAnswer || '未作答'}</p>
        <p><strong>正确答案：</strong>${correctFill2[i]}</p>
      </div>
    `;
  }

  // 填空题3
  const fill3Answers = fillAnswers.q3;
  const correctFill3 = correctAnswers.fill.q3;
  for (let i = 0; i < fill3Answers.length; i++) {
    const userAnswer = fill3Answers[i] || '';
    let isCorrect = false;
    if (i === 1) {
      isCorrect = userAnswer && userAnswer.includes('相等');
    } else {
      isCorrect = userAnswer === correctFill3[i];
    }
    if (isCorrect) {
      correctFillCount++;
      fillScore += 2;
    }
    resultHTML += `
      <div class="test-result-item ${isCorrect ? 'correct' : 'incorrect'}">
        <p><strong>填空题3-${i + 1}：</strong>${isCorrect ? '✅ 正确' : '❌ 错误'}</p>
        <p><strong>你的答案：</strong>${userAnswer || '未作答'}</p>
        <p><strong>正确答案：</strong>${correctFill3[i]}</p>
      </div>
    `;
  }

  // 应用题结果
  for (let i = 1; i <= 5; i++) {
    const isSubmitted = appAnswers[`app${i}`] || false;
    resultHTML += `
      <div class="test-result-item pending">
        <p><strong>应用题${i}：</strong> 📋 应用题</p>
        <p>你的答案：${isSubmitted ? '已上传解题过程' : '未上传图片'}</p>
        <p>状态：${isSubmitted ? '待批改' : '未提交'}</p>
      </div>
    `;
  }

  // 计算总分（不含应用题）
  let totalScore = choiceScore + fillScore;
  currentQuizChoiceFillScore = totalScore;

  resultHTML += `
    <div class="test-score">
      <h4>总分：${totalScore}分（选择题+填空题）</h4>
      <p>选择题：${correctChoiceCount}/${totalChoiceQuestions} 正确，得分 ${choiceScore}/60</p>
      <p>填空题：${correctFillCount}/${totalFillBlanks} 空正确，得分 ${fillScore}/18</p>
      <p style="font-size: 14px; color: #FFA500;">应用题正在AI智能批改中...</p>
    </div>

    <div class="test-result-buttons">
      <button class="test-result-button" onclick="showAnswerExplanation()">答案解析</button>
      <button class="test-result-button" onclick="redoQuiz()">返回重做</button>
    </div>
  `;

  resultHTML += '</div>';

  // 显示结果
  const quizContent = document.querySelector('#quizPage .quiz-content');
  if (quizContent) {
    quizContent.innerHTML = resultHTML;
  }

  // 隐藏提交答案按钮
  const quizFooter = document.querySelector('#quizPage .quiz-footer');
  if (quizFooter) {
    quizFooter.style.display = 'none';
  }
}

// 显示小测答案解析
function showAnswerExplanation() {
  // 检查是否已存在答案解析窗口
  const existingWindow = document.getElementById('answer-explanation-window');
  if (existingWindow) {
    existingWindow.remove();
    return;
  }

  // 创建遮罩层
  const overlay = document.createElement('div');
  overlay.className = 'answer-explanation-overlay';
  overlay.id = 'answer-explanation-overlay';
  document.body.appendChild(overlay);

  // 显示遮罩层
  setTimeout(() => {
    overlay.classList.add('show');
  }, 10);

  // 创建答案解析窗口
  const answerWindow = document.createElement('div');
  answerWindow.className = 'answer-explanation-window';
  answerWindow.id = 'answer-explanation-window';
  answerWindow.onclick = (e) => {
    e.stopPropagation();
  };

  // 生成答案解析内容
  let answerContent = '';
  if (practiceAnswer.length > 0) {
    answerContent = practiceAnswer.map(item => `
      <div class="answer-explanation-section">
        ${item.image ? `<div class="question-image"><img src="${item.image}" alt="题目图片"></div>` : ''}
        <h3>${item.question}</h3>
        <p><strong>正确答案：${item.answer}</strong></p>
        <p>解析：${item.explanation ? item.explanation.replace(/\n/g, '<br>') : ''}</p>
      </div>
    `).join('');
  } else {
    answerContent = '<div class="answer-explanation-section"><p>暂无答案解析</p></div>';
  }

  // 填充窗口内容
  answerWindow.innerHTML = `
    <div class="answer-explanation-header">
      <div class="answer-explanation-title">答案解析</div>
      <button class="answer-explanation-close" onclick="closeAnswerExplanation()">×</button>
    </div>
    <div class="answer-explanation-content">
      ${answerContent}
    </div>
  `;

  // 添加到页面
  document.body.appendChild(answerWindow);

  // 显示窗口
  setTimeout(() => {
    answerWindow.classList.add('show');
  }, 10);
}

// 关闭答案解析窗口
function closeAnswerExplanation() {
  const answerWindow = document.getElementById('answer-explanation-window');
  const overlay = document.getElementById('answer-explanation-overlay');

  if (!answerWindow) return;

  // 隐藏窗口
  answerWindow.classList.remove('show');

  if (overlay) {
    overlay.classList.remove('show');
  }

  // 移除窗口
  setTimeout(() => {
    if (answerWindow && answerWindow.parentNode) {
      answerWindow.remove();
    }
    if (overlay && overlay.parentNode) {
      overlay.remove();
    }
  }, 400);
}

// 从答案解析返回答题结果
function backToQuizResults() {
  if (currentQuizAnswers) {
    const correctAnswers = {
      choice: {
        q1: 'c', q2: 'c', q3: 'c', q4: 'b', q5: 'a',
        q6: 'a', q7: 'c', q8: 'a', q9: 'b', q10: 'd',
        q11: 'a', q12: 'd', q13: 'd', q14: 'c', q15: 'b'
      },
      fill: {
        q1: ['8', '20'],
        q2: ['10', '100'],
        q3: ['2.0', '大小相等方向相反', '2.0']
      }
    };
    showQuizResults(currentQuizAnswers.choiceAnswers, currentQuizAnswers.fillAnswers, currentQuizAnswers.appAnswers, correctAnswers);
  }
}

// 重做小测
function redoQuiz() {
  // 重置存储的答案
  currentQuizAnswers = null;
  currentQuizChoiceFillScore = 0;

  // 重新加载小测内容并切换到选择页面
  loadQuizContent();

  // 切换到选择标签
  const choiceTab = document.querySelector('.quiz-nav-item:nth-child(1)');
  if (choiceTab) {
    switchQuizTab(choiceTab, 'choice');
  }

  // 显示小测页面
  document.getElementById('quizPage').style.display = 'block';
  document.body.style.overflow = 'hidden';
}

// 拖拽上传功能支持
document.addEventListener('DOMContentLoaded', function () {
  const uploadAreas = document.querySelectorAll('.upload-area');

  uploadAreas.forEach(area => {
    area.addEventListener('dragover', function (e) {
      e.preventDefault();
      e.stopPropagation();
      this.style.background = 'rgba(255, 215, 0, 0.2)';
      this.style.borderColor = '#FFA500';
    });

    area.addEventListener('dragleave', function (e) {
      e.preventDefault();
      e.stopPropagation();
      this.style.background = 'rgba(0, 0, 0, 0.2)';
      this.style.borderColor = '#FFD700';
    });

    area.addEventListener('drop', function (e) {
      e.preventDefault();
      e.stopPropagation();
      this.style.background = 'rgba(0, 0, 0, 0.2)';
      this.style.borderColor = '#FFD700';

      const files = e.dataTransfer.files;
      const inputId = this.getAttribute('onclick').match(/quiz-file-input-\d+/)[0];
      const input = document.getElementById(inputId);

      if (input && files.length > 0) {
        const dataTransfer = new DataTransfer();
        for (let i = 0; i < files.length; i++) {
          dataTransfer.items.add(files[i]);
        }
        input.files = dataTransfer.files;

        // 触发onchange事件
        const event = new Event('change', { bubbles: true });
        input.dispatchEvent(event);
      }
    });
  });
});