import React from 'react'
import SettingsElement from '../SettingsElement'
import {Password} from 'primereact/password'
import { connect } from 'react-redux'
import {settingsActions, settingsSelectors} from '../../../../redux/ducks/settings'

import {axiosPlain} from '../../../../lib/axios-api'
import axios from '../../../../lib/axios-api'
import { Button } from 'primereact/button'

import {Growl} from 'primereact/growl'

class PasswordChange extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      minPwLength: 5,
      textRowOne: '',
      textRowTwo: '',
      textRowThree: ''
    }
    this.pendingRequest = false
  }

  changePassword = () => {
    const {oldPassword, newPassword, newPasswordSecond, minPwLength} = this.state
    const {loading, username} = this.props
    if(loading){
      return
    }
      
    // checking for all fields if anything has been entered at all
    if(!oldPassword || !newPassword || !newPasswordSecond) {
      const textRowOne = oldPassword ? '' : 'Please enter your old password'
      const textRowTwo = newPassword ? '' : 'Please enter a new password'
      const textRowThree = newPasswordSecond ? '' : 'Please enter your new password again'
      this.setState({textRowOne, textRowTwo, textRowThree})
      return
    }
    // checking if new password has the minimum length
    if(newPassword.length < minPwLength) {
      const textRowOne = ''
      const textRowTwo = `Your new password must to have at least ${minPwLength} characters`
      const textRowThree = ''
      this.setState({textRowOne, textRowTwo, textRowThree})
      return
    }

    if(newPassword === oldPassword){
      const textRowOne = ''
      const textRowTwo = 'Your new password must differ from your old password'
      const textRowThree = ''
      this.setState({textRowOne, textRowTwo, textRowThree})
      return
    }

    if(newPasswordSecond != newPassword) {
      const textRowOne = ''
      const textRowTwo = ''
      const textRowThree = 'Your confirmation password does not match your new password'
      this.setState({textRowOne, textRowTwo, textRowThree})
      return
    }

    const textRowOne = ''
    const textRowTwo = ''
    const textRowThree = ''
    this.setState({textRowOne, textRowTwo, textRowThree})
  
    this.pendingRequest = true
    this.props.changePassword(username, oldPassword, newPassword)
  }

  passwordDidChange = () => {
    this.pendingRequest = false
    this.growl.show({severity: 'success', summary: 'Ok', detail: 'Your password has been changed'})
    this.setState({oldPassword: '', newPassword: '', newPasswordSecond: ''})
  }

  passwordDidNotChange = () => {
    this.pendingRequest = false
    this.growl.show({severity: 'error', summary: 'Error', detail: `Your password could not be changed: ${this.props.error}`})
  }

  render() {
    // console.log(this.state)
    const {textRowOne, textRowTwo, textRowThree, minPwLength} = this.state
    const {loading, error} = this.props
    if(!loading && this.pendingRequest && !error) {this.passwordDidChange()}
    if(!loading && this.pendingRequest && error) {this.passwordDidNotChange()}

    return(
      <div>
        <style jsx>{`
          .p-dir-col{
            width: 50%;
            margin: auto;
          }
          .p-col{
            padding-top: 0;
            padding-botom: 0;
          }
          .errorMessage{
            font-size: 0.8rem;
            color: red;
            padding-left: 6rem;
          }
        `}</style>
        <SettingsElement title='Change Password' btnLabel='Change' btnOnClick={this.changePassword} line>
          <div className='content'>
            <div className="p-grid p-dir-col">
              <div className="p-col">
                <div className='p-grid p-align-center'>
                  <div className='p-col-6'>Current password</div>
                  <div className='p-col-6'>
                    <Password feedback={false} value={this.state.oldPassword} onChange={(e) => this.setState({oldPassword: e.target.value})} />
                  </div>
                  <div className='p-col-12 errorMessage'>
                    {textRowOne !== '' ? textRowOne : ''}
                  </div>
                </div>
              </div>
              <div className="p-col">
                <div className='p-grid p-align-center'>
                  <div className='p-col-6'>New password</div>
                  <div className='p-col-6'>
                    <Password feedback={false} tooltip={`Your password needs to have at least ${minPwLength} characters.`} value={this.state.newPassword} onChange={(e) => this.setState({newPassword: e.target.value})} />
                  </div>
                  <div className='p-col-12 errorMessage'>
                    {textRowTwo !== '' ? textRowTwo : ''}
                  </div>
                </div>
              </div>
              <div className="p-col">
                <div className='p-grid p-align-center'>
                  <div className='p-col-6'>Confirm password</div>
                  <div className='p-col-6'>
                    <Password feedback={false} value={this.state.newPasswordSecond} onChange={(e) => this.setState({newPasswordSecond: e.target.value})} />
                  </div>
                  <div className='p-col-12 errorMessage'>
                    {textRowThree !== '' ? textRowThree : ''}
                  </div>
                  <div className='p-col-10'></div>
                  <div className='p-col-2'><Button label='Change' onClick={this.changePassword}/></div>
                </div>
              </div>
            </div>
          </div>
        </SettingsElement>

        <Growl ref={(el) => this.growl = el} />
      </div>
        
    )
  }
}

function mapStateToProps(state) {
  const { loading, error} = state.settings
  const {username} = state.authentication
  return {
    loading,
    error,
    username
  }
}

const mapDispatchToProps = {
  exampleIncrement: settingsActions.exampleIncrement,
  exampleDecrement: settingsActions.exampleDecrement,
  changePassword: settingsActions.changePassword
}

export default connect(mapStateToProps, mapDispatchToProps)(PasswordChange)