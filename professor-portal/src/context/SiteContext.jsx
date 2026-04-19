/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from 'react';

const STORAGE_KEY = 'professor-portal-content-v2';

const defaultContent = {
  profile: {
    fullName: 'حسام عبد الله مرامرية',
    role: {
      ar: 'أستاذ مكلف بالهندسة البيداغوجية',
      en: 'Professor in Charge of Pedagogical Engineering',
      fr: 'Professeur charge de l ingenierie pedagogique',
    },
    welcome: {
      ar: 'نصنع معًا جيلاً متعلمًا يمتلك مهارات المستقبل ويحوّل المعرفة إلى أثر حقيقي في المجتمع.',
      en: 'Together we build a generation that masters future skills and transforms knowledge into real impact.',
      fr: 'Ensemble, nous formons une generation qui maitrise les competences d avenir et transforme le savoir en impact reel.',
    },
    email: 'houssamhassou12@gmail.com',
    phone: '0665267612',
    location: 'Algerie',
    links: [
      { id: 'facebook', label: 'Facebook - Houssam Abdallah Mrameria', url: 'https://www.facebook.com/hassou.meramria' },
    ],
  },
  domains: [
    {
      id: 'informatique',
      icon: '🖥️',
      colorClass: 'blue',
      title: { ar: 'الإعلام الآلي وقواعد البيانات', en: 'Computer Science and Databases', fr: 'Informatique et bases de donnees' },
      description: {
        ar: 'دروس عملية في البرمجة، تطوير الويب، ونظم قواعد البيانات.',
        en: 'Practical lessons in programming, web development, and database systems.',
        fr: 'Cours pratiques en programmation, developpement web et systemes de bases de donnees.',
      },
      resources: {
        lessons: [
          { id: 'inf-l-1', title: 'CS50x - Introduction to Computer Science', description: 'Harvard full introductory CS course.', type: 'link', url: 'https://cs50.harvard.edu/x/' },
          { id: 'inf-l-2', title: 'MIT OCW 6.0001', description: 'Intro to computer science and Python.', type: 'link', url: 'https://ocw.mit.edu/courses/6-0001-introduction-to-computer-science-and-programming-in-python-fall-2016/' },
          { id: 'inf-l-3', title: 'Khan Academy - Computing', description: 'Beginner-friendly computing track.', type: 'link', url: 'https://www.khanacademy.org/computing' },
          { id: 'inf-l-4', title: 'freeCodeCamp Learn', description: 'Interactive coding paths and certifications.', type: 'link', url: 'https://www.freecodecamp.org/learn/' },
          { id: 'inf-l-5', title: 'MDN Learn Web Development', description: 'Web fundamentals from Mozilla.', type: 'link', url: 'https://developer.mozilla.org/en-US/docs/Learn' },
          { id: 'inf-l-6', title: 'SQLBolt', description: 'Practical SQL lessons with exercises.', type: 'link', url: 'https://sqlbolt.com/' },
          { id: 'inf-l-7', title: 'PostgreSQL Official Tutorial', description: 'Step-by-step SQL and PostgreSQL practice.', type: 'link', url: 'https://www.postgresql.org/docs/current/tutorial.html' },
          { id: 'inf-l-8', title: 'GeeksforGeeks DBMS', description: 'DBMS concepts for exams and projects.', type: 'link', url: 'https://www.geeksforgeeks.org/dbms/' },
        ],
        books: [
          { id: 'inf-b-ar-1', title: 'البرمجة بلغة بايثون - أكاديمية حسوب', description: 'من أقوى الكتب العربية العملية في بايثون.', type: 'ebook', url: 'https://academy.hsoub.com/files/15-%D8%A7%D9%84%D8%A8%D8%B1%D9%85%D8%AC%D8%A9-%D8%A8%D9%84%D8%BA%D8%A9-%D8%A8%D8%A7%D9%8A%D8%AB%D9%88%D9%86/' },
          { id: 'inf-b-ar-2', title: 'البرمجة بلغة جافاسكربت - أكاديمية حسوب', description: 'كتاب عربي قوي من حسوب في JavaScript.', type: 'ebook', url: 'https://academy.hsoub.com/files/27-%D8%A7%D9%84%D8%A8%D8%B1%D9%85%D8%AC%D8%A9-%D8%A8%D9%84%D8%BA%D8%A9-%D8%AC%D8%A7%D9%81%D8%A7%D8%B3%D9%83%D8%B1%D8%A8%D8%AA/' },
          { id: 'inf-b-ar-3', title: 'البرمجة باستخدام Node.js - أكاديمية حسوب', description: 'مرجع عربي ممتاز لبناء تطبيقات Node.js.', type: 'ebook', url: 'https://academy.hsoub.com/files/32-%25D8%25A7%25D9%2584%25D8%25A8%25D8%25B1%25D9%2585%25D8%25AC%25D8%25A9-%25D8%25A8%25D8%25A7%25D8%25B3%25D8%25AA%25D8%25AE%25D8%25AF%25D8%25A7%25D9%2585-nodejs/' },
          { id: 'inf-b-ar-4', title: 'تعلم البرمجة للمبتدئين - أكاديمية حسوب', description: 'مدخل عربي شامل ومنظم لطلاب البداية.', type: 'ebook', url: 'https://academy.hsoub.com/files/35-%D8%AA%D8%B9%D9%84%D9%85-%D8%A7%D9%84%D8%A8%D8%B1%D9%85%D8%AC%D8%A9-%D9%84%D9%84%D9%85%D8%A8%D8%AA%D8%AF%D8%A6%D9%8A%D9%86/' },
          { id: 'inf-b-ar-5', title: 'البرمجة بلغة رست - أكاديمية حسوب', description: 'كتاب عربي تقني متقدم في Rust.', type: 'ebook', url: 'https://academy.hsoub.com/files/40-%D8%A7%D9%84%D8%A8%D8%B1%D9%85%D8%AC%D8%A9-%D8%A8%D9%84%D8%BA%D8%A9-%D8%B1%D8%B3%D8%AA/' },
          { id: 'inf-b-ar-6', title: 'تعلم البرمجة بلغة Go - أكاديمية حسوب', description: 'مرجع عربي حديث لتعلم Go.', type: 'ebook', url: 'https://academy.hsoub.com/files/41-%D8%AA%D8%B9%D9%84%D9%85-%D8%A7%D9%84%D8%A8%D8%B1%D9%85%D8%AC%D8%A9-%D8%A8%D9%84%D8%BA%D8%A9-go/' },
          { id: 'inf-b-ar-7', title: 'أتمتة المهام المملة عبر بايثون - أكاديمية حسوب', description: 'كتاب عربي عملي عالي الجودة لأتمتة المهام.', type: 'ebook', url: 'https://academy.hsoub.com/files/43-%D8%A3%D8%AA%D9%85%D8%AA%D8%A9-%D8%A7%D9%84%D9%85%D9%87%D8%A7%D9%85-%D8%A7%D9%84%D9%85%D9%85%D9%84%D8%A9-%D8%B9%D8%A8%D8%B1-%D8%A8%D8%A7%D9%8A%D8%AB%D9%88%D9%86/' },
          { id: 'inf-b-ar-8', title: 'موضوع تك - مرجع عربي داعم', description: 'مقالات تقنية عربية مساعدة (ليست كتبًا كاملة).', type: 'ebook', url: 'https://tech.mawdoo3.com/' },
          { id: 'inf-b-1', title: 'Think Python 2e (PDF)', description: 'Free Python textbook with direct download.', type: 'pdf', url: 'https://greenteapress.com/thinkpython2/thinkpython2.pdf' },
          { id: 'inf-b-2', title: 'Python for Everybody (PDF)', description: 'Beginner-friendly full book, direct PDF.', type: 'pdf', url: 'https://do1.dr-chuck.com/pythonlearn/EN_us/pythonlearn.pdf' },
          { id: 'inf-b-3', title: 'Open Data Structures - Python (PDF)', description: 'Data structures with Python, direct PDF.', type: 'pdf', url: 'https://opendatastructures.org/ods-python.pdf' },
          { id: 'inf-b-4', title: 'Open Data Structures - Java (PDF)', description: 'Java edition of ODS, direct PDF.', type: 'pdf', url: 'https://opendatastructures.org/ods-java.pdf' },
          { id: 'inf-b-5', title: 'MIT 6.0001 Lecture 1 Notes (PDF)', description: 'Official MIT lecture notes, direct PDF.', type: 'pdf', url: 'https://ocw.mit.edu/courses/6-0001-introduction-to-computer-science-and-programming-in-python-fall-2016/e921a690079369751bcce3e34da6c6ee_MIT6_0001F16_Lec1.pdf' },
          { id: 'inf-b-6', title: 'MIT 6.0001 Lecture 2 Notes (PDF)', description: 'Official MIT lecture notes, direct PDF.', type: 'pdf', url: 'https://ocw.mit.edu/courses/6-0001-introduction-to-computer-science-and-programming-in-python-fall-2016/ba2947b25b1580e4a84df0ec5dbe5cdd_MIT6_0001F16_Lec2.pdf' },
          { id: 'inf-b-7', title: 'MIT 6.0001 Lecture 3 Notes (PDF)', description: 'Official MIT lecture notes, direct PDF.', type: 'pdf', url: 'https://ocw.mit.edu/courses/6-0001-introduction-to-computer-science-and-programming-in-python-fall-2016/b9b9a82a29e8746db1facfbd30c07940_MIT6_0001F16_Lec3.pdf' },
          { id: 'inf-b-8', title: 'MIT 6.0001 Lecture 4 Notes (PDF)', description: 'Official MIT lecture notes, direct PDF.', type: 'pdf', url: 'https://ocw.mit.edu/courses/6-0001-introduction-to-computer-science-and-programming-in-python-fall-2016/6ba59859535f1566dd57a7279aeba5d1_MIT6_0001F16_Lec4.pdf' },
        ],
        files: [
          { id: 'inf-f-1', title: 'MIT Mathematics for Computer Science (PDF)', description: 'Official course notes for discrete math.', type: 'pdf', url: 'https://ocw.mit.edu/courses/6-042j-mathematics-for-computer-science-fall-2010/pages/readings/' },
          { id: 'inf-f-2', title: 'PostgreSQL Documentation', description: 'Official complete database manual.', type: 'pdf', url: 'https://www.postgresql.org/docs/' },
          { id: 'inf-f-3', title: 'MySQL Tutorial', description: 'Structured MySQL learning and reference.', type: 'pdf', url: 'https://www.mysqltutorial.org/' },
          { id: 'inf-f-4', title: 'SQLite Documentation', description: 'Lightweight SQL database docs.', type: 'pdf', url: 'https://sqlite.org/docs.html' },
          { id: 'inf-f-5', title: 'Python Official Docs', description: 'Core language and standard library docs.', type: 'pdf', url: 'https://docs.python.org/3/' },
          { id: 'inf-f-6', title: 'Git Documentation', description: 'Version control handbook and reference.', type: 'pdf', url: 'https://git-scm.com/doc' },
        ],
        videos: [
          { id: 'inf-v-1', title: 'CS50 2025 Playlist', description: 'Complete CS50 lecture series.', type: 'video', url: 'https://www.youtube.com/@cs50' },
          { id: 'inf-v-2', title: 'freeCodeCamp - Full Courses', description: 'Long-form practical coding tutorials.', type: 'video', url: 'https://www.youtube.com/@freecodecamp' },
          { id: 'inf-v-3', title: 'Traversy Media', description: 'Web development and backend tutorials.', type: 'video', url: 'https://www.youtube.com/@TraversyMedia' },
          { id: 'inf-v-4', title: 'The Net Ninja', description: 'Structured playlists for modern stacks.', type: 'video', url: 'https://www.youtube.com/@NetNinja' },
          { id: 'inf-v-5', title: 'Elzero Web School', description: 'Comprehensive Arabic web/programming content.', type: 'video', url: 'https://www.youtube.com/@ElzeroWebSchool' },
          { id: 'inf-v-6', title: 'Programming Advices', description: 'Arabic programming roadmaps and explanations.', type: 'video', url: 'https://www.youtube.com/@ProgrammingAdvices' },
          { id: 'inf-v-7', title: 'Corey Schafer', description: 'Python and backend fundamentals.', type: 'video', url: 'https://www.youtube.com/@coreyms' },
          { id: 'inf-v-8', title: 'Fireship', description: 'Fast, high-quality developer explainers.', type: 'video', url: 'https://www.youtube.com/@Fireship' },
        ],
      },
    },
    {
      id: 'reseaux',
      icon: '🔐',
      colorClass: 'cyan',
      title: { ar: 'الشبكات وأمن المعلومات', en: 'Networks and Cybersecurity', fr: 'Reseaux et cybersecurite' },
      description: {
        ar: 'مسار متدرج من أساسيات الشبكات إلى الأمن السيبراني.',
        en: 'A progressive track from networking basics to cybersecurity.',
        fr: 'Parcours progressif des fondamentaux reseaux a la cybersecurite.',
      },
      resources: {
lessons: [
          { id: 'net-l-1', title: 'Cisco Networking Academy', description: 'Structured networking and cybersecurity tracks.', type: 'link', url: 'https://www.netacad.com/courses/networking' },
          { id: 'net-l-2', title: 'Fortinet Training Institute', description: 'Free security awareness and NSE training paths.', type: 'link', url: 'https://training.fortinet.com/' },
          { id: 'net-l-3', title: 'Juniper Open Learning', description: 'Routing, switching, and network security courses.', type: 'link', url: 'https://learningportal.juniper.net/juniper/user_activity_info.aspx?id=11478' },
          { id: 'net-l-4', title: 'TryHackMe Learning Paths', description: 'Hands-on cybersecurity labs and guided tracks.', type: 'link', url: 'https://tryhackme.com/r/path' },
          { id: 'net-l-5', title: 'Hack The Box Academy', description: 'Practical penetration testing and defensive modules.', type: 'link', url: 'https://academy.hackthebox.com/' },
          { id: 'net-l-6', title: 'Cybrary Catalog', description: 'Blue team and red team oriented learning paths.', type: 'link', url: 'https://www.cybrary.it/catalog' },
          { id: 'net-l-7', title: 'Palo Alto Beacon', description: 'Network security and SOC-oriented free lessons.', type: 'link', url: 'https://beacon.paloaltonetworks.com/' },
          { id: 'net-l-8', title: 'Cisco Skills for All', description: 'Professional-level networking and security learning paths.', type: 'link', url: 'https://skillsforall.com/' },
          { id: 'net-l-ar-1', title: 'مقدمة للأمن السيبراني - Cybrary', description: 'مقدمة شاملة مجانية للأمن السيبراني من Cybrary.', type: 'link', url: 'https://www.cybrary.it/course/introduction-to-it-and-cybersecurity' },
          { id: 'net-l-ar-2', title: 'مسار Pre-Security - TryHackMe', description: 'مسار تفاعلي للمبتدئين في الأمن.', type: 'link', url: 'https://tryhackme.com/path/outline/presecurity' },
          { id: 'net-l-ar-3', title: 'أساسيات الشبكات - Professor Messer', description: 'كورس مجاني شامل لأساسيات الشبكات.', type: 'link', url: 'https://www.professormesser.com/network-plus/n10-008/n10-008-video/n10-008-training-course' },
          { id: 'net-l-ar-4', title: 'البرمجة بلغة بايثون - Python Official', description: 'التوثيق الرسمي ل-python 3.', type: 'link', url: 'https://docs.python.org/3/tutorial' },
          { id: 'net-l-ar-5', title: 'Learn Python - تفاعلي', description: 'تعلم بايثون بتمارين مباشرة في المتصفح.', type: 'link', url: 'https://www.learnpython.org' },
          { id: 'net-l-ar-6', title: 'أساسيات Linux - OverTheWire Bandit', description: 'تعلم Linux عبر تحديات تفاعلية.', type: 'link', url: 'https://overthewire.org/wargames/bandit' },
          { id: 'net-l-ar-7', title: 'تعلم SQL - SQLZoo', description: 'تعلم SQL بتمارين تفاعلية مجانية.', type: 'link', url: 'https://sqlzoo.net' },
          { id: 'net-l-ar-8', title: 'أمن تطبيقات الويب - PortSwigger', description: 'أفضل منصة مجانية لأمن تطبيقات الويب.', type: 'link', url: 'https://portswigger.net/web-security' },
          { id: 'net-l-ar-9', title: 'SOC Level 1 - TryHackMe', description: 'مسار تدريبي كامل لمحلل SOC.', type: 'link', url: 'https://tryhackme.com/path/outline/soclevel1' },
          { id: 'net-l-ar-10', title: 'أساسيات Linux الأمنية - TryHackMe', description: 'وحدة تفاعلية لأساسيات Linux.', type: 'link', url: 'https://tryhackme.com/module/linux-fundamentals' },
          { id: 'net-l-ar-11', title: 'أمن الشبكات اللاسلكية - TryHackMe', description: 'وحدة تفاعلية لأمن الشبكات اللاسلكية.', type: 'link', url: 'https://tryhackme.com/module/wifi-hacking-101' },
          { id: 'net-l-ar-12', title: 'مقدمة لـ NIST Framework', description: 'الإطار الرسمي للأمن السيبراني.', type: 'link', url: 'https://www.nist.gov/cyberframework' },
        ],
books: [
          { id: 'net-b-1', title: 'The TCP/IP Guide', description: 'Comprehensive reference on TCP/IP protocols.', type: 'ebook', url: 'http://www.tcpipguide.com/free/' },
          { id: 'net-b-2', title: 'Nmap Network Scanning', description: 'Official Nmap book for reconnaissance and scanning.', type: 'ebook', url: 'https://nmap.org/book/' },
          { id: 'net-b-3', title: 'OWASP Web Security Testing Guide', description: 'High-quality security testing methodology guide.', type: 'ebook', url: 'https://owasp.org/www-project-web-security-testing-guide/' },
          { id: 'net-b-4', title: 'Metasploit Unleashed', description: 'Official free penetration testing guide.', type: 'ebook', url: 'https://www.offsec.com/metasploit-unleashed/' },
          { id: 'net-b-5', title: 'CIS Controls v8', description: 'Industry-recognized cybersecurity controls framework.', type: 'ebook', url: 'https://www.cisecurity.org/controls/v8' },
          { id: 'net-b-6', title: 'MITRE ATT&CK Knowledge Base', description: 'Threat behavior matrix and defensive mapping.', type: 'ebook', url: 'https://attack.mitre.org/' },
          { id: 'net-b-7', title: 'OWASP Top 10', description: 'Critical web application security risks.', type: 'ebook', url: 'https://owasp.org/www-project-top-ten/' },
          { id: 'net-b-8', title: 'NIST Cybersecurity Framework 2.0', description: 'Core modern framework for cyber risk governance.', type: 'ebook', url: 'https://www.nist.gov/cyberframework' },
          { id: 'net-b-ar-1', title: 'كتاب التشفير - مقدمة Cryptography 101', description: 'كتاب مجاني عربي لمبادئ التشفير والأساسيات.', type: 'ebook', url: 'https://www.crypto101.io' },
          { id: 'net-b-ar-2', title: 'أساسيات الأمن السيبراني - منصةCyberplus', description: 'خارطة طريق شاملة للمبتدئين في الأمن السيبراني.', type: 'ebook', url: 'https://www.cyberoplus.com/p/cybersecurity-learning-roadmap.html' },
          { id: 'net-b-ar-3', title: 'الدليل الشامل للأمن السيبراني - CyberArab', description: 'مرجع عربي شامل يغطي جميع مستويات الأم��.', type: 'ebook', url: 'https://www.cyberoplus.com/' },
          { id: 'net-b-ar-4', title: 'OSTEP - Three Easy Pieces', description: 'أفضل كتاب مجاني عربي لأنظمة التشغيل.', type: 'ebook', url: 'https://pages.cs.wisc.edu/~remzi/OSTEP/' },
          { id: 'net-b-ar-5', title: 'البرمجة بلغة سي للمبتدئين - Beej Guide', description: 'مرجع شامل ومجاني لتعلم لغة سي.', type: 'ebook', url: 'https://beej.us/guide/bgc' },
          { id: 'net-b-ar-6', title: 'أتمتة المهام بلغة بايثون', description: 'كتاب مجاني عربي لأتمتة المهام.', type: 'ebook', url: 'https://automatetheboringstuff.com' },
          { id: 'net-b-ar-7', title: 'دليل ويب HTTP', description: 'مرجع شامل لبروتوكول HTTP.', type: 'ebook', url: 'https://developer.mozilla.org/en-US/docs/Web/HTTP' },
          { id: 'net-b-ar-8', title: 'ISO 27001 - إطار أمن المعلومات', description: 'المعيار الدولي لنظام إدارة أمن المعلومات.', type: 'ebook', url: 'https://www.iso.org/isoiec-27001-information-security.html' },
          { id: 'net-b-ar-9', title: 'NIST Cybersecurity Framework', description: 'الإطار الرسمي للأمن السيبراني من المعهد الوطني الأمريكي.', type: 'ebook', url: 'https://www.nist.gov/cyberframework' },
          { id: 'net-b-ar-10', title: 'دليل CIS Controls', description: 'أفضل ضوابط الأمن السيبراني العملية.', type: 'ebook', url: 'https://www.cisecurity.org/controls' },
        ],
files: [
          { id: 'net-f-1', title: 'NIST SP 800-61r2 Incident Response (PDF)', description: 'Official incident response lifecycle guide.', type: 'pdf', url: 'https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-61r2.pdf' },
          { id: 'net-f-2', title: 'NIST SP 800-53 Rev.5 (PDF)', description: 'Security and privacy controls catalog.', type: 'pdf', url: 'https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-53r5.pdf' },
          { id: 'net-f-3', title: 'NIST SP 800-40 Rev.4 (PDF)', description: 'Enterprise patch and vulnerability management.', type: 'pdf', url: 'https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-40r4.pdf' },
          { id: 'net-f-4', title: 'CISA Cybersecurity Best Practices', description: 'Practical guidance for defense and resilience.', type: 'pdf', url: 'https://www.cisa.gov/topics/cybersecurity-best-practices' },
          { id: 'net-f-5', title: 'ENISA Threat Landscape Report (PDF)', description: 'European annual cybersecurity threat report.', type: 'pdf', url: 'https://www.enisa.europa.eu/publications/enisa-threat-landscape-2023' },
          { id: 'net-f-6', title: 'OWASP Testing Checklist (PDF)', description: 'Checklist used in practical security assessments.', type: 'pdf', url: 'https://owasp.org/www-project-web-security-testing-guide/assets/archive/OWASP_Testing_Guide_v4.pdf' },
          { id: 'net-f-ar-1', title: 'الخوارزميات وهياكل البيانات', description: 'تصور مرئي تفاعلي للخوارزميات.', type: 'pdf', url: 'https://visualgo.net' },
          { id: 'net-f-ar-2', title: 'مرجع هياكل البيانات - GeeksforGeeks', description: 'مرجع شامل مع أمثلة وكود.', type: 'pdf', url: 'https://www.geeksforgeeks.org/data-structures' },
          { id: 'net-f-ar-3', title: 'أساسيات نظام التشغيل - Linux Command Line', description: 'كتاب مجاني شامل لأوامر Linux.', type: 'pdf', url: 'https://linuxcommand.org/tlcl.php' },
          { id: 'net-f-ar-4', title: 'SQL Injection Prevention - OWASP', description: 'المرجع الرسمي للحماية من SQLi.', type: 'pdf', url: 'https://owasp.org/www-community/attacks/SQL_Injection' },
          { id: 'net-f-ar-5', title: 'دليل UML الشامل', description: 'مرجع شامل لجميع أنواع مخططات UML.', type: 'pdf', url: 'https://www.uml-diagrams.org' },
          { id: 'net-f-ar-6', title: 'أفضل ممارسات أمن Docker', description: 'دليل أمن Docker من CSA.', type: 'pdf', url: 'https://cloudsecurityalliance.org/research/guidance' },
        ],
videos: [
          { id: 'net-v-1', title: 'David Bombal', description: 'Top networking and cybersecurity practical content.', type: 'video', url: 'https://www.youtube.com/@davidbombal' },
          { id: 'net-v-2', title: 'NetworkChuck', description: 'Hands-on labs in networking and ethical hacking.', type: 'video', url: 'https://www.youtube.com/@NetworkChuck' },
          { id: 'net-v-3', title: 'John Hammond', description: 'Cybersecurity walkthroughs and CTF learning.', type: 'video', url: 'https://www.youtube.com/@_JohnHammond' },
          { id: 'net-v-4', title: 'Professor Messer - Security+', description: 'High-quality certification-focused security content.', type: 'video', url: 'https://www.youtube.com/@professormesser' },
          { id: 'net-v-5', title: 'The Cyber Mentor', description: 'Practical penetration testing and methodology.', type: 'video', url: 'https://www.youtube.com/@TCMSecurityAcademy' },
          { id: 'net-v-6', title: 'LiveOverflow', description: 'Advanced exploit and security research explanations.', type: 'video', url: 'https://www.youtube.com/@LiveOverflow' },
          { id: 'net-v-7', title: 'HackerSploit', description: 'Offensive security and tooling labs.', type: 'video', url: 'https://www.youtube.com/@HackerSploit' },
          { id: 'net-v-8', title: 'Black Hills Information Security', description: 'Blue team and SOC defensive operations talks.', type: 'video', url: 'https://www.youtube.com/@BlackHillsInformationSecurity' },
          { id: 'net-v-ar-1', title: 'أكاديمية حسوب - البرمجة', description: 'قناة أكاديمية حسوب التعليمية.', type: 'video', url: 'https://www.youtube.com/@HsoubAcademy' },
          { id: 'net-v-ar-2', title: 'مدرسة البرمجة - Elzero Web School', description: 'شروحات برمجية عربية شاملة.', type: 'video', url: 'https://www.youtube.com/@ElzeroWebSchool' },
          { id: 'net-v-ar-3', title: 'نصائح البرمجة - Programming Advices', description: 'خرائط طريق برمجية عربية.', type: 'video', url: 'https://www.youtube.com/@ProgrammingAdvices' },
          { id: 'net-v-ar-4', title: 'CyberArab - الأمن السيبراني', description: 'قناة متخصصة في الأمن السيبراني.', type: 'video', url: 'https://www.youtube.com/@CyberArab' },
          { id: 'net-v-ar-5', title: 'ALI HACKER - دروس أمنية', description: 'دروس عربية في اختبار الاختراق.', type: 'video', url: 'https://www.youtube.com/@ALIHACKER' },
          { id: 'net-v-ar-6', title: 'Kali Academy - الأمن السيبراني', description: 'منصة تعليمية مجانية للأمن السيبراني.', type: 'video', url: 'https://www.youtube.com/@KaliAcademy' },
        ],
      },
    },
    {
      id: 'maintenance',
      icon: '🔧',
      colorClass: 'amber',
      title: { ar: 'صيانة الأنظمة المعلوماتية', en: 'Systems Maintenance', fr: 'Maintenance des systemes' },
      description: {
        ar: 'تعلم التشخيص والصيانة الوقائية والعلاجية لأنظمة الحاسوب.',
        en: 'Learn diagnostics and preventive/corrective maintenance for computer systems.',
        fr: 'Apprenez le diagnostic et la maintenance preventive/corrective des systemes informatiques.',
      },
      resources: {
        lessons: [
          { id: 'mnt-l-1', title: 'CompTIA A+ Core Skills', description: 'Core IT support and maintenance competencies.', type: 'link', url: 'https://www.comptia.org/certifications/a' },
          { id: 'mnt-l-2', title: 'Microsoft Learn - Windows Administration', description: 'System administration and troubleshooting paths.', type: 'link', url: 'https://learn.microsoft.com/en-us/training/browse/?products=windows-server' },
          { id: 'mnt-l-3', title: 'Linux Survival', description: 'Linux fundamentals for system maintenance.', type: 'link', url: 'https://linuxsurvival.com/' },
          { id: 'mnt-l-4', title: 'Red Hat Enable Sysadmin', description: 'Real-world Linux administration articles and labs.', type: 'link', url: 'https://www.redhat.com/sysadmin' },
          { id: 'mnt-l-5', title: 'VMware Hands-on Labs', description: 'Virtualization operations and infrastructure labs.', type: 'link', url: 'https://labs.hol.vmware.com/' },
          { id: 'mnt-l-6', title: 'Windows Sysinternals', description: 'Essential advanced troubleshooting toolkit.', type: 'link', url: 'https://learn.microsoft.com/en-us/sysinternals/' },
          { id: 'mnt-l-7', title: 'Ansible Documentation', description: 'Automating maintenance and configuration tasks.', type: 'link', url: 'https://docs.ansible.com/' },
          { id: 'mnt-l-8', title: 'Ubuntu Server Documentation', description: 'Operational maintenance and server hardening.', type: 'link', url: 'https://ubuntu.com/server/docs' },
        ],
        books: [
          { id: 'mnt-b-1', title: 'The Linux Command Line (Free Book)', description: 'Foundational command-line maintenance skills.', type: 'ebook', url: 'https://linuxcommand.org/tlcl.php' },
          { id: 'mnt-b-2', title: 'Debian Administrator Handbook', description: 'Production-grade Linux administration reference.', type: 'ebook', url: 'https://debian-handbook.info/' },
          { id: 'mnt-b-3', title: 'Linux From Scratch', description: 'Deep understanding of Linux internals and build process.', type: 'ebook', url: 'https://www.linuxfromscratch.org/lfs/' },
          { id: 'mnt-b-4', title: 'ArchWiki System Maintenance', description: 'Best maintenance knowledge base in Linux world.', type: 'ebook', url: 'https://wiki.archlinux.org/title/System_maintenance' },
          { id: 'mnt-b-5', title: 'Proxmox VE Documentation', description: 'Virtualization maintenance and backup operations.', type: 'ebook', url: 'https://pve.proxmox.com/pve-docs/' },
          { id: 'mnt-b-6', title: 'OpenZFS Documentation', description: 'Storage integrity, replication, and recovery.', type: 'ebook', url: 'https://openzfs.github.io/openzfs-docs/' },
          { id: 'mnt-b-7', title: 'SRE Book (Google)', description: 'Reliability engineering and operations best practices.', type: 'ebook', url: 'https://sre.google/books/' },
          { id: 'mnt-b-8', title: 'ITIL 4 Foundation Overview', description: 'Service maintenance and incident workflow principles.', type: 'ebook', url: 'https://www.axelos.com/certifications/itil-service-management/itil-4-foundation' },
        ],
        files: [
          { id: 'mnt-f-1', title: 'Ubuntu Official Tutorials', description: 'Official Ubuntu operations and server tutorials.', type: 'pdf', url: 'https://ubuntu.com/tutorials' },
          { id: 'mnt-f-2', title: 'Memtest Open Source Project', description: 'Memory diagnostics resources and documentation.', type: 'pdf', url: 'https://www.memtest.org/' },
          { id: 'mnt-f-3', title: 'smartmontools Manual (PDF)', description: 'Disk health and SMART diagnostics reference.', type: 'pdf', url: 'https://www.smartmontools.org/browser/trunk/www/smartmontools_scsi.xml?format=raw' },
          { id: 'mnt-f-4', title: 'Ansible Getting Started', description: 'Automation quickstart for system admins.', type: 'pdf', url: 'https://docs.ansible.com/ansible/latest/getting_started/index.html' },
          { id: 'mnt-f-5', title: 'NIST SP 800-123 Server Security (PDF)', description: 'General server hardening and maintenance baseline.', type: 'pdf', url: 'https://nvlpubs.nist.gov/nistpubs/Legacy/SP/nistspecialpublication800-123.pdf' },
          { id: 'mnt-f-6', title: 'Windows Security Baselines', description: 'Windows baseline operations and security hardening.', type: 'pdf', url: 'https://learn.microsoft.com/en-us/windows/security/operating-system-security/device-management/windows-security-configuration-framework/windows-security-baselines' },
        ],
        videos: [
          { id: 'mnt-v-1', title: 'Eli The Computer Guy', description: 'Hardware, diagnostics, and IT operations.', type: 'video', url: 'https://www.youtube.com/@elithecomputerguy' },
          { id: 'mnt-v-2', title: 'Kevtech IT Support', description: 'Helpdesk and systems support practical workflows.', type: 'video', url: 'https://www.youtube.com/@KevtechITSupport' },
          { id: 'mnt-v-3', title: 'PowerCert Animated Videos', description: 'Clear explainer videos for IT infrastructure topics.', type: 'video', url: 'https://www.youtube.com/@PowerCertAnimatedVideos' },
          { id: 'mnt-v-4', title: 'Craft Computing', description: 'Virtualization, storage, and home-lab maintenance.', type: 'video', url: 'https://www.youtube.com/@CraftComputing' },
          { id: 'mnt-v-5', title: 'Lawrence Systems', description: 'System administration and network operations.', type: 'video', url: 'https://www.youtube.com/@LAWRENCESYSTEMS' },
          { id: 'mnt-v-6', title: 'Learn Linux TV', description: 'Linux server maintenance and automation.', type: 'video', url: 'https://www.youtube.com/@LearnLinuxTV' },
          { id: 'mnt-v-7', title: 'Network Direction', description: 'Infrastructure operations and enterprise IT concepts.', type: 'video', url: 'https://www.youtube.com/@NetworkDirection' },
          { id: 'mnt-v-8', title: 'Tech World with Nana', description: 'DevOps operations and system reliability practices.', type: 'video', url: 'https://www.youtube.com/@TechWorldwithNana' },
        ],
      },
    },
  ],
  usefulResources: [
    {
      id: 'res-schooldz',
      name: 'School DZ',
      category: 'Learning',
      url: 'https://www.schooldz.com',
      logo: 'https://www.google.com/s2/favicons?sz=256&domain_url=schooldz.com',
    },
    {
      id: 'res-cisco',
      name: 'Cisco Networking Academy',
      category: 'Networking',
      url: 'https://www.netacad.com',
      logo: 'https://www.google.com/s2/favicons?sz=256&domain_url=netacad.com',
    },
    {
      id: 'res-hsoub',
      name: 'Hsoub Academy',
      category: 'Programming',
      url: 'https://academy.hsoub.com',
      logo: 'https://www.google.com/s2/favicons?sz=256&domain_url=academy.hsoub.com',
    },
    {
      id: 'res-edraak',
      name: 'Edraak',
      category: 'MOOC - Arabic',
      url: 'https://www.edraak.org',
      logo: 'https://www.google.com/s2/favicons?sz=256&domain_url=edraak.org',
    },
    {
      id: 'res-rwaq',
      name: 'Rwaq',
      category: 'Open Arabic Courses',
      url: 'https://www.rwaq.org',
      logo: 'https://www.google.com/s2/favicons?sz=256&domain_url=rwaq.org',
    },
    {
      id: 'res-maharatech',
      name: 'MaharaTech (ITI)',
      category: 'Free Tech Career Paths',
      url: 'https://maharatech.gov.eg',
      logo: 'https://www.google.com/s2/favicons?sz=256&domain_url=maharatech.gov.eg',
    },
    {
      id: 'res-satr',
      name: 'Satr Codes',
      category: 'Free Arabic Programming',
      url: 'https://satr.codes/course',
      logo: 'https://www.google.com/s2/favicons?sz=256&domain_url=satr.codes',
    },
    {
      id: 'res-khan-ar',
      name: 'Khan Academy Arabic',
      category: 'Arabic Learning Library',
      url: 'https://ar.khanacademy.org',
      logo: 'https://www.google.com/s2/favicons?sz=256&domain_url=khanacademy.org',
    },
    {
      id: 'res-barmej',
      name: 'Barmej',
      category: 'Arabic Programming Paths',
      url: 'https://www.barmej.com',
      logo: 'https://www.google.com/s2/favicons?sz=256&domain_url=barmej.com',
    },
    {
      id: 'res-elzero',
      name: 'Elzero Web School',
      category: 'Free Arabic Programming',
      url: 'https://elzero.org',
      logo: 'https://www.google.com/s2/favicons?sz=256&domain_url=elzero.org',
    },
    {
      id: 'res-classcentral',
      name: 'Class Central',
      category: 'Free Courses Aggregator',
      url: 'https://www.classcentral.com',
      logo: 'https://www.google.com/s2/favicons?sz=256&domain_url=classcentral.com',
    },
    {
      id: 'res-coursera',
      name: 'Coursera',
      category: 'Audit Free Courses',
      url: 'https://www.coursera.org',
      logo: 'https://www.google.com/s2/favicons?sz=256&domain_url=coursera.org',
    },
    {
      id: 'res-ocw',
      name: 'MIT OpenCourseWare',
      category: 'University Open Content',
      url: 'https://ocw.mit.edu',
      logo: 'https://www.google.com/s2/favicons?sz=256&domain_url=ocw.mit.edu',
    },
    {
      id: 'res-edx',
      name: 'edX',
      category: 'Top University Courses',
      url: 'https://www.edx.org',
      logo: 'https://www.google.com/s2/favicons?sz=256&domain_url=edx.org',
    },
    {
      id: 'res-udemy',
      name: 'Udemy',
      category: 'Large Course Marketplace',
      url: 'https://www.udemy.com',
      logo: 'https://www.google.com/s2/favicons?sz=256&domain_url=udemy.com',
    },
    {
      id: 'res-udacity',
      name: 'Udacity',
      category: 'Tech Nanodegrees',
      url: 'https://www.udacity.com',
      logo: 'https://www.google.com/s2/favicons?sz=256&domain_url=udacity.com',
    },
    {
      id: 'res-futurelearn',
      name: 'FutureLearn',
      category: 'University Programs',
      url: 'https://www.futurelearn.com',
      logo: 'https://www.google.com/s2/favicons?sz=256&domain_url=futurelearn.com',
    },
    {
      id: 'res-alison',
      name: 'Alison',
      category: 'Free Career Courses',
      url: 'https://alison.com',
      logo: 'https://www.google.com/s2/favicons?sz=256&domain_url=alison.com',
    },
    {
      id: 'res-openlearn',
      name: 'OpenLearn',
      category: 'Free University Learning',
      url: 'https://www.open.edu/openlearn/',
      logo: 'https://www.google.com/s2/favicons?sz=256&domain_url=open.edu',
    },
    {
      id: 'res-freecodecamp',
      name: 'freeCodeCamp',
      category: 'Free Programming Certification',
      url: 'https://www.freecodecamp.org',
      logo: 'https://www.google.com/s2/favicons?sz=256&domain_url=freecodecamp.org',
    },
    {
      id: 'res-w3schools',
      name: 'W3Schools',
      category: 'Programming Practice',
      url: 'https://www.w3schools.com',
      logo: 'https://www.google.com/s2/favicons?sz=256&domain_url=w3schools.com',
    },
    {
      id: 'res-mdn',
      name: 'MDN Web Docs',
      category: 'Web Development Reference',
      url: 'https://developer.mozilla.org',
      logo: 'https://www.google.com/s2/favicons?sz=256&domain_url=developer.mozilla.org',
    },
    {
      id: 'res-gfg',
      name: 'GeeksforGeeks',
      category: 'CS Practice and Interview Prep',
      url: 'https://www.geeksforgeeks.org',
      logo: 'https://www.google.com/s2/favicons?sz=256&domain_url=geeksforgeeks.org',
    },
    {
      id: 'res-sololearn',
      name: 'SoloLearn',
      category: 'Mobile Coding Courses',
      url: 'https://www.sololearn.com',
      logo: 'https://www.google.com/s2/favicons?sz=256&domain_url=sololearn.com',
    },
    {
      id: 'res-datacamp',
      name: 'DataCamp',
      category: 'Data Science and AI',
      url: 'https://www.datacamp.com',
      logo: 'https://www.google.com/s2/favicons?sz=256&domain_url=datacamp.com',
    },
    {
      id: 'res-kaggle',
      name: 'Kaggle Learn',
      category: 'Data and ML Practice',
      url: 'https://www.kaggle.com/learn',
      logo: 'https://www.google.com/s2/favicons?sz=256&domain_url=kaggle.com',
    },
    {
      id: 'res-linkedin-learning',
      name: 'LinkedIn Learning',
      category: 'Professional Skills',
      url: 'https://www.linkedin.com/learning/',
      logo: 'https://www.google.com/s2/favicons?sz=256&domain_url=linkedin.com',
    },
    {
      id: 'res-youtube-learning',
      name: 'YouTube Learning',
      category: 'Video Learning Channels',
      url: 'https://www.youtube.com/learning',
      logo: 'https://www.google.com/s2/favicons?sz=256&domain_url=youtube.com',
    },
  ],
};

const ui = {
  ar: {
    dir: 'rtl', home: 'الرئيسية', domains: 'التخصصات', resources: 'الموارد', contact: 'اتصل بي', admin: 'لوحة التحكم', language: 'اللغة',
    heroBadge: 'منصة تعليمية مهنية', explore: 'استكشف التخصصات',
    domainsTitle: 'الفروع والتخصصات', domainsDesc: 'كل فرع يحتوي على دروس وكتب وملفات تعليمية وفيديوهات قابلة للتطوير.',
    lessons: 'الدروس', books: 'الكتب', files: 'الملفات التعليمية', videos: 'الفيديوهات', open: 'فتح', download: 'تحميل', preview: 'معاينة', close: 'إغلاق', noItems: 'لا توجد عناصر حاليا',
    usefulTitle: 'الموارد التعليمية المفيدة', usefulDesc: 'مواقع مهمة في التكنولوجيا والتعلم الرقمي للطلبة والمتربصين.',
    contactTitle: 'اتصل بي', contactDesc: 'للاستفسارات البيداغوجية أو طلب الموارد التعليمية.',
    fullName: 'الاسم الكامل', subject: 'الموضوع', message: 'الرسالة', send: 'إرسال',
    adminTitle: 'لوحة التحكم', adminDesc: 'أضف الموارد التعليمية بدون برمجة.', saveProfile: 'حفظ البيانات', addResource: 'إضافة مورد',
    addUseful: 'إضافة مورد مفيد', domain: 'التخصص', category: 'الصنف', type: 'النوع', title: 'العنوان', description: 'الوصف', link: 'رابط', file: 'ملف',
  },
  en: {
    dir: 'ltr', home: 'Home', domains: 'Domains', resources: 'Resources', contact: 'Contact', admin: 'Admin', language: 'Language',
    heroBadge: 'Professional Learning Platform', explore: 'Explore Domains',
    domainsTitle: 'Domains and Specializations', domainsDesc: 'Each domain includes lessons, books, educational files, and videos.',
    lessons: 'Lessons', books: 'Books', files: 'Educational Files', videos: 'Videos', open: 'Open', download: 'Download', preview: 'Preview', close: 'Close', noItems: 'No items yet',
    usefulTitle: 'Useful Educational Resources', usefulDesc: 'Important websites for technology and digital learning.',
    contactTitle: 'Contact Me', contactDesc: 'For pedagogical questions and educational resources.',
    fullName: 'Full Name', subject: 'Subject', message: 'Message', send: 'Send',
    adminTitle: 'Admin Panel', adminDesc: 'Add educational content without coding.', saveProfile: 'Save Profile', addResource: 'Add Resource',
    addUseful: 'Add Useful Resource', domain: 'Domain', category: 'Category', type: 'Type', title: 'Title', description: 'Description', link: 'Link', file: 'File',
  },
  fr: {
    dir: 'ltr', home: 'Accueil', domains: 'Domaines', resources: 'Ressources', contact: 'Contact', admin: 'Admin', language: 'Langue',
    heroBadge: 'Plateforme educative professionnelle', explore: 'Explorer les domaines',
    domainsTitle: 'Domaines et specialites', domainsDesc: 'Chaque domaine contient des cours, livres, fichiers pedagogiques et videos.',
    lessons: 'Cours', books: 'Livres', files: 'Fichiers pedagogiques', videos: 'Videos', open: 'Ouvrir', download: 'Telecharger', preview: 'Apercu', close: 'Fermer', noItems: 'Aucun element',
    usefulTitle: 'Ressources educatives utiles', usefulDesc: 'Sites importants pour la technologie et l apprentissage numerique.',
    contactTitle: 'Contactez-moi', contactDesc: 'Pour les questions pedagogiques et les ressources de formation.',
    fullName: 'Nom complet', subject: 'Sujet', message: 'Message', send: 'Envoyer',
    adminTitle: 'Panneau Admin', adminDesc: 'Ajoutez des contenus pedagogiques sans programmation.', saveProfile: 'Enregistrer le profil', addResource: 'Ajouter une ressource',
    addUseful: 'Ajouter une ressource utile', domain: 'Domaine', category: 'Categorie', type: 'Type', title: 'Titre', description: 'Description', link: 'Lien', file: 'Fichier',
  },
};

function readContent() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return structuredClone(defaultContent);
  try {
    const parsed = JSON.parse(raw);
    const savedDomains = Array.isArray(parsed?.domains) ? parsed.domains : [];
    const mergedDomains = defaultContent.domains.map((defDomain) => {
      const savedDomain = savedDomains.find((d) => d?.id === defDomain.id);
      if (!savedDomain) return defDomain;

      const mergedResources = { ...defDomain.resources };
      for (const key of ['lessons', 'books', 'files', 'videos']) {
        const savedList = Array.isArray(savedDomain?.resources?.[key]) ? savedDomain.resources[key] : [];
        const finalList = [...savedList];
        for (const item of defDomain.resources[key]) {
          const exists = finalList.some((s) => s?.id === item.id || s?.url === item.url);
          if (!exists) finalList.push(item);
        }
        mergedResources[key] = finalList;
      }

      return {
        ...defDomain,
        ...savedDomain,
        resources: mergedResources,
      };
    });

    const savedResources = Array.isArray(parsed?.usefulResources) ? parsed.usefulResources : [];
    const mergedResources = [...savedResources];

    for (const item of defaultContent.usefulResources) {
      const alreadyExists = mergedResources.some((saved) => saved?.id === item.id || saved?.url === item.url);
      if (!alreadyExists) mergedResources.push(item);
    }

    return { ...parsed, domains: mergedDomains, usefulResources: mergedResources };
  } catch {
    return structuredClone(defaultContent);
  }
}

const SiteContext = createContext(null);

export function SiteProvider({ children }) {
  const [language, setLanguageState] = useState(() => localStorage.getItem('portal-language') || 'ar');
  const [content, setContent] = useState(readContent);
  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = ui[language].dir;
  }, [language]);


  const saveContent = (next) => {
    setContent(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  };

  const setLanguage = (next) => {
    setLanguageState(next);
    localStorage.setItem('portal-language', next);
    document.documentElement.lang = next;
    document.documentElement.dir = ui[next].dir;
  };

  const updateProfile = (patch) => saveContent({ ...content, profile: { ...content.profile, ...patch } });

  const addDomainResource = (domainId, category, resource) => {
    saveContent({
      ...content,
      domains: content.domains.map((d) => d.id !== domainId ? d : {
        ...d,
        resources: { ...d.resources, [category]: [resource, ...d.resources[category]] },
      }),
    });
  };

const addUsefulResource = (resource) => {
    saveContent({ ...content, usefulResources: [resource, ...content.usefulResources] });
  };

  const updateDomainResource = (domainId, category, resourceId, updates) => {
    saveContent({
      ...content,
      domains: content.domains.map((d) => d.id !== domainId ? d : {
        ...d,
        resources: {
          ...d.resources,
          [category]: d.resources[category].map((r) => r.id !== resourceId ? r : { ...r, ...updates }),
        },
      }),
    });
  };

  const deleteDomainResource = (domainId, category, resourceId) => {
    saveContent({
      ...content,
      domains: content.domains.map((d) => d.id !== domainId ? d : {
        ...d,
        resources: {
          ...d.resources,
          [category]: d.resources[category].filter((r) => r.id !== resourceId),
        },
      }),
    });
  };

  const updateUsefulResource = (resourceId, updates) => {
    saveContent({
      ...content,
      usefulResources: content.usefulResources.map((r) => r.id !== resourceId ? r : { ...r, ...updates }),
    });
  };

  const deleteUsefulResource = (resourceId) => {
    saveContent({
      ...content,
      usefulResources: content.usefulResources.filter((r) => r.id !== resourceId),
    });
  };

  const value = { language, setLanguage, t: ui[language], content, updateProfile, addDomainResource, addUsefulResource, updateDomainResource, deleteDomainResource, updateUsefulResource, deleteUsefulResource };
  return <SiteContext.Provider value={value}>{children}</SiteContext.Provider>;
}

export function useSite() {
  const ctx = useContext(SiteContext);
  if (!ctx) throw new Error('useSite must be used inside SiteProvider');
  return ctx;
}

