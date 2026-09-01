import { useEffect, useState } from 'react';
import { useAdmin } from '../../hooks/useAdmin';

const AdminVolunteers = () => {
  const { getVolunteers, updateVolunteerStatus, isLoading, error } = useAdmin();
  const [data, setData] = useState<any>(null);
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState('');
  
  // Track loading state for specific rows when updating
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const fetchVolunteers = async () => {
    const result = await getVolunteers({ page, per_page: 20, status: statusFilter || undefined });
    if (result) setData(result);
  };

  useEffect(() => {
    fetchVolunteers();
  }, [getVolunteers, page, statusFilter]);

  const handleStatusUpdate = async (id: string, status: 'approved' | 'rejected') => {
    setUpdatingId(id);
    try {
      await updateVolunteerStatus(id, status);
      // Refresh list to get updated status and potentially new users
      await fetchVolunteers();
    } catch (err) {
      // Error handled by useAdmin hook
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div className="space-y-6 flex flex-col h-full">
      <div className="flex justify-between items-end gap-4 flex-wrap">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight mb-2">Volunteer Applications</h1>
          <p className="text-gray-400 text-sm">Review, approve, and manage volunteer applications.</p>
        </div>
        
        <div className="flex gap-4">
          <select 
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setPage(1);
            }}
            className="bg-[#151515] border border-white/10 rounded-lg px-4 py-2 text-white text-sm focus:outline-none focus:border-white/30"
          >
            <option value="">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>

      {error && (
        <div className="text-red-500 bg-red-900/20 p-4 rounded-xl border border-red-500/20">{error}</div>
      )}

      <div className="flex-1 bg-[#151515] border border-white/5 rounded-xl overflow-hidden flex flex-col">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-400">
            <thead className="text-xs uppercase bg-[#0f0f0f] text-gray-500 border-b border-white/5">
              <tr>
                <th className="px-6 py-4 font-mono">Applicant</th>
                <th className="px-6 py-4 font-mono">Role & Dept</th>
                <th className="px-6 py-4 font-mono w-1/3">Motivation</th>
                <th className="px-6 py-4 font-mono">Status</th>
                <th className="px-6 py-4 font-mono text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {isLoading && !data ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-gray-500 animate-pulse">Loading applications...</td>
                </tr>
              ) : data?.data?.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-gray-500">No applications found.</td>
                </tr>
              ) : (
                data?.data?.map((item: any) => (
                  <tr key={item.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                    <td className="px-6 py-4">
                      <div className="text-white font-medium">{item.fullName || item.full_name}</div>
                      <div className="text-xs text-gray-500">{item.email}</div>
                      <div className="text-[10px] text-gray-600 mt-1">{item.phoneNumber || item.phone_number}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-gray-300 capitalize">{(item.preferredRole || item.preferred_role)?.replace(/_/g, ' ')}</div>
                      <div className="text-xs text-gray-500">{item.department}</div>
                      <div className="text-[10px] text-gray-600 mt-1">{item.matricNumber || item.matric_number}</div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-xs line-clamp-3 text-gray-400" title={item.motivation}>
                        {item.motivation}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-2 py-1 rounded-full text-[10px] uppercase tracking-widest font-bold ${
                        item.status === 'pending' ? 'bg-yellow-500/20 text-yellow-500' :
                        item.status === 'approved' ? 'bg-green-500/20 text-green-400' :
                        'bg-red-500/20 text-red-400'
                      }`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        {item.status !== 'approved' && (
                          <button
                            onClick={() => handleStatusUpdate(item.id, 'approved')}
                            disabled={updatingId === item.id}
                            className="p-2 bg-green-500/10 text-green-500 hover:bg-green-500/20 rounded transition-colors disabled:opacity-50"
                            title="Approve"
                          >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
                          </button>
                        )}
                        {item.status !== 'rejected' && (
                          <button
                            onClick={() => handleStatusUpdate(item.id, 'rejected')}
                            disabled={updatingId === item.id}
                            className="p-2 bg-red-500/10 text-red-500 hover:bg-red-500/20 rounded transition-colors disabled:opacity-50"
                            title="Reject"
                          >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18M6 6l12 12"/></svg>
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
        
        {/* Pagination */}
        {data && (data.totalPages || data.total_pages) > 1 && (
          <div className="p-4 border-t border-white/5 flex items-center justify-between bg-[#0f0f0f] mt-auto">
            <span className="text-xs text-gray-500 font-mono">
              Showing {((data.page - 1) * (data.perPage || data.per_page)) + 1} to {Math.min(data.page * (data.perPage || data.per_page), data.total)} of {data.total}
            </span>
            <div className="flex gap-2">
              <button 
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-3 py-1 bg-white/5 rounded text-sm disabled:opacity-50 hover:bg-white/10 transition-colors"
              >
                Prev
              </button>
              <button 
                onClick={() => setPage(p => Math.min((data.totalPages || data.total_pages), p + 1))}
                disabled={page === (data.totalPages || data.total_pages)}
                className="px-3 py-1 bg-white/5 rounded text-sm disabled:opacity-50 hover:bg-white/10 transition-colors"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminVolunteers;
