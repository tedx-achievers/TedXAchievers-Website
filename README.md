# TEDxAchievers Website

Welcome to the codebase for the TEDxAchievers website! This project is built using React, Vite, TailwindCSS, and `framer-motion` for smooth animations.

## SEO Management

This project uses `react-helmet-async` for client-side SEO management. A reusable `<SEO />` component is available in `src/components/SEO.tsx`.

### How to add SEO to a new page
Simply import the `<SEO />` component and drop it anywhere in your page's JSX. 

```tsx
import SEO from '../components/SEO';

const MyNewPage = () => {
  return (
    <div>
      <SEO 
        title="My New Page | TEDxAchievers" 
        description="This is the description for search engines." 
      />
      <h1>Welcome to my new page</h1>
    </div>
  );
};
```
The SEO component automatically handles OpenGraph tags (for Facebook/LinkedIn) and Twitter Cards.

## Automated Sitemap Generation

The sitemap (`sitemap.xml`) is automatically generated every time you build the project for production (`npm run build`). This is handled by `vite-plugin-sitemap`. 

**Important:** If you add a new route (e.g., `/sponsors`) to `App.tsx`, make sure you also add it to the `dynamicRoutes` array in `vite.config.ts` so search engines can find it!

## Setting up Google Analytics (GA4)

Since this is a Single Page Application (SPA), here are the exact steps to integrate Google Analytics:

1. **Get your Measurement ID:**
   - Go to Google Analytics and create a property for your website.
   - Find your Measurement ID (it starts with `G-XXXXXXXXXX`).

2. **Install `react-ga4`:**
   Run the following command in your terminal:
   ```bash
   npm install react-ga4
   ```

3. **Initialize GA in your App:**
   Open `src/App.tsx` and initialize Google Analytics outside of your component:
   ```tsx
   import ReactGA from "react-ga4";
   ReactGA.initialize("G-XXXXXXXXXX"); // Replace with your ID
   ```

4. **Track Page Views (Optional but recommended):**
   If you want to track when users navigate between pages (since the page doesn't physically reload), create a custom hook or use a `useEffect` inside `App.tsx` that listens to `useLocation()` from `react-router-dom`:
   ```tsx
   import { useEffect } from "react";
   import { useLocation } from "react-router-dom";
   import ReactGA from "react-ga4";

   const AnalyticsTracker = () => {
     const location = useLocation();
     useEffect(() => {
       ReactGA.send({ hitType: "pageview", page: location.pathname + location.search });
     }, [location]);
     return null;
   };
   ```
   Then place `<AnalyticsTracker />` inside your `<BrowserRouter>` in `App.tsx`.
