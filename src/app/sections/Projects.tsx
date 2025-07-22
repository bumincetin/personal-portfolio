'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const projects = [
  {
    title: 'Waste Detection & Classification System',
    description: 'Developed an advanced computer vision system using YOLO and ResNet-18 CNN for detecting and classifying waste objects into 60 material categories. Created a scalable pipeline for efficient waste management, combining object detection and multi-class classification.',
    technologies: ['Python', 'YOLO', 'ResNet-18', 'Computer Vision', 'Deep Learning'],
    link: '#',
    github: 'https://github.com/bumincetin/Garbage-Classification-',
  },
  {
    title: 'Advanced NLP-driven Framework for Greenwashing Detection',
    description: 'Engineered an advanced NLP framework using RoBERTa and BERTweet models to quantify greenwashing risk in corporate sustainability claims. Implemented semantic contradiction index and contextual embeddings.',
    technologies: ['Python', 'RoBERTa', 'BERTweet', 'NLP'],
    link: '#',
    github: 'https://github.com/bumincetin',
  },
  {
    title: 'Playlist Recommendation System',
    description: 'Developed a custom multi-label classification model using RoBERTa to enhance music recommendation accuracy based on mood and song similarity. Achieved significant improvements through A/B testing.',
    technologies: ['Python', 'RoBERTa', 'Machine Learning', 'A/B Testing'],
    link: '#',
    github: 'https://github.com/bumincetin',
  },
  {
    title: 'Predictive Analysis of Tweet Sentiments',
    description: 'Employed time series analysis and Granger causality tests to explore the relationship between Twitter sentiments and stock prices. Used BERTweet and RoBERTa for sentiment classification.',
    technologies: ['Python', 'BERTweet', 'Time Series Analysis', 'NLP'],
    link: '#',
    github: 'https://github.com/bumincetin',
  },
]

export default function Projects() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section id="projects" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center mb-16"
        >
          <h2 className="text-4xl font-bold tracking-tight mb-6">
            Featured Projects
          </h2>
          <p className="text-lg text-gray-400">
            A selection of my data science projects showcasing expertise in machine learning,
            natural language processing, and business analytics.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 gap-8 md:grid-cols-2"
        >
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              className="group card hover:border-blue-500/50 transition-all duration-300"
            >
              <div className="flex flex-wrap gap-2 mb-4">
                {project.technologies.map((tech, techIndex) => (
                  <span
                    key={techIndex}
                    className="px-3 py-1 text-xs font-medium bg-blue-600/20 text-blue-400 rounded-full border border-blue-600/30"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              
              <h3 className="text-xl font-semibold mb-3 group-hover:text-blue-400 transition-colors">
                {project.title}
              </h3>
              
              <p className="text-gray-400 mb-6 leading-relaxed">
                {project.description}
              </p>
              
              <div className="flex gap-4 mt-auto">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                  </svg>
                  View Code
                </a>
                {project.link !== '#' && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-gray-400 hover:text-white transition-colors flex items-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    Live Demo
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
} 