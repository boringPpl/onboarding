import React, { Component, PropTypes } from 'react'
import { Grid, Row, Col } from 'react-flexbox-grid'
import RaisedButton from 'material-ui/RaisedButton'
import SvgIcon from 'material-ui/SvgIcon'

import App from './App'
import styles from './home.css'

const GithubIcon = props => (
  <SvgIcon viewBox='0 0 32 32' {...props}>
    <path d='M16.003,0C7.17,0,0.008,7.162,0.008,15.997  c0,7.067,4.582,13.063,10.94,15.179c0.8,0.146,1.052-0.328,1.052-0.752c0-0.38,0.008-1.442,0-2.777  c-4.449,0.967-5.371-2.107-5.371-2.107c-0.727-1.848-1.775-2.34-1.775-2.34c-1.452-0.992,0.109-0.973,0.109-0.973  c1.605,0.113,2.451,1.649,2.451,1.649c1.427,2.443,3.743,1.737,4.654,1.329c0.146-1.034,0.56-1.739,1.017-2.139  c-3.552-0.404-7.286-1.776-7.286-7.906c0-1.747,0.623-3.174,1.646-4.292C7.28,10.464,6.73,8.837,7.602,6.634  c0,0,1.343-0.43,4.398,1.641c1.276-0.355,2.645-0.532,4.005-0.538c1.359,0.006,2.727,0.183,4.005,0.538  c3.055-2.07,4.396-1.641,4.396-1.641c0.872,2.203,0.323,3.83,0.159,4.234c1.023,1.118,1.644,2.545,1.644,4.292  c0,6.146-3.74,7.498-7.304,7.893C19.479,23.548,20,24.508,20,26c0,2,0,3.902,0,4.428c0,0.428,0.258,0.901,1.07,0.746  C27.422,29.055,32,23.062,32,15.997C32,7.162,24.838,0,16.003,0z' />
  </SvgIcon>
)

class Home extends Component {
  static propTypes = {
    data: PropTypes.object
  }

  componentDidMount () {
    setTimeout(() => {
      const error = this.props.data.error
      if (error.length) {
        this.notification.show('error', error[0])
      }
    }, 0)
  }

  render () {
    return (
      <App>
        <div className={styles.home}>
          <div className={styles.header}>
            <Grid>
              <Row>
                <Col xs={12}>
                  <img className={styles.logo} src='logo.png' height='50' />
                  <div className={styles.headerSlogan}>Work with the Best to be the Best of You.</div>
                  <div className={styles.headerSignup}>How does it work? Sign up</div>
                </Col>
              </Row>
            </Grid>
          </div>

          <div>
            <Grid style={{ background: 'red' }}>
              <Row>
                <Col xs={12} sm={6} xsOffset={0} smOffset={6}>
                  <h1>Profile yourself as a developer today.</h1>
                  <p>Find out about other similar skilled developers.</p>
                  <p>Connect with them.</p>
                </Col>
              </Row>
            </Grid>
          </div>

          <div>
            <Grid>
              <Row>
                <Col xs={12}>
                  <h1>How does it work?</h1>
                  <p>We will email you when our alpha launch is ready.</p>
                  <p>Simply access the site and login with your Github/LinkedIn account.</p>
                </Col>
              </Row>

              <Row>
                <Col xs={12} sm={4}>
                  <h1>Get Profiled</h1>
                  <p>Login with your LinkedIn or Github account and we will do the rest of profiling.</p>
                </Col>
                <Col xs={12} sm={4}>
                  <h1>Know Developers with Similar Skills</h1>
                  <p>Get intro to peers at the code level and their area of interest.</p>
                </Col>
                <Col xs={12} sm={4}>
                  <h1>Contribute and Improve with the Community</h1>
                  <p>Benchmark your idea and share with everyone so we can all learn.</p>
                </Col>
              </Row>

            </Grid>
          </div>

          <div>
            <Grid style={{ background: 'grey' }}>
              <Row>
                <Col xs={12}>
                  <h1>Sign Up</h1>
                  <p>Sign up today and be the first to get your profile!</p>
                  <RaisedButton
                    label='Login with Github'
                    style={{ width: '100%' }}
                    backgroundColor='#333'
                    labelColor='white'
                    linkButton
                    href='/auth/github'
                    icon={<GithubIcon style={{ width: 24, height: 24 }} color='white' />}
                  />
                </Col>
              </Row>
            </Grid>
          </div>
        </div>
      </App>
    )
  }
}

export default Home
