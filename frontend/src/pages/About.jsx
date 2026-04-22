import { useEffect, useState } from 'react'
import {
  FaReact, FaCss3Alt, FaHtml5, FaNodeJs, FaPhp, FaDocker,
  FaPython, FaVuejs, FaAngular, FaJs, FaJava, FaGitAlt,
  FaLinux, FaWordpress, FaAws,
} from 'react-icons/fa'
import {
  SiNextdotjs, SiMysql, SiNuxt, SiSvelte, SiGatsby,
  SiSass, SiTailwindcss, SiRedux, SiTypescript, SiVite, SiWebpack,
  SiLaravel, SiSymfony, SiDjango, SiFlask, SiSpring, SiRuby,
  SiRubyonrails, SiGo, SiRust, SiPostgresql, SiMongodb, SiRedis,
  SiSqlite, SiKubernetes, SiGooglecloud, SiNginx,
  SiApache, SiFirebase, SiGithub, SiGitlab, SiGraphql,
} from 'react-icons/si'
import { getSettings, getCompetences } from '../api'

const iconMap = {
  FaReact:       <FaReact size={36} className="text-[#61DAFB]" />,
  SiNextdotjs:   <SiNextdotjs size={36} className="text-black" />,
  FaVuejs:       <FaVuejs size={36} className="text-[#42b883]" />,
  SiNuxt:   <SiNuxt size={36} className="text-[#00C58E]" />,
  FaAngular:     <FaAngular size={36} className="text-[#DD0031]" />,
  SiSvelte:      <SiSvelte size={36} className="text-[#FF3E00]" />,
  SiGatsby:      <SiGatsby size={36} className="text-[#663399]" />,
  FaHtml5:       <FaHtml5 size={36} className="text-[#E34F26]" />,
  FaCss3Alt:     <FaCss3Alt size={36} className="text-[#1572B6]" />,
  SiSass:        <SiSass size={36} className="text-[#CC6699]" />,
  SiTailwindcss: <SiTailwindcss size={36} className="text-[#06B6D4]" />,
  SiRedux:       <SiRedux size={36} className="text-[#764ABC]" />,
  SiTypescript:  <SiTypescript size={36} className="text-[#3178C6]" />,
  FaJs:          <FaJs size={36} className="text-[#F7DF1E]" />,
  SiVite:        <SiVite size={36} className="text-[#646CFF]" />,
  SiWebpack:     <SiWebpack size={36} className="text-[#8DD6F9]" />,
  FaNodeJs:      <FaNodeJs size={36} className="text-[#339933]" />,
  FaPhp:         <FaPhp size={36} className="text-[#777BB4]" />,
  SiLaravel:     <SiLaravel size={36} className="text-[#FF2D20]" />,
  SiSymfony:     <SiSymfony size={36} className="text-black" />,
  FaPython:      <FaPython size={36} className="text-[#3776AB]" />,
  SiDjango:      <SiDjango size={36} className="text-[#092E20]" />,
  SiFlask:       <SiFlask size={36} className="text-black" />,
  FaJava:        <FaJava size={36} className="text-[#007396]" />,
  SiSpring:      <SiSpring size={36} className="text-[#6DB33F]" />,
  SiRuby:        <SiRuby size={36} className="text-[#CC342D]" />,
  SiRubyonrails: <SiRubyonrails size={36} className="text-[#CC0000]" />,
  SiGo:          <SiGo size={36} className="text-[#00ADD8]" />,
  SiRust:        <SiRust size={36} className="text-[#000000]" />,
  SiMysql:       <SiMysql size={36} className="text-[#4479A1]" />,
  SiPostgresql:  <SiPostgresql size={36} className="text-[#336791]" />,
  SiMongodb:     <SiMongodb size={36} className="text-[#47A248]" />,
  SiRedis:       <SiRedis size={36} className="text-[#DC382D]" />,
  SiSqlite:      <SiSqlite size={36} className="text-[#003B57]" />,
  FaDocker:      <FaDocker size={36} className="text-[#2496ED]" />,
  SiKubernetes:  <SiKubernetes size={36} className="text-[#326CE5]" />,
  FaAws:         <FaAws size={36} className="text-[#FF9900]" />,
  SiGooglecloud: <SiGooglecloud size={36} className="text-[#4285F4]" />,
  SiNginx:       <SiNginx size={36} className="text-[#009639]" />,
  SiApache:      <SiApache size={36} className="text-[#D22128]" />,
  SiFirebase:    <SiFirebase size={36} className="text-[#FFCA28]" />,
  FaGitAlt:      <FaGitAlt size={36} className="text-[#F05032]" />,
  SiGithub:      <SiGithub size={36} className="text-black" />,
  SiGitlab:      <SiGitlab size={36} className="text-[#FC6D26]" />,
  SiGraphql:     <SiGraphql size={36} className="text-[#E10098]" />,
  FaLinux:       <FaLinux size={36} className="text-black" />,
  FaWordpress:   <FaWordpress size={36} className="text-[#21759B]" />,
}

function SkillCard({ nom, icone }) {
  return (
    <div className="flex flex-col items-center gap-2 p-4 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md hover:-translate-y-1 transition-all w-24">
      {iconMap[icone] || <span className="text-2xl">🔧</span>}
      <span className="text-xs text-gray-600 font-medium">{nom}</span>
    </div>
  )
}

function About() {
  const [settings, setSettings] = useState({})
  const [competences, setCompetences] = useState([])

  useEffect(() => {
    getSettings().then(setSettings)
    getCompetences().then(setCompetences)
  }, [])

  const frontend = competences.filter((c) => c.categorie === 'frontend')
  const backend  = competences.filter((c) => c.categorie === 'backend')

  return (
    <div className="max-w-5xl mx-auto px-8 py-20 animate-fade-in">

      <section className="flex flex-col md:flex-row items-center gap-12 mb-20">
        <div className="flex-shrink-0">
          {settings.photo ? (
            <img src={`http://localhost:8000${settings.photo}`} alt={settings.nom} className="w-64 h-72 object-cover rounded-lg shadow-md" />
          ) : (
            <div className="w-64 h-72 bg-[#1A1A2E] rounded-lg shadow-md flex items-center justify-center">
              <span className="text-gray-500 text-sm">Image à ajouter</span>
            </div>
          )}
        </div>
        <div className="flex flex-col gap-4 animate-slide-up">
          <h1 className="text-4xl font-bold text-[#1A1A2E]">{settings.nom}</h1>
          <p className="text-[#E94560] font-medium">{settings.titre}</p>
          <p className="text-gray-500 leading-relaxed">{settings.bio}</p>
        </div>
      </section>

      <section className="animate-slide-up-delay">
        <h2 className="text-3xl font-bold text-[#1A1A2E] mb-10">Compétences</h2>
        {frontend.length > 0 && (
          <div className="mb-10">
            <h3 className="text-lg font-semibold text-gray-400 uppercase tracking-widest mb-6">Frontend</h3>
            <div className="flex flex-wrap gap-4">
              {frontend.map((c) => <SkillCard key={c.id} nom={c.nom} icone={c.icone} />)}
            </div>
          </div>
        )}
        {backend.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold text-gray-400 uppercase tracking-widest mb-6">Backend</h3>
            <div className="flex flex-wrap gap-4">
              {backend.map((c) => <SkillCard key={c.id} nom={c.nom} icone={c.icone} />)}
            </div>
          </div>
        )}
      </section>

      <section className="mt-24 animate-slide-up-delay">
        <h2 className="text-3xl font-bold text-[#1A1A2E] mb-12">Autres compétences</h2>
        <div className="flex flex-col md:flex-row items-center gap-12 bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
          <div className="flex-shrink-0 w-full md:w-72 h-64 bg-[#1A1A2E] flex items-center justify-center overflow-hidden">
            {settings.autre_image ? (
              <img src={`http://localhost:8000${settings.autre_image}`} alt="autre" className="w-full h-full object-cover" />
            ) : (
              <span className="text-gray-500 text-sm">Image à ajouter</span>
            )}
          </div>
          <div className="flex flex-col gap-4 p-8">
            <h3 className="text-2xl font-bold text-[#1A1A2E]">{settings.autre_titre}</h3>
            <p className="text-gray-500 leading-relaxed">{settings.autre_texte}</p>
          </div>
        </div>
      </section>

    </div>
  )
}

export default About
