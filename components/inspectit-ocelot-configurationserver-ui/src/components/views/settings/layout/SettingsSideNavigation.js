import React from 'react'
import itemData from '../../../../data/settings-navigation-items.json'
import NavigationItem from '../../../layout/SideNavigationItem'
import SettingsNavigationItem from './SettingsNavigationItem'

const SettingsSideNavigation = (props) => {
  return (
    <div className='this'>
      <style jsx>{`
        .this {
            position: fixed;
            top: 4rem;
            left: 4rem;
            bottom: 0;
            width: 6rem;
            display: flex;
            flex-direction: column;
            border-right: 1px solid #ddd;
            background-color: #f9f9f9;
        }
        `}</style>
      {itemData.map(item => (
        <SettingsNavigationItem key={item.name} href={item.href} name={item.name} icon={item.icon}/>
      ))}
    </div>
  )
}

export default SettingsSideNavigation