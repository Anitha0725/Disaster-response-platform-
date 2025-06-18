import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

export default function RealTimeFeed() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const socket = io('http://localhost:4000'); // Replace with backend URL
    socket.on('disaster_updated', (data) => {
      setLogs(prev => [...prev, `Disaster Updated: ${JSON.stringify(data)}`]);
    });
    socket.on('resources_updated', (data) => {
      setLogs(prev => [...prev, `Resources Updated: ${JSON.stringify(data)}`]);
    });
    socket.on('social_media_updated', (data) => {
      setLogs(prev => [...prev, `Social Media: ${JSON.stringify(data)}`]);
    });
    return () => socket.disconnect();
  }, []);

  return (
    <div>
      <h3>Live Updates</h3>
      <ul>
        {logs.slice(-5).map((log, idx) => (
          <li key={idx}>{log}</li>
        ))}
      </ul>
    </div>
  );
}
