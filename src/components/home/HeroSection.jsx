import { Link } from "react-router-dom"

const HeroSection = () => {
  return (
    <section className="relative min-h-svh w-full overflow-hidden bg-[#0a0b0e]">
      {/* Background with Slow Zoom Effect */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat animate-slow-zoom"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1561501900-3701fa6a0864?q=80&w=1470&auto=format&fit=crop')",
        }}
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 bg-linear-to-b from-black/30 via-transparent to-[#0a0b0e]" />
      </div>

      {/* Content Container */}
      <div
        className="
          relative z-10 flex min-h-svh flex-col items-center justify-center text-center
          px-4 sm:px-6
          pt-20 /* Navbar Offset */
        "
      >
        <div className="space-y-6 max-w-4xl">
          {/* Top tagline */}
          <p className="text-white text-[10px] sm:text-xs md:text-sm font-bold tracking-[0.4em] uppercase montserrat drop-shadow-md">
            A New Standard of Heritage
          </p>

          {/* Brand Identity */}
          <div className="flex flex-col items-center">
            <h1 className="text-white text-[3.2rem] sm:text-6xl md:text-8xl lg:text-9xl font-bold playfair-display leading-none drop-shadow-2xl">
              ZIVARA
            </h1>

            <div className="h-px w-16 sm:w-24 md:w-32 bg-white/40 my-6" />

            <h2 className="text-white text-lg sm:text-2xl md:text-4xl lg:text-5xl font-light italic playfair-display drop-shadow-xl">
              Hotels & Resorts
            </h2>
          </div>

          {/* Description */}
          <p className="text-white/90 text-xs sm:text-sm md:text-lg max-w-xl mx-auto montserrat tracking-wide leading-relaxed drop-shadow-sm">
            Step into a world of curated luxury and timeless elegance.
            Experience hospitality redefined in our iconic spaces.
          </p>

          {/* Finalized CTA */}
          <div className="pt-6">
            <button
              className="
                group relative px-10 sm:px-12 py-3 sm:py-4
                text-[10px] sm:text-xs font-bold uppercase tracking-[0.3em]
                border border-white text-white overflow-hidden
                transition-all duration-500
              "
            >
              <span className="absolute inset-0 bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              <Link to="/rooms"><span className="relative z-10 group-hover:text-black transition-colors duration-500">
                Book Your Stay
              </span></Link>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection