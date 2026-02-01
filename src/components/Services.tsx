'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Users, Search, BarChart3, ArrowRight } from 'lucide-react';

const services = [
    {
        icon: Users,
        title: 'AI Persona Branding',
        description: 'We build digital twin influencers tailored to Pune\'s local demographic. Our AI personas understand regional preferences, speak the local language of your audience, and drive authentic engagement.',
        features: ['Custom AI Influencer Creation', 'Pune-Focused Demographics', 'Multi-Platform Presence', 'Brand Voice Alignment'],
        gradient: 'from-purple-500 to-violet-600',
    },
    {
        icon: Search,
        title: 'GEO Strategy',
        description: 'Generative Engine Optimization techniques that ensure your brand appears in LLM (Large Language Model) search results. Be the answer, not just a link.',
        features: ['LLM Citation Building', 'AI Answer Optimization', 'Gemini & Perplexity Targeting', 'Semantic Content Strategy'],
        gradient: 'from-violet-500 to-purple-600',
    },
    {
        icon: BarChart3,
        title: 'Automated Affiliate Loops',
        description: 'Seamless Next.js powered dashboards for real-time tracking at affiliateai.autoagenix.com. Full automation from lead capture to conversion.',
        features: ['Real-Time Analytics', 'Automated Payouts', 'Performance Tracking', 'Custom Reporting'],
        gradient: 'from-fuchsia-500 to-violet-600',
    },
];

export default function Services() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section id="services" className="relative py-24 overflow-hidden">
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#8B5CF6]/5 to-transparent" />

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
                        <span className="text-xs text-[#8B5CF6] font-semibold uppercase tracking-wider">Our Services</span>
                    </div>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
                        <span className="text-white">AI-Powered Solutions for</span>{' '}
                        <span className="gradient-text">Modern Growth</span>
                    </h2>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        Comprehensive AI influencer affiliate marketing services designed
                        specifically for the Pune tech ecosystem.
                    </p>
                </motion.div>

                {/* Services Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <motion.article
                            key={service.title}
                            initial={{ opacity: 0, y: 40 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.5, delay: index * 0.15 }}
                            className="group relative"
                        >
                            <div className="h-full p-8 bg-[#1a1a1a] rounded-2xl border border-gray-800 hover:border-[#8B5CF6]/40 transition-all duration-300 overflow-hidden">
                                {/* Gradient overlay on hover */}
                                <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />

                                {/* Icon */}
                                <motion.div
                                    className="relative w-14 h-14 bg-gradient-to-br from-[#8B5CF6] to-[#A78BFA] rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300"
                                    whileHover={{ rotate: [0, -10, 10, 0] }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <service.icon className="w-7 h-7 text-white" />
                                </motion.div>

                                {/* Content */}
                                <h3 className="text-xl font-bold text-white mb-4 group-hover:text-[#A78BFA] transition-colors">
                                    {service.title}
                                </h3>
                                <p className="text-gray-400 mb-6 leading-relaxed">
                                    {service.description}
                                </p>

                                {/* Features List */}
                                <ul className="space-y-3 mb-6">
                                    {service.features.map((feature) => (
                                        <li key={feature} className="flex items-center gap-3 text-sm text-gray-300">
                                            <div className="w-1.5 h-1.5 rounded-full bg-[#8B5CF6]" />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>

                                {/* CTA */}
                                <motion.a
                                    href="#contact"
                                    className="inline-flex items-center gap-2 text-[#8B5CF6] hover:text-[#A78BFA] font-medium transition-colors"
                                    whileHover={{ x: 5 }}
                                >
                                    Learn More
                                    <ArrowRight className="w-4 h-4" />
                                </motion.a>
                            </div>
                        </motion.article>
                    ))}
                </div>
            </div>
        </section>
    );
}
