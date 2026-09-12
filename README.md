🥗 EAT RIGHT

**EAT RIGHT** is an interactive, browser-based nutrition game designed to make healthy food choices fun and engaging.

Players create a profile, choose an avatar, and control a plate to catch your favorite food items. The goal is to catch exactly **5 of your favorite food items**. At the end of the game, players receive a score, time taken, and a detailed nutritional breakdown of everything they caught.

🎮 Features

* 👤 **Player Profile**
* 🍽️ **Interactive 2D Gameplay**
* 🥗 **Food Classification**
* 📊 **Nutrition Report**

  * Total score
  * Time taken
  * Number of healthy and junk foods caught
  * Calories
  * Protein
  * Carbohydrates
  * Fat
  * Fiber
  * Sugar
  * Individual nutritional breakdown for all 5 foods

* 🍽️ **Personalized Food Plate**
* 🏆 **Leaderboard**
  * Filter results by:

    * All Years
    * First Year
    * Second Year
    * Third Year
    * Diploma
  * Ranking is based on:

    1. Highest score
    2. Fastest completion time
  * Players with identical scores and times receive the same rank

* ⚙️ **Settings**
* 📱 **Responsive Design**
  🛠️ Tech Stack

| Technology             | Purpose                            |
| ---------------------- | ---------------------------------- |
| **HTML5**              | Page structure and game screens    |
| **CSS3**               | Responsive UI, animations, styling |
| **JavaScript (ES6+)**  | Game logic and application control |
| **HTML5 Canvas**       | 2D gameplay and rendering          |
| **Supabase**           | Score storage and leaderboard      |
| **Browser Camera API** | Player photo capture               |
| **LocalStorage**       | Saving player profile information  |

🕹️ How to Play

### 1. Create Your Profile

Enter your name, select your year, and choose an avatar/capture a picture.

### 2. Start the Game

Click **START GAME** and wait for the countdown.

### 3. Catch Food

Move the plate left and right to catch falling food items.

### 4. Fill Your Plate

Catch exactly **5 favorite food items** to complete the game.

### 5. Check Your Results

View your:

* Score
* Completion time
* Healthy vs. junk food choices
* Total nutrition
* Individual food information
* Food plate

### 6. View the Leaderboard

Compare your result with other players based on score and completion time.

🎯 Game Objective

The main goal of EAT RIGHT is to combine **gameplay with nutritional awareness**.
The game encourages players to think about their food choices while turning nutrition information into an interactive experience.

🔐 Data & Privacy

EAT RIGHT stores leaderboard information using **Supabase**.

Player profile information such as the selected name and avatar is stored locally in the browser using **LocalStorage**.

Camera access is requested only when the player chooses to use the photo feature.

🚀 Running the Project Locally

Because this is a client-side web application, it does not require a Python backend or a Node.js server.

You can run it using a local development server such as:

* VS Code Live Server
* Any static web server
* A hosting platform such as Netlify or Vercel

For camera functionality, running the project through **HTTPS or localhost** is recommended because browsers restrict camera access on insecure origins.

📄 License
This project is currently intended for educational and demonstration purposes.
