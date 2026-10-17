import {
  Activity,
  AlertCircle,
  ArrowRight,
  Award,
  BarChart3,
  Building2,
  Camera,
  Check,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock,
  ExternalLink,
  Eye,
  FileCheck,
  FileClock,
  HelpCircle,
  IndianRupee,
  Layers,
  LayoutDashboard,
  MapPin,
  Maximize2,
  Minimize2,
  Phone,
  Play,
  QrCode,
  RefreshCcw,
  Search,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  UserCheck,
  UserRound,
  Users,
  WalletCards,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import type { RoleType } from "./bssy-platform";

interface BssyHomeProps {
  onLaunchPlatform: (role?: RoleType) => void;
  onOpenCitizenPortal: () => void;
}

export function BssyHome({ onLaunchPlatform, onOpenCitizenPortal }: BssyHomeProps) {
  // Navigation & tabs
  const [activeSection, setActiveSection] = useState<string>("overview");
  const [selectedRole, setSelectedRole] = useState<RoleType>("BMC Administrator");
  const [sliderPosition, setSliderPosition] = useState<number>(50);
  const [activeWorkflowStep, setActiveWorkflowStep] = useState<number>(0);
  const [wardSearch, setWardSearch] = useState<string>("");

  // Presentation State
  const [presentationOpen, setPresentationOpen] = useState<boolean>(false);
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  // Quick citizen QR modal
  const [qrModalOpen, setQrModalOpen] = useState<boolean>(false);

  // Keyboard navigation for presentation
  useEffect(() => {
    if (!presentationOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "PageDown" || e.key === " ") {
        e.preventDefault();
        setCurrentSlide(prev => Math.min(prev + 1, SLIDES.length - 1));
      } else if (e.key === "ArrowLeft" || e.key === "PageUp") {
        e.preventDefault();
        setCurrentSlide(prev => Math.max(prev - 1, 0));
      } else if (e.key === "Escape") {
        setPresentationOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [presentationOpen]);

  // Roles definition
  const ROLES_INFO: {
    id: RoleType;
    badge: string;
    title: string;
    tagline: string;
    description: string;
    features: string[];
    metrics: { label: string; value: string }[];
  }[] = [
      {
        id: "BMC Administrator",
        badge: "Apex Municipal Governance",
        title: "BMC Central Administration",
        tagline: "Citywide ward management, policy controls, and transparent grant allocation",
        description:
          "Provides municipal leadership with macro-level oversight across 26 wards. Authorizes Sanstha CBO onboarding, audits boundary conflicts, configures SLA thresholds, and exports verified performance data to SAP.",
        features: [
          "Onboard & audit registered community Sansthas across all 26 Wards",
          "Resolve unassigned / borderline vasti grievance tickets across ward jurisdictions",
          "Citywide operational cleanliness heatmaps and Ward SLA benchmarks",
          "Automated dual-entry accounting authorization for direct grant disbursal",
        ],
        metrics: [
          { label: "Active Wards", value: "26 / 26" },
          { label: "Registered Sansthas", value: "148" },
          { label: "Total Vasti Units", value: "1,420" },
          { label: "Quarterly Grants", value: "₹4.85 Cr" },
        ],
      },
      {
        id: "Ward Officer / Supervisor",
        badge: "Zonal Operations & Inspection",
        title: "Ward Officer / Assistant Head Supervisor",
        tagline: "Daily beat assignment, photo evidence review, and grievance closure",
        description:
          "The primary operational authority on the ground. Issues daily routine sweeping orders, verifies photographic before/after evidence submitted by Sansthas, and signs off on citizen grievance closures.",
        features: [
          "Generate and dispatch vasti-level daily morning & mid-day work orders",
          "Inspect before/after evidence queue; approve or return with corrective feedback",
          "Interactive GIS live map tracking vasti unit cleanliness pins and worker positions",
          "Manage Ward SLA timers (4-hour resolution commitment for waste accumulation)",
        ],
        metrics: [
          { label: "Ward Jurisdiction", value: "Ward G/North" },
          { label: "Vasti Coverage", value: "148 Units" },
          { label: "Today's Orders", value: "24 Active" },
          { label: "Evidence Approval", value: "98.2%" },
        ],
      },
      {
        id: "Sanstha Coordinator",
        badge: "Community CBO Partner",
        title: "Sanstha Field Coordinator",
        tagline: "Workforce mobilization, lane micro-routes, and evidence dispatch",
        description:
          "Empowers local community-based organizations (Mahila Mandals and Swachhata Sansthas) to organize ground sanitation workers, monitor daily shift attendance, and upload clean-up proof directly.",
        features: [
          "Receive ward work orders and assign qualified local sanitation crews",
          "Track worker geofence check-ins within designated vasti boundaries",
          "Upload post-cleaning high-res photographic evidence with timestamp & GPS",
          "Resubmit corrective action evidence if flagged by the Ward Officer",
        ],
        metrics: [
          { label: "Assigned Sanstha", value: "Prerna Foundation" },
          { label: "Managed Crew", value: "48 Workers" },
          { label: "Today's Shifts", value: "100% Covered" },
          { label: "Avg Proof Time", value: "24 Mins" },
        ],
      },
      {
        id: "Field Worker",
        badge: "Ground Sanitation Frontline",
        title: "Field Sanitation Worker",
        tagline: "Geofenced mobile check-in, lane clearing, and instant camera proof",
        description:
          "Designed specifically for field usability with large touch targets and multilingual cues. Sanitation workers register geofenced presence inside vasti lanes and capture photo proofs easily.",
        features: [
          "1-Tap Geofence GPS attendance confirmation within 10 meters of vasti lane",
          "View assigned morning and afternoon lane cleaning beats",
          "Integrated camera for before & after photo documentation",
          "Transparent attendance register guaranteeing fair wage entitlement",
        ],
        metrics: [
          { label: "Daily Lane Beat", value: "Lane 4 to 12" },
          { label: "Geofence Accuracy", value: "4.2m GPS" },
          { label: "Today's Status", value: "Checked-in" },
          { label: "Attendance Streak", value: "26 / 26 Days" },
        ],
      },
      {
        id: "Accounts Officer",
        badge: "Financial Audit & Disbursement",
        title: "Municipal Accounts & Audit Officer",
        tagline: "Performance-linked grant calculation, penalty deductions, and SAP export",
        description:
          "Automates the monthly BSSY grant formula. Eliminates subjective deductions by tying Sanstha grant recommendations directly to geofenced attendance logs and verified photo evidence.",
        features: [
          "Automated performance scoring based on verified work order completion",
          "Objective penalty deductions for unaddressed SLA breaches or missing proofs",
          "Granular ledger breakdown: base unit rate, attendance bonus, and net payout",
          "Export SAP dual-entry audit vouchers with one-click cryptographically signed records",
        ],
        metrics: [
          { label: "Pending Vouchers", value: "12 Wards" },
          { label: "Automated Accuracy", value: "100%" },
          { label: "Avg Audit Cycle", value: "1 Business Day" },
          { label: "Net Disbursed", value: "₹4.85 Cr" },
        ],
      },
      {
        id: "Citizen",
        badge: "Community Cleanliness Watch",
        title: "Mumbai Citizen / Vasti Resident",
        tagline: "Instant QR code grievance reporting with zero app download requirement",
        description:
          "Any citizen can scan a BSSY QR code standee installed at vasti chowks, public toilets, or collection points to log overflow or unswept areas in seconds, tracking resolution till closure.",
        features: [
          "Scan QR Standee on vasti walls / community toilets; location auto-detected",
          "Upload photo of accumulated waste or overflowing community bin",
          "Real-time ticket tracker with live SLA countdown and assigned Sanstha details",
          "View before vs. after resolution proof once Ward Officer inspects and closes complaint",
        ],
        metrics: [
          { label: "Avg Resolution", value: "2h 45m" },
          { label: "Public QR Standees", value: "4,500+" },
          { label: "Citizen Rating", value: "4.8 / 5" },
          { label: "Zero App Install", value: "Web PWA" },
        ],
      },
    ];

  // Workflow steps
  const WORKFLOW_STEPS = [
    {
      step: "01",
      title: "Demand Initiation & QR Trigger",
      actor: "Citizen or Ward Supervisor",
      description:
        "Citizens scan a physical BSSY QR standee in their vasti to report waste accumulation, or Ward Supervisors schedule automated daily morning beats.",
      badge: "Trigger Phase",
      icon: QrCode,
      highlight: "Auto-routes to the exact vasti unit, beat supervisor, and assigned Sanstha in real-time.",
    },
    {
      step: "02",
      title: "Sanstha Dispatch & Geofence Check-in",
      actor: "Sanstha Coordinator & Crew",
      description:
        "Sanstha mobilizes workers. Field sanitation crew registers presence using geofenced mobile verification, ensuring staff are physically inside the lane.",
      badge: "Verification Phase",
      icon: MapPin,
      highlight: "Geofencing eliminates phantom attendance; GPS radius confirmed within 10 meters.",
    },
    {
      step: "03",
      title: "Deep Sweeping & High-Res Photographic Proof",
      actor: "Field Sanitation Crew",
      description:
        "Workers execute deep lane sweeping, drain de-choking, and secondary carting. High-resolution geotagged 'Before' and 'After' photos are submitted.",
      badge: "Execution Phase",
      icon: Camera,
      highlight: "Timestamp and GPS coordinates are indelibly embedded into evidence records.",
    },
    {
      step: "04",
      title: "Ward Officer Inspection & Sign-off",
      actor: "Ward Assistant Head Supervisor",
      description:
        "The Ward Officer inspects the photographic proof on their queue. They either verify and close the task, or return it with corrective notes for re-cleaning.",
      badge: "Audit Phase",
      icon: FileCheck,
      highlight: "Enforces strict municipal SLAs (4-hour resolution window) with complete audit trail.",
    },
    {
      step: "05",
      title: "Automated Performance Grant Calculation",
      actor: "Municipal Accounts & SAP",
      description:
        "BSSY platform computes monthly Sanstha grants based on verified work order completion rates and penalty deductions, exporting directly to SAP.",
      badge: "Settlement Phase",
      icon: IndianRupee,
      highlight: "100% objective, dispute-free disbursement linked directly to field evidence.",
    },
  ];

  // Presentation Slides
  const SLIDES = [
    {
      id: 1,
      tag: "EXECUTIVE BRIEFING • MISSION CLEAN MUMBAI",
      title: "Brihanmumbai Swachhata Sanstha Yojana (BSSY)",
      subtitle: "A Modern Digital Governance & Monitoring Framework for Mumbai's Slum Sanitation",
      speaker: "Municipal Corporation of Greater Mumbai (BMC / MCGM)",
      content: [
        "Transforming sanitation delivery across 24 Municipal Wards and 1,420+ high-density informal slum settlements (vastis).",
        "Replacing paper logs and untracked inspections with triangulated digital proof: Citizen QR triggers, Geofenced workforce attendance, and Before/After photographic evidence.",
        "Delivering performance-linked direct grant settlements to registered Community-Based Sansthas with zero manual manipulation.",
      ],
      stats: [
        { label: "Population Impacted", value: "6.5 Million+" },
        { label: "Municipal Wards", value: "24 Wards" },
        { label: "Mapped Vasti Units", value: "1,420 Units" },
        { label: "Avg Resolution SLA", value: "2.8 Hours" },
      ],
    },
    {
      id: 2,
      tag: "THE URBAN SANITATION CHALLENGE",
      title: "Why Traditional Slum Sanitation Monitoring Fails",
      subtitle: "Critical Bottlenecks Facing Greater Mumbai's High-Density Settlements",
      speaker: "Problem Statement Analysis",
      content: [
        "Extreme Geospace Density: Narrow winding lanes inaccessible to standard municipal compactor trucks requiring localized community labor.",
        "The 'Ghost Worker' Dilemma: Traditional paper muster rolls fail to ensure that contracted Sanstha workers are physically present on site.",
        "Delayed Citizen Grievance Triaging: Complaints routed through central helplines take 48-72 hours to reach the local ward beat supervisor.",
        "Subjective Grant Disbursals: Sanstha payment clearances frequently face delays and disputes due to the absence of verifiable proof of work.",
      ],
      stats: [
        { label: "Pre-BSSY Grievance Time", value: "48-72 Hours" },
        { label: "Attendance Verification", value: "Paper-based" },
        { label: "Dispute Rate on Grants", value: "34%" },
        { label: "Citizen Visibility", value: "Near Zero" },
      ],
    },
    {
      id: 3,
      tag: "THE BSSY SOLUTION ARCHITECTURE",
      title: "Triangulated Accountability Framework",
      subtitle: "Three Interlocking Vectors of Trust & Operational Transparency",
      speaker: "System Architecture",
      content: [
        "Vector 1 • Citizen QR Empowerment: Wall-mounted QR standees allow instant photo reporting without requiring app installation or registration.",
        "Vector 2 • Geofenced Human Mobilization: Sanstha workers must check in within a verified 10-meter polygon of their designated vasti unit beat.",
        "Vector 3 • Cryptographic Photographic Evidence: High-resolution timestamped before-and-after photo comparison required for every work order completion.",
      ],
      stats: [
        { label: "QR Standees Installed", value: "4,500+" },
        { label: "Geofence Precision", value: "< 10 meters" },
        { label: "Photo Audits / Month", value: "45,000+" },
        { label: "SLA Adherence Rate", value: "98.4%" },
      ],
    },
    {
      id: 4,
      tag: "FIELD OPERATIONS & LIFECYCLE",
      title: "End-to-End Operational Cleanliness Lifecycle",
      subtitle: "From Morning Beat Generation to Verified Civic Closure in Under 4 Hours",
      speaker: "Workflow Process Flow",
      content: [
        "07:00 AM • Automated Beat Orders: Daily schedule issued to Sansthas for all 1,420 vasti units.",
        "07:30 AM • Geofence Check-in: Field crews arrive; mobile GPS validates presence inside the vasti boundary.",
        "08:00 AM - 10:30 AM • Deep Sweeping & Waste Carting: Lanes cleared, secondary bins sanitized, drain edges treated.",
        "11:00 AM • Evidence Submission & Ward Sign-off: Ward Officer reviews before/after photos on live portal and closes ticket.",
      ],
      stats: [
        { label: "Morning Shift Window", value: "07:00 - 10:30" },
        { label: "Mid-day Shift Window", value: "11:00 - 13:00" },
        { label: "Inspection Queue Turnaround", value: "< 30 Mins" },
        { label: "Daily Verification Volume", value: "1,200 Orders" },
      ],
    },
    {
      id: 5,
      tag: "THE 6-PERSONA COLLABORATIVE ECOSYSTEM",
      title: "Role-Based Unified Web Experience",
      subtitle: "Tailored Interfaces Connecting Municipal Leaders to Field Crews",
      speaker: "Stakeholder Experience",
      content: [
        "BMC Administrator: Strategic macro analytics, policy thresholds, citywide GIS oversight, and financial approvals.",
        "Ward Officer: Micro-level ward scheduling, evidence quality control, and citizen complaint resolution.",
        "Sanstha Coordinator: Crew dispatching, equipment allocation, and timely photo evidence submission.",
        "Field Sanitation Worker: Large-button mobile interface for 1-tap geofenced attendance and camera uploads.",
        "Accounts Officer: Algorithmic grant recommendations with direct export to BMC SAP dual-entry systems.",
        "Mumbai Citizen: Public QR grievance tracker with real-time progress and SMS alerts.",
      ],
      stats: [
        { label: "Simultaneous Roles", value: "6 Personas" },
        { label: "Device Support", value: "Desktop / Tablet / Mobile" },
        { label: "Language Support", value: "English & Marathi" },
        { label: "Data Architecture", value: "Real-time Synthetic" },
      ],
    },
    {
      id: 6,
      tag: "FINANCIAL GOVERNANCE & IMPACT",
      title: "Transparent Grants & Quantifiable Civic Impact",
      subtitle: "Performance-Linked Municipal Disbursals with Measurable Results",
      speaker: "Fiscal Governance & Outcomes",
      content: [
        "100% Objective Performance Grant Formula: Base vasti grant + 100% attendance bonus - deduction penalties for uncleaned complaints.",
        "Zero Paper Reconciliations: Vouchers automatically generated and audited with exact photo timestamp proofs attached.",
        "Civic Impact: 92% reduction in uncollected waste complaints within 90 days of implementation across pilot wards.",
        "Empowerment: Direct, timely payments to local community Sansthas and women-led Swachhata Mandals.",
      ],
      stats: [
        { label: "Complaint Reduction", value: "92%" },
        { label: "Payment Clearance Time", value: "48h (vs 45d)" },
        { label: "Audit Dispute Rate", value: "0.2%" },
        { label: "Civic Satisfaction", value: "96.5%" },
      ],
    },
  ];

  // Ward performance records
  const WARDS_DATA = [
    {
      id: "Ward G/North",
      locality: "Dharavi, Mahim, Dadar West",
      units: 148,
      sansthas: 3,
      workers: 240,
      slaCompliance: 98.4,
      attendanceRate: 99.1,
      status: "Excellent",
      officer: "Shri Rajesh Sawant (AHS)",
    },
    {
      id: "Ward F/North",
      locality: "Matunga, Sion, Wadala",
      units: 92,
      sansthas: 2,
      workers: 160,
      slaCompliance: 96.8,
      attendanceRate: 97.9,
      status: "Good",
      officer: "Smt. Priya Patil (AHS)",
    },
    {
      id: "Ward M/East",
      locality: "Govandi, Mankhurd, Deonar",
      units: 185,
      sansthas: 4,
      workers: 310,
      slaCompliance: 94.2,
      attendanceRate: 95.8,
      status: "Requires Attention",
      officer: "Shri Ashok More (AHS)",
    },
    {
      id: "Ward K/East",
      locality: "Andheri East, Jogeshwari East",
      units: 110,
      sansthas: 3,
      workers: 195,
      slaCompliance: 97.6,
      attendanceRate: 98.4,
      status: "Excellent",
      officer: "Shri Nilesh Shinde (AHS)",
    },
    {
      id: "Ward H/East",
      locality: "Bandra East, Khar East, Santacruz East",
      units: 88,
      sansthas: 2,
      workers: 145,
      slaCompliance: 96.1,
      attendanceRate: 97.2,
      status: "Good",
      officer: "Smt. Sunita Salve (AHS)",
    },
    {
      id: "Ward L",
      locality: "Kurla, Chunabhatti, Sakinaka",
      units: 132,
      sansthas: 3,
      workers: 220,
      slaCompliance: 95.3,
      attendanceRate: 96.5,
      status: "Good",
      officer: "Shri Pramod Gaikwad (AHS)",
    },
  ];

  const filteredWards = WARDS_DATA.filter(
    w =>
      w.id.toLowerCase().includes(wardSearch.toLowerCase()) ||
      w.locality.toLowerCase().includes(wardSearch.toLowerCase()) ||
      w.officer.toLowerCase().includes(wardSearch.toLowerCase())
  );

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      {/* Top Municipal Ribbon in Midnight Blue */}
      <div className="bg-[#0b1b3d] border-b border-blue-950 px-4 sm:px-6 py-2 text-xs text-blue-100 shadow-xs">
        <div className="w-full flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <img src="/bmc-logo.png" alt="BMC Emblem" className="h-5 w-5 object-contain rounded bg-white/20 p-0.5 shrink-0" />
            <span className="font-bold text-white truncate">बृहन्मुंबई महानगरपालिका • Brihanmumbai Municipal Corporation (BMC)</span>
            <span className="hidden xl:inline text-blue-200">| Solid Waste Management & Slum Sanitation Initiative</span>
          </div>
          <div className="flex items-center gap-2 text-[11px] text-blue-200 shrink-0">
            <span>Helpline: <strong className="text-white">1916</strong></span>
          </div>
        </div>
      </div>

      {/* Main Header in Matching Deep Dark Blue with Spacious Navigation */}
      <header className="sticky top-0 z-40 bg-[#0a1838]/95 backdrop-blur-md border-b border-blue-900/50 shadow-md text-white">
        <div className="w-full px-4 sm:px-6 h-20 flex items-center justify-between gap-3 lg:gap-4">
          {/* Logo & Identity */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="h-11 w-11 rounded-xl bg-white/10 p-1.5 grid place-items-center shadow-lg ring-1 ring-white/20 shrink-0">
              <img
                src="/bmc-logo.png"
                alt="BMC Emblem"
                className="h-full w-full object-contain"
              />
            </div>
            <div className="shrink-0">
              <span className="font-display font-extrabold text-base lg:text-lg text-white tracking-tight whitespace-nowrap block">
                BSSY PLATFORM
              </span>
              <p className="text-[11px] text-blue-200/80 whitespace-nowrap hidden sm:block">
                Brihanmumbai Swachhata Sanstha Yojana
              </p>
            </div>
          </div>

          {/* Navigation Links - Centered, Flex-1, Never overflowing screen */}
          <nav className="hidden lg:flex items-center justify-center gap-1 xl:gap-2 flex-1 px-2 text-xs xl:text-sm font-semibold text-blue-100 min-w-0">
            <a
              href="#overview"
              onClick={() => setActiveSection("overview")}
              className={`px-3 py-2 rounded-lg transition whitespace-nowrap shrink-0 ${activeSection === "overview"
                ? "bg-blue-600 text-white font-bold shadow-xs"
                : "hover:text-white hover:bg-white/10"
                }`}
            >
              Overview
            </a>
            <a
              href="#roles"
              onClick={() => setActiveSection("roles")}
              className={`px-3 py-2 rounded-lg transition whitespace-nowrap shrink-0 ${activeSection === "roles"
                ? "bg-blue-600 text-white font-bold shadow-xs"
                : "hover:text-white hover:bg-white/10"
                }`}
            >
              Role Portals
            </a>
            <a
              href="#evidence"
              onClick={() => setActiveSection("evidence")}
              className={`px-3 py-2 rounded-lg transition whitespace-nowrap shrink-0 ${activeSection === "evidence"
                ? "bg-blue-600 text-white font-bold shadow-xs"
                : "hover:text-white hover:bg-white/10"
                }`}
            >
              Evidence Proof
            </a>
            <a
              href="#workflow"
              onClick={() => setActiveSection("workflow")}
              className={`px-3 py-2 rounded-lg transition whitespace-nowrap shrink-0 ${activeSection === "workflow"
                ? "bg-blue-600 text-white font-bold shadow-xs"
                : "hover:text-white hover:bg-white/10"
                }`}
            >
              Workflow Pipeline
            </a>
            <a
              href="#wards"
              onClick={() => setActiveSection("wards")}
              className={`px-3 py-2 rounded-lg transition whitespace-nowrap shrink-0 ${activeSection === "wards"
                ? "bg-blue-600 text-white font-bold shadow-xs"
                : "hover:text-white hover:bg-white/10"
                }`}
            >
              Ward Heatmap
            </a>
          </nav>

          {/* Action CTAs: Presentation & Launch Platform guaranteed inside viewport */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0 ml-auto">
            <button
              onClick={() => setPresentationOpen(true)}
              className="inline-flex items-center gap-1.5 rounded-lg border border-blue-400/30 bg-white/10 hover:bg-white/20 px-3 sm:px-3.5 py-2 text-xs sm:text-sm font-bold text-white transition backdrop-blur-xs whitespace-nowrap cursor-pointer shrink-0"
            >
              <Play className="h-3.5 w-3.5 text-amber-400 fill-amber-400 shrink-0" />
              <span>Presentation</span>
            </button>

            <button
              onClick={() => onLaunchPlatform("BMC Administrator")}
              className="inline-flex items-center gap-1.5 sm:gap-2 rounded-lg bg-blue-600 hover:bg-blue-500 px-3.5 sm:px-4 py-2 text-xs sm:text-sm font-bold text-white transition shadow-md shadow-blue-600/30 hover:shadow-lg whitespace-nowrap shrink-0 cursor-pointer"
            >
              <span>Launch Platform</span>
              <ArrowRight className="h-3.5 w-3.5 shrink-0" />
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section: Harmonious Dark Blue Hero Container with Crisp Pure White Cards */}
      <section id="overview" className="relative overflow-hidden pt-14 pb-20 bg-[#081534] border-b border-blue-950 text-white">
        {/* Subtle geometric lighting accents */}
        <div className="absolute top-0 left-1/3 w-[650px] h-[320px] bg-blue-500/10 blur-[130px] pointer-events-none rounded-full" />
        <div className="absolute top-20 right-10 w-[450px] h-[250px] bg-indigo-500/10 blur-[100px] pointer-events-none rounded-full" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
          {/* Main Hero Header */}
          <div className="text-center max-w-4xl mx-auto space-y-6">
            {/* Pill Tag */}
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-950/80 px-4 py-1.5 text-xs font-bold text-blue-200 shadow-inner">
              <Sparkles className="h-3.5 w-3.5 text-blue-400" />
              <span>Transforming Slum Sanitation in Greater Mumbai</span>
              <span className="h-1 w-1 rounded-full bg-blue-400" />
              <span className="text-blue-100">Swachhata Sanstha Yojana</span>
            </div>

            {/* Headline */}
            <h1 className="font-display font-black text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.14]">
              Transparent Digital Governance for <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-blue-300 via-sky-200 to-emerald-300 bg-clip-text text-transparent">
                Mumbai's Slum Cleanliness & Sanitation
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-slate-300 text-sm sm:text-base lg:text-lg font-normal max-w-3xl mx-auto leading-relaxed">
              Connecting 26 Municipal Wards, 1,420+ Slum Vasti Units, Registered Community Sansthas, and Citizens through
              <strong className="text-white font-semibold"> Geofenced Attendance</strong>, <strong className="text-white font-semibold">Before/After Photo Audits</strong>, and <strong className="text-white font-semibold">Automated Direct Grants</strong>.
            </p>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
              <button
                onClick={() => onLaunchPlatform("BMC Administrator")}
                className="inline-flex items-center gap-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 px-6 py-3.5 text-sm font-bold text-white transition shadow-xl shadow-blue-600/30 hover:scale-[1.02] active:scale-[0.98]"
              >
                <LayoutDashboard className="h-4 w-4" />
                <span>Open Operations Sandbox</span>
                <ArrowRight className="h-4 w-4" />
              </button>

              <button
                onClick={() => setPresentationOpen(true)}
                className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 hover:bg-white/20 px-5 py-3.5 text-sm font-bold text-white transition backdrop-blur-sm shadow-sm"
              >
                <Play className="h-4 w-4 text-amber-400 fill-amber-400" />
                <span>Executive Presentation Deck</span>
              </button>

              <button
                onClick={() => setQrModalOpen(true)}
                className="inline-flex items-center gap-2 rounded-xl border border-emerald-400/40 bg-emerald-950/60 hover:bg-emerald-900/60 px-5 py-3.5 text-sm font-bold text-emerald-300 transition"
              >
                <QrCode className="h-4 w-4 text-emerald-400" />
                <span>Citizen QR Standee</span>
              </button>
            </div>
          </div>

          {/* Crisp Pure White KPI Cards placed on Dark Blue for stunning contrast */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-xl hover:-translate-y-1 transition duration-200">
              <div className="flex items-center justify-between text-slate-500 text-xs mb-1.5 font-bold">
                <span>Active Wards</span>
                <Building2 className="h-4 w-4 text-[#0b1b3d]" />
              </div>
              <div className="text-2xl font-black text-slate-900 font-mono">26 / 26</div>
              <div className="text-[11px] text-emerald-700 mt-1 flex items-center gap-1 font-bold">
                <Check className="h-3 w-3" /> 100% City Coverage
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-xl hover:-translate-y-1 transition duration-200">
              <div className="flex items-center justify-between text-slate-500 text-xs mb-1.5 font-bold">
                <span>Mapped Vastis</span>
                <MapPin className="h-4 w-4 text-[#0b1b3d]" />
              </div>
              <div className="text-2xl font-black text-slate-900 font-mono">1,420</div>
              <div className="text-[11px] text-slate-500 mt-1 font-semibold">Slum micro-clusters</div>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-xl hover:-translate-y-1 transition duration-200">
              <div className="flex items-center justify-between text-slate-500 text-xs mb-1.5 font-bold">
                <span>SLA Compliance</span>
                <ShieldCheck className="h-4 w-4 text-emerald-600" />
              </div>
              <div className="text-2xl font-black text-emerald-700 font-mono">98.4%</div>
              <div className="text-[11px] text-emerald-600 mt-1 font-bold">Under 4-hr cleanup</div>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-xl hover:-translate-y-1 transition duration-200">
              <div className="flex items-center justify-between text-slate-500 text-xs mb-1.5 font-bold">
                <span>Geofence Precision</span>
                <UserCheck className="h-4 w-4 text-[#0b1b3d]" />
              </div>
              <div className="text-2xl font-black text-[#0b1b3d] font-mono">&lt; 10m</div>
              <div className="text-[11px] text-slate-500 mt-1 font-semibold">Zero phantom muster</div>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-xl hover:-translate-y-1 transition duration-200">
              <div className="flex items-center justify-between text-slate-500 text-xs mb-1.5 font-bold">
                <span>Monthly Grants</span>
                <IndianRupee className="h-4 w-4 text-blue-600" />
              </div>
              <div className="text-2xl font-black text-slate-900 font-mono">₹4.85 Cr</div>
              <div className="text-[11px] text-blue-700 mt-1 font-bold">SAP dual-entry ready</div>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-xl hover:-translate-y-1 transition duration-200">
              <div className="flex items-center justify-between text-slate-500 text-xs mb-1.5 font-bold">
                <span>Verified Photos</span>
                <Camera className="h-4 w-4 text-[#0b1b3d]" />
              </div>
              <div className="text-2xl font-black text-slate-900 font-mono">12.8k+</div>
              <div className="text-[11px] text-slate-500 mt-1 font-semibold">Indelible audit proof</div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Before & After Photo Verification Evidence (Clean White with Dark Blue Accents) */}
      <section id="evidence" className="py-16 border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
            <span className="text-xs uppercase font-extrabold tracking-wider text-[#0b1b3d] bg-blue-50 border border-blue-200 px-3 py-1 rounded-full">
              Photographic Evidence Verification
            </span>
            <h2 className="font-display font-extrabold text-2xl sm:text-4xl text-slate-900">
              See Verified Field Cleanliness in Action
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              Every single work order and citizen grievance requires high-resolution photographic proof before Ward Officers sign off. Drag the interactive comparison slider below:
            </p>
          </div>

          {/* Interactive Split Slider Container */}
          <div className="max-w-4xl mx-auto rounded-2xl border border-slate-300 bg-white shadow-xl overflow-hidden">
            {/* Header with real-time metadata */}
            <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-100 px-5 py-3.5 border-b border-slate-200 text-xs">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                <span className="font-bold text-slate-900 font-mono">WO-BSSY-24018</span>
                <span className="text-slate-600">• Vasti Unit 04-D (Kala Killa, Dharavi Beat 12)</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-slate-600">Sanstha: <strong className="text-slate-900">Prerna Swachhata Foundation</strong></span>
                <span className="rounded bg-emerald-100 px-2 py-0.5 font-bold text-emerald-800 border border-emerald-300">
                  Verified & Approved by Ward Officer
                </span>
              </div>
            </div>

            {/* Split Comparison Window */}
            <div
              className="relative h-[340px] sm:h-[480px] w-full select-none cursor-ew-resize overflow-hidden"
              onMouseMove={e => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
                setSliderPosition((x / rect.width) * 100);
              }}
              onTouchMove={e => {
                const touch = e.touches[0];
                if (!touch) return;
                const rect = e.currentTarget.getBoundingClientRect();
                const x = Math.max(0, Math.min(touch.clientX - rect.left, rect.width));
                setSliderPosition((x / rect.width) * 100);
              }}
            >
              {/* After Image (Background) */}
              <div className="absolute inset-0">
                <img
                  src="/images/garbage_after.jpg"
                  alt="Vasti lane after cleaning"
                  className="h-full w-full object-cover"
                />
                <div className="absolute top-4 right-4 rounded-lg bg-emerald-900/90 backdrop-blur-md border border-emerald-400 px-3 py-1.5 text-xs font-bold text-white shadow-md">
                  AFTER CLEANUP (09:45 AM)
                </div>
              </div>

              {/* Before Image (Clipped Overlay) */}
              <div
                className="absolute inset-0 overflow-hidden"
                style={{ width: `${sliderPosition}%` }}
              >
                <img
                  src="/images/garbage_before.jpg"
                  alt="Vasti lane before cleaning"
                  className="h-full w-full object-cover max-w-none"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
                <div className="absolute top-4 left-4 rounded-lg bg-rose-900/90 backdrop-blur-md border border-rose-400 px-3 py-1.5 text-xs font-bold text-white shadow-md">
                  BEFORE CLEANUP (07:15 AM)
                </div>
              </div>

              {/* Slider Divider Line */}
              <div
                className="absolute top-0 bottom-0 w-1 bg-white shadow-2xl z-20 pointer-events-none"
                style={{ left: `${sliderPosition}%` }}
              >
                <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 h-10 w-10 rounded-full bg-[#0b1b3d] text-white grid place-items-center shadow-xl font-black text-xs ring-2 ring-white">
                  <SlidersHorizontal className="h-4 w-4" />
                </div>
              </div>
            </div>

            {/* Slider quick toggle buttons and inspection audit details */}
            <div className="bg-slate-50 p-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4 text-xs">
              <div className="flex items-center gap-2">
                <span className="text-slate-600 font-semibold">Quick View:</span>
                <button
                  onClick={() => setSliderPosition(100)}
                  className={`px-3 py-1 rounded font-bold transition border ${sliderPosition > 85 ? "bg-rose-600 border-rose-600 text-white" : "bg-white border-slate-300 text-slate-700 hover:bg-slate-100"}`}
                >
                  Show Full Before
                </button>
                <button
                  onClick={() => setSliderPosition(50)}
                  className={`px-3 py-1 rounded font-bold transition border ${sliderPosition >= 40 && sliderPosition <= 60 ? "bg-[#0b1b3d] border-[#0b1b3d] text-white" : "bg-white border-slate-300 text-slate-700 hover:bg-slate-100"}`}
                >
                  50 / 50 Split
                </button>
                <button
                  onClick={() => setSliderPosition(0)}
                  className={`px-3 py-1 rounded font-bold transition border ${sliderPosition < 15 ? "bg-emerald-600 border-emerald-600 text-white" : "bg-white border-slate-300 text-slate-700 hover:bg-slate-100"}`}
                >
                  Show Full After
                </button>
              </div>

              <div className="flex items-center gap-4 text-slate-600">
                <span>GPS: <strong className="text-slate-900 font-mono">19.0438° N, 72.8574° E</strong></span>
                <span>AI Confidence: <strong className="text-emerald-700 font-bold">99.2% Cleaned</strong></span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6-Role Portal Explorer Sandbox (White & Dark Blue Combination) */}
      <section id="roles" className="py-16 border-b border-slate-200 bg-slate-50/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
            <span className="text-xs uppercase font-extrabold tracking-wider text-[#0b1b3d] bg-blue-50 border border-blue-200 px-3 py-1 rounded-full">
              Multi-Stakeholder Architecture
            </span>
            <h2 className="font-display font-extrabold text-2xl sm:text-4xl text-slate-900">
              Explore the 6 Dedicated Role Portals
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              The BSSY platform provides specialized, role-tailored dashboards for every participant in Mumbai's cleanliness ecosystem. Select a persona below to inspect their capabilities:
            </p>
          </div>

          {/* Role Selection Tabs */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3 mb-6">
            {ROLES_INFO.map((r, idx) => {
              const isSelected = selectedRole === r.id;
              return (
                <button
                  key={r.id}
                  onClick={() => setSelectedRole(r.id)}
                  className={`rounded-xl p-3 text-left transition border text-xs flex flex-col justify-between ${isSelected
                    ? "bg-[#0b1b3d] border-[#0b1b3d] text-white shadow-md shadow-blue-950/20"
                    : "bg-white border-slate-200 hover:border-blue-400 text-slate-700 hover:text-slate-900 shadow-2xs"
                    }`}
                >
                  <span className={`text-[10px] font-bold uppercase ${isSelected ? "text-blue-200" : "text-blue-700"}`}>
                    Role #0{idx + 1}
                  </span>
                  <span className={`font-bold mt-1 text-sm truncate ${isSelected ? "text-white" : "text-slate-900"}`}>
                    {r.id.split(" ")[0]}
                  </span>
                  <span className={`text-[10px] mt-1 truncate ${isSelected ? "text-blue-200" : "text-slate-500"}`}>
                    {r.badge}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Selected Role Card in Pure White with Dark Blue Typography */}
          {(() => {
            const current = ROLES_INFO.find(r => r.id === selectedRole)!;
            return (
              <div className="rounded-2xl border border-slate-200 bg-white shadow-xl p-6 sm:p-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  {/* Left Column: Role Details & Features */}
                  <div className="lg:col-span-7 space-y-6">
                    <div className="space-y-2">
                      <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-[#0b1b3d] border border-blue-200">
                        <UserRound className="h-3 w-3 text-blue-700" />
                        <span>{current.badge}</span>
                      </div>
                      <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-slate-900">
                        {current.title}
                      </h3>
                      <p className="text-slate-500 text-sm font-semibold">
                        {current.tagline}
                      </p>
                    </div>

                    <p className="text-slate-600 text-sm leading-relaxed">
                      {current.description}
                    </p>

                    {/* Features Checklist */}
                    <div className="space-y-2.5">
                      <h4 className="text-xs uppercase font-extrabold tracking-wider text-slate-500">
                        Key Responsibilities & Operations
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                        {current.features.map((feat, idx) => (
                          <div key={idx} className="flex items-start gap-2 rounded-lg bg-slate-50 p-2.5 border border-slate-200 text-slate-800 font-medium">
                            <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Launch Button */}
                    <div className="pt-2">
                      <button
                        onClick={() => onLaunchPlatform(current.id)}
                        className="inline-flex items-center gap-2 rounded-xl bg-[#0b1b3d] hover:bg-blue-900 px-6 py-3 text-sm font-bold text-white transition shadow-md shadow-blue-950/20"
                      >
                        <span>Launch Live Sandbox as {current.id}</span>
                        <ArrowRight className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  {/* Right Column: Live Metrics & Sandbox Preview */}
                  <div className="lg:col-span-5 space-y-4">
                    <div className="rounded-xl border border-slate-200 bg-slate-50 p-5 space-y-4">
                      <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                        <span className="text-xs font-bold text-slate-800">Operational KPIs</span>
                        <span className="text-[10px] text-emerald-700 font-bold flex items-center gap-1 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                          Live Synthetic Synced
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        {current.metrics.map((m, idx) => (
                          <div key={idx} className="rounded-lg bg-white p-3 border border-slate-200 shadow-2xs">
                            <span className="text-[11px] text-slate-500 font-medium block">{m.label}</span>
                            <span className="text-lg font-black text-slate-900 font-mono mt-0.5 block">{m.value}</span>
                          </div>
                        ))}
                      </div>

                      <div className="rounded-lg bg-blue-50 border border-blue-200 p-3.5 text-xs text-blue-900 space-y-1.5">
                        <span className="font-bold flex items-center gap-1.5 text-blue-800">
                          <Sparkles className="h-3.5 w-3.5 text-blue-600" />
                          One-Click Role Switching
                        </span>
                        <p className="text-[11px] text-blue-800/80 leading-relaxed">
                          Inside the platform, switch freely between all 6 personas using the top navigation role dropdown to experience the entire lifecycle seamlessly.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
      </section>

      {/* 5-Step Operational Cleanliness Workflow Pipeline (White & Blue) */}
      <section id="workflow" className="py-16 border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
            <span className="text-xs uppercase font-extrabold tracking-wider text-[#0b1b3d] bg-blue-50 border border-blue-200 px-3 py-1 rounded-full">
              Operational Architecture
            </span>
            <h2 className="font-display font-extrabold text-2xl sm:text-4xl text-slate-900">
              End-to-End Civic Accountability Pipeline
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              A closed-loop workflow ensuring every reported or scheduled cleaning task is verified, inspected, and accurately credited:
            </p>
          </div>

          {/* Stepper Tabs */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-3 mb-6">
            {WORKFLOW_STEPS.map((s, idx) => {
              const isSelected = activeWorkflowStep === idx;
              const Icon = s.icon;
              return (
                <button
                  key={s.step}
                  onClick={() => setActiveWorkflowStep(idx)}
                  className={`rounded-xl p-4 text-left border transition relative flex flex-col justify-between ${isSelected
                    ? "bg-blue-50 border-[#0b1b3d] shadow-sm ring-1 ring-[#0b1b3d]"
                    : "bg-slate-50 border-slate-200 hover:border-slate-300 text-slate-700"
                    }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-xs font-bold text-blue-700">Step {s.step}</span>
                    <Icon className={`h-4 w-4 ${isSelected ? "text-blue-700" : "text-slate-400"}`} />
                  </div>
                  <div className={`font-bold text-xs truncate ${isSelected ? "text-[#0b1b3d] font-extrabold" : "text-slate-900"}`}>
                    {s.title}
                  </div>
                  <div className="text-[10px] text-slate-500 mt-1 truncate">{s.actor}</div>
                </button>
              );
            })}
          </div>

          {/* Active Step Detailed Card */}
          {(() => {
            const cur = WORKFLOW_STEPS[activeWorkflowStep]!;
            const CurIcon = cur.icon;
            return (
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 sm:p-8">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-slate-200">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-xl bg-[#0b1b3d] text-white grid place-items-center shadow-md">
                      <CurIcon className="h-6 w-6" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-blue-700">PHASE {cur.step}</span>
                        <span className="rounded bg-blue-100 px-2 py-0.5 text-[10px] font-bold text-[#0b1b3d]">
                          {cur.badge}
                        </span>
                      </div>
                      <h3 className="font-display font-bold text-xl sm:text-2xl text-slate-900 mt-0.5">
                        {cur.title}
                      </h3>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-[11px] text-slate-500 block font-semibold">Responsible Actor:</span>
                    <span className="font-bold text-sm text-[#0b1b3d]">{cur.actor}</span>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                  <div className="md:col-span-8 space-y-4">
                    <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                      {cur.description}
                    </p>
                    <div className="rounded-xl bg-white border border-slate-200 p-4 text-xs text-slate-700 flex items-start gap-3 shadow-2xs">
                      <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-slate-900 block mb-0.5">Municipal Trust Guarantee</strong>
                        <span>{cur.highlight}</span>
                      </div>
                    </div>
                  </div>

                  <div className="md:col-span-4 flex justify-end gap-2">
                    <button
                      onClick={() => setActiveWorkflowStep(prev => (prev > 0 ? prev - 1 : WORKFLOW_STEPS.length - 1))}
                      className="px-4 py-2 rounded-lg bg-white hover:bg-slate-100 border border-slate-300 text-xs font-bold text-slate-700"
                    >
                      ← Previous
                    </button>
                    <button
                      onClick={() => setActiveWorkflowStep(prev => (prev < WORKFLOW_STEPS.length - 1 ? prev + 1 : 0))}
                      className="px-4 py-2 rounded-lg bg-[#0b1b3d] hover:bg-blue-900 text-xs font-bold text-white shadow-md shadow-blue-950/20"
                    >
                      Next Step →
                    </button>
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
      </section>

      {/* Ward Heatmap & Real-Time Performance Section */}
      <section id="wards" className="py-16 border-b border-slate-200 bg-slate-50/70">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-xs uppercase font-extrabold tracking-wider text-[#0b1b3d] bg-blue-50 border border-blue-200 px-3 py-1 rounded-full">
                Citywide Municipal Surveillance
              </span>
              <h2 className="font-display font-extrabold text-2xl sm:text-4xl text-slate-900 mt-2">
                26 BMC Wards Performance Index
              </h2>
              <p className="text-slate-600 text-sm mt-1">
                Real-time SLA adherence, vasti coverage, and registered community Sanstha deployments.
              </p>
            </div>

            <div className="w-full md:w-72">
              <div className="relative">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search ward or locality..."
                  value={wardSearch}
                  onChange={e => setWardSearch(e.target.value)}
                  className="w-full rounded-xl bg-white border border-slate-300 pl-9 pr-4 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 shadow-2xs"
                />
              </div>
            </div>
          </div>

          {/* Table Container in Pure White */}
          <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-700">
                <thead className="bg-[#0b1b3d] text-white uppercase font-bold text-[10px] tracking-wider border-b border-slate-200">
                  <tr>
                    <th className="py-3.5 px-4">Ward & Locality</th>
                    <th className="py-3.5 px-4">Vasti Units</th>
                    <th className="py-3.5 px-4">Active Sansthas</th>
                    <th className="py-3.5 px-4">Field Crew</th>
                    <th className="py-3.5 px-4">SLA Compliance</th>
                    <th className="py-3.5 px-4">Attendance Rate</th>
                    <th className="py-3.5 px-4">Supervising Officer</th>
                    <th className="py-3.5 px-4 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredWards.map(w => (
                    <tr key={w.id} className="hover:bg-blue-50/50 transition">
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-slate-900">{w.id}</div>
                        <div className="text-[11px] text-slate-500">{w.locality}</div>
                      </td>
                      <td className="py-3.5 px-4 font-mono font-bold text-slate-900">{w.units}</td>
                      <td className="py-3.5 px-4 font-mono text-slate-800">{w.sansthas}</td>
                      <td className="py-3.5 px-4 font-mono text-slate-800">{w.workers}</td>
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-emerald-700">{w.slaCompliance}%</span>
                          <div className="w-16 h-1.5 rounded-full bg-slate-200 overflow-hidden">
                            <div className="h-full bg-emerald-600" style={{ width: `${w.slaCompliance}%` }} />
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 font-mono text-blue-700 font-bold">{w.attendanceRate}%</td>
                      <td className="py-3.5 px-4 text-slate-700 font-medium">{w.officer}</td>
                      <td className="py-3.5 px-4 text-right">
                        <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-bold ${w.status === "Excellent"
                          ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                          : w.status === "Good"
                            ? "bg-blue-100 text-blue-800 border border-blue-300"
                            : "bg-amber-100 text-amber-800 border border-amber-300"
                          }`}>
                          <span className="h-1.5 w-1.5 rounded-full bg-current" />
                          {w.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="bg-slate-50 px-4 py-3 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-600">
              <span>Showing {filteredWards.length} municipal wards</span>
              <button
                onClick={() => onLaunchPlatform("BMC Administrator")}
                className="text-blue-700 hover:text-blue-900 font-bold flex items-center gap-1"
              >
                Open Full GIS Heatmap View in Platform →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Citizen QR Standee Spotlight in Dark Blue Gradient Card */}
      <section className="py-16 bg-white border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl bg-gradient-to-r from-[#0b1b3d] via-[#0d2350] to-[#122b64] p-8 shadow-xl text-white">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-4">
                <div className="inline-flex items-center gap-2 rounded-full bg-white/20 px-3 py-1 text-xs font-bold text-white border border-white/30">
                  <QrCode className="h-3.5 w-3.5" />
                  <span>Public Vasti Deployment</span>
                </div>
                <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-white">
                  Citizen QR Standees Deployed Across Mumbai Vastis
                </h3>
                <p className="text-blue-100 text-sm leading-relaxed max-w-2xl font-normal">
                  Over 4,500 weatherproof QR code standees are affixed to community toilet blocks, lane chowks, and waste collection points. Residents scan with any smartphone camera to instantly log complaints with geotagged accuracy—zero app installation required.
                </p>

                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => setQrModalOpen(true)}
                    className="inline-flex items-center gap-2 rounded-xl bg-white text-[#0b1b3d] hover:bg-slate-100 px-5 py-3 text-xs font-bold transition shadow-md"
                  >
                    <Eye className="h-3.5 w-3.5 text-blue-700" />
                    <span>Inspect Standee Poster</span>
                  </button>

                  <button
                    onClick={onOpenCitizenPortal}
                    className="inline-flex items-center gap-2 rounded-xl border border-white/40 bg-white/10 hover:bg-white/20 text-white px-5 py-3 text-xs font-bold transition"
                  >
                    <Camera className="h-3.5 w-3.5" />
                    <span>Simulate Citizen Complaint</span>
                  </button>
                </div>
              </div>

              <div className="lg:col-span-4 flex justify-center">
                <div
                  onClick={() => setQrModalOpen(true)}
                  className="group relative cursor-pointer rounded-xl overflow-hidden border-2 border-white/40 shadow-2xl max-w-[200px] hover:scale-105 transition bg-white"
                >
                  <img
                    src="/images/bssy_qr_poster.jpg"
                    alt="BSSY Citizen QR Standee"
                    className="w-full h-auto object-cover"
                  />
                  <div className="absolute inset-0 bg-[#0b1b3d]/40 group-hover:bg-[#0b1b3d]/20 transition flex items-center justify-center">
                    <span className="rounded-lg bg-white px-2 py-1 text-[10px] font-bold text-slate-900 shadow">
                      Click to Enlarge
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Municipal Footer in Dark Blue / Midnight Navy */}
      <footer className="bg-[#0b1b3d] text-slate-300 text-xs py-12 border-t border-blue-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-3 md:col-span-2">
              <div className="flex items-center gap-2.5 text-white font-bold text-sm">
                <img src="/bmc-logo.png" alt="BMC Emblem" className="h-7 w-7 object-contain rounded bg-white/10 p-0.5 shrink-0" />
                <span>Brihanmumbai Swachhata Sanstha Yojana (BSSY)</span>
              </div>
              <p className="text-slate-300 text-xs leading-relaxed max-w-md">
                An initiative of the Municipal Corporation of Greater Mumbai (BMC) Solid Waste Management Department, establishing verifiable digital accountability across Mumbai's informal settlements.
              </p>
              <div className="text-[11px] text-slate-400">
                Headquarters: BMC Headquarters, Mahapalika Marg, Fort, Mumbai 400001
              </div>
            </div>

            <div className="space-y-2">
              <div className="font-bold text-white">Municipal Services</div>
              <ul className="space-y-1.5 text-slate-300 text-[11px]">
                <li>• BMC 24/7 Helpline: 1916</li>
                <li>• Swachhata App Integration</li>
                <li>• SWM Slum Sanitation Cell</li>
                <li>• SAP Dual-Entry Accounting Portal</li>
              </ul>
            </div>

            <div className="space-y-2">
              <div className="font-bold text-white">Prototype Disclaimer</div>
              <p className="text-[11px] text-slate-300 leading-relaxed">
                This application represents a synthetic frontend demonstration of the BSSY operational cleanliness lifecycle for BMC review. All records, worker names, and grants are simulated test data.
              </p>
            </div>
          </div>

          <div className="pt-6 border-t border-blue-900/60 flex flex-wrap items-center justify-between gap-4 text-[11px] text-slate-400">
            <div>© 2026 Municipal Corporation of Greater Mumbai (MCGM). All rights reserved.</div>
            <div className="flex items-center gap-4">
              <button onClick={() => setPresentationOpen(true)} className="hover:text-white">
                Presentation Deck
              </button>
              <span>•</span>
              <button onClick={() => onLaunchPlatform("BMC Administrator")} className="hover:text-white">
                Launch Sandbox
              </button>
              <span>•</span>
              <button onClick={onOpenCitizenPortal} className="hover:text-white">
                Citizen Portal
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* FULLSCREEN PRESENTATION DECK (White & Dark Blue) */}
      {presentationOpen && (
        <div className="fixed inset-0 z-50 bg-[#0b1b3d]/90 backdrop-blur-md flex flex-col animate-fade-in">
          {/* Deck Top Control Bar */}
          <div className="h-16 bg-white border-b border-slate-200 px-4 sm:px-6 flex items-center justify-between text-xs shadow-md">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-lg bg-slate-100 p-0.5 grid place-items-center shadow-xs border border-slate-200 shrink-0">
                <img
                  src="/bmc-logo.png"
                  alt="BMC Emblem"
                  className="h-full w-full object-contain"
                />
              </div>
              <span className="font-bold text-slate-900 text-sm hidden sm:inline">
                BSSY Executive Briefing Deck
              </span>
              <span className="rounded bg-blue-50 px-2 py-0.5 text-[10px] text-blue-800 font-mono font-bold border border-blue-200">
                Slide {currentSlide + 1} of {SLIDES.length}
              </span>
            </div>

            {/* Slide Navigation Buttons */}
            <div className="flex items-center gap-2">
              <button
                disabled={currentSlide === 0}
                onClick={() => setCurrentSlide(prev => Math.max(prev - 1, 0))}
                className="p-1.5 rounded-lg border border-slate-300 bg-white text-slate-700 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed"
                title="Previous Slide (Left Arrow)"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                disabled={currentSlide === SLIDES.length - 1}
                onClick={() => setCurrentSlide(prev => Math.min(prev + 1, SLIDES.length - 1))}
                className="p-1.5 rounded-lg border border-slate-300 bg-white text-slate-700 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed"
                title="Next Slide (Right Arrow)"
              >
                <ChevronRight className="h-4 w-4" />
              </button>

              <button
                onClick={() => {
                  setPresentationOpen(false);
                  onLaunchPlatform("BMC Administrator");
                }}
                className="hidden md:inline-flex items-center gap-1.5 rounded-lg bg-[#0b1b3d] hover:bg-blue-900 px-3.5 py-1.5 text-xs font-bold text-white transition shadow-sm ml-2"
              >
                <span>Live Demo</span>
                <ArrowRight className="h-3 w-3" />
              </button>

              <button
                onClick={() => setPresentationOpen(false)}
                className="p-1.5 rounded-lg border border-slate-300 bg-white text-slate-500 hover:text-slate-900 ml-2"
                title="Close Presentation (Esc)"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Slide Main Viewport in Crisp White */}
          <div className="flex-1 flex items-center justify-center p-4 sm:p-8 lg:p-12 overflow-y-auto">
            {(() => {
              const slide = SLIDES[currentSlide]!;
              return (
                <div className="w-full max-w-5xl rounded-3xl border border-slate-200 bg-white shadow-2xl p-8 sm:p-12 lg:p-16 space-y-8 relative overflow-hidden">
                  {/* Tag & Speaker */}
                  <div className="flex items-center justify-between text-xs border-b border-slate-200 pb-4">
                    <span className="font-mono font-bold text-blue-700 tracking-wider">
                      {slide.tag}
                    </span>
                    <span className="text-slate-500 font-semibold">{slide.speaker}</span>
                  </div>

                  {/* Title & Subtitle */}
                  <div className="space-y-3">
                    <h2 className="font-display font-black text-2xl sm:text-4xl lg:text-5xl text-slate-900 tracking-tight leading-tight">
                      {slide.title}
                    </h2>
                    <p className="text-base sm:text-xl text-slate-600 font-medium">
                      {slide.subtitle}
                    </p>
                  </div>

                  {/* Slide Bullet Content */}
                  <div className="space-y-3.5 pt-2">
                    {slide.content.map((point, idx) => (
                      <div key={idx} className="flex items-start gap-3 text-slate-700 text-sm sm:text-base leading-relaxed">
                        <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{point}</span>
                      </div>
                    ))}
                  </div>

                  {/* Key Metrics / Highlights in White & Blue */}
                  <div className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-slate-200">
                    {slide.stats.map((st, idx) => (
                      <div key={idx} className="rounded-xl bg-blue-50/70 p-4 border border-blue-100">
                        <span className="text-xs text-slate-500 font-medium block">{st.label}</span>
                        <span className="text-xl sm:text-2xl font-black text-[#0b1b3d] font-mono mt-1 block">
                          {st.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })()}
          </div>

          {/* Deck Bottom Thumbnails Ribbon */}
          <div className="h-20 bg-white border-t border-slate-200 px-4 flex items-center justify-center gap-2 overflow-x-auto shadow-xs">
            {SLIDES.map((s, idx) => (
              <button
                key={s.id}
                onClick={() => setCurrentSlide(idx)}
                className={`h-14 w-28 rounded-lg p-2 text-left text-[10px] transition border flex flex-col justify-between shrink-0 ${currentSlide === idx
                  ? "bg-[#0b1b3d] border-[#0b1b3d] text-white font-bold shadow-md shadow-blue-950/20 ring-2 ring-blue-300"
                  : "bg-slate-50 border-slate-200 text-slate-600 hover:border-slate-300 hover:text-slate-900"
                  }`}
              >
                <span className="font-mono">0{s.id}</span>
                <span className="truncate block font-semibold">{s.title}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* CITIZEN QR STANDEE PREVIEW MODAL */}
      {qrModalOpen && (
        <div className="fixed inset-0 z-50 bg-[#0b1b3d]/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative max-w-lg w-full rounded-2xl border border-slate-200 bg-white p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div className="flex items-center gap-2">
                <QrCode className="h-4 w-4 text-emerald-600" />
                <h4 className="font-bold text-slate-900 text-sm">BSSY Public Vasti Standee Poster</h4>
              </div>
              <button
                onClick={() => setQrModalOpen(false)}
                className="text-slate-400 hover:text-slate-700"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="rounded-xl overflow-hidden border border-slate-200 bg-slate-50 flex justify-center p-2">
              <img
                src="/images/bssy_qr_poster.jpg"
                alt="BSSY Citizen QR Standee Poster"
                className="max-h-[460px] w-auto object-contain rounded-lg"
              />
            </div>

            <div className="text-xs text-slate-600 space-y-2">
              <p>
                This poster is mounted at community spots. Scanning the code automatically opens the Citizen Complaint portal pre-filled with the exact Vasti Unit location and Beat number.
              </p>
              <div className="flex gap-2 pt-2">
                <button
                  onClick={() => {
                    setQrModalOpen(false);
                    onOpenCitizenPortal();
                  }}
                  className="w-full py-2.5 rounded-xl bg-[#0b1b3d] hover:bg-blue-900 text-white font-bold text-xs shadow-md transition"
                >
                  Test Citizen Reporting Flow →
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
