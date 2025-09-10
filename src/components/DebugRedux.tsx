"use client";
import { useSelector } from "react-redux";

export default function DebugRedux() {
  const state = useSelector((state) => state);
  return (
    <div style={{ background: '#fff', color: '#222', padding: '1rem', border: '1px solid #ccc', margin: '1rem 0', fontSize: '14px' }}>
      <h3>Redux State Debug</h3>
      <pre>{JSON.stringify(state, null, 2)}</pre>
    </div>
  );
}
