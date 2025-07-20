# NYT Article Search

A Single Page Application (SPA) built with React and TypeScript that allows users to search for articles from The New York Times using the Article Search API.

## Features

- Search for articles by keyword
- Display search results in a list with article title, author, and publication date
- Click on articles to open them in a new tab (links to NYT)
- Sort articles by relevance, newest, or oldest
- Responsive design (mobile-first)
- Loading, error, and empty states
- Pagination with "Load More" functionality

## Tech Stack

- **React** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **SWR** - Data fetching and caching
- **Zustand** - State management
- **Axios** - HTTP client
- **Jest & Testing Library** - Testing

## Project Structure

The project follows a clean architecture approach with the following structure:

```
src/
├── components/       # UI components
│   ├── ArticleList/  # Article list and item components
│   ├── SearchBar/    # Search bar component
│   └── UI/           # Common UI components (loading, error states)
├── hooks/            # Custom React hooks
├── services/         # API services
├── store/            # State management
├── types/            # TypeScript types
└── utils/            # Utility functions
```

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn
- New York Times API key

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/ervanari/praisindo-typescript.git
   cd praisindo-typescript
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the root directory and add your NYT API key:
   ```
   REACT_APP_NYT_API_KEY=your_api_key_here
   ```

4. Start the development server:
   ```
   npm start
   ```

5. Open [http://localhost:3000](http://localhost:3000) to view the app in the browser.

### Getting an API Key from The New York Times

1. Go to [The New York Times Developer Portal](https://developer.nytimes.com/)
2. Sign up for an account or log in
3. Go to your "Apps" dashboard
4. Click "New App" and fill out the form
5. Select "Article Search API" from the list of APIs
6. Once your app is created, you'll receive an API key
7. Add this key to your `.env` file as shown above

## Testing

Run the test suite with:

```
npm test
```

The project includes unit tests for components, hooks, and services.

## Deployment to Vercel

This project includes a `vercel.json` configuration file for easy deployment to Vercel.

1. Install the Vercel CLI:
   ```
   npm install -g vercel
   ```

2. Log in to Vercel:
   ```
   vercel login
   ```

3. Add your NYT API key as a secret:
   ```
   vercel secrets add nyt_api_key your_api_key_here
   ```

4. Deploy the project:
   ```
   vercel
   ```

5. For production deployment:
   ```
   vercel --prod
   ```

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- [The New York Times API](https://developer.nytimes.com/)
- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [SWR](https://swr.vercel.app/)
- [Zustand](https://github.com/pmndrs/zustand)
