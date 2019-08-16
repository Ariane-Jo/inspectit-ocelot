import { withRouter } from 'next/router';
import Link from '../../../basics/Link'

const SettingsNavigationItem = ({ href, icon, name, router }) => {
  console.log(router) //TODO: why undefined?
  return (
    <Link className="this" href={href}>
      <a>
      <style jsx>{`
        a {
          color: grey;
          border-bottom: 1px solid #ddd;
          padding-top: 8px;
          padding-bottom: 2px;
          font-size: 14px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        a:hover {
          background-color: white;
          color: grey;
        }
        .pi {
          margin: 0px 4px 0px 4px;
          font-size: 1.5rem;
          color: #bbb;
        }
      `}</style>
      <i className={"pi " + icon} />{name}</a>
    </Link>
  )
}

export default SettingsNavigationItem