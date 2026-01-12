'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Briefcase, Code, Award, Languages, Mail, Phone, Linkedin, MapPin, Calendar, ArrowRight } from 'lucide-react';
import { getTranslation, type Locale } from '@/lib/translations';

const education = [
  {
    school: "Bocconi University",
    degree: "Master of Science in Data Science and Business Analytics",
    location: "Milan, Italy",
    period: "2023 - 2025",
    coursework: ["Deep Learning for Computer Vision", "Simulation & Modeling", "Natural Language Processing"],
    thesis: "Auditable Detection of Greenwashing Risk in Corporate Communications"
  },
  {
    school: "Bocconi University",
    degree: "Bachelor of Science in Economics, Management, and Computer Science",
    location: "Milan, Italy",
    period: "2020 - 2023",
    coursework: ["Econometrics", "Big Data and Databases", "Programming", "IT Law", "Machine Learning"],
    thesis: "A Study of Predictive Techniques for Parliamentary Elections: A Case Study of Turkish Parliament"
  }
];

const experience = [
  {
    company: "IMPACTSCOPE",
    role: "AI Specialist | NLP Researcher",
    location: "Remote, Switzerland",
    period: "December 2024 - December 2025",
    highlights: [
      "Developed Data Product by fine-tuning RoBERTa to flag greenwashing risk, reducing manual review time by 80%",
      "Developed semantic contradiction index (SCI) utilizing stance detection and sentiment drift",
      "Cross-referenced sentiment-based ESG risk scores with historical greenwashing controversies"
    ]
  },
  {
    company: "ALVOLO CONSULTING",
    role: "Founder",
    location: "Milan, Italy",
    period: "March 2025 - November 2025",
    highlights: [
      "Founded financial advisory hub in Italy helping clients achieve their financial goals",
      "Mastered Italian financial system to provide accurate information and guidance",
      "Managed full customer lifecycle from acquisition to retention"
    ]
  },
  {
    company: "FEDRIGONI SPA",
    role: "Junior Data Scientist",
    location: "Milan, Italy",
    period: "April 2024 - October 2024",
    highlights: [
      "Developed time-series algorithms and custom predictive models utilizing LSTM",
      "Developed custom AI model incorporating unsupervised models and NLP to optimize pricing",
      "Utilized Knime and PowerBI to develop new analytical prototypes"
    ]
  },
  {
    company: "N26 BANK AG",
    role: "Risk Management Intern",
    location: "Berlin, Germany",
    period: "November 2022 - February 2023",
    highlights: [
      "Supported Internal Control System (ICS), loss database, risk register and reporting",
      "Interacted with stakeholders supporting New Product Process (NPP)",
      "Helped in identifying, assessing, mitigating and monitoring non-financial risks"
    ]
  }
];

const skills = {
  programming: [
    { name: "Python", details: "Scikit-Learn, PyTorch, PySpark, Apache Airflow, TensorFlow, Keras" },
    { name: "R", details: "dplyr, mlr3, tidyverse, Statistical Analysis" },
    { name: "SQL", details: "MySQL, Postgres, Snowflake" },
    { name: "NoSQL", details: "MongoDB" }
  ],
  tools: ["PowerBI", "Knime", "Microsoft Suite", "LaTeX", "Git", "Docker", "Shell"]
};

const certifications = [
  "Google Advanced Data Analytics Specialization",
  "Stanford | DeepLearning.AI Machine Learning Specialization",
  "Datacamp: Certified Data Scientist Python",
  "Datacamp: Certified Data Engineer",
  "Database Design",
  "Introduction to Git",
  "Data Pipelines"
];

const languages = [
  { lang: "Turkish", level: "Native" },
  { lang: "English", level: "Native" },
  { lang: "Italian", level: "Advanced (C1)" },
  { lang: "German", level: "Intermediate (B1)" }
];

export default function AboutPageClient({ locale }: { locale: Locale }) {
  const t = getTranslation(locale);

  return (
    <div className="pt-24 md:pt-32 pb-12 md:pb-20 bg-cream">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 mb-16 md:mb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Image Column */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }} 
            animate={{ opacity: 1, x: 0 }} 
            className="lg:col-span-4"
          >
            {/* Portrait with enhanced framing */}
            <div className="relative max-w-[320px]">
              {/* Background Card */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="absolute -inset-4 bg-white border border-border -z-20"
              ></motion.div>
              
              <div className="relative aspect-[3/4]">
                {/* Offset decorative border */}
                <motion.div 
                  initial={{ opacity: 0, x: 10, y: 10 }}
                  animate={{ opacity: 1, x: 0, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="absolute top-4 left-4 right-0 bottom-0 border-2 border-accent -z-10"
                ></motion.div>
                
                {/* Main Image */}
                <div className="relative bg-white overflow-hidden shadow-editorial">
                  <img 
                    src="/personal-portfolio/Bumin_resmi.jpeg" 
                    alt="Bumin Kağan Çetin" 
                    className="w-full h-full object-cover"
                  />
                  {/* Subtle gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/10 to-transparent"></div>
                </div>
                
                {/* Corner accent */}
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: 60 }}
                  transition={{ duration: 0.4, delay: 0.5 }}
                  className="absolute -bottom-2 -right-2 h-[3px] bg-accent"
                ></motion.div>
                <motion.div 
                  initial={{ height: 0 }}
                  animate={{ height: 60 }}
                  transition={{ duration: 0.4, delay: 0.5 }}
                  className="absolute -bottom-2 -right-2 w-[3px] bg-accent"
                ></motion.div>
              </div>
            </div>
            
            {/* Contact Card */}
            <div className="mt-8 p-6 bg-white border border-border">
              <h3 className="font-serif text-lg mb-4 text-charcoal">{t.aboutPage.contact}</h3>
              <div className="space-y-3 font-mono text-sm">
                <a href="mailto:bumin.cetin@studbocconi.it" className="flex items-center gap-3 text-muted hover:text-accent transition-colors">
                  <Mail size={14} className="text-accent flex-shrink-0" />
                  <span className="truncate">bumin.cetin@studbocconi.it</span>
                </a>
                <a href="tel:+393481705207" className="flex items-center gap-3 text-muted hover:text-accent transition-colors">
                  <Phone size={14} className="text-accent flex-shrink-0" />
                  +39 348 170 5207
                </a>
                <a href="https://linkedin.com/in/buminkcetin" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-muted hover:text-accent transition-colors">
                  <Linkedin size={14} className="text-accent flex-shrink-0" />
                  <span className="truncate">linkedin.com/in/buminkcetin</span>
                </a>
                <div className="flex items-center gap-3 text-muted">
                  <MapPin size={14} className="text-accent flex-shrink-0" />
                  Milan, Italy
                </div>
              </div>
            </div>
          </motion.div>

          {/* Content Column */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }} 
            animate={{ opacity: 1, x: 0 }} 
            transition={{ delay: 0.2 }} 
            className="lg:col-span-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-[2px] bg-accent"></div>
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
                {t.aboutPage.aboutMe}
              </span>
            </div>
            
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-charcoal mb-6">
              Bumin Kağan Çetin
            </h1>
            
            <p className="font-mono text-base text-muted mb-4 leading-relaxed max-w-2xl">
              {t.about.desc1}
            </p>
            <p className="font-mono text-base text-muted mb-10 leading-relaxed max-w-2xl">
              {t.about.desc2}
            </p>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 bg-white border border-border text-center">
                <div className="text-3xl font-serif text-charcoal mb-1">4+</div>
                <div className="text-xs text-muted font-mono uppercase tracking-wider">{t.aboutPage.stats.languages}</div>
              </div>
              <div className="p-4 bg-white border border-border text-center">
                <div className="text-3xl font-serif text-charcoal mb-1">7+</div>
                <div className="text-xs text-muted font-mono uppercase tracking-wider">{t.aboutPage.stats.certifications}</div>
              </div>
              <div className="p-4 bg-white border border-border text-center">
                <div className="text-3xl font-serif text-charcoal mb-1">4</div>
                <div className="text-xs text-muted font-mono uppercase tracking-wider">{t.aboutPage.stats.experiences}</div>
              </div>
              <div className="p-4 bg-white border border-border text-center">
                <div className="text-3xl font-serif text-charcoal mb-1">2</div>
                <div className="text-xs text-muted font-mono uppercase tracking-wider">{t.aboutPage.stats.degrees}</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Education Section */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 mb-16 md:mb-24">
        <div className="flex items-center gap-4 mb-8">
          <GraduationCap className="text-accent" size={24} />
          <h2 className="font-serif text-2xl md:text-3xl text-charcoal">{t.aboutPage.education}</h2>
        </div>
        <div className="space-y-6">
          {education.map((edu, idx) => (
            <motion.div 
              key={idx} 
              initial={{ opacity: 0, y: 20 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }} 
              transition={{ delay: idx * 0.1 }}
              className="bg-white border border-border p-6 md:p-8 hover:shadow-editorial transition-shadow"
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                <div>
                  <h3 className="text-xl font-serif text-charcoal">{edu.school}</h3>
                  <p className="text-accent font-mono text-sm">{edu.degree}</p>
                </div>
                <div className="flex flex-row md:flex-col md:text-right gap-4 md:gap-1 text-muted font-mono text-sm">
                  <div className="flex items-center gap-2"><MapPin size={12} />{edu.location}</div>
                  <div className="flex items-center gap-2"><Calendar size={12} />{edu.period}</div>
                </div>
              </div>
              <p className="text-muted font-mono text-sm mb-2">
                <strong className="text-charcoal">{t.aboutPage.coursework}:</strong> {edu.coursework.join(", ")}
              </p>
              <p className="text-muted font-mono text-sm">
                <strong className="text-charcoal">{t.aboutPage.thesis}:</strong> {edu.thesis}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Experience Section */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 mb-16 md:mb-24">
        <div className="flex items-center gap-4 mb-8">
          <Briefcase className="text-accent" size={24} />
          <h2 className="font-serif text-2xl md:text-3xl text-charcoal">{t.aboutPage.experience}</h2>
        </div>
        <div className="space-y-6">
          {experience.map((exp, idx) => (
            <motion.div 
              key={idx} 
              initial={{ opacity: 0, y: 20 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }} 
              transition={{ delay: idx * 0.1 }}
              className="bg-white border border-border p-6 md:p-8 hover:shadow-editorial transition-shadow"
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                <div>
                  <h3 className="text-xl font-serif text-charcoal">{exp.company}</h3>
                  <p className="text-accent font-mono text-sm">{exp.role}</p>
                </div>
                <div className="flex flex-row md:flex-col md:text-right gap-4 md:gap-1 text-muted font-mono text-sm">
                  <div className="flex items-center gap-2"><MapPin size={12} />{exp.location}</div>
                  <div className="flex items-center gap-2"><Calendar size={12} />{exp.period}</div>
                </div>
              </div>
              <ul className="space-y-2">
                {exp.highlights.map((highlight, i) => (
                  <li key={i} className="text-muted font-mono text-sm flex items-start gap-3">
                    <span className="w-1.5 h-1.5 bg-accent rounded-full mt-2 shrink-0"></span>
                    {highlight}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Skills & Certifications Grid */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 mb-16 md:mb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Skills */}
          <div>
            <div className="flex items-center gap-4 mb-8">
              <Code className="text-accent" size={24} />
              <h2 className="font-serif text-2xl md:text-3xl text-charcoal">{t.aboutPage.skills}</h2>
            </div>
            <div className="bg-white border border-border p-6 md:p-8">
              <h4 className="font-mono text-xs uppercase tracking-wider text-accent mb-4">{t.aboutPage.programming}</h4>
              <div className="space-y-4 mb-8">
                {skills.programming.map((skill, idx) => (
                  <div key={idx} className="border-b border-border pb-3">
                    <div className="font-serif text-charcoal mb-1">{skill.name}</div>
                    <div className="text-muted font-mono text-sm">{skill.details}</div>
                  </div>
                ))}
              </div>
              <h4 className="font-mono text-xs uppercase tracking-wider text-accent mb-4">{t.aboutPage.tools}</h4>
              <div className="flex flex-wrap gap-2">
                {skills.tools.map((tool, idx) => (
                  <span key={idx} className="px-3 py-1.5 text-xs font-mono bg-surface-alt border border-border text-muted">
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Certifications & Languages */}
          <div className="space-y-8">
            {/* Certifications */}
            <div>
              <div className="flex items-center gap-4 mb-8">
                <Award className="text-accent" size={24} />
                <h2 className="font-serif text-2xl md:text-3xl text-charcoal">{t.aboutPage.certifications}</h2>
              </div>
              <div className="bg-white border border-border p-6 md:p-8">
                <ul className="space-y-3">
                  {certifications.map((cert, idx) => (
                    <li key={idx} className="text-muted font-mono text-sm flex items-start gap-3">
                      <span className="w-1.5 h-1.5 bg-accent rounded-full mt-2 shrink-0"></span>
                      {cert}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Languages */}
            <div>
              <div className="flex items-center gap-4 mb-8">
                <Languages className="text-accent" size={24} />
                <h2 className="font-serif text-2xl md:text-3xl text-charcoal">{t.aboutPage.languages}</h2>
              </div>
              <div className="bg-white border border-border p-6 md:p-8">
                <div className="grid grid-cols-2 gap-4">
                  {languages.map((lang, idx) => (
                    <div key={idx} className="text-center p-4 border border-border">
                      <div className="font-serif text-charcoal text-lg">{lang.lang}</div>
                      <div className="text-muted font-mono text-sm">{lang.level}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        <div className="bg-charcoal p-8 md:p-12 text-center">
          <h3 className="font-serif text-2xl md:text-3xl text-cream mb-4">
            Interested in working together?
          </h3>
          <p className="font-mono text-sm text-cream/70 mb-8 max-w-lg mx-auto">
            Whether you need data science expertise, financial consulting, or AI solutions—let's discuss your project.
          </p>
          <a 
            href="mailto:cetinbumink@gmail.com"
            className="group inline-flex items-center gap-3 px-8 py-4 bg-accent text-cream font-mono text-sm uppercase tracking-wider transition-all duration-300 hover:bg-accent/90"
          >
            Get in Touch
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </section>
    </div>
  );
}
