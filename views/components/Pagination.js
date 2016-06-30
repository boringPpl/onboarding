import React, { Component, PropTypes } from 'react'
import TableRow from 'material-ui/Table/TableRow'
import TableRowColumn from 'material-ui/Table/TableRowColumn'
import FontIcon from 'material-ui/FontIcon'
import IconButton from 'material-ui/IconButton'

class Pagination extends Component {
  static propTypes = {
    currentPage: PropTypes.number.isRequired,
    totalPages: PropTypes.number.isRequired,
    onPageClick: PropTypes.func
  };

  render = () => {
    const { currentPage, totalPages, onPageClick } = this.props
    const styles = {
      footerContent: {
        verticalAlign: 'middle',
        padding: 12,
        fontWeight: 500
      }
    }

    return (
      <TableRow>
        <TableRowColumn style={{ textAlign: 'right' }}>
          <span style={styles.footerContent}>
            {`page ${currentPage} of ${totalPages}`}
          </span>
          <IconButton
            style={styles.footerContent}
            disabled={currentPage === 1}
            onClick={onPageClick.bind(null, currentPage - 1)}
          >
            <FontIcon className='material-icons'>chevron_left</FontIcon>
          </IconButton>
          <IconButton
            style={styles.footerContent}
            disabled={currentPage >= totalPages}
            onClick={onPageClick.bind(null, currentPage + 1)}
          >
            <FontIcon className='material-icons'>chevron_right</FontIcon>
          </IconButton>
        </TableRowColumn>
      </TableRow>
    )
  };
}

export default Pagination
