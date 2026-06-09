/**
 * NexDial TypeScript Type Definitions
 */

export type UserRole = 'super_admin' | 'tenant_admin' | 'team_leader' | 'agent' | 'anonymous';

export type BillingTier = 'Starter' | 'Growth' | 'Enterprise' | 'AISuite';

export interface NoteItem {
  id: string;
  text: string;
  timestamp: string;
  author: string;
}

export interface Contact {
  id: string;
  name: string;
  phone: string;
  email: string;
  company: string;
  status: 'Lead' | 'Contacted' | 'Qualified' | 'Negotiation' | 'Closed_Won' | 'Closed_Lost';
  tags: string[];
  notes: NoteItem[];
  segment: 'Healthcare' | 'RealEstate' | 'Banking' | 'Logistics' | 'SaaS' | 'Ecommerce' | 'General';
  sentiment: 'Positive' | 'Neutral' | 'Negative' | 'No Data';
  revenueValue: number;
}

export interface ScriptTemplate {
  id: string;
  title: string;
  content: string;
  tags: string[];
}

export interface Campaign {
  id: string;
  name: string;
  type: 'Outbound' | 'Inbound' | 'SMS' | 'WhatsApp' | 'AI Bot';
  status: 'Draft' | 'Active' | 'Paused' | 'Completed';
  contactsCount: number;
  calledCount: number;
  successRate: number; // percentage
  scriptId: string;
  scheduleDate: string;
  agentsAssigned: string[]; // agent IDs
}

export interface DialogueTurn {
  speaker: 'agent' | 'customer' | 'system';
  text: string;
  timestamp: string;
}

export interface CallLog {
  id: string;
  contactId?: string;
  contactName: string;
  phoneNumber: string;
  startTime: string;
  duration: number; // in seconds
  type: 'Inbound' | 'Outbound';
  status: 'Completed' | 'Missed' | 'Transferred' | 'Voicemail' | 'Barging' | 'Whispering';
  agentName: string;
  recordingUrl?: string;
  sentiment: 'Positive' | 'Neutral' | 'Negative';
  summary: string;
  transcription: DialogueTurn[];
  score: number; // QA score out of 100
}

export interface Agent {
  id: string;
  name: string;
  role: 'agent' | 'team_manager' | 'admin';
  status: 'Available' | 'On Call' | 'Idle' | 'Offline';
  avatar: string;
  callsToday: number;
  talkTime: number; // in seconds
  qualityScore: number; // percentage (dynamic QA tracker)
  sentiment: 'Happy' | 'Neutral' | 'Tired' | 'Overwhelmed';
  currentPhoneSessionId?: string;
}

export interface IVRNode {
  id: string;
  title: string;
  type: 'Start' | 'PlayAudio' | 'GatherInput' | 'RouteCall' | 'Voicemail' | 'AI_Agent';
  x: number;
  y: number;
  config: any;
}

export interface IVRConnection {
  id: string;
  fromId: string;
  toId: string;
  triggerKey: string; // e.g., "1", "2", "default", "success", "fail"
}

export interface Integration {
  id: string;
  name: string;
  category: 'CRM' | 'Support' | 'Communication' | 'Billing';
  logo: string;
  description: string;
  connected: boolean;
  apiKey?: string;
  webhookUrl?: string;
}

export interface SystemLog {
  id: string;
  timestamp: string;
  level: 'info' | 'warning' | 'error';
  service: string;
  message: string;
}

export interface SystemHealthMetrics {
  cpuUsage: number;
  memoryUsage: number;
  activeVoipLines: number;
  pingLatencyMs: number;
  serverRegion: string;
}
