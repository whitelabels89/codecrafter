# iCoding Compute It - Educational Programming Game

An interactive educational programming game designed for young learners at Queen's Academy iCoding platform. The game teaches programming concepts through role-reversal gameplay where players act as computers, interpreting Indonesian programming commands to solve grid-based trajectory puzzles.

## 🎮 Game Features

- **Progressive Level System**: 60+ levels from basic commands to advanced programming structures
- **Indonesian Programming Commands**: Uses familiar Indonesian commands like `maju()`, `kanan()`, `kiri()`, `mundur()`
- **Auto-Sizing Grid System**: Dynamic grid sizing based on code complexity
- **Advanced Programming Concepts**: 
  - Basic commands (levels 1-10)
  - While loops (levels 11-20)
  - For loops (levels 21-30)
  - If-else statements (levels 31-40)
  - Nested structures (levels 41-50)
  - Functions and complex logic (levels 51+)

## 🚀 Quick Start

### Development
```bash
npm install
npm run dev
```

### Production Build
```bash
npm run build
npm start
```

## 🌐 Deployment to Render

### Step 1: Connect Repository
1. Fork or push this repository to GitHub
2. Connect your GitHub account to Render
3. Create a new "Web Service" on Render
4. Connect your repository

### Step 2: Configuration
Render will automatically detect the `render.yaml` file and use these settings:
- **Build Command**: `npm install && npm run build`
- **Start Command**: `npm start`
- **Environment**: Node.js
- **Port**: 10000

### Step 3: Environment Variables (Optional)
The game uses in-memory storage by default. To add PostgreSQL database:
```
DATABASE_URL=postgresql://username:password@host:port/database
```

### Step 4: Deploy
Click "Deploy" and Render will automatically build and deploy your game!

## 🛠️ Technical Stack

- **Frontend**: React 18 + TypeScript, Tailwind CSS, Shadcn/ui
- **Backend**: Express.js with TypeScript
- **Database**: PostgreSQL with Drizzle ORM (optional, uses in-memory storage)
- **Build Tool**: Vite for frontend, ESBuild for backend
- **Deployment**: Render-ready configuration

## 📝 Game Mechanics

1. **Code Display**: Shows programming commands with proper indentation
2. **Grid Navigation**: 3x3 grid with wrapping movement
3. **Input Controls**: Arrow keys or on-screen controls
4. **Progress Tracking**: Visual feedback and level progression
5. **Error Handling**: Clear feedback for incorrect sequences

## 🎯 Educational Goals

- Teach programming logic and sequence thinking
- Introduce control structures (loops, conditionals)
- Develop problem-solving skills
- Build familiarity with programming syntax
- Progressive difficulty for sustained learning

## 📱 Responsive Design

- Desktop-optimized interface
- Touch-friendly controls
- Adaptive grid sizing
- Level 1 special treatment with larger grid and smaller controls

## 🔧 Development Notes

- Uses in-memory storage for rapid development
- PostgreSQL support for production environments
- Comprehensive error handling and logging
- Hot module replacement for development

---

**Queen's Academy iCoding Platform** - Teaching the next generation of programmers through interactive gameplay.