# 🎓 GATE-prep
> **Your Ultimate AI-Powered GATE Preparation Companion**

![GATE-prep Banner](https://via.placeholder.com/1200x400?text=GATE-prep+AI+Learning+Platform)

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

## 🏁 Getting Started

Follow these steps to set up the project locally on your machine.

### Prerequisites
- **Node.js** (v16 or higher)
- **Python** (v3.8 or higher)
- **pip** (Python package installer)
- **Git**

### Installation

1.  **Clone the Repository**
    ```bash
    git clone https://github.com/GaneshArihanth/GATE-prep.git
    cd GATE-prep
    ```

2.  **Frontend Setup**
    Navigate to the client directory and install dependencies:
    ```bash
    cd client
    npm install
    ```

3.  **Backend Setup**
    Navigate to the root (or api directory) and install Python requirements:
    ```bash
    # From the root directory
    pip install -r requirements.txt
    ```

### Configuration

1.  **Firebase Setup**:
    - Create a project in the [Firebase Console](https://console.firebase.google.com/).
    - Enable **Authentication** and **Firestore**.
    - Create a web app and copy the configuration.
    - Create a `.env` file in the `client` directory and add your Firebase config:
      ```env
      VITE_FIREBASE_API_KEY=your_api_key
      VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
      VITE_FIREBASE_PROJECT_ID=your_project_id
      VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
      VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
      VITE_FIREBASE_APP_ID=your_app_id
      ```

2.  **Gemini API Setup**:
    - Get your API key from [Google AI Studio](https://aistudio.google.com/).
    - Create a `.env` file in the `api` directory (or root, depending on where you run flask) and add:
      ```env
      GEMINI_API_KEY=your_gemini_api_key
      ```

---

## 🏃‍♂️ Running the Application

### Start the Backend Server
```bash
# From the root directory
python api/index.py
# OR
flask run
```
The server will start on `http://localhost:5001`.

### Start the Frontend Client
Open a new terminal window:
```bash
cd client
npm run dev
```
The application will be available at `http://localhost:5173`.

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
