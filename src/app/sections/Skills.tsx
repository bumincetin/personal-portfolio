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

const SkillBar = ({ name, level, index }: { name: string; level: number; index: number }) => {
  const delay = index * 0.1

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay }}
      className="space-y-2"
    >
      <div className="flex items-center justify-between">
        <span className="text-gray-300 font-medium">{name}</span>
        <span className="text-blue-400 font-semibold">{level}%</span>
      </div>
      <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${level}%` }}
          transition={{ duration: 1, delay }}
          className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
        />
      </div>
    </motion.div>
  )
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
          className="mx-auto max-w-2xl text-center mb-16"
        >
          <h2 className="text-4xl font-bold tracking-tight mb-6">
            Technical Skills
          </h2>
          <p className="text-lg text-gray-400">
            A comprehensive overview of my technical expertise in data science, machine learning,
            and software development tools and technologies.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 gap-8 lg:grid-cols-2"
        >
          {Object.entries(skills).map(([category, skillList], categoryIndex) => (
            <div key={category} className="card">
              <h3 className="text-xl font-semibold mb-6 text-blue-400">
                {category}
              </h3>
              <div className="space-y-6">
                {skillList.map((skill, skillIndex) => (
                  <SkillBar
                    key={skill.name}
                    name={skill.name}
                    level={skill.level}
                    index={categoryIndex * skillList.length + skillIndex}
                  />
                ))}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
} 