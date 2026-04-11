
# 🥗 EcoFit & BudgetBites
A Smart Fitness & Meal Planning App for the Modern Indian Lifestyle.

EcoFit & BudgetBites is a browser-based application designed to bridge the gap between health goals and economic reality. While most fitness apps are Western-centric and expensive, this project offers localized meal planning and machine-learning-driven insights for users on a budget
---

## 🚀 Core Features

* EcoFit Module:** Predicts calories burned using a **Random Forest Regressor** (92% accuracy) based on heart rate and workout duration.
* BudgetBites Planner:** A smart grocery optimizer that uses a **Greedy Knapsack Algorithm** to find the most nutritious meals within your specific rupee budget
* Vegetable Price Forecasting:** Uses historical market data to predict price fluctuations, helping you shop smarter
* Gamified Eco-Impact:** Tracks your carbon footprint saved through exercise and visualizes it as a growing **Virtual Forest*.
* Smart Meal Engine Recommends over 48 authentic Indian dishes (like Moong Dal Khichdi and Rajma Chawal) ranked by your fitness goals.

---

## 🛠️ Technology Stack

| Layer | Technology |
| :--- | :--- |
| **Frontend** | [cite_start]React 19, Vite 7, Tailwind CSS 4  |
| **Machine Learning** | [cite_start]Python (scikit-learn), Gradient Boosting & Linear Regression  |
| **Data Viz** | [cite_start]Recharts [cite: 42, 45, 112] |
| **Persistence** | [cite_start]Browser localStorage (Zero-server architecture)  |

---

## 📂 System Architecture
The app follows a *Three-Tier Architecture*
1.  Presentation Layer: Responsive UI built with React
2.  Logic Layer: Pre-trained Python ML models for calorie and price predictions
3.  Data Layer: Secure client-side storage via `localStorage`, ensuring 100% data privacy—no data ever leaves your device

---

## 📈 Performance & Metrics
* Calorie Prediction: Gradient Boosting Regressor trained on 1,200 samples
* Price Forecasting: Linear Regression per vegetable trained on 6 weeks of market history
* Accuracy: Calorie burn prediction accurate to within $\pm15$ kcal

---

## 🛠️ Installation & Setup
1. Clone the repository.
2. Install dependencies: `npm install`.
3. Run the development server: `npm run dev`.
4. Open your browser and start your fitness journey!

---

->>>> Developed by Nikita 
