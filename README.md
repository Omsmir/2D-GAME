# 🌼 Bubu’s Flower Field

A cozy 2D web game made with love as a **gift project** 💛

In this game, **Bubu** walks through a peaceful green field collecting flowers for someone special. Each flower carries a sweet message, turning a simple game into a personal, emotional experience.

---

## ✨ Game Concept

- Click anywhere to move **Bubu**
- The world scrolls as Bubu walks (camera follows the player)
- Flowers are randomly scattered across a large field
- Collecting a flower:
  - Stops Bubu
  - Plays a cute sound
  - Shows a romantic / sweet message
  - Saves progress locally

This project is **not a commercial product** — it’s a heartfelt, fun experiment built for joy.

---

## 🎮 Gameplay Features

- Smooth click-to-move movement
- Camera-following world (infinite-field feel)
- Collision detection with flowers
- Sprite-frame animation for character movement
- Message dialog popups
- LocalStorage-based player progress
- Cozy background music & sound effects

---

## 🧸 Characters

- **Bubu** – the main character 🐻
- **Dudu** – companion character (optional / future)

Characters and outfits are designed in **Figma** and animated using sprite frames.

---

## 🛠 Tech Stack

- **Vite**
- **Vanilla TypeScript**
- **HTML / CSS**
- **requestAnimationFrame** (game loop)
- **LocalStorage** (player state)

No frameworks, no backend — just clean, understandable game logic.

---

## 📁 Project Structure

```
src/
 ├─ assets/
 │   ├─ characters/
 │   ├─ flowers/
 │   ├─ sounds/
 │   └─ music/
 ├─ game/
 │   ├─ player.ts
 │   ├─ camera.ts
 │   ├─ collision.ts
 │   └─ world.ts
 ├─ ui/
 │   ├─ dialog.ts
 │   └─ counter.ts
 ├─ storage/
 │   └─ localStorage.ts
 └─ main.ts
```

---

## 🌸 Flowers

- 4 flower types:
  - Red
  - Green
  - Blue
  - Purple

- Randomly generated inside a **3000 × 3000 world**
- Each flower contains:
  - Position
  - Color
  - Message
  - Collected state

---

## 💾 Saving Progress

Player data is stored in `localStorage`:

- Player name
- Number of game iterations
- Flowers collected by color

Progress persists even after refreshing the page.

---

## 🔊 Audio

- Cute UI & pickup sound effects
- Cozy looping background music
- Music starts after user interaction (browser-friendly)

Audio assets are sourced from:
- Pixabay
- Mixkit
- itch.io (free game assets)

---

## 🎁 Why This Project Matters

This game was created as a **personal gift**, not just a technical exercise.

It combines:
- Emotion 💛
- Creativity 🎨
- Game logic 🎮
- Thoughtful design 🌼

Sometimes the best projects aren’t meant to scale — they’re meant to **mean something**.

---

## 🚀 Running the Game

```bash
npm install
npm run dev
```

Open the browser and enjoy 🌸

---

## 💌 Final Note

Made with care, curiosity, and a lot of love.

> “Deba… this was made for you.” 💛

---

Enjoy the walk 🌼

