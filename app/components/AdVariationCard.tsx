'use client';

import { useState } from 'react';
import { Send, Copy, Eye, Heart, MessageCircle, Share } from 'lucide-react';

interface AdVariation {
  id: string;
  headline: string;
  description: string;
  cta: string;
  tone: string;
  targeting: string[];
  performance?: {
    views: number;
    likes: number;
    comments: number;
    shares: number;
  };
}

interface AdVariationCardProps {
  variation: AdVariation;
  platform: 'tiktok' | 'instagram';
}

export function AdVariationCard({ variation, platform }: AdVariationCardProps) {
  const [isPosting, setIsPosting] = useState(false);
  const [isPosted, setIsPosted] = useState(false);

  const handlePost = async () => {
    setIsPosting(true);
    try {
      const response = await fetch('/api/post-ad', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          variation,
          platform,
        }),
      });

      if (response.ok) {
        setIsPosted(true);
      }
    } catch (error) {
      console.error('Error posting ad:', error);
    } finally {
      setIsPosting(false);
    }
  };

  const copyText = () => {
    const text = `${variation.headline}\n\n${variation.description}\n\n${variation.cta}`;
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="glass-effect rounded-lg p-6 card-hover">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <div className={`w-3 h-3 rounded-full mr-3 ${
            platform === 'tiktok' ? 'bg-pink-500' : 'bg-purple-500'
          }`}></div>
          <span className="text-white font-medium capitalize">
            {platform} - {variation.tone}
          </span>
        </div>
        <button
          onClick={copyText}
          className="text-purple-300 hover:text-white p-1 rounded"
          title="Copy text"
        >
          <Copy className="w-4 h-4" />
        </button>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-bold text-white mb-2">
          {variation.headline}
        </h3>
        <p className="text-purple-200 text-sm mb-4 leading-relaxed">
          {variation.description}
        </p>
        <div className="bg-accent/20 rounded-lg p-3 mb-4">
          <p className="text-accent font-semibold text-sm">
            {variation.cta}
          </p>
        </div>
      </div>

      {/* Targeting Tags */}
      <div className="mb-4">
        <div className="flex flex-wrap gap-2">
          {variation.targeting.map((tag, index) => (
            <span
              key={index}
              className="bg-purple-500/20 text-purple-200 text-xs px-2 py-1 rounded-full"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* Performance Metrics (if available) */}
      {variation.performance && (
        <div className="mb-4 grid grid-cols-4 gap-4 text-center">
          <div>
            <Eye className="w-4 h-4 text-purple-300 mx-auto mb-1" />
            <span className="text-xs text-purple-300">
              {variation.performance.views}
            </span>
          </div>
          <div>
            <Heart className="w-4 h-4 text-pink-400 mx-auto mb-1" />
            <span className="text-xs text-purple-300">
              {variation.performance.likes}
            </span>
          </div>
          <div>
            <MessageCircle className="w-4 h-4 text-blue-400 mx-auto mb-1" />
            <span className="text-xs text-purple-300">
              {variation.performance.comments}
            </span>
          </div>
          <div>
            <Share className="w-4 h-4 text-green-400 mx-auto mb-1" />
            <span className="text-xs text-purple-300">
              {variation.performance.shares}
            </span>
          </div>
        </div>
      )}

      {/* Post Button */}
      <button
        onClick={handlePost}
        disabled={isPosting || isPosted}
        className={`w-full py-3 px-4 rounded-lg font-semibold transition-all flex items-center justify-center ${
          isPosted
            ? 'bg-green-500 text-white'
            : 'btn-primary hover:shadow-lg'
        } disabled:opacity-50`}
      >
        {isPosting ? (
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
        ) : isPosted ? (
          '✓ Posted'
        ) : (
          <>
            <Send className="w-4 h-4 mr-2" />
            Post to {platform === 'tiktok' ? 'TikTok' : 'Instagram'}
          </>
        )}
      </button>
    </div>
  );
}
