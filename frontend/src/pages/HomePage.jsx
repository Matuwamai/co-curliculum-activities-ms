import React from 'react'

 const HomePage = () => {
  return (
    <div className="bg-[#0c1d2e] text-white font-sans min-h-screen flex flex-col">
      <header className="bg-[#0c1d2e] p-4 shadow-md">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <h1 className="text-2xl md:text-3xl font-bold text-[#f39c12]">Sports Academy</h1>
          
          <div className="flex items-center gap-6">
            <nav className="hidden md:block">
              <ul className="flex space-x-6">
                <li><a href="#" className="hover:text-[#f39c12] transition">Home</a></li>
                <li><a href="#about" className="hover:text-[#f39c12] transition">About</a></li>
                <li><a href="#services" className="hover:text-[#f39c12] transition">Services</a></li>
                <li><a href="#contact" className="hover:text-[#f39c12] transition">Contact</a></li>
              </ul>
            </nav>
            
            <a href="/login" className="text-white hover:text-[#f39c12] transition">
              Login
            </a>
          </div>
        </div>

        {/* Mobile navigation */}
        <nav className="md:hidden mt-4">
          <ul className="flex flex-wrap justify-center gap-4">
            <li><a href="#" className="hover:text-[#f39c12] transition">Home</a></li>
            <li><a href="#about" className="hover:text-[#f39c12] transition">About</a></li>
            <li><a href="#services" className="hover:text-[#f39c12] transition">Services</a></li>
            <li><a href="#contact" className="hover:text-[#f39c12] transition">Contact</a></li>
          </ul>
        </nav>
      </header>

      <main className="container mx-auto p-4 md:p-6 text-center flex-grow">
        <h2 className="text-3xl md:text-4xl font-bold text-[#f39c12]">Welcome to Our Sports Academy</h2>
        <p className="mt-4 text-base md:text-lg">Join us to unleash your full potential in sports and fitness!</p>

        <section className="mt-8 md:mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          <div className="bg-[#f39c12] p-4 md:p-6 rounded-lg shadow-md">
            <h3 className="text-xl md:text-2xl font-semibold">Training Programs</h3>
            <p className="text-sm md:text-base">Personalized coaching for every sport.</p>
          </div>
          <div className="bg-[#f39c12] p-4 md:p-6 rounded-lg shadow-md">
            <h3 className="text-xl md:text-2xl font-semibold">Fitness Center</h3>
            <p className="text-sm md:text-base">State-of-the-art equipment and facilities.</p>
          </div>
          <div className="bg-[#f39c12] p-4 md:p-6 rounded-lg shadow-md">
            <h3 className="text-xl md:text-2xl font-semibold">Events</h3>
            <p className="text-sm md:text-base">Compete in exciting tournaments and events.</p>
          </div>
        </section>
      </main>

      <footer className="bg-[#0c1d2e] text-center p-4 text-sm md:text-base">
        <p>© 2025 Sports Academy. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default HomePage;