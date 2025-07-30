import CallToAction from '@/components/call-to-action'
import Features from '@/components/features'
import FooterSection from '@/components/footer'
import { HeroHeader } from '@/components/header'
import HeroSection from '@/components/hero-section'

export default function Home() {
    return (
        <section className="font-roboto">
            <HeroHeader />
            <HeroSection />
            <Features />
            <CallToAction />
            <FooterSection />
        </section>
    )
}
