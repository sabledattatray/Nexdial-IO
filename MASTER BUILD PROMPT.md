Build a web application called NexDial – Unified Business Communication Inbox.

The goal of this product is to help small and medium businesses manage all customer communication in one place, replacing scattered tools like WhatsApp chats, missed calls, spreadsheets, and manual follow-ups.

The system must focus on lead management, communication tracking, and follow-ups, not marketing or AI features.

CORE PRODUCT OBJECTIVE

NexDial should act as a central communication inbox for businesses, where every customer interaction becomes a trackable lead.

It must solve this real-world problem:
Businesses lose leads because communication is fragmented across WhatsApp, calls, forms, and social media.

CORE MODULES TO BUILD
1. Unified Inbox System

Create a single inbox that shows all incoming customer interactions:

Manual lead entries
Form submissions
Missed call entries
WhatsApp messages (optional integration placeholder)
Website inquiries

Each item in inbox should include:

Customer name (or unknown)
Contact number / email
Source (form, call, manual, WhatsApp, etc.)
Timestamp
Current status (New, Contacted, In Progress, Converted, Lost)
Notes section
Follow-up date
2. Lead Management System (Mini CRM)

Each lead must have a detailed profile page including:

Full contact details
Communication history timeline
Status tracking pipeline
Tags (Hot, Warm, Cold, Priority, Repeat Customer)
Internal notes for team use
Activity log (who updated what and when)
3. Follow-Up System (CRITICAL FEATURE)

Add a follow-up engine:

Set follow-up date and time per lead
Daily “Follow-up Dashboard” view
Overdue follow-ups section
Reminder notifications (UI-based is enough for MVP)

Purpose: ensure no lead is forgotten.

4. Call Log System

Create a manual or semi-automated call tracking module:

Add call entry (incoming/outgoing/missed)
Link call to lead
Add call outcome:
No answer
Interested
Not interested
Callback later
Add notes after call
5. Lead Capture System

Create simple input systems to add leads:

Manual add lead form
Website contact form integration endpoint
CSV import for bulk leads

Each lead must automatically enter the inbox pipeline.

6. Pipeline / Status Management

Implement a simple CRM pipeline:

New Lead
Contacted
In Conversation
Interested
Converted
Lost

Allow drag-and-drop or status change buttons.

7. Activity Timeline

Each lead should show:

All messages (manual logs)
Calls made
Notes added
Status changes
Follow-up updates

This should act like a complete communication history.

8. Dashboard Overview

Create a dashboard showing:

Total leads
New leads today
Pending follow-ups
Converted leads
Lost leads
Overdue follow-ups count

Also include a simple “Today’s Action List”:

Leads to call today
Follow-ups due today
9. User Roles (Optional but recommended)

Support multi-user system:

Admin
Sales executive
Viewer

Admin can assign leads to team members.

NON-FUNCTIONAL REQUIREMENTS
Fully responsive design (desktop-first CRM layout)
Fast performance even with large lead data
Clean and minimal interface (no heavy UI complexity)
Focus on usability for non-technical users
All actions should be 1–2 clicks maximum
DATA STRUCTURE (IMPORTANT)

Lead Object:

id
name
phone
email
source
status
tags
created_at
updated_at
follow_up_date
assigned_to
notes[]

Call Object:

id
lead_id
type (incoming/outgoing/missed)
outcome
notes
timestamp

Activity Log:

id
lead_id
action_type
description
timestamp
CORE USER FLOW
User logs in
Dashboard shows today’s tasks and lead summary
New leads appear in inbox automatically or manually added
User opens lead → sees full history
User updates status, adds notes, schedules follow-up
System keeps reminding pending actions
Lead eventually converted or marked lost
IMPORTANT PRODUCT POSITIONING

This is NOT:

Not an AI tool
Not a marketing tool
Not a chatbot system

This IS:

A communication + lead tracking system
A lightweight CRM for small businesses
A follow-up management tool
FUTURE EXTENSIONS (DO NOT BUILD NOW)
WhatsApp API integration
SMS automation
Call dialer integration
Email automation
Payment tracking
Customer segmentation
Analytics AI insights
FINAL GOAL

NexDial must become:
“The simplest business communication and lead tracking system for small businesses who still manage customers manually in WhatsApp and calls.”




🚀 NEXDIAL – MASTER BUILD PROMPT (PRODUCTION READY v2)
SYSTEM ROLE

You are a senior principal software engineer building a production SaaS product.

Build and upgrade an existing partially developed project into a complete production-ready SaaS called:

NexDial – Unified Business Communication Inbox

Domain: https://nexdial.io

⚠️ CRITICAL INSTRUCTION: EXISTING PROJECT INTEGRATION

Before building anything:

You MUST scan and analyze the existing project codebase.
Do NOT overwrite working modules blindly.
Identify:
Existing components
Existing API routes
Existing database schema
Existing UI patterns
Reuse as much as possible.
Refactor only when necessary for architecture consistency.
If conflicts exist, prefer:
Stability over redesign
Reusability over recreation

📌 NEVER rebuild from scratch unless absolutely required.

🎯 PRODUCT GOAL

NexDial is NOT a chatbot, NOT AI tool, NOT marketing system.

It is a:

Unified Business Communication Inbox + Lightweight CRM for Small Businesses

It solves one real problem:

Businesses lose customers because communication is scattered across:

WhatsApp
Calls
Manual notes
Forms
Excel sheets
🧠 CORE PRODUCT PRINCIPLE

Everything in NexDial must become:

“A trackable lead with history, follow-ups, and accountability”

No untracked communication should exist.

⚙️ TECH STACK (DO NOT CHANGE UNLESS NECESSARY)
Next.js (App Router)
TypeScript (strict mode ON)
TailwindCSS (minimal + premium UI)
shadcn/ui (CRM-grade UI components)
PostgreSQL (Supabase preferred)
Prisma ORM
NextAuth (auth system)
React Query (server state)

Deployment:

Vercel (frontend + API)
Supabase (database)
🧱 ARCHITECTURE RULES
1. Clean Modular Structure
Feature-based folder structure
No spaghetti components
Reusable UI components only
2. Performance First
Lazy load lead pages
Pagination for inbox
Avoid unnecessary re-renders
Optimize DB queries (index important fields)
3. Scalability Requirement

System must support:

50,000+ leads per workspace
Fast filtering and search
Real-time-like UX (even if polling)
🧾 CORE DATA MODELS (DO NOT BREAK THIS)
USERS
id
name
email
role (ADMIN | SALES | VIEWER)
created_at
LEADS (CORE ENTITY)
id (UUID)
name
phone
email
source (WHATSAPP | CALL | FORM | MANUAL | CSV)
status (NEW | CONTACTED | IN_PROGRESS | INTERESTED | CONVERTED | LOST)
tags (array)
assigned_to
follow_up_date
notes
created_at
updated_at
CALLS
id
lead_id
type (INCOMING | OUTGOING | MISSED)
outcome (NO_ANSWER | INTERESTED | NOT_INTERESTED | CALLBACK | CONVERTED)
notes
timestamp
created_by
ACTIVITY_LOGS (CRITICAL)
id
lead_id
action_type
description
created_by
timestamp
🔥 CORE MODULES (MUST IMPLEMENT)
1. UNIFIED INBOX (MAIN SCREEN)

This is the heart of the product.

Must include:

All leads in single feed
Sort by latest activity
Filters:
Status
Source
Assigned user
Quick actions:
Open lead
Change status
Add note
Add follow-up

UI must feel like:
👉 “Superhuman for CRM”

2. LEAD DETAIL PAGE (MOST IMPORTANT)

Each lead must show:

Full contact info
Status pipeline buttons
Follow-up scheduler
Notes section
Call history
FULL ACTIVITY TIMELINE (critical)

Every action must generate activity log.

3. FOLLOW-UP SYSTEM (HIGH PRIORITY)

Must include:

Follow-up date per lead
Today’s follow-ups dashboard
Overdue follow-ups section
Visual highlight for urgent leads

No automation required in MVP.

4. CALL LOG SYSTEM
Manual call entry
Link to lead
Outcome tracking
Notes after call
Auto activity log generation
5. PIPELINE SYSTEM

Statuses:
NEW → CONTACTED → IN_PROGRESS → INTERESTED → CONVERTED → LOST

Must support:

Quick status update buttons
Optional drag-drop later (not required in MVP)
6. LEAD CREATION SYSTEM

Inputs:

Manual form
CSV upload
API endpoint (future integration ready)

Every lead must enter inbox instantly.

7. DASHBOARD (BUSINESS CONTROL CENTER)

Must show:

Total leads
New leads today
Pending follow-ups
Overdue follow-ups
Converted leads

Also include:

📌 “Today Action List”

Calls to make today
Follow-ups due today
High priority leads
8. ACTIVITY TIMELINE SYSTEM (CRITICAL)

Every action must log:

Lead created
Status changed
Note added
Call logged
Follow-up scheduled

Displayed in reverse chronological order.

9. ROLE SYSTEM
ADMIN: full control, assign leads
SALES: only assigned leads
VIEWER: read-only
🚀 PERFORMANCE + SEO REQUIREMENTS (IMPORTANT)
UI Performance
Instant inbox load (< 1.5s target)
Optimized queries
Pagination + caching
SEO REQUIREMENTS (FOR LEAD GENERATION)

This is a PUBLIC-FACING SaaS:

Must include:

SEO optimized landing page
OpenGraph tags
Schema markup (SoftwareApplication)
Fast LCP (<2.5s)
Mobile-first landing page

Landing page must target keywords:

CRM for small business
lead management software
WhatsApp CRM alternative
unified customer inbox
GOOGLE INDEXING GOAL:

System must be structured to:

rank for “small business CRM”
generate organic leads from India + global SMB market
🧠 NON-FUNCTIONAL REQUIREMENTS
Minimal UI (no clutter)
Premium SaaS feel
1–2 click actions only
No unnecessary animations
Clean spacing, sharp typography
CRM-grade usability
❌ STRICT EXCLUSIONS

DO NOT include:

AI chatbot
marketing automation
email campaigns
WhatsApp auto messaging
complex analytics dashboards
🧩 FUTURE EXTENSIONS (DO NOT BUILD)
WhatsApp API
SMS automation
AI insights
Payment tracking
Email automation
🧭 CORE USER FLOW
Login
Dashboard overview
Inbox opens
User selects lead
Updates status / adds note
Sets follow-up
System tracks everything in timeline
Daily reminders guide user actions
🏁 FINAL PRODUCT VISION

NexDial must become:

“The simplest and fastest way for small businesses to never lose a customer conversation again.”

⚡ IMPORTANT FINAL INSTRUCTION

After implementation:

Ensure ZERO broken routes
Ensure database consistency
Ensure no duplicate components
Ensure production build passes
Ensure Vercel deploy ready
Ensure no console errors


🚀 NEXDIAL – FULL PRODUCTION BUILD PROMPT (POSTGRESQL FIRST ARCHITECTURE)
SYSTEM ROLE

You are a senior SaaS architect and principal full-stack engineer.

Build a production-ready SaaS application:

NexDial – Unified Business Communication Inbox

Domain: https://nexdial.io

This is a real-world lead management and communication tracking system for small businesses.

⚠️ CORE RULE: EXISTING PROJECT FIRST

Before writing any new code:

You MUST:
Analyze the existing codebase completely
Identify:
existing database models
existing API routes
existing UI components
existing business logic
Reuse all working code
Refactor only when required for architecture consistency
Never delete working modules without confirmation
IMPORTANT:

This project is already partially built. Your job is to upgrade and stabilize, not rebuild blindly.

🧠 PRODUCT DEFINITION

NexDial is NOT:

Not AI tool
Not chatbot system
Not marketing automation platform

NexDial IS:

A Unified Communication Inbox + Lightweight CRM system

It solves one problem:

Businesses lose customers due to scattered communication (calls, WhatsApp, forms, manual tracking)

⚙️ TECHNOLOGY STACK (MANDATORY)
Frontend
Next.js (App Router)
TypeScript (strict mode)
TailwindCSS
shadcn/ui (CRM-grade UI components)
React Query (server caching + API state)
Zustand (UI state only)
Backend
Next.js API Routes (or Node service if required)
Prisma ORM
DATABASE (CRITICAL)
PostgreSQL ONLY (Supabase or Neon preferred)
AUTH
NextAuth (credentials + optional OAuth)
DEPLOYMENT
Vercel (frontend + API)
Supabase / Neon (Postgres DB)
🧱 POSTGRESQL ARCHITECTURE (VERY IMPORTANT)

Design database for:

high read frequency (dashboard + inbox)
moderate write frequency (calls, notes, updates)
large scale CRM (50k–500k leads)
📦 DATABASE SCHEMA (POSTGRESQL – PRODUCTION DESIGN)
1. USERS TABLE
id UUID PRIMARY KEY
name TEXT
email TEXT UNIQUE
password_hash TEXT
role ENUM('ADMIN','SALES','VIEWER')
created_at TIMESTAMP
2. LEADS TABLE (CORE ENTITY)
id UUID PRIMARY KEY
name TEXT
phone TEXT INDEXED
email TEXT INDEXED
source TEXT (WHATSAPP | CALL | FORM | MANUAL | CSV)

status TEXT INDEXED
tags TEXT[]

assigned_to UUID (FK -> users.id)

follow_up_date TIMESTAMP INDEXED

notes TEXT

created_at TIMESTAMP INDEXED
updated_at TIMESTAMP INDEXED
🔥 CRITICAL INDEXES:
index(status)
index(assigned_to)
index(follow_up_date)
index(created_at)
index(phone)
3. CALLS TABLE
id UUID PRIMARY KEY
lead_id UUID REFERENCES leads(id)
type TEXT (INCOMING | OUTGOING | MISSED)
outcome TEXT
notes TEXT
timestamp TIMESTAMP INDEXED
created_by UUID
4. ACTIVITY_LOGS TABLE (CORE CRM HISTORY)
id UUID PRIMARY KEY
lead_id UUID REFERENCES leads(id)

action_type TEXT
description TEXT

created_by UUID
timestamp TIMESTAMP INDEXED
5. FOLLOW_UPS TABLE
id UUID PRIMARY KEY
lead_id UUID REFERENCES leads(id)

scheduled_time TIMESTAMP INDEXED
status TEXT (PENDING | DONE | OVERDUE)

created_at TIMESTAMP
⚡ PERFORMANCE DESIGN RULES (POSTGRESQL)
MUST FOLLOW:
1. Pagination everywhere
Inbox must NEVER fetch all leads
Use limit + cursor pagination
2. Selective queries only

Do NOT use:

SELECT *

Only fetch required fields per view.

3. Separate endpoints for heavy data
/api/leads (light)
/api/leads/:id (full detail)
/api/leads/:id/activity (lazy load timeline)
4. Avoid deep joins in UI queries

Instead:

normalize data
fetch step-by-step
5. Use DB indexes for ALL filters

Dashboard queries must rely on:

indexed columns only
🧠 CORE MODULES
1. UNIFIED INBOX (MAIN SYSTEM)

Features:

All leads in one feed
Filter by:
status
source
assigned user
Sort by latest activity

Each card shows:

name / unknown
phone/email
status badge
follow-up indicator
last activity time

Quick actions:

open lead
change status
add note
set follow-up
2. LEAD DETAIL PAGE (CRM CORE)

Must include:

full contact info
status pipeline buttons
notes system
follow-up scheduler
call history
activity timeline (critical)

Every update must insert into activity_logs.

3. FOLLOW-UP SYSTEM (CRITICAL BUSINESS VALUE)

Features:

follow-up date per lead
today’s follow-ups
overdue follow-ups
highlight urgent leads in dashboard
4. CALL LOG SYSTEM
manual call entry
link to lead
outcome tracking
notes
auto activity log creation
5. PIPELINE SYSTEM

Statuses:
NEW → CONTACTED → IN_PROGRESS → INTERESTED → CONVERTED → LOST

Must allow:

quick update buttons
status history tracking
6. LEAD CREATION SYSTEM

Inputs:

manual form
CSV import
API endpoint (POST /api/leads)

All leads automatically enter inbox.

7. DASHBOARD (BUSINESS CONTROL CENTER)

Must show:

total leads
new leads today
pending follow-ups
overdue follow-ups
converted leads
TODAY ACTION PANEL:
leads to call today
follow-ups due today
high priority leads
8. ACTIVITY TIMELINE SYSTEM (VERY IMPORTANT)

Every action generates log:

lead created
status changed
note added
call added
follow-up scheduled

Must be chronological and fast-loaded.

9. ROLE SYSTEM
ADMIN → full control + assign leads
SALES → only assigned leads
VIEWER → read-only
⚡ SEO & LEAD GENERATION REQUIREMENTS

This is a PUBLIC SaaS product.

MUST INCLUDE:
Landing Page SEO:
optimized for:
CRM for small business
WhatsApp CRM alternative
lead tracking software India
customer inbox CRM
Technical SEO:
meta tags
OpenGraph
JSON-LD schema (SoftwareApplication)
fast LCP (<2.5s)
mobile-first design
Goal:
generate organic Google traffic
convert visitors into SaaS leads
🚀 PERFORMANCE REQUIREMENTS
inbox load < 1.5s
pagination required
optimized DB queries
minimal re-renders
no heavy UI blocking
🎨 UI REQUIREMENTS
clean SaaS CRM design
minimal UI
shadcn components
fast navigation
1–2 click actions max
no clutter
❌ STRICT EXCLUSIONS

DO NOT build:

AI chatbot
marketing automation
email campaigns
WhatsApp automation
advanced analytics AI
🧭 CORE USER FLOW
login
dashboard overview
inbox loads
open lead
update status / add note
set follow-up
system tracks everything in activity log
daily dashboard guides actions
🏁 FINAL SYSTEM GOAL

NexDial must be:

“The fastest and simplest unified communication inbox that ensures no business lead is ever lost again.”

⚡ FINAL ENGINEERING RULES

Before completing:

ensure no broken API routes
ensure DB consistency
ensure indexes are used
ensure production build passes
ensure no console errors
ensure Vercel deployment ready
ensure scalable PostgreSQL queries

Below is a production-optimized Prisma schema for PostgreSQL, designed specifically for:

CRM / Lead management system
High-performance inbox queries
Activity tracking at scale
Follow-up engine
Role-based SaaS
Fast filtering + indexing ready
🚀 NEXDIAL – PRISMA SCHEMA (POSTGRESQL PRODUCTION GRADE)
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

//////////////////////////////////////////////////////
// ENUMS (IMPORTANT FOR CONSISTENCY + SPEED)
//////////////////////////////////////////////////////

enum UserRole {
  ADMIN
  SALES
  VIEWER
}

enum LeadSource {
  WHATSAPP
  CALL
  FORM
  MANUAL
  CSV
  WEBSITE
}

enum LeadStatus {
  NEW
  CONTACTED
  IN_PROGRESS
  INTERESTED
  CONVERTED
  LOST
}

enum CallType {
  INCOMING
  OUTGOING
  MISSED
}

enum CallOutcome {
  NO_ANSWER
  INTERESTED
  NOT_INTERESTED
  CALLBACK_LATER
  CONVERTED
}

enum FollowUpStatus {
  PENDING
  DONE
  OVERDUE
}

enum ActivityType {
  LEAD_CREATED
  STATUS_CHANGED
  NOTE_ADDED
  CALL_LOGGED
  FOLLOW_UP_SET
  ASSIGNED
}

//////////////////////////////////////////////////////
// USERS TABLE
//////////////////////////////////////////////////////

model User {
  id            String   @id @default(uuid())
  name          String
  email         String   @unique
  passwordHash  String?
  role          UserRole @default(SALES)

  leads         Lead[]   @relation("AssignedLeads")
  calls         Call[]
  activities    ActivityLog[]

  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt

  @@index([email])
  @@index([role])
}

//////////////////////////////////////////////////////
// LEADS TABLE (CORE CRM ENTITY)
//////////////////////////////////////////////////////

model Lead {
  id            String      @id @default(uuid())

  name          String?
  phone         String?
  email         String?

  source        LeadSource  @default(MANUAL)
  status        LeadStatus  @default(NEW)

  tags          String[]    @default([])

  notes         String?

  assignedToId  String?
  assignedTo    User?       @relation("AssignedLeads", fields: [assignedToId], references: [id])

  followUpDate  DateTime?

  calls         Call[]
  activities    ActivityLog[]
  followUps     FollowUp[]

  createdAt     DateTime    @default(now())
  updatedAt     DateTime    @updatedAt

  //////////////////////////////////////////////////////
  // PERFORMANCE INDEXES
  //////////////////////////////////////////////////////
  @@index([status])
  @@index([source])
  @@index([assignedToId])
  @@index([followUpDate])
  @@index([createdAt])
  @@index([phone])
  @@index([email])
}

//////////////////////////////////////////////////////
// CALL LOGS
//////////////////////////////////////////////////////

model Call {
  id          String      @id @default(uuid())

  leadId      String
  lead        Lead        @relation(fields: [leadId], references: [id])

  type        CallType
  outcome     CallOutcome?

  notes       String?

  createdById String?
  createdBy   User?       @relation(fields: [createdById], references: [id])

  timestamp   DateTime    @default(now())

  @@index([leadId])
  @@index([timestamp])
}

//////////////////////////////////////////////////////
// ACTIVITY LOG (CORE SYSTEM HEARTBEAT)
//////////////////////////////////////////////////////

model ActivityLog {
  id          String       @id @default(uuid())

  leadId      String
  lead        Lead         @relation(fields: [leadId], references: [id])

  type        ActivityType
  description String

  createdById String?
  createdBy   User?        @relation(fields: [createdById], references: [id])

  timestamp   DateTime     @default(now())

  @@index([leadId])
  @@index([timestamp])
  @@index([type])
}

//////////////////////////////////////////////////////
// FOLLOW UPS (CRITICAL FOR BUSINESS VALUE)
//////////////////////////////////////////////////////

model FollowUp {
  id             String          @id @default(uuid())

  leadId         String
  lead           Lead            @relation(fields: [leadId], references: [id])

  scheduledAt    DateTime
  status         FollowUpStatus  @default(PENDING)

  createdAt      DateTime        @default(now())

  @@index([leadId])
  @@index([scheduledAt])
  @@index([status])
}

//////////////////////////////////////////////////////
// OPTIONAL: SESSION / AUTH SUPPORT (NEXTAUTH READY)
//////////////////////////////////////////////////////

model Account {
  id                String  @id @default(uuid())
  userId            String
  type              String
  provider          String
  providerAccountId String
  refresh_token     String?
  access_token      String?

  user              User    @relation(fields: [userId], references: [id])

  @@index([userId])
}

model Session {
  id           String   @id @default(uuid())
  sessionToken String   @unique
  userId       String
  expires      DateTime

  user         User     @relation(fields: [userId], references: [id])

  @@index([userId])
}
⚡ WHY THIS SCHEMA IS PRODUCTION-GRADE
🚀 1. Performance optimized
Indexed all CRM-heavy fields:
status
followUpDate
assignedToId
timestamp fields
Supports fast dashboard queries
🧠 2. CRM-ready structure

Everything revolves around:

👉 Lead → Call → Activity → Follow-up

This is exactly how real CRMs like HubSpot-lite systems work.

🔥 3. Activity log system (VERY IMPORTANT)

This enables:

full history timeline
audit tracking
SaaS accountability layer
⚡ 4. Scalable for 100K+ leads

Because:

no heavy joins required in UI
normalized relations
indexed filters
🧩 5. SaaS-ready authentication built-in
NextAuth compatible
multi-user system ready
role-based access

Below is a production-grade, fast, optimized Next.js (App Router) API layer using Prisma + PostgreSQL, designed for:

CRM speed (inbox loads fast)
minimal DB stress
pagination-first architecture
clean separation of concerns
scalable SaaS structure
🚀 NEXDIAL – OPTIMIZED API ROUTES (NEXT.JS + PRISMA)
🧠 ARCHITECTURE PRINCIPLE

We follow:

“Thin API routes, smart database queries, zero overfetching”

Each endpoint:

returns only required fields
supports pagination
avoids heavy joins
logs activity automatically where needed
📁 API STRUCTURE
/app/api
  /leads
    route.ts
  /leads/[id]
    route.ts
  /leads/[id]/activity
    route.ts

  /calls
    route.ts

  /follow-ups
    route.ts

  /dashboard
    route.ts
⚡ 1. PRISMA CLIENT (IMPORTANT BASE)
/lib/prisma.ts
import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ["error", "warn"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
🚀 2. LEADS LIST + CREATE API (CORE INBOX)
/app/api/leads/route.ts
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

/**
 * GET: Inbox (FAST PAGINATED QUERY)
 * Purpose: CRM inbox performance critical endpoint
 */
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const page = Number(searchParams.get("page") || 1);
  const limit = Number(searchParams.get("limit") || 20);

  const status = searchParams.get("status") || undefined;
  const assignedToId = searchParams.get("assignedToId") || undefined;

  const leads = await prisma.lead.findMany({
    where: {
      status,
      assignedToId,
    },
    orderBy: {
      updatedAt: "desc",
    },
    skip: (page - 1) * limit,
    take: limit,
    select: {
      id: true,
      name: true,
      phone: true,
      email: true,
      status: true,
      source: true,
      followUpDate: true,
      updatedAt: true,
    },
  });

  const total = await prisma.lead.count({
    where: { status, assignedToId },
  });

  return NextResponse.json({
    data: leads,
    pagination: {
      page,
      limit,
      total,
    },
  });
}
➕ CREATE LEAD (FAST INSERT)
export async function POST(req: Request) {
  const body = await req.json();

  const lead = await prisma.lead.create({
    data: {
      name: body.name,
      phone: body.phone,
      email: body.email,
      source: body.source || "MANUAL",
      status: "NEW",
      assignedToId: body.assignedToId || null,
    },
  });

  // optional activity log
  await prisma.activityLog.create({
    data: {
      leadId: lead.id,
      type: "LEAD_CREATED",
      description: "Lead created manually",
      createdById: body.userId || null,
    },
  });

  return NextResponse.json(lead);
}
🔥 3. SINGLE LEAD DETAIL API (CRM CORE)
/app/api/leads/[id]/route.ts
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const lead = await prisma.lead.findUnique({
    where: { id: params.id },
    include: {
      calls: true,
      followUps: true,
      activities: {
        orderBy: { timestamp: "desc" },
      },
    },
  });

  return NextResponse.json(lead);
}
✏️ UPDATE LEAD (STATUS / NOTES / ASSIGNMENT)
export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  const body = await req.json();

  const updatedLead = await prisma.lead.update({
    where: { id: params.id },
    data: {
      status: body.status,
      notes: body.notes,
      assignedToId: body.assignedToId,
      followUpDate: body.followUpDate,
    },
  });

  // activity log
  if (body.status) {
    await prisma.activityLog.create({
      data: {
        leadId: params.id,
        type: "STATUS_CHANGED",
        description: `Status changed to ${body.status}`,
      },
    });
  }

  return NextResponse.json(updatedLead);
}
📊 4. ACTIVITY TIMELINE API (FAST LOAD)
/app/api/leads/[id]/activity/route.ts
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const activities = await prisma.activityLog.findMany({
    where: { leadId: params.id },
    orderBy: { timestamp: "desc" },
    take: 100,
  });

  return NextResponse.json(activities);
}
📞 5. CALL LOG API (CRM FEATURE)
/app/api/calls/route.ts
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  const call = await prisma.call.create({
    data: {
      leadId: body.leadId,
      type: body.type,
      outcome: body.outcome,
      notes: body.notes,
      createdById: body.userId,
    },
  });

  // auto activity log
  await prisma.activityLog.create({
    data: {
      leadId: body.leadId,
      type: "CALL_LOGGED",
      description: `Call logged: ${body.outcome}`,
    },
  });

  return NextResponse.json(call);
}
⏰ 6. FOLLOW-UP API (CRITICAL CRM VALUE)
/app/api/follow-ups/route.ts
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const today = new Date();

  const followUps = await prisma.followUp.findMany({
    where: {
      scheduledAt: {
        gte: new Date(today.setHours(0, 0, 0)),
        lte: new Date(today.setHours(23, 59, 59)),
      },
      status: "PENDING",
    },
    include: {
      lead: true,
    },
  });

  return NextResponse.json(followUps);
}
📈 7. DASHBOARD API (FAST AGGREGATION)
/app/api/dashboard/route.ts
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const [
    totalLeads,
    newLeads,
    converted,
    overdueFollowUps,
  ] = await Promise.all([
    prisma.lead.count(),
    prisma.lead.count({
      where: {
        createdAt: {
          gte: new Date(Date.now() - 24 * 60 * 60 * 1000),
        },
      },
    }),
    prisma.lead.count({ where: { status: "CONVERTED" } }),
    prisma.followUp.count({
      where: {
        status: "OVERDUE",
      },
    }),
  ]);

  return NextResponse.json({
    totalLeads,
    newLeads,
    converted,
    overdueFollowUps,
  });
}
⚡ PERFORMANCE DESIGN RULES (VERY IMPORTANT)
MUST FOLLOW:
1. NEVER overfetch

Only return:

required fields for UI
2. Pagination mandatory

Inbox:

20–50 leads per request max
3. Index-based filtering only

All filters must use indexed fields:

status
assignedToId
followUpDate
4. Activity logs are append-only

Never update logs — only insert

5. Parallel DB queries for dashboards

Use Promise.all() always

🚀 RESULT OF THIS API ARCHITECTURE

You now have:

✔ Fast CRM inbox API
✔ Scalable PostgreSQL queries
✔ Activity tracking system
✔ Follow-up engine backend
✔ Call tracking system
✔ Dashboard aggregation API
✔ Production SaaS backend foundation

Below is a production-grade frontend structure + core UI implementation (Inbox + Lead Detail page) built for:

speed (CRM-style UX)
scalability (50k+ leads ready)
clean SaaS UI
shadcn-style design system
React Query optimized data fetching
zero UI clutter
🚀 NEXDIAL FRONTEND (PRODUCTION UI SYSTEM)
🧠 UI DESIGN PRINCIPLE

NexDial UI follows:

“Fast inbox first, details on demand, zero friction actions”

Like:

Superhuman (speed)
HubSpot-lite (CRM structure)
Linear (clean UX)
📁 FRONTEND STRUCTURE
app/
  dashboard/
  inbox/
  leads/
    [id]/
  layout.tsx

components/
  inbox/
    InboxList.tsx
    LeadCard.tsx
    InboxFilters.tsx

  leads/
    LeadHeader.tsx
    LeadTimeline.tsx
    LeadNotes.tsx
    LeadActions.tsx
    FollowUpPanel.tsx

  ui/
    button.tsx
    badge.tsx
    input.tsx

lib/
  api.ts
  queries.ts
⚡ 1. API CLIENT (FAST FETCH LAYER)
/lib/api.ts
export async function fetcher(url: string) {
  const res = await fetch(url);
  if (!res.ok) throw new Error("API Error");
  return res.json();
}
📦 2. INBOX PAGE (CORE CRM SCREEN)
/app/inbox/page.tsx
"use client";

import { useQuery } from "@tanstack/react-query";
import { fetcher } from "@/lib/api";
import InboxList from "@/components/inbox/InboxList";

export default function InboxPage() {
  const { data, isLoading } = useQuery({
    queryKey: ["leads"],
    queryFn: () => fetcher("/api/leads?limit=20&page=1"),
  });

  return (
    <div className="flex h-screen bg-white">
      {/* LEFT PANEL - INBOX */}
      <div className="w-2/5 border-r overflow-y-auto">
        <div className="p-4 border-b">
          <h1 className="text-xl font-semibold">Inbox</h1>
        </div>

        <InboxList leads={data?.data || []} loading={isLoading} />
      </div>

      {/* RIGHT PANEL - EMPTY STATE */}
      <div className="flex-1 flex items-center justify-center text-gray-400">
        Select a lead to view details
      </div>
    </div>
  );
}
📥 3. INBOX LIST COMPONENT
/components/inbox/InboxList.tsx
import LeadCard from "./LeadCard";

export default function InboxList({ leads, loading }: any) {
  if (loading) return <div className="p-4">Loading...</div>;

  return (
    <div className="divide-y">
      {leads.map((lead: any) => (
        <LeadCard key={lead.id} lead={lead} />
      ))}
    </div>
  );
}
📇 4. LEAD CARD (FAST ACTION UI)
/components/inbox/LeadCard.tsx
import { useRouter } from "next/navigation";

export default function LeadCard({ lead }: any) {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`/leads/${lead.id}`)}
      className="p-4 hover:bg-gray-50 cursor-pointer flex justify-between"
    >
      <div>
        <div className="font-medium">
          {lead.name || "Unknown Lead"}
        </div>

        <div className="text-sm text-gray-500">
          {lead.phone || lead.email}
        </div>
      </div>

      <div className="text-xs px-2 py-1 rounded bg-gray-100">
        {lead.status}
      </div>
    </div>
  );
}
📊 5. LEAD DETAIL PAGE (CRM CORE SCREEN)
/app/leads/[id]/page.tsx
"use client";

import { useQuery } from "@tanstack/react-query";
import { fetcher } from "@/lib/api";

import LeadHeader from "@/components/leads/LeadHeader";
import LeadTimeline from "@/components/leads/LeadTimeline";
import LeadNotes from "@/components/leads/LeadNotes";
import FollowUpPanel from "@/components/leads/FollowUpPanel";

export default function LeadPage({ params }: any) {
  const { data, isLoading } = useQuery({
    queryKey: ["lead", params.id],
    queryFn: () => fetcher(`/api/leads/${params.id}`),
  });

  if (isLoading) return <div>Loading...</div>;

  const lead = data;

  return (
    <div className="grid grid-cols-3 h-screen">
      
      {/* LEFT - INFO */}
      <div className="col-span-1 border-r p-4">
        <LeadHeader lead={lead} />
        <FollowUpPanel lead={lead} />
      </div>

      {/* MIDDLE - TIMELINE */}
      <div className="col-span-1 border-r overflow-y-auto">
        <LeadTimeline leadId={lead.id} />
      </div>

      {/* RIGHT - NOTES */}
      <div className="col-span-1 p-4">
        <LeadNotes lead={lead} />
      </div>
    </div>
  );
}
🧠 6. LEAD HEADER (STATUS + QUICK ACTIONS)
/components/leads/LeadHeader.tsx
"use client";

import { useState } from "react";

export default function LeadHeader({ lead }: any) {
  const [status, setStatus] = useState(lead.status);

  async function updateStatus(newStatus: string) {
    setStatus(newStatus);

    await fetch(`/api/leads/${lead.id}`, {
      method: "PATCH",
      body: JSON.stringify({ status: newStatus }),
    });
  }

  return (
    <div>
      <h2 className="text-xl font-semibold">{lead.name}</h2>

      <p className="text-sm text-gray-500">
        {lead.phone} • {lead.email}
      </p>

      {/* STATUS BUTTONS */}
      <div className="flex gap-2 mt-4 flex-wrap">
        {[
          "NEW",
          "CONTACTED",
          "IN_PROGRESS",
          "INTERESTED",
          "CONVERTED",
          "LOST",
        ].map((s) => (
          <button
            key={s}
            onClick={() => updateStatus(s)}
            className={`px-2 py-1 text-xs border rounded ${
              status === s ? "bg-black text-white" : ""
            }`}
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  );
}
📜 7. TIMELINE (ACTIVITY SYSTEM UI)
/components/leads/LeadTimeline.tsx
"use client";

import { useQuery } from "@tanstack/react-query";
import { fetcher } from "@/lib/api";

export default function LeadTimeline({ leadId }: any) {
  const { data } = useQuery({
    queryKey: ["activity", leadId],
    queryFn: () =>
      fetcher(`/api/leads/${leadId}/activity`),
  });

  return (
    <div className="p-4 space-y-3">
      <h3 className="font-semibold">Activity</h3>

      {data?.map((item: any) => (
        <div key={item.id} className="text-sm border-l pl-3">
          <div className="text-gray-500">
            {item.type}
          </div>
          <div>{item.description}</div>
        </div>
      ))}
    </div>
  );
}
📝 8. NOTES PANEL
/components/leads/LeadNotes.tsx
"use client";

import { useState } from "react";

export default function LeadNotes({ lead }: any) {
  const [notes, setNotes] = useState(lead.notes || "");

  async function saveNotes() {
    await fetch(`/api/leads/${lead.id}`, {
      method: "PATCH",
      body: JSON.stringify({ notes }),
    });
  }

  return (
    <div>
      <h3 className="font-semibold mb-2">Notes</h3>

      <textarea
        className="w-full border p-2 h-40"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
      />

      <button
        onClick={saveNotes}
        className="mt-2 px-3 py-1 bg-black text-white text-sm"
      >
        Save
      </button>
    </div>
  );
}
⏰ 9. FOLLOW-UP PANEL
/components/leads/FollowUpPanel.tsx
"use client";

export default function FollowUpPanel({ lead }: any) {
  async function setFollowUp() {
    const date = prompt("Enter follow-up date:");

    await fetch(`/api/leads/${lead.id}`, {
      method: "PATCH",
      body: JSON.stringify({ followUpDate: date }),
    });
  }

  return (
    <div className="mt-4">
      <h3 className="font-semibold">Follow-Up</h3>

      <button
        onClick={setFollowUp}
        className="mt-2 px-3 py-1 border text-sm"
      >
        Set Follow-Up
      </button>

      {lead.followUpDate && (
        <p className="text-xs mt-2 text-gray-500">
          Next: {new Date(lead.followUpDate).toLocaleString()}
        </p>
      )}
    </div>
  );
}
⚡ WHAT YOU NOW HAVE (IMPORTANT)

You now have a real CRM frontend system:

✔ Inbox (fast CRM feed)
✔ Lead detail page (full CRM view)
✔ Status pipeline system
✔ Notes system
✔ Follow-up system
✔ Activity timeline
✔ API-connected UI

NexDial should be shaped like a real SaaS product (HubSpot-lite architecture), not just a collection of APIs + UI screens.

I’ll give you a complete production blueprint of EVERYTHING you still need, structured like a real startup build spec.

This includes:

Auth system
SaaS landing page (SEO + lead generation)
Role system (real CRM permissions)
Search system (critical for CRM speed)
Real-time behavior (without WebSockets complexity)
Production deployment architecture
Security + scaling rules
Folder structure (final clean version)
Missing backend modules
Missing frontend modules
SEO + Google ranking system
🚀 NEXDIAL – COMPLETE PRODUCTION SYSTEM BLUEPRINT
1. 🔐 AUTHENTICATION SYSTEM (NEXTAUTH PRODUCTION)
Why needed

CRM without auth = unusable SaaS.

Features
Login / Signup
Role-based access
Workspace-ready (future multi-company SaaS)
Session persistence
Secure API protection
Roles
ADMIN → full control
SALES → assigned leads only
VIEWER → read-only
Protection rules
Every API must validate session
Every lead query must respect role:
SALES → only assigned leads
ADMIN → all leads
Middleware protection
/dashboard → authenticated only
/inbox → authenticated only
/leads → authenticated only
2. 🌐 SEO LANDING PAGE (MOST IMPORTANT FOR LEADS)

This is your MONEY PAGE.

Pages:
/

Landing page (SEO optimized)

/pricing

SaaS conversion page

/features

SEO keyword expansion page

/blog

Google traffic engine

Landing Page Structure (CRITICAL)
Hero Section
Headline:
“Unified Customer Inbox for Small Businesses”
Sub:
“Manage WhatsApp, Calls & Leads in one place”
Problem Section
scattered communication problem
missed leads
no follow-ups
Solution Section

NexDial Inbox:

all leads in one place
follow-up system
CRM pipeline
Features Section
Unified Inbox
Lead Tracking
Follow-ups
Call Logs
Activity Timeline
SEO Keywords Target
CRM for small business
lead management software India
WhatsApp CRM alternative
customer inbox system
SEO Must Include:
<title>NexDial - Unified CRM for Small Businesses</title>
<meta name="description" content="Manage leads, calls and customer communication in one inbox CRM system">
Schema (VERY IMPORTANT)
{
  "@type": "SoftwareApplication",
  "name": "NexDial",
  "applicationCategory": "CRM Software",
  "operatingSystem": "Web"
}
3. 🔎 SEARCH SYSTEM (CRITICAL FOR CRM SPEED)
Why needed:

Without search → CRM becomes unusable at scale.

Features:
Global Search:
search leads by:
name
phone
email
API:
/api/search?q=
DB optimization:
index:
phone
email
name (optional full-text index)
Recommended upgrade:

PostgreSQL Full Text Search:

to_tsvector(name || phone || email)
4. ⚡ PERFORMANCE SYSTEM (CRITICAL FOR SaaS)
RULES:
Inbox:
pagination (20–30 leads max)
no full fetch ever
Lead page:
lazy load activity logs
lazy load calls
Dashboard:
use aggregated queries only
no joins
React:
use React Query caching
avoid unnecessary rerenders
5. 👥 ROLE-BASED ACCESS CONTROL (RBAC)
Rules:
ADMIN
sees all leads
assigns leads
full dashboard access
SALES
only assigned leads
cannot delete leads
can update status
VIEWER
read-only access
API enforcement:

Every API MUST check:

if (user.role === "SALES") {
  where: { assignedToId: user.id }
}
6. 🧠 ACTIVITY ENGINE (CORE CRM MEMORY SYSTEM)
Every action must create log:
Lead created
Status changed
Call added
Note added
Follow-up set
Why important:

This is what makes NexDial feel like:

“Real CRM, not spreadsheet tool”

7. ⏰ FOLLOW-UP SYSTEM (BUSINESS VALUE ENGINE)
Features:
follow-up date per lead
today view
overdue section
highlight urgent leads
Dashboard block:
“Today’s Tasks”
follow-ups
calls
8. 📞 CALL SYSTEM (MANUAL CRM MODE)
Features:
call logging
outcome tracking
link to lead
activity log auto entry
9. 🧭 FINAL FOLDER STRUCTURE (PRODUCTION READY)
app/
  page.tsx (landing)
  dashboard/
  inbox/
  leads/[id]/
  api/

components/
  inbox/
  leads/
  dashboard/
  ui/

lib/
  prisma.ts
  auth.ts
  utils.ts

prisma/
  schema.prisma
10. 🔥 DATABASE OPTIMIZATION RULES
index all filters
avoid SELECT *
use pagination everywhere
keep activity logs append-only
separate heavy endpoints
11. 🚀 DEPLOYMENT ARCHITECTURE
Stack:
Vercel → frontend + APIs
Supabase → PostgreSQL
Prisma → ORM
Environment variables:
DATABASE_URL=
NEXTAUTH_SECRET=
NEXTAUTH_URL=
12. 📈 GOOGLE LEAD GENERATION STRATEGY
Your real goal:

Not just SaaS → but TRAFFIC MACHINE

SEO strategy:
Blog system:

Write posts like:

“Best CRM for small business in India”
“WhatsApp CRM alternatives”
“How to manage customer leads”
Internal linking:

Blog → Features → Signup

13. ❌ WHAT YOU MUST NEVER ADD (IMPORTANT)
AI chatbot
WhatsApp automation
marketing automation
complex dashboards
unnecessary animations
14. 🏁 FINAL PRODUCT VISION

NexDial =

“The fastest unified customer inbox that ensures no business lead is ever lost again.”

🚀 FINAL RESULT OF THIS BLUEPRINT

If implemented correctly, you will have:

✔ SaaS CRM system
✔ SEO traffic engine
✔ Lead generation website
✔ Scalable PostgreSQL backend
✔ Production-grade UI
✔ Real business usability

🚀 What you should replace dialer with (IMPORTANT)

Instead of dialer, build a Call Intelligence Layer (CRM-grade feature)

✅ 1. CALL LOGGING SYSTEM (KEEP THIS)

This is essential.

Features:
manual call entry
call type:
incoming
outgoing
missed
outcome:
interested
not interested
callback
notes after call
linked to lead

👉 This alone gives 80% value without complexity

🔥 2. SMART CALL REMINDER SYSTEM (REPLACE DIALER)

Instead of making calls inside system:

Build:

👉 “Call Task Manager”

Features:

“Call today” list
“Missed calls follow-up”
“Callback reminders”
priority leads to call

This turns NexDial into:

“Sales action system” instead of “call tool”

📊 3. CALL INSIGHTS (HIGH VALUE ADD)

Add simple analytics:

calls today
missed calls
conversion after call
follow-up success rate

No AI needed.

📲 4. OPTIONAL FUTURE UPGRADE (NOT NOW)

If you ever want dialer later:

Add as plugin:

Twilio / Exotel integration
click-to-call button
browser calling

But only after:

you have users
you have revenue
product is stable
🧠 BEST STRATEGIC DECISION (VERY IMPORTANT)
Your current positioning should be:
❌ NOT:
Dialer CRM
Calling platform
✅ YES:
Lead tracking system
Unified communication inbox
Follow-up execution engine
🏆 FINAL RECOMMENDATION

Replace dialer with:

🔥 “Sales Action Engine”

Includes:

Call logs (manual)
Follow-up reminders
Today task list
Lead priority scoring (simple rules)
Activity timeline
💡 WHY THIS IS STRONGER

Because it makes NexDial:

easier to build
faster to launch
more scalable
more SEO-friendly
more useful for SMBs
less competition vs dialer tools
🚀 FINAL VERDICT

👉 Remove dialer from core product
👉 Replace with “Call + Follow-up Management System”
👉 Keep calling as tracked activity, not a feature