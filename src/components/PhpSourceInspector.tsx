import React, { useState } from 'react';
import { Code2, Copy, Check, Download, FileCode, X, Sparkles, Folder } from 'lucide-react';
import { PHP_CODE_FILES } from '../data/phpCodeTemplates';

interface PhpSourceInspectorProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PhpSourceInspector: React.FC<PhpSourceInspectorProps> = ({
  isOpen,
  onClose,
}) => {
  const [selectedFile, setSelectedFile] = useState<string>('main.php');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const activeSnippet =
    PHP_CODE_FILES.find((f) => f.filename === selectedFile) || PHP_CODE_FILES[0];

  const handleCopy = () => {
    navigator.clipboard.writeText(activeSnippet.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([activeSnippet.code], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = activeSnippet.filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-3 sm:p-6">
      <div className="bg-slate-900 text-slate-100 rounded-3xl max-w-5xl w-full h-[85vh] shadow-2xl border border-slate-800 flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Top Title Bar */}
        <div className="px-6 py-4 bg-[#020617] border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-sky-500/10 text-[#38bdf8] rounded-xl border border-sky-500/20">
              <Code2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-black text-white text-base uppercase tracking-tight flex items-center gap-2">
                XAMPP / PHP Code Inspector
                <span className="text-[10px] bg-[#38bdf8] text-[#020617] font-black px-2 py-0.5 rounded-md uppercase tracking-wider">
                  Ready for htdocs/
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                Separated PHP, HTML & SQL files for XAMPP web server deployment
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Main Body with Sidebar Tabs and Code View */}
        <div className="flex-1 flex flex-col sm:flex-row overflow-hidden">
          {/* Left File Selector Sidebar */}
          <div className="w-full sm:w-64 bg-[#020617]/80 border-r border-white/10 p-3 flex sm:flex-col gap-1.5 overflow-x-auto sm:overflow-y-auto shrink-0">
            <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest px-3 py-1.5 hidden sm:block">
              XAMPP Modules
            </span>

            {PHP_CODE_FILES.map((file) => (
              <button
                key={file.filename}
                onClick={() => setSelectedFile(file.filename)}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-extrabold uppercase tracking-wider transition shrink-0 ${
                  selectedFile === file.filename
                    ? 'bg-[#38bdf8] text-[#020617] shadow-lg'
                    : 'text-slate-300 hover:bg-[#1e293b] hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2">
                  <FileCode className={`w-4 h-4 ${selectedFile === file.filename ? 'text-[#020617]' : 'text-[#38bdf8]'}`} />
                  <span>{file.filename}</span>
                </div>
                <span className={`text-[9px] uppercase font-mono px-1.5 py-0.5 rounded ${selectedFile === file.filename ? 'bg-black/20 text-[#020617]' : 'bg-black/40 text-slate-400'} hidden sm:inline`}>
                  {file.language}
                </span>
              </button>
            ))}
          </div>

          {/* Right Code Display Area */}
          <div className="flex-1 flex flex-col bg-[#0f172a] overflow-hidden">
            {/* Code Header Actions */}
            <div className="px-5 py-3 bg-[#020617] border-b border-white/10 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="font-mono font-bold text-[#38bdf8]">{activeSnippet.filename}</span>
                <span className="text-slate-400">• {activeSnippet.description}</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-[#1e293b] hover:bg-slate-800 text-white border border-slate-700 rounded-xl font-extrabold text-[11px] transition uppercase tracking-wider"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-[#38bdf8]" />}
                  <span>{copied ? 'Copied!' : 'Copy Code'}</span>
                </button>

                <button
                  onClick={handleDownload}
                  className="btn-sky-bold text-[11px] px-3.5 py-1.5 flex items-center gap-1.5 shadow"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download</span>
                </button>
              </div>
            </div>

            {/* Code Text Area */}
            <div className="flex-1 p-5 overflow-auto font-mono text-xs text-slate-200 bg-[#020617] leading-relaxed">
              <pre>
                <code>{activeSnippet.code}</code>
              </pre>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="px-6 py-3 bg-[#020617] border-t border-white/10 text-[11px] text-slate-400 flex flex-wrap justify-between items-center gap-2">
          <span>
            💡 How to run in XAMPP: Copy database schema from <code className="text-[#38bdf8] font-mono font-bold">collages.sql</code> into phpMyAdmin, then place all PHP files in <code className="text-[#38bdf8] font-mono font-bold">C:/xampp/htdocs/college_portal/</code>.
          </span>
          <span className="font-bold text-slate-300 uppercase tracking-wider text-[10px]">PHP 8.2+ | MySQLi | Tailwind CSS</span>
        </div>
      </div>
    </div>
  );
};
