# Nexdial — AI-Powered Enterprise Contact Center & CRM Operating System

![Homepage](./public/Screen%20Shots/homepage.png)

Nexdial is a next-generation, cloud-native **Contact Center Operating System (CCOS)** and **Intelligent CRM**. Built for modern enterprises, it merges advanced CRM pipelines, highly customizable industry-specific workflows, real-time voice AI agents, and specialized modules (like a fully functional Restaurant POS) into a single, unified visual dashboard.

---

## 🚀 Key Features & Capabilities

### 1. Dynamic Industry CRM System
![CRM Inbox](./public/Screen%20Shots/CRM_Inbox.png)
* **50+ Pre-Configured Industries**: From Digital Marketing and Real Estate to Healthcare and Manufacturing, the system dynamically seeds industry-specific pipelines and workflows.
* **Intelligent Onboarding**: Beautiful custom `<IndustrySelector>` and `<BusinessTypeSelector>` UIs automatically tailor the workspace setup and inject industry-specific lead stages during signup.
* **Workspace Settings Cockpit**: Configure branding, lead sources, integrations, and company profiles per workspace.

### 2. Specialized Modules (e.g., Restaurant POS)
![Hotel Billing](./public/Screen%20Shots/Hotel_Billing.png)
* **Live Table Management**: Real-time visual layout of available vs. occupied tables.
* **Order & Menu System**: Add categories and items directly to bills. Waiters and admins can fire orders from a tablet-friendly interface.
* **Billing & Checkout**: Seamless invoice generation and final bill settlement.
* **Staff Access**: Dedicated `WAITER` and `ADMIN` role management locked to specific tenant workspaces.

### 3. Unified Dialer Operations Console
![CRM Analytics](./public/Screen%20Shots/CRM_Analytics.png)
* **Dialer Modes**: Supports Predictive (dynamic pacing algorithm), Power, Progressive, and Preview dialing modes.
* **WebRTC Softphone**: Real-time browser-based calling with equalized audio meters and instant call wrap-up controls.
* **Supervisor HUD**: Managers can monitor live calls, whisper coaching tips, or barge-in to merge into a 3-way conference.

### 4. Conversational Voice AI Copilot
* **Real-Time Speech-to-Text**: High-accuracy transcription streams during live voice conversations.
* **RAG SOP Integration**: Queries documentation databases using semantic vector lookups to display dynamic scripts on the agent's screen.

### 5. Robust Cloud Infrastructure
* **Multi-Tenant SaaS Architecture**: Built on top of Prisma with strict `workspaceId` row-level isolation and role-based access control.
* **Authentication**: Integrated NextAuth with Google SSO and credential-based secure sign-in.
* **Database Optimization**: Uses Postgres connection pooling (`@prisma/adapter-pg`) to handle high-concurrency websocket and API data streams without exhausting limits.

---

## 🛠️ Technology Stack

* **Framework**: [Next.js 16 (App Router)](https://nextjs.org/)
* **Library**: [React 19](https://react.dev/)
* **Database & ORM**: PostgreSQL (via Supabase) + [Prisma ORM](https://www.prisma.io/) with Edge adapter pooling
* **Authentication**: [NextAuth.js v4](https://next-auth.js.org/)
* **Styling**: Tailwind CSS v4 & Custom glassmorphism aesthetic
* **Animations**: [Framer Motion](https://www.framer.com/motion/)
* **Icons**: [Lucide React](https://lucide.dev/)

---

## 📂 Project Structure

```bash
nexdial/
├── prisma/
│   ├── schema.prisma         # Database models (User, Workspace, Leads, Tables, Orders)
│   └── seed-industries.ts    # Seed script for 50+ industry templates
├── src/
│   ├── app/                  # Next.js App Router endpoints
│   │   ├── api/              # Secure REST APIs (auth, crm, restaurant POS, industries)
│   │   ├── crm/              # Main CRM application dashboard and sub-modules
│   │   ├── login/            # Authentication portals
│   │   └── signup/           # Interactive multi-step onboarding
│   ├── components/           # Reusable UI architecture
│   │   ├── crm/              # Specialized CRM UI (IndustrySelector, Kanban, etc.)
│   │   └── home/             # Landing page components
│   └── lib/                  # Core utilities (Prisma client, NextAuth configuration)
└── package.json              # Dependencies
```

---

## 💻 Getting Started

### Prerequisites
Make sure you have Node.js 18+ and npm installed. You will also need a PostgreSQL database.

### Setup Instructions

1. **Clone the repository**:
   ```bash
   git clone https://github.com/sabledattatray/nexdial.git
   cd nexdial
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Create a `.env` file with your database string and NextAuth secrets:
   ```env
   DATABASE_URL="postgresql://user:password@host:5432/db"
   NEXTAUTH_SECRET="your-secret"
   NEXTAUTH_URL="http://localhost:3000"
   ```

4. **Initialize Database & Seed**:
   ```bash
   npx prisma generate
   npx prisma db push
   npx tsx prisma/seed-industries.ts
   ```

5. **Run the development server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) with your browser to view the application.

---

## 🔒 Security & Compliance

Nexdial complies with key global standards for secure communication and operations:
* **Tenant Isolation**: Deep schema-level isolation using `workspaceId` parameters.
* **Authentication**: Hardened OAuth 2.0 flows and BCrypt password hashing.
* **SOC2 Type II**: Continuous vulnerability scanning, audit logs, and secure access permissions.
* **SIP Security**: SRTP and DTLS encryption for WebRTC call channels to protect against eavesdropping.

---

## 📝 License & Attribution

© 2026 Nexdial. All rights reserved.

Made for **High Performance** by [Datta Sable](https://dattasable.com).
