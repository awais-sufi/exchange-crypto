# Exchange App Frontend

A modern cryptocurrency exchange frontend built with Next.js 14, featuring real-time trading charts, order book, and market data visualization.

## Features

- **Real-time Trading Charts** - Interactive candlestick charts using Lightweight Charts
- **Order Book** - Live bid/ask visualization with depth tables
- **Market Data** - Real-time ticker, trades, and market information
- **Portfolio Tracking** - View your assets and portfolio value
- **Order Management** - Place and track your orders
- **Swap Interface** - Quick token swap functionality
- **Multiple Markets** - Support for various trading pairs

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Charts**: Lightweight Charts
- **HTTP Client**: Axios
- **Real-time**: WebSocket

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd exchange-app-frontend
```

2. Install dependencies:

```bash
npm install
```

3. Configure environment variables:

Create a `.env.local` file in the root directory:

```env
# Backend API URL
NEXT_PUBLIC_API_BASE_URL=https://your-api-endpoint.com/api/v1

# Exchange API Key (optional)
NEXT_PUBLIC_API_KEY=your_api_key_here
```

4. Run the development server:

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
app/
├── components/           # Reusable UI components
│   ├── depth/           # Order book components
│   ├── core/            # Core UI elements
│   ├── Appbar.tsx       # Navigation bar
│   ├── MarketBar.tsx    # Market selector
│   ├── SwapUI.tsx       # Swap interface
│   ├── TradeView.tsx   # Trading chart
│   └── Trades.tsx       # Trade history
├── trade/[market]/      # Trading page
├── markets/            # Markets listing
├── portfolio/          # Portfolio page
├── orders/              # Orders page
├── trades/              # Trades history
├── settings/            # Settings page
└── utils/              # Utilities
    ├── httpClient.ts    # API client
    ├── wsClient.ts      # WebSocket client
    ├── ChartManager.ts  # Chart management
    └── types.ts         # TypeScript types
```

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_API_BASE_URL` | Backend API base URL | Yes |
| `NEXT_PUBLIC_API_KEY` | Exchange API key for authenticated requests | No |

## Pages

- `/` - Home/Dashboard
- `/markets` - Available markets
- `/trade/[market]` - Trading interface
- `/portfolio` - Your portfolio
- `/orders` - Open orders
- `/trades` - Trade history
- `/settings` - App settings

## License

MIT
