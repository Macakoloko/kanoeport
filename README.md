# Kanoê Agency - Portfolio

A high-end, immersive creative agency portfolio built with React, Three.js, and Tailwind CSS.

## 🚀 Quick Start

1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd kanoe-agency
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env` file in the root directory and add your Gemini API key:
   ```env
   GEMINI_API_KEY=your_api_key_here
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```

5. **Build for production:**
   ```bash
   npm run build
   ```

## 🛠 Tech Stack

- **Framework:** React 19
- **Styling:** Tailwind CSS 4
- **Animations:** Motion (Framer Motion) & Lenis (Smooth Scroll)
- **3D Graphics:** Three.js & React Three Fiber
- **Icons:** Lucide React

## 🌐 Deployment

### Vercel

1. Push your code to a GitHub repository.
2. Connect your repository to [Vercel](https://vercel.com).
3. Vercel will automatically detect the Vite project.
4. Add your `GEMINI_API_KEY` in the **Environment Variables** section of your Vercel project settings.
5. Click **Deploy**.

### GitHub Pages

If you want to deploy to GitHub Pages, ensure you update the `base` property in `vite.config.ts` if your project is not at the root domain.

## 📄 License

MIT
