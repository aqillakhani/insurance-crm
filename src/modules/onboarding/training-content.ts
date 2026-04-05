/**
 * COMPREHENSIVE TRAINING CONTENT
 * Every module, every section, every step — for complete beginners.
 * This is the full product training guide content.
 */

export interface TrainingStep {
  text: string;
  type?: "step" | "tip" | "warning" | "info";
}

export interface TrainingSection {
  id: string;
  title: string;
  content: string;
  steps?: TrainingStep[];
  proTips?: string[];
  mistakes?: string[];
  realWorld?: string;
}

export interface TrainingModule {
  id: string;
  title: string;
  description: string;
  icon: string;
  estimatedMinutes: number;
  sections: TrainingSection[];
}

export const TRAINING_MODULES: TrainingModule[] = [

  // ================================================================
  // MODULE 1: DASHBOARD
  // ================================================================
  {
    id: "dashboard",
    title: "Understanding Your Dashboard",
    description: "The Dashboard is the first screen you see after logging in. It's your daily command center — showing you everything that needs attention at a glance.",
    icon: "📊",
    estimatedMinutes: 15,
    sections: [
      {
        id: "dash-intro",
        title: "What Is the Dashboard?",
        content: "The Dashboard is the homepage of your CRM. Think of it as a morning briefing — it shows you the health of your entire agency in one screen. Every number, table, and section on this page is connected to real data from your customers, policies, payments, and team activity. You should check this page at the start of every workday.",
        realWorld: "Imagine you're a restaurant manager. Before the lunch rush, you check: how many reservations today, which staff is working, what ingredients are low, and what needs to be prepped. The Dashboard does the same thing for your insurance agency.",
      },
      {
        id: "dash-kpi-active-policies",
        title: "KPI: Active Policies",
        content: "This number shows how many insurance policies are currently 'in force' — meaning they are active and the customer is covered. This is your agency's core revenue metric because every active policy generates premium income and commission for your agency.",
        steps: [
          { text: "Look at the number displayed in the 'Active Policies' card at the top of the Dashboard", type: "step" },
          { text: "This number includes ALL active policies across ALL offices and ALL producers", type: "info" },
          { text: "If this number is going down, it means you're losing more policies than you're writing — investigate immediately", type: "warning" },
        ],
        proTips: [
          "Compare this number week over week — a growing number means the agency is healthy",
          "Divide Active Policies by Active Customers to get your 'policies per customer' ratio — higher is better",
          "A ratio above 1.5 means you're successfully cross-selling",
        ],
        realWorld: "If you have 2,847 active policies and 1,523 customers, your ratio is 1.87 — meaning on average each customer has nearly 2 policies with you. That's excellent cross-selling.",
      },
      {
        id: "dash-kpi-customers",
        title: "KPI: Active Customers",
        content: "This shows the total number of customer accounts that have a status of 'Active' in the system. A customer is considered active when they have at least one current policy. This is different from total customers — inactive and prospect accounts are not counted here.",
        steps: [
          { text: "Find the 'Active Customers' card — it's the second KPI card from the left", type: "step" },
          { text: "The subtitle shows context (e.g., 'Total accounts')", type: "info" },
          { text: "One customer can have multiple policies — so Active Customers is always less than or equal to Active Policies", type: "info" },
        ],
        mistakes: [
          "Don't confuse 'customers' with 'policies' — one customer might have 3 policies",
          "Don't count prospects as customers — they haven't purchased yet",
        ],
      },
      {
        id: "dash-kpi-tasks",
        title: "KPI: Open Tasks",
        content: "Tasks are action items that need to be completed by your team. This number shows how many tasks are currently pending (not yet done). The subtitle tells you how many are overdue — meaning past their due date. Overdue tasks are the most critical thing to address because they represent missed follow-ups, which directly impact revenue.",
        steps: [
          { text: "Check the 'Open Tasks' card — note both the main number and the overdue count", type: "step" },
          { text: "If the overdue count is high (more than 20% of open tasks), your team needs immediate attention", type: "warning" },
          { text: "Click the task list below to see details of each pending task", type: "step" },
        ],
        proTips: [
          "Set a goal: zero overdue tasks by end of each day",
          "Check which producers have the most overdue tasks — they may be overwhelmed or need coaching",
          "Auto-generated tasks (renewal reminders, payment follow-ups) count here too",
        ],
        realWorld: "If you have 156 open tasks and 42 are overdue, that means 42 customers haven't been contacted when they should have been. Each one is a potential lost policy.",
      },
      {
        id: "dash-kpi-quotes",
        title: "KPI: Pending Quotes",
        content: "This shows how many insurance quotes have been generated but haven't resulted in a sale yet. A quote is a price proposal from a carrier — when an agent runs quotes for a customer, those quotes sit in 'pending' status until the customer either accepts (becomes a policy) or declines. A high pending quotes number can mean opportunity or stalled sales.",
        proTips: [
          "Follow up on pending quotes within 48 hours — after that, the customer has likely moved on",
          "If quotes are pending for more than 7 days, they're probably dead — update their status",
          "Track which producers have the most pending quotes — they may need help closing",
        ],
      },
      {
        id: "dash-kpi-renewals",
        title: "KPI: Renewals Due (30 days)",
        content: "This is one of the most important numbers on the Dashboard. It shows how many policies are expiring within the next 30 days. Every one of these needs attention — if a policy expires without being renewed, you lose that customer's premium AND future commissions. Renewals are your agency's recurring revenue engine.",
        steps: [
          { text: "Check the 'Renewals Due' card — this is your 30-day warning system", type: "step" },
          { text: "Each renewal needs a producer to contact the customer, review coverage, and process the renewal", type: "info" },
          { text: "If a renewal has a significant rate increase, the producer should remarket with other carriers", type: "tip" },
        ],
        proTips: [
          "Start renewal outreach 90 days before expiration for best results",
          "The system can auto-create renewal tasks — make sure this is set up",
          "Track your renewal rate (renewals kept ÷ renewals due) — target 85%+",
        ],
        mistakes: [
          "Never wait until the expiration date to contact a customer about renewal",
          "Never assume a customer will renew on their own — always make the call",
        ],
      },
      {
        id: "dash-kpi-offices",
        title: "KPI: Offices",
        content: "Shows how many branch locations are active in the system. Your agency operates multiple offices (e.g., Montfort, Addison, Peachtree, Polk, Badestore). Each office has its own producers, customers, and performance metrics. The Office Overview section lower on the Dashboard shows customer counts per office.",
        realWorld: "If one office has 5 customers and another has 50, there's an imbalance. Either the small office needs more marketing support or its producers need coaching.",
      },
      {
        id: "dash-leaderboard",
        title: "Producer Leaderboard",
        content: "The leaderboard ranks your sales agents (called 'producers') by their performance. A producer is any employee whose job is to sell insurance policies. They find customers, run quotes, present options, close deals, and service accounts. The leaderboard shows how each producer compares to their peers.",
        steps: [
          { text: "Find the 'Producer Leaderboard' section on the left side of the Dashboard", type: "step" },
          { text: "Each row shows: rank (with medal icons for top 3), producer name, their office, policies sold, quotes generated, and task count", type: "info" },
          { text: "Click 'View Full Leaderboard →' at the bottom to see the detailed version with conversion rates and activity scores", type: "step" },
        ],
        proTips: [
          "Review this daily — it's the #1 accountability tool for sales management",
          "Compare producers within the same office for fair benchmarking",
          "A producer with lots of quotes but few policies needs closing help",
          "A producer with few quotes needs more leads or better time management",
          "Use the full leaderboard in weekly team meetings to drive competition",
        ],
        realWorld: "Producer A has 18 quotes and 12 policies (67% close rate). Producer B has 14 quotes and 4 policies (29% close rate). Same lead flow, very different results. Producer B needs coaching on their presentation or closing technique.",
      },
      {
        id: "dash-open-tasks",
        title: "Open Tasks List",
        content: "Below the leaderboard is a table showing individual pending tasks. Each row represents one action item that needs to be completed. This is where you see the details behind the 'Open Tasks' KPI number.",
        steps: [
          { text: "Read each row: Task description, Customer name, Priority level, Assigned producer, and Due date", type: "step" },
          { text: "Tasks in RED priority or with 'Overdue' due date need immediate action", type: "warning" },
          { text: "Click a task's customer name to jump directly to that customer's full record", type: "tip" },
        ],
        proTips: [
          "Sort mentally by priority: High + Overdue first, then High + Today, then Normal",
          "If you see tasks assigned to a producer who is absent, reassign them immediately",
          "Common task types: Follow-up (call customer back), Renewal (handle upcoming renewal), General (miscellaneous)",
        ],
      },
      {
        id: "dash-recent-payments",
        title: "Recent Payments",
        content: "The right side of the Dashboard shows the latest payment transactions processed across the agency. This is your real-time cash flow monitor. Each row shows a single payment with the customer, carrier, amount, and date.",
        steps: [
          { text: "Scan the 'Recent Payments' table on the right side of the Dashboard", type: "step" },
          { text: "Each row shows: Customer (who paid), Carrier (which insurance company), Amount (how much), Date (when)", type: "info" },
          { text: "Customer names in blue are clickable — they take you to that customer's full detail page", type: "tip" },
        ],
        proTips: [
          "Check this daily to verify payments are flowing correctly",
          "If you notice a day with no payments, investigate — there may be a processing issue",
          "Watch for unusually large or small amounts that might indicate errors",
        ],
      },
      {
        id: "dash-quick-actions",
        title: "Quick Actions",
        content: "Quick Action buttons are shortcuts to the most common tasks in the CRM. Instead of navigating through menus, you can jump directly to key functions with one click. These are especially useful when you need to act fast — like when a customer calls in.",
        steps: [
          { text: "'Add Customer' (green) — opens the new customer creation form. Use when a new lead calls in", type: "step" },
          { text: "'Search Customers' — opens the customer search page. Use when looking up an existing customer", type: "step" },
          { text: "'SMS Campaign' — opens the bulk text message tool. Use when you need to send mass communications", type: "step" },
          { text: "'Reports' — opens the reports hub. Use when you need data or analytics", type: "step" },
          { text: "'End Of Day' — opens the EOD report generator. Use at the end of every business day", type: "step" },
          { text: "'Calendar' — opens the appointment calendar. Use to check or schedule appointments", type: "step" },
        ],
        proTips: [
          "The 'Add Customer' button is also always available in the top navigation bar",
          "You'll use 'Search Customers' more than any other action — learn the keyboard shortcut if available",
        ],
      },
      {
        id: "dash-office-overview",
        title: "Office Overview",
        content: "At the bottom-right of the Dashboard is a table showing each branch office and its customer count. This tells you how your customer base is distributed across locations. An imbalanced distribution might mean some offices need more marketing support or staff.",
        realWorld: "If Montfort has 4 customers and Addison has 3, the workload is relatively balanced. But if one office has 50 and another has 2, you need to investigate why and potentially redistribute leads.",
      },
    ],
  },

  // ================================================================
  // MODULE 2: CALENDAR
  // ================================================================
  {
    id: "calendar",
    title: "Calendar & Appointment System",
    description: "The Calendar tracks all scheduled appointments for your producers. It shows who is meeting which customer, when, and what type of appointment it is.",
    icon: "📅",
    estimatedMinutes: 10,
    sections: [
      {
        id: "cal-intro",
        title: "What Is the Calendar?",
        content: "The Calendar page shows every scheduled appointment across your agency. Appointments are meetings between your producers (sales agents) and customers — they can be in-person, phone calls, or video meetings. The calendar helps you ensure producers are staying busy, customers are being served on time, and no meetings are missed.",
        realWorld: "Think of it like a doctor's office scheduling board. You can see at a glance: who has appointments today, what time, with which patient, and what the appointment is for. Except instead of patients, you have insurance customers.",
      },
      {
        id: "cal-views",
        title: "Calendar Views: Day, Week, Month",
        content: "At the top-right of the Calendar page, you'll see three view buttons: Day, Week, and Month. Each shows the same appointments but at different zoom levels.",
        steps: [
          { text: "Click 'Day' to see all appointments for a single day in detail — best for managing today's schedule", type: "step" },
          { text: "Click 'Week' to see the full week at a glance — best for planning and balancing workload", type: "step" },
          { text: "Click 'Month' to see the big picture — best for spotting busy periods and scheduling future appointments", type: "step" },
        ],
        proTips: [
          "Start each morning in Day view to see what's happening today",
          "Switch to Week view on Monday mornings to plan the entire week",
          "Use Month view at the start of each month to identify slow periods for marketing pushes",
        ],
      },
      {
        id: "cal-kpis",
        title: "Calendar KPIs — Measuring Appointment Effectiveness",
        content: "Four metrics at the top of the Calendar page measure how effective your appointment-based selling is. These numbers tell you whether appointments are actually converting to revenue.",
        steps: [
          { text: "'Appointments Today' — how many meetings are scheduled for today. If this is zero, producers need more leads", type: "info" },
          { text: "'This Week' — total appointments for the current week. Benchmark: each producer should have 3-5 per day", type: "info" },
          { text: "'Show Rate' — percentage of scheduled appointments where the customer actually showed up. Target: 80%+", type: "info" },
          { text: "'Close Rate' — percentage of appointments that resulted in a sold policy. Target: 30%+", type: "info" },
        ],
        proTips: [
          "Low show rate? Your producers need to send appointment reminder texts 24 hours and 1 hour before",
          "Low close rate? Producers may need sales training or the leads may be poor quality",
          "Track these weekly to spot trends — a declining show rate often means confirmation calls aren't happening",
        ],
        mistakes: [
          "Don't ignore a 50% show rate — that means half your appointments are wasted time slots",
          "Don't celebrate lots of appointments if the close rate is below 20% — volume without conversion is just busy-work",
        ],
      },
      {
        id: "cal-creating",
        title: "Creating a New Appointment",
        content: "To schedule a new appointment, click the '+ New Appointment' button at the top-right of the Calendar page. This opens a form where you'll enter all the details.",
        steps: [
          { text: "Click '+ New Appointment' (green button, top-right)", type: "step" },
          { text: "Select the customer (search by name or ID)", type: "step" },
          { text: "Choose the producer who will handle the appointment", type: "step" },
          { text: "Set the date and time", type: "step" },
          { text: "Select the appointment type (Quote Review, Renewal, Initial Call, Policy Review, Claim Follow-up)", type: "step" },
          { text: "Add any notes about what should be discussed", type: "step" },
          { text: "Click Save to confirm the appointment", type: "step" },
        ],
        proTips: [
          "Always set the appointment type — it helps with reporting and preparation",
          "Block 30-minute time slots minimum — rushing appointments leads to mistakes",
          "Schedule a follow-up appointment before ending the current one",
        ],
      },
      {
        id: "cal-today-sidebar",
        title: "Today's Schedule Sidebar",
        content: "On the right side of the Calendar page, you'll see a focused list of today's appointments in chronological order. Each entry shows: the time, customer name, appointment type, and which producer is assigned. This is the 'at a glance' view that producers should check every morning.",
        proTips: [
          "Have each producer review their sidebar schedule at the start of their shift",
          "If a producer has back-to-back appointments, make sure they have prep time between them",
          "No-shows should be called within 30 minutes to reschedule",
        ],
      },
      {
        id: "cal-connection",
        title: "How Calendar Connects to Other CRM Features",
        content: "The Calendar doesn't exist in isolation — it's connected to the entire CRM. Understanding these connections helps you use it effectively.",
        steps: [
          { text: "Calendar → Customers: Every appointment is linked to a customer record. Click the customer name to see their full details", type: "info" },
          { text: "Calendar → Tasks: Appointments can generate follow-up tasks (e.g., 'Send quote after meeting')", type: "info" },
          { text: "Calendar → Reports: Appointment data feeds into the producer leaderboard show/close rates", type: "info" },
          { text: "Calendar → SMS: Appointment reminders can be sent automatically via Smart Triggers", type: "info" },
        ],
      },
    ],
  },

  // ================================================================
  // MODULE 3: CUSTOMER MANAGEMENT
  // ================================================================
  {
    id: "customers",
    title: "Customer Management — The Heart of the CRM",
    description: "Customers are the foundation of everything in the CRM. Every policy, payment, task, note, and communication connects to a customer record.",
    icon: "👥",
    estimatedMinutes: 20,
    sections: [
      {
        id: "cust-what",
        title: "What Is a Customer Record?",
        content: "A customer record is a digital file containing everything about a person or business that your agency serves. It includes their personal information (name, address, phone, email), their insurance policies, payment history, notes from conversations, documents, quotes, tasks, and more. Every interaction with a customer should be logged in their record so any agent can pick up where someone else left off.",
        realWorld: "Think of a customer record like a patient chart at a hospital. When you walk into the ER, the doctor pulls your chart and can see your entire medical history — allergies, past surgeries, medications, recent visits. The customer record in the CRM works the same way for insurance.",
      },
      {
        id: "cust-searching",
        title: "Finding a Customer — The Search System",
        content: "The Customer Search page is the gateway to all customer records. You'll use this page dozens of times per day. It has a search bar at the top and a results table below.",
        steps: [
          { text: "Click 'Customers' in the search page or navigate to the Customers page from the navigation", type: "step" },
          { text: "In the search bar, type any of: first name, last name, phone number, email, or Customer ID", type: "step" },
          { text: "The search starts automatically after you stop typing (400ms delay) — or press Enter for instant results", type: "step" },
          { text: "Review the results table — click any Customer ID or Name (in blue) to open their full record", type: "step" },
          { text: "Click 'Clear' to reset the search and show all customers", type: "step" },
        ],
        proTips: [
          "Phone number search is the most reliable — names can be misspelled",
          "ALWAYS search before creating a new customer to avoid duplicates",
          "You can search partial matches — typing 'Gar' will find 'Garcia'",
        ],
        mistakes: [
          "Don't just search by first name — 'John' will return too many results. Use last name or phone",
          "Don't create a new customer without searching first — duplicates cause data problems that are hard to fix",
        ],
      },
      {
        id: "cust-reading-table",
        title: "Reading the Customer Table",
        content: "The search results appear in a table with alternating white and green rows (for easy reading). Each column gives you key information at a glance.",
        steps: [
          { text: "Customer ID — unique number identifying this customer. Click it to open their record", type: "info" },
          { text: "Name — displayed as 'Last, First'. Click to open record", type: "info" },
          { text: "Type — 'Personal Lines' (individual/family) or 'Commercial Lines' (business)", type: "info" },
          { text: "Status — 'Active' (green) means they have current policies. 'Inactive' means no active policies", type: "info" },
          { text: "Email — their email address (if on file)", type: "info" },
          { text: "Cell — their cell phone (most important for SMS)", type: "info" },
          { text: "Office — which branch location manages this customer", type: "info" },
          { text: "Agent of Record — the producer (sales agent) responsible for this customer", type: "info" },
          { text: "Policies — how many active policies they have. Higher = more revenue from this customer", type: "info" },
          { text: "Date Added — when this customer was first entered into the system", type: "info" },
        ],
      },
      {
        id: "cust-creating",
        title: "Adding a New Customer — Step by Step",
        content: "When a new person contacts your agency (by phone, walk-in, web form, or referral), the first step is always to create their customer record. Here's exactly how to do it.",
        steps: [
          { text: "STEP 1: Click the green 'Add Customer' button (in the top navigation bar or on the Customer Search page)", type: "step" },
          { text: "STEP 2: Enter First Name and Last Name (REQUIRED — marked with red *). The system automatically converts names to UPPERCASE", type: "step" },
          { text: "STEP 3: Enter their address — street, city, state, zip code. This is used for insurance rating", type: "step" },
          { text: "STEP 4: Enter at least one phone number. Cell phone is most important for SMS campaigns", type: "step" },
          { text: "STEP 5: Enter their email address if available. Format is validated automatically", type: "step" },
          { text: "STEP 6: Set Customer Type — 'Personal Lines' for individuals, 'Commercial Lines' for businesses", type: "step" },
          { text: "STEP 7: Set the Source — how did they find you? (Referral, Walk-in, Phone, Web, Social Media)", type: "step" },
          { text: "STEP 8: Enter Date of Birth — needed for auto insurance rating", type: "step" },
          { text: "STEP 9: Set Communication Preferences — if the customer says 'don't text me', set Do Not Text to 'Yes'", type: "step" },
          { text: "STEP 10: Add any Comments in the free-text field at the bottom", type: "step" },
          { text: "STEP 11: Click 'Save Customer' — the system validates fields and creates the record", type: "step" },
          { text: "STEP 12: You'll be redirected to the new customer's detail page where you can add policies, notes, etc.", type: "step" },
        ],
        proTips: [
          "Always verify the phone number by reading it back to the customer",
          "Track the Source accurately — this data tells you which marketing channels work",
          "Set communication preferences immediately — violating 'Do Not Call' has legal consequences",
          "Add a Comment like 'Quoted auto $200/mo, will call back Thursday' so other agents know the context",
        ],
        mistakes: [
          "NEVER skip the search step — creating a duplicate customer causes data chaos",
          "NEVER leave the Agent of Record blank — orphan customers fall through the cracks",
          "NEVER enter fake data to 'fill in later' — it corrupts reports and can trigger bad SMS campaigns",
        ],
      },
      {
        id: "cust-detail-overview",
        title: "The Customer Detail Page — Your 360° View",
        content: "When you click on any customer, you see their full detail page. This is the most important screen in the CRM. It shows absolutely everything about that customer in one place. The page has two sections: the header (customer information) at the top, and 11 tabs below covering every aspect of their relationship with your agency.",
        steps: [
          { text: "TOP LEFT: Personal info — name, address, phones, email, language, SSN", type: "info" },
          { text: "TOP RIGHT: Account info — Customer ID, type, status, Agent of Record, source, DOB, DL info, Do Not flags", type: "info" },
          { text: "MIDDLE: Comments (green text), Customer Relationships, Customer Tags", type: "info" },
          { text: "BOTTOM: 11 tabs — Policies, Finance, Tasks, Notes, Roles, Pay History, Attachments, Quotes/XDates, HH Members, Claims, Diary", type: "info" },
          { text: "TOP RIGHT: 'Tools' button — dropdown with quick actions (Add Policy, Add Note, ACORD Forms, etc.)", type: "info" },
        ],
      },
      {
        id: "cust-policies-tab",
        title: "Policies Tab — Insurance Policies This Customer Has",
        content: "The Policies tab shows every insurance policy associated with this customer. This is where you see what coverage they have, which carriers they're with, and when their policies expire. Each row is one policy.",
        steps: [
          { text: "Company — the insurance carrier (e.g., Venture Insurance, The General, Progressive)", type: "info" },
          { text: "Status — Active (green, currently in force), Cancelled, Expired, Pending", type: "info" },
          { text: "Type — New Business (first-time sale) or Renewal (continued from previous term)", type: "info" },
          { text: "Class — type of insurance: AUTO, HOME, RENTERS, LIFE, COMMERCIAL", type: "info" },
          { text: "Policy — the policy number assigned by the carrier (unique identifier)", type: "info" },
          { text: "Eff Date / Exp Date — when coverage starts and when it ends", type: "info" },
          { text: "Premium — the total price of the policy", type: "info" },
          { text: "Edit / Details / Change Status — action buttons on each row", type: "info" },
        ],
      },
      {
        id: "cust-notes-tab",
        title: "Notes Tab — Communication Log",
        content: "The Notes tab is your record of every interaction with this customer. Every phone call, email, conversation, decision, and important detail should be logged here. Notes create an audit trail that protects both the agency and the customer.",
        steps: [
          { text: "Click the Notes tab — the number in parentheses shows how many notes exist", type: "step" },
          { text: "Click '+ Add Note' to create a new note", type: "step" },
          { text: "Type your note content — be specific and professional", type: "step" },
          { text: "Click 'Save Note' — the note is saved with your name and timestamp", type: "step" },
          { text: "Notes are displayed newest-first so you always see the most recent activity at the top", type: "info" },
        ],
        proTips: [
          "Log EVERY customer interaction — even 'left voicemail, no answer'",
          "Use specific details: 'Quoted auto at $200/mo with Progressive, customer will decide by Friday' not 'called customer'",
          "Notes are permanent — they can never be deleted. Write professionally",
          "The action bar also has: Email Blast and Text Blast to send mass communications from this customer's record",
        ],
        realWorld: "Six months from now, a different agent picks up this customer's renewal. They look at the Notes tab and see: the quote history, what the customer's concerns were, what they were promised, and how to handle the renewal. Without notes, they're starting from zero.",
      },
      {
        id: "cust-payhistory-tab",
        title: "Pay History Tab — Payment Records",
        content: "Every payment this customer has ever made is logged here. You can see receipts, amounts, dates, which policy was paid, and which office processed it. This is essential for resolving billing disputes, verifying payment patterns, and identifying customers who may be at risk of cancellation due to non-payment.",
        steps: [
          { text: "Receipt#/Ref — unique transaction identifier", type: "info" },
          { text: "Office — which branch processed this payment", type: "info" },
          { text: "Company — which carrier the payment was for", type: "info" },
          { text: "Policy — which policy number was paid", type: "info" },
          { text: "Amount Billed vs Amount Tendered — what was owed vs what was paid. These should match", type: "info" },
          { text: "Date — when the payment was processed", type: "info" },
        ],
        mistakes: [
          "If Billed and Tendered don't match, investigate immediately — this could be an error or partial payment",
          "Never modify payment records without proper authorization",
        ],
      },
      {
        id: "cust-attachments-tab",
        title: "Attachments Tab — Documents",
        content: "The Attachments tab stores all documents related to this customer: driver's licenses, signed applications, declaration pages, ID cards, photos, and any other files. Each attachment is linked to a specific policy and carrier. You can upload new files, email them, fax them, or pin important ones to the top.",
        steps: [
          { text: "Click 'Add Attachment' to upload a new file", type: "step" },
          { text: "Click 'Scan Now' to scan a physical document directly", type: "step" },
          { text: "Each attachment shows: Policy, Carrier, File Name, Type, Description, who added it, and when", type: "info" },
          { text: "Action icons per row: Email (send to customer), Fax, Pin (mark important), Edit, Delete", type: "info" },
        ],
        proTips: [
          "Upload the declaration page (dec page) for every new policy — it's the proof of coverage",
          "Always upload a copy of the customer's driver's license for auto policies",
          "Pin important documents (like signed applications) so they appear at the top",
        ],
      },
      {
        id: "cust-remaining-tabs",
        title: "Remaining Tabs: Quotes, Tasks, Finance, HH Members, Claims, Roles, Diary",
        content: "The customer detail page has 11 tabs total. Here's what each remaining tab does.",
        steps: [
          { text: "Quotes/XDates — price proposals from different carriers + competitor policy expiration dates for prospecting", type: "info" },
          { text: "Tasks — follow-up action items assigned to producers for this customer (call back, send docs, etc.)", type: "info" },
          { text: "Finance — commission and fee tracking for this customer's policies", type: "info" },
          { text: "HH Members — household members (spouse, children, other drivers) linked to this customer", type: "info" },
          { text: "Claims — insurance claims filed on this customer's policies (accidents, property damage, etc.)", type: "info" },
          { text: "Roles — which agents are assigned to service this customer's different policies", type: "info" },
          { text: "Diary — chronological log of important dates and events for this customer", type: "info" },
        ],
        proTips: [
          "Use HH Members to identify cross-sell opportunities — if a spouse doesn't have a policy, that's a lead",
          "The Claims tab is critical for renewals — past claims affect future premium rates",
          "XDates (expiration dates) of competitor policies tell you exactly when to call a prospect",
        ],
      },
      {
        id: "cust-tools-panel",
        title: "The Tools Panel — Quick Actions",
        content: "On the customer detail page, the 'Tools' button in the top-right opens a dropdown with shortcut actions. These let you perform common operations without navigating to different tabs.",
        steps: [
          { text: "Click the 'Tools ▼' button in the title bar of the customer detail page", type: "step" },
          { text: "'ACORD/Custom Forms' — opens insurance forms pre-filled with this customer's data", type: "info" },
          { text: "'Add New Policy' — opens the policy creation form linked to this customer", type: "info" },
          { text: "'Add Note' — quickly log a note without switching to the Notes tab", type: "info" },
          { text: "'Thank You Letter' — generates a branded thank-you letter for this customer", type: "info" },
          { text: "'Add Change Request' — submit a policy change (endorsement) for processing", type: "info" },
          { text: "'Mailing Services' — send physical mail to this customer", type: "info" },
          { text: "'Custom Letter' — select from pre-made letter templates", type: "info" },
        ],
      },
      {
        id: "cust-workflow",
        title: "The Complete Customer Workflow",
        content: "Here's how the full lifecycle works from start to finish. Understanding this workflow is the key to mastering the CRM.",
        steps: [
          { text: "1. LEAD INTAKE: Customer contacts your agency → Search CRM → Create new customer record", type: "step" },
          { text: "2. QUOTING: Gather info → Run quotes with carriers → Log quotes in Quotes tab", type: "step" },
          { text: "3. SELLING: Present options → Customer accepts → Create Policy record", type: "step" },
          { text: "4. ONBOARDING: Collect payment → Upload documents → Send welcome text → Create follow-up tasks", type: "step" },
          { text: "5. SERVICING: Handle changes → Process endorsements → Log notes → Answer questions", type: "step" },
          { text: "6. RENEWAL: 60-90 days before expiration → Contact customer → Review coverage → Renew or remarket", type: "step" },
          { text: "7. REPEAT: The cycle continues every policy term (6 or 12 months)", type: "step" },
        ],
        realWorld: "Maria calls your office. An agent searches the CRM — she's not in the system. They click 'Add Customer', enter her info (source: Phone call). Run auto quotes with 5 carriers. Log the quotes. Maria picks Progressive at $180/month. Agent creates the Policy, collects first payment, uploads her license and signed app. System auto-sends a welcome text. A task is created: 'Follow up in 2 weeks for home insurance quote.' Six months later, a renewal task auto-generates. The agent calls Maria, reviews her rate, and renews the policy. The cycle continues for years.",
      },
    ],
  },

  // ================================================================
  // MODULE 4: COMMUNICATIONS
  // ================================================================
  {
    id: "communications",
    title: "Communications — SMS, Chat & Messaging",
    description: "The CRM's communication tools let you reach customers via text, coordinate with your team via chat, and post company-wide announcements.",
    icon: "💬",
    estimatedMinutes: 12,
    sections: [
      {
        id: "comms-overview",
        title: "Communication Tools Overview",
        content: "The 'Comms' dropdown in the navigation bar gives you four powerful tools: SMS Campaigns (send bulk texts to groups of customers), Text Inbox (2-way text messaging with individual customers), Internal Chat (team communication with branch channels), and Announcements (company-wide notices). Together, these replace the need for separate texting apps, Slack/Teams, and email blasts.",
      },
      {
        id: "comms-sms-campaign",
        title: "Running an SMS Campaign — Step by Step",
        content: "SMS Campaigns let you send the same text message to hundreds or thousands of customers at once. They're targeted by Tags — labels you attach to customer records. For example, tagging all customers with expiring policies as 'Renewal Due', then sending them all a renewal reminder text.",
        steps: [
          { text: "STEP 1: Navigate to Comms → SMS Campaigns", type: "step" },
          { text: "STEP 2: Enter a Campaign Name (e.g., 'April Renewal Reminders')", type: "step" },
          { text: "STEP 3: Select Target Audience by Tag — this determines who receives the message", type: "step" },
          { text: "Tags available: Renewal Due, Payment Overdue, New Customers, Auto Policy Holders, All Active", type: "info" },
          { text: "STEP 4: Write your message. Use personalization variables: {firstName}, {lastName}, {policyNumber}, {expirationDate}, {amountDue}", type: "step" },
          { text: "STEP 5: Choose Schedule — 'Send Now' for immediate delivery, or 'Schedule for Later' with a date/time", type: "step" },
          { text: "STEP 6: Click 'Preview' to see how the message will look with real customer data", type: "step" },
          { text: "STEP 7: Click 'Send Campaign' to deliver the messages", type: "step" },
        ],
        proTips: [
          "Always preview before sending — check that variables substitute correctly",
          "Send during business hours (9am-6pm) for best response rates",
          "Keep messages under 160 characters when possible — avoids splitting into multiple SMS",
          "Include your agency phone number so customers can call back",
          "Track response rates — a good campaign gets 20-40% responses",
        ],
        mistakes: [
          "NEVER send campaigns to customers with 'Do Not Text' = Yes — the system blocks this automatically",
          "Don't send more than 2 campaigns per week to the same group — customers will opt out",
          "Don't use ALL CAPS — it looks like spam",
        ],
        realWorld: "Example message: 'Hi {firstName}, your auto policy renewal is coming up on {expirationDate}. We want to make sure you have the best rate. Call us at (214) 555-0100 or reply RENEW to schedule a review. - City Auto Insurance'",
      },
      {
        id: "comms-smart-triggers",
        title: "Smart Triggers — Automated Messages",
        content: "Smart Triggers are pre-configured automated messages that send without any manual intervention. You set them up once, and they fire automatically when certain events occur. This is one of the most valuable features in the CRM because it ensures critical communications happen even when agents are busy.",
        steps: [
          { text: "Payment Due — 7 days: Sends a gentle reminder a week before payment is due", type: "info" },
          { text: "Payment Due — 2 days: Sends an urgent reminder 2 days before", type: "info" },
          { text: "Payment Due — Same day: Final notice on the due date", type: "info" },
          { text: "Missed Payment: Escalation notice after payment was missed", type: "info" },
          { text: "Welcome New Customer: Automated welcome text after a new customer is created", type: "info" },
          { text: "Renewal — 30 days: Heads-up that their policy renewal is approaching", type: "info" },
        ],
        proTips: [
          "Set up ALL triggers on day one — they work 24/7 automatically",
          "Each trigger can be paused independently if needed",
          "Monitor the 'Sent (MTD)' column to see how many auto-messages went out this month",
          "Payment reminder triggers alone can reduce late payments by 30-40%",
        ],
      },
      {
        id: "comms-text-inbox",
        title: "Text Inbox — 2-Way Messaging",
        content: "The Text Inbox is like iMessage or WhatsApp built into the CRM. It shows all text conversations between your agency and individual customers. Agents can send and receive text messages directly within the CRM without using their personal phones.",
        steps: [
          { text: "Navigate to Comms → Text Inbox", type: "step" },
          { text: "The LEFT panel shows all conversations, sorted by most recent. Unread messages are highlighted in blue", type: "info" },
          { text: "Click a conversation to see the full message thread on the RIGHT", type: "step" },
          { text: "Type your reply in the text box at the bottom and click 'Send'", type: "step" },
          { text: "Use the search bar to find conversations by customer name", type: "tip" },
        ],
        proTips: [
          "Respond to customer texts within 15 minutes during business hours",
          "Keep messages professional — they're part of the business record",
          "If a customer requests a call back, create a Task to follow up",
        ],
      },
      {
        id: "comms-internal-chat",
        title: "Internal Chat — Team Communication",
        content: "Internal Chat lets your team communicate without leaving the CRM. It's organized into channels — one per branch office plus general and announcements channels. Use @mentions to tag specific people.",
        steps: [
          { text: "Navigate to Comms → Internal Chat", type: "step" },
          { text: "Select a channel from the left panel (e.g., #general, #montfort, #peachtree)", type: "step" },
          { text: "Type your message and click Send. Use @name to mention someone specific", type: "step" },
          { text: "Unread message counts appear as red badges on channel names", type: "info" },
        ],
        proTips: [
          "Use branch channels for location-specific issues",
          "Use #general for company-wide discussions",
          "Use @mentions when you need a specific person's attention",
          "Check internal chat at the start and end of every day",
        ],
      },
      {
        id: "comms-announcements",
        title: "Announcements — Company-Wide Notices",
        content: "The Announcements page is for official company-wide communications. Only admins and managers can post. Posts can be pinned to stay at the top. All employees see these when they check the Announcements page.",
        steps: [
          { text: "Navigate to Comms → Announcements", type: "step" },
          { text: "Click 'New Announcement' to create a post", type: "step" },
          { text: "Enter a title and content. Pin important announcements so they stay at the top", type: "step" },
        ],
        realWorld: "Use announcements for: quarterly production goals, new carrier appointments, system maintenance notices, policy changes, training reminders, and team celebrations.",
      },
    ],
  },

  // ================================================================
  // MODULE 5: REPORTS & EOD
  // ================================================================
  {
    id: "reports",
    title: "Reports & End of Day",
    description: "The reporting system gives you data-driven insights into every aspect of your agency's operations. The End of Day report is your daily closing routine.",
    icon: "📈",
    estimatedMinutes: 10,
    sections: [
      {
        id: "rep-hub",
        title: "The Reports Hub — 50+ Reports",
        content: "The Reports page is organized as a mega-menu with categories. At the top is a 'Favorites' section for your most-used reports. Below that, the 'General' section contains every available report grouped by business function: Mobile Reports, Owner Reports, Download Reports, Marketing, Employee/Broker, Imports/Exports, Setup, Auditing, Tracking, and more.",
        steps: [
          { text: "Navigate to Reports in the top navigation bar", type: "step" },
          { text: "Browse the categories — each blue link opens a specific report", type: "step" },
          { text: "Use the Favorites tabs at the top (Employee Overview, End Of Day, Owner Overview, Tasks) for quick access to common reports", type: "step" },
        ],
      },
      {
        id: "rep-key-reports",
        title: "Key Reports You Should Know",
        content: "While there are 50+ reports available, here are the ones you'll use most frequently as an admin.",
        steps: [
          { text: "End of Day — daily summary of all activity. Run EVERY day at close of business", type: "info" },
          { text: "Production Summary — total output per producer (policies written, premium, commissions)", type: "info" },
          { text: "Producer Leaderboard — detailed ranking with conversion rates and activity scores", type: "info" },
          { text: "Fee Commissions — commission earned per policy per producer", type: "info" },
          { text: "Written Premium — total premium written by period (your revenue metric)", type: "info" },
          { text: "Cross Selling — identifies customers with single policies who could buy more", type: "info" },
          { text: "Activity Logging — audit trail of who did what in the system", type: "info" },
          { text: "Export Customers — download your customer list as a file for external use", type: "info" },
        ],
      },
      {
        id: "rep-eod-detail",
        title: "End of Day Report — Your Daily Closing Routine",
        content: "The End of Day (E.O.D.) report is the single most important daily report. It summarizes everything that happened during the business day: policies written, payments collected, customers added, tasks completed, and more. Running this report at the end of every day is non-negotiable for proper agency management.",
        steps: [
          { text: "STEP 1: Click 'E.O.D.' in the navigation bar (shortcut) or go to Reports → End Of Day", type: "step" },
          { text: "STEP 2: Select the Structure — Territory, Division, Region, District, and Office. Start with 'All' for the full picture", type: "step" },
          { text: "STEP 3: Select Customer Type — 'All' or filter to Personal/Commercial lines", type: "step" },
          { text: "STEP 4: Select Employee — 'All Employees' or filter to a specific producer", type: "step" },
          { text: "STEP 5: Set Date Range — usually today's date for both Start and End", type: "step" },
          { text: "STEP 6: Click 'Run Report' — the system generates the summary", type: "step" },
        ],
        proTips: [
          "Run EOD at 5:00 PM every day — make this a non-negotiable routine",
          "Run for 'All Offices' first, then drill into specific offices if you see issues",
          "Compare today's EOD with last week's same day to spot trends",
          "Save/export important EOD reports for monthly management reviews",
        ],
        realWorld: "It's 5:15 PM on a Tuesday. You run the EOD for all offices. You see: Montfort wrote 3 policies and collected $2,400. Peachtree wrote 1 policy and collected $800. Polk wrote 0 policies. You now know to check in with the Polk office manager about what happened today.",
      },
      {
        id: "rep-leaderboard-detail",
        title: "Producer Leaderboard — Full Detail",
        content: "The full leaderboard (accessed from Reports → Producer Leaderboard or from the Dashboard link) shows comprehensive performance metrics for every producer. This is your primary tool for sales management and accountability.",
        steps: [
          { text: "Rank — position based on overall performance", type: "info" },
          { text: "Calls Made — outbound calls logged by the producer", type: "info" },
          { text: "Quotes Done — insurance quotes generated for customers", type: "info" },
          { text: "Policies Sold — policies successfully bound (this is the key number)", type: "info" },
          { text: "Follow-ups — follow-up tasks completed", type: "info" },
          { text: "Missed Tasks — tasks that went overdue (bad sign)", type: "info" },
          { text: "Written Premium — total dollar amount of premium written", type: "info" },
          { text: "Conversion Rate — quotes that turned into policies (close rate)", type: "info" },
          { text: "Activity Score — composite 0-100 score combining all metrics", type: "info" },
        ],
        proTips: [
          "Filter by time period (This Month, Last Month, Quarter, Year) using the dropdown",
          "Filter by office to compare producers within the same location",
          "Red missed task counts indicate producers who need accountability coaching",
          "Activity Score above 80 = strong performer. Below 50 = needs intervention",
        ],
      },
    ],
  },

  // ================================================================
  // MODULE 6: ADMIN SETTINGS
  // ================================================================
  {
    id: "admin",
    title: "Administration & System Settings",
    description: "Admin controls let you manage users, offices, roles, carriers, and system-wide configuration. Only admin-role users can access these features.",
    icon: "⚙️",
    estimatedMinutes: 8,
    sections: [
      {
        id: "admin-overview",
        title: "Admin Hub",
        content: "The Admin section is accessed from the 'Admin' dropdown in the navigation bar. It contains four areas: User Management (employee accounts and permissions), Office Management (branch structure), Carrier Management (insurance companies), and System Settings (agency-wide configuration). As an admin, you are responsible for keeping all of these properly configured.",
      },
      {
        id: "admin-users",
        title: "User Management — Creating and Managing Employee Accounts",
        content: "Every person who uses the CRM needs a user account. Each account has: an email (login), a name, a role (determines permissions), and an assigned office (determines data visibility).",
        steps: [
          { text: "STEP 1: Go to Admin → User Management", type: "step" },
          { text: "STEP 2: Click 'Add User' to create a new account", type: "step" },
          { text: "STEP 3: Enter their email address (this becomes their login)", type: "step" },
          { text: "STEP 4: Enter their first and last name", type: "step" },
          { text: "STEP 5: Assign a Role — Admin, Manager, Producer, or CSR", type: "step" },
          { text: "STEP 6: Assign an Office — which branch they work at", type: "step" },
          { text: "STEP 7: Save — login credentials are sent to their email", type: "step" },
        ],
        proTips: [
          "Create accounts BEFORE the employee's first day so they can log in immediately",
          "When an employee leaves, DEACTIVATE their account — never delete it (you'll lose audit history)",
          "Review user accounts quarterly to clean up inactive accounts",
        ],
      },
      {
        id: "admin-roles",
        title: "Understanding User Roles",
        content: "Roles control what each user can see and do in the CRM. Assigning the correct role is critical for security, data privacy, and proper workflow. There are four built-in roles.",
        steps: [
          { text: "ADMIN — Full access to everything. Can manage users, settings, all data, all reports. For agency owners and IT admins only", type: "info" },
          { text: "MANAGER — Can see all data for their office/team. Can run reports, reassign tasks, manage their producers. Cannot manage users or system settings", type: "info" },
          { text: "PRODUCER — Can only see their own customers, policies, and tasks. Cannot see other producers' data. This is for sales agents", type: "info" },
          { text: "CSR (Customer Service Rep) — Can view and edit all customer records for servicing. Limited report access. No commission data visibility", type: "info" },
        ],
        mistakes: [
          "Never give Admin access to producers — they could accidentally change system settings",
          "Never give CSRs access to commission data unless specifically authorized",
          "Always assign the minimum role needed — you can always upgrade later",
        ],
      },
      {
        id: "admin-offices",
        title: "Office & Branch Management",
        content: "Your agency's office structure is organized in a hierarchy: Territory → Division → Region → District → Office. This hierarchy powers the reporting system, data filtering, and multi-location management. Each user and customer is assigned to a specific office.",
        steps: [
          { text: "Your current offices: MONTFORT, ADDISON/CPT, PEACHTREE, POLK, BADESTORE", type: "info" },
          { text: "Each office should have at least one Manager and one or more Producers", type: "info" },
          { text: "When you open a new branch, add it in Admin → Office Management", type: "info" },
          { text: "Customers are assigned to offices — this determines which branch 'owns' the relationship", type: "info" },
        ],
        proTips: [
          "Keep office names short and recognizable — they appear in tables and reports",
          "Every customer must have an assigned office for reports to work correctly",
          "EOD reports use this hierarchy — inaccurate office setup = inaccurate reports",
        ],
      },
      {
        id: "admin-carriers",
        title: "Carrier Management",
        content: "Carriers are the insurance companies your agency is appointed with. The CRM needs to know which carriers you work with so that policies, quotes, and commissions can be tracked correctly.",
        steps: [
          { text: "Current carriers include: Venture Insurance, Alpha Rts, The General, Progressive, State Auto, SafePoint, Nationwide, Allstate", type: "info" },
          { text: "Each carrier has: a name, code, lines of business offered, commission rates, and portal URL", type: "info" },
          { text: "When you get appointed with a new carrier, add it here so producers can log quotes and policies", type: "info" },
        ],
      },
      {
        id: "admin-checklist",
        title: "Admin Daily/Weekly Checklist",
        content: "As the system administrator, here's your complete responsibility checklist to keep the CRM running smoothly.",
        steps: [
          { text: "DAILY: Check Dashboard KPIs for red flags", type: "step" },
          { text: "DAILY: Review overdue tasks and escalate as needed", type: "step" },
          { text: "DAILY: Check internal chat for team issues", type: "step" },
          { text: "DAILY: Verify End of Day reports were run for all offices", type: "step" },
          { text: "WEEKLY: Review producer leaderboard in team meeting", type: "step" },
          { text: "WEEKLY: Check that Smart Triggers are running correctly", type: "step" },
          { text: "WEEKLY: Review any new customer accounts for data quality", type: "step" },
          { text: "MONTHLY: Run production and commission reports for management", type: "step" },
          { text: "MONTHLY: Review and deactivate any inactive user accounts", type: "step" },
          { text: "QUARTERLY: Full office and carrier audit — is everything up to date?", type: "step" },
        ],
      },
    ],
  },
];

export function getTrainingTotalSections(): number {
  return TRAINING_MODULES.reduce((sum, m) => sum + m.sections.length, 0);
}

export function getTrainingTotalMinutes(): number {
  return TRAINING_MODULES.reduce((sum, m) => sum + m.estimatedMinutes, 0);
}
