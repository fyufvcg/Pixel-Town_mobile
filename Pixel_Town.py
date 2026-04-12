# ==========================================
# Pixel-Town 完整后端代码
# 新增功能：用户头像 + 活跃度热力图 + 自动统计
# 适配数据库：7个独立INT关卡分数字段
# 前端兼容：返回格式完全不变
# ==========================================

import os
import json
import hashlib
import pymysql
from datetime import datetime
from flask import Flask, request, jsonify
from flask_cors import CORS

# 初始化Flask应用
app = Flask(__name__)
CORS(app, supports_credentials=True)

# ==========================================
# 数据库连接配置
# ==========================================
def get_db_connection():
    try:
        connection = pymysql.connect(
            host='localhost',
            user='app_user',
            password='Liufuqiang3300!',
            database='Pixel_Town',
            charset='utf8mb4',
            cursorclass=pymysql.cursors.DictCursor
        )
        return connection
    except Exception as e:
        print(f"❌ 数据库连接失败：{str(e)}")
        return None

# ==========================================
# 密码加密
# ==========================================
def hash_password(password):
    return hashlib.sha256(password.encode('utf-8')).hexdigest()

# ==========================================
# 【新增核心】活跃度自动统计工具函数
# ==========================================
def update_user_daily_activity(user_id, play_seconds=0, is_login=False):
    conn = get_db_connection()
    if not conn:
        print(f"❌ 活跃度统计失败：数据库连接失败 user_id={user_id}")
        return
    cursor = conn.cursor()

    try:
        sql = """
            INSERT INTO user_daily_activity 
            (user_id, activity_date, play_seconds, login_count, operate_count)
            VALUES (%s, CURDATE(), %s, %s, 1)
            ON DUPLICATE KEY UPDATE
                play_seconds = play_seconds + VALUES(play_seconds),
                login_count = login_count + VALUES(login_count),
                operate_count = operate_count + 1,
                updated_at = NOW()
        """
        login_add = 1 if is_login else 0
        cursor.execute(sql, (user_id, play_seconds, login_add))
        conn.commit()
        print(f"✅ 用户{user_id}当日活跃度更新成功")
    except Exception as e:
        conn.rollback()
        print(f"❌ 活跃度统计失败：{str(e)}")
    finally:
        cursor.close()
        conn.close()

# ==========================================
# 根路径接口
# ==========================================
@app.route('/', methods=['GET'])
def index():
    return jsonify({
        "status": "success",
        "message": "Pixel-Town后端服务启动成功！",
        "docs": "注册/登录/进度/笔记/标签/排行榜/头像/活跃度"
    })

# ==========================================
# 注册接口
# ==========================================
@app.route('/register', methods=['POST'])
def register():
    if not request.is_json:
        return jsonify({"status": "error", "message": "请用JSON格式发送数据！"}), 400
    
    data = request.json
    username = data.get('username')
    password = data.get('password')
    email = data.get('email', None)

    if not username or not password:
        return jsonify({"status": "error", "message": "用户名和密码不能为空！"}), 400

    conn = get_db_connection()
    if not conn:
        return jsonify({"status": "error", "message": "数据库连接失败！"}), 500
    cursor = conn.cursor()

    try:
        encrypted_pw = hash_password(password)
        sql = "INSERT INTO users (username, password_hash, email) VALUES (%s, %s, %s)"
        cursor.execute(sql, (username, encrypted_pw, email))
        conn.commit()
        new_user_id = cursor.lastrowid
        print(f"✅ 新用户注册成功，user_id: {new_user_id}")
        return jsonify({"status": "success", "message": "注册成功！", "user_id": new_user_id})
    except pymysql.err.IntegrityError:
        return jsonify({"status": "error", "message": "用户名已被注册！"}), 400
    except Exception as e:
        conn.rollback()
        return jsonify({"status": "error", "message": f"出错了：{str(e)}"}), 500
    finally:
        cursor.close()
        conn.close()

# ==========================================
# 登录接口（自动统计活跃度）
# ==========================================
@app.route('/login', methods=['POST'])
def login():
    if not request.is_json:
        return jsonify({"status": "error", "message": "请用JSON格式发送数据！"}), 400
    
    data = request.json
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({"status": "error", "message": "请输入用户名和密码！"}), 400

    conn = get_db_connection()
    if not conn:
        return jsonify({"status": "error", "message": "数据库连接失败！"}), 500
    cursor = conn.cursor()

    try:
        sql = "SELECT * FROM users WHERE username = %s"
        cursor.execute(sql, (username,))
        user = cursor.fetchone()
        if user:
            if user['password_hash'] == hash_password(password):
                user_id = user['user_id']
                
                cursor.execute("UPDATE users SET updated_at = NOW() WHERE user_id = %s", (user_id,))
                cursor.execute("""
                    INSERT INTO game_progress (user_id, last_login_time) 
                    VALUES (%s, NOW())
                    ON DUPLICATE KEY UPDATE last_login_time = NOW()
                """, (user_id,))
                conn.commit()

                # ========== 登录自动统计活跃度 ==========
                update_user_daily_activity(user_id, is_login=True)

                print(f"✅ 用户登录成功，user_id: {user_id}")
                return jsonify({"status": "success", "message": "登录成功！", "user_id": user_id})
            else:
                return jsonify({"status": "error", "message": "密码错误！"}), 401
        else:
            return jsonify({"status": "error", "message": "用户不存在！"}), 404
    except Exception as e:
        conn.rollback()
        return jsonify({"status": "error", "message": f"出错了：{str(e)}"}), 500
    finally:
        cursor.close()
        conn.close()

# ==========================================
# 注销账号
# ==========================================
@app.route('/delete_user', methods=['DELETE'])
def delete_user():
    data = request.json
    user_id = data.get('user_id')
    if not user_id:
        return jsonify({"status": "error", "message": "请提供用户ID！"}), 400
    try:
        user_id = int(user_id)
    except ValueError:
        return jsonify({"status": "error", "message": "用户ID必须是数字！"}), 400

    conn = get_db_connection()
    if not conn:
        return jsonify({"status": "error", "message": "数据库连接失败！"}), 500
    cursor = conn.cursor()

    try:
        sql = "DELETE FROM users WHERE user_id = %s"
        cursor.execute(sql, (user_id,))
        conn.commit()
        if cursor.rowcount > 0:
            return jsonify({"status": "success", "message": "账号已注销！"})
        else:
            return jsonify({"status": "error", "message": "用户不存在！"}), 404
    except Exception as e:
        conn.rollback()
        return jsonify({"status": "error", "message": str(e)}), 500
    finally:
        cursor.close()
        conn.close()
# ==========================================
# 修改密码接口（完全匹配前端调用）
# ==========================================
@app.route('/change_password', methods=['POST'])
def change_password():
    if not request.is_json:
        return jsonify({"status": "error", "message": "请用JSON格式发送数据！"}), 400
    
    data = request.json
    user_id = data.get('user_id')
    old_password = data.get('old_password')
    new_password = data.get('new_password')

    # 1. 基础参数非空校验
    if not user_id or not old_password or not new_password:
        return jsonify({"status": "error", "message": "用户ID、原密码、新密码不能为空！"}), 400
    try:
        user_id = int(user_id)
    except ValueError:
        return jsonify({"status": "error", "message": "用户ID必须是数字！"}), 400

    # 2. 新密码规则后端二次校验（和前端规则一致，防止绕过前端校验）
    import re
    password_regex = r'^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$'
    if not re.match(password_regex, new_password):
        return jsonify({"status": "error", "message": "新密码不符合规则！需至少8位，包含大写字母、小写字母和数字"}), 400

    # 3. 安全校验：新密码不能和原密码相同
    if old_password.strip() == new_password.strip():
        return jsonify({"status": "error", "message": "新密码不能和原密码相同！"}), 400

    # 4. 数据库校验：用户是否存在、原密码是否正确
    conn = get_db_connection()
    if not conn:
        return jsonify({"status": "error", "message": "数据库连接失败！"}), 500
    cursor = conn.cursor()

    try:
        # 查询用户的密码哈希
        cursor.execute("SELECT user_id, password_hash FROM users WHERE user_id = %s", (user_id,))
        user = cursor.fetchone()

        # 用户不存在
        if not user:
            return jsonify({"status": "error", "message": "用户不存在！"}), 404

        # 原密码校验（和登录用同一套加密逻辑，保证一致性）
        old_password_hash = hash_password(old_password)
        if user['password_hash'] != old_password_hash:
            print(f"❌ 用户{user_id}修改密码失败：原密码错误")
            return jsonify({"status": "error", "message": "原密码错误！"}), 401

        # 5. 加密新密码，更新到数据库
        new_password_hash = hash_password(new_password)
        cursor.execute(
            "UPDATE users SET password_hash = %s, updated_at = NOW() WHERE user_id = %s",
            (new_password_hash, user_id)
        )
        conn.commit()

        print(f"✅ 用户{user_id}密码修改成功")
        return jsonify({
            "status": "success",
            "message": "密码修改成功！请使用新密码重新登录"
        })

    except Exception as e:
        conn.rollback()
        print(f"❌ 修改密码失败：{str(e)}")
        return jsonify({"status": "error", "message": f"修改失败：{str(e)}"}), 500
    finally:
        cursor.close()
        conn.close()
# ==========================================
# 【新增】更新用户头像接口
# ==========================================
@app.route('/update_user_avatar', methods=['POST'])
def update_user_avatar():
    if not request.is_json:
        return jsonify({"status": "error", "message": "请用JSON格式发送数据！"}), 400
    
    data = request.json
    user_id = data.get('user_id')
    avatar_url = data.get('avatar_url')

    if not user_id or not avatar_url:
        return jsonify({"status": "error", "message": "用户ID和头像URL不能为空！"}), 400
    try:
        user_id = int(user_id)
    except ValueError:
        return jsonify({"status": "error", "message": "用户ID必须是数字！"}), 400

    conn = get_db_connection()
    if not conn:
        return jsonify({"status": "error", "message": "数据库连接失败！"}), 500
    cursor = conn.cursor()

    try:
        sql = "UPDATE users SET avatar = %s, updated_at = NOW() WHERE user_id = %s"
        cursor.execute(sql, (avatar_url, user_id))
        conn.commit()
        
        if cursor.rowcount > 0:
            return jsonify({"status": "success", "message": "头像更新成功！", "avatar_url": avatar_url})
        else:
            return jsonify({"status": "error", "message": "用户不存在！"}), 404
    except Exception as e:
        conn.rollback()
        return jsonify({"status": "error", "message": f"更新失败：{str(e)}"}), 500
    finally:
        cursor.close()
        conn.close()

# ==========================================
# 学习笔记 4个接口
# ==========================================
@app.route('/get_notes', methods=['GET'])
def get_notes():
    user_id = request.args.get('user_id')
    if not user_id:
        return jsonify({"status": "error", "message": "请提供用户ID！"}), 400
    try:
        user_id = int(user_id)
    except ValueError:
        return jsonify({"status": "error", "message": "用户ID必须是数字！"}), 400

    conn = get_db_connection()
    if not conn:
        return jsonify({"status": "error", "message": "数据库连接失败！"}), 500
    cursor = conn.cursor()

    try:
        sql = "SELECT * FROM study_notes WHERE user_id = %s ORDER BY updated_at DESC"
        cursor.execute(sql, (user_id,))
        notes = cursor.fetchall()
        return jsonify({"status": "success", "data": notes})
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500
    finally:
        cursor.close()
        conn.close()

@app.route('/add_note', methods=['POST'])
def add_note():
    if not request.is_json:
        return jsonify({"status": "error", "message": "请用JSON格式发送数据！"}), 400
    
    data = request.json
    user_id = data.get('user_id')
    title = data.get('note_title')
    content = data.get('note_content')

    if not user_id or not title:
        return jsonify({"status": "error", "message": "用户ID和标题不能为空！"}), 400
    try:
        user_id = int(user_id)
    except ValueError:
        return jsonify({"status": "error", "message": "用户ID必须是数字！"}), 400

    conn = get_db_connection()
    if not conn:
        return jsonify({"status": "error", "message": "数据库连接失败！"}), 500
    cursor = conn.cursor()

    try:
        sql = "INSERT INTO study_notes (user_id, note_title, note_content) VALUES (%s, %s, %s)"
        cursor.execute(sql, (user_id, title, content))
        conn.commit()
        return jsonify({"status": "success", "message": "笔记保存成功！", "note_id": cursor.lastrowid})
    except Exception as e:
        conn.rollback()
        return jsonify({"status": "error", "message": str(e)}), 500
    finally:
        cursor.close()
        conn.close()

@app.route('/update_note', methods=['PUT'])
def update_note():
    if not request.is_json:
        return jsonify({"status": "error", "message": "请用JSON格式发送数据！"}), 400
    
    data = request.json
    note_id = data.get('note_id')
    new_title = data.get('note_title')
    new_content = data.get('note_content')

    if not note_id:
        return jsonify({"status": "error", "message": "请提供笔记ID！"}), 400
    try:
        note_id = int(note_id)
    except ValueError:
        return jsonify({"status": "error", "message": "笔记ID必须是数字！"}), 400

    conn = get_db_connection()
    if not conn:
        return jsonify({"status": "error", "message": "数据库连接失败！"}), 500
    cursor = conn.cursor()

    try:
        sql = "UPDATE study_notes SET note_title = %s, note_content = %s WHERE note_id = %s"
        cursor.execute(sql, (new_title, new_content, note_id))
        conn.commit()
        if cursor.rowcount > 0:
            return jsonify({"status": "success", "message": "笔记修改成功！"})
        else:
            return jsonify({"status": "error", "message": "笔记不存在！"}), 404
    except Exception as e:
        conn.rollback()
        return jsonify({"status": "error", "message": str(e)}), 500
    finally:
        cursor.close()
        conn.close()

@app.route('/delete_note', methods=['DELETE'])
def delete_note():
    data = request.json
    note_id = data.get('note_id')
    if not note_id:
        return jsonify({"status": "error", "message": "请提供笔记ID！"}), 400
    try:
        note_id = int(note_id)
    except ValueError:
        return jsonify({"status": "error", "message": "笔记ID必须是数字！"}), 400

    conn = get_db_connection()
    if not conn:
        return jsonify({"status": "error", "message": "数据库连接失败！"}), 500
    cursor = conn.cursor()

    try:
        sql = "DELETE FROM study_notes WHERE note_id = %s"
        cursor.execute(sql, (note_id,))
        conn.commit()
        if cursor.rowcount > 0:
            return jsonify({"status": "success", "message": "笔记删除成功！"})
        else:
            return jsonify({"status": "error", "message": "笔记不存在！"}), 404
    except Exception as e:
        conn.rollback()
        return jsonify({"status": "error", "message": str(e)}), 500
    finally:
        cursor.close()
        conn.close()

# ==========================================
# 游戏进度接口
# ==========================================
@app.route('/get_progress', methods=['GET'])
def get_progress():
    user_id = request.args.get('user_id')
    if not user_id:
        return jsonify({"status": "error", "message": "请提供用户ID！"}), 400
    try:
        user_id = int(user_id)
    except ValueError:
        return jsonify({"status": "error", "message": "用户ID必须是数字！"}), 400

    conn = get_db_connection()
    if not conn:
        return jsonify({"status": "error", "message": "数据库连接失败！"}), 500
    cursor = conn.cursor()

    try:
        sql = """
            SELECT progress_id, gp.user_id, game_level, game_score,
                   level1_score, level2_score, level3_score,
                   level4_score, level5_score, level6_score, level7_score,
                   inventory_data, achievements_data, syllabus_progress,
                   last_play_time, first_unlock_time, total_play_time, last_login_time,
                   u.avatar
            FROM game_progress gp
            LEFT JOIN users u ON gp.user_id = u.user_id
            WHERE gp.user_id = %s
        """
        cursor.execute(sql, (user_id,))
        progress = cursor.fetchone()
        
        if progress:
            level_scores_dict = {
                "level_1": progress['level1_score'],
                "level_2": progress['level2_score'],
                "level_3": progress['level3_score'],
                "level_4": progress['level4_score'],
                "level_5": progress['level5_score'],
                "level_6": progress['level6_score'],
                "level_7": progress['level7_score']
            }
            progress['level_scores'] = json.dumps(level_scores_dict, ensure_ascii=False)
            
            return jsonify({"status": "success", "message": "获取进度成功", "data": progress})
        else:
            default_progress = {
                "user_id": user_id, "game_level": 1, "game_score": 0,
                "level_scores": json.dumps({"level_1":0,"level_2":0,"level_3":0,"level_4":0,"level_5":0,"level_6":0,"level_7":0}),
                "inventory_data": None, "achievements_data": None, "syllabus_progress": None,
                "last_play_time": None, "first_unlock_time": None, "total_play_time": 0, "last_login_time": None,
                "avatar": None
            }
            return jsonify({"status": "success", "message": "默认进度", "data": default_progress})
    except Exception as e:
        return jsonify({"status": "error", "message": f"获取失败：{str(e)}"}), 500
    finally:
        cursor.close()
        conn.close()

@app.route('/update_progress', methods=['POST'])
def update_progress():
    if not request.is_json:
        return jsonify({"status": "error", "message": "请用JSON格式发送数据！"}), 400
    
    data = request.json
    user_id = data.get('user_id')
    new_level = int(data.get('game_level', 1))
    level_scores_input = data.get('level_scores', None)
    inventory = data.get('inventory_data', None)
    achievements = data.get('achievements_data', None)
    syllabus_progress = data.get('syllabus_progress', None)
    add_play_time = int(data.get('add_play_time', 0))

    print(f"🔔 update_progress 接口收到: user_id={user_id}, add_play_time={add_play_time}")

    # 空值过滤：前端传空/""/"null" 都视为None，避免覆盖原有数据
    def filter_empty(val):
        if val is None or val == "" or val == "null":
            return None
        return val
    inventory = filter_empty(inventory)
    achievements = filter_empty(achievements)
    syllabus_progress = filter_empty(syllabus_progress)

    # 校验user_id
    if not user_id:
        return jsonify({"status": "error", "message": "请提供用户ID！"}), 400
    try:
        user_id = int(user_id)
    except ValueError:
        return jsonify({"status": "error", "message": "用户ID必须是数字！"}), 400

    # 解析前端传的关卡分数，没有传则默认0（不会覆盖数据库里的旧分数）
    level1 = level2 = level3 = level4 = level5 = level6 = level7 = 0
    if level_scores_input:
        try:
            # 兼容处理：可能是字符串也可能是对象
            if isinstance(level_scores_input, str):
                level_scores_dict = json.loads(level_scores_input)
            else:
                level_scores_dict = level_scores_input
            
            # 提取每一关的分数，没有则默认0
            level1 = int(level_scores_dict.get('level_1', 0))
            level2 = int(level_scores_dict.get('level_2', 0))
            level3 = int(level_scores_dict.get('level_3', 0))
            level4 = int(level_scores_dict.get('level_4', 0))
            level5 = int(level_scores_dict.get('level_5', 0))
            level6 = int(level_scores_dict.get('level_6', 0))
            level7 = int(level_scores_dict.get('level_7', 0))
        except Exception as e:
            print(f"⚠️ 解析关卡分数失败：{str(e)}，使用默认0")
    
    conn = get_db_connection()
    if not conn:
        return jsonify({"status": "error", "message": "数据库连接失败！"}), 500
    cursor = conn.cursor()
    try:
        # ✅ 修复核心：SQL里game_score用7个关卡的最高分总和自动计算，彻底避免前端传错
        cursor.execute("SELECT game_level FROM game_progress WHERE user_id = %s", (user_id,))
        current_db_level = cursor.fetchone()
        if current_db_level:
            current_db_level = current_db_level['game_level']
            # 核心逻辑：如果前端传的关卡 < 数据库里的关卡，直接拒绝更新，用数据库里的关卡
            if new_level < current_db_level:
                print(f"⚠️  防倒退触发：前端传了{new_level}，数据库里是{current_db_level}，拒绝倒退")
                new_level = current_db_level  # 强制用数据库里的高关卡        
        sql = """
            INSERT INTO game_progress 
            (user_id, game_level, game_score, 
             level1_score, level2_score, level3_score, level4_score, level5_score, level6_score, level7_score,
             inventory_data, achievements_data, syllabus_progress, 
             first_unlock_time, total_play_time) 
            VALUES (%s, %s, 
                    -- 插入时用传入的分数总和
                    %s, 
                    %s, %s, %s, %s, %s, %s, %s, 
                    %s, %s, %s, 
                    IF(%s > 1, NOW(), NULL), %s)
            ON DUPLICATE KEY UPDATE
                game_level = VALUES(game_level),
                -- ✅ 核心修复：game_score永远用7个关卡的最高分总和计算，不依赖前端传值
                game_score = GREATEST(level1_score, VALUES(level1_score)) 
                            + GREATEST(level2_score, VALUES(level2_score))
                            + GREATEST(level3_score, VALUES(level3_score))
                            + GREATEST(level4_score, VALUES(level4_score))
                            + GREATEST(level5_score, VALUES(level5_score))
                            + GREATEST(level6_score, VALUES(level6_score))
                            + GREATEST(level7_score, VALUES(level7_score)),
                -- 关卡分数保留最高分，不被覆盖
                level1_score = GREATEST(level1_score, VALUES(level1_score)),
                level2_score = GREATEST(level2_score, VALUES(level2_score)),
                level3_score = GREATEST(level3_score, VALUES(level3_score)),
                level4_score = GREATEST(level4_score, VALUES(level4_score)),
                level5_score = GREATEST(level5_score, VALUES(level5_score)),
                level6_score = GREATEST(level6_score, VALUES(level6_score)),
                level7_score = GREATEST(level7_score, VALUES(level7_score)),
                -- ✅ 修复：成就/库存/大纲进度 非空才更新，避免被清空
                inventory_data = IF(VALUES(inventory_data) IS NOT NULL, VALUES(inventory_data), inventory_data),
                achievements_data = IF(VALUES(achievements_data) IS NOT NULL, VALUES(achievements_data), achievements_data),
                syllabus_progress = IF(VALUES(syllabus_progress) IS NOT NULL, VALUES(syllabus_progress), syllabus_progress),
                first_unlock_time = IF(VALUES(game_level) > game_level AND first_unlock_time IS NULL, NOW(), first_unlock_time),
                total_play_time = total_play_time + VALUES(total_play_time),
                last_play_time = NOW()
        """
        # 计算插入时的总分（兜底用）
        insert_total_score = level1 + level2 + level3 + level4 + level5 + level6 + level7
        cursor.execute(sql, (
            user_id, new_level, insert_total_score,
            level1, level2, level3, level4, level5, level6, level7,
            inventory, achievements, syllabus_progress, new_level, add_play_time
        ))
        conn.commit()

        # ========== 保存进度自动统计活跃度 ==========
        update_user_daily_activity(user_id, play_seconds=add_play_time)

        # 写入后立刻查询验证，返回给前端
        cursor.execute("""
            SELECT game_level, game_score, level1_score, level2_score, level3_score,
                   level4_score, level5_score, level6_score, level7_score, total_play_time 
            FROM game_progress WHERE user_id = %s
        """, (user_id,))
        final_data = cursor.fetchone()
        
        # 组装返回给前端的level_scores
        if final_data:
            final_data['level_scores'] = json.dumps({
                "level_1": final_data['level1_score'], "level_2": final_data['level2_score'],
                "level_3": final_data['level3_score'], "level_4": final_data['level4_score'],
                "level_5": final_data['level5_score'], "level_6": final_data['level6_score'],
                "level_7": final_data['level7_score']
            }, ensure_ascii=False)
        
        print(f"✅ 进度保存成功，最终game_score: {final_data['game_score']}")
        return jsonify({
            "status": "success", 
            "message": "游戏进度已保存！",
            "data": final_data
        })
    except Exception as e:
        conn.rollback()
        import traceback
        error_detail = traceback.format_exc()
        print(f"❌ 数据库操作异常：{error_detail}")
        return jsonify({"status": "error", "message": f"更新进度失败：{str(e)}", "detail": error_detail}), 500
    finally:
        cursor.close()
        conn.close()
# ==========================================
# 排行榜接口（显示头像，无报错）
# ==========================================
@app.route('/get_leaderboard', methods=['GET'])
def get_leaderboard():
    limit = int(request.args.get('limit', 100))

    conn = get_db_connection()
    if not conn:
        return jsonify({"status": "error", "message": "数据库连接失败！"}), 500
    cursor = conn.cursor(pymysql.cursors.DictCursor)

    try:
        sql = """
            SELECT 
                u.user_id, u.username, u.avatar,
                p.game_level, p.game_score,
                ROW_NUMBER() OVER (ORDER BY p.game_score DESC, p.game_level DESC) as user_rank
            FROM game_progress p
            LEFT JOIN users u ON p.user_id = u.user_id
            ORDER BY p.game_score DESC, p.game_level DESC
            LIMIT %s
        """
        cursor.execute(sql, (limit,))
        leaderboard_data = cursor.fetchall()
        
        return jsonify({
            "status": "success",
            "message": "获取排行榜成功",
            "data": leaderboard_data
        })
    except Exception as e:
        print(f"❌ 排行榜报错：{str(e)}")
        return jsonify({"status": "error", "message": f"获取失败：{str(e)}"}), 500
    finally:
        cursor.close()
        conn.close()

# ==========================================
# 【新增】活跃度热力图接口
# ==========================================
@app.route('/get_user_activity', methods=['GET'])
def get_user_activity():
    user_id = request.args.get('user_id')
    year = request.args.get('year', datetime.now().year)

    if not user_id:
        return jsonify({"status": "error", "message": "请提供用户ID！"}), 400
    try:
        user_id = int(user_id)
        year = int(year)
    except ValueError:
        return jsonify({"status": "error", "message": "参数格式错误！"}), 400

    conn = get_db_connection()
    if not conn:
        return jsonify({"status": "error", "message": "数据库连接失败！"}), 500
    cursor = conn.cursor(pymysql.cursors.DictCursor)

    try:
        sql = """
            SELECT 
                activity_date, play_seconds, login_count, operate_count,
                (play_seconds / 60 + login_count * 10 + operate_count * 5) as activity_value
            FROM user_daily_activity 
            WHERE user_id = %s AND YEAR(activity_date) = %s
            ORDER BY activity_date ASC
        """
        cursor.execute(sql, (user_id, year))
        activity_data = cursor.fetchall()

        for item in activity_data:
            item['activity_date'] = item['activity_date'].strftime('%Y-%m-%d')
        
        return jsonify({
            "status": "success",
            "year": year,
            "data": activity_data
        })
    except Exception as e:
        return jsonify({"status": "error", "message": f"获取失败：{str(e)}"}), 500
    finally:
        cursor.close()
        conn.close()

# ==========================================
# 错题标签 3个接口
# ==========================================
@app.route('/add_tag_wrong', methods=['POST'])
def add_tag_wrong():
    if not request.is_json:
        return jsonify({"status": "error", "message": "请用JSON格式发送数据！"}), 400
    
    data = request.get_json()
    user_id = data.get('user_id')
    tag_name = data.get('tag_name')
    
    if not user_id or not tag_name:
        return jsonify({"status": "error", "message": "用户ID和标签名不能为空！"}), 400
    
    try:
        user_id = int(user_id)
        tag_name = tag_name.strip()
    except ValueError:
        return jsonify({"status": "error", "message": "用户ID必须是数字！"}), 400

    conn = get_db_connection()
    if not conn:
        return jsonify({"status": "error", "message": "数据库连接失败！"}), 500
    cursor = conn.cursor()

    try:
        sql = """
            INSERT INTO user_knowledge_tags (user_id, tag_name, wrong_count)
            VALUES (%s, %s, 1)
            ON DUPLICATE KEY UPDATE wrong_count = wrong_count + 1, updated_at = NOW()
        """
        cursor.execute(sql, (user_id, tag_name))
        conn.commit()

        cursor.execute("SELECT * FROM user_knowledge_tags WHERE user_id = %s AND tag_name = %s", (user_id, tag_name))
        updated_tag = cursor.fetchone()
        
        return jsonify({"status": "success", "message": "标签统计成功！", "data": updated_tag})
    except Exception as e:
        conn.rollback()
        return jsonify({"status": "error", "message": f"失败：{str(e)}"}), 500
    finally:
        cursor.close()
        conn.close()

@app.route('/get_user_tags', methods=['GET'])
def get_user_tags():
    user_id = request.args.get('user_id')
    if not user_id:
        return jsonify({"status": "error", "message": "请提供用户ID！"}), 400
    try:
        user_id = int(user_id)
    except ValueError:
        return jsonify({"status": "error", "message": "用户ID必须是数字！"}), 400

    conn = get_db_connection()
    if not conn:
        return jsonify({"status": "error", "message": "数据库连接失败！"}), 500
    cursor = conn.cursor()

    try:
        cursor.execute("SELECT * FROM user_knowledge_tags WHERE user_id = %s ORDER BY wrong_count DESC", (user_id,))
        tags = cursor.fetchall()
        return jsonify({"status": "success", "data": tags})
    except Exception as e:
        return jsonify({"status": "error", "message": f"查询失败：{str(e)}"}), 500
    finally:
        cursor.close()
        conn.close()

@app.route('/reset_user_tag', methods=['POST'])
def reset_user_tag():
    if not request.is_json:
        return jsonify({"status": "error", "message": "请用JSON格式发送数据！"}), 400
    
    data = request.get_json()
    user_id = data.get('user_id')
    tag_name = data.get('tag_name')
    
    if not user_id:
        return jsonify({"status": "error", "message": "用户ID不能为空！"}), 400
    try:
        user_id = int(user_id)
    except ValueError:
        return jsonify({"status": "error", "message": "用户ID必须是数字！"}), 400

    conn = get_db_connection()
    if not conn:
        return jsonify({"status": "error", "message": "数据库连接失败！"}), 500
    cursor = conn.cursor()

    try:
        if tag_name:
            cursor.execute("UPDATE user_knowledge_tags SET wrong_count = 0 WHERE user_id = %s AND tag_name = %s", (user_id, tag_name))
            message = f"标签「{tag_name}」已重置！"
        else:
            cursor.execute("UPDATE user_knowledge_tags SET wrong_count = 0 WHERE user_id = %s", (user_id,))
            message = "所有标签已重置！"
        
        conn.commit()
        return jsonify({"status": "success", "message": message})
    except Exception as e:
        conn.rollback()
        return jsonify({"status": "error", "message": f"重置失败：{str(e)}"}), 500
    finally:
        cursor.close()
        conn.close()
# ==========================================
# 题库核心接口：生成专属试卷
# 核心逻辑：按用户错题标签的权重出题，错题越多的知识点，出题越多
# ==========================================
@app.route('/generate_user_paper', methods=['POST'])
def generate_user_paper():
    if not request.is_json:
        return jsonify({"status": "error", "message": "请用JSON格式发送数据！"}), 400
    
    data = request.json
    user_id = data.get('user_id')
    paper_title = data.get('paper_title', '专属薄弱点强化卷')
    total_question = int(data.get('total_question', 20)) # 默认20道题
    total_score = int(data.get('total_score', 100)) # 默认100分

    if not user_id:
        return jsonify({"status": "error", "message": "请提供用户ID！"}), 400
    try:
        user_id = int(user_id)
    except ValueError:
        return jsonify({"status": "error", "message": "用户ID必须是数字！"}), 400

    conn = get_db_connection()
    if not conn:
        return jsonify({"status": "error", "message": "数据库连接失败！"}), 500
    cursor = conn.cursor(pymysql.cursors.DictCursor)

    try:
        # 1. 获取用户的错题标签数据，计算每个标签的出题权重
        cursor.execute("""
            SELECT tag_name, wrong_count 
            FROM user_knowledge_tags 
            WHERE user_id = %s 
            ORDER BY wrong_count DESC
        """, (user_id,))
        user_tags = cursor.fetchall()

        # 如果用户没有错题标签，默认所有标签权重一致
        if not user_tags:
            cursor.execute("SELECT DISTINCT knowledge_tag FROM questions")
            all_tags = cursor.fetchall()
            user_tags = [{"tag_name": tag['knowledge_tag'], "wrong_count": 1} for tag in all_tags]

        # 2. 计算每个标签的出题数量（按错题次数权重分配）
        total_wrong = sum([tag['wrong_count'] for tag in user_tags])
        tag_question_count = {}
        assigned_count = 0

        for tag in user_tags:
            # 按权重计算出题数，最少1道题
            count = max(1, int((tag['wrong_count'] / total_wrong) * total_question))
            tag_question_count[tag['tag_name']] = count
            assigned_count += count

        # 调整总数，确保和要求的题目数一致
        if assigned_count != total_question:
            diff = total_question - assigned_count
            # 差值加到错题最多的标签上
            top_tag = user_tags[0]['tag_name']
            tag_question_count[top_tag] += diff

        # 3. 按标签权重随机选题，避免重复出题
        selected_questions = []
        for tag_name, need_count in tag_question_count.items():
            # 排除用户已经做过的题，避免重复
            cursor.execute("""
                SELECT q.question_id, q.question_content, q.question_type, q.difficulty, q.correct_answer, q.question_analysis
                FROM questions q
                LEFT JOIN user_answer_records r ON q.question_id = r.question_id AND r.user_id = %s
                WHERE q.knowledge_tag = %s AND r.record_id IS NULL
                ORDER BY RAND()
                LIMIT %s
            """, (user_id, tag_name, need_count))
            tag_questions = cursor.fetchall()
            selected_questions.extend(tag_questions)

        # 如果选题不足，用其他标签的题补充
        if len(selected_questions) < total_question:
            need_fill = total_question - len(selected_questions)
            exist_question_ids = [q['question_id'] for q in selected_questions]
            placeholder = ','.join(['%s'] * len(exist_question_ids))
            cursor.execute(f"""
                SELECT question_id, question_content, question_type, difficulty, correct_answer, question_analysis
                FROM questions
                WHERE question_id NOT IN ({placeholder})
                ORDER BY RAND()
                LIMIT %s
            """, (*exist_question_ids, need_fill))
            fill_questions = cursor.fetchall()
            selected_questions.extend(fill_questions)

        # 4. 创建试卷记录
        question_score = int(total_score / len(selected_questions))
        tag_weight_json = json.dumps(tag_question_count, ensure_ascii=False)
        cursor.execute("""
            INSERT INTO user_exam_papers 
            (user_id, paper_title, total_score, question_count, tag_weight)
            VALUES (%s, %s, %s, %s, %s)
        """, (user_id, paper_title, total_score, len(selected_questions), tag_weight_json))
        conn.commit()
        paper_id = cursor.lastrowid

        # 5. 把题目关联到试卷
        for question in selected_questions:
            cursor.execute("""
                INSERT INTO paper_question_relation
                (paper_id, question_id, question_score)
                VALUES (%s, %s, %s)
            """, (paper_id, question['question_id'], question_score))
        conn.commit()

        # 6. 返回试卷完整信息（含题目、选项）
        for question in selected_questions:
            # 查询选择题的选项
            if question['question_type'] in ['choice', 'multi']:
                cursor.execute("""
                    SELECT option_code, option_content 
                    FROM question_options 
                    WHERE question_id = %s 
                    ORDER BY option_code
                """, (question['question_id'],))
                question['options'] = cursor.fetchall()
            else:
                question['options'] = []
            # 试卷列表不返回正确答案，避免作弊
            question.pop('correct_answer', None)
            question.pop('question_analysis', None)

        print(f"✅ 用户{user_id}专属试卷生成成功，paper_id: {paper_id}")
        return jsonify({
            "status": "success",
            "message": "专属试卷生成成功！",
            "data": {
                "paper_id": paper_id,
                "paper_title": paper_title,
                "total_score": total_score,
                "question_count": len(selected_questions),
                "tag_weight": tag_question_count,
                "questions": selected_questions
            }
        })
    except Exception as e:
        conn.rollback()
        print(f"❌ 生成试卷失败：{str(e)}")
        import traceback
        print(traceback.format_exc())
        return jsonify({"status": "error", "message": f"生成试卷失败：{str(e)}"}), 500
    finally:
        cursor.close()
        conn.close()

# ==========================================
# 题库接口：提交试卷，自动判分，更新错题标签
# ==========================================
@app.route('/submit_exam_paper', methods=['POST'])
def submit_exam_paper():
    if not request.is_json:
        return jsonify({"status": "error", "message": "请用JSON格式发送数据！"}), 400
    
    data = request.json
    paper_id = data.get('paper_id')
    user_id = data.get('user_id')
    user_answers = data.get('user_answers') # 格式：[{"question_id": 1, "user_answer": "A"}]

    if not paper_id or not user_id or not user_answers:
        return jsonify({"status": "error", "message": "试卷ID、用户ID、答案不能为空！"}), 400
    try:
        paper_id = int(paper_id)
        user_id = int(user_id)
    except ValueError:
        return jsonify({"status": "error", "message": "试卷ID和用户ID必须是数字！"}), 400

    conn = get_db_connection()
    if not conn:
        return jsonify({"status": "error", "message": "数据库连接失败！"}), 500
    cursor = conn.cursor(pymysql.cursors.DictCursor)

    try:
        # 1. 校验试卷是否存在、是否是该用户的、是否未提交
        cursor.execute("SELECT * FROM user_exam_papers WHERE paper_id = %s AND user_id = %s AND status = 0", (paper_id, user_id))
        paper_info = cursor.fetchone()
        if not paper_info:
            return jsonify({"status": "error", "message": "试卷不存在或已提交！"}), 400

        # 2. 获取试卷的所有题目和正确答案
        cursor.execute("""
            SELECT r.question_id, r.question_score, q.correct_answer, q.knowledge_tag, q.question_type
            FROM paper_question_relation r
            LEFT JOIN questions q ON r.question_id = q.question_id
            WHERE r.paper_id = %s
        """, (paper_id,))
        paper_questions = {q['question_id']: q for q in cursor.fetchall()}

        # 3. 自动判分
        total_user_score = 0
        answer_result = []

        for answer_item in user_answers:
            question_id = int(answer_item['question_id'])
            user_answer = answer_item['user_answer'].strip()

            if question_id not in paper_questions:
                continue

            question_info = paper_questions[question_id]
            correct_answer = question_info['correct_answer'].strip()
            is_correct = 1 if user_answer.upper() == correct_answer.upper() else 0

            # 正确则加分
            if is_correct:
                total_user_score += question_info['question_score']

            # 更新试卷的用户答案和判分结果
            cursor.execute("""
                UPDATE paper_question_relation
                SET user_answer = %s, is_correct = %s
                WHERE paper_id = %s AND question_id = %s
            """, (user_answer, is_correct, paper_id, question_id))

            # 记录答题历史
            cursor.execute("""
                INSERT INTO user_answer_records
                (user_id, question_id, user_answer, is_correct)
                VALUES (%s, %s, %s, %s)
            """, (user_id, question_id, user_answer, is_correct))

            # 错题自动更新标签（和你现有的错题标签功能联动）
            if not is_correct:
                cursor.execute("""
                    INSERT INTO user_knowledge_tags (user_id, tag_name, wrong_count)
                    VALUES (%s, %s, 1)
                    ON DUPLICATE KEY UPDATE wrong_count = wrong_count + 1, updated_at = NOW()
                """, (user_id, question_info['knowledge_tag']))

            # 组装返回结果
            answer_result.append({
                "question_id": question_id,
                "user_answer": user_answer,
                "correct_answer": correct_answer,
                "is_correct": is_correct,
                "question_score": question_info['question_score'],
                "get_score": question_info['question_score'] if is_correct else 0,
                "knowledge_tag": question_info['knowledge_tag']
            })

        # 4. 更新试卷总分和状态
        cursor.execute("""
            UPDATE user_exam_papers
            SET user_score = %s, status = 1, submit_at = NOW()
            WHERE paper_id = %s
        """, (total_user_score, paper_id))
        conn.commit()

        print(f"✅ 用户{user_id}试卷{paper_id}提交成功，得分：{total_user_score}/{paper_info['total_score']}")
        return jsonify({
            "status": "success",
            "message": "试卷提交成功！",
            "data": {
                "paper_id": paper_id,
                "total_score": paper_info['total_score'],
                "user_score": total_user_score,
                "correct_rate": round((total_user_score / paper_info['total_score']) * 100, 2),
                "answer_detail": answer_result
            }
        })
    except Exception as e:
        conn.rollback()
        print(f"❌ 提交试卷失败：{str(e)}")
        return jsonify({"status": "error", "message": f"提交失败：{str(e)}"}), 500
    finally:
        cursor.close()
        conn.close()

# ==========================================
# 题库接口：查询用户的试卷列表
# ==========================================
@app.route('/get_user_paper_list', methods=['GET'])
def get_user_paper_list():
    user_id = request.args.get('user_id')
    if not user_id:
        return jsonify({"status": "error", "message": "请提供用户ID！"}), 400
    try:
        user_id = int(user_id)
    except ValueError:
        return jsonify({"status": "error", "message": "用户ID必须是数字！"}), 400

    conn = get_db_connection()
    if not conn:
        return jsonify({"status": "error", "message": "数据库连接失败！"}), 500
    cursor = conn.cursor(pymysql.cursors.DictCursor)

    try:
        cursor.execute("""
            SELECT paper_id, paper_title, total_score, user_score, question_count, status, created_at, submit_at
            FROM user_exam_papers
            WHERE user_id = %s
            ORDER BY created_at DESC
        """, (user_id,))
        paper_list = cursor.fetchall()

        # 格式化状态文本
        status_map = {0: "未作答", 1: "已完成", 2: "已过期"}
        for paper in paper_list:
            paper['status_text'] = status_map.get(paper['status'], "未知")

        return jsonify({
            "status": "success",
            "message": "获取试卷列表成功",
            "data": paper_list
        })
    except Exception as e:
        return jsonify({"status": "error", "message": f"获取失败：{str(e)}"}), 500
    finally:
        cursor.close()
        conn.close()

# ==========================================
# 题库接口：查询试卷详情（含题目、答案、解析）
# ==========================================
@app.route('/get_paper_detail', methods=['GET'])
def get_paper_detail():
    paper_id = request.args.get('paper_id')
    user_id = request.args.get('user_id')
    if not paper_id or not user_id:
        return jsonify({"status": "error", "message": "试卷ID和用户ID不能为空！"}), 400
    try:
        paper_id = int(paper_id)
        user_id = int(user_id)
    except ValueError:
        return jsonify({"status": "error", "message": "ID必须是数字！"}), 400

    conn = get_db_connection()
    if not conn:
        return jsonify({"status": "error", "message": "数据库连接失败！"}), 500
    cursor = conn.cursor(pymysql.cursors.DictCursor)

    try:
        # 校验试卷归属
        cursor.execute("SELECT * FROM user_exam_papers WHERE paper_id = %s AND user_id = %s", (paper_id, user_id))
        paper_info = cursor.fetchone()
        if not paper_info:
            return jsonify({"status": "error", "message": "试卷不存在！"}), 404

        # 获取题目详情
        cursor.execute("""
            SELECT 
                r.question_id, r.question_score, r.user_answer, r.is_correct,
                q.question_content, q.question_type, q.correct_answer, q.question_analysis, q.knowledge_tag
            FROM paper_question_relation r
            LEFT JOIN questions q ON r.question_id = q.question_id
            WHERE r.paper_id = %s
            ORDER BY r.id ASC
        """, (paper_id,))
        questions = cursor.fetchall()

        # 补充选项
        for q in questions:
            if q['question_type'] in ['choice', 'multi']:
                cursor.execute("""
                    SELECT option_code, option_content 
                    FROM question_options 
                    WHERE question_id = %s 
                    ORDER BY option_code
                """, (q['question_id'],))
                q['options'] = cursor.fetchall()
            else:
                q['options'] = []

        paper_info['questions'] = questions
        return jsonify({
            "status": "success",
            "message": "获取试卷详情成功",
            "data": paper_info
        })
    except Exception as e:
        return jsonify({"status": "error", "message": f"获取失败：{str(e)}"}), 500
    finally:
        cursor.close()
        conn.close()
        
# ==========================================
# 启动服务
# ==========================================
if __name__ == '__main__':
    print("=======================================")
    print(" Pixel-Town 后端服务启动成功 ✅")
    print(" 功能：头像 + 活跃度热力图 + 全接口正常")
    print("=======================================")
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=True)