# insurance-crm

Multi-tenant CRM for insurance agencies to manage customers, policies, quotes, claims, and team workflows.

**Live demo:** [CONFIRM] · **Walkthrough:** [CONFIRM]

## Problem

Insurance agencies spanning multiple offices struggle with fragmented systems—customer data scattered across spreadsheets, policy portfolios out of sync, claim status unknown, and renewals missed. Teams need one system connecting customers to their full relationship history.

## What it does

- **Customer management:** Profiles with contact, ID, household, and relationship tracking; links to all policies, claims, and payment history
- **Policy lifecycle:** Status, premium, effective/expiration dates, carrier assignment, agent/writer tracking, documents, and change requests
- **Quote-to-bind workflow:** Create quotes against multiple carriers, compare premiums, track bind status, convert to policy
- **Claims processing:** Date of loss, claim number, adjuster contact, status updates per policy and carrier
- **Payment reconciliation:** Record premiums, commissions, and fees by carrier, office, and customer with audit trail
- **Task & communication hub:** Priorities, due dates, team assignment; email/SMS/announcement channels with full history
- **Executive dashboard:** Active policies, customer count, open tasks, renewals due within 30 days, producer leaderboard per office
- **Role-based access:** Admin, Manager, Producer, CSR roles with permission-based feature gates
- **Organizational hierarchy:** Territory → Division → Region → District → Office structure for multi-location agencies

## Stack

- **Frontend:** Next.js 16, React 19, TypeScript, Tailwind CSS 4, Lucide icons
- **Backend:** Next.js API routes, Server Components for data fetching
- **Database:** Prisma 5 ORM, PostgreSQL
- **Auth:** NextAuth 5 (Credentials provider with bcrypt)
- **Validation:** Zod
- **Utilities:** date-fns, bcryptjs

## Architecture

**Full-stack Next.js app** (App Router): Server Components fetch data via Prisma, API routes handle mutations, middleware enforces auth/RBAC.

**Multi-tenant design:** Single Agency root; nested org hierarchy (Territory → Division → Region → District → Office) for scale. Queries scoped to agency and role permissions. All entities track agencyId for isolation.

**Auth flow:** Login with email/password → Credentials provider validates against Users table, compares bcrypt hash → JWT session includes user id, role, agency, office → NextAuth middleware applies auth/RBAC to all routes.

**Data model:** Customers link to Policies, Quotes, Claims, Payments, Tasks, Communications. Policies reference Carriers, Agents (Users), coverage data. Activity logs track all mutations.

## Run it

```bash
# Install dependencies
npm install

# Set up environment
export DATABASE_URL="postgresql://user:password@localhost/insurance_crm"

# Push schema and seed sample data
npm run db:push
npm run db:seed

# Start dev server on http://localhost:3000
npm run dev

# Login with: admin@cityauto.com / password123
```

**Note:** Database migration and seed include a sample agency (City Auto Insurance) with test users across 5 regional offices, carriers, and sample customers/policies.

---

**PII Handling:** Customer records include SSN field (ssnEncrypted). [CONFIRM] encryption strategy and key management.  
**Status:** [CONFIRM] whether this is open-source or commercial.  
**Demo:** [CONFIRM] live or staging URL if available.