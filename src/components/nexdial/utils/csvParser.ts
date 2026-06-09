import { Contact } from '../types';

/**
 * Clean phone number to make sure it includes standard layout
 */
function cleanPhone(raw: string): string {
  const trimmed = raw.trim();
  if (!trimmed) return '';
  // Check if it already has country code, otherwise prepend standard dynamic helper
  if (trimmed.startsWith('+') || trimmed.length > 10) {
    return trimmed;
  }
  return trimmed;
}

/**
 * Intelligent client-side CSV parser
 */
export function parseCSVLeads(csvText: string, currentAgentName: string = 'Agent'): Contact[] {
  if (!csvText || !csvText.trim()) return [];

  // Split by newline while handling possible \r
  const rows = csvText.split(/\r?\n/).map(line => line.trim()).filter(line => line.length > 0);
  if (rows.length === 0) return [];

  // Simple CSV line splitter handling quotes
  const parseCSVLine = (line: string): string[] => {
    const result: string[] = [];
    let current = '';
    let inQuotes = false;
    
    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      if (char === '"' || char === "'") {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        result.push(current.trim().replace(/^['"]|['"]$/g, ''));
        current = '';
      } else {
        current += char;
      }
    }
    result.push(current.trim().replace(/^['"]|['"]$/g, ''));
    return result;
  };

  const headers = parseCSVLine(rows[0]).map(h => h.toLowerCase().trim());
  
  // Find indices based on common header names
  let nameIdx = headers.findIndex(h => h.includes('name') || h.includes('contact') || h.includes('rep') || h.includes('full'));
  let phoneIdx = headers.findIndex(h => h.includes('phone') || h.includes('tel') || h.includes('mobile') || h.includes('num') || h.includes('call'));
  let emailIdx = headers.findIndex(h => h.includes('email') || h.includes('mail'));
  let companyIdx = headers.findIndex(h => h.includes('company') || h.includes('business') || h.includes('firm') || h.includes('corp') || h.includes('org'));
  let segmentIdx = headers.findIndex(h => h.includes('segment') || h.includes('sector') || h.includes('industry') || h.includes('category') || h.includes('type'));
  let statusIdx = headers.findIndex(h => h.includes('status') || h.includes('stage'));
  let revenueIdx = headers.findIndex(h => h.includes('revenue') || h.includes('value') || h.includes('deal') || h.includes('amount') || h.includes('worth'));

  // Fallbacks if headers are absent or completely missed
  if (nameIdx === -1 && rows.length > 1) {
    // If no columns are obvious, assign default ordered layout
    nameIdx = 0;
    phoneIdx = 1;
    emailIdx = 2;
    companyIdx = 3;
    segmentIdx = 4;
  }

  const parsedContacts: Contact[] = [];

  // Start from line 1 (skipping headers if found, or map them)
  const startIndex = (headers.some(h => ['name', 'phone', 'email', 'company', 'segment', 'status', 'revenue'].some(kw => h.includes(kw)))) ? 1 : 0;

  for (let i = startIndex; i < rows.length; i++) {
    const columns = parseCSVLine(rows[i]);
    if (columns.length === 0 || !columns.join('').trim()) continue;

    // Extract item values safely with position checks
    const nameValue = columns[nameIdx] || '';
    const phoneValue = columns[phoneIdx] || '';
    
    // Skip empty lines or contacts without a name AND phone
    if (!nameValue && !phoneValue) continue;

    const emailValue = columns[emailIdx] || '';
    const companyValue = columns[companyIdx] || 'Imported Enterprise';
    
    // Segment validation: restrict to valid layout categories
    let segmentValue = columns[segmentIdx] || 'SaaS';
    const validSegments = ['Healthcare', 'RealEstate', 'Banking', 'SaaS', 'Logistics'];
    const matchedSegment = validSegments.find(sec => sec.toLowerCase() === segmentValue.toLowerCase().replace(/[^a-z]/gi, ''));
    segmentValue = matchedSegment || 'SaaS';

    // Status mapping
    let statusValue = columns[statusIdx] || 'Lead';
    if (statusValue.toLowerCase().includes('won') || statusValue.toLowerCase().includes('closed won')) statusValue = 'Closed_Won';
    else if (statusValue.toLowerCase().includes('lost') || statusValue.toLowerCase().includes('closed lost')) statusValue = 'Closed_Lost';
    else if (statusValue.toLowerCase().includes('nego')) statusValue = 'Negotiation';
    else if (statusValue.toLowerCase().includes('contact')) statusValue = 'Contacted';
    else if (statusValue.toLowerCase().includes('qual')) statusValue = 'Qualified';
    else statusValue = 'Lead';

    // Deal metrics value
    const revRaw = columns[revenueIdx] || '';
    const revenueValueNumeric = parseFloat(revRaw.replace(/[^0-9.]/g, '')) || 5000;

    parsedContacts.push({
      id: `con-csv-import-${i}-${Date.now()}`,
      name: nameValue || `Imported Contact #${i}`,
      phone: cleanPhone(phoneValue) || `+1 (555) 000-00${i}`,
      email: emailValue || `contact-${i}@imported.io`,
      company: companyValue,
      status: statusValue as any,
      tags: ['CSV_Import', segmentValue],
      notes: [
        {
          id: `note-import-${Date.now()}-${i}`,
          text: `Lead imported successfully via CSV list syncing pipeline on ${new Date().toLocaleDateString()}.`,
          timestamp: new Date().toISOString(),
          author: currentAgentName
        }
      ],
      segment: segmentValue as any,
      sentiment: 'Neutral',
      revenueValue: revenueValueNumeric
    });
  }

  // If parsing failed or only headers are present, return an empty array (the caller can check and fallback)
  return parsedContacts;
}

/**
 * Returns a high-quality backup set of contacts if the file upload is empty or dummy
 */
export function generateSimulatorContacts(currentAgentName: string = 'Agent'): Contact[] {
  return [
    {
      id: `con-sim-1-${Date.now()}`,
      name: 'Aditya Deshmukh (Healthcare)',
      phone: '+91 98821 02293',
      email: 'aditya.deshmukh@mumbaiclinic.in',
      company: 'Deshmukh Healthcare Clinic',
      status: 'Lead',
      tags: ['CSV_Import', 'Healthcare'],
      notes: [{ id: `n-1-${Date.now()}`, text: 'Sourced from local Q2 hospital register.', timestamp: new Date().toISOString(), author: currentAgentName }],
      segment: 'Healthcare',
      sentiment: 'Neutral',
      revenueValue: 6200
    },
    {
      id: `con-sim-2-${Date.now()}`,
      name: 'Priyanka Reddy (SaaS CRM)',
      phone: '+91 91023 22204',
      email: 'p.reddy@techreddy.co',
      company: 'Reddy CRM Solution Hub',
      status: 'Lead',
      tags: ['CSV_Import', 'SaaS', 'HighValue'],
      notes: [{ id: `n-2-${Date.now()}`, text: 'Interested in configuring dialers over SIP trunks.', timestamp: new Date().toISOString(), author: currentAgentName }],
      segment: 'SaaS',
      sentiment: 'Neutral',
      revenueValue: 14500
    },
    {
      id: `con-sim-3-${Date.now()}`,
      name: 'Rajesh Malhotra',
      phone: '+91 88931 10091',
      email: 'malhotra@delhiproperty.com',
      company: 'Malhotra Realty Group',
      status: 'Qualified',
      tags: ['CSV_Import', 'RealEstate'],
      notes: [{ id: `n-3-${Date.now()}`, text: 'Requested live dialer demonstration with 10 agents.', timestamp: new Date().toISOString(), author: currentAgentName }],
      segment: 'RealEstate',
      sentiment: 'Neutral',
      revenueValue: 9800
    },
    {
      id: `con-sim-4-${Date.now()}`,
      name: 'Rohan Banerjee',
      phone: '+1 (555) 304-4567',
      email: 'banerjee@cargoindia.org',
      company: 'Bengal Cargo Carriers',
      status: 'Lead',
      tags: ['CSV_Import', 'Logistics'],
      notes: [{ id: `n-4-${Date.now()}`, text: 'Wants to test integrated WhatsApp messaging automation.', timestamp: new Date().toISOString(), author: currentAgentName }],
      segment: 'Logistics',
      sentiment: 'Neutral',
      revenueValue: 7500
    },
    {
      id: `con-sim-5-${Date.now()}`,
      name: 'Sofia Alvarez',
      phone: '+1 305 772 8829',
      email: 'sofia@alvarez-cart.us',
      company: 'Alvarez Cart LLC',
      status: 'Lead',
      tags: ['CSV_Import'],
      notes: [{ id: `n-5-${Date.now()}`, text: 'High value US Shopify merchant eager to integrate inbound services.', timestamp: new Date().toISOString(), author: currentAgentName }],
      segment: 'SaaS',
      sentiment: 'Neutral',
      revenueValue: 18000
    }
  ];
}

/**
 * Triggers a client-side download of a sample CSV template with clean header row and dummy customer data.
 */
export function downloadSampleCSV(): void {
  const headers = ['Name', 'Phone', 'Email', 'Company', 'Sector', 'Status', 'Estimated Value'];
  
  const sampleRows = [
    ['Aditya Deshmukh', '+91 98821 02293', 'aditya.deshmukh@mumbaiclinic.in', 'Deshmukh Healthcare Clinic', 'Healthcare', 'Lead', '6200'],
    ['Priyanka Reddy', '+91 91023 22204', 'p.reddy@techreddy.co', 'Reddy CRM Solution Hub', 'SaaS', 'Lead', '14500'],
    ['Rajesh Malhotra', '+91 88931 10091', 'malhotra@delhiproperty.com', 'Malhotra Realty Group', 'RealEstate', 'Qualified', '9800'],
    ['Rohan Banerjee', '+1 (555) 304-4567', 'banerjee@cargoindia.org', 'Bengal Cargo Carriers', 'Logistics', 'Lead', '7500'],
    ['Sofia Alvarez', '+1 305 772 8829', 'sofia@alvarez-cart.us', 'Alvarez Cart LLC', 'SaaS', 'Lead', '18000']
  ];

  // Map to CSV format correctly escaping quotes
  const csvContent = [
    headers.join(','),
    ...sampleRows.map(row => 
      row.map(cell => {
        const escaped = String(cell).replace(/"/g, '""');
        return `"${escaped}"`;
      }).join(',')
    )
  ].join('\n');

  // Trigger browser download via blob URL
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', 'crm_leads_sample.csv');
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

