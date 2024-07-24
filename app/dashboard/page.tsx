import React from 'react';
import DashboardContent from '../../components/dashboard_contents';
import { cookies } from 'next/headers';

const Dashboard = () => {
  
  const cookieStored = cookies();
  const userSession_name: string | any = cookieStored.get('email')?.value;

  return (
    <>
      <DashboardContent username={userSession_name} />
    </>
  );
}

export default Dashboard;
