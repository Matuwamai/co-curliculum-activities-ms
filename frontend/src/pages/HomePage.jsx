import React from "react";

const HomePage = () => {
  return (
    <div className="bg-gradient-to-br from-[#0c1d2e] to-[#0a1622] text-white font-sans min-h-screen flex flex-col overflow-x-hidden">
      {/* Hero Section with Animated Background */}
      <div className="relative">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=3000&auto=format&fit=crop')] bg-cover bg-center opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#0c1d2e] to-transparent"></div>

        <header className="relative bg-transparent p-4 z-10">
          <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-[#f39c12] rounded-full flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16v7h4v-7a2 2 0 00-2-2 2 2 0 00-2 2zm0 0V8a6 6 0 0112 0v8"
                  />
                </svg>
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-[#f39c12]">
                Elite Sports Academy
              </h1>
            </div>

            <div className="flex items-center gap-6">
              <nav className="hidden md:block">
                <ul className="flex space-x-8">
                  <li>
                    <a
                      href="#"
                      className="hover:text-[#f39c12] transition duration-300 font-medium"
                    >
                      Home
                    </a>
                  </li>
                  <li>
                    <a
                      href="#about"
                      className="hover:text-[#f39c12] transition duration-300 font-medium"
                    >
                      About
                    </a>
                  </li>
                  <li>
                    <a
                      href="#programs"
                      className="hover:text-[#f39c12] transition duration-300 font-medium"
                    >
                      Programs
                    </a>
                  </li>
                  <li>
                    <a
                      href="#testimonials"
                      className="hover:text-[#f39c12] transition duration-300 font-medium"
                    >
                      Success Stories
                    </a>
                  </li>
                  <li>
                    <a
                      href="#contact"
                      className="hover:text-[#f39c12] transition duration-300 font-medium"
                    >
                      Contact
                    </a>
                  </li>
                </ul>
              </nav>

              <a
                href="/login"
                className="bg-[#f39c12] hover:bg-[#e67e22] text-white px-4 py-2 rounded-lg transition duration-300 font-medium shadow-lg"
              >
                Join Now
              </a>
            </div>
          </div>

          {/* Mobile navigation */}
          <nav className="md:hidden mt-4">
            <ul className="flex flex-wrap justify-center gap-4">
              <li>
                <a href="#" className="hover:text-[#f39c12] transition">
                  Home
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-[#f39c12] transition">
                  About
                </a>
              </li>
              <li>
                <a href="#programs" className="hover:text-[#f39c12] transition">
                  Programs
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-[#f39c12] transition">
                  Contact
                </a>
              </li>
            </ul>
          </nav>
        </header>

        {/* Hero Content */}
        <div className="relative container mx-auto px-4 py-20 md:py-32 text-center z-10">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fadeIn">
            <span className="text-white">Unleash Your </span>
            <span className="text-[#f39c12]">Athletic Potential</span>
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-8 animate-fadeIn delay-100">
            World-class training facilities and coaching to take your game to
            the next level
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 animate-fadeIn delay-200">
            <a
              href="#programs"
              className="bg-[#f39c12] hover:bg-[#e67e22] text-white px-8 py-3 rounded-lg text-lg font-semibold transition duration-300 shadow-lg transform hover:scale-105"
            >
              Explore Programs
            </a>
            <a
              href="#contact"
              className="bg-transparent border-2 border-white hover:bg-white hover:text-[#0c1d2e] text-white px-8 py-3 rounded-lg text-lg font-semibold transition duration-300 shadow-lg transform hover:scale-105"
            >
              Book a Tour
            </a>
          </div>
        </div>
      </div>

      {/* About Section */}
      <section
        id="about"
        className="py-16 bg-[#0f2435] relative overflow-hidden"
      >
        <div className="absolute -right-20 -top-20 w-64 h-64 bg-[#f39c12] rounded-full opacity-10"></div>
        <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-[#f39c12] rounded-full opacity-10"></div>

        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2 animate-slideInLeft">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                <span className="text-[#f39c12]">About</span> Our Academy
              </h2>
              <p className="text-lg mb-6">
                Founded in 2010, Elite Sports Academy has trained over 5,000
                athletes across 15 different sports. Our state-of-the-art
                facility spans 50,000 square feet with Olympic-grade equipment.
              </p>
              <p className="text-lg mb-8">
                Our coaching staff includes former professional athletes and
                certified trainers with decades of combined experience
                developing champions at all levels.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#0c1d2e] p-4 rounded-lg shadow-md">
                  <h3 className="text-xl font-semibold text-[#f39c12]">15+</h3>
                  <p>Sports Disciplines</p>
                </div>
                <div className="bg-[#0c1d2e] p-4 rounded-lg shadow-md">
                  <h3 className="text-xl font-semibold text-[#f39c12]">50+</h3>
                  <p>Certified Coaches</p>
                </div>
              </div>
            </div>
            <div className="md:w-1/2 animate-slideInRight">
              <div className="relative rounded-xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1547347298-4074fc3086f0?q=80&w=3000&auto=format&fit=crop"
                  alt="Athletes training"
                  className="w-full h-auto"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6">
                  <h3 className="text-white text-xl font-bold">
                    Our Training Philosophy
                  </h3>
                  <p className="text-white text-sm">
                    Mind, Body, and Spirit - we develop complete athletes
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section id="programs" className="py-16 bg-[#0c1d2e]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Our <span className="text-[#f39c12]">Training Programs</span>
            </h2>
            <p className="text-lg max-w-2xl mx-auto">
              Customized training programs designed for athletes at every level,
              from beginners to professionals
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Youth Development",
                description:
                  "Fundamental skills and athletic development for ages 6-16",
                icon: "🏃‍♂️",
                bgImage:
                  "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=3000&auto=format&fit=crop",
              },
              {
                title: "Elite Performance",
                description:
                  "Advanced training for competitive athletes and professionals",
                icon: "🏆",
                bgImage:
                  "https://images.unsplash.com/photo-1531415074968-036ba1b575da?q=80&w=3000&auto=format&fit=crop",
              },
              {
                title: "Strength & Conditioning",
                description:
                  "Sport-specific physical preparation and injury prevention",
                icon: "💪",
                bgImage:
                  "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=3000&auto=format&fit=crop",
              },
              {
                title: "Team Training",
                description: "Custom programs for schools and club teams",
                icon: "👥",
                bgImage:
                  "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=3000&auto=format&fit=crop",
              },
              {
                title: "Recovery & Wellness",
                description: "Physical therapy, massage, and recovery services",
                icon: "🧘‍♂️",
                bgImage:
                  "https://images.unsplash.com/photo-1545205597-3d9d02c29597?q=80&w=3000&auto=format&fit=crop",
              },
              {
                title: "Sports Nutrition",
                description: "Meal planning and dietary guidance for athletes",
                icon: "🍎",
                bgImage:
                  "https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=3000&auto=format&fit=crop",
              },
            ].map((program, index) => (
              <div
                key={index}
                className="relative rounded-xl overflow-hidden shadow-lg group transform hover:scale-105 transition duration-500 h-64"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center opacity-70 group-hover:op-80 transition duration-500"
                  style={{ backgroundImage: `url(${program.bgImage})` }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
                <div className="relative h-full flex flex-col justify-end p-6">
                  <div className="text-4xl mb-2">{program.icon}</div>
                  <h3 className="text-xl font-bold mb-2">{program.title}</h3>
                  <p className="text-sm">{program.description}</p>
                  <button className="mt-4 self-start text-[#f39c12] font-medium hover:underline">
                    Learn more →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-16 bg-[#0f2435]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="text-[#f39c12]">Success</span> Stories
            </h2>
            <p className="text-lg max-w-2xl mx-auto">
              Hear from athletes who've transformed their game at our academy
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote:
                  "The coaching staff took my game to another level. Went from JV to varsity starter in one season!",
                name: "Jamal Williams",
                sport: "Basketball",
                image: "https://randomuser.me/api/portraits/men/32.jpg",
              },
              {
                quote:
                  "The strength program helped me increase my sprint speed by 0.3 seconds - crucial for college scouts.",
                name: "Sarah Johnson",
                sport: "Track & Field",
                image: "https://randomuser.me/api/portraits/women/44.jpg",
              },
              {
                quote:
                  "After ACL surgery, their recovery program got me back on the field stronger than before.",
                name: "Miguel Rodriguez",
                sport: "Soccer",
                image: "https://randomuser.me/api/portraits/men/75.jpg",
              },
            ].map((testimonial, index) => (
              <div
                key={index}
                className="bg-[#0c1d2e] p-8 rounded-xl shadow-lg transform hover:scale-105 transition duration-300"
              >
                <div className="flex items-center mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      className="w-5 h-5 text-[#f39c12]"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-lg italic mb-6">"{testimonial.quote}"</p>
                <div className="flex items-center">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4 object-cover"
                  />
                  <div>
                    <h4 className="font-bold">{testimonial.name}</h4>
                    <p className="text-sm text-[#f39c12]">
                      {testimonial.sport}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#0c1d2e] to-[#f39c12] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-32 h-32 bg-white rounded-full"></div>
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-white rounded-full"></div>
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to <span className="text-white">Elevate Your Game</span>?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Schedule a free assessment with one of our coaches today
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="#contact"
              className="bg-white hover:bg-gray-100 text-[#0c1d2e] px-8 py-4 rounded-lg text-lg font-bold transition duration-300 shadow-xl transform hover:scale-105"
            >
              Book Your Session
            </a>
            <a
              href="tel:+18005551234"
              className="bg-transparent border-2 border-white hover:bg-white hover:text-[#0c1d2e] text-white px-8 py-4 rounded-lg text-lg font-bold transition duration-300 shadow-xl transform hover:scale-105"
            >
              Call Us: (800) 555-1234
            </a>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 bg-[#0c1d2e]">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-12">
            <div className="md:w-1/2">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                <span className="text-[#f39c12]">Contact</span> Us
              </h2>
              <p className="text-lg mb-8">
                Have questions or ready to get started? Reach out to our team
                for more information.
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-[#f39c12] p-3 rounded-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Location</h3>
                    <p>123 Sports Avenue, Athletic City, AC 12345</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-[#f39c12] p-3 rounded-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Phone</h3>
                    <p>(800) 555-1234</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-[#f39c12] p-3 rounded-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Email</h3>
                    <p>info@elitesportsacademy.com</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="md:w-1/2">
              <form className="bg-[#0f2435] p-8 rounded-xl shadow-lg">
                <h3 className="text-2xl font-bold mb-6">Send Us a Message</h3>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block mb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="w-full bg-[#0c1d2e] border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#f39c12]"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="w-full bg-[#0c1d2e] border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#f39c12]"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block mb-1">
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows="4"
                      className="w-full bg-[#0c1d2e] border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#f39c12]"
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-[#f39c12] hover:bg-[#e67e22] text-white font-bold py-3 px-4 rounded-lg transition duration-300 mt-4"
                  >
                    Send Message
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0a1622] py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold text-[#f39c12] mb-4">
                Elite Sports Academy
              </h3>
              <p className="text-sm">
                Developing champions on and off the field through world-class
                training and mentorship.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:text-[#f39c12] transition">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#about" className="hover:text-[#f39c12] transition">
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="#programs"
                    className="hover:text-[#f39c12] transition"
                  >
                    Programs
                  </a>
                </li>
                <li>
                  <a
                    href="#testimonials"
                    className="hover:text-[#f39c12] transition"
                  >
                    Success Stories
                  </a>
                </li>
                <li>
                  <a
                    href="#contact"
                    className="hover:text-[#f39c12] transition"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Sports</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:text-[#f39c12] transition">
                    Basketball
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#f39c12] transition">
                    Soccer
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#f39c12] transition">
                    Track & Field
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#f39c12] transition">
                    Volleyball
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#f39c12] transition">
                    Tennis
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Connect With Us</h4>
              <div className="flex space-x-4 mb-4">
                <a
                  href="#"
                  className="bg-[#0c1d2e] p-2 rounded-full hover:bg-[#f39c12] transition"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="bg-[#0c1d2e] p-2 rounded-full hover:bg-[#f39c12] transition"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 3.807.058h.468c2.456 0 2.784-.011 3.807-.058.975-.045 1.504-.207 1.857-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-3.807v-.468c0-2.456-.011-2.784-.058-3.807-.045-.975-.207-1.504-.344-1.857a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="bg-[#0c1d2e] p-2 rounded-full hover:bg-[#f39c12] transition"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="bg-[#0c1d2e] p-2 rounded-full hover:bg-[#f39c12] transition"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                  </svg>
                </a>
              </div>
              <div className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-[#f39c12]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <p className="text-sm">
                  Mon-Fri: 6AM - 10PM
                  <br />
                  Sat-Sun: 7AM - 8PM
                </p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-700 pt-8 text-center">
            <p>
              © {new Date().getFullYear()} Elite Sports Academy. All rights
              reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
