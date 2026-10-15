# Baltic Tech — React Website

Production-ready React/Vite landing page converted from the original Next.js/TypeScript project.

## Stack
- React 19
- Vite
- JSX (no TypeScript / TSX)
- Lucide React
- Plain CSS (no Tailwind/shadcn/Next.js dependency)

## Run
```bash
npm install
npm run dev
```

Run the mail API in a second terminal:
```bash
npm run server
```

## Production build
```bash
npm run build
npm run preview
```

## Contact form and SMTP
The contact form posts to the separate Express mail API at `/api/contact`. Vite proxies that route to `http://localhost:3001` during development. For a separate production frontend/API deployment, set `VITE_CONTACT_API_URL` to the public API URL.

Copy `.env.example` to `.env` and configure the SMTP values:
```env
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-smtp-user
SMTP_PASSWORD=your-smtp-password
MAIL_FROM=website@example.com
MAIL_TO=hello@example.com
```

The API exposes `GET /health` and `POST /api/contact`. SMTP credentials stay on the server and are never exposed through Vite.

## Structure
```text
src/
  App.jsx
  main.jsx
  index.css
server/
  index.js
public/
  Video Project 8.mp4  # hero
  Video Project 10.mp4 # footer
  brand/
public/
  brand/
  icon.svg
index.html
```

Unnecessary Next.js, TypeScript, Tailwind, shadcn, duplicate logo files, generated archives, and source documents were removed.
