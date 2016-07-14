import React, { Component } from 'react'
import { Card, CardMedia, CardTitle, CardText } from 'material-ui/Card'
import { Row, Col } from 'react-flexbox-grid'
import Layout from './Layout'
import Tree from '../../components/Tree'
import styles from './layout.css'

const data = {
  'name': 'Eve',
  'children': [
    {
      'name': 'Cain'
    },
    {
      'name': 'Seth',
      'children': [
        {
          'name': 'Enos'
        },
        {
          'name': 'Noam'
        }
      ]
    }
  ]
}

class Dashboard extends Component {
  _handleNodeClick = (data) => {
    // console.log(data)
  }

  render () {
    return (
      <Layout {...this.props}>
        <h2 className={styles.heading}>Dashboard</h2>
        <Row>
          <Col xs={12} md={6}>
            <Card>
              <CardMedia>
                <Tree
                  dataSource={data}
                  onNodeClick={this._handleNodeClick}
                  style={{ height: 480 }}
                />
              </CardMedia>
              <CardTitle title='Front-end' subtitle='Front-end skill tree' />
              <CardText>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
                Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
                Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
              </CardText>
            </Card>
          </Col>
        </Row>
      </Layout>
    )
  }
}

export default Dashboard
