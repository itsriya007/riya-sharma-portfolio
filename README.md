# Riya Sharma - Full-Stack Developer Portfolio
> **Production-Ready Full-Stack Web Application** engineered with a warm editorial **Brown & Cream** aesthetic, a refined **Espresso / Dark Mocha** dark mode, interactive micro-animations, and a secure **Node.js + Express + Nodemailer** backend.

---

## 🌟 Overview & Key Enhancements

This project transforms the original Stitch developer portfolio design into a complete full-stack web application tailored for **Riya Sharma** — Backend Developer (Node.js) & Fintech Architect based in Mumbai, India.

### 1. Project Setup & CV File Integration
- **Clean Full-Stack Structure:** Organizes the codebase into an Express backend (`server.js`, `backend/routes/`, `backend/services/`) and a responsive frontend (`public/`).
- **Real Resume Asset:** Places `Riya_Sharma_Resume_Updated.pdf` in `/public/assets/Riya_Sharma_Resume_Updated.pdf`.
- **Download CV Everywhere:** Every **"Download CV"** button and tab (Header, Hero section, Footer, and Contact sidebar) is wired directly with `download="Riya_Sharma_Resume.pdf"` and instant feedback toasts.
- **Accurate Resume Experience:**
  - **Tagline:** *"An enthusiastic Backend Developer with fintech knowledge | Full Stack Developer"*
  - **Direct Channels:** `riya0077224@gmail.com` • `+91 8450928992` • [LinkedIn](https://linkedin.com/in/riya-sharma0b51722b6) • [GitHub](https://github.com/itsriya007) • Mumbai, India
  - **Experience:**
    - **Quantique Metadata Pvt. Ltd. (2024 – Present):** Node.js Backend Developer & Team Lead.
      - *Tata Motors Motor Insurance Platform (Sole Owner):* End-to-end development, testing support, PM2 deployment, React.js frontend integration, and microservice design.
      - *Isuzu Private Car Insurance Platform (Team Lead):* Lead backend squad, policy endorsements, cancellations, break-in/renewal pipelines, and SQL optimization.
    - **Esaya Software India (2021 – 2024):** Interpreter & Technical Support for US corporate clientele (cross-border communication, query resolution, Tier-2 engineering triage).
  - **Honors & Awards:** *Rising Star Award* & *Early Impact Award* (Quantique Metadata).
  - **Education:** M.Sc in Computer Science (2022–2024) & B.Sc in Computer Science (2018–2021) from Guru Nanak Khalsa College, University of Mumbai.
  - **Certifications:**
    - **Google for Developers & H2S:** *Build with AI Bootcamp Certificate* (Mumbai, Oct 2026 - ID: `2026H2S10BWAIBMUM-P00068`) covering autonomous AI agents, multi-agent workflows, and generative AI production integration.
    - Executive Digital Marketing Certification.

---

### 2. Color Palette & Refined Dark Mode (No Harsh Black)
- **Light Mode:** Warm **Brown & Cream** editorial palette (`#FAF6F0`, `#3B2418`, `#755849`) with high-contrast **Baby Blue** (`#7CC4FA`) primary CTAs and highlights.
- **Refined Espresso Dark Mode:** Eliminates harsh `#000000` pure black in favor of a soothing **Espresso / Dark Mocha** palette:
  - Primary Background: `#1E1815`
  - Elevated Cards / Surfaces: `#28201B` / `#2E2520`
  - Alt Surfaces: `#382E27`
  - Structural Borders: `#4A3C33` / `#5A493E`
  - Typography: Soft Cream `#F5EFEA` & Supporting Taupe `#C7B9B0`
  - Accent / Glow: **Baby Blue** (`#7CC4FA` / `#89CFF0`) with soft electric halo glows.
- Theme preference is automatically detected and persisted via `localStorage`.

---

### 3. Smooth UI Animations & Micro-Interactions
- **Scroll Reveal (`IntersectionObserver`):** Elements gently fade up and slide in (`translateY(0)` from `translateY(28px)`) as sections enter the viewport.
- **Staggered Hero Entrance:** Headline, fintech tagline, narrative copy, and CTA buttons enter with synchronized timing.
- **Stat Counters:** Numbers (`2+`, `3 Yrs`, `2`, `99.9%`) dynamically count up when scrolled into view.
- **Interactive Terminal Simulator:** In the Hero section, a live PM2 daemon card allows users to click **"Run Simulation"** to stream simulated underwriting transitions and process health checks.
- **Micro-Interactions:** Cards elevate by `-4px` with warm shadows, skill pills lift with custom border glows, and buttons include tactile active click states.

---

### 4. Node.js + Express Backend (`POST /api/contact`)
- **Backend Architecture:**
  - `server.js` serves static assets from `/public` and mounts API routes.
  - `POST /api/contact` endpoint receives sender inquiries.
  - Rate-limited to **5 requests per 15 minutes per IP** via `express-rate-limit`.
  - **Anti-Spam Honeypot:** Invisible `_gotcha` field silently captures and drops bot traffic.
  - **Server-Side Validation:** Validates required name, valid email regex, and message length.
- **Nodemailer Integration:**
  - Dispatches branded HTML emails directly to **`riya0077224@gmail.com`**.
  - **Safe Simulation Mode:** If SMTP credentials are not yet configured in `.env`, the server logs the inquiry cleanly to the terminal and returns a successful response without breaking local development.
- **Frontend Pop-Up Modal:**
  - Submits asynchronously via `fetch()`.
  - Displays an animated loading spinner on the submit button.
  - Triggers the **Pop-Up Thank You Modal** (*"Thank you for reaching out! Your message has been sent to Riya. I will get back to you shortly."*) on success with close button and click-outside-to-dismiss.
  - Fallback error toast with a direct `mailto:` link if network fails.

---

## 📁 Project Directory Structure

```text
riya-sharma-portfolio/
├── .env                              # Environment configuration (SMTP credentials)
├── .env.example                      # Reference template for environment variables
├── .gitignore                        # Git exclusion rules (node_modules, .env, logs)
├── DESIGN.md                         # Warm Editorial Tech design specification
├── package.json                      # Node.js project manifest & scripts
├── README.md                         # Comprehensive documentation
├── server.js                         # Main Express server & static asset dispatcher
├── test_suite.js                     # Automated verification test suite
│
├── backend/
│   ├── routes/
│   │   └── contact.js                # POST /api/contact route with validation & rate limit
│   └── services/
│       └── mailer.js                 # Nodemailer transport & HTML email template
│
└── public/
    ├── index.html                    # Complete responsive portfolio homepage
    ├── assets/
    │   ├── Riya_Sharma_Resume_Updated.pdf  # Attached resume document
    │   ├── Build_With_AI_Bootcamp_Certificate.pdf # Google for Developers certificate
    │   └── reference_screens/        # Reference Stitch export PNGs
    │       ├── desktop_screen.png
    │       └── espresso_dark_mode_screen.png
    ├── css/
    │   └── styles.css                # Custom animations, espresso theme & micro-interactions
    └── js/
        ├── animations.js             # IntersectionObserver, counters & terminal simulation
        └── app.js                    # Theme switcher, contact form AJAX & modal controls
```

---

## 🚀 Getting Started Locally

### 1. Clone or Navigate to the Project
```bash
cd C:\Users\riya0\.gemini\antigravity\scratch\riya-sharma-portfolio
```

### 2. Install Dependencies
```bash
npm install
```
*(Dependencies: `express`, `cors`, `dotenv`, `nodemailer`, `express-rate-limit`)*

### 3. Configure Gmail SMTP Credentials (Optional for Live Email)
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
To enable live email dispatch to `riya0077224@gmail.com` via Gmail SMTP:
1. Log into your Google Account and go to **Security** ([myaccount.google.com/security](https://myaccount.google.com/security)).
2. Under "How you sign in to Google", ensure **2-Step Verification** is enabled.
3. Search for or click on **App passwords** ([myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)).
4. Create an app password with the name `Portfolio Website`.
5. Copy the 16-character generated password and place it in `.env`:
   ```env
   SMTP_SERVICE=gmail
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=465
   SMTP_SECURE=true
   SMTP_USER=riya0077224@gmail.com
   SMTP_PASS=xxxx xxxx xxxx xxxx
   ```
> **Note:** If `SMTP_PASS` is omitted, the application runs automatically in **Local Simulation Mode**, logging submitted messages in the console so you can test all features without needing credentials upfront!

### 4. Run the Application
```bash
npm start
```
Or for auto-reloading development mode:
```bash
npm run dev
```

Open your browser and visit:
👉 **[http://localhost:3000](http://localhost:3000)**

---

## 🧪 Running Automated Tests

To verify that the health endpoint, static resume file delivery, form validation, email simulation, and spam honeypot function properly:

```bash
node test_suite.js
```

---

## 📄 License & Attribution
Designed & Built for **Riya Sharma** • Backend Developer & InsurTech Architect • Mumbai, India.
All rights reserved.
