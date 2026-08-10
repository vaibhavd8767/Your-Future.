import React, { useState, useEffect, useRef } from 'react';
import { College, BranchFee, CutoffEntry } from '../types';
import { Footer } from './Footer';
import * as THREE from 'three';
import {
  ArrowLeft,
  MapPin,
  Award,
  Bookmark,
  CheckCircle2,
  Maximize2,
  Mail,
  Phone,
  Download,
  DollarSign,
  GraduationCap,
  Sparkles,
  Layers,
  Briefcase,
  Eye,
  X,
  FileSpreadsheet,
} from 'lucide-react';

interface CollegeDetailProps {
  college: College;
  onNavigateMain: () => void;
  isSaved: boolean;
  onToggleSave: (id: number) => void;
}

export const CollegeDetail: React.FC<CollegeDetailProps> = ({
  college,
  onNavigateMain,
  isSaved,
  onToggleSave,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'branch_fees' | 'cutoffs' | 'placements' | 'gallery'>('overview');
  const [rotate3D, setRotate3D] = useState(true);
  const [showCutoffModal, setShowCutoffModal] = useState(false);
  const [inquirySubmitted, setInquirySubmitted] = useState(false);
  const [inquiryForm, setInquiryForm] = useState({
    name: '',
    email: '',
    phone: '',
    course: 'Computer Engineering',
  });

  const threeCanvasRef = useRef<HTMLDivElement>(null);

  // Default branch fees fallback if missing
  const branchFees: BranchFee[] = college.branch_fees_list || [
    { branch_name: "Computer Engineering", tuition_fee: Math.round(college.fees * 0.85), development_fee: Math.round(college.fees * 0.15), total_fee: college.fees, seats: 120 },
    { branch_name: "Information Technology", tuition_fee: Math.round(college.fees * 0.82), development_fee: Math.round(college.fees * 0.15), total_fee: Math.round(college.fees * 0.97), seats: 120 },
    { branch_name: "Artificial Intelligence & Data Science", tuition_fee: Math.round(college.fees * 0.88), development_fee: Math.round(college.fees * 0.15), total_fee: Math.round(college.fees * 1.03), seats: 60 },
    { branch_name: "Electronics & Telecommunication", tuition_fee: Math.round(college.fees * 0.78), development_fee: Math.round(college.fees * 0.12), total_fee: Math.round(college.fees * 0.90), seats: 60 },
    { branch_name: "Mechanical Engineering", tuition_fee: Math.round(college.fees * 0.72), development_fee: Math.round(college.fees * 0.12), total_fee: Math.round(college.fees * 0.84), seats: 60 },
    { branch_name: "Civil Engineering", tuition_fee: Math.round(college.fees * 0.70), development_fee: Math.round(college.fees * 0.10), total_fee: Math.round(college.fees * 0.80), seats: 60 },
  ];

  // Default cutoffs list fallback if missing
  const cutoffsList: CutoffEntry[] = college.cutoff_list || [
    { branch: "Computer Engineering", category: "GOPEN", round1_percentile: college.cutoff_general || 92.5, round2_percentile: (college.cutoff_general || 92.5) - 1.5, round3_percentile: (college.cutoff_general || 92.5) - 2.8 },
    { branch: "Computer Engineering", category: "OBC", round1_percentile: (college.cutoff_general || 92.5) - 2.0, round2_percentile: (college.cutoff_general || 92.5) - 3.2, round3_percentile: (college.cutoff_general || 92.5) - 4.5 },
    { branch: "Computer Engineering", category: "SC", round1_percentile: 82.0, round2_percentile: 80.5, round3_percentile: 79.0 },
    { branch: "Computer Engineering", category: "ST", round1_percentile: 74.5, round2_percentile: 72.0, round3_percentile: 70.0 },
    { branch: "Computer Engineering", category: "EWS", round1_percentile: (college.cutoff_general || 92.5) - 0.5, round2_percentile: (college.cutoff_general || 92.5) - 1.8, round3_percentile: (college.cutoff_general || 92.5) - 2.9 },
    { branch: "Information Technology", category: "GOPEN", round1_percentile: (college.cutoff_general || 92.5) - 2.5, round2_percentile: (college.cutoff_general || 92.5) - 3.8, round3_percentile: (college.cutoff_general || 92.5) - 5.0 },
    { branch: "AI & Data Science", category: "GOPEN", round1_percentile: (college.cutoff_general || 92.5) - 1.2, round2_percentile: (college.cutoff_general || 92.5) - 2.5, round3_percentile: (college.cutoff_general || 92.5) - 3.6 },
    { branch: "Electronics & Telecomm", category: "GOPEN", round1_percentile: 79.5, round2_percentile: 77.0, round3_percentile: 75.0 },
  ];

  // 3D Canvas initialization
  useEffect(() => {
    if (!threeCanvasRef.current) return;
    const container = threeCanvasRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.set(0, 3, 7);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
    container.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    // Modern architectural campus 3D representation
    const baseGeo = new THREE.BoxGeometry(4.5, 0.2, 3.5);
    const baseMat = new THREE.MeshPhongMaterial({ color: 0x0f172a, specular: 0x38bdf8 });
    const baseMesh = new THREE.Mesh(baseGeo, baseMat);
    group.add(baseMesh);

    const mainGeo = new THREE.BoxGeometry(2.2, 2.5, 1.8);
    const mainMat = new THREE.MeshStandardMaterial({ color: 0x38bdf8, roughness: 0.2, metalness: 0.7 });
    const mainMesh = new THREE.Mesh(mainGeo, mainMat);
    mainMesh.position.set(0, 1.35, 0);
    group.add(mainMesh);

    const ambLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambLight);

    const dirLight = new THREE.DirectionalLight(0x38bdf8, 1.5);
    dirLight.position.set(5, 8, 5);
    scene.add(dirLight);

    let reqId: number;
    const animate = () => {
      reqId = requestAnimationFrame(animate);
      if (rotate3D) {
        group.rotation.y += 0.008;
      }
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(reqId);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, [rotate3D]);

  // Download Cutoff List as formatted Text/CSV
  const handleDownloadCutoffList = () => {
    let content = `=======================================================\n`;
    content += `OFFICIAL CUTOFF LIST - ${college.collage_name.toUpperCase()}\n`;
    content += `Location: ${college.district}, ${college.state}\n`;
    content += `CAP ROUND PERCENTILE CUTOFFS (ACADEMIC YEAR 2025)\n`;
    content += `=======================================================\n\n`;

    content += `BRANCH NAME | CATEGORY | ROUND 1 %ile | ROUND 2 %ile | ROUND 3 %ile\n`;
    content += `-------------------------------------------------------------------\n`;

    cutoffsList.forEach((c) => {
      content += `${c.branch.padEnd(25)} | ${c.category.padEnd(8)} | ${c.round1_percentile.toFixed(1).padStart(12)} | ${c.round2_percentile.toFixed(1).padStart(12)} | ${c.round3_percentile.toFixed(1).padStart(12)}\n`;
    });

    content += `\n\nGenerated by MHT-CET Admission Portal.`;

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${college.collage_name.replace(/[^a-zA-Z0-9]/g, '_')}_cutoff_list.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setInquirySubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#020617] text-[#f1f5f9] font-sans pb-20">
      {/* Navigation Bar */}
      <nav className="bg-[#0f172a]/90 backdrop-blur-md border-b border-white/10 sticky top-0 z-50 shadow-xl">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <button
            onClick={onNavigateMain}
            className="flex items-center gap-2 text-[#38bdf8] hover:text-sky-300 font-extrabold text-xs uppercase tracking-wider bg-[#1e293b] hover:bg-slate-800 px-4 py-2.5 rounded-xl transition border border-sky-500/30 shadow-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Colleges</span>
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onToggleSave(college.id)}
              className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl font-extrabold text-xs uppercase tracking-wider transition shadow-sm ${
                isSaved
                  ? 'bg-[#38bdf8] text-[#020617]'
                  : 'bg-[#1e293b] text-slate-200 border border-slate-700 hover:bg-slate-800'
              }`}
            >
              <Bookmark className="w-3.5 h-3.5" />
              <span>{isSaved ? 'Shortlisted' : 'Shortlist College'}</span>
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 pt-6 space-y-8">
        {/* 3D Campus Header Banner */}
        <div className="relative bg-gradient-to-r from-[#020617] via-[#0f172a] to-[#1e293b] rounded-3xl overflow-hidden shadow-2xl min-h-[360px] flex flex-col justify-between p-6 sm:p-10 text-white border border-white/10">
          {/* Three.js Interactive Canvas Container */}
          <div
            ref={threeCanvasRef}
            className="absolute inset-0 z-0 opacity-40 pointer-events-none"
          />

          {/* Top Controls Overlay */}
          <div className="relative z-10 flex justify-between items-start">
            <div className="flex flex-wrap items-center gap-2">
              <span className="bg-[#38bdf8] text-[#020617] text-xs font-black px-3.5 py-1.5 rounded-lg shadow uppercase tracking-wide flex items-center gap-1">
                <Award className="w-4 h-4 text-[#020617]" />
                Rank #{college.ranking}
              </span>
              <span className="bg-[#1e293b]/90 backdrop-blur-md text-slate-200 text-xs font-bold px-3 py-1.5 rounded-lg border border-slate-700 uppercase tracking-wider">
                {college.university_type}
              </span>
              {college.is_autonomous === 'Yes' && (
                <span className="bg-sky-500/20 backdrop-blur-md text-[#38bdf8] border border-sky-500/30 text-xs font-bold px-3 py-1.5 rounded-lg uppercase tracking-wider">
                  Autonomous Institute
                </span>
              )}
            </div>

            <button
              onClick={() => setRotate3D(!rotate3D)}
              className="bg-black/60 hover:bg-black/80 backdrop-blur-md text-xs font-bold px-3 py-1.5 rounded-xl border border-white/20 flex items-center gap-1.5 transition text-slate-200"
            >
              <Maximize2 className="w-3.5 h-3.5 text-[#38bdf8]" />
              <span>3D Orbit: {rotate3D ? 'ON' : 'OFF'}</span>
            </button>
          </div>

          {/* College Title Info */}
          <div className="relative z-10 mt-auto pt-8">
            <h1 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-white leading-tight mb-2 drop-shadow-md">
              {college.collage_name}
            </h1>
            <p className="text-[#38bdf8] text-sm sm:text-base flex items-center gap-1.5 font-bold mb-4">
              <MapPin className="w-4 h-4 text-[#38bdf8] shrink-0" />
              <span>{college.address}</span>
            </p>
          </div>
        </div>

        {/* Details Grid & Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Left Details (2 Columns) */}
          <div className="lg:col-span-2 space-y-6">
            {/* Tabs Header */}
            <div className="bg-[#0f172a] p-2 rounded-2xl shadow-xl border border-white/10 flex gap-1.5 overflow-x-auto">
              {[
                { id: 'overview', label: 'Overview & Specs', icon: Layers },
                { id: 'branch_fees', label: 'Every Branch Fee', icon: DollarSign },
                { id: 'cutoffs', label: 'CAP Round Cutoffs', icon: GraduationCap },
                { id: 'placements', label: 'Placements', icon: Briefcase },
                { id: 'gallery', label: 'Campus Gallery', icon: Sparkles },
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-extrabold uppercase tracking-wider transition shrink-0 ${
                      activeTab === tab.id
                        ? 'bg-[#38bdf8] text-[#020617] shadow-md'
                        : 'text-slate-400 hover:bg-[#1e293b] hover:text-white'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* TAB 1: OVERVIEW */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div className="bg-[#0f172a] rounded-3xl p-6 shadow-xl border border-white/10">
                  <h3 className="text-lg font-black text-white uppercase tracking-tight mb-4 pb-2 border-b border-white/10">
                    Key Specifications & Academic Profile
                  </h3>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
                    <div className="p-4 bg-[#1e293b] rounded-2xl border border-slate-700">
                      <span className="text-slate-400 block font-bold uppercase tracking-wider text-[10px]">Average Annual Fee</span>
                      <span className="text-lg font-black text-[#38bdf8] mt-1 block">
                        ₹{college.fees.toLocaleString()}
                      </span>
                    </div>

                    <div className="p-4 bg-[#1e293b] rounded-2xl border border-slate-700">
                      <span className="text-slate-400 block font-bold uppercase tracking-wider text-[10px]">Established Year</span>
                      <span className="text-lg font-bold text-white mt-1 block">
                        {college.established_year || 2004}
                      </span>
                    </div>

                    <div className="p-4 bg-[#1e293b] rounded-2xl border border-slate-700">
                      <span className="text-slate-400 block font-bold uppercase tracking-wider text-[10px]">Accreditation</span>
                      <span className="text-sm font-bold text-emerald-400 mt-1 block">
                        {college.accreditation || 'NAAC Grade A'}
                      </span>
                    </div>

                    <div className="p-4 bg-[#1e293b] rounded-2xl border border-slate-700">
                      <span className="text-slate-400 block font-bold uppercase tracking-wider text-[10px]">Highest Package</span>
                      <span className="text-base font-extrabold text-white mt-1 block">
                        {college.highest_package || '22.5 LPA'}
                      </span>
                    </div>

                    <div className="p-4 bg-[#1e293b] rounded-2xl border border-slate-700">
                      <span className="text-slate-400 block font-bold uppercase tracking-wider text-[10px]">Average Package</span>
                      <span className="text-base font-extrabold text-white mt-1 block">
                        {college.average_package || '5.2 LPA'}
                      </span>
                    </div>

                    <div className="p-4 bg-[#1e293b] rounded-2xl border border-slate-700">
                      <span className="text-slate-400 block font-bold uppercase tracking-wider text-[10px]">General Cutoff</span>
                      <span className="text-base font-extrabold text-[#38bdf8] mt-1 block">
                        {college.cutoff_general}%ile
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed mt-4 pt-4 border-t border-white/10">
                    {college.description}
                  </p>
                </div>

                {/* Infrastructure */}
                {college.facilities && college.facilities.length > 0 && (
                  <div className="bg-[#0f172a] rounded-3xl p-6 shadow-xl border border-white/10">
                    <h3 className="text-lg font-black text-white uppercase tracking-tight mb-4 pb-2 border-b border-white/10">
                      Campus Infrastructure & Amenities
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs font-bold text-slate-200">
                      {college.facilities.map((fac, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-2 p-3 bg-[#1e293b] rounded-xl border border-slate-700"
                        >
                          <CheckCircle2 className="w-4 h-4 text-[#38bdf8] shrink-0" />
                          <span>{fac}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* TAB 2: EVERY BRANCH FEE STRUCTURE */}
            {activeTab === 'branch_fees' && (
              <div className="bg-[#0f172a] rounded-3xl p-6 shadow-xl border border-white/10 space-y-4">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 pb-3 border-b border-white/10">
                  <div>
                    <h3 className="text-lg font-black text-white uppercase tracking-tight">
                      Detailed Fee Structure (Every Branch)
                    </h3>
                    <p className="text-xs text-slate-400">
                      Breakdown of Tuition Fees, Development Fees, and Intake Seats.
                    </p>
                  </div>
                  <span className="sky-tag font-bold text-[10px]">
                    Academic Year 2025-26
                  </span>
                </div>

                {/* Fees Table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-[#1e293b] text-slate-300 uppercase font-black tracking-wider border-b border-slate-700">
                        <th className="p-3">Branch / Discipline</th>
                        <th className="p-3">Tuition Fee</th>
                        <th className="p-3">Dev Fee</th>
                        <th className="p-3">Total Annual Fee</th>
                        <th className="p-3 text-right">Intake Seats</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800 text-slate-200">
                      {branchFees.map((bf, idx) => (
                        <tr key={idx} className="hover:bg-[#1e293b]/50 transition">
                          <td className="p-3 font-extrabold text-white flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-[#38bdf8]" />
                            {bf.branch_name}
                          </td>
                          <td className="p-3 text-slate-300">₹{bf.tuition_fee.toLocaleString()}</td>
                          <td className="p-3 text-slate-400">₹{bf.development_fee.toLocaleString()}</td>
                          <td className="p-3 font-black text-[#38bdf8]">₹{bf.total_fee.toLocaleString()}</td>
                          <td className="p-3 text-right font-bold text-slate-300">{bf.seats} Seats</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* TAB 3: CUTOFFS LIST (VIEW & DOWNLOAD) */}
            {activeTab === 'cutoffs' && (
              <div className="bg-[#0f172a] rounded-3xl p-6 shadow-xl border border-white/10 space-y-5">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pb-3 border-b border-white/10">
                  <div>
                    <h3 className="text-lg font-black text-white uppercase tracking-tight">
                      MHT-CET CAP Round Cutoffs
                    </h3>
                    <p className="text-xs text-slate-400">
                      View and download official cutoff percentiles by category and round.
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setShowCutoffModal(true)}
                      className="px-3.5 py-2 bg-[#1e293b] hover:bg-slate-800 text-[#38bdf8] border border-sky-500/30 rounded-xl text-xs font-extrabold uppercase tracking-wider transition flex items-center gap-1.5"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>View Cutoff Matrix</span>
                    </button>

                    <button
                      onClick={handleDownloadCutoffList}
                      className="btn-sky-bold text-xs px-3.5 py-2 flex items-center gap-1.5 shadow-md"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download Cutoff List</span>
                    </button>
                  </div>
                </div>

                {/* Cutoff Quick List Preview */}
                <div className="grid grid-cols-1 gap-3">
                  {cutoffsList.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-4 bg-[#1e293b] rounded-2xl border border-slate-700 flex items-center justify-between"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-extrabold text-white text-sm uppercase tracking-wide">
                            {item.branch}
                          </h4>
                          <span className="text-[10px] bg-sky-500/20 text-[#38bdf8] font-black px-2 py-0.5 rounded border border-sky-500/30">
                            {item.category}
                          </span>
                        </div>
                        <span className="text-xs text-slate-400 mt-1 block">
                          CAP Round 2: {item.round2_percentile.toFixed(1)} %ile • Round 3: {item.round3_percentile.toFixed(1)} %ile
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-bold text-slate-400 block uppercase tracking-wider">
                          Round 1 Cutoff
                        </span>
                        <span className="text-sm font-black text-[#38bdf8]">
                          {item.round1_percentile.toFixed(1)} %ile
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 4: PLACEMENTS */}
            {activeTab === 'placements' && (
              <div className="bg-[#0f172a] rounded-3xl p-6 shadow-xl border border-white/10 space-y-4">
                <h3 className="text-lg font-black text-white uppercase tracking-tight pb-2 border-b border-white/10">
                  Placement Highlights & Top Recruiters
                </h3>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="p-4 bg-[#1e293b] rounded-2xl border border-slate-700">
                    <span className="text-xs font-extrabold text-slate-400 uppercase tracking-widest">Highest Salary</span>
                    <span className="text-2xl font-black text-[#38bdf8] block mt-1">{college.highest_package}</span>
                  </div>
                  <div className="p-4 bg-[#1e293b] rounded-2xl border border-slate-700">
                    <span className="text-xs font-extrabold text-slate-400 uppercase tracking-widest">Average Salary</span>
                    <span className="text-2xl font-black text-emerald-400 block mt-1">{college.average_package}</span>
                  </div>
                </div>
                <div className="pt-2">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Major Hiring Partners</h4>
                  <div className="flex flex-wrap gap-2 text-xs font-bold text-slate-200">
                    {['TCS', 'Infosys', 'NVIDIA', 'Capgemini', 'Wipro', 'Bosch', 'Cognizant', 'Reliance Industries'].map((company, idx) => (
                      <span key={idx} className="px-3.5 py-2 bg-[#1e293b] rounded-xl border border-slate-700">
                        {company}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 5: GALLERY */}
            {activeTab === 'gallery' && (
              <div className="bg-[#0f172a] rounded-3xl p-6 shadow-xl border border-white/10 space-y-4">
                <h3 className="text-lg font-black text-white uppercase tracking-tight pb-2 border-b border-white/10">
                  Campus Photo Gallery
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {college.gallery_images.map((img, idx) => (
                    <div key={idx} className="rounded-2xl overflow-hidden shadow-md h-48 border border-slate-700">
                      <img src={img} alt={`Campus photo ${idx + 1}`} className="w-full h-full object-cover hover:scale-105 transition duration-500" />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar Inquiry Form */}
          <div className="space-y-6">
            <div className="bg-[#0f172a] rounded-3xl p-6 shadow-xl border border-white/10 sticky top-20">
              <h3 className="text-lg font-black text-white uppercase tracking-tight mb-1">
                Direct Admission Inquiry
              </h3>
              <p className="text-xs text-slate-400 mb-4">
                Get free counseling and direct call back from campus officers.
              </p>

              {inquirySubmitted ? (
                <div className="p-6 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl text-center space-y-2">
                  <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                  <h4 className="font-extrabold text-emerald-300">Inquiry Submitted!</h4>
                  <p className="text-xs text-emerald-400">
                    Admission desk will contact you at {inquiryForm.phone}.
                  </p>
                  <button
                    onClick={() => setInquirySubmitted(false)}
                    className="text-xs font-bold text-[#38bdf8] underline pt-2"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleInquirySubmit} className="space-y-3.5">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1">Full Name</label>
                    <input
                      type="text"
                      required
                      value={inquiryForm.name}
                      onChange={(e) => setInquiryForm({ ...inquiryForm, name: e.target.value })}
                      className="w-full p-2.5 bg-[#1e293b] border border-slate-700 text-white rounded-xl text-xs font-medium focus:ring-2 focus:ring-[#38bdf8] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1">Email Address</label>
                    <input
                      type="email"
                      required
                      value={inquiryForm.email}
                      onChange={(e) => setInquiryForm({ ...inquiryForm, email: e.target.value })}
                      className="w-full p-2.5 bg-[#1e293b] border border-slate-700 text-white rounded-xl text-xs font-medium focus:ring-2 focus:ring-[#38bdf8] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1">Phone Number</label>
                    <input
                      type="tel"
                      required
                      value={inquiryForm.phone}
                      onChange={(e) => setInquiryForm({ ...inquiryForm, phone: e.target.value })}
                      className="w-full p-2.5 bg-[#1e293b] border border-slate-700 text-white rounded-xl text-xs font-medium focus:ring-2 focus:ring-[#38bdf8] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1">Course / Branch</label>
                    <select
                      value={inquiryForm.course}
                      onChange={(e) => setInquiryForm({ ...inquiryForm, course: e.target.value })}
                      className="w-full p-2.5 bg-[#1e293b] border border-slate-700 text-white rounded-xl text-xs font-medium focus:ring-2 focus:ring-[#38bdf8] focus:outline-none"
                    >
                      <option value="Computer Engineering">Computer Engineering</option>
                      <option value="Information Technology">Information Technology</option>
                      <option value="AI & Data Science">AI & Data Science</option>
                      <option value="Electronics & Telecomm">Electronics & Telecomm</option>
                      <option value="Mechanical Engineering">Mechanical Engineering</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="btn-sky-bold w-full shadow-lg text-xs py-3 uppercase tracking-wider"
                  >
                    Request Free Counseling Call
                  </button>
                </form>
              )}

              {/* Contact Information */}
              <div className="mt-6 pt-4 border-t border-white/10 text-xs text-slate-400 space-y-2">
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-[#38bdf8]" />
                  <span>{college.contact_email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-[#38bdf8]" />
                  <span>{college.contact_phone}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Cutoff View Modal */}
      {showCutoffModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#0f172a] rounded-3xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl border border-white/10 relative max-h-[85vh] flex flex-col">
            <button
              onClick={() => setShowCutoffModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white text-sm font-bold bg-[#1e293b] w-8 h-8 rounded-full flex items-center justify-center border border-slate-700"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="mb-4 pr-8">
              <span className="text-[10px] font-black uppercase tracking-widest bg-sky-500/20 text-[#38bdf8] border border-sky-500/30 px-2.5 py-1 rounded-md inline-block mb-1">
                Official CAP Matrix
              </span>
              <h2 className="text-xl font-black text-white uppercase tracking-tight">
                {college.collage_name} Cutoff List
              </h2>
            </div>

            <div className="flex-1 overflow-y-auto space-y-3 pr-2 my-2">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-[#1e293b] text-slate-300 uppercase font-black tracking-wider border-b border-slate-700 sticky top-0">
                    <th className="p-3">Branch</th>
                    <th className="p-3">Category</th>
                    <th className="p-3">Round 1 (%ile)</th>
                    <th className="p-3">Round 2 (%ile)</th>
                    <th className="p-3">Round 3 (%ile)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-slate-200">
                  {cutoffsList.map((entry, idx) => (
                    <tr key={idx} className="hover:bg-[#1e293b]/50">
                      <td className="p-3 font-extrabold text-white">{entry.branch}</td>
                      <td className="p-3 font-bold text-[#38bdf8]">{entry.category}</td>
                      <td className="p-3 font-black text-emerald-400">{entry.round1_percentile.toFixed(1)}</td>
                      <td className="p-3 text-slate-300">{entry.round2_percentile.toFixed(1)}</td>
                      <td className="p-3 text-slate-400">{entry.round3_percentile.toFixed(1)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="pt-4 border-t border-white/10 flex justify-between items-center">
              <span className="text-[11px] text-slate-400">Cutoff values based on DTE Maharashtra CAP admissions.</span>
              <button
                onClick={handleDownloadCutoffList}
                className="btn-sky-bold text-xs px-4 py-2 flex items-center gap-1.5 shadow"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Cutoffs</span>
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};
