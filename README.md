# Okuns Family Travel

A premium cinematic travel blog website for **Okuns Family Travel**.

> Exploring Ireland & The World, One Family Adventure at a Time

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev

# 3. Open in browser
# http://localhost:3000
```

## Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
okuns-family-travel/
├── app/
│   ├── globals.css        # Global styles, fonts, animations
│   ├── layout.js          # Root layout + metadata
│   └── page.js            # Homepage (assembles all sections)
├── components/
│   ├── Navbar.jsx         # Responsive sticky navigation
│   ├── Hero.jsx           # Cinematic hero with parallax
│   ├── FeatureCards.jsx   # 6 category feature cards
│   ├── TopDestinations.jsx# Filterable destination cards
│   ├── YouTubeVideos.jsx  # Video grid + subscribe CTA
│   ├── TravelBlog.jsx     # Blog posts grid + featured
│   ├── CTASection.jsx     # Newsletter / join journey section
│   └── Footer.jsx         # Full footer with links
├── data/
│   ├── destinations.js    # Destination data array
│   ├── videos.js          # YouTube video data array
│   └── blogPosts.js       # Blog post data array
└── public/                # Static assets
```

## Updating Content

All content is stored as plain JavaScript arrays in `/data/`:

- **Add a destination**: Edit `data/destinations.js`
- **Add a video**: Edit `data/videos.js`
- **Add a blog post**: Edit `data/blogPosts.js`

## YouTube Channel

[https://www.youtube.com/@OkunsFamily](https://www.youtube.com/@OkunsFamily)

## Tech Stack

- **Next.js 14** (App Router)
- **Tailwind CSS** (utility-first styling)
- **Google Fonts**: Cormorant Garamond + Jost + Cinzel
- **Unsplash** placeholder images
