import {
  LayoutDashboard,
  Users,
  CircleHelp,
  Layers3,
} from "lucide-react";

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <div className="brand-icon">
          <Layers3 size={22} />
        </div>
        <span>LeadFlow</span>
      </div>

      <div className="sidebar-section">
        <p className="sidebar-label">WORKSPACE</p>

        <nav className="sidebar-nav">
          <a href="#overview" className="nav-link active">
            <LayoutDashboard size={19} />
            <span>Overview</span>
          </a>

          <a href="#leads" className="nav-link">
            <Users size={19} />
            <span>Lead Management</span>
          </a>
        </nav>
      </div>

      <div className="sidebar-bottom">
        <a href="#help" className="nav-link">
          <CircleHelp size={19} />
          <span>Help Center</span>
        </a>

        <div className="sidebar-profile">
          <div className="profile-avatar">LF</div>
          <div>
            <strong>Lead Manager</strong>
            <small>Workspace Admin</small>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
