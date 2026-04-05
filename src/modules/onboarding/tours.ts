/**
 * Tour Definitions — Maps training content to real CRM modules.
 * Each tour is a module (e.g., Dashboard, Customers, Reports).
 * Each step within a tour targets a real UI element or explains a concept.
 *
 * targetSelector: CSS selector or data-tour attribute to highlight
 * If null, step shows as a centered modal (no element highlight)
 */

export interface TourStep {
  id: string;
  title: string;
  content: string;
  targetSelector: string | null; // null = centered modal, string = highlight element
  position?: "top" | "bottom" | "left" | "right";
  action?: "navigate"; // if step requires navigating to a page
  navigateTo?: string;
  tips?: string[];
}

export interface TourModule {
  id: string;
  title: string;
  description: string;
  icon: string;
  estimatedMinutes: number;
  route: string; // page to navigate to for this module
  steps: TourStep[];
  requiredRole?: string; // role required to see this module
}

export const TOUR_MODULES: TourModule[] = [
  // ============================================
  // MODULE 1: Welcome & CRM Overview
  // ============================================
  {
    id: "welcome",
    title: "Welcome & CRM Overview",
    description: "Understand the CRM layout, navigation, and how the system is organized.",
    icon: "🏠",
    estimatedMinutes: 3,
    route: "/dashboard",
    steps: [
      {
        id: "welcome-intro",
        title: "Welcome to the Insurance CRM",
        content: "This system is the central hub for managing your insurance agency's operations — customers, policies, payments, tasks, communications, and reporting. Let's walk through each area so you know exactly how to use it.",
        targetSelector: null,
      },
      {
        id: "welcome-header",
        title: "Agency Header Bar",
        content: "The top bar shows your agency name, your logged-in user name, your assigned office, and your role. You can sign out from here. The 'Training & Help' link brings you back to the training center anytime.",
        targetSelector: "[data-tour='app-header']",
        position: "bottom",
      },
      {
        id: "welcome-nav",
        title: "Main Navigation",
        content: "This horizontal bar is your primary navigation. Every major section of the CRM is accessible from here: Home, Office, Forms, Remake, E.O.D., Reports, Dashboard, Comms, Calendar, Admin, Training, and File Locker. Items with ▼ have dropdown sub-menus.",
        targetSelector: "[data-tour='top-nav']",
        position: "bottom",
      },
      {
        id: "welcome-add-customer",
        title: "Quick Add Customer",
        content: "This green button is always visible — it lets you create a new customer from anywhere in the CRM. This is one of the most frequently used actions.",
        targetSelector: "[data-tour='add-customer-btn']",
        position: "bottom",
      },
      {
        id: "welcome-footer",
        title: "Support Footer",
        content: "The bottom bar has links to contact support, chat, and view version info. If you ever need help beyond the training, start here.",
        targetSelector: "[data-tour='footer']",
        position: "top",
      },
    ],
  },

  // ============================================
  // MODULE 2: Dashboard
  // ============================================
  {
    id: "dashboard",
    title: "Dashboard & Command Center",
    description: "Learn to read and use the dashboard — your daily operations overview.",
    icon: "📊",
    estimatedMinutes: 4,
    route: "/dashboard",
    steps: [
      {
        id: "dash-overview",
        title: "Your Daily Command Center",
        content: "The Dashboard is the first thing you see after login. It gives you an instant snapshot of the entire agency: active policies, customers, open tasks, pending quotes, and upcoming renewals. Check this every morning to understand what needs attention.",
        targetSelector: null,
      },
      {
        id: "dash-kpis",
        title: "Key Performance Indicators",
        content: "These cards show your agency's vital metrics in real time. Red numbers mean something needs urgent attention (overdue tasks, at-risk payments). Green means things are healthy. These numbers update automatically as data changes.",
        targetSelector: "[data-tour='kpi-cards']",
        position: "bottom",
      },
      {
        id: "dash-leaderboard",
        title: "Producer Leaderboard",
        content: "This table ranks your producers by performance — policies sold, quotes generated, and assigned tasks. Use this to identify top performers and those who may need support. Click 'View Full Leaderboard' for the detailed breakdown with conversion rates.",
        targetSelector: "[data-tour='leaderboard']",
        position: "right",
      },
      {
        id: "dash-tasks",
        title: "Open Tasks",
        content: "This section shows all pending tasks across the agency. Tasks marked 'high' priority or 'Overdue' in red need immediate attention. Each task is linked to a specific customer — click the task to go directly to that customer's record.",
        targetSelector: "[data-tour='open-tasks']",
        position: "right",
      },
      {
        id: "dash-payments",
        title: "Recent Payments",
        content: "This shows the latest payment transactions processed. Use it to verify payments are coming through and spot any issues. Each row shows the customer, carrier, amount, and date.",
        targetSelector: "[data-tour='recent-payments']",
        position: "left",
      },
      {
        id: "dash-actions",
        title: "Quick Actions",
        content: "These shortcut buttons let you jump to common tasks without navigating through menus: add a customer, search, send an SMS campaign, run reports, view the calendar, or run End of Day.",
        targetSelector: "[data-tour='quick-actions']",
        position: "left",
      },
    ],
  },

  // ============================================
  // MODULE 3: Customer Management
  // ============================================
  {
    id: "customers",
    title: "Customer Management",
    description: "Learn to search, view, create, and manage customer records — the core of the CRM.",
    icon: "👥",
    estimatedMinutes: 6,
    route: "/customers",
    steps: [
      {
        id: "cust-overview",
        title: "Customer Management",
        content: "This is the heart of the CRM. Every person or business your agency serves has a customer record. From here you can search, filter, view details, and manage their policies, payments, notes, and more.",
        targetSelector: null,
      },
      {
        id: "cust-search",
        title: "Customer Search",
        content: "Type a name, phone number, email, customer ID, or policy number to find any customer. The search checks all these fields at once. Press Enter or click Search to filter the results.",
        targetSelector: "[data-tour='customer-search']",
        position: "bottom",
      },
      {
        id: "cust-table",
        title: "Customer List Table",
        content: "The results table shows key info at a glance: name, type, status, contact info, office, agent of record, and policy count. Rows alternate colors for easy reading. Click any customer ID or name to open their full detail page.",
        targetSelector: "[data-tour='customer-table']",
        position: "top",
        tips: [
          "Green 'Active' status means the customer has current policies",
          "The 'Policies' column shows how many active policies they have",
          "Agent of Record is the producer responsible for this customer",
        ],
      },
      {
        id: "cust-detail-intro",
        title: "Customer Detail Page",
        content: "When you click a customer, you'll see their full detail page. This is the most important screen in the CRM. It has two parts: the header with all personal/account info, and 11 tabs below covering every aspect of their relationship with your agency.",
        targetSelector: null,
      },
      {
        id: "cust-tabs",
        title: "Customer Detail Tabs",
        content: "The 11 tabs are: Policies, Finance, Tasks, Notes, Roles, Pay History, Attachments, Quotes/XDates, HH Members, Claims, and Diary. The number in parentheses shows how many records exist in each tab. This gives you instant context without clicking through every tab.",
        targetSelector: null,
        tips: [
          "Policies — all insurance policies for this customer",
          "Pay History — every payment they've made",
          "Notes — agent notes and communication records",
          "Tasks — follow-ups and action items for this customer",
          "Attachments — uploaded documents (IDs, applications, dec pages)",
          "Quotes/XDates — insurance quotes and competitor expiration dates",
          "HH Members — household members (spouse, children, etc.)",
          "Claims — any claims filed on their policies",
        ],
      },
      {
        id: "cust-tools",
        title: "Tools Panel",
        content: "The Tools button on the customer detail page gives quick access to: ACORD/Custom Forms, Add New Policy, Add Note, Thank You Letter, Add Change Request, Mailing Services, and Custom Letters. These are the most common actions you'll take on a customer record.",
        targetSelector: null,
      },
    ],
  },

  // ============================================
  // MODULE 4: Policies & Quotes
  // ============================================
  {
    id: "policies",
    title: "Policies & Quotes",
    description: "Understand how policies are tracked and how quotes flow through the system.",
    icon: "📋",
    estimatedMinutes: 4,
    route: "/customers",
    steps: [
      {
        id: "pol-overview",
        title: "Policy Management",
        content: "Policies are the core revenue records. Each policy tracks: the carrier (insurance company), status, type (new business vs renewal), class (auto, home, etc.), policy number, effective date, expiration date, and premium amount.",
        targetSelector: null,
      },
      {
        id: "pol-statuses",
        title: "Policy Statuses",
        content: "Policy statuses tell you the lifecycle stage: Active (currently in force), Cancelled (terminated early), Expired (term ended without renewal), and Pending (application submitted, not yet bound). Green 'ACTIVE' is what you want to see.",
        targetSelector: null,
        tips: [
          "Watch for policies approaching expiration — these need renewal attention",
          "Cancelled policies should have a reason logged",
          "The 'Change Status' dropdown lets you update a policy's status",
        ],
      },
      {
        id: "pol-quotes",
        title: "Quotes & XDates",
        content: "The Quotes/XDates tab tracks insurance quotes from different carriers. When an agent runs quotes, they log the carrier, premium, and coverage details here. XDates are competitor policy expiration dates — they tell you when a prospect's current insurance expires so you can time your outreach perfectly.",
        targetSelector: null,
      },
    ],
  },

  // ============================================
  // MODULE 5: Communications
  // ============================================
  {
    id: "communications",
    title: "Communications & SMS",
    description: "Learn the messaging tools — SMS campaigns, text inbox, internal chat, and announcements.",
    icon: "💬",
    estimatedMinutes: 4,
    route: "/communications/sms",
    steps: [
      {
        id: "comms-overview",
        title: "Communication Tools",
        content: "The CRM has four communication modules: SMS Campaigns (bulk texting), Text Inbox (2-way messaging with customers), Internal Chat (team communication with @mentions), and Announcements (company-wide notices). Access them from the 'Comms' dropdown in the nav bar.",
        targetSelector: null,
      },
      {
        id: "comms-sms",
        title: "SMS Campaigns",
        content: "Create bulk text message campaigns targeted by customer tags (e.g., 'Renewal Due', 'Payment Overdue'). You can personalize messages with variables like {firstName} and {policyNumber}. Schedule sends for later or send immediately. Monitor delivery and response rates.",
        targetSelector: null,
        tips: [
          "Always preview before sending to check variable substitution",
          "Tag customers properly so campaigns reach the right people",
          "Smart Triggers automate texts for payment reminders and renewals",
        ],
      },
      {
        id: "comms-triggers",
        title: "Smart Triggers",
        content: "Smart Triggers are automated messages that fire based on events: payment due in 7 days, payment due in 2 days, missed payment, welcome new customer, renewal reminder. These run automatically — you just configure them once and they handle follow-up for you.",
        targetSelector: null,
      },
      {
        id: "comms-inbox",
        title: "Text Inbox",
        content: "The inbox shows all 2-way text conversations with customers. Each agent sees their conversations. Unread messages are highlighted. You can respond directly from the inbox. This is how you handle real-time customer communication.",
        targetSelector: null,
      },
      {
        id: "comms-chat",
        title: "Internal Chat",
        content: "Internal chat lets your team communicate without leaving the CRM. Channels are organized by branch (Montfort, Peachtree, etc.) plus a general channel and announcements. Use @mentions to tag specific people. This replaces the need for a separate Slack or Teams app.",
        targetSelector: null,
      },
    ],
  },

  // ============================================
  // MODULE 6: Reports
  // ============================================
  {
    id: "reports",
    title: "Reports & Analytics",
    description: "Navigate the reports hub — production, end of day, leaderboard, and more.",
    icon: "📈",
    estimatedMinutes: 4,
    route: "/reports",
    steps: [
      {
        id: "rep-overview",
        title: "Reports Hub",
        content: "The Reports page is a mega-menu organized by category: Mobile Reports, Owner Reports, Download Reports, Marketing, Employee/Broker, Imports/Exports, Setup, Auditing, Tracking, and more. Each link opens a specific report. Favorites are pinned at the top for quick access.",
        targetSelector: null,
      },
      {
        id: "rep-eod",
        title: "End of Day (E.O.D.)",
        content: "The End of Day report is run daily to summarize activity. You select the territory, district, office, customer type, employee, and date range. This is a critical daily routine — it shows what happened at each branch and helps management track operations.",
        targetSelector: null,
        tips: [
          "Run EOD at the close of every business day",
          "Filter by specific offices to see branch-level activity",
          "Compare date ranges to spot trends",
        ],
      },
      {
        id: "rep-leaderboard",
        title: "Producer Leaderboard",
        content: "The full leaderboard shows every producer ranked by: calls made, quotes generated, policies sold, follow-ups completed, missed tasks, written premium, and conversion rate. The Activity Score combines these into a single number. Use this to manage producer accountability and identify coaching opportunities.",
        targetSelector: null,
      },
    ],
  },

  // ============================================
  // MODULE 7: Calendar & Tasks
  // ============================================
  {
    id: "calendar-tasks",
    title: "Calendar & Task Management",
    description: "Manage appointments, follow-ups, and daily task queues.",
    icon: "📅",
    estimatedMinutes: 3,
    route: "/calendar",
    steps: [
      {
        id: "cal-overview",
        title: "Calendar",
        content: "The calendar shows all appointments per producer. View by day, week, or month. Key metrics shown: appointments today, this week, show rate (percentage that actually show up), and close rate (percentage that result in a sale). Use '+ New Appointment' to schedule directly.",
        targetSelector: null,
      },
      {
        id: "cal-tasks",
        title: "Task System",
        content: "Tasks are action items tied to specific customers. They have a title, type, priority (high/normal), due date, and assigned producer. Tasks are created manually or automatically by the system (e.g., renewal reminders). Complete tasks by clicking them and marking done.",
        targetSelector: null,
        tips: [
          "High priority tasks should be handled first every day",
          "Overdue tasks appear in red — these need immediate action",
          "The dashboard shows your task count — check it every morning",
        ],
      },
    ],
  },

  // ============================================
  // MODULE 8: Admin & Settings
  // ============================================
  {
    id: "admin",
    title: "Administration & Settings",
    description: "User management, office structure, roles, and system configuration.",
    icon: "⚙️",
    estimatedMinutes: 3,
    route: "/admin",
    steps: [
      {
        id: "admin-overview",
        title: "Administration",
        content: "As an admin, you have access to system-level controls: User Management, Office Management, Carrier Management, and System Settings. These are accessed from the Admin dropdown in the nav bar or the Admin hub page.",
        targetSelector: null,
      },
      {
        id: "admin-users",
        title: "User Management",
        content: "Create and manage user accounts for every employee. Each user has: email, name, role (Admin, Manager, Producer, CSR), and assigned office. Roles control what each user can see and do. Deactivate users when they leave — never delete them (you'll lose audit history).",
        targetSelector: null,
        tips: [
          "Assign the correct role — Producers see only their own data, Managers see their team",
          "Every user must be assigned to an office for reporting to work correctly",
          "Use descriptive emails so you can identify users quickly",
        ],
      },
      {
        id: "admin-offices",
        title: "Office & Branch Structure",
        content: "Your agency has a hierarchy: Territory → Division → Region → District → Office. This structure powers the EOD reports, branch filtering, and multi-location management. Set up offices to match your real branch locations (e.g., Montfort, Addison, Peachtree).",
        targetSelector: null,
      },
    ],
  },

  // ============================================
  // MODULE 9: Data Flow & Best Practices
  // ============================================
  {
    id: "best-practices",
    title: "Data Flow & Best Practices",
    description: "Understand how data moves through the CRM and avoid common mistakes.",
    icon: "🔄",
    estimatedMinutes: 3,
    route: "/dashboard",
    steps: [
      {
        id: "bp-dataflow",
        title: "How Data Flows Through the CRM",
        content: "The typical flow is: Customer is created → Quotes are logged → Winning quote becomes a Policy → Payments are recorded → At renewal, the cycle repeats. Tasks and notes accumulate along the way. Every action is tracked in the activity timeline.",
        targetSelector: null,
      },
      {
        id: "bp-mistakes",
        title: "Common Mistakes to Avoid",
        content: "These are the most common errors new admins make. Avoid them and your CRM data will stay clean and useful.",
        targetSelector: null,
        tips: [
          "Don't create duplicate customers — always search first",
          "Don't leave customer records without an Agent of Record",
          "Don't skip logging notes — future agents need the history",
          "Don't ignore overdue tasks — they represent lost revenue opportunities",
          "Don't forget to update policy status when policies cancel or expire",
          "Don't create users without assigning them to the correct office",
        ],
      },
      {
        id: "bp-daily",
        title: "Recommended Daily Routine",
        content: "Every admin should follow this daily workflow for optimal operations.",
        targetSelector: null,
        tips: [
          "1. Check Dashboard — review KPIs and overdue items",
          "2. Review open tasks — address high-priority items first",
          "3. Check producer leaderboard — identify who needs support",
          "4. Review payments at risk — follow up on late payments",
          "5. Run End of Day report before leaving",
          "6. Check internal chat for team messages",
        ],
      },
      {
        id: "bp-complete",
        title: "Training Complete!",
        content: "You've completed the admin onboarding. You now understand how to navigate the CRM, manage customers, track policies, use communications tools, read reports, manage your team, and follow best practices. You can revisit any training module anytime from the Help & Training center.",
        targetSelector: null,
      },
    ],
  },
];

export function getTotalSteps(): number {
  return TOUR_MODULES.reduce((sum, m) => sum + m.steps.length, 0);
}

export function getTotalMinutes(): number {
  return TOUR_MODULES.reduce((sum, m) => sum + m.estimatedMinutes, 0);
}
