import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "RCCA | 3D Interactive Experience",
  description:
    "Explore RCCA's research compounds through an immersive 3D interactive experience powered by Spline and WebGL.",
  openGraph: {
    title: "RCCA | 3D Interactive Experience",
    description:
      "Immersive 3D visualization of precision-grade research chemicals and peptides.",
    type: "website",
  },
};

export default function ThreeDLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
