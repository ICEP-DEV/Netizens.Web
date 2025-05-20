import React from 'react'
import './adminSettings.css'
import AdminSideBar from '../../../components/admin/adminSideBar/adminSideBar';
import Ribbon from '../../../components/admin/ribbon/ribbon';
import { toast, Toaster } from 'react-hot-toast';

const AdminSettingsPage= () => {
  return (
    <div className='admin-settings-page-container'>
      <Toaster />
        <Ribbon />
        <div className='admin-settings-container'>
            <AdminSideBar />
            <div className='admin-settings-page'>
              <div className='admin-settings-header-container'>
                <div className='admin-settings-header'>
                  <h2 className='admin-header-text'>Settings</h2>
                </div>
              </div>
            </div>
        </div>

    </div>
  )
}

export default AdminSettingsPage