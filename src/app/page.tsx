"use client";

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { ShoppingBag, Plus, Star, Utensils, Wine, Home, Menu, X, Phone, Calendar, Clock, Users } from 'lucide-react';

interface MenuItem {
  id: number;
  name: string;
  price: number;
  category: string;
  desc: string;
  img: string;
  tag?: string;
}

const Page = () => {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [cart, setCart] = useState<MenuItem[]>([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showReservationPage, setShowReservationPage] = useState(false);
  
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const scale = useTransform(scrollY, [0, 300], [1, 0.9]);

  const categories = ["All", "Starters", "Main Course", "Signature", "Desserts"];

  const foodData: MenuItem[] = useMemo(() => [
    { id: 1, name: "Bluefin Tuna Tartare", price: 2900, category: "Starters", desc: "Avocado mousse, ponzu dressing, gold leaf.", img: "https://images.unsplash.com/photo-1546039907-7fa05f864c02?auto=format&fit=crop&q=80&w=800" },
    { id: 2, name: "Wagyu Beef Carpaccio", price: 3500, category: "Starters", desc: "Truffle aioli, capers, and 30-month aged parmesan.", img: "https://images.unsplash.com/photo-1615937657715-bc7b4b7962c1?auto=format&fit=crop&q=80&w=800", tag: "New" },
    { id: 3, name: "Hokkaido Scallops", price: 3100, category: "Starters", desc: "Pan-seared with cauliflower purée and herb oil.", img: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&q=80&w=800" },
    { id: 4, name: "Burrata Pugliese", price: 2400, category: "Starters", desc: "Heirloom tomatoes, balsamic pearls, fresh basil.", img: "https://images.unsplash.com/photo-1600335895229-6e75511ee923?auto=format&fit=crop&q=80&w=800" },
    { id: 5, name: "Crispy Soft Shell Crab", price: 2800, category: "Starters", desc: "Spicy mayo, pickled radish, coriander.", img: "https://images.unsplash.com/photo-1534604973900-c41ab4c5d036?auto=format&fit=crop&q=80&w=800" },
    { id: 6, name: "Foie Gras Terrine", price: 4500, category: "Starters", desc: "Fig jam, toasted brioche, fleur de sel.", img: "https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?auto=format&fit=crop&q=80&w=800" },
    { id: 7, name: "Roasted Duck Breast", price: 4200, category: "Main Course", desc: "Cherry glaze, parsnip purée, wild mushrooms.", img: "https://images.unsplash.com/photo-1518492104633-130d0cc84637?auto=format&fit=crop&q=80&w=800", tag: "Chef's Choice" },
    { id: 8, name: "Chilean Sea Bass", price: 5800, category: "Main Course", desc: "Miso glazed, bok choy, ginger dashi broth.", img: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&q=80&w=800" },
    { id: 9, name: "Lamb Rack Provençal", price: 4900, category: "Main Course", desc: "Herb-crusted, ratatouille, rosemary jus.", img: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=800" },
    { id: 10, name: "Lobster Thermidor", price: 7500, category: "Main Course", desc: "Creamy cognac sauce, gruyère crust, tarragon.", img: "https://images.unsplash.com/photo-1559742811-822873691df0?auto=format&fit=crop&q=80&w=800" },
    { id: 11, name: "Wild Mushroom Risotto", price: 3200, category: "Main Course", desc: "Porcini, chanterelles, truffle foam.", img: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?auto=format&fit=crop&q=80&w=800" },
    { id: 12, name: "Black Angus Fillet", price: 6200, category: "Main Course", desc: "Boulangère potatoes, asparagus, red wine reduction.", img: "https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&q=80&w=800" },
    { id: 13, name: "Wagyu Ribeye A5", price: 18500, category: "Signature", desc: "Japanese Wagyu, smoked sea salt, bone marrow jus.", img: "https://images.unsplash.com/photo-1546241072-48010ad28c2c?auto=format&fit=crop&q=80&w=800", tag: "Platinum" },
    { id: 14, name: "Black Truffle Tagliatelle", price: 4850, category: "Signature", desc: "Fresh pasta, butter sauce, shaved winter truffles.", img: "https://images.unsplash.com/photo-1473093226795-af9932fe5856?auto=format&fit=crop&q=80&w=800" },
    { id: 15, name: "Ossetra Caviar Service", price: 12000, category: "Signature", desc: "30g Royal Ossetra, blinis, traditional condiments.", img: "https://images.unsplash.com/photo-1591130901020-ef93616f4dd9?auto=format&fit=crop&q=80&w=800" },
    { id: 16, name: "Saffron Bouillabaisse", price: 5400, category: "Signature", desc: "Provencal seafood stew, rouille, sourdough.", img: "https://images.unsplash.com/photo-1560684352-8497838a2229?auto=format&fit=crop&q=80&w=800" },
    { id: 17, name: "Dry Aged Tomahawk", price: 15000, category: "Signature", desc: "45-day aged, serves two, triple cooked chips.", img: "https://images.unsplash.com/photo-1529692236671-f1f6cf958378?auto=format&fit=crop&q=80&w=800" },
    { id: 18, name: "King Crab Leg", img: "https://images.unsplash.com/photo-1559742811-822873691df0?auto=format&fit=crop&q=80&w=800", price: 8900, category: "Signature", desc: "Alaskan King Crab, garlic butter, lemon confit." },
    { id: 19, name: "Gold Leaf Opera Cake", price: 1800, category: "Desserts", desc: "Almond sponge, espresso buttercream, 24k gold.", img: "https://images.unsplash.com/photo-1509460913899-515f1df34fea?auto=format&fit=crop&q=80&w=800" },
    { id: 20, name: "Deconstructed Cheesecake", price: 1600, category: "Desserts", desc: "Berry compote, graham cracker soil, lime zest.", img: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&q=80&w=800" },
    { id: 21, name: "Valrhona Soufflé", price: 2100, category: "Desserts", desc: "Dark chocolate, Madagascar vanilla bean gelato.", img: "https://images.unsplash.com/photo-1579954115545-a95591f28be0?auto=format&fit=crop&q=80&w=800" },
    { id: 22, name: "Yuzu Panna Cotta", price: 1550, category: "Desserts", desc: "Matcha crumble, candied ginger, honey tuile.", img: "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&q=80&w=800" },
    { id: 23, name: "Tarte Tatin", price: 1750, category: "Desserts", desc: "Caramelized apples, puff pastry, crème fraîche.", img: "https://images.unsplash.com/photo-1519915028121-7d3463d20b13?auto=format&fit=crop&q=80&w=800" },
    { id: 24, name: "Artisanal Cheese Board", price: 3200, category: "Desserts", desc: "Selection of 5 European cheeses, honeycomb, nuts.", img: "https://images.unsplash.com/photo-1452195100486-9cc805987862?auto=format&fit=crop&q=80&w=800" },
  ], []);

  const filteredMenu = activeCategory === "All" ? foodData : foodData.filter(item => item.category === activeCategory);
  const cartTotal = cart.reduce((total, item) => total + item.price, 0);

  const scrollToSection = (id: string) => {
    setShowReservationPage(false);
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
    setIsMobileMenuOpen(false);
  };

  const handleGoToHome = () => {
    setShowReservationPage(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  };

  // --- UPDATED RESERVATION PAGE WITH FORM ---
  if (showReservationPage) {
    return (
      <div className="bg-[#F9F7F2] min-h-screen text-[#2D241E]">
        <nav className="px-6 md:px-16 py-8 flex justify-between items-center bg-white border-b border-gray-100 sticky top-0 z-50">
          <div className="text-2xl font-serif tracking-[0.2em] text-[#C5A059] cursor-pointer" onClick={handleGoToHome}>LUXDIN</div>
          <div className="hidden lg:flex gap-8 text-[11px] uppercase tracking-widest font-medium">
            <button onClick={handleGoToHome} className="hover:text-[#C5A059]">Home</button>           
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-sm font-medium">
                <Phone size={16} className="text-[#C5A059]" /> +92346 7894921
            </div>
            <button className="border-l border-gray-300 pl-6 text-sm font-bold uppercase tracking-wider">Book Table</button>
          </div>
        </nav>

        <main className="max-w-5xl mx-auto pt-24 pb-20 px-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
                <h1 className="text-6xl md:text-8xl font-serif italic mb-20">Secure <br/> Your Reservation</h1>
                
                <div className="w-full h-[1px] bg-gray-200 mb-16" />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-center md:text-left mb-24">
                    <div className="space-y-4 md:border-r md:border-gray-200 md:pr-12">
                        <h3 className="text-2xl font-serif">Address</h3>
                        <p className="text-gray-500 leading-relaxed">
                            123 Gourmet Avenue, Culinary <br/> City, Food Island, States
                        </p>
                    </div>
                    <div className="space-y-4 md:pl-12">
                        <h3 className="text-2xl font-serif">Hours</h3>
                        <p className="text-gray-500 leading-relaxed">
                            Tue - Sun ( 04:00 - 10:00 PM ) <br/> Closed on Monday
                        </p>
                    </div>
                </div>

                {/* --- THE RESERVATION FORM --- */}
                <motion.div 
                    initial={{ opacity: 0, y: 30 }} 
                    whileInView={{ opacity: 1, y: 0 }} 
                    viewport={{ once: true }}
                    className="bg-[#1A2A2A] text-white p-8 md:p-16 rounded-sm text-left shadow-2xl"
                >
                    <form className="space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-2">
                                <label className="text-xs uppercase tracking-widest font-bold opacity-70">First Name</label>
                                <input type="text" placeholder="Jane" className="w-full bg-white text-black p-4 outline-none focus:ring-1 focus:ring-[#C5A059]" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs uppercase tracking-widest font-bold opacity-70">Last Name</label>
                                <input type="text" placeholder="Smith" className="w-full bg-white text-black p-4 outline-none" />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-2">
                                <label className="text-xs uppercase tracking-widest font-bold opacity-70">Phone Number</label>
                                <input type="tel" placeholder="+123 456 7890" className="w-full bg-white text-black p-4 outline-none" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs uppercase tracking-widest font-bold opacity-70">Email</label>
                                <input type="email" placeholder="jane@framer.com" className="w-full bg-white text-black p-4 outline-none" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs uppercase tracking-widest font-bold opacity-70">Number of Guests</label>
                            <select className="w-full bg-white text-gray-400 p-4 outline-none appearance-none cursor-pointer">
                                <option>Number of Guests...</option>
                                <option>1 Guest</option>
                                <option>2 Guests</option>
                                <option>4 Guests</option>
                                <option>6+ Guests</option>
                            </select>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-2">
                                <label className="text-xs uppercase tracking-widest font-bold opacity-70">Date</label>
                                <div className="relative">
                                    <input type="date" className="w-full bg-white text-gray-400 p-4 outline-none" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs uppercase tracking-widest font-bold opacity-70">Time</label>
                                <input type="time" className="w-full bg-white text-gray-400 p-4 outline-none" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs uppercase tracking-widest font-bold opacity-70">Additional Info</label>
                            <textarea rows={4} placeholder="Additional Request..." className="w-full bg-white text-black p-4 outline-none resize-none"></textarea>
                        </div>

                        <button className="w-full bg-[#C5A059] text-black font-serif text-2xl py-6 hover:bg-white transition-colors duration-500 uppercase tracking-widest italic">
                            Submit
                        </button>
                    </form>
                </motion.div>
            </motion.div>
        </main>
         <footer className="bg-[#141414] text-white py-16 px-6 md:px-20 font-sans">
      {/* Newsletter Section */}
      <div className="flex flex-col md:flex-row justify-between items-center border-b border-gray-800 pb-16 mb-16">
        <h2 className="text-4xl md:text-5xl font-serif mb-8 md:mb-0 max-w-sm leading-tight">
          Stay Updated <br /> <span className="text-[#C5A059]">with Our Menus</span>
        </h2>
        <div className="flex w-full md:w-auto gap-0">
          <input 
            type="email" 
            placeholder="Enter Your Email" 
            className="bg-[#FDFBF7] text-gray-800 px-6 py-4 w-full md:w-80 outline-none"
          />
          <button className="bg-[#946331] hover:bg-[#7a5228] transition-colors px-10 py-4 font-semibold uppercase tracking-widest">
            Submit
          </button>
        </div>
      </div>

      {/* Links & Info Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 text-sm">
        {/* Links Column */}
        <div>
          <h3 className="text-xl font-semibold mb-6">Links</h3>
          <ul className="space-y-4 text-gray-400">
             <button onClick={handleGoToHome} className="hover:text-[#C5A059] transition-colors flex items-center gap-2">
            <Home size={14} /> Home
          </button>
            <button onClick={() => scrollToSection('services')} className="hover:text-[#C5A059] transition-colors">About</button>
            <li className="hover:text-[#C5A059] cursor-pointer">Teams</li>
            <button onClick={() => scrollToSection('services')} className="hover:text-[#C5A059] transition-colors">Services</button>
            <li className="hover:text-[#C5A059] cursor-pointer"></li>
            <button onClick={() => scrollToSection('blog')} className="hover:text-[#C5A059] transition-colors">Blogs</button>
            <li className="hover:text-[#C5A059] cursor-pointer"></li>
            <button onClick={() => scrollToSection('contact')} className="hover:text-[#C5A059] transition-colors">Contact</button>
          </ul>
        </div>

        {/* Menu Column */}
        <div>
          <h3 className="text-xl font-semibold mb-6">Menu</h3>
          <ul className="space-y-4 text-gray-400">
            <button onClick={() => scrollToSection('menu')} className="hover:text-[#C5A059] transition-colors">Our Menu</button>                  
            <li className="hover:text-white cursor-pointer">Main Course</li>
            <li className="hover:text-white cursor-pointer">Salad</li>
            <li className="hover:text-white cursor-pointer">Dessert</li>
          </ul>
        </div>

        {/* Address Column */}
        <div>
          <h3 className="text-xl font-semibold mb-6">Address</h3>
          <p className="text-gray-400 leading-relaxed mb-4">
            123 Gourmet Avenue, Culinary <br /> 
            City, Food Island, Any States
          </p>
          <p className="text-gray-400 mb-6">+1 (555) 123-4567</p>
          <a href="#" className="text-white underline underline-offset-8 decoration-1">
            Get location direction
          </a>
        </div>

        {/* Brand Column */}
        <div className="flex flex-col items-start md:items-end text-left md:text-right">
          <h2 className="text-5xl font-serif text-[#C5A059] mb-4 italic">LuxDin</h2>
          <p className="text-gray-400 max-w-xs leading-relaxed mb-8">
            At LuxDin, we believe in the power of luxurious food gastronomy to create memorable experiences.
          </p>
          <div className="mt-auto">
             <h3 className="text-xl font-semibold mb-2">Hours</h3>
             <p className="text-gray-400 italic">Tue - Sun ( 16:00 - 22:00 )</p>
          </div>
        </div>
      </div>
    </footer>
        <div className="py-12 flex justify-center opacity-50">
            <div className="bg-white px-4 py-2 rounded-md shadow-sm border border-gray-100 flex items-center gap-2 text-[10px] font-bold">
                <span className="opacity-50">Made in</span> Framer
            </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#0D0D0D] text-[#E5E5E5] selection:bg-[#C5A059] selection:text-black min-h-screen">
      
      {/* NAVBAR */}
      <nav className="fixed top-0 w-full z-[100] px-6 md:px-16 py-5 flex justify-between items-center bg-black/10 backdrop-blur-lg border-b border-white/5">
       <div className="hidden lg:flex gap-6 text-[10px] uppercase tracking-[0.4em] font-medium items-center">
  <button 
    onClick={handleGoToHome} 
    className=" py-2 hover:bg-[#B38B4D] hover:text-white transition-all duration-300 flex items-center gap-2 rounded-sm"
  >
    <Home size={14} /> Home
  </button>

  <button 
    onClick={() => scrollToSection('services')} 
    className="px-1 py-2 hover:bg-[#B38B4D] hover:text-white transition-all duration-300 rounded-sm">Services</button>

  <button 
    onClick={() => scrollToSection('menu')} 
    className="px-1 py-2 hover:bg-[#B38B4D] hover:text-white transition-all duration-300 rounded-sm"
  >
    Menu
  </button>

  <button 
    onClick={() => scrollToSection('blog')} 
    className="px-1 py-2 hover:bg-[#B38B4D] hover:text-white transition-all duration-300 rounded-sm"
  >
    Blog
  </button>

  <button 
    onClick={() => scrollToSection('contact')} 
    className="px-1 py-2 hover:bg-[#B38B4D] hover:text-white transition-all duration-300 rounded-sm"
  >
    Contact
  </button>
</div>

        <button className="lg:hidden text-[#C5A059]" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} 
          onClick={handleGoToHome}
          className="text-2xl md:text-4xl font-serif tracking-[0.3em] text-[#C5A059] cursor-pointer"
        >
          LUXDIN
        </motion.div>

        <div className="flex items-center gap-4 md:gap-8 text-[10px] uppercase tracking-[0.4em]">
          <div className="relative cursor-pointer group flex items-center gap-2">
            <ShoppingBag size={18} className="group-hover:text-[#C5A059] transition-colors" />
            <span className="bg-[#C5A059] text-black w-5 h-5 rounded-full flex items-center justify-center font-bold text-[9px]">
              {cart.length}
            </span>
          </div>
          <button 
            onClick={() => setShowReservationPage(true)}
            className="hidden sm:block border border-[#C5A059]/30 px-6 py-3 rounded-full hover:bg-[#C5A059] hover:text-black transition-all"
          >
            Reservations
          </button>
        </div>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }}
              className="fixed inset-0 h-screen w-full bg-black/95 z-[90] flex flex-col items-center justify-center gap-12 text-[14px] uppercase tracking-[0.5em]"
            >
              <button onClick={handleGoToHome} className="hover:text-[#C5A059]">Home</button>
              <button onClick={() => scrollToSection('services')} className="hover:text-[#C5A059]">Services</button>
              <button onClick={() => scrollToSection('menu')} className="hover:text-[#C5A059]">Menu</button>
              <button onClick={() => {setShowReservationPage(true); setIsMobileMenuOpen(false);}} className="text-[#C5A059] border border-[#C5A059] px-8 py-4 rounded-full">Reservations</button>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* HERO SECTION */}
      <section className="relative h-screen flex flex-col justify-center items-center overflow-hidden">
        <motion.div style={{ opacity, scale }} className="z-20 text-center max-w-5xl px-6">
          <motion.span initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8 }} className="text-[#C5A059] uppercase tracking-[0.8em] text-[11px] mb-8 block font-bold">
            Unforgettable Culinary Art
          </motion.span>
          <motion.h1 
            initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1, delay: 0.2 }}
            className="text-[10vw] md:text-[5.5vw] font-serif leading-[1.1] mb-12 italic"
          >
            Experience Gastronomy <br/> at its <span className="text-[#C5A059]">Finest</span>.
          </motion.h1>
          <motion.button 
            initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8, delay: 0.4 }}
            onClick={() => scrollToSection('menu')} 
            className="bg-[#C5A059] text-black px-12 py-6 rounded-full text-[10px] font-black uppercase tracking-[0.3em] hover:scale-105 transition-transform"
          >
            Discover Menu
          </motion.button>
        </motion.div>
        <motion.div style={{ y: y1 }} className="absolute inset-0 z-0 scale-110">
          <div className="absolute inset-0 bg-black/60 z-10" />
          <img src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=1600" className="w-full h-full object-cover" alt="Hero" />
        </motion.div>
      </section>

      {/* ABOUT/SERVICES SECTION */}
      <section id="services" className="py-32 px-6 md:px-24 bg-white/80 text-black">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center mb-32">
            <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 1 }} viewport={{ once: true }} className="space-y-8">
              <span className="text-[#C5A059] uppercase tracking-[0.5em] text-[10px] font-bold">Excellence in Service</span>
              <h2 className="text-[8vw] lg:text-[4vw] font-serif leading-none italic">Elevated Dining <br/>Beyond the Plate.</h2>
              <p className="text-gray-600 leading-loose text-lg font-light italic">
                Luxdin isn’t just about food; it’s an orchestration of fine living. From our private cellar experiences 
                to tailor-made events, we define the standard of modern luxury hospitality.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 pt-10 border-t border-black/5">
                <div className="space-y-4">
                  <Utensils className="text-[#C5A059]" size={32} />
                  <h4 className="text-xl font-serif">Private Chef</h4>
                  <p className="text-sm text-gray-500">World-class Michelin chefs at your personal disposal for private events.</p>
                </div>
                <div className="space-y-4">
                  <Wine className="text-[#C5A059]" size={32} />
                  <h4 className="text-xl font-serif">Vintage Cellar</h4>
                  <p className="text-sm text-gray-500">Rare access to over 500+ curated international labels and spirits.</p>
                </div>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 1.2 }} viewport={{ once: true }} className="relative aspect-square rounded-full overflow-hidden border-[10px] md:border-[20px] border-[#EAE5D9] shadow-2xl">
              <img src="https://images.unsplash.com/photo-1550966841-396ad886fe5c?auto=format&fit=crop&q=80&w=1000" className="w-full h-full object-cover" alt="Luxury Experience" />
              <div className="absolute inset-0 bg-black/10 flex items-center justify-center">
                 <div className="bg-white/90 backdrop-blur-md p-6 md:p-8 rounded-full text-center shadow-xl">
                    <Star className="text-[#C5A059] mx-auto mb-2" fill="currentColor" size={20} />
                    <p className="font-serif text-xl md:text-2xl italic">Luxury</p>
                    <p className="text-[7px] md:text-[9px] uppercase tracking-widest text-gray-400">Award Winning</p>
                 </div>
              </div>
            </motion.div>
          </div>

          <div className="pt-20 border-t border-black/5">
              <div className="text-center mb-16">
                <span className="text-[#C5A059] uppercase tracking-[0.4em] text-[10px] font-bold">The Masters</span>
                <h3 className="text-3xl md:text-4xl font-serif italic mt-4">Our Professional Culinary Team</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                {[
                  { name: "Chef Julian Rossi", role: "Executive Head Chef", desc: "A 3-Michelin star veteran with 20 years experience.", img: "https://images.unsplash.com/photo-1583394293214-28ded15ee548?auto=format&fit=crop&q=80&w=800" },
                  { name: "Chef Elena Miyako", role: "Master Saucier", desc: "Intricate fusion of Japanese and Mediterranean flavors.", img: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&q=80&w=800" },
                  { name: "Chef Marcus Thorne", role: "Pastry Architect", desc: "Turning desserts into structural art and rare infusions.", img: "https://images.unsplash.com/photo-1595273670150-bd0c3c392e46?auto=format&fit=crop&q=80&w=800" }
                ].map((chef, index) => (
                  <motion.div key={index} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.2, duration: 0.8 }} viewport={{ once: true }} className="space-y-6 text-center group">
                    <div className="aspect-[4/5] overflow-hidden rounded-2xl">
                      <img src={chef.img} className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" alt={chef.name} />
                    </div>
                    <div>
                      <h4 className="text-2xl font-serif italic">{chef.name}</h4>
                      <p className="text-[#C5A059] text-[10px] uppercase tracking-widest font-bold mt-1">{chef.role}</p>
                      <p className="text-gray-500 text-sm mt-4 font-light leading-relaxed">{chef.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
          </div>
        </div>
      </section>

      {/* MENU SECTION */}
      <section id="menu" className="py-32 px-6 md:px-24 bg-white/0">
        <div className="flex flex-col items-center text-center mb-20">
           <h2 className="text-4xl md:text-5xl font-serif mb-6 italic text-[#C5A059]">The Signature Menu</h2>
           <div className="flex flex-wrap justify-center gap-4 md:gap-12 border-b border-white/5 w-full max-w-4xl pb-4">
            {categories.map(cat => (
              <button key={cat} onClick={() => setActiveCategory(cat)} className={`text-[9px] md:text-[10px] uppercase tracking-[0.3em] font-bold px-2 md:px-4 py-2 transition-all duration-500 ${activeCategory === cat ? 'text-[#C5A059] border-b-2 border-[#C5A059]' : 'text-gray-600 hover:text-white'}`}>
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-6 gap-y-12">
          <AnimatePresence mode="popLayout">
            {filteredMenu.map((item) => (
              <motion.div layout key={item.id} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.5 }} className="group">
                <div className="relative aspect-[4/5] overflow-hidden mb-4 bg-[#111]">
                  {item.tag && <div className="absolute top-3 left-3 z-20 bg-[#C5A059] text-black text-[7px] font-black px-2 py-1 uppercase tracking-widest rounded-full">{item.tag}</div>}
                  <motion.img whileHover={{ scale: 1.1 }} transition={{ duration: 1.5 }} src={item.img} className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-700" alt={item.name} />
                  <button onClick={() => setCart([...cart, item])} className="absolute bottom-4 right-4 bg-white text-black w-10 h-10 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 shadow-2xl hover:bg-[#C5A059]"><Plus size={16} /></button>
                </div>
                <div className="space-y-2 px-1">
                  <div className="flex flex-col font-serif">
                    <h3 className="text-[#C5A059] text-sm leading-tight mb-1">{item.name}</h3>
                    <span className="text-[10px] font-bold tracking-widest text-white/60">Rs.{item.price}</span>
                  </div>
                  <p className="text-gray-500 text-[10px] leading-relaxed italic line-clamp-2">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </section>

     <section id="blog" className="py-32 px-6 md:px-24 bg-blue-50 text-black overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <div className="space-y-4">
              <span className="text-[#C5A059] uppercase tracking-[0.6em] text-[10px] font-bold">The Culinary Journal</span>
              <h2 className="text-5xl md:text-6xl font-serif italic">Latest Stories</h2>
            </div>
            <motion.button 
              whileHover={{ gap: "24px" }}
              className="flex items-center gap-4 text-[10px] uppercase tracking-[0.3em] font-bold border-b border-black pb-2 transition-all"
            >
             
            </motion.button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { 
                title: "The Art of Wine Pairing", 
                cat: "Lifestyle", 
                date: "Jan 24, 2026",
                img: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&q=80&w=800",
                desc: "Discover how the right vintage elevates every flavor profile in our signature main courses."
              },
              { 
                title: "Sourcing A5 Wagyu", 
                cat: "Behind the Scenes", 
                date: "Feb 02, 2026",
                img: "https://images.unsplash.com/photo-1546241072-48010ad28c2c?auto=format&fit=crop&q=80&w=800",
                desc: "A journey from the pristine farms of Japan to our open-fire charcoal grills."
              },
              { 
                title: "Winter Pastry Trends", 
                cat: "Culinary", 
                date: "Feb 08, 2026",
                img: "https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&q=80&w=800",
                desc: "How our pastry architects are redefining traditional desserts with gold and saffron."
              }
            ].map((post, idx) => (
              <motion.div 
                key={idx} 
                initial={{ opacity: 0, y: 30 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                transition={{ delay: idx * 0.2 }}
                viewport={{ once: true }}
                className="group cursor-pointer"
              >
                <div className="relative overflow-hidden aspect-[16/10] mb-8">
                  <motion.img 
                    whileHover={{ scale: 1.05 }} 
                    transition={{ duration: 0.8 }}
                    src={post.img} 
                    className="w-full h-full object-cover transition-transform"
                  />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 text-[8px] uppercase tracking-widest font-bold">
                    {post.cat}
                  </div>
                </div>
                <div className="space-y-4">
                  <span className="text-[10px] text-gray-400 font-bold tracking-widest uppercase">{post.date}</span>
                  <h3 className="text-2xl font-serif italic group-hover:text-[#C5A059] transition-colors">{post.title}</h3>
                  <p className="text-gray-500 text-sm font-light leading-relaxed">{post.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Customer Message Section */}
         <motion.div 
  initial={{ opacity: 0 }} 
  whileInView={{ opacity: 1 }}
  viewport={{ once: true }}
  className="mt-32 p-12 md:p-20 text-center relative border border-black/5 bg-cover bg-center overflow-hidden"
  style={{ 
    backgroundImage: `url('https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&q=80&w=1500')` 
  }}
>
  {/* Dark overlay taaki pic bhi dikhe aur text bhi clear ho */}
  <div className="absolute inset-0 bg-black/30"></div>

  <div className="max-w-3xl mx-auto space-y-8 relative z-10">
    <Star className="text-[#C5A059] mx-auto mb-4" fill="currentColor" size={24} />
    <h4 className="text-3xl md:text-4xl font-serif italic leading-snug text-white">
      "Our mission is to create a symphony of flavors that resonates long after your final bite."
    </h4>
    <div className="pt-6">
      <p className="text-[10px] uppercase tracking-[0.5em] font-bold text-[#C5A059]">Julian Rossi</p>
      <p className="text-[9px] uppercase tracking-[0.2em] text-gray-200 mt-2">Executive Head Chef</p>
    </div>
  </div>
</motion.div>
        </div>
      </section>
{/* --- CONTACT SECTION (AS PER IMAGE) --- */}
      
      <section id="contact" className="py-32 px-6 md:px-24   bg-gradient-to-br from-[#1C1917] via-[#0D0D0D] to-[#0D0D0D] py-20 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
            {/* Left Side: Title */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }} 
              whileInView={{ opacity: 1, x: 0 }} 
              viewport={{ once: true }}
              className="pt-10"
            >
              <h2 className="text-[10vw] md:text-[6vw] font-serif leading-[1.1] italic">
                Connect <br/> with <span className="text-[#C5A059]">LuxDin</span>
              </h2>
            </motion.div>

            {/* Right Side: Form */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }} 
              whileInView={{ opacity: 1, x: 0 }} 
              viewport={{ once: true }}
              className="space-y-10"
            >
              
<form className="space-y-10 border border-white/110 p-8 md:p-12 rounded-sm shadow-sm">
  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 ">
    <div className="space-y-3">
      <label className="text-[10px] uppercase tracking-[0.2em] font-bold opacity-60">First Name</label>
      <input type="text" placeholder="First Name" className="w-full bg-transparent border-b border-black/20 pb-4 outline-none focus:border-[#C5A059] transition-colors placeholder:text-gray-300" />
    </div>
    <div className="space-y-3">
      <label className="text-[10px] uppercase tracking-[0.2em] font-bold opacity-60">Last Name</label>
      <input type="text" placeholder="Last Name" className="w-full bg-transparent border-b border-black/20 pb-4 outline-none focus:border-[#C5A059] transition-colors placeholder:text-gray-300" />
    </div>
  </div>

  <div className="space-y-3">
    <label className="text-[10px] uppercase tracking-[0.2em] font-bold opacity-60">Email</label>
    <input type="email" placeholder="Enter Your Email" className="w-full bg-transparent border-b border-black/20 pb-4 outline-none focus:border-[#C5A059] transition-colors placeholder:text-gray-300" />
  </div>

  <div className="space-y-3">
    <label className="text-[10px] uppercase tracking-[0.2em] font-bold opacity-60">Message</label>
    <textarea rows={4} placeholder="Write a message...." className="w-full bg-transparent border-b border-black/20 pb-4 outline-none focus:border-[#C5A059] transition-colors resize-none placeholder:text-gray-300"></textarea>
  </div>

  <button className="w-full bg-[#B38B4D] text-white font-serif text-2xl py-6 hover:bg-[#2D241E] transition-all duration-500 italic shadow-xl">
    Submit
  </button>
</form>
            </motion.div>
          </div>
        </div>
      </section>
      

      {/* FOOTER */}
      <footer className="bg-[#062C22] text-white py-16 px-6 md:px-20 font-sans">
      {/* Newsletter Section */}
      <div className="flex flex-col md:flex-row justify-between items-center border-b border-gray-800 pb-16 mb-16">
        <h2 className="text-4xl md:text-5xl font-serif mb-8 md:mb-0 max-w-sm leading-tight">
          Stay Updated <br /> <span className="text-[#C5A059]">with Our Menus</span>
        </h2>
        <div className="flex w-full md:w-auto gap-0">
          <input 
            type="email" 
            placeholder="Enter Your Email" 
            className="bg-[#FDFBF7] text-gray-800 px-6 py-4 w-full md:w-80 outline-none"
          />
          <button className="bg-[#946331] hover:bg-[#7a5228] transition-colors px-10 py-4 font-semibold uppercase tracking-widest">
            Submit
          </button>
        </div>
      </div>

      {/* Links & Info Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 text-sm">
        {/* Links Column */}
        <div>
          <h3 className="text-xl font-semibold mb-6">Links</h3>
          <ul className="space-y-4 text-gray-400">
             <button onClick={handleGoToHome} className="hover:text-[#C5A059] transition-colors flex items-center gap-2">
            <Home size={14} /> Home
          </button>
            <button onClick={() => scrollToSection('services')} className="hover:text-[#C5A059] transition-colors">About</button>
            <li className="hover:text-[#C5A059] cursor-pointer">Teams</li>
            <button onClick={() => scrollToSection('services')} className="hover:text-[#C5A059] transition-colors">Services</button>
            <li className="hover:text-[#C5A059] cursor-pointer"></li>
            <button onClick={() => scrollToSection('blog')} className="hover:text-[#C5A059] transition-colors">Blogs</button>
            <li className="hover:text-[#C5A059] cursor-pointer"></li>
            <button onClick={() => scrollToSection('contact')} className="hover:text-[#C5A059] transition-colors">Contact</button>
          </ul>
        </div>

        {/* Menu Column */}
        <div>
          <h3 className="text-xl font-semibold mb-6">Menu</h3>
          <ul className="space-y-4 text-gray-400">
            <button onClick={() => scrollToSection('menu')} className="hover:text-[#C5A059] transition-colors">Our Menu</button>                  
            <li className="hover:text-white cursor-pointer">Main Course</li>
            <li className="hover:text-white cursor-pointer">Salad</li>
            <li className="hover:text-white cursor-pointer">Dessert</li>
          </ul>
        </div>

        {/* Address Column */}
        <div>
          <h3 className="text-xl font-semibold mb-6">Address</h3>
          <p className="text-gray-400 leading-relaxed mb-4">
            123 Gourmet Avenue, Culinary <br /> 
            City, Food Island, Any States
          </p>
          <p className="text-gray-400 mb-6">+1 (555) 123-4567</p>
          <a href="#" className="text-white underline underline-offset-8 decoration-1">
            Get location direction
          </a>
        </div>

        {/* Brand Column */}
        <div className="flex flex-col items-start md:items-end text-left md:text-right">
          <h2 className="text-5xl font-serif text-[#C5A059] mb-4 italic">LuxDin</h2>
          <p className="text-gray-400 max-w-xs leading-relaxed mb-8">
            At LuxDin, we believe in the power of luxurious food gastronomy to create memorable experiences.
          </p>
          <div className="mt-auto">
             <h3 className="text-xl font-semibold mb-2">Hours</h3>
             <p className="text-gray-400 italic">Tue - Sun ( 16:00 - 22:00 )</p>
          </div>
        </div>
      </div>
    </footer>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar { width: 1px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #C5A059; }
      `}</style>
    </div>
  );
};

export default Page;