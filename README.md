# 🎓 GATE-prep
> **Your Ultimate AI-Powered GATE Preparation Companion**

**GATE-prep** is a cutting-edge educational platform designed to streamline the preparation journey for the Graduate Aptitude Test in Engineering (GATE). By combining the power of **Google's Gemini AI** with a robust community forum and real-time analytics, we provide aspirants with a personalized and interactive learning experience.

---

## 🚀 Key Features

## 🚀 Features & Usage Guide

### 1. 🤖 AI-Powered Tutor
**What it is:** A personal tutor that never sleeps. It uses Google's Gemini 2.5 Flash model to answer your GATE-related questions instantly.
**How to use:**
- Click the **"Switch to AI Chat"** button on the top right of the discussion page.
- Type your question (e.g., *"Explain the concept of Paging in OS"*).
- The AI will provide a detailed, context-aware explanation instantly.

### 2. 💬 Collaborative Community Forum
**What it is:** A space to discuss doubts with other students.
**How to use:**
- **Post a Doubt:** Click "Start a New Discussion", select a subject (e.g., *Algorithms*), and post your question.
- **Reply:** Click on any discussion card to view details and add your answer or comment.
- **Real-time:** New posts and replies appear instantly without refreshing the page!

### 3. 📊 Performance Analytics
**What it is:** Visual charts that track your study progress.
**How to use:**
- Go to your **User Profile**.
- View the **"Study Consistency"** chart to see your daily activity.
- Check the **"Topic Coverage"** chart to see which subjects you are focusing on most.

### 4. 🔐 Secure Authentication
**What it is:** Keeps your data safe and personalized.
**How to use:**
- Sign up using your **Email/Password** or **Google Account**.
- Your profile, saved discussions, and analytics are automatically linked to your account.

---

## 🛠️ Tech Stack

### Frontend
- **React.js**: For building a dynamic and responsive user interface.
- **Vite**: Next-generation frontend tooling for lightning-fast builds.
- **Chart.js**: For rendering beautiful and informative data visualizations.
- **React Router**: For seamless client-side navigation.
- **React Toastify**: For elegant notifications and alerts.

### Backend
- **Python & Flask**: A lightweight and efficient backend server.
- **Google GenAI SDK**: To interface with the powerful Gemini models.
- **Flask-CORS**: To handle Cross-Origin Resource Sharing securely.

### Database & Cloud
- **Firebase Authentication**: For secure user identity management.
- **Firebase Firestore**: A flexible, scalable NoSQL cloud database for real-time data.
- **Vercel**: For seamless deployment and hosting.

---


## 🏁 Getting Started & Deployment Guide

This comprehensive guide is designed for beginners to help you set up, run, and deploy the GATE-prep platform from scratch.

### 📋 Prerequisites
Before you start, you need to install a few free tools:
1.  **Node.js** (Version 16 or newer): [Download & Install](https://nodejs.org/)
    - *Why?* Required to run the React frontend.
2.  **Python** (Version 3.8 or newer): [Download & Install](https://www.python.org/downloads/)
    - *Why?* Required to run the Flask backend.
3.  **Git**: [Download & Install](https://git-scm.com/downloads)
    - *Why?* To download the code.
4.  **VS Code** (Recommended): A good code editor makes this easier.

---

### 🛠️ Step 1: Local Setup (Running on your computer)

#### 1. Download the Code
Open your terminal (Command Prompt on Windows, Terminal on Mac) and run:
```bash
git clone https://github.com/GaneshArihanth/GATE-prep.git
cd GATE-prep
```

#### 2. Setup the Backend (The Brain)
The backend uses Python to talk to Google's AI.
```bash
# Install the required libraries
pip install -r requirements.txt
# Note: If 'pip' doesn't work, try 'pip3'
```

**🔑 Configure API Key:**
1.  Go to [Google AI Studio](https://aistudio.google.com/) and click "Get API Key".
2.  Create a new file named `.env` in the **root** folder (`GATE-prep/`).
3.  Open it and paste your key like this:
    ```env
    GEMINI_API_KEY=AIzaSyD...your_actual_key_here...
    ```

**▶️ Start the Backend:**
```bash
python api/index.py
# If that fails, try: python3 api/index.py
```
*Success Message: `Running on http://127.0.0.1:5001`*

#### 3. Setup the Frontend (The Interface)
Open a **new** terminal window (keep the backend running!).
```bash
cd client
npm install
```

**🔥 Configure Firebase (Database):**
1.  Go to [Firebase Console](https://console.firebase.google.com/).
2.  Click **"Add project"** -> Name it "GATE-prep".
3.  **Enable Authentication**:
    - Build > Authentication > Get Started.
    - Click "Email/Password" > Enable > Save.
    - Click "Google" > Enable > Save.
4.  **Enable Database**:
    - Build > Firestore Database > Create Database.
    - Select a location (e.g., `nam5` or `asia-south1`).
    - Choose **"Start in Test Mode"**.
5.  **Get Your Keys**:
    - Click the ⚙️ (Gear icon) > Project Settings.
    - Scroll down to "Your apps" > Click `</>` (Web icon).
    - Register app (enter any name).
    - **Copy** the `firebaseConfig` values shown.
6.  **Save Keys**:
    - Create a file named `.env` in the `client/` folder.
    - Paste the values in this format:
      ```env
      VITE_FIREBASE_API_KEY=AIzaSy...
      VITE_FIREBASE_AUTH_DOMAIN=gate-prep.firebaseapp.com
      VITE_FIREBASE_PROJECT_ID=gate-prep
      VITE_FIREBASE_STORAGE_BUCKET=gate-prep.appspot.com
      VITE_FIREBASE_MESSAGING_SENDER_ID=123456...
      VITE_FIREBASE_APP_ID=1:12345...
      ```

**▶️ Start the Frontend:**
```bash
npm run dev
```
*Click the link shown (e.g., `http://localhost:5173`) to open the app!*

---

### ☁️ Step 2: Deployment (Putting it on the internet)

We use **Vercel** because it's free and easy.

#### Option A: The Easy Way (Vercel Dashboard)
1.  Push your code to your own GitHub repository.
2.  Go to [Vercel.com](https://vercel.com) and Log in.
3.  Click **"Add New..."** > **"Project"**.
4.  Find your `GATE-prep` repo and click **Import**.
5.  **IMPORTANT: Environment Variables**:
    - Click to expand the **"Environment Variables"** section.
    - You MUST add every key from your `.env` files here.
    - Add `GEMINI_API_KEY` (value from your root `.env`).
    - Add `VITE_FIREBASE_API_KEY` (value from client `.env`).
    - ...repeat for all 6 Firebase keys.
6.  Click **Deploy**.
7.  Wait ~1 minute. You'll get a live URL!

#### Option B: The Hacker Way (Command Line)
1.  Install Vercel CLI: `npm install -g vercel`
2.  Run `vercel` in the root folder.
3.  Follow the prompts (Say 'Yes' to everything).
4.  Go to the Vercel Dashboard to add your Environment Variables (as shown in Option A).
5.  Run `vercel --prod` to update.

---

### ❓ Troubleshooting

- **"pip command not found"**: Try using `pip3` or `python -m pip`.
- **"npm command not found"**: Make sure you installed Node.js.
- **"Firebase permission denied"**: Check your Firestore Rules. Ensure you are in "Test Mode" or have proper rules set up.
- **"API Key error"**: Double-check your `.env` file names. They must be exactly `.env` (not `.env.txt`).

---

## 📂 Project Structure

```
GATE-prep/
├── api/                 # Flask Backend
│   ├── index.py         # Main application entry point
│   └── ...
├── client/              # React Frontend
│   ├── src/
│   │   ├── components/  # Reusable UI components
│   │   ├── pages/       # Application pages
│   │   ├── utils/       # Helper functions & Firebase config
│   │   └── ...
│   ├── package.json
│   └── ...
├── requirements.txt     # Python dependencies
└── README.md            # Project documentation
```

---

## 🤝 Contributing

Contributions are welcome! If you'd like to improve GATE-prep, please follow these steps:

1.  Fork the repository.
2.  Create a new branch (`git checkout -b feature/YourFeature`).
3.  Commit your changes (`git commit -m 'Add some feature'`).
4.  Push to the branch (`git push origin feature/YourFeature`).
5.  Open a Pull Request.

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Made with ❤️ by [Ganesh Arihanth](https://github.com/GaneshArihanth)
