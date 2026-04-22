# Job Tracker

A full-stack job application tracker built with Next.js, Node.js/TypeScript, and PostgreSQL, featuring an event-driven status history pipeline powered by RabbitMQ.

**Live demo:** [job-tracker-7slu.vercel.app](https://job-tracker-7slu.vercel.app)

![Screenshot](docs/screenshot.png)

## Architecture

```
┌─────────────┐     ┌─────────────┐     ┌──────────────┐
│  Next.js    │ ──► │  Express    │ ──► │  PostgreSQL  │
│  (Vercel)   │     │  (Railway)  │     │  (Railway)   │
└─────────────┘     └──────┬──────┘     └──────────────┘
                           │                    ▲
                           ▼                    │
                    ┌─────────────┐     ┌──────────────┐
                    │  RabbitMQ   │ ──► │   Worker     │
                    │ (CloudAMQP) │     │  (Railway)   │
                    └─────────────┘     └──────────────┘
```

Status changes are decoupled from history persistence. When a `PATCH /applications/:id` updates an application's status:

1. The API writes the new status to PostgreSQL
2. The API publishes `{ applicationId, fromStatus, toStatus }` to RabbitMQ
3. A separate worker process consumes the message and writes a row to `status_events`
4. The frontend reads `status_events` to render the timeline in the detail panel

Running the worker as a separate service means status-history writes can fail or backlog without affecting API latency or availability.

## Stack

| Layer         | Technology                  | Hosting    |
| ------------- | --------------------------- | ---------- |
| Frontend      | Next.js 15, Tailwind v4     | Vercel     |
| Backend API   | Express, TypeScript, Zod    | Railway    |
| Database      | PostgreSQL via Prisma ORM   | Railway    |
| Message queue | RabbitMQ                    | CloudAMQP  |
| Worker        | TypeScript consumer process | Railway    |

## Features

- Add, edit, and delete job applications
- Status tracking across 10 stages (applied → screening → interview → offer, etc.)
- Gmail-style detail panel with inline editing
- Status history timeline powered by the event pipeline
- Per-application notes
- Table ordered by applied date (most recent first)

## Known limitations & future improvements

This is an MVP shipped as a portfolio piece. Deliberately deferred:

- **Authentication.** There are no user accounts — anyone who visits the live URL can create, edit, or delete applications. Adding auth (e.g. NextAuth or Clerk) would scope data per user and is the prerequisite for any kind of public rollout.
- **Sortable & filterable table.** The table currently sorts server-side by applied date. Column headers aren't interactive, and there's no filtering by status, company, location, or salary — all of which would be straightforward to layer on top of the existing table.
- **Richer dashboard stats.** The current stat row is a simple count-by-status. A real dashboard would include response rates, time-in-stage, application velocity over time, and clickable drill-downs.
- **Mobile responsive layout.** Designed desktop-first; the detail panel and table don't collapse gracefully on small screens.
- **Pagination / virtualization.** The `GET /applications` endpoint returns every row. Once a user hits a few hundred applications, both the payload size and the DOM render will become a bottleneck.
- **Empty-state & error handling.** Fetch failures currently fail silently in the UI, and the add-application form will throw if a user submits without an applied date.
- **Automated tests.** No test runner is configured. The pipeline architecture (API publishes, worker consumes) is a natural fit for integration tests against a test Postgres and RabbitMQ instance.

## Project structure

```
job-tracker/
├── frontend/   # Next.js app → Vercel
├── backend/    # Express API → Railway
└── worker/     # RabbitMQ consumer → Railway
```

Each service has its own `package.json` and is deployed independently.

## API

| Method | Route                | Description                                     |
| ------ | -------------------- | ----------------------------------------------- |
| GET    | `/applications`      | List all applications                           |
| GET    | `/applications/:id`  | Single application with status events and notes |
| POST   | `/applications`      | Create a new application                        |
| PATCH  | `/applications/:id`  | Update (publishes to queue if status changes)   |
| DELETE | `/applications/:id`  | Delete an application                           |

## Running locally

Each service runs in its own terminal.

**Backend** (port 3001):

```bash
cd backend
npm install
npx prisma migrate dev
npm run dev
```

Requires `DATABASE_URL` and `CLOUDAMQP_URL` in `backend/.env`.

**Worker:**

```bash
cd worker
npm install
npm run dev
```

Requires `DATABASE_URL` and `CLOUDAMQP_URL` in `worker/.env`.

**Frontend** (port 3000):

```bash
cd frontend
npm install
npm run dev
```

Requires `NEXT_PUBLIC_API_URL=http://localhost:3001` in `frontend/.env.local`.

## Deployment

- **Frontend:** Vercel, root directory `frontend/`
- **Backend & worker:** Railway, separate services pointing to `backend/` and `worker/` respectively
- **Database:** Railway Postgres, linked to both backend and worker
- **Queue:** CloudAMQP, `CLOUDAMQP_URL` set on both backend and worker

The backend's `start` script runs `prisma migrate deploy` before booting, so schema changes are applied automatically on every deploy.
