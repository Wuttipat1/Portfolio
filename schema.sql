-- ==========================================================
-- SPU ICT Portfolio - Cloudflare D1 Database Schema
-- Student: Wuttipat Panphuang (SPU ICT 2nd Year)
-- ==========================================================

-- 1. Profile Details
CREATE TABLE IF NOT EXISTS profile (
    id TEXT PRIMARY KEY DEFAULT 'main',
    name_th TEXT NOT NULL,
    name_en TEXT NOT NULL,
    role_th TEXT NOT NULL,
    role_en TEXT NOT NULL,
    bio_th TEXT,
    bio_en TEXT,
    university TEXT DEFAULT 'มหาวิทยาลัยศรีปทุม (SPU)',
    faculty TEXT DEFAULT 'เทคโนโลยีสารสนเทศและการสื่อสาร (ICT)',
    gpax REAL DEFAULT 3.85,
    email TEXT,
    phone TEXT,
    location_th TEXT,
    location_en TEXT,
    github TEXT,
    linkedin TEXT,
    avatar_url TEXT,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 2. Projects Table
CREATE TABLE IF NOT EXISTS projects (
    id TEXT PRIMARY KEY,
    title_th TEXT NOT NULL,
    title_en TEXT NOT NULL,
    category TEXT NOT NULL CHECK(category IN ('Full-Stack', 'Frontend', 'Backend')),
    description_th TEXT NOT NULL,
    description_en TEXT NOT NULL,
    tech TEXT NOT NULL, -- Comma-separated or JSON array string
    image_url TEXT,
    demo_url TEXT,
    repo_url TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 3. Certifications Table
CREATE TABLE IF NOT EXISTS certificates (
    id TEXT PRIMARY KEY,
    title_th TEXT NOT NULL,
    title_en TEXT NOT NULL,
    issuer TEXT NOT NULL,
    date_issued DATE NOT NULL,
    credential_id TEXT,
    pdf_r2_key TEXT,
    pdf_url TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- ==========================================================
-- Initial Seed Data
-- ==========================================================

-- Seed Profile
INSERT OR REPLACE INTO profile (
    id, name_th, name_en, role_th, role_en,
    bio_th, bio_en, gpax, email, phone, location_th, location_en, github, linkedin
) VALUES (
    'main',
    'วุฒิภัทร ปันพวง',
    'Wuttipat Panphuang',
    'นักศึกษา ICT ชั้นปีที่ 2 & Full-Stack Developer',
    '2nd Year ICT Student & Full-Stack Developer',
    'มีความหลงใหลในการพัฒนาระบบเว็บแอปพลิเคชันสมัยใหม่ การจัดการฐานข้อมูล และคลาวด์โซลูชัน',
    'Passionate about modern web application development, database architecture, and cloud solutions.',
    3.78,
    'realwuttipat@gmail.com',
    '094-856-2103',
    'กรุงเทพมหานคร, ประเทศไทย',
    'Bangkok, Thailand',
    'https://github.com/Wuttipat1',
    'https://linkedin.com/in/wuttipat-spu'
);

-- Seed Projects
DELETE FROM projects;
INSERT INTO projects (
    id, title_th, title_en, category, description_th, description_en,
    tech, image_url, demo_url, repo_url
) VALUES 
(
    'proj-storytelling',
    'Storytelling Quest',
    'Storytelling Quest',
    'Frontend',
    'Storytelling game-quest for ULC10-147 คณะนิเทศศาสตร์และน้ำดื่ม SPU',
    'Storytelling game-quest for ULC10-147 School of Communication Arts & SPU Water',
    'HTML, Tailwind CSS, JavaScript',
    'assets/storytelling-quest.png',
    'https://wuttipat1.github.io/StorytellingQuest/',
    'https://github.com/Wuttipat1/StorytellingQuest'
);

-- Seed Certificates
DELETE FROM certificates;
INSERT INTO certificates (
    id, title_th, title_en, issuer, date_issued, credential_id, pdf_url
) VALUES
(
    'cert-aws-partyrock',
    'AWS Generative AI & PartyRock workshop',
    'AWS Generative AI & PartyRock workshop',
    'AWS',
    '2024-10-07',
    'AWS-PR-2024',
    'assets/aws-workshop-cert.pdf'
);
