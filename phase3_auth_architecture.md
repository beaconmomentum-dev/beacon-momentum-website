# Phase 3: Authentication System Architecture Plan

## Current State Analysis

**Website Type:** Static HTML/CSS/JavaScript  
**Hosting:** DigitalOcean droplet  
**Current Backend:** None (pure static site)  
**Member Content:** `/members/beacon-capital-suite/` directory (5 modules, 1,435 lines)

---

## Authentication Requirements

### Core Functionality
1. **User Registration** - New members can create accounts
2. **Login/Logout** - Secure session management
3. **Access Control** - Protect `/members/` directory
4. **Session Persistence** - Stay logged in across pages
5. **Password Security** - Hashed storage, secure transmission

### User Experience Goals
- Simple, frictionless registration
- Fast login (< 2 seconds)
- Seamless navigation once authenticated
- Clear member status indicators
- Easy logout from any page

### Security Requirements
- HTTPS for all authentication endpoints
- Password hashing (bcrypt or better)
- Session tokens with expiration
- CSRF protection
- SQL injection prevention
- XSS protection

---

## Technology Stack Options

### Option A: Node.js + Express + SQLite (Recommended)
**Pros:**
- Node.js already installed in sandbox
- Lightweight and fast
- SQLite requires no separate database server
- Easy to deploy on DigitalOcean droplet
- Good for small-to-medium user base (< 10,000 members)
- Simple session management with express-session

**Cons:**
- Requires running Node.js server alongside static files
- Need to configure reverse proxy (nginx)

**Stack:**
- Backend: Node.js + Express
- Database: SQLite3
- Session: express-session + connect-sqlite3
- Password: bcrypt
- Frontend: Vanilla JavaScript (fetch API)

### Option B: PHP + MySQL
**Pros:**
- Traditional, well-documented
- Easy to find hosting support
- Built-in session management

**Cons:**
- Requires PHP installation
- MySQL setup more complex than SQLite
- Heavier resource usage

### Option C: Serverless (Firebase Auth, Supabase)
**Pros:**
- No backend management
- Scalable
- Built-in security

**Cons:**
- External dependency
- Ongoing costs
- Less control over data
- Requires internet connectivity for auth

---

## Recommended Architecture: Node.js + Express + SQLite

### System Components

```
┌─────────────────────────────────────────────────────────────┐
│                    DigitalOcean Droplet                     │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌──────────────┐         ┌─────────────────────────┐     │
│  │   Nginx      │────────▶│   Node.js/Express       │     │
│  │ (Port 80/443)│         │   Auth Server           │     │
│  └──────────────┘         │   (Port 3000)           │     │
│         │                 └─────────────────────────┘     │
│         │                           │                      │
│         │                           ▼                      │
│         │                 ┌─────────────────────────┐     │
│         │                 │   SQLite Database       │     │
│         │                 │   - users table         │     │
│         │                 │   - sessions table      │     │
│         │                 └─────────────────────────┘     │
│         │                                                  │
│         ▼                                                  │
│  ┌──────────────────────────────────────┐                │
│  │   Static Files                       │                │
│  │   - index.html                       │                │
│  │   - /members/ (protected)            │                │
│  │   - /assets/, /images/               │                │
│  └──────────────────────────────────────┘                │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Directory Structure

```
/var/www/beaconmomentum/
├── public/                    # Static files (served by nginx)
│   ├── index.html
│   ├── login.html            # New
│   ├── register.html         # New
│   ├── member-dashboard.html # New
│   ├── assets/
│   ├── images/
│   ├── financial-sovereignty/
│   └── members/              # Protected directory
│       └── beacon-capital-suite/
│
├── server/                    # Node.js backend (new)
│   ├── server.js             # Main Express app
│   ├── routes/
│   │   ├── auth.js           # Login/logout/register
│   │   └── members.js        # Member-only routes
│   ├── middleware/
│   │   ├── auth.js           # Authentication middleware
│   │   └── session.js        # Session management
│   ├── models/
│   │   └── user.js           # User model
│   ├── database/
│   │   └── db.sqlite         # SQLite database file
│   └── package.json
│
└── config/
    └── nginx.conf            # Nginx configuration
```

### Database Schema

```sql
-- Users table
CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    first_name TEXT,
    last_name TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    last_login DATETIME,
    is_active BOOLEAN DEFAULT 1
);

-- Sessions table (managed by express-session)
CREATE TABLE sessions (
    sid TEXT PRIMARY KEY,
    sess TEXT NOT NULL,
    expired DATETIME NOT NULL
);

-- Optional: Member metadata
CREATE TABLE member_profiles (
    user_id INTEGER PRIMARY KEY,
    phone TEXT,
    company TEXT,
    role TEXT,
    onboarding_completed BOOLEAN DEFAULT 0,
    FOREIGN KEY (user_id) REFERENCES users(id)
);
```

### Authentication Flow

#### Registration Flow
1. User visits `/register.html`
2. Submits email, password, name
3. Frontend sends POST to `/api/auth/register`
4. Backend validates input
5. Backend hashes password (bcrypt)
6. Backend creates user record
7. Backend creates session
8. Backend returns success + session cookie
9. Frontend redirects to member dashboard

#### Login Flow
1. User visits `/login.html`
2. Submits email, password
3. Frontend sends POST to `/api/auth/login`
4. Backend validates credentials
5. Backend verifies password hash
6. Backend creates session
7. Backend returns success + session cookie
8. Frontend redirects to member dashboard or intended page

#### Access Control Flow
1. User requests `/members/beacon-capital-suite/defi-foundations.html`
2. Nginx proxies to Express for `/members/*` routes
3. Express middleware checks session
4. If valid session: serve protected content
5. If no session: redirect to `/login.html?redirect=/members/...`

#### Logout Flow
1. User clicks logout button
2. Frontend sends POST to `/api/auth/logout`
3. Backend destroys session
4. Backend clears session cookie
5. Frontend redirects to homepage

---

## Implementation Plan

### Phase 3.1: Backend Setup
- Initialize Node.js project
- Install dependencies (express, sqlite3, bcrypt, express-session)
- Create database schema
- Build authentication routes
- Implement password hashing
- Set up session management

### Phase 3.2: Frontend Pages
- Create login page
- Create registration page
- Create member dashboard
- Add logout buttons to member pages
- Add session check JavaScript

### Phase 3.3: Access Control
- Configure nginx reverse proxy
- Implement authentication middleware
- Protect `/members/` directory
- Add redirect logic for unauthenticated users

### Phase 3.4: Integration
- Update existing member pages with logout buttons
- Add member status indicators
- Update navigation for logged-in users
- Test full authentication flow

### Phase 3.5: Security Hardening
- Enable HTTPS (Let's Encrypt)
- Add CSRF protection
- Implement rate limiting
- Add input validation
- Test security vulnerabilities

### Phase 3.6: Deployment
- Deploy to DigitalOcean droplet
- Configure nginx
- Start Node.js server (PM2 for process management)
- Test production environment
- Update DNS if needed

---

## Security Considerations

### Password Security
- Minimum 8 characters
- Bcrypt hashing (cost factor 12)
- Never store plaintext passwords
- Secure password reset flow (future enhancement)

### Session Security
- HTTPOnly cookies (prevent XSS)
- Secure flag (HTTPS only)
- SameSite=Strict (CSRF protection)
- Session expiration (24 hours default)
- Regenerate session ID on login

### Input Validation
- Email format validation
- Password strength requirements
- SQL injection prevention (parameterized queries)
- XSS prevention (sanitize inputs)

### Rate Limiting
- Max 5 login attempts per IP per 15 minutes
- Max 3 registration attempts per IP per hour
- Prevent brute force attacks

---

## Estimated Timeline

- **Phase 3.1:** Backend Setup - 1 hour
- **Phase 3.2:** Frontend Pages - 1 hour
- **Phase 3.3:** Access Control - 45 minutes
- **Phase 3.4:** Integration - 30 minutes
- **Phase 3.5:** Security Hardening - 45 minutes
- **Phase 3.6:** Deployment - 30 minutes

**Total: ~4.5 hours**

---

## Success Criteria

✅ Users can register new accounts  
✅ Users can log in with email/password  
✅ Sessions persist across page navigation  
✅ `/members/` directory is protected  
✅ Unauthenticated users redirected to login  
✅ Users can log out successfully  
✅ Passwords are securely hashed  
✅ HTTPS enabled for all auth endpoints  
✅ No security vulnerabilities in basic testing  

---

## Future Enhancements (Phase 4+)

- Password reset via email
- Email verification on registration
- Two-factor authentication (2FA)
- Social login (Google, Facebook)
- Member profile management
- Progress tracking across modules
- Admin panel for user management
- Analytics dashboard

---

**Architecture Status:** ✅ APPROVED  
**Next Step:** Begin Phase 3.1 - Backend Setup
