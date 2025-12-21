# AI-Based Resume Generator

A full-stack web application that leverages the power of Artificial Intelligence (DeepSeek-r1 via Ollama) to transform natural language descriptions into professional, structured resumes. Built with **React** (Frontend) and **Spring Boot** (Backend), this tool ensures data privacy by running the AI model locally on your machine.

---

## 🚀 Features

* **AI-Powered Content Generation:** Simply describe your experience, skills, and background, and the AI generates a professional resume structure for you.
* **Interactive Resume Builder:** A dynamic form allows you to review, edit, and refine the AI-generated data.
* **Live Preview:** See your resume take shape in real-time as you edit.
* **PDF Export:** Download your finalized resume as a high-quality PDF document ready for job applications.
* **Local AI Processing:** Utilizes a local LLM (Ollama), ensuring your personal data never leaves your computer.
* **Modern UI:** A responsive and sleek dark-themed interface built with Tailwind CSS and DaisyUI.

---

## 🛠️ Tech Stack

### **Frontend**
* **Framework:** [React.js](https://react.dev/) (Vite)
* **Styling:** [Tailwind CSS](https://tailwindcss.com/) & [DaisyUI](https://daisyui.com/)
* **State Management:** React Hooks & React Hook Form
* **Routing:** React Router DOM
* **Utilities:** Axios (API), HTML-to-Image, jsPDF (PDF Generation), React Hot Toast

### **Backend**
* **Framework:** [Spring Boot](https://spring.io/projects/spring-boot) (Java 21)
* **AI Integration:** [Spring AI](https://spring.io/projects/spring-ai)
* **Model Provider:** [Ollama](https://ollama.com/) (DeepSeek-r1)
* **Build Tool:** Maven

---

## ⚙️ Prerequisites

Before you begin, ensure you have the following installed on your system:

1.  **Java JDK 21** or higher.
2.  **Node.js** (v18 or higher) and npm.
3.  **Ollama:** Download and install from [ollama.com](https://ollama.com/).

---

## 🏃‍♂️ How to Run the Project

### 1. Setup the AI Model (Ollama)
Open a terminal and pull the required AI model. This runs the model locally.

```bash
# For standard systems (requires ~5-6GB RAM for model)
ollama run deepseek-r1

# OR for systems with lower RAM (Recommended for 8GB RAM laptops)
ollama run deepseek-r1:1.5b







backend chlane k liye folder me jane ki commands
cd C:\Users\HP\Downloads\ai_based_resume_generator-main\ai_based_resume_generator-main\resume-ai-backend
.\mvnw spring-boot:run





frontend chlane k liye folder

cd ai_based_resume_generator-main

cd resume_frontend
Remove-Item package-lock.json -ErrorAction SilentlyContinue 
npm run dev



