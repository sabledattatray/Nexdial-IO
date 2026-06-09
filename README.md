# DBS Mintek® — AI-Powered Enterprise Contact Center Operating System

DBS Mintek® is a next-generation, cloud-native **Contact Center Operating System (CCOS)** combined with premium BPO services. Built for modern enterprises, it merges advanced CRM pipelines, high-velocity predictive outbound dialers, real-time voice AI agents, auto-QA transcription, and a white-labeled multi-tenant administration cockpit into a single, unified visual dashboard.

---

## 🚀 Key Features & Capabilities

### 1. Unified Dialer Operations Console
* **Dialer Modes**: Supports Predictive (dynamic pacing algorithm), Power (consecutive list calling), Progressive (calls when agent is idle), and Preview dialing modes.
* **WebRTC Softphone**: Real-time browser-based calling with equalized audio meters and instant call wrap-up ACW controls.
* **Supervisor HUD Interceptor**: Managers can monitor live calls, whisper coaching tips directly to agent dashboards without customer knowledge, or barge-in to merge into a 3-way conference.

### 2. Conversational Voice AI Copilot
* **Real-Time Speech-to-Text**: High-accuracy transcription streams during live voice conversations.
* **RAG SOP Integration**: Queries documentation databases using semantic vector lookups to display answers and dynamic scripts directly on the representative's screen.
* **Sentiment Analysis**: Tracks customer tone and sentiment metrics dynamically based on active conversation steps.

### 3. Integrated Enterprise CRM Suite
* **Interactive Kanban Board**: Manage leads, follow-up queues, and deals with localized Indian Rupee (`₹`) pricing markers.
* **Unified Profile Cards**: 360-degree customer details, historical contact logs, and post-call disposition summaries.
* **Excel Reports**: Download formatted audit metrics, agent scorecards, connect logs, and campaign summaries directly.

### 4. Multi-Tenant SaaS Architecture
* **White-Labeling**: Provision isolated organizations with custom domains, billing schedules, and custom brand configurations.
* **Billing Cockpit**: Tracks subscriptions, seat limits, and pre-paid SIP carrier outlays via Stripe connectors.

### 5. Interactive Operations Map
* Visualizes operational branches PAN India (Navi Mumbai HQ, Pune Baner, Ashoknagar, Bengaluru, Chennai, Hyderabad, Lucknow, and Kolkata).
* Draws connection telemetry lines between branches and Navi Mumbai HQ on a fully responsive coordinate-locked India SVG layout.

---

## 🛠️ Technology Stack

* **Framework**: [Next.js 16 (App Router)](https://nextjs.org/)
* **Library**: [React 19](https://react.dev/)
* **Styling**: Tailwind CSS v4 & custom glassmorphism layers
* **Animations**: [Framer Motion](https://www.framer.com/motion/)
* **Icons**: [Lucide React](https://lucide.dev/)
* **Charts**: [Recharts](https://recharts.org/)
* **Telephony**: WebRTC dynamic audio interfaces

---

## 📂 Project Structure

```bash
dbs-mintek/
├── src/
│   ├── app/                      # Next.js page routers & layout metadata
│   │   ├── about/                # About page (leadership and national Vi awards)
│   │   ├── admin/                # Super-Admin tenant dashboards
│   │   ├── blog/                 # Platform articles
│   │   ├── clients/              # Client roster metrics
│   │   ├── dialer/               # Unified agent dialer portal
│   │   ├── faqs/                 # HIPAA & multi-tenant FAQs
│   │   ├── pricing/              # Interactive outlay quote estimators (Rupee formatted)
│   │   ├── privacy/              # GDPR compliance documents (Table of Contents)
│   │   ├── security/             # SRTP, TLS & namespace security outlines
│   │   ├── sitemap/              # HTML sitemap layout
│   │   └── terms/                # TCPA compliance terms
│   └── components/
│       ├── home/                 # Main landing components (Hero, map, contact grid)
│       ├── layout/               # Global Navbar & Footer logo reskins
│       └── nexdial/              # Embedded Dialer App modules & mock systems
└── package.json                  # Dependencies & execution scripts
```

---

## 💻 Getting Started

### Prerequisites
Make sure you have Node.js 18+ and npm installed.

### Setup Instructions

1. **Clone the repository**:
   ```bash
   git clone https://github.com/sabledattatray/DBS-Mintek.git
   cd DBS-Mintek
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) with your browser to view the application.

4. **Verify TypeScript & Production Build**:
   ```bash
   npx tsc --noEmit
   npm run build
   ```

---

## 🔒 Security & Compliance

DBS Mintek® complies with key global standards for secure communication and operations:
* **HIPAA**: Offers Business Associate Agreements (BAAs), automatic data masking, and call logs scrubbing.
* **SOC2 Type II**: Continuous vulnerability scanning, audit logs, and secure access permissions.
* **GDPR**: EU isolated storage clusters and local sovereignty data zones.
* **SIP Security**: SRTP and DTLS encryption for WebRTC call channels to protect against eavesdropping.

---

## 📝 License & Attribution

© 2026 DBS Mintek®. All rights reserved.

Made for **High Performance** by [Datta Sable](https://dattasable.com).
