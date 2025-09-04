'use client';

import { TrendingUp, BarChart3, Users, Zap } from 'lucide-react';

interface PerformanceSummaryProps {
  variations: any[];
}

export function PerformanceSummary({ variations }: PerformanceSummaryProps) {
  // Mock performance data for demo
  const mockData = {
    totalViews: 12567,
    totalEngagement: 891,
    bestPerformer: 'Variation 1',
    averageEngagementRate: '7.1%'
  };

  const chartData = [
    { day: 'Mon', value: 45 },
    { day: 'Tue', value: 78 },
    { day: 'Wed', value: 62 },
    { day: 'Thu', value: 94 },
    { day: 'Fri', value: 156 },
    { day: 'Sat', value: 189 },
    { day: 'Sun', value: 234 }
  ];

  return (
    <div className="glass-effect rounded-xl p-8">
      <div className="flex items-center mb-6">
        <TrendingUp className="w-6 h-6 text-accent mr-3" />
        <h2 className="text-2xl font-bold text-white">Performance Overview</h2>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
        <div className="text-center">
          <div className="bg-blue-500/20 rounded-full p-3 w-fit mx-auto mb-3">
            <Users className="w-6 h-6 text-blue-400" />
          </div>
          <p className="text-2xl font-bold text-white mb-1">
            {mockData.totalViews.toLocaleString()}
          </p>
          <p className="text-purple-300 text-sm">Total Views</p>
        </div>

        <div className="text-center">
          <div className="bg-green-500/20 rounded-full p-3 w-fit mx-auto mb-3">
            <Zap className="w-6 h-6 text-green-400" />
          </div>
          <p className="text-2xl font-bold text-white mb-1">
            {mockData.totalEngagement}
          </p>
          <p className="text-purple-300 text-sm">Engagements</p>
        </div>

        <div className="text-center">
          <div className="bg-purple-500/20 rounded-full p-3 w-fit mx-auto mb-3">
            <TrendingUp className="w-6 h-6 text-purple-400" />
          </div>
          <p className="text-2xl font-bold text-white mb-1">
            {mockData.averageEngagementRate}
          </p>
          <p className="text-purple-300 text-sm">Avg. Rate</p>
        </div>

        <div className="text-center">
          <div className="bg-yellow-500/20 rounded-full p-3 w-fit mx-auto mb-3">
            <BarChart3 className="w-6 h-6 text-yellow-400" />
          </div>
          <p className="text-2xl font-bold text-white mb-1">
            #{mockData.bestPerformer}
          </p>
          <p className="text-purple-300 text-sm">Top Performer</p>
        </div>
      </div>

      {/* Simple Chart */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-white mb-4">7-Day Engagement Trend</h3>
        <div className="bg-white/5 rounded-lg p-6">
          <div className="flex items-end justify-between h-32 space-x-2">
            {chartData.map((data, index) => (
              <div key={index} className="flex flex-col items-center flex-1">
                <div
                  className="bg-gradient-to-t from-accent to-accent/60 rounded-t-sm mb-2 min-h-[20px] w-full"
                  style={{
                    height: `${(data.value / Math.max(...chartData.map(d => d.value))) * 100}%`
                  }}
                ></div>
                <span className="text-xs text-purple-300">{data.day}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Insights */}
      <div className="bg-gradient-to-r from-accent/10 to-primary/10 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-3">Key Insights</h3>
        <div className="space-y-2 text-sm text-purple-200">
          <p>• Weekend posts are performing 40% better than weekdays</p>
          <p>• Emotional headlines generate 25% more engagement</p>
          <p>• TikTok variations are outperforming Instagram by 15%</p>
          <p>• Call-to-actions with urgency see 30% higher click-through rates</p>
        </div>
      </div>
    </div>
  );
}
