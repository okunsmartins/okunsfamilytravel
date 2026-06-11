import './globals.css'

export const metadata = {
  title: 'Okuns Family Travel | Exploring Ireland & The World',
  description: 'Family travel guides, hotel stays, food adventures, road trips, and unforgettable memories across Ireland and the world.',
  keywords: 'Ireland travel, family travel, castle stays, travel blog, Okuns family, travel guide',
  openGraph: {
    title: 'Okuns Family Travel',
    description: 'Exploring Ireland & The World, One Family Adventure at a Time',
    type: 'website',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="bg-onyx text-cream antialiased">
        {children}
      </body>
    </html>
  )
}
