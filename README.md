
# Kreovix — Creative Vision, Real Spaces

**Discover. Book. Create.**

🌐 **Live Website:** https://kreovix-client.vercel.app/

## About Kreovix

Kreovix is a full-stack creative studio booking and sharing platform designed to connect photographers, filmmakers, podcasters, musicians, and other creative professionals with suitable production spaces.

The platform allows studio owners to list and manage their creative workspaces, while users can explore studios, compare facilities, check pricing, and book spaces according to their needs.

Kreovix aims to simplify the process of discovering and booking creative spaces through a modern, secure, and user-friendly experience.

## Meaning Behind the Name — Kreovix

The name **Kreovix** is inspired by the concept of **"Creative Vision."**

It represents the connection between creativity, imagination, and the vision to transform ideas into reality.

- **Kreo** represents creativity, creation, and innovation.
- **Vix** represents vision, inspiration, and future possibilities.

Together, **Kreovix** symbolizes a platform where creative visions come to life by connecting creators with the right spaces.

> **Kreovix — Where Creative Visions Find Their Space.**

## Live Website

**Visit Kreovix:** https://kreovix-client.vercel.app/

The frontend is deployed on Vercel.

For local development, the application runs at:

http://localhost:3000

## Key Features

- **Modern Responsive Design:** Fully responsive interface optimized for desktop, tablet, and mobile devices.
- **User Authentication:** Secure email/password registration and login using Better Auth.
- **Google Social Login:** Users can conveniently authenticate using their Google accounts.
- **JWT Authentication & Authorization:** Secure backend API access using JWT verification and protected routes.
- **Studio Discovery:** Explore creative studios with category-based filtering and search functionality.
- **Featured Studios:** Discover featured and newly added creative workspaces directly from the homepage.
- **Studio Details:** View studio images, amenities, pricing, maximum capacity, host information, and reviews.
- **Studio Management:** Authenticated users can create, update, and delete their own studio listings.
- **Studio Booking System:** Book creative spaces for selected dates and time slots with transparent pricing.
- **Booking Management:** View booking history, track reservation status, and cancel eligible bookings.
- **Double-Booking Prevention:** Booking validation helps prevent overlapping confirmed reservations.
- **Saved Studios Wishlist:** Save favorite studios and manage them using a MongoDB-backed wishlist.
- **Light & Dark Mode:** Switch between themes with persistent user preferences.
- **Custom Notifications:** Interactive toast notifications using Sonner.
- **Loading & Error Handling:** Animated loading states, empty states, and a custom 404 page.
- **About & Contact Pages:** Learn about the platform and find ways to get in touch.

## Technology Stack

| Layer | Technologies |
|-------|-------------|
| Frontend | Next.js (App Router), React, TypeScript |
| Styling | Tailwind CSS, shadcn/ui |
| Icons | Lucide React |
| Authentication | Better Auth, Google OAuth, JWT |
| Backend | Node.js, Express.js |
| Database | MongoDB |
| Database Adapter | Better Auth MongoDB Adapter |
| Notifications | Sonner |
| Slider | Swiper.js |
| Theme Management | next-themes |
| Frontend Deployment | Vercel |
| Backend Hosting | Express.js server |

## Application Routes

### Public Routes

| Route | Description |
|-------|-------------|
| `/` | Homepage |
| `/studios` | Explore Studios |
| `/studios/[id]` | Studio Details |
| `/about` | About Us |
| `/contact` | Contact Us |
| `/login` | User Login |
| `/register` | User Registration |

### Private Routes

| Route | Description |
|-------|-------------|
| `/add-new-studio` | Add New Studio |
| `/my-listings` | Manage Studio Listings |
| `/studios/edit/[id]` | Update Studio |
| `/my-bookings` | Booking Management |
| `/wishlist` | Saved Studios |
| `/profile` | User Profile |

Private routes are protected using Better Auth session verification and backend JWT authentication.

## Authentication & Security

Kreovix uses Better Auth for authentication and session management.

### Security Features

- Email/password authentication
- Google OAuth authentication
- JWT-based API authentication
- Protected frontend routes
- Backend JWT verification middleware
- User-specific resource access
- MongoDB-based session and user management
- Session expiration and cookie caching

JWT verification ensures that protected API endpoints are accessible only to authenticated users.

## Studio Booking Workflow

1. **Explore Studios:** Browse available creative workspaces.
2. **Select a Studio:** View detailed studio information and facilities.
3. **Choose Booking Hours:** Select the preferred booking date and time.
4. **Review Booking:** Check duration, hourly rate, deposit, and total price.
5. **Confirm Reservation:** Submit the booking request.
6. **Manage Bookings:** View reservation status and manage eligible cancellations.

## Studio Management

Authenticated studio owners can:

- Add new studio listings.
- Provide studio details, images, and amenities.
- Set hourly rental prices and security deposits.
- View their own studio listings.
- Update existing studio information.
- Delete studio listings with confirmation.

All studio information is stored in MongoDB.

## Wishlist System

Kreovix allows authenticated users to save their favorite studios.

- Save studios using the Heart/Save Studio button.
- Store wishlist information in MongoDB.
- View saved studios on the My Wishlist page.
- Remove studios from the wishlist.
- Maintain saved studios across page refreshes and login sessions.

## Theme Customization

The application supports both Light Mode and Dark Mode.

Theme customization is implemented using `next-themes` and Tailwind CSS.

Users can switch between themes using the toggle button in the navigation bar.

The selected theme is preserved in browser storage.

## Project Links

- **Live Website:** https://kreovix-client.vercel.app/
- **Frontend Repository:** https://github.com/waliullah9277/kreovix-client
- **Backend Repository:** https://github.com/waliullah9277/kreovix-server

## Local Installation & Setup

### Prerequisites

Before running the application, make sure the following tools are installed:

- Node.js
- npm
- Git
- MongoDB or MongoDB Atlas
- A code editor such as Visual Studio Code

### 1. Clone the Project

Clone the frontend and backend repositories to your local machine.

### 2. Backend Setup

Navigate to the backend project:

```bash
cd kreovix-server
```

Install the dependencies:

```bash
npm install
```

Create a `.env` file in the backend root directory:

```env
PORT=8000
MONGODB_URI=your_mongodb_connection_string
CLIENT_URL=http://localhost:3000
```

Add any additional environment variables required by your backend configuration.

Start the backend server using the script defined in `package.json`, for example:

```bash
nodemon index.js
```

### 3. Frontend Setup

Navigate to the frontend project:

```bash
cd kreovix-client
```

Install the dependencies:

```bash
npm install
```

Create a `.env.local` file in the frontend root directory:

```env
NEXT_PUBLIC_URL=http://localhost:8000
BETTER_AUTH_URL=http://localhost:3000
BETTER_AUTH_SECRET=your_better_auth_secret
MONGODB_URI=your_mongodb_connection_string
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

Configure the Google OAuth credentials for your development environment.

Start the frontend:

```bash
npm run dev
```

Open the application in your browser:

http://localhost:3000

**Note:** Never commit `.env` or `.env.local` files containing real credentials to GitHub.

## Project Structure

```text
kreovix-client/
├── public/
│   └── images/
├── src/
│   ├── app/
│   │   ├── api/
│   │   ├── studios/
│   │   ├── login/
│   │   ├── register/
│   │   ├── my-listings/
│   │   ├── my-bookings/
│   │   ├── wishlist/
│   │   ├── profile/
│   │   ├── about/
│   │   └── contact/
│   ├── components/
│   │   ├── auth/
│   │   ├── home/
│   │   ├── studios/
│   │   ├── my-bookings/
│   │   └── shared/
│   ├── lib/
│   └── proxy.ts
├── package.json
└── README.md

kreovix-server/
├── index.js
├── package.json
└── .env
```

## Deployment

The Kreovix frontend is deployed on **Vercel**.

**Live Application:**

https://kreovix-client.vercel.app/

The backend is built with Express.js and connected to MongoDB.

Production deployment requires configuring the appropriate backend URL, authentication origins, environment variables, CORS settings, and Google OAuth callback URLs.

## Future Improvements

- Advanced studio availability calendar
- Online payment gateway integration
- Real-time booking notifications
- Studio owner analytics dashboard
- Advanced ratings and review management
- Enhanced search and location-based recommendations

## Project Goal

The primary goal of Kreovix is to create a centralized marketplace where creative professionals can easily discover, book, and manage production spaces.

By combining studio discovery, secure authentication, booking management, and modern user experience, Kreovix helps creative individuals focus on what matters most — bringing their ideas to life.

---

**Kreovix — Where Creative Visions Find Their Space.**

**Discover. Book. Create.**
