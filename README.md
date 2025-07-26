# 🏸 Sports Hub | Sports Club Management System

A full-stack, role-based web application for managing **a single sports club** — built with the MERN stack (MongoDB, Express.js, React, Node.js). Designed for users, members, and admins, the platform provides seamless booking, membership, and management experiences with modern UX and robust backend.

---

## 🔗 Live Demo

🌐 **Live Site:** [https://your-live-site-url.vercel.app](https://your-live-site-url.vercel.app)  
🔐 **Admin Login:**  
- **Email:** admin@scms.com  
- **Password:** 123456  

---

## 📌 Key Features

✅ 3 User Roles: **User**, **Member**, and **Admin**  
✅ Authentication & Firebase Role-Based Authorization  
✅ Booking system with session slots, pricing, and approval workflow  
✅ Payment integration with coupon support  
✅ Custom alerts (Toast/SweetAlert) for all CRUD/Auth events  
✅ TanStack Query + Mutation for API management  
✅ Dashboard for all roles — **User**, **Member**, **Admin**  
✅ Booking approval, member management, court management, and more  
✅ Responsive across mobile, tablet, desktop  
✅ Persistent login (private routes don’t redirect on refresh)  
✅ Pagination (Card: 6/page if ≥10, Table: 10/page if ≥15)  
✅ Toggle between Table ↔ Card in Payment History  
✅ Axios Interceptor & .env secrets  
✅ No lorem ipsum – Real, professional content  

---

## 🏠 Home Page

- Beautiful **navbar** with site logo and role-based nav links  
- **Banner** with rotating sports images  
- **About Club**: history, mission, typography-rich layout  
- **Location section**: full address + Google map/static map  
- **Promotions section**: fancy coupon display (e.g., `ABC → 5% off`)  
- **Footer**: social icons, contact details  

---

## 🏟 Courts Page

- Displays court image, type, slot dropdown, price, and **Book Now**  
- **Logged out:** redirect to login  
- **Logged in:** show modal with:
  - Read-only court info
  - Multi-slot booking
  - Auto-price calculation
  - Submission → status `pending`
  - After admin approval → status becomes `approved`
  - After payment → status becomes `confirmed`

---

## 👤 User Dashboard (Private)

- **My Profile**: name, email, registration date  
- **Pending Bookings**: cancel option, reflected in admin panel  
- **Announcements**: admin club updates  

---

## 👤 Member Dashboard (Private)

- **My Profile**: membership start date  
- **Pending Bookings**: cancel option  
- **Approved Bookings**:  
  - Pay button (redirects to payment page)  
  - Cancel option  
- **Payment Page**:
  - Read-only fields
  - Coupon apply functionality
  - After success: store to DB + success message  
- **Confirmed Bookings**  
- **Payment History**:  
  - Table format  
  - Toggle to card format via button  
- **Announcements**

---

## 🛠 Admin Dashboard (Private)

- **Admin Profile**: name, email, image, total users/members/courts  
- **Manage Booking Approvals**: accept/reject options  
- **Manage Members**: searchable list with delete  
- **All Users**: view/search all users  
- **Manage Courts**: CRUD functionality  
- **Manage Bookings**: search confirmed bookings by title  
- **Manage Coupons**: add/update/delete  
- **Make Announcement**: add/update/delete

---

## 💡 Challenge Features

- Court page pagination:  
  - Card view → 6 per page (min 10)  
  - Table view → 10 per page (min 15)  
- Toggle Payment History layout: table ↔ card  
- Axios interceptor with auth token support  
- TanStack Query (GET) and Mutation (POST/PUT/DELETE)  

---

## 🧑‍💻 Tech Stack

| Tech       | Description |
|------------|-------------|
| **React**  | Frontend UI (Tailwind + DaisyUI) |
| **TanStack Query** | API state management |
| **React Router** | Route handling (including private routes) |
| **Firebase Auth** | Authentication & Role-based access |
| **Node.js + Express** | REST API Backend |
| **MongoDB** | NoSQL database |
| **Stripe** | Payment integration |
| **Axios** | HTTP client with interceptors |
| **Vercel / Firebase / Netlify** | Deployment |

