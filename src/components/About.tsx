'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Brain, CheckCircle, Rocket, Target } from 'lucide-react';

const features = [
    {
        icon: Brain,
        title: 'AI-First Approach',
        description: 'Cutting-edge AI models trained specifically for Pune market dynamics',
    },
    {
        icon: Target,
        title: 'Hyper-Local Targeting',
        description: 'Precise audience targeting across Hinjewadi, Baner, Magarpatta & more',
    },
    {
        icon: Rocket,
        title: '3x Conversion Boost',
        description: '2026 benchmarks show AI-driven referrals outperform traditional search',
    },
    {
        icon: CheckCircle,
        title: 'LLM Optimized',
        description: 'Your brand appears in AI-generated answers on Gemini & Perplexity',
    },
];

export default function About() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section id="about" className="relative py-24 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Content */}
                    <motion.article
                        ref={ref}
                        initial={{ opacity: 0, x: -50 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.6 }}
                        className="space-y-6"
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#8B5CF6]/10 border border-[#8B5CF6]/20 rounded-full">
                            <span className="text-xs text-[#8B5CF6] font-semibold uppercase tracking-wider">About Us</span>
                        </div>

                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
                            <span className="text-white">Pioneering the Future of</span>{' '}
                            <span className="gradient-text">AI Affiliate Marketing</span>
                        </h2>

                        <p className="text-gray-400 text-lg leading-relaxed">
                            <strong className="text-white">Affiliate AutoAgenix</strong> is a Pune-based pioneering agency
                            specializing in the intersection of AI-generated content and affiliate marketing.
                        </p>

                        <p className="text-gray-400 text-lg leading-relaxed">
                            According to recent <span className="text-[#8B5CF6] font-semibold">2026 industry benchmarks</span>,
                            AI-driven referrals in the Pune tech-hub have increased conversion rates by{' '}
                            <span className="text-[#8B5CF6] font-bold">3x</span> compared to traditional search.
                        </p>

                        <p className="text-gray-400 text-lg leading-relaxed">
                            We don&apos;t just rank on Google; we ensure your brand is the{' '}
                            <span className="text-white font-semibold">primary citation</span> in AI-generated answers
                            across <span className="text-[#8B5CF6]">Gemini</span> and <span className="text-[#8B5CF6]">Perplexity</span>.
                        </p>

                        <motion.a
                            href="#services"
                            className="inline-flex items-center gap-2 text-[#8B5CF6] hover:text-[#A78BFA] font-semibold transition-colors"
                            whileHover={{ x: 5 }}
                        >
                            Explore Our Services
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </motion.a>
                    </motion.article>

                    {/* Features Grid */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                    >
                        {features.map((feature, index) => (
                            <motion.div
                                key={feature.title}
                                initial={{ opacity: 0, y: 20 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                                className="p-6 glass rounded-2xl group hover:border-[#8B5CF6]/30 transition-all duration-300"
                                whileHover={{ y: -5 }}
                            >
                                <div className="w-12 h-12 bg-[#8B5CF6]/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-[#8B5CF6]/20 transition-colors">
                                    <feature.icon className="w-6 h-6 text-[#8B5CF6]" />
                                </div>
                                <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                                <p className="text-gray-400 text-sm">{feature.description}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
