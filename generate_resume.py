import os
from reportlab.lib.pagesizes import letter, A4
from reportlab.lib import colors
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, HRFlowable, ListFlowable, ListItem
)
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch

def build_pdf(filename="Ashu_Resume.pdf"):
    # Target: Exactly 1 Page A4
    doc = SimpleDocTemplate(
        filename,
        pagesize=A4,
        leftMargin=32,
        rightMargin=32,
        topMargin=26,
        bottomMargin=26
    )

    styles = getSampleStyleSheet()

    # Base styles
    name_style = ParagraphStyle(
        'ResumeName',
        fontName='Helvetica-Bold',
        fontSize=15,
        leading=17,
        alignment=1, # Center
        textColor=colors.black
    )

    contact_location_style = ParagraphStyle(
        'ResumeLocation',
        fontName='Helvetica',
        fontSize=8.5,
        leading=11,
        alignment=1,
        textColor=colors.black
    )

    contact_links_style = ParagraphStyle(
        'ResumeLinks',
        fontName='Helvetica',
        fontSize=8.5,
        leading=11,
        alignment=1,
        textColor=colors.black
    )

    section_heading_style = ParagraphStyle(
        'SectionHeading',
        fontName='Helvetica-Bold',
        fontSize=9.5,
        leading=11,
        textColor=colors.black,
        spaceBefore=4,
        spaceAfter=1
    )

    body_style = ParagraphStyle(
        'Body',
        fontName='Helvetica',
        fontSize=8.2,
        leading=10.5,
        textColor=colors.black
    )

    bullet_style = ParagraphStyle(
        'BulletText',
        fontName='Helvetica',
        fontSize=8.0,
        leading=10.2,
        textColor=colors.black
    )

    story = []

    # 1. Header
    story.append(Paragraph("ASHU KUMAR MAURYA", name_style))
    story.append(Spacer(1, 1))
    story.append(Paragraph("Ghaziabad, Uttar Pradesh", contact_location_style))
    story.append(Spacer(1, 1))
    
    links_html = (
        '<font color="#000000">ashumaurya2597@gmail.com</font> | '
        '+91-9170661995 | '
        '<a href="https://linkedin.com" color="#0055cc"><u>LinkedIn</u></a> | '
        '<a href="https://github.com/AshuMaurya1" color="#0055cc"><u>GitHub</u></a> | '
        '<a href="https://leetcode.com" color="#0055cc"><u>LeetCode</u></a>'
    )
    story.append(Paragraph(links_html, contact_links_style))
    story.append(Spacer(1, 4))

    def add_section_header(title):
        story.append(Paragraph(title, section_heading_style))
        story.append(HRFlowable(width="100%", thickness=0.8, color=colors.black, spaceBefore=1, spaceAfter=3))

    # 2. SUMMARY
    add_section_header("SUMMARY")
    summary_text = (
        "Full-Stack Web Developer and Computer Science and Engineering undergraduate with a strong foundation in "
        "Data Structures, Algorithms, and Object-Oriented Programming. Skilled in building responsive user interfaces "
        "and secure RESTful APIs with JavaScript, React.js, Node.js, Express.js, and MongoDB (MERN Stack). "
        "Experience applying Machine Learning to real-time systems, with 300+ solved algorithmic problems and Git-based end-to-end development."
    )
    story.append(Paragraph(summary_text, body_style))
    story.append(Spacer(1, 3))

    # 3. TECHNICAL SKILLS
    add_section_header("TECHNICAL SKILLS")
    skills = [
        "<b>Languages:</b> Java, JavaScript (ES6+), HTML5, CSS3",
        "<b>Frameworks &amp; Libraries:</b> React.js, Node.js, Express.js, FastAPI, Tailwind CSS, REST APIs",
        "<b>Databases:</b> MongoDB",
        "<b>Tools:</b> Git, GitHub, VS Code, Postman",
        "<b>Core Competencies:</b> Data Structures &amp; Algorithms, OOP, Database Design, RESTful API Design, Machine Learning (Random Forest, XGBoost, Scikit-learn), Version Control",
        "<b>Soft Skills:</b> Problem-Solving, Team Collaboration, Communication, Time Management"
    ]
    for s in skills:
        story.append(Paragraph(s, body_style))
    story.append(Spacer(1, 3))

    # 4. PROJECTS
    add_section_header("PROJECTS")

    def add_project(title, tech, dates, bullets):
        header_table = Table(
            [[
                Paragraph(f"<b>{title}</b> | <b>{tech}</b>", body_style),
                Paragraph(f"<b>{dates}</b>", ParagraphStyle('RightDate', parent=body_style, alignment=2))
            ]],
            colWidths=[400, 131]
        )
        header_table.setStyle(TableStyle([
            ('VALIGN', (0,0), (-1,-1), 'TOP'),
            ('LEFTPADDING', (0,0), (-1,-1), 0),
            ('RIGHTPADDING', (0,0), (-1,-1), 0),
            ('TOPPADDING', (0,0), (-1,-1), 0),
            ('BOTTOMPADDING', (0,0), (-1,-1), 1),
        ]))
        story.append(header_table)
        for b in bullets:
            b_para = Paragraph(f"&bull;&nbsp;&nbsp;{b}", bullet_style)
            story.append(b_para)
        story.append(Spacer(1, 2))

    # Project 1
    add_project(
        "AI-Based Traffic Congestion Prediction System",
        "React.js, Python, Node.js",
        "May 2026 – Sep 2026",
        [
            "Developed an intelligent traffic management system using machine learning (Random Forest, XGBoost) to predict congestion and dynamically adjust traffic signal timings.",
            "Built a full-stack application with a React.js analytics dashboard, a Python/FastAPI ML backend, and a Node.js API/simulation service, backed by SQLite.",
            "Implemented a safety-critical signal timing engine with conflict prevention and adaptive control logic, reducing vehicle waiting times and improving throughput versus fixed-time signals."
        ]
    )

    # Project 2
    add_project(
        "Voice Assistant",
        "HTML5, CSS3, JavaScript",
        "Jan 2025 – Mar 2025",
        [
            "Developed a client-side Voice Assistant supporting 15+ real-time voice commands using the Web Speech API and JavaScript.",
            "Constructed a mobile-first responsive interface across 5+ screen resolutions, reducing visual layout shifts by 100%.",
            "Streamlined asynchronous event handlers and speech synthesis pipelines to achieve sub-300ms command execution latency.",
            "Engineered automated fallback validation and speech error handling, ensuring 98% command recognition accuracy across test scenarios."
        ]
    )

    # Project 3
    add_project(
        "Agricultural Equipment Rental Platform",
        "React.js, Node.js, Express.js, MongoDB",
        "Jan 2026 – Jul 2026",
        [
            "Architected a full-stack rental platform supporting 4+ tractor categories with real-time inventory tracking and date-based scheduling.",
            "Built a comprehensive owner management portal featuring 10+ REST endpoints to manage equipment inventory, track bookings, and calculate revenue metrics.",
            "Implemented JWT authentication, 8+ secure route guards, and MongoDB schema validation to eliminate 100% of double-booking scheduling conflicts."
        ]
    )
    story.append(Spacer(1, 1))

    # 5. EDUCATION
    add_section_header("EDUCATION")

    def add_edu_row(inst, dates, degree, grade, coursework=None):
        r1 = Table(
            [[
                Paragraph(f"<b>{inst}</b>", body_style),
                Paragraph(f"<b>{dates}</b>", ParagraphStyle('RDate', parent=body_style, alignment=2))
            ]],
            colWidths=[420, 111]
        )
        r1.setStyle(TableStyle([
            ('LEFTPADDING', (0,0), (-1,-1), 0),
            ('RIGHTPADDING', (0,0), (-1,-1), 0),
            ('TOPPADDING', (0,0), (-1,-1), 0),
            ('BOTTOMPADDING', (0,0), (-1,-1), 0),
        ]))
        story.append(r1)

        r2 = Table(
            [[
                Paragraph(f"<i>{degree}</i>", body_style),
                Paragraph(f"<i>{grade}</i>", ParagraphStyle('RGrade', parent=body_style, alignment=2))
            ]],
            colWidths=[420, 111]
        )
        r2.setStyle(TableStyle([
            ('LEFTPADDING', (0,0), (-1,-1), 0),
            ('RIGHTPADDING', (0,0), (-1,-1), 0),
            ('TOPPADDING', (0,0), (-1,-1), 0),
            ('BOTTOMPADDING', (0,0), (-1,-1), 0),
        ]))
        story.append(r2)

        if coursework:
            story.append(Paragraph(f"<b>Relevant Coursework:</b> {coursework}", body_style))
        story.append(Spacer(1, 2))

    add_edu_row(
        "Ajay Kumar Garg Engineering College, Ghaziabad, Uttar Pradesh",
        "2023 – 2027",
        "Bachelor of Technology in Computer Science and Engineering",
        "CGPA: 7.0/10",
        "Data Structures &amp; Algorithms, Web Development, Operating Systems, Computer Architecture"
    )

    add_edu_row(
        "Maa Vindhyavasini Inter College, Paanpi, Sonbhadra",
        "2021 – 2022",
        "Intermediate (Class XII)",
        "Aggregate: 60.0%"
    )

    add_edu_row(
        "Maa Vindhyavasini Inter College, Paanpi, Sonbhadra",
        "2019 – 2020",
        "High School (Class X)",
        "Aggregate: 64.5%"
    )
    story.append(Spacer(1, 1))

    # 6. CERTIFICATIONS
    add_section_header("CERTIFICATIONS")
    story.append(Paragraph(
        "&bull;&nbsp;&nbsp;<b>Full Stack Web Development</b> &mdash; 6-Week Job-Oriented Training by CodeSquadz &amp; AppSquadz, in collaboration with Ajay Kumar Garg Engineering College, Ghaziabad (Jun 2026 &ndash; Jul 2026).",
        bullet_style
    ))
    story.append(Spacer(1, 3))

    # 7. HONORS & ACHIEVEMENTS
    add_section_header("HONORS &amp; ACHIEVEMENTS")
    achievements = [
        "<b>LeetCode Consistency:</b> Solved 300+ algorithmic problems while sustaining an active 200-day streak covering arrays, linked lists, trees, and memoization algorithms.",
        "<b>Technical Workshop:</b> Selected for AACAR 9.0 and completed 16 hours of intensive training in Automotive Technology hosted by SAE India Collegiate Club &amp; Bosch JCC.",
        "<b>Technical Coursework:</b> Completed 100+ hours of structured DSA training (College Wallah) and full-stack React.js specialization (Love Babbar)."
    ]
    for ach in achievements:
        story.append(Paragraph(f"&bull;&nbsp;&nbsp;{ach}", bullet_style))
    story.append(Spacer(1, 3))

    # 8. INTERESTS
    add_section_header("INTERESTS")
    story.append(Paragraph("Playing Cricket &bull; Exploring Emerging Technologies", body_style))

    doc.build(story)
    print("PDF Generated Successfully:", filename)

if __name__ == "__main__":
    build_pdf("Ashu_Resume.pdf")
