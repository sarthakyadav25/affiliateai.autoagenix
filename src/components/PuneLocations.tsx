'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { MapPin, Building2, Briefcase, Coffee } from 'lucide-react';

const locations = [
    {
        name: 'Hinjewadi',
        description: 'IT Hub & Tech Parks',
        icon: Building2,
        highlights: ['Phase 1, 2 & 3 Coverage', 'EON Free Zone', 'Rajiv Gandhi Infotech Park'],
    },
    {
        name: 'Baner',
        description: 'Business & Lifestyle',
        icon: Briefcase,
        highlights: ['High Street Phoenix', 'IT Companies', 'Startup Ecosystem'],
    },
    {
        name: 'Magarpatta',
        description: 'Corporate Township',
        icon: Building2,
        highlights: ['Cybercity', 'Enterprise Clients', 'SEZ Zone'],
    },
    {
        name: 'Koregaon Park',
        description: 'Premium & Creative',
        icon: Coffee,
        highlights: ['D2C Brands', 'Lifestyle Influencers', 'Boutique Businesses'],
    },
];

export default function PuneLocations() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <aside id="pune-locations" className="relative py-24 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#8B5CF6]/10 border border-[#8B5CF6]/20 rounded-full mb-6">
                        <MapPin className="w-4 h-4 text-[#8B5CF6]" />
                        <span className="text-xs text-[#8B5CF6] font-semibold uppercase tracking-wider">Local Presence</span>
                    </div>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
                        <span className="text-white">Serving </span>
                        <span className="gradient-text">Pune&apos;s Tech Hubs</span>
                    </h2>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        Deep local expertise across Pune&apos;s key business districts. We understand
                        the unique dynamics of each area&apos;s digital ecosystem.
                    </p>
                </motion.div>

                {/* Locations Grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {locations.map((location, index) => (
                        <motion.div
                            key={location.name}
                            initial={{ opacity: 0, y: 30 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="group"
                        >
                            <div className="h-full p-6 bg-[#1a1a1a] rounded-2xl border border-gray-800 hover:border-[#8B5CF6]/40 transition-all duration-300">
                                <div className="w-12 h-12 bg-gradient-to-br from-[#8B5CF6] to-[#A78BFA] rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                    <location.icon className="w-6 h-6 text-white" />
                                </div>

                                <h3 className="text-xl font-bold text-white mb-1">{location.name}</h3>
                                <p className="text-[#8B5CF6] text-sm font-medium mb-4">{location.description}</p>

                                <ul className="space-y-2">
                                    {location.highlights.map((highlight) => (
                                        <li key={highlight} className="flex items-center gap-2 text-sm text-gray-400">
                                            <div className="w-1 h-1 rounded-full bg-[#8B5CF6]" />
                                            {highlight}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Bottom CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="mt-16 text-center"
                >
                    <p className="text-gray-400 mb-6">
                        Not in these areas? We serve all of <span className="text-white font-semibold">Pune</span> and beyond.
                    </p>
                    <motion.a
                        href="#contact"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-[#8B5CF6] hover:bg-[#A78BFA] text-white font-bold rounded-xl transition-all duration-200 glow-violet"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <MapPin className="w-5 h-5" />
                        Connect With Your Local Team
                    </motion.a>
                </motion.div>
            </div>
        </aside>
    );
}
