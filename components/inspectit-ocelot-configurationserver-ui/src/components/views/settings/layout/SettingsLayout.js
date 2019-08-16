import React from 'react'
import SettingsSideNavigation from './SettingsSideNavigation'

const SettingsLayout = (props) => {
  return (
    <div>
      <style jsx>{`
        .content {
          margin-left: 6rem;
          overflow: auto auto;
        }
      `}</style>

      <SettingsSideNavigation />
      <div className='content'>
        {props.children}
      </div>
    </div>
  )
}

export default SettingsLayout