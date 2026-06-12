import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type LeadStatus = 'New Lead' | 'Contacted' | 'In Conversation' | 'Interested' | 'Converted' | 'Lost';
export type LeadSource = 'Manual' | 'Form' | 'Missed Call' | 'WhatsApp' | 'Website';
export type CallType = 'incoming' | 'outgoing' | 'missed';
export type CallOutcome = 'No answer' | 'Interested' | 'Not interested' | 'Callback later' | 'Left voicemail';

export interface Lead {
  id: string;
  name: string;
  phone: string;
  email: string;
  source: LeadSource;
  status: LeadStatus;
  tags: string[];
  created_at: string;
  updated_at: string;
  follow_up_date: string | null;
  assigned_to: string | null;
  notes: string[];
}

export interface Call {
  id: string;
  lead_id: string;
  type: CallType;
  outcome: CallOutcome | null;
  notes: string;
  timestamp: string;
}

export interface ActivityLog {
  id: string;
  lead_id: string;
  action_type: 'Status Change' | 'Note Added' | 'Call Logged' | 'Follow-up Set' | 'Lead Created';
  description: string;
  timestamp: string;
}

interface CrmState {
  leads: Lead[];
  calls: Call[];
  activities: ActivityLog[];
  
  // Actions
  addLead: (lead: Omit<Lead, 'id' | 'created_at' | 'updated_at'>) => void;
  updateLead: (id: string, updates: Partial<Lead>) => void;
  deleteLead: (id: string) => void;
  
  addCall: (call: Omit<Call, 'id' | 'timestamp'>) => void;
  addActivity: (activity: Omit<ActivityLog, 'id' | 'timestamp'>) => void;
  
  // Utility
  resetStore: () => void;
  populateMockData: () => void;
}

const generateId = () => Math.random().toString(36).substring(2, 9);

export const useCrmStore = create<CrmState>()(
  persist(
    (set, get) => ({
      leads: [],
      calls: [],
      activities: [],

      addLead: (leadData) => {
        const id = generateId();
        const now = new Date().toISOString();
        const newLead: Lead = {
          ...leadData,
          id,
          created_at: now,
          updated_at: now,
        };

        const newActivity: ActivityLog = {
          id: generateId(),
          lead_id: id,
          action_type: 'Lead Created',
          description: `Lead created via ${leadData.source}`,
          timestamp: now,
        };

        set((state) => ({
          leads: [newLead, ...state.leads],
          activities: [newActivity, ...state.activities],
        }));
      },

      updateLead: (id, updates) => {
        const now = new Date().toISOString();
        const state = get();
        const oldLead = state.leads.find((l) => l.id === id);

        if (!oldLead) return;

        set((state) => ({
          leads: state.leads.map((lead) =>
            lead.id === id ? { ...lead, ...updates, updated_at: now } : lead
          ),
        }));

        // Log status change activity if status changed
        if (updates.status && updates.status !== oldLead.status) {
          get().addActivity({
            lead_id: id,
            action_type: 'Status Change',
            description: `Status changed from ${oldLead.status} to ${updates.status}`,
          });
        }
      },

      deleteLead: (id) => {
        set((state) => ({
          leads: state.leads.filter((lead) => lead.id !== id),
          calls: state.calls.filter((call) => call.lead_id !== id),
          activities: state.activities.filter((act) => act.lead_id !== id),
        }));
      },

      addCall: (callData) => {
        const id = generateId();
        const now = new Date().toISOString();
        const newCall: Call = {
          ...callData,
          id,
          timestamp: now,
        };

        get().addActivity({
          lead_id: callData.lead_id,
          action_type: 'Call Logged',
          description: `Logged ${callData.type} call. Outcome: ${callData.outcome || 'N/A'}.`,
        });

        set((state) => ({
          calls: [newCall, ...state.calls],
        }));
      },

      addActivity: (activityData) => {
        const id = generateId();
        const now = new Date().toISOString();
        const newActivity: ActivityLog = {
          ...activityData,
          id,
          timestamp: now,
        };

        set((state) => ({
          activities: [newActivity, ...state.activities],
        }));
      },

      resetStore: () => {
        set({ leads: [], calls: [], activities: [] });
      },

      populateMockData: () => {
        const now = new Date();
        const yesterday = new Date(now);
        yesterday.setDate(yesterday.getDate() - 1);
        
        const tomorrow = new Date(now);
        tomorrow.setDate(tomorrow.getDate() + 1);

        const mockLeads: Lead[] = [
          {
            id: 'l1',
            name: 'John Doe',
            phone: '+91 9876543210',
            email: 'john@example.com',
            source: 'Website',
            status: 'New Lead',
            tags: ['Hot'],
            created_at: now.toISOString(),
            updated_at: now.toISOString(),
            follow_up_date: null,
            assigned_to: 'admin',
            notes: ['Looking for pricing details.'],
          },
          {
            id: 'l2',
            name: 'Sarah Smith',
            phone: '+91 8765432109',
            email: 'sarah.s@business.com',
            source: 'Form',
            status: 'In Conversation',
            tags: ['Priority'],
            created_at: yesterday.toISOString(),
            updated_at: now.toISOString(),
            follow_up_date: tomorrow.toISOString(),
            assigned_to: 'admin',
            notes: ['Had a good first call. Needs a demo.'],
          },
          {
            id: 'l3',
            name: 'Mike Johnson',
            phone: '+91 7654321098',
            email: 'mike@startup.io',
            source: 'Missed Call',
            status: 'Contacted',
            tags: ['Warm'],
            created_at: yesterday.toISOString(),
            updated_at: yesterday.toISOString(),
            follow_up_date: now.toISOString(),
            assigned_to: 'admin',
            notes: [],
          }
        ];

        const mockActivities: ActivityLog[] = [
          {
            id: 'a1',
            lead_id: 'l1',
            action_type: 'Lead Created',
            description: 'Lead created via Website',
            timestamp: now.toISOString()
          },
          {
            id: 'a2',
            lead_id: 'l2',
            action_type: 'Lead Created',
            description: 'Lead created via Form',
            timestamp: yesterday.toISOString()
          },
          {
            id: 'a3',
            lead_id: 'l2',
            action_type: 'Status Change',
            description: 'Status changed from New Lead to In Conversation',
            timestamp: now.toISOString()
          }
        ];

        set({ leads: mockLeads, calls: [], activities: mockActivities });
      }
    }),
    {
      name: 'nexdial-crm-storage',
    }
  )
);
