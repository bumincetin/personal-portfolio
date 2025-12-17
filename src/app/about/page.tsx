'use client';

import React from 'react';
import { motion } from 'framer-motion';
import GlassCard from '../components/ui/GlassCard';
import { 
  GraduationCap, Briefcase, Code, Award, Languages, Mail, Phone, Linkedin,
  MapPin, Calendar, ExternalLink
} from 'lucide-react';

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
      "Developed an internal Data Product by fine-tuning RoBERTa to automatically flag greenwashing risk, reducing manual review time by 80%",
      "Developed a semantic contradiction index (SCI) utilizing stance detection, sentiment drift, and contextual embeddings",
      "Cross-referenced sentiment-based ESG risk scores with historical greenwashing controversies"
    ]
  },
  {
    company: "ALVOLO CONSULTING",
    role: "Founder",
    location: "Milan, Italy",
    period: "March 2025 - November 2025",
    highlights: [
      "Founded a financial advisory hub in Italy helping clients achieve their financial goals",
      "Mastered the Italian financial system to provide accurate information and guidance",
      "Managed full customer lifecycle from acquisition to retention"
    ]
  },
  {
    company: "FEDRIGONI SPA",
    role: "Junior Data Scientist",
    location: "Milan, Italy",
    period: "April 2024 - October 2024",
    highlights: [
      "Developed time-series algorithms and custom predictive models utilizing LSTM for business insights",
      "Developed a custom AI model incorporating unsupervised models and NLP techniques to optimize pricing",
      "Utilized Knime and PowerBI to operate on existing workflows and develop new analytical prototypes"
    ]
  },
  {
    company: "N26 BANK AG",
    role: "Risk Management Intern",
    location: "Berlin, Germany",
    period: "November 2022 - February 2023",
    highlights: [
      "Supported diverse processes surrounding the Internal Control System (ICS), loss database, risk register and reporting",
      "Interacted with company-wide stakeholders supporting the New Product Process (NPP)",
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

export default function AboutPage() {
  return (
    <div className="pt-32 pb-20">
      {/* Header */}
      <section className="container mx-auto px-6 mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          {/* Photo */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1"
          >
            <div className="aspect-[3/4] bg-neutral-900 rounded-[20px] overflow-hidden border border-glass-border">
              <img 
                src="/personal-portfolio/Bumin_resmi.jpeg" 
                alt="Bumin Kağan Çetin" 
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Contact Info */}
            <GlassCard className="mt-6 p-6">
              <h3 className="font-serif text-xl mb-4">Contact</h3>
              <div className="space-y-3 text-sm">
                <a href="mailto:bumin.cetin@studbocconi.it" className="flex items-center gap-3 text-text-muted hover:text-accent-cyan transition-colors">
                  <Mail size={16} className="text-accent-cyan" />
                  bumin.cetin@studbocconi.it
                </a>
                <a href="tel:+393481705207" className="flex items-center gap-3 text-text-muted hover:text-accent-cyan transition-colors">
                  <Phone size={16} className="text-accent-cyan" />
                  +39 348 170 5207
                </a>
                <a href="https://linkedin.com/in/buminkcetin" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-text-muted hover:text-accent-cyan transition-colors">
                  <Linkedin size={16} className="text-accent-cyan" />
                  linkedin.com/in/buminkcetin
                </a>
                <div className="flex items-center gap-3 text-text-muted">
                  <MapPin size={16} className="text-accent-cyan" />
                  Milan, Italy
                </div>
              </div>
            </GlassCard>
          </motion.div>

          {/* Bio */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2"
          >
            <p className="text-accent-cyan font-mono mb-4 tracking-widest text-sm">ABOUT ME</p>
            <h1 className="font-serif text-5xl md:text-6xl mb-6">Bumin Kağan Çetin</h1>
            <p className="text-text-muted text-lg mb-6 font-light leading-relaxed">
              I&apos;m a Data Scientist and AI Specialist currently pursuing my Master&apos;s in Data Science and Business Analytics at Bocconi University. My expertise lies at the intersection of Natural Language Processing, deep learning, and financial analytics.
            </p>
            <p className="text-text-muted text-lg mb-6 font-light leading-relaxed">
              My research focuses on developing AI-powered solutions for real-world challenges, including my thesis work on detecting greenwashing risks in corporate communications using advanced NLP techniques like fine-tuned RoBERTa models and semantic analysis.
            </p>
            <p className="text-text-muted text-lg mb-8 font-light leading-relaxed">
              With experience spanning risk management at N26, data science at Fedrigoni, and AI research at ImpactScope, I bring a unique blend of technical expertise and business acumen. As a founder of Alvolo Consulting, I&apos;ve also led cross-border financial advisory initiatives in Italy.
            </p>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <GlassCard className="p-4 text-center">
                <div className="text-3xl font-serif text-accent-cyan mb-1">4+</div>
                <div className="text-xs text-text-muted font-mono uppercase">Languages</div>
              </GlassCard>
              <GlassCard className="p-4 text-center">
                <div className="text-3xl font-serif text-accent-cyan mb-1">7+</div>
                <div className="text-xs text-text-muted font-mono uppercase">Certifications</div>
              </GlassCard>
              <GlassCard className="p-4 text-center">
                <div className="text-3xl font-serif text-accent-cyan mb-1">4</div>
                <div className="text-xs text-text-muted font-mono uppercase">Work Experiences</div>
              </GlassCard>
              <GlassCard className="p-4 text-center">
                <div className="text-3xl font-serif text-accent-cyan mb-1">2</div>
                <div className="text-xs text-text-muted font-mono uppercase">Degrees</div>
              </GlassCard>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Education */}
      <section className="container mx-auto px-6 mb-20">
        <div className="flex items-center gap-4 mb-8">
          <GraduationCap className="text-accent-cyan" size={28} />
          <h2 className="font-serif text-3xl">Education</h2>
        </div>
        <div className="space-y-6">
          {education.map((edu, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <GlassCard className="p-8">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                  <div>
                    <h3 className="text-xl font-serif text-white">{edu.school}</h3>
                    <p className="text-accent-cyan font-mono text-sm">{edu.degree}</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-2 text-text-muted text-sm">
                      <MapPin size={14} />
                      {edu.location}
                    </div>
                    <div className="flex items-center gap-2 text-text-muted text-sm">
                      <Calendar size={14} />
                      {edu.period}
                    </div>
                  </div>
                </div>
                <p className="text-text-muted text-sm mb-3">
                  <strong className="text-white">Coursework:</strong> {edu.coursework.join(", ")}
                </p>
                <p className="text-text-muted text-sm">
                  <strong className="text-white">Thesis:</strong> {edu.thesis}
                </p>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Experience */}
      <section className="container mx-auto px-6 mb-20">
        <div className="flex items-center gap-4 mb-8">
          <Briefcase className="text-accent-cyan" size={28} />
          <h2 className="font-serif text-3xl">Work Experience</h2>
        </div>
        <div className="space-y-6">
          {experience.map((exp, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <GlassCard className="p-8">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                  <div>
                    <h3 className="text-xl font-serif text-white">{exp.company}</h3>
                    <p className="text-accent-cyan font-mono text-sm">{exp.role}</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-2 text-text-muted text-sm">
                      <MapPin size={14} />
                      {exp.location}
                    </div>
                    <div className="flex items-center gap-2 text-text-muted text-sm">
                      <Calendar size={14} />
                      {exp.period}
                    </div>
                  </div>
                </div>
                <ul className="space-y-2">
                  {exp.highlights.map((highlight, i) => (
                    <li key={i} className="text-text-muted text-sm flex items-start gap-3">
                      <span className="w-1.5 h-1.5 bg-accent-purple rounded-full mt-2 shrink-0"></span>
                      {highlight}
                    </li>
                  ))}
                </ul>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Skills & Certifications */}
      <section className="container mx-auto px-6 mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Skills */}
          <div>
            <div className="flex items-center gap-4 mb-8">
              <Code className="text-accent-cyan" size={28} />
              <h2 className="font-serif text-3xl">Skills</h2>
            </div>
            <GlassCard className="p-8">
              <h4 className="font-mono text-accent-cyan text-sm mb-4">PROGRAMMING</h4>
              <div className="space-y-4 mb-8">
                {skills.programming.map((skill, idx) => (
                  <div key={idx}>
                    <div className="font-serif text-white mb-1">{skill.name}</div>
                    <div className="text-text-muted text-sm">{skill.details}</div>
                  </div>
                ))}
              </div>
              <h4 className="font-mono text-accent-cyan text-sm mb-4">TOOLS & TECHNOLOGIES</h4>
              <div className="flex flex-wrap gap-2">
                {skills.tools.map((tool, idx) => (
                  <span key={idx} className="px-3 py-1 text-sm font-mono bg-glass-surface border border-glass-border rounded-full text-text-muted">
                    {tool}
                  </span>
                ))}
              </div>
            </GlassCard>
          </div>

          {/* Certifications & Languages */}
          <div className="space-y-8">
            <div>
              <div className="flex items-center gap-4 mb-8">
                <Award className="text-accent-cyan" size={28} />
                <h2 className="font-serif text-3xl">Certifications</h2>
              </div>
              <GlassCard className="p-8">
                <ul className="space-y-3">
                  {certifications.map((cert, idx) => (
                    <li key={idx} className="text-text-muted text-sm flex items-start gap-3">
                      <span className="w-1.5 h-1.5 bg-accent-cyan rounded-full mt-2 shrink-0"></span>
                      {cert}
                    </li>
                  ))}
                </ul>
              </GlassCard>
            </div>

            <div>
              <div className="flex items-center gap-4 mb-8">
                <Languages className="text-accent-cyan" size={28} />
                <h2 className="font-serif text-3xl">Languages</h2>
              </div>
              <GlassCard className="p-8">
                <div className="grid grid-cols-2 gap-4">
                  {languages.map((lang, idx) => (
                    <div key={idx} className="text-center">
                      <div className="font-serif text-white text-lg">{lang.lang}</div>
                      <div className="text-text-muted text-sm">{lang.level}</div>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

