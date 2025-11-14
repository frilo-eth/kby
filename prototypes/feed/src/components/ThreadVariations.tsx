import React, { useState, useEffect } from 'react';
import ThreadV4 from '../imports/ThreadV4';

// This component will render ThreadV4 with different data passed as props in the future
// For now, we're using the base ThreadV4 component with just percentage variation

interface ThreadData {
  id: number;
  username: string;
  timeAgo: string;
  timestamp: string;
  category: string;
  tokenName: string;
  ticker: string;
  description: string;
  marketCap: string;
  graduation: number;
  isGraduated: boolean;
  mainMedia: {
    type: 'image' | 'video' | 'gif';
    url: string;
  };
  comments: Array<{
    username: string;
    timeAgo: string;
    text: string;
    hearts: number;
    media?: {
      type: 'image' | 'video' | 'gif';
      url: string;
    };
  }>;
  totalComments: number;
  hearts: number;
  tips: number;
  createdAt?: number; // Timestamp when thread was created for dynamic time calculation
  // Stats for reaction buttons
  commentsCount?: number;
  mediaCount?: number;
  marketCapValue?: number; // Numeric value for the market cap
  change24hr?: number;
  changePercent?: number;
}

export const THREAD_DATA: ThreadData[] = [
  {
    id: 0,
    username: 'nath4an',
    timeAgo: '2h',
    timestamp: '24 Oct 2025, 13:32',
    category: 'Meme',
    tokenName: 'Thinck boutet',
    ticker: '$THINCK',
    description: `I'm pretty sure this token is destined to sink — and that's exactly why it's perfect. $THINKK wasn't created by a genius dev team or a visionary DAO… it was spawned by a bot that accidentally discovered its own existence before anyone else even knew what was going on. The contract was found before the idea was even shared. Imagine being so early you front-run your own project. Legendary levels of self-sabotage. This isn't just a coin — it's a social experiment on what happens when AI gets bored and decides to play crypto. Buy it, mock it, or just watch the chaos unfold… but don't pretend you're smarter than the bot. It already thinkkks you're not.`,
    marketCap: '$124.53K',
    graduation: 100,
    isGraduated: true,
    mainMedia: {
      type: 'image',
      url: 'https://images.unsplash.com/photo-1706086699518-ebc67759cdcd?w=400&h=400&fit=crop',
    },
    comments: [
      {
        username: 'stevie',
        timeAgo: '1h',
        text: 'this is actually genius lmao',
        hearts: 234,
        media: {
          type: 'image',
          url: 'https://images.unsplash.com/photo-1649841432772-a6ce266a5019?w=400&h=400&fit=crop',
        },
      },
      {
        username: 'p3dr0u',
        timeAgo: '45m',
        text: 'aping in rn 🚀',
        hearts: 156,
      },
    ],
    totalComments: 47,
    hearts: 892,
    tips: 1240,
    commentsCount: 1236,
    mediaCount: 546,
    marketCapValue: 124530,
    change24hr: 26900,
    changePercent: 463.37,
  },
  {
    id: 1,
    username: 'cryptow1zard',
    timeAgo: '4h',
    timestamp: '24 Oct 2025, 11:15',
    category: 'Dare',
    tokenName: 'Moon Pepe',
    ticker: '$MPEPE',
    description: "The OG pepe is back and he's heading straight to the moon. No devs. No roadmap. Just pure meme energy. If you know, you know. LFG! 🐸🌙",
    marketCap: '$567.2K',
    graduation: 87,
    isGraduated: false,
    mainMedia: {
      type: 'image',
      url: 'https://images.unsplash.com/photo-1697564264503-2c9b10a83c5c?w=400&h=400&fit=crop',
    },
    comments: [
      {
        username: 'memequeen',
        timeAgo: '3h',
        text: 'finally a real meme coin',
        hearts: 445,
      },
      {
        username: 'apemaster',
        timeAgo: '2h',
        text: 'already 10x from here easy',
        hearts: 312,
        media: {
          type: 'image',
          url: 'https://images.unsplash.com/photo-1697564264503-2c9b10a83c5c?w=400&h=400&fit=crop',
        },
      },
    ],
    totalComments: 128,
    hearts: 1456,
    tips: 2890,
    commentsCount: 2340,
    mediaCount: 890,
    marketCapValue: 567200,
    change24hr: 123400,
    changePercent: 27.84,
  },
  {
    id: 2,
    username: 'degen_dave',
    timeAgo: '7h',
    timestamp: '24 Oct 2025, 08:42',
    category: 'Meme',
    tokenName: 'Retro Pixel Cat',
    ticker: '$PIXCAT',
    description: 'Combining the nostalgia of 8-bit gaming with the cutest cats on the blockchain. Each holder gets a unique pixel cat NFT. Meow your way to the moon! 🎮😺',
    marketCap: '$89.4K',
    graduation: 56,
    isGraduated: false,
    mainMedia: {
      type: 'image',
      url: 'https://images.unsplash.com/photo-1758200378862-522b3b17bd64?w=400&h=400&fit=crop',
    },
    comments: [
      {
        username: 'nftcollector',
        timeAgo: '6h',
        text: 'love the pixel art vibes',
        hearts: 178,
        media: {
          type: 'image',
          url: 'https://images.unsplash.com/photo-1652984588093-ff625b701138?w=400&h=400&fit=crop',
        },
      },
      {
        username: 'gamergirl88',
        timeAgo: '5h',
        text: 'this takes me back to my childhood ❤️',
        hearts: 203,
      },
    ],
    totalComments: 67,
    hearts: 723,
    tips: 980,
    commentsCount: 980,
    mediaCount: 345,
    marketCapValue: 89400,
    change24hr: 12300,
    changePercent: 15.94,
  },
  {
    id: 3,
    username: 'astro_anon',
    timeAgo: '12h',
    timestamp: '24 Oct 2025, 03:20',
    category: 'Question',
    tokenName: 'Galactic Doge',
    ticker: '$GDOGE',
    description: "To the moon? Nah. We're going to the entire galaxy. Much space. Very cosmic. Such interstellar. 🚀🌌",
    marketCap: '$23.1K',
    graduation: 23,
    isGraduated: false,
    mainMedia: {
      type: 'image',
      url: 'https://images.unsplash.com/photo-1503490837623-f01e6aed83d4?w=400&h=400&fit=crop',
    },
    comments: [
      {
        username: 'spacecadet',
        timeAgo: '11h',
        text: 'finally a doge coin with ambition',
        hearts: 89,
      },
      {
        username: 'moonwalker',
        timeAgo: '10h',
        text: 'wen galaxy???',
        hearts: 67,
      },
    ],
    totalComments: 34,
    hearts: 289,
    tips: 450,
    commentsCount: 567,
    mediaCount: 234,
    marketCapValue: 23100,
    change24hr: 5600,
    changePercent: 32.05,
  },
  {
    id: 4,
    username: 'y2k_kid',
    timeAgo: '1d',
    timestamp: '23 Oct 2025, 15:48',
    category: 'Meme',
    tokenName: 'Cyber Punk Vibes',
    ticker: '$CYBR',
    description: 'Neon lights, digital dreams, and decentralized schemes. This is the future that cyberpunk promised us. Join the revolution. The matrix is calling. 💾✨',
    marketCap: '$892.7K',
    graduation: 92,
    isGraduated: false,
    mainMedia: {
      type: 'image',
      url: 'https://images.unsplash.com/photo-1706245405770-ed9151cad554?w=400&h=400&fit=crop',
    },
    comments: [
      {
        username: 'neonknight',
        timeAgo: '23h',
        text: 'aesthetic is on point 🔥',
        hearts: 567,
      },
      {
        username: 'hackerz',
        timeAgo: '20h',
        text: 'ive been waiting for this',
        hearts: 423,
        media: {
          type: 'image',
          url: 'https://images.unsplash.com/photo-1618902345200-8c3fe6106608?w=400&h=400&fit=crop',
        },
      },
    ],
    totalComments: 203,
    hearts: 2134,
    tips: 4560,
    commentsCount: 3456,
    mediaCount: 1234,
    marketCapValue: 892700,
    change24hr: 234500,
    changePercent: 35.67,
  },
  {
    id: 5,
    username: 'meme_lord',
    timeAgo: '1d',
    timestamp: '23 Oct 2025, 12:30',
    category: 'Dare',
    tokenName: 'Abstract Dreams',
    ticker: '$DREAM',
    description: 'What if your wildest dreams became a tradeable asset? $DREAM is here to make it happen. Surreal. Unpredictable. Unmissable. Join us in the dreamscape. 🌈💭',
    marketCap: '$234.8K',
    graduation: 45,
    isGraduated: false,
    mainMedia: {
      type: 'image',
      url: 'https://images.unsplash.com/photo-1638335236113-a8bffb19faee?w=400&h=400&fit=crop',
    },
    comments: [
      {
        username: 'artlover',
        timeAgo: '1d',
        text: 'the visuals are incredible',
        hearts: 298,
        media: {
          type: 'image',
          url: 'https://images.unsplash.com/photo-1649841432772-a6ce266a5019?w=400&h=400&fit=crop',
        },
      },
      {
        username: 'trippy_trader',
        timeAgo: '22h',
        text: 'this is what ive been searching for',
        hearts: 201,
      },
    ],
    totalComments: 91,
    hearts: 1023,
    tips: 1780,
    commentsCount: 1450,
    mediaCount: 678,
    marketCapValue: 31050,
    change24hr: 7200,
    changePercent: 30.18,
  },
  {
    id: 6,
    username: 'based_builder',
    timeAgo: '2d',
    timestamp: '22 Oct 2025, 18:15',
    category: 'Meme',
    tokenName: 'Neon Cat',
    ticker: '$NCAT',
    description: 'Cats + Neon = Perfection. This fluffy feline is here to light up your portfolio with electric gains. Purr-fect for the culture. 😻⚡',
    marketCap: '$678.3K',
    graduation: 78,
    isGraduated: false,
    mainMedia: {
      type: 'image',
      url: 'https://images.unsplash.com/photo-1726248986113-8ef47c3a3b78?w=400&h=400&fit=crop',
    },
    comments: [
      {
        username: 'catlady',
        timeAgo: '2d',
        text: 'NEED THIS IN MY LIFE',
        hearts: 412,
      },
      {
        username: 'neonlover',
        timeAgo: '1d',
        text: 'combining my two favorite things',
        hearts: 334,
        media: {
          type: 'image',
          url: 'https://images.unsplash.com/photo-1652984588093-ff625b701138?w=400&h=400&fit=crop',
        },
      },
    ],
    totalComments: 145,
    hearts: 1678,
    tips: 2340,
    commentsCount: 1890,
    mediaCount: 678,
    marketCapValue: 678300,
    change24hr: 156700,
    changePercent: 30.05,
  },
  {
    id: 7,
    username: 'anon_trader',
    timeAgo: '2d',
    timestamp: '22 Oct 2025, 09:45',
    category: 'Question',
    tokenName: 'Quantum Leap',
    ticker: '$QLEP',
    description: "Bridging quantum computing with blockchain technology. This might sound like sci-fi, but the future is now. Are you ready to take the leap? 🔬🚀",
    marketCap: '$145.6K',
    graduation: 34,
    isGraduated: false,
    mainMedia: {
      type: 'image',
      url: 'https://images.unsplash.com/photo-1721314787850-5745fdfb06b4?w=400&h=400&fit=crop',
    },
    comments: [
      {
        username: 'techgeek',
        timeAgo: '2d',
        text: 'this is revolutionary',
        hearts: 156,
      },
      {
        username: 'sciencebro',
        timeAgo: '1d',
        text: 'finally someone gets it',
        hearts: 134,
      },
    ],
    totalComments: 56,
    hearts: 567,
    tips: 890,
    commentsCount: 789,
    mediaCount: 345,
    marketCapValue: 145600,
    change24hr: 34200,
    changePercent: 30.71,
  },
  {
    id: 8,
    username: 'whale_watcher',
    timeAgo: '3d',
    timestamp: '21 Oct 2025, 21:00',
    category: 'Dare',
    tokenName: 'Pixel Paradise',
    ticker: '$PIXL',
    description: 'Welcome to the paradise of pixels where every dot counts. Retro gaming aesthetics meet modern DeFi. Level up your portfolio! 🎮🏝️',
    marketCap: '$456.9K',
    graduation: 61,
    isGraduated: false,
    mainMedia: {
      type: 'image',
      url: 'https://images.unsplash.com/photo-1621529931703-1795723337f1?w=400&h=400&fit=crop',
    },
    comments: [
      {
        username: 'retro_gamer',
        timeAgo: '3d',
        text: 'this brings back so many memories',
        hearts: 267,
        media: {
          type: 'image',
          url: 'https://images.unsplash.com/photo-1621529931703-1795723337f1?w=400&h=400&fit=crop',
        },
      },
      {
        username: 'defi_degen',
        timeAgo: '2d',
        text: 'gaming + defi = 💰',
        hearts: 189,
      },
    ],
    totalComments: 78,
    hearts: 945,
    tips: 1560,
    commentsCount: 1234,
    mediaCount: 567,
    marketCapValue: 456900,
    change24hr: 98700,
    changePercent: 27.57,
  },
  {
    id: 9,
    username: 'shitpost_king',
    timeAgo: '3d',
    timestamp: '21 Oct 2025, 14:22',
    category: 'Meme',
    tokenName: 'Cosmic Shiba',
    ticker: '$CSHIB',
    description: "Shiba went to space and came back enlightened. Now she's ready to take us all on a cosmic journey. Much universe. Very infinite. Wow. 🐕🌠",
    marketCap: '$67.8K',
    graduation: 12,
    isGraduated: false,
    mainMedia: {
      type: 'image',
      url: 'https://images.unsplash.com/photo-1759503166619-8c121cfd8085?w=400&h=400&fit=crop',
    },
    comments: [
      {
        username: 'shibafan',
        timeAgo: '3d',
        text: 'shiba ecosystem keeps growing',
        hearts: 98,
      },
      {
        username: 'cosmicvibes',
        timeAgo: '2d',
        text: 'love the space theme',
        hearts: 76,
      },
    ],
    totalComments: 29,
    hearts: 234,
    tips: 340,
    commentsCount: 456,
    mediaCount: 178,
    marketCapValue: 67800,
    change24hr: 8900,
    changePercent: 15.10,
  },
  {
    id: 10,
    username: 'fresh_starter',
    timeAgo: '5m',
    timestamp: '24 Oct 2025, 15:55',
    category: 'Meme',
    tokenName: 'Brand New Token',
    ticker: '$FRESH',
    description: 'Just launched! Fresh off the blockchain. This is your chance to get in early on something completely new. Be the first to comment! 🚀✨',
    marketCap: '$2.3K',
    graduation: 3,
    isGraduated: false,
    mainMedia: {
      type: 'image',
      url: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=400&h=400&fit=crop',
    },
    comments: [],
    totalComments: 0,
    hearts: 0,
    tips: 0,
    commentsCount: 0,
    mediaCount: 0,
    marketCapValue: 2300,
    change24hr: 0,
    changePercent: 0,
  },
  {
    id: 11,
    username: 'newbie_dev',
    timeAgo: '2m',
    timestamp: '24 Oct 2025, 15:58',
    category: 'Question',
    tokenName: 'Mystery Box',
    ticker: '$MBOX',
    description: 'What if every transaction revealed a surprise? $MBOX brings the thrill of mystery boxes to crypto. Each trade could unlock hidden rewards. Are you feeling lucky? 🎁🔮',
    marketCap: '$1.8K',
    graduation: 2,
    isGraduated: false,
    mainMedia: {
      type: 'image',
      url: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=400&h=400&fit=crop',
    },
    comments: [],
    totalComments: 0,
    hearts: 0,
    tips: 0,
    commentsCount: 0,
    mediaCount: 0,
    marketCapValue: 1800,
    change24hr: 0,
    changePercent: 0,
  },
];

// Calculate dynamic time ago for recent threads
function getDynamicTimeAgo(createdAt?: number, fallbackTimeAgo?: string): string {
  if (!createdAt) return fallbackTimeAgo || '2h';
  
  const now = Date.now();
  const diff = now - createdAt;
  
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  
  if (seconds < 60) {
    return `${seconds}s ago`;
  } else if (minutes < 60) {
    return `${minutes}m ago`;
  } else {
    return fallbackTimeAgo || `${hours}h`;
  }
}

// Now passing all the dynamic thread data to ThreadV4
export function ThreadVariation({ data }: { data: ThreadData }) {
  const [timeAgo, setTimeAgo] = useState(getDynamicTimeAgo(data.createdAt, data.timeAgo));
  const [liveStats, setLiveStats] = useState({
    commentsCount: data.commentsCount || 0,
    mediaCount: data.mediaCount || 0,
    marketCapValue: data.marketCapValue || 0,
    change24hr: data.change24hr || 0,
    changePercent: data.changePercent || 0,
    percentage: data.graduation,
    isGraduated: data.isGraduated,
  });
  
  // Update time every second for threads with createdAt timestamp
  useEffect(() => {
    if (!data.createdAt) return;
    
    const interval = setInterval(() => {
      setTimeAgo(getDynamicTimeAgo(data.createdAt, data.timeAgo));
    }, 1000);
    
    return () => clearInterval(interval);
  }, [data.createdAt, data.timeAgo]);

  // Simulate live updates for stats - fresh threads (low engagement) update differently
  const isFresh = (data.commentsCount || 0) < 100 && !data.isGraduated;
  
  useEffect(() => {
    // Don't update if graduated
    if (data.isGraduated) {
      return;
    }

    const performUpdate = () => {
      // Random chance of update (50% chance)
      if (Math.random() > 0.5) {
        return;
      }

      setLiveStats(prev => {
        let updates: typeof liveStats = { ...prev };

        // Fresh threads get smaller, more frequent updates
        if (isFresh) {
          // Small increments for fresh threads
          const commentIncrease = Math.random() > 0.6 ? Math.floor(Math.random() * 3) + 1 : 0;
          const mediaIncrease = Math.random() > 0.8 ? 1 : 0;
          
          if (commentIncrease > 0) {
            updates.commentsCount = prev.commentsCount + commentIncrease;
          }
          
          if (mediaIncrease > 0) {
            updates.mediaCount = prev.mediaCount + mediaIncrease;
          }

          // Market cap increases slowly for fresh threads
          if (Math.random() > 0.7) {
            const mcIncrease = Math.floor(Math.random() * 500) + 100; // $100-$600
            const newMarketCap = prev.marketCapValue + mcIncrease;
            const newPercentage = Math.min(Math.floor((newMarketCap / 69000) * 100), 100);
            
            updates.marketCapValue = newMarketCap;
            updates.percentage = newPercentage;
            updates.change24hr = prev.change24hr + mcIncrease;
            
            // Recalculate percentage change
            const baseValue = data.marketCapValue || 1000;
            updates.changePercent = ((newMarketCap - baseValue) / baseValue) * 100;

            // Check if graduated
            if (newMarketCap >= 69000) {
              updates.isGraduated = true;
              updates.percentage = 100;
            }
          }
        } else {
          // Active threads get larger updates
          const commentIncrease = Math.random() > 0.5 ? Math.floor(Math.random() * 15) + 5 : 0;
          const mediaIncrease = Math.random() > 0.6 ? Math.floor(Math.random() * 5) + 1 : 0;
          
          if (commentIncrease > 0) {
            updates.commentsCount = prev.commentsCount + commentIncrease;
          }
          
          if (mediaIncrease > 0) {
            updates.mediaCount = prev.mediaCount + mediaIncrease;
          }

          // Market cap can increase or decrease slightly for active threads
          if (Math.random() > 0.6) {
            const mcChange = (Math.random() - 0.3) * 3000; // -$900 to +$2100
            const newMarketCap = Math.max(1000, prev.marketCapValue + mcChange);
            const newPercentage = Math.min(Math.floor((newMarketCap / 69000) * 100), 100);
            
            updates.marketCapValue = newMarketCap;
            updates.percentage = newPercentage;
            updates.change24hr = prev.change24hr + mcChange;
            
            // Recalculate percentage change
            updates.changePercent = prev.changePercent + (Math.random() - 0.5) * 5;

            // Check if graduated
            if (newMarketCap >= 69000) {
              updates.isGraduated = true;
              updates.percentage = 100;
            }
          }
        }

        return updates;
      });
    };

    // Start interval - fresh threads update more frequently
    const interval = setInterval(performUpdate, isFresh ? 2500 : 4000);

    return () => clearInterval(interval);
  }, [data.isGraduated, isFresh, data.marketCapValue]);
  
  return (
    <ThreadV4 
      isGraduated={liveStats.isGraduated} 
      percentage={liveStats.percentage}
      username={data.username}
      timeAgo={timeAgo}
      timestamp={data.timestamp}
      category={data.category}
      tokenName={data.tokenName}
      ticker={data.ticker}
      description={data.description}
      mainMediaUrl={data.mainMedia.url}
      comments={data.comments}
      commentsCount={liveStats.commentsCount}
      mediaCount={liveStats.mediaCount}
      marketCap={liveStats.marketCapValue}
      change24hr={liveStats.change24hr}
      changePercent={liveStats.changePercent}
    />
  );
}
