/**
 * Bilingual Translation Dictionary (TH / EN)
 * Fully supports all 6 core sections, UI controls, notifications, and initial seed data
 */
const translations = {
  th: {
    // Nav items
    nav: {
      profile: "ข้อมูลส่วนตัว",
      education: "ประวัติการศึกษา",
      skills: "ทักษะความสามารถ",
      experience: "ประสบการณ์ทำงาน",
      projects: "ผลงานของฉัน",
      certifications: "การฝึกอบรมและใบรับรอง",
      statusBadge: "พร้อมรับโอกาสฝึกงาน",
      contactBtn: "ติดต่อฉัน",
      spuBadge: "SPU ICT 2nd Year"
    },
    // Top Bar
    topbar: {
      currentLang: "TH",
      switchLang: "English",
      themeLight: "สว่าง",
      themeDark: "มืด",
      downloadCv: "ดาวน์โหลด Resume"
    },
    // Section 1: Hero & Profile
    hero: {
      greeting: "สวัสดีครับ, ผมชื่อ",
      name: "วุฒิภัทร ปันพวง",
      nameEn: "Wuttipat Panphuang",
      role: "นักศึกษา ICT ชั้นปีที่ 2 & Full-Stack Developer",
      bio: "มีความหลงใหลในการพัฒนาระบบเว็บแอปพลิเคชันสมัยใหม่ การจัดการฐานข้อมูล และคลาวด์โซลูชัน พร้อมเรียนรู้เทคโนโลยีใหม่ๆ มุ่งมั่นสร้างสรรค์ผลงานที่มีประสิทธิภาพและตอบโจทย์ผู้ใช้งานจริง",
      university: "มหาวิทยาลัยศรีปทุม (SPU)",
      faculty: "คณะเทคโนโลยีสารสนเทศ สาขาเทคโนโลยีสารสนเทศและการสื่อสาร (ICT)",
      year: "ชั้นปีที่ 2",
      gpaxLabel: "เกรดเฉลี่ยสะสม (GPAX)",
      gpaxValue: "3.78",
      emailLabel: "อีเมล",
      phoneLabel: "เบอร์โทรศัพท์",
      locationLabel: "ที่อยู่",
      locationValue: "กรุงเทพมหานคร, ประเทศไทย",
      changePhotoBtn: "เปลี่ยนรูปโปรไฟล์",
      uploadPhotoHint: "คลิกเพื่ออัปโหลดไฟล์รูปภาพใหม่ (JPG, PNG)",
      statProjects: "โปรเจกต์ที่สร้างแล้ว",
      statCerts: "ใบรับรองและคอร์ส",
      statTechs: "เทคโนโลยีที่เชี่ยวชาญ",
      statYear: "ชั้นปีที่ 2 SPU"
    },
    // Section 2: Education
    education: {
      title: "ประวัติการศึกษา",
      subtitle: "เส้นทางการเรียนรู้และรากฐานด้านเทคโนโลยีสารสนเทศ",
      degree: "ปริญญาตรี วิทยาศาสตรบัณฑิต (วท.บ.)",
      major: "สาขาเทคโนโลยีสารสนเทศและการสื่อสาร (ICT)",
      institution: "มหาวิทยาลัยศรีปทุม (Sripatum University - SPU)",
      period: "2566 – ปัจจุบัน (ชั้นปีที่ 2)",
      gpaLabel: "ผลการเรียนเฉลี่ยสะสม:",
      highlightCourseTitle: "วิชาเรียนสำคัญที่ผ่านการศึกษา:",
      courses: [
        "Data Structures & Algorithms (โครงสร้างข้อมูลและขั้นตอนวิธี)",
        "Web Application Development (การพัฒนาเว็บแอปพลิเคชัน)",
        "Database Systems & Design (ระบบฐานข้อมูลและการออกแบบ)",
        "Computer Network & Cloud Infrastructure (ระบบเครือข่ายและคลาวด์)",
        "Object-Oriented Programming (การเขียนโปรแกรมเชิงวัตถุ)",
        "Software Engineering & UX/UI Design (วิศวกรรมซอฟต์แวร์และการออกแบบ UX/UI)"
      ],
      highSchool: {
        title: "มัธยมศึกษาตอนปลาย (สายวิทย์-คณิต-จีน)",
        institution: "โรงเรียนเทพศิรินทร์สมุทรปราการ",
        period: "2563 – 2566",
        desc: "สำเร็จการศึกษาระดับมัธยมศึกษาตอนปลาย แผนการเรียนวิทยาศาสตร์-คณิตศาสตร์-ภาษาจีน พร้อมปูพื้นฐานการคิดเชิงตรรกะและการสื่อสาร"
      }
    },
    // Section 3: Skills
    skills: {
      title: "ทักษะความสามารถ",
      subtitle: "เครื่องมือและสแตกเทคโนโลยีที่ใช้งานในการพัฒนา",
      categories: {
        languages: "Programming Languages",
        languagesDesc: "ภาษาคอมพิวเตอร์หลักที่ใช้พัฒนา",
        frontend: "Frontend Development",
        frontendDesc: "สร้างสรรค์อินเทอร์เฟซและประสบการณ์ผู้ใช้",
        backend: "Backend & Database",
        backendDesc: "การออกแบบ API ฐานข้อมูล และสถาปัตยกรรมระบบ",
        tools: "Tools & DevOps & Cloud",
        toolsDesc: "เครื่องมือควบคุมเวอร์ชันและสภาพแวดล้อมการทำงาน"
      }
    },
    // Section 4: Experience
    experience: {
      title: "ประสบการณ์ทำงาน",
      subtitle: "ข้อมูลประวัติการทำงานในสถานประกอบการ",
      emptyTitle: "ยังไม่มีประสบการณ์การทำงาน",
      emptyDesc: "ปัจจุบันเป็นนักศึกษา ICT ชั้นปีที่ 2 มหาวิทยาลัยศรีปทุม มุ่งเน้นการศึกษาและเตรียมความพร้อมเต็มที่ พร้อมเปิดรับโอกาสในการฝึกงาน / สหกิจศึกษาด้านไอที",
      items: []
    },
    // Section 5: Projects
    projects: {
      title: "ผลงานของฉัน",
      subtitle: "โปรเจกต์ที่พัฒนาขึ้นจริงทั้งงานส่วนตัว งานรายวิชา และระบบจำลอง",
      filterAll: "ทั้งหมด",
      filterFullStack: "Full-Stack",
      filterFrontend: "Frontend",
      filterBackend: "Backend",
      addBtn: "เพิ่มผลงานใหม่",
      emptyState: "ยังไม่มีผลงานในหมวดหมู่นี้",
      modalAddTitle: "เพิ่มผลงานใหม่",
      modalEditTitle: "แก้ไขผลงาน",
      formTitle: "ชื่อโปรเจกต์",
      formCategory: "ประเภทโปรเจกต์",
      formDescription: "คำอธิบายรายละเอียด",
      formTech: "เทคโนโลยีที่ใช้ (คั่นด้วยจุลภาค เช่น React, Tailwind, Node.js)",
      formDemoUrl: "ลิงก์ Live Demo (URL)",
      formRepoUrl: "ลิงก์ GitHub Repository (URL)",
      formImage: "รูปภาพหน้าปกผลงาน",
      formImageHint: "รองรับไฟล์ภาพ JPG, PNG, WebP",
      saveBtn: "บันทึกข้อมูล",
      cancelBtn: "ยกเลิก",
      deleteConfirm: "คุณแน่ใจหรือไม่ว่าต้องการลบโปรเจกต์นี้?",
      btnEdit: "แก้ไข",
      btnDelete: "ลบ",
      btnChangeImg: "เปลี่ยนรูป",
      btnViewDemo: "ดูตัวอย่าง",
      btnSource: "ซอร์สโค้ด"
    },
    // Section 6: Certifications
    certifications: {
      title: "การฝึกอบรมและใบรับรอง",
      subtitle: "วุฒิบัตรและหลักสูตรอบรมเพิ่มพูนทักษะ พร้อมเอกสาร PDF ตรวจสอบได้",
      addBtn: "เพิ่มใบรับรองใหม่",
      emptyState: "ยังไม่มีใบรับรองในระบบ",
      modalAddTitle: "เพิ่มใบรับรองใหม่",
      modalEditTitle: "แก้ไขข้อมูลใบรับรอง",
      formTitle: "ชื่อหลักสูตร / ใบรับรอง",
      formIssuer: "สถาบันหรือองค์กรผู้ออกใบรับรอง",
      formDate: "วันที่ได้รับใบรับรอง",
      formCredentialId: "รหัสอ้างอิงใบรับรอง (Credential ID)",
      formPdf: "ไฟล์แนบเอกสาร PDF",
      formPdfHint: "เลือกไฟล์ .pdf เพื่อแนบเอกสารใบรับรองจริง",
      saveBtn: "บันทึกข้อมูล",
      cancelBtn: "ยกเลิก",
      btnEdit: "แก้ไข",
      btnDelete: "ลบ",
      btnViewPdf: "เปิดดู PDF",
      btnAttachPdf: "แนบไฟล์ PDF",
      deleteConfirm: "คุณแน่ใจหรือไม่ว่าต้องการลบใบรับรองนี้?",
      pdfModalTitle: "พรีวิวเอกสารใบรับรอง (PDF Viewer)",
      noPdfAlert: "ยังไม่มีการแนบไฟล์ PDF สำหรับรายการนี้ กรุณาคลิกแนบไฟล์ PDF"
    },
    // Common / Modal / Toast
    common: {
      close: "ปิด",
      loading: "กำลังประมวลผล...",
      selectFile: "เลือกไฟล์",
      uploadSuccess: "อัปโหลดไฟล์สำเร็จเรียบร้อยแล้ว!",
      projectSaved: "บันทึกข้อมูลโปรเจกต์เรียบร้อยแล้ว!",
      projectDeleted: "ลบโปรเจกต์เรียบร้อยแล้ว",
      certSaved: "บันทึกข้อมูลใบรับรองเรียบร้อยแล้ว!",
      certDeleted: "ลบใบรับรองเรียบร้อยแล้ว",
      profilePhotoUpdated: "อัปเดตรูปภาพโปรไฟล์เรียบร้อยแล้ว!",
      pdfAttached: "แนบไฟล์ PDF ใบรับรองเรียบร้อยแล้ว!",
      themeSwitched: "สลับโหมดสีเรียบร้อยแล้ว",
      copied: "คัดลอกลงคลิปบอร์ดแล้ว!",
      fileTooLarge: "ไฟล์มีขนาดใหญ่เกินไป กรุณาเลือกไฟล์ที่มีขนาดไม่เกิน 15MB"
    }
  },
  en: {
    // Nav items
    nav: {
      profile: "Profile & About",
      education: "Education",
      skills: "Skills",
      experience: "Experience",
      projects: "My Projects",
      certifications: "Certifications",
      statusBadge: "Available for Internship",
      contactBtn: "Contact Me",
      spuBadge: "SPU ICT 2nd Year"
    },
    // Top Bar
    topbar: {
      currentLang: "EN",
      switchLang: "ไทย",
      themeLight: "Light",
      themeDark: "Dark",
      downloadCv: "Download Resume"
    },
    // Section 1: Hero & Profile
    hero: {
      greeting: "Hello, I am",
      name: "Wuttipat Panphuang",
      nameEn: "Wuttipat Panphuang",
      role: "2nd Year ICT Student & Full-Stack Developer",
      bio: "Passionate about modern web application development, database architecture, and cloud solutions. Constantly eager to learn cutting-edge technologies, dedicated to building high-performance, user-friendly digital experiences.",
      university: "Sripatum University (SPU)",
      faculty: "Faculty of Information Technology, B.Sc. in ICT",
      year: "2nd Year Undergraduate",
      gpaxLabel: "Cumulative GPAX",
      gpaxValue: "3.78",
      emailLabel: "Email",
      phoneLabel: "Phone",
      locationLabel: "Location",
      locationValue: "Bangkok, Thailand",
      changePhotoBtn: "Change Profile Photo",
      uploadPhotoHint: "Click to upload your custom photo (JPG, PNG)",
      statProjects: "Projects Built",
      statCerts: "Certifications",
      statTechs: "Tech Stack Tools",
      statYear: "2nd Year SPU"
    },
    // Section 2: Education
    education: {
      title: "Education",
      subtitle: "Academic journey and solid foundation in Information & Communication Technology",
      degree: "Bachelor of Science (B.Sc.)",
      major: "Information and Communication Technology (ICT)",
      institution: "Sripatum University (SPU)",
      period: "2023 – Present (2nd Year)",
      gpaLabel: "Cumulative GPAX:",
      highlightCourseTitle: "Core Relevant Coursework Completed:",
      courses: [
        "Data Structures & Algorithms",
        "Web Application Development",
        "Database Systems & Design",
        "Computer Network & Cloud Infrastructure",
        "Object-Oriented Programming (OOP)",
        "Software Engineering & UX/UI Design"
      ],
      highSchool: {
        title: "Senior High School (Science - Math - Chinese Track)",
        institution: "Thepsirin Samutprakan School",
        period: "2020 – 2023",
        desc: "Graduated with a focus in Science, Mathematics, and Chinese language, establishing a strong foundation in analytical logic and communication."
      }
    },
    // Section 3: Skills
    skills: {
      title: "Technical Skills",
      subtitle: "Tools, languages, and frameworks in my current development workflow",
      categories: {
        languages: "Programming Languages",
        languagesDesc: "Core languages used across software projects",
        frontend: "Frontend Development",
        frontendDesc: "Crafting interactive, accessible, and responsive user interfaces",
        backend: "Backend & Database",
        backendDesc: "API architecture, data modeling, and server-side logic",
        tools: "Tools & DevOps & Cloud",
        toolsDesc: "Version control, containerization, and modern deployment pipelines"
      }
    },
    // Section 4: Experience
    experience: {
      title: "Work Experience",
      subtitle: "Professional employment and corporate work background",
      emptyTitle: "No Work Experience Yet",
      emptyDesc: "Currently a 2nd-year ICT undergraduate student at Sripatum University, focusing on core computing curriculum and actively seeking tech internship opportunities.",
      items: []
    },
    // Section 5: Projects
    projects: {
      title: "My Projects",
      subtitle: "Featured real-world applications, academic coursework, and system prototypes",
      filterAll: "All",
      filterFullStack: "Full-Stack",
      filterFrontend: "Frontend",
      filterBackend: "Backend",
      addBtn: "Add New Project",
      emptyState: "No projects found in this category",
      modalAddTitle: "Add New Project",
      modalEditTitle: "Edit Project",
      formTitle: "Project Title",
      formCategory: "Category",
      formDescription: "Description",
      formTech: "Technologies (comma-separated, e.g. React, Tailwind, Node.js)",
      formDemoUrl: "Live Demo URL",
      formRepoUrl: "GitHub Repository URL",
      formImage: "Project Cover Image",
      formImageHint: "Supports JPG, PNG, WebP images",
      saveBtn: "Save Project",
      cancelBtn: "Cancel",
      deleteConfirm: "Are you sure you want to delete this project?",
      btnEdit: "Edit",
      btnDelete: "Delete",
      btnChangeImg: "Change Image",
      btnViewDemo: "Live Demo",
      btnSource: "Source Code"
    },
    // Section 6: Certifications
    certifications: {
      title: "Training & Certifications",
      subtitle: "Verified credentials, professional workshops, and attached PDF certificates",
      addBtn: "Add New Certificate",
      emptyState: "No certifications found",
      modalAddTitle: "Add New Certificate",
      modalEditTitle: "Edit Certificate",
      formTitle: "Course / Certificate Title",
      formIssuer: "Issuing Organization",
      formDate: "Date Issued",
      formCredentialId: "Credential ID / License",
      formPdf: "PDF Document Attachment",
      formPdfHint: "Select a .pdf document to attach",
      saveBtn: "Save Certificate",
      cancelBtn: "Cancel",
      btnEdit: "Edit",
      btnDelete: "Delete",
      btnViewPdf: "View PDF",
      btnAttachPdf: "Attach PDF",
      deleteConfirm: "Are you sure you want to delete this certification?",
      pdfModalTitle: "Certificate Document Preview",
      noPdfAlert: "No PDF file attached yet for this certificate. Please click Attach PDF."
    },
    // Common / Modal / Toast
    common: {
      close: "Close",
      loading: "Processing...",
      selectFile: "Select File",
      uploadSuccess: "File uploaded successfully!",
      projectSaved: "Project saved successfully!",
      projectDeleted: "Project deleted successfully",
      certSaved: "Certificate saved successfully!",
      certDeleted: "Certificate deleted successfully",
      profilePhotoUpdated: "Profile photo updated successfully!",
      pdfAttached: "PDF Certificate attached successfully!",
      themeSwitched: "Theme changed successfully",
      copied: "Copied to clipboard!",
      fileTooLarge: "File exceeds 15MB limit. Please choose a smaller file."
    }
  }
};

// Seed Projects (Real ICT student projects)
const defaultProjects = [
  {
    id: "proj-storytelling",
    title: {
      th: "Storytelling Quest",
      en: "Storytelling Quest"
    },
    category: "Frontend",
    description: {
      th: "Storytelling game-quest for ULC10-147 คณะนิเทศศาสตร์และน้ำดื่ม SPU",
      en: "Storytelling game-quest for ULC10-147 School of Communication Arts & SPU Water"
    },
    tech: ["HTML", "Tailwind CSS", "JavaScript"],
    image: "assets/storytelling-quest.png",
    demoUrl: "https://wuttipat1.github.io/StorytellingQuest/",
    repoUrl: "https://github.com/Wuttipat1/StorytellingQuest"
  }
];

// Seed Certifications with real attached PDF document
const defaultCertificates = [
  {
    id: "cert-aws-partyrock",
    title: {
      th: "AWS Generative AI & PartyRock workshop",
      en: "AWS Generative AI & PartyRock workshop"
    },
    issuer: "AWS",
    date: "2024-10-07",
    credentialId: "AWS-PR-2024",
    pdfName: "AWS_Generative_AI_PartyRock_Workshop.pdf",
    pdfUrl: "assets/aws-workshop-cert.pdf",
    pdfData: null
  }
];

window.translations = translations;
window.defaultProjects = defaultProjects;
window.defaultCertificates = defaultCertificates;
