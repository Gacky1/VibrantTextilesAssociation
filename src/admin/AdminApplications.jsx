import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

const AdminApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedApp, setSelectedApp] = useState(null);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('membership_applications')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setApplications(data || []);
    } catch (err) {
      console.error('Error fetching applications:', err);
      alert('Failed to load applications.');
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, newStatus) => {
    try {
      const { error } = await supabase
        .from('membership_applications')
        .update({ status: newStatus })
        .eq('id', id);

      if (error) throw error;
      fetchApplications();
    } catch (err) {
      console.error('Error updating status:', err);
      alert('Failed to update status.');
    }
  };

  if (loading) return <div className="p-8 text-center text-gray-500">Loading applications...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Membership Applications</h1>
          <p className="text-sm text-gray-500 mt-1">Review and manage membership requests</p>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden border border-gray-100">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Organization</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {applications.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-6 py-12 text-center text-gray-500 text-sm">
                    No applications found.
                  </td>
                </tr>
              ) : (
                applications.map((app) => (
                  <tr key={app.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(app.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">{app.org_name}</div>
                      {app.org_type && <div className="text-xs text-gray-500">{app.org_type}</div>}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize bg-blue-100 text-blue-800">
                        {app.category}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">{app.decision_maker}</div>
                      <div className="text-xs text-gray-500 flex flex-col mt-0.5">
                        <a href={`mailto:${app.email}`} className="hover:text-primary-600 block">{app.email}</a>
                        <a href={`tel:${app.phone}`} className="hover:text-primary-600 block">{app.phone}</a>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900 truncate max-w-[150px]" title={app.org_address}>
                        {app.org_address}
                      </div>
                      <div className="text-xs text-gray-500">{app.state || '-'}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize
                        ${app.status === 'approved' ? 'bg-green-100 text-green-800' : 
                          app.status === 'rejected' ? 'bg-red-100 text-red-800' : 
                          'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {app.status || 'pending'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end items-center gap-3">
                        <button
                          onClick={() => setSelectedApp(app)}
                          className="px-2.5 py-1 text-xs font-bold text-primary-600 hover:text-primary-800 bg-primary-50 hover:bg-primary-100 rounded-md transition-colors"
                          title="Watch Application Details"
                        >
                          👁 Watch
                        </button>
                        {app.status !== 'approved' && (
                          <button
                            onClick={() => updateStatus(app.id, 'approved')}
                            className="text-green-600 hover:text-green-950 font-bold"
                            title="Approve"
                          >
                            ✓
                          </button>
                        )}
                        {app.status !== 'rejected' && (
                          <button
                            onClick={() => updateStatus(app.id, 'rejected')}
                            className="text-red-600 hover:text-red-955 font-bold"
                            title="Reject"
                          >
                            ×
                          </button>
                        )}
                        {app.status !== 'pending' && (
                          <button
                            onClick={() => updateStatus(app.id, 'pending')}
                            className="text-gray-400 hover:text-gray-650"
                            title="Mark as Pending"
                          >
                            ↺
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {selectedApp && (
        <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-[32px] shadow-2xl w-full max-w-2xl my-8 overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-8 border-b border-gray-100 bg-gray-900 text-white">
              <div>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-black uppercase tracking-widest bg-primary-600 text-white mb-2">
                  {selectedApp.category} Application
                </span>
                <h2 className="text-xl font-bold tracking-tight">{selectedApp.org_name}</h2>
              </div>
              <button 
                onClick={() => setSelectedApp(null)} 
                className="text-gray-400 hover:text-white text-2xl transition-colors cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-8 space-y-6 max-h-[70vh] overflow-y-auto">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <span className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Category / Entity Type</span>
                  <span className="text-sm font-bold text-gray-900 capitalize">{selectedApp.category} {selectedApp.org_type ? `(${selectedApp.org_type})` : ''}</span>
                </div>
                <div>
                  <span className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Application Date</span>
                  <span className="text-sm font-bold text-gray-900">{new Date(selectedApp.created_at).toLocaleString()}</span>
                </div>
              </div>

              <div className="border-t border-gray-100 pt-6">
                <span className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Location & Address</span>
                <div className="text-sm text-gray-950 font-bold leading-relaxed">{selectedApp.org_address}</div>
                {selectedApp.state && (
                  <div className="text-xs text-gray-500 font-medium mt-1">State: <span className="font-bold text-gray-700">{selectedApp.state}</span></div>
                )}
              </div>

              <div className="border-t border-gray-100 pt-6">
                <span className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-3">Key Contact Person</span>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <span className="block text-[10px] font-bold text-gray-400">Name</span>
                    <span className="text-sm font-bold text-gray-900">{selectedApp.decision_maker}</span>
                  </div>
                  {selectedApp.designation && (
                    <div>
                      <span className="block text-[10px] font-bold text-gray-400">Designation</span>
                      <span className="text-sm font-bold text-gray-900">{selectedApp.designation}</span>
                    </div>
                  )}
                  <div>
                    <span className="block text-[10px] font-bold text-gray-400">Email Address</span>
                    <a href={`mailto:${selectedApp.email}`} className="text-sm font-bold text-primary-600 hover:underline">{selectedApp.email}</a>
                  </div>
                  <div>
                    <span className="block text-[10px] font-bold text-gray-400">Contact Number</span>
                    <a href={`tel:${selectedApp.phone}`} className="text-sm font-bold text-primary-600 hover:underline">{selectedApp.phone}</a>
                  </div>
                </div>
              </div>

              {selectedApp.partnering_interest && (
                <div className="border-t border-gray-100 pt-6">
                  <span className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Interest / Sourcing Category</span>
                  <span className="text-sm font-bold text-gray-900">{selectedApp.partnering_interest}</span>
                </div>
              )}

              <div className="border-t border-gray-100 pt-6">
                <span className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-3">Narrative & Additional Details</span>
                {renderAdditionalInfo(selectedApp.additional_info)}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-6 bg-gray-50 border-t border-gray-100 flex justify-between items-center">
              <div className="flex gap-2">
                <span className="text-xs text-gray-500 font-bold uppercase">Status:</span>
                <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-black uppercase tracking-wider
                  ${selectedApp.status === 'approved' ? 'bg-green-100 text-green-800' : 
                    selectedApp.status === 'rejected' ? 'bg-red-100 text-red-800' : 
                    'bg-yellow-100 text-yellow-800'
                  }`}
                >
                  {selectedApp.status || 'pending'}
                </span>
              </div>
              <div className="flex gap-3">
                <button 
                  onClick={() => setSelectedApp(null)} 
                  className="px-5 py-2.5 bg-white border border-gray-200 rounded-xl font-bold text-xs uppercase text-gray-500 hover:bg-gray-50 cursor-pointer transition-colors"
                >
                  Close
                </button>
                {selectedApp.status !== 'approved' && (
                  <button 
                    onClick={() => { updateStatus(selectedApp.id, 'approved'); setSelectedApp(null); }} 
                    className="px-5 py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-xl font-bold text-xs uppercase cursor-pointer transition-colors"
                  >
                    Approve
                  </button>
                )}
                {selectedApp.status !== 'rejected' && (
                  <button 
                    onClick={() => { updateStatus(selectedApp.id, 'rejected'); setSelectedApp(null); }} 
                    className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold text-xs uppercase cursor-pointer transition-colors"
                  >
                    Reject
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const renderAdditionalInfo = (infoStr) => {
  if (!infoStr) return <span className="text-gray-400 italic">None</span>;
  try {
    if (infoStr.startsWith('{') && infoStr.endsWith('}')) {
      const info = JSON.parse(infoStr);
      return (
        <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-xl text-xs border border-gray-100 font-medium text-gray-700">
          {info.dob && <div><span className="font-bold text-gray-400 block uppercase text-[10px] tracking-wider mb-1">Date of Birth</span>{info.dob}</div>}
          {info.gender && <div><span className="font-bold text-gray-400 block uppercase text-[10px] tracking-wider mb-1">Gender</span>{info.gender}</div>}
          {info.social_category && <div><span className="font-bold text-gray-400 block uppercase text-[10px] tracking-wider mb-1">Social Category</span>{info.social_category}</div>}
          {info.district && <div><span className="font-bold text-gray-400 block uppercase text-[10px] tracking-wider mb-1">District</span>{info.district}</div>}
          {info.experience_years && <div><span className="font-bold text-gray-400 block uppercase text-[10px] tracking-wider mb-1">Experience (Years)</span>{info.experience_years}</div>}
          {info.highest_qualification && <div><span className="font-bold text-gray-400 block uppercase text-[10px] tracking-wider mb-1">Highest Qualification</span>{info.highest_qualification}</div>}
          {info.passing_year && <div><span className="font-bold text-gray-400 block uppercase text-[10px] tracking-wider mb-1">Passing Year</span>{info.passing_year}</div>}
          {info.resume_name && <div className="col-span-2"><span className="font-bold text-gray-400 block uppercase text-[10px] tracking-wider mb-1">Attached Resume Reference</span><span className="text-blue-600 font-bold">{info.resume_name}</span></div>}
          {info.trainer_types && info.trainer_types.length > 0 && <div className="col-span-2"><span className="font-bold text-gray-400 block uppercase text-[10px] tracking-wider mb-1">Trainer Types</span>{info.trainer_types.join(', ')}</div>}
          {info.additional_notes && <div className="col-span-2 border-t border-gray-200/50 pt-2"><span className="font-bold text-gray-400 block uppercase text-[10px] tracking-wider mb-1">Additional Notes</span><p className="whitespace-pre-wrap leading-relaxed">{info.additional_notes}</p></div>}
        </div>
      );
    }
  } catch (e) {
    // Fallback to text
  }
  return <p className="text-gray-700 whitespace-pre-wrap text-sm leading-relaxed">{infoStr}</p>;
};

export default AdminApplications;
