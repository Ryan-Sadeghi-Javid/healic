import './Footer.css'

import Github from '../../assets/icons/GitHub-Mark-Light-32px.png'
import Devpost from '../../assets/icons/devpost.png'

export default function Footer() {
  return (
    <footer className="page-footer">
      <div className="container">
        <div className="row">
          <div className="col l6 s12">
            <h5 className="white-text">Made with ❤️</h5>
          </div>
          <div className="col l4 offset-l2 s12">
            <h5 className="white-text">Links</h5>
            <ul>
              <li><a className="grey-text text-lighten-3" href="https://github.com/Ryan-Sadeghi-Javid/healic" target='_blank' rel="noreferrer"><img src={Github} alt='' style={{width: 24, height: 24, marginRight: 10, marginBottom: 4}}></img> Source Code</a></li>
              <li><a className="grey-text text-lighten-3" href="https://devpost.com/software/healic" target='_blank' rel="noreferrer"><img src={Devpost} alt='' style={{width: 32, height: 32, marginRight: 5, marginLeft: -3}}></img> Devpost</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="footer-copyright">
        <div className="container" style={{textAlign: 'center'}}>
        © 2025 Ryan Sadeghi-Javid
        </div>
      </div>
    </footer>
  )
}