# 🎓 GATE-prep
> **Your Ultimate AI-Powered GATE Preparation Companion**

**GATE-prep** is a cutting-edge educational platform designed to streamline the preparation journey for the Graduate Aptitude Test in Engineering (GATE). By combining the power of **Google's Gemini AI** with a robust community forum and real-time analytics, we provide aspirants with a personalized and interactive learning experience.

---

## 🚀 Key Features

### 🤖 AI-Powered Tutor
- **Instant Doubt Resolution**: Integrated with **Google Gemini 2.5 Flash**, our AI tutor provides accurate, context-aware answers to your technical queries.
- **24/7 Availability**: Get help whenever you study, without waiting for human instructors.
- **Smart Explanations**: Complex concepts broken down into easy-to-understand summaries.

### 💬 Collaborative Community
- **Discussion Forums**: Post questions, share knowledge, and discuss strategies with fellow aspirants.
- **Subject-Wise Categorization**: Organized threads for subjects like *Operating Systems*, *DBMS*, *Algorithms*, and more.
- **Real-Time Updates**: Powered by **Firebase Firestore** for instant synchronization of posts and replies.

### 📊 Performance Analytics
- **Visual Progress Tracking**: Interactive charts (powered by **Chart.js**) to monitor your study consistency and topic coverage.
- **Personalized Insights**: Identify strong and weak areas to optimize your preparation strategy.

### 🔐 Secure & Seamless
- **Robust Authentication**: Secure login and registration using **Firebase Authentication**.
- **User Profiles**: Manage your activity, saved discussions, and personal settings.

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

This guide is designed for beginners to help you set up and deploy the GATE-prep platform.

### Prerequisites
Before you begin, ensure you have the following installed:
- **Node.js** (v16+): [Download Here](https://nodejs.org/)
- **Python** (v3.8+): [Download Here](https://www.python.org/downloads/)
- **Git**: [Download Here](https://git-scm.com/downloads)
- A **Google Cloud / Firebase** account.
- A **Vercel** account for deployment.

---

### 🛠️ Local Development Setup

Follow these steps to run the project on your own computer.

#### 1. Clone the Repository
Open your terminal or command prompt and run:
```bash
git clone https://github.com/GaneshArihanth/GATE-prep.git
cd GATE-prep
```

#### 2. Backend Setup (Python/Flask)
The backend handles the AI logic and API requests.
```bash
# Navigate to the root folder if not already there
# Install the required Python libraries
pip install -r requirements.txt
```

**Configure Backend Environment:**
1. Create a file named `.env` in the root directory.
2. Add your Google Gemini API Key (Get it from [Google AI Studio](https://aistudio.google.com/)):
   ```env
   GEMINI_API_KEY=your_actual_api_key_here
   ```

**Start the Backend Server:**
```bash
python api/index.py
```
*You should see: `Running on http://127.0.0.1:5001`*

#### 3. Frontend Setup (React/Vite)
The frontend is the user interface you see in the browser.
```bash
# Open a NEW terminal window
cd client

# Install all JavaScript dependencies
npm install
```

**Configure Frontend Environment:**
1. Create a file named `.env` in the `client` folder.
2. Add your Firebase configuration (See *Firebase Setup* below):
   ```env
   VITE_FIREBASE_API_KEY=...
   VITE_FIREBASE_AUTH_DOMAIN=...
   VITE_FIREBASE_PROJECT_ID=...
   VITE_FIREBASE_STORAGE_BUCKET=...
   VITE_FIREBASE_MESSAGING_SENDER_ID=...
   VITE_FIREBASE_APP_ID=...
   ```

**Start the Frontend:**
```bash
npm run dev
```
*Open the link shown (usually `http://localhost:5173`) in your browser.*

---

### ☁️ Deployment Guide (Vercel)

We recommend **Vercel** for deploying both the frontend and backend easily.

#### 1. Prepare for Deployment
Ensure you have the Vercel CLI installed:
```bash
npm install -g vercel
```

#### 2. Deploy
Run the following command from the **root** of your project:
```bash
vercel
```
- **Set up and deploy?** [Y]
- **Which scope?** [Select your account]
- **Link to existing project?** [N]
- **Project Name:** gate-prep (or your choice)
- **In which directory is your code located?** ./
- **Want to modify these settings?** [N]

Vercel will detect the `vercel.json` configuration and deploy both the Python API and React Frontend.

#### 3. Environment Variables on Vercel
Once the deployment starts, go to your [Vercel Dashboard](https://vercel.com/dashboard):
1. Select your project.
2. Go to **Settings** > **Environment Variables**.
3. Add all the variables from your local `.env` files:
   - `GEMINI_API_KEY`
   - `VITE_FIREBASE_API_KEY`
   - `VITE_FIREBASE_AUTH_DOMAIN`
   - ...and the rest of the Firebase config.
4. **Redeploy** your project (Deployments > Redeploy) for the changes to take effect.

---

### 🔥 Detailed Firebase Setup

1. **Create Project**: Go to [Firebase Console](https://console.firebase.google.com/) and click "Add project".
2. **Authentication**:
   - Go to **Build** > **Authentication**.
   - Click **Get Started**.
   - Enable **Email/Password** and **Google** sign-in providers.
3. **Firestore Database**:
   - Go to **Build** > **Firestore Database**.
   - Click **Create Database**.
   - Choose a location (e.g., `nam5` or `asia-south1`).
   - Start in **Test Mode** (for development) or **Production Mode** (if you set up rules).
4. **Get Config**:
   - Click the **Gear Icon** (Project Settings) > **General**.
   - Scroll to "Your apps" and click the **</>** (Web) icon.
   - Register app (e.g., "GATE-prep-web").
   - Copy the `firebaseConfig` values and paste them into your `client/.env` file.


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
