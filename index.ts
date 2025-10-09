import React, { useState } from 'react';
import { MessageCircle, X, Send, Sparkles, Code, Bot, Zap, Check, ArrowRight, Menu, Moon, Sun, TrendingUp, Star, Loader, ExternalLink, ShoppingCart, Calendar, Mail, Search, Lock, Palette, BarChart3, Globe } from 'lucide-react';

const Portfolio = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { type: 'bot', text: 'Hey! Ask me about pricing, timeline, or try "demo" to see my work!' }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [notification, setNotification] = useState(null);

  // Demo states
  const [optimizerInput, setOptimizerInput] = useState('');
  const [optimizerResults, setOptimizerResults] = useState(null);
  const [roiVisitors, setRoiVisitors] = useState('');
  const [roiRate, setRoiRate] = useState('');
  const [roiValue, setRoiValue] = useState('');
  const [roiResults, setRoiResults] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [emailValidation, setEmailValidation] = useState('');
  const [emailResult, setEmailResult] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [selectedColor, setSelectedColor] = useState('#3B82F6');
  const [colorPalette, setColorPalette] = useState(null);
  const [analyticsData, setAnalyticsData] = useState(null);
  const [bookingDate, setBookingDate] = useState('');
  const [bookingTime, setBookingTime] = useState('');
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  const showNotification = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const sendEmail = (subject, body) => {
    const link = document.createElement('a');
    link.href = 'mailto:bhavishnobeen@gmail.com?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
    link.click();
    showNotification('Email opened!');
  };

  const getAIResponse = (msg) => {
    const lower = msg.toLowerCase();
    if (lower.includes('demo')) {
      setCurrentPage('demos');
      return 'Opening demos page! Check out all the interactive examples.';
    }
    if (lower.includes('pricing')) return 'Pricing: Landing Page $1,200-2,000 | AI Chatbot $1,500-3,000 | Full System $3,000-6,000';
    if (lower.includes('timeline')) return 'Timeline: Landing page 5-10 days | AI Chatbot 7-14 days | Full integration 3-4 weeks';
    if (lower.includes('contact')) return 'Email: bhavishnobeen@gmail.com - Response within 4-6 hours!';
    return 'Great question! Email me at bhavishnobeen@gmail.com or explore the demos!';
  };

  const handleChatSubmit = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    const userMsg = chatInput.trim();
    setChatMessages(prev => [...prev, { type: 'user', text: userMsg }]);
    setChatInput('');
    setIsTyping(true);
    setTimeout(() => {
      setChatMessages(prev => [...prev, { type: 'bot', text: getAIResponse(userMsg) }]);
      setIsTyping(false);
    }, 1000);
  };

  // Optimizer Demo
  const handleOptimize = () => {
    if (!optimizerInput.trim()) return;
    setOptimizerResults([
      { type: 'Headline', original: optimizerInput, improved: optimizerInput + ' - Proven Results', score: 92 },
      { type: 'CTA', original: 'Learn More', improved: 'Get Started Free', score: 95 }
    ]);
    sendEmail('AI Optimizer Used', 'Headline: ' + optimizerInput);
  };

  // ROI Calculator
  const calculateROI = () => {
    const v = parseInt(roiVisitors) || 0;
    const r = parseFloat(roiRate) || 0;
    const val = parseFloat(roiValue) || 0;
    const current = v * (r / 100) * val;
    const improved = v * (r * 1.35 / 100) * val;
    setRoiResults({
      current: current.toFixed(0),
      improved: improved.toFixed(0),
      gain: (improved - current).toFixed(0),
      yearly: ((improved - current) * 12).toFixed(0)
    });
  };

  // Live Search
  const handleSearch = (query) => {
    setSearchQuery(query);
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }
    const items = [
      { title: 'Web Development', cat: 'Service', desc: 'Custom websites' },
      { title: 'AI Chatbot', cat: 'Service', desc: '24/7 automation' },
      { title: 'E-commerce Site', cat: 'Project', desc: '+38% conversion' },
      { title: 'Lead Bot', cat: 'Project', desc: '40+ leads/month' },
      { title: 'React & Next.js', cat: 'Tech', desc: 'Modern frameworks' },
      { title: 'Pricing Info', cat: 'Info', desc: 'From $1,200' }
    ];
    setSearchResults(items.filter(i => 
      i.title.toLowerCase().includes(query.toLowerCase()) || 
      i.desc.toLowerCase().includes(query.toLowerCase())
    ));
  };

  // Email Validator
  const validateEmail = () => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setEmailResult({
      valid: regex.test(emailValidation),
      msg: regex.test(emailValidation) ? 'Valid email format!' : 'Invalid email format'
    });
  };

  // E-commerce Cart
  const addToCart = (item) => {
    setCartItems(prev => [...prev, item]);
    showNotification('Added to cart!');
  };

  // Color Palette
  const generatePalette = () => {
    const hex = selectedColor;
    const r = parseInt(hex.slice(1,3), 16);
    const g = parseInt(hex.slice(3,5), 16);
    const b = parseInt(hex.slice(5,7), 16);
    setColorPalette({
      primary: hex,
      light: '#' + Math.min(255, r+50).toString(16).padStart(2,'0') + Math.min(255, g+50).toString(16).padStart(2,'0') + Math.min(255, b+50).toString(16).padStart(2,'0'),
      dark: '#' + Math.max(0, r-50).toString(16).padStart(2,'0') + Math.max(0, g-50).toString(16).padStart(2,'0') + Math.max(0, b-50).toString(16).padStart(2,'0'),
      accent: '#' + (255-r).toString(16).padStart(2,'0') + (255-g).toString(16).padStart(2,'0') + (255-b).toString(16).padStart(2,'0')
    });
  };

  // Analytics Demo
  const generateAnalytics = () => {
    setAnalyticsData({
      visitors: Math.floor(Math.random() * 50000) + 10000,
      conversions: (Math.random() * 5 + 2).toFixed(2),
      revenue: Math.floor(Math.random() * 100000) + 20000,
      bounce: (Math.random() * 30 + 40).toFixed(1)
    });
  };

  // Booking System
  const confirmBooking = () => {
    if (bookingDate && bookingTime) {
      setBookingConfirmed(true);
      sendEmail('New Booking', 'Date: ' + bookingDate + '\nTime: ' + bookingTime);
      showNotification('Booking confirmed!');
    }
  };

  const scrollTo = (id) => {
    if (currentPage !== 'home') {
      setCurrentPage('home');
      setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 100);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  const services = [
    {
      icon: <Globe className="w-8 h-8" />,
      title: 'Custom Web Development',
      desc: 'Tailored websites built with React, Next.js, and modern frameworks',
      features: ['Responsive Design', 'SEO Optimized', 'Fast Loading', 'CMS Integration'],
      price: '$1,200 - $3,000',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      icon: <Bot className="w-8 h-8" />,
      title: 'AI Chatbot Development',
      desc: 'Intelligent chatbots powered by GPT-4 for lead gen and support',
      features: ['24/7 Availability', 'Lead Qualification', 'CRM Integration', 'Multi-Language'],
      price: '$1,500 - $3,500',
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      icon: <ShoppingCart className="w-8 h-8" />,
      title: 'E-commerce Solutions',
      desc: 'Complete online stores with payment processing and inventory',
      features: ['Shopify/WooCommerce', 'Payment Gateway', 'Inventory System', 'Analytics'],
      price: '$2,500 - $6,000',
      gradient: 'from-green-500 to-emerald-500'
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'Workflow Automation',
      desc: 'Connect your tools and automate repetitive business tasks',
      features: ['Zapier/Make', 'API Integration', 'Data Sync', 'Custom Scripts'],
      price: '$800 - $2,500',
      gradient: 'from-orange-500 to-red-500'
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: 'Analytics & Tracking',
      desc: 'Data-driven insights with custom dashboards and reporting',
      features: ['Google Analytics', 'Custom Dashboards', 'Conversion Tracking', 'A/B Testing'],
      price: '$1,000 - $2,500',
      gradient: 'from-indigo-500 to-purple-500'
    },
    {
      icon: <Calendar className="w-8 h-8" />,
      title: 'Booking Systems',
      desc: 'Appointment scheduling with calendar sync and reminders',
      features: ['Calendar Integration', 'Auto Reminders', 'Payment Processing', 'Multi-Timezone'],
      price: '$1,200 - $3,000',
      gradient: 'from-pink-500 to-rose-500'
    }
  ];

  return (
    <div className={darkMode ? 'dark bg-slate-900 min-h-screen text-white' : 'bg-white min-h-screen text-slate-900'}>
      {notification && (
        <div className="fixed top-20 right-6 z-50 px-6 py-4 rounded-lg shadow-2xl bg-green-500 text-white animate-slide-in">
          <Check className="w-5 h-5 inline mr-2" />
          {notification}
        </div>
      )}

      <nav className="fixed top-0 w-full bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl z-50 border-b border-slate-200 dark:border-slate-700 shadow-sm">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            <button onClick={() => setCurrentPage('home')} className="text-xl sm:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-600">
              Bhavish Nobeen
            </button>

            <div className="hidden md:flex items-center gap-6 lg:gap-8">
              <button onClick={() => scrollTo('home')} className="text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors">Home</button>
              <button onClick={() => scrollTo('services')} className="text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors">Services</button>
              <button onClick={() => setCurrentPage('demos')} className="text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors">Demos</button>
              <button onClick={() => scrollTo('contact')} className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-all transform hover:scale-105">Contact</button>
              <button onClick={() => setDarkMode(!darkMode)} className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                {darkMode ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-slate-600" />}
              </button>
            </div>

            <div className="md:hidden flex gap-3">
              <button onClick={() => setDarkMode(!darkMode)} className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800">
                {darkMode ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5" />}
              </button>
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2">
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>

          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t dark:border-slate-700">
              <div className="flex flex-col space-y-3">
                <button onClick={() => scrollTo('home')} className="text-left py-2 hover:text-blue-600">Home</button>
                <button onClick={() => scrollTo('services')} className="text-left py-2 hover:text-blue-600">Services</button>
                <button onClick={() => { setCurrentPage('demos'); setMobileMenuOpen(false); }} className="text-left py-2 hover:text-blue-600">Demos</button>
                <button onClick={() => scrollTo('contact')} className="text-left py-2 px-4 bg-blue-600 text-white rounded-lg">Contact</button>
              </div>
            </div>
          )}
        </div>
      </nav>

      <div className="pt-16">
        {currentPage === 'home' ? (
          <div>
            <section id="home" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 dark:from-slate-950 dark:via-blue-950 dark:to-slate-950 px-4">
              <div className="container mx-auto text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 rounded-full text-blue-600 dark:text-blue-400 text-sm font-semibold mb-6">
                  <Sparkles className="w-4 h-4" />
                  Currently accepting 2-3 new projects
                </div>
                <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6 leading-tight">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-blue-600 to-slate-900 dark:from-white dark:via-blue-400 dark:to-white">
                    Build websites & AI systems that grow your business 24/7
                  </span>
                </h1>
                <p className="text-lg sm:text-xl md:text-2xl text-slate-600 dark:text-slate-300 mb-8 sm:mb-12 max-w-3xl mx-auto">
                  Professional web development and AI automation that delivers real ROI
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button onClick={() => setCurrentPage('demos')} className="px-6 sm:px-8 py-3 sm:py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold text-base sm:text-lg transition-all transform hover:scale-105 shadow-lg">
                    Try Live Demos
                  </button>
                  <button onClick={() => scrollTo('contact')} className="px-6 sm:px-8 py-3 sm:py-4 bg-white dark:bg-slate-800 text-slate-900 dark:text-white border-2 border-slate-300 dark:border-slate-600 rounded-lg font-semibold text-base sm:text-lg transition-all hover:border-blue-500">
                    Get Started
                  </button>
                </div>
              </div>
            </section>

            <section id="services" className="py-16 sm:py-24 bg-white dark:bg-slate-900 px-4">
              <div className="container mx-auto">
                <div className="text-center mb-12 sm:mb-16">
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">Complete Digital Solutions</h2>
                  <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
                    From simple websites to complex automation systems
                  </p>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                  {services.map((service, idx) => (
                    <div key={idx} className="group p-6 sm:p-8 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                      <div className={'w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br ' + service.gradient + ' rounded-xl flex items-center justify-center text-white mb-4 sm:mb-6 group-hover:scale-110 transition-transform'}>
                        {service.icon}
                      </div>
                      <h3 className="text-xl sm:text-2xl font-bold mb-3">{service.title}</h3>
                      <p className="text-slate-600 dark:text-slate-300 mb-4 leading-relaxed text-sm sm:text-base">{service.desc}</p>
                      <div className="space-y-2 mb-4">
                        {service.features.map((f, i) => (
                          <div key={i} className="flex items-center gap-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                            <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                            <span>{f}</span>
                          </div>
                        ))}
                      </div>
                      <div className="pt-4 border-t dark:border-slate-700">
                        <div className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">{service.price}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section id="contact" className="py-16 sm:py-24 bg-gradient-to-br from-blue-600 to-cyan-600 text-white px-4">
              <div className="container mx-auto">
                <div className="max-w-2xl mx-auto text-center">
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">Let's Build Something Great</h2>
                  <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl">
                    <form onSubmit={(e) => {
                      e.preventDefault();
                      const fd = new FormData(e.target);
                      sendEmail('New Inquiry from ' + fd.get('name'), 'Email: ' + fd.get('email') + '\n\n' + fd.get('message'));
                    }}>
                      <div className="space-y-4">
                        <input name="name" type="text" placeholder="Your name" required className="w-full px-4 py-3 rounded-lg border text-slate-900 dark:text-white dark:bg-slate-900 dark:border-slate-600" />
                        <input name="email" type="email" placeholder="Your email" required className="w-full px-4 py-3 rounded-lg border text-slate-900 dark:text-white dark:bg-slate-900 dark:border-slate-600" />
                        <textarea name="message" placeholder="Tell me about your project" rows="4" required className="w-full px-4 py-3 rounded-lg border text-slate-900 dark:text-white dark:bg-slate-900 dark:border-slate-600 resize-none"></textarea>
                        <button type="submit" className="w-full px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-all transform hover:scale-105">Send Message</button>
                      </div>
                    </form>
                    <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-700 text-center">
                      <a href="mailto:bhavishnobeen@gmail.com" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">bhavishnobeen@gmail.com</a>
                      <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">Response within 4-6 hours</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        ) : (
          <div className="min-h-screen py-12 sm:py-20 px-4">
            <div className="container mx-auto max-w-7xl">
              <button onClick={() => setCurrentPage('home')} className="mb-8 flex items-center gap-2 text-blue-600 dark:text-blue-400 font-semibold hover:gap-3 transition-all">
                <ArrowRight className="w-5 h-5 rotate-180" />
                Back to Home
              </button>

              <div className="mb-12 sm:mb-16">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">Interactive Demos</h1>
                <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 mb-4">Real working examples showcasing my capabilities</p>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-lg text-sm font-semibold">
                  <Check className="w-5 h-5" />
                  All demos are fully functional
                </div>
              </div>

              <div className="space-y-8 sm:space-y-12">
                {/* AI Optimizer */}
                <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-6 sm:p-8 border dark:border-slate-700">
                  <div className="flex items-center gap-3 mb-6">
                    <Sparkles className="w-8 h-8 text-blue-600" />
                    <h2 className="text-2xl sm:text-3xl font-bold">AI Content Optimizer</h2>
                  </div>
                  <input
                    type="text"
                    placeholder="Enter your headline or CTA..."
                    value={optimizerInput}
                    onChange={(e) => setOptimizerInput(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border-2 mb-4 dark:bg-slate-900 dark:border-slate-600 focus:border-blue-500 outline-none"
                  />
                  <button onClick={handleOptimize} className="px-6 sm:px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold">
                    Optimize
                  </button>
                  {optimizerResults && (
                    <div className="mt-6 space-y-4">
                      {optimizerResults.map((r, i) => (
                        <div key={i} className="p-4 sm:p-6 bg-gradient-to-r from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-950 rounded-lg border-2 dark:border-slate-700">
                          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 sm:gap-4 mb-3">
                            <h4 className="font-bold text-lg">{r.type}</h4>
                            <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full text-sm font-bold self-start">
                              {r.score}% confidence
                            </span>
                          </div>
                          <div className="space-y-2 text-sm sm:text-base">
                            <div className="p-3 bg-white dark:bg-slate-800 rounded border dark:border-slate-700">
                              <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Original:</p>
                              <p>{r.original}</p>
                            </div>
                            <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded border-2 border-blue-300 dark:border-blue-700">
                              <p className="text-xs text-blue-600 dark:text-blue-400 mb-1">Improved:</p>
                              <p className="text-blue-700 dark:text-blue-300 font-semibold">{r.improved}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* ROI Calculator */}
                <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-6 sm:p-8 border dark:border-slate-700">
                  <div className="flex items-center gap-3 mb-6">
                    <TrendingUp className="w-8 h-8 text-green-600" />
                    <h2 className="text-2xl sm:text-3xl font-bold">ROI Calculator</h2>
                  </div>
                  <div className="grid sm:grid-cols-3 gap-4 mb-6">
                    <input type="number" placeholder="Monthly Visitors" value={roiVisitors} onChange={(e) => setRoiVisitors(e.target.value)} className="px-4 py-3 rounded-lg border-2 dark:bg-slate-900 dark:border-slate-600" />
                    <input type="number" placeholder="Conversion %" step="0.1" value={roiRate} onChange={(e) => setRoiRate(e.target.value)} className="px-4 py-3 rounded-lg border-2 dark:bg-slate-900 dark:border-slate-600" />
                    <input type="number" placeholder="Order Value $" value={roiValue} onChange={(e) => setRoiValue(e.target.value)} className="px-4 py-3 rounded-lg border-2 dark:bg-slate-900 dark:border-slate-600" />
                  </div>
                  <button onClick={calculateROI} className="px-6 sm:px-8 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold mb-6">Calculate</button>
                  {roiResults && (
                    <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                      <div className="p-4 sm:p-6 bg-slate-50 dark:bg-slate-900 rounded-lg">
                        <h4 className="font-bold mb-2 text-sm sm:text-base">Current Revenue</h4>
                        <div className="text-2xl sm:text-3xl font-bold text-slate-600 dark:text-slate-400">${roiResults.current}/mo</div>
                      </div>
                      <div className="p-4 sm:p-6 bg-green-50 dark:bg-green-900/20 rounded-lg border-2 border-green-500">
                        <h4 className="font-bold mb-2 text-green-800 dark:text-green-400 text-sm sm:text-base">After Optimization</h4>
                        <div className="text-2xl sm:text-3xl font-bold text-green-600 dark:text-green-400">${roiResults.improved}/mo</div>
                        <p className="text-sm text-green-700 dark:text-green-500 mt-2">+${roiResults.gain}/month gain</p>
                      </div>
                      <div className="p-4 sm:p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg sm:col-span-2">
                        <h4 className="font-bold mb-2">Annual Revenue Increase</h4>
                        <div className="text-3xl sm:text-4xl font-bold text-blue-600 dark:text-blue-400">${roiResults.yearly}</div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Live Search */}
                <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-6 sm:p-8 border dark:border-slate-700">
                  <div className="flex items-center gap-3 mb-6">
                    <Search className="w-8 h-8 text-purple-600" />
                    <h2 className="text-2xl sm:text-3xl font-bold">Live Search Engine</h2>
                  </div>
                  <input
                    type="text"
                    placeholder="Search services, projects, technology..."
                    value={searchQuery}
                    onChange={(e) => handleSearch(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border-2 dark:bg-slate-900 dark:border-slate-600 focus:border-purple-500 outline-none mb-6"
                  />
                  {searchResults.length > 0 && (
                    <div className="space-y-3">
                      {searchResults.map((r, i) => (
                        <div key={i} className="p-4 bg-slate-50 dark:bg-slate-900 rounded-lg border dark:border-slate-700 hover:border-purple-500 transition-colors cursor-pointer">
                          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                            <div className="flex-1">
                              <h4 className="font-bold mb-1">{r.title}</h4>
                              <p className="text-sm text-slate-600 dark:text-slate-400">{r.desc}</p>
                            </div>
                            <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 rounded-full text-xs font-semibold self-start">
                              {r.cat}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  {searchQuery && searchResults.length === 0 && (
                    <div className="text-center py-8 text-slate-500">No results for "{searchQuery}"</div>
                  )}
                </div>

                {/* Email Validator */}
                <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-6 sm:p-8 border dark:border-slate-700">
                  <div className="flex items-center gap-3 mb-6">
                    <Mail className="w-8 h-8 text-blue-600" />
                    <h2 className="text-2xl sm:text-3xl font-bold">Email Validator</h2>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3 mb-6">
                    <input
                      type="text"
                      placeholder="Enter email address..."
                      value={emailValidation}
                      onChange={(e) => setEmailValidation(e.target.value)}
                      className="flex-1 px-4 py-3 rounded-lg border-2 dark:bg-slate-900 dark:border-slate-600"
                    />
                    <button onClick={validateEmail} className="px-6 sm:px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold whitespace-nowrap">
                      Validate
                    </button>
                  </div>
                  {emailResult && (
                    <div className={'p-4 rounded-lg border-2 ' + (emailResult.valid ? 'bg-green-50 dark:bg-green-900/20 border-green-500' : 'bg-red-50 dark:bg-red-900/20 border-red-500')}>
                      <div className="flex items-center gap-3">
                        {emailResult.valid ? <Check className="w-6 h-6 text-green-600 dark:text-green-400" /> : <X className="w-6 h-6 text-red-600 dark:text-red-400" />}
                        <p className={'font-semibold ' + (emailResult.valid ? 'text-green-700 dark:text-green-400' : 'text-red-700 dark:text-red-400')}>
                          {emailResult.msg}
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* E-commerce Cart */}
                <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-6 sm:p-8 border dark:border-slate-700">
                  <div className="flex items-center gap-3 mb-6">
                    <ShoppingCart className="w-8 h-8 text-green-600" />
                    <h2 className="text-2xl sm:text-3xl font-bold">E-commerce Cart Demo</h2>
                  </div>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                    {['Product A - $29', 'Product B - $49', 'Product C - $79'].map((item, i) => (
                      <div key={i} className="p-4 bg-slate-50 dark:bg-slate-900 rounded-lg border dark:border-slate-700">
                        <h4 className="font-bold mb-2">{item.split(' - ')[0]}</h4>
                        <p className="text-lg font-semibold text-green-600 dark:text-green-400 mb-3">{item.split(' - ')[1]}</p>
                        <button onClick={() => addToCart(item)} className="w-full px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold text-sm">
                          Add to Cart
                        </button>
                      </div>
                    ))}
                  </div>
                  {cartItems.length > 0 && (
                    <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-300 dark:border-green-700">
                      <h4 className="font-bold mb-2 text-green-800 dark:text-green-400">Cart ({cartItems.length} items)</h4>
                      <div className="space-y-1">
                        {cartItems.map((item, i) => (
                          <p key={i} className="text-sm text-green-700 dark:text-green-500">{item}</p>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Color Palette Generator */}
                <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-6 sm:p-8 border dark:border-slate-700">
                  <div className="flex items-center gap-3 mb-6">
                    <Palette className="w-8 h-8 text-pink-600" />
                    <h2 className="text-2xl sm:text-3xl font-bold">Color Palette Generator</h2>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4 mb-6">
                    <div className="flex gap-2">
                      <input
                        type="color"
                        value={selectedColor}
                        onChange={(e) => setSelectedColor(e.target.value)}
                        className="w-16 h-12 rounded cursor-pointer"
                      />
                      <input
                        type="text"
                        value={selectedColor}
                        onChange={(e) => setSelectedColor(e.target.value)}
                        className="flex-1 px-4 py-3 rounded-lg border-2 dark:bg-slate-900 dark:border-slate-600 font-mono"
                      />
                    </div>
                    <button onClick={generatePalette} className="px-6 sm:px-8 py-3 bg-pink-600 hover:bg-pink-700 text-white rounded-lg font-semibold whitespace-nowrap">
                      Generate
                    </button>
                  </div>
                  {colorPalette && (
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                      {Object.entries(colorPalette).map(([name, color]) => (
                        <div key={name} className="text-center">
                          <div className="w-full h-20 sm:h-24 rounded-lg mb-2 border-2 border-slate-200 dark:border-slate-700" style={{ backgroundColor: color }}></div>
                          <p className="text-sm font-semibold capitalize">{name}</p>
                          <p className="text-xs text-slate-600 dark:text-slate-400 font-mono">{color}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Analytics Dashboard */}
                <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-6 sm:p-8 border dark:border-slate-700">
                  <div className="flex items-center gap-3 mb-6">
                    <BarChart3 className="w-8 h-8 text-indigo-600" />
                    <h2 className="text-2xl sm:text-3xl font-bold">Analytics Dashboard</h2>
                  </div>
                  <button onClick={generateAnalytics} className="px-6 sm:px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold mb-6">
                    Generate Data
                  </button>
                  {analyticsData && (
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div className="p-4 sm:p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg border dark:border-blue-800">
                        <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">Total Visitors</p>
                        <p className="text-2xl sm:text-3xl font-bold text-blue-600 dark:text-blue-400">{analyticsData.visitors.toLocaleString()}</p>
                      </div>
                      <div className="p-4 sm:p-6 bg-green-50 dark:bg-green-900/20 rounded-lg border dark:border-green-800">
                        <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">Conversion Rate</p>
                        <p className="text-2xl sm:text-3xl font-bold text-green-600 dark:text-green-400">{analyticsData.conversions}%</p>
                      </div>
                      <div className="p-4 sm:p-6 bg-purple-50 dark:bg-purple-900/20 rounded-lg border dark:border-purple-800">
                        <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">Revenue</p>
                        <p className="text-2xl sm:text-3xl font-bold text-purple-600 dark:text-purple-400">${analyticsData.revenue.toLocaleString()}</p>
                      </div>
                      <div className="p-4 sm:p-6 bg-orange-50 dark:bg-orange-900/20 rounded-lg border dark:border-orange-800">
                        <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">Bounce Rate</p>
                        <p className="text-2xl sm:text-3xl font-bold text-orange-600 dark:text-orange-400">{analyticsData.bounce}%</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Booking System */}
                <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-6 sm:p-8 border dark:border-slate-700">
                  <div className="flex items-center gap-3 mb-6">
                    <Calendar className="w-8 h-8 text-rose-600" />
                    <h2 className="text-2xl sm:text-3xl font-bold">Appointment Booking</h2>
                  </div>
                  {!bookingConfirmed ? (
                    <div className="space-y-4">
                      <input
                        type="date"
                        value={bookingDate}
                        onChange={(e) => setBookingDate(e.target.value)}
                        className="w-full px-4 py-3 rounded-lg border-2 dark:bg-slate-900 dark:border-slate-600"
                      />
                      <select
                        value={bookingTime}
                        onChange={(e) => setBookingTime(e.target.value)}
                        className="w-full px-4 py-3 rounded-lg border-2 dark:bg-slate-900 dark:border-slate-600"
                      >
                        <option value="">Select time...</option>
                        <option value="9:00 AM">9:00 AM</option>
                        <option value="10:00 AM">10:00 AM</option>
                        <option value="2:00 PM">2:00 PM</option>
                        <option value="3:00 PM">3:00 PM</option>
                        <option value="4:00 PM">4:00 PM</option>
                      </select>
                      <button onClick={confirmBooking} className="w-full px-8 py-3 bg-rose-600 hover:bg-rose-700 text-white rounded-lg font-semibold">
                        Confirm Booking
                      </button>
                    </div>
                  ) : (
                    <div className="p-6 bg-rose-50 dark:bg-rose-900/20 rounded-lg border-2 border-rose-500">
                      <div className="flex items-start gap-3">
                        <Check className="w-8 h-8 text-rose-600 dark:text-rose-400 flex-shrink-0" />
                        <div>
                          <p className="font-semibold text-rose-800 dark:text-rose-300 text-lg mb-2">Booking Confirmed!</p>
                          <p className="text-rose-700 dark:text-rose-400">Date: {bookingDate}</p>
                          <p className="text-rose-700 dark:text-rose-400">Time: {bookingTime}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {!chatOpen && (
        <button onClick={() => setChatOpen(true)} className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-600 to-cyan-600 text-white rounded-full shadow-2xl hover:scale-110 transition-transform z-40">
          <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7 mx-auto" />
        </button>
      )}

      {chatOpen && (
        <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 w-[calc(100vw-2rem)] sm:w-96 h-[500px] sm:h-[600px] bg-white dark:bg-slate-800 rounded-2xl shadow-2xl flex flex-col border-2 dark:border-slate-700 z-50">
          <div className="bg-gradient-to-r from-blue-600 to-cyan-600 p-4 flex items-center justify-between text-white rounded-t-2xl">
            <div className="flex items-center gap-3">
              <Bot className="w-6 h-6" />
              <div className="font-bold">AI Assistant</div>
            </div>
            <button onClick={() => setChatOpen(false)} className="hover:bg-white/20 p-2 rounded transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50 dark:bg-slate-900">
            {chatMessages.map((msg, idx) => (
              <div key={idx} className={'flex ' + (msg.type === 'user' ? 'justify-end' : 'justify-start')}>
                <div className={'max-w-[85%] px-4 py-3 rounded-2xl ' + (msg.type === 'user' ? 'bg-blue-600 text-white rounded-br-md' : 'bg-white dark:bg-slate-800 border dark:border-slate-700 rounded-bl-md')}>
                  <p className="text-sm whitespace-pre-line">{msg.text}</p>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white dark:bg-slate-800 px-4 py-3 rounded-2xl border dark:border-slate-700">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></span>
                    <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></span>
                    <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></span>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="p-4 border-t dark:border-slate-700 bg-white dark:bg-slate-800 rounded-b-2xl">
            <form onSubmit={handleChatSubmit} className="flex gap-2">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Ask anything..."
                className="flex-1 px-4 py-2 rounded-lg border dark:bg-slate-900 dark:border-slate-600 outline-none focus:border-blue-500"
              />
              <button type="submit" className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                <Send className="w-5 h-5" />
              </button>
            </form>
          </div>
        </div>
      )}

      <footer className="bg-slate-900 dark:bg-black text-white py-8 sm:py-12 px-4">
        <div className="container mx-auto text-center">
          <p className="text-slate-400">© 2025 Bhavish Nobeen. All demos are fully functional.</p>
        </div>
      </footer>

      <style>{`
        @keyframes slide-in {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        .animate-slide-in { animation: slide-in 0.3s ease-out; }
      `}</style>
    </div>
  );
};

export default Portfolio;
