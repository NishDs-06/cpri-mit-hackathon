# CPRI × VED PowerGrid Hackathon 2026 — Frontend

Single-page institutional site with an authenticated registration portal.

**Stack:** Next.js 15 (App Router) · TypeScript · Tailwind CSS v3

---

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Start dev server
npm run dev

# 3. Open http://localhost:3000
```

---

## Environment Variables

Create a `.env.local` file in the project root:

```env
# Base URL of the backend API (no trailing slash)
# Development: point to local backend or Next.js API routes
NEXT_PUBLIC_API_URL=http://localhost:3000

# Do NOT put secrets or tokens in NEXT_PUBLIC_ variables.
# All session/auth is handled via HTTP-only cookies set by the backend.
```

---

## Project Structure

```
├── app/
│   ├── layout.tsx              # Root layout: fonts, AuthProvider, SEO metadata
│   ├── page.tsx                # Main page assembly (Navbar + 4 sections)
│   ├── fonts.ts                # next/font/google definitions (Source Serif 4 + IBM Plex Sans)
│   ├── globals.css             # Design tokens (:root vars), keyframes, reduced-motion, floating labels
│   └── auth/callback/page.tsx  # Magic link callback handler
│
├── components/
│   ├── nav/
│   │   ├── Navbar.tsx          # Fixed glass nav (the ONE backdrop-filter on the site)
│   │   ├── CpriWordmark.tsx    # CPRI serif wordmark — swap for Image when logo is ready
│   │   └── VedLogo.tsx         # VED placeholder slot — swap for Image when logo is ready
│   ├── sections/
│   │   ├── Hero.tsx            # Asymmetric hero, stat strip, CTA
│   │   ├── HeroBackground.tsx  # CSS-only animated grid (90s drift, seamless 200% loop)
│   │   ├── About.tsx           # CPRI + VED two-column, bg-alt
│   │   ├── Register.tsx        # Countdown + AuthFlow inline panel
│   │   └── Contact.tsx         # Contact form + institutional footer
│   ├── auth/
│   │   ├── AuthFlow.tsx        # State machine: unauthenticated → magic_link_sent → authenticated → session_expired
│   │   ├── SignInRegisterScreen.tsx  # Default tab: Sign In
│   │   ├── CheckEmailScreen.tsx
│   │   ├── SessionExpiredScreen.tsx
│   │   ├── ErrorScreen.tsx     # expired_link | invalid_link | forbidden | server_error
│   │   ├── ProfileForm.tsx     # 6-field floating label form → PATCH /api/me
│   │   ├── TeamPanel.tsx       # Create + Join panels (backend validates all states)
│   │   ├── TeamRoster.tsx      # Member list, status badge, fill progress
│   │   └── PortalScreen.tsx    # Authenticated portal: profile → team_setup → roster steps
│   └── ui/
│       ├── Button.tsx          # primary | outline | ghost, sharp corners
│       ├── FloatingLabelInput.tsx  # CSS-only floating label input + textarea
│       └── CountdownTimer.tsx  # Hydration-safe, gold accent, setInterval client-only
│
├── context/
│   └── AuthContext.tsx         # Auth state from backend only — no localStorage
│
├── lib/
│   ├── constants.ts            # ← CHANGE THESE: deadline, hackathon name, stats
│   ├── errors.ts               # ApiError + apiFetch wrapper
│   ├── utils.ts                # cn(), isValidTeamCodeFormat(), displayUrl()
│   └── api/
│       ├── auth.ts             # requestMagicLink, getSession, logout, verifyMagicLinkToken
│       ├── profile.ts          # getMe, updateProfile
│       └── teams.ts            # getMyTeam, createTeam, joinTeam
│
└── types/
    └── index.ts                # Profile, Team, TeamMember, AuthSession, TeamJoinResolution, ...
```

---

## Connecting the Backend

All API calls are isolated in `/lib/api/`. Connect the backend by:

1. Set `NEXT_PUBLIC_API_URL` in `.env.local`
2. Implement the endpoints listed in `lib/api/*.ts`
3. The TypeScript interfaces in `types/index.ts` define the exact response shapes expected

### Required Backend Endpoints

| Method | Path | Description |
|--------|------|-------------|
| `POST` | `/api/auth/magic-link` | Send magic link to email |
| `POST` | `/api/auth/callback` | Verify token, set session cookie |
| `GET`  | `/api/auth/session` | Return current session (401 if none) |
| `POST` | `/api/auth/logout` | Invalidate session |
| `GET`  | `/api/me` | Get authenticated user's profile |
| `PATCH`| `/api/me` | Update profile |
| `GET`  | `/api/teams/me` | Get user's team (404 if none) |
| `POST` | `/api/teams` | Create team (backend generates code) |
| `POST` | `/api/teams/join` | Join by code (returns TeamJoinResolution) |
| `POST` | `/api/contact` | Contact form submission |

---

## Changing Placeholder Values

All swappable constants are in `lib/constants.ts`:

```ts
export const REGISTRATION_DEADLINE = new Date('2026-10-31T23:59:59+05:30');
export const HACKATHON_NAME        = 'PowerGrid Hackathon 2026';
export const HACKATHON_TAGLINE     = 'Engineer the future of India\'s energy infrastructure.';
export const STAT_PRIZE            = '₹5 Lakhs';
export const STAT_TEAMS            = '100 Teams';
export const STAT_EVENT_DATE       = '14–15 Nov 2026';
export const STAT_LOCATION         = 'Bengaluru, India';
```

To swap CPRI or VED logos: replace the `<span>` in `CpriWordmark.tsx` / `VedLogo.tsx` with `<Image>`.

---

## Design Constraints (do not change)

- **One** backdrop-filter: the Navbar only
- **One** animation: the hero background drift (CSS-only, GPU-accelerated)
- **Gold accent** (`--gold-accent: #B8862E`): countdown timer only
- **No dark theme** anywhere
- **No localStorage** for auth state — backend is always the source of truth
