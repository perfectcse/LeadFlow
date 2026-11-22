import { useEffect, useState } from "react";

import {
  Users,
  UserPlus,
  UserRoundCheck,
  UserRoundX,
  MessageCircle,
  Search,
  Plus,
  RefreshCw,
} from "lucide-react";

import Sidebar from "../components/Sidebar.jsx";
import StatsCard from "../components/StatsCard.jsx";
import LeadTable from "../components/LeadTable.jsx";
import LeadForm from "../components/LeadForm.jsx";

import {
  getLeads,
  createLead,
  updateLead,
  deleteLead,
} from "../services/api.js";

const Dashboard = () => {
  const [leads, setLeads] = useState([]);
  const [allLeads, setAllLeads] = useState([]);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [feedback, setFeedback] = useState("");

  const [showForm, setShowForm] = useState(false);
  const [selectedLead, setSelectedLead] = useState(null);

  const [refreshKey, setRefreshKey] = useState(0);

  // Fetch leads from backend
  useEffect(() => {
    let isMounted = true;

    const fetchLeads = async () => {
      try {
        setLoading(true);
        setError("");

        const [allResult, filteredResult] = await Promise.all([
          getLeads(),
          getLeads({
            search: search.trim(),
            status,
          }),
        ]);

        if (isMounted) {
          setAllLeads(allResult.data || []);
          setLeads(filteredResult.data || []);
        }
      } catch (err) {
        if (isMounted) {
          setError(
            err.response?.data?.message ||
            "Unable to load leads. Please check your backend connection."
          );
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchLeads();

    return () => {
      isMounted = false;
    };
  }, [search, status, refreshKey]);

  // Calculate dashboard statistics
  const totalLeads = allLeads.length;

  const newLeads = allLeads.filter(
    (lead) => lead.status === "New"
  ).length;

  const contactedLeads = allLeads.filter(
    (lead) => lead.status === "Contacted"
  ).length;

  const qualifiedLeads = allLeads.filter(
    (lead) => lead.status === "Qualified"
  ).length;

  const lostLeads = allLeads.filter(
    (lead) => lead.status === "Lost"
  ).length;

  // Open add lead form
  const handleAddLead = () => {
    setSelectedLead(null);
    setShowForm(true);
  };

  // Open edit lead form
  const handleEditLead = (lead) => {
    setSelectedLead(lead);
    setShowForm(true);
  };

  // Close lead form
  const handleCloseForm = () => {
    setShowForm(false);
    setSelectedLead(null);
  };

  // Create or update lead
  const handleSaveLead = async (leadData) => {
    let result;

    if (selectedLead) {
      result = await updateLead(selectedLead._id, leadData);
    } else {
      result = await createLead(leadData);
    }

    setFeedback(result.message);
    setError("");
    setRefreshKey((previous) => previous + 1);
  };

  // Delete lead with confirmation
  const handleDeleteLead = async (lead) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete ${lead.name}?`
    );

    if (!confirmed) return;

    try {
      const result = await deleteLead(lead._id);

      setFeedback(result.message);
      setError("");
      setRefreshKey((previous) => previous + 1);
    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Unable to delete lead. Please try again."
      );
    }
  };

  return (
    <div className="app-layout">
      <Sidebar />

      <main className="main-content">
        <header className="dashboard-header" id="overview">
          <div>
            <span className="page-eyebrow">WORKSPACE OVERVIEW</span>
            <h1>Lead Management</h1>
            <p>
              Track, manage and grow your customer relationships.
            </p>
          </div>

          <button
            type="button"
            className="btn-primary add-lead-btn"
            onClick={handleAddLead}
          >
            <Plus size={18} />
            Add New Lead
          </button>
        </header>

        {feedback && (
          <div className="feedback-message" role="status">
            <span>{feedback}</span>
            <button
              type="button"
              onClick={() => setFeedback("")}
              aria-label="Dismiss message"
            >
              ×
            </button>
          </div>
        )}

        {error && (
          <div className="error-message" role="alert">
            {error}
          </div>
        )}

        <section className="stats-grid">
          <StatsCard
            title="Total Leads"
            value={totalLeads}
            caption="All recorded leads"
            icon={Users}
            accent="accent-blue"
          />

          <StatsCard
            title="New Leads"
            value={newLeads}
            caption="Awaiting contact"
            icon={UserPlus}
            accent="accent-purple"
          />

          <StatsCard
            title="Contacted"
            value={contactedLeads}
            caption="Initial contact made"
            icon={MessageCircle}
            accent="accent-orange"
          />

          <StatsCard
            title="Qualified"
            value={qualifiedLeads}
            caption="Potential customers"
            icon={UserRoundCheck}
            accent="accent-green"
          />

          <StatsCard
            title="Lost"
            value={lostLeads}
            caption="Closed unsuccessful"
            icon={UserRoundX}
            accent="accent-red"
          />
        </section>

        <section className="leads-section" id="leads">
          <div className="section-heading">
            <div>
              <h2>All Leads</h2>
              <p>Manage your sales leads in one place.</p>
            </div>

            <button
              type="button"
              className="refresh-btn"
              onClick={() => setRefreshKey((previous) => previous + 1)}
              disabled={loading}
              title="Refresh leads"
            >
              <RefreshCw size={16} />
              Refresh
            </button>
          </div>

          <div className="table-toolbar">
            <div className="search-box">
              <Search size={18} />

              <input
                type="search"
                placeholder="Search leads by name..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                aria-label="Search leads by name"
              />
            </div>

            <div className="filter-group">
              <label htmlFor="status-filter">Filter by status</label>

              <select
                id="status-filter"
                value={status}
                onChange={(event) => setStatus(event.target.value)}
              >
                <option value="All">All Statuses</option>
                <option value="New">New</option>
                <option value="Contacted">Contacted</option>
                <option value="Qualified">Qualified</option>
                <option value="Lost">Lost</option>
              </select>
            </div>
          </div>

          {loading ? (
            <div className="loading-state">
              <RefreshCw size={20} className="loading-icon" />
              <p>Loading leads...</p>
            </div>
          ) : (
            <LeadTable
              leads={leads}
              onEdit={handleEditLead}
              onDelete={handleDeleteLead}
            />
          )}
        </section>

        <footer className="dashboard-footer">
          <span>LeadFlow — Lead Management System</span>
          <span>Built with MERN Stack</span>
        </footer>
      </main>

      {showForm && (
        <LeadForm
          lead={selectedLead}
          onSubmit={handleSaveLead}
          onClose={handleCloseForm}
        />
      )}
    </div>
  );
};

export default Dashboard;
