import React, { Component } from 'react'
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
  render () {
    return (
      <App>
        <div className={styles.home}>
          <div className={styles.headerWrapper}>
            <Grid>
              <Row>
                <Col xs={12}>
                  <img className={styles.logo} src='logo.png' />
                  <div className={styles.headerSlogan}>Work with the Best <br /> to be the Best of You.</div>
                  <div className={styles.headerSignup}>
                    <a href='#features'>How does it work?</a>
                    &nbsp;&nbsp;
                    <a href='#signup'>Sign up</a>
                  </div>
                </Col>
              </Row>
            </Grid>
          </div>

          <div className={styles.bannerWrapper}>
            <Grid>
              <Row middle='xs' className={styles.bannerContent}>
                <Col xs={12} sm={6} xsOffset={0} smOffset={6}>
                  <h1 className={styles.bannerHeading}>Profile yourself as a developer today.</h1>
                  <p>Find out about other similar skilled developers. <br /> Connect with them.</p>
                  <RaisedButton
                    label='Sign up now'
                    backgroundColor='#ff6f22'
                    labelColor='white'
                    linkButton
                    href='#signup'
                    style={{ width: 192, height: 64 }}
                    labelStyle={{ fontSize: 18 }}
                  />
                </Col>
              </Row>
            </Grid>
          </div>

          <div id='features' className={styles.featuresWrapper}>
            <Grid>
              <Row>
                <Col xs={12}>
                  <h1 className={styles.featureHeading}>How does it work?</h1>
                  <p>
                    We will email you when our alpha launch is ready. <br />
                    Simply access the site and login with your Github/LinkedIn account. <br />
                    All profiles on hasBrain are private unless you indicate sections you want to be public
                  </p>
                </Col>
              </Row>
              <br />
              <Row>
                <Col xs={12} sm={4}>
                  <img src='feature-icon-1.png' />
                  <h2 className={styles.featureHeading}>Get Profiled</h2>
                  <p className={styles.small}>Login with your LinkedIn or Github account and we will do the rest of profiling.</p>
                </Col>
                <Col xs={12} sm={4}>
                  <img src='feature-icon-2.png' />
                  <h2 className={styles.featureHeading}>Know Developers with Similar Skills</h2>
                  <p className={styles.small}>Get intro to peers at the code level and their area of interest.</p>
                </Col>
                <Col xs={12} sm={4}>
                  <img src='feature-icon-3.png' />
                  <h2 className={styles.featureHeading}>Contribute and Improve with the Community</h2>
                  <p className={styles.small}>Benchmark your idea and share with everyone so we can all learn.</p>
                </Col>
              </Row>

            </Grid>
          </div>

          <div id='signup' className={styles.signupWrapper}>
            <Grid>
              <Row>
                <Col xs={12}>
                  <h1>Sign Up</h1>
                  <p>Sign up today and be the first to get your profile! <br /> Ready to join the fun?</p>
                  <br />
                  <RaisedButton
                    label='Login with Github'
                    backgroundColor='#333'
                    labelColor='white'
                    linkButton
                    href='/auth/github'
                    icon={<GithubIcon style={{ width: 24, height: 24 }} color='white' />}
                    style={{ width: 288, height: 64 }}
                    labelStyle={{ fontSize: 18, verticalAlign: 'middle' }}
                  />
                </Col>
              </Row>
            </Grid>
          </div>

          <div className={styles.footer}>
            Copyright &copy; 2016 hasBrain
          </div>
        </div>
      </App>
    )
  }
}

export default Home
