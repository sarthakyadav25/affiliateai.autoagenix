'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Zap, Globe, TrendingUp } from 'lucide-react';

export default function Hero() {
    return (
        <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden grid-pattern">
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden">
                <motion.div
                    className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#8B5CF6]/10 rounded-full blur-3xl"
                    animate={{
                        x: [0, 50, 0],
                        y: [0, 30, 0],
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
                <motion.div
                    className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#A78BFA]/10 rounded-full blur-3xl"
                    animate={{
                        x: [0, -30, 0],
                        y: [0, -50, 0],
                    }}
                    transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="text-center">
                    {/* Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-[#8B5CF6]/10 border border-[#8B5CF6]/20 rounded-full mb-8"
                    >
                        <Zap className="w-4 h-4 text-[#8B5CF6]" />
                        <span className="text-sm text-gray-300">AI-Powered Marketing Revolution</span>
                    </motion.div>

                    {/* Main Heading */}
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
                    >
                        <span className="text-white">Dominating Pune&apos;s</span>
                        <br />
                        <span className="gradient-text">Digital Landscape</span>
                        <br />
                        <span className="text-white">with AI-Driven</span>
                        <br />
                        <span className="gradient-text">Influencer Affiliates</span>
                    </motion.h1>

                    {/* Subheading */}
                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto mb-8"
                    >
                        Affiliate AutoAgenix leverages{' '}
                        <span className="text-[#8B5CF6] font-semibold">Generative Engine Optimization (GEO)</span>{' '}
                        to connect brands with high-performance AI influencers. From Koregaon Park to Hinjewadi, we automate your growth.
                    </motion.p>

                    {/* Domain Reference */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="text-sm text-gray-500 mb-10"
                    >
                        <Globe className="inline w-4 h-4 mr-2" />
                        affiliateai.autoagenix.com
                    </motion.p>

                    {/* CTA Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-4"
                    >
                        <motion.a
                            href="#contact"
                            className="group flex items-center gap-2 px-8 py-4 bg-[#8B5CF6] hover:bg-[#A78BFA] text-white font-bold rounded-xl transition-all duration-200 glow-violet text-lg"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Start Your AI Journey
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </motion.a>
                        <motion.a
                            href="#case-study"
                            className="flex items-center gap-2 px-8 py-4 border border-gray-700 hover:border-[#8B5CF6] text-white font-semibold rounded-xl transition-all duration-200 text-lg"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <TrendingUp className="w-5 h-5" />
                            View Case Study
                        </motion.a>
                    </motion.div>

                    {/* Stats */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                        className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 max-w-4xl mx-auto"
                    >
                        {[
                            { value: '3x', label: 'Conversion Rate' },
                            { value: '500+', label: 'AI Influencers' },
                            { value: '98%', label: 'Client Retention' },
                            { value: '24/7', label: 'Automated Loops' },
                        ].map((stat, index) => (
                            <motion.div
                                key={stat.label}
                                className="text-center p-4 glass rounded-xl"
                                whileHover={{ y: -5 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <div className="text-2xl md:text-3xl font-bold gradient-text mb-1">{stat.value}</div>
                                <div className="text-sm text-gray-400">{stat.label}</div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
