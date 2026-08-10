import React, { useState } from 'react';
import { UserProfile, College, StudentDocument } from '../types';
import {
  ArrowLeft,
  LogOut,
  Mail,
  Phone,
  Award,
  Building,
  Bookmark,
  FileText,
  Upload,
  Eye,
  Trash2,
  Download,
  Plus,
  CheckCircle2,
  X,
  FileCode,
} from 'lucide-react';

interface ProfileComponentProps {
  user: UserProfile;
  savedColleges: College[];
  onSelectCollege: (id: number) => void;
  onNavigateMain: () => void;
  onLogout: () => void;
}

export const ProfileComponent: React.FC<ProfileComponentProps> = ({
  user,
  savedColleges,
  onSelectCollege,
  onNavigateMain,
  onLogout,
}) => {
  // Initial Student Documents State
  const [documents, setDocuments] = useState<StudentDocument[]>([
    {
      id: 'doc-1',
      name: 'MHT-CET Scorecard 2025',
      fileType: 'PDF Document',
      uploadDate: '2025-06-15',
      fileSize: '1.2 MB',
      fileDataUrl: 'https://images.unsplash.com/photo-1568667256549-094345857637?auto=format&fit=crop&q=80&w=800',
    },
    {
      id: 'doc-2',
      name: '12th Class Board Marksheet',
      fileType: 'PDF Document',
      uploadDate: '2025-05-20',
      fileSize: '850 KB',
      fileDataUrl: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&q=80&w=800',
    },
    {
      id: 'doc-3',
      name: 'Domicile & Nationality Certificate',
      fileType: 'PNG Image',
      uploadDate: '2025-04-10',
      fileSize: '2.1 MB',
      fileDataUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=800',
    },
  ]);

  // Upload Document Form State
  const [docName, setDocName] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [filePreviewUrl, setFilePreviewUrl] = useState<string>('');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [viewingDoc, setViewingDoc] = useState<StudentDocument | null>(null);

  // Handle File Select
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);

      const reader = new FileReader();
      reader.onload = () => {
        setFilePreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Submit Uploaded Document
  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!docName.trim() || !selectedFile) return;

    const newDoc: StudentDocument = {
      id: `doc-${Date.now()}`,
      name: docName.trim(),
      fileType: selectedFile.type.includes('pdf') ? 'PDF Document' : 'Image File',
      uploadDate: new Date().toISOString().split('T')[0],
      fileSize: `${(selectedFile.size / 1024).toFixed(0)} KB`,
      fileDataUrl: filePreviewUrl || 'https://images.unsplash.com/photo-1568667256549-094345857637?auto=format&fit=crop&q=80&w=800',
    };

    setDocuments((prev) => [newDoc, ...prev]);
    setDocName('');
    setSelectedFile(null);
    setFilePreviewUrl('');
    setShowUploadModal(false);
  };

  // Delete Document
  const handleDeleteDoc = (id: string) => {
    setDocuments((prev) => prev.filter((d) => d.id !== id));
  };

  // Download Document
  const handleDownloadDoc = (doc: StudentDocument) => {
    const a = document.createElement('a');
    a.href = doc.fileDataUrl;
    a.download = `${doc.name.replace(/\s+/g, '_')}.${doc.fileType.includes('PDF') ? 'pdf' : 'png'}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="min-h-screen bg-[#020617] text-[#f1f5f9] font-sans pb-16">
      {/* Top Header */}
      <nav className="bg-[#0f172a]/90 backdrop-blur-md border-b border-white/10 sticky top-0 z-40 shadow-xl">
        <div className="max-w-7xl mx-auto px-4 py-3.5 flex items-center justify-between">
          <button
            onClick={onNavigateMain}
            className="flex items-center gap-2 text-[#38bdf8] hover:text-sky-300 font-extrabold text-xs uppercase tracking-wider bg-[#1e293b] hover:bg-slate-800 px-4 py-2.5 rounded-xl transition border border-sky-500/30 shadow-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Directory</span>
          </button>

          <button
            onClick={onLogout}
            className="flex items-center gap-1.5 text-xs text-rose-400 hover:text-rose-300 font-extrabold uppercase tracking-wider bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 px-4 py-2.5 rounded-xl transition"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Logout</span>
          </button>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-4 pt-8">
        {/* Profile Card Header */}
        <div className="bg-[#0f172a] rounded-3xl p-6 sm:p-8 shadow-xl border border-white/10 mb-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-sky-500/10 w-64 h-64 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 relative z-10">
            <div className="relative">
              <div className="w-24 h-24 sm:w-28 sm:h-28 bg-[#38bdf8] text-[#020617] rounded-3xl flex items-center justify-center text-4xl font-black shadow-2xl ring-4 ring-sky-500/20">
                {user.name.charAt(0)}
              </div>
              <div className="absolute -bottom-1 -right-1 bg-emerald-500 text-white p-1.5 rounded-full ring-2 ring-[#0f172a]">
                <CheckCircle2 className="w-4 h-4" />
              </div>
            </div>

            <div className="flex-1 space-y-2">
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
                  {user.name}
                </h1>
                <span className="bg-sky-500/20 text-[#38bdf8] text-xs font-extrabold px-3 py-1 rounded-md border border-sky-500/30 uppercase tracking-widest">
                  Verified Candidate
                </span>
              </div>

              <div className="flex flex-wrap gap-4 text-xs font-bold text-slate-400">
                <span className="flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-[#38bdf8]" />
                  {user.email}
                </span>
                <span className="flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-[#38bdf8]" />
                  {user.phone}
                </span>
              </div>

              <div className="pt-2 flex flex-wrap gap-2">
                <span className="bg-emerald-500/20 text-emerald-300 text-xs font-extrabold px-3 py-1.5 rounded-xl border border-emerald-500/30 uppercase tracking-wider flex items-center gap-1">
                  <Award className="w-3.5 h-3.5 text-emerald-400" />
                  MHT-CET: {user.currentPercentile}%ile
                </span>
                <span className="bg-[#1e293b] text-slate-200 text-xs font-extrabold px-3 py-1.5 rounded-xl border border-slate-700 uppercase tracking-wider flex items-center gap-1">
                  <Building className="w-3.5 h-3.5 text-[#38bdf8]" />
                  Pref: {user.preferredBranch}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Student Document Vault Section */}
        <div className="bg-[#0f172a] rounded-3xl p-6 sm:p-8 shadow-xl border border-white/10 mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 pb-4 border-b border-white/10">
            <div>
              <h2 className="text-lg font-black text-white uppercase tracking-tight flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#38bdf8]" />
                Student Document Vault ({documents.length})
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Upload and manage your CAP verification certificates, marksheets & ID proofs.
              </p>
            </div>

            <button
              onClick={() => setShowUploadModal(true)}
              className="btn-sky-bold px-4 py-2.5 text-xs flex items-center gap-2 uppercase tracking-wider shadow-md shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span>Upload Document</span>
            </button>
          </div>

          {/* Document Grid List */}
          {documents.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {documents.map((doc) => (
                <div
                  key={doc.id}
                  className="p-4 bg-[#1e293b] rounded-2xl border border-slate-700 flex flex-col justify-between hover:border-sky-500/40 transition space-y-3"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="p-3 bg-[#0f172a] rounded-xl border border-slate-700 text-[#38bdf8]">
                      <FileCode className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-extrabold text-white text-sm truncate">{doc.name}</h4>
                      <p className="text-[10px] text-slate-400 mt-0.5">
                        Uploaded {doc.uploadDate} • {doc.fileSize}
                      </p>
                    </div>
                    <span className="text-[10px] font-extrabold text-emerald-300 bg-emerald-500/20 px-2 py-0.5 rounded border border-emerald-500/30 uppercase tracking-wider">
                      Verified
                    </span>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-700/60 text-xs">
                    <button
                      onClick={() => setViewingDoc(doc)}
                      className="text-[#38bdf8] hover:text-sky-300 font-extrabold flex items-center gap-1 uppercase text-[11px] tracking-wider"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>View</span>
                    </button>

                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => handleDownloadDoc(doc)}
                        className="text-slate-300 hover:text-white font-bold flex items-center gap-1 text-[11px]"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Download</span>
                      </button>

                      <button
                        onClick={() => handleDeleteDoc(doc.id)}
                        className="text-rose-400 hover:text-rose-300 font-bold flex items-center gap-1 text-[11px]"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center bg-[#1e293b] rounded-2xl border border-slate-700 text-slate-400">
              <p className="text-sm font-medium">No documents uploaded in vault yet.</p>
              <button
                onClick={() => setShowUploadModal(true)}
                className="mt-3 text-xs font-extrabold text-[#38bdf8] underline"
              >
                Upload Candidate Certificate
              </button>
            </div>
          )}
        </div>

        {/* Shortlisted Colleges Section */}
        <div className="mb-10">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-black text-white uppercase tracking-tight flex items-center gap-2">
              <Bookmark className="w-5 h-5 text-[#38bdf8]" />
              Shortlisted Colleges ({savedColleges.length})
            </h2>
          </div>

          {savedColleges.length > 0 ? (
            <div className="grid grid-cols-1 gap-3">
              {savedColleges.map((college) => (
                <div
                  key={college.id}
                  onClick={() => onSelectCollege(college.id)}
                  className="bg-[#0f172a] rounded-2xl p-4 shadow-xl hover:border-sky-500/50 border border-white/10 transition flex items-center justify-between cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={college.image}
                      alt={college.collage_name}
                      className="w-16 h-16 rounded-xl object-cover border border-slate-700"
                    />
                    <div>
                      <span className="text-[10px] font-extrabold text-[#38bdf8] uppercase tracking-wider">
                        #{college.ranking} Rank • {college.university_type}
                      </span>
                      <h3 className="font-extrabold text-white text-sm line-clamp-1 group-hover:text-[#38bdf8] transition">
                        {college.collage_name}
                      </h3>
                      <p className="text-xs text-slate-400">
                        {college.district}, {college.state} • ₹{college.fees.toLocaleString()}/yr
                      </p>
                    </div>
                  </div>

                  <button className="bg-[#1e293b] text-[#38bdf8] group-hover:bg-[#38bdf8] group-hover:text-[#020617] text-xs font-black px-3.5 py-2.5 rounded-xl transition shrink-0 ml-2 border border-sky-500/30 uppercase tracking-wider">
                    Detail &rarr;
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-[#0f172a] rounded-2xl p-8 text-center border border-white/10 text-slate-400">
              <p className="text-sm font-medium">No colleges shortlisted yet.</p>
              <button
                onClick={onNavigateMain}
                className="mt-3 text-xs font-bold text-[#38bdf8] underline"
              >
                Browse Colleges in Main Directory
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Upload Document Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#0f172a] rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-white/10 relative">
            <button
              onClick={() => setShowUploadModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white text-sm font-bold bg-[#1e293b] w-8 h-8 rounded-full flex items-center justify-center border border-slate-700"
            >
              <X className="w-4 h-4" />
            </button>

            <h2 className="text-xl font-black text-white uppercase tracking-tight mb-4 flex items-center gap-2">
              <Upload className="w-5 h-5 text-[#38bdf8]" />
              Upload Student Document
            </h2>

            <form onSubmit={handleUploadSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-extrabold uppercase mb-1">
                  Document Title / Name
                </label>
                <input
                  type="text"
                  required
                  value={docName}
                  onChange={(e) => setDocName(e.target.value)}
                  placeholder="e.g. MHT-CET Scorecard 2025"
                  className="w-full p-2.5 bg-[#1e293b] border border-slate-700 text-white rounded-xl font-semibold focus:ring-2 focus:ring-[#38bdf8] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-extrabold uppercase mb-1">
                  Select File (PDF, PNG, JPG)
                </label>
                <input
                  type="file"
                  required
                  accept=".pdf,.png,.jpg,.jpeg"
                  onChange={handleFileChange}
                  className="w-full p-2 bg-[#1e293b] border border-slate-700 text-slate-300 rounded-xl font-semibold file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-black file:bg-[#38bdf8] file:text-[#020617]"
                />
              </div>

              {selectedFile && (
                <div className="p-3 bg-[#1e293b] rounded-xl border border-slate-700 text-slate-300">
                  <div className="font-extrabold">{selectedFile.name}</div>
                  <div className="text-[10px] text-slate-400">
                    {(selectedFile.size / 1024).toFixed(0)} KB • {selectedFile.type || 'Document'}
                  </div>
                </div>
              )}

              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowUploadModal(false)}
                  className="w-1/2 py-2.5 bg-[#1e293b] border border-slate-700 text-slate-300 font-bold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-sky-bold w-1/2 py-2.5 uppercase tracking-wider"
                >
                  Save Document
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Document View / Preview Modal */}
      {viewingDoc && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#0f172a] rounded-3xl max-w-xl w-full p-6 shadow-2xl border border-white/10 relative flex flex-col">
            <button
              onClick={() => setViewingDoc(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white text-sm font-bold bg-[#1e293b] w-8 h-8 rounded-full flex items-center justify-center border border-slate-700"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="mb-4 pr-8">
              <span className="text-[10px] font-black uppercase tracking-widest bg-sky-500/20 text-[#38bdf8] border border-sky-500/30 px-2.5 py-1 rounded-md inline-block mb-1">
                Document Preview
              </span>
              <h3 className="text-xl font-black text-white uppercase tracking-tight">
                {viewingDoc.name}
              </h3>
              <p className="text-xs text-slate-400">
                Uploaded on {viewingDoc.uploadDate} ({viewingDoc.fileSize})
              </p>
            </div>

            <div className="rounded-2xl overflow-hidden border border-slate-700 max-h-80 bg-black flex items-center justify-center p-2 mb-4">
              <img
                src={viewingDoc.fileDataUrl}
                alt={viewingDoc.name}
                className="max-h-72 w-auto object-contain rounded-xl"
              />
            </div>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => handleDownloadDoc(viewingDoc)}
                className="btn-sky-bold text-xs px-4 py-2.5 flex items-center gap-2 uppercase tracking-wider"
              >
                <Download className="w-4 h-4" />
                <span>Download File</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
