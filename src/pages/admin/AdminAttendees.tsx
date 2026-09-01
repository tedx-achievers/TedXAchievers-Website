import { useEffect, useState } from 'react';
import { useAdmin } from '../../hooks/useAdmin';

const AdminAttendees = () => {
  const { getAttendees, exportAttendees, isLoading, error } = useAdmin();
  const [data, setData] = useState<any>(null);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchAttendees = async () => {
      const result = await getAttendees({ page, per_page: 20, search });
      if (result) setData(result);
    };
    
    // Simple debounce for search
    const timer = setTimeout(() => {
      fetchAttendees();
    }, 500);
    
    return () => clearTimeout(timer);
  }, [getAttendees, page, search]);

  const handleExport = () => {
    exportAttendees();
  };

  return (
    <div className="space-y-6 flex flex-col h-full">
      <div className="flex justify-between items-end gap-4 flex-wrap">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight mb-2">Attendees</h1>
          <p className="text-gray-400 text-sm">Manage registered attendees and tickets.</p>
        </div>
        
        <div className="flex gap-4">
          <input 
            type="text" 
            placeholder="Search name or email..." 
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="bg-[#151515] border border-white/10 rounded-lg px-4 py-2 text-white text-sm focus:outline-none focus:border-white/30"
          />
          <button 
            onClick={handleExport}
            className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            Export CSV
          </button>
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
                <th className="px-6 py-4 font-mono">Attendee</th>
                <th className="px-6 py-4 font-mono">Contact</th>
                <th className="px-6 py-4 font-mono">Role</th>
                <th className="px-6 py-4 font-mono">Ticket</th>
                <th className="px-6 py-4 font-mono">Status</th>
              </tr>
            </thead>
            <tbody>
              {isLoading && !data ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-gray-500 animate-pulse">Loading attendees...</td>
                </tr>
              ) : data?.data?.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-gray-500">No attendees found.</td>
                </tr>
              ) : (
                data?.data?.map((item: any) => (
                  <tr key={item.user.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                    <td className="px-6 py-4">
                      <div className="text-white font-medium">{item.user.name}</div>
                      <div className="text-xs text-gray-500">{new Date(item.user.createdAt || item.user.created_at).toLocaleDateString()}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-gray-300">{item.user.email}</div>
                      <div className="text-xs text-gray-500">{item.user.phone}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-2 py-1 rounded text-[10px] uppercase tracking-widest ${
                        item.user.role?.toLowerCase() === 'admin' ? 'bg-purple-500/20 text-purple-400' :
                        item.user.role?.toLowerCase() === 'volunteer' ? 'bg-blue-500/20 text-blue-400' :
                        'bg-gray-500/20 text-gray-400'
                      }`}>
                        {item.user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {item.ticket ? (
                        <div>
                          <div className="text-white font-mono text-xs">{item.ticket.ticketCode || item.ticket.ticket_code}</div>
                          <div className="text-[10px] text-gray-500 uppercase">{item.ticket.tier}</div>
                        </div>
                      ) : (
                        <span className="text-gray-600 italic">No Ticket</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {item.ticket && (
                        <span className={`inline-flex px-2 py-1 rounded-full text-[10px] uppercase tracking-widest font-bold ${
                          (item.ticket.checkedIn ?? item.ticket.checked_in) ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-500'
                        }`}>
                          {(item.ticket.checkedIn ?? item.ticket.checked_in) ? 'Checked In' : item.ticket.status}
                        </span>
                      )}
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

export default AdminAttendees;
