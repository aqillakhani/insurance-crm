import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // Create agency
  const agency = await prisma.agency.create({
    data: {
      name: "City Auto Insurance",
      slug: "city-auto",
      phone: "(214) 555-0100",
      email: "info@cityautoinsurance.com",
      timezone: "America/Chicago",
    },
  });

  // Create territory hierarchy
  const territory = await prisma.territory.create({
    data: { agencyId: agency.id, name: "Default", isDefault: true },
  });
  const division = await prisma.division.create({
    data: { territoryId: territory.id, name: "Texas" },
  });
  const region = await prisma.region.create({
    data: { divisionId: division.id, name: "United States" },
  });

  const districtNames = ["MONTFORT", "ADDISON", "PEACHTREE", "POLK", "BADESTORE"];
  const districts = await Promise.all(
    districtNames.map((name) =>
      prisma.district.create({ data: { regionId: region.id, name } })
    )
  );

  // Create offices
  const officeData = [
    { name: "Montfort Office", code: "MONTFORT", districtId: districts[0].id },
    { name: "Addison/CPT Office", code: "ADDISON/CPT", districtId: districts[1].id },
    { name: "Peachtree Office", code: "PEACHTREE", districtId: districts[2].id },
    { name: "Polk Office", code: "POLK", districtId: districts[3].id },
    { name: "Badestore Office", code: "BADESTORE", districtId: districts[4].id },
  ];
  const offices = await Promise.all(
    officeData.map((o) =>
      prisma.office.create({
        data: { agencyId: agency.id, ...o },
      })
    )
  );

  // Create roles
  const adminRole = await prisma.role.create({
    data: { agencyId: agency.id, name: "Admin", isSystem: true, permissions: '{"all": true}' },
  });
  const managerRole = await prisma.role.create({
    data: { agencyId: agency.id, name: "Manager", isSystem: true, permissions: '{"leads":"all","clients":"all","policies":"all","reports":"all","commissions":"team"}' },
  });
  const producerRole = await prisma.role.create({
    data: { agencyId: agency.id, name: "Producer", isSystem: true, permissions: '{"leads":"own","clients":"own","policies":"own","reports":"own","commissions":"own"}' },
  });
  const csrRole = await prisma.role.create({
    data: { agencyId: agency.id, name: "CSR", isSystem: true, permissions: '{"clients":"all","policies":"all","tasks":"all"}' },
  });

  // Create users (password: "password123" — bcrypt hash)
  const pwHash = "$2b$10$peR.NcplhgiRBFDmbAcjL.DgesNbdwI41E1hA.o0vnlOjBkcxqusq";

  const usersData = [
    { firstName: "Admin", lastName: "User", email: "admin@cityauto.com", roleId: adminRole.id, officeId: offices[0].id },
    { firstName: "Ahmed", lastName: "Bukhouri", email: "ahmed@cityauto.com", roleId: producerRole.id, officeId: offices[1].id },
    { firstName: "Zika", lastName: "Bhaidani", email: "zika@cityauto.com", roleId: producerRole.id, officeId: offices[0].id },
    { firstName: "Sarah", lastName: "Martinez", email: "sarah@cityauto.com", roleId: producerRole.id, officeId: offices[2].id },
    { firstName: "James", lastName: "Wilson", email: "james@cityauto.com", roleId: producerRole.id, officeId: offices[3].id },
    { firstName: "Maria", lastName: "Lopez", email: "maria@cityauto.com", roleId: producerRole.id, officeId: offices[4].id },
    { firstName: "David", lastName: "Kim", email: "david@cityauto.com", roleId: producerRole.id, officeId: offices[0].id },
    { firstName: "Jennifer", lastName: "Adams", email: "jennifer@cityauto.com", roleId: csrRole.id, officeId: offices[2].id },
    { firstName: "Carlos", lastName: "Rivera", email: "carlos@cityauto.com", roleId: producerRole.id, officeId: offices[3].id },
    { firstName: "Branch", lastName: "Manager", email: "manager@cityauto.com", roleId: managerRole.id, officeId: offices[0].id },
  ];

  const users = await Promise.all(
    usersData.map((u) =>
      prisma.user.create({
        data: { agencyId: agency.id, passwordHash: pwHash, ...u },
      })
    )
  );

  // Create carriers
  const carrierData = [
    { name: "Venture Insurance", code: "VENT" },
    { name: "Alpha Rts", code: "ALPH" },
    { name: "The General", code: "GENL" },
    { name: "Progressive", code: "PROG" },
    { name: "State Auto", code: "STAU" },
    { name: "SafePoint Insurance", code: "SFPT" },
    { name: "Nationwide", code: "NATW" },
    { name: "Allstate", code: "ALST" },
  ];
  const carriers = await Promise.all(
    carrierData.map((c) =>
      prisma.carrier.create({
        data: { agencyId: agency.id, linesOffered: "AUTO,HOME,RENTERS", ...c },
      })
    )
  );

  // Create tags
  const tagData = [
    { name: "VIP", slug: "vip", color: "#f39c12", category: "Priority" },
    { name: "Renewal Due", slug: "renewal-due", color: "#e74c3c", category: "Status" },
    { name: "Payment Overdue", slug: "payment-overdue", color: "#c0392b", category: "Status" },
    { name: "New Customer", slug: "new-customer", color: "#27ae60", category: "Status" },
    { name: "Cross-sell Opportunity", slug: "cross-sell", color: "#3498db", category: "Sales" },
    { name: "Referral Source", slug: "referral-source", color: "#9b59b6", category: "Source" },
  ];
  await Promise.all(
    tagData.map((t) => prisma.tag.create({ data: { agencyId: agency.id, ...t } }))
  );

  // Generate customer IDs
  let custIdCounter = 114961844;

  // Create customers with realistic data
  const customersData = [
    { firstName: "FLOR DALINA", lastName: "YANES", email: "everydayjjw29@icloud.com", cell: "(469) 501-4001", home: "(945) 257-8021", addressStreet: "13000 Montfort Dr Apt 203", addressCity: "Dallas", addressState: "TX", addressZip: "75240", source: "Referral", gender: "F", dob: new Date("1994-10-31"), agentIdx: 1, officeIdx: 1 },
    { firstName: "JOHN", lastName: "SMITH", email: "john.smith@email.com", cell: "(214) 555-0100", home: "", addressStreet: "4521 Oak Lawn Ave", addressCity: "Dallas", addressState: "TX", addressZip: "75219", source: "Walk-in", gender: "M", dob: new Date("1985-03-15"), agentIdx: 2, officeIdx: 0 },
    { firstName: "MARIA", lastName: "GARCIA", email: "maria.g@email.com", cell: "(972) 555-0200", home: "(972) 555-0201", addressStreet: "789 Preston Rd", addressCity: "Plano", addressState: "TX", addressZip: "75093", source: "Web", gender: "F", dob: new Date("1990-07-22"), agentIdx: 1, officeIdx: 2 },
    { firstName: "ROBERT", lastName: "CHEN", email: "robert.chen@email.com", cell: "(469) 555-0300", home: "", addressStreet: "2200 McKinney Ave #300", addressCity: "Dallas", addressState: "TX", addressZip: "75201", source: "Referral", gender: "M", dob: new Date("1978-11-08"), agentIdx: 3, officeIdx: 0 },
    { firstName: "LISA", lastName: "PARK", email: "lisa.park@email.com", cell: "(817) 555-0400", home: "(817) 555-0401", addressStreet: "1100 Camp Bowie Blvd", addressCity: "Fort Worth", addressState: "TX", addressZip: "76107", source: "Phone", gender: "F", dob: new Date("1992-05-14"), agentIdx: 4, officeIdx: 3 },
    { firstName: "MICHAEL", lastName: "JOHNSON", email: "mjohnson@email.com", cell: "(214) 555-0500", home: "", addressStreet: "3500 Maple Ave", addressCity: "Dallas", addressState: "TX", addressZip: "75219", source: "Referral", gender: "M", dob: new Date("1982-09-30"), agentIdx: 1, officeIdx: 1 },
    { firstName: "SARAH", lastName: "WILLIAMS", email: "swilliams@email.com", cell: "(972) 555-0600", home: "(972) 555-0601", addressStreet: "500 N Central Expy", addressCity: "Richardson", addressState: "TX", addressZip: "75080", source: "Web", gender: "F", dob: new Date("1995-01-20"), agentIdx: 5, officeIdx: 4 },
    { firstName: "DAVID", lastName: "MARTINEZ", email: "dmartinez@email.com", cell: "(469) 555-0700", home: "", addressStreet: "8200 Park Lane", addressCity: "Dallas", addressState: "TX", addressZip: "75231", source: "Walk-in", gender: "M", dob: new Date("1988-12-05"), agentIdx: 2, officeIdx: 0 },
    { firstName: "JENNIFER", lastName: "TAYLOR", email: "jtaylor@email.com", cell: "(817) 555-0800", home: "", addressStreet: "2600 W 7th St", addressCity: "Fort Worth", addressState: "TX", addressZip: "76107", source: "Referral", gender: "F", dob: new Date("1975-06-18"), agentIdx: 4, officeIdx: 3 },
    { firstName: "JAMES", lastName: "BROWN", email: "jbrown@email.com", cell: "(214) 555-0900", home: "(214) 555-0901", addressStreet: "1500 Commerce St", addressCity: "Dallas", addressState: "TX", addressZip: "75201", source: "Phone", gender: "M", dob: new Date("1980-04-25"), agentIdx: 3, officeIdx: 2 },
    { firstName: "AMANDA", lastName: "DAVIS", email: "adavis@email.com", cell: "(972) 555-1000", home: "", addressStreet: "6300 Skillman St", addressCity: "Dallas", addressState: "TX", addressZip: "75231", source: "Web", gender: "F", dob: new Date("1993-08-12"), agentIdx: 1, officeIdx: 1 },
    { firstName: "CARLOS", lastName: "HERNANDEZ", email: "chernandez@email.com", cell: "(469) 555-1100", home: "(469) 555-1101", addressStreet: "4200 Spring Valley Rd", addressCity: "Addison", addressState: "TX", addressZip: "75001", source: "Referral", gender: "M", dob: new Date("1987-02-14"), agentIdx: 5, officeIdx: 4 },
  ];

  const customers = [];
  for (const c of customersData) {
    const cust = await prisma.customer.create({
      data: {
        agencyId: agency.id,
        customerIdDisplay: String(custIdCounter++),
        firstName: c.firstName,
        lastName: c.lastName,
        email: c.email,
        cell: c.cell,
        home: c.home || undefined,
        addressStreet: c.addressStreet,
        addressCity: c.addressCity,
        addressState: c.addressState,
        addressZip: c.addressZip,
        addressValidated: true,
        source: c.source,
        gender: c.gender,
        dob: c.dob,
        language: "English",
        agentOfRecordId: users[c.agentIdx].id,
        enteredById: users[c.agentIdx].id,
        keyedById: users[c.agentIdx].id,
        officeId: offices[c.officeIdx].id,
        comments: "",
      },
    });
    customers.push(cust);
  }

  // Create policies
  const policyClasses = ["AUTO", "HOME", "RENTERS", "LIFE"];
  for (let i = 0; i < customers.length; i++) {
    const numPolicies = 1 + (i % 3); // 1-3 policies per customer
    for (let p = 0; p < numPolicies; p++) {
      const cls = policyClasses[p % policyClasses.length];
      const premium = 800 + Math.floor(Math.random() * 2000);
      const effDate = new Date(2025, Math.floor(Math.random() * 12), 1 + Math.floor(Math.random() * 28));
      const expDate = new Date(effDate);
      expDate.setFullYear(expDate.getFullYear() + 1);

      await prisma.policy.create({
        data: {
          agencyId: agency.id,
          customerId: customers[i].id,
          carrierId: carriers[i % carriers.length].id,
          status: "Active",
          type: p === 0 ? "New Business" : "Renewal",
          class: cls,
          policyNumber: `VGAD-${700000 + i * 100 + p}-00${p + 1}`,
          premium,
          effectiveDate: effDate,
          expirationCancelDate: expDate,
          dueDate: expDate,
          agentOfRecordId: users[customersData[i].agentIdx].id,
          writingAgentId: users[customersData[i].agentIdx].id,
        },
      });
    }
  }

  // Create payments
  for (let i = 0; i < Math.min(8, customers.length); i++) {
    const numPayments = 2 + (i % 4);
    for (let p = 0; p < numPayments; p++) {
      const amount = 99 + Math.floor(Math.random() * 400);
      await prisma.payment.create({
        data: {
          agencyId: agency.id,
          customerId: customers[i].id,
          carrierId: carriers[i % carriers.length].id,
          officeId: offices[customersData[i].officeIdx].id,
          receiptRef: `R-${1000 + i * 10 + p}`,
          status: "Active",
          amountBilled: amount,
          amountTendered: amount,
          paymentDate: new Date(2026, 3 - p, 1 + i),
          processedById: users[customersData[i].agentIdx].id,
        },
      });
    }
  }

  // Create notes for a few customers
  for (let i = 0; i < 5; i++) {
    await prisma.note.create({
      data: {
        agencyId: agency.id,
        customerId: customers[i].id,
        noteType: "note",
        content: `Customer called about renewal. Discussed coverage options and provided updated quote.`,
        createdById: users[customersData[i].agentIdx].id,
      },
    });
  }

  // Create tasks
  const taskTitles = [
    "Follow up on renewal",
    "Call back — quote request",
    "Process endorsement — add vehicle",
    "Send welcome packet",
    "Review renewal rate increase",
    "Collect signed application",
    "Schedule appointment for policy review",
    "Follow up on missing documents",
  ];

  for (let i = 0; i < 8; i++) {
    await prisma.task.create({
      data: {
        agencyId: agency.id,
        customerId: customers[i % customers.length].id,
        title: taskTitles[i],
        type: i < 2 ? "follow_up" : i < 4 ? "renewal" : "general",
        priority: i < 3 ? "high" : "normal",
        status: i < 2 ? "pending" : i < 5 ? "pending" : "completed",
        dueDate: new Date(2026, 3, 4 + i),
        assignedToId: users[1 + (i % 5)].id,
        createdById: users[0].id,
      },
    });
  }

  console.log(`Seeded:
  - 1 agency
  - ${offices.length} offices (${districtNames.join(", ")})
  - ${users.length} users
  - ${carriers.length} carriers
  - ${customers.length} customers
  - ${await prisma.policy.count()} policies
  - ${await prisma.payment.count()} payments
  - ${await prisma.note.count()} notes
  - ${await prisma.task.count()} tasks
  - ${tagData.length} tags
  `);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
