import { useEffect, useRef } from 'react';

interface ThreadStats {
  commentsCount: number;
  mediaCount: number;
  marketCapValue: number;
  change24hr: number;
  changePercent: number;
  percentage: number;
  isGraduated: boolean;
}

interface LiveUpdateConfig {
  onUpdate: (stats: Partial<ThreadStats>) => void;
  initialStats: ThreadStats;
  updateInterval?: number; // How often to update (ms)
  isFresh?: boolean; // Is this a fresh thread with low engagement?
}

export function useLiveThreadUpdates({ 
  onUpdate, 
  initialStats, 
  updateInterval = 3000,
  isFresh = false 
}: LiveUpdateConfig) {
  const statsRef = useRef(initialStats);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    statsRef.current = initialStats;
  }, [initialStats]);

  useEffect(() => {
    // Don't update if graduated
    if (initialStats.isGraduated) {
      return;
    }

    const performUpdate = () => {
      const currentStats = statsRef.current;
      
      // Random chance of update (70% chance)
      if (Math.random() > 0.7) {
        return;
      }

      let updates: Partial<ThreadStats> = {};

      // Fresh threads get smaller, more frequent updates
      if (isFresh) {
        // Small increments for fresh threads
        const commentIncrease = Math.random() > 0.5 ? Math.floor(Math.random() * 3) + 1 : 0;
        const mediaIncrease = Math.random() > 0.7 ? 1 : 0;
        
        if (commentIncrease > 0) {
          const newCommentsCount = currentStats.commentsCount + commentIncrease;
          updates.commentsCount = newCommentsCount;
        }
        
        if (mediaIncrease > 0) {
          const newMediaCount = currentStats.mediaCount + mediaIncrease;
          updates.mediaCount = newMediaCount;
        }

        // Market cap increases slowly for fresh threads
        if (Math.random() > 0.6) {
          const mcIncrease = Math.floor(Math.random() * 500) + 100; // $100-$600
          const newMarketCap = currentStats.marketCapValue + mcIncrease;
          const newPercentage = Math.min(Math.floor((newMarketCap / 69000) * 100), 100);
          
          updates.marketCapValue = newMarketCap;
          updates.percentage = newPercentage;
          updates.change24hr = (currentStats.change24hr || 0) + mcIncrease;
          
          // Recalculate percentage change
          const baseValue = currentStats.marketCapValue || 1000;
          updates.changePercent = ((newMarketCap - baseValue) / baseValue) * 100;

          // Check if graduated
          if (newMarketCap >= 69000) {
            updates.isGraduated = true;
            updates.percentage = 100;
          }
        }
      } else {
        // Active threads get larger updates
        const commentIncrease = Math.random() > 0.4 ? Math.floor(Math.random() * 15) + 5 : 0;
        const mediaIncrease = Math.random() > 0.5 ? Math.floor(Math.random() * 5) + 1 : 0;
        
        if (commentIncrease > 0) {
          const newCommentsCount = currentStats.commentsCount + commentIncrease;
          updates.commentsCount = newCommentsCount;
        }
        
        if (mediaIncrease > 0) {
          const newMediaCount = currentStats.mediaCount + mediaIncrease;
          updates.mediaCount = newMediaCount;
        }

        // Market cap can increase or decrease slightly for active threads
        if (Math.random() > 0.5) {
          const mcChange = (Math.random() - 0.4) * 5000; // -$2000 to +$3000
          const newMarketCap = Math.max(1000, currentStats.marketCapValue + mcChange);
          const newPercentage = Math.min(Math.floor((newMarketCap / 69000) * 100), 100);
          
          updates.marketCapValue = newMarketCap;
          updates.percentage = newPercentage;
          updates.change24hr = (currentStats.change24hr || 0) + mcChange;
          
          // Recalculate percentage change
          const baseValue = currentStats.marketCapValue || 10000;
          updates.changePercent = (mcChange / baseValue) * 100;

          // Check if graduated
          if (newMarketCap >= 69000) {
            updates.isGraduated = true;
            updates.percentage = 100;
          }
        }
      }

      // Only update if there are actual changes
      if (Object.keys(updates).length > 0) {
        statsRef.current = { ...currentStats, ...updates };
        onUpdate(updates);
      }
    };

    // Start interval
    intervalRef.current = setInterval(performUpdate, updateInterval);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [updateInterval, isFresh, initialStats.isGraduated, onUpdate]);
}
