# UI Component Collection

A curated collection of UI components and design decisions for developers to reference and implement.

## Quick Start

### Local Development

```bash
# Install dependencies
npm install

# Install Feed V3 dependencies
cd prototypes/feed && npm install && cd ../..

# Run development server (starts both main app and Feed V3)
npm run dev
```

Visit `http://localhost:3000` to see the interactive component showcase.

The Feed V3 prototype will automatically start on `http://localhost:5173` and is accessible via the component showcase.

## Project Structure

```
├── src/                    # Vite React app source
│   ├── pages/             # Page components
│   │   ├── Home.tsx       # Component index page
│   │   └── components/    # Component showcase pages
│   ├── components/        # Component implementations
│   ├── App.tsx            # Main app router
│   └── main.tsx           # Entry point
├── prototypes/            # Interactive prototypes
│   └── feed/             # Feed V3 prototype
├── data/                  # Component metadata
└── README.md             # This file
```

## Prototypes

This project includes interactive prototypes:

- **Feed V3** - Located in `prototypes/feed/`, runs on port 5173
- **Draggable Price Input** - Embedded component in this repo

### Running Prototypes

**All prototypes together:**
```bash
npm run dev  # Starts both main app (port 3000) and Feed V3 (port 5173)
```

**Feed V3 only:**
```bash
npm run dev:feed
# Or manually:
cd prototypes/feed
npm install
npm run dev
```

Then access it via the component showcase at `/components/feed-v3` - it will load live in an iframe.

## Usage

Each component includes:
- **Implementation code** - Ready-to-use React component
- **Documentation** - Design decisions, behavior, and usage guidelines
- **Features** - Key functionality and interactions
- **Interactive Demo** - Live showcase accessible via the web interface

Browse the components directory to see all available implementations.

## Tech Stack

- **Vite** - Build tool and dev server
- **React** - UI framework
- **React Router** - Client-side routing
- **Tailwind CSS** - Styling
- **TypeScript** - Type safety

