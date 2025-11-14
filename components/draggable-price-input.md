# Draggable Price Input

A price input component that allows users to adjust values through dragging, clicking increment/decrement buttons, or direct text input.

## Features

- **Drag to adjust**: Click and drag horizontally to change the value
- **Increment/Decrement buttons**: Quick +/- controls for fine adjustments
- **Direct input**: Type values directly with automatic formatting
- **Formatted display**: Numbers are displayed with thousand separators and 2 decimal places
- **Visual feedback**: Cursor changes to indicate draggable state

## Behavior

### Drag Interaction
- Click and drag anywhere on the input area (except the input field itself) to adjust the value
- Sensitivity: 0.5 units per pixel moved
- Minimum value: 0 (prevents negative values)
- Cursor changes to `ew-resize` during drag

### Input Field
- Accepts typed input with automatic comma formatting
- Validates input on blur
- Formats invalid input to the last valid value
- Text selection disabled during drag operations

### Increment/Decrement
- Increment: Adds 1 to current value
- Decrement: Subtracts 1 (minimum 0)

## Implementation

**File**: [`draggable-price-input.tsx`](./draggable-price-input.tsx)

### Key Implementation Details

1. **State Management**
   - `value`: Numeric value (used for calculations)
   - `inputValue`: Formatted string (displayed in input)
   - `isDragging`: Tracks drag state

2. **Drag Handling**
   - Mouse events attached to document during drag
   - Prevents dragging when clicking directly on input field
   - Uses `clientX` difference to calculate value change

3. **Number Formatting**
   - Uses `toLocaleString` with US locale
   - Always shows 2 decimal places
   - Adds thousand separators (commas)

4. **Styling**
   - Uses Tailwind CSS classes
   - Large text (text-4xl) for input
   - Minimal, clean design with gray color scheme

## Usage Example

```tsx
import DraggablePriceInput from './components/draggable-price-input';

function App() {
  return <DraggablePriceInput />;
}
```

## Design Decisions

- **Large input text**: Makes the value easy to read and emphasizes importance
- **Grab cursor**: Indicates draggable functionality
- **Separate formatted display**: Shows formatted value below input for clarity
- **Prevents negative values**: Business logic constraint for price inputs
- **Input field protection**: Clicking directly on input allows normal text editing

## Dependencies

- React (with hooks: useState, useRef, useEffect)
- Tailwind CSS (for styling)

