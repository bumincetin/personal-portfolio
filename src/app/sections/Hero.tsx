'use client'

import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <section className="relative isolate min-h-screen flex items-center justify-center">
      <div className="mx-auto max-w-4xl px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl font-bold tracking-tight sm:text-7xl mb-6">
              Hi, I'm{' '}
              <span className="gradient-text">
                Bumin Kagan Cetin
              </span>
            </h1>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8"
          >
            <p className="text-xl text-gray-400 mb-4">
              CEO & Co-Founder at Alvolo Consulting
            </p>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">
              Leading cross-border investment advisory services while developing innovative 
              data-driven solutions. Specializing in AI, machine learning, and international 
              business expansion.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <a
              href="#projects"
              className="btn-primary"
            >
              View My Work
            </a>
            <a
              href="#contact"
              className="btn-secondary"
            >
              Get In Touch
            </a>
          </motion.div>
        </div>
      </div>
      
      {/* Background decorative elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="h-[600px] w-[600px] rounded-full bg-gradient-to-r from-blue-600/20 to-purple-600/20 blur-3xl"></div>
        </div>
        <div className="absolute left-1/4 top-1/4">
          <div className="h-[300px] w-[300px] rounded-full bg-gradient-to-r from-purple-600/10 to-pink-600/10 blur-2xl"></div>
        </div>
        <div className="absolute right-1/4 bottom-1/4">
          <div className="h-[400px] w-[400px] rounded-full bg-gradient-to-r from-cyan-600/10 to-blue-600/10 blur-2xl"></div>
        </div>
      </div>
    </section>
  )
} 