import React, { useState, useEffect, useCallback } from 'react';
import { ArrowRight, Sparkles, Building2, Package, CheckCircle, Shield, Lock, Truck, CheckCircle2, Clock, AlertCircle, MapPin, Star, Zap, Bell, RefreshCw, Award, Search, X, Circle, Target, TrendingUp, Activity } from 'lucide-react';

function App() {
  const [stage, setStage] = useState('intro');
  const [boothNumber, setBoothNumber] = useState('');
  const [isAnimating, setIsAnimating] = useState(true);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [introProgress, setIntroProgress] = useState(0);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [abacusStatus, setAbacusStatus] = useState(null);
  const [exhibitorName, setExhibitorName] = useState('');

  const fetchChecklistByBooth = async (boothNum, forceRefresh = false) => {
    try {
      const url = `${API_BASE}/checklist/booth/${encodeURIComponent(boothNum)}${forceRefresh ? '?force_refresh=true' : ''}`;
      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to fetch checklist');
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching checklist:', error);
      return { total_items: 0, checked_items: 0, progress: 0, items: [] };
    }
  };





import { CheckCircle2, Circle, Zap, Target, TrendingUp, Activity } from 'lucide-react';

const FuturisticChecklistProgress = ({ 
  checklistData, 
  exhibitorName, 
  boothNumber,
  onRefresh 
}) => {
  const [animationPhase, setAnimationPhase] = useState(0);
  const [pulseActive, setPulseActive] = useState(false);
  
  const { total_items, checked_items, progress, items } = checklistData;
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationPhase(1);
    }, 300);
    
    const pulseTimer = setInterval(() => {
      setPulseActive(prev => !prev);
    }, 2000);
    
    return () => {
      clearTimeout(timer);
      clearInterval(pulseTimer);
    };
  }, []);

  // Circular progress component
  const CircularProgress = ({ percentage, size = 120 }) => {
    const radius = (size - 10) / 2;
    const circumference = 2 * Math.PI * radius;
    const strokeDasharray = circumference;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;
    
    return (
      <div className="relative">
        <svg width={size} height={size} className="transform -rotate-90">
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="rgba(156, 163, 175, 0.2)"
            strokeWidth="8"
          />
          {/* Progress circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="url(#progressGradient)"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            className="transition-all duration-2000 ease-out"
            style={{
              filter: 'drop-shadow(0 0 8px rgba(6, 182, 212, 0.4))'
            }}
          />
          {/* Glow effect */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="rgba(6, 182, 212, 0.3)"
            strokeWidth="12"
            strokeLinecap="round"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            className={`transition-all duration-2000 ease-out ${pulseActive ? 'opacity-60' : 'opacity-20'}`}
          />
        </svg>
        
        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-3xl font-bold text-gray-900 mb-1">
            {Math.round(percentage)}%
          </div>
          <div className="text-sm text-gray-600 font-medium">
            {checked_items}/{total_items}
          </div>
          <div className="text-xs text-teal-600 font-medium">
            Complete
          </div>
        </div>
        
        {/* SVG Gradient Definition */}
        <svg width="0" height="0">
          <defs>
            <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#06b6d4" />
              <stop offset="50%" stopColor="#0891b2" />
              <stop offset="100%" stopColor="#0e7490" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    );
  };

  // Progress bar component
  const LinearProgress = ({ percentage }) => {
    return (
      <div className="relative w-full bg-gray-200 rounded-full h-4 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-r from-gray-100 to-gray-200 rounded-full"></div>
        
        {/* Progress fill */}
        <div 
          className="relative h-full bg-gradient-to-r from-teal-400 via-cyan-500 to-blue-500 rounded-full transition-all duration-2000 ease-out"
          style={{ width: `${percentage}%` }}
        >
          {/* Animated shine effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shine rounded-full"></div>
          
          {/* Pulse effect */}
          <div className={`absolute inset-0 bg-gradient-to-r from-teal-400/60 to-cyan-500/60 rounded-full transition-opacity duration-1000 ${pulseActive ? 'opacity-100' : 'opacity-0'}`}></div>
        </div>
        
        {/* Glow effect */}
        <div 
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-teal-400/30 to-cyan-500/30 rounded-full blur-sm transition-all duration-2000 ease-out"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    );
  };

  return (
    <div className={`transform transition-all duration-1000 ${animationPhase === 1 ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
      <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-8 border border-gray-200/60 shadow-2xl relative overflow-hidden">
        
        {/* Animated background elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-teal-100/40 to-cyan-100/40 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-blue-100/40 to-teal-100/40 rounded-full blur-xl animate-pulse delay-1000"></div>
        
        <div className="relative z-10">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Target className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">Booth Setup Progress</h3>
                <p className="text-sm text-gray-600">Booth {boothNumber} • {exhibitorName}</p>
              </div>
            </div>
            <button 
              onClick={onRefresh}
              className="p-2 bg-gray-100 hover:bg-gray-200 rounded-xl transition-all duration-300 hover:scale-105"
            >
              <Activity className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* Main progress display */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-6">
            
            {/* Circular Progress */}
            <div className="flex flex-col items-center justify-center space-y-4">
              <CircularProgress percentage={progress} />
              <div className="text-center">
                <div className="text-sm font-medium text-gray-700 mb-1">
                  Overall Completion
                </div>
                <div className="flex items-center justify-center space-x-2 text-xs text-gray-500">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  <span>{checked_items} completed</span>
                  <span>•</span>
                  <Circle className="w-4 h-4 text-gray-400" />
                  <span>{total_items - checked_items} remaining</span>
                </div>
              </div>
            </div>

            {/* Stats and Linear Progress */}
            <div className="space-y-6">
              
              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-4 border border-green-100">
                  <div className="flex items-center space-x-2 mb-2">
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                    <span className="text-sm font-medium text-gray-700">Completed</span>
                  </div>
                  <div className="text-2xl font-bold text-green-600">{checked_items}</div>
                </div>
                
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-4 border border-blue-100">
                  <div className="flex items-center space-x-2 mb-2">
                    <TrendingUp className="w-5 h-5 text-blue-500" />
                    <span className="text-sm font-medium text-gray-700">Progress</span>
                  </div>
                  <div className="text-2xl font-bold text-blue-600">{Math.round(progress)}%</div>
                </div>
              </div>

              {/* Linear Progress Bar */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">Setup Progress</span>
                  <span className="text-sm font-bold text-gray-900">{Math.round(progress)}%</span>
                </div>
                <LinearProgress percentage={progress} />
                <div className="flex items-center justify-center space-x-2 text-xs text-gray-500">
                  <Zap className="w-3 h-3 text-teal-500" />
                  <span>Live updates from Expo CCI</span>
                </div>
              </div>

              {/* Status indicator */}
              <div className={`p-3 rounded-xl border ${
                progress === 100 
                  ? 'bg-green-50 border-green-200 text-green-800' 
                  : progress > 50 
                  ? 'bg-blue-50 border-blue-200 text-blue-800'
                  : 'bg-orange-50 border-orange-200 text-orange-800'
              }`}>
                <div className="flex items-center space-x-2">
                  {progress === 100 ? (
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                  ) : (
                    <Activity className="w-4 h-4" />
                  )}
                  <span className="text-sm font-medium">
                    {progress === 100 
                      ? 'Booth setup completed!' 
                      : progress > 50 
                      ? 'Setup in progress - on track'
                      : 'Setup starting soon'
                    }
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          {items.some(item => item.checked) && (
            <div className="border-t border-gray-100 pt-6">
              <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center space-x-2">
                <Zap className="w-4 h-4 text-teal-500" />
                <span>Recent Completions</span>
              </h4>
              <div className="space-y-2 max-h-32 overflow-y-auto">
                {items
                  .filter(item => item.checked)
                  .slice(0, 3)
                  .map((item, index) => (
                    <div key={item.id} className="flex items-center space-x-3 p-2 bg-gray-50 rounded-lg">
                      <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-gray-900 truncate">
                          {item.item_name}
                        </div>
                        {item.date_checked && (
                          <div className="text-xs text-gray-500">
                            Completed {item.date_checked}
                          </div>
                        )}
                      </div>
                    </div>
                  ))
                }
              </div>
            </div>
          )}
        </div>

        <style jsx>{`
          @keyframes shine {
            0% { transform: translateX(-100%); }
            50% { transform: translateX(100%); }
            100% { transform: translateX(200%); }
          }
          .animate-shine {
            animation: shine 3s ease-in-out infinite;
          }
        `}</style>
      </div>
    </div>
  );
};

export default FuturisticChecklistProgress;



  


  
  // EXACT Professional icon generator from previous app
  const generateExhibitorIcon = (exhibitorName, boothNumber) => {
    // Extract booth section (letter) and number
    const boothMatch = boothNumber.match(/([A-Z]+)[-]?(\d+)/);
    const section = boothMatch ? boothMatch[1] : 'A';
    const number = boothMatch ? parseInt(boothMatch[2]) : 100;
    
    // Generate professional colors based on section - using only professional colors
    const sectionColors = {
      'A': { bg: 'from-slate-600 to-slate-700', text: 'text-slate-100', accent: 'border-slate-300' },
      'B': { bg: 'from-gray-600 to-gray-700', text: 'text-gray-100', accent: 'border-gray-300' },
      'C': { bg: 'from-zinc-600 to-zinc-700', text: 'text-zinc-100', accent: 'border-zinc-300' },
      'D': { bg: 'from-stone-600 to-stone-700', text: 'text-stone-100', accent: 'border-stone-300' },
      'E': { bg: 'from-neutral-600 to-neutral-700', text: 'text-neutral-100', accent: 'border-neutral-300' },
      'F': { bg: 'from-slate-700 to-slate-800', text: 'text-slate-100', accent: 'border-slate-400' },
      'G': { bg: 'from-gray-700 to-gray-800', text: 'text-gray-100', accent: 'border-gray-400' },
      'H': { bg: 'from-zinc-700 to-zinc-800', text: 'text-zinc-100', accent: 'border-zinc-400' },
      'I': { bg: 'from-slate-500 to-slate-600', text: 'text-slate-100', accent: 'border-slate-300' },
      'J': { bg: 'from-gray-500 to-gray-600', text: 'text-gray-100', accent: 'border-gray-300' },
    };
    
    const colorScheme = sectionColors[section] || sectionColors['A'];
    
    // Generate initials from company name (first letter of each word, max 2)
    const words = exhibitorName.split(' ').filter(word => word.length > 2); // Filter out small words like "Inc", "LLC"
    let initials = '';
    
    if (words.length >= 2) {
      initials = words[0][0] + words[1][0];
    } else if (words.length === 1) {
      initials = words[0].substring(0, 2);
    } else {
      initials = exhibitorName.substring(0, 2);
    }
    
    return {
      initials: initials.toUpperCase(),
      colorScheme,
      section,
      number: boothNumber
    };
  };

  useEffect(() => {
    if (stage === 'intro') {
      const timer1 = setTimeout(() => setIntroProgress(1), 300);
      const timer2 = setTimeout(() => setIntroProgress(2), 1200);
      const timer3 = setTimeout(() => setIntroProgress(3), 2200);
      const timer4 = setTimeout(() => {
        setIntroProgress(4);
        setTimeout(() => setStage('welcome'), 1000);
      }, 3500);
      
      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
        clearTimeout(timer3);
        clearTimeout(timer4);
      };
    }
  }, [stage]);

  useEffect(() => {
    if (stage === 'welcome') {
      const timer = setTimeout(() => {
        setIsAnimating(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [stage]);

  // EXACT order statuses from the second file (previous app)
  const orderStatuses = {
    'delivered': { 
      label: 'Delivered', 
      progress: 100, 
      color: 'from-green-500 to-emerald-500',
      icon: CheckCircle2,
      bgColor: 'bg-green-500/20 text-green-400',
      priority: 5
    },
    'out-for-delivery': { 
      label: 'Out for Delivery', 
      progress: 75, 
      color: 'from-blue-500 to-cyan-500',
      icon: Truck,
      bgColor: 'bg-blue-500/20 text-blue-400',
      priority: 3
    },
    'in-route': { 
      label: 'In Route from Warehouse', 
      progress: 50, 
      color: 'from-yellow-500 to-orange-500',
      icon: MapPin,
      bgColor: 'bg-yellow-500/20 text-yellow-400',
      priority: 2
    },
    'in-process': { 
      label: 'In Process', 
      progress: 25, 
      color: 'from-purple-500 to-pink-500',
      icon: Clock,
      bgColor: 'bg-purple-500/20 text-purple-400',
      priority: 1
    },
    'cancelled': { 
      label: 'Cancelled', 
      progress: 0, 
      color: 'from-red-500 to-red-600',
      icon: AlertCircle,
      bgColor: 'bg-red-500/20 text-red-400',
      priority: 4
    }
  };

  const sortOrdersByStatus = (ordersArray) => {
    return ordersArray.sort((a, b) => {
      const aPriority = orderStatuses[a.status]?.priority || 99;
      const bPriority = orderStatuses[b.status]?.priority || 99;
      return aPriority - bPriority;
    });
  };

  const API_BASE = 'https://aug-21-test-connection.onrender.com/api';

  const fetchOrdersByBooth = async (boothNum, forceRefresh = false) => {
    setLoading(true);
    try {
      console.log('Fetching orders for booth:', boothNum);
      
      const url = `${API_BASE}/orders/booth/${encodeURIComponent(boothNum)}${forceRefresh ? '?force_refresh=true' : ''}`;
      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to fetch orders');
      
      const data = await response.json();
      console.log('Orders Response:', data);
      
      const sortedOrders = sortOrdersByStatus(data.orders || []);
      setOrders(sortedOrders);
      setLastUpdated(new Date(data.last_updated));
      generateNotifications(sortedOrders);
      
      // Set exhibitor name from API response
      if (data.exhibitor_name) {
        setExhibitorName(data.exhibitor_name);
      } else if (sortedOrders.length > 0 && sortedOrders[0].exhibitor_name) {
        setExhibitorName(sortedOrders[0].exhibitor_name);
      } else {
        setExhibitorName(`Booth ${boothNum} Exhibitor`);
      }
      
    } catch (error) {
      console.error('Error fetching orders:', error);
      
      const fallbackOrders = [
        {
          id: `ORD-${boothNum}-001`,
          item: 'Round Table 30" high',
          description: 'Professional exhibition furniture',
          booth_number: boothNum,
          exhibitor_name: `Booth ${boothNum} Exhibitor`,
          color: 'White',
          quantity: 2,
          status: 'delivered',
          order_date: new Date().toLocaleDateString(),
          comments: 'Coordinated by Expo Convention Contractors',
          section: 'Section A',
          expo_processed: true
        },
        {
          id: `ORD-${boothNum}-002`,
          item: 'White Side Chair',
          description: 'Professional seating solution',
          booth_number: boothNum,
          exhibitor_name: `Booth ${boothNum} Exhibitor`,
          color: 'White',
          quantity: 4,
          status: 'out-for-delivery',
          order_date: new Date().toLocaleDateString(),
          comments: 'High-quality event furniture',
          section: 'Section A',
          expo_processed: true
        }
      ];
      
      const sortedFallbackOrders = sortOrdersByStatus(fallbackOrders);
      setOrders(sortedFallbackOrders);
      setLastUpdated(new Date());
      generateNotifications(sortedFallbackOrders);
      setExhibitorName(fallbackOrders[0].exhibitor_name);
    } finally {
      setLoading(false);
    }
  };

  const generateNotifications = useCallback((ordersData) => {
    const notifications = [];
    ordersData.forEach((order) => {
      if (order.status === 'in-route') {
        notifications.push({
          id: Math.random(),
          message: `${order.item} is in route from warehouse`,
          time: `${Math.floor(Math.random() * 30) + 1} min ago`,
          type: 'delivery'
        });
      } else if (order.status === 'delivered') {
        notifications.push({
          id: Math.random(),
          message: `${order.item} has been delivered`,
          time: `${Math.floor(Math.random() * 120) + 1} min ago`,
          type: 'success'
        });
      } else if (order.status === 'out-for-delivery') {
        notifications.push({
          id: Math.random(),
          message: `${order.item} is out for delivery`,
          time: `${Math.floor(Math.random() * 15) + 1} min ago`,
          type: 'delivery'
        });
      }
    });
    setNotifications(notifications.slice(0, 3));
  }, []);

  // EXACT renderProgressBar from the second file
  const renderProgressBar = (status) => {
    const statusInfo = orderStatuses[status] || orderStatuses['in-process'];
    return (
      <div className="space-y-3">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-700 font-medium">Delivery Progress</span>
          <span className="text-gray-900 font-bold">{statusInfo.progress}%</span>
        </div>
        <div className="relative w-full bg-gray-200 rounded-full h-3">
          <div 
            className={`bg-gradient-to-r ${statusInfo.color} h-3 rounded-full transition-all duration-1000 relative overflow-hidden`}
            style={{ width: `${statusInfo.progress}%` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent w-20 animate-sweep"></div>
          </div>
        </div>
        <style jsx>{`
          @keyframes sweep {
            0% { transform: translateX(-100px); }
            100% { transform: translateX(calc(100vw)); }
          }
          .animate-sweep {
            animation: sweep 2s ease-in-out infinite;
          }
        `}</style>
      </div>
    );
  };

  const ExpoLogo = ({ size = "large" }) => {
    return (
      <div className="flex items-center">
        <img 
          src="https://i.ibb.co/5gdgZVxj/output-onlinepngtools.png" 
          alt="Expo Convention Contractors"
          className={`${size === "large" ? "h-12 md:h-16" : "h-8"} w-auto object-contain`}
        />
      </div>
    );
  };

  const handleBoothSubmit = () => {
    if (boothNumber.trim()) {
      setStage('options');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleBoothSubmit();
    }
  };

  const handleOrdersClick = async () => {
    setStage('orders');
    const [ordersData, checklistData] = await Promise.all([
      fetchOrdersByBooth(boothNumber),
      fetchChecklistByBooth(boothNumber)
    ]);
    // Set both orders and checklist state
    setChecklist(checklistData); // Add this state variable
  };

  // EXACT handleRefresh from the second file
  const handleRefresh = () => {
    if (boothNumber && !loading) {
      fetchOrdersByBooth(boothNumber, true);
    }
  };

  if (stage === 'intro') {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center overflow-hidden">
        <div className="relative text-center">
          <div className={`transition-all duration-1000 ease-out ${
            introProgress >= 1 ? 'opacity-100' : 'opacity-0'
          } ${
            introProgress >= 4 ? 'opacity-0 translate-y-8 scale-95' : 'translate-y-0 scale-100'
          }`}>
            <div className="relative">
              <div className="flex justify-center">
                {['W', 'e', 'l', 'c', 'o', 'm', 'e'].map((letter, index) => (
                  <span
                    key={index}
                    className={`text-6xl md:text-8xl lg:text-9xl font-light text-black transition-all duration-700 ease-out ${
                      introProgress >= 2 && introProgress < 4 ? 'opacity-100 translate-y-0' : 'opacity-0'
                    } ${
                      introProgress < 2 ? 'translate-y-12' : 'translate-y-0'
                    }`}
                    style={{
                      transitionDelay: introProgress >= 2 && introProgress < 4 ? `${index * 120}ms` : '0ms',
                      fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Helvetica Neue", sans-serif',
                      letterSpacing: '-0.02em',
                      fontWeight: '300'
                    }}
                  >
                    {letter}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (stage === 'welcome') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-teal-100/40 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gray-100/60 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 right-1/3 w-48 h-48 bg-teal-50/60 rounded-full blur-3xl"></div>
        </div>

        <div className="relative min-h-screen flex items-center justify-center p-6">
          <div className="text-center max-w-md mx-auto w-full">
            
            <div className={`mb-8 transform transition-all duration-1000 ${isAnimating ? 'translate-y-10 opacity-0' : 'translate-y-0 opacity-100'}`}>
              <ExpoLogo size="large" />
            </div>

            <div className={`space-y-6 mb-12 transform transition-all duration-1000 delay-300 ${isAnimating ? 'translate-y-10 opacity-0' : 'translate-y-0 opacity-100'}`}>
              <h1 className="text-5xl md:text-6xl font-black text-gray-900 mb-4">
                ExpoFlow
              </h1>
              <p className="text-xl text-teal-600 font-medium mb-2">
                Order Tracking System
              </p>
              <div className="flex items-center justify-center space-x-2">
                <Building2 className="w-5 h-5 text-teal-600" />
                <span className="text-gray-600">Expo Convention Contractors</span>
              </div>
            </div>

            <div className={`transform transition-all duration-1000 delay-600 ${isAnimating ? 'translate-y-10 opacity-0' : 'translate-y-0 opacity-100'}`}>
              <div className="bg-white/90 backdrop-blur-lg rounded-3xl p-8 border border-gray-200 shadow-lg">
                
                <div className="space-y-6">
                  <div className="relative">
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Enter Your Booth Number
                    </label>
                    <div className="relative">
                      <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-teal-600" />
                      <input
                        type="text"
                        value={boothNumber}
                        onChange={(e) => setBoothNumber(e.target.value)}
                        onKeyPress={handleKeyPress}
                        className="block w-full pl-10 pr-4 py-4 border border-gray-300 rounded-2xl leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent text-lg font-medium"
                        autoFocus
                      />
                    </div>
                  </div>

                  <button
                    onClick={handleBoothSubmit}
                    disabled={!boothNumber.trim()}
                    className={`w-full py-4 rounded-2xl font-semibold text-white transition-all duration-300 ${
                      boothNumber.trim()
                        ? 'bg-gradient-to-r from-teal-600 to-teal-700 hover:shadow-lg hover:scale-105'
                        : 'bg-gray-400 cursor-not-allowed'
                    }`}
                  >
                    <div className="flex items-center justify-center space-x-2">
                      <span>Continue</span>
                      <ArrowRight className="w-5 h-5" />
                    </div>
                  </button>
                </div>
              </div>
            </div>

            <div className={`mt-8 transform transition-all duration-1000 delay-900 ${isAnimating ? 'translate-y-10 opacity-0' : 'translate-y-0 opacity-100'}`}>
              <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
                <Shield className="w-4 h-4 text-green-500" />
                <span>System Online • Professional Exhibition Management</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    );
  }

  if (stage === 'options') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-teal-100/40 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gray-100/60 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 right-1/3 w-48 h-48 bg-teal-50/60 rounded-full blur-3xl"></div>
        </div>

        <div className="relative min-h-screen flex items-center justify-center p-6">
          <div className="w-full max-w-5xl mx-auto">
            
            <div className="text-center mb-16">
              <div className="mb-6">
                <ExpoLogo size="large" />
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Choose your action
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              
              <div className="group cursor-pointer transform transition-all duration-300 hover:scale-105" onClick={handleOrdersClick}>
                <div className="bg-white/90 backdrop-blur-lg rounded-3xl p-12 border border-gray-200 hover:border-teal-400 shadow-lg hover:shadow-xl transition-all duration-300 h-80 flex flex-col justify-center">
                  <div className="text-center">
                    <div className="w-28 h-28 bg-gradient-to-r from-teal-600 to-teal-700 rounded-3xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform">
                      <Package className="w-14 h-14 text-white" />
                    </div>
                    <h3 className="text-3xl font-bold text-gray-900 mb-8">Orders</h3>
                    <div className="flex items-center justify-center space-x-3 text-teal-600 group-hover:text-teal-700 font-semibold text-lg">
                      <span>View Orders</span>
                      <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="group cursor-pointer transform transition-all duration-300 hover:scale-105">
                <div className="bg-white/90 backdrop-blur-lg rounded-3xl p-12 border border-gray-200 hover:border-teal-400 shadow-lg hover:shadow-xl transition-all duration-300 h-80 flex flex-col justify-center">
                  <div className="text-center">
                    <div className="w-28 h-28 bg-gradient-to-r from-teal-600 to-teal-700 rounded-3xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform">
                      <CheckCircle className="w-14 h-14 text-white" />
                    </div>
                    <h3 className="text-3xl font-bold text-gray-900 mb-8">Checklist</h3>
                    <div className="flex items-center justify-center space-x-3 text-teal-600 group-hover:text-teal-700 font-semibold text-lg">
                      <span>View Progress</span>
                      <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center">
              <button
                onClick={() => setStage('welcome')}
                className="text-gray-600 hover:text-gray-900 py-3 px-6 rounded-2xl border border-gray-200 hover:bg-gray-50 transition-all duration-300"
              >
                ← Back to Booth Entry
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // EXACT ORDERS LAYOUT FROM THE SECOND FILE (PREVIOUS APP)
  if (stage === 'orders') {
    const deliveredOrders = orders.filter(o => o.status === 'delivered').length;
    const pendingOrders = orders.filter(o => o.status !== 'delivered' && o.status !== 'cancelled').length;

    // Generate icon data for the exhibitor
    const iconData = exhibitorName ? generateExhibitorIcon(exhibitorName, boothNumber) : null;

    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header - Mobile Responsive - EXACT from second file */}
          <div className="bg-white/90 backdrop-blur-lg rounded-3xl p-4 md:p-6 border border-gray-200 shadow-xl mb-8">
            <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
              {/* Left side - Company info */}
              <div className="flex items-center space-x-3 md:space-x-6">
                <div className="flex items-center space-x-3 md:space-x-4">
                  <ExpoLogo size="small" />
                  {iconData ? (
                    <div className={`w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br ${iconData.colorScheme.bg} flex items-center justify-center shadow-lg border border-gray-300`}>
                      <span className={`text-sm md:text-lg font-bold ${iconData.colorScheme.text}`}>
                        {iconData.initials}
                      </span>
                    </div>
                  ) : (
                    <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br from-teal-600 to-teal-700 flex items-center justify-center shadow-lg border border-gray-300">
                      <Building2 className="w-6 h-6 md:w-8 md:h-8 text-white" />
                    </div>
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <h1 className="text-xl md:text-3xl font-bold text-gray-900 truncate">{exhibitorName}</h1>
                  <p className="text-sm md:text-base text-gray-600">
                    <span className="text-teal-600">Booth {boothNumber}</span>
                  </p>
                  <div className="flex flex-wrap items-center gap-2 md:gap-4 mt-1 md:mt-2">
                    <span className="text-xs md:text-sm text-teal-600 flex items-center space-x-1">
                      <Award className="w-3 h-3 md:w-4 md:h-4" />
                      <span>Expo Convention Contractors</span>
                    </span>
                    <span className="text-xs md:text-sm text-gray-500">Live Order Tracking</span>
                  </div>
                </div>
              </div>
              
              {/* Right side - Action buttons - EXACT from second file */}
              <div className="flex items-center justify-end space-x-2 md:space-x-4 flex-shrink-0">
                <button 
                  onClick={handleRefresh}
                  disabled={loading}
                  className="p-2 md:p-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl md:rounded-2xl transition-all duration-300 border border-gray-200 disabled:opacity-50"
                >
                  <RefreshCw className={`w-4 h-4 md:w-5 md:h-5 ${loading ? 'animate-spin' : ''}`} />
                </button>
                <div className="relative">
                  <Bell className="w-5 h-5 md:w-6 md:h-6 text-gray-600 cursor-pointer hover:text-teal-600 transition-colors" />
                  {notifications.length > 0 && (
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-teal-500 rounded-full animate-pulse"></div>
                  )}
                </div>
                <button 
                  onClick={() => setStage('options')}
                  className="px-3 py-2 md:px-6 md:py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl md:rounded-2xl transition-all duration-300 border border-gray-200 text-sm md:text-base"
                >
                  ← Back
                </button>
              </div>
            </div>
          </div>

          {/* Stats Overview - EXACT from second file */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white/90 backdrop-blur-lg rounded-2xl p-6 border border-gray-200 shadow-lg">
              <div className="flex items-center space-x-3 mb-4">
                <Package className="w-8 h-8 text-teal-600" />
                <h3 className="text-lg font-semibold text-gray-900">Total Orders</h3>
              </div>
              <div className="text-3xl font-bold text-teal-600">{orders.length}</div>
              <div className="text-xs text-gray-500 mt-1">Managed by Expo CCI</div>
            </div>
            <div className="bg-white/90 backdrop-blur-lg rounded-2xl p-6 border border-gray-200 shadow-lg">
              <div className="flex items-center space-x-3 mb-4">
                <CheckCircle2 className="w-8 h-8 text-green-500" />
                <h3 className="text-lg font-semibold text-gray-900">Delivered</h3>
              </div>
              <div className="text-3xl font-bold text-green-500">{deliveredOrders}</div>
              <div className="text-xs text-gray-500 mt-1">Completed</div>
            </div>
            <div className="bg-white/90 backdrop-blur-lg rounded-2xl p-6 border border-gray-200 shadow-lg">
              <div className="flex items-center space-x-3 mb-4">
                <Clock className="w-8 h-8 text-purple-500" />
                <h3 className="text-lg font-semibold text-gray-900">In Progress</h3>
              </div>
              <div className="text-3xl font-bold text-purple-500">{pendingOrders}</div>
              <div className="text-xs text-gray-500 mt-1">Auto-refresh every 2 min</div>
            </div>
          </div>


          {/* Add this after your stats overview and before orders grid */}
          {checklist && (
            <div className="mb-8">
              <FuturisticChecklistProgress 
                checklistData={checklist}
                exhibitorName={exhibitorName}
                boothNumber={boothNumber}
                onRefresh={() => fetchChecklistByBooth(boothNumber, true)}
              />
            </div>
          )}

          {/* Order Status Legend - EXACT from second file */}
          <div className="bg-white/90 backdrop-blur-lg rounded-2xl p-6 border border-gray-200 shadow-lg mb-8">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Delivery Steps</h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {Object.entries(orderStatuses)
                .sort(([,a], [,b]) => a.priority - b.priority)
                .map(([status, info]) => (
                  <div key={status} className={`flex items-center space-x-2 p-3 rounded-lg ${info.bgColor}`}>
                    <info.icon className="w-4 h-4" />
                    <div>
                      <div className="text-sm font-medium">{info.label}</div>
                      <div className="text-xs opacity-75">Priority {info.priority}</div>
                    </div>
                  </div>
                ))}
            </div>
            <div className="mt-3 text-xs text-gray-500">
              Orders are automatically sorted by priority. Pending orders appear first, delivered orders appear last.
            </div>
          </div>

          {/* Loading state - EXACT from second file */}
          {loading && (
            <div className="text-center py-8">
              <RefreshCw className="w-8 h-8 text-teal-600 animate-spin mx-auto mb-4" />
              <p className="text-gray-700">Synchronizing with Expo CCI Database...</p>
            </div>
          )}

          {/* Recent Notifications - EXACT from second file */}
          {notifications.length > 0 && (
            <div className="bg-white/90 backdrop-blur-lg rounded-2xl p-6 border border-gray-200 shadow-lg mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center space-x-2">
                <Zap className="w-6 h-6 text-teal-600" />
                <span>Live Updates</span>
              </h2>
              <div className="space-y-3">
                {notifications.map((notif) => (
                  <div key={notif.id} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg border border-gray-100">
                    <div className="w-2 h-2 bg-teal-500 rounded-full animate-pulse"></div>
                    <span className="text-gray-800 flex-1">{notif.message}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Orders Grid - EXACT from second file */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {orders.map((order) => {
              const statusInfo = orderStatuses[order.status] || orderStatuses['in-process'];
              const StatusIcon = statusInfo.icon;
              
              return (
                <div key={order.id} className="bg-white/90 backdrop-blur-lg rounded-2xl p-6 border border-gray-200 hover:border-gray-300 transition-all duration-300 shadow-lg">
                  {/* Order Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <StatusIcon className="w-6 h-6 text-gray-700" />
                      <span className="text-gray-900 font-bold">{order.id}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                        Priority {statusInfo.priority}
                      </span>
                      {order.expo_processed && (
                        <span className="text-xs bg-teal-100 text-teal-700 px-2 py-1 rounded-full">
                          Expo CCI
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Order Info */}
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{order.item}</h3>
                  <p className="text-gray-600 text-sm mb-4">{order.description}</p>

                  {/* Order Details */}
                  <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                    <div>
                      <p className="text-gray-500">Order Date</p>
                      <p className="text-gray-900 font-medium">{order.order_date}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Quantity</p>
                      <p className="text-gray-900 font-medium">{order.quantity}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Color</p>
                      <p className="text-gray-900 font-medium">{order.color}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Section</p>
                      <p className="text-gray-900 font-medium">{order.section}</p>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-4">
                    {renderProgressBar(order.status)}
                  </div>

                  {/* Status Badge - Original colors preserved */}
                  <div className={`inline-flex items-center space-x-2 px-3 py-2 rounded-full ${statusInfo.bgColor}`}>
                    <StatusIcon className="w-4 h-4" />
                    <span className="text-sm font-medium">{statusInfo.label}</span>
                  </div>

                  {/* Comments */}
                  {order.comments && (
                    <div className="mt-4 p-3 bg-gray-50 rounded-lg border border-gray-100">
                      <p className="text-gray-500 text-xs mb-1">Comments</p>
                      <p className="text-gray-800 text-sm">{order.comments}</p>
                    </div>
                  )}

                  {/* Expo CCI Footer */}
                  <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
                    <ExpoLogo size="small" />
                    <span className="text-xs text-gray-400">Managed by Expo Convention Contractors</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* No orders message - EXACT from second file */}
          {!loading && orders.length === 0 && (
            <div className="text-center py-12">
              <div className="mb-4">
                <ExpoLogo size="large" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No Orders Found</h3>
              <p className="text-gray-600">No orders found for {exhibitorName} in our system.</p>
              <p className="text-gray-500 text-sm mt-2">Managed by Expo Convention Contractors</p>
            </div>
          )}

          {/* Footer - EXACT from second file */}
          <div className="mt-12 text-center bg-white/90 backdrop-blur-lg rounded-2xl p-6 border border-gray-200 shadow-lg">
            <div className="flex items-center justify-center mb-3">
              <ExpoLogo size="large" />
            </div>
            <p className="text-gray-600 text-sm font-medium mb-2">
              "Large Enough To Be Exceptional, Yet Small Enough To Be Personable"
            </p>
            <p className="text-gray-500 text-xs">
              Expo Convention Contractors Inc. • Professional Exhibition Management • Miami, Florida
            </p>
            <div className="mt-4 text-xs text-gray-400">
              ExpoFlow v3.0 • Real-time Order Tracking System
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
