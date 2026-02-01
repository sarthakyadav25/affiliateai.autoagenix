'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { TrendingUp, Eye, Users, Award } from 'lucide-react';

const caseStudyMetrics = [
    {
        icon: TrendingUp,
        value: 342,
        suffix: '%',
        label: 'Increase in AI Citations',
        description: 'Brand mentions in LLM-generated responses',
    },
    {
        icon: Eye,
        value: 2.8,
        suffix: 'M',
        label: 'Impressions Generated',
        description: 'Across Pune tech community platforms',
    },
    {
        icon: Users,
        value: 156,
        suffix: 'K',
        label: 'Engaged Audience',
        description: 'Unique users reached through AI influencers',
    },
    {
        icon: Award,
        value: 94,
        suffix: '%',
        label: 'Client Satisfaction',
        description: 'Based on post-campaign surveys',
    },
];

function AnimatedCounter({ target, suffix, isInView }: { target: number; suffix: string; isInView: boolean }) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!isInView) return;

        const duration = 2000;
        const steps = 60;
        const stepValue = target / steps;
        let current = 0;

        const timer = setInterval(() => {
            current += stepValue;
            if (current >= target) {
                setCount(target);
                clearInterval(timer);
            } else {
                setCount(Number(current.toFixed(1)));
            }
        }, duration / steps);

        return () => clearInterval(timer);
    }, [isInView, target]);

    return (
        <span className="text-4xl md:text-5xl font-bold gradient-text">
            {count}{suffix}
        </span>
    );
}

export default function CaseStudy() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section id="case-study" className="relative py-24 overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#8B5CF6]/5 via-transparent to-[#8B5CF6]/5" />

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#8B5CF6]/10 border border-[#8B5CF6]/20 rounded-full mb-6">
                        <span className="text-xs text-[#8B5CF6] font-semibold uppercase tracking-wider">Case Study</span>
                    </div>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
                        <span className="text-white">Generative Engine Optimization</span>
                        <br />
                        <span className="gradient-text">Case Study India</span>
                    </h2>
                    <p className="text-gray-400 text-lg max-w-3xl mx-auto">
                        How we helped a Pune-based SaaS company become the primary AI citation
                        for &quot;enterprise software solutions Pune&quot; across Gemini and Perplexity.
                    </p>
                </motion.div>

                {/* Metrics Grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                    {caseStudyMetrics.map((metric, index) => (
                        <motion.div
                            key={metric.label}
                            initial={{ opacity: 0, y: 30 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="relative group"
                        >
                            <div className="h-full p-6 bg-[#1a1a1a] rounded-2xl border border-gray-800 hover:border-[#8B5CF6]/40 transition-all duration-300 text-center">
                                <div className="w-12 h-12 bg-[#8B5CF6]/10 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-[#8B5CF6]/20 transition-colors">
                                    <metric.icon className="w-6 h-6 text-[#8B5CF6]" />
                                </div>
                                <AnimatedCounter target={metric.value} suffix={metric.suffix} isInView={isInView} />
                                <h3 className="text-lg font-semibold text-white mt-2 mb-1">{metric.label}</h3>
                                <p className="text-sm text-gray-400">{metric.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Case Study Details */}
                <motion.article
                    initial={{ opacity: 0, y: 40 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="bg-gradient-to-br from-[#1a1a1a] to-[#121212] rounded-3xl border border-gray-800 p-8 md:p-12"
                >
                    <div className="grid md:grid-cols-2 gap-8">
                        <div>
                            <h3 className="text-2xl font-bold text-white mb-4">The Challenge</h3>
                            <p className="text-gray-400 leading-relaxed">
                                Traditional SEO wasn&apos;t cutting it. Our client was ranking well on Google but
                                completely absent from AI-generated responses. With 40% of their target audience
                                now using AI assistants for research, they were losing significant market share.
                            </p>
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold text-white mb-4">Our GEO Solution</h3>
                            <p className="text-gray-400 leading-relaxed">
                                We deployed our proprietary AI Persona strategy combined with semantic content
                                restructuring. Within 90 days, the client became the #1 cited source for
                                enterprise software queries in the Pune region across major LLM platforms.
                            </p>
                        </div>
                    </div>

                    <div className="mt-8 pt-8 border-t border-gray-800">
                        <div className="flex flex-wrap items-center justify-between gap-4">
                            <div className="flex items-center gap-4">
                                <span className="text-sm text-gray-500">Industry:</span>
                                <span className="px-3 py-1 bg-[#8B5CF6]/10 text-[#8B5CF6] rounded-full text-sm">SaaS</span>
                                <span className="px-3 py-1 bg-[#8B5CF6]/10 text-[#8B5CF6] rounded-full text-sm">Enterprise</span>
                                <span className="px-3 py-1 bg-[#8B5CF6]/10 text-[#8B5CF6] rounded-full text-sm">B2B</span>
                            </div>
                            <motion.a
                                href="#contact"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-[#8B5CF6] hover:bg-[#A78BFA] text-white font-semibold rounded-xl transition-all duration-200"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Get Similar Results
                            </motion.a>
                        </div>
                    </div>
                </motion.article>
            </div>
        </section>
    );
}
