/**
 * COMPREHENSIVE ADMIN TRAINING — Tour Definitions
 * This is the full product demo. Every page, every feature, every workflow.
 * Designed so a brand-new admin can understand the entire CRM after completing all modules.
 */

export interface TourStep {
  id: string;
  title: string;
  content: string;
  targetSelector: string | null;
  position?: "top" | "bottom" | "left" | "right";
  action?: "navigate";
  navigateTo?: string;
  tips?: string[];
}

export interface TourModule {
  id: string;
  title: string;
  description: string;
  icon: string;
  estimatedMinutes: number;
  route: string;
  steps: TourStep[];
  requiredRole?: string;
}

export const TOUR_MODULES: TourModule[] = [

  // ================================================================
  // MODULE 1: WELCOME & SYSTEM OVERVIEW (8 steps)
  // ================================================================
  {
    id: "welcome",
    title: "Welcome & System Overview",
    description: "What this CRM is, how it's organized, and how to navigate — the essential orientation before anything else.",
    icon: "🏠",
    estimatedMinutes: 5,
    route: "/dashboard",
    steps: [
      {
        id: "w-1",
        title: "Welcome to the Insurance CRM",
        content: "This is your agency's complete management platform. It handles everything from the first customer contact through policy servicing, renewals, payments, team management, and reporting. This training will walk you through every feature in detail so you can operate the system with full confidence.",
        targetSelector: null,
        tips: [
          "This training has 15 modules covering every part of the CRM",
          "You can pause anytime and resume where you left off",
          "Press Escape or click 'Exit Tour' to leave at any time",
          "Access this training again from the Help button (?) in the bottom-right corner",
        ],
      },
      {
        id: "w-2",
        title: "The Agency Header",
        content: "This blue bar at the top is always visible. It shows your agency name on the left. On the right, you'll see: a 'Training & Help' link (which brings you back to the training center), your name, your assigned office, your role (Admin, Manager, Producer, or CSR), and a Sign Out button.",
        targetSelector: "[data-tour='app-header']",
        position: "bottom",
        tips: [
          "Your role determines what you can see and do in the CRM",
          "Admins have full access to everything including user management and settings",
          "The office shown is your primary location — reports and data filter by this",
        ],
      },
      {
        id: "w-3",
        title: "Main Navigation Bar",
        content: "This is the primary way to move around the CRM. Every major section is here as a tab. Some items like Office, Reports, Comms, and Admin have dropdown sub-menus — look for the ▼ arrow. Click any tab to go to that section instantly.",
        targetSelector: "[data-tour='top-nav']",
        position: "bottom",
      },
      {
        id: "w-4",
        title: "Navigation Items Explained",
        content: "Here's what each navigation item does. Understanding this is critical for knowing where to go for any task.",
        targetSelector: null,
        tips: [
          "Home — returns to the Dashboard (your daily command center)",
          "Office — switch between branch locations or view office details",
          "Forms — access insurance forms (ACORD forms, applications, templates)",
          "Remake — process policy renewals and remakes",
          "E.O.D. — run the End of Day report (daily closing summary)",
          "Reports — full reporting hub with 50+ reports by category",
          "Dashboard — KPIs, leaderboard, tasks, payments (your home base)",
          "Comms — SMS campaigns, text inbox, internal chat, announcements",
          "Calendar — appointments per producer with show/close rate tracking",
          "Admin — user management, office setup, roles, system settings",
          "Training — this training center (Help & Training hub)",
          "File Locker — document storage and file management",
        ],
      },
      {
        id: "w-5",
        title: "The 'Add Customer' Button",
        content: "This green button is always visible in the top-right of the navigation bar, on every page. It's the fastest way to create a new customer record. You'll use this whenever someone calls in, walks in, or you receive a new lead. It opens a full customer creation form.",
        targetSelector: "[data-tour='add-customer-btn']",
        position: "bottom",
      },
      {
        id: "w-6",
        title: "The Help Button",
        content: "In the bottom-right corner of every page, you'll see a round '?' button. This is your Help & Training access point. Click it to: reopen any training module, start the quick tour, or access documentation. If the circle shows a progress ring, it means you haven't completed all training modules yet.",
        targetSelector: null,
      },
      {
        id: "w-7",
        title: "The Footer Bar",
        content: "At the bottom of every page is a support footer with links to: Contact Support, Chat With Us, Email support, End User License Agreement, Open Source Credits, and the system Version number. If you or your team ever encounter issues, start here for support options.",
        targetSelector: "[data-tour='footer']",
        position: "top",
      },
      {
        id: "w-8",
        title: "How the CRM is Structured",
        content: "The CRM is built around a core concept: Customers are at the center. Each customer has policies, payments, notes, tasks, quotes, documents, claims, and household members attached to them. The Dashboard gives you the big picture. Reports let you analyze data. Communications let you reach customers. Admin lets you manage the system itself.",
        targetSelector: null,
        tips: [
          "Customer → is the central record everything connects to",
          "Policy → the insurance product sold to a customer",
          "Payment → money collected for a policy",
          "Task → a follow-up action assigned to a producer",
          "Note → a record of communication or important information",
          "Quote → a price proposal from a carrier",
          "Carrier → the insurance company that underwrites the policy",
        ],
      },
    ],
  },

  // ================================================================
  // MODULE 2: DASHBOARD DEEP DIVE (10 steps)
  // ================================================================
  {
    id: "dashboard",
    title: "Dashboard — Your Daily Command Center",
    description: "Every KPI card, every table, every metric — learn to read the dashboard like your morning briefing.",
    icon: "📊",
    estimatedMinutes: 7,
    route: "/dashboard",
    steps: [
      {
        id: "d-1",
        title: "Dashboard Overview",
        content: "The Dashboard is designed to be the first thing you check every morning. It answers the critical questions: How is the agency performing? What needs attention today? Who is producing? What payments are coming in? Think of it as your daily operations briefing.",
        targetSelector: null,
      },
      {
        id: "d-2",
        title: "KPI Cards — Agency Health at a Glance",
        content: "The six cards at the top show your most important numbers. Each card has: a large number (the metric), a label (what it measures), and a subtitle (context or comparison). The colored top border indicates the category — green for healthy metrics, red for warnings, blue for informational.",
        targetSelector: "[data-tour='kpi-cards']",
        position: "bottom",
      },
      {
        id: "d-3",
        title: "KPI: Active Policies",
        content: "This shows the total number of policies currently in force across your entire agency. This is your core revenue base — every active policy generates premium and commission. Watch this number grow over time. If it drops, it means you're losing more policies than you're writing.",
        targetSelector: null,
      },
      {
        id: "d-4",
        title: "KPI: Active Customers",
        content: "Total customer accounts with active status. One customer can have multiple policies (auto + home + umbrella). This number compared to Active Policies tells you your 'policies per customer' ratio — higher is better because it means you're cross-selling effectively.",
        targetSelector: null,
      },
      {
        id: "d-5",
        title: "KPI: Open Tasks & Overdue Count",
        content: "Shows how many tasks are pending across the agency, and how many are overdue. Overdue tasks are highlighted — these represent missed follow-ups, missed renewal contacts, or incomplete work. As an admin, if this number is high, producers need accountability.",
        targetSelector: null,
        tips: [
          "Overdue tasks = lost revenue opportunities",
          "Check which producers have the most overdue tasks",
          "Tasks are created manually or automatically by the system",
          "Common auto-tasks: renewal reminders, payment follow-ups, new customer onboarding",
        ],
      },
      {
        id: "d-6",
        title: "KPI: Renewals Due",
        content: "Policies expiring in the next 30 days. Each one is a potential lost customer if not handled. Renewals are the lifeblood of recurring revenue. If a policy expires without renewal, you lose that customer's premium AND future commissions. This number should always be actively managed.",
        targetSelector: null,
      },
      {
        id: "d-7",
        title: "Producer Leaderboard",
        content: "This ranks every producer (sales agent) by their output. The columns show: rank, name, office, policies sold, quotes generated, and task count. The top 3 get medal icons. Use this daily to see who's performing and who needs coaching. Click 'View Full Leaderboard' for the detailed version with conversion rates and activity scores.",
        targetSelector: "[data-tour='leaderboard']",
        position: "right",
        tips: [
          "Compare producers within the same office for fair benchmarking",
          "Low quotes + low policies = the producer needs more leads or training",
          "High quotes + low policies = the producer needs help closing",
          "Review this weekly with your management team",
        ],
      },
      {
        id: "d-8",
        title: "Open Tasks List",
        content: "This table shows pending tasks sorted by priority and due date. Each row shows: the task description, the customer it's linked to, priority level (high tasks in red), the assigned producer, and the due date (overdue shown in red). Click any task to go directly to that customer's record.",
        targetSelector: "[data-tour='open-tasks']",
        position: "right",
      },
      {
        id: "d-9",
        title: "Recent Payments",
        content: "The latest payments processed in the system. Each row shows: customer name, carrier (insurance company), amount paid, and date. Use this to verify payments are flowing correctly. If you notice gaps or unusual amounts, investigate immediately. This is your real-time cash flow monitor.",
        targetSelector: "[data-tour='recent-payments']",
        position: "left",
      },
      {
        id: "d-10",
        title: "Quick Actions & Office Overview",
        content: "Quick Action buttons provide one-click access to the most common tasks: Add Customer, Search, SMS Campaign, Reports, End of Day, and Calendar. Below that, the Office Overview shows how many customers are assigned to each branch location. Use this to spot imbalanced workloads between offices.",
        targetSelector: "[data-tour='quick-actions']",
        position: "left",
      },
    ],
  },

  // ================================================================
  // MODULE 3: CUSTOMER SEARCH & LIST (6 steps)
  // ================================================================
  {
    id: "customer-search",
    title: "Finding Customers — Search & List",
    description: "How to find any customer instantly using the search system and read the results table.",
    icon: "🔍",
    estimatedMinutes: 4,
    route: "/customers",
    steps: [
      {
        id: "cs-1",
        title: "The Customer Search Page",
        content: "This page is where you find existing customers. It's one of the most-used pages in the CRM — your agents will come here dozens of times per day. The page has three parts: a search bar at the top, the results table below, and an 'Add Customer' button for new records.",
        targetSelector: null,
      },
      {
        id: "cs-2",
        title: "How Search Works",
        content: "Type any of these into the search bar and it will find matching customers: first name, last name, phone number, email address, or customer ID number. The search runs automatically after you stop typing (with a slight delay to avoid overloading). You can also press Enter or click the Search button to search immediately.",
        targetSelector: "[data-tour='customer-search']",
        position: "bottom",
        tips: [
          "Search is not case-sensitive — 'smith' finds 'SMITH'",
          "You can search by partial match — 'Yane' finds 'YANES'",
          "Phone search works with or without formatting — '469' finds all 469 numbers",
          "Click 'Clear' to reset the search and show all customers",
        ],
      },
      {
        id: "cs-3",
        title: "Reading the Customer Table",
        content: "The results table shows one row per customer. The columns are: Customer ID (unique identifier), Name (last, first), Type (Personal Lines or Commercial), Status (Active/Inactive), Email, Cell Phone, Office (which branch owns this customer), Agent of Record (assigned producer), Policies count, and Date Added.",
        targetSelector: null,
      },
      {
        id: "cs-4",
        title: "Table Design Patterns",
        content: "This alternating-color table pattern (white and light green rows) is used throughout the CRM. It makes rows easier to read. Clickable items are shown in blue. Status indicators use color-coding: green for Active, red for Cancelled, yellow for Pending, grey for Expired.",
        targetSelector: null,
        tips: [
          "Click the Customer ID or Name (in blue) to open the full detail page",
          "The Policies column tells you how many active policies they have",
          "Sort the table by clicking column headers (where supported)",
          "Tables throughout the CRM follow this same pattern",
        ],
      },
      {
        id: "cs-5",
        title: "The Add Customer Button",
        content: "Click 'Add Customer' (top-right or the green button in the nav) to open the customer creation form. This is how new customers enter the system — whether they're walk-ins, phone calls, web leads, or referrals. Every customer must be entered here before you can create policies, log payments, or track their activity.",
        targetSelector: null,
      },
      {
        id: "cs-6",
        title: "Important: Always Search Before Adding",
        content: "Before creating a new customer, ALWAYS search first to check if they already exist. Duplicate customer records cause major problems: split payment history, lost notes, inaccurate reporting, and confused agents. Search by phone number AND name to be thorough.",
        targetSelector: null,
        tips: [
          "Duplicate records are the #1 data quality problem in insurance CRMs",
          "If you find a duplicate, do NOT delete either record — contact your admin to merge them",
          "Searching by phone number is the most reliable way to check for duplicates",
        ],
      },
    ],
  },

  // ================================================================
  // MODULE 4: CREATING A CUSTOMER (7 steps)
  // ================================================================
  {
    id: "customer-create",
    title: "Creating a New Customer",
    description: "Step-by-step walkthrough of the customer creation form — every field explained.",
    icon: "➕",
    estimatedMinutes: 5,
    route: "/customers/new",
    steps: [
      {
        id: "cc-1",
        title: "The Add Customer Form",
        content: "This form is divided into two columns. The left column captures personal information (name, address, contact details). The right column captures account information (customer type, source, communication preferences). Green section headers separate the form into logical groups.",
        targetSelector: null,
      },
      {
        id: "cc-2",
        title: "Personal Information Fields",
        content: "Required fields are marked with a red asterisk (*). First Name and Last Name are always required. The system automatically converts names to UPPERCASE for consistency. Enter the customer's primary address, email, and phone numbers. Having at least a cell phone and email is important for communication.",
        targetSelector: null,
        tips: [
          "First Name and Last Name are REQUIRED — the form won't submit without them",
          "Enter the full address including street, city, state, and zip",
          "Cell phone is the most important contact number for SMS campaigns",
          "Email is needed for email blasts and digital communication",
          "Language field defaults to English but should be updated for non-English speakers",
        ],
      },
      {
        id: "cc-3",
        title: "Account Information",
        content: "Customer Type determines how the system categorizes them: 'Personal Lines' for individual/family insurance (auto, home, renters, life), 'Commercial Lines' for business insurance. Account Type is either 'Customer' (has active policies) or 'Prospect' (potential customer, no policies yet). Source tracks where this customer came from.",
        targetSelector: null,
        tips: [
          "Personal Lines = auto, home, renters, umbrella, life insurance",
          "Commercial Lines = business liability, commercial property, workers comp",
          "Source options: Referral, Walk-in, Phone, Web, Social Media, Other",
          "Tracking the source is critical for knowing which marketing channels work",
        ],
      },
      {
        id: "cc-4",
        title: "Communication Preferences (Do Not Flags)",
        content: "These six flags control what types of outreach are allowed for this customer. Set to 'Yes' to block that communication type. These are legally important — if a customer says 'don't call me,' set Do Not Call to Yes immediately. The SMS campaign system respects these flags automatically.",
        targetSelector: null,
        tips: [
          "Do Not Email — blocks email campaigns and blasts",
          "Do Not Text — blocks SMS campaigns and automated texts",
          "Do Not Call — blocks outbound call lists",
          "Do Not Mail — blocks physical mailers",
          "Do Not Market — blocks all marketing outreach",
          "Do Not Capture Email — prevents storing their email",
          "ALWAYS respect these preferences — violations can have legal consequences",
        ],
      },
      {
        id: "cc-5",
        title: "DOB and Driver's License",
        content: "Date of Birth is used for auto insurance rating and life insurance eligibility. Driver's License number and state are needed for auto policy applications. While not required to create the customer record, having this information ready speeds up the quoting process later.",
        targetSelector: null,
      },
      {
        id: "cc-6",
        title: "Comments Field",
        content: "The Comments field at the bottom is for any free-text notes about the customer that should be visible immediately when viewing their record. This is different from the Notes tab — Comments appear directly on the customer header and are visible without clicking any tabs. Use it for critical information like 'Payment plan: $300/month' or 'Spanish speaker — route to Maria'.",
        targetSelector: null,
      },
      {
        id: "cc-7",
        title: "Saving the Customer",
        content: "Click 'Save Customer' to create the record. The system will: validate required fields, check email format, generate a unique Customer ID, and redirect you to the new customer's detail page. From there, you can immediately start adding policies, notes, and tasks. Click 'Cancel' to discard and go back to the customer list.",
        targetSelector: null,
      },
    ],
  },

  // ================================================================
  // MODULE 5: CUSTOMER DETAIL PAGE (12 steps)
  // ================================================================
  {
    id: "customer-detail",
    title: "Customer Detail Page — The Complete View",
    description: "The most important screen in the CRM — every section, every tab, every action explained in detail.",
    icon: "👤",
    estimatedMinutes: 10,
    route: "/customers",
    steps: [
      {
        id: "cd-1",
        title: "The Customer Detail Page",
        content: "This is the single most important page in the CRM. When you click on any customer, this page shows EVERYTHING about them: personal information, account status, policies, payments, notes, tasks, documents, quotes, household members, claims, and diary entries. It's the complete 360-degree view of a customer relationship.",
        targetSelector: null,
      },
      {
        id: "cd-2",
        title: "Title Bar & Tools",
        content: "The title bar shows 'Personal Lines Customer Details' with the Customer ID number. On the right is the 'Tools' button — a dropdown with quick actions: ACORD/Custom Forms, Add New Policy, Add Note, Thank You Letter, Add Change Request, Mailing Services, and Custom Letter. This is the action hub for anything you want to do on this customer.",
        targetSelector: null,
        tips: [
          "ACORD Forms — standard insurance industry forms auto-filled with customer data",
          "Add New Policy — opens the policy creation form linked to this customer",
          "Add Note — quickly log a call, conversation, or important information",
          "Thank You Letter — generate a branded thank-you letter",
          "Add Change Request — submit a policy change (endorsement) for processing",
          "Custom Letter — select from pre-made letter templates",
        ],
      },
      {
        id: "cd-3",
        title: "Customer Header — Left Column",
        content: "The left side shows personal details: full name (clickable), validated address (green checkmark means address is verified), mailing address (if different), email (clickable to send), phone numbers (cell, home, work, other), language, preferred contact method, SSN/Tax ID (masked for security), marital status, and gender.",
        targetSelector: null,
      },
      {
        id: "cd-4",
        title: "Customer Header — Right Column",
        content: "The right side shows system/account details: Customer ID (with copy button), Customer Type, Account Type, Status (Active in green), Agent of Record (the producer responsible), who entered and keyed the record, which Office owns the customer, the lead source, date added, date of birth, driver's license info, and all six Do Not communication flags.",
        targetSelector: null,
        tips: [
          "Customer ID is the unique identifier — use it for lookups",
          "Agent of Record is the producer who owns this customer relationship",
          "Status: Active = has current policies, Inactive = no active policies",
          "Source tells you how this customer found your agency",
        ],
      },
      {
        id: "cd-5",
        title: "Comments, Relationships & Tags",
        content: "Below the header you'll see three sections: Comments (green text showing key notes), Customer Relationships (links to related customers — like spouse or business partner), and Customer Tags (labels for categorization and targeting). Tags are especially important for SMS campaigns — they determine who receives which messages.",
        targetSelector: null,
      },
      {
        id: "cd-6",
        title: "The 11 Tabs — Overview",
        content: "Below the customer info are 11 tabs, each showing a different aspect of the customer's record. The number in parentheses shows how many items exist in that tab. This lets you instantly see: 'This customer has 2 policies, 5 payments, 3 notes, and 1 task' without clicking anything.",
        targetSelector: null,
      },
      {
        id: "cd-7",
        title: "Tab: Policies",
        content: "Shows every insurance policy for this customer in a table. Columns: Company (carrier name), Status (Active/Cancelled/Expired), Type (New Business/Renewal), Class (AUTO/HOME/RENTERS/LIFE), Policy Number, Due Date, Effective Date, Expiration Date, and Premium. You can Edit, view Details, Add a new policy, or Change Status from action buttons in each row.",
        targetSelector: null,
        tips: [
          "Active policies in green = revenue-generating",
          "Expiration dates approaching = renewal action needed",
          "The 'Change Status' dropdown lets you cancel, expire, or renew",
          "Click 'Details' to see full coverage breakdown",
        ],
      },
      {
        id: "cd-8",
        title: "Tab: Notes",
        content: "The Notes tab is your communication log. Every phone call, conversation, email, and important detail should be logged here. Click '+ Add Note' to create a new note — type your content and click Save. Notes show: who wrote them, when, and the full content. The action bar also has: Email Blast and Text Blast to send mass communications directly from here.",
        targetSelector: null,
        tips: [
          "ALWAYS log calls and important conversations as notes",
          "Notes create an audit trail — critical for disputes and accountability",
          "Future agents will rely on notes to understand the customer's history",
          "Use clear, professional language — customers may request their records",
        ],
      },
      {
        id: "cd-9",
        title: "Tab: Pay History",
        content: "Every payment transaction for this customer. Columns: Receipt/Reference number, Office (which branch processed it), Company (carrier), Policy number, Status, Amount Billed, Amount Tendered (what was actually paid), and Date. Use this to verify payment history, resolve billing disputes, and track payment patterns.",
        targetSelector: null,
      },
      {
        id: "cd-10",
        title: "Tab: Attachments",
        content: "Documents uploaded for this customer: driver's licenses, policy applications, declaration pages, ID cards, signed forms, photos, and any other files. Each attachment shows: the associated policy, carrier, file name, document type (Drivers, License, General, ID Card), description, and who uploaded it. Use 'Add Attachment' or 'Scan Now' to add new files.",
        targetSelector: null,
      },
      {
        id: "cd-11",
        title: "Tab: Quotes/XDates",
        content: "Quotes tracks insurance price proposals from different carriers. When an agent runs quotes, they log the carrier, premium amount, effective date, and status here. XDates (Expiration Dates) track when a PROSPECT's current insurance with a competitor expires — this tells your agents exactly when to call for the best chance of winning the business.",
        targetSelector: null,
        tips: [
          "XDates are a powerful prospecting tool — they tell you when to call",
          "Log quotes from ALL carriers, not just the winning one",
          "Comparing quotes helps show the customer you got them the best deal",
          "Quote status: Pending, Accepted, Declined, Expired",
        ],
      },
      {
        id: "cd-12",
        title: "Remaining Tabs: Tasks, Finance, HH Members, Claims, Roles, Diary",
        content: "Tasks — follow-ups and action items assigned to producers for this customer. Finance — commission and fee tracking. HH Members — household members (spouse, children, other drivers) linked to this customer. Claims — insurance claims filed on their policies. Roles — which agents are assigned to this customer's policies. Diary — a chronological log of important dates and events.",
        targetSelector: null,
        tips: [
          "Tasks are how you ensure nothing falls through the cracks",
          "HH Members help you cross-sell — if a spouse has no policy, that's an opportunity",
          "Claims history is critical for renewal decisions",
          "Always keep the Roles tab accurate — it determines who services each policy",
        ],
      },
    ],
  },

  // ================================================================
  // MODULE 6: POLICIES IN DEPTH (8 steps)
  // ================================================================
  {
    id: "policies",
    title: "Policy Management — The Revenue Engine",
    description: "Everything about policies: types, statuses, lifecycle, renewals, and how they drive agency revenue.",
    icon: "📋",
    estimatedMinutes: 6,
    route: "/customers",
    steps: [
      {
        id: "p-1",
        title: "What Is a Policy?",
        content: "A policy is an insurance contract between the customer and a carrier (insurance company). Your agency facilitates this — you sell the policy, collect payments, and earn commissions. Each policy has: a carrier, a class (type of insurance), a policy number, dates (effective and expiration), and a premium (the price the customer pays).",
        targetSelector: null,
      },
      {
        id: "p-2",
        title: "Policy Classes (Lines of Business)",
        content: "The 'Class' field categorizes what type of insurance the policy covers. Your agency may handle multiple classes across different carriers.",
        targetSelector: null,
        tips: [
          "AUTO — vehicle insurance (liability, collision, comprehensive)",
          "HOME — homeowners insurance (dwelling, personal property, liability)",
          "RENTERS — renter's insurance (personal property, liability for tenants)",
          "LIFE — life insurance (term, whole life, universal)",
          "COMMERCIAL — business insurance (general liability, commercial property, workers comp)",
          "UMBRELLA — extra liability coverage above auto/home limits",
        ],
      },
      {
        id: "p-3",
        title: "Policy Lifecycle & Statuses",
        content: "Every policy goes through a lifecycle: it starts as Pending (application submitted), becomes Active (bound and in force), and eventually either Renews (continues for another term) or ends as Expired, Cancelled, or Non-renewed. Understanding these statuses is key to managing your book of business.",
        targetSelector: null,
        tips: [
          "ACTIVE (green) — policy is currently in force, generating revenue",
          "PENDING — application submitted, waiting for carrier approval",
          "EXPIRED — term ended without renewal (customer lost)",
          "CANCELLED — terminated early (by customer or carrier)",
          "Each status change should be logged with a reason",
        ],
      },
      {
        id: "p-4",
        title: "Policy Types: New Business vs Renewal",
        content: "New Business means a policy sold for the first time — a new customer or a new line of coverage. Renewal means an existing policy is being continued for another term. Renewals are critical because they represent recurring revenue. Losing a renewal means losing that customer's ongoing premium.",
        targetSelector: null,
      },
      {
        id: "p-5",
        title: "Carriers (Insurance Companies)",
        content: "Your agency works with multiple carriers (insurance companies). Each carrier offers different products, rates, and coverage options. The CRM tracks which carrier underwrites each policy. Common carriers you'll see: Venture Insurance, Alpha Rts, The General, Progressive, State Auto, SafePoint, Nationwide, Allstate. The carrier determines the commission rate and claims process.",
        targetSelector: null,
      },
      {
        id: "p-6",
        title: "Effective Date & Expiration Date",
        content: "The Effective Date is when coverage starts. The Expiration/Cancel Date is when coverage ends. The difference between these is the 'policy term' — usually 6 months or 12 months. Knowing expiration dates is critical because every approaching expiration is a renewal opportunity. The system tracks these dates and can auto-generate renewal tasks.",
        targetSelector: null,
      },
      {
        id: "p-7",
        title: "Premium — What the Customer Pays",
        content: "Premium is the total price of the policy for the term. It can be paid in full or in monthly installments. Your agency's commission is a percentage of the premium — typically 10-15% for new business and 10-12% for renewals. Higher premiums = higher commissions = more agency revenue.",
        targetSelector: null,
      },
      {
        id: "p-8",
        title: "Policy Actions You Can Take",
        content: "From the Policies tab, you can: Edit policy details, view full Details, Add a new policy to this customer, Change Status (cancel, expire, renew), and view the associated Rider information. The 'SL' and 'Action' buttons at the top provide bulk actions across multiple policies.",
        targetSelector: null,
      },
    ],
  },

  // ================================================================
  // MODULE 7: PAYMENTS & PAY HISTORY (5 steps)
  // ================================================================
  {
    id: "payments",
    title: "Payments & Pay History",
    description: "How payments are tracked, what the pay history table shows, and how to use it for billing management.",
    icon: "💳",
    estimatedMinutes: 4,
    route: "/customers",
    steps: [
      {
        id: "pay-1",
        title: "Payment Tracking",
        content: "The Pay History tab shows every payment transaction for a customer. Insurance payments can be: monthly installments, quarterly payments, semi-annual, annual, or pay-in-full. Each payment is linked to a specific policy and processed through a specific office. This is your billing audit trail.",
        targetSelector: null,
      },
      {
        id: "pay-2",
        title: "Reading the Payment Table",
        content: "Each row in the pay history table shows: Receipt/Reference number (unique transaction ID), Office (which branch processed it), Company (carrier the payment is for), Policy number, Status (Active, Refund, Void), Amount Billed (what was owed), Amount Tendered (what was paid), and Date. If Amount Tendered doesn't match Amount Billed, there's a discrepancy to investigate.",
        targetSelector: null,
      },
      {
        id: "pay-3",
        title: "Payment Statuses",
        content: "Payment status tells you the state of the transaction. Active means the payment was successfully processed. Refund means money was returned to the customer. Void means the payment was cancelled before processing. Watch for patterns — if a customer has multiple voids, they may have payment issues.",
        targetSelector: null,
      },
      {
        id: "pay-4",
        title: "Why Payments Matter for Admins",
        content: "As an admin, payment data tells you: whether the agency is collecting money properly, which offices are processing the most payments, whether customers are paying on time, and if there are discrepancies between billed and tendered amounts. The Dashboard's 'Recent Payments' widget gives you the top-level view.",
        targetSelector: null,
        tips: [
          "Check for payments where Billed ≠ Tendered — these need investigation",
          "Track payment patterns — customers who miss payments may cancel",
          "Verify office-level payment processing is correct",
          "Use the payment data to project cash flow",
        ],
      },
      {
        id: "pay-5",
        title: "Automatic Payment Reminders",
        content: "The CRM's SMS system can automatically remind customers about upcoming payments. Smart Triggers in the Communications module handle this: 7 days before due, 2 days before, same day, and missed payment escalation. Setting up these triggers significantly reduces late payments and policy cancellations due to non-payment.",
        targetSelector: null,
      },
    ],
  },

  // ================================================================
  // MODULE 8: COMMUNICATIONS SYSTEM (8 steps)
  // ================================================================
  {
    id: "communications",
    title: "Communications — SMS, Chat & Messaging",
    description: "Every communication tool: bulk SMS campaigns, smart triggers, 2-way texting, internal chat, and announcements.",
    icon: "💬",
    estimatedMinutes: 7,
    route: "/communications/sms",
    steps: [
      {
        id: "com-1",
        title: "Communications Overview",
        content: "The Comms dropdown in the navigation provides four tools: SMS Campaigns (bulk texting), Text Inbox (2-way messaging), Internal Chat (team communication), and Announcements (company-wide notices). Together, these handle all external customer communication and internal team coordination.",
        targetSelector: null,
      },
      {
        id: "com-2",
        title: "SMS Campaigns — Sending Bulk Texts",
        content: "Create targeted text message campaigns to reach groups of customers at once. You select a target audience using customer Tags (e.g., 'Renewal Due', 'Payment Overdue', 'New Customers'). Write your message, personalize it with variables, schedule it, and send. The system tracks delivery rates and response rates.",
        targetSelector: null,
        tips: [
          "Tag your customers properly — tags determine who gets which campaigns",
          "Use variables like {firstName} and {policyNumber} for personalization",
          "Always preview before sending to verify the message looks right",
          "Schedule campaigns during business hours for best response rates",
          "The system automatically respects Do Not Text preferences",
        ],
      },
      {
        id: "com-3",
        title: "SMS Campaign KPIs",
        content: "At the top of the SMS page, three metrics show campaign performance: Messages Sent (total this month), Delivery Rate (percentage successfully delivered), and Response Rate (percentage that generated a reply). Industry benchmark: delivery should be 95%+, response rate depends on message type.",
        targetSelector: null,
      },
      {
        id: "com-4",
        title: "Smart Triggers — Automated Messaging",
        content: "Smart Triggers are pre-configured automated messages that fire based on events. They run without any manual intervention. You configure them once and they handle ongoing customer communication automatically. This is one of the most powerful features of the CRM — it ensures no customer falls through the cracks.",
        targetSelector: null,
        tips: [
          "Payment Due — 7 days: gentle reminder about upcoming payment",
          "Payment Due — 2 days: urgent reminder, payment approaching",
          "Payment Due — Same day: final notice, pay today to avoid lapse",
          "Missed Payment: escalation notice with instructions to pay",
          "Welcome New Customer: automated welcome message after onboarding",
          "Renewal — 30 days: heads-up that policy renewal is approaching",
          "Each trigger can be paused or edited independently",
        ],
      },
      {
        id: "com-5",
        title: "Text Inbox — 2-Way Messaging",
        content: "The Text Inbox shows all SMS conversations with customers. The left panel lists conversations (most recent first) with unread messages highlighted in blue. Click a conversation to see the full message thread on the right. Type a reply at the bottom and click Send. This is real-time customer communication — respond quickly.",
        targetSelector: null,
      },
      {
        id: "com-6",
        title: "Internal Chat — Team Communication",
        content: "Internal Chat is like Slack built into the CRM. Channels are organized by branch office (Montfort, Peachtree, Polk, etc.) plus a general channel and announcements. Use @mentions to tag specific team members. This keeps all work-related communication inside the CRM instead of scattered across personal texts, emails, and chat apps.",
        targetSelector: null,
        tips: [
          "Use #general for company-wide discussions",
          "Use branch channels for location-specific conversations",
          "Use @mentions to get specific people's attention",
          "Keep conversations professional — they're part of the business record",
        ],
      },
      {
        id: "com-7",
        title: "Announcements",
        content: "The Announcements page is for official company-wide notices. Only admins and managers can post announcements. Posts can be pinned to stay at the top. Use this for: production goal updates, system maintenance notices, new carrier appointments, training materials, and policy changes. This replaces company-wide emails for important news.",
        targetSelector: null,
      },
      {
        id: "com-8",
        title: "Communication Best Practices",
        content: "Effective communication is what separates good agencies from great ones. The CRM gives you the tools — here's how to use them well.",
        targetSelector: null,
        tips: [
          "Set up ALL Smart Triggers on day one — they work 24/7 for you",
          "Respond to text messages within 15 minutes during business hours",
          "Use SMS campaigns for renewals, birthdays, and seasonal promotions",
          "Log every customer conversation as a Note in their record",
          "Check internal chat at the start and end of every day",
          "Post weekly production updates as Announcements",
        ],
      },
    ],
  },

  // ================================================================
  // MODULE 9: REPORTS & ANALYTICS (7 steps)
  // ================================================================
  {
    id: "reports",
    title: "Reports & Analytics Hub",
    description: "Navigate 50+ reports — production, EOD, leaderboard, marketing, downloads, and auditing.",
    icon: "📈",
    estimatedMinutes: 6,
    route: "/reports",
    steps: [
      {
        id: "r-1",
        title: "The Reports Hub",
        content: "The Reports page is a mega-menu with 50+ reports organized into categories. At the top are Favorites (your pinned reports for quick access) with tabs for Employee Overview, End Of Day, Owner Overview, and Tasks. Below is the General section containing every available report grouped by business function.",
        targetSelector: null,
      },
      {
        id: "r-2",
        title: "Report Categories Explained",
        content: "Reports are organized into logical groups so you can find what you need quickly.",
        targetSelector: null,
        tips: [
          "Mobile Reports — reports accessible from mobile devices",
          "Owner Reports — high-level agency performance for owners/principals",
          "Download Reports — export policy activity, transactions, endorsements, notes as files",
          "Marketing — customer lists, cross-selling opportunities, drip campaigns, email history",
          "Employee/Broker — commissions, production summaries, written premium, split premiums",
          "Imports/Exports — upload customer data, export customer lists, export policies",
          "Setup — manage agency items, schedule items, items without tasks",
          "Auditing — data integrity checks, activity logging",
          "Tracking — annual rate tracking, event reports, payment reports",
        ],
      },
      {
        id: "r-3",
        title: "End of Day (E.O.D.) Report",
        content: "This is the most important daily report. Run it at the end of every business day. It summarizes all activity that happened: policies written, payments collected, customers added, tasks completed. The E.O.D. report filters by: Territory, Division, Region, District, Office, Customer Type, Employee, and Date Range. This hierarchical filtering lets you drill down from agency-wide to a single office.",
        targetSelector: null,
        tips: [
          "Run EOD every day before close of business — this is non-negotiable",
          "Start with 'All Offices' to see the full picture, then drill into specific offices",
          "Compare today's EOD with yesterday's to spot trends",
          "Export the report for management review meetings",
        ],
      },
      {
        id: "r-4",
        title: "Office Hierarchy in Reports",
        content: "The EOD and other reports use a 5-level hierarchy to filter data: Territory (top level, usually 'Default'), Division (regional group), Region (geographic area), District (local area — your branch names like MONTFORT, PEACHTREE, POLK), and Office (specific location). This structure lets you compare performance across the entire organization.",
        targetSelector: null,
      },
      {
        id: "r-5",
        title: "Producer Leaderboard Report",
        content: "The full leaderboard expands on the dashboard summary. It shows every producer with: rank, name, office, calls made, quotes generated, policies sold, follow-ups completed, missed tasks, total written premium, conversion rate, and an Activity Score (0-100). Filter by time period and office. Use this in weekly management meetings to review performance.",
        targetSelector: null,
      },
      {
        id: "r-6",
        title: "Production & Commission Reports",
        content: "Under Employee/Broker, you'll find: Fee Commissions (commission earned per policy), Production Summary (total output per producer), Production Detail (line-by-line transactions), Written Premium (total premium written by period), Split Premium (premium split between multiple producers), and Employee Production (comprehensive producer scorecards).",
        targetSelector: null,
      },
      {
        id: "r-7",
        title: "How to Use Reports as an Admin",
        content: "Reports are your management toolkit. Here's the recommended rhythm for staying on top of operations.",
        targetSelector: null,
        tips: [
          "DAILY: Run End of Day report, check producer leaderboard",
          "WEEKLY: Review production summary, compare offices, check marketing effectiveness",
          "MONTHLY: Pull commission reports, analyze written premium trends, review retention rates",
          "QUARTERLY: Full owner overview, cross-selling analysis, employee performance reviews",
          "Always download/export important reports for offline review",
        ],
      },
    ],
  },

  // ================================================================
  // MODULE 10: CALENDAR & APPOINTMENTS (5 steps)
  // ================================================================
  {
    id: "calendar",
    title: "Calendar & Appointment System",
    description: "Manage producer schedules, track show/close rates, and optimize appointment-based selling.",
    icon: "📅",
    estimatedMinutes: 4,
    route: "/calendar",
    steps: [
      {
        id: "cal-1",
        title: "The Calendar Page",
        content: "The Calendar shows all scheduled appointments across your agency. View by Day, Week, or Month using the toggle buttons at the top. Each appointment shows the time, customer name, and appointment type (Quote Review, Renewal, Initial Call, Policy Review, etc.). The sidebar shows today's detailed schedule.",
        targetSelector: null,
      },
      {
        id: "cal-2",
        title: "Calendar KPIs",
        content: "Four metrics at the top tell you about appointment performance: Appointments Today (how many are scheduled), This Week (weekly volume), Show Rate (percentage of customers who actually show up), and Close Rate (percentage of appointments that result in a sale). These metrics help you measure the effectiveness of appointment-based selling.",
        targetSelector: null,
        tips: [
          "A show rate below 80% means your confirmation process needs improvement",
          "A close rate below 30% means producers need closing technique training",
          "Send appointment reminder texts 24 hours and 1 hour before",
          "No-shows should always get a reschedule follow-up call",
        ],
      },
      {
        id: "cal-3",
        title: "Creating Appointments",
        content: "Click '+ New Appointment' to schedule. You'll enter: the customer, the producer handling it, date/time, appointment type, and any notes. Appointments can be assigned to specific producers automatically based on territory or round-robin. The system can also sync with Google Calendar if configured.",
        targetSelector: null,
      },
      {
        id: "cal-4",
        title: "Today's Schedule Sidebar",
        content: "The right sidebar shows a focused view of today's appointments in chronological order. Each entry shows: time, customer name, appointment type, and assigned producer. This is what each producer should check first thing in the morning to know their schedule for the day.",
        targetSelector: null,
      },
      {
        id: "cal-5",
        title: "Calendar Best Practices",
        content: "A well-managed calendar is the difference between a chaotic agency and a productive one.",
        targetSelector: null,
        tips: [
          "Every customer interaction should be an appointment — don't wing it",
          "Block 'quoting time' so producers aren't interrupted during complex quotes",
          "Schedule renewal reviews 60-90 days before expiration",
          "Follow up every no-show within 2 hours",
          "Track show rates per producer — low show rates may indicate poor confirmation",
          "Review weekly close rates to identify training opportunities",
        ],
      },
    ],
  },

  // ================================================================
  // MODULE 11: TASK MANAGEMENT (6 steps)
  // ================================================================
  {
    id: "tasks",
    title: "Task Management & Follow-ups",
    description: "How tasks work, how they're created, how to prioritize, and how to ensure nothing falls through the cracks.",
    icon: "✅",
    estimatedMinutes: 4,
    route: "/dashboard",
    steps: [
      {
        id: "t-1",
        title: "How Tasks Work",
        content: "Tasks are action items that ensure follow-through. Every task has: a title (what needs to be done), a customer (who it's about), a type (follow-up, renewal, general, etc.), a priority (high or normal), a due date, and an assigned producer. Tasks appear on the Dashboard, in the customer's Tasks tab, and drive the daily workflow for every agent.",
        targetSelector: null,
      },
      {
        id: "t-2",
        title: "Task Types",
        content: "Different task types help categorize and prioritize work.",
        targetSelector: null,
        tips: [
          "Follow-up — call back a customer or check status of something",
          "Renewal — contact customer about upcoming policy renewal",
          "General — any other action item (document collection, etc.)",
          "Service — process a policy change, endorsement, or customer request",
          "Onboarding — complete new customer setup (welcome packet, cross-sell review)",
        ],
      },
      {
        id: "t-3",
        title: "Task Priority & Due Dates",
        content: "High priority tasks appear in red and should be handled first every day. Normal priority tasks are handled in order of due date. Overdue tasks (past their due date) appear in red with 'Overdue' label — these need immediate attention. As an admin, monitor overdue tasks across all producers to ensure accountability.",
        targetSelector: null,
      },
      {
        id: "t-4",
        title: "Automatic Task Creation",
        content: "The system creates tasks automatically for critical events: when a new customer is added (onboarding tasks), when a policy is approaching renewal (renewal reminder task), and when certain Smart Triggers fire. This means important follow-ups happen even if an agent forgets to create them manually.",
        targetSelector: null,
      },
      {
        id: "t-5",
        title: "Completing Tasks",
        content: "When a task is done, mark it as completed. The system records who completed it and when. Completed tasks remain in the history — they're never deleted. This creates an accountability trail showing that follow-through happened.",
        targetSelector: null,
      },
      {
        id: "t-6",
        title: "Admin Task Monitoring",
        content: "As an admin, task management is one of your most powerful tools for keeping the agency productive.",
        targetSelector: null,
        tips: [
          "Check the Dashboard 'Open Tasks' section every morning",
          "If a producer has 10+ overdue tasks, they need immediate coaching",
          "Review task completion rates weekly per producer",
          "Ensure renewal tasks are created at least 60 days before expiration",
          "Use the task system to delegate work — assign tasks to specific producers",
          "Tasks are evidence of work done — use them in performance reviews",
        ],
      },
    ],
  },

  // ================================================================
  // MODULE 12: ADMIN & USER MANAGEMENT (7 steps)
  // ================================================================
  {
    id: "admin",
    title: "Administration — Users, Offices & Settings",
    description: "Full admin controls: creating users, assigning roles, managing offices, and configuring the system.",
    icon: "⚙️",
    estimatedMinutes: 6,
    route: "/admin",
    steps: [
      {
        id: "a-1",
        title: "Admin Hub",
        content: "The Admin section is where you control the system itself. It has four main areas: User Management (create and manage employee accounts), Office Management (set up your branch hierarchy), Carrier Management (manage insurance company relationships), and System Settings (agency-wide configuration). Only admins can access these areas.",
        targetSelector: null,
      },
      {
        id: "a-2",
        title: "User Management — Creating Accounts",
        content: "Every person who uses the CRM needs a user account. To create one: go to Admin → User Management, enter their email, name, and phone. Then assign them a Role and an Office. Their login credentials will be sent to their email. Deactivate (don't delete) accounts when employees leave.",
        targetSelector: null,
      },
      {
        id: "a-3",
        title: "User Roles — Who Can Do What",
        content: "Roles control permissions. The system has four built-in roles that determine what each user can see and do.",
        targetSelector: null,
        tips: [
          "ADMIN — full access to everything: all data, all customers, all reports, user management, system settings",
          "MANAGER — can see all data for their team/office, run reports, reassign tasks, but cannot manage users or system settings",
          "PRODUCER — can only see their own customers, policies, and tasks. Cannot see other producers' data or run agency-wide reports",
          "CSR (Customer Service Rep) — can view and edit all customer records for servicing, but limited report access and no commission data",
        ],
      },
      {
        id: "a-4",
        title: "Why Role Assignment Matters",
        content: "Assigning the wrong role creates problems. A Producer with Admin access could accidentally change system settings. A CSR with Producer access could see commission data they shouldn't. Always assign the minimum role needed for the person's job function. You can always upgrade later if needed.",
        targetSelector: null,
      },
      {
        id: "a-5",
        title: "Office Management — Branch Structure",
        content: "Your agency's office hierarchy is: Territory → Division → Region → District → Office. This powers the EOD reports, data filtering, and multi-location management. Each user is assigned to a specific office. Each customer is assigned to an office. Reports can filter by any level of this hierarchy. Set this up to match your real branch structure.",
        targetSelector: null,
        tips: [
          "Your offices: MONTFORT, ADDISON/CPT, PEACHTREE, POLK, BADESTORE",
          "Each office should have at least one Manager and multiple Producers",
          "Customers are assigned to offices — this determines which branch 'owns' them",
          "EOD reports use this hierarchy to show branch-level performance",
        ],
      },
      {
        id: "a-6",
        title: "Carrier Management",
        content: "Carriers are the insurance companies your agency is appointed with. The carrier list tracks: company name, code, lines of business they offer, appointment status, commission rates, and portal login URL. Keep this updated — when you add a new carrier appointment, add it here so producers can log quotes and policies against it.",
        targetSelector: null,
      },
      {
        id: "a-7",
        title: "Admin Responsibilities Summary",
        content: "As the admin, you are the system owner. Here's your complete responsibility checklist.",
        targetSelector: null,
        tips: [
          "CREATE user accounts for all new hires on their first day",
          "DEACTIVATE accounts immediately when someone leaves",
          "REVIEW the producer leaderboard weekly and address underperformance",
          "RUN End of Day reports daily or ensure managers do",
          "MONITOR overdue tasks and hold producers accountable",
          "KEEP the carrier list and office structure up to date",
          "SET UP Smart Triggers for payment reminders and renewals",
          "CHECK the internal chat and announcements daily",
          "EXPORT key reports monthly for management review",
          "TRAIN new users using this onboarding system",
        ],
      },
    ],
  },

  // ================================================================
  // MODULE 13: FORMS, REMAKE & FILE LOCKER (4 steps)
  // ================================================================
  {
    id: "forms-files",
    title: "Forms, Renewals & File Locker",
    description: "Insurance forms, policy remake/renewal process, and document storage.",
    icon: "📁",
    estimatedMinutes: 3,
    route: "/forms",
    steps: [
      {
        id: "ff-1",
        title: "Forms",
        content: "The Forms page provides access to insurance industry forms — primarily ACORD forms. ACORD (Association for Cooperative Operations Research and Development) forms are the standard paperwork used across the insurance industry for applications, policy changes, and submissions. You can also access custom forms and templates your agency has created.",
        targetSelector: null,
      },
      {
        id: "ff-2",
        title: "Remake (Policy Renewals)",
        content: "The Remake page is where policy renewals are processed. When a policy approaches its expiration date, it needs to be 'remade' — either renewed with the same carrier, re-quoted with different carriers, or allowed to expire. This process should start 60-90 days before expiration. The system can auto-generate renewal tasks to remind producers.",
        targetSelector: null,
        tips: [
          "Start renewal outreach 90 days before expiration for best results",
          "Compare renewal rates across carriers — shop for better rates if possible",
          "Contact the customer to discuss their renewal options",
          "If the carrier raised the rate significantly, remarket with other carriers",
          "Always log the renewal outcome (renewed same, switched carrier, lost)",
        ],
      },
      {
        id: "ff-3",
        title: "File Locker",
        content: "The File Locker is a secure document storage system for files that aren't tied to a specific customer — such as agency contracts, carrier appointment letters, training materials, compliance documents, and office policies. Unlike customer-level Attachments (which are tied to individual customers), File Locker stores agency-wide documents.",
        targetSelector: null,
      },
      {
        id: "ff-4",
        title: "E.O.D. (End of Day) — Quick Access",
        content: "The E.O.D. item in the navigation bar is a shortcut directly to the End of Day report page. Since this report is run every single day, having it in the main nav saves time compared to going through Reports → End Of Day. Click it at the end of each business day to run your daily summary.",
        targetSelector: null,
      },
    ],
  },

  // ================================================================
  // MODULE 14: DATA FLOW & WORKFLOWS (6 steps)
  // ================================================================
  {
    id: "workflows",
    title: "Workflows — How Data Moves Through the CRM",
    description: "Understand the end-to-end flow of data from lead to renewal, and how all the pieces connect.",
    icon: "🔄",
    estimatedMinutes: 5,
    route: "/dashboard",
    steps: [
      {
        id: "wf-1",
        title: "The Complete Customer Lifecycle",
        content: "Understanding how data flows through the CRM is key to using it effectively. Every customer follows a lifecycle that the CRM is built to manage. Let's trace it from beginning to end.",
        targetSelector: null,
      },
      {
        id: "wf-2",
        title: "Step 1: Lead Intake",
        content: "A potential customer contacts your agency (phone call, walk-in, web form, referral). An agent searches the CRM to check if they already exist. If not, they click 'Add Customer' and enter their information. The customer is created with Account Type = 'Prospect' and a Source (Referral, Web, Walk-in, etc.) is recorded.",
        targetSelector: null,
      },
      {
        id: "wf-3",
        title: "Step 2: Quoting & Selling",
        content: "The agent gathers the prospect's information (vehicles, drivers, property details) and runs quotes with multiple carriers using external rater tools. The best quotes are logged in the Quotes/XDates tab. The agent presents options to the customer. If the customer accepts, the winning quote becomes a Policy — the agent creates the policy record with the carrier, policy number, dates, and premium.",
        targetSelector: null,
      },
      {
        id: "wf-4",
        title: "Step 3: Onboarding & Servicing",
        content: "After the policy is sold: the Account Type changes to 'Customer', payment is collected and logged in Pay History, documents are uploaded to Attachments (driver's license, signed application, declaration page), a welcome note is added, and onboarding tasks are created (welcome call, cross-sell review, referral ask). Smart Triggers send a welcome text automatically.",
        targetSelector: null,
      },
      {
        id: "wf-5",
        title: "Step 4: Ongoing Management",
        content: "Throughout the policy term: payments are collected monthly, notes log every customer interaction, tasks track follow-ups, endorsements (policy changes) are processed, claims are logged if the customer has an accident or loss. The customer's complete history builds up in their record — every tab accumulates data over time.",
        targetSelector: null,
      },
      {
        id: "wf-6",
        title: "Step 5: Renewal Cycle",
        content: "60-90 days before policy expiration, the system creates a renewal task. The agent contacts the customer, reviews their coverage, checks for rate increases, and possibly remarkets with other carriers. If renewed: a new policy term is created. If lost: the status changes to Expired and the reason is logged. Then the cycle repeats — every 6 or 12 months, for every policy, for every customer. This is why the CRM is critical — it ensures this never-ending cycle is managed consistently.",
        targetSelector: null,
      },
    ],
  },

  // ================================================================
  // MODULE 15: BEST PRACTICES & COMPLETION (7 steps)
  // ================================================================
  {
    id: "best-practices",
    title: "Best Practices & Daily Operations",
    description: "Common mistakes to avoid, your daily routine, and how to get the most out of the CRM.",
    icon: "🏆",
    estimatedMinutes: 5,
    route: "/dashboard",
    steps: [
      {
        id: "bp-1",
        title: "The Admin's Daily Routine",
        content: "Follow this routine every day for maximum agency control and productivity.",
        targetSelector: null,
        tips: [
          "8:00 AM — Log in, check Dashboard KPIs, scan for red flags",
          "8:15 AM — Review overdue tasks, reassign if producers are absent",
          "8:30 AM — Check internal chat for overnight messages",
          "9:00 AM — Quick check on producer leaderboard standings",
          "Throughout day — Monitor payments, handle escalations",
          "4:30 PM — Check that all offices are processing properly",
          "5:00 PM — Run End of Day report for each office",
          "5:15 PM — Post any announcements for tomorrow",
          "5:30 PM — Review tomorrow's calendar and task queue",
        ],
      },
      {
        id: "bp-2",
        title: "Top 10 Mistakes to Avoid",
        content: "These are the most common errors that damage CRM data quality and agency operations.",
        targetSelector: null,
        tips: [
          "1. Creating duplicate customers — ALWAYS search before adding",
          "2. Not logging notes — destroys institutional knowledge",
          "3. Ignoring overdue tasks — represents lost revenue",
          "4. Wrong role assignments — creates security/access issues",
          "5. Not updating policy status — makes reports inaccurate",
          "6. Skipping EOD reports — management loses visibility",
          "7. Not setting up Smart Triggers — manual reminders are unreliable",
          "8. Leaving Customer tags empty — cripples SMS campaign targeting",
          "9. Not assigning Agent of Record — creates orphan customers",
          "10. Deleting instead of deactivating users — loses audit history",
        ],
      },
      {
        id: "bp-3",
        title: "Cross-Selling Strategy",
        content: "Cross-selling is the highest-margin growth strategy. A customer with auto insurance is a warm lead for home, renters, umbrella, and life insurance. The CRM helps you identify these opportunities: look at each customer's policy list — if they only have one policy type, they're a cross-sell opportunity. Customers with multiple policies are 60% less likely to leave your agency.",
        targetSelector: null,
      },
      {
        id: "bp-4",
        title: "Retention Best Practices",
        content: "Keeping existing customers is cheaper than finding new ones. Here's how the CRM helps.",
        targetSelector: null,
        tips: [
          "Start renewal conversations 90 days before expiration",
          "Use payment reminder Smart Triggers to prevent cancellation",
          "Log every customer interaction as a Note — shows you care",
          "Review rate increases and proactively offer alternatives",
          "Send birthday and anniversary texts via SMS campaigns",
          "Cross-sell to increase policy count — multi-policy customers rarely leave",
          "Track and respond to all claims promptly",
        ],
      },
      {
        id: "bp-5",
        title: "Getting Help",
        content: "You always have resources available: the Help button (?) in the bottom-right opens the Training Center where you can replay any module. The Training page in the navigation brings you to the same place. The footer bar has Contact Support, Chat, and Email links. This training can be replayed as many times as needed.",
        targetSelector: null,
      },
      {
        id: "bp-6",
        title: "Training New Team Members",
        content: "When you hire new employees, direct them to this training system. It's designed to bring someone from zero knowledge to fully operational. Each role (Admin, Manager, Producer, CSR) should complete all modules relevant to their work. Consider requiring training completion within the first week of employment.",
        targetSelector: null,
        tips: [
          "Admins — complete ALL 15 modules",
          "Managers — modules 1-12 (skip Forms/Files details)",
          "Producers — modules 1-8, 10-11 (focus on customers, policies, tasks)",
          "CSRs — modules 1-5, 7, 11 (focus on customer service, payments)",
        ],
      },
      {
        id: "bp-7",
        title: "Training Complete!",
        content: "Congratulations — you've completed the comprehensive admin training. You now understand every major section of the CRM: navigation, dashboard, customer management, policies, payments, communications, reports, calendar, tasks, administration, forms, and workflows. You're equipped to manage this system for your entire agency. Remember: you can revisit any module anytime from the Help & Training center. Good luck!",
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
