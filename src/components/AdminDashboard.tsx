import React, { useState } from 'react';
import { College, IsAutonomous, UniversityType, BranchFee, CutoffEntry } from '../types';
import { downloadDatabaseSchemaSql } from '../utils/sqlGenerator';
import {
  Plus,
  Trash2,
  Edit,
  Download,
  LogOut,
  Building,
  ShieldAlert,
  ArrowLeft,
  DollarSign,
  GraduationCap,
  Sparkles,
  Check,
  X,
  Search,
  Upload,
  Image as ImageIcon,
  Layers,
  Briefcase,
  FileText,
  CheckSquare,
  Square,
  Award,
  Calendar,
  Globe,
  Mail,
  Phone,
} from 'lucide-react';

interface AdminDashboardProps {
  colleges: College[];
  onAddCollege: (college: Omit<College, 'id'>) => void;
  onUpdateCollege: (college: College) => void;
  onDeleteCollege: (id: number) => void;
  onLogoutAdmin: () => void;
  onNavigateMain: () => void;
}

// Preset High-Resolution Campus Photos
const PRESET_CAMPUS_PHOTOS = [
  { label: 'Main Quadrangle', url: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=1000' },
  { label: 'Academic Tower', url: 'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&q=80&w=1000' },
  { label: 'Central Library', url: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=1000' },
  { label: 'Engineering Labs', url: 'https://images.unsplash.com/photo-1592280771190-3e2e4d571952?auto=format&fit=crop&q=80&w=1000' },
  { label: 'Auditorium Hall', url: 'https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?auto=format&fit=crop&q=80&w=1000' },
  { label: 'Robotics & AI Center', url: 'https://images.unsplash.com/photo-1568667256549-094345857637?auto=format&fit=crop&q=80&w=1000' },
];

const STANDARD_FACILITIES = [
  'High-Speed Wi-Fi Campus',
  'Central Digital Library',
  'Advanced AI & Robotics Labs',
  'Sports Complex & Gym',
  'Boys & Girls Hostel',
  'Air-Conditioned Auditorium',
  'Smart Classrooms',
  'Incubation & Startup Cell',
  'Cafeteria & Food Court',
  'College Bus Transport',
];

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  colleges,
  onAddCollege,
  onUpdateCollege,
  onDeleteCollege,
  onLogoutAdmin,
  onNavigateMain,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFormModal, setShowFormModal] = useState(false);
  const [activeModalTab, setActiveModalTab] = useState<'basic' | 'photos' | 'fees' | 'cutoffs' | 'placements'>('basic');
  const [editingCollege, setEditingCollege] = useState<College | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<number | null>(null);

  // Form State
  const [formName, setFormName] = useState('');
  const [formState, setFormState] = useState('Maharashtra');
  const [formDistrict, setFormDistrict] = useState('Nashik');
  const [formBranch, setFormBranch] = useState('Computer Engineering');
  const [formFees, setFormFees] = useState<number>(90000);
  const [formRanking, setFormRanking] = useState<number>(10);
  const [formAddress, setFormAddress] = useState('');
  const [formPlacement, setFormPlacement] = useState('90% Placement Rate | Max 18 LPA | Avg 5.0 LPA');
  const [formImage, setFormImage] = useState(PRESET_CAMPUS_PHOTOS[0].url);
  const [formGalleryImages, setFormGalleryImages] = useState<string[]>([
    PRESET_CAMPUS_PHOTOS[0].url,
    PRESET_CAMPUS_PHOTOS[2].url,
    PRESET_CAMPUS_PHOTOS[3].url,
  ]);
  const [formMeritPdf, setFormMeritPdf] = useState('college_merit_list.pdf');
  const [formUnivType, setFormUnivType] = useState<UniversityType>('Private');
  const [formAutonomous, setFormAutonomous] = useState<IsAutonomous>('Yes');
  const [formDesc, setFormDesc] = useState('');
  const [formEstYear, setFormEstYear] = useState<number>(2005);
  const [formAccreditation, setFormAccreditation] = useState("NAAC Grade 'A'");
  const [formHighestPkg, setFormHighestPkg] = useState('22.5 LPA');
  const [formAvgPkg, setFormAvgPkg] = useState('5.5 LPA');
  const [formFacilities, setFormFacilities] = useState<string[]>([
    'High-Speed Wi-Fi Campus',
    'Central Digital Library',
    'Sports Complex & Gym',
    'Boys & Girls Hostel',
  ]);
  const [formCutoffGeneral, setFormCutoffGeneral] = useState<number>(88.5);
  const [formContactEmail, setFormContactEmail] = useState('');
  const [formContactPhone, setFormContactPhone] = useState('+91 253 2500000');
  const [formWebsiteUrl, setFormWebsiteUrl] = useState('https://example.edu.in');
  const [customFacilityInput, setCustomFacilityInput] = useState('');

  // Branch Fees List State
  const [formBranchFeesList, setFormBranchFeesList] = useState<BranchFee[]>([
    { branch_name: 'Computer Engineering', tuition_fee: 76500, development_fee: 13500, total_fee: 90000, seats: 120 },
    { branch_name: 'Information Technology', tuition_fee: 73800, development_fee: 13500, total_fee: 87300, seats: 60 },
    { branch_name: 'Artificial Intelligence & Data Science', tuition_fee: 79200, development_fee: 13500, total_fee: 92700, seats: 60 },
  ]);

  // Cutoff List State
  const [formCutoffList, setFormCutoffList] = useState<CutoffEntry[]>([
    { branch: 'Computer Engineering', category: 'GOPEN', round1_percentile: 91.5, round2_percentile: 89.8, round3_percentile: 88.0 },
    { branch: 'Computer Engineering', category: 'OBC', round1_percentile: 88.2, round2_percentile: 86.5, round3_percentile: 85.0 },
    { branch: 'Information Technology', category: 'GOPEN', round1_percentile: 88.0, round2_percentile: 86.2, round3_percentile: 84.5 },
  ]);

  // Open modal for Adding
  const handleOpenAdd = () => {
    setEditingCollege(null);
    setActiveModalTab('basic');
    setFormName('');
    setFormState('Maharashtra');
    setFormDistrict('Nashik');
    setFormBranch('Computer Engineering');
    setFormFees(90000);
    setFormRanking(colleges.length + 1);
    setFormAddress('Gangapur Road, Nashik, Maharashtra');
    setFormPlacement('90% Placement Rate | Max 22 LPA | Avg 5.5 LPA');
    setFormImage(PRESET_CAMPUS_PHOTOS[0].url);
    setFormGalleryImages([
      PRESET_CAMPUS_PHOTOS[0].url,
      PRESET_CAMPUS_PHOTOS[1].url,
      PRESET_CAMPUS_PHOTOS[2].url,
      PRESET_CAMPUS_PHOTOS[3].url,
    ]);
    setFormMeritPdf('college_merit_list.pdf');
    setFormUnivType('Private');
    setFormAutonomous('Yes');
    setFormDesc('Premier engineering institute focused on technological innovation, research, and high placements.');
    setFormEstYear(2005);
    setFormAccreditation("NAAC Grade 'A'");
    setFormHighestPkg('22.5 LPA');
    setFormAvgPkg('5.5 LPA');
    setFormFacilities([
      'High-Speed Wi-Fi Campus',
      'Central Digital Library',
      'Sports Complex & Gym',
      'Boys & Girls Hostel',
    ]);
    setFormCutoffGeneral(88.5);
    setFormContactEmail('info@college.edu.in');
    setFormContactPhone('+91 253 2500000');
    setFormWebsiteUrl('https://college.edu.in');
    setFormBranchFeesList([
      { branch_name: 'Computer Engineering', tuition_fee: 76500, development_fee: 13500, total_fee: 90000, seats: 120 },
      { branch_name: 'Information Technology', tuition_fee: 73800, development_fee: 13500, total_fee: 87300, seats: 60 },
      { branch_name: 'AI & Data Science', tuition_fee: 79200, development_fee: 13500, total_fee: 92700, seats: 60 },
      { branch_name: 'Electronics & Telecomm', tuition_fee: 70200, development_fee: 10800, total_fee: 81000, seats: 60 },
    ]);
    setFormCutoffList([
      { branch: 'Computer Engineering', category: 'GOPEN', round1_percentile: 91.5, round2_percentile: 89.8, round3_percentile: 88.0 },
      { branch: 'Computer Engineering', category: 'OBC', round1_percentile: 88.2, round2_percentile: 86.5, round3_percentile: 85.0 },
      { branch: 'Information Technology', category: 'GOPEN', round1_percentile: 88.0, round2_percentile: 86.2, round3_percentile: 84.5 },
    ]);
    setShowFormModal(true);
  };

  // Open modal for Editing
  const handleOpenEdit = (college: College) => {
    setEditingCollege(college);
    setActiveModalTab('basic');
    setFormName(college.collage_name);
    setFormState(college.state);
    setFormDistrict(college.district);
    setFormBranch(college.branch);
    setFormFees(college.fees);
    setFormRanking(college.ranking);
    setFormAddress(college.address);
    setFormPlacement(college.placement);
    setFormImage(college.image);
    setFormGalleryImages(college.gallery_images && college.gallery_images.length > 0 ? college.gallery_images : [college.image]);
    setFormMeritPdf(college.merit_list_pdf);
    setFormUnivType(college.university_type);
    setFormAutonomous(college.is_autonomous);
    setFormDesc(college.description || '');
    setFormEstYear(college.established_year || 2005);
    setFormAccreditation(college.accreditation || "NAAC Grade 'A'");
    setFormHighestPkg(college.highest_package || '22.5 LPA');
    setFormAvgPkg(college.average_package || '5.5 LPA');
    setFormFacilities(college.facilities || ['High-Speed Wi-Fi Campus', 'Central Digital Library']);
    setFormCutoffGeneral(college.cutoff_general || 88.5);
    setFormContactEmail(college.contact_email || 'info@' + college.collage_name.toLowerCase().replace(/[^a-z]/g, '') + '.edu.in');
    setFormContactPhone(college.contact_phone || '+91 253 2500000');
    setFormWebsiteUrl(college.website_url || 'https://' + college.collage_name.toLowerCase().replace(/[^a-z]/g, '') + '.edu.in');

    // Load Branch Fees
    if (college.branch_fees_list && college.branch_fees_list.length > 0) {
      setFormBranchFeesList(college.branch_fees_list);
    } else {
      setFormBranchFeesList([
        { branch_name: college.branch, tuition_fee: Math.round(college.fees * 0.85), development_fee: Math.round(college.fees * 0.15), total_fee: college.fees, seats: 120 },
        { branch_name: 'Information Technology', tuition_fee: Math.round(college.fees * 0.82), development_fee: Math.round(college.fees * 0.15), total_fee: Math.round(college.fees * 0.97), seats: 60 },
      ]);
    }

    // Load Cutoff List
    if (college.cutoff_list && college.cutoff_list.length > 0) {
      setFormCutoffList(college.cutoff_list);
    } else {
      setFormCutoffList([
        { branch: college.branch, category: 'GOPEN', round1_percentile: college.cutoff_general || 90.0, round2_percentile: (college.cutoff_general || 90.0) - 1.5, round3_percentile: (college.cutoff_general || 90.0) - 3.0 },
        { branch: college.branch, category: 'OBC', round1_percentile: (college.cutoff_general || 90.0) - 2.0, round2_percentile: (college.cutoff_general || 90.0) - 3.5, round3_percentile: (college.cutoff_general || 90.0) - 4.8 },
      ]);
    }

    setShowFormModal(true);
  };

  // Main Image Upload Handler
  const handleMainImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) {
          setFormImage(reader.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Gallery Image Upload Handler
  const handleGalleryFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const filesArray = Array.from(e.target.files) as File[];
      filesArray.forEach((file) => {
        const reader = new FileReader();
        reader.onload = () => {
          if (reader.result) {
            setFormGalleryImages((prev) => [...prev, reader.result as string]);
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  // Remove Gallery Image
  const handleRemoveGalleryImage = (index: number) => {
    setFormGalleryImages((prev) => prev.filter((_, i) => i !== index));
  };

  // Facility Toggle
  const handleToggleFacility = (facility: string) => {
    setFormFacilities((prev) =>
      prev.includes(facility) ? prev.filter((f) => f !== facility) : [...prev, facility]
    );
  };

  // Add Custom Facility
  const handleAddCustomFacility = () => {
    if (customFacilityInput.trim() && !formFacilities.includes(customFacilityInput.trim())) {
      setFormFacilities((prev) => [...prev, customFacilityInput.trim()]);
      setCustomFacilityInput('');
    }
  };

  // Branch Fees Handlers
  const handleAddBranchFeeRow = () => {
    setFormBranchFeesList((prev) => [
      ...prev,
      {
        branch_name: 'Mechanical Engineering',
        tuition_fee: 65000,
        development_fee: 10000,
        total_fee: 75000,
        seats: 60,
      },
    ]);
  };

  const handleUpdateBranchFeeRow = (index: number, field: keyof BranchFee, value: any) => {
    setFormBranchFeesList((prev) => {
      const updated = [...prev];
      const current = { ...updated[index], [field]: value };
      if (field === 'tuition_fee' || field === 'development_fee') {
        current.total_fee = Number(current.tuition_fee || 0) + Number(current.development_fee || 0);
      }
      updated[index] = current;
      return updated;
    });
  };

  const handleRemoveBranchFeeRow = (index: number) => {
    setFormBranchFeesList((prev) => prev.filter((_, i) => i !== index));
  };

  // Cutoff Handlers
  const handleAddCutoffRow = () => {
    setFormCutoffList((prev) => [
      ...prev,
      {
        branch: formBranch || 'Computer Engineering',
        category: 'GOPEN',
        round1_percentile: 88.0,
        round2_percentile: 86.0,
        round3_percentile: 84.0,
      },
    ]);
  };

  const handleUpdateCutoffRow = (index: number, field: keyof CutoffEntry, value: any) => {
    setFormCutoffList((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  const handleRemoveCutoffRow = (index: number) => {
    setFormCutoffList((prev) => prev.filter((_, i) => i !== index));
  };

  // Submit Form
  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();

    const collegeData: Omit<College, 'id'> = {
      collage_name: formName.trim() || 'Engineering Institute',
      state: formState.trim() || 'Maharashtra',
      district: formDistrict.trim() || 'Nashik',
      branch: formBranch.trim() || 'Computer Engineering',
      fees: Number(formFees) || 90000,
      ranking: Number(formRanking) || 1,
      address: formAddress.trim() || 'Campus Address',
      placement: formPlacement.trim() || '90% Placement Rate',
      image: formImage || PRESET_CAMPUS_PHOTOS[0].url,
      merit_list_pdf: formMeritPdf || 'college_merit_list.pdf',
      university_type: formUnivType,
      is_autonomous: formAutonomous,
      gallery_images: formGalleryImages.length > 0 ? formGalleryImages : [formImage],
      description: formDesc || 'Top engineering college with state-of-the-art facilities.',
      established_year: Number(formEstYear) || 2005,
      accreditation: formAccreditation || "NAAC Grade 'A'",
      highest_package: formHighestPkg || '20.0 LPA',
      average_package: formAvgPkg || '5.5 LPA',
      facilities: formFacilities,
      cutoff_general: Number(formCutoffGeneral) || 88.5,
      contact_email: formContactEmail || 'info@college.edu.in',
      contact_phone: formContactPhone || '+91 253 2500000',
      website_url: formWebsiteUrl || 'https://college.edu.in',
      branch_fees_list: formBranchFeesList,
      cutoff_list: formCutoffList,
    };

    if (editingCollege) {
      onUpdateCollege({ ...collegeData, id: editingCollege.id });
    } else {
      onAddCollege(collegeData);
    }

    setShowFormModal(false);
  };

  const filtered = colleges.filter(
    (c) =>
      c.collage_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.district.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.branch.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#020617] text-[#f1f5f9] font-sans pb-24">
      {/* Top Navbar */}
      <nav className="bg-[#0f172a]/90 backdrop-blur-md border-b border-white/10 sticky top-0 z-40 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={onNavigateMain}
              className="flex items-center gap-1.5 text-[#38bdf8] hover:text-sky-300 font-extrabold text-xs uppercase tracking-wider bg-[#1e293b] px-3.5 py-2 rounded-xl border border-sky-500/30 transition"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Catalog</span>
            </button>
            <span className="text-xs font-black uppercase tracking-widest bg-sky-500/20 text-[#38bdf8] border border-sky-500/30 px-3 py-1.5 rounded-lg hidden sm:inline">
              Single Admin Management Panel
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={downloadDatabaseSchemaSql}
              className="btn-sky-bold text-xs px-3.5 py-2 flex items-center gap-1.5 shadow-md"
              title="Download SQL Schema file"
            >
              <Download className="w-4 h-4" />
              <span>Download SQL Schema</span>
            </button>

            <button
              onClick={onLogoutAdmin}
              className="flex items-center gap-1.5 text-xs text-rose-400 hover:text-rose-300 font-extrabold uppercase tracking-wider bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 px-3.5 py-2 rounded-xl transition"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Main Admin Section */}
      <div className="max-w-7xl mx-auto px-4 pt-8 space-y-6">
        {/* Admin Banner */}
        <div className="bg-gradient-to-r from-[#0f172a] via-[#1e293b] to-[#020617] rounded-3xl p-6 sm:p-8 shadow-2xl border border-white/10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-[#38bdf8] text-[#020617] text-xs font-black px-3 py-1 rounded-md uppercase tracking-wider">
                Full CRUD Admin
              </span>
              <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">
                Control College Catalog, Fees & Cutoffs
              </span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-white uppercase tracking-tight">
              Institution Management Dashboard
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Add new colleges, configure branch fee structures, 3-round CAP cutoffs, campus photos & amenities.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleOpenAdd}
              className="btn-sky-bold px-5 py-3 text-xs flex items-center gap-2 uppercase tracking-wider shadow-xl"
            >
              <Plus className="w-4 h-4" />
              <span>Add New College</span>
            </button>
          </div>
        </div>

        {/* Search Bar & Stats */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#0f172a] p-4 rounded-2xl border border-white/10 shadow-xl">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter by college name, district, or branch..."
              className="w-full pl-10 pr-4 py-2 bg-[#1e293b] border border-slate-700 text-white rounded-xl text-xs font-semibold focus:ring-2 focus:ring-[#38bdf8] focus:outline-none"
            />
          </div>

          <div className="text-xs text-slate-400 font-extrabold uppercase tracking-wider">
            Total Managed Colleges: <span className="text-[#38bdf8] font-black">{colleges.length}</span>
          </div>
        </div>

        {/* Colleges Management Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((college) => (
            <div
              key={college.id}
              className="bg-[#0f172a] rounded-3xl p-5 border border-white/10 shadow-xl hover:border-sky-500/40 transition flex flex-col justify-between"
            >
              <div>
                <div className="relative h-44 rounded-2xl overflow-hidden mb-4 border border-slate-700">
                  <img src={college.image} alt={college.collage_name} className="w-full h-full object-cover" />
                  <div className="absolute top-3 left-3 bg-[#38bdf8] text-[#020617] text-[10px] font-black px-2.5 py-1 rounded-md uppercase tracking-wider shadow">
                    Rank #{college.ranking}
                  </div>
                  <div className="absolute top-3 right-3 bg-[#1e293b]/90 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-md border border-slate-700">
                    Estd. {college.established_year || 2004}
                  </div>
                </div>

                <h3 className="font-extrabold text-white text-base line-clamp-1 mb-1">
                  {college.collage_name}
                </h3>
                <p className="text-xs text-[#38bdf8] font-bold mb-3">
                  {college.district}, {college.state} • ₹{college.fees.toLocaleString()}/yr
                </p>

                <div className="text-xs text-slate-400 space-y-1.5 mb-4 bg-[#1e293b] p-3 rounded-xl border border-slate-700/60">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Branch:</span>
                    <span className="text-slate-200 font-bold">{college.branch}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Accreditation:</span>
                    <span className="text-emerald-400 font-bold">{college.accreditation || "NAAC 'A'"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Highest Package:</span>
                    <span className="text-white font-black">{college.highest_package || '20 LPA'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">CAP Cutoff:</span>
                    <span className="text-[#38bdf8] font-black">{college.cutoff_general}%ile</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-3 border-t border-white/10 gap-2">
                <button
                  onClick={() => handleOpenEdit(college)}
                  className="flex-1 py-2.5 bg-[#1e293b] hover:bg-slate-800 text-[#38bdf8] border border-sky-500/30 rounded-xl text-xs font-extrabold uppercase tracking-wider transition flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <Edit className="w-3.5 h-3.5" />
                  <span>Edit College Info</span>
                </button>

                <button
                  onClick={() => setDeleteConfirmId(college.id)}
                  className="py-2.5 px-3 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 rounded-xl text-xs font-extrabold transition flex items-center justify-center"
                  title="Delete College Listing"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add / Edit Comprehensive Modal Form */}
      {showFormModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4">
          <div className="bg-[#0f172a] rounded-3xl max-w-3xl w-full p-5 sm:p-7 shadow-2xl border border-white/10 relative max-h-[92vh] flex flex-col">
            <button
              onClick={() => setShowFormModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white text-sm font-bold bg-[#1e293b] w-8 h-8 rounded-full flex items-center justify-center border border-slate-700"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="mb-4 pr-8">
              <span className="text-[10px] font-black uppercase tracking-widest bg-sky-500/20 text-[#38bdf8] border border-sky-500/30 px-2.5 py-1 rounded-md inline-block mb-1">
                Admin Management Form
              </span>
              <h2 className="text-xl font-black text-white uppercase tracking-tight flex items-center gap-2">
                <Building className="w-5 h-5 text-[#38bdf8]" />
                {editingCollege ? `Edit: ${editingCollege.collage_name}` : 'Create New College Record'}
              </h2>
            </div>

            {/* Modal Tabs Navigation */}
            <div className="bg-[#1e293b] p-1.5 rounded-2xl border border-slate-700/80 flex gap-1 overflow-x-auto mb-4 shrink-0 text-xs">
              {[
                { id: 'basic', label: 'Basic Info', icon: Building },
                { id: 'photos', label: 'Main & Gallery Photos', icon: ImageIcon },
                { id: 'fees', label: 'Branch Fees & Seats', icon: DollarSign },
                { id: 'cutoffs', label: '3-Round Cutoffs', icon: GraduationCap },
                { id: 'placements', label: 'Placements & Amenities', icon: Briefcase },
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveModalTab(tab.id as any)}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-xl font-extrabold uppercase tracking-wider transition shrink-0 ${
                      activeModalTab === tab.id
                        ? 'bg-[#38bdf8] text-[#020617] shadow-md'
                        : 'text-slate-400 hover:text-white hover:bg-[#0f172a]'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            <form onSubmit={handleSubmitForm} className="flex-1 overflow-y-auto space-y-4 pr-1 text-xs">
              {/* TAB 1: BASIC INFORMATION */}
              {activeModalTab === 'basic' && (
                <div className="space-y-3.5">
                  <div>
                    <label className="block text-slate-300 font-extrabold uppercase mb-1">College Full Name</label>
                    <input
                      type="text"
                      required
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      placeholder="e.g. KK Wagh Institute of Engineering Education & Research"
                      className="w-full p-2.5 bg-[#1e293b] border border-slate-700 text-white rounded-xl font-medium focus:ring-2 focus:ring-[#38bdf8] focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-slate-300 font-extrabold uppercase mb-1">State</label>
                      <input
                        type="text"
                        required
                        value={formState}
                        onChange={(e) => setFormState(e.target.value)}
                        className="w-full p-2.5 bg-[#1e293b] border border-slate-700 text-white rounded-xl font-medium"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-300 font-extrabold uppercase mb-1">District / City</label>
                      <input
                        type="text"
                        required
                        value={formDistrict}
                        onChange={(e) => setFormDistrict(e.target.value)}
                        className="w-full p-2.5 bg-[#1e293b] border border-slate-700 text-white rounded-xl font-medium"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-300 font-extrabold uppercase mb-1">State Rank #</label>
                      <input
                        type="number"
                        required
                        value={formRanking}
                        onChange={(e) => setFormRanking(Number(e.target.value))}
                        className="w-full p-2.5 bg-[#1e293b] border border-slate-700 text-white rounded-xl font-medium"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-slate-300 font-extrabold uppercase mb-1">Established Year</label>
                      <input
                        type="number"
                        required
                        value={formEstYear}
                        onChange={(e) => setFormEstYear(Number(e.target.value))}
                        className="w-full p-2.5 bg-[#1e293b] border border-slate-700 text-white rounded-xl font-medium"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-300 font-extrabold uppercase mb-1">Accreditation</label>
                      <input
                        type="text"
                        required
                        value={formAccreditation}
                        onChange={(e) => setFormAccreditation(e.target.value)}
                        placeholder="e.g. NAAC Grade 'A+'"
                        className="w-full p-2.5 bg-[#1e293b] border border-slate-700 text-white rounded-xl font-medium"
                      />
                    </div>

                    <div>
                      <label className="block text-[#38bdf8] font-extrabold uppercase mb-1">General Cutoff (%ile)</label>
                      <input
                        type="number"
                        step="0.1"
                        required
                        value={formCutoffGeneral}
                        onChange={(e) => setFormCutoffGeneral(Number(e.target.value))}
                        className="w-full p-2.5 bg-[#1e293b] border border-slate-700 text-white rounded-xl font-bold"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-slate-300 font-extrabold uppercase mb-1">University Type</label>
                      <select
                        value={formUnivType}
                        onChange={(e) => setFormUnivType(e.target.value as UniversityType)}
                        className="w-full p-2.5 bg-[#1e293b] border border-slate-700 text-white rounded-xl font-medium"
                      >
                        <option value="Private">Private</option>
                        <option value="Government">Government</option>
                        <option value="Semi-Government">Semi-Government</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-slate-300 font-extrabold uppercase mb-1">Autonomous Status</label>
                      <select
                        value={formAutonomous}
                        onChange={(e) => setFormAutonomous(e.target.value as IsAutonomous)}
                        className="w-full p-2.5 bg-[#1e293b] border border-slate-700 text-white rounded-xl font-medium"
                      >
                        <option value="Yes">Yes (Autonomous)</option>
                        <option value="No">No (Affiliated)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-slate-300 font-extrabold uppercase mb-1">Primary Branch</label>
                      <input
                        type="text"
                        required
                        value={formBranch}
                        onChange={(e) => setFormBranch(e.target.value)}
                        className="w-full p-2.5 bg-[#1e293b] border border-slate-700 text-white rounded-xl font-medium"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-300 font-extrabold uppercase mb-1">Campus Full Address</label>
                    <input
                      type="text"
                      required
                      value={formAddress}
                      onChange={(e) => setFormAddress(e.target.value)}
                      className="w-full p-2.5 bg-[#1e293b] border border-slate-700 text-white rounded-xl font-medium"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-slate-300 font-extrabold uppercase mb-1">Contact Email</label>
                      <input
                        type="email"
                        value={formContactEmail}
                        onChange={(e) => setFormContactEmail(e.target.value)}
                        className="w-full p-2.5 bg-[#1e293b] border border-slate-700 text-white rounded-xl font-medium"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-300 font-extrabold uppercase mb-1">Contact Phone</label>
                      <input
                        type="text"
                        value={formContactPhone}
                        onChange={(e) => setFormContactPhone(e.target.value)}
                        className="w-full p-2.5 bg-[#1e293b] border border-slate-700 text-white rounded-xl font-medium"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-300 font-extrabold uppercase mb-1">Official Website URL</label>
                      <input
                        type="url"
                        value={formWebsiteUrl}
                        onChange={(e) => setFormWebsiteUrl(e.target.value)}
                        className="w-full p-2.5 bg-[#1e293b] border border-slate-700 text-white rounded-xl font-medium"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-300 font-extrabold uppercase mb-1">Description / Overview</label>
                    <textarea
                      rows={3}
                      value={formDesc}
                      onChange={(e) => setFormDesc(e.target.value)}
                      className="w-full p-2.5 bg-[#1e293b] border border-slate-700 text-white rounded-xl font-medium"
                    />
                  </div>
                </div>
              )}

              {/* TAB 2: MAIN CARD PHOTO & GALLERY PHOTOS */}
              {activeModalTab === 'photos' && (
                <div className="space-y-6">
                  {/* Main Card Photo Picker */}
                  <div className="bg-[#1e293b] p-4 rounded-2xl border border-slate-700 space-y-3">
                    <h4 className="font-extrabold text-white text-sm uppercase tracking-wide flex items-center gap-2">
                      <ImageIcon className="w-4 h-4 text-[#38bdf8]" />
                      Main Card Photo Image
                    </h4>
                    <p className="text-slate-400 text-[11px]">
                      Upload a photo directly from your device or select from standard campus presets.
                    </p>

                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                      {/* Live Image Preview Box */}
                      <div className="w-full sm:w-48 h-28 rounded-xl overflow-hidden border border-slate-600 bg-black shrink-0 relative">
                        <img src={formImage} alt="Main preview" className="w-full h-full object-cover" />
                        <span className="absolute bottom-1 right-1 bg-black/70 text-[9px] text-white px-1.5 py-0.5 rounded font-mono">
                          Active Photo
                        </span>
                      </div>

                      <div className="flex-1 space-y-2">
                        <label className="btn-sky-bold text-xs py-2 px-4 inline-flex items-center gap-2 cursor-pointer uppercase tracking-wider">
                          <Upload className="w-4 h-4" />
                          <span>Upload Photo File</span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleMainImageFileChange}
                            className="hidden"
                          />
                        </label>
                        <p className="text-[10px] text-slate-400">Supported: JPG, PNG, WEBP</p>
                      </div>
                    </div>

                    {/* Presets Grid */}
                    <div className="pt-2 border-t border-slate-700/60">
                      <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block mb-2">
                        Or Pick Standard Preset Campus Photo:
                      </span>
                      <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                        {PRESET_CAMPUS_PHOTOS.map((preset, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => setFormImage(preset.url)}
                            className={`relative h-16 rounded-lg overflow-hidden border-2 transition ${
                              formImage === preset.url ? 'border-[#38bdf8] ring-2 ring-sky-400/50' : 'border-slate-700 opacity-70 hover:opacity-100'
                            }`}
                          >
                            <img src={preset.url} alt={preset.label} className="w-full h-full object-cover" />
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Campus Gallery Photos Upload & Manage */}
                  <div className="bg-[#1e293b] p-4 rounded-2xl border border-slate-700 space-y-3">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-extrabold text-white text-sm uppercase tracking-wide flex items-center gap-2">
                          <Sparkles className="w-4 h-4 text-[#38bdf8]" />
                          Campus Gallery Photos ({formGalleryImages.length})
                        </h4>
                        <p className="text-slate-400 text-[11px]">
                          Add photos to the college detail gallery. Upload custom photos directly.
                        </p>
                      </div>

                      <label className="btn-sky-bold text-xs py-2 px-3 inline-flex items-center gap-1.5 cursor-pointer uppercase tracking-wider">
                        <Upload className="w-3.5 h-3.5" />
                        <span>Add Photos</span>
                        <input
                          type="file"
                          accept="image/*"
                          multiple
                          onChange={handleGalleryFilesChange}
                          className="hidden"
                        />
                      </label>
                    </div>

                    {/* Gallery Thumbnails List */}
                    {formGalleryImages.length > 0 ? (
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                        {formGalleryImages.map((imgUrl, idx) => (
                          <div
                            key={idx}
                            className="relative h-24 rounded-xl overflow-hidden border border-slate-600 group bg-black"
                          >
                            <img src={imgUrl} alt={`Gallery photo ${idx + 1}`} className="w-full h-full object-cover" />
                            <button
                              type="button"
                              onClick={() => handleRemoveGalleryImage(idx)}
                              className="absolute top-1.5 right-1.5 bg-rose-600 text-white p-1 rounded-lg opacity-90 hover:opacity-100 transition shadow"
                              title="Delete photo"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-xs text-slate-400 py-4 text-center">No gallery photos added yet.</p>
                    )}
                  </div>
                </div>
              )}

              {/* TAB 3: BRANCH / DISCIPLINE FEE STRUCTURE */}
              {activeModalTab === 'fees' && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center bg-[#1e293b] p-3 rounded-2xl border border-slate-700">
                    <div>
                      <h4 className="font-extrabold text-white text-sm uppercase tracking-wide">
                        Branch / Discipline Fee Structure
                      </h4>
                      <p className="text-slate-400 text-[11px]">
                        Define Tuition Fee, Development Fee, and Intake Seats for every branch.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={handleAddBranchFeeRow}
                      className="btn-sky-bold text-xs px-3 py-1.5 flex items-center gap-1 uppercase tracking-wider"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Branch</span>
                    </button>
                  </div>

                  <div className="space-y-3">
                    {formBranchFeesList.map((bf, idx) => (
                      <div
                        key={idx}
                        className="p-3 bg-[#1e293b] rounded-2xl border border-slate-700 space-y-2"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-black text-[#38bdf8] uppercase tracking-wider">
                            Branch #{idx + 1}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleRemoveBranchFeeRow(idx)}
                            className="text-rose-400 hover:text-rose-300 font-bold text-xs flex items-center gap-1"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Remove</span>
                          </button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-5 gap-2">
                          <div className="sm:col-span-2">
                            <label className="block text-[10px] text-slate-400 font-bold uppercase mb-0.5">
                              Branch / Discipline Name
                            </label>
                            <input
                              type="text"
                              value={bf.branch_name}
                              onChange={(e) => handleUpdateBranchFeeRow(idx, 'branch_name', e.target.value)}
                              placeholder="Branch name"
                              className="w-full p-2 bg-[#0f172a] border border-slate-700 text-white rounded-lg text-xs font-bold"
                            />
                          </div>

                          <div>
                            <label className="block text-[10px] text-slate-400 font-bold uppercase mb-0.5">
                              Tuition Fee (₹)
                            </label>
                            <input
                              type="number"
                              value={bf.tuition_fee}
                              onChange={(e) => handleUpdateBranchFeeRow(idx, 'tuition_fee', Number(e.target.value))}
                              className="w-full p-2 bg-[#0f172a] border border-slate-700 text-white rounded-lg text-xs font-bold"
                            />
                          </div>

                          <div>
                            <label className="block text-[10px] text-slate-400 font-bold uppercase mb-0.5">
                              Dev Fee (₹)
                            </label>
                            <input
                              type="number"
                              value={bf.development_fee}
                              onChange={(e) => handleUpdateBranchFeeRow(idx, 'development_fee', Number(e.target.value))}
                              className="w-full p-2 bg-[#0f172a] border border-slate-700 text-white rounded-lg text-xs font-bold"
                            />
                          </div>

                          <div>
                            <label className="block text-[10px] text-[#38bdf8] font-bold uppercase mb-0.5">
                              Intake Seats
                            </label>
                            <input
                              type="number"
                              value={bf.seats}
                              onChange={(e) => handleUpdateBranchFeeRow(idx, 'seats', Number(e.target.value))}
                              className="w-full p-2 bg-[#0f172a] border border-slate-700 text-white rounded-lg text-xs font-bold"
                            />
                          </div>
                        </div>

                        <div className="text-right text-[11px] font-extrabold text-[#38bdf8]">
                          Total Annual Fee: ₹{bf.total_fee.toLocaleString()}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 4: 3-ROUND CAP CUTOFFS */}
              {activeModalTab === 'cutoffs' && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center bg-[#1e293b] p-3 rounded-2xl border border-slate-700">
                    <div>
                      <h4 className="font-extrabold text-white text-sm uppercase tracking-wide">
                        3-Round CAP Cutoffs Configuration
                      </h4>
                      <p className="text-slate-400 text-[11px]">
                        Add cutoff percentiles for Round 1, Round 2, and Round 3 for each branch & category.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={handleAddCutoffRow}
                      className="btn-sky-bold text-xs px-3 py-1.5 flex items-center gap-1 uppercase tracking-wider"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Cutoff</span>
                    </button>
                  </div>

                  <div className="space-y-3">
                    {formCutoffList.map((c, idx) => (
                      <div
                        key={idx}
                        className="p-3 bg-[#1e293b] rounded-2xl border border-slate-700 space-y-2"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-black text-[#38bdf8] uppercase tracking-wider">
                            Cutoff Entry #{idx + 1}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleRemoveCutoffRow(idx)}
                            className="text-rose-400 hover:text-rose-300 font-bold text-xs flex items-center gap-1"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Remove</span>
                          </button>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                          <div className="col-span-2 sm:col-span-1">
                            <label className="block text-[10px] text-slate-400 font-bold uppercase mb-0.5">
                              Branch
                            </label>
                            <input
                              type="text"
                              value={c.branch}
                              onChange={(e) => handleUpdateCutoffRow(idx, 'branch', e.target.value)}
                              className="w-full p-2 bg-[#0f172a] border border-slate-700 text-white rounded-lg text-xs font-bold"
                            />
                          </div>

                          <div>
                            <label className="block text-[10px] text-slate-400 font-bold uppercase mb-0.5">
                              Category
                            </label>
                            <select
                              value={c.category}
                              onChange={(e) => handleUpdateCutoffRow(idx, 'category', e.target.value)}
                              className="w-full p-2 bg-[#0f172a] border border-slate-700 text-white rounded-lg text-xs font-bold"
                            >
                              <option value="GOPEN">GOPEN</option>
                              <option value="OBC">OBC</option>
                              <option value="SC">SC</option>
                              <option value="ST">ST</option>
                              <option value="EWS">EWS</option>
                              <option value="TFWS">TFWS</option>
                            </select>
                          </div>

                          <div>
                            <label className="block text-[10px] text-emerald-400 font-bold uppercase mb-0.5">
                              Round 1 (%ile)
                            </label>
                            <input
                              type="number"
                              step="0.1"
                              value={c.round1_percentile}
                              onChange={(e) => handleUpdateCutoffRow(idx, 'round1_percentile', Number(e.target.value))}
                              className="w-full p-2 bg-[#0f172a] border border-slate-700 text-white rounded-lg text-xs font-bold"
                            />
                          </div>

                          <div>
                            <label className="block text-[10px] text-slate-300 font-bold uppercase mb-0.5">
                              Round 2 (%ile)
                            </label>
                            <input
                              type="number"
                              step="0.1"
                              value={c.round2_percentile}
                              onChange={(e) => handleUpdateCutoffRow(idx, 'round2_percentile', Number(e.target.value))}
                              className="w-full p-2 bg-[#0f172a] border border-slate-700 text-white rounded-lg text-xs font-bold"
                            />
                          </div>

                          <div>
                            <label className="block text-[10px] text-slate-400 font-bold uppercase mb-0.5">
                              Round 3 (%ile)
                            </label>
                            <input
                              type="number"
                              step="0.1"
                              value={c.round3_percentile}
                              onChange={(e) => handleUpdateCutoffRow(idx, 'round3_percentile', Number(e.target.value))}
                              className="w-full p-2 bg-[#0f172a] border border-slate-700 text-white rounded-lg text-xs font-bold"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 5: PLACEMENTS & CAMPUS AMENITIES */}
              {activeModalTab === 'placements' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-300 font-extrabold uppercase mb-1">Highest Package</label>
                      <input
                        type="text"
                        value={formHighestPkg}
                        onChange={(e) => setFormHighestPkg(e.target.value)}
                        placeholder="e.g. 24.0 LPA"
                        className="w-full p-2.5 bg-[#1e293b] border border-slate-700 text-white rounded-xl font-bold text-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-300 font-extrabold uppercase mb-1">Average Package</label>
                      <input
                        type="text"
                        value={formAvgPkg}
                        onChange={(e) => setFormAvgPkg(e.target.value)}
                        placeholder="e.g. 6.5 LPA"
                        className="w-full p-2.5 bg-[#1e293b] border border-slate-700 text-white rounded-xl font-bold text-xs"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-300 font-extrabold uppercase mb-1">Placement Summary Line</label>
                    <input
                      type="text"
                      value={formPlacement}
                      onChange={(e) => setFormPlacement(e.target.value)}
                      className="w-full p-2.5 bg-[#1e293b] border border-slate-700 text-white rounded-xl font-medium text-xs"
                    />
                  </div>

                  {/* Amenities / Infrastructure Checklist */}
                  <div className="bg-[#1e293b] p-4 rounded-2xl border border-slate-700 space-y-3">
                    <h4 className="font-extrabold text-white text-sm uppercase tracking-wide">
                      Campus Infrastructure & Amenities
                    </h4>
                    <p className="text-slate-400 text-[11px]">
                      Select standard amenities or add custom infrastructure features.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {STANDARD_FACILITIES.map((facility, idx) => {
                        const isChecked = formFacilities.includes(facility);
                        return (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => handleToggleFacility(facility)}
                            className={`flex items-center gap-2 p-2.5 rounded-xl border text-left transition text-xs font-bold ${
                              isChecked
                                ? 'bg-sky-500/20 text-[#38bdf8] border-sky-500/40'
                                : 'bg-[#0f172a] text-slate-400 border-slate-700 hover:text-slate-200'
                            }`}
                          >
                            {isChecked ? (
                              <CheckSquare className="w-4 h-4 text-[#38bdf8] shrink-0" />
                            ) : (
                              <Square className="w-4 h-4 text-slate-500 shrink-0" />
                            )}
                            <span>{facility}</span>
                          </button>
                        );
                      })}
                    </div>

                    {/* Add Custom Amenity */}
                    <div className="pt-2 flex gap-2">
                      <input
                        type="text"
                        value={customFacilityInput}
                        onChange={(e) => setCustomFacilityInput(e.target.value)}
                        placeholder="Add custom facility (e.g. Incubation Hub)..."
                        className="flex-1 p-2 bg-[#0f172a] border border-slate-700 text-white rounded-xl text-xs"
                      />
                      <button
                        type="button"
                        onClick={handleAddCustomFacility}
                        className="btn-sky-bold text-xs px-4 py-2 shrink-0 uppercase tracking-wider"
                      >
                        Add
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Submit / Cancel Buttons */}
              <div className="pt-4 border-t border-white/10 flex justify-between items-center gap-3">
                <div className="text-[11px] text-slate-400 font-bold">
                  All fields saved directly into active catalog.
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setShowFormModal(false)}
                    className="px-4 py-2.5 border border-slate-700 rounded-xl font-bold text-slate-300 bg-[#1e293b] hover:bg-slate-800 transition text-xs uppercase"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn-sky-bold px-6 py-2.5 font-black uppercase tracking-wider text-xs shadow-lg"
                  >
                    {editingCollege ? 'Save All College Info' : 'Create College Record'}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmId !== null && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#0f172a] rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-rose-500/30 text-center space-y-4">
            <div className="w-12 h-12 bg-rose-500/10 text-rose-400 rounded-2xl flex items-center justify-center mx-auto border border-rose-500/20">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-black text-white uppercase tracking-tight">Delete College Listing?</h3>
            <p className="text-xs text-slate-400">
              This action will permanently remove the college, its branch fee structure, and cutoffs from the catalog.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="w-1/2 py-2.5 bg-[#1e293b] text-slate-300 font-bold rounded-xl text-xs uppercase"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  onDeleteCollege(deleteConfirmId);
                  setDeleteConfirmId(null);
                }}
                className="w-1/2 py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-black rounded-xl text-xs uppercase tracking-wider shadow-lg"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
