import { useEffect, useState, useCallback } from 'react';
import { useAdmin } from '../../hooks/useAdmin';
import type { PaginatedResponse, AdminAttendeeItem } from '../../types/api';
import { 
  Search, 
  Download, 
  Filter, 
  RotateCcw, 
  CheckCircle, 
  XCircle, 
  ChevronLeft, 
  ChevronRight, 
  Ticket as TicketIcon,
  UserCheck,
  UserX
} from 'lucide-react';

const AdminAttendees = () => {
  const { getAttendees, exportAttendees, isLoading, error } = useAdmin();
  const [data, setData] = useState<PaginatedResponse<AdminAttendeeItem> | null>(null);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(20);
  const [search, setSearch] = useState('');
  const [tier, setTier] = useState<string>('');
  const [checkedIn, setCheckedIn] = useState<string>('');
  const [isVerified, setIsVerified] = useState<string>('');

  const fetchAttendees = useCallback(async () => {
    const params: any = {
      page,
      per_page: perPage,
      search: search.trim() || undefined,
      tier: tier || undefined,
      checked_in: checkedIn === '' ? undefined : checkedIn === 'true',
      is_verified: isVerified === '' ? undefined : isVerified === 'true'
    };

    const result = await getAttendees(params);
    if (result) {
      setData(result);
    }
  }, [getAttendees, page, perPage, search, tier, checkedIn, isVerified]);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchAttendees();
    }, 350);

    return () => clearTimeout(timer);
  }, [fetchAttendees]);

  const hasActiveFilters = Boolean(search || tier || checkedIn !== '' || isVerified !== '');

  const handleResetFilters = () => {
    setSearch('');
    setTier('');
    setCheckedIn('');
    setIsVerified('');
    setPage(1);
  };

  const totalPages = data?.total_pages || (data as any)?.totalPages || 1;
  const totalItems = data?.total ?? 0;
  const currentPage = data?.page || page;
  const currentPerPage = data?.per_page || (data as any)?.perPage || perPage;

  return (
    <div className="space-y-6 flex flex-col h-full font-mono">
      {/* Header */}
      <div className="flex justify-between items-start md:items-end gap-4 flex-wrap pb-2 border-b border-white/5">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold text-white tracking-tight">Attendees</h1>
            {data && (
              <span className="px-2.5 py-0.5 rounded-full text-xs bg-red-600/20 text-red-400 border border-red-500/30">
                {totalItems} total
              </span>
            )}
          </div>
          <p className="text-gray-400 text-xs md:text-sm mt-1">
            Real-time directory, ticketing, check-in, and verification controls.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {hasActiveFilters && (
            <button
              onClick={handleResetFilters}
              className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
              title="Reset all filters"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset Filters
            </button>
          )}

          <button 
            onClick={() => exportAttendees()}
            className="bg-red-600/10 hover:bg-red-600/20 text-red-400 border border-red-500/30 hover:border-red-500/50 px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shadow-[0_0_15px_rgba(220,38,38,0.15)]"
          >
            <Download className="w-4 h-4" />
            Export CSV
          </button>
        </div>
      </div>

      {/* Filter Controls Bar */}
      <div className="bg-[#0f0f0f] border border-white/10 rounded-2xl p-4 shadow-lg space-y-3">
        <div className="flex items-center gap-2 text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">
          <Filter className="w-3.5 h-3.5 text-red-500" />
          <span>Filters & Search</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Search Input */}
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
            <input 
              type="text" 
              placeholder="Search name or email..." 
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className="w-full bg-[#161616] border border-white/10 rounded-xl pl-9 pr-4 py-2 text-white text-xs placeholder:text-gray-600 focus:outline-none focus:border-red-500/50 transition-colors"
            />
          </div>

          {/* Tier Filter */}
          <div>
            <select
              value={tier}
              onChange={(e) => {
                setTier(e.target.value);
                setPage(1);
              }}
              className="w-full bg-[#161616] border border-white/10 rounded-xl px-3 py-2 text-white text-xs focus:outline-none focus:border-red-500/50 transition-colors capitalize"
            >
              <option value="">All Tiers (All)</option>
              <option value="student">Tier: Student</option>
              <option value="general">Tier: General</option>
              <option value="vip">Tier: VIP</option>
            </select>
          </div>

          {/* Checked In Filter */}
          <div>
            <select
              value={checkedIn}
              onChange={(e) => {
                setCheckedIn(e.target.value);
                setPage(1);
              }}
              className="w-full bg-[#161616] border border-white/10 rounded-xl px-3 py-2 text-white text-xs focus:outline-none focus:border-red-500/50 transition-colors"
            >
              <option value="">All Check-in Status</option>
              <option value="true">Checked In</option>
              <option value="false">Not Checked In</option>
            </select>
          </div>

          {/* Is Verified Filter */}
          <div>
            <select
              value={isVerified}
              onChange={(e) => {
                setIsVerified(e.target.value);
                setPage(1);
              }}
              className="w-full bg-[#161616] border border-white/10 rounded-xl px-3 py-2 text-white text-xs focus:outline-none focus:border-red-500/50 transition-colors"
            >
              <option value="">All Verification Status</option>
              <option value="true">Verified Users</option>
              <option value="false">Unverified Users</option>
            </select>
          </div>
        </div>
      </div>

      {error && (
        <div className="text-red-400 bg-red-950/40 p-4 rounded-xl border border-red-500/30 text-xs flex items-center gap-3">
          <XCircle className="w-5 h-5 flex-shrink-0 text-red-500" />
          <span>{error}</span>
        </div>
      )}

      {/* Main Table Container */}
      <div className="flex-1 bg-[#101010] border border-white/10 rounded-2xl overflow-hidden flex flex-col shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-gray-400">
            <thead className="uppercase bg-[#0a0a0a] text-gray-500 border-b border-white/10 text-[11px] tracking-wider">
              <tr>
                <th className="px-6 py-4">Attendee</th>
                <th className="px-6 py-4">Contact</th>
                <th className="px-6 py-4">Verification</th>
                <th className="px-6 py-4">Role</th>
                <th className="px-6 py-4">Ticket</th>
                <th className="px-6 py-4 text-right">Check-in Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {isLoading && !data ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-500 animate-pulse">
                    Loading attendees directory...
                  </td>
                </tr>
              ) : data?.data?.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center justify-center gap-3 text-gray-500">
                      <TicketIcon className="w-8 h-8 text-gray-600" />
                      <p>No attendees found matching the selected criteria.</p>
                      {hasActiveFilters && (
                        <button
                          onClick={handleResetFilters}
                          className="text-red-400 hover:underline text-xs"
                        >
                          Clear all filters
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ) : (
                data?.data?.map((item: any, idx: number) => {
                  const user = item.user || {};
                  const ticket = item.ticket || null;
                  const isUserVerified = user.is_verified ?? user.isVerified ?? false;
                  const isTicketCheckedIn = ticket ? (ticket.checked_in ?? ticket.checkedIn ?? false) : false;
                  const ticketCode = ticket?.ticket_code || ticket?.ticketCode;
                  const userCreated = user.created_at || user.createdAt;

                  return (
                    <tr 
                      key={user.id || idx} 
                      className="hover:bg-white/[0.02] transition-colors"
                    >
                      {/* Attendee */}
                      <td className="px-6 py-4">
                        <div className="text-white font-medium text-sm">{user.name || 'Unnamed'}</div>
                        <div className="text-[10px] text-gray-500 mt-0.5">
                          {userCreated ? new Date(userCreated).toLocaleDateString() : 'N/A'}
                        </div>
                      </td>

                      {/* Contact */}
                      <td className="px-6 py-4">
                        <div className="text-gray-300">{user.email}</div>
                        <div className="text-[10px] text-gray-500">{user.phone || 'No phone'}</div>
                      </td>

                      {/* Verification Status */}
                      <td className="px-6 py-4">
                        {isUserVerified ? (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-green-500/10 text-green-400 border border-green-500/20">
                            <UserCheck className="w-3 h-3 text-green-400" />
                            Verified
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-yellow-500/10 text-yellow-500 border border-yellow-500/20">
                            <UserX className="w-3 h-3 text-yellow-500" />
                            Unverified
                          </span>
                        )}
                      </td>

                      {/* Role */}
                      <td className="px-6 py-4">
                        <span className={`inline-flex px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-widest ${
                          user.role?.toLowerCase() === 'admin' ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30' :
                          user.role?.toLowerCase() === 'volunteer' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' :
                          'bg-gray-500/20 text-gray-400 border border-gray-500/30'
                        }`}>
                          {user.role || 'Attendee'}
                        </span>
                      </td>

                      {/* Ticket */}
                      <td className="px-6 py-4">
                        {ticket ? (
                          <div>
                            <div className="text-white font-mono text-xs font-semibold tracking-wider">
                              {ticketCode || 'N/A'}
                            </div>
                            <div className="flex items-center gap-2 mt-0.5">
                              <span className={`text-[10px] uppercase font-bold tracking-wider ${
                                ticket.tier?.toLowerCase() === 'vip' ? 'text-red-400' :
                                ticket.tier?.toLowerCase() === 'general' ? 'text-blue-400' :
                                'text-gray-400'
                              }`}>
                                {ticket.tier}
                              </span>
                              {ticket.amount_paid || ticket.amountPaid ? (
                                <span className="text-[10px] text-gray-500">
                                  {ticket.amount_paid || ticket.amountPaid}
                                </span>
                              ) : null}
                            </div>
                          </div>
                        ) : (
                          <span className="text-gray-600 italic">No Ticket</span>
                        )}
                      </td>

                      {/* Status */}
                      <td className="px-6 py-4 text-right">
                        {ticket ? (
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] uppercase tracking-wider font-bold ${
                            isTicketCheckedIn 
                              ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                              : 'bg-zinc-800 text-gray-400 border border-white/10'
                          }`}>
                            {isTicketCheckedIn ? (
                              <>
                                <CheckCircle className="w-3 h-3 text-green-400" />
                                Checked In
                              </>
                            ) : (
                              ticket.status || 'Registered'
                            )}
                          </span>
                        ) : (
                          <span className="text-gray-600">-</span>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination Controls */}
        <div className="p-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#0a0a0a] mt-auto">
          <div className="flex items-center gap-4 text-xs text-gray-500 font-mono">
            <span>
              Showing {totalItems === 0 ? 0 : ((currentPage - 1) * currentPerPage) + 1} to {Math.min(currentPage * currentPerPage, totalItems)} of {totalItems}
            </span>
            <div className="flex items-center gap-1.5">
              <span className="text-gray-600">Per page:</span>
              <select
                value={perPage}
                onChange={(e) => {
                  setPerPage(Number(e.target.value));
                  setPage(1);
                }}
                className="bg-[#151515] border border-white/10 rounded px-2 py-0.5 text-gray-300 text-xs focus:outline-none"
              >
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500 mr-2">
              Page {currentPage} of {totalPages}
            </span>
            <button 
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={currentPage <= 1 || isLoading}
              className="p-1.5 bg-white/5 rounded-lg text-xs disabled:opacity-30 hover:bg-white/10 transition-colors border border-white/5 disabled:hover:bg-white/5"
              title="Previous Page"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button 
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage >= totalPages || isLoading}
              className="p-1.5 bg-white/5 rounded-lg text-xs disabled:opacity-30 hover:bg-white/10 transition-colors border border-white/5 disabled:hover:bg-white/5"
              title="Next Page"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAttendees;
