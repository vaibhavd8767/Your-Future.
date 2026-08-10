import React, { useState, useEffect, useRef } from 'react';
import {
  User,
  Lock,
  ArrowRight,
  ShieldCheck,
  ChevronDown,
  Phone,
  GraduationCap,
  Sparkles,
  KeyRound,
  UserPlus,
  LogIn,
  CheckCircle2,
  X,
  Mail,
  Instagram,
  Award,
  BookOpen,
} from 'lucide-react';

interface LoginPageProps {
  onStudentLogin: (email: string, name: string) => void;
  onAdminLogin: () => void;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onStudentLogin, onAdminLogin }) => {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');

  // Candidate Login Form State
  const [loginEmail, setLoginEmail] = useState('danglevaibhav87@gmail.com');
  const [loginPassword, setLoginPassword] = useState('student123');

  // New Candidate Registration Form State
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regBranch, setRegBranch] = useState('Computer Engineering');
  const [regPercentile, setRegPercentile] = useState<string>('91.5');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');
  const [regError, setRegError] = useState('');

  // Forgot Password Modal State
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotPhone, setForgotPhone] = useState('');
  const [newPasswordInput, setNewPasswordInput] = useState('');
  const [forgotSuccess, setForgotSuccess] = useState('');

  // Admin login modal state
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [adminUsername, setAdminUsername] = useState('admin');
  const [adminPassword, setAdminPassword] = useState('admin123');
  const [adminError, setAdminError] = useState('');

  // Slide down tracking counter
  const [slideCount, setSlideCount] = useState(0);
  const touchStartY = useRef<number | null>(null);
  const lastWheelTime = useRef<number>(0);

  // Background Particle Animation Canvas Ref
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // HTML5 Interactive Canvas Background Animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Particle nodes creation
    const particleCount = Math.min(Math.floor((width * height) / 14000), 70);
    const particles: Particle[] = [];
    const colors = ['#38bdf8', '#0284c7', '#06b6d4', '#60a5fa', '#3b82f6'];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        radius: Math.random() * 2 + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    // Animation Loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw faint background grid
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.03)';
      ctx.lineWidth = 1;
      const gridSize = 60;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Render connected constellation lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 130) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(56, 189, 248, ${0.25 * (1 - dist / 130)})`;
            ctx.lineWidth = 0.8;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Update & render particle dots
      for (let p of particles) {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowColor = '#38bdf8';
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Handle Wheel Scroll Down (Desktop) for Secret Admin Trigger
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (e.deltaY > 30) {
        const now = Date.now();
        if (now - lastWheelTime.current > 300) {
          lastWheelTime.current = now;
          setSlideCount((prev) => {
            const next = prev + 1;
            if (next >= 3) {
              setShowAdminModal(true);
            }
            return next;
          });
        }
      }
    };

    window.addEventListener('wheel', handleWheel);
    return () => window.removeEventListener('wheel', handleWheel);
  }, []);

  // Handle Touch Swipe Down (Mobile)
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartY.current === null) return;
    const touchEndY = e.changedTouches[0].clientY;
    const diffY = touchEndY - touchStartY.current;

    if (diffY > 80) {
      setSlideCount((prev) => {
        const next = prev + 1;
        if (next >= 3) {
          setShowAdminModal(true);
        }
        return next;
      });
    }
    touchStartY.current = null;
  };

  // Submit Existing Candidate Login
  const handleCandidateLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const displayName = loginEmail.split('@')[0].replace(/[._]/g, ' ') || 'Candidate';
    onStudentLogin(loginEmail, displayName);
  };

  // Submit New Candidate Registration
  const handleCandidateRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setRegError('');

    if (!regName.trim()) {
      setRegError('Please enter candidate full name.');
      return;
    }
    if (!regEmail.trim()) {
      setRegError('Please enter candidate email address.');
      return;
    }
    if (regPassword !== regConfirmPassword) {
      setRegError('Passwords do not match. Please re-enter.');
      return;
    }
    if (regPassword.length < 4) {
      setRegError('Password must be at least 4 characters long.');
      return;
    }

    // Complete Registration and Auto-Login Candidate
    onStudentLogin(regEmail.trim(), regName.trim());
  };

  // Submit Password Reset Request
  const handleForgotSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setForgotSuccess('A secure password reset link and OTP have been generated. Your password has been updated!');
    setTimeout(() => {
      setShowForgotModal(false);
      setForgotSuccess('');
    }, 2500);
  };

  // Submit Admin Login Form
  const handleAdminSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminUsername === 'admin' && adminPassword === 'admin123') {
      onAdminLogin();
    } else {
      setAdminError('Invalid admin credentials. Use admin / admin123');
    }
  };

  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="min-h-screen bg-[#020617] text-white flex flex-col items-center justify-between p-4 sm:p-6 relative overflow-hidden font-sans"
    >
      {/* Dynamic Animated Canvas Background */}
      <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none opacity-80" />

      {/* Pulsing Glow Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-sky-500/10 rounded-full blur-[120px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-blue-600/15 rounded-full blur-[100px] pointer-events-none" />

      {/* Secret Slide Down Notification Banner */}
      <div className="w-full max-w-md my-2 text-center z-20">
        <div
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-black transition-all duration-300 ${
            slideCount > 0
              ? 'bg-sky-500/20 text-[#38bdf8] border-sky-500/40 shadow-lg shadow-sky-500/10 scale-105'
              : 'bg-[#0f172a]/80 text-slate-400 border-white/10'
          }`}
        >
          <ChevronDown className={`w-4 h-4 animate-bounce ${slideCount > 0 ? 'text-[#38bdf8]' : ''}`} />
          <span>
            {slideCount === 0 && 'Slide down 3 times to unlock hidden Admin Login'}
            {slideCount === 1 && '⚡ Slide down 2 more times for Admin Portal...'}
            {slideCount === 2 && '🔥 Slide down 1 more time! Admin Portal unlocking...'}
            {slideCount >= 3 && '✨ Secret Admin Login Unlocked!'}
          </span>
        </div>
      </div>

      {/* Main Login / Registration Card */}
      <div className="w-full max-w-md bg-[#0f172a]/90 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-white/10 shadow-2xl z-10 my-auto">
        {/* Portal Header */}
        <div className="text-center mb-5">
          <div className="w-14 h-14 bg-[#38bdf8] text-[#020617] rounded-2xl flex items-center justify-center mx-auto mb-2.5 shadow-xl font-black text-2xl">
            🎓
          </div>
          <span className="text-[10px] font-extrabold bg-sky-500/20 text-[#38bdf8] border border-sky-500/30 px-3 py-1 rounded-full uppercase tracking-widest inline-block mb-1">
            MHT-CET & Engineering Portal
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight uppercase">
            Candidate Access
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Access cutoff lists, college comparison & document vault
          </p>
        </div>

        {/* Tab Switcher: Sign In vs New Candidate Registration */}
        <div className="bg-[#1e293b] p-1.5 rounded-2xl border border-slate-700/80 flex gap-1 mb-5">
          <button
            type="button"
            onClick={() => setActiveTab('login')}
            className={`flex-1 py-2.5 rounded-xl font-black text-xs uppercase tracking-wider transition flex items-center justify-center gap-1.5 ${
              activeTab === 'login'
                ? 'bg-[#38bdf8] text-[#020617] shadow-lg'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <LogIn className="w-3.5 h-3.5" />
            <span>Sign In</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('register')}
            className={`flex-1 py-2.5 rounded-xl font-black text-xs uppercase tracking-wider transition flex items-center justify-center gap-1.5 ${
              activeTab === 'register'
                ? 'bg-[#38bdf8] text-[#020617] shadow-lg'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>New Candidate</span>
          </button>
        </div>

        {/* FORM TAB 1: CANDIDATE LOGIN */}
        {activeTab === 'login' && (
          <form onSubmit={handleCandidateLoginSubmit} className="space-y-4">
            <div>
              <label className="block text-[11px] font-extrabold text-slate-300 uppercase tracking-wider mb-1">
                Candidate Email / Application ID
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="email"
                  required
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  placeholder="candidate@example.com"
                  className="w-full pl-10 pr-4 py-2.5 bg-[#1e293b] border border-slate-700 text-white rounded-xl text-xs font-semibold focus:ring-2 focus:ring-[#38bdf8] focus:outline-none"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="block text-[11px] font-extrabold text-slate-300 uppercase tracking-wider">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => setShowForgotModal(true)}
                  className="text-[11px] font-bold text-[#38bdf8] hover:underline"
                >
                  Forgot Password?
                </button>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="password"
                  required
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2.5 bg-[#1e293b] border border-slate-700 text-white rounded-xl text-xs font-semibold focus:ring-2 focus:ring-[#38bdf8] focus:outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              className="btn-sky-bold w-full py-3 text-xs shadow-lg flex items-center justify-center gap-2 uppercase tracking-wider mt-3"
            >
              <span>Enter College Portal</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

        {/* FORM TAB 2: NEW CANDIDATE REGISTRATION */}
        {activeTab === 'register' && (
          <form onSubmit={handleCandidateRegisterSubmit} className="space-y-3.5">
            {regError && (
              <div className="p-2.5 bg-rose-500/20 border border-rose-500/30 rounded-xl text-rose-300 text-xs font-bold text-center">
                {regError}
              </div>
            )}

            <div>
              <label className="block text-[10px] font-extrabold text-slate-300 uppercase tracking-wider mb-1">
                Candidate Full Name
              </label>
              <div className="relative">
                <User className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  required
                  value={regName}
                  onChange={(e) => setRegName(e.target.value)}
                  placeholder="e.g. Rahul Sharma"
                  className="w-full pl-9 pr-3 py-2 bg-[#1e293b] border border-slate-700 text-white rounded-xl text-xs font-semibold focus:ring-2 focus:ring-[#38bdf8] focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <div>
                <label className="block text-[10px] font-extrabold text-slate-300 uppercase tracking-wider mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                  placeholder="rahul@example.com"
                  className="w-full p-2 bg-[#1e293b] border border-slate-700 text-white rounded-xl text-xs font-semibold focus:ring-2 focus:ring-[#38bdf8] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[10px] font-extrabold text-slate-300 uppercase tracking-wider mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  required
                  value={regPhone}
                  onChange={(e) => setRegPhone(e.target.value)}
                  placeholder="+91 9876543210"
                  className="w-full p-2 bg-[#1e293b] border border-slate-700 text-white rounded-xl text-xs font-semibold focus:ring-2 focus:ring-[#38bdf8] focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <div>
                <label className="block text-[10px] font-extrabold text-slate-300 uppercase tracking-wider mb-1">
                  Preferred Branch
                </label>
                <select
                  value={regBranch}
                  onChange={(e) => setRegBranch(e.target.value)}
                  className="w-full p-2 bg-[#1e293b] border border-slate-700 text-white rounded-xl text-xs font-semibold focus:ring-2 focus:ring-[#38bdf8] focus:outline-none"
                >
                  <option value="Computer Engineering">Computer Engineering</option>
                  <option value="Information Technology">Information Technology</option>
                  <option value="AI & Data Science">AI & Data Science</option>
                  <option value="Electronics & Telecommunication">Electronics & Telecomm</option>
                  <option value="Mechanical Engineering">Mechanical Engineering</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-extrabold text-[#38bdf8] uppercase tracking-wider mb-1">
                  MHT-CET Percentile
                </label>
                <input
                  type="number"
                  step="0.1"
                  required
                  value={regPercentile}
                  onChange={(e) => setRegPercentile(e.target.value)}
                  placeholder="e.g. 92.5"
                  className="w-full p-2 bg-[#1e293b] border border-slate-700 text-white rounded-xl text-xs font-bold focus:ring-2 focus:ring-[#38bdf8] focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <div>
                <label className="block text-[10px] font-extrabold text-slate-300 uppercase tracking-wider mb-1">
                  Set Password
                </label>
                <input
                  type="password"
                  required
                  value={regPassword}
                  onChange={(e) => setRegPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full p-2 bg-[#1e293b] border border-slate-700 text-white rounded-xl text-xs font-semibold focus:ring-2 focus:ring-[#38bdf8] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[10px] font-extrabold text-slate-300 uppercase tracking-wider mb-1">
                  Confirm Password
                </label>
                <input
                  type="password"
                  required
                  value={regConfirmPassword}
                  onChange={(e) => setRegConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full p-2 bg-[#1e293b] border border-slate-700 text-white rounded-xl text-xs font-semibold focus:ring-2 focus:ring-[#38bdf8] focus:outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              className="btn-sky-bold w-full py-2.5 text-xs shadow-lg flex items-center justify-center gap-2 uppercase tracking-wider mt-2"
            >
              <UserPlus className="w-4 h-4" />
              <span>Register & Enter Portal</span>
            </button>
          </form>
        )}
      </div>

      {/* Footer Info with Creator Details */}
      <div className="text-center z-10 my-3 space-y-2">
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs">
          <span className="text-white font-extrabold flex items-center gap-1 bg-[#0f172a]/90 px-3 py-1 rounded-full border border-sky-500/30">
            <Sparkles className="w-3.5 h-3.5 text-[#38bdf8]" />
            <span>Created By Vaibhav Dangle</span>
          </span>

          <a
            href="https://instagram.com/vaibhav_dangle"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 bg-[#0f172a]/80 hover:bg-pink-600/20 text-slate-300 hover:text-pink-400 px-3 py-1 rounded-full border border-slate-700 transition"
          >
            <Instagram className="w-3.5 h-3.5 text-pink-400" />
            <span className="font-bold">@vaibhav_dangle</span>
          </a>

          <a
            href="mailto:danglevaibhav87@gmail.com"
            className="flex items-center gap-1.5 bg-[#0f172a]/80 hover:bg-sky-500/20 text-slate-300 hover:text-[#38bdf8] px-3 py-1 rounded-full border border-slate-700 transition"
          >
            <Mail className="w-3.5 h-3.5 text-[#38bdf8]" />
            <span className="font-bold">danglevaibhav87@gmail.com</span>
          </a>

          <a
            href="tel:+919370000000"
            className="flex items-center gap-1.5 bg-[#0f172a]/80 hover:bg-emerald-500/20 text-slate-300 hover:text-emerald-400 px-3 py-1 rounded-full border border-slate-700 transition"
          >
            <Phone className="w-3.5 h-3.5 text-emerald-400" />
            <span className="font-bold">+91 93700 00000</span>
          </a>
        </div>
        <p className="text-[10px] text-slate-500">
          © 2026 MHT-CET Admission Portal • Autonomous & Government Engineering Institutes
        </p>
      </div>

      {/* FORGOT PASSWORD MODAL */}
      {showForgotModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#0f172a] rounded-3xl max-w-md w-full p-6 sm:p-7 shadow-2xl border border-sky-500/40 relative animate-in fade-in zoom-in-95">
            <button
              onClick={() => setShowForgotModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white text-sm font-bold bg-[#1e293b] w-8 h-8 rounded-full flex items-center justify-center border border-slate-700"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="text-center mb-5">
              <div className="w-12 h-12 bg-sky-500/20 text-[#38bdf8] border border-sky-500/30 rounded-2xl flex items-center justify-center mx-auto mb-2">
                <KeyRound className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-black text-white uppercase tracking-tight">
                Reset Candidate Password
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Enter your registered email or phone to reset your password
              </p>
            </div>

            {forgotSuccess ? (
              <div className="p-4 bg-emerald-500/20 border border-emerald-500/30 rounded-2xl text-emerald-300 text-xs font-bold text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
                <p>{forgotSuccess}</p>
              </div>
            ) : (
              <form onSubmit={handleForgotSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block text-slate-300 font-extrabold uppercase mb-1">
                    Registered Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={forgotEmail}
                    onChange={(e) => setForgotEmail(e.target.value)}
                    placeholder="candidate@example.com"
                    className="w-full p-2.5 bg-[#1e293b] border border-slate-700 text-white rounded-xl font-semibold focus:ring-2 focus:ring-[#38bdf8] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-extrabold uppercase mb-1">
                    Registered Phone Number
                  </label>
                  <input
                    type="tel"
                    required
                    value={forgotPhone}
                    onChange={(e) => setForgotPhone(e.target.value)}
                    placeholder="+91 9876543210"
                    className="w-full p-2.5 bg-[#1e293b] border border-slate-700 text-white rounded-xl font-semibold focus:ring-2 focus:ring-[#38bdf8] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-extrabold uppercase mb-1">
                    New Password
                  </label>
                  <input
                    type="password"
                    required
                    value={newPasswordInput}
                    onChange={(e) => setNewPasswordInput(e.target.value)}
                    placeholder="Enter new password"
                    className="w-full p-2.5 bg-[#1e293b] border border-slate-700 text-white rounded-xl font-semibold focus:ring-2 focus:ring-[#38bdf8] focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="btn-sky-bold w-full py-3 uppercase tracking-wider shadow-lg"
                >
                  Send OTP & Update Password
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* ADMIN LOGIN MODAL (Triggered via secret 3-slide-down gesture) */}
      {showAdminModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#0f172a] rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-sky-500/40 relative animate-in fade-in zoom-in-95">
            <button
              onClick={() => {
                setShowAdminModal(false);
                setAdminError('');
              }}
              className="absolute top-4 right-4 text-slate-400 hover:text-white text-sm font-bold bg-[#1e293b] w-8 h-8 rounded-full flex items-center justify-center border border-slate-700"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="text-center mb-6">
              <div className="w-12 h-12 bg-sky-500/20 text-[#38bdf8] border border-sky-500/30 rounded-2xl flex items-center justify-center mx-auto mb-2">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-extrabold bg-sky-500/20 text-[#38bdf8] px-2.5 py-1 rounded-md uppercase tracking-widest inline-block mb-1">
                Authorized Personnel Only
              </span>
              <h2 className="text-xl font-black text-white uppercase tracking-tight">
                Single Admin Portal
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Manage colleges, fees, cutoffs & export SQL schema
              </p>
            </div>

            {adminError && (
              <div className="mb-4 p-3 bg-rose-500/20 border border-rose-500/30 rounded-xl text-rose-300 text-xs text-center font-bold">
                {adminError}
              </div>
            )}

            <form onSubmit={handleAdminSubmit} className="space-y-4">
              <div>
                <label className="block text-[11px] font-extrabold text-slate-300 uppercase tracking-wider mb-1">
                  Admin Username
                </label>
                <input
                  type="text"
                  required
                  value={adminUsername}
                  onChange={(e) => setAdminUsername(e.target.value)}
                  className="w-full p-2.5 bg-[#1e293b] border border-slate-700 text-white rounded-xl text-xs font-semibold focus:ring-2 focus:ring-[#38bdf8] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-extrabold text-slate-300 uppercase tracking-wider mb-1">
                  Admin Password
                </label>
                <input
                  type="password"
                  required
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  className="w-full p-2.5 bg-[#1e293b] border border-slate-700 text-white rounded-xl text-xs font-semibold focus:ring-2 focus:ring-[#38bdf8] focus:outline-none"
                />
              </div>

              <div className="p-2.5 bg-[#1e293b]/80 rounded-xl border border-slate-700 text-[11px] text-slate-400 flex items-center justify-between">
                <span>Default Credentials:</span>
                <code className="text-[#38bdf8] font-mono font-bold">admin / admin123</code>
              </div>

              <button
                type="submit"
                className="btn-sky-bold w-full py-3 text-xs shadow-lg uppercase tracking-wider"
              >
                Login to Admin Dashboard
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
