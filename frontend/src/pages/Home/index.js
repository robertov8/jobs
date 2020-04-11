import React from 'react';
import { useSelector } from 'react-redux';

import ReactMarkdown from 'react-markdown';
import breaks from 'remark-breaks';

import { SideBar, Card } from './styles';

import IssuesTabs from '../../components/IssuesTabs';

export default function Home() {
  const body = useSelector(state => state.issues.body);

  return (
    <div className="container-fluid">
      <div className="row">
        <SideBar className="col-4">
          <IssuesTabs />
        </SideBar>

        <div className="col-8">
          {body ? (
            <Card className="card mt-3 p-2 bg-dark text-white">
              <div className="card-body">
                <ReactMarkdown source={body} plugins={[breaks]} />
              </div>
            </Card>
          ) : null}
        </div>
      </div>
    </div>
  );
}
