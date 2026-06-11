import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import FeatureCards from '../components/FeatureCards'
import TopDestinations from '../components/TopDestinations'
import YouTubeVideos from '../components/YouTubeVideos'
import TravelBlog from '../components/TravelBlog'
import CTASection from '../components/CTASection'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <FeatureCards />
      <TopDestinations />
      <YouTubeVideos />
      <TravelBlog />
      <CTASection />
      <Footer />
    </main>
  )
}
