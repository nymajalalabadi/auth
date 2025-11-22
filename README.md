# Training App with Authentication

A modern Next.js application featuring user authentication and a training activities dashboard. Built with Lucia Auth, SQLite database, and styled with Tailwind CSS and custom dark theme.

## Features

- **User Authentication**: Secure login and signup system using Lucia Auth
- **Session Management**: Cookie-based session handling with automatic refresh
- **Training Activities**: Browse various training activities (Boxing, Cycling, Gaming, Running, Sailing, Weightlifting, Yoga)
- **Responsive Design**: Dark theme with modern UI components
- **Form Validation**: Client-side and server-side validation for auth forms
- **Type Safety**: Full TypeScript support

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Authentication**: Lucia Auth v3
- **Database**: SQLite with Better SQLite3
- **Styling**: Tailwind CSS v4 + Custom CSS
- **Language**: TypeScript
- **State Management**: React Server Actions

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd auth
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
auth/
├── actions/
│   └── auth-actions.js          # Server actions for auth (login, signup, logout)
├── app/
│   ├── (auth)/                  # Protected routes group
│   │   ├── layout.tsx          # Auth layout with header
│   │   └── training/
│   │       └── page.tsx        # Training activities page
│   ├── globals.css             # Global styles with dark theme
│   ├── layout.tsx              # Root layout
│   └── page.tsx                # Home page with auth form
├── components/
│   └── auth-form.tsx           # Authentication form component
├── lib/
│   ├── auth.js                 # Lucia auth configuration
│   ├── db.js                   # Database connection
│   ├── hash.js                 # Password hashing utilities
│   ├── training.js             # Training data queries
│   └── user.js                 # User management functions
├── public/
│   ├── images/
│   │   └── auth-icon.jpg       # Auth form icon
│   └── trainings/              # Training activity images
├── training.db                 # SQLite database file
└── package.json
```

## Database Schema

The application uses SQLite with the following tables:

- **users**: User accounts (id, email, password_hash)
- **sessions**: User sessions (id, user_id, expires_at)
- **trainings**: Training activities (id, title, description, image)

## Authentication Flow

1. **Registration**: Users can create accounts with email/password
2. **Login**: Existing users authenticate with credentials
3. **Session Management**: Lucia handles session creation/validation
4. **Protected Routes**: Training page requires authentication
5. **Logout**: Destroys session and redirects to login

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Environment Variables

The app uses secure defaults for development. For production deployment, ensure:

- `NODE_ENV=production` for secure cookies
- Proper database file permissions

## Styling

- **Dark Theme**: Custom gradient background (#121214 to #272629)
- **Typography**: Merriweather font for headings, Poppins for body
- **Components**: Styled forms, cards, and navigation elements
- **Responsive**: Mobile-first design with CSS Grid

## API Routes

The app uses Next.js Server Actions for authentication:

- `signup()` - User registration
- `login()` - User authentication
- `logout()` - Session destruction
- `auth()` - Unified auth handler

## Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Deploy automatically on push to main branch
3. Environment variables are handled automatically

### Other Platforms

Ensure your deployment platform supports:
- Node.js runtime
- SQLite database access
- Environment variable configuration

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## License

This project is licensed under the MIT License.
