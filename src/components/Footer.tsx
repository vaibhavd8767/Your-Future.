import React, { useState } from 'react';
import { Instagram, Mail, Phone, Code2, Sparkles, Server, FileCode, Download, CheckCircle2, X } from 'lucide-react';

export const Footer: React.FC = () => {
  const [showXamppModal, setShowXamppModal] = useState(false);

  return (
    <footer className="w-full bg-[#070d19] border-t border-white/10 pt-8 pb-10 px-4 mt-16 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left: Created By Attribution */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-sky-500 to-blue-600 text-[#020617] flex items-center justify-center font-black text-lg shadow-lg shadow-sky-500/20">
            VD
          </div>
          <div>
            <div className="flex items-center gap-1.5 text-white font-extrabold text-sm uppercase tracking-wide">
              <span>Created By Vaibhav Dangle</span>
              <Sparkles className="w-3.5 h-3.5 text-[#38bdf8]" />
            </div>
            <p className="text-[11px] text-slate-400">
              MHT-CET Engineering College Portal & CAP Cutoff Analytics
            </p>
          </div>
        </div>

        {/* Center / Right: Social & Contact Handles & XAMPP Button */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          {/* XAMPP Runnable Guide Button */}
          <button
            onClick={() => setShowXamppModal(true)}
            className="flex items-center gap-2 bg-[#1e293b] hover:bg-slate-800 text-[#38bdf8] border border-sky-500/40 px-3.5 py-2 rounded-xl transition shadow-md font-bold text-xs"
            title="XAMPP Apache & MySQL Deployment Guide"
          >
            <Server className="w-4 h-4 text-[#38bdf8]" />
            <span>Run in XAMPP Guide</span>
          </button>

          {/* Instagram Handle */}
          <a
            href="https://instagram.com/vaibhav_dangle"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-[#0f172a] hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-600 text-slate-200 hover:text-white px-3.5 py-2 rounded-xl border border-white/10 transition-all duration-300 shadow-md group"
            title="Follow on Instagram"
          >
            <Instagram className="w-4 h-4 text-pink-400 group-hover:text-white transition-colors" />
            <span className="font-bold text-xs">@vaibhav_dangle</span>
          </a>

          {/* Email Handle */}
          <a
            href="mailto:danglevaibhav87@gmail.com"
            className="flex items-center gap-2 bg-[#0f172a] hover:bg-sky-500/20 text-slate-200 hover:text-[#38bdf8] px-3.5 py-2 rounded-xl border border-white/10 hover:border-sky-500/30 transition-all duration-300 shadow-md"
            title="Send Email"
          >
            <Mail className="w-4 h-4 text-[#38bdf8]" />
            <span className="font-bold text-xs">danglevaibhav87@gmail.com</span>
          </a>

          {/* Mobile / Phone Number */}
          <a
            href="tel:+919370000000"
            className="flex items-center gap-2 bg-[#0f172a] hover:bg-emerald-500/20 text-slate-200 hover:text-emerald-400 px-3.5 py-2 rounded-xl border border-white/10 hover:border-emerald-500/30 transition-all duration-300 shadow-md"
            title="Call / WhatsApp Mobile"
          >
            <Phone className="w-4 h-4 text-emerald-400" />
            <span className="font-bold text-xs">+91 93700 00000</span>
          </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-6 pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-2">
        <p>© 2026 MHT-CET Admission Portal. All rights reserved.</p>
        <div className="flex items-center gap-1.5">
          <Code2 className="w-3.5 h-3.5 text-[#38bdf8]" />
          <span>Designed & Developed with React & Tailwind CSS</span>
        </div>
      </div>

      {/* XAMPP MODAL INSTRUCTIONS */}
      {showXamppModal && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setShowXamppModal(false)}
        >
          <div
            className="bg-[#0f172a] rounded-3xl max-w-xl w-full p-6 sm:p-7 shadow-2xl border border-sky-500/40 relative animate-in fade-in zoom-in-95 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowXamppModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white text-sm font-bold bg-[#1e293b] w-8 h-8 rounded-full flex items-center justify-center border border-slate-700"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-sky-500/20 text-[#38bdf8] border border-sky-500/30 rounded-2xl flex items-center justify-center shrink-0">
                <Server className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest bg-sky-500/20 text-[#38bdf8] border border-sky-500/30 px-2.5 py-0.5 rounded-md inline-block">
                  XAMPP Local Server Integration
                </span>
                <h2 className="text-xl font-black text-white uppercase tracking-tight">
                  How to Run in XAMPP
                </h2>
              </div>
            </div>

            <div className="space-y-4 text-xs text-slate-300">
              <div className="bg-[#1e293b] p-3.5 rounded-2xl border border-slate-700 space-y-2">
                <div className="flex items-center gap-2 text-white font-extrabold uppercase text-xs">
                  <span className="w-5 h-5 rounded-full bg-[#38bdf8] text-[#020617] flex items-center justify-center font-black text-[10px]">
                    1
                  </span>
                  <span>Build Production Bundle</span>
                </div>
                <p className="text-slate-400 pl-7 text-[11px]">
                  Run <code className="text-[#38bdf8] font-mono font-bold bg-slate-900 px-1.5 py-0.5 rounded">npm run build</code> in terminal. Vite creates a production-ready <code className="text-white font-mono">dist/</code> folder configured with relative paths (<code className="text-[#38bdf8]">base: './'</code>) and Apache <code className="text-white font-mono">.htaccess</code>.
                </p>
              </div>

              <div className="bg-[#1e293b] p-3.5 rounded-2xl border border-slate-700 space-y-2">
                <div className="flex items-center gap-2 text-white font-extrabold uppercase text-xs">
                  <span className="w-5 h-5 rounded-full bg-[#38bdf8] text-[#020617] flex items-center justify-center font-black text-[10px]">
                    2
                  </span>
                  <span>Copy Files to XAMPP htdocs</span>
                </div>
                <p className="text-slate-400 pl-7 text-[11px]">
                  Copy all contents inside <code className="text-white font-mono">dist/</code> into <code className="text-emerald-400 font-mono font-bold bg-slate-900 px-1.5 py-0.5 rounded">C:\xampp\htdocs\college-app\</code>.
                </p>
              </div>

              <div className="bg-[#1e293b] p-3.5 rounded-2xl border border-slate-700 space-y-2">
                <div className="flex items-center gap-2 text-white font-extrabold uppercase text-xs">
                  <span className="w-5 h-5 rounded-full bg-[#38bdf8] text-[#020617] flex items-center justify-center font-black text-[10px]">
                    3
                  </span>
                  <span>Import MySQL Database (phpMyAdmin)</span>
                </div>
                <p className="text-slate-400 pl-7 text-[11px]">
                  Start Apache & MySQL in XAMPP. Go to <code className="text-[#38bdf8] font-mono font-bold">http://localhost/phpmyadmin</code>, create database <code className="text-white font-mono font-bold">college_portal_db</code>, and import <code className="text-white font-mono">database.sql</code>.
                </p>
              </div>

              <div className="bg-[#1e293b] p-3.5 rounded-2xl border border-slate-700 space-y-2">
                <div className="flex items-center gap-2 text-white font-extrabold uppercase text-xs">
                  <span className="w-5 h-5 rounded-full bg-[#38bdf8] text-[#020617] flex items-center justify-center font-black text-[10px]">
                    4
                  </span>
                  <span>Open in Browser</span>
                </div>
                <p className="text-slate-400 pl-7 text-[11px]">
                  Open <a href="http://localhost/college-app/" target="_blank" rel="noreferrer" className="text-[#38bdf8] underline font-bold">http://localhost/college-app/</a> in your web browser!
                </p>
              </div>

              <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
                <a
                  href="/database.sql"
                  download="database.sql"
                  className="btn-sky-bold text-xs py-2.5 px-4 flex items-center gap-2 uppercase tracking-wider"
                >
                  <Download className="w-4 h-4" />
                  <span>Download database.sql</span>
                </a>

                <a
                  href="/XAMPP_SETUP_GUIDE.txt"
                  download="XAMPP_SETUP_GUIDE.txt"
                  className="bg-[#1e293b] hover:bg-slate-800 text-white border border-slate-700 text-xs font-bold py-2.5 px-4 rounded-xl flex items-center gap-2 transition"
                >
                  <FileCode className="w-4 h-4 text-slate-400" />
                  <span>Download Setup Guide</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};

