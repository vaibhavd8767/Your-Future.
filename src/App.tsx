import React, { useState, useMemo } from 'react';
import { ActivePage, FilterState, UserProfile, College } from './types';
import { INITIAL_COLLEGES } from './data/mockColleges';
import { ThreeBackground } from './components/ThreeBackground';
import { LoginPage } from './components/LoginPage';
import { MainCatalog } from './components/MainCatalog';
import { CollegeDetail } from './components/CollegeDetail';
import { ProfileComponent } from './components/ProfileComponent';
import { AdminDashboard } from './components/AdminDashboard';
import { LogoutModal } from './components/LogoutModal';

const DEFAULT_FILTERS: FilterState = {
  searchQuery: '',
  selectedState: '',
  selectedDistrict: '',
  selectedBranch: '',
  universityType: '',
  isAutonomous: '',
  maxFees: 200000,
  sortBy: 'ranking_asc',
};

export default function App() {
  // Navigation Page State (Remember login page first!)
  const [activePage, setActivePage] = useState<ActivePage>('login');
  
  // Colleges State (Dynamic for Admin CRUD)
  const [collegesList, setCollegesList] = useState<College[]>(INITIAL_COLLEGES);

  const [selectedCollegeId, setSelectedCollegeId] = useState<number>(1);
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);
  const [savedCollegeIds, setSavedCollegeIds] = useState<number[]>([1, 2, 5]);
  const [showLogoutModal, setShowLogoutModal] = useState<boolean>(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(false);

  // Candidate Profile Object
  const [userProfile, setUserProfile] = useState<UserProfile>({
    name: 'Vaibhav Dangle',
    email: 'danglevaibhav87@gmail.com',
    phone: '+91 98765 43210',
    preferredBranch: 'Computer Engineering',
    currentPercentile: 96.45,
    savedCollegeIds: [1, 2, 5],
    applicationsSubmitted: 2,
    avatarUrl: '',
  });

  // Candidate Login Handler
  const handleStudentLogin = (email: string, name: string) => {
    setUserProfile((prev) => ({
      ...prev,
      email: email || prev.email,
      name: name || prev.name,
    }));
    setActivePage('main');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Admin Login Handler
  const handleAdminLogin = () => {
    setIsAdminLoggedIn(true);
    setActivePage('admin');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Admin CRUD Handlers
  const handleAddCollege = (newCollegeData: Omit<College, 'id'>) => {
    const nextId = Math.max(...collegesList.map((c) => c.id), 0) + 1;
    const newCollege: College = { ...newCollegeData, id: nextId };
    setCollegesList((prev) => [newCollege, ...prev]);
  };

  const handleUpdateCollege = (updatedCollege: College) => {
    setCollegesList((prev) =>
      prev.map((c) => (c.id === updatedCollege.id ? updatedCollege : c))
    );
  };

  const handleDeleteCollege = (id: number) => {
    setCollegesList((prev) => prev.filter((c) => c.id !== id));
    setSavedCollegeIds((prev) => prev.filter((savedId) => savedId !== id));
  };

  // Shortlist Toggle
  const handleToggleSave = (id: number) => {
    setSavedCollegeIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Filtered and Sorted College List
  const filteredColleges = useMemo(() => {
    return collegesList
      .filter((college) => {
        if (filters.searchQuery.trim()) {
          const query = filters.searchQuery.toLowerCase();
          const matchName = college.collage_name.toLowerCase().includes(query);
          const matchDistrict = college.district.toLowerCase().includes(query);
          const matchState = college.state.toLowerCase().includes(query);
          const matchBranch = college.branch.toLowerCase().includes(query);
          if (!matchName && !matchDistrict && !matchState && !matchBranch) {
            return false;
          }
        }

        if (filters.selectedState && college.state !== filters.selectedState) return false;
        if (filters.selectedDistrict && college.district !== filters.selectedDistrict) return false;
        if (
          filters.selectedBranch &&
          !college.branch.toLowerCase().includes(filters.selectedBranch.toLowerCase())
        ) {
          return false;
        }
        if (filters.universityType && college.university_type !== filters.universityType) return false;
        if (filters.isAutonomous && college.is_autonomous !== filters.isAutonomous) return false;
        if (college.fees > filters.maxFees) return false;

        return true;
      })
      .sort((a, b) => {
        if (filters.sortBy === 'ranking_asc') return a.ranking - b.ranking;
        if (filters.sortBy === 'ranking_desc') return b.ranking - a.ranking;
        if (filters.sortBy === 'fees_low') return a.fees - b.fees;
        if (filters.sortBy === 'fees_high') return b.fees - a.fees;
        if (filters.sortBy === 'name_asc') return a.collage_name.localeCompare(b.collage_name);
        if (filters.sortBy === 'est_year_desc') return (a.established_year || 2000) - (b.established_year || 2000);
        if (filters.sortBy === 'est_year_asc') return (b.established_year || 2000) - (a.established_year || 2000);
        return 0;
      });
  }, [filters, collegesList]);

  // Selected College Object
  const selectedCollege = useMemo(() => {
    return collegesList.find((c) => c.id === selectedCollegeId) || collegesList[0] || INITIAL_COLLEGES[0];
  }, [selectedCollegeId, collegesList]);

  // Saved Colleges Objects
  const savedColleges = useMemo(() => {
    return collegesList.filter((c) => savedCollegeIds.includes(c.id));
  }, [savedCollegeIds, collegesList]);

  return (
    <div className="relative min-h-screen bg-[#020617] font-sans text-[#f1f5f9] antialiased selection:bg-sky-500 selection:text-slate-950">
      {/* 3D Interactive Background */}
      <ThreeBackground intensity="subtle" interactive={true} />

      <div className="relative z-10">
        {/* PAGE 1: Login Page (Default) */}
        {activePage === 'login' && (
          <LoginPage
            onStudentLogin={handleStudentLogin}
            onAdminLogin={handleAdminLogin}
          />
        )}

        {/* PAGE 2: Main Catalog Directory */}
        {activePage === 'main' && (
          <MainCatalog
            colleges={filteredColleges}
            filters={filters}
            onFilterChange={setFilters}
            onResetFilters={() => setFilters(DEFAULT_FILTERS)}
            onSelectCollege={(id) => {
              setSelectedCollegeId(id);
              setActivePage('college_detail');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onNavigateProfile={() => {
              setActivePage('profile');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onNavigateAdmin={() => {
              if (isAdminLoggedIn) {
                setActivePage('admin');
              } else {
                setActivePage('login');
              }
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenLogout={() => setShowLogoutModal(true)}
            savedCollegeIds={savedCollegeIds}
            onToggleSave={handleToggleSave}
            isAdminLoggedIn={isAdminLoggedIn}
          />
        )}

        {/* PAGE 3: College Detail View */}
        {activePage === 'college_detail' && (
          <CollegeDetail
            college={selectedCollege}
            onNavigateMain={() => {
              setActivePage('main');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            isSaved={savedCollegeIds.includes(selectedCollege.id)}
            onToggleSave={handleToggleSave}
          />
        )}

        {/* PAGE 4: Student Profile View */}
        {activePage === 'profile' && (
          <ProfileComponent
            user={{ ...userProfile, savedCollegeIds }}
            savedColleges={savedColleges}
            onSelectCollege={(id) => {
              setSelectedCollegeId(id);
              setActivePage('college_detail');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onNavigateMain={() => {
              setActivePage('main');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onLogout={() => setShowLogoutModal(true)}
          />
        )}

        {/* PAGE 5: Single Admin Dashboard */}
        {activePage === 'admin' && (
          <AdminDashboard
            colleges={collegesList}
            onAddCollege={handleAddCollege}
            onUpdateCollege={handleUpdateCollege}
            onDeleteCollege={handleDeleteCollege}
            onLogoutAdmin={() => {
              setIsAdminLoggedIn(false);
              setActivePage('login');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onNavigateMain={() => {
              setActivePage('main');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}
      </div>

      {/* Logout Action Modal */}
      {showLogoutModal && (
        <LogoutModal
          onConfirmLogout={() => {
            setShowLogoutModal(false);
            setIsAdminLoggedIn(false);
            setActivePage('login');
          }}
          onCancel={() => setShowLogoutModal(false)}
        />
      )}
    </div>
  );
}
