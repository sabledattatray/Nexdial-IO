# 🚀 Nexdial Data Automation Portal

Welcome to the **Nexdial Data Automation Portal** – a cutting-edge web platform tailored for businesses looking to automate their data infrastructure, streamline their Excel reporting, and consolidate manual databases into high-performance, interactive dashboards.

Built with performance, stunning aesthetics, and modern web standards in mind.

![Nexdial Tech Stack](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=flat-square&logo=tailwind-css)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-12-purple?style=flat-square&logo=framer)
![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?style=flat-square&logo=prisma)

---

## ✨ Key Features

- **Dark Mode Glassmorphism UI**: A highly premium, tech-forward interface featuring mesh gradients, frosted glass panels, and stunning CSS animations.
- **Interactive Global Operations Map**: Real-time visualization of worldwide data nodes (Mumbai, New York, London, Tokyo, etc.) built with `react-simple-maps`.
- **Dynamic Data Dashboards**: A mocked live view of active pipelines, rows processed, and automated anomaly detection.
- **Comprehensive Lead Capture**: Specialized consultation forms designed to capture essential client parameters (Data Volume, Primary Interests: SQL, Power BI, VBA).
- **Mega Navigation**: Extensive, accessible routing across Industries, Solutions, Use Cases, and Resources.
- **Server-Side Rendered (SSR) & Optimized**: Built entirely on Next.js App Router for instant load times and optimal SEO.

## 🛠️ Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router, React 19)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/) & [GSAP](https://gsap.com/)
- **Database ORM**: [Prisma](https://www.prisma.io/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Maps**: [React Simple Maps](https://www.react-simple-maps.io/)

## 🚀 Getting Started

To run this project locally, clone the repository and install the dependencies:

```bash
# 1. Clone the repository
git clone https://github.com/sabledattatray/nexdial.git
cd nexdial

# 2. Install dependencies
npm install

# 3. Setup your environment variables
# Copy .env.example to .env and fill in the details
cp .env.example .env

# 4. Generate Prisma Client
npx prisma generate

# 5. Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📦 Deployment on Vercel

This project is fully optimized for **Vercel** deployment.

1. Push your code to a GitHub repository.
2. Import the project into Vercel.
3. Ensure the Build Command is set to `npm run build` (or `prisma generate && next build` if using DB features).
4. Add your Environment Variables in the Vercel dashboard.
5. Click **Deploy**. Vercel will automatically handle the SSR edge functions and static asset optimization!

---

*Designed and developed for Nexdial Data Consultancy.*
