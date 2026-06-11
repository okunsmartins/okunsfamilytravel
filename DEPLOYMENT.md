# Deployment Guide — Okuns Family Travel

## Architecture Overview

```
Local machine → git push → GitHub (main branch)
                                    ↓ auto-deploy
                            Hostinger Node.js Web App
                                    ↓ connects to
                            MySQL database (Hostinger)
```

---

## Step 1 — Create MySQL Database on Hostinger

1. Log into **hPanel** → **Databases** → **MySQL Databases**
2. Create a new database — note the name (e.g. `u123456789_okuns`)
3. Create a database user and assign it to the database (grant ALL PRIVILEGES)
4. Note down:
   - **Database host** (usually `127.0.0.1` or shown in hPanel)
   - **Database name**
   - **Username**
   - **Password**

---

## Step 2 — Create Node.js Web App on Hostinger

1. In **hPanel** → **Websites** → **Add Website** → **Node.js Web App**
2. Fill in:
   - **Application name**: `okuns-family-travel`
   - **Node.js version**: `20.x`
   - **Application root**: `/`
   - **Application URL**: your domain
   - **Startup file**: leave default (Next.js uses `npm start`)
3. Under **Git** settings:
   - Connect your GitHub account
   - Select repository: `okunsmartins/okunsfamilytravel`
   - Branch: `main`
   - ✅ Enable **Auto-deploy on push**
4. Set **Build command**: `npm install && npm run build`
5. Set **Start command**: `npm start`

---

## Step 3 — Set Environment Variables on Hostinger

In the Node.js app settings → **Environment Variables**, add:

| Key | Value |
|-----|-------|
| `DATABASE_URL` | `mysql://USERNAME:PASSWORD@127.0.0.1:3306/DB_NAME` |
| `NEXTAUTH_SECRET` | (generate: `openssl rand -base64 32`) |
| `NEXTAUTH_URL` | `https://yourdomain.com` |
| `ADMIN_EMAIL` | `admin@okunsfamilytravel.com` |
| `ADMIN_PASSWORD` | (choose a strong password) |

---

## Step 4 — Set Up Your Local .env.local

Create `E:\First Stack Solutions\okuns-family-travel\.env.local`:

```env
DATABASE_URL="mysql://USERNAME:PASSWORD@127.0.0.1:3306/DB_NAME"
NEXTAUTH_SECRET="your-secret-here"
NEXTAUTH_URL="http://localhost:3000"
ADMIN_EMAIL="admin@okunsfamilytravel.com"
ADMIN_PASSWORD="YourPassword123!"
```

---

## Step 5 — Push Database Schema & Seed Data

Run these commands **once** locally (with .env.local set up):

```bash
# Push the Prisma schema to your MySQL database
npm run db:push

# Seed the database with starter content + admin user
npm run db:seed
```

---

## Step 6 — Push to GitHub

```bash
cd "E:\First Stack Solutions\okuns-family-travel"
git init
git remote add origin https://github.com/okunsmartins/okunsfamilytravel.git
git add .
git commit -m "Initial commit — Okuns Family Travel website"
git push -u origin main
```

Hostinger will detect the push and automatically build + deploy.

---

## Day-to-Day Workflow

```
1. Make changes locally
2. Test with: npm run dev
3. git add . && git commit -m "your message"
4. git push origin main
5. GitHub Actions verifies the build ✅
6. Hostinger auto-deploys → live within ~2 minutes
```

---

## Admin Panel

Once live, go to: `https://yourdomain.com/admin`

- Login with your `ADMIN_EMAIL` and `ADMIN_PASSWORD`
- Add/edit/delete: Blog Posts, Destinations, YouTube Videos
- Changes appear on the live website immediately

---

## GitHub Actions Secrets

Add these in your GitHub repo → **Settings** → **Secrets and variables** → **Actions**:

| Secret | Value |
|--------|-------|
| `DATABASE_URL` | Your MySQL connection string |
| `NEXTAUTH_SECRET` | Your NextAuth secret |
| `NEXTAUTH_URL` | Your live domain URL |

---

## Troubleshooting

**Build fails on Hostinger?**
- Check environment variables are all set
- Check Node.js version is 20.x

**Cannot connect to database?**
- Verify DATABASE_URL format: `mysql://user:pass@host:3306/dbname`
- On Hostinger, the host is usually `127.0.0.1` (localhost)

**Admin login not working?**
- Run `npm run db:seed` again to recreate the admin user
- Check ADMIN_EMAIL and ADMIN_PASSWORD match what you're typing
