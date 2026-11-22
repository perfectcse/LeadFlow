import { useEffect, useState } from "react";
import { X, Save } from "lucide-react";

const initialFormData = {
  name: "",
  email: "",
  phone: "",
  company: "",
  source: "Website",
  status: "New",
};

const sources = [
  "Website",
  "LinkedIn",
  "Referral",
  "Cold Call",
  "Email Campaign",
  "Social Media",
  "Other",
];

const statuses = ["New", "Contacted", "Qualified", "Lost"];

const LeadForm = ({ lead, onSubmit, onClose }) => {
  const [formData, setFormData] = useState(initialFormData);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (lead) {
      setFormData({
        name: lead.name || "",
        email: lead.email || "",
        phone: lead.phone || "",
        company: lead.company || "",
        source: lead.source || "Website",
        status: lead.status || "New",
      });
    } else {
      setFormData(initialFormData);
    }

    setError("");
  }, [lead]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    const payload = Object.fromEntries(
      Object.entries(formData).map(([key, value]) => [
        key,
        value.trim(),
      ])
    );

    if (
      !payload.name ||
      !payload.email ||
      !payload.phone ||
      !payload.company ||
      !payload.source
    ) {
      setError("Please complete all required fields.");
      return;
    }

    try {
      setSubmitting(true);
      await onSubmit(payload);
      onClose();
    } catch (err) {
      setError(
        err.response?.data?.errors?.[0]?.message ||
        err.response?.data?.message ||
        "Unable to save lead. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className="form-overlay"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <section
        className="form-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="lead-form-title"
      >
        <div className="form-header">
          <div>
            <span className="form-eyebrow">LEAD MANAGEMENT</span>
            <h2 id="lead-form-title">
              {lead ? "Edit Lead" : "Add New Lead"}
            </h2>
            <p>
              {lead
                ? "Update the lead information below."
                : "Enter the details to create a new lead."}
            </p>
          </div>

          <button
            type="button"
            className="form-close-btn"
            onClick={onClose}
            aria-label="Close form"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="lead-form">
          <div className="lead-form-grid">
            <div className="form-field">
              <label htmlFor="name">Full Name *</label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Enter full name"
                value={formData.name}
                onChange={handleChange}
                maxLength={100}
                required
              />
            </div>

            <div className="form-field">
              <label htmlFor="email">Email Address *</label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="name@example.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-field">
              <label htmlFor="phone">Phone Number *</label>
              <input
                id="phone"
                name="phone"
                type="tel"
                placeholder="+91 9876543210"
                value={formData.phone}
                onChange={handleChange}
                minLength={7}
                maxLength={20}
                required
              />
            </div>

            <div className="form-field">
              <label htmlFor="company">Company *</label>
              <input
                id="company"
                name="company"
                type="text"
                placeholder="Enter company name"
                value={formData.company}
                onChange={handleChange}
                maxLength={120}
                required
              />
            </div>

            <div className="form-field">
              <label htmlFor="source">Lead Source *</label>
              <select
                id="source"
                name="source"
                value={formData.source}
                onChange={handleChange}
                required
              >
                {sources.map((source) => (
                  <option key={source} value={source}>
                    {source}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-field">
              <label htmlFor="status">Lead Status *</label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                required
              >
                {statuses.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {error && (
            <p className="form-error" role="alert">
              {error}
            </p>
          )}

          <div className="form-actions">
            <button
              type="button"
              className="btn-secondary"
              onClick={onClose}
              disabled={submitting}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="btn-primary"
              disabled={submitting}
            >
              <Save size={16} />
              {submitting
                ? "Saving..."
                : lead
                  ? "Save Changes"
                  : "Create Lead"}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default LeadForm;
