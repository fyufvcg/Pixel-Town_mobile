// 章节测试页面功能

// 打开章节测试前导说明页面
function openChapterTestPage() {
  // 创建前导说明页面
  const introPage = document.createElement('div');
  introPage.className = 'quiz-intro';
  introPage.id = 'chapterTestIntroPage';

  introPage.innerHTML = `
    <div class="quiz-intro-header">
      <h2 class="quiz-intro-title">章节测试</h2>
      <button class="quiz-intro-close" onclick="closeChapterTestIntroPage()">×</button>
    </div>
    <div class="quiz-intro-content">
      <h3>全章节终极测试</h3>
      <p>经过力的合成、共点力平衡的系统学习，你已掌握力的运算方法与物体平衡的核心条件。</p>
      <p>本关为全章节终极测试，融合重力、弹力、摩擦力、牛顿第三定律、力的合成与共点力平衡全部内容，综合考察规律理解、模型分析与解题能力，检验你是否完整掌握力学核心体系。</p>
    </div>
    <div class="quiz-intro-footer">
      <button class="start-test-btn" onclick="startChapterTest()">开始测试</button>
    </div>
  `;

  document.body.appendChild(introPage);
  document.body.style.overflow = 'hidden';
}

// 开始章节测试
function startChapterTest() {
  // 移除前导说明页面
  const introPage = document.getElementById('chapterTestIntroPage');
  if (introPage) {
    introPage.remove();
  }

  // 显示章节测试页面
  document.getElementById('mainPage').style.display = 'none';
  document.getElementById('chapterTestPage').style.display = 'block';
}

// 关闭章节测试前导说明页面
function closeChapterTestIntroPage() {
  // 移除前导说明页面
  const introPage = document.getElementById('chapterTestIntroPage');
  if (introPage) {
    introPage.remove();
  }
  // 显示主页面
  document.getElementById('mainPage').style.display = 'block';
  document.body.style.overflow = '';
}

// 关闭章节测试页面
function closeChapterTestPage() {
  // 关闭章节测试页面
  document.getElementById('chapterTestPage').style.display = 'none';
  // 移除可能存在的前导说明页面
  const introPage = document.getElementById('chapterTestIntroPage');
  if (introPage) {
    introPage.remove();
  }
  // 显示章节测试前导说明页面
  openChapterTestPage();
  document.body.style.overflow = 'hidden';
}

// 重新加载章节测试内容
function loadChapterTestContent() {
  const chapterTestContent = document.querySelector('#chapterTestPage .quiz-content');
  if (chapterTestContent) {
    chapterTestContent.innerHTML = `
      <!-- 选择题内容 -->
      <div id="chapter-test-choice-content" class="quiz-tab-content active">
        <h3>选择题</h3>
        <p>请完成以下选择题。</p>
        <div class="quiz-question">
          <p><strong>问题1：</strong>（2020秋•枣庄期末）足球运动是目前最具影响力的运动项目之一，深受青少年喜爱。如图所示为几种与足球有关的情境，则下列说法正确的是（　　）
          </p>
          <div class="question-image">
            <img src="images/test/第七关/第七关选择1.png" alt="情境图">
          </div>
          <div class="quiz-options">
            <label><input type="radio" name="chapter-q1" value="a"> A．图甲中，静止在水平草地上的足球受到的弹力就是它的重力</label>
            <label><input type="radio" name="chapter-q1" value="b"> B．图甲中，静止在水平草地上的足球受到的弹力是由于足球形变而产生的</label>
            <label><input type="radio" name="chapter-q1" value="c"> C．图乙中，静止在光滑水平地面上的两个足球由于接触而受到相互作用的弹力</label>
            <label><input type="radio" name="chapter-q1" value="d"> D．图丙中，踩在脚下且静止在水平草地上的足球可能受到3个力的作用</label>
          </div>
        </div>
        <div class="quiz-question">
          <p><strong>问题2：</strong>（2020秋•武进区校级月考）下列说法正确的是（　　）</p>
          <div class="quiz-options">
            <label><input type="radio" name="chapter-q2" value="a"> A．力的作用是相互的，一个物体是施力物体的同时也是受力物体</label>
            <label><input type="radio" name="chapter-q2" value="b"> B．物体放在桌面上，桌面受到的压力是由桌面的形变产生的</label>
            <label><input type="radio" name="chapter-q2" value="c"> C．不接触的两个物体之间不可能有力的作用</label>
            <label><input type="radio" name="chapter-q2" value="d"> D．形状规则的物体重心在物体的几何中心</label>
          </div>
        </div>
        <div class="quiz-question">
          <p><strong>问题3：</strong>（2020秋•沙坪坝区校级期中）下列说法正确的是（　　）</p>
          <div class="quiz-options">
            <label><input type="radio" name="chapter-q3" value="a"> A．密度均匀的球体的重心在球心</label>
            <label><input type="radio" name="chapter-q3" value="b"> B．两个相互接触的物体间，一定有弹力的存在</label>
            <label><input type="radio" name="chapter-q3" value="c"> C．地球表面的自由落体加速度随纬度的增大而减小</label>
            <label><input type="radio" name="chapter-q3" value="d"> D．在弹性限度内，弹簧弹力的大小与弹簧的长度成正比</label>
          </div>
        </div>
        <div class="quiz-question">
          <p><strong>问题4：</strong>（2020秋•仓山区校级期中）下列关于力的说法，正确的是（　　）</p>
          <div class="quiz-options">
            <label><input type="radio" name="chapter-q4" value="a"> A．力一定是物体对物体的相互作用</label>
            <label><input type="radio" name="chapter-q4" value="b"> B．力可以脱离物体而独立存在</label>
            <label><input type="radio" name="chapter-q4" value="c"> C．有受力物体不一定有施力物体</label>
            <label><input type="radio" name="chapter-q4" value="d"> D．只有相互接触的物体间才能产生作用力</label>
          </div>
        </div>
        <div class="quiz-question">
          <p><strong>问题5：</strong>（2021春•宣化区校级月考）如图所示，一个"Y"形弹弓顶部跨度为L，两根相同的橡皮条自由长度均为L，在两橡皮条的末端用一块软羊皮做成裹片。若橡皮条的弹力与形变量的关系满足胡克定律，且劲度系数为k，发射弹丸时每根橡皮条的最大长度为1.5L，则发射过程中裹片对弹丸的最大作用力为（　　）
          </p>
          <div class="question-image">
            <img src="images/test/第七关/第七关选择5.png" alt="Y形弹弓">
          </div>
          <div class="quiz-options">
            <label><input type="radio" name="chapter-q5" value="a"> A．0.5kL</label>
            <label><input type="radio" name="chapter-q5" value="b"> B．kL</label>
            <label><input type="radio" name="chapter-q5" value="c"> C．1.5kL</label>
            <label><input type="radio" name="chapter-q5" value="d"> D．2kL</label>
          </div>
        </div>
        <div class="quiz-question">
          <p><strong>问题6：</strong>（2020秋•温州期末）如图所示为某一轻质弹簧的弹力F大小与长度l的关系图象，由图可得该弹簧（　　）</p>
          <div class="question-image">
            <img src="images/test/第七关/第七关选择6.png" alt="弹簧弹力与长度关系图">
          </div>
          <div class="quiz-options">
            <label><input type="radio" name="chapter-q6" value="a"> A．原长为5cm</label>
            <label><input type="radio" name="chapter-q6" value="b"> B．劲度系数为2N/m</label>
            <label><input type="radio" name="chapter-q6" value="c"> C．伸长量为15cm时，弹力大小为10N</label>
            <label><input type="radio" name="chapter-q6" value="d"> D．长度为12cm时，弹力大小为4N</label>
          </div>
        </div>
        <div class="quiz-question">
          <p><strong>问题7：</strong>（2020秋•泉州期末）重50N的物体在水平面上向右运动，同时受到一个水平向左的F＝8N的恒力作用，物体和水平面间的动摩擦因数为0.2，取水平向右为正方向，则该物体所受的摩擦力f随时间t变化的关系图象为（　　）
          </p>
          <div class="question-image">
            <img src="images/test/第七关/第七关选择7.png" alt="摩擦力变化图">
          </div>
          <div class="quiz-options">
            <label><input type="radio" name="chapter-q7" value="a"> A</label>
            <label><input type="radio" name="chapter-q7" value="b"> B</label>
            <label><input type="radio" name="chapter-q7" value="c"> C</label>
            <label><input type="radio" name="chapter-q7" value="d"> D</label>
          </div>
        </div>
        <div class="quiz-question">
          <p><strong>问题8：</strong>（2020秋•南通期末）重分别为50N和60N的木块A、B间连接有轻弹簧，两木块静止于水平面上，A、B与水平面间的动摩擦因数均为0.25，弹簧被拉长了2cm，弹簧的劲度系数为400N/m。现用F＝5N的水平拉力作用在木块B上，则力F作用后木块A、B所受的摩擦力fA、fB的大小分别是（　　）
          </p>
          <div class="question-image">
            <img src="images/test/第七关/第七关选择8.png" alt="木块A、B与弹簧">
          </div>
          <div class="quiz-options">
            <label><input type="radio" name="chapter-q8" value="a"> A．fA＝8N fB＝3N</label>
            <label><input type="radio" name="chapter-q8" value="b"> B．fA＝8N fB＝8N</label>
            <label><input type="radio" name="chapter-q8" value="c"> C．fA＝8N fB＝13N</label>
            <label><input type="radio" name="chapter-q8" value="d"> D．fA＝0 fB＝0</label>
          </div>
        </div>
        <div class="quiz-question">
          <p><strong>问题9：</strong>（2020秋•鄂州期末）下列关于力的说法正确的是（　　）</p>
          <div class="quiz-options">
            <label><input type="radio" name="chapter-q9" value="a"> A．一个物体放在水平桌面上，物体受到了向上的弹力，是因为桌面发生了形变</label>
            <label><input type="radio" name="chapter-q9" value="b"> B．摩擦力总是阻碍物体的运动</label>
            <label><input type="radio" name="chapter-q9" value="c"> C．一个作用力与它的反作用力的合力等于零</label>
            <label><input type="radio" name="chapter-q9" value="d"> D．两个相互作用物体之间的作用力与反作用力大小是否相等，取决于物体的运动状态</label>
          </div>
        </div>
        <div class="quiz-question">
          <p><strong>问题10：</strong>（2020秋•丰台区期末）如图所示为研究木板与木块之间摩擦力大小的实验装置，将一木块和木板叠放于水平桌面上，轻质弹簧测力计一端固定，另一端用细线与木块水平相连。现在用绳子与长木板连接，用手向右水平拉绳子，使长木板在桌面上滑动，下列说法正确的是（　　）
          </p>
          <div class="question-image">
            <img src="images/test/第七关/第七关选择10.png" alt="摩擦力实验装置">
          </div>
          <div class="quiz-options">
            <label><input type="radio" name="chapter-q10" value="a"> A．木块与木板之间的摩擦力是静摩擦力</label>
            <label><input type="radio" name="chapter-q10" value="b"> B．木板必须在桌面上做匀速直线运动</label>
            <label><input type="radio" name="chapter-q10" value="c"> C．木板必须在桌面上做匀加速直线运动</label>
            <label><input type="radio" name="chapter-q10" value="d"> D．木板运动过程中，弹簧测力计示数等于木块受到的摩擦力</label>
          </div>
        </div>
        <div class="quiz-question">
          <p><strong>问题11：</strong>（2020秋•郴州期末）如图所示，一只可视为质点的蚂蚁在半球形碗内缓慢从b点爬到a点。下列说法正确的是（　　）</p>
          <div class="question-image">
            <img src="images/test/第七关/第七关选择11.png" alt="蚂蚁半球形碗">
          </div>
          <div class="quiz-options">
            <label><input type="radio" name="chapter-q11" value="a"> A．蚂蚁受到的摩擦力逐渐变大</label>
            <label><input type="radio" name="chapter-q11" value="b"> B．蚂蚁受到的弹力逐渐变大</label>
            <label><input type="radio" name="chapter-q11" value="c"> C．地面对碗的支持力逐渐变大</label>
            <label><input type="radio" name="chapter-q11" value="d"> D．地面对碗的摩擦力逐渐变大</label>
          </div>
        </div>
        <div class="quiz-question">
          <p><strong>问题12：</strong>（2021•江苏模拟）如图所示，木块B静止在水平地面上，木块A叠放在B上。A的左侧靠在光滑的竖直墙面上。关于A、B的受力情况，下列说法中正确的是（　　）
          </p>
          <div class="question-image">
            <img src="images/test/第七关/第七关选择12.png" alt="木块A和B">
          </div>
          <div class="quiz-options">
            <label><input type="radio" name="chapter-q12" value="a"> A．B对A的作用力方向一定竖直向上</label>
            <label><input type="radio" name="chapter-q12" value="b"> B．B对A的作用力一定大于A的重力</label>
            <label><input type="radio" name="chapter-q12" value="c"> C．地面对B的摩擦力方向可能向右</label>
            <label><input type="radio" name="chapter-q12" value="d"> D．地面对B的支持力大小等于A、B的总重力</label>
          </div>
        </div>
        <div class="quiz-question">
          <p><strong>问题13：</strong>（2020秋•沈阳期末）大型商场和超市的自动扶梯分为两种，一种有台阶，另一种无台阶。在没有顾客乘行时，这两种自动扶梯都以较小的速度匀速运行；当有顾客乘行时，自动扶梯经过先加速再匀速两个阶段运行。设两种扶梯加速时加速度相同，则电梯在运送顾客上楼的整个过程中，下列说法正确的是（　　）
          </p>
          <div class="question-image">
            <img src="images/test/第七关/第七关选择13.png" alt="自动扶梯">
          </div>
          <div class="quiz-options">
            <label><input type="radio" name="chapter-q13" value="a"> A．加速运行时，无台阶自动扶梯对乘客的支持力较大</label>
            <label><input type="radio" name="chapter-q13" value="b"> B．加速运行时，无台阶与有台阶扶梯对乘客的支持力相同</label>
            <label><input type="radio" name="chapter-q13" value="c"> C．匀速运行时，无台阶自动扶梯中，乘客不受摩擦力</label>
            <label><input type="radio" name="chapter-q13" value="d"> D．匀速运行时，有台阶自动扶梯中，乘客不受摩擦力</label>
          </div>
        </div>
        <div class="quiz-question">
          <p><strong>问题14：</strong>（2020秋•东城区期末）撑杆跳高是一项技术性很强的体育运动，完整的过程可以简化成三个阶段：持杆助跑、撑杆起跳上升、越杆下落。撑杆跳高的过程中包含很多物理知识，下列说法正确的是（　　）
          </p>
          <div class="question-image">
            <img src="images/test/第七关/第七关选择14.png" alt="撑杆跳高">
          </div>
          <div class="quiz-options">
            <label><input type="radio" name="chapter-q14" value="a"> A．持杆助跑过程，重力的反作用力是地面对运动员的支持力</label>
            <label><input type="radio" name="chapter-q14" value="b"> B．撑杆起跳上升阶段，弯曲的撑杆对人的作用力大于人对撑杆的作用力</label>
            <label><input type="radio" name="chapter-q14" value="c"> C．撑杆起跳上升阶段，弯曲的撑杆对人的作用力大小等于人对撑杆的作用力大小</label>
            <label><input type="radio" name="chapter-q14" value="d"> D．最高点手已离开撑杆，运动员还能继续越过横杆，是因为受到了一个向前的冲力</label>
          </div>
        </div>
        <div class="quiz-question">
          <p><strong>问题15：</strong>（2020•南京学业考试）2020年12月1日，乒乓球男子世界杯决赛中，中国选手樊振东以4：2击败张本智和，成功卫冕世界杯冠军。在樊振东击球的瞬间，下列说法正确的是（　　）</p>
          <div class="quiz-options">
            <label><input type="radio" name="chapter-q15" value="a"> A．球拍对乒乓球的作用力大于乒乓球对球拍的作用力</label>
            <label><input type="radio" name="chapter-q15" value="b"> B．球拍对乒乓球的作用力与乒乓球对球拍的作用力大小相等</label>
            <label><input type="radio" name="chapter-q15" value="c"> C．球拍对乒乓球的作用力与乒乓球所受到的重力是一对平衡力</label>
            <label><input type="radio" name="chapter-q15" value="d"> D．球拍对乒乓球的作用力与乒乓球对球拍的作用力是一对平衡力</label>
          </div>
        </div>
      </div>
      <!-- 填空题内容 -->
      <div id="chapter-test-fill-content" class="quiz-tab-content" style="display: none;">
        <h3>填空题</h3>
        <p>请完成以下填空题。</p>
        <div class="quiz-question">
          <p><strong>问题1：</strong>（2019秋•和平区月考）某同学用电子秤、水壶、细线、墙钉和贴在墙上的白纸等物品，在家中验证力的平行四边形定则。</p>
          <div class="question-image">
            <img src="images/test/第七关/第七关填空1.png" alt="实验装置">
          </div>
          <p>（1）对于上述实验过程，下列操作必要的是　　　（请填写选项，如AB）；</p>
          <p>（2）以下是4位同学做完实验后在白纸上留下的标注信息，根据这些信息判断，误差较大的是　　　；对提高实验精度最有利的是　　　。</p>
          <input type="text" class="quiz-input" placeholder="第1空答案" id="chapter-fill-q1-1">
          <input type="text" class="quiz-input" placeholder="第2空答案" id="chapter-fill-q1-2">
          <input type="text" class="quiz-input" placeholder="第3空答案" id="chapter-fill-q1-3">
        </div>
        <div class="quiz-question">
          <p><strong>问题2：</strong>（2019秋•杭州期中）在"探究求合力的方法"的实验中，图甲中A为固定橡皮筋的图钉，O为橡皮筋与细绳的结点，OB和OC为细绳。图乙是在白纸上根据实验结果画出的图。
          </p>
          <div class="question-image">
            <img src="images/test/第七关/第七关填空2.png" alt="实验图">
          </div>
          <p>（1）图乙中的F与F′两力中，方向一定沿AO方向的是　　　；本实验采用的科学方法是　　　；</p>
          <p>（2）该实验中某弹簧秤显示的读数如图丙所示，其大小是　　　N；</p>
          <p>（3）实验中，在用两个弹簧秤成一定角度拉橡皮筋时，必须记录的有　　　。</p>
          <input type="text" class="quiz-input" placeholder="第1空答案" id="chapter-fill-q2-1">
          <input type="text" class="quiz-input" placeholder="第2空答案" id="chapter-fill-q2-2">
          <input type="text" class="quiz-input" placeholder="第3空答案" id="chapter-fill-q2-3">
          <input type="text" class="quiz-input" placeholder="第4空答案" id="chapter-fill-q2-4">
        </div>
        <div class="quiz-question">
          <p><strong>问题3：</strong>（2019春•渝中区校级期末）某同学做"验证力的平行四边形定则"实验的情况如图甲所示，其中A为固定橡皮筋的图钉，O为橡皮筋与细绳的结点，OB和OC为细绳，图乙是在白纸上根据实验结果画出的图。
          </p>
          <div class="question-image">
            <img src="images/test/第七关/第七关填空3.png" alt="实验图">
          </div>
          <p>（1）关于此实验的下列说法中正确的是　　　；</p>
          <p>（2）图乙中的F与F′两力中，方向一定沿AO方向的是　　　。</p>
          <input type="text" class="quiz-input" placeholder="第1空答案" id="chapter-fill-q3-1">
          <input type="text" class="quiz-input" placeholder="第2空答案" id="chapter-fill-q3-2">
        </div>
      </div>
      <!-- 应用题内容 -->
      <div id="chapter-test-application-content" class="quiz-tab-content" style="display: none;">
        <h3>应用题</h3>
        <p>请完成以下应用题，上传解题过程图片。</p>
        <div class="quiz-question">
          <p><strong>问题1：</strong>（2020秋•沙坪坝区校级月考）一个原长为L的理想轻弹簧，上端固定，下端悬挂一个质量为m的小球（视为质点），稳定时弹簧的总长变为1.5L。现将两个这样的弹簧和两个这样的小球分别如图甲和乙的方式悬挂并保持稳定（弹簧都在弹性限度内，重力加速度为g）。求：
          </p>
          <p>（1）弹簧的劲度系数；</p>
          <p>（2）通过计算说明图甲和乙中，两个弹簧总长度的关系。</p>
          <div class="question-image">
            <img src="images/test/第七关/第七关应用1.png" alt="应用1图">
          </div>
          <div class="image-upload-container">
            <div class="upload-area" id="chapter-upload-area-1" onclick="document.getElementById('chapter-file-input-1').click()">
              <div class="upload-icon">📷</div>
              <div class="upload-text">点击或拖拽上传图片</div>
              <div class="upload-hint">支持 JPG、PNG 格式</div>
            </div>
            <input type="file" id="chapter-file-input-1" class="file-input" accept="image/jpeg,image/png" onchange="handleChapterImageUpload1(this)" style="display: none;">
            <div class="uploaded-images" id="chapter-uploaded-images-1"></div>
          </div>
        </div>
        <div class="quiz-question">
          <p><strong>问题2：</strong>（2020秋•东湖区校级期中）如图所示，两只原长都是x₀＝10cm、劲度系数分别为k₁＝100N/m和k₂＝150N/m的弹簧悬挂在天花板上，两弹簧之间有一质量为m₁＝1kg的物体，最下端挂着质量为m₂＝3kg的另一物体，整个装置处于静止状态。两弹簧均是轻质弹簧（弹簧重力不计），g＝10m/s²，求两只弹簧的总长度L。
          </p>
          <div class="question-image">
            <img src="images/test/第七关/第七关应用2.png" alt="应用2图">
          </div>
          <div class="image-upload-container">
            <div class="upload-area" id="chapter-upload-area-2" onclick="document.getElementById('chapter-file-input-2').click()">
              <div class="upload-icon">📷</div>
              <div class="upload-text">点击或拖拽上传图片</div>
              <div class="upload-hint">支持 JPG、PNG 格式</div>
            </div>
            <input type="file" id="chapter-file-input-2" class="file-input" accept="image/jpeg,image/png" onchange="handleChapterImageUpload2(this)" style="display: none;">
            <div class="uploaded-images" id="chapter-uploaded-images-2"></div>
          </div>
        </div>
        <div class="quiz-question">
          <p><strong>问题3：</strong>（2019秋•巴中期中）如图所示，水平面上有一重为40N的物体受到F₁＝12N和F₂＝6N的水平力作用而保持静止，视最大静摩擦力与滑动摩擦力相等。已知物体与水平地面间的动摩擦因数μ＝0.2，求：
          </p>
          <p>（1）此时物体所受摩擦力的大小和方向？</p>
          <p>（2）若将F₁撤去，物体所受摩擦力的大小和方向？</p>
          <p>（3）若将F₂撤去，物体所受摩擦力的大小和方向？</p>
          <div class="image-upload-container">
            <div class="upload-area" id="chapter-upload-area-3" onclick="document.getElementById('chapter-file-input-3').click()">
              <div class="upload-icon">📷</div>
              <div class="upload-text">点击或拖拽上传图片</div>
              <div class="upload-hint">支持 JPG、PNG 格式</div>
            </div>
            <input type="file" id="chapter-file-input-3" class="file-input" accept="image/jpeg,image/png" onchange="handleChapterImageUpload3(this)" style="display: none;">
            <div class="uploaded-images" id="chapter-uploaded-images-3"></div>
          </div>
        </div>
        <div class="quiz-question">
          <p><strong>问题4：</strong>（2019秋•沙坪坝区校级月考）如图所示，质量为m₁=4kg的物体A静止在水平地面上，与地面的动摩擦因数μ=0.2，质量为m₂=1kg的物体B在水平恒力F=10N的作用下，沿水平地面向右运动，A、B之间的动摩擦因数μ₁=0.1，g=10m/s²。求：
          </p>
          <p>（1）物体A的加速度；</p>
          <p>（2）物体B的加速度。</p>
          <div class="image-upload-container">
            <div class="upload-area" id="chapter-upload-area-4" onclick="document.getElementById('chapter-file-input-4').click()">
              <div class="upload-icon">📷</div>
              <div class="upload-text">点击或拖拽上传图片</div>
              <div class="upload-hint">支持 JPG、PNG 格式</div>
            </div>
            <input type="file" id="chapter-file-input-4" class="file-input" accept="image/jpeg,image/png" onchange="handleChapterImageUpload4(this)" style="display: none;">
            <div class="uploaded-images" id="chapter-uploaded-images-4"></div>
          </div>
        </div>
        <div class="quiz-question">
          <p><strong>问题5：</strong>（2019秋•沙坪坝区校级月考）如图所示，质量为m=2kg的物体静止在水平地面上，与地面的动摩擦因数μ=0.2，在水平恒力F=10N的作用下开始运动，g=10m/s²。求：
          </p>
          <p>（1）物体的加速度；</p>
          <p>（2）物体运动5s后的速度。</p>
          <div class="image-upload-container">
            <div class="upload-area" id="chapter-upload-area-5" onclick="document.getElementById('chapter-file-input-5').click()">
              <div class="upload-icon">📷</div>
              <div class="upload-text">点击或拖拽上传图片</div>
              <div class="upload-hint">支持 JPG、PNG 格式</div>
            </div>
            <input type="file" id="chapter-file-input-5" class="file-input" accept="image/jpeg,image/png" onchange="handleChapterImageUpload5(this)" style="display: none;">
            <div class="uploaded-images" id="chapter-uploaded-images-5"></div>
          </div>
        </div>
      </div>
    `;
  }
}

// 切换章节测试标签
function switchChapterTestTab(button, tabName) {
  // 移除所有按钮的active类
  const buttons = document.querySelectorAll('#chapterTestPage .quiz-nav-item');
  buttons.forEach(btn => btn.classList.remove('active'));

  // 添加当前按钮的active类
  button.classList.add('active');

  // 隐藏所有内容
  const contents = document.querySelectorAll('#chapterTestPage .quiz-tab-content');
  contents.forEach(content => {
    content.classList.remove('active');
    content.style.display = 'none';
  });

  // 显示对应内容
  const targetContent = document.getElementById(`chapter-test-${tabName}-content`);
  if (targetContent) {
    targetContent.classList.add('active');
    targetContent.style.display = 'block';
  }

  // 清除答题结果内容，确保返回原始页面
  // 移除重新加载内容的代码，避免切换标签时显示错误的内容

  // 控制提交按钮的显示/隐藏，只有在应用题标签页时显示
  const chapterFooter = document.querySelector('#chapterTestPage .quiz-footer');
  if (chapterFooter) {
    if (tabName === 'application') {
      chapterFooter.style.display = 'block';
    } else {
      chapterFooter.style.display = 'none';
    }
  }
}

// 处理章节测试图片上传1
function handleChapterImageUpload1(input) {
  const container = document.getElementById('chapter-uploaded-images-1');
  handleChapterImageUpload(input, container);
}

// 处理章节测试图片上传2
function handleChapterImageUpload2(input) {
  const container = document.getElementById('chapter-uploaded-images-2');
  handleChapterImageUpload(input, container);
}

// 处理章节测试图片上传3
function handleChapterImageUpload3(input) {
  const container = document.getElementById('chapter-uploaded-images-3');
  handleChapterImageUpload(input, container);
}

// 处理章节测试图片上传4
function handleChapterImageUpload4(input) {
  const container = document.getElementById('chapter-uploaded-images-4');
  handleChapterImageUpload(input, container);
}

// 处理章节测试图片上传5
function handleChapterImageUpload5(input) {
  const container = document.getElementById('chapter-uploaded-images-5');
  handleChapterImageUpload(input, container);
}

// 通用的章节测试图片上传处理函数
function handleChapterImageUpload(input, container) {
  if (input.files && input.files[0]) {
    const file = input.files[0];
    const reader = new FileReader();

    reader.onload = function (e) {
      const imgWrapper = document.createElement('div');
      imgWrapper.style.position = 'relative';
      imgWrapper.style.display = 'inline-block';

      const img = document.createElement('img');
      img.src = e.target.result;
      img.style.maxWidth = '120px';
      img.style.maxHeight = '120px';
      img.style.borderRadius = '6px';
      img.style.border = '3px solid #FFD700';
      img.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.3)';

      // 添加删除按钮
      const deleteBtn = document.createElement('button');
      deleteBtn.innerHTML = '×';
      deleteBtn.style.position = 'absolute';
      deleteBtn.style.top = '-10px';
      deleteBtn.style.right = '-10px';
      deleteBtn.style.width = '24px';
      deleteBtn.style.height = '24px';
      deleteBtn.style.borderRadius = '50%';
      deleteBtn.style.background = '#FF4444';
      deleteBtn.style.color = 'white';
      deleteBtn.style.border = '2px solid white';
      deleteBtn.style.cursor = 'pointer';
      deleteBtn.style.fontSize = '16px';
      deleteBtn.style.fontWeight = 'bold';
      deleteBtn.style.display = 'flex';
      deleteBtn.style.alignItems = 'center';
      deleteBtn.style.justifyContent = 'center';
      deleteBtn.style.boxShadow = '0 2px 4px rgba(0,0,0,0.3)';

      deleteBtn.onclick = function () {
        imgWrapper.remove();
        input.value = '';
      };

      imgWrapper.appendChild(img);
      imgWrapper.appendChild(deleteBtn);
      container.appendChild(imgWrapper);
    };

    reader.readAsDataURL(file);
  }
}

// 章节测试答案解析数据
const chapterTestPracticeAnswer = [
  {
    question: "1. 选择题 - 足球与弹力",
    answer: "B",
    tags: ['弹力', '受力分析'],
    explanation: "【详细解析】本题考察弹力的产生和方向。\n\n【逐项分析】A错误：静止在水平草地上的足球受到的弹力是地面对足球的支持力，不是重力。重力的施力物体是地球，弹力的施力物体是地面。\n\nB正确：弹力的产生原因是由于物体发生了弹性形变。足球受到向上的弹力，是因为足球发生了微小的形变（被压扁），而产生了恢复原状的力。\n\nC错误：两个足球静止在光滑水平地面上，虽然接触但没有相互挤压，不会产生弹性形变，因此没有弹力。\n\nD错误：踩在脚下静止的足球受到两个力的作用：重力和脚对足球向下的压力（或者是支持力，取决于参考系），共2个力，不是3个力。\n\n【关键点】弹力产生的条件：①接触；②发生弹性形变。"
  },
  {
    question: "2. 选择题 - 力的相互作用",
    answer: "A",
    tags: ['力的平衡'],
    explanation: "【详细解析】本题考察力的基本概念和性质。\n\n【逐项分析】A正确：力的作用是相互的，一个物体是施力物体的同时也是受力物体。例如人推墙时，墙也对人有力的作用。\n\nB错误：物体放在桌面上，桌面受到的压力是由于物体的形变（被压扁）产生的，而不是由于桌面的形变。\n\nC错误：不接触的两个物体之间也可能有力的作用，例如重力（地球吸引物体）、磁力等。\n\nD错误：形状规则的物体的重心不一定在几何中心，只有质量均匀分布的物体重心才在几何中心。\n\n【关键点】力不能脱离物体存在，必有施力物体和受力物体。"
  },
  {
    question: "3. 选择题 - 重力弹力摩擦力",
    answer: "A",
    tags: ['重力', '弹力', '摩擦力'],
    explanation: "【详细解析】本题考察重力、弹力、摩擦力的基本概念。\n\n【逐项分析】A正确：密度均匀的球体，由于质量分布均匀对称，重心在球心。\n\nB错误：两个相互接触的物体间，不一定有弹力。例如两个足球光滑接触，没有相互挤压，不产生弹力。\n\nC错误：地球表面的自由落体加速度随纬度的增大而增大（因为地球自转离心力和极地扁平程度的影响）。\n\nD错误：在弹性限度内，弹簧弹力的大小与弹簧的形变量（伸长或压缩量）成正比，而不是与弹簧的长度成正比。\n\n【关键点】弹力产生条件：接触+挤压+形变。重力加速度随纬度增加而增大。"
  },
  {
    question: "4. 选择题 - 力的概念",
    answer: "A",
    tags: ['力的概念', '受力分析'],
    explanation: "【详细解析】本题考察力的概念和性质。\n\n【逐项分析】A正确：力是物体对物体的相互作用，力不能脱离物体而单独存在。\n\nB错误：力不能脱离物体而独立存在，力必然发生在两个物体之间。\n\nC错误：有受力物体一定有施力物体，因为力的作用是相互的。\n\nD错误：两个物体不接触也可能产生力，如重力、磁场力等。\n\n【关键点】力的物质性：力不能脱离物体存在；力的相互性：有力必成对出现。"
  },
  {
    question: "5. 选择题 - 弹弓弹力",
    answer: "B",
    tags: ['胡克定律', '力的合成'],
    explanation: "【详细解析】本题考察胡克定律和力的合成。\n\n【分析】设'Y'形弹弓两根橡皮条之间的夹角为θ。\n橡皮条自由长度为L，发射时最大长度为1.5L，\n所以每根橡皮条的形变量Δx = 1.5L - L = 0.5L。\n\n每根橡皮条的弹力：F1 = F2 = k·Δx = k·0.5L = 0.5kL。\n\n两根橡皮条对裹片的弹力方向相反，裹片受到的合力为两弹力的矢量和。\n由于两根橡皮条关于竖直方向对称，夹角为θ，合力大小为：\nF合 = 2F1·cos(θ/2) = 2×0.5kL·cos(θ/2) = kL·cos(θ/2)。\n\n当θ = 90°时，cos45° = √2/2，合力的最大值出现在θ较小时。\n题目没有给出θ的具体值，但根据几何关系和物理模型，最大作用力为kL。\n\nB正确：A、C、D不符合上述分析。\n\n【关键点】胡克定律F = kx，力的合成遵循平行四边形定则。"
  },
  {
    question: "6. 选择题 - 弹簧弹力与长度",
    answer: "A",
    tags: ['胡克定律', '力学计算'],
    explanation: "【详细解析】本题考察胡克定律和弹簧图像。\n\n【分析】由弹力F与弹簧长度l的关系图象可知：\n- 图象与l轴的截距表示弹簧的原长\n- 图象的斜率表示劲度系数k\n\n【逐项分析】A正确：图象在l轴上的截距为5cm，所以弹簧原长为5cm。\n\nB错误：图象的斜率k = ΔF/Δl = (10-0)/(15-5) = 10/10 = 1N/cm = 100N/m，不是2N/m。\n\nC错误：伸长量为15cm时，弹簧长度为l = 5 + 15 = 20cm，弹力F = kx = 100×0.15 = 15N，不是10N。\n\nD错误：长度为12cm时，伸长量x = 12-5 = 7cm = 0.07m，弹力F = kx = 100×0.07 = 7N，不是4N。\n\n【关键点】弹簧弹力F = kx，x是形变量（伸长或压缩量），不是长度。"
  },
  {
    question: "7. 选择题 - 摩擦力图像",
    answer: "A",
    tags: ['摩擦力', '受力分析'],
    explanation: "【详细解析】本题考察摩擦力的方向和大小。\n\n【分析】物体在水平面上向右运动，摩擦力方向向左（与相对运动方向相反）。\n摩擦力大小：f = μN = μG = μmg = 0.2×50 = 10N。\n取水平向右为正方向，则摩擦力为负值，f = -10N。\n\n物体做减速运动，最终会停止，但摩擦力方向始终向左，大小保持10N。\n\nA正确：摩擦力为恒定值-10N，图象为平行于t轴的直线。\nB、C、D错误：不符合摩擦力恒定的分析。\n\n【关键点】滑动摩擦力大小f = μN，与运动状态无关，方向与相对运动方向相反。"
  },
  {
    question: "8. 选择题 - 木块与弹簧",
    answer: "A",
    tags: ['静摩擦力', '胡克定律', '受力分析'],
    explanation: "【详细解析】本题考察静摩擦力和弹簧弹力的计算。\n\n【分析】木块A重GA = 50N，木块B重GB = 60N。\n动摩擦因数μ = 0.25，弹簧劲度系数k = 400N/m，弹簧伸长量x = 2cm = 0.02m。\n\n弹簧弹力：F弹 = kx = 400×0.02 = 8N。\n\nA与地面间最大静摩擦力：fAmax = μGA = 0.25×50 = 12.5N。\nB与地面间最大静摩擦力：fBmax = μGB = 0.25×60 = 15N。\n\n用F = 5N水平拉力作用在B上：\n对A分析：A受弹簧向右的弹力8N，A有向右运动趋势，地面对A的静摩擦力向左。\n由于8N < fAmax = 12.5N，A静止，由平衡条件：fA = 8N（方向向左）。\n\n对B分析：B受水平拉力F = 5N（向右），受弹簧向左的弹力8N，受地面对B的摩擦力fB。\n由平衡条件：F + fB = F弹，即5 + fB = 8，解得fB = 3N（方向向右）。\n\n所以fA = 8N，fB = 3N，A正确。\n\n【关键点】静摩擦力随外力变化，但不超过最大静摩擦力。"
  },
  {
    question: "9. 选择题 - 力的说法",
    answer: "A",
    tags: ['弹力', '摩擦力', '牛顿第三定律'],
    explanation: "【详细解析】本题考察弹力、摩擦力、作用力反作用力的概念。\n\n【逐项分析】A正确：一个物体放在水平桌面上，物体受到了向上的弹力（支持力），是因为桌面发生了微小的形变（被压扁）而产生的。这是弹力产生的原因。\n\nB错误：摩擦力阻碍的是物体间的相对运动或相对运动趋势，不是总是阻碍物体的运动。例如，传送带运载物体时，摩擦力是物体前进的动力。\n\nC错误：一个作用力与它的反作用力作用在两个不同的物体上，它们是异体应力，不能合成，因此合力不等于零。\n\nD错误：两个相互作用物体之间的作用力与反作用力大小始终相等，与物体的运动状态无关，这体现了牛顿第三定律。\n\n【关键点】作用力与反作用力：同大小、反方向、异物体、共线。"
  },
  {
    question: "10. 选择题 - 木板与木块摩擦力",
    answer: "D",
    tags: ['摩擦力', '受力分析'],
    explanation: "【详细解析】本题考察滑动摩擦力和实验原理。\n\n【分析】木块和木板叠放在一起，用绳子拉木板向右滑动，木块相对于木板向左运动。\n\n【逐项分析】A错误：木块相对于木板向左滑动，因此受到滑动摩擦力，不是静摩擦力。\n\nB错误：木板可以在任何运动状态下滑动，不需要匀速或匀加速。\n\nC错误：木板可以任意速度滑动，不要求特定的运动状态。\n\nD正确：由于木块静止（相对于地面），弹簧测力计示数等于木块受到的滑动摩擦力大小。这体现了二力平衡原理。\n\n【关键点】木块相对木板运动，受滑动摩擦力；木块相对地面静止，受力平衡。"
  },
  {
    question: "11. 选择题 - 蚂蚁在碗内",
    answer: "A",
    tags: ['摩擦力', '受力分析', '力的平衡'],
    explanation: "【详细解析】本题考察摩擦力和弹力的计算。\n\n【分析】蚂蚁在半球形碗内缓慢爬行，可视为静止状态，受力平衡。\n设碗面与水平面的夹角为θ，则蚂蚁受到：\n- 重力mg（竖直向下）\n- 弹力N（垂直碗面向上）\n- 摩擦力f（沿碗面向上，与运动趋势相反）\n\n【逐项分析】从碗底b点爬到碗口a点的过程中，θ逐渐增大。\n\nA正确：弹力N = mgcosθ，当θ增大时，cosθ减小，所以N减小；摩擦力f = μN，也减小。\n但注意：题目中说的是摩擦力逐渐变大，这是错的。实际上因为缓慢爬行，摩擦力应与重力沿碗面分力平衡，即f = mgsinθ，θ增大时f增大。\n\nB错误：蚂蚁受到的弹力N = mgcosθ，θ增大时cosθ减小，所以弹力逐渐变小，不是变大。\n\nC、D错误：地面对碗的支持力和摩擦力是碗受到的力，与蚂蚁在碗内的位置无关，因为碗本身的重力不变。\n\n修正分析：从平衡角度，蚂蚁受摩擦力f = mgsinθ（沿碗面向上），θ增大则f增大。所以A正确。\n\n【关键点】在碗面上，弹力N = mgcosθ，摩擦力f = mgsinθ（缓慢移动时）。"
  },
  {
    question: "12. 选择题 - 木块A、B受力",
    answer: "D",
    tags: ['力的平衡', '摩擦力', '整体法'],
    explanation: "【详细解析】本题考察共点力平衡和摩擦力。\n\n【分析】木块A叠放在木块B上，A的左侧靠在光滑的竖直墙面上。系统静止。\n\n【逐项分析】A错误：B对A的作用力是接触力，包括支持力和摩擦力的合力。方向不一定竖直向上，取决于A的受力情况。\n\nB错误：B对A的作用力大小等于A的重力（当墙壁光滑时），不一定大于A的重力。\n\nC错误：B受到地面的摩擦力方向只能向左（因为A有向左滑动的趋势，对B施加向左的摩擦力），不可能向右。\n\nD正确：对系统整体分析：竖直方向上，地面对B的支持力等于A和B的总重力，因为水平方向没有其他力（墙壁光滑无摩擦力）。\n\n【关键点】系统静止时，受力平衡，合外力为零。"
  },
  {
    question: "13. 选择题 - 自动扶梯",
    answer: "A",
    tags: ['超重失重', '受力分析'],
    explanation: "【详细解析】本题考察超重和受力分析。\n\n【分析】两种自动扶梯：有台阶（有踏板）和无台阶（平滑斜面）。\n\n【逐项分析】加速运行时，乘客有向上的加速度，处于超重状态。\n\nA正确：有台阶的扶梯，乘客的双脚与踏板接触，支持力N1 = m(g+a)。\n无台阶的扶梯（类似传送带），乘客由于惯性有向后滑动的趋势，扶梯对乘客的支持力N2 = mg + ma - f，其中f是静摩擦力提供的加速度分力。\n由于无台阶扶梯中摩擦力也提供了一部分加速所需的力，所以N2 = m(g+a/2) < N1。\n因此有台阶扶梯对乘客的支持力较大。\n\nB错误：见上述分析，两种情况支持力不同。\n\nC错误：匀速运行时，两种扶梯上乘客都不受摩擦力，因为支持力等于重力。\n\nD错误：匀速运行时，乘客与台阶之间没有相对运动或趋势，不受静摩擦力。\n\n【关键点】超重时N > mg，失重时N < mg。"
  },
  {
    question: "14. 选择题 - 撑杆跳高",
    answer: "C",
    tags: ['牛顿第三定律', '基本概念'],
    explanation: "【详细解析】本题考察牛顿第三定律和惯性。\n\n【逐项分析】A错误：重力的反作用力是物体对地球的引力（地球吸引物体，物体也吸引地球），不是地面对运动员的支持力。支持力的反作用力是物体对地面的压力。\n\nB错误：根据牛顿第三定律，作用力与反作用力大小相等、方向相反、作用在不同物体上。弯曲的撑杆对人的作用力与人对撑杆的作用力是一对作用力和反作用力，大小一定相等。\n\nC正确：撑杆起跳上升阶段，弯曲的撑杆对人的作用力与人对撑杆的作用力是一对作用力和反作用力，大小相等。\n\nD错误：运动员手离开撑杆后能继续越过横杆，是由于惯性（保持原有运动状态），而不是受到一个'向前的冲力'。惯性不是力，不能说'受到'。\n\n【关键点】区分各种力的性质：重力（万有引力）、弹力（接触力）、惯性（不是力）。"
  },
  {
    question: "15. 选择题 - 乒乓球击球",
    answer: "B",
    tags: ['牛顿第三定律', '作用力反作用力'],
    explanation: "【详细解析】本题考察牛顿第三定律——作用力与反作用力。\n\n【逐项分析】A错误：根据牛顿第三定律，球拍对乒乓球的作用力与乒乓球对球拍的作用力大小相等，不是'大于'关系。\n\nB正确：球拍对乒乓球的作用力与乒乓球对球拍的作用力是一对作用力与反作用力，大小一定相等。\n\nC错误：球拍对乒乓球的作用力远大于乒乓球所受重力（击球力通常是几百甚至上千牛，重力只有约0.3牛），不可能是一对平衡力。\n\nD错误：作用力与反作用力作用在不同物体上（球拍vs乒乓球），不是平衡力。平衡力必须作用在同一物体上。\n\n【关键点】作用力与反作用力的关系：同大小、反方向、异物体、同时生灭。一定注意：平衡力与作用力反作用力的根本区别在于是否作用在同一物体上。"
  },
  {
    question: "1. 填空题 - 验证力的平行四边形定则实验操作",
    answer: "AB, B, A",
    tags: ['力的合成', '实验操作'],
    explanation: "【详细解析】本题考察验证力的平行四边形定则的实验操作。\n\n（1）【逐项分析】A正确：在步骤②中，必须记录结点O的位置，以便在步骤③中使结点O重合；\nB正确：在步骤③必须使结点O的位置与步骤②中重合，才能使各个力的效果相同；\nC错误：验证力的平行四边形定则的实验中，对三根细线的粗细、长度是否相同没有要求；\nD错误：在步骤④中，F′与F1不一定完全重合，近似重合即可验证平行四边形定则。\n故应选AB。\n\n（2）由图可知，L1与L3垂直，则F2与F1垂直，所以F3一定大于F2，所以B图中得数据误差一定太大。\n为了便于确定拉力的方向，拉橡皮条的细绳要稍长一些，同时在纸上描点时，所描的点不要太靠近结点，D图中所描的点太靠近结点；\nC图中单位长度选取太大，所以画出的力的长度就可能比较短，这样误差容易大；而A图中单位长度选取合理，所描的点到结点的距离适中，力的大小适中，而且两个力的角度的大小也适中。故A图对提高实验精度最有利。\n\n【关键点】实验成功的关键：结点位置不变、标度合适、描点距离适中。"
  },
  {
    question: "2. 填空题 - 探究求合力的方法",
    answer: "F′, 等效替代法, 1.50, ABC",
    tags: ['力的合成', '等效替代法'],
    explanation: "【详细解析】本题考察探究求合力的方法实验。\n\n（1）方向一定沿AO方向（即橡皮筋方向）的是用一个弹簧拉时拉力的方向，所以是F′；本实验采用的是等效替代法。\n\n（2）弹簧秤读数根据最小分度来读数，为1.50N。\n\n（3）用两个弹簧秤成一定角度拉橡皮筋时，必须记录：两细绳的方向（F的作用方向）、结点O的位置（力的作用点）、两弹簧秤的示数（力的大小）。橡皮筋的原长不需要记录。\n\n【关键点】等效替代法：通过用一个力代替两个力，使效果相同。"
  },
  {
    question: "3. 填空题 - 验证力的平行四边形定则",
    answer: "A, F′",
    tags: ['力的合成', '实验原理'],
    explanation: "【详细解析】本题考察验证力的平行四边形定则实验。\n\n（1）【逐项分析】A正确：本实验采用的是等效替代的方法，同一次实验中，O点位置不允许变动；\nB错误：实验中，需记录弹簧测力计的读数和O点的位置，以及拉力方向；\nC错误：实验中，把橡皮筋的另一端拉到O点时，两个弹簧测力计之间的夹角不一定是90°；\nD错误：本实验只要达到效果相同，对弹簧秤拉力的大小没有要求，不需要将其中一个弹簧测力计沿某一方向拉到最大量程。\n故应选A。\n\n（2）F1与F2的合力的实际测量值（用一个弹簧拉绳套时的弹簧的弹力大小和方向）是F′，方向一定沿AO方向。F是通过平行四边形定则得到的理论值。\n\n【关键点】等效替代：用一个力代替两个力，产生相同效果。"
  },
  {
    question: "1. 应用题 - 弹簧与小球",
    answer: "(1)k=2mg/L; (2)图甲总长度3.5L，图乙总长度4L，图乙更长",
    tags: ['胡克定律', '机械能守恒', '力学计算'],
    explanation: "【详细解析】本题考察胡克定律和弹簧串并联。\n\n（1）以小球为研究对象，由二力平衡得：\nmg = kx，其中x = 1.5L - L = 0.5L\n解得：k = 2mg/L\n\n（2）【图甲分析】\n弹簧2的伸长量：x₂ = mg/k = mg/(2mg/L) = 0.5L\n弹簧1的伸长量：x₁ = 2mg/k = 2mg/(2mg/L) = L\n总长度：l₁ = 2L + x₁ + x₂ = 2L + L + 0.5L = 3.5L\n\n【图乙分析】\n弹簧1和2串联，总伸长量x′ = 2mg/k = 2×(mg/k) = 2×0.5L = L\n总长度：l₂ = 2L + x′ = 2L + 2L = 4L\n\n比较：l₁ = 3.5L < l₂ = 4L，所以图乙的弹簧总长度更长。\n\n【关键点】串联弹簧总伸长量等于各弹簧伸长量之和；并联弹簧受力分配。"
  },
  {
    question: "2. 应用题 - 两弹簧串联",
    answer: "L=80cm",
    tags: ['胡克定律', '力学计算'],
    explanation: "【详细解析】本题考察胡克定律和平衡条件。\n\n对m₂受力分析：\nk₂·Δx₂ = m₂g\nΔx₂ = m₂g/k₂ = (3×10)/150 = 0.2m = 20cm\n\n对m₁和m₂整体受力分析：\nk₁·Δx₁ = (m₁+m₂)g\nΔx₁ = (1+3)×10/100 = 0.4m = 40cm\n\n两弹簧的总长度：\nL = Δx₁ + Δx₂ + 2x₀ = 40 + 20 + 2×10 = 80cm\n\n【关键点】弹簧长度 = 原长 + 伸长量；串联弹簧受力相同。"
  },
  {
    question: "3. 应用题 - 摩擦力计算",
    answer: "(1)f=6N向右; (2)f=6N向左; (3)f=8N向右",
    tags: ['静摩擦力', '滑动摩擦力', '力学计算'],
    explanation: "【详细解析】本题考察摩擦力的计算和判断。\n\n（1）物体受F₁=12N向右，F₂=6N向左，合力F=6N向右。\n最大静摩擦力fₘ = μG = 0.2×40 = 8N。\n由于F < fₘ，物体静止，静摩擦力与外力平衡：\nf = F₁ - F₂ = 6N，方向向右。\n\n（2）撤去F₁后，外力F₂=6N < fₘ=8N，物体仍静止：\nf₁ = F₂ = 6N，方向与F₂相反，即向左。\n\n（3）撤去F₂后，外力F₁=12N > fₘ=8N，物体向左滑动，受滑动摩擦力：\nf₂ = μG = 8N，方向与运动方向相反，即向右。\n\n【关键点】静摩擦力随外力变化，滑动摩擦力f = μN。"
  },
  {
    question: "4. 应用题 - 滑块与容器",
    answer: "(1)F=20N; (2)F₁=160N",
    tags: ['力的平衡', '摩擦力', '力学计算'],
    explanation: "【详细解析】本题考察共点力平衡和摩擦力。\n\n（1）对容器及水整体受力分析：\n竖直方向：2F·cosθ = m₁g\nF = m₁g/(2cosθ) = 2.4×10/(2×0.6) = 20N\n由牛顿第三定律，容器对滑块的压力F′ = F = 20N。\n\n（2）滑块B刚要滑动时：\n设容器对滑块的压力为F₁，受力分析：\n水平方向：F₁·sinθ = fₘ\n竖直方向：mg + F₁·cosθ = F_N\nfₘ = μF_N\n\n代入数据：\nF₁×0.8 = 0.4×(22.4×10 + F₁×0.6)\n0.8F₁ = 0.4×224 + 0.24F₁\n0.56F₁ = 89.6\nF₁ = 160N\n\n【关键点】平衡条件：合外力为零；滑动摩擦力f = μN。"
  },
  {
    question: "5. 应用题 - 弹簧斜面物块",
    answer: "(1)x₁=mg/k; (2)m_B=m; (3)v=√(2gx)",
    tags: ['胡克定律', '机械能守恒', '力学计算'],
    explanation: "【详细解析】本题考察弹簧振子和能量守恒。\n\n（1）A速度最大时，受力平衡：\n对A：F_T - kx₁ - mgsinθ = 0\n对C：mg - F_T = 0\n联立解得：kx₁ = mgsinθ\nx₁ = mgsinθ/k\n当θ=30°时，sinθ=0.5，故x₁ = mg/k\n\n（2）B恰好离开挡板时：\nkx₁ = m_B gsinθ\n代入x₁ = mg/k，得：m_B = m\n\n（3）初始状态弹簧压缩量为：\n初始kx₀ = mgsinθ，x₀ = mgsinθ/k\n与速度最大时形变量相同，弹性势能相同。\n\nA速度最大时，C下降高度h = 2x₁\n由能量守恒：\nmgh = ½(m+m)v²\nv = √(2gh) = √(4gx₁) = 2√(gx₁)\n代入x₁ = mg/k，得：v = 2√(g·mg/k) = 2m√(g²/k) = 2mg/√k\n简化得：v = √(2gx) （其中x为形变量）\n\n【关键点】速度最大时加速度为零；弹簧振子机械能守恒。"
  }
];

// 存储当前答题结果
let currentChapterTestAnswers = null;
let currentChapterTestChoiceFillScore = 0;

// 提交章节测试答案
function submitChapterTest() {
  // 收集选择题答案（15道题）
  const choiceAnswers = {};
  for (let i = 1; i <= 15; i++) {
    const selected = document.querySelector(`input[name="chapter-q${i}"]:checked`);
    choiceAnswers[`q${i}`] = selected ? selected.value : null;
  }

  // 收集填空题答案
  const fillAnswers = {
    q1: [
      document.getElementById('chapter-fill-q1-1')?.value?.trim(),
      document.getElementById('chapter-fill-q1-2')?.value?.trim(),
      document.getElementById('chapter-fill-q1-3')?.value?.trim()
    ],
    q2: [
      document.getElementById('chapter-fill-q2-1')?.value?.trim(),
      document.getElementById('chapter-fill-q2-2')?.value?.trim(),
      document.getElementById('chapter-fill-q2-3')?.value?.trim(),
      document.getElementById('chapter-fill-q2-4')?.value?.trim()
    ],
    q3: [
      document.getElementById('chapter-fill-q3-1')?.value?.trim(),
      document.getElementById('chapter-fill-q3-2')?.value?.trim()
    ]
  };

  // 收集应用题答题情况（是否上传了图片）
  const appAnswers = {
    app1: document.getElementById('chapter-uploaded-images-1')?.children.length > 0,
    app2: document.getElementById('chapter-uploaded-images-2')?.children.length > 0,
    app3: document.getElementById('chapter-uploaded-images-3')?.children.length > 0,
    app4: document.getElementById('chapter-uploaded-images-4')?.children.length > 0,
    app5: document.getElementById('chapter-uploaded-images-5')?.children.length > 0
  };

  // 正确答案
  const correctAnswers = {
    choice: {
      q1: 'd',  // 图丙中，踩在脚下且静止在水平草地上的足球可能受到3个力的作用
      q2: 'a',  // 力的作用是相互的，一个物体是施力物体的同时也是受力物体
      q3: 'a',  // 密度均匀的球体的重心在球心
      q4: 'a',  // 力一定是物体对物体的相互作用
      q5: 'b',  // kL
      q6: 'd',  // 长度为12cm时，弹力大小为4N
      q7: 'b',  // B
      q8: 'a',  // fA＝8N fB＝3N
      q9: 'a',  // 一个物体放在水平桌面上，物体受到了向上的弹力，是因为桌面发生了形变
      q10: 'd', // 木板运动过程中，弹簧测力计示数等于木块受到的摩擦力
      q11: 'b', // 蚂蚁受到的弹力逐渐变大
      q12: 'd', // 地面对B的支持力大小等于A、B的总重力
      q13: 'd', // 匀速运行时，有台阶自动扶梯中，乘客不受摩擦力
      q14: 'c', // 撑杆起跳上升阶段，弯曲的撑杆对人的作用力大小等于人对撑杆的作用力大小
      q15: 'b'  // 球拍对乒乓球的作用力与乒乓球对球拍的作用力大小相等
    },
    fill: {
      q1: ['AB', 'B', 'C'],  // 操作必要的是AB；误差较大的是B；对提高实验精度最有利的是C
      q2: ['F\'', '等效替代法', '3.6', 'O点位置、两弹簧秤读数、两细绳方向'],  // F'；等效替代法；3.6N；记录O点位置、两弹簧秤读数、两细绳方向
      q3: ['AC', 'F\'']  // 正确的是AC；方向一定沿AO方向的是F'
    }
  };

  // 显示答题结果
  const chapterTestContent = document.querySelector('#chapterTestPage .quiz-content');
  if (chapterTestContent) {
    chapterTestContent.innerHTML = '';
    showChapterTestResults(choiceAnswers, fillAnswers, appAnswers, correctAnswers);
  }
}

// 显示章节测试答题结果
function showChapterTestResults(choiceAnswers, fillAnswers, appAnswers, correctAnswers) {
  // 存储当前答案
  currentChapterTestAnswers = { choiceAnswers, fillAnswers, appAnswers };

  let correctChoiceCount = 0;
  let choiceScore = 0;
  let correctFillCount = 0;
  let fillScore = 0;
  const totalChoiceQuestions = 15; // 选择题总数
  const totalFillBlanks = 9; // 填空题总空数
  const CHOICE_SCORE = 4; // 选择题每题4分
  const FILL_SCORE = 3; // 填空题每空3分
  const APP_QUESTION_SCORE = 6; // 应用题每题6分

  let resultHTML = '<div class="test-result"><h3>答题结果</h3>';

  // 选择题结果
  for (let i = 1; i <= totalChoiceQuestions; i++) {
    const userAnswer = choiceAnswers[`q${i}`] || '';
    const isCorrect = userAnswer === correctAnswers.choice[`q${i}`];
    if (isCorrect) {
      correctChoiceCount++;
      choiceScore += CHOICE_SCORE;
    } else {
      trackQuestionResult('level5', 'choice', i, false);
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
    const isCorrect = userAnswer.toUpperCase() === correctFill1[i].toUpperCase();
    if (isCorrect) {
      correctFillCount++;
      fillScore += FILL_SCORE;
    } else {
      trackQuestionResult('level5', 'fill', 1, false);
    }
  }

  // 填空题2
  const fill2Answers = fillAnswers.q2;
  const correctFill2 = correctAnswers.fill.q2;
  for (let i = 0; i < fill2Answers.length; i++) {
    const userAnswer = fill2Answers[i] || '';
    const isCorrect = userAnswer.toLowerCase() === correctFill2[i].toLowerCase();
    if (isCorrect) {
      correctFillCount++;
      fillScore += FILL_SCORE;
    } else {
      trackQuestionResult('level5', 'fill', 2, false);
    }
  }

  // 填空题3
  const fill3Answers = fillAnswers.q3;
  const correctFill3 = correctAnswers.fill.q3;
  for (let i = 0; i < fill3Answers.length; i++) {
    const userAnswer = fill3Answers[i] || '';
    const isCorrect = userAnswer.toUpperCase() === correctFill3[i].toUpperCase();
    if (isCorrect) {
      correctFillCount++;
      fillScore += FILL_SCORE;
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
  currentChapterTestChoiceFillScore = totalScore;

  resultHTML += `
    <div class="test-score">
      <h4>总分：${totalScore}分（选择题+填空题）</h4>
      <p>选择题：${correctChoiceCount}/${totalChoiceQuestions} 正确，得分 ${choiceScore}/60</p>
      <p>填空题：${correctFillCount}/${totalFillBlanks} 空正确，得分 ${fillScore}/27</p>
      <p style="font-size: 14px; color: #FFA500;">应用题正在AI智能批改中...</p>
    </div>

    <div class="test-result-buttons">
      <button class="test-result-button" onclick="showAnswerExplanation()">答案解析</button>
      <button class="test-result-button" onclick="redoChapterTest()">返回重做</button>
    </div>
  `;

  resultHTML += '</div>';

  // 显示结果
  const chapterTestContent = document.querySelector('#chapterTestPage .quiz-content');
  if (chapterTestContent) {
    chapterTestContent.innerHTML = resultHTML;
  }

  // 隐藏提交答案按钮
  const chapterFooter = document.querySelector('#chapterTestPage .quiz-footer');
  if (chapterFooter) {
    chapterFooter.style.display = 'none';
  }
}

// 显示章节测试答案解析模态窗口
function showAnswerExplanation() {
  // 检查是否已存在答案解析窗口，若存在则移除
  const existingWindow = document.getElementById('answer-explanation-window');
  if (existingWindow) {
    existingWindow.remove();
    const existingOverlay = document.getElementById('answer-explanation-overlay');
    if (existingOverlay) {
      existingOverlay.remove();
    }
    return;
  }

  // 创建遮罩层
  const overlay = document.createElement('div');
  overlay.className = 'answer-explanation-overlay';
  overlay.id = 'answer-explanation-overlay';
  overlay.onclick = closeAnswerExplanation;
  document.body.appendChild(overlay);

  // 显示遮罩层
  setTimeout(() => { overlay.classList.add('show'); }, 10);

  // 创建答案解析窗口
  const answerWindow = document.createElement('div');
  answerWindow.className = 'answer-explanation-window';
  answerWindow.id = 'answer-explanation-window';
  answerWindow.onclick = (e) => { e.stopPropagation(); };

  // 生成答案解析内容
  let answerContent = chapterTestPracticeAnswer.map(item => `
    <div class="answer-explanation-section">
      <h3>${item.question}</h3>
      <p><strong>正确答案：${item.answer}</strong></p>
      ${item.tags && item.tags.length > 0 ? `<p><strong>标签：</strong>${item.tags.join('、')}</p>` : ''}
      <p class="explanation-text">${item.explanation.replace(/\n/g, '<br>')}</p>
    </div>
  `).join('');

  // 设置窗口内容
  answerWindow.innerHTML = `
    <div class="answer-explanation-header">
      <h3>答案解析</h3>
      <button class="answer-explanation-close" onclick="closeAnswerExplanation()">×</button>
    </div>
    <div class="answer-explanation-content">${answerContent}</div>
  `;

  // 添加到页面
  document.body.appendChild(answerWindow);
  // 显示窗口
  setTimeout(() => { answerWindow.classList.add('show'); }, 10);
  // 禁止页面滚动
  document.body.style.overflow = 'hidden';
}

// 关闭答案解析模态窗口
function closeAnswerExplanation() {
  const answerWindow = document.getElementById('answer-explanation-window');
  const overlay = document.getElementById('answer-explanation-overlay');

  if (answerWindow) {
    answerWindow.classList.remove('show');
    setTimeout(() => { answerWindow.remove(); }, 300);
  }

  if (overlay) {
    overlay.classList.remove('show');
    setTimeout(() => { overlay.remove(); }, 300);
  }

  // 恢复页面滚动
  document.body.style.overflow = '';
}

// 显示章节测试答案解析
function showChapterTestExplanations(correctAnswers) {
  let explanationsHTML = `
    <div class="test-result">
      <div class="test-result-header">
        <button class="test-result-back-button" onclick="backToChapterTestResults()">返回</button>
        <h3>答案解析</h3>
      </div>
  `;

  // 选择题解析
  explanationsHTML += '<h4>选择题</h4>';
  const choiceExplanations = {
    q1: '图丙中，足球受到重力、地面支持力和脚的压力，共3个力的作用。',
    q2: '力的作用是相互的，一个物体是施力物体的同时也是受力物体，这是牛顿第三定律的基本内容。',
    q3: '密度均匀的球体的重心在球心，这是重心位置的基本规律。',
    q4: '力一定是物体对物体的相互作用，没有物体就没有力的作用。',
    q5: '根据胡克定律，弹簧的伸长量与弹力成正比，当弹力为kL时，伸长量为L。',
    q6: '原长10cm，劲度系数200N/m，长度为12cm时，伸长量2cm=0.02m，弹力大小为200×0.02=4N。',
    q7: 'B选项正确，因为摩擦力的方向总是与物体相对运动或相对运动趋势的方向相反。',
    q8: 'fA=μmg=0.4×2×10=8N，fB=μ(2m)g=0.15×4×10=6N，所以fA=8N，fB=6N。',
    q9: '物体受到向上的弹力是因为桌面发生了形变，这是弹力产生的原因。',
    q10: '木板运动过程中，弹簧测力计示数等于木块受到的摩擦力，因为木块处于静止状态，摩擦力与弹簧拉力平衡。',
    q11: '蚂蚁向上爬时，与树枝间的压力增大，所以蚂蚁受到的弹力逐渐变大。',
    q12: '地面对B的支持力大小等于A、B的总重力，因为整体处于平衡状态。',
    q13: '匀速运行时，有台阶自动扶梯中，乘客只受到重力和支持力，不受摩擦力。',
    q14: '根据牛顿第三定律，弯曲的撑杆对人的作用力大小等于人对撑杆的作用力大小。',
    q15: '根据牛顿第三定律，球拍对乒乓球的作用力与乒乓球对球拍的作用力大小相等。'
  };

  for (let i = 1; i <= 15; i++) {
    explanationsHTML += `
      <div class="test-result-item">
        <p><strong>选择题${i}：</strong></p>
        <p><strong>正确答案：</strong>${correctAnswers.choice[`q${i}`].toUpperCase()}</p>
        <p><strong>解析：</strong>${choiceExplanations[`q${i}`]}</p>
      </div>
    `;
  }

  // 填空题解析
  explanationsHTML += '<h4>填空题</h4>';
  const fillExplanations = {
    q1: '在验证力的平行四边形定则实验中，操作必要的是AB；误差较大的是B；对提高实验精度最有利的是C。',
    q2: 'F\'是用一个弹簧秤拉橡皮筋时的拉力；实验采用等效替代法；根据图示，F\'的大小为3.6N；实验中需要记录O点位置、两弹簧秤读数、两细绳方向。',
    q3: '在探究共点力平衡条件实验中，正确的操作是AC；方向一定沿AO方向的是F\'，因为它是橡皮筋的拉力方向。'
  };

  for (let i = 1; i <= 3; i++) {
    explanationsHTML += `
      <div class="test-result-item">
        <p><strong>填空题${i}：</strong></p>
        <p><strong>正确答案：</strong>${correctAnswers.fill[`q${i}`].join('；')}</p>
        <p><strong>解析：</strong>${fillExplanations[`q${i}`]}</p>
      </div>
    `;
  }

  explanationsHTML += `
    <div class="test-result-buttons">
      <button class="test-result-button" onclick="redoChapterTest()">返回重做</button>
    </div>
  `;

  explanationsHTML += '</div>';

  // 显示解析
  const chapterTestContent = document.querySelector('#chapterTestPage .quiz-content');
  if (chapterTestContent) {
    chapterTestContent.innerHTML = explanationsHTML;
  }
}

// 从答案解析返回答题结果
function backToChapterTestResults() {
  if (currentChapterTestAnswers) {
    const correctAnswers = {
      choice: {
        q1: 'd', q2: 'a', q3: 'a', q4: 'a', q5: 'b',
        q6: 'd', q7: 'b', q8: 'a', q9: 'a', q10: 'd',
        q11: 'b', q12: 'd', q13: 'd', q14: 'c', q15: 'b'
      },
      fill: {
        q1: ['AB', 'B', 'C'],
        q2: ['F\'', '等效替代法', '3.6', 'O点位置、两弹簧秤读数、两细绳方向'],
        q3: ['AC', 'F\'']
      }
    };
    showChapterTestResults(currentChapterTestAnswers.choiceAnswers, currentChapterTestAnswers.fillAnswers, currentChapterTestAnswers.appAnswers, correctAnswers);
  }
}

// 重做章节测试
function redoChapterTest() {
  // 重置存储的答案
  currentChapterTestAnswers = null;
  currentChapterTestChoiceFillScore = 0;

  // 重新加载章节测试内容并切换到选择页面
  loadChapterTestContent();

  // 切换到选择标签
  const choiceTab = document.querySelector('#chapterTestPage .quiz-nav-item:nth-child(1)');
  if (choiceTab) {
    switchChapterTestTab(choiceTab, 'choice');
  }

  // 显示章节测试页面
  document.getElementById('chapterTestPage').style.display = 'block';
  document.body.style.overflow = 'hidden';
}

// 拖拽上传功能支持
document.addEventListener('DOMContentLoaded', function () {
  const uploadAreas = document.querySelectorAll('#chapterTestPage .upload-area');

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
      if (files.length > 0) {
        const inputId = this.getAttribute('onclick').match(/chapter-file-input-\d+/)[0];
        const input = document.getElementById(inputId);

        // 创建DataTransfer对象来设置files
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