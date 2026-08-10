import { College } from '../types';

export const INITIAL_COLLEGES: College[] = [
  {
    id: 1,
    collage_name: "S.N.J.B COLLAGE OF CHANDWAD",
    state: "Maharashtra",
    district: "Nashik",
    branch: "Computer Engineering",
    fees: 88000,
    ranking: 1,
    address: "Neminagar, Chandwad, Dist. Nashik, Maharashtra - 423101",
    placement: "92% Placement Rate | Max 22.5 LPA | Avg 5.2 LPA",
    image: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=1000",
    merit_list_pdf: "snjb_merit_list_2025.pdf",
    university_type: "Private",
    is_autonomous: "Yes",
    gallery_images: [
      "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?auto=format&fit=crop&q=80&w=800"
    ],
    description: "SNJB's Late Sau. Kantabai Bhavarlalji Jain College of Engineering is a premier institute located in Chandwad, Nashik. Known for excellence in Computer Engineering, AI & Data Science, and Robotics.",
    established_year: 2004,
    accreditation: "NAAC Grade 'A' | NBA Accredited",
    highest_package: "22.5 LPA",
    average_package: "5.2 LPA",
    facilities: ["3D Printing Lab", "Central Library", "High-Speed Wi-Fi", "Separate Hostels", "Sports Complex", "Robotics Incubation Center"],
    cutoff_general: 91.5,
    contact_email: "principal@snjb.org",
    contact_phone: "+91 2556 252201",
    website_url: "https://www.snjb.org/engineering",
    branch_fees_list: [
      { branch_name: "Computer Engineering", tuition_fee: 78000, development_fee: 10000, total_fee: 88000, seats: 120 },
      { branch_name: "Information Technology", tuition_fee: 75000, development_fee: 10000, total_fee: 85000, seats: 60 },
      { branch_name: "Artificial Intelligence & Data Science", tuition_fee: 80000, development_fee: 10000, total_fee: 90000, seats: 60 },
      { branch_name: "Electronics & Telecommunication", tuition_fee: 70000, development_fee: 8000, total_fee: 78000, seats: 60 },
      { branch_name: "Mechanical Engineering", tuition_fee: 65000, development_fee: 8000, total_fee: 73000, seats: 60 },
      { branch_name: "Civil Engineering", tuition_fee: 62000, development_fee: 8000, total_fee: 70000, seats: 60 }
    ],
    cutoff_list: [
      { branch: "Computer Engineering", category: "GOPEN", round1_percentile: 91.5, round2_percentile: 89.8, round3_percentile: 88.5 },
      { branch: "Computer Engineering", category: "OBC", round1_percentile: 89.2, round2_percentile: 87.5, round3_percentile: 86.0 },
      { branch: "Computer Engineering", category: "SC", round1_percentile: 81.0, round2_percentile: 79.5, round3_percentile: 78.0 },
      { branch: "Computer Engineering", category: "ST", round1_percentile: 72.5, round2_percentile: 70.0, round3_percentile: 68.5 },
      { branch: "Computer Engineering", category: "EWS", round1_percentile: 90.8, round2_percentile: 88.9, round3_percentile: 87.8 },
      { branch: "Information Technology", category: "GOPEN", round1_percentile: 88.4, round2_percentile: 86.5, round3_percentile: 85.0 },
      { branch: "AI & Data Science", category: "GOPEN", round1_percentile: 89.9, round2_percentile: 88.0, round3_percentile: 86.8 },
      { branch: "Electronics & Telecomm", category: "GOPEN", round1_percentile: 78.5, round2_percentile: 76.2, round3_percentile: 74.5 }
    ]
  },
  {
    id: 2,
    collage_name: "K.K. Wagh Institute of Engineering Education and Research (KKWIEER)",
    state: "Maharashtra",
    district: "Nashik",
    branch: "Information Technology",
    fees: 135000,
    ranking: 2,
    address: "Hirabai Haridas Vidyanagari, Amrutdham, Panchavati, Nashik, Maharashtra - 422003",
    placement: "95% Placement Rate | Max 43 LPA | Avg 6.8 LPA",
    image: "https://images.unsplash.com/photo-1592280771190-3e2e4d571952?auto=format&fit=crop&q=80&w=1000",
    merit_list_pdf: "kkwagh_merit_cutoff_2025.pdf",
    university_type: "Private",
    is_autonomous: "Yes",
    gallery_images: [
      "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800"
    ],
    description: "KKWIEER is one of the oldest and most distinguished engineering institutes in North Maharashtra with top-tier industrial tie-ups with TCS, NVIDIA, and Bosch.",
    established_year: 1984,
    accreditation: "NAAC A+ Grade",
    highest_package: "43.0 LPA",
    average_package: "6.8 LPA",
    facilities: ["NVIDIA AI Supercomputing Lab", "Auditorium", "Digital Library", "Gymnasium", "Placement Cell"],
    cutoff_general: 96.2,
    contact_email: "kkwieer@kkwagh.edu.in",
    contact_phone: "+91 253 2512876",
    website_url: "https://engg.kkwagh.edu.in",
    branch_fees_list: [
      { branch_name: "Computer Engineering", tuition_fee: 120000, development_fee: 15000, total_fee: 135000, seats: 120 },
      { branch_name: "Information Technology", tuition_fee: 118000, development_fee: 14000, total_fee: 132000, seats: 120 },
      { branch_name: "AI & Data Science", tuition_fee: 122000, development_fee: 15000, total_fee: 137000, seats: 60 },
      { branch_name: "Robotics & Automation", tuition_fee: 110000, development_fee: 12000, total_fee: 122000, seats: 60 },
      { branch_name: "Chemical Engineering", tuition_fee: 98000, development_fee: 10000, total_fee: 108000, seats: 60 },
      { branch_name: "Electrical Engineering", tuition_fee: 100000, development_fee: 10000, total_fee: 110000, seats: 120 }
    ],
    cutoff_list: [
      { branch: "Computer Engineering", category: "GOPEN", round1_percentile: 96.2, round2_percentile: 95.1, round3_percentile: 94.2 },
      { branch: "Information Technology", category: "GOPEN", round1_percentile: 94.8, round2_percentile: 93.5, round3_percentile: 92.8 },
      { branch: "AI & Data Science", category: "GOPEN", round1_percentile: 95.5, round2_percentile: 94.2, round3_percentile: 93.5 },
      { branch: "Robotics & Automation", category: "GOPEN", round1_percentile: 89.2, round2_percentile: 87.8, round3_percentile: 86.5 }
    ]
  },
  {
    id: 3,
    collage_name: "K.R.T. Arts, B.H. Commerce and A.M. Science College (KTHM)",
    state: "Maharashtra",
    district: "Nashik",
    branch: "Computer Science & Science",
    fees: 32000,
    ranking: 3,
    address: "Gangapur Road, Shivajinagar, Nashik, Maharashtra - 422002",
    placement: "85% Placement Rate | Max 12 LPA | Avg 4.1 LPA",
    image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=1000",
    merit_list_pdf: "kthm_prospectus_merit.pdf",
    university_type: "Semi-Government",
    is_autonomous: "Yes",
    gallery_images: [
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1592280771190-3e2e4d571952?auto=format&fit=crop&q=80&w=800"
    ],
    description: "KTHM College Nashik is a landmark multidisciplinary institution situated on the picturesque banks of the Godavari river offering UG, PG, and PhD programs.",
    established_year: 1969,
    accreditation: "NAAC A++ Grade (CGPA 3.79)",
    highest_package: "12.0 LPA",
    average_package: "4.1 LPA",
    facilities: ["Riverfront Campus", "Science Research Center", "Astronomical Observatory", "Sports Stadium"],
    cutoff_general: 88.0,
    contact_email: "principal@kthmcollege.ac.in",
    contact_phone: "+91 253 2571376",
    website_url: "https://kthmcollege.ac.in",
    branch_fees_list: [
      { branch_name: "B.Sc. Computer Science", tuition_fee: 28000, development_fee: 4000, total_fee: 32000, seats: 120 },
      { branch_name: "M.Sc. Computer Science", tuition_fee: 35000, development_fee: 5000, total_fee: 40000, seats: 60 },
      { branch_name: "B.C.A. (Computer Applications)", tuition_fee: 30000, development_fee: 4000, total_fee: 34000, seats: 120 },
      { branch_name: "B.Sc. Biotechnology", tuition_fee: 32000, development_fee: 5000, total_fee: 37000, seats: 60 }
    ],
    cutoff_list: [
      { branch: "B.Sc. Computer Science", category: "GOPEN", round1_percentile: 88.0, round2_percentile: 85.5, round3_percentile: 83.2 },
      { branch: "B.C.A.", category: "GOPEN", round1_percentile: 84.5, round2_percentile: 82.0, round3_percentile: 80.0 }
    ]
  },
  {
    id: 4,
    collage_name: "Parul University",
    state: "Gujarat",
    district: "Vadodara",
    branch: "Artificial Intelligence & ML",
    fees: 149000,
    ranking: 4,
    address: "P.O.Limda, Ta.Waghodia, Vadodara, Gujarat - 391760",
    placement: "94% Placed | Max 30 LPA | 2000+ Recruiters",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=1000",
    merit_list_pdf: "parul_admission_merit.pdf",
    university_type: "Private",
    is_autonomous: "Yes",
    gallery_images: [
      "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?auto=format&fit=crop&q=80&w=800"
    ],
    description: "Parul University is a NAAC A++ accredited multidisciplinary university with over 150+ acres ultra-modern campus featuring international student exchanges and incubation hubs.",
    established_year: 2009,
    accreditation: "NAAC A++ Grade | UGC Recognized",
    highest_package: "30.0 LPA",
    average_package: "5.5 LPA",
    facilities: ["Multi-specialty Hospital on Campus", "Global Student Lounge", "Startup Incubation Center", "Indoor Stadium"],
    cutoff_general: 82.0,
    contact_email: "admissions@paruluniversity.ac.in",
    contact_phone: "+91 2668 260300",
    website_url: "https://paruluniversity.ac.in",
    branch_fees_list: [
      { branch_name: "B.Tech Computer Science", tuition_fee: 130000, development_fee: 19000, total_fee: 149000, seats: 240 },
      { branch_name: "B.Tech AI & Machine Learning", tuition_fee: 135000, development_fee: 20000, total_fee: 155000, seats: 120 },
      { branch_name: "B.Tech Cyber Security", tuition_fee: 132000, development_fee: 18000, total_fee: 150000, seats: 60 }
    ],
    cutoff_list: [
      { branch: "B.Tech Computer Science", category: "GOPEN", round1_percentile: 82.0, round2_percentile: 79.5, round3_percentile: 77.0 },
      { branch: "B.Tech AI & ML", category: "GOPEN", round1_percentile: 80.5, round2_percentile: 78.0, round3_percentile: 75.2 }
    ]
  },
  {
    id: 5,
    collage_name: "COEP Technological University (College of Engineering Pune)",
    state: "Maharashtra",
    district: "Pune",
    branch: "Computer Engineering & Electronics",
    fees: 95000,
    ranking: 5,
    address: "Wellesley Rd, Shivajinagar, Pune, Maharashtra - 411005",
    placement: "98% Placed | Max 50.5 LPA | Avg 11.2 LPA",
    image: "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?auto=format&fit=crop&q=80&w=1000",
    merit_list_pdf: "coep_cap_merit_list.pdf",
    university_type: "Government",
    is_autonomous: "Yes",
    gallery_images: [
      "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1592280771190-3e2e4d571952?auto=format&fit=crop&q=80&w=800"
    ],
    description: "COEP is the 3rd oldest engineering institute in Asia, renowned worldwide for innovation, prestigious heritage, boat club, and elite technical talent.",
    established_year: 1854,
    accreditation: "Unitary Technological University",
    highest_package: "50.5 LPA",
    average_package: "11.2 LPA",
    facilities: ["Heritage Main Building", "Historic Boat Club", "FabLab", "MindSpark Techfest", "VLSI Research Lab"],
    cutoff_general: 99.4,
    contact_email: "admin@coep.ac.in",
    contact_phone: "+91 20 25507000",
    website_url: "https://www.coep.org.in",
    branch_fees_list: [
      { branch_name: "Computer Engineering", tuition_fee: 80000, development_fee: 15000, total_fee: 95000, seats: 120 },
      { branch_name: "Electronics & Telecomm", tuition_fee: 78000, development_fee: 15000, total_fee: 93000, seats: 60 },
      { branch_name: "Mechanical Engineering", tuition_fee: 75000, development_fee: 14000, total_fee: 89000, seats: 120 },
      { branch_name: "Instrumentation & Control", tuition_fee: 74000, development_fee: 14000, total_fee: 88000, seats: 60 },
      { branch_name: "Civil Engineering", tuition_fee: 72000, development_fee: 13000, total_fee: 85000, seats: 60 }
    ],
    cutoff_list: [
      { branch: "Computer Engineering", category: "GOPEN", round1_percentile: 99.4, round2_percentile: 99.1, round3_percentile: 98.9 },
      { branch: "Computer Engineering", category: "OBC", round1_percentile: 98.8, round2_percentile: 98.5, round3_percentile: 98.2 },
      { branch: "Computer Engineering", category: "SC", round1_percentile: 95.2, round2_percentile: 94.8, round3_percentile: 94.0 },
      { branch: "Electronics & Telecomm", category: "GOPEN", round1_percentile: 98.6, round2_percentile: 98.2, round3_percentile: 97.9 }
    ]
  },
  {
    id: 6,
    collage_name: "Veermata Jijabai Technological Institute (VJTI)",
    state: "Maharashtra",
    district: "Mumbai",
    branch: "Computer Science & IT",
    fees: 85000,
    ranking: 6,
    address: "H. R. Mahajani Road, Matunga, Mumbai, Maharashtra - 400019",
    placement: "97% Placed | Max 62 LPA | Avg 12.5 LPA",
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=1000",
    merit_list_pdf: "vjti_mumbai_cutoff.pdf",
    university_type: "Government",
    is_autonomous: "Yes",
    gallery_images: [
      "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=800"
    ],
    description: "VJTI Mumbai is one of India's top autonomous government-aided engineering colleges situated in the heart of Matunga, Mumbai.",
    established_year: 1887,
    accreditation: "Autonomous Government Aided",
    highest_package: "62.0 LPA",
    average_package: "12.5 LPA",
    facilities: ["High Performance Compute Center", "Robotics Club", "Central Library", "Girls & Boys Hostel"],
    cutoff_general: 99.1,
    contact_email: "director@vjti.ac.in",
    contact_phone: "+91 22 24198101",
    website_url: "https://vjti.ac.in",
    branch_fees_list: [
      { branch_name: "Computer Engineering", tuition_fee: 72000, development_fee: 13000, total_fee: 85000, seats: 60 },
      { branch_name: "Information Technology", tuition_fee: 70000, development_fee: 13000, total_fee: 83000, seats: 60 },
      { branch_name: "Electronics Engineering", tuition_fee: 68000, development_fee: 12000, total_fee: 80000, seats: 60 },
      { branch_name: "Production Engineering", tuition_fee: 65000, development_fee: 10000, total_fee: 75000, seats: 60 }
    ],
    cutoff_list: [
      { branch: "Computer Engineering", category: "GOPEN", round1_percentile: 99.1, round2_percentile: 98.8, round3_percentile: 98.5 },
      { branch: "Information Technology", category: "GOPEN", round1_percentile: 98.5, round2_percentile: 98.1, round3_percentile: 97.8 }
    ]
  }
];
