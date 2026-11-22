import {
  Mail,
  Phone,
  Pencil,
  Trash2,
  Building2,
} from "lucide-react";

const LeadTable = ({ leads, onEdit, onDelete }) => {
  const getStatusClass = (status) => {
    const statusClasses = {
      New: "status-new",
      Contacted: "status-contacted",
      Qualified: "status-qualified",
      Lost: "status-lost",
    };

    return statusClasses[status] || "";
  };

  const formatDate = (date) => {
    if (!date) return "-";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="table-container">
      <div className="table-scroll">
        <table className="lead-table">
          <thead>
            <tr>
              <th>LEAD NAME</th>
              <th>CONTACT DETAILS</th>
              <th>COMPANY</th>
              <th>SOURCE</th>
              <th>STATUS</th>
              <th>CREATED</th>
              <th>ACTIONS</th>
            </tr>
          </thead>

          <tbody>
            {leads.length === 0 ? (
              <tr>
                <td colSpan="7" className="empty-table">
                  <div className="empty-state">
                    <Building2 size={32} />
                    <h3>No leads found</h3>
                    <p>
                      Add your first lead or adjust your search filters.
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              leads.map((lead) => (
                <tr key={lead._id}>
                  <td>
                    <div className="lead-name-cell">
                      <strong>{lead.name}</strong>
                    </div>
                  </td>

                  <td>
                    <div className="contact-cell">
                      <span>
                        <Mail size={13} />
                        {lead.email}
                      </span>

                      <span>
                        <Phone size={13} />
                        {lead.phone}
                      </span>
                    </div>
                  </td>

                  <td>
                    <span className="company-name">
                      {lead.company}
                    </span>
                  </td>

                  <td>{lead.source}</td>

                  <td>
                    <span
                      className={`status-badge ${getStatusClass(
                        lead.status
                      )}`}
                    >
                      {lead.status}
                    </span>
                  </td>

                  <td className="date-cell">
                    {formatDate(lead.createdAt)}
                  </td>

                  <td>
                    <div className="table-actions">
                      <button
                        type="button"
                        className="action-btn edit-btn"
                        onClick={() => onEdit(lead)}
                        title="Edit lead"
                        aria-label={`Edit ${lead.name}`}
                      >
                        <Pencil size={16} />
                      </button>

                      <button
                        type="button"
                        className="action-btn delete-btn"
                        onClick={() => onDelete(lead)}
                        title="Delete lead"
                        aria-label={`Delete ${lead.name}`}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="table-footer">
        Showing {leads.length} {leads.length === 1 ? "lead" : "leads"}
      </div>
    </div>
  );
};

export default LeadTable;
