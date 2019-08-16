import React from 'react'
import SettingsElement from '../SettingsElement'
import SearchField from './ToolbarSearchField';
import UserDataTable from './UserDataTable';
import UserToolbar from './UserSettingsToolbar'

class UserSettingsView extends React.Component {
constructor(props){
  super(props)
  this.state = {}
}
  
  render() {
    return (
      <div className='this'>
        <style jsx>{`
        `}</style>
        <UserToolbar />
        <UserDataTable/>
        {/** <SettingsElement fullHeader={<SearchField/>}>
          <UserDataTable/>
        </SettingsElement>*/}
      </div>
    )
  }

}

export default UserSettingsView