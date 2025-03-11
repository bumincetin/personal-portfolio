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
          className="mx-auto max-w-2xl text-center"
        >
          <div className="mb-8 flex justify-center">
            <div className="relative h-64 w-64 overflow-hidden rounded-full">
              <Image
                src="/profile.jpg"
                alt="Bumin Cetin"
                width={256}
                height={256}
                style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                priority
                className="hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            About Me
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
            AI Specialist and Data Scientist with expertise in NLP, machine learning, and business analytics.
            Passionate about developing innovative solutions and driving data-driven decision making.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none"
        >
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            <div className="flex flex-col">
              <dt className="text-base font-semibold leading-7 text-gray-900 dark:text-white">
                Education
              </dt>
              <dd className="mt-1 flex flex-auto flex-col text-base leading-7 text-gray-600 dark:text-gray-300">
                <p className="flex-auto">
                  <span className="font-semibold">Bocconi University</span><br />
                  MSc in Data Science and Business Analytics<br />
                  <span className="text-sm">Sept 2023 - Present</span><br />
                  <span className="text-sm italic">Deep Learning for Computer Vision, NLP</span><br /><br />
                  
                  <span className="font-semibold">Bocconi University</span><br />
                  BSc in Economics, Management, and Computer Science<br />
                  <span className="text-sm">Sept 2020 - July 2023</span><br />
                  <span className="text-sm italic">Econometrics, Big Data, Programming</span>
                </p>
              </dd>
            </div>
            <div className="flex flex-col">
              <dt className="text-base font-semibold leading-7 text-gray-900 dark:text-white">
                Experience
              </dt>
              <dd className="mt-1 flex flex-auto flex-col text-base leading-7 text-gray-600 dark:text-gray-300">
                <p className="flex-auto">
                  <span className="font-semibold">IMPACTSCOPE</span><br />
                  AI Specialist | NLP Researcher<br />
                  <span className="text-sm">Dec 2024 - Present</span><br /><br />
                  
                  <span className="font-semibold">FEDRIGONI SPA</span><br />
                  Junior Data Scientist<br />
                  <span className="text-sm">April 2024 - Oct 2024</span><br /><br />
                  
                  <span className="font-semibold">N26 BANK AG</span><br />
                  Risk Management Intern<br />
                  <span className="text-sm">Nov 2022 - Feb 2023</span>
                </p>
              </dd>
            </div>
            <div className="flex flex-col">
              <dt className="text-base font-semibold leading-7 text-gray-900 dark:text-white">
                Research Focus
              </dt>
              <dd className="mt-1 flex flex-auto flex-col text-base leading-7 text-gray-600 dark:text-gray-300">
                <p className="flex-auto">
                  • Advanced NLP & Sentiment Analysis<br />
                  • Deep Learning & Neural Networks<br />
                  • Time Series Analysis<br />
                  • Machine Learning for Finance<br />
                  • Semantic Contradiction Analysis
                </p>
              </dd>
            </div>
          </dl>
        </motion.div>
      </div>
    </section>
  )
} 