import React, { useState, useEffect } from 'react';
import { 
  Github, 
  Linkedin, 
  Mail, 
  FileText,
  Cpu, 
  TrendingUp, 
  Database, 
  BookOpen, 
  Sigma, 
  GitBranch,
  Terminal,
  ArrowUpRight,
  Download
} from 'lucide-react';

// --- 个人数据配置 (基于 Teke Xu 的简历) ---
const profileData = {
  name: "Teke Xu",
  title: "Ph.D. in Applied Mathematics | Quantitative Researcher",
  tagline: "Bridging complex mathematical theory with real-world computational modeling.",
  about: "拥有应用数学博士学位（University of Groningen）及博士后研究经验（UCL）。专注于 PDE/ODE 数值模型、随机过程及蒙特卡洛模拟。具备从理论推导到 C++/Python 算法实现的完整能力，目前致力于将高阶数学工具应用于量化金融与复杂系统优化领域。",
  email: "brett.zju@gmail.com",
  phone: "+44-7849767951",
  location: "London, UK",
  github: "https://github.com", // 请替换为真实链接
  linkedin: "https://linkedin.com", // 请替换为真实链接
  
  // 技能分组展示，更符合研究型人才
  skillGroups: [
    {
      category: "Quantitative & Math",
      icon: Sigma,
      items: ["Stochastic Processes", "PDE/ODE Numerical Analysis", "Monte Carlo Simulation", "Bayesian Inference", "Optimisation (MILP)", "Derivatives Pricing"]
    },
    {
      category: "Programming",
      icon: Terminal,
      items: ["Python (NumPy, Pandas)", "C++ (STL, QuantLib)", "MATLAB", "SQL", "R"]
    },
    {
      category: "Data & ML",
      icon: Database,
      items: ["PyTorch", "Scikit-learn", "LightGBM/XGBoost", "Time-series Analysis", "PyMC", "Tableau"]
    }
  ],

  // 工作经历 (学术 + 业界)
  experience: [
    {
      company: "University College London (UCL)",
      role: "Postdoctoral Research Fellow",
      period: "Sep 2023 - Sep 2025",
      location: "London, UK",
      description: "开发基于物理信息的数值模型，结合 PDE 求解器与蒙特卡洛模拟进行不确定性量化。利用混合整数线性规划 (MILP) 优化 CO2 运输网络设计，提升系统运行效率。",
      tags: ["Python", "MATLAB", "Gurobi", "Optimization"]
    },
    {
      company: "University of Groningen",
      role: "PhD Researcher",
      period: "Dec 2018 - May 2023",
      location: "Groningen, NL",
      description: "研究非线性 PDE 动态系统的数值分析与控制。开发并验证了基于 Lax-Wendroff 方法的有限差分求解器，用于处理随机扰动下的系统稳定性分析。",
      tags: ["Applied Math", "PDEs", "Control Theory"]
    },
    {
      company: "eBay",
      role: "Data Analyst (CRM Analytics)",
      period: "Mar 2017 - Mar 2018",
      location: "Shanghai, China",
      description: "分析海量用户行为与销售数据，支持 A/B 测试与 GMV 敏感性分析。构建自动化 R Shiny 仪表盘，提升了 30% 的报告效率。",
      tags: ["SQL", "R", "A/B Testing", "Tableau"]
    }
  ],

  // 项目成果 (侧重 GitHub 上的量化/算法项目)
  projects: [
    {
      title: "Black-Scholes Option Pricer",
      desc: "基于 C++ 实现的模块化期权定价引擎。包含隐含波动率求解器，支持 CSV I/O，并将结果与 QuantLib 基准进行验证。计算 Greeks (Delta, Gamma 等) 用于敏感性分析。",
      tech: ["C++", "QuantLib", "Python"],
      link: "#",
      type: "Quantitative Finance"
    },
    {
      title: "Bayesian Strategy Optimisation",
      desc: "利用 PyMC 和蒙特卡洛积分构建贝叶斯决策模型，在不确定性环境下最小化预期遗憾 (Expected Regret)。包含完整的后验推断与策略可视化管线。",
      tech: ["Python", "PyMC", "Bayesian"],
      link: "#",
      type: "Data Science"
    },
    {
      title: "Gas Demand Forecasting",
      desc: "基于天气与日期特征预测天然气需求。开发并对比了线性回归基准模型与 LightGBM 回归模型，进行了深入的特征相关性分析与模型验证。",
      tech: ["Machine Learning", "LightGBM", "Scikit-learn"],
      link: "#",
      type: "Predictive Modelling"
    },
    {
      title: "Orienteering Problem Algo",
      desc: "设计并实现了路径规划优化算法（贪婪算法, 2-opt, Random Restart）。在基准测试中实现了 12% 的路径长度优化。",
      tech: ["Algorithms", "Heuristics", "Optimization"],
      link: "#",
      type: "Optimization"
    }
  ],

  // 学术论文/出版物 (PhD 亮点)
  publications: [
    "T. Xu, et al. 'Analysis of a Lax-Wendroff finite difference scheme for the water hammer problem'. (Submitted)",
    "T. Xu, et al. 'A Review of Optimization Methods for Pipeline Monitoring Systems'. Energies 18(14), 2025.",
    "T. Xu, et al. 'Dynamical boundary conditions for the water hammer problem'. HYP2022 Conference."
  ]
};

// --- 组件部分 ---

const NavItem = ({ label, active, onClick }) => (
  <button 
    onClick={onClick}
    className={`px-4 py-2 text-sm font-medium transition-colors ${
      active 
        ? 'text-slate-900 border-b-2 border-slate-900' 
        : 'text-slate-500 hover:text-slate-900'
    }`}
  >
    {label}
  </button>
);

const SectionHeading = ({ children }) => (
  <h2 className="text-2xl font-bold text-slate-800 mb-8 flex items-center gap-3 border-l-4 border-blue-800 pl-4">
    {children}
  </h2>
);

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-700 selection:bg-blue-100 selection:text-blue-900">
      
      {/* 极简风格导航栏 */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 bg-white/90 backdrop-blur-md border-b border-slate-200 ${
        scrolled ? 'py-3 shadow-sm' : 'py-5'
      }`}>
        <div className="max-w-5xl mx-auto px-6 flex justify-between items-center">
          <div className="font-serif font-bold text-xl text-slate-900 tracking-tight">
            T. Xu <span className="text-blue-700">.Math</span>
          </div>
          
          <div className="hidden md:flex gap-2">
            <NavItem label="About" active={activeSection === 'home'} onClick={() => scrollTo('home')} />
            <NavItem label="Skills" active={activeSection === 'skills'} onClick={() => scrollTo('skills')} />
            <NavItem label="Experience" active={activeSection === 'experience'} onClick={() => scrollTo('experience')} />
            <NavItem label="Projects" active={activeSection === 'projects'} onClick={() => scrollTo('projects')} />
          </div>
        </div>
      </nav>

      {/* Hero Section: 学术/量化风格 */}
      <section id="home" className="pt-40 pb-20 px-6 bg-white relative overflow-hidden">
        {/* 背景装饰：数学网格 */}
        <div className="absolute inset-0 opacity-[0.03]" 
             style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
        </div>
        
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row gap-12 items-start">
            <div className="flex-1 space-y-6">
              <div className="inline-block px-3 py-1 bg-blue-50 text-blue-800 text-xs font-bold tracking-wider uppercase rounded-sm mb-2">
                Available for Roles in London, UK
              </div>
              <h1 className="text-5xl md:text-6xl font-serif font-bold text-slate-900 leading-tight">
                {profileData.name}
              </h1>
              <p className="text-xl md:text-2xl text-slate-600 font-light">
                {profileData.title}
              </p>
              <p className="text-lg text-slate-500 max-w-2xl leading-relaxed border-l-2 border-slate-200 pl-6 my-8">
                {profileData.about}
              </p>

              <div className="flex flex-wrap gap-4 pt-4">
                <a href={profileData.github} className="flex items-center gap-2 bg-slate-900 text-white px-5 py-2.5 rounded-md hover:bg-slate-800 transition-colors">
                  <Github size={18} /> GitHub
                </a>
                <a href={profileData.linkedin} className="flex items-center gap-2 border border-slate-300 px-5 py-2.5 rounded-md hover:bg-slate-50 transition-colors text-slate-700">
                  <Linkedin size={18} /> LinkedIn
                </a>
                <a href="#" className="flex items-center gap-2 border border-blue-600 text-blue-700 px-5 py-2.5 rounded-md hover:bg-blue-50 transition-colors">
                  <Download size={18} /> Download CV
                </a>
              </div>
            </div>

            {/* 右侧：统计/概览卡片 */}
            <div className="w-full md:w-80 space-y-4">
              <div className="p-6 bg-slate-50 rounded-lg border border-slate-100">
                <h3 className="text-sm font-bold uppercase text-slate-400 mb-4 tracking-wider">Education</h3>
                <div className="space-y-4">
                  <div>
                    <div className="font-semibold text-slate-900">PhD Applied Math</div>
                    <div className="text-sm text-slate-500">Univ. of Groningen</div>
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900">MSc EE & CS</div>
                    <div className="text-sm text-slate-500">Northwestern Univ.</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-6 space-y-24 py-12">
        
        {/* Skills Section: 分类展示 */}
        <section id="skills" className="scroll-mt-24">
          <SectionHeading>Technical Expertise</SectionHeading>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {profileData.skillGroups.map((group, idx) => (
              <div key={idx} className="bg-white p-6 rounded-lg shadow-sm border border-slate-100 hover:border-blue-200 transition-colors">
                <div className="flex items-center gap-3 mb-4 text-blue-800">
                  <group.icon size={24} strokeWidth={1.5} />
                  <h3 className="font-bold text-lg">{group.category}</h3>
                </div>
                <ul className="space-y-2">
                  {group.items.map((skill, i) => (
                    <li key={i} className="flex items-center gap-2 text-slate-600 text-sm">
                      <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Experience Section: 时间轴 */}
        <section id="experience" className="scroll-mt-24">
          <SectionHeading>Academic & Professional History</SectionHeading>
          <div className="space-y-8 border-l border-slate-200 ml-3 pl-8 relative">
            {profileData.experience.map((exp, index) => (
              <div key={index} className="relative group">
                <div className="absolute -left-[39px] top-1.5 w-5 h-5 bg-white border-4 border-slate-300 rounded-full group-hover:border-blue-600 transition-colors"></div>
                
                <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-2">
                  <h3 className="text-xl font-bold text-slate-900">{exp.role}</h3>
                  <span className="text-sm font-mono text-slate-500 whitespace-nowrap">{exp.period}</span>
                </div>
                
                <div className="text-base font-medium text-blue-700 mb-2 flex items-center gap-2">
                  {exp.company} <span className="text-slate-400 text-sm font-normal">• {exp.location}</span>
                </div>
                
                <p className="text-slate-600 mb-4 text-sm leading-relaxed max-w-3xl">
                  {exp.description}
                </p>

                <div className="flex gap-2">
                  {exp.tags.map(tag => (
                    <span key={tag} className="px-2 py-1 bg-slate-100 text-slate-500 text-xs rounded border border-slate-200">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Publications (New Section) */}
        <section>
          <SectionHeading>Selected Publications</SectionHeading>
          <div className="bg-white rounded-lg border border-slate-200 overflow-hidden divide-y divide-slate-100">
            {profileData.publications.map((pub, idx) => (
              <div key={idx} className="p-4 hover:bg-slate-50 transition-colors flex gap-4">
                <BookOpen className="text-slate-400 flex-shrink-0 mt-1" size={20} />
                <p className="text-slate-700 text-sm leading-relaxed font-serif">
                  {pub}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="scroll-mt-24">
          <SectionHeading>Key Projects</SectionHeading>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {profileData.projects.map((project, index) => (
              <div key={index} className="group bg-white rounded-lg border border-slate-200 p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="flex justify-between items-start mb-4">
                  <div className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-1">{project.type}</div>
                  <ArrowUpRight className="text-slate-300 group-hover:text-blue-600 transition-colors" size={20} />
                </div>
                
                <h3 className="text-xl font-bold text-slate-900 mb-3">{project.title}</h3>
                <p className="text-slate-600 text-sm mb-6 leading-relaxed line-clamp-3">
                  {project.desc}
                </p>
                
                <div className="flex flex-wrap gap-2 mt-auto">
                  {project.tech.map(t => (
                    <span key={t} className="text-xs font-medium text-slate-600 bg-slate-100 px-2 py-1 rounded">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>

      <footer className="bg-slate-900 text-slate-400 py-12 mt-20">
        <div className="max-w-5xl mx-auto px-6 text-center md:text-left flex flex-col md:flex-row justify-between items-center">
          <div>
            <div className="font-bold text-white mb-2">{profileData.name}</div>
            <div className="text-sm">Based in London, United Kingdom</div>
          </div>
          <div className="mt-6 md:mt-0 text-sm">
            © {new Date().getFullYear()} Built with React & Tailwind.
          </div>
        </div>
      </footer>

    </div>
  );
}