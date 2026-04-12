
CREATE DATABASE IF NOT EXISTS `Pixel_Town` 
DEFAULT CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci;
-- 2. 进入数据库
USE `Pixel_Town`;

-- ==========================================
-- 表1：用户表（users）
-- 说明：存储用户的基本信息
CREATE TABLE IF NOT EXISTS `users` (
    `user_id` INT AUTO_INCREMENT PRIMARY KEY COMMENT '用户ID：主键，自增',
    `username` VARCHAR(50) NOT NULL UNIQUE COMMENT '用户名：唯一，用于登录',
    `password_hash` VARCHAR(255) NOT NULL COMMENT '加密后的密码（SHA256）',
    `email` VARCHAR(100) UNIQUE COMMENT '邮箱：可选，用于找回密码',
    `avatar` VARCHAR(255) COMMENT '【排行字段】用户头像URL',
    `signature` VARCHAR(200) COMMENT '【排行字段】个性签名',
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '账号创建时间',
    `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '信息更新时间',
    
    INDEX `idx_username` (`username`) COMMENT '用户名索引，提升登录速度'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='用户表';

-- ==========================================
-- 2. 游戏进度表（game_progress）【最新：7个独立INT关卡分数字段】
CREATE TABLE `game_progress` (
    `progress_id` INT AUTO_INCREMENT PRIMARY KEY COMMENT '进度ID：主键，自增',
    `user_id` INT NOT NULL UNIQUE COMMENT '所属用户ID：唯一，一个用户一条进度',
    `game_level` INT DEFAULT 1 COMMENT '当前游戏关卡：1-7',
    `game_score` INT DEFAULT 0 COMMENT '【排行核心】游戏总分：所有关卡分数累加',
    -- 7个独立的INT关卡分数字段
    `level1_score` INT DEFAULT 0 COMMENT '关卡1分数（INT独立存储）',
    `level2_score` INT DEFAULT 0 COMMENT '关卡2分数（INT独立存储）',
    `level3_score` INT DEFAULT 0 COMMENT '关卡3分数（INT独立存储）',
    `level4_score` INT DEFAULT 0 COMMENT '关卡4分数（INT独立存储）',
    `level5_score` INT DEFAULT 0 COMMENT '关卡5分数（INT独立存储）',
    `level6_score` INT DEFAULT 0 COMMENT '关卡6分数（INT独立存储）',
    `level7_score` INT DEFAULT 0 COMMENT '关卡7分数（INT独立存储）',
    `inventory_data` TEXT COMMENT '背包数据：JSON格式',
    `achievements_data` TEXT COMMENT '成就数据：JSON格式',
    `syllabus_progress` TEXT COMMENT '学习进度数据：JSON格式',
    `last_play_time` DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '最后游玩时间',
    `first_unlock_time` DATETIME COMMENT '【排行字段】首次通关当前关卡的时间',
    `total_play_time` INT DEFAULT 0 COMMENT '【排行字段】总游玩时长：单位秒',
    `last_login_time` DATETIME COMMENT '【排行字段】最后登录时间',
    
    -- 索引优化
    INDEX `idx_score_level` (`game_score` DESC, `game_level` DESC) COMMENT '总分+关卡索引：用于总分排行',
    INDEX `idx_play_time` (`total_play_time` DESC) COMMENT '游玩时长索引：用于活跃排行',
    INDEX `idx_user` (`user_id`) COMMENT '用户ID索引',
    -- 关卡分数字段索引
    INDEX `idx_level1` (`level1_score` DESC),
    INDEX `idx_level2` (`level2_score` DESC),
    INDEX `idx_level3` (`level3_score` DESC),
    INDEX `idx_level4` (`level4_score` DESC),
    INDEX `idx_level5` (`level5_score` DESC),
    INDEX `idx_level6` (`level6_score` DESC),
    INDEX `idx_level7` (`level7_score` DESC),
    
    FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='游戏进度表';
-- ==========================================
-- 表3：学习笔记表（study_notes）
-- 说明：存储用户的学习笔记
-- ==========================================
CREATE TABLE IF NOT EXISTS `study_notes` (
    `note_id` INT AUTO_INCREMENT PRIMARY KEY COMMENT '笔记ID：主键，自增',
    `user_id` INT NOT NULL COMMENT '所属用户ID',
    `note_title` VARCHAR(100) NOT NULL COMMENT '笔记标题',
    `note_content` TEXT COMMENT '笔记内容',
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '修改时间',
    
    INDEX `idx_user_notes` (`user_id`) COMMENT '用户笔记索引',
    FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='学习笔记表';

-- ==========================================
-- 表4：用户成就表（user_achievements）
-- 说明：存储用户的成就解锁记录
-- ==========================================
CREATE TABLE IF NOT EXISTS `user_achievements` (
    `achievement_id` INT AUTO_INCREMENT PRIMARY KEY COMMENT '成就记录ID：主键，自增',
    `user_id` INT NOT NULL COMMENT '所属用户ID',
    `achievement_key` VARCHAR(100) NOT NULL COMMENT '成就标识：如level_1_complete',
    `achievement_name` VARCHAR(100) COMMENT '成就名称：如第一关',
    `unlocked_at` DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '解锁时间',
    
    UNIQUE KEY `unique_user_achievement` (`user_id`, `achievement_key`) COMMENT '一个用户一个成就只能解锁一次',
    INDEX `idx_user_ach` (`user_id`) COMMENT '用户成就索引',
    FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='用户成就表';

-- ==========================================
-- 表5：用户知识薄弱点标签表（user_knowledge_tags）
-- 说明：存储用户的错题标签统计
-- ==========================================
CREATE TABLE IF NOT EXISTS `user_knowledge_tags` (
    `tag_id` INT AUTO_INCREMENT PRIMARY KEY COMMENT '标签记录ID：主键，自增',
    `user_id` INT NOT NULL COMMENT '所属用户ID',
    `tag_name` VARCHAR(100) NOT NULL COMMENT '知识点标签名：如力学、胡克定律',
    `wrong_count` INT DEFAULT 1 COMMENT '该标签的错题次数：错一题+1',
    `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '最后更新时间',
    
    UNIQUE KEY `unique_user_tag` (`user_id`, `tag_name`) COMMENT '【核心】一个用户一个标签只能有一条记录',
    INDEX `idx_user_tag` (`user_id`) COMMENT '用户标签索引',
    FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='用户知识薄弱点标签表';

-- ==========================================
-- 【可选扩展】表6：题目表（questions）
-- 说明：存储题目信息，方便后续绑定题目和标签
-- ==========================================
CREATE TABLE IF NOT EXISTS `questions` (
    `question_id` INT AUTO_INCREMENT PRIMARY KEY COMMENT '题目ID：主键，自增',
    `question_content` TEXT NOT NULL COMMENT '题目内容',
    `correct_answer` VARCHAR(255) NOT NULL COMMENT '正确答案',
    `question_type` VARCHAR(20) DEFAULT 'choice' COMMENT '题目类型：choice选择、fill填空、application应用题',
    `notice_id` VARCHAR(20) COMMENT '所属关卡：如notice-1',
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    
    INDEX `idx_notice_question` (`notice_id`) COMMENT '关卡题目索引'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='题目表';

-- ==========================================
-- 【可选扩展】表7：题目-标签关联表（question_tag_relation）
-- 说明：绑定题目和标签，一题可多标签
-- ==========================================
CREATE TABLE IF NOT EXISTS `question_tag_relation` (
    `id` INT AUTO_INCREMENT PRIMARY KEY COMMENT '关联ID：主键，自增',
    `question_id` INT NOT NULL COMMENT '题目ID',
    `tag_name` VARCHAR(50) NOT NULL COMMENT '标签名称',
    
    UNIQUE KEY `unique_question_tag` (`question_id`, `tag_name`) COMMENT '避免重复关联',
    INDEX `idx_question_tag` (`question_id`) COMMENT '题目标签索引',
    FOREIGN KEY (`question_id`) REFERENCES `questions`(`question_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='题目-标签关联表';

-- 补全users表的avatar头像字段（兼容你的MySQL环境，无语法报错）
SET @is_exist = (
    SELECT COUNT(*) FROM information_schema.COLUMNS 
    WHERE TABLE_SCHEMA = 'Pixel_Town' 
      AND TABLE_NAME = 'users' 
      AND COLUMN_NAME = 'avatar'
);
SET @sql = IF(@is_exist = 0, 
    "ALTER TABLE users ADD COLUMN `avatar` VARCHAR(255) DEFAULT 'https://via.placeholder.com/100' COMMENT '用户头像URL' AFTER `email`", 
    "SELECT '字段avatar已存在，跳过' AS msg"
);
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- 补全个性签名字段（排行榜展示用）
SET @is_exist = (
    SELECT COUNT(*) FROM information_schema.COLUMNS 
    WHERE TABLE_SCHEMA = 'Pixel_Town' 
      AND TABLE_NAME = 'users' 
      AND COLUMN_NAME = 'signature'
);
SET @sql = IF(@is_exist = 0, 
    "ALTER TABLE users ADD COLUMN `signature` VARCHAR(200) DEFAULT '这个人很懒，什么都没写~' COMMENT '用户个性签名' AFTER `avatar`", 
    "SELECT '字段signature已存在，跳过' AS msg"
);
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- 新建用户每日活跃度表（热力图专用）
CREATE TABLE IF NOT EXISTS `user_daily_activity` (
    `id` INT AUTO_INCREMENT PRIMARY KEY COMMENT '主键ID',
    `user_id` INT NOT NULL COMMENT '所属用户ID',
    `activity_date` DATE NOT NULL COMMENT '活跃日期（格式：2026-04-02）',
    `play_seconds` INT DEFAULT 0 COMMENT '当日游戏/学习时长（单位：秒）',
    `login_count` INT DEFAULT 0 COMMENT '当日登录次数',
    `operate_count` INT DEFAULT 0 COMMENT '当日操作次数（保存进度/答题/提交作业等）',
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    
    -- 唯一约束：一个用户一天只能有一条记录，避免重复数据
    UNIQUE KEY `unique_user_date` (`user_id`, `activity_date`),
    -- 索引优化：提升按用户、按日期查询的速度
    INDEX `idx_user_id` (`user_id`),
    INDEX `idx_activity_date` (`activity_date`),
    
    -- 外键关联用户表，用户删除时同步删除活跃度数据
    FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='用户每日活跃度表（热力图专用）';

-- ==========================================
-- 1. 题库主表：存储所有题目
-- ==========================================
CREATE TABLE IF NOT EXISTS `questions` (
    `question_id` INT AUTO_INCREMENT PRIMARY KEY COMMENT '题目唯一ID',
    `question_content` TEXT NOT NULL COMMENT '题目题干（支持图文、公式）',
    `question_type` VARCHAR(20) NOT NULL DEFAULT 'choice' COMMENT '题型：choice单选、multi多选、fill填空、subjective主观题',
    `difficulty` TINYINT NOT NULL DEFAULT 2 COMMENT '难度：1简单、2中等、3困难',
    `knowledge_tag` VARCHAR(100) NOT NULL COMMENT '知识点标签（和你现有的错题标签完全对应，比如：胡克定律、受力分析）',
    `correct_answer` TEXT NOT NULL COMMENT '正确答案（单选/多选填选项编号，填空填标准答案，主观题填评分标准）',
    `question_analysis` TEXT COMMENT '题目解析',
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    
    -- 索引优化：按标签、题型、难度快速筛选题目
    INDEX `idx_tag` (`knowledge_tag`),
    INDEX `idx_type` (`question_type`),
    INDEX `idx_difficulty` (`difficulty`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='题库主表';

-- ==========================================
-- 2. 题目选项表：存储单选/多选题的选项（和题目一对多）
-- ==========================================
CREATE TABLE IF NOT EXISTS `question_options` (
    `option_id` INT AUTO_INCREMENT PRIMARY KEY COMMENT '选项ID',
    `question_id` INT NOT NULL COMMENT '所属题目ID',
    `option_code` VARCHAR(10) NOT NULL COMMENT '选项编号：A/B/C/D',
    `option_content` TEXT NOT NULL COMMENT '选项内容',
    
    INDEX `idx_question_id` (`question_id`),
    FOREIGN KEY (`question_id`) REFERENCES `questions`(`question_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='题目选项表';

-- ==========================================
-- 3. 用户试卷表：存储给用户生成的专属试卷
-- ==========================================
CREATE TABLE IF NOT EXISTS `user_exam_papers` (
    `paper_id` INT AUTO_INCREMENT PRIMARY KEY COMMENT '试卷ID',
    `user_id` INT NOT NULL COMMENT '所属用户ID',
    `paper_title` VARCHAR(200) NOT NULL COMMENT '试卷标题',
    `total_score` INT NOT NULL DEFAULT 100 COMMENT '试卷总分',
    `question_count` INT NOT NULL COMMENT '题目总数',
    `tag_weight` TEXT COMMENT '生成试卷的标签权重（JSON格式，记录每个知识点的出题占比）',
    `user_score` INT DEFAULT NULL COMMENT '用户得分，提交后更新',
    `status` TINYINT NOT NULL DEFAULT 0 COMMENT '试卷状态：0未作答、1已提交、2已过期',
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '生成时间',
    `submit_at` DATETIME COMMENT '提交时间',
    
    INDEX `idx_user_id` (`user_id`),
    INDEX `idx_status` (`status`),
    FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='用户专属试卷表';

-- ==========================================
-- 4. 试卷-题目关联表：试卷里的题目列表
-- ==========================================
CREATE TABLE IF NOT EXISTS `paper_question_relation` (
    `id` INT AUTO_INCREMENT PRIMARY KEY COMMENT '关联ID',
    `paper_id` INT NOT NULL COMMENT '试卷ID',
    `question_id` INT NOT NULL COMMENT '题目ID',
    `question_score` INT NOT NULL DEFAULT 5 COMMENT '本题分值',
    `user_answer` TEXT COMMENT '用户答案，提交后更新',
    `is_correct` TINYINT DEFAULT NULL COMMENT '是否正确：1正确、0错误、NULL未作答',
    
    UNIQUE KEY `unique_paper_question` (`paper_id`, `question_id`),
    INDEX `idx_paper_id` (`paper_id`),
    FOREIGN KEY (`paper_id`) REFERENCES `user_exam_papers`(`paper_id`) ON DELETE CASCADE,
    FOREIGN KEY (`question_id`) REFERENCES `questions`(`question_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='试卷-题目关联表';

-- ==========================================
-- 5. 用户答题记录表：用户的历史答题明细
-- ==========================================
CREATE TABLE IF NOT EXISTS `user_answer_records` (
    `record_id` INT AUTO_INCREMENT PRIMARY KEY COMMENT '记录ID',
    `user_id` INT NOT NULL COMMENT '用户ID',
    `question_id` INT NOT NULL COMMENT '题目ID',
    `user_answer` TEXT COMMENT '用户答案',
    `is_correct` TINYINT NOT NULL COMMENT '是否正确：1正确、0错误',
    `answer_time` DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '答题时间',
    
    INDEX `idx_user_id` (`user_id`),
    INDEX `idx_question_id` (`question_id`),
    FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`) ON DELETE CASCADE,
    FOREIGN KEY (`question_id`) REFERENCES `questions`(`question_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='用户答题记录表';
