import '../globals.css'

export const metadata = {
  title: 'Admin | Okuns Family Travel',
}

export default function AdminLayout({ children }) {
  return (
    <div className="min-h-screen bg-onyx text-cream">
      {children}
    </div>
  )
}
