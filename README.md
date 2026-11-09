# ⚡ Cyber Bento Portfolio - Wuttipat Panphuang (วุฒิภัทร ปันพวง)

[![Live Demo](https://img.shields.io/badge/Demo-wuttipat--ict.pages.dev-06b6d4?style=for-the-badge&logo=cloudflare)](https://wuttipat-ict.pages.dev)
[![GitHub](https://img.shields.io/badge/GitHub-Wuttipat1-181717?style=for-the-badge&logo=github)](https://github.com/Wuttipat1)
[![SPU ICT](https://img.shields.io/badge/SPU-ICT%20Year%202-10b981?style=for-the-badge)](https://www.spu.ac.th)

เว็บพอร์ตโฟลิโอส่วนตัว (Personal Portfolio) ออกแบบและพัฒนาด้วยสไตล์ **Modern Cyber Bento Grid** ผสาน **Floating Island Navigation** และขอบนีออนเรืองแสง สะท้อนความเป็น Full-Stack Developer รุ่นใหม่ พร้อมระบบจัดการข้อมูลสองภาษา (TH/EN), Dark/Light Mode และเชื่อมต่อ Cloudflare Edge Architecture

🌐 **Live Website:** [https://wuttipat-ict.pages.dev](https://wuttipat-ict.pages.dev)

---

## 🎨 1. ไฮไลต์การออกแบบ (Design & Architecture)

- **สไตล์ดีไซน์ (Design System)**: **Cyber Bento Grid & Modern SaaS** ประกอบด้วยการ์ดกล่องมน โครงตารางแบ่งสัดส่วนชัดเจน พร้อมเอฟเฟกต์ Glassmorphism และ Neon Glow
- **แถบนำทาง (Navbar)**: **Floating Island Navigation Bar** ลอยตัวกึ่งกลางด้านบน พร้อมระบบ **ScrollSpy** ไฮไลต์ตำแหน่งอัตโนมัติตามเซกชันที่กำลังอ่าน
- **สองภาษา (i18n)**: รองรับการสลับภาษาแบบเรียลไทม์ `[TH / EN]` โดยไม่ต้องรีเฟรชหน้าเว็บ
- **ระบบสี (Dark / Light Mode)**: โหมดมืดสไตล์ Deep Space Neon และโหมดสว่าง Clean Tech ปรับเปลี่ยนได้ในคลิกเดียว พร้อมจดจำค่าอัตโนมัติ

---

## 📐 2. โครงสร้าง 6 ส่วนหลัก

1. 👤 **ข้อมูลส่วนตัว (Personal Details & Hero Bento)**
   - แสดงข้อมูลนักศึกษา: นายวุฒิภัทร ปันพวง (Student Ambassador, คณะเทคโนโลยีสารสนเทศ สาขา ICT มหาวิทยาลัยศรีปทุม ชั้นปีที่ 2)
   - ข้อมูลผลการเรียนเฉลี่ยสะสม (**GPAX 3.78 / 4.00**)
   - กล่องข้อมูลจำลอง Terminal (`wuttipat@spu:~`) และสถานะความพร้อมรับงานฝึกงาน
   - ข้อมูลติดต่อ: อีเมล, เบอร์โทรศัพท์, GitHub และ LinkedIn

2. 🎓 **ประวัติการศึกษา (Education Background)**
   - **ระดับอุดมศึกษา**: สาขาเทคโนโลยีสารสนเทศและการสื่อสาร (ICT) คณะเทคโนโลยีสารสนเทศ มหาวิทยาลัยศรีปทุม (2566 – ปัจจุบัน)
   - รายวิชาสำคัญ: Data Structures, Web App Development, Database Systems, Computer Networks, OOP, Software Engineering
   - **ระดับมัธยมศึกษาตอนปลาย**: แผนการเรียนวิทยาศาสตร์-คณิตศาสตร์-ภาษาจีน โรงเรียนเทพศิรินทร์สมุทรปราการ

3. 🛠️ **ทักษะความเชี่ยวชาญ (Technical Proficiency)**
   - **Programming Languages**: JavaScript (ES6+), Python, SQL
   - **Frontend Development**: HTML5 & Modern CSS3, Tailwind CSS, Responsive Web Design
   - **Backend & Database**: Node.js & Express, Cloudflare Workers (Edge), Cloudflare D1 (SQLite), MySQL & PostgreSQL
   - **Tools & DevOps & Cloud**: Git & GitHub, Cloudflare Pages & DNS, Docker, Figma UI/UX, VS Code & Linux CLI

4. 💼 **ประสบการณ์ทำงาน (Work Experience)**
   - Bento Empty State: กำลังศึกษาอยู่ชั้นปีที่ 2 พร้อมเปิดรับโอกาสฝึกงานด้านไอทีและพัฒนาเว็บไซต์

5. 📁 **ผลงานเด่น (Featured Projects)**
   - **Storytelling Quest (ภารกิจพิชิตใจผู้ฟัง)**: มินิเกมเควสด้านการสื่อสารสำหรับ ULC10-147 คณะนิเทศศาสตร์และน้ำดื่ม SPU
   - รองรับระบบกรองหมวดหมู่ (`All`, `Full-Stack`, `Frontend`, `Backend`)
   - ระบบ CRUD รองรับการเพิ่ม แก้ไข ลบผลงาน และอัปโหลดภาพหน้าปก

6. 📜 **การฝึกอบรมและใบรับรอง (Credentials & Certifications)**
   - **AWS Generative AI & PartyRock workshop** (Amazon Web Services)
   - ตัวอ่านเอกสาร PDF Viewer ในตัว รองรับการเปิดพรีวิวและการดาวน์โหลดไฟล์ PDF เอกสารจริง

---

## 🛠️ 3. เทคโนโลยีที่ใช้ (Tech Stack)

- **Frontend**: HTML5, Modern CSS3, [Tailwind CSS](https://tailwindcss.com), Vanilla JavaScript (ES6+)
- **Icons**: [Lucide Icons](https://lucide.dev)
- **Local Storage Engine**: IndexedDB + LocalStorage Unified Layer
- **Cloud Infrastructure**: [Cloudflare Pages](https://pages.cloudflare.com), [Cloudflare D1 Database](https://developers.cloudflare.com/d1/), [Cloudflare Workers](https://workers.cloudflare.com)

---

## 🚀 4. วิธีการเปิดใช้งานในเครื่อง (Local Setup)

```bash
# Clone repository
git clone https://github.com/Wuttipat1/Portfolio.git

# เข้าสู่โฟลเดอร์โปรเจกต์
cd Portfolio

# เปิดด้วย Local Web Server (Node.js)
node server.js
```
เปิดเบราว์เซอร์ไปที่ `http://localhost:3000`

---

## ☁️ 5. การ Deploy ขึ้น Cloudflare Pages

```bash
# 1. ติดตั้งหรือล็อกอิน Wrangler CLI
npx wrangler login

# 2. Deploy ขึ้น Cloudflare Pages
npx wrangler pages deploy . --project-name=wuttipat-ict --branch=main
```

---

© 2026 Wuttipat Panphuang. SPU ICT Portfolio.
