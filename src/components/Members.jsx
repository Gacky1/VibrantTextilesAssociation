import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserTie, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { supabase } from '../lib/supabase';

const Members = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from('members')
      .select('*')
      .eq('is_active', true)
      .in('category', ['board', 'executive'])
      .order('sort_order')
      .limit(6)
      .then(({ data }) => {
        setMembers(data || []);
        setLoading(false);
      });
  }, []);

  return (
    <section id="members" className="py-24 bg-gray-50">
      <div className="section-container">
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <div className="badge">Visionary Leadership</div>
          <h2 className="section-title">Board of Distinction</h2>
          <p className="section-subtitle mx-auto">
            Meet the architects of the VTA ecosystem dedicated to industrial excellence and artisan empowerment.
          </p>
        </div>

        {/* Executive Profile Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {loading
            ? Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="card animate-pulse border-gray-100">
                  <div className="aspect-[4/5] bg-gray-100 rounded-lg mb-6" />
                  <div className="h-6 bg-gray-100 rounded w-2/3 mx-auto mb-3" />
                  <div className="h-4 bg-gray-50 rounded w-1/2 mx-auto" />
                </div>
              ))
            : members.map((member) => (
                <div
                  key={member.id}
                  className="card group hover:border-primary-200 transition-all text-center"
                >
                  <div className="aspect-[4/5] relative overflow-hidden bg-gray-100 rounded-lg mb-6">
                    {member.image_url ? (
                      <img 
                        src={member.image_url} 
                        alt={member.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <FontAwesomeIcon icon={faUserTie} className="text-5xl text-gray-300" />
                      </div>
                    )}
                  </div>

                  <div className="space-y-1">
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary-600 transition-colors uppercase tracking-tight">
                        {member.name}
                    </h3>
                    <p className="text-primary-600 font-bold text-[10px] uppercase tracking-widest pb-4">
                        {member.designation}
                    </p>
                    <div className="w-8 h-px bg-gray-200 mx-auto group-hover:w-16 group-hover:bg-primary-500 transition-all duration-300" />
                    
                    <p className="text-gray-500 text-xs italic leading-relaxed pt-4">
                      {member.bio || "Visionary industry leader dedicated to the VTA mission."}
                    </p>
                  </div>
                </div>
              ))
          }
        </div>

        {/* Global Action */}
        <div className="text-center">
          <Link to="/members">
            <button className="btn-secondary px-10">
              Meet All Members
              <FontAwesomeIcon icon={faArrowRight} />
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Members;
