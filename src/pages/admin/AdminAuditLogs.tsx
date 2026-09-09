import { useEffect, useState, useCallback } from 'react';
import { useAdmin } from '../../hooks/useAdmin';
import type { PaginatedResponse, AuditLogItem } from '../../types/api';
import { 
  Filter, 
  RotateCcw, 
  ChevronLeft, 
  ChevronRight, 
  ShieldAlert, 
  Activity, 
  Calendar, 
  User
} from 'lucide-react';

const COMMON_EVENT_TYPES = [
  { value: '', label: 'All Event Types' },
  { value: 'ticket.paid', label: 'ticket.paid (Ticket Payments)' },
  { value: 'ticket.created', label: 'ticket.created (Ticket Issuance)' },
  { value: 'ticket.checked_in', label: 'ticket.checked_in (Check-in)' },
  { value: 'volunteer.approved', label: 'volunteer.approved (Volunteer Approval)' },
  { value: 'volunteer.rejected', label: 'volunteer.rejected (Volunteer Rejection)' },
  { value: 'auth.login', label: 'auth.login (Admin/User Login)' },
  { value: 'user.registered', label: 'user.registered (New Registrations)' },
];

const AdminAuditLogs = () => {
  const { getAuditLogs, isLoading, error } = useAdmin();
  const [data, setData] = useState<PaginatedResponse<AuditLogItem> | null>(null);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(20);
  const [eventType, setEventType] = useState('');
  const [actor, setActor] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [expandedLogId, setExpandedLogId] = useState<string | null>(null);

  const fetchAuditLogs = useCallback(async () => {
    let fromIso = fromDate ? new Date(fromDate).toISOString() : undefined;
    let toIso = toDate ? new Date(toDate).toISOString() : undefined;

    const params: any = {
      page,
      per_page: perPage,
      event_type: eventType || undefined,
      actor: actor.trim() || undefined,
      from: fromIso,
      to: toIso,
    };

    const result = await getAuditLogs(params);
    if (result) {
      setData(result);
    }
  }, [getAuditLogs, page, perPage, eventType, actor, fromDate, toDate]);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchAuditLogs();
    }, 350);

    return () => clearTimeout(timer);
  }, [fetchAuditLogs]);

  const hasActiveFilters = Boolean(eventType || actor || fromDate || toDate);

  const handleResetFilters = () => {
    setEventType('');
    setActor('');
    setFromDate('');
    setToDate('');
    setPage(1);
  };

  const setDatePreset = (preset: 'today' | 'week' | 'month' | 'all') => {
    const now = new Date();
    setPage(1);
    if (preset === 'all') {
      setFromDate('');
      setToDate('');
      return;
    }
    
    const end = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59);
    let start = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0);

    if (preset === 'week') {
      start.setDate(start.getDate() - 7);
    } else if (preset === 'month') {
      start.setMonth(start.getMonth() - 1);
    }

    setFromDate(start.toISOString().slice(0, 16));
    setToDate(end.toISOString().slice(0, 16));
  };

  const totalPages = data?.total_pages || (data as any)?.totalPages || 1;
  const totalItems = data?.total ?? 0;
  const currentPage = data?.page || page;
  const currentPerPage = data?.per_page || (data as any)?.perPage || perPage;

  const getEventBadgeStyle = (type: string = '') => {
    const t = type.toLowerCase();
    if (t.includes('paid') || t.includes('approved') || t.includes('success')) {
      return 'bg-green-500/15 text-green-400 border-green-500/30';
    }
    if (t.includes('rejected') || t.includes('delete') || t.includes('failed')) {
      return 'bg-red-500/15 text-red-400 border-red-500/30';
    }
    if (t.includes('auth') || t.includes('login') || t.includes('admin')) {
      return 'bg-purple-500/15 text-purple-400 border-purple-500/30';
    }
    if (t.includes('ticket') || t.includes('create')) {
      return 'bg-blue-500/15 text-blue-400 border-blue-500/30';
    }
    return 'bg-gray-500/15 text-gray-300 border-white/10';
  };

  return (
    <div className="space-y-6 flex flex-col h-full font-mono">
      {/* Header */}
      <div className="flex justify-between items-start md:items-end gap-4 flex-wrap pb-2 border-b border-white/5">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold text-white tracking-tight">Audit Logs</h1>
            {data && (
              <span className="px-2.5 py-0.5 rounded-full text-xs bg-red-600/20 text-red-400 border border-red-500/30">
                {totalItems} recorded events
              </span>
            )}
          </div>
          <p className="text-gray-400 text-xs md:text-sm mt-1">
            Immutable administrative and transactional system activity ledger.
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
      <div className="bg-[#0f0f0f] border border-white/10 rounded-2xl p-4 shadow-lg space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-2 text-xs text-gray-400 font-bold uppercase tracking-wider">
          <div className="flex items-center gap-2">
            <Filter className="w-3.5 h-3.5 text-red-500" />
            <span>Filter Security & Activity Logs</span>
          </div>

          <div className="flex items-center gap-2 font-normal text-[11px] normal-case">
            <span className="text-gray-600">Quick Range:</span>
            <button 
              onClick={() => setDatePreset('today')} 
              className="px-2 py-0.5 rounded bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
            >
              Today
            </button>
            <button 
              onClick={() => setDatePreset('week')} 
              className="px-2 py-0.5 rounded bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
            >
              This Week
            </button>
            <button 
              onClick={() => setDatePreset('month')} 
              className="px-2 py-0.5 rounded bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
            >
              This Month
            </button>
            <button 
              onClick={() => setDatePreset('all')} 
              className="px-2 py-0.5 rounded bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
            >
              All Time
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Event Type Filter */}
          <div>
            <select
              value={eventType}
              onChange={(e) => {
                setEventType(e.target.value);
                setPage(1);
              }}
              className="w-full bg-[#161616] border border-white/10 rounded-xl px-3 py-2 text-white text-xs focus:outline-none focus:border-red-500/50 transition-colors"
            >
              {COMMON_EVENT_TYPES.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>

          {/* Actor Filter */}
          <div className="relative">
            <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
            <input 
              type="text" 
              placeholder="Filter by actor (e.g. admin email)..." 
              value={actor}
              onChange={(e) => {
                setActor(e.target.value);
                setPage(1);
              }}
              className="w-full bg-[#161616] border border-white/10 rounded-xl pl-9 pr-4 py-2 text-white text-xs placeholder:text-gray-600 focus:outline-none focus:border-red-500/50 transition-colors"
            />
          </div>

          {/* From Date */}
          <div className="relative">
            <Calendar className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
            <input 
              type="datetime-local" 
              value={fromDate}
              onChange={(e) => {
                setFromDate(e.target.value);
                setPage(1);
              }}
              className="w-full bg-[#161616] border border-white/10 rounded-xl pl-9 pr-3 py-2 text-white text-xs placeholder:text-gray-600 focus:outline-none focus:border-red-500/50 transition-colors"
              title="From timestamp"
            />
          </div>

          {/* To Date */}
          <div className="relative">
            <Calendar className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
            <input 
              type="datetime-local" 
              value={toDate}
              onChange={(e) => {
                setToDate(e.target.value);
                setPage(1);
              }}
              className="w-full bg-[#161616] border border-white/10 rounded-xl pl-9 pr-3 py-2 text-white text-xs placeholder:text-gray-600 focus:outline-none focus:border-red-500/50 transition-colors"
              title="To timestamp"
            />
          </div>
        </div>
      </div>

      {error && (
        <div className="text-red-400 bg-red-950/40 p-4 rounded-xl border border-red-500/30 text-xs flex items-center gap-3">
          <ShieldAlert className="w-5 h-5 flex-shrink-0 text-red-500" />
          <span>{error}</span>
        </div>
      )}

      {/* Main Table Container */}
      <div className="flex-1 bg-[#101010] border border-white/10 rounded-2xl overflow-hidden flex flex-col shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-gray-400">
            <thead className="uppercase bg-[#0a0a0a] text-gray-500 border-b border-white/10 text-[11px] tracking-wider">
              <tr>
                <th className="px-6 py-4">Event Type</th>
                <th className="px-6 py-4">Actor</th>
                <th className="px-6 py-4">Details / Metadata</th>
                <th className="px-6 py-4">IP & Client</th>
                <th className="px-6 py-4 text-right">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {isLoading && !data ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-500 animate-pulse">
                    Streaming security logs...
                  </td>
                </tr>
              ) : data?.data?.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center justify-center gap-3 text-gray-500">
                      <Activity className="w-8 h-8 text-gray-600" />
                      <p>No audit events match your search & filter parameters.</p>
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
                  const event = item.eventType || item.event_type || 'system.event';
                  const actorName = item.actor || 'System / Anonymous';
                  const timestamp = item.createdAt || item.created_at;
                  const ip = item.ipAddress || item.ip_address || '-';
                  const rawDetails = item.details || item.metadata || item.payload;
                  const logKey = item.id || `log-${idx}`;
                  const isExpanded = expandedLogId === logKey;

                  let formattedDetails: string | null = null;
                  if (typeof rawDetails === 'object' && rawDetails !== null) {
                    formattedDetails = JSON.stringify(rawDetails, null, 2);
                  } else if (typeof rawDetails === 'string') {
                    formattedDetails = rawDetails;
                  }

                  return (
                    <tr key={logKey} className="hover:bg-white/[0.02] transition-colors">
                      {/* Event Type */}
                      <td className="px-6 py-4 align-top">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] uppercase font-bold tracking-wider border ${getEventBadgeStyle(event)}`}>
                          <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                          {event}
                        </span>
                      </td>

                      {/* Actor */}
                      <td className="px-6 py-4 align-top">
                        <div className="text-white font-medium text-xs truncate max-w-[200px]" title={actorName}>
                          {actorName}
                        </div>
                        <div className="text-[10px] text-gray-600 mt-0.5">
                          {item.action ? `Action: ${item.action}` : 'Authorized Admin'}
                        </div>
                      </td>

                      {/* Details / Payload */}
                      <td className="px-6 py-4 align-top max-w-xs">
                        {formattedDetails ? (
                          <div>
                            <div 
                              className={`text-gray-300 text-xs font-mono break-all ${isExpanded ? 'whitespace-pre-wrap bg-black/50 p-2 rounded border border-white/10 text-[11px]' : 'line-clamp-2'}`}
                            >
                              {formattedDetails}
                            </div>
                            {formattedDetails.length > 60 && (
                              <button
                                onClick={() => setExpandedLogId(isExpanded ? null : logKey)}
                                className="text-[10px] text-red-400 hover:underline mt-1"
                              >
                                {isExpanded ? 'Collapse' : 'Expand payload'}
                              </button>
                            )}
                          </div>
                        ) : (
                          <span className="text-gray-600 italic">No additional payload</span>
                        )}
                      </td>

                      {/* IP & Client */}
                      <td className="px-6 py-4 align-top">
                        <div className="text-gray-400 text-xs font-mono">{ip}</div>
                        {item.userAgent && (
                          <div className="text-[9px] text-gray-600 truncate max-w-[150px]" title={item.userAgent}>
                            {item.userAgent}
                          </div>
                        )}
                      </td>

                      {/* Timestamp */}
                      <td className="px-6 py-4 text-right align-top whitespace-nowrap">
                        <div className="text-white text-xs">
                          {timestamp ? new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }) : '-'}
                        </div>
                        <div className="text-[10px] text-gray-500 mt-0.5">
                          {timestamp ? new Date(timestamp).toLocaleDateString() : ''}
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

export default AdminAuditLogs;
