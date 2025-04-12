# 🧠 TruthCheck - Quick Claim Verification Tool

TruthCheck is a lightweight, multilingual web app designed to help Nigerians verify the authenticity of claims, images, and URLs. Built with simplicity and accessibility in mind, the platform provides instant fact-check results using advanced backend verification systems, while supporting multiple local languages.

## 🚀 Features

- 🔍 **Claim Verification**: Check claims via text or image uploads.  
- 📊 **Fact-Check Results**: Dynamic UI showing confidence, verdict, sources, and explanations.
- 🌐 **Multilingual Support**: Switch between English, Hausa, Igbo, and Yoruba.
- 🖼️ **Recent Verifications**: Displays a list of recent checks for reference.
- 💬 **User Feedback**: Rate the accuracy of results and share thoughts.
- ⚡ **Fast & Lightweight**: Optimized for entry-level smartphones.

## 🛠️ Tech Stack

- **Frontend**: React.js (with plain CSS, no frameworks)
- **State Management**: Redux Toolkit & RTK Query
- **Routing**: React Router
- **Data Fetching**: RTK Query (via `createApi` and `fetchBaseQuery`)
- **Deployment**: GitHub Pages / Netlify (CI/CD ready)
- **Performance**: Code splitting, lazy loading, and caching

## 🧱 Project Structure

src/ ├── api/ # RTK Query API slice ├── assets/ # Images and static assets ├── components/ # Reusable UI components ├── data/ # Mock data (e.g., recent claims) ├── pages/ # HomePage and ResultPage ├── App.js # App entry with routes ├── main.jsx # React DOM render


## 🧪 Testing (Planned)

- Unit tests for reducers and components
- Integration tests for user flows
- E2E tests for verifying real-time result rendering

## 📦 Installation

git clone https://github.com/TruthCheck/quickcheckingtool-frontend.git

cd quickcheckingtool-frontend
npm install
npm start
🔗 Backend Integration
Frontend communicates with backend endpoints via RTK Query using two main mutations:

checkTextClaim – Accepts text input and language.

checkImageClaim – Accepts image uploads as FormData.

📥 Feedback Flow
After a claim is checked, users can:

Rate the result (Good, Bad, Confusing, Excellent)

Leave a short comment

(This data can be POSTed to a feedback endpoint for analysis.)

👥 Team
This is a collaborative sprint project. Each member handles a section (frontend, backend, testing, deployment). 

