# Replit.md - Coding Game Application

## Overview

This is a React-based coding game application that teaches programming concepts through interactive gameplay. The application features a modern full-stack architecture with a React frontend, Express backend, and PostgreSQL database using Drizzle ORM. The game challenges players to execute directional commands (like `maju()`, `kanan()`, `kiri()`, `mundur()`) in the correct sequence to progress through levels.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite with hot module replacement
- **UI Framework**: Shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with custom CSS variables for theming
- **State Management**: React hooks with local state management
- **HTTP Client**: Fetch API with custom query client wrapper
- **Routing**: Wouter for client-side routing

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript with ES modules
- **API Design**: RESTful endpoints following conventional patterns
- **Middleware**: Custom logging middleware for request/response tracking
- **Error Handling**: Centralized error handling with proper HTTP status codes

### Database Layer
- **Database**: PostgreSQL (configured but can be provisioned)
- **ORM**: Drizzle ORM for type-safe database operations
- **Schema Management**: Drizzle-kit for migrations and schema management
- **Connection**: Neon Database serverless driver for PostgreSQL connectivity

## Key Components

### Game Logic Components
- **GameBoard**: Main game container orchestrating all game components
- **DirectionalControls**: Interactive control pad for player input (up, down, left, right)
- **CodeDisplay**: Shows the code sequence with visual feedback and animations
- **ProgressIndicators**: Visual progress tracking with celebration animations

### Data Models
- **Users**: Basic user management with username/password authentication
- **GameStates**: Persistent game state including level, progress, and sequences
- **Shared Schema**: Type-safe validation using Zod schemas

### Storage Strategy
- **Production**: PostgreSQL with Drizzle ORM for persistent storage
- **Development**: In-memory storage implementation for rapid development
- **Interface**: Abstract storage interface allowing easy switching between implementations

## Data Flow

1. **Game Initialization**: Generate random command sequences based on difficulty level
2. **Player Input**: Capture directional inputs through the control interface
3. **Validation**: Compare player sequence against expected code sequence
4. **State Management**: Update game state with progress and validation results
5. **Persistence**: Save game state to database (when implemented)
6. **Level Progression**: Advance difficulty and sequence length upon completion

## External Dependencies

### Core Framework Dependencies
- React ecosystem: React, React DOM, React Router (Wouter)
- TypeScript compilation and type checking
- Vite for development server and build process

### UI and Styling
- Radix UI primitives for accessible component foundation
- Tailwind CSS for utility-first styling
- Lucide React for consistent iconography
- Class Variance Authority for component variant management

### Backend Dependencies
- Express.js for HTTP server and routing
- Drizzle ORM and Neon Database for data persistence
- Zod for runtime type validation and schema management
- TSX for TypeScript execution in development

### Development Tools
- Replit integration plugins for development environment
- ESBuild for production bundling
- PostCSS for CSS processing and autoprefixing

## Deployment Strategy

### Development Environment
- **Command**: `npm run dev` - Starts development server with hot reloading
- **Port**: Configured for Replit environment with custom middleware
- **Features**: Runtime error overlay, live reload, TypeScript checking

### Production Build
- **Build Process**: Vite builds frontend assets, ESBuild bundles backend
- **Output**: Static assets in `dist/public`, server bundle in `dist/index.js`
- **Command**: `npm run build` followed by `npm start`

### Database Management
- **Migration**: `npm run db:push` applies schema changes
- **Configuration**: Environment variable `DATABASE_URL` required
- **Development**: Falls back to in-memory storage when database unavailable

## Changelog

```
Changelog:
- July 05, 2025. Initial setup
- July 05, 2025. Updated game with:
  - Smaller arrow controls that only appear on level 1
  - Grid wrapping functionality (movement wraps around edges)
  - Advanced programming concepts (loops, functions) for higher levels
  - Multi-line code display with proper indentation
  - Enhanced level progression system
- July 06, 2025. Added while loop levels and improved visual design:
  - Added while loop levels (11-15) with proper indentation
  - Enlarged grid dots from 20x20 to 24x24 pixels
  - Improved code display with color coding (while loops in red)
  - Better spacing between grid elements
  - Fixed sequence generation for while loops
- July 06, 2025. Enhanced level progression and adaptive UI:
  - Restructured level progression from basic to advanced (26+ levels)
  - Added comprehensive programming concepts: while, for, nested loops, if statements
  - Implemented left-aligned code display with proper indentation visibility
  - Created dynamic grid sizing based on code complexity
  - Added color coding: red for control structures, blue for commands
  - Grid automatically adjusts size based on code length and complexity
- July 06, 2025. Implemented advanced loop and conditional structures:
  - Extended level system to 51+ levels with sophisticated programming concepts
  - Added if-else statements (levels 26-30)
  - Implemented nested if statements (levels 31-35)
  - Created while loops with if conditions (levels 36-40)
  - Added for loops with nested if-else (levels 41-45)
  - Introduced functions with parameters (levels 46-50)
  - Complex mixed structures with break statements (levels 51+)
  - Enhanced color coding to include else, def, break keywords
  - Improved grid sizing algorithm for complex nested structures
```

## User Preferences

```
Preferred communication style: Simple, everyday language.
```