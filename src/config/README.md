# Component Configuration Guide

## Adding a New Component

To add a new component without breaking the app:

1. **Create your component** in `src/components/` or `src/prototypes/`
   ```tsx
   // src/components/my-component.tsx
   export default function MyComponent() {
     return <div>My Component</div>
   }
   ```

2. **Add to `src/config/components.ts`**:
   ```tsx
   import MyComponent from '@/components/my-component'
   
   export const componentRegistry: Record<string, ComponentConfig> = {
     // ... existing components
     'my-component': {
       id: 'my-component',
       name: 'My Component',
       description: 'Description of my component',
       version: '1.0.0',
       date: '2024-11-14',
       product: 'DEX', // or 'Feed'
       component: MyComponent,
       isFullPage: false, // Set to true for full-screen components
     },
   }
   ```

3. **Add icon** (optional) in `src/pages/Home.tsx`:
   ```tsx
   const componentIcons: Record<string, React.ReactNode> = {
     // ... existing icons
     'my-component': <YourIconSVG />,
   }
   ```

That's it! The component will automatically:
- Appear in the index page
- Be accessible at `/components/my-component`
- Have proper error handling
- Work with the routing system

## Component Types

- **Regular components**: Render in a wrapper with padding
- **Full-page components**: Set `isFullPage: true` to render full-screen (like FeedV3, Searchbox, Charts)

## Error Handling

If a component fails to load or has an error, it will show a friendly error message instead of breaking the entire app.

