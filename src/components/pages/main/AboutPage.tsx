
import React, { useState, useEffect } from 'react';
import type { TeamMember, Professor } from '../../../constants'
import { getDataUrl } from '../../../constants';
import { LinkedinIcon } from '../../Icons';
import Spinner from '../../Spinner';

const TeamMemberCard: React.FC<{ member: TeamMember; size?: 'large' | 'medium' | 'small' }> = ({ member, size = 'medium' }) => {
    const sizeClasses = {
        large: "w-full max-w-lg mx-auto h-[36rem]",
        medium: "w-full max-w-md mx-auto h-[32rem]", 
        small: "w-full max-w-sm mx-auto h-[28rem]"
    };
    
    const imageSizes = {
        large: "w-72 h-72",
        medium: "w-60 h-60",
        small: "w-48 h-48"
    };

    return (
        <div className={`group ${sizeClasses[size]} [perspective:1000px]`}>
            <div className="relative h-full w-full rounded-2xl shadow-2xl transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                {/* Front of card */}
                <div className="absolute inset-0 bg-surface rounded-2xl p-8 flex flex-col items-center justify-center text-center [backface-visibility:hidden] border-2 border-primary/20">
                    <img 
                        src={member.imageUrl} 
                        alt={member.name} 
                        className={`${imageSizes[size]} rounded-2xl mx-auto mb-6 border-4 border-primary/30 shadow-xl object-cover`}
                    />
                    <h3 className={`${size === 'large' ? 'text-2xl' : size === 'medium' ? 'text-xl' : 'text-lg'} font-bold text-text-main mb-2`}>{member.name}</h3>
                    <p className={`text-primary font-semibold ${size === 'large' ? 'text-lg' : 'text-base'}`}>{member.role}</p>
                </div>

                {/* Back of card */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary to-primary-focus rounded-2xl p-8 text-center text-white [transform:rotateY(180deg)] [backface-visibility:hidden] flex flex-col justify-center overflow-y-auto">
                    <h3 className={`${size === 'large' ? 'text-2xl' : 'text-xl'} font-bold mb-2`}>{member.name}</h3>
                    <p className="font-semibold mb-4">{member.role}</p>
                    <div className="border-t border-white/30 w-1/3 mx-auto my-3"></div>
                    <p className="text-sm flex-grow leading-relaxed">{member.bio}</p>
                    {member.linkedinUrl && (
                        <a 
                            href={member.linkedinUrl} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="mt-6 flex-shrink-0 inline-flex items-center justify-center gap-2 bg-white/20 hover:bg-white/30 text-white font-bold py-3 px-6 rounded-full transition-all duration-300 backdrop-blur-sm"
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
    <div className="bg-surface rounded-2xl shadow-lg overflow-hidden flex flex-col sm:flex-row items-center gap-8 p-8 border border-primary/10">
        <img src={prof.imageUrl} alt={prof.name} className="w-40 h-40 rounded-full object-cover border-4 border-primary/20 flex-shrink-0 shadow-lg" />
        <div className="text-center sm:text-left">
            <h3 className="text-2xl font-bold text-text-main mb-2">{prof.name}</h3>
            <p className="font-semibold text-primary mb-3 text-lg">{prof.title}</p>
            <p className="text-base text-text-muted leading-relaxed">{prof.research}</p>
        </div>
    </div>
);

interface TeamData {
  executiveBoard: Record<string, TeamMember[]>;
  courseRepresentatives: TeamMember[];
  studentAdvisors: TeamMember[];
  escLiaison: TeamMember;
}


const AboutPage: React.FC = () => {
  const [teamData, setTeamData] = useState<TeamData | null>(null);
  const [professors, setProfessors] = useState<Professor[]>([]);
  const [missionImageUrl, setMissionImageUrl] = useState<string | null>(null);
  const [teamPhotoUrl, setTeamPhotoUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'leadership' | 'directors' | 'committee' | 'members'>('leadership');
  const [animatedCounts, setAnimatedCounts] = useState({
    activeMembersCount: 0,
    exposedMembersCount: 0,
    annualEventsCount: 0,
    yearsOfOperation: 0
  });

  // Dynamic statistics based on club founding year (2022)
  const foundingYear = 2022;
  const currentYear = new Date().getFullYear();
  const yearsOfOperation = currentYear - foundingYear;
  const activeMembersCount = 10; // 10+ active members
  const annualEventsCount = 5; // 5+ annual events
  const exposedMembersCount = 1000; // 1000+ exposed members

  // Organize team by tiers
  const organizeTeamByTiers = (teamData: TeamData) => {
    const allMembers = [
      ...Object.values(teamData.executiveBoard).flat(),
      ...teamData.courseRepresentatives,
      ...teamData.studentAdvisors,
      teamData.escLiaison
    ].filter(Boolean);

    return {
      tier1: {
        president: allMembers.find(m => m.role.toLowerCase().includes('president') && !m.role.toLowerCase().includes('vice')) || null,
        vicePresident: allMembers.find(m => m.role.toLowerCase().includes('vice president')) || null,
      },
      tier2: {
        academic: allMembers.find(m => m.role.toLowerCase().includes('academic') || m.role.toLowerCase().includes('workshop')) || null,
        projects: allMembers.find(m => m.role.toLowerCase().includes('project') || m.role.toLowerCase().includes('competition')) || null,
        branding: allMembers.find(m => m.role.toLowerCase().includes('branding') || m.role.toLowerCase().includes('publicity')) || null,
        community: allMembers.find(m => m.role.toLowerCase().includes('community') || m.role.toLowerCase().includes('welfare')) || null,
        external: allMembers.find(m => m.role.toLowerCase().includes('external') || m.role.toLowerCase().includes('liaison') || m.role.toLowerCase().includes('business')) || null,
        honGen: allMembers.find(m => m.role.toLowerCase().includes('hon') || m.role.toLowerCase().includes('secretary') || m.role.toLowerCase().includes('general')) || null,
      },
      tier3: allMembers.filter(m => 
        m.role.toLowerCase().includes('maincomm') || 
        m.role.toLowerCase().includes('main comm') ||
        m.role.toLowerCase().includes('committee') ||
        (m.role.toLowerCase().includes('member') && !m.role.toLowerCase().includes('executive'))
      ),
      tier4: allMembers.filter(m => 
        m.role.toLowerCase() === 'member' ||
        m.role.toLowerCase().includes('general member')
      )
    };
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [teamRes, logoRes, profRes] = await Promise.all([
            fetch(getDataUrl('team.json')),
            fetch(getDataUrl('logo.json')),
            fetch(getDataUrl('professors.json'))
        ]);
        const teamDataJson = await teamRes.json();
        const logoData = await logoRes.json();
        const profData = await profRes.json();
        
        setTeamData(teamDataJson);
        setProfessors(profData);
        
        if(logoData.missionImageUrl) setMissionImageUrl(logoData.missionImageUrl);
        if (logoData.aboutPageTeamPhoto) setTeamPhotoUrl(logoData.aboutPageTeamPhoto);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  // Number counting animation effect
  useEffect(() => {
    if (!isLoading) {
      const targetCounts = {
        activeMembersCount,
        exposedMembersCount,
        annualEventsCount,
        yearsOfOperation
      };

      const animateCount = (target: number, key: keyof typeof animatedCounts, delay: number = 0) => {
        setTimeout(() => {
          const duration = 2000; // 2 seconds
          const steps = 60;
          const increment = target / steps;
          let current = 0;
          
          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              current = target;
              clearInterval(timer);
            }
            setAnimatedCounts(prev => ({ ...prev, [key]: Math.floor(current) }));
          }, duration / steps);
        }, delay);
      };

      // Start animations with staggered delays - only run once
      animateCount(targetCounts.activeMembersCount, 'activeMembersCount', 500);
      animateCount(targetCounts.exposedMembersCount, 'exposedMembersCount', 700);
      animateCount(targetCounts.annualEventsCount, 'annualEventsCount', 900);
      animateCount(targetCounts.yearsOfOperation, 'yearsOfOperation', 1100);
    }
  }, [isLoading]); // Only depend on isLoading to run once

  const tierStructure = teamData ? organizeTeamByTiers(teamData) : null;

  return (
    <div className="min-h-screen w-full bg-background">
      {/* Hero Section - Full Screen */}
      <section className="relative w-full flex items-center justify-center overflow-hidden" style={{height: 'calc(100vh - 120px)'}}>
        {teamPhotoUrl && (
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${teamPhotoUrl})` }}
          />
        )}
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 text-center px-8 max-w-7xl mx-auto">
          <h1 className="text-7xl md:text-9xl font-extrabold mb-12 leading-tight tracking-tight text-white drop-shadow-lg">
            About AIChE NTU
          </h1>
          <p className="text-2xl md:text-4xl font-light leading-relaxed text-gray-100 max-w-5xl mx-auto drop-shadow-md">
            Connecting chemical engineering students with industry leaders, fostering innovation, and building the future of sustainable technology.
          </p>
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="text-center bg-surface-alt/90 backdrop-blur-sm rounded-2xl p-6 hover:bg-surface-alt hover:scale-102 transition-all duration-300">
              <div className="text-4xl md:text-5xl font-bold mb-2 text-text-main">{animatedCounts.activeMembersCount}+</div>
              <div className="text-lg text-text-muted">Active Members</div>
            </div>
            <div className="text-center bg-surface-alt/90 backdrop-blur-sm rounded-2xl p-6 hover:bg-surface-alt hover:scale-102 transition-all duration-300">
              <div className="text-4xl md:text-5xl font-bold mb-2 text-text-main">{animatedCounts.exposedMembersCount}+</div>
              <div className="text-lg text-text-muted">Exposed Members</div>
            </div>
            <div className="text-center bg-surface-alt/90 backdrop-blur-sm rounded-2xl p-6 hover:bg-surface-alt hover:scale-102 transition-all duration-300">
              <div className="text-4xl md:text-5xl font-bold mb-2 text-text-main">{animatedCounts.annualEventsCount}+</div>
              <div className="text-lg text-text-muted">Annual Events</div>
            </div>
            <div className="text-center bg-surface-alt/90 backdrop-blur-sm rounded-2xl p-6 hover:bg-surface-alt hover:scale-102 transition-all duration-300">
              <div className="text-4xl md:text-5xl font-bold mb-2 text-text-main">{animatedCounts.yearsOfOperation}</div>
              <div className="text-lg text-text-muted">Years of Excellence</div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section - Professional & Circular */}
      <section className="w-full py-32 bg-surface">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-8">
              <h2 className="text-6xl font-bold text-text-main leading-tight">Our Mission</h2>
              <div className="w-32 h-3 bg-primary rounded-full"></div>
              <p className="text-2xl text-text-muted leading-relaxed font-light">
                We are dedicated to advancing the chemical engineering profession through education, networking, and innovation. 
                Our chapter serves as a bridge between academic excellence and industry leadership, empowering students to become 
                the next generation of chemical engineers who will solve the world's most pressing challenges.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-12">
                <div className="text-center p-4 bg-surface-alt rounded-2xl">
                  <div className="text-2xl font-bold text-primary mb-2">Education</div>
                  <div className="text-text-muted text-xs">Workshops & Seminars</div>
                </div>
                <div className="text-center p-4 bg-primary/10 rounded-2xl">
                  <div className="text-2xl font-bold text-primary mb-2">Innovation</div>
                  <div className="text-text-muted text-xs">Research Projects</div>
                </div>
                <div className="text-center p-4 bg-primary/10 rounded-2xl">
                  <div className="text-2xl font-bold text-primary mb-2">Network</div>
                  <div className="text-text-muted text-xs">Industry Connections</div>
                </div>
              </div>
            </div>
            <div className="relative flex justify-center">
              {missionImageUrl && (
                <div className="relative w-[500px] h-[500px] rounded-full overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-700 border-8 border-primary/20">
                  <img 
                    src={missionImageUrl} 
                    alt="Our Mission" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent"></div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Team Structure - Tab-based Navigation */}
      <section className="w-full py-32 bg-gradient-to-br from-background to-surface">
        <div className="max-w-7xl mx-auto px-8">
          <h2 className="text-6xl font-bold text-center text-text-main mb-20">Meet Our Team</h2>
          
          {isLoading ? (
            <div className="flex justify-center py-20">
              <Spinner />
            </div>
          ) : tierStructure ? (
            <div className="space-y-12">
              {/* Tab Navigation */}
              <div className="flex justify-center">
                <div className="bg-surface rounded-2xl p-2 shadow-lg border border-gray-200 dark:border-gray-700">
                  <div className="flex gap-2">
                    <button
                      onClick={() => setActiveTab('leadership')}
                      className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                        activeTab === 'leadership'
                          ? 'bg-primary text-white shadow-lg'
                          : 'text-text-muted hover:text-text-main hover:bg-surface-alt'
                      }`}
                    >
                      Leadership
                    </button>
                    <button
                      onClick={() => setActiveTab('directors')}
                      className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                        activeTab === 'directors'
                          ? 'bg-primary text-white shadow-lg'
                          : 'text-text-muted hover:text-text-main hover:bg-surface-alt'
                      }`}
                    >
                      Directors
                    </button>
                    {tierStructure.tier3.length > 0 && (
                      <button
                        onClick={() => setActiveTab('committee')}
                        className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                          activeTab === 'committee'
                            ? 'bg-primary text-white shadow-lg'
                            : 'text-text-muted hover:text-text-main hover:bg-surface-alt'
                        }`}
                      >
                        Committee
                      </button>
                    )}
                    {tierStructure.tier4.length > 0 && (
                      <button
                        onClick={() => setActiveTab('members')}
                        className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                          activeTab === 'members'
                            ? 'bg-primary text-white shadow-lg'
                            : 'text-text-muted hover:text-text-main hover:bg-surface-alt'
                        }`}
                      >
                        Members
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Tab Content */}
              <div className="min-h-[400px]">
                {activeTab === 'leadership' && (
                  <div className="text-center opacity-100 transition-all duration-500 ease-in-out">
                    <h3 className="text-4xl font-bold text-primary mb-12">Executive Leadership</h3>
                    <div className="flex justify-center gap-12 flex-wrap">
                      {tierStructure.tier1.president && (
                        <TeamMemberCard member={tierStructure.tier1.president} size="large" />
                      )}
                      {tierStructure.tier1.vicePresident && (
                        <TeamMemberCard member={tierStructure.tier1.vicePresident} size="large" />
                      )}
                    </div>
                  </div>
                )}

                {activeTab === 'directors' && (
                  <div className="text-center opacity-100 transition-all duration-500 ease-in-out">
                    <h3 className="text-4xl font-bold text-primary mb-12">Directors & Hon Gen</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                      {tierStructure.tier2.academic && <TeamMemberCard member={tierStructure.tier2.academic} size="medium" />}
                      {tierStructure.tier2.projects && <TeamMemberCard member={tierStructure.tier2.projects} size="medium" />}
                      {tierStructure.tier2.branding && <TeamMemberCard member={tierStructure.tier2.branding} size="medium" />}
                      {tierStructure.tier2.community && <TeamMemberCard member={tierStructure.tier2.community} size="medium" />}
                      {tierStructure.tier2.external && <TeamMemberCard member={tierStructure.tier2.external} size="medium" />}
                      {tierStructure.tier2.honGen && <TeamMemberCard member={tierStructure.tier2.honGen} size="medium" />}
                    </div>
                  </div>
                )}

                {activeTab === 'committee' && tierStructure.tier3.length > 0 && (
                  <div className="text-center opacity-100 transition-all duration-500 ease-in-out">
                    <h3 className="text-4xl font-bold text-primary mb-12">Main Committee</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
                      {tierStructure.tier3.map(member => (
                        <TeamMemberCard key={member.name} member={member} size="small" />
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'members' && tierStructure.tier4.length > 0 && (
                  <div className="text-center opacity-100 transition-all duration-500 ease-in-out">
                    <h3 className="text-4xl font-bold text-primary mb-12">Active Members</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-7xl mx-auto">
                      {tierStructure.tier4.map(member => (
                        <TeamMemberCard key={member.name} member={member} size="small" />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="text-center text-text-muted">
              <p className="text-xl">Team information is currently being updated. Please check back soon!</p>
            </div>
          )}
        </div>
      </section>

      {/* Faculty Advisors - Professional */}
      <section className="w-full py-32 bg-gradient-to-br from-surface to-surface-alt">
        <div className="max-w-7xl mx-auto px-8">
          <h2 className="text-6xl font-bold text-center text-text-main mb-20">Faculty Advisors</h2>
          {isLoading ? (
            <div className="flex justify-center py-20">
              <Spinner />
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
              {professors.map(prof => (
                <ProfessorCard key={prof.name} prof={prof} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default AboutPage;


