# AdRemix - AI-Powered Ad Generation for Base Mini Apps

AdRemix is a Base Mini App that uses AI to generate multiple ad variations from a single product image and automatically posts them to social media for quick validation.

## Features

- **AI Ad Content Generation**: Upload a product image and get multiple AI-generated ad variations
- **Platform-Specific Optimization**: Tailored content for TikTok and Instagram
- **Social Media Auto-Posting**: Direct posting to connected test accounts
- **Performance Tracking**: Monitor engagement and identify top-performing variations

## Tech Stack

- **Frontend**: Next.js 15, React, TypeScript, Tailwind CSS
- **Blockchain**: Base chain with OnchainKit
- **AI**: OpenAI GPT (via OpenRouter)
- **Storage**: Pinata IPFS for media assets
- **Social**: Farcaster/Neynar API for posting

## Getting Started

1. **Clone and install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   Copy `.env.local.example` to `.env.local` and fill in your API keys:
   ```
   NEXT_PUBLIC_ONCHAINKIT_API_KEY=your_onchainkit_key
   OPENROUTER_API_KEY=your_openrouter_key
   NEYNAR_API_KEY=your_neynar_key
   PINATA_API_KEY=your_pinata_key
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Open [http://localhost:3000](http://localhost:3000)**

## Usage

1. **Connect Wallet**: Use the Connect Wallet button to connect your Base wallet
2. **Upload Product Image**: Drag and drop or select a product image
3. **Select Platform**: Choose TikTok or Instagram for platform-specific optimization
4. **Generate Ads**: Click "Generate Ads" to create AI-powered variations
5. **Review & Post**: Review generated ads and post selected variations
6. **Track Performance**: Monitor which variations perform best

## API Endpoints

- `POST /api/generate-ads`: Generate ad variations from product image
- `POST /api/post-ad`: Post ad variations to social media

## Architecture

```
app/
├── components/
│   ├── CosmicBackground.tsx    # Animated background
│   ├── ProductUploader.tsx     # Image upload component
│   ├── PlatformSelector.tsx    # TikTok/Instagram selector
│   ├── AdVariationCard.tsx     # Generated ad display
│   └── PerformanceSummary.tsx  # Analytics dashboard
├── api/
│   ├── generate-ads/           # AI ad generation
│   └── post-ad/               # Social media posting
└── page.tsx                   # Main application
```

## Environment Variables

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_ONCHAINKIT_API_KEY` | OnchainKit API key for Base integration |
| `OPENROUTER_API_KEY` | OpenRouter API key for AI generation |
| `NEYNAR_API_KEY` | Neynar API key for Farcaster posting |
| `PINATA_API_KEY` | Pinata API key for IPFS storage |

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.
