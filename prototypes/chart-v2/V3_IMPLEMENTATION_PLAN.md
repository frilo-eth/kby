# LP Chart V3 Implementation Plan

## Overview
This plan breaks down the v3 chart implementation into manageable, incremental steps to minimize errors and token consumption. Each step builds on the previous one and can be tested independently.

## Design Reference
- Figma Node ID: `1264-38993`
- Main chart component: `1264:39013` (lp-chart)

## Implementation Strategy

### Phase 1: Foundation & Structure (Low Risk)
**Goal**: Set up the basic layout and structure without complex interactions

1. **Layout Structure**
   - Create main container with proper dimensions (537x400 for chart area)
   - Set up header section with pair info (WETH/USDC, status badge)
   - Create price display section (current price, USDC per WETH)
   - Add control buttons (reset, zoom in/out)

2. **Static Chart Container**
   - Create SVG container with proper viewBox
   - Set up gradient definitions (active/inactive ranges)
   - Add baseline and legend (price labels: 2.00k, 2.50k, 3.00k, etc.)

**Testing**: Verify layout matches Figma dimensions and spacing

---

### Phase 2: Chart Visualization (Medium Risk)
**Goal**: Render the histogram/liquidity distribution

1. **Data Structure**
   - Define liquidity data structure (price points with liquidity amounts)
   - Create mock data generator for testing
   - Map price ranges to visual positions

2. **Histogram Rendering**
   - Render bars with proper distribution curve
   - Apply gradients based on active/inactive state
   - Ensure smooth transitions between bars
   - Add current price indicator (dashed vertical line)

**Testing**: Verify bars render correctly, gradients apply properly

---

### Phase 3: Interactive Handlers (Medium-High Risk)
**Goal**: Add draggable range selectors

1. **Handler Components**
   - Create left and right handler components
   - Position handlers based on price range
   - Add visual styling (gradient line, circular marker, cursor icon)

2. **Drag Interaction**
   - Implement mouse/touch event handlers
   - Calculate position from mouse coordinates
   - Update handler positions with constraints (min gap, boundaries)
   - Add smooth dragging feedback

3. **Tooltips**
   - Show percentage on hover/drag
   - Position tooltips correctly (left handler: left side, right: right side)
   - Format percentage display (-20.28%, +19.28%)

**Testing**: Test dragging, boundary constraints, tooltip positioning

---

### Phase 4: Range Overlay & Visual Feedback (Low-Medium Risk)
**Goal**: Visual indication of selected range

1. **Range Overlay**
   - Add semi-transparent overlay for selected range
   - Apply mix-blend-multiply for proper visual effect
   - Add bottom border line for range definition

2. **Bar Highlighting**
   - Update bar colors when in/out of range
   - Smooth color transitions

**Testing**: Verify overlay appears correctly, bars highlight properly

---

### Phase 5: Price Inputs & Stats (Low Risk)
**Goal**: Add supporting UI elements

1. **Price Range Inputs**
   - Min/Max price inputs with formatted display
   - Increment/decrement buttons
   - USD value display below inputs
   - Sync with chart handlers

2. **Stats Display**
   - APR calculation and display (58.57%)
   - Pool balances (48.0K ETH, 24.0M USDC)
   - Balance bar visualization
   - Additional stats (TVL, Volume, Fees) if needed

**Testing**: Verify calculations, formatting, input synchronization

---

### Phase 6: Polish & Edge Cases (Low Risk)
**Goal**: Final refinements

1. **Responsive Behavior**
   - Handle window resize
   - Maintain aspect ratios
   - Test on different screen sizes

2. **Edge Cases**
   - Handle extreme price ranges
   - Prevent handler overlap
   - Smooth animations
   - Loading states if needed

3. **Accessibility**
   - Keyboard navigation for handlers
   - ARIA labels
   - Focus management

**Testing**: Comprehensive testing of edge cases and accessibility

---

## Key Technical Decisions

### 1. State Management
- Use React useState for handler positions
- Derive all calculations from handler percentages
- Keep state minimal and compute values on render

### 2. Coordinate System
- Chart width: 771px (from SVG viewBox)
- Chart height: 200px
- Center point: 385.5px (50% of width)
- Map price percentages (-50% to +50%) to positions (0% to 100%)

### 3. Handler Positioning
- Left handler: `left = ((leftPercent + 50) / 100) * chartWidth`
- Right handler: `left = ((rightPercent + 50) / 100) * chartWidth`
- Constrain: `leftHandler < rightHandler - minGap`

### 4. Liquidity Distribution
- Use exponential decay from center: `height = maxHeight * exp(-distance * factor)`
- Adjust factor for desired curve shape
- Ensure bars fill entire width smoothly

### 5. Color Scheme
- Inactive range: `#FF9361` to `#FFE2D1` gradient
- Active range: `#B91A00` to `#FF9361` gradient
- Handler line: `#C7BCAF` to `#0D0B08` gradient

---

## Testing Checklist

- [ ] Layout matches Figma dimensions
- [ ] Chart renders correctly
- [ ] Handlers drag smoothly
- [ ] Tooltips show correct values
- [ ] Range overlay appears correctly
- [ ] Bars highlight when in range
- [ ] Price inputs sync with handlers
- [ ] APR calculates correctly
- [ ] No handler overlap possible
- [ ] Works on different screen sizes
- [ ] Keyboard navigation works
- [ ] No console errors

---

## Risk Mitigation

1. **Incremental Development**: Build and test each phase before moving on
2. **Component Isolation**: Create separate components for handlers, chart, inputs
3. **Mock Data First**: Use mock data before integrating real data
4. **Visual Regression**: Compare with Figma at each step
5. **Code Reuse**: Leverage v2 code where possible (drag logic, calculations)

---

## Estimated Effort

- Phase 1: 30-45 min
- Phase 2: 45-60 min
- Phase 3: 60-90 min
- Phase 4: 30-45 min
- Phase 5: 45-60 min
- Phase 6: 30-45 min

**Total**: ~4-6 hours of focused development

---

## Next Steps

1. Start with Phase 1 - get the basic structure right
2. Test each phase before proceeding
3. Reference v2 code for drag logic patterns
4. Use Figma design context tool for specific component details
5. Iterate based on visual comparison with design

