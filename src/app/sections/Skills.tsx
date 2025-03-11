'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const skills = {
  'Programming & Languages': [
    { name: 'Python', level: 95 },
    { name: 'SQL', level: 90 },
    { name: 'R', level: 85 },
    { name: 'Knime', level: 85 },
  ],
  'Machine Learning & NLP': [
    { name: 'RoBERTa', level: 95 },
    { name: 'BERTweet', level: 90 },
    { name: 'Semantic Analysis', level: 90 },
    { name: 'Deep Learning', level: 85 },
  ],
  'Data Analysis & Statistics': [
    { name: 'Time Series Analysis', level: 90 },
    { name: 'A/B Testing', level: 90 },
    { name: 'Sentiment Analysis', level: 95 },
    { name: 'Risk Analysis', level: 85 },
  ],
  'Tools & Technologies': [
    { name: 'Git', level: 90 },
    { name: 'Docker', level: 85 },
    { name: 'Airflow', level: 85 },
    { name: 'PowerBI', level: 90 },
  ],
}

export default function Skills() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section id="skills" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Technical Skills
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
            A comprehensive overview of my technical expertise in data science, machine learning,
            and software development tools and technologies.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mx-auto mt-16 max-w-7xl"
        >
          <div className="grid grid-cols-1 gap-x-8 gap-y-16 lg:grid-cols-2">
            {Object.entries(skills).map(([category, skillList], categoryIndex) => (
              <div key={category} className="space-y-8">
                <h3 className="text-lg font-semibold leading-8 text-gray-900 dark:text-white">
                  {category}
                </h3>
                <div className="space-y-6">
                  {skillList.map((skill, skillIndex) => (
                    <div key={skill.name}>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-300">{skill.name}</span>
                        <span className="text-gray-900 dark:text-white">{skill.level}%</span>
                      </div>
                      <div className="mt-2 h-2 w-full rounded-full bg-gray-200 dark:bg-gray-700">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={inView ? { width: `${skill.level}%` } : { width: 0 }}
                          transition={{ duration: 1, delay: 0.1 * (categoryIndex * skillList.length + skillIndex) }}
                          className="h-2 rounded-full bg-blue-600 dark:bg-blue-400"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
} 