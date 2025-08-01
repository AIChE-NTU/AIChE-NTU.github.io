
import React, { useState, useEffect } from 'react';
import type { TeamMember, Professor } from '../../constants';
import { LinkedinIcon } from '../../components/Icons';
import Spinner from '../../components/Spinner';

const TeamMemberCard: React.FC<{ member: TeamMember }> = ({ member }) => {
    return (
        <div className="group h-[28rem] w-72 [perspective:1000px]">
            <div className="relative h-full w-full rounded-xl shadow-xl transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                {/* Front of card */}
                <div className="absolute inset-0 bg-surface rounded-xl p-6 flex flex-col items-center justify-center text-center [backface-visibility:hidden]">
                    <img 
                        src={member.imageUrl} 
                        alt={member.name} 
                        className="w-56 h-56 rounded-xl mx-auto mb-4 border-4 border-surface-alt dark:border-surface shadow-lg object-cover" 
                    />
                    <h3 className="text-xl font-bold text-text-main">{member.name}</h3>
                    <p className="text-primary font-semibold">{member.role}</p>
                </div>

                {/* Back of card */}
                <div className="absolute inset-0 bg-primary rounded-xl p-6 text-center text-white [transform:rotateY(180deg)] [backface-visibility:hidden] flex flex-col justify-center overflow-y-auto">
                    <h3 className="text-2xl font-bold">{member.name}</h3>
                    <p className="font-semibold mb-3">{member.role}</p>
                    <div className="border-t border-teal-300 w-1/4 mx-auto my-2"></div>
                    <p className="text-sm flex-grow">{member.bio}</p>
                    {member.linkedinUrl && (
                        <a 
                            href={member.linkedinUrl} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="mt-4 flex-shrink-0 inline-flex items-center justify-center gap-2 bg-white/20 hover:bg-white/30 text-white font-bold py-2 px-4 rounded-full transition-all duration-300"
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
    <div className="bg-surface rounded-lg shadow-lg overflow-hidden flex flex-col sm:flex-row items-center gap-6 p-6">
        <img src={prof.imageUrl} alt={prof.name} className="w-32 h-32 rounded-full object-cover border-4 border-primary/20 flex-shrink-0" />
        <div>
            <h3 className="text-xl font-bold text-text-main">{prof.name}</h3>
            <p className="font-semibold text-primary mb-2">{prof.title}</p>
            <p className="text-sm text-text-muted">{prof.research}</p>
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
  const [activeTab, setActiveTab] = useState<string>('');
  const [missionImageUrl, setMissionImageUrl] = useState<string | null>(null);
  const [teamPhotoUrl, setTeamPhotoUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isTabChanging, setIsTabChanging] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [teamRes, logoRes, profRes] = await Promise.all([
            fetch('/data/team.json'),
            fetch('/data/logo.json'),
            fetch('/data/professors.json')
        ]);
        const teamDataJson = await teamRes.json();
        const logoData = await logoRes.json();
        const profData = await profRes.json();
        
        setTeamData(teamDataJson);
        setProfessors(profData);

        if (teamDataJson.executiveBoard && Object.keys(teamDataJson.executiveBoard).length > 0) {
            setActiveTab(Object.keys(teamDataJson.executiveBoard)[0]);
        }
        
        if(logoData.missionImageUrl) setMissionImageUrl(logoData.missionImageUrl);
        if (logoData.aboutPageTeamPhoto) setTeamPhotoUrl(logoData.aboutPageTeamPhoto);

      } catch (error) {
        console.error("Failed to fetch about page data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);
  
  const handleTabClick = (teamName: string) => {
    setIsTabChanging(true);
    setActiveTab(teamName);
    setTimeout(() => setIsTabChanging(false), 150); // duration of the fade-out
  };

  return (
    <div className="space-y-24">
      {/* Page Header */}
      <div className="text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-text-main">About AIChE NTU Student Chapter</h1>
        <p className="mt-4 text-lg text-text-muted max-w-3xl mx-auto">
          We are a vibrant community dedicated to advancing the field of chemical engineering through professional development, collaboration, and outreach.
        </p>
      </div>
      
      {/* Our Mission Section */}
      <section className="grid md:grid-cols-2 gap-12 items-center">
        <div className="order-2 md:order-1">
          <h2 className="text-3xl font-bold text-text-main mb-4">Our Mission</h2>
          <div className="text-text-muted space-y-4">
            <p>
              Our primary mission is to provide a platform for chemical engineering students to develop professionally and academically. We aim to bridge the gap between classroom theory and real-world industry practice through technical workshops, networking events, plant tours, and student-led projects.
            </p>
            <p>
              We are committed to fostering a supportive and inclusive community, connecting students with peers, faculty, and industry leaders to inspire the next generation of chemical engineers.
            </p>
          </div>
        </div>
        <div className="order-1 md:order-2">
            {missionImageUrl ? <img src={missionImageUrl} alt="Team working together" className="rounded-lg shadow-2xl"/> : <div className="bg-slate-200 dark:bg-slate-700 w-full h-64 rounded-lg flex items-center justify-center"><Spinner/></div>}
        </div>
      </section>

      {/* Team Photo Section */}
       <section className="my-16">
          <h2 className="text-3xl font-bold text-text-main mb-8 text-center">Our Chapter Family</h2>
          {isLoading ? <div className="flex justify-center"><Spinner /></div> : teamPhotoUrl && (
            <div className="flex justify-center p-4">
                <img 
                    src={teamPhotoUrl} 
                    alt="AIChE NTU Student Chapter Team Photo" 
                    className="rounded-xl shadow-2xl w-full max-w-6xl animate-float"
                />
            </div>
          )}
        </section>

      {/* Meet the Executive Board Section */}
      <section>
        <h2 className="text-4xl font-bold text-center mb-12">Meet the Executive Board</h2>
        {isLoading ? <div className="flex justify-center"><Spinner /></div> : teamData && (
          <>
            <div className="flex justify-center flex-wrap gap-2 md:gap-4 mb-8">
              {Object.keys(teamData.executiveBoard).map(teamName => (
                <button
                  key={teamName}
                  onClick={() => handleTabClick(teamName)}
                  className={`px-4 py-2 text-sm md:text-base font-semibold rounded-full transition-all duration-300 ${
                    activeTab === teamName 
                      ? 'bg-primary text-white shadow-md' 
                      : 'bg-surface-alt text-text-muted hover:bg-primary/20 hover:text-primary'
                  }`}
                >
                  {teamName}
                </button>
              ))}
            </div>

            <div className={`flex flex-wrap justify-center gap-8 min-h-[28rem] transition-opacity duration-300 ${isTabChanging ? 'opacity-0' : 'opacity-100'}`}>
              {teamData.executiveBoard[activeTab]?.map(member => (
                <TeamMemberCard key={member.name} member={member} />
              ))}
            </div>
          </>
        )}
      </section>

      {/* Course Representatives Section */}
      <section>
        <h2 className="text-4xl font-bold text-center mb-4">Meet Our Course Representatives</h2>
        <p className="text-center text-text-muted mb-12">From the School of Chemistry, Chemical Engineering and Biotechnology (CCEB)</p>
        {isLoading ? <div className="flex justify-center"><Spinner /></div> : teamData && (
            <div className="flex flex-wrap justify-center gap-8">
                {teamData.courseRepresentatives.map(member => (
                    <TeamMemberCard key={member.name} member={member} />
                ))}
            </div>
        )}
      </section>

      {/* ESC Liaison Section */}
      {teamData?.escLiaison && !isLoading && (
        <section>
          <h2 className="text-4xl font-bold text-center mb-12">Engineering Student Council (ESC) Liaison</h2>
          <div className="flex justify-center">
            <TeamMemberCard member={teamData.escLiaison} />
          </div>
        </section>
      )}

      {/* Student Advisors Section */}
      <section>
        <h2 className="text-4xl font-bold text-center mb-12">Meet Our Student Advisors</h2>
        {isLoading ? <div className="flex justify-center"><Spinner /></div> : teamData && teamData.studentAdvisors && (
            <div className="flex flex-wrap justify-center gap-8">
                {teamData.studentAdvisors.map(member => (
                    <TeamMemberCard key={member.name} member={member} />
                ))}
            </div>
        )}
      </section>
      
      {/* Faculty Advisors Section */}
      <section>
        <h2 className="text-4xl font-bold text-center mb-12">Faculty Advisors</h2>
        {isLoading ? <div className="flex justify-center"><Spinner /></div> : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
                {professors.map(prof => (
                    <ProfessorCard key={prof.name} prof={prof} />
                ))}
            </div>
        )}
      </section>
    </div>
  );
};

export default AboutPage;
