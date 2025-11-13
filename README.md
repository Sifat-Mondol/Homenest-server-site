# HomeNest - Server Side

This is the **server-side** code for **HomeNest**, a real estate listing platform where users can post, browse, and manage properties. This server provides REST APIs for properties and ratings, and connects to MongoDB for data storage.

---

## 🌐 Live API

Deployed on Vercel:  
`https://<your-vercel-project>.vercel.app/`

**Available endpoints:**

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/properties` | GET | Get all properties (supports search & sorting) |
| `/api/properties/:id` | GET | Get single property by ID |
| `/api/properties` | POST | Add a new property |
| `/api/properties/:id` | PUT | Update property by ID |
| `/api/properties/:id` | DELETE | Delete property by ID |
| `/api/properties/featured` | GET | Get latest 6 featured properties |
| `/api/properties/by-user/:email` | GET | Get properties by user email |
| `/api/ratings` | GET | Get ratings (can filter by propertyId) |
| `/api/ratings` | POST | Add a new rating |
| `/api/ratings/:id` | DELETE | Delete rating by ID |

---

## 🚀 Features

- REST API for property CRUD operations
- Ratings & Reviews API
- MongoDB integration for data storage
- Search and sort functionality for properties
- Featured properties API
- Secure and structured endpoints

---

## 💻 Technology Stack

- **Node.js** - Server runtime
- **Express.js** - Web framework
- **MongoDB** - Database
- **Vercel** - Hosting
- **dotenv** - Environment variables
- **CORS** - Cross-origin resource sharing

---
