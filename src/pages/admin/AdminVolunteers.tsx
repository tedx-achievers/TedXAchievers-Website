import { useEffect, useState, useCallback } from 'react';
import { useAdmin } from '../../hooks/useAdmin';
import type { PaginatedResponse, AdminVolunteerItem } from '../../types/api';
import { 
  Search, 
  Filter, 
  RotateCcw, 
  Check, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Users, 
  AlertCircle,
  Clock,
  CheckCircle2,
  XCircle,
  Loader2
} from 'lucide-react';

const VOLUNTEER_ROLES = [
  { value: 'technical', label: 'Technical' },
  { value: 'videography', label: 'Videography' },
  { value: 'photography', label: 'Photography' },
  { value: 'content', label: 'Content' },
  { value: 'protocol_and_ushering', label: 'Protocol & Ushering' },
  { value: 'welfare', label: 'Welfare' },
  { value: 'graphic_and_design', label: 'Graphic & Design' },
  { value: 'venue_and_decoration', label: 'Venue & Decoration' },
  { value: 'partnership_and_sponsorship', label: 'Partnership & Sponsorship' },
];

const AdminVolunteers = () => {
  const { getVolunteers, updateVolunteerStatus, isLoading, error } = useAdmin();
  const [data, setData] = useState<PaginatedResponse<AdminVolunteerItem> | null>(null);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(20);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  
  // Track loading state for specific rows when updating
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const fetchVolunteers = useCallback(async () => {
    const params: any = {
      page,
      per_page: perPage,
      search: search.trim() || undefined,
      status: statusFilter || undefined,
      preferred_role: roleFilter || undefined,
    };

    const result = await getVolunteers(params);
    if (result) {
      setData(result);
    }
  }, [getVolunteers, page, perPage, search, statusFilter, roleFilter]);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchVolunteers();
    }, 350);

    return () => clearTimeout(timer);
  }, [fetchVolunteers]);

  const handleStatusUpdate = async (id: string, status: 'approved' | 'rejected') => {
    setUpdatingId(id);
    try {
      await updateVolunteerStatus(id, status);
      await fetchVolunteers();
    } catch (err) {
      // Error handled by useAdmin hook
    } finally {
      setUpdatingId(null);
    }
  };

  const hasActiveFilters = Boolean(search || statusFilter || roleFilter);

  const handleResetFilters = () => {
    setSearch('');
    setStatusFilter('');
    setRoleFilter('');
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
            <h1 className="text-3xl font-bold text-white tracking-tight">Volunteer Applications</h1>
            {data && (
              <span className="px-2.5 py-0.5 rounded-full text-xs bg-red-600/20 text-red-400 border border-red-500/30">
                {totalItems} applicants
              </span>
            )}
          </div>
          <p className="text-gray-400 text-xs md:text-sm mt-1">
            Review applicant qualifications, filter by department/role, and manage recruitment decisions.
          </p>
        </div>

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
      </div>

      {/* Filter Controls Bar */}
      <div className="bg-[#0f0f0f] border border-white/10 rounded-2xl p-4 shadow-lg space-y-3">
        <div className="flex items-center gap-2 text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">
          <Filter className="w-3.5 h-3.5 text-red-500" />
          <span>Filters & Search</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Search Input */}
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
            <input 
              type="text" 
              placeholder="Search by name or email..." 
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className="w-full bg-[#161616] border border-white/10 rounded-xl pl-9 pr-4 py-2 text-white text-xs placeholder:text-gray-600 focus:outline-none focus:border-red-500/50 transition-colors"
            />
          </div>

          {/* Status Filter */}
          <div>
            <select 
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setPage(1);
              }}
              className="w-full bg-[#161616] border border-white/10 rounded-xl px-3 py-2 text-white text-xs focus:outline-none focus:border-red-500/50 transition-colors"
            >
              <option value="">All Statuses (Pending / Approved / Rejected)</option>
              <option value="pending">Status: Pending</option>
              <option value="approved">Status: Approved</option>
              <option value="rejected">Status: Rejected</option>
            </select>
          </div>

          {/* Preferred Role Filter */}
          <div>
            <select
              value={roleFilter}
              onChange={(e) => {
                setRoleFilter(e.target.value);
                setPage(1);
              }}
              className="w-full bg-[#161616] border border-white/10 rounded-xl px-3 py-2 text-white text-xs focus:outline-none focus:border-red-500/50 transition-colors"
            >
              <option value="">All Preferred Roles</option>
              {VOLUNTEER_ROLES.map((role) => (
                <option key={role.value} value={role.value}>
                  Role: {role.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {error && (
        <div className="text-red-400 bg-red-950/40 p-4 rounded-xl border border-red-500/30 text-xs flex items-center gap-3">
          <AlertCircle className="w-5 h-5 flex-shrink-0 text-red-500" />
          <span>{error}</span>
        </div>
      )}

      {/* Main Table Container */}
      <div className="flex-1 bg-[#101010] border border-white/10 rounded-2xl overflow-hidden flex flex-col shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-gray-400">
            <thead className="uppercase bg-[#0a0a0a] text-gray-500 border-b border-white/10 text-[11px] tracking-wider">
              <tr>
                <th className="px-6 py-4">Applicant</th>
                <th className="px-6 py-4">Role & Dept</th>
                <th className="px-6 py-4 w-1/3">Motivation</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {isLoading && !data ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-500 animate-pulse">
                    Loading volunteer applications...
                  </td>
                </tr>
              ) : data?.data?.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center justify-center gap-3 text-gray-500">
                      <Users className="w-8 h-8 text-gray-600" />
                      <p>No volunteer applications found matching the selected criteria.</p>
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
                data?.data?.map((item: any) => {
                  const applicantName = item.fullName || item.full_name || 'Unnamed';
                  const applicantPhone = item.phoneNumber || item.phone_number;
                  const applicantMatric = item.matricNumber || item.matric_number;
                  const applicantRole = (item.preferredRole || item.preferred_role || '').replace(/_/g, ' ');
                  const applicantStatus = item.status?.toLowerCase();
                  const applicantRefCode = item.referenceCode || item.reference_code;
                  const isRowUpdating = updatingId === item.id;

                  return (
                    <tr key={item.id} className="hover:bg-white/[0.02] transition-colors">
                      {/* Applicant */}
                      <td className="px-6 py-4">
                        <div className="text-white font-medium text-sm">{applicantName}</div>
                        <div className="text-gray-400 text-[11px] mt-0.5">{item.email}</div>
                        {applicantPhone && (
                          <div className="text-[10px] text-gray-500 mt-0.5">{applicantPhone}</div>
                        )}
                        {applicantRefCode && (
                          <div className="inline-block mt-1 text-[9px] text-red-400/80 bg-red-950/30 px-1.5 py-0.5 rounded border border-red-500/20">
                            REF: {applicantRefCode}
                          </div>
                        )}
                      </td>

                      {/* Role & Department */}
                      <td className="px-6 py-4">
                        <div className="text-white capitalize font-semibold">{applicantRole || 'N/A'}</div>
                        <div className="text-[11px] text-gray-400 mt-0.5">{item.department || 'N/A'}</div>
                        {applicantMatric && (
                          <div className="text-[10px] text-gray-600 mt-0.5 font-mono">{applicantMatric}</div>
                        )}
                      </td>

                      {/* Motivation */}
                      <td className="px-6 py-4">
                        <p className="text-xs text-gray-300 line-clamp-3 leading-relaxed" title={item.motivation}>
                          {item.motivation || <span className="italic text-gray-600">No motivation statement provided.</span>}
                        </p>
                      </td>

                      {/* Status */}
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] uppercase font-bold tracking-wider ${
                          applicantStatus === 'pending' ? 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/30' :
                          applicantStatus === 'approved' ? 'bg-green-500/10 text-green-400 border border-green-500/30' :
                          'bg-red-500/10 text-red-400 border border-red-500/30'
                        }`}>
                          {applicantStatus === 'pending' && <Clock className="w-3 h-3 text-yellow-500" />}
                          {applicantStatus === 'approved' && <CheckCircle2 className="w-3 h-3 text-green-400" />}
                          {applicantStatus === 'rejected' && <XCircle className="w-3 h-3 text-red-400" />}
                          {item.status}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end items-center gap-2">
                          {isRowUpdating ? (
                            <Loader2 className="w-5 h-5 text-gray-400 animate-spin" />
                          ) : (
                            <>
                              {applicantStatus !== 'approved' && (
                                <button
                                  onClick={() => handleStatusUpdate(item.id, 'approved')}
                                  disabled={Boolean(updatingId)}
                                  className="flex items-center gap-1 px-2.5 py-1.5 bg-green-500/10 text-green-400 hover:bg-green-500/20 border border-green-500/30 rounded-lg text-xs font-semibold transition-colors disabled:opacity-40"
                                  title="Approve Application"
                                >
                                  <Check className="w-3.5 h-3.5" />
                                  <span>Approve</span>
                                </button>
                              )}
                              {applicantStatus !== 'rejected' && (
                                <button
                                  onClick={() => handleStatusUpdate(item.id, 'rejected')}
                                  disabled={Boolean(updatingId)}
                                  className="flex items-center gap-1 px-2.5 py-1.5 bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/30 rounded-lg text-xs font-semibold transition-colors disabled:opacity-40"
                                  title="Reject Application"
                                >
                                  <X className="w-3.5 h-3.5" />
                                  <span>Reject</span>
                                </button>
                              )}
                            </>
                          )}
                        </div>
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

export default AdminVolunteers;
