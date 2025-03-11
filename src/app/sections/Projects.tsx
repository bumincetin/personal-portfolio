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
          className="mx-auto max-w-2xl text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Featured Projects
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
            A selection of my data science projects showcasing expertise in machine learning,
            natural language processing, and business analytics.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3"
        >
          {projects.map((project, index) => (
            <article key={index} className="flex flex-col items-start">
              <div className="rounded-2xl bg-gray-50 dark:bg-gray-800 p-6 ring-1 ring-inset ring-gray-900/10 dark:ring-gray-100/10 w-full">
                <div className="flex items-center gap-x-4 text-xs">
                  {project.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="text-gray-500 dark:text-gray-400"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="group relative">
                  <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 dark:text-white">
                    <a href={project.link} target="_blank" rel="noopener noreferrer">
                      <span className="absolute inset-0" />
                      {project.title}
                    </a>
                  </h3>
                  <p className="mt-5 text-sm leading-6 text-gray-600 dark:text-gray-300">
                    {project.description}
                  </p>
                </div>
                <div className="mt-6">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-semibold leading-6 text-blue-600 dark:text-blue-400"
                  >
                    View on GitHub <span aria-hidden="true">→</span>
                  </a>
                </div>
              </div>
            </article>
          ))}
        </motion.div>
      </div>
    </section>
  )
} 