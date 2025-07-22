'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Image from 'next/image'

export default function About() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section id="about" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center mb-16"
        >
          <h2 className="text-4xl font-bold tracking-tight mb-6">
            About Me
          </h2>
          <p className="text-lg text-gray-400">
            CEO & Co-Founder of Alvolo Consulting, AI Specialist and Data Scientist with expertise in NLP, machine learning, and business analytics.
            Leading cross-border investment advisory services while developing innovative data-driven solutions for international business expansion.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          {/* Profile Image */}
          <div className="lg:col-span-1 flex justify-center">
            <div className="relative">
              <div className="w-80 h-80 rounded-2xl overflow-hidden border border-gray-700">
                <Image
                  src="profile.jpg"
                  alt="Bumin Cetin"
                  width={320}
                  height={320}
                  style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                  priority
                  className="hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-20"></div>
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Education */}
            <div className="card">
              <h3 className="text-xl font-semibold mb-4 text-blue-400">Education</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold">Bocconi University</h4>
                  <p className="text-gray-300">MSc in Data Science and Business Analytics</p>
                  <p className="text-sm text-gray-500">Sept 2023 - Present</p>
                  <p className="text-sm text-gray-400 italic">Deep Learning for Computer Vision, NLP</p>
                </div>
                <div>
                  <h4 className="font-semibold">Bocconi University</h4>
                  <p className="text-gray-300">BSc in Economics, Management, and Computer Science</p>
                  <p className="text-sm text-gray-500">Sept 2020 - July 2023</p>
                  <p className="text-sm text-gray-400 italic">Econometrics, Big Data, Programming</p>
                </div>
              </div>
            </div>

            {/* Experience */}
            <div className="card">
              <h3 className="text-xl font-semibold mb-4 text-blue-400">Experience</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold">ALVOLO CONSULTING</h4>
                  <p className="text-gray-300">CEO & Co-Founder</p>
                  <p className="text-sm text-gray-500">May 2025 - Present</p>
                  <p className="text-sm text-gray-400 italic">Leading cross-border investment advisory services for international companies entering Italy and Europe. Overseeing market-entry strategy, regulatory compliance, and EU incentive optimization.</p>
                </div>
                <div>
                  <h4 className="font-semibold">IMPACTSCOPE</h4>
                  <p className="text-gray-300">AI Specialist | NLP Researcher</p>
                  <p className="text-sm text-gray-500">Dec 2024 - Present</p>
                </div>
                <div>
                  <h4 className="font-semibold">FEDRIGONI SPA</h4>
                  <p className="text-gray-300">Junior Data Scientist</p>
                  <p className="text-sm text-gray-500">April 2024 - Oct 2024</p>
                </div>
                <div>
                  <h4 className="font-semibold">N26 BANK AG</h4>
                  <p className="text-gray-300">Risk Management Intern</p>
                  <p className="text-sm text-gray-500">Nov 2022 - Feb 2023</p>
                </div>
              </div>
            </div>

            {/* Research Focus */}
            <div className="card">
              <h3 className="text-xl font-semibold mb-4 text-blue-400">Research Focus</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  'Advanced NLP & Sentiment Analysis',
                  'Deep Learning & Neural Networks',
                  'Time Series Analysis',
                  'Machine Learning for Finance',
                  'Semantic Contradiction Analysis',
                  'Cross-border Investment Strategy'
                ].map((focus, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    <span className="text-gray-300">{focus}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
} 