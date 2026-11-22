const StatsCard = ({ title, value, caption, icon: Icon, accent }) => {
  return (
    <article className="stats-card">
      <div className="stats-content">
        <p className="stats-title">{title}</p>
        <h2 className="stats-value">{value}</h2>
        <span className="stats-caption">{caption}</span>
      </div>

      <div className={`stats-icon ${accent}`}>
        <Icon size={21} />
      </div>
    </article>
  );
};

export default StatsCard;
