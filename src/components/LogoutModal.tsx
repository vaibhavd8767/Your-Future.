import React from 'react';
import { LogOut, ArrowRight } from 'lucide-react';

interface LogoutModalProps {
  onConfirmLogout: () => void;
  onCancel: () => void;
}

export const LogoutModal: React.FC<LogoutModalProps> = ({
  onConfirmLogout,
  onCancel,
}) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#0f172a] rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-white/10 text-center animate-in fade-in zoom-in-95 duration-200">
        <div className="w-16 h-16 bg-rose-500/10 text-rose-400 border border-rose-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-inner">
          <LogOut className="w-8 h-8" />
        </div>

        <h3 className="text-xl font-black text-white uppercase tracking-tight mb-2">
          End Portal Session?
        </h3>

        <p className="text-xs text-slate-400 mb-6 leading-relaxed">
          Logging out will return you to the Candidate Login screen.
        </p>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="w-1/2 py-3 border border-slate-700 rounded-xl text-xs font-extrabold uppercase tracking-wider text-slate-300 bg-[#1e293b] hover:bg-slate-800 transition"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirmLogout}
            className="w-1/2 bg-rose-600 hover:bg-rose-700 text-white py-3 rounded-xl text-xs font-black uppercase tracking-wider transition shadow-lg flex items-center justify-center gap-1.5"
          >
            <span>Logout</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
