"use client";

import { useState, useEffect } from "react";
import Hero from "@/components/hero";
import ProblemSection from "@/components/problem-section";
import SolutionSection from "@/components/solution-section";
import HowItWorks from "@/components/how-it-works";
import DemoPreview from "@/components/demo-preview";
import Partners from "@/components/partners";
import JoinMovement from "@/components/join-movement";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";

export default function Home() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }

    return (
        <main style={{ minHeight: "100vh", backgroundColor: "#fafafa" }}>
        <Navbar />
        <Hero />
        <ProblemSection />
        <SolutionSection />
        <HowItWorks />
        <DemoPreview />
        <Partners />
        <JoinMovement />
        <Footer />
        </main>
    );
}

