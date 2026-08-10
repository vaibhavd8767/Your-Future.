export interface PhpFileSnippet {
  filename: string;
  language: string;
  description: string;
  code: string;
}

export const PHP_CODE_FILES: PhpFileSnippet[] = [
  {
    filename: "db.php",
    language: "php",
    description: "Database Connection Handler (XAMPP MySQL)",
    code: `<?php
// db.php - Database Configuration for XAMPP
$host = "localhost";
$user = "root";      // Default XAMPP username
$pass = "";          // Default XAMPP password is empty
$dbname = "college_db";

$conn = new mysqli($host, $user, $pass, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$conn->set_charset("utf8");
?>`
  },
  {
    filename: "main.php",
    language: "php",
    description: "Main Container Page - Includes Header, Filters, Search & Cards Layout",
    code: `<?php
// main.php - Main Layout Page
session_start();
require_once 'db.php';

// Capture Filter & Search Parameters
$search = isset($_GET['search']) ? trim($_GET['search']) : '';
$state = isset($_GET['state']) ? $_GET['state'] : '';
$district = isset($_GET['district']) ? $_GET['district'] : '';
$branch = isset($_GET['branch']) ? $_GET['branch'] : '';
$university_type = isset($_GET['university_type']) ? $_GET['university_type'] : '';
$is_autonomous = isset($_GET['is_autonomous']) ? $_GET['is_autonomous'] : '';

// Build SQL Query Dynamically
$sql = "SELECT * FROM collages WHERE 1=1";
$params = [];
$types = "";

if (!empty($search)) {
    $sql .= " AND (collage_name LIKE ? OR district LIKE ? OR branch LIKE ?)";
    $searchTerm = "%{$search}%";
    $params[] = &$searchTerm;
    $params[] = &$searchTerm;
    $params[] = &$searchTerm;
    $types .= "sss";
}

if (!empty($state)) {
    $sql .= " AND state = ?";
    $params[] = &$state;
    $types .= "s";
}

if (!empty($district)) {
    $sql .= " AND district = ?";
    $params[] = &$district;
    $types .= "s";
}

if (!empty($branch)) {
    $sql .= " AND branch LIKE ?";
    $branchTerm = "%{$branch}%";
    $params[] = &$branchTerm;
    $types .= "s";
}

if (!empty($university_type)) {
    $sql .= " AND university_type = ?";
    $params[] = &$university_type;
    $types .= "s";
}

if (!empty($is_autonomous)) {
    $sql .= " AND is_autonomous = ?";
    $params[] = &$is_autonomous;
    $types .= "s";
}

$sql .= " ORDER BY ranking ASC";

$stmt = $conn->prepare($sql);
if (!empty($types)) {
    call_user_func_array([$stmt, 'bind_param'], array_merge([$types], $params));
}
$stmt->execute();
$result = $stmt->get_result();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>3D College Discovery Portal</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
    <style>
      .college-card-img {
        border-radius: 2rem 2rem 1rem 1rem;
        object-fit: cover;
      }
      .card-3d-wrap {
        perspective: 1000px;
        transform-style: preserve-3d;
        transition: all 0.3s ease;
      }
      .card-3d-wrap:hover {
        transform: translateY(-8px) rotateX(4deg) rotateY(-4deg);
        box-shadow: 0 20px 30px -10px rgba(153, 27, 27, 0.15);
      }
    </style>
</head>
<body class="bg-gray-100 min-h-screen text-gray-800 font-sans">

    <!-- Top Navigation Header -->
    <header class="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div class="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
            <!-- Left: Profile Link -->
            <a href="profile.php" class="flex items-center gap-2 bg-red-50 hover:bg-red-100 text-red-900 border border-red-200 px-4 py-2 rounded-full font-medium text-sm transition">
                <svg class="w-5 h-5 text-red-800" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
                <span>Profile</span>
            </a>

            <!-- Center-Left: Filter Modal Trigger / Form -->
            <?php include 'filter.html'; ?>

            <!-- Center-Right: Search Input Form -->
            <?php include 'search.php'; ?>

            <!-- Right: Logout Button -->
            <a href="logout.php" class="bg-gray-900 hover:bg-black text-white px-5 py-2 rounded-lg font-medium text-sm transition shadow-sm">
                Logout
            </a>
        </div>
    </header>

    <!-- Main College Grid Area -->
    <main class="max-w-7xl mx-auto px-4 py-8">
        <div class="flex justify-between items-center mb-6">
            <h1 class="text-2xl font-bold text-gray-900">Featured Colleges & Institutes</h1>
            <span class="text-sm bg-gray-200 text-gray-700 px-3 py-1 rounded-full font-medium">
                Found <?= $result->num_rows ?> Colleges
            </span>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <?php if ($result->num_rows > 0): ?>
                <?php while ($row = $result->fetch_assoc()): ?>
                    <div class="card-3d-wrap bg-white rounded-3xl p-4 shadow-md border border-gray-200 flex flex-col justify-between">
                        <div>
                            <!-- Card Image Frame -->
                            <div class="relative overflow-hidden mb-4 bg-gray-100 rounded-[2rem]">
                                <img src="<?= htmlspecialchars($row['image']) ?>" alt="<?= htmlspecialchars($row['collage_name']) ?>" class="w-full h-48 college-card-img hover:scale-105 transition duration-500">
                                <span class="absolute top-3 left-3 bg-red-900 text-white text-xs font-bold px-3 py-1 rounded-md shadow">
                                    #<?= htmlspecialchars($row['ranking']) ?> Rank
                                </span>
                            </div>

                            <!-- College Name -->
                            <h2 class="text-lg font-extrabold text-red-900 leading-snug mb-2 uppercase tracking-tight">
                                <?= htmlspecialchars($row['collage_name']) ?>
                            </h2>

                            <!-- Location -->
                            <div class="flex items-center text-sm text-gray-600 mb-3">
                                <svg class="w-4 h-4 text-red-600 mr-1" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"/></svg>
                                <span><?= htmlspecialchars($row['district']) ?>, <?= htmlspecialchars($row['state']) ?>, India</span>
                            </div>

                            <div class="text-xs text-gray-500 space-y-1 mb-4 border-t border-gray-100 pt-3">
                                <p><strong>Branch:</strong> <?= htmlspecialchars($row['branch']) ?></p>
                                <p><strong>Type:</strong> <?= htmlspecialchars($row['university_type']) ?> | <strong>Autonomous:</strong> <?= htmlspecialchars($row['is_autonomous']) ?></p>
                                <p><strong>Fees:</strong> ₹<?= number_format($row['fees']) ?> / Year</p>
                            </div>
                        </div>

                        <!-- Card Action -->
                        <div class="pt-2 border-t border-gray-100">
                            <a href="college_detail.php?id=<?= $row['id'] ?>" class="inline-flex items-center text-red-800 font-bold text-sm hover:text-red-900 transition hover:translate-x-1 duration-200">
                                View Prospectus &rarr;
                            </a>
                        </div>
                    </div>
                <?php endwhile; ?>
            <?php else: ?>
                <div class="col-span-full text-center py-12 bg-white rounded-2xl shadow-sm border border-gray-200">
                    <p class="text-gray-500 text-lg">No colleges found matching your search filters.</p>
                    <a href="main.php" class="inline-block mt-4 text-red-800 underline font-semibold">Reset Filters</a>
                </div>
            <?php endif; ?>
        </div>
    </main>
</body>
</html>`
  },
  {
    filename: "search.php",
    language: "php",
    description: "Search Component - Form with Instant Autocomplete Endpoint",
    code: `<!-- search.php - Search Component -->
<form action="main.php" method="GET" class="flex-1 max-w-md mx-2 relative">
    <div class="relative">
        <input 
            type="text" 
            name="search" 
            placeholder="Search college, city or branch..." 
            value="<?= isset($_GET['search']) ? htmlspecialchars($_GET['search']) : '' ?>"
            class="w-full pl-10 pr-10 py-2 bg-gray-50 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-red-800 focus:bg-white transition"
        />
        <svg class="w-4 h-4 text-gray-400 absolute left-3.5 top-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
        </svg>
        <?php if (!empty($_GET['search'])): ?>
            <a href="main.php" class="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600 font-bold text-xs bg-gray-200 rounded-full w-4 h-4 flex items-center justify-center">
                &times;
            </a>
        <?php endif; ?>
    </div>
</form>`
  },
  {
    filename: "filter.html",
    language: "html",
    description: "Filter Component - Dropdown Popover and Multi-select Filter Controls",
    code: `<!-- filter.html - Filter Button & Dropdown Drawer -->
<div class="relative" x-data="{ open: false }">
    <button onclick="document.getElementById('filterModal').classList.toggle('hidden')" class="flex items-center gap-1.5 bg-gray-100 hover:bg-gray-200 border border-gray-300 text-gray-800 px-3.5 py-2 rounded-lg font-medium text-sm transition">
        <svg class="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"/></svg>
        <span>Filter</span>
    </button>

    <!-- Filter Modal Drawer -->
    <div id="filterModal" class="hidden fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
        <div class="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl relative border border-gray-100">
            <div class="flex justify-between items-center pb-3 border-b border-gray-200 mb-4">
                <h3 class="text-lg font-bold text-gray-900">Filter Colleges</h3>
                <button onclick="document.getElementById('filterModal').classList.add('hidden')" class="text-gray-400 hover:text-gray-700 text-2xl font-bold">&times;</button>
            </div>

            <form action="main.php" method="GET" class="space-y-4">
                <div>
                    <label class="block text-xs font-semibold text-gray-600 mb-1">State</label>
                    <select name="state" class="w-full p-2 text-sm border border-gray-300 rounded-lg">
                        <option value="">All States</option>
                        <option value="Maharashtra">Maharashtra</option>
                        <option value="Gujarat">Gujarat</option>
                        <option value="Karnataka">Karnataka</option>
                    </select>
                </div>

                <div>
                    <label class="block text-xs font-semibold text-gray-600 mb-1">District</label>
                    <select name="district" class="w-full p-2 text-sm border border-gray-300 rounded-lg">
                        <option value="">All Districts</option>
                        <option value="Nashik">Nashik</option>
                        <option value="Pune">Pune</option>
                        <option value="Mumbai">Mumbai</option>
                        <option value="Vadodara">Vadodara</option>
                    </select>
                </div>

                <div>
                    <label class="block text-xs font-semibold text-gray-600 mb-1">University Type</label>
                    <select name="university_type" class="w-full p-2 text-sm border border-gray-300 rounded-lg">
                        <option value="">All Types</option>
                        <option value="Private">Private</option>
                        <option value="Government">Government</option>
                        <option value="Semi-Government">Semi-Government</option>
                    </select>
                </div>

                <div>
                    <label class="block text-xs font-semibold text-gray-600 mb-1">Autonomous Status</label>
                    <select name="is_autonomous" class="w-full p-2 text-sm border border-gray-300 rounded-lg">
                        <option value="">Any</option>
                        <option value="Yes">Yes (Autonomous)</option>
                        <option value="No">No (Affiliated)</option>
                    </select>
                </div>

                <div class="pt-4 flex gap-3 border-t border-gray-200">
                    <a href="main.php" class="w-1/2 text-center py-2 border border-gray-300 rounded-lg text-sm text-gray-700 font-medium hover:bg-gray-50">Clear Filters</a>
                    <button type="submit" class="w-1/2 bg-red-800 text-white py-2 rounded-lg text-sm font-bold hover:bg-red-900 transition">Apply Filters</button>
                </div>
            </form>
        </div>
    </div>
</div>`
  },
  {
    filename: "profile.php",
    language: "php",
    description: "User Profile Page (`profile.php`)",
    code: `<?php
// profile.php - User Profile Page
session_start();
require_once 'db.php';

// Mock Logged-in Student Session
$user = [
    'name' => 'Vaibhav Dangle',
    'email' => 'vaibhav@example.com',
    'phone' => '+91 9876543210',
    'branch_preference' => 'Computer Engineering',
    'cet_percentile' => 96.45,
    'saved_colleges' => [1, 2, 5]
];
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Student Profile - College Portal</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-100 min-h-screen">
    <nav class="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
        <a href="main.php" class="text-red-900 font-bold flex items-center gap-2">
            &larr; Back to Directory
        </a>
        <h1 class="text-lg font-bold">Student Profile</h1>
        <a href="logout.php" class="text-sm text-gray-600 hover:text-red-800 font-medium">Logout</a>
    </nav>

    <div class="max-w-4xl mx-auto py-10 px-4">
        <div class="bg-white rounded-3xl p-8 shadow-md border border-gray-200 mb-8">
            <div class="flex items-center gap-6">
                <div class="w-24 h-24 bg-red-900 text-white rounded-full flex items-center justify-center text-3xl font-extrabold shadow-lg">
                    <?= strtoupper(substr($user['name'], 0, 1)) ?>
                </div>
                <div>
                    <h2 class="text-2xl font-bold text-gray-900"><?= htmlspecialchars($user['name']) ?></h2>
                    <p class="text-gray-500 text-sm"><?= htmlspecialchars($user['email']) ?> | <?= htmlspecialchars($user['phone']) ?></p>
                    <div class="mt-3 flex gap-2">
                        <span class="bg-red-100 text-red-900 text-xs px-3 py-1 rounded-full font-bold">MHT-CET: <?= $user['cet_percentile'] ?>%ile</span>
                        <span class="bg-gray-100 text-gray-800 text-xs px-3 py-1 rounded-full font-medium">Target: <?= $user['branch_preference'] ?></span>
                    </div>
                </div>
            </div>
        </div>

        <h3 class="text-xl font-bold text-gray-900 mb-4">Saved / Shortlisted Colleges</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <?php
            $ids = implode(',', array_map('intval', $user['saved_colleges']));
            $res = $conn->query("SELECT * FROM collages WHERE id IN ($ids)");
            while($college = $res->fetch_assoc()):
            ?>
            <div class="bg-white rounded-2xl p-4 shadow border border-gray-200 flex justify-between items-center">
                <div>
                    <h4 class="font-bold text-red-900 text-sm"><?= htmlspecialchars($college['collage_name']) ?></h4>
                    <p class="text-xs text-gray-500"><?= htmlspecialchars($college['district']) ?>, <?= htmlspecialchars($college['state']) ?></p>
                </div>
                <a href="college_detail.php?id=<?= $college['id'] ?>" class="text-xs bg-red-800 text-white px-3 py-1.5 rounded-lg font-bold hover:bg-red-900">
                    View
                </a>
            </div>
            <?php endwhile; ?>
        </div>
    </div>
</body>
</html>`
  },
  {
    filename: "logout.php",
    language: "php",
    description: "Logout Action Handler (`logout.php`)",
    code: `<?php
// logout.php - Destroys Session & Redirects
session_start();
$_SESSION = array();

if (ini_get("session.use_cookies")) {
    $params = session_get_cookie_params();
    setcookie(session_name(), '', time() - 42000,
        $params["path"], $params["domain"],
        $params["secure"], $params["httponly"]
    );
}

session_destroy();
header("Location: main.php?logged_out=1");
exit;
?>`
  },
  {
    filename: "college_detail.php",
    language: "php",
    description: "3D Dynamic College Details Page (`college_detail.php`)",
    code: `<?php
// college_detail.php - 3D Dynamic Detail Page
session_start();
require_once 'db.php';

$id = isset($_GET['id']) ? intval($_GET['id']) : 1;

$stmt = $conn->prepare("SELECT * FROM collages WHERE id = ?");
$stmt->bind_param("i", $id);
$stmt->execute();
$college = $stmt->get_result()->fetch_assoc();

if (!$college) {
    header("Location: main.php");
    exit;
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title><?= htmlspecialchars($college['collage_name']) ?> - Details</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
</head>
<body class="bg-gray-100 min-h-screen text-gray-800">
    <!-- Header -->
    <header class="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center sticky top-0 z-50">
        <a href="main.php" class="text-red-900 font-bold flex items-center gap-2 hover:underline">
            &larr; Back to All Colleges
        </a>
        <h1 class="text-sm font-bold uppercase tracking-wide text-gray-500">College Prospectus & Detail</h1>
        <a href="profile.php" class="bg-red-800 text-white text-xs px-4 py-2 rounded-lg font-bold">My Saved List</a>
    </header>

    <div class="max-w-6xl mx-auto py-8 px-4">
        <!-- 3D Campus Canvas Banner Container -->
        <div class="relative bg-gradient-to-r from-red-900 to-black rounded-3xl h-64 overflow-hidden mb-8 shadow-2xl flex items-end p-8 text-white">
            <div id="threejs-canvas-container" class="absolute inset-0 z-0 opacity-40"></div>
            <div class="relative z-10 max-w-2xl">
                <span class="bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full mb-3 inline-block">
                    Rank #<?= htmlspecialchars($college['ranking']) ?> Overall
                </span>
                <h1 class="text-3xl md:text-4xl font-extrabold leading-tight mb-2">
                    <?= htmlspecialchars($college['collage_name']) ?>
                </h1>
                <p class="text-red-200 text-sm flex items-center gap-1">
                    📍 <?= htmlspecialchars($college['address']) ?>
                </p>
            </div>
        </div>

        <!-- Details Grid -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div class="lg:col-span-2 space-y-6">
                <!-- Specs Card -->
                <div class="bg-white rounded-3xl p-6 shadow-md border border-gray-200">
                    <h2 class="text-xl font-bold text-gray-900 mb-4 border-b pb-2">Academic & Financial Overview</h2>
                    <div class="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                        <div class="bg-gray-50 p-3 rounded-xl border border-gray-200">
                            <span class="text-xs text-gray-500 block">Annual Tuition Fees</span>
                            <span class="text-lg font-bold text-red-900">₹<?= number_format($college['fees']) ?></span>
                        </div>
                        <div class="bg-gray-50 p-3 rounded-xl border border-gray-200">
                            <span class="text-xs text-gray-500 block">University Type</span>
                            <span class="text-lg font-bold text-gray-800"><?= htmlspecialchars($college['university_type']) ?></span>
                        </div>
                        <div class="bg-gray-50 p-3 rounded-xl border border-gray-200">
                            <span class="text-xs text-gray-500 block">Autonomous</span>
                            <span class="text-lg font-bold text-green-700"><?= htmlspecialchars($college['is_autonomous']) ?></span>
                        </div>
                        <div class="bg-gray-50 p-3 rounded-xl border border-gray-200">
                            <span class="text-xs text-gray-500 block">Primary Branch</span>
                            <span class="text-sm font-bold text-gray-800"><?= htmlspecialchars($college['branch']) ?></span>
                        </div>
                        <div class="bg-gray-50 p-3 rounded-xl border border-gray-200">
                            <span class="text-xs text-gray-500 block">State & District</span>
                            <span class="text-sm font-bold text-gray-800"><?= htmlspecialchars($college['district']) ?>, <?= htmlspecialchars($college['state']) ?></span>
                        </div>
                        <div class="bg-gray-50 p-3 rounded-xl border border-gray-200">
                            <span class="text-xs text-gray-500 block">Placement Rate</span>
                            <span class="text-sm font-bold text-gray-800"><?= htmlspecialchars($college['placement']) ?></span>
                        </div>
                    </div>
                </div>

                <!-- Prospectus Download Card -->
                <div class="bg-red-900 text-white rounded-3xl p-6 shadow-xl flex justify-between items-center">
                    <div>
                        <h3 class="text-lg font-bold">Official Merit List & Prospectus PDF</h3>
                        <p class="text-xs text-red-200 mt-1">Download official CAP round cutoff ranks and fee details.</p>
                    </div>
                    <a href="uploads/<?= htmlspecialchars($college['merit_list_pdf']) ?>" download class="bg-white text-red-900 font-bold px-5 py-3 rounded-xl text-sm hover:bg-red-50 shadow">
                        Download PDF &darr;
                    </a>
                </div>
            </div>

            <!-- Sidebar Inquiry Form -->
            <div class="bg-white rounded-3xl p-6 shadow-md border border-gray-200 h-fit">
                <h3 class="text-lg font-bold text-gray-900 mb-3">Direct Admission Inquiry</h3>
                <form action="#" method="POST" class="space-y-3">
                    <input type="text" placeholder="Your Full Name" required class="w-full p-2.5 border rounded-lg text-sm">
                    <input type="email" placeholder="Email Address" required class="w-full p-2.5 border rounded-lg text-sm">
                    <input type="tel" placeholder="Mobile Number" required class="w-full p-2.5 border rounded-lg text-sm">
                    <button type="submit" class="w-full bg-red-800 text-white font-bold py-3 rounded-lg hover:bg-red-900 transition">
                        Submit Inquiry
                    </button>
                </form>
            </div>
        </div>
    </div>

    <!-- 3D Background Script -->
    <script>
        const container = document.getElementById('threejs-canvas-container');
        if (container && typeof THREE !== 'undefined') {
            const scene = new THREE.Scene();
            const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
            const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
            renderer.setSize(container.clientWidth, container.clientHeight);
            container.appendChild(renderer.domElement);

            const geometry = new THREE.IcosahedronGeometry(3, 1);
            const material = new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true, transparent: true, opacity: 0.3 });
            const sphere = new THREE.Mesh(geometry, material);
            scene.add(sphere);

            camera.position.z = 6;

            function animate() {
                requestAnimationFrame(animate);
                sphere.rotation.x += 0.005;
                sphere.rotation.y += 0.005;
                renderer.render(scene, camera);
            }
            animate();
        }
    </script>
</body>
</html>`
  },
  {
    filename: "collages.sql",
    language: "sql",
    description: "MySQL Table Schema & Sample Seeds (`collages.sql`)",
    code: `-- collages.sql - Database schema for XAMPP phpMyAdmin
CREATE DATABASE IF NOT EXISTS \`college_db\`;
USE \`college_db\`;

DROP TABLE IF EXISTS \`collages\`;

CREATE TABLE \`collages\` (
  \`id\` int(11) NOT NULL AUTO_INCREMENT,
  \`collage_name\` varchar(255) NOT NULL,
  \`state\` varchar(100) NOT NULL,
  \`district\` varchar(100) NOT NULL,
  \`branch\` varchar(100) NOT NULL,
  \`fees\` int(11) NOT NULL,
  \`ranking\` int(11) NOT NULL,
  \`address\` varchar(255) NOT NULL,
  \`placement\` varchar(255) NOT NULL,
  \`image\` varchar(255) DEFAULT NULL,
  \`merit_list_pdf\` varchar(255) DEFAULT NULL,
  \`university_type\` enum('Private','Government','Semi-Government') DEFAULT 'Private',
  \`is_autonomous\` enum('Yes','No') DEFAULT 'No',
  \`gallery_images\` text DEFAULT NULL,
  PRIMARY KEY (\`id\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO \`collages\` (\`id\`, \`collage_name\`, \`state\`, \`district\`, \`branch\`, \`fees\`, \`ranking\`, \`address\`, \`placement\`, \`image\`, \`merit_list_pdf\`, \`university_type\`, \`is_autonomous\`, \`gallery_images\`) VALUES
(1, 'S.N.J.B COLLAGE OF CHANDWAD', 'Maharashtra', 'Nashik', 'Computer Engineering', 88000, 1, 'Neminagar, Chandwad, Dist. Nashik, Maharashtra 423101', '92% Placed | Max 22.5 LPA', 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=1000', 'snjb_prospectus.pdf', 'Private', 'Yes', '["img1.jpg","img2.jpg"]'),
(2, 'K.K. Wagh Institute of Engineering Education and Research (KKWIEER)', 'Maharashtra', 'Nashik', 'Information Technology', 135000, 2, 'Amrutdham, Panchavati, Nashik 422003', '95% Placed | Max 43 LPA', 'https://images.unsplash.com/photo-1592280771190-3e2e4d571952?auto=format&fit=crop&q=80&w=1000', 'kkwagh_cutoff.pdf', 'Private', 'Yes', '["img3.jpg"]'),
(3, 'K.R.T. Arts, B.H. Commerce and A.M. Science College (KTHM)', 'Maharashtra', 'Nashik', 'Computer Science & Science', 32000, 3, 'Gangapur Road, Nashik 422002', '85% Placed | Max 12 LPA', 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=1000', 'kthm_merit.pdf', 'Semi-Government', 'Yes', '[]'),
(4, 'Parul University', 'Gujarat', 'Vadodara', 'Artificial Intelligence & ML', 149000, 4, 'Limda, Waghodia, Vadodara, Gujarat 391760', '94% Placed | Max 30 LPA', 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=1000', 'parul_merit.pdf', 'Private', 'Yes', '[]'),
(5, 'COEP Technological University', 'Maharashtra', 'Pune', 'Computer Engineering', 95000, 5, 'Shivajinagar, Pune, Maharashtra 411005', '98% Placed | Max 50.5 LPA', 'https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?auto=format&fit=crop&q=80&w=1000', 'coep_cutoff.pdf', 'Government', 'Yes', '[]');
`
  }
];
