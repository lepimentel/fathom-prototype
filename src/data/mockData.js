const onboardingProcessNodes = [
  { id: 1, label: 'Offer Accepted', duration: 'Day 0', status: 'smooth', description: 'Candidate signs offer via DocuSign. Auto-creates record in Workday.' },
  { id: 2, label: 'HR Input & Document Collection', duration: '1.2 days', status: 'smooth', description: 'Compliance docs, I-9 verification, payroll setup. Mostly automated.' },
  {
    id: 3,
    label: 'IT Hardware Provisioning',
    duration: '8.4 days',
    status: 'bottleneck',
    description: 'Laptop ordering, imaging, shipping, network configuration.',
    alert:
      'Users spend 45 mins troubleshooting proxy settings via undocumented workarounds. 73% of new hires receive a duplicate JAMF policy assignment causing a config conflict between IT and SecOps provisioning.',
  },
  { id: 4, label: 'Access Provisioning (SSO)', duration: '3.1 days', status: 'smooth', description: 'Okta groups, role assignments, application provisioning.' },
  { id: 5, label: 'Manager Sync & Team Intro', duration: 'Day 14', status: 'smooth', description: '30/60/90 plan delivered, team rituals onboarded.' },
  { id: 6, label: 'First Productive Day', duration: 'Day 23', status: 'smooth', description: 'First merged PR, first deal touched, first ticket closed.' },
];

const onboardingInsights = [
  { id: 1, initials: 'JM', role: 'IT Operations', tag: 'workaround', color: 'bg-purple-500/20 text-purple-200 border border-purple-500/30',
    quote: "I run a manual script every Monday because the JAMF policy doesn't actually push proxy config — we figured this out three years ago and never wrote it down." },
  { id: 2, initials: 'AK', role: 'New Hire · Engineering', tag: 'friction', color: 'bg-orange-500/20 text-orange-200 border border-orange-500/30',
    quote: "Day one I couldn't reach any internal services for 4 hours. Slack worked but I had no idea who to ping. Eventually a guy in Helsinki DM'd me a Notion doc." },
  { id: 3, initials: 'TS', role: 'Engineering Manager', tag: 'friction', color: 'bg-blue-500/20 text-blue-200 border border-blue-500/30',
    quote: 'The handoff between IT and SecOps is broken. Both teams provision the laptop and we get conflicting profiles. Nobody owns it.' },
];

const procurementProcessNodes = [
  { id: 1, label: 'Requisition Created', duration: 'Day 0', status: 'smooth', description: 'PO drafted in Coupa with line items and cost-center allocation.' },
  { id: 2, label: 'Department Lead Approval', duration: '1.4 days', status: 'smooth', description: 'Auto-routed to manager, single click in mobile app.' },
  {
    id: 3,
    label: 'Vendor Risk & Compliance Review',
    duration: '11.2 days',
    status: 'bottleneck',
    description: 'Legal + InfoSec review of new vendors, contract redlines, DPA negotiation.',
    alert:
      'Average 11.2 days waiting on a single InfoSec reviewer. 4 of 7 vendors had to re-submit because the questionnaire was sent in PDF and lost in email threads. No SLA, no queue visibility.',
  },
  { id: 4, label: 'Finance Counter-Sign', duration: '0.8 days', status: 'smooth', description: 'CFO delegate approves above $25K threshold.' },
  { id: 5, label: 'PO Issued to Vendor', duration: 'Day 14', status: 'smooth', description: 'Coupa pushes PO to vendor portal automatically.' },
  { id: 6, label: 'Goods/Services Received', duration: 'Day 28', status: 'smooth', description: 'Receipt logged, invoice matched.' },
];

const procurementInsights = [
  { id: 1, initials: 'RL', role: 'Procurement Analyst', tag: 'workaround', color: 'bg-emerald-500/20 text-emerald-200 border border-emerald-500/30',
    quote: "The system doesn't let me bundle these orders, so I manually duplicate the entry under five different cost-centers. I do this maybe 60 times a week." },
  { id: 2, initials: 'BP', role: 'InfoSec Lead', tag: 'friction', color: 'bg-pink-500/20 text-pink-200 border border-pink-500/30',
    quote: "I'm the only reviewer for vendor security questionnaires. There's no queue, no priority. PDFs land in my inbox and I miss them for days." },
  { id: 3, initials: 'DK', role: 'Legal Counsel', tag: 'friction', color: 'bg-amber-500/20 text-amber-200 border border-amber-500/30',
    quote: "Same DPA gets redlined six times because nobody saved the template. Each new vendor starts from scratch." },
];

const renewalsProcessNodes = [
  { id: 1, label: 'Renewal Detected (T-90)', duration: 'Day 0', status: 'smooth', description: 'Gainsight flags upcoming renewal in CSM dashboard.' },
  { id: 2, label: 'Health Score Review', duration: '2.1 days', status: 'smooth', description: 'CSM checks usage, NPS, support ticket volume.' },
  { id: 3, label: 'Stakeholder Alignment Call', duration: '6.4 days', status: 'smooth', description: 'CSM + AE meet champion to confirm continued value.' },
  {
    id: 4,
    label: 'Procurement Hand-Off',
    duration: '18.7 days',
    status: 'bottleneck',
    description: 'Customer procurement team takes over from champion.',
    alert:
      "Champion alignment is strong by week 5, but customer procurement isn't looped in until week 6. They re-open commercial terms, restart legal review, and demand new security docs the champion already approved. Average 18.7 day stall.",
  },
  { id: 5, label: 'Contract Counter-Signed', duration: '4.2 days', status: 'smooth', description: 'eSign loop, finance booking.' },
  { id: 6, label: 'Renewed', duration: 'Day 32', status: 'smooth', description: 'CRM flipped to active, expansion conversation kicked off.' },
];

const renewalsInsights = [
  { id: 1, initials: 'NK', role: 'Sr. Customer Success Mgr', tag: 'friction', color: 'bg-cyan-500/20 text-cyan-200 border border-cyan-500/30',
    quote: "I have my champion 100% bought in by week 4. Then their procurement appears at week 6 like we never met and asks for the SOC 2 again." },
  { id: 2, initials: 'EV', role: 'Account Executive', tag: 'workaround', color: 'bg-violet-500/20 text-violet-200 border border-violet-500/30',
    quote: "I now CC procurement on the kickoff call even when the champion says not to. It's the only way to avoid the week-6 reset." },
  { id: 3, initials: 'GM', role: 'RevOps', tag: 'friction', color: 'bg-rose-500/20 text-rose-200 border border-rose-500/30',
    quote: 'Forecast says renewal closes day 30. Reality is 50+ on every deal over $250K. Our CFO has stopped trusting the dashboard.' },
];

const supportInsights = [
  { id: 1, initials: 'CH', role: 'Tier-2 Support Engineer', tag: 'friction', color: 'bg-rose-500/20 text-rose-200 border border-rose-500/30',
    quote: "I'm answering the same five questions every day. Nobody updates the runbook because nobody owns the runbook." },
  { id: 2, initials: 'YO', role: 'Support Manager', tag: 'workaround', color: 'bg-amber-500/20 text-amber-200 border border-amber-500/30',
    quote: "We rotate weekend pager because we couldn't get headcount approved. Three of my best people quit in the same quarter." },
];

const designHandoffInsights = [
  { id: 1, initials: 'IC', role: 'Senior Designer', tag: 'workaround', color: 'bg-violet-500/20 text-violet-200 border border-violet-500/30',
    quote: 'I screenshot Figma and paste into Linear because engineering ignores comments left inside Figma files. Same artifact, three places.' },
  { id: 2, initials: 'OS', role: 'Staff Engineer', tag: 'friction', color: 'bg-blue-500/20 text-blue-200 border border-blue-500/30',
    quote: "By the time I get the spec, design has already iterated twice. I build v1, push to staging, design says 'oh that's old'." },
];

export const inquiries = [
  {
    id: 1,
    question: 'Why does onboarding take 23 days?',
    status: 'investigating',
    progress: 70,
    interviewsDone: 28,
    interviewsTarget: 40,
    tags: ['HR', 'IT', 'Onboarding'],
    severity: 'high',
    owner: 'Maria Chen, COO',
    timeRange: 'Started 12 days ago',
    workflowTitle: 'Reconstructed onboarding workflow',
    metadataStats: { interviews: 28, screenShares: 14, audioHours: '42h', mapsGenerated: 3 },
    recommendation: {
      title: 'Root cause: redundant endpoint assignment',
      body:
        'IT and SecOps both provision proxy configurations independently. 73% of new hires hit a config conflict that resolves only after a manual ticket loop. Removing the duplicate JAMF assignment reclaims an estimated 5.2 days per onboarding.',
      stats: [
        { label: 'Confidence', value: '94%' },
        { label: 'Affected hires / yr', value: '~210' },
        { label: 'Estimated saving', value: '$684K' },
      ],
    },
    processNodes: onboardingProcessNodes,
    insights: onboardingInsights,
  },
  {
    id: 2,
    question: 'Where is the procurement cycle leaking 14 days?',
    status: 'investigating',
    progress: 45,
    interviewsDone: 18,
    interviewsTarget: 40,
    tags: ['Finance', 'Vendor Mgmt'],
    severity: 'high',
    owner: 'David Park, CFO',
    timeRange: 'Started 6 days ago',
    workflowTitle: 'Reconstructed procurement workflow',
    metadataStats: { interviews: 18, screenShares: 9, audioHours: '27h', mapsGenerated: 2 },
    recommendation: {
      title: 'Root cause: single-reviewer InfoSec queue',
      body:
        '11.2 days of the 14-day overrun is one InfoSec engineer manually triaging vendor questionnaires from email. Standing up a shared queue with templated DPAs reclaims an estimated 9.4 days per cycle.',
      stats: [
        { label: 'Confidence', value: '88%' },
        { label: 'POs affected / yr', value: '~340' },
        { label: 'Estimated saving', value: '$2.4M' },
      ],
    },
    processNodes: procurementProcessNodes,
    insights: procurementInsights,
  },
  {
    id: 3,
    question: 'Why do enterprise renewals stall after week 6?',
    status: 'investigating',
    progress: 32,
    interviewsDone: 12,
    interviewsTarget: 36,
    tags: ['Sales', 'CS'],
    severity: 'medium',
    owner: 'Priya Iyer, RevOps',
    timeRange: 'Started 4 days ago',
    workflowTitle: 'Reconstructed enterprise renewal workflow',
    metadataStats: { interviews: 12, screenShares: 6, audioHours: '18h', mapsGenerated: 1 },
    recommendation: {
      title: 'Root cause: late procurement engagement',
      body:
        'Champion alignment is strong by week 4, but customer procurement enters at week 6 and re-opens commercial terms the champion already settled. Looping procurement into the kickoff call collapses the 18.7-day stall to ~3 days.',
      stats: [
        { label: 'Confidence', value: '76%' },
        { label: 'Renewals affected / yr', value: '~120' },
        { label: 'ARR at risk', value: '$18M' },
      ],
    },
    processNodes: renewalsProcessNodes,
    insights: renewalsInsights,
  },
  {
    id: 4,
    question: "What's behind the support team's 38% retention churn?",
    status: 'completed',
    progress: 100,
    interviewsDone: 32,
    interviewsTarget: 32,
    tags: ['Support', 'People'],
    severity: 'high',
    owner: 'Alex Rivera, CHRO',
    timeRange: 'Completed 3 days ago',
    workflowTitle: 'Support team attrition — final report',
    metadataStats: { interviews: 32, screenShares: 0, audioHours: '54h', mapsGenerated: 4 },
    summary:
      'Tier-2 burnout driven by undocumented runbooks (62% of tickets repeat) and weekend pager rotation. Two recommendations shipped to CHRO on 2026-04-21.',
    recommendation: {
      title: 'Findings delivered — runbook ownership + weekend rotation pilot',
      body:
        '90-day pilot launched: dedicated runbook owner per product area, opt-in weekend rotation with 1.5x comp. Already +6 NPS in early cohort.',
      stats: [
        { label: 'Recommendations shipped', value: '4' },
        { label: 'Initial NPS lift', value: '+6' },
        { label: 'Pilot horizon', value: '90 days' },
      ],
    },
    processNodes: [],
    insights: supportInsights,
  },
  {
    id: 5,
    question: 'How do engineering and design handoffs really happen?',
    status: 'completed',
    progress: 100,
    interviewsDone: 22,
    interviewsTarget: 22,
    tags: ['Eng', 'Design'],
    severity: 'medium',
    owner: 'Sam Liu, VP Eng',
    timeRange: 'Completed 9 days ago',
    workflowTitle: 'Eng/Design handoff — final report',
    metadataStats: { interviews: 22, screenShares: 11, audioHours: '31h', mapsGenerated: 2 },
    summary:
      'Three artifact systems (Figma, Linear, Slack) duplicated work for both teams. Adopted Figma Dev Mode with Linear sync, retired Slack threads as spec source.',
    recommendation: {
      title: 'Findings delivered — single source of truth for specs',
      body:
        'Figma Dev Mode is now the canonical spec, Linear auto-mirrors comments, Slack reserved for async questions. Ship velocity +18% in two sprints.',
      stats: [
        { label: 'Tools rationalized', value: '3 → 2' },
        { label: 'Velocity lift', value: '+18%' },
        { label: 'Sprints to land', value: '2' },
      ],
    },
    processNodes: [],
    insights: designHandoffInsights,
  },
];
