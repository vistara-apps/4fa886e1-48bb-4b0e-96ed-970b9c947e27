'use client';

import { useState } from 'react';
import { Music, Instagram, Play } from 'lucide-react';

interface PlatformSelectorProps {
  selected: 'tiktok' | 'instagram' | null;
  onSelect: (platform: 'tiktok' | 'instagram') => void;
}

export function PlatformSelector({ selected, onSelect }: PlatformSelectorProps) {
  const platforms = [
    {
      id: 'tiktok' as const,
      name: 'TikTok',
      icon: Play,
      description: 'Short-form vertical videos with trending audio',
      color: 'from-pink-500 to-red-500',
      features: ['Vertical format', 'Music integration', 'Trend-focused']
    },
    {
      id: 'instagram' as const,
      name: 'Instagram',
      icon: Instagram,
      description: 'Stories, Reels, and feed posts',
      color: 'from-purple-500 to-pink-500',
      features: ['Multiple formats', 'Story integration', 'Hashtag optimization']
    }
  ];

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {platforms.map((platform) => {
        const Icon = platform.icon;
        const isSelected = selected === platform.id;
        
        return (
          <div
            key={platform.id}
            onClick={() => onSelect(platform.id)}
            className={`glass-effect rounded-lg p-6 cursor-pointer transition-all duration-300 card-hover ${
              isSelected 
                ? 'ring-2 ring-accent shadow-lg shadow-accent/20' 
                : 'hover:ring-1 hover:ring-white/30'
            }`}
          >
            <div className="flex items-center mb-4">
              <div className={`bg-gradient-to-r ${platform.color} rounded-full p-3 mr-4`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">{platform.name}</h3>
                {isSelected && (
                  <span className="text-xs text-accent font-medium">Selected</span>
                )}
              </div>
            </div>
            
            <p className="text-purple-200 text-sm mb-4">
              {platform.description}
            </p>
            
            <div className="space-y-2">
              {platform.features.map((feature, index) => (
                <div key={index} className="flex items-center text-xs text-purple-300">
                  <div className="w-1 h-1 bg-accent rounded-full mr-2"></div>
                  {feature}
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
