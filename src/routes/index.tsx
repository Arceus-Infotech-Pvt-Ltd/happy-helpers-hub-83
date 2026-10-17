import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { BssyHome } from "@/components/bssy-home";
import { BssyPlatform, type RoleType } from "@/components/bssy-platform";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "BSSY Digital Monitoring & Management Platform — Brihanmumbai Municipal Corporation" },
      {
        name: "description",
        content:
          "Official digital monitoring and slum sanitation platform for BMC. Triangulated accountability with Citizen QR, Geofenced Attendance, and Before/After Photographic Verification.",
      },
      { property: "og:title", content: "BSSY Digital Platform — Brihanmumbai Swachhata Sanstha Yojana" },
      {
        property: "og:description",
        content:
          "Transforming Greater Mumbai slum cleanliness across 24 Wards and 1,420+ Vasti Units with verified digital governance.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const [view, setView] = useState<"home" | "platform">("home");
  const [activeRole, setActiveRole] = useState<RoleType>("BMC Administrator");

  const handleLaunchPlatform = (role: RoleType = "BMC Administrator") => {
    setActiveRole(role);
    setView("platform");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleOpenCitizenPortal = () => {
    setActiveRole("Citizen");
    setView("platform");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBackToHome = () => {
    setView("home");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (view === "platform") {
    return (
      <BssyPlatform
        initialRole={activeRole}
        onBackToHome={handleBackToHome}
      />
    );
  }

  return (
    <BssyHome
      onLaunchPlatform={handleLaunchPlatform}
      onOpenCitizenPortal={handleOpenCitizenPortal}
    />
  );
}
