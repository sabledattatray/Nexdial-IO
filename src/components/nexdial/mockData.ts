import { Contact, Campaign, CallLog, Agent, IVRNode, IVRConnection, Integration, SystemLog, ScriptTemplate, SystemHealthMetrics } from './types';

export const INITIAL_CONTACTS: Contact[] = [
  {
    id: 'c-1',
    name: 'Robert Stark',
    phone: '+1 (555) 234-5678',
    email: 'robert@winterfellholdings.com',
    company: 'Winterfell Holdings',
    status: 'Qualified',
    tags: ['VIP', 'Enterprise', 'Multi-Line'],
    notes: [
      { id: 'n-1', text: 'Interested in configuring a 150-agent predictive dialer next month.', timestamp: '2026-05-20T14:30:00Z', author: 'Dattatray' },
      { id: 'n-2', text: 'Reviewed tier rates. Requested high-volume local presence configuration.', timestamp: '2026-05-18T09:15:00Z', author: 'Sarah Smith' }
    ],
    segment: 'SaaS',
    sentiment: 'Positive',
    revenueValue: 4500
  },
  {
    id: 'c-2',
    name: 'Dr. Evelyn Martinez',
    phone: '+1 (555) 876-5432',
    email: 'evelyn.martinez@pacifichealth.org',
    company: 'Pacific Health Group',
    status: 'Negotiation',
    tags: ['HIPAA Ready', 'Healthcare', 'Inbound Routing'],
    notes: [
      { id: 'n-3', text: 'Needs absolute high-availability and HIPAA-ready call recorders.', timestamp: '2026-05-21T18:00:00Z', author: 'John Doe' }
    ],
    segment: 'Healthcare',
    sentiment: 'Positive',
    revenueValue: 12000
  },
  {
    id: 'c-3',
    name: 'Marcus Vance',
    phone: '+1 (555) 901-2345',
    email: 'm.vance@vancecapitals.com',
    company: 'Vance Capital Partners',
    status: 'Lead',
    tags: ['Cold Call', 'Finance', 'Tier 2'],
    notes: [
      { id: 'n-4', text: 'Unreachable on dial attempt 1. Voicemail dropped.', timestamp: '2026-05-19T11:22:00Z', author: 'AutoDialer' }
    ],
    segment: 'Banking',
    sentiment: 'Neutral',
    revenueValue: 8500
  },
  {
    id: 'c-4',
    name: 'Amara Okafor',
    phone: '+1 (555) 345-6789',
    email: 'amara.o@bluehorizonlogistics.com',
    company: 'Blue Horizon Logistics',
    status: 'Contacted',
    tags: ['Omnichannel', 'WhatsApp', 'SMS'],
    notes: [
      { id: 'n-5', text: 'Asked for dynamic SMS templates triggered upon call hanging.', timestamp: '2026-05-22T08:44:00Z', author: 'Dattatray' }
    ],
    segment: 'Logistics',
    sentiment: 'Positive',
    revenueValue: 3200
  },
  {
    id: 'c-5',
    name: 'Christian Lindqvist',
    phone: '+46 8 123 45 67',
    email: 'c.lindqvist@nordicecom.se',
    company: 'Nordic E-com AB',
    status: 'Closed_Won',
    tags: ['Global Call Rate', 'Ecommerce'],
    notes: [
      { id: 'n-6', text: 'Configured and onboarding complete. Using automated WhatsApp survey loops.', timestamp: '2026-05-15T15:10:00Z', author: 'Sarah Smith' }
    ],
    segment: 'Ecommerce',
    sentiment: 'Positive',
    revenueValue: 15400
  },
  {
    id: 'c-6',
    name: 'Svetlana Petrova',
    phone: '+1 (555) 789-0123',
    email: 's.petrova@moscowlogistics.org',
    company: 'Siberia Cargo & Shipping',
    status: 'Closed_Lost',
    tags: ['Rate Dispute', 'On-Premise Wish'],
    notes: [
      { id: 'n-7', text: 'Requires entirely on-premises Asterisk integration. NexDial cloud-only architecture not a perfect match.', timestamp: '2026-05-10T11:00:00Z', author: 'John Doe' }
    ],
    segment: 'Logistics',
    sentiment: 'Negative',
    revenueValue: 2800
  }
];

export const INITIAL_SCRIPTS: ScriptTemplate[] = [
  {
    id: 'sc-1',
    title: 'NexDial Platform Standard Inbound',
    content: 'Thank you for calling NexDial! My name is {agentName}. Are you calling for sales setup, support inquiry, or checking out our AI Calling modules today? [Pause for input] Awesome, let me get that configured for you right away. What is your registered business domain?',
    tags: ['Inbound', 'Generic', 'Onboarding']
  },
  {
    id: 'sc-2',
    title: 'Warm Lead Outbound Dialer Sheet',
    content: 'Hi {contactName}! This is {agentName} from NexDial. I saw you recently downloaded our CRM Integration whitepaper. I wanted to check if your current call center is utilizing standard manual dialing or automated power dialers? [Objection handling: If manual -> highlight our 5x talk-time boost. If auto -> mention our AI Live Coach that guides calls in real time.]',
    tags: ['Outbound', 'Sales', 'AI Features']
  },
  {
    id: 'sc-3',
    title: 'AI Bot Screening Pitch',
    content: 'Hello, this is Liam, your automated AI NexDial helper. This call is to confirm your request for premium API keys. If you are ready to initiate, please confirm your company name. Next, would you like a webhook test package sent via SMS or Email?',
    tags: ['AI Calling', 'Automation', 'API Setup']
  }
];

export const INITIAL_CAMPAIGNS: Campaign[] = [
  {
    id: 'cam-1',
    name: 'Predective dialing',
    type: 'AI Bot',
    status: 'Active',
    contactsCount: 1530,
    calledCount: 924,
    successRate: 78.4,
    scriptId: 'sc-3',
    scheduleDate: '2026-05-22',
    agentsAssigned: ['agent-ai']
  },
  {
    id: 'cam-2',
    name: 'Promise to Pay (PTP) Follow-Up',
    type: 'Outbound',
    status: 'Active',
    contactsCount: 450,
    calledCount: 142,
    successRate: 64.2,
    scriptId: 'sc-2',
    scheduleDate: '2026-05-23',
    agentsAssigned: ['ag-1', 'ag-3']
  },
  {
    id: 'cam-3',
    name: 'Broken PTP Campaign',
    type: 'Inbound',
    status: 'Active',
    contactsCount: 890,
    calledCount: 885,
    successRate: 91.5,
    scriptId: 'sc-1',
    scheduleDate: '2026-05-22',
    agentsAssigned: ['ag-1', 'ag-2', 'ag-3']
  },
  {
    id: 'cam-4',
    name: 'Settlement Offer Campaign',
    type: 'SMS',
    status: 'Completed',
    contactsCount: 2300,
    calledCount: 2300,
    successRate: 98.2,
    scriptId: 'sc-3',
    scheduleDate: '2026-05-18',
    agentsAssigned: []
  },
  {
    id: 'cam-5',
    name: 'Skip Trace Campaign',
    type: 'Outbound',
    status: 'Active',
    contactsCount: 1200,
    calledCount: 450,
    successRate: 58.6,
    scriptId: 'sc-2',
    scheduleDate: '2026-05-24',
    agentsAssigned: ['ag-2']
  },
  {
    id: 'cam-6',
    name: 'Re-Aging Campaign',
    type: 'Outbound',
    status: 'Paused',
    contactsCount: 800,
    calledCount: 210,
    successRate: 49.8,
    scriptId: 'sc-2',
    scheduleDate: '2026-05-25',
    agentsAssigned: ['ag-3']
  },
  {
    id: 'cam-7',
    name: 'Customer Retention Collections',
    type: 'AI Bot',
    status: 'Active',
    contactsCount: 1400,
    calledCount: 650,
    successRate: 72.1,
    scriptId: 'sc-3',
    scheduleDate: '2026-05-22',
    agentsAssigned: ['agent-ai']
  },
  {
    id: 'cam-8',
    name: 'Deceased Account Verification',
    type: 'Outbound',
    status: 'Active',
    contactsCount: 300,
    calledCount: 112,
    successRate: 85.4,
    scriptId: 'sc-1',
    scheduleDate: '2026-05-23',
    agentsAssigned: ['ag-1']
  },
  {
    id: 'cam-9',
    name: 'Bankruptcy Verification',
    type: 'Inbound',
    status: 'Active',
    contactsCount: 500,
    calledCount: 490,
    successRate: 94.2,
    scriptId: 'sc-1',
    scheduleDate: '2026-05-22',
    agentsAssigned: ['ag-2', 'ag-3']
  }
];

export const INITIAL_CALL_LOGS: CallLog[] = [
  {
    id: 'log-1',
    contactId: 'c-1',
    contactName: 'Robert Stark',
    phoneNumber: '+1 (555) 234-5678',
    startTime: '2026-05-22T09:12:00Z',
    duration: 184,
    type: 'Outbound',
    status: 'Completed',
    agentName: 'Dattatray',
    recordingUrl: '/recordings/rec_stark_q2.mp3',
    sentiment: 'Positive',
    summary: 'The customer is extremely enthusiastic about replacing their current Twilio and Salesforce integration with NexDial. We mapped out an AI Suite license model. Follow-up booked for next Tuesday.',
    score: 95,
    transcription: [
      { speaker: 'agent', text: 'Good morning Robert! This is Dattatray from NexDial.io. How are you today?', timestamp: '09:12:05' },
      { speaker: 'customer', text: 'Hey Dattatray! I am doing excellent. I was actually browsing your live dashboard preview earlier.', timestamp: '09:12:12' },
      { speaker: 'agent', text: 'That is great. We configured our dashboard to stream analytics in absolute real-time. What dialer models are you currently on?', timestamp: '09:12:20' },
      { speaker: 'customer', text: 'We use old, slow manual queues inside our custom CRM. Your power dialer looks extremely sleek. We want standard local numbers in five regions.', timestamp: '09:12:35' },
      { speaker: 'agent', text: 'Absolutely. NexDial handles region-specific SIP trunks automatically. I will send a customized enterprise quote now.', timestamp: '09:13:40' }
    ]
  },
  {
    id: 'log-2',
    contactId: 'c-3',
    contactName: 'Marcus Vance',
    phoneNumber: '+1 (555) 901-2345',
    startTime: '2026-05-21T15:20:00Z',
    duration: 92,
    type: 'Outbound',
    status: 'Completed',
    agentName: 'John Doe',
    recordingUrl: '/recordings/rec_vance_01.mp3',
    sentiment: 'Negative',
    summary: 'Marcus expressed annoyance with cold calling frequency. Mentioned they already have an existing contract with Five9 for another 18 months, rendering a switch unprofitable at this point.',
    score: 68,
    transcription: [
      { speaker: 'agent', text: 'Hello Marcus, Vance of Vance Capital Partners? This is John from NexDial.', timestamp: '15:20:02' },
      { speaker: 'customer', text: 'Yes, who is this again? We are in the middle of a portfolio audit.', timestamp: '15:20:10' },
      { speaker: 'agent', text: 'I understand, quick call to preview how we help BPOs automate dialing workloads.', timestamp: '15:20:20' },
      { speaker: 'customer', text: 'Ah, cold outreach. We are heavily tied into Five9 on a multi-year enterprise lock in. Do not call this line again, thank you.', timestamp: '15:21:15' }
    ]
  },
  {
    id: 'log-3',
    contactId: 'c-4',
    contactName: 'Amara Okafor',
    phoneNumber: '+1 (555) 345-6789',
    startTime: '2026-05-22T08:30:00Z',
    duration: 312,
    type: 'Inbound',
    status: 'Completed',
    agentName: 'Dattatray',
    recordingUrl: '/recordings/rec_okafor_inbound.mp3',
    sentiment: 'Positive',
    summary: 'Inbound inquiry from Amara at Blue Horizon. Shared how their delivery logistics operations require smooth multi-channel handoff (WhatsApp automated notifications, combined with Voice callbacks). Satisfied with live webhook demonstration.',
    score: 97,
    transcription: [
      { speaker: 'agent', text: 'NexDial Support, how can I make your global communication stellar today?', timestamp: '08:30:04' },
      { speaker: 'customer', text: 'Hi, I need an automated routing mechanism. We have cargo drivers on the road. If they miss an alert, does NexDial auto-generate an SMS hook?', timestamp: '08:31:12' },
      { speaker: 'agent', text: 'Absolutely. Our workflow automation systems trigger custom webhooks upon call dispositions. Let me outline our workflow builder for you.', timestamp: '08:32:00' }
    ]
  }
];

const firstNames = ['James', 'Mary', 'John', 'Patricia', 'Robert', 'Jennifer', 'Michael', 'Linda', 'William', 'Elizabeth', 'David', 'Barbara', 'Richard', 'Susan', 'Joseph', 'Jessica', 'Thomas', 'Sarah', 'Charles', 'Karen', 'Christopher', 'Nancy', 'Daniel', 'Lisa', 'Matthew', 'Betty', 'Anthony', 'Margaret', 'Mark', 'Sandra', 'Donald', 'Ashley', 'Steven', 'Kimberley', 'Paul', 'Emily', 'Andrew', 'Donna', 'Joshua', 'Michelle', 'Kenneth', 'Dorothy', 'Kevin', 'Carol', 'Brian', 'Amanda', 'George', 'Melissa', 'Timothy', 'Deborah', 'Ronald', 'Stephanie', 'Edward', 'Rebecca', 'Jason', 'Sharon', 'Jeffrey', 'Laura'];
const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson', 'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin', 'Lee', 'Perez', 'Thompson', 'White', 'Harris', 'Sanchez', 'Clark', 'Ramirez', 'Lewis', 'Robinson', 'Walker', 'Young', 'Allen', 'King', 'Wright', 'Scott', 'Torres', 'Nguyen', 'Hill', 'Flores', 'Green', 'Adams', 'Nelson', 'Baker', 'Hall', 'Rivera', 'Campbell', 'Mitchell', 'Carter', 'Roberts'];

// Generate 48 extra mock agents to hit 52 agents in total (Dattatray, John, Sarah, Liam + 48)
const extraAgents: Agent[] = Array.from({ length: 48 }, (_, i) => {
  const name = `${firstNames[i % firstNames.length]} ${lastNames[i % lastNames.length]}`;
  const id = `ag-${i + 4}`;
  const roles = ['agent', 'agent', 'agent', 'team_manager'];
  const statuses = ['Available', 'On Call', 'Idle', 'Offline'];
  const sentiments: ('Neutral' | 'Happy' | 'Tired' | 'Overwhelmed')[] = ['Happy', 'Neutral', 'Tired', 'Overwhelmed'];
  
  return {
    id,
    name,
    role: roles[i % roles.length] as any,
    status: statuses[i % statuses.length] as any,
    avatar: `https://images.unsplash.com/photo-${1500000000000 + (i * 100000)}?auto=format&fit=crop&w=100&q=80`,
    callsToday: Math.floor(Math.random() * 40) + 5,
    talkTime: Math.floor(Math.random() * 8000) + 1000,
    qualityScore: Math.floor(Math.random() * 20) + 80,
    sentiment: sentiments[i % sentiments.length]
  };
});

export const INITIAL_AGENTS: Agent[] = [
  { id: 'ag-1', name: 'Dattatray Sable', role: 'admin', status: 'Available', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80', callsToday: 48, talkTime: 9400, qualityScore: 94, sentiment: 'Happy' },
  { id: 'ag-2', name: 'John Doe', role: 'agent', status: 'On Call', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80', callsToday: 32, talkTime: 7200, qualityScore: 85, sentiment: 'Tired' },
  { id: 'ag-3', name: 'Sarah Smith', role: 'team_manager', status: 'Idle', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80', callsToday: 18, talkTime: 3600, qualityScore: 92, sentiment: 'Happy' },
  { id: 'agent-ai', name: 'Liam (AI Assistant)', role: 'agent', status: 'Available', avatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=100&q=80', callsToday: 512, talkTime: 42000, qualityScore: 99, sentiment: 'Happy' },
  ...extraAgents
];

export const INITIAL_INTEGRATIONS: Integration[] = [
  { id: 'int-1', name: 'Salesforce', category: 'CRM', logo: '☁️', description: 'Real-time contact sync, automated call logs logging, activity notes mirroring, click-to-dial trigger panels.', connected: true, apiKey: 'pk_live_sf_908523ef6a7c', webhookUrl: 'https://api.nexdial.io/v1/webhooks/salesforce' },
  { id: 'int-2', name: 'HubSpot', category: 'CRM', logo: '🧡', description: 'Instant ticket creation, bi-directional lead routing, call sentiment sync, and embedded calling iframe module.', connected: true, apiKey: 'pk_live_hs_341952cd3f10', webhookUrl: 'https://api.nexdial.io/v1/webhooks/hubspot' },
  { id: 'int-3', name: 'WhatsApp Business', category: 'Communication', logo: '💬', description: 'Trigger WhatsApp template notifications after disposition, full conversation transcripts syncing.', connected: false },
  { id: 'int-4', name: 'Zendesk', category: 'Support', logo: '💚', description: 'Generate structured support tickets upon incoming calls, attach complete voice recordings and summaries.', connected: false },
  { id: 'int-5', name: 'Slack Alerts', category: 'Communication', logo: '🔔', description: 'Publish warning incidents, low SLA triggers, negative sentiment alerts, and team dashboard summaries.', connected: true, webhookUrl: 'https://hooks.slack.com/services/T000/B000/XXXX' },
  { id: 'int-6', name: 'Stripe Billing', category: 'Billing', logo: '💳', description: 'Usage-based caller rates invoicing, subscription plans auto-charges, credit additions and management.', connected: true, apiKey: 'sk_live_stripe_99a8b1c4d' }
];

export const INITIAL_SYSTEM_LOGS: SystemLog[] = [
  { id: 'log-101', timestamp: '22-05-2026 10:15:32', level: 'info', service: 'Telephony GW', message: 'SIP registration of Gateway US-EAST-VIRGINIA completed successfully. Ping: 12ms.' },
  { id: 'log-102', timestamp: '22-05-2026 10:17:44', level: 'info', service: 'AI Transcribe', message: 'Whisper streaming listener established. Live transcription running with 0.08s average latency.' },
  { id: 'log-103', timestamp: '22-05-2026 10:19:01', level: 'warning', service: 'CRM Sync', message: 'Salesforce API rate limit is at 82% capacity. Dynamic pooling activated.' },
  { id: 'log-104', timestamp: '22-05-2026 10:20:12', level: 'info', service: 'IVR Core', message: 'Multi-level voice routing builder config updated for tenant 40270.' },
  { id: 'log-105', timestamp: '22-05-2026 10:22:45', level: 'error', service: 'Billing Webhook', message: 'Failed to verify webhook payload from signature stripe_81b9_f8a2. Retrying in 300s.' }
];

export const DEFAULT_IVR_NODES: IVRNode[] = [
  { id: 'n-start', title: 'Start Call Node', type: 'Start', x: 50, y: 150, config: { greeting: 'Welcome to NexDial! For general support press 1, for sales inquiry press 2, for developer API support press 3.' } },
  { id: 'n-play', title: 'Play Marketing Prompt', type: 'PlayAudio', x: 280, y: 50, config: { audioFile: 'promotions_q2_launch.wav', fallbackText: 'Check out our new AI Auto-summarize upgrade!' } },
  { id: 'n-gather', title: 'Main Dial Menu Reader', type: 'GatherInput', x: 280, y: 250, config: { allowedKeys: '1,2,3', timeout: 5 } },
  { id: 'n-queue-sales', title: 'Rings Sales Queue', type: 'RouteCall', x: 550, y: 80, config: { group: 'VIP Sales Agents', ringTime: '20s' } },
  { id: 'n-queue-support', title: 'Inbound Tier 1 Routing', type: 'RouteCall', x: 550, y: 250, config: { group: 'Customer Success Team', ringTime: '15s' } },
  { id: 'n-ai-concierge', title: 'Launch AI Agent bot', type: 'AI_Agent', x: 550, y: 400, config: { model: 'gemini-3.5-flash', persona: 'Polite screening receptionist' } },
  { id: 'n-voicemail', title: 'Backup Voicemail Recorder', type: 'Voicemail', x: 800, y: 220, config: { inbox: 'support-general@nexdial.io', prefix: 'Thank you for calling. Leave a beep.' } }
];

export const DEFAULT_IVR_CONNECTIONS: IVRConnection[] = [
  { id: 'conn-1', fromId: 'n-start', toId: 'n-gather', triggerKey: 'default' },
  { id: 'conn-2', fromId: 'n-gather', toId: 'n-queue-sales', triggerKey: '2' },
  { id: 'conn-3', fromId: 'n-gather', toId: 'n-queue-support', triggerKey: '1' },
  { id: 'conn-4', fromId: 'n-gather', toId: 'n-ai-concierge', triggerKey: '3' },
  { id: 'conn-5', fromId: 'n-queue-sales', toId: 'n-voicemail', triggerKey: 'fail' },
  { id: 'conn-6', fromId: 'n-queue-support', toId: 'n-voicemail', triggerKey: 'fail' }
];

export const INITIAL_HEALTH_METRICS: SystemHealthMetrics = {
  cpuUsage: 24.8,
  memoryUsage: 45.2,
  activeVoipLines: 128,
  pingLatencyMs: 12,
  serverRegion: 'us-east-virginia.nexdial.io'
};
