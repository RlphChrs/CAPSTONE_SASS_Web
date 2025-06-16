# SAO Admin Web Portal – Capstone Project

This repository contains the **web application** developed as part of my capstone project. It serves as a digital portal for **SAO (Student Affairs Office) Admins** to manage and oversee student-related activities such as submissions, appointments, and reports.  

Built with a clean and modern frontend using **Tailwind CSS**, and integrated with a custom **backend API**, this project highlights full-stack web development and responsive design tailored for administrative workflows.

---

## Features

- 🔐 **Admin Authentication** – Secure login system for SAO Admins
- 📥 **Manage Submissions** – View and respond to student letter submissions
- 📅 **Appointment Handling** – Review and confirm student appointments
- 📝 **Report Monitoring** – Track student reports and feedback
- 🛠️ **Upload Student List** – Upload a CSV of enrolled students; student registration requires a valid student ID match
- 🤖 **Chatbot Knowledge Management** – Manually upload chatbot data for FAQ and response automation
- 🔔 **Notification System** – Alerts admins of new student activity (submissions, appointments, etc.)

---

## Tech Stack

- **HTML/CSS/JavaScript**
- **Tailwind CSS** – For utility-first, responsive design  
- **React.js** – For component-based UI
- 
 ---
 
## Registration Logic

- SAO Admins can **upload a student list** (typically as a `.csv` file) containing valid student IDs and information.
- When a student attempts to register on the system, their **student ID must match** an entry in the uploaded list.
- This ensures that only officially enrolled students gain access to the platform.

---

## Chatbot Knowledge Upload

- SAO Admins can **manually upload chatbot knowledge** via a pdf file. It is necessary cause that is where the chatbot is getting data to respond.
- These entries help populate the chatbot’s responses, supporting FAQs and many more students queries.

---

## Author  
Ralph Pilapil  
ralphc.pilapil@gmail.com
