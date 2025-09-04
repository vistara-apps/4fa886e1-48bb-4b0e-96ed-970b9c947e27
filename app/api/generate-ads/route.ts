import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
  dangerouslyAllowBrowser: true,
});

export async function POST(request: NextRequest) {
  try {
    const { productImageUrl, platform } = await request.json();

    if (!productImageUrl || !platform) {
      return NextResponse.json(
        { error: 'Product image and platform are required' },
        { status: 400 }
      );
    }

    // Platform-specific prompts
    const platformPrompts = {
      tiktok: {
        tone: 'energetic, trendy, Gen-Z friendly',
        format: 'short, punchy, with trending hashtags',
        cta: 'action-oriented with urgency'
      },
      instagram: {
        tone: 'aesthetic, aspirational, lifestyle-focused',
        format: 'visually descriptive, hashtag optimized',
        cta: 'engaging and community-building'
      }
    };

    const prompt = `Generate 4 different ad variations for a product image for ${platform}. 
    The tone should be ${platformPrompts[platform].tone}.
    Format should be ${platformPrompts[platform].format}.
    CTA should be ${platformPrompts[platform].cta}.
    
    Return a JSON array with 4 variations, each containing:
    - headline (max 60 characters)
    - description (max 150 characters for TikTok, 200 for Instagram)
    - cta (max 30 characters)
    - tone (emotional descriptor)
    - targeting (array of 3-5 relevant hashtags without #)
    
    Make each variation distinctly different in approach (emotional, practical, trendy, premium).`;

    const completion = await openai.chat.completions.create({
      model: 'google/gemini-2.0-flash-001',
      messages: [
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.8,
      max_tokens: 1500,
    });

    const content = completion.choices[0]?.message?.content;
    
    if (!content) {
      throw new Error('No content generated');
    }

    // Parse the JSON response
    let variations;
    try {
      variations = JSON.parse(content);
    } catch (parseError) {
      // Fallback: create mock variations if AI response isn't valid JSON
      variations = generateFallbackVariations(platform);
    }

    // Add unique IDs to variations
    variations = variations.map((variation: any, index: number) => ({
      ...variation,
      id: `var_${Date.now()}_${index}`,
    }));

    return NextResponse.json({ variations });

  } catch (error) {
    console.error('Error generating ads:', error);
    
    // Return fallback variations on error
    const fallbackVariations = generateFallbackVariations(platform);
    return NextResponse.json({ variations: fallbackVariations });
  }
}

function generateFallbackVariations(platform: 'tiktok' | 'instagram') {
  const baseVariations = [
    {
      id: 'fallback_1',
      headline: '🔥 You NEED This Product!',
      description: platform === 'tiktok' 
        ? 'OMG this changed everything! Drop a ❤️ if you want one too! #viral #musthave'
        : 'Transform your daily routine with this game-changing product. Swipe to see the before/after! ✨',
      cta: 'Get Yours Now! 👆',
      tone: 'excited',
      targeting: ['musthave', 'viral', 'trending', 'gamechanging', 'amazing']
    },
    {
      id: 'fallback_2',
      headline: 'Premium Quality, Unbeatable Price',
      description: platform === 'tiktok'
        ? 'When quality meets affordability 💯 Tag someone who needs this!'
        : 'Experience luxury without the luxury price tag. Limited time offer - don\'t miss out!',
      cta: 'Shop Premium 💎',
      tone: 'premium',
      targeting: ['quality', 'premium', 'luxury', 'deals', 'exclusive']
    },
    {
      id: 'fallback_3',
      headline: 'Why Everyone\'s Obsessed',
      description: platform === 'tiktok'
        ? 'POV: You found the perfect solution 😍 Comment your favorite feature!'
        : 'Join thousands of satisfied customers who\'ve made the switch. See what the hype is about!',
      cta: 'Join the Trend! 🚀',
      tone: 'trendy',
      targeting: ['obsessed', 'trending', 'popular', 'hype', 'community']
    },
    {
      id: 'fallback_4',
      headline: 'Finally, A Solution That Works',
      description: platform === 'tiktok'
        ? 'No more struggles! This actually works 🙌 Share if you can relate!'
        : 'Say goodbye to your old problems. This innovative solution delivers real results every time.',
      cta: 'Try It Risk-Free ✅',
      tone: 'practical',
      targeting: ['solution', 'works', 'results', 'innovative', 'effective']
    }
  ];

  return baseVariations;
}
