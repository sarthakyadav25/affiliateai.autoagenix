'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Mail, Phone, MapPin, Twitter, Linkedin, Instagram, Globe } from 'lucide-react';

const footerLinks = {
    services: [
        { name: 'AI Persona Branding', href: '#services' },
        { name: 'GEO Strategy', href: '#services' },
        { name: 'Affiliate Automation', href: '#services' },
        { name: 'Performance Analytics', href: '#contact' },
    ],
    company: [
        { name: 'About Us', href: '#about' },
        { name: 'Case Studies', href: '#case-study' },
        { name: 'Careers', href: '#' },
        { name: 'Contact', href: '#contact' },
    ],
    locations: [
        { name: 'Hinjewadi', href: '#pune-locations' },
        { name: 'Baner', href: '#pune-locations' },
        { name: 'Magarpatta', href: '#pune-locations' },
        { name: 'Koregaon Park', href: '#pune-locations' },
    ],
};

const socialLinks = [
    { name: 'Twitter', icon: Twitter, href: '#' },
    { name: 'LinkedIn', icon: Linkedin, href: '#' },
    { name: 'Instagram', icon: Instagram, href: '#' },
];

export default function Footer() {
    return (
        <footer id="contact" className="relative bg-[#0a0a0a] border-t border-gray-800">
            {/* Contact CTA Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                        <span className="text-white">Ready to </span>
                        <span className="gradient-text">Dominate with AI?</span>
                    </h2>
                    <p className="text-gray-400 max-w-xl mx-auto mb-8">
                        Let&apos;s discuss how Affiliate AutoAgenix can transform your digital presence
                        and make your brand the go-to answer in AI search results.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <motion.a
                            href="mailto:hello@autoagenix.com"
                            className="flex items-center gap-2 px-6 py-3 bg-[#8B5CF6] hover:bg-[#A78BFA] text-white font-semibold rounded-xl transition-all duration-200 glow-violet"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Mail className="w-5 h-5" />
                            hello@autoagenix.com
                        </motion.a>
                        <motion.a
                            href="tel:+919876543210"
                            className="flex items-center gap-2 px-6 py-3 border border-gray-700 hover:border-[#8B5CF6] text-white font-semibold rounded-xl transition-all duration-200"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Phone className="w-5 h-5" />
                            +91 98765 43210
                        </motion.a>
                    </div>
                </motion.div>

                {/* Footer Links */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12 border-t border-gray-800">
                    {/* Brand */}
                    <div className="col-span-2 md:col-span-1">
                        <Link href="/" className="flex items-center gap-3 mb-4">
                            <div className="relative w-10 h-10">
                                <Image
                                    src="/logo.jpg"
                                    alt="Affiliate AutoAgenix Logo"
                                    fill
                                    className="object-contain rounded-lg"
                                />
                            </div>
                            <span className="text-lg font-bold gradient-text">AutoAgenix</span>
                        </Link>
                        <p className="text-gray-400 text-sm mb-4">
                            AI-powered influencer affiliate marketing for Pune&apos;s digital-first businesses.
                        </p>
                        <div className="flex items-center gap-2 text-sm text-gray-400">
                            <Globe className="w-4 h-4 text-[#8B5CF6]" />
                            affiliateai.autoagenix.com
                        </div>
                    </div>

                    {/* Services */}
                    <div>
                        <h4 className="text-white font-semibold mb-4">Services</h4>
                        <ul className="space-y-2">
                            {footerLinks.services.map((link) => (
                                <li key={link.name}>
                                    <a href={link.href} className="text-gray-400 hover:text-[#8B5CF6] text-sm transition-colors">
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h4 className="text-white font-semibold mb-4">Company</h4>
                        <ul className="space-y-2">
                            {footerLinks.company.map((link) => (
                                <li key={link.name}>
                                    <a href={link.href} className="text-gray-400 hover:text-[#8B5CF6] text-sm transition-colors">
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Pune Locations */}
                    <div>
                        <h4 className="text-white font-semibold mb-4">Pune Locations</h4>
                        <ul className="space-y-2">
                            {footerLinks.locations.map((link) => (
                                <li key={link.name}>
                                    <a href={link.href} className="text-gray-400 hover:text-[#8B5CF6] text-sm transition-colors flex items-center gap-1">
                                        <MapPin className="w-3 h-3" />
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-gray-800">
                    <p className="text-gray-500 text-sm">
                        © 2026 Affiliate AutoAgenix. All rights reserved. Pune, India.
                    </p>
                    <div className="flex items-center gap-4">
                        {socialLinks.map((social) => (
                            <motion.a
                                key={social.name}
                                href={social.href}
                                className="w-10 h-10 bg-gray-800 hover:bg-[#8B5CF6] rounded-lg flex items-center justify-center text-gray-400 hover:text-white transition-all duration-200"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                aria-label={social.name}
                            >
                                <social.icon className="w-5 h-5" />
                            </motion.a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}
