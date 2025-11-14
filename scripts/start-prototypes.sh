#!/bin/bash

# Start Feed V3 prototype
echo "Starting Feed V3 prototype..."
cd /Users/usuario/Desktop/feed
npm run dev > /dev/null 2>&1 &
FEED_PID=$!

echo "Feed V3 starting on http://localhost:5173 (PID: $FEED_PID)"
echo "To stop: kill $FEED_PID"

