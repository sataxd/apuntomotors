import React from "react";

export default function DateRangePicker({ startDate, endDate, onChange }) {
  return (
    <div className="d-flex align-items-center gap-2">
      <input
        type="date"
        className="form-control"
        value={startDate}
        onChange={e => onChange({ startDate: e.target.value, endDate })}
        max={endDate}
      />
      <span className="mx-2">a</span>
      <input
        type="date"
        className="form-control"
        value={endDate}
        onChange={e => onChange({ startDate, endDate: e.target.value })}
        min={startDate}
      />
    </div>
  );
}
