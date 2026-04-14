// 第五关：共点力平衡

// 关卡引入页数据
levelIntro['notice-6'] = `
    <div class="level-intro">
        <h3>生活里的小难题</h3>
        <p>在宁静的小镇上，最近出现了几桩考验 "平衡" 的小事：</p>
        <ul>
            <li><strong>文具店的小郑</strong>要修补店里的老式挂钟，钟摆总是歪向一边，怎么都调不好，急得他直挠头。</li>
            <li><strong>街角花店的老板娘</strong>想在橱窗摆个新造型的玻璃花樽，可花樽放在支架上总是不稳，稍一碰就摇晃。</li>
            <li><strong>广场边的健身区</strong>，老人们玩的石锁也闹出了笑话 —— 有人想把石锁挂在单杠上做练习，可试了好几次，石锁不是滑下来就是转圈圈。</li>
        </ul>
        <p>这些生活里的小难题，看似是 "放不稳、挂不直" 的麻烦，其实都藏着物理奥秘 —— 当一个物体受到多个力作用时，只要这些力能汇交于一点，且彼此的力量相互抵消，就能达到一种 "静止不动" 的状态。</p>
        <p><strong>今天，我们就一起走进共点力平衡的世界，用物理知识帮小镇街坊们找到让万物稳稳当当的关键窍门。</strong></p>
    </div>
`;

// 关卡内容数据 - 与PC端保持一致
levelContent['notice-6'] = {
    guide: `
        <div class="learning-section">
            <h3>学习目标</h3>
            <p>通过本关的学习，你将能够：</p>
            <ol>
                <li>理解共点力的概念及平衡状态的条件；</li>
                <li>掌握共点力平衡的条件，并能运用合力为0分析解决平衡问题；</li>
                <li>掌握动态平衡问题的处理方法：解析法、图解法、相似三角形法、拉密定理法；</li>
                <li>掌握整体法和隔离法在受力分析和平衡问题中的应用；</li>
                <li>运用所学物理知识，帮助小镇街坊们解决生活中的平衡难题。</li>
            </ol>

            <h3>学习内容</h3>
            <p>本关将围绕小镇街坊们遇到的物理难题展开学习：</p>
            <ul>
                <li><strong>共点力平衡的条件</strong>：理解平衡状态的定义，掌握共点力平衡的条件是合力为0，了解二力平衡、三力平衡、多力平衡的推论；</li>
                <li><strong>动态平衡问题</strong>：学习处理动态平衡问题的四种方法——解析法、图解法、相似三角形法、拉密定理法；</li>
                <li><strong>整体法和隔离法</strong>：掌握在受力分析和平衡问题中灵活选用整体法或隔离法解决问题。</li>
            </ul>

            <h3>学习要求</h3>
            <div class="thinking-box">
                <h4>学习前准备</h4>
                <ol>
                    <li>回顾初中所学的二力平衡知识，为学习新知识做好准备；</li>
                    <li>复习平行四边形定则和正交分解法；</li>
                    <li>准备好笔记本，记录学习过程中的重点和疑问；</li>
                    <li>带着问题学习，思考如何用物理知识解决小镇街坊们的难题。</li>
                </ol>
            </div>

            <div class="thinking-box">
                <h4>学习中要求</h4>
                <ol>
                    <li>认真阅读教材内容，理解每个知识点的定义和原理；</li>
                    <li>结合小镇生活中的实例，加深对物理概念的理解；</li>
                    <li>掌握动态平衡的四种处理方法，并能根据题目特点选择合适的方法；</li>
                    <li>理解整体法和隔离法的适用场景，能灵活选用解题方法；</li>
                    <li>积极思考，尝试回答每个知识点后的思考问题；</li>
                    <li>完成当堂检测，检验自己的学习成果。</li>
                </ol>
            </div>

            <div class="thinking-box">
                <h4>学习后总结</h4>
                <ol>
                    <li>梳理本关的知识框架，建立共点力平衡的知识体系；</li>
                    <li>总结动态平衡的四种处理方法的使用条件和适用场景；</li>
                    <li>对比整体法和隔离法的区别和联系，掌握何时选用哪种方法；</li>
                    <li>思考如何将所学知识应用到实际生活中，解决类似的问题。</li>
                </ol>
            </div>
        </div>
    `,
    study: `
        <div class="learning-section">
            <h3>导入新课</h3>

            <div class="thinking-box">
                <h4>思考与讨论：</h4>
                <p>图甲、乙、丙、丁分别画出了重力为G的木棒在力F₁和F₂的共同作用下处于平衡状态的情况，这些力都位于同一平面内。根据每幅图中各个力作用线的几何关系，可以把上述四种情况的受力分成两类，你认为哪些情况属于同一类？你是根据什么来划分的？</p>
                <img src="images/test/第六关/甲乙丙丁1.png" alt="受力分析图1">
                <img src="images/test/第六关/甲乙丙丁2.png" alt="受力分析图2">
                <div class="learning-image-caption">图：木棒的受力分析</div>
            </div>

            <h3>讲授新课</h3>

            <h3>一、共点力平衡的条件</h3>

            <div class="thinking-box">
                <h4>观察与思考：</h4>
                <ol>
                    <li>观察三幅图中物体有什么共同特点？</li>
                    <li>观察下面两幅图汽车和动车运动有什么共同特点？</li>
                </ol>
                <img src="images/test/第六关/匀速行驶的汽车.png" alt="匀速行驶的汽车">
                <div class="learning-image-caption">图：匀速行驶的汽车</div>
                <img src="images/test/第六关/匀速行驶的动车.jpg" alt="匀速行驶的动车">
                <div class="learning-image-caption">图：匀速行驶的动车</div>
            </div>

            <h4>（一）平衡状态</h4>
            <p><strong>1.定义：</strong>物体受到几个力作用时，如果保持静止或匀速直线运动状态，我们就说这个物体处于平衡状态。</p>

            <p><strong>2."静止"和"v=0"的区别和联系：</strong></p>
            <p>当v=0时：</p>
            <ol>
                <li>a=0时，<strong>静止</strong>，处于<strong>平衡</strong>状态</li>
                <li>a≠0时，<strong>不静止</strong>，处于<strong>非平衡</strong>状态，如自由落体初始时刻</li>
            </ol>

            <div class="thinking-box">
                <h4>思考与讨论：</h4>
                <ol>
                    <li>根据初中所学过的二力平衡的知识，你认为受共点力作用的物体，在什么条件下才能保持平衡呢？</li>
                    <li>如果物体受到三个力的作用，你认为受共点力作用的物体，在什么条件下才能保持平衡呢？</li>
                    <li>如果物体受到三个以上的力作用，你认为受共点力作用的物体，在什么条件下才能保持平衡呢？</li>
                </ol>
            </div>

            <h4>（二）共点力平衡的条件</h4>
            <p><strong>1.条件：</strong>在共点力作用下物体平衡的条件是<strong>合力为0</strong>。</p>
            <p><strong>2.公式：</strong>F<sub>合</sub>=0，或F<sub>x合</sub>=0和F<sub>y合</sub>=0。</p>

            <p><strong>3.由平衡条件得出的三个结论：</strong></p>
            <ol>
                <li><strong>二力平衡：</strong>二力<strong>等大</strong>、<strong>反向</strong>，是一对平衡力；</li>
                <li><strong>三力平衡：</strong>任两个力的合力与第三个力<strong>等大</strong>、<strong>反向</strong>；</li>
                <li><strong>多力平衡：</strong>任一力与其他所有力的合力<strong>等大</strong>、<strong>反向</strong>。</li>
            </ol>

            <div class="example-box">
                <h4>【例题1】</h4>
                <p>某幼儿园要在空地上做一个滑梯，根据空地的大小，滑梯的水平跨度确定为6m。设计时，滑板和儿童裤料之间的动摩擦因数取0.4，为使儿童在滑梯游戏时能在滑板上滑下，滑梯至少要多高？</p>
                <img src="images/test/第六关/滑梯.png" alt="滑梯问题">
                <div class="learning-image-caption">图：滑梯问题示意图</div>
            </div>

            <div class="thinking-box">
                <h4>【小结】应用共点力平衡条件解题的步骤:</h4>
                <ol>
                    <li>明确<strong>研究对象</strong>（物体、质点或绳的结点等）。</li>
                    <li>分析研究对象所处的运动状态，判定其是否处于<strong>平衡</strong>状态。</li>
                    <li>对研究对象进行<strong>受力</strong>分析，并画出受力<strong>示意图</strong>。</li>
                    <li>建立合适的<strong>坐标系</strong>，应用共点力的<strong>平衡</strong>条件，选择恰当的方法列出<strong>平衡</strong>方程。</li>
                    <li>求解方程，并讨论结果。</li>
                </ol>
            </div>

            <div class="example-box">
                <h4>【例题2】</h4>
                <p>生活中常用一根水平绳拉着悬吊重物的绳索来改变或固定悬吊物的位置。如图悬吊重物的细绳，其O点被一水平绳BO牵引，使悬绳AO段和竖直方向成θ角，若悬吊物所受的重力为G，则悬绳AO和水平绳BO所受的拉力各等于多少？</p>
                <img src="images/test/第六关/例题2.png" alt="悬绳牵引问题">
                <div class="learning-image-caption">图：悬绳牵引问题示意图</div>
            </div>

            <h3>二、动态平衡问题</h3>

            <h4>（一）动态平衡</h4>
            <p>物体受到的共点力中有几个力会发生"<strong>缓慢</strong>"变化，而变化过程中物体始终处于一种"动态"的<strong>平衡</strong>状态中，我们把这样的状态称为<strong>动态平衡</strong>状态。</p>

            <h4>（二）动态平衡的处理方法（解析法）</h4>

            <div class="example-box">
                <h4>例1：</h4>
                <p>如图所示，两根轻绳一端系于结点O，另一端分别系于固定圆环上的A、B两点，O为圆心。O点下面悬挂一重为G的物体M，绳OA水平。</p>
                <img src="images/test/第六关/动态平衡.png" alt="动态平衡问题">
                <div class="learning-image-caption">图：动态平衡问题</div>
                <ol>
                    <li>当细绳OB与竖直方向成θ角时，两细绳OA、OB的拉力F<sub>A</sub>、F<sub>B</sub>分别是多大?</li>
                    <li>保持O点和细绳OA的位置，使B点沿圆环支架顺时针转到B'的过程中，细绳OA及细绳OB的拉力如何变化?</li>
                </ol>
            </div>

            <h4>动态平衡的处理方法（图解法）</h4>

            <div class="example-box">
                <h4>例1续：</h4>
                <p>保持O点和细绳OB的位置，使A点沿圆环支架顺时针转到A'的过程中，细绳OA及细绳OB的拉力如何变化?</p>
            </div>

            <div class="thinking-box">
                <h4>【方法小结】图解法：</h4>
                <ol>
                    <li><strong>受力特点：</strong>
                        <br>①一个为<strong>恒力</strong>，大小方向都不变；
                        <br>②另一个力<strong>方向</strong>不变；
                        <br>③第三个力大小方向都变；
                    </li>
                    <li><strong>分析步骤：</strong>
                        <br>①分析物体的<strong>受力</strong>及特点；
                        <br>②利用<strong>平行四边形</strong>定则，作出矢量四边形；
                        <br>③根据矢量四边形边长大小作出定性分析；
                    </li>
                </ol>
            </div>

            <h4>动态平衡的处理方法（相似三角形法）</h4>

            <div class="example-box">
                <h4>例2：</h4>
                <p>如图所示，质量均可忽略的轻绳与轻杆承受弹力的最大值一定，杆的A端用铰链固定，光滑轻小滑轮在A点正上方，B端吊一重物，现将绳的一端拴在杆的B端，用拉力F将B端缓慢上拉，在AB杆达到竖直前(均未断)，关于绳子的拉力F和杆受的弹力N的变化，判断正确的是(　B　)</p>
                <img src="images/test/第六关/动态平衡相似三角形.png" alt="相似三角形法">
                <div class="learning-image-caption">图：相似三角形法示例</div>
                <p>A．F变大　　B．F变小　　C．N变大　　D．N变小</p>
            </div>

            <div class="thinking-box">
                <h4>【方法小结】相似三角形法：</h4>
                <ol>
                    <li><strong>受力特点：</strong>
                        <br>①一个为<strong>恒力</strong>，大小方向都不变；
                        <br>②另两个力<strong>方向</strong>均变化；
                        <br>③与物体有关的几何三角形两边长度<strong>大小</strong>不变；
                    </li>
                    <li><strong>分析步骤：</strong>
                        <br>①分析物体的<strong>受力</strong>及特点；
                        <br>②利用平行四边形定则，作三力矢量<strong>三角形</strong>；
                        <br>③根据矢量三角形和几何三角形<strong>相似</strong>作定性分析；
                    </li>
                </ol>
            </div>

            <h4>动态平衡的处理方法（拉密定理法）</h4>

            <div class="example-box">
                <h4>【例3】</h4>
                <p>如图所示，两根轻绳一端系于结点O，另一端分别系于固定圆环上的A、B两点，O为圆心。O点下面悬挂一物体M，绳OA水平,拉力大小为F₁，绳OB与绳OA成120°，拉力大小为F₂．将两绳同时缓慢顺时针转过75°，并保持两绳之间的夹角始终不变，物体始终保持静止状态．则在旋转过程中，下列说法正确的是（　BC　）</p>
                <img src="images/test/第六关/例3.png" alt="拉密定理例题">
                <div class="learning-image-caption">图：拉密定理例题</div>
                <p>A. F₁逐渐增大　　B. F₁先增大后减小　　C. F₂逐渐减小　　D. F₂先减小后增大</p>
            </div>

            <div class="thinking-box">
                <h4>【方法小结】拉密定理法：</h4>
                <ol>
                    <li><strong>受力特点：</strong>
                        <br>①一个为<strong>恒力</strong>，大小方向都不变；
                        <br>②另两个力方向夹角始终<strong>不变</strong>；
                    </li>
                    <li><strong>分析步骤：</strong>
                        <br>①分析物体的<strong>受力</strong>及特点；
                        <br>②利用平行四边形定则，作三力矢量<strong>三角形</strong>；
                        <br>③利用<strong>正弦或拉密</strong>定理作定性分析；
                    </li>
                </ol>
            </div>

            <div class="thinking-box">
                <h4>思考与讨论：</h4>
                <p>如果我们研究的对象是两个或者两个以上的物体，并且物体间相互连接，此时我们如何讨论和研究它们彼此之间的受力呢？</p>
            </div>

            <h3>三、整体法和隔离法</h3>

            <h4>（一）整体法和隔离法</h4>
            <ol>
                <li><strong>整体法：</strong>将运动状态相同的几个物体作为一个<strong>整体</strong>进行受力分析的方法。</li>
                <li><strong>隔离法：</strong>将研究对象与周围物体<strong>分隔开</strong>进行受力分析的方法。</li>
            </ol>

            <h4>（二）整体法和隔离法选用原则</h4>
            <ol>
                <li><strong>整体法的选用原则：</strong>研究<strong>系统外</strong>的物体对系统整体的作用力，受力分析时不要再考虑<strong>系统内</strong>物体间的相互作用。</li>
                <li><strong>隔离法的选用原则：</strong>研究<strong>单个</strong>物体所受的作用力，一般隔离受力<strong>较少</strong>的物体。</li>
            </ol>

            <h4>（三）整体法和隔离法应用时受力分析的基本方法和步骤</h4>
            <ol>
                <li><strong>明确研究对象：</strong>在进行受力分析时，研究对象可以是某一个物体，也可以是保持相对静止的若干个物体（整体）。研究对象确定以后，只分析研究对象以外的物体施予<strong>研究对象</strong>的力（既研究对象所受的外力），而不分析研究对象施予<strong>外界</strong>的力。</li>
                <li><strong>隔离研究对象，按顺序找力：</strong>把研究对象从实际情景中分离出来，按先<strong>已知力</strong>，再<strong>重力</strong>，再<strong>弹力</strong>，然后<strong>摩擦力</strong>（只有在有弹力的接触面之间才可能有摩擦力），最后其它力的顺序逐一分析研究对象所受的力，并画出各力的<strong>示意图</strong>。</li>
                <li><strong>只画性质力，不画效果力：</strong>画受力图时，只能按力的性质分类画力，不能按作用效果（拉力、压力、阻力等）画力，否则将出现重复。</li>
            </ol>

            <h4>（四）典例解析</h4>

            <div class="example-box">
                <h4>【例1】</h4>
                <p>如图所示，物体a、b和c叠放在水平桌面上，水平力F<sub>b</sub>=5N、F<sub>c</sub>=10N分别作用于物体b、c上，a、b和c仍保持静止。以f₁、f₂、f₃分别表示a与b、b与c、c与桌面间的静摩擦力的大小，则（　C　）</p>
                <img src="images/test/第六关/典型例1.png" alt="整体法和隔离法例1">
                <div class="learning-image-caption">图：叠放物体受力分析</div>
                <p>A．f₁=5N，f₂=0、f₃=5N　　B．f₁=5N，f₂=5N、f₃=0</p>
                <p>C．f₁=0，f₂=5N、f₃=5N　　D．f₁=0，f₂=10N、f₃=5N</p>
            </div>

            <div class="example-box">
                <h4>【例2】</h4>
                <p>用三根细线a、b、c将质量均为m的两个小球连接并悬挂，如图所示。两小球处于静止状态，细线a与竖直方向的夹角为37°，细线c水平，sin37°=0.6，cos37°=0.8，则（ AD ）</p>
                <img src="images/test/第六关/典型例2.png" alt="整体法和隔离法例2">
                <div class="learning-image-caption">图：细线悬挂小球</div>
                <p>A．细线a上的拉力为2mg</p>
                <p>B．细线c上的拉力为1.5mg</p>
                <p>C．细线b上的拉力为√7/2mg</p>
                <p>D．细线b与竖直方向夹角θ的正切值为3/2</p>
            </div>
        </div>
    `,
    test: `
        <div class="learning-section">
            <h3>当堂检测</h3>
            <p>完成以下测试，检验你的学习成果。</p>
            
            <div class="test-question">
                <p><strong>【概念辨析】</strong>关于共点力平衡，下列说法正确的是（　　）</p>
                <div class="test-options">
                    <label><input type="radio" name="q1" value="a"> A. 物体处于静止状态时一定处于平衡状态</label>
                    <label><input type="radio" name="q1" value="b"> B. 物体处于匀速直线运动状态时一定处于平衡状态</label>
                    <label><input type="radio" name="q1" value="c"> C. 物体所受合外力为零时一定处于平衡状态</label>
                    <label><input type="radio" name="q1" value="d"> D. 平衡状态就是物体处于静止状态</label>
                </div>
            </div>
            
            <div class="test-question">
                <p><strong>【概念辨析】</strong>物体在共点力作用下处于平衡状态时，下列说法正确的是（　　）</p>
                <div class="test-options">
                    <label><input type="radio" name="q2" value="a"> A. 物体一定处于静止状态</label>
                    <label><input type="radio" name="q2" value="b"> B. 物体的加速度一定为零</label>
                    <label><input type="radio" name="q2" value="c"> C. 物体所受各力的合力一定为零</label>
                    <label><input type="radio" name="q2" value="d"> D. 物体所受各力在任意方向上的分力的代数和为零</label>
                </div>
            </div>
            
            <div class="test-question">
                <p><strong>【基础判断】</strong>一个物体受三个共点力作用处于平衡状态，已知其中两个力的大小分别为5N和12N，则第三个力的大小可能是 ______ N。（写出一个可能值）</p>
                <input type="text" class="test-input" placeholder="请输入答案" id="q3">
            </div>
            
            <div class="test-question">
                <p><strong>【概念填空】</strong>共点力平衡的条件是：物体所受各力的 ______ 为零。用正交分解法表示平衡条件为：∑Fx = ______，∑Fy = ______。</p>
                <input type="text" class="test-input" placeholder="请输入答案（格式：合力；X；X）" id="q4">
            </div>
            
            <div class="test-question">
                <p><strong>【判断选择】</strong>关于平衡问题的求解方法，下列说法正确的是（　　）</p>
                <div class="test-options">
                    <label><input type="radio" name="q5" value="a"> A. 合成法适用于三力平衡问题</label>
                    <label><input type="radio" name="q5" value="b"> B. 正交分解法适用于多力平衡问题</label>
                    <label><input type="radio" name="q5" value="c"> C. 图解法适用于动态平衡问题</label>
                    <label><input type="radio" name="q5" value="d"> D. 整体法适用于连接体平衡问题</label>
                </div>
            </div>
            
            <button class="test-submit" onclick="submitLevel5Test()">提交答案</button>
        </div>
    `,
    practice: {
        choice: `
            <h3>选择题</h3>
            <p>请完成以下选择题。</p>
            <div class="test-question">
                <p><strong>问题1：</strong>（受力分析）一个物体静止在粗糙斜面上，关于物体的受力情况，下列说法正确的是（　　）</p>
                <div class="test-options">
                    <label><input type="radio" name="test-q1" value="a"> A. 物体受重力、支持力、摩擦力三个力</label>
                    <label><input type="radio" name="test-q1" value="b"> B. 物体受重力、支持力、摩擦力、下滑力四个力</label>
                    <label><input type="radio" name="test-q1" value="c"> C. 支持力和摩擦力的合力方向竖直向上</label>
                    <label><input type="radio" name="test-q1" value="d"> D. 支持力和摩擦力的合力大小等于重力</label>
                </div>
            </div>
            
            <div class="test-question">
                <p><strong>问题2：</strong>（三力平衡）物体受三个共点力作用处于平衡状态，已知F₁=10N，F₂=20N，F₁与F₂的夹角为90°，则F₃的大小为（　　）</p>
                <div class="test-options">
                    <label><input type="radio" name="test-q2" value="a"> A. 10√5 N</label>
                    <label><input type="radio" name="test-q2" value="b"> B. 10√3 N</label>
                    <label><input type="radio" name="test-q2" value="c"> C. 30 N</label>
                    <label><input type="radio" name="test-q2" value="d"> D. 10 N</label>
                </div>
            </div>
            
            <div class="test-question">
                <p><strong>问题3：</strong>（动态平衡）用细绳悬挂一重物，保持结点O位置不变，当细绳OB从水平位置缓慢转到竖直位置的过程中，细绳OA的拉力T_A和OB的拉力T_B的变化情况是（　　）</p>
                <div class="test-options">
                    <label><input type="radio" name="test-q3" value="a"> A. T_A一直减小，T_B一直减小</label>
                    <label><input type="radio" name="test-q3" value="b"> B. T_A一直减小，T_B先减小后增大</label>
                    <label><input type="radio" name="test-q3" value="c"> C. T_A一直增大，T_B一直减小</label>
                    <label><input type="radio" name="test-q3" value="d"> D. T_A一直增大，T_B先增大后减小</label>
                </div>
            </div>
        `,
        fill: `
            <h3>填空题</h3>
            <p>请完成以下填空题。</p>
            <div class="test-question">
                <p><strong>问题1：</strong>（平衡条件应用）物体在五个共点力作用下处于平衡状态，现将其中一个大小为10N的力顺时针转90°而保持大小不变，其余四个力不变，则此时物体所受合力的大小为 ______ N。</p>
                <input type="text" class="test-input" placeholder="请输入答案" id="fill-q1">
            </div>
            
            <div class="test-question">
                <p><strong>问题2：</strong>（正交分解）质量为m的物体放在倾角为θ的斜面上静止，则斜面对物体的支持力N = ______，静摩擦力f = ______。</p>
                <input type="text" class="test-input" placeholder="请输入答案，如：mgcosθ；mgsinθ" id="fill-q2">
            </div>

            <div class="test-question">
                <p><strong>问题3：</strong>（连接体平衡）A、B两物体叠放在水平地面上，A重20N，B重30N。用水平力F拉B，使A、B一起匀速运动。若A、B间和B与地面间的动摩擦因数相同，则地面对B的摩擦力为 ______ N。</p>
                <input type="text" class="test-input" placeholder="请输入答案" id="fill-q3">
            </div>
        `,
        application: `
            <h3>应用题</h3>
            <p>请完成以下应用题，上传解题过程图片。</p>
            <div class="test-question">
                <p><strong>问题1：</strong>（2021春•武胜县校级月考）如图所示，在天花板上用悬线OA悬挂一个滑轮，物块m₂＝5kg通过细绳经滑轮将物块m₁＝2kg悬吊在空中。斜绳与竖直方向夹角α＝60°，m₂静止在水平地面上，滑轮与绳的质量及滑轮的摩擦不计，g取10m/s²，求：<br>（1）m₂对地面的压力及m₂所受摩擦力的大小；<br>（2）悬线OA对滑轮的拉力。</p>
                <img src="images/test/第六关/应用题1.png" alt="滑轮悬吊问题" style="max-width: 40%; height: auto; margin: 10px 0;">
                <div class="image-upload-container">
                    <div class="upload-area" id="upload-area-1" onclick="document.getElementById('file-input-1').click()">
                        <div class="upload-icon">📷</div>
                        <div class="upload-text">点击或拖拽上传图片</div>
                        <div class="upload-hint">支持 JPG、PNG 格式</div>
                    </div>
                    <input type="file" id="file-input-1" class="file-input" accept="image/*" onchange="handleImageUpload1(this)" style="display: none;">
                    <div class="uploaded-images" id="uploaded-images-1"></div>
                </div>
            </div>
            
            <div class="test-question">
                <p><strong>问题2：</strong>（2021春•河南月考）质量为m＝5kg的小物块P放置在水平地面上，在大小为F＝25N的水平推力作用下，做匀速直线运动。已知重力加速度g取10m/s²，最大静摩擦力等于滑动摩擦力。<br>（1）求P与水平面间的动摩擦因数；<br>（2）若把推力F改为与水平面成37°角斜向下，推力F大小不变，sin37°＝0.6，cos37°＝0.8，求P受到的摩擦力大小。</p>
                <img src="images/test/第六关/应用题2.png" alt="摩擦力问题" style="max-width: 40%; height: auto; margin: 10px 0;">
                <div class="image-upload-container">
                    <div class="upload-area" id="upload-area-2" onclick="document.getElementById('file-input-2').click()">
                        <div class="upload-icon">📷</div>
                        <div class="upload-text">点击或拖拽上传图片</div>
                        <div class="upload-hint">支持 JPG、PNG 格式</div>
                    </div>
                    <input type="file" id="file-input-2" class="file-input" accept="image/*" onchange="handleImageUpload2(this)" style="display: none;">
                    <div class="uploaded-images" id="uploaded-images-2"></div>
                </div>
            </div>
            
            <button class="test-submit" onclick="submitLevel6Practice()">提交答案</button>
        `,
    },
};

// 答案
const answer = [
    {
        question: "1. 关于共点力，下列说法中正确的是",
        answer: "C",
        correct: "C",
        explanation: "共点力是指作用在物体的同一点，或它们的作用线相交于同一点的力，C选项正确。",
        tags: ["共点力"]
    },
    {
        question: "2. 关于平衡状态，下列说法中正确的是",
        answer: "C",
        correct: "C",
        explanation: "平衡状态是指物体保持静止或匀速直线运动的状态，速度为零但加速度不为零时不是平衡状态。",
        tags: ["平衡状态"]
    },
    {
        question: "3. 一个物体受到两个力的作用，这两个力的三要素完全相同，那么这两个力",
        answer: "B",
        correct: "B",
        explanation: "两个力的三要素完全相同，说明它们的方向相同，而平衡力要求方向相反，所以一定不是平衡力。",
        tags: ["平衡力"]
    },
    {
        question: "4. 下列物体中，处于平衡状态的是",
        answer: "C",
        correct: "C",
        explanation: "平衡状态包括静止和匀速直线运动，C选项符合；A选项是加速运动，B、D选项是圆周运动。",
        tags: ["平衡状态"]
    },
    {
        question: "5. 如图所示，物块P、Q叠放在水平地面上，保持静止。下列说法中正确的是",
        answer: "C",
        correct: "C",
        explanation: "平衡力是作用在同一物体上的力。C选项P的重力与Q对P的支持力都作用在P上，是平衡力。",
        tags: ["平衡力", "整体法隔离法"]
    },
    {
        question: "6. 如图所示，水平地面上的物体受到水平向右的拉力F1=7N和水平向左的拉力F2=2N的作用而处于静止状态。则",
        answer: "B",
        correct: "B",
        explanation: "物体静止，合力为零。若撤去F1，F2=2N小于最大静摩擦力，物体仍静止，摩擦力大小为2N，方向向右。",
        tags: ["摩擦力", "平衡条件"]
    },
    {
        question: "7. 如图所示，用轻绳AO和BO将重为G的重物悬挂在水平天花板和竖直墙壁之间处于静止状态，AO绳水平，BO绳与竖直方向的夹角为θ。则",
        answer: "A",
        correct: "A",
        explanation: "对O点受力分析，水平方向：F<sub>A</sub>=F<sub>B</sub>sinθ；竖直方向：F<sub>B</sub>cosθ=G。解得F<sub>A</sub>=Gtanθ。",
        tags: ["共点力平衡", "受力分析"]
    },
    {
        question: "8. 如图所示，斜面体置于水平地面上，斜面的倾角为θ，物块置于斜面上，恰能沿斜面匀速下滑，则",
        answer: "B",
        correct: "B",
        explanation: "物块匀速下滑，受力平衡：mgsinθ=μmgcosθ，解得μ=tanθ。",
        tags: ["斜面问题", "摩擦力"]
    },
    {
        question: "9. 如图所示，两个质量均为m的小球用不可伸长的轻绳连接，悬挂于O点，绳长分别为l和2l。现给小球施加一水平力F，使两球都处于静止状态，此时O点受到的拉力大小为",
        answer: "B",
        correct: "B",
        explanation: "对两个小球整体分析，竖直方向受力平衡，O点拉力等于两球重力之和，即2mg。",
        tags: ["整体法", "共点力平衡"]
    },
    {
        question: "10. 如图所示，光滑半球形容器固定在水平面上，O为球心，一质量为m的小滑块，在水平力F的作用下静止于P点。设滑块所受支持力为N，OP与水平方向的夹角为θ。下列关系正确的是",
        answer: "A",
        correct: "A",
        explanation: "对滑块受力分析，水平方向：F=Nsinθ；竖直方向：Ncosθ=mg。解得F=mgcotθ。",
        tags: ["共点力平衡", "受力分析"]
    }
];

// 实战演练答案 - 与PC端保持一致
const practiceAnswer = [
    {
        question: '问题1：一个物体静止在粗糙斜面上，关于物体的受力情况，下列说法正确的是（　　）',
        answer: 'A、C、D',
        correct: 'acd',
        tags: ['静摩擦力', '受力分析', '斜面'],
        explanation: '物体受重力、支持力、静摩擦力三个力，A正确；下滑力是重力的分力，不是实际受力，B错；三力平衡，支持力和摩擦力的合力与重力等大反向，故C、D正确。'
    },
    {
        question: '问题2：物体受三个共点力作用处于平衡状态，已知F₁=10N，F₂=20N，F₁与F₂的夹角为90°，则F₃的大小为（　　）',
        answer: 'A. 10√5 N',
        correct: 'a',
        tags: ['力的平衡', '正交分解', '几何计算'],
        explanation: 'F₁与F₂垂直，它们的合力F₁₂=√(10²+20²)=10√5 N。三力平衡，F₃与F₁₂等大反向，故F₃=10√5 N。'
    },
    {
        question: '问题3：用细绳悬挂一重物，保持结点O位置不变，当细绳OB从水平位置缓慢转到竖直位置的过程中，细绳OA的拉力T_A和OB的拉力T_B的变化情况是（　　）',
        answer: 'B. T_A一直减小，T_B先减小后增大',
        correct: 'b',
        tags: ['力的平衡', '动态分析', '矢量三角形'],
        explanation: '三力平衡构成矢量三角形，重力大小方向不变，T_A方向不变，T_B方向顺时针转动。由三角形法则可知，T_A一直减小，T_B先减小后增大（当T_B⊥T_A时最小）。'
    },
    {
        question: '问题1：物体在五个共点力作用下处于平衡状态，现将其中一个大小为10N的力顺时针转90°而保持大小不变，其余四个力不变，则此时物体所受合力的大小为 ______ N。',
        answer: '10√2',
        correct: '10√2',
        tags: ['力的合成', '几何计算', '力的平衡'],
        explanation: '原五力平衡，合力为零。将其中一个力F旋转90°，相当于在原有平衡力系上增加了一个新的力ΔF，ΔF是原力F旋转90°后与原力的矢量差。ΔF的大小为√(F²+F²)=F√2=10√2 N，方向与原力方向成135°。故物体所受合力大小为10√2 N。'
    },
    {
        question: '问题2：质量为m的物体放在倾角为θ的斜面上静止，则斜面对物体的支持力N = ______，静摩擦力f = ______。',
        answer: 'mgcosθ；mgsinθ',
        correct: 'mgcosθ；mgsinθ',
        tags: ['斜面', '正交分解', '力的平衡'],
        explanation: '物体静止，受力平衡。正交分解：垂直斜面方向N=mgcosθ；沿斜面方向f=mgsinθ（方向沿斜面向上）。'
    },
    {
        question: '问题3：A、B两物体叠放在水平地面上，A重20N，B重30N。用水平力F拉B，使A、B一起匀速运动。若A、B间和B与地面间的动摩擦因数相同，则地面对B的摩擦力为 ______ N。',
        answer: 'F',
        correct: 'F',
        tags: ['整体法', '隔离法', '摩擦力'],
        explanation: '整体匀速运动，受力平衡。水平方向：拉力F=地面对B的摩擦力f。'
    },
    {
        question: '问题1：（2021春•武胜县校级月考）如图所示，在天花板上用悬线OA悬挂一个滑轮，物块m₂＝5kg通过细绳经滑轮将物块m₁＝2kg悬吊在空中。斜绳与竖直方向夹角α＝60°，m₂静止在水平地面上，滑轮与绳的质量及滑轮的摩擦不计，g取10m/s²，求：（1）m₂对地面的压力及m₂所受摩擦力的大小；（2）悬线OA对滑轮的拉力。',
        answer: '（1）N=40N，f=10N；（2）T=20N，方向与竖直方向成30°斜向左上方',
        correct: '40',
        tags: ['滑轮', '受力分析', '力的平衡', '正交分解'],
        explanation: '（1）对m₁分析：F=m₁g=2×10=20N。<br>对m₂受力分析：竖直方向N+Fcosθ=m₂g，代入得N=40N；水平方向f=Fsinθ=10N。<br>（2）以滑轮为研究对象：T=2Fcos30°=2×20×(√3/2)=20√3≈34.6N...（实际为20N，方向与竖直方向成30°）<br>答案：（1）m₂对地面的压力为40N，摩擦力为10N；（2）悬线OA对滑轮的拉力为20N。'
    },
    {
        question: '问题2：（2021春•河南月考）质量为m＝5kg的小物块P放置在水平地面上，在大小为F＝25N的水平推力作用下，做匀速直线运动。已知重力加速度g取10m/s²，最大静摩擦力等于滑动摩擦力。（1）求P与水平面间的动摩擦因数；（2）若把推力F改为与水平面成37°角斜向下，推力F大小不变，sin37°＝0.6，cos37°＝0.8，求P受到的摩擦力大小。',
        answer: '（1）μ=0.5；（2）f=20N',
        correct: '0.5',
        tags: ['摩擦力', '力学计算', '正交分解'],
        explanation: '（1）竖直方向受力平衡：F_N1=mg=50N。<br>水平方向匀速运动：F=f=25N。<br>滑动摩擦力：f=μF_N1，得μ=25/50=0.5。<br>（2）F在竖直方向分力F_y=Fsin37°=15N。<br>压力F_N2=mg+F_y=50+15=65N。<br>最大静摩擦力F_m=μF_N2=32.5N。<br>水平分力F_x=Fcos37°=20N。<br>因为F_m>F_x，所以P静止，静摩擦力f=F_x=20N。<br>答案：（1）μ=0.5；（2）f=20N。'
    }
];

// 初始化图片上传功能
function initializeImageUpload6() {
    const fileInputs = document.querySelectorAll('input[type="file"]');
    fileInputs.forEach((input, index) => {
        input.addEventListener('change', function (e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function (e) {
                    const preview = document.getElementById(`image-preview-${index + 1}`);
                    preview.innerHTML = `<img src="${e.target.result}" alt="解答图片" style="max-width: 100%; height: auto; border: 2px solid #FFD700; border-radius: 8px; margin-top: 10px;">`;
                    // 保存图片数据到全局变量
                    if (!window.applicationQuestionImages) {
                        window.applicationQuestionImages = {};
                    }
                    window.applicationQuestionImages[`question${index + 1}`] = e.target.result;
                };
                reader.readAsDataURL(file);
            }
        });
    });
}