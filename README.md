# AI Image Generator 🚀

A full-stack application built with **Spring Boot** (backend) and **Next.js** (frontend) that allows users to:

* Generate brand-new AI images using **text prompts**.
* Transform uploaded images into various artistic styles (e.g., Studio Ghibli, anime, watercolor).

---

## 🔧 Tech Stack

| Layer          | Technology                                      |
| -------------- | ----------------------------------------------- |
| Frontend       | Next.js, React, Tailwind CSS                    |
| Backend        | Spring Boot, Java                               |
| AI Services    | Stable Diffusion via stable api                 |
| Deployment     | Dockerized backend + Vercel or Netlify frontend |

---

## Features

* **Text → Image**: Input any text prompt to generate a custom AI image.
* **Image → Style**: Upload an image and choose from multiple styles such as:

  * Studio Ghibli
  * Watercolor
  * Comic / Anime
  * Noir / Cinematic
  * Pixel Art
  * Cartoon

---

## 🛠️ Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/Ahemtan/ai-image-generator.git
cd ai-image-generator
```

### 2. Back-end (Spring Boot)

```bash
cd backend
./mvnw spring-boot:run
```

* Default port: `8080`
* Configurable via `src/main/resources/application.yml`

### 3. Front-end (Next.js)

```bash
cd ../frontend
npm install
npm run dev
```

* Available at: `http://localhost:3000`

---

## ⚙️ Configuration

Create `.env.local` in the frontend:

```env
API_KEY=YOU_STABLE_API_KEY
```
---

## 🧱 Architecture Overview

1. **Frontend**:

   * Collects prompts or user-uploaded images.
   * Sends requests to backend via REST API.
   * Displays styled image results.

2. **Backend**:

   * Exposes endpoints like:

     * `POST /api/v1/generate` — text-prompt generator
     * `POST /api/v1/image-from-text` — style-transfer on uploads
   * Forwards upstream to AI provider (e.g. Stability).

3. **AI Platform**:

   * Integrates Stable Diffusion to generate/transform images.

---

## 📈 Future Enhancements / To-Do

* Real-time image generation status (WebSocket updates)
* More style filters (Pixar, Cyberpunk, Photorealistic)
* User quotas and credit system
* Social sharing features
* Prompt templates & tag gallery

---

## 🙏 Contributing

1. Fork the repository
2. Create a new branch: `feature/your-awesome-feature`
3. Commit your changes and push
4. Open a pull request with a clear description

---

## ⚖️ License

MIT License — see the [LICENSE](LICENSE) file for details.

---

**Feel free to tweak sections like deployment, testing, and architecture to match your actual implementation. Let me know if you'd like help with CI pipelines, Docker setup, or extending features!**
