# Asset Intelligence Hub

Build a complete, responsive, single-page React web application using Tailwind CSS, Framer Motion, and Lucide React icons for "MatterLoop" (MatterLoop.net), a next-generation Physical Asset Lifecycle Intelligence Platform designed for manufacturing and supply chain operations.

Visual Design & Theme System

- Aesthetic: High-tech industrial command center with a dark theme.

- Color Palette:

  - Backgrounds: Primary dark slate (`#0B0F17`), card surface dark graphite (`#121824`), border slate (`#1E293B`).

  - Accent Colors: Vibrant Cyan (`#00F0FF`) for live data/active states, Cyber Green (`#10B981`) for healthy assets, Warm Amber (`#F59E0B`) for warnings/predictive maintenance, and Coral Red (`#EF4444`) for critical downtime alerts.

- Typography: Clean sans-serif for UI (`Inter` or `Plus Jakarta Sans`) paired with monospace font (`JetBrains Mono`) for telemetry data, numbers, and code blocks.

- Components Style: Micro-grid textures, glassmorphism card surfaces, 1px subtle glowing borders, and smooth hover micro-animations.

---

Core Structure & Pages/Sections

1. Navigation Header:

   - Left: Brand logo with a glowing cyan loop icon and bold "MatterLoop" text.

   - Center Links: Platform, Capabilities, Pricing, Team, API Docs.

   - Right Action: "Launch App" button (glowing cyan outline) and "Book Demo" (solid cyan primary button).

2. Hero Section:

   - Headline: "Intelligence Across the Life of Every Asset."

   - Subheadline: "Transform physical machinery, telemetry signals, maintenance history, and supply chain data into unified lifecycle intelligence."

   - Action Buttons: "Explore Dashboard" and "View Platform Architecture".

   - Interactive Workflow Diagram Widget: A dynamic animated visual showing data flow:

     `[Physical Assets & Sensors]` ➔ `[Data Ingestion]` ➔ `[AI Lifecycle Engine]` ➔ `[Predictive Insights & Optimization]`.

3. Live Dashboard Preview Component (Interactive State):

   - Include interactive tab switching ("Overview", "Fleet Health", "Predictive Alerts", "Utilization").

   - Metric Cards: 

     - Active Assets: `14,280` (Green +2.4%)

     - Fleet Health: `98.4%` (Cyan)

     - Utilization Rate: `87.2%` (Cyan)

     - Predictive Alerts: `3 Critical` (Amber badge)

   - Asset Grid Cards: Interactive cards showing equipment like "CNC Milling Array #04" or "Robotic Arm Unit 12" with real-time temperature gauges, health bars, and operational status indicators.

4. Platform Capabilities Grid:

   - 4-card interactive feature grid:

     1. Asset Intelligence Engine (Profiling & Condition Monitoring)

     2. Lifecycle Management Engine (Deployment, History, Retirement)

     3. Predictive Maintenance Intelligence (Anomaly Detection & Failure Indicators)

     4. Asset Utilization Analytics (Capacity, Downtime, Efficiency)

   - Technical Showcase Badge Box highlighting compatibility with NVIDIA Metropolis, RAPIDS, and Omniverse frameworks.

5. Testimonials & Social Proof:

   - Section Title: "Trusted by Industrial & Supply Chain Leaders"

   - Grid of 3 enterprise review cards with user avatars, executive titles, company logos, and explicit KPI callout badges (e.g., "-38% Unplanned Downtime", "+24% Equipment Lifespan").

6. Team & Leadership Section:

   - Section Title: "Built by Industrial AI Pioneers"

   - Grid of 4 leadership profile cards with modern avatars, roles (e.g., VP of Asset Intelligence, Chief Predictive Systems Architect), brief bio text, and interactive social links (LinkedIn, GitHub).

7. Developer API & Docs Terminal:

   - Code preview container showing JSON response stream for `/v1/assets/telemetry/stream`.

   - "Developer API & Documentation (Coming Soon)" callout with feature bullet points.

8. Pricing Tiers Section:

   - Billing toggle switch (Monthly vs. Annual - 20% Off).

   - 3 Pricing Cards:

     1. Pilot Node ($999/mo) – Single plant monitoring, up to 500 asset nodes.

     2. Enterprise Operations (Popular - $2,999/mo) – Full lifecycle AI engines, predictive alert models, unlimited nodes.

     3. Dedicated Infrastructure (Custom Enterprise) – On-premise deployment, custom SLAs, Omniverse integration.

9. Footer:

   - Company branding, site navigation links, system operational status pill ("All Systems Operational" green dot), legal links, and copyright notice for MatterLoop.net.

---

Technical Directives

- Use React functional components with clean modular state.

- Include Framer Motion for fade-in animations on scroll and smooth tab switches.

- Ensure full mobile and desktop responsiveness using standard Tailwind CSS classes.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/af25fa57-9871-4eab-8129-6a82fa7f09d3).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
