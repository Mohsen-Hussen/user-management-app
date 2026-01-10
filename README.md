# User Management App

A modern React application for managing team members with real-time status tracking, built with TypeScript, Vite, and Tailwind CSS.

## 🚀 Features

- **Member Management**: edit, delete, and view team member details
- **Status Tracking**: Monitor active/absent status in real-time
- **Project Assignment**: Track members' current projects and roles
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Type Safety**: Full TypeScript implementation with strict type checking
- **Modern UI**: Beautiful interface using Tailwind CSS and Radix UI components with dark/light mode

## 🛠️ Tech Stack

- **Frontend**: React 19 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI (Dialog, Dropdown Menu, Popover, Switch)
- **Forms**: React Hook Form + Zod validation
- **State Management**: TanStack Query (React Query)
- **Data Tables**: TanStack Table
- **Icons**: Lucide React
- **Mock API**: JSON Server (for development)
- **Code Quality**: ESLint + Prettier

## 📦 Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd user-management-app
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
# Start only the React app
npm run dev

# Start both React app and mock API server
npm run dev:all
```

4. Open your browser and navigate to `http://localhost:5173`

## 🗂️ Project Structure

```
src/
├── app/
│   ├── api/           # API utilities and configurations
│   ├── assets/        # Static assets (images, icons)
│   ├── config/        # App configuration
│   ├── hooks/         # Custom React hooks
│   ├── pages/         # Page components
│   ├── providers/     # React context providers
│   ├── shared/        # Shared components and utilities
│   └── types/         # TypeScript type definitions
├── styles/            # Global styles
├── App.tsx            # Main app component
└── main.tsx           # App entry point
```

## 🚀 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run mock` - Start mock API server
- `npm run dev:all` - Start both dev server and mock API

## 📊 Mock API

The app uses JSON Server for mock data. The mock server runs on port 3001 and provides endpoints for user management.

### Available Endpoints

- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get specific user
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

## 🎨 Development

### Code Style

This project uses:

- **ESLint** for code linting
- **Prettier** for code formatting
- **TypeScript** for type safety

### Component Architecture

- **Shared Components**: Reusable UI components in `src/app/shared/components/`
- **Pages**: Route-level components in `src/app/pages/`
- **Hooks**: Custom logic in `src/app/hooks/`
- **Types**: Centralized type definitions in `src/app/types/`

## 🔧 Configuration

### Environment Variables

Create a `.env.example` file in the root directory:

```env
VITE_API_URL=http://localhost:3001
```

### Mock Data

Mock data is located in `mock/db.json`. You can modify this file to test different scenarios.

## 📱 Features in Detail

### User Management

- View all team members in a responsive table
- Edit existing member information
- Delete members with confirmation
- Search and filter functionality

### Status Tracking

- Real-time status updates (Active/Absent)
- Visual indicators for member availability

## 📋 Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run mock         # Start mock API server
npm run dev:all      # Start both servers concurrently

# Building
npm run build        # Build for production
npm run preview      # Preview production build

# Code Quality
npm run lint         # Run ESLint
```

## 🔧 Configuration

### TypeScript Configuration

The project uses strict TypeScript settings including:

- `exactOptionalPropertyTypes: true` for precise optional property handling
- `noUncheckedIndexedAccess: true` for safer array/object access
- Full type checking with `strict: true`

### ESLint Configuration

The project includes comprehensive linting rules for:

- React best practices
- TypeScript type safety
- Code formatting consistency

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 🆘 Troubleshooting

### Common Issues

1. **Port Conflicts**
   - Change mock API port in `package.json` mock script
   - Update `VITE_API_BASE_URL` accordingly

2. **TypeScript Errors**
   - Ensure all dependencies are installed
   - Check `tsconfig.json` for strict mode settings

3. **Build Failures**
   - Run `npm run lint` to check for code issues
   - Verify all imports are correct

4. **API Connection Issues**
   - Ensure mock server is running on correct port
   - Check environment variables

## 📊 Performance

The application is optimized for:

- Fast development builds with Vite
- Efficient bundle splitting
- Optimized images and assets
- Smooth animations and transitions
