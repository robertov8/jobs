import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';

import api from './services/api';

function App() {
  const [issues, setIssues] = useState([]);

  useEffect(() => {
    const fetchIssues = async () => {
      const response = await api.get('frontendbr/vagas/issues');

      setIssues(response.data);
    };

    fetchIssues().then();
  }, []);

  return (
    <>
      <h1>Github - Jobs</h1>

      <ul>
        {issues.map(issue => (
          <div key={issue.id}>
            <li>
              {issue.number} - {issue.title}
              <hr />
              <ReactMarkdown source={issue.body} />
            </li>

            <br />
          </div>
        ))}
      </ul>
    </>
  );
}

export default App;
