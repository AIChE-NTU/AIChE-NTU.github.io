import React, { useState, useEffect, JSX } from 'react';
// Adjust these import paths to match your project structure
import type { Professor } from '../../../constants';
import { getDataUrl } from '../../../constants';
import { LinkedinIcon } from '../../ui/Icons';
import Spinner from '../../ui/Spinner';

// --- INTERFACES (UPDATED) ---
interface TeamMember {
  name: string;
  role: string;
  imageUrl: string;
  linkedinUrl: string;
  bio?: string;
  type: 'lead' | 'member'; // Added type for conditional styling
}
interface TeamData {
  description: string;
  subTeams?: Record<string, TeamMember[]>;
  members?: TeamMember[];
}

// --- REUSABLE CARD COMPONENTS (REVISED FOR LEAD TYPE) ---
const TeamMemberCard: React.FC<{ member: TeamMember }> = ({ member }) => {
    const isLead = member.type === 'lead';

    const frontBorderClasses = isLead
        ? 'border-4 border-amber-400 shadow-lg shadow-amber-400/30'
        : 'border-2 border-primary/20';
        
    const roleTextClasses = isLead ? 'text-amber-500' : 'text-primary';

    const backGradientClasses = isLead
        ? 'bg-gradient-to-br from-amber-500 to-amber-600'
        : 'bg-gradient-to-br from-primary to-primary-focus';

    return (
        <div className="group w-full max-w-md h-[32rem] [perspective:1000px]">
            <div className="relative h-full w-full rounded-2xl shadow-2xl transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                {/* Front of Card */}
                <div className={`absolute inset-0 bg-surface rounded-2xl p-8 flex flex-col items-center justify-center text-center [backface-visibility:hidden] transition-all duration-300 ${frontBorderClasses}`}>
                    <div className="overflow-hidden w-full flex-1 flex justify-center items-center">
                        <img src={member.imageUrl} alt={member.name} className="w-full h-full object-cover rounded-xl"/>
                    </div>
                    <div className="mt-6 w-full">
                        <h3 className="text-xl font-bold text-text-main mb-1">{member.name}</h3>
                        <p className={`font-semibold text-base ${roleTextClasses}`}>{member.role}</p>
                    </div>
                </div>
                {/* Back of Card */}
                <div className={`absolute inset-0 rounded-2xl p-8 text-center text-white [transform:rotateY(180deg)] [backface-visibility:hidden] flex flex-col items-center justify-center overflow-y-auto ${backGradientClasses}`}>
                    <div className="flex-grow flex flex-col justify-center items-center">
                        <h3 className="text-xl font-bold mb-2">{member.name}</h3>
                        <p className="font-semibold mb-4">{member.role}</p>
                        <div className="border-t border-white/30 w-1/3 mx-auto my-3"></div>
                        <p className="text-sm leading-relaxed px-2">{member.bio || 'Further details will be available soon.'}</p>
                    </div>
                    {member.linkedinUrl && member.linkedinUrl !== "#" && (
                        <a
                            href={member.linkedinUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-4 flex-shrink-0 inline-flex items-center justify-center gap-2 bg-white/20 hover:bg-white/30 text-white font-bold py-3 px-6 rounded-full transition-all"
                            aria-label={`${member.name}'s LinkedIn profile`}
                        >
                            <LinkedinIcon className="w-5 h-5" />
                            <span>LinkedIn</span>
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
};


const ProfessorCard: React.FC<{ prof: Professor }> = ({ prof }) => (
    <div className="bg-surface rounded-2xl shadow-lg overflow-hidden flex flex-col sm:flex-row items-center gap-8 p-8 border border-primary/10 hover:shadow-primary/20 transition-all duration-300">
        <img src={prof.imageUrl} alt={prof.name} className="w-40 h-40 rounded-full object-cover border-4 border-primary/20 flex-shrink-0 shadow-lg" />
        <div className="text-center sm:text-left">
            <h3 className="text-2xl font-bold text-text-main mb-2">{prof.name}</h3>
            <p className="font-semibold text-primary mb-3 text-lg">{prof.title}</p>
            <p className="text-base text-text-muted leading-relaxed">{prof.research}</p>
        </div>
    </div>
);

// --- MAIN ABOUT PAGE COMPONENT ---
const AboutPage: React.FC = () => {
  const [teamData, setTeamData] = useState<Record<string, TeamData> | null>(null);
  const [professors, setProfessors] = useState<Professor[]>([]);
  const [imageUrls, setImageUrls] = useState<{ mission: string | null; teamPhoto: string | null }>({ mission: null, teamPhoto: null });
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const [activeSubTab, setActiveSubTab] = useState<string | null>(null);
  const [animatedCounts, setAnimatedCounts] = useState({ activeMembersCount: 0, exposedMembersCount: 0, annualEventsCount: 0, yearsOfOperation: 0 });

  const foundingYear = 2022;
  const activeMembersCount = 30;
  const annualEventsCount = 10;
  const exposedMembersCount = 1500;
  const yearsOfOperation = new Date().getFullYear() - foundingYear;

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [teamRes, logoRes, profRes] = await Promise.all([
            fetch(getDataUrl('team.json')),
            fetch(getDataUrl('logo.json')),
            fetch(getDataUrl('professors.json'))
        ]);
        const teamJson = await teamRes.json();
        const logoData = await logoRes.json();
        const profData = await profRes.json();
        
        setTeamData(teamJson);
        setProfessors(profData);
        setImageUrls({ mission: logoData.missionImageUrl, teamPhoto: logoData.aboutPageTeamPhoto });
        
        if (teamJson) {
            const firstTeamName = Object.keys(teamJson)[0];
            setActiveTab(firstTeamName);
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (!teamData || !activeTab) return;
    const currentTeam = teamData[activeTab];
    if (currentTeam?.subTeams) {
        setActiveSubTab(Object.keys(currentTeam.subTeams)[0]);
    } else {
        setActiveSubTab(null);
    }
  }, [activeTab, teamData]);
  
  useEffect(() => {
    if (isLoading) return;
    const animateCount = (target: number, key: keyof typeof animatedCounts) => {
        const duration = 2000, stepTime = 30;
        const totalSteps = Math.round(duration / stepTime);
        const increment = target / totalSteps;
        let current = 0;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            setAnimatedCounts(prev => ({ ...prev, [key]: Math.floor(current) }));
        }, stepTime);
        return () => clearInterval(timer);
    };
    setTimeout(() => animateCount(activeMembersCount, 'activeMembersCount'), 0);
    setTimeout(() => animateCount(exposedMembersCount, 'exposedMembersCount'), 200);
    setTimeout(() => animateCount(annualEventsCount, 'annualEventsCount'), 400);
    setTimeout(() => animateCount(yearsOfOperation, 'yearsOfOperation'), 600);
  }, [isLoading, activeMembersCount, exposedMembersCount, annualEventsCount, yearsOfOperation]);

  const currentTeamData = teamData && activeTab ? teamData[activeTab] : null;
  const membersToDisplay = currentTeamData?.subTeams && activeSubTab 
    ? currentTeamData.subTeams[activeSubTab] 
    : currentTeamData?.members;

  const renderSection = (content: JSX.Element) => isLoading ? <div className="flex justify-center py-20"><Spinner /></div> : content;

  return (
    <div className="min-h-screen w-full bg-background">
      <section className="relative w-full flex items-center justify-center overflow-hidden" style={{height: 'calc(100vh - 120px)'}}>
        {imageUrls.teamPhoto && <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${imageUrls.teamPhoto})` }} />}
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 text-center px-8 max-w-7xl mx-auto">
          <h1 className="text-7xl md:text-9xl font-extrabold text-white hero-text-shadow">About AIChE NTU</h1>
          <p className="text-2xl md:text-4xl font-light text-gray-100 max-w-5xl mx-auto mt-8 hero-text-shadow">Connecting students with industry, fostering innovation, and building the future of engineering.</p>
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="text-center bg-surface-alt/90 backdrop-blur-sm rounded-2xl p-6"><div className="text-5xl font-bold text-text-main">{animatedCounts.activeMembersCount}+</div><div className="text-lg text-text-muted mt-2">Active Members</div></div>
            <div className="text-center bg-surface-alt/90 backdrop-blur-sm rounded-2xl p-6"><div className="text-5xl font-bold text-text-main">{animatedCounts.exposedMembersCount}+</div><div className="text-lg text-text-muted mt-2">Exposed Members</div></div>
            <div className="text-center bg-surface-alt/90 backdrop-blur-sm rounded-2xl p-6"><div className="text-5xl font-bold text-text-main">{animatedCounts.annualEventsCount}+</div><div className="text-lg text-text-muted mt-2">Annual Events</div></div>
            <div className="text-center bg-surface-alt/90 backdrop-blur-sm rounded-2xl p-6"><div className="text-5xl font-bold text-text-main">{animatedCounts.yearsOfOperation}</div><div className="text-lg text-text-muted mt-2">Years of Excellence</div></div>
          </div>
        </div>
      </section>

      <section className="w-full py-32 bg-surface">
        <div className="max-w-7xl mx-auto px-8 grid lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-6">
            <h2 className="text-6xl font-bold text-text-main">Our Mission</h2>
            <div className="w-24 h-2 bg-primary rounded-full"></div>
            <p className="text-xl text-text-muted leading-relaxed">We are dedicated to advancing chemical engineering by bridging academic excellence and industry leadership, empowering students to solve global challenges.</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8">
              <div className="text-center p-4 bg-surface-alt rounded-2xl"><div className="text-2xl font-bold text-primary mb-2">Education</div><div className="text-text-muted text-sm">Workshops & Seminars</div></div>
              <div className="text-center p-4 bg-primary/10 rounded-2xl"><div className="text-2xl font-bold text-primary mb-2">Innovation</div><div className="text-text-muted text-sm">Research Projects</div></div>
              <div className="text-center p-4 bg-primary/10 rounded-2xl"><div className="text-2xl font-bold text-primary mb-2">Network</div><div className="text-text-muted text-sm">Industry Connections</div></div>
            </div>
          </div>
          <div className="relative flex justify-center">
            {imageUrls.mission && <div className="relative w-[450px] h-[450px] rounded-full overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-500 border-8 border-primary/20"><img src={imageUrls.mission} alt="Our Mission" className="w-full h-full object-cover" /></div>}
          </div>
        </div>
      </section>

      <section className="w-full py-32 bg-gradient-to-br from-background to-surface">
        <div className="w-full text-center mb-16">
          <h2 className="text-6xl font-bold text-text-main mb-8 w-full">Meet Our Team</h2>
          <p className="text-2xl md:text-3xl text-text-muted w-full max-w-none">Our chapter is driven by a passionate team dedicated to creating opportunities for all members.</p>
        </div>
        <div className="w-full mt-16">
          {renderSection(
            teamData ? (
              <div>
                <div className="flex justify-center mb-8 px-4">
                  <div className="bg-surface rounded-2xl p-2 shadow-lg border border-primary/10 flex flex-wrap justify-center gap-2">
                    {Object.keys(teamData).map(teamName => <button key={teamName} onClick={() => setActiveTab(teamName)} className={`px-4 py-3 rounded-xl font-semibold transition-colors duration-300 ${activeTab === teamName ? 'bg-primary text-white shadow-md' : 'text-text-muted hover:bg-surface-alt'}`}>{teamName}</button>)}
                  </div>
                </div>
                {currentTeamData?.subTeams && (
                  <div className="flex justify-center mb-12 border-t border-primary/10 mt-10 pt-8 px-4">
                      <div className="bg-surface/50 rounded-2xl p-2 shadow-md flex flex-wrap justify-center gap-1">
                          {Object.keys(currentTeamData.subTeams).map(subTeamName => <button key={subTeamName} onClick={() => setActiveSubTab(subTeamName)} className={`px-4 py-2 rounded-lg font-medium transition-colors duration-300 text-sm ${activeSubTab === subTeamName ? 'bg-primary/20 text-primary' : 'text-text-muted hover:text-text-main'}`}>{subTeamName}</button>)}
                      </div>
                  </div>
                )}
                <div className="animate-fade-in-up px-4 sm:px-6 lg:px-8" key={`${activeTab}-${activeSubTab || 'main'}`}>
                  {currentTeamData?.description && <p className="text-center text-lg text-text-muted mb-12 max-w-3xl mx-auto">{currentTeamData.description}</p>}
                  {membersToDisplay && membersToDisplay.length > 0 ? (
                    <div className="flex flex-wrap justify-center gap-x-8 gap-y-12">
                      {membersToDisplay.map(member => <div key={member.name} className="flex-[1_1_340px] max-w-[380px] flex justify-center"><TeamMemberCard member={member} /></div>)}
                    </div>
                  ) : <div className="text-center text-text-muted py-12"><p>Member details coming soon.</p></div>}
                </div>
              </div>
            ) : <div className="text-center text-text-muted py-12"><p className="text-xl">Team information is currently unavailable.</p></div>
          )}
        </div>
      </section>

      <section className="w-full py-32 bg-gradient-to-br from-surface to-surface-alt">
        <div className="max-w-7xl mx-auto px-8">
          <h2 className="text-6xl font-bold text-center text-text-main mb-20">Faculty Advisors</h2>
          {renderSection(<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">{professors.map(prof => <ProfessorCard key={prof.name} prof={prof} />)}</div>)}
        </div>
      </section>
    </div>
  );
};

export default AboutPage;