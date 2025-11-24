
# 🔗 TinyLink – URL Shortener with Analytics

TinyLink is a modern, full-stack URL shortener application built with **Next.js 15**, **Drizzle ORM**, **Neon PostgreSQL**, and **TailwindCSS**.
It supports custom shortcodes, redirection, click analytics, and CRUD operations.

---

## 🚀 Live Demo

🔗 **[https://tiny-url-umber.vercel.app](https://tiny-url-umber.vercel.app)**

---

## 🧰 Tech Stack

### **Frontend & Backend**

* Next.js 15 (App Router)
* React
* TailwindCSS

### **Database**

* PostgreSQL (Neon)
* Drizzle ORM

### **Deployment**

* Vercel
* GitHub

---

## ✨ Features

* **Shorten long URLs**
* **Custom shortcodes** supported
* **Fast redirection** using dynamic routing
* **Click analytics**

  * Total click count
  * Last clicked timestamp
* **Delete shortened links**
* **Responsive UI dashboard**
* **Server Components + Server Actions**
* **Fully deployed on Vercel**

---

## 📂 Project Structure

```
tiny-url/
 ├─ app/
 │   ├─ api/
 │   │   └─ links/
 │   │        └─ route.ts            # POST + GET APIs
 │   │        └─ [code]/
 │   │              └─ route.ts      # DELETE API
 │   ├─ [code]/
 │   │      └─ route.ts              # Redirect logic
 │   └─ page.tsx                     # Dashboard UI
 │
 ├─ lib/
 │   ├─ db.ts                        # Database connection
 │   └─ schema.ts                    # Drizzle schema
 │
 ├─ public/
 │
 ├─ drizzle.config.ts                # Drizzle configuration
 ├─ package.json
 ├─ tsconfig.json
 ├─ README.md
```

---

## 🗄️ Database Schema

Defined in `lib/schema.ts`:

```
links
 ├─ code         (text, primary key)
 ├─ targetUrl    (text)
 ├─ totalClicks  (integer, default 0)
 ├─ lastClicked  (timestamp)
 ├─ createdAt    (timestamp, default now())
```

---

## 📡 API Endpoints

### **POST /api/links**

Create a short URL.

**Request Body:**

```json
{
  "targetUrl": "https://example.com",
  "code": "myshort"
}
```

---

### **GET /api/links**

Fetch all shortened links for the dashboard.

---

### **DELETE /api/links/[code]**

Delete a shortened URL entry.

---

### **GET /[code]**

Redirect logic:

* Finds the long URL
* Increments click count
* Updates last clicked timestamp
* Redirects user

---

## 🧪 Running Locally

### 1. Clone repository

```bash
git clone https://github.com/Vijaym16/tiny-url
cd tiny-url
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create `.env` file

```
DATABASE_URL=your_neon_database_url
BASE_URL=http://localhost:3000
```

### 4. Apply database schema

```bash
npx drizzle-kit push
```

### 5. Start development server

```bash
npm run dev
```

---

## 🚀 Deployment

This project is deployed on **Vercel**.

### Required Environment Variables:

```
DATABASE_URL=
BASE_URL=
```

---

## 👤 Author

**Vijay M**
GitHub: [https://github.com/Vijaym16](https://github.com/Vijaym16)

---

Server Components + Server Actions

Fully deployed on Vercel
