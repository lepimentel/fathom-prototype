# Fathom.ai — Product Specification

**Status:** Prototype shipped · 2026-04-24
**Owner:** Leandro Pimentel (VP Operations)
**Repo:** `fathom-prototype`
**Linear project:** [Fathom.ai Prototype](https://linear.app/lepiment/project/fathomai-prototype-e9aba50e1d34)

---

## 1. One-line description

Fathom is an enterprise operational intelligence tool that figures out how a company actually works — by interviewing employees and mapping their real workflows.

## 2. The problem

Every executive team operates on two maps:

1. **The org chart** — which team owns what.
2. **The process diagram** — what happens when work gets done.

Both are wrong. The org chart misses the matrix dependencies; the process diagram misses the workarounds. The truth lives in the heads of the people doing the work — in side scripts, undocumented Slack channels, and the IT engineer who's been manually fixing proxy configs every Monday for three years.

When operations break — onboarding stretches to 23 days, procurement leaks 14 days, support churns 38% — leadership runs internal investigations that take weeks, surface five conflicting narratives, and rarely produce mechanical fixes.

## 3. The Fathom thesis

Have AI agents do what consultants can't afford to do at scale: interview every employee, watch their screens, and reconstruct the operational map from the ground up.

- 20-minute structured voice interviews with consenting employees.
- Optional screen-share for high-context tasks (procurement entry, ticket triage, onboarding setup).
- Cross-correlation across 30+ interviews per inquiry.
- Output: a living operational graph, bottleneck callouts with quantified impact, and exportable MCP-compatible context for downstream agents (Claude, Cursor, Linear, custom tooling).

## 4. Target users

| Persona | Why they buy | First inquiry they'd run |
|---|---|---|
| **COO / VP Operations** | Reduce cycle time, find the workarounds nobody documents | "Why does onboarding take 23 days?" |
| **CFO / Finance** | Quantify operational drag, fund the right automation | "Where is the procurement cycle leaking 14 days?" |
| **CHRO / People** | Understand attrition root causes beyond exit interviews | "What's behind the support team's 38% retention churn?" |
| **CRO / RevOps** | Identify renewal stalls and forecast hygiene | "Why do enterprise renewals stall after week 6?" |
| **VP Engineering** | Map handoff drag between teams | "How do engineering and design handoffs really happen?" |

## 5. Jobs to be done

> **When** I see a chronic operational metric I can't explain (cycle time, churn, missed forecasts),
> **I want to** understand the actual work behind the metric across all teams involved,
> **so I can** fund mechanical fixes instead of running another offsite about it.

Fathom replaces:
- Internal "tiger team" investigations (4–8 weeks)
- Big-4 consulting engagements ($150K–$500K)
- Survey-tool churn audits (low signal, attribution-free)

## 6. Product surface (prototype scope)

The shipped prototype demonstrates three flows:

### 6.1 Landing
Marketing surface. Series A announcement, gradient headline, glass-morphism preview window with mock procurement query and three live metric cards. Single CTA: **Access Dashboard**.

### 6.2 Executive Overview
Default dashboard view. Four metric cards (Active Agents, Total Interviews, Screen Shares, Automations Found with cyan-accent highlight). Five priority inquiries — three investigating, two completed — each with status badge, tags, owner, time range, and progress bar.

### 6.3 Inquiry Detail
Per-inquiry deep dive. Variants:
- **Active inquiry** — operational map (vertical timeline of process nodes), Fathom Recommendation card with quantified impact, recent voice interview cards. Bottleneck node renders red with embedded "Fathom Alert" callout.
- **Archived inquiry** — emerald "Inquiry Archived" header, outcome summary, key interview quotes, downloadable final report.

Each of the 5 mock inquiries (onboarding, procurement, renewals, support churn, eng-design handoff) carries its own narrative — process nodes, insights, recommendation, metadata stats, employee avatars.

### 6.4 Stub views
"Operational Map" (cross-inquiry process graph) and "Employee Voices" (searchable interview index) render polished "Coming soon" panels with feature bullets.

## 7. Technical architecture

| Layer | Choice | Rationale |
|---|---|---|
| Frontend | React 18 + Vite 5 | Fast HMR, small bundle, well-known |
| Styling | Tailwind 3 + CSS-var token system | Single-source-of-truth color tokens, easy theme swap |
| Animation | Framer Motion 11 | Declarative page transitions, prefers-reduced-motion aware |
| Icons | Lucide React | Consistent stroke weight, tree-shaken |
| Routing | react-router-dom 6 | Deep links + refresh persistence (`/dashboard/inquiry/:id`) |
| Data | Mock-only via `src/data/repository.js` | Single boundary; future API swap touches one file |
| Fonts | Space Grotesk (display) · Inter (body) · Fira Code (mono accents) | Modern + readable + hacker-analyst data feel |

### Component boundaries
- `App.jsx` — `BrowserRouter` shell with crossfade transitions
- `Dashboard.jsx` — composes Sidebar + Header + main; nested `<Routes>`; ErrorBoundary
- `Sidebar.jsx` — desktop pinned / mobile drawer; Escape, focus trap, body scroll lock, `inert` when closed
- `InquiryDetail.jsx` — orchestrates `ActiveView` vs `ArchivedView` based on inquiry status
- `inquiry/{Stat, MetadataBar, ProcessNode, InsightCard, RecommendationCard}` — split for size + reuse
- `ErrorBoundary.jsx` — class component with reset; dev-only console.error
- `EmptyStates.jsx` — `InquiryNotFound`, `NoInquiries`

### Color & token system
CSS variables in `:root` for `bg`, `bg-deep`, `panel`, `accent`, `accent-hover`, `ink-primary`, `ink-secondary`. Tailwind config references via `rgb(var(--color-*) / <alpha-value>)` for alpha-aware utilities. Custom shadow tokens for accent glows.

### Accessibility posture (WCAG 2.2 AA target)
- Color contrast: ~16:1 (primary text) and ~6:1 (secondary text) against `#0A0C10`.
- Global `:focus-visible` ring (cyan, 2px, 2px offset).
- Skip-to-main-content link, semantic landmarks (`<header>`, `<aside>`, `<main>`, `<footer>`, `<nav>`).
- Mobile drawer: Escape closes, focus trap, focus restore, body scroll lock, `inert` when closed.
- All "Coming soon" buttons pair `aria-disabled="true"` + `disabled` + `cursor-not-allowed` + `title`.
- All decorative icons + status dots have `aria-hidden="true"`.
- `prefers-reduced-motion` honored; smooth scroll disabled when set.
- Touch targets ≥44×44 on mobile.

### Performance posture
- Build: 1848 modules, 105 KB gzipped (340 KB raw), 1.5 s build time.
- All animations use `transform` / `opacity` (no layout-triggering properties).
- Animation durations capped at 400 ms (most 200–250 ms).
- Font-display: swap; preconnect to Google Fonts.

## 8. Mock data structure

Five inquiries in `src/data/mockData.js`. Each inquiry carries:

```ts
{
  id: number,
  question: string,
  status: 'investigating' | 'completed',
  progress: 0–100,
  interviewsDone: number,
  interviewsTarget: number,
  tags: string[],
  severity: 'high' | 'medium',
  owner: string,
  timeRange: string,
  workflowTitle: string,
  metadataStats: { interviews, screenShares, audioHours, mapsGenerated },
  recommendation: { title, body, stats: [{ label, value }] },
  processNodes: ProcessNode[],   // empty for archived
  insights: Insight[],
  summary?: string,              // archived only
}
```

A runtime predicate `isActiveInquiry(inq)` enforces shape correctness.

## 9. Roadmap

### Already shipped (prototype, demo-ready)
- Three views (Landing, Executive Overview, Inquiry Detail)
- Five distinct inquiry narratives
- Mobile-responsive drawer
- Full a11y baseline (WCAG 2.2 AA)
- Deep-linking via router
- Token-driven theme system

### Next milestone — alpha (real backend, single tenant)
1. **Auth** — Auth0 or WorkOS, SSO-ready from day one.
2. **Inquiry creation flow** — natural language question → agent picks interview targets.
3. **Voice agent** — outbound voice calls (Vapi or Retell), 20 min structured interviews.
4. **Transcription + analysis** — Whisper or AssemblyAI; LLM extraction of process nodes and friction tags.
5. **Operational graph engine** — cross-correlate node mentions, weight by frequency + role authority.
6. **Recommendation engine** — pattern-match bottlenecks against a library of remediations.
7. **MCP export** — package map context as MCP-compatible artifact for downstream agents.

### Beta — multi-tenant + collaboration
8. Real-time collaboration on inquiry pages (RevOps + COO co-investigating).
9. Slack / Teams integration for bottleneck alerts.
10. Linear / Jira integration to convert recommendations into tickets.

### GA
11. SOC 2 Type II.
12. SSO with all major IdPs (Okta, Azure AD, Google).
13. Pricing tiers (per-active-inquiry vs unlimited).

## 10. Success metrics

- **Activation:** % of accounts that ship 1 inquiry within 30 days.
- **Retention:** % of accounts running ≥2 concurrent inquiries by day 60.
- **Outcome:** average % cycle-time reduction on remediated bottlenecks (self-reported, then validated).
- **Expansion:** ARR per logo at 12 months.
- **NPS:** survey at 30 days, 90 days, renewal.

## 11. Pricing concept (placeholder)

| Tier | Inquiries / yr | Price | Notes |
|---|---|---|---|
| Pilot | 1 | $50K | 90-day proof-of-value |
| Operator | 5 | $180K | Annual, includes MCP exports |
| Enterprise | Unlimited | Custom | SSO, SOC 2, dedicated CSM |

## 12. Decision log (prototype)

| Decision | Rationale |
|---|---|
| State-based routing → react-router-dom | Refresh-persistence is the single biggest "demo smell" tell. Worth the dependency. |
| Mock data in one file | At 5 inquiries, splitting is premature. Revisit at 20+. |
| No TypeScript | Prototype-scope. Runtime predicate (`isActiveInquiry`) gives most of the safety. Migrate when adding real backend. |
| CSS variables for color tokens | Lets shadow utilities reference `--color-accent` directly. Single edit re-skins the app. |
| Fira Code for IDs/percentages | Hacker-analyst aesthetic the brief asked for; numbers feel more "data-driven". |
| 5 inquiries, not 3 | Two completed inquiries demonstrate the Archived variant — material to a customer demo. |
| No charts in prototype | Progress bars sufficient; real charts (Recharts/Visx) wait for actual data. |

## 13. Review history

| Round | Reviewer | Verdict | Issues found |
|---|---|---|---|
| 1 | CTO | Demo-blocker: hardcoded onboarding map, theme tokens unused, file too long, a11y gaps, no router | 6 |
| 1 | QA | 1 major (data shape), 6 a11y/code-quality issues | 7 |
| 1 | ui-ux-pro-max | Confirmed HIGH-severity gaps; recommended pattern, color, type system | n/a |
| 2 | QA | All P0 cleared, partial passes on focus ring + token sweep + disabled affordance | 8 |
| 2 | CTO | All P0 cleared, demo-credible | 5 (deferred) |
| 3 | CTO | Real production risks: no router, no data layer, drawer a11y partial, LEP-92 still open | 6 |
| 3 | Code review | 2 blockers (drawer a11y), 5 high (avatars, aria pairing, +0 bubble), 6 minor | 13 |
| 3 | QA | All Tier A+B+C verified, no blockers, 4 minor nits | 4 |
| 4 (final) | CTO | **SHIP** — presentation-quality for customer/investor demo | 3 deferred |

## 14. Outstanding (intentionally deferred)

- TypeScript migration (LEP-92 → cancelled, replaced with runtime predicate via LEP-104)
- Real backend / API layer
- Charts (Recharts/Visx) for real data
- Auth, multi-tenancy, billing
- Skeleton loading states (rule shipped via ErrorBoundary + EmptyStates; full skeletons land with async)

## 15. Links

- **Prototype repo:** https://github.com/lepimentel/fathom-prototype
- **Linear project:** https://linear.app/lepiment/project/fathomai-prototype-e9aba50e1d34
- **Live demo (local):** http://localhost:5180/
