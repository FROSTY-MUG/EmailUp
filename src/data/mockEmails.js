export const mockEmails = [
  {
    id: 1,
    from: "Marcus Chen",
    email: "marcus.chen@globalfreight.com",
    subject: "URGENT: Shipment #GF-4829 stuck at customs — client escalating",
    preview: "Our client Apex Manufacturing is threatening to cancel their contract...",
    body: `Hi Support Team,

Our client Apex Manufacturing is threatening to cancel their contract if shipment #GF-4829 isn't cleared through customs by Friday. The container has been held at Port of Long Beach for 8 days now due to documentation issues.

We've already submitted the revised HS codes but haven't received confirmation. The shipment contains 12 pallets of industrial equipment valued at $284,000.

Can you please escalate this with the customs broker immediately? The client's production line is halted and they're incurring $15,000/day in downtime costs.

Regards,
Marcus Chen
VP Operations, Global Freight Solutions`,
    category: "Shipment Delay",
    priority: "urgent",
    sentiment: "negative",
    confidence: 96,
    timestamp: "2 min ago",
    read: false,
    avatar: "MC",
    entities: ["Shipment #GF-4829", "Apex Manufacturing", "Port of Long Beach", "$284,000"],
    draftReply: `Dear Marcus,

Thank you for bringing this to our immediate attention. I understand the urgency regarding shipment #GF-4829 and the impact on Apex Manufacturing's operations.

I've taken the following actions:

1. **Escalated** this case to our senior customs broker team with priority status
2. **Contacted** the Port of Long Beach customs office directly to verify the status of your revised HS code submission
3. **Assigned** a dedicated case manager (Rebecca Torres) who will provide hourly updates

We expect to have a resolution within 24 hours. Rebecca will reach out to you within the next 2 hours with a detailed status update.

I sincerely apologize for the delays and understand the significant financial impact this is causing. We are treating this as our highest priority.

Best regards,
AI Support Agent | Debales AI`
  },
  {
    id: 2,
    from: "Sarah Mitchell",
    email: "s.mitchell@technovate.io",
    subject: "Refund request — damaged goods received (Order #TV-20958)",
    preview: "We received our shipment yesterday but 3 out of 5 crates were severely damaged...",
    body: `Hello,

We received our shipment yesterday (Order #TV-20958) but 3 out of 5 crates were severely damaged during transit. The protective packaging was completely crushed and the electronic components inside are non-functional.

We have photo documentation of the damage upon receipt. Our warehouse team noted the damage on the delivery receipt as well.

We need a full refund for the damaged items ($47,250) or immediate replacement shipment. This is the second time we've had damage issues in the past quarter.

Please advise on next steps.

Sarah Mitchell
Procurement Manager, Technovate Industries`,
    category: "Refund Request",
    priority: "high",
    sentiment: "negative",
    confidence: 98,
    timestamp: "18 min ago",
    read: false,
    avatar: "SM",
    entities: ["Order #TV-20958", "$47,250", "3/5 crates damaged", "Technovate Industries"],
    draftReply: `Dear Sarah,

I'm very sorry to hear about the damage to your shipment (Order #TV-20958). This is unacceptable, and I understand your frustration, especially given the previous incident.

Here's what we're doing immediately:

1. **Refund Initiated**: I've processed a full refund of $47,250 for the 3 damaged crates. You should see this reflected within 3-5 business days.
2. **Replacement Shipment**: A replacement order has been created (#TV-20958-R) with enhanced protective packaging and will ship within 48 hours.
3. **Damage Claim**: I've filed a claim with our carrier. Could you please send the photos to claims@support.com for our records?
4. **Account Review**: I've flagged your account for a shipping quality review to prevent future occurrences.

Again, I sincerely apologize for the inconvenience. We value your partnership.

Best regards,
AI Support Agent | Debales AI`
  },
  {
    id: 3,
    from: "James Rodriguez",
    email: "j.rodriguez@pacificretail.com",
    subject: "Where is my tracking update? Order #PR-8847",
    preview: "I placed an order 6 days ago and the tracking hasn't updated since...",
    body: `Hi there,

I placed an order 6 days ago (Order #PR-8847) and the tracking number you provided (1Z999AA10123456784) hasn't updated since it showed "Label Created" on April 27th.

My customer is asking for delivery estimates and I have nothing to tell them. Can you check if this has actually shipped or if there's a problem?

Need an update ASAP please.

Thanks,
James Rodriguez
Pacific Retail Group`,
    category: "Tracking Inquiry",
    priority: "medium",
    sentiment: "frustrated",
    confidence: 94,
    timestamp: "45 min ago",
    read: false,
    avatar: "JR",
    entities: ["Order #PR-8847", "1Z999AA10123456784", "April 27"],
    draftReply: `Hi James,

Thank you for reaching out about Order #PR-8847. I've investigated the tracking status and here's what I found:

**Current Status**: Your shipment was picked up by the carrier on April 28th but experienced a scan gap due to a sorting facility transfer. The package is currently at the regional distribution center in Phoenix, AZ.

**Updated Tracking**: The tracking number 1Z999AA10123456784 should refresh within the next 4-6 hours with current location data.

**Estimated Delivery**: May 5th — May 6th

I've also set up proactive tracking alerts for this shipment, so you'll receive email updates at each scan point going forward.

Let me know if you need anything else!

Best regards,
AI Support Agent | Debales AI`
  },
  {
    id: 4,
    from: "Linda Park",
    email: "linda.park@evergreen-mfg.com",
    subject: "Billing discrepancy on Invoice #EG-2024-0892",
    preview: "We noticed a $3,200 overcharge on our latest invoice compared to the quoted rate...",
    body: `Dear Billing Team,

We noticed a $3,200 overcharge on our latest invoice (#EG-2024-0892) compared to the quoted rate from our contract renewal in March.

The contracted rate for LTL shipments under 5,000 lbs was $1,850/shipment, but we were billed $2,650 for 4 separate shipments last month. That's a total overcharge of $3,200.

I've attached the signed contract for reference. Please review and issue a credit memo at your earliest convenience.

Best regards,
Linda Park
Finance Director, Evergreen Manufacturing`,
    category: "Billing Issue",
    priority: "high",
    sentiment: "concerned",
    confidence: 97,
    timestamp: "1 hr ago",
    read: false,
    avatar: "LP",
    entities: ["Invoice #EG-2024-0892", "$3,200 overcharge", "4 shipments", "Evergreen Manufacturing"],
    draftReply: `Dear Linda,

Thank you for bringing this billing discrepancy to our attention regarding Invoice #EG-2024-0892.

I've reviewed your account and can confirm the following:

- **Contracted LTL Rate**: $1,850/shipment (for shipments under 5,000 lbs) ✓
- **Billed Rate**: $2,650/shipment ✗
- **Total Overcharge**: $3,200 across 4 shipments ✓

**Resolution:**
1. A credit memo for $3,200 has been issued (Credit #CM-2024-0341)
2. Your billing profile has been corrected to reflect the contracted rate
3. I've flagged this for our billing audit team to prevent recurrence

The credit will appear on your next statement. I apologize for the error and any inconvenience caused.

Best regards,
AI Support Agent | Debales AI`
  },
  {
    id: 5,
    from: "Tom Bradley",
    email: "tom@bradleylogistics.net",
    subject: "Partnership inquiry — regional distribution network",
    preview: "We're a mid-size logistics company based in the Southeast looking to expand...",
    body: `Hello,

I'm Tom Bradley, CEO of Bradley Logistics. We're a mid-size logistics company based in Atlanta covering the Southeastern US.

We're looking to expand our network and came across your company at the CSCMP conference last week. We'd love to explore a potential partnership for cross-docking and last-mile delivery in our region.

We currently handle about 2,000 shipments/day and are growing at 15% quarterly. Would love to set up a call to discuss synergies.

Looking forward to hearing from you.

Best,
Tom Bradley
CEO, Bradley Logistics
(404) 555-0187`,
    category: "General Inquiry",
    priority: "medium",
    sentiment: "positive",
    confidence: 91,
    timestamp: "2 hrs ago",
    read: true,
    avatar: "TB",
    entities: ["Bradley Logistics", "Atlanta/Southeast US", "2,000 shipments/day", "CSCMP Conference"],
    draftReply: `Dear Tom,

Thank you so much for reaching out! It was great to connect at CSCMP, and we're excited about the potential for collaboration.

Your growth trajectory and regional expertise in the Southeast are very impressive. We believe there's strong synergy in the following areas:

- **Cross-docking**: We have capacity at our Memphis and Charlotte hubs
- **Last-mile delivery**: Our network complements your regional coverage
- **Technology integration**: Our AI-powered routing could enhance your operations

I'd love to schedule a call to explore this further. Here are some available slots:
- Tuesday, May 6th at 2:00 PM ET
- Wednesday, May 7th at 10:00 AM ET
- Thursday, May 8th at 3:00 PM ET

Please let me know what works best, or feel free to suggest an alternative time.

Best regards,
AI Support Agent | Debales AI`
  },
  {
    id: 6,
    from: "Anika Patel",
    email: "anika.patel@swiftchain.com",
    subject: "Schedule change needed — 3 pickups require rerouting",
    preview: "Due to a warehouse move, we need to redirect our scheduled pickups from...",
    body: `Hi Team,

Due to our warehouse relocation, we need to update the pickup location for 3 upcoming scheduled shipments:

- Pickup #SC-901 (May 5) — redirect from 1200 Industrial Blvd to 4500 Commerce Way, Suite 200
- Pickup #SC-902 (May 6) — same redirect
- Pickup #SC-903 (May 7) — same redirect

New dock hours at the Commerce Way location: 7:00 AM - 4:00 PM (vs. old location 6:00 AM - 6:00 PM)

Please confirm the changes ASAP so we can coordinate with our receiving team.

Thanks,
Anika Patel
Logistics Coordinator, SwiftChain Supply Co.`,
    category: "Schedule Change",
    priority: "medium",
    sentiment: "neutral",
    confidence: 95,
    timestamp: "3 hrs ago",
    read: true,
    avatar: "AP",
    entities: ["SC-901, SC-902, SC-903", "4500 Commerce Way Suite 200", "May 5-7", "SwiftChain Supply"],
    draftReply: `Hi Anika,

Thank you for the advance notice on your warehouse relocation. I've updated all three pickups:

✅ **Pickup #SC-901** (May 5) — Redirected to 4500 Commerce Way, Suite 200
✅ **Pickup #SC-902** (May 6) — Redirected to 4500 Commerce Way, Suite 200
✅ **Pickup #SC-903** (May 7) — Redirected to 4500 Commerce Way, Suite 200

**Dock Hours Updated**: 7:00 AM - 4:00 PM for all three pickups.

Our drivers have been notified with the new address and updated dock window. You should receive confirmation texts the morning of each pickup.

Is there anything else you need for the transition?

Best regards,
AI Support Agent | Debales AI`
  },
  {
    id: 7,
    from: "David Okonkwo",
    email: "david.o@meridiantrade.com",
    subject: "Delivery confirmation needed for PO-44210",
    preview: "Our records show PO-44210 was supposed to deliver yesterday but we...",
    body: `Hello,

Our records show PO-44210 was supposed to deliver yesterday (May 1st) to our Meridian Trade warehouse at 780 Harbor Drive, but we have no record of receipt.

Can you confirm whether the delivery was attempted or completed? We need the signed POD (Proof of Delivery) if it was delivered, or an updated ETA if it wasn't.

This is time-sensitive as the goods are needed for a client order shipping out on May 5th.

Thanks,
David Okonkwo
Supply Chain Manager, Meridian Trade Co.`,
    category: "Delivery Confirmation",
    priority: "high",
    sentiment: "concerned",
    confidence: 93,
    timestamp: "3 hrs ago",
    read: true,
    avatar: "DO",
    entities: ["PO-44210", "780 Harbor Drive", "May 1st delivery", "Meridian Trade"],
    draftReply: `Hi David,

Thank you for flagging this. I've checked the status of PO-44210 and here's what I found:

**Delivery Status**: The delivery was **attempted** yesterday at 3:47 PM but was marked as "Unable to Deliver — Dock Full." The driver waited 45 minutes before departing.

**Next Steps**:
1. The shipment is currently at our local terminal (5 miles from your location)
2. I've scheduled a **re-delivery for tomorrow, May 3rd, at 8:00 AM** (first stop)
3. I'll ensure you receive the signed POD immediately upon delivery

This gives you 2 days of buffer before your May 5th shipping deadline. Would you like me to coordinate with your dock team on a specific time window?

Best regards,
AI Support Agent | Debales AI`
  },
  {
    id: 8,
    from: "Rachel Simmons",
    email: "rsimmons@coastalimports.com",
    subject: "RE: Quote request for ocean freight — Asia to East Coast",
    preview: "Thanks for the initial quote. We'd like to proceed with the 40ft container option...",
    body: `Hi,

Thanks for the initial quote you sent over. We'd like to proceed with the 40ft container option for our ocean freight from Shenzhen to Newark.

A few questions before we finalize:
1. Does the $4,200 rate include terminal handling charges?
2. What's the current transit time for this lane?
3. Can we get a multi-shipment discount if we commit to 6 containers/month?

We're looking to start shipping by mid-May if possible.

Rachel Simmons
Import Manager, Coastal Imports LLC`,
    category: "General Inquiry",
    priority: "medium",
    sentiment: "positive",
    confidence: 89,
    timestamp: "5 hrs ago",
    read: true,
    avatar: "RS",
    entities: ["40ft container", "Shenzhen to Newark", "$4,200 rate", "6 containers/month"],
    draftReply: `Hi Rachel,

Great to hear you'd like to proceed! Let me address your questions:

1. **Terminal Handling Charges**: The $4,200 rate includes origin THC at Shenzhen port. Destination THC at Newark is an additional $385/container.

2. **Transit Time**: Current transit for Shenzhen → Newark is **28-32 days** via direct service, or **22-25 days** via our express routing through the Panama Canal.

3. **Volume Discount**: Absolutely! For a commitment of 6 containers/month, we can offer:
   - **Standard Service**: $3,850/container (8.3% savings)
   - **Express Service**: $4,600/container (vs. $5,100 standard)

For a mid-May start, I'd recommend booking by May 8th to secure vessel space. Shall I prepare a formal service agreement?

Best regards,
AI Support Agent | Debales AI`
  },
  {
    id: 9,
    from: "Mike Torres",
    email: "mike.t@rapidfulfillment.com",
    subject: "COMPLAINT: Third late delivery this month — Account #RF-2200",
    preview: "This is completely unacceptable. We've had three late deliveries this month alone...",
    body: `This is completely unacceptable. We've had THREE late deliveries this month alone on Account #RF-2200:

- May 1: Delivery #RF-5501 — 2 days late
- April 28: Delivery #RF-5489 — 1 day late  
- April 22: Delivery #RF-5467 — 3 days late

We chose your service specifically for your on-time delivery guarantee, and right now you're sitting at a 40% failure rate for our account this month.

If this isn't resolved immediately, we'll be moving our entire account ($180K/year) to a competitor. I want to speak with a manager TODAY.

— Mike Torres
Operations Director, Rapid Fulfillment Inc.`,
    category: "Shipment Delay",
    priority: "urgent",
    sentiment: "angry",
    confidence: 99,
    timestamp: "5 hrs ago",
    read: true,
    avatar: "MT",
    entities: ["Account #RF-2200", "3 late deliveries", "$180K/year account", "Rapid Fulfillment"],
    draftReply: `Dear Mike,

I completely understand your frustration, and you're right — this level of service is unacceptable. I want to assure you that we take this very seriously.

**Immediate Actions:**

1. **Manager Call Scheduled**: Our Regional Operations Director, Karen Walsh, will call you today before 3:00 PM ET at the number on file.

2. **Root Cause Analysis**: I've initiated an investigation into all three late deliveries:
   - RF-5501, RF-5489, RF-5467 — routing and carrier assignment review underway

3. **Account Credit**: A service credit of $2,700 (representing the SLA penalty for all 3 late deliveries) has been applied to your account.

4. **Dedicated Routing**: Going forward, your shipments will be assigned to our premium carrier tier with GPS tracking and proactive delay alerts.

We value your $180K partnership and are committed to restoring your confidence in our service. Karen will discuss a detailed corrective action plan on today's call.

Sincerely,
AI Support Agent | Debales AI`
  },
  {
    id: 10,
    from: "Elena Vasquez",
    email: "elena.v@sunrisefoods.com",
    subject: "Temperature-controlled shipment requirements — perishable goods",
    preview: "We need to ship 4 pallets of frozen seafood from Miami to Chicago...",
    body: `Hello,

We need to arrange temperature-controlled shipping for perishable goods:

- **Product**: Frozen seafood (must maintain -18°C / 0°F)
- **Quantity**: 4 pallets, approximately 6,000 lbs total
- **Origin**: Miami, FL (pickup May 8th)
- **Destination**: Chicago, IL
- **Deadline**: Must arrive by May 10th (48-hour window)

We need continuous temperature monitoring with data logger reports. Also, what are your rates for reefer trucks on this lane?

Elena Vasquez
Distribution Manager, Sunrise Foods International`,
    category: "General Inquiry",
    priority: "medium",
    sentiment: "neutral",
    confidence: 87,
    timestamp: "6 hrs ago",
    read: true,
    avatar: "EV",
    entities: ["Frozen seafood at -18°C", "4 pallets / 6,000 lbs", "Miami → Chicago", "May 8-10"],
    draftReply: `Hi Elena,

Thank you for your inquiry! We have excellent reefer capabilities for the Miami to Chicago lane. Here are the details:

**Service Options:**

| Service | Transit | Rate | Monitoring |
|---------|---------|------|------------|
| Standard Reefer | 48 hrs | $3,200 | Hourly data logging |
| Premium Reefer | 36 hrs | $3,800 | Real-time GPS + temp alerts |
| Expedited Reefer | 24 hrs | $4,500 | Real-time + dedicated driver |

**All options include:**
- ✅ Continuous temperature maintenance at -18°C (0°F)
- ✅ Pre-cooling verification before loading
- ✅ FSMA-compliant data logger reports delivered within 24 hrs of delivery
- ✅ $50,000 cargo insurance included

Given your May 8-10 window, I'd recommend the **Standard Reefer** option, which provides comfortable buffer time.

Would you like me to book this, or do you have any additional questions?

Best regards,
AI Support Agent | Debales AI`
  },
  {
    id: 11,
    from: "Alex Nguyen",
    email: "alex@precisionparts.co",
    subject: "Return shipment authorization needed — wrong items received",
    preview: "We received the wrong parts in our latest order. Instead of Model X-400...",
    body: `Hi,

We received the wrong parts in our latest order (#PP-7721). Instead of Model X-400 bearings (qty: 500), we received Model X-200 bearings.

We need:
1. A return shipping label for the incorrect items
2. The correct Model X-400 bearings shipped ASAP — our assembly line needs them by May 7th
3. No additional charges for the reshipping

This mix-up is costing us production time. Please prioritize.

Alex Nguyen
Plant Manager, Precision Parts Co.`,
    category: "Refund Request",
    priority: "high",
    sentiment: "frustrated",
    confidence: 92,
    timestamp: "7 hrs ago",
    read: true,
    avatar: "AN",
    entities: ["Order #PP-7721", "Model X-400 vs X-200", "500 qty bearings", "May 7 deadline"],
    draftReply: `Hi Alex,

I sincerely apologize for this mix-up on Order #PP-7721. I've expedited the resolution:

**Immediate Actions:**

1. ✅ **Return Label**: A prepaid return shipping label has been emailed to you. Simply repack the Model X-200 bearings and drop off at any UPS location or schedule a pickup.

2. ✅ **Correct Order Shipped**: 500x Model X-400 bearings are being shipped TODAY via overnight express. **Expected delivery: May 5th** (2 days before your deadline).

3. ✅ **No Additional Charges**: All reshipping costs are on us, and I've also applied a 10% discount on this order for the inconvenience.

**New Tracking Number**: Will be emailed to you within 2 hours.

You do NOT need to wait for the return to be processed before receiving the correct items.

Best regards,
AI Support Agent | Debales AI`
  },
  {
    id: 12,
    from: "Karen Walsh",
    email: "k.walsh@unitedwarehouse.com",
    subject: "Inventory discrepancy report — Warehouse Section B7",
    preview: "During our monthly audit, we found discrepancies in Section B7 affecting 14 SKUs...",
    body: `Dear Support,

During our monthly inventory audit, we found significant discrepancies in Warehouse Section B7 affecting 14 SKUs. The system shows 2,340 units but physical count is 2,187 — a variance of 153 units.

The affected SKUs are primarily in the electronics category. We suspect the issue may be related to the system migration last week.

Can we schedule an investigation? We need to reconcile before the end-of-month reporting deadline (May 5th).

Karen Walsh
Warehouse Operations, United Warehouse Solutions`,
    category: "Billing Issue",
    priority: "high",
    sentiment: "concerned",
    confidence: 85,
    timestamp: "8 hrs ago",
    read: true,
    avatar: "KW",
    entities: ["Section B7", "153 unit variance", "14 SKUs", "May 5 deadline"],
    draftReply: `Dear Karen,

Thank you for reporting the inventory discrepancy in Section B7. We take inventory accuracy very seriously and will prioritize this investigation.

**Investigation Plan:**

1. **System Audit** (Today): Our IT team will review all transactions in Section B7 since the system migration, looking for sync errors or missed scans.

2. **Recount Coordination** (May 4th): We'll send a 2-person audit team to conduct a supervised recount of all 14 affected SKUs.

3. **Reconciliation Report** (May 5th AM): A complete variance report with root cause analysis will be delivered before your reporting deadline.

**Preliminary Assessment**: Based on similar cases during system migrations, this is likely a scan synchronization issue where physical movements were recorded but not fully synced to the new system. This is typically resolvable without actual inventory loss.

Shall I schedule the audit team for May 4th at 8:00 AM?

Best regards,
AI Support Agent | Debales AI`
  }
];

export const categories = [
  { name: "All Emails", count: 12, color: "#8b95a5" },
  { name: "Shipment Delay", count: 2, color: "#ef4444" },
  { name: "Refund Request", count: 2, color: "#f59e0b" },
  { name: "Tracking Inquiry", count: 1, color: "#3b82f6" },
  { name: "Billing Issue", count: 2, color: "#f97316" },
  { name: "General Inquiry", count: 3, color: "#10b981" },
  { name: "Schedule Change", count: 1, color: "#8b5cf6" },
  { name: "Delivery Confirmation", count: 1, color: "#14b8a6" },
];
