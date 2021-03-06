import React, {Component} from 'react'
import { connect } from 'react-redux'
import '../css/dropdown.css'
import '../css/uploadcsv.css'
import Categories from './DropdownCategory'
import Accounts from './DropdownAccount'
import FilterDate from './DropdownFilterDate'
import DatePicker from './DatePicker'
import { Modal } from 'react-bootstrap';
import Upload from '../containers/UploadApp'
import ExpensesApp from '../containers/ExpensesApp'
import { setVisibilityFilter } from '../actions/expensesActions'

export class DropDownApp extends Component {
  constructor(props) {
    super(props);

    console.log('>>>>> Dropdown props are: ', props)

    this.state = {showDatePicker: false, showDropzone: false};
    this.showDateModal   = this.showDateModal.bind(this);
    this.hideDateModal   = this.hideDateModal.bind(this);
    this.showDropzone    = this.showDropzone.bind(this);
    this.hideDropzone    = this.hideDropzone.bind(this);
    this.showAllExpenses = this.showAllExpenses.bind(this);
  }

  showDateModal() {
    this.setState({showDatePicker: true});
  }

  hideDateModal() {
    this.setState({showDatePicker: false});

  }

  showDropzone() {
    this.setState({showDropzone: true});
  }


  hideDropzone() {
    this.setState({showDropzone: false});
  }

  showAllExpenses() {
    this.props.setVisibilityFilter('SHOW_ALL', null, null);
  }

  componentWillReceiveProps(props) {
    console.log('got herrrrrr w props: ', props);
    if (props.uploadSuccess) {
      this.setState({showDropzone: false});
    }
  }

  render() {
    return (
      <div>
        <nav id="primary_nav_wrap">
          <ul>
            <li><a href="#">Categorize</a>
              <Categories
                categorize={this.props.categorize}
              />
            </li>
            <li class="current-menu-item"><a href="#" onClick={this.showDropzone}>Upload CSV</a></li>
            <li class="current-menu-item"><a href="#" onClick={this.showAllExpenses}>Show All Expenses</a></li>
            <li class="current-menu-item"><a href="#" onClick={this.showDateModal}>Filter By Date</a></li>
            <li><a href='#'>Select Account</a>
              <Accounts
                selectAccount={this.props.selectAccount}
              />
            </li>
          </ul>
        </nav>
        <Modal {...this.props} show={this.state.showDatePicker} onHide={this.hideDateModal} >
          <DatePicker hideModal = {this.hideDateModal}/>
        </Modal>
        <Modal show={this.state.showDropzone} onHide={this.hideDropzone} bsSize="m"
           aria-labelledby="contained-modal-title-m"
        >
          <Modal.Header className="upload-header">
            <Modal.Title id="contained-modal-title-m"> Upload Your CSV </Modal.Title>
          </Modal.Header>
          <Modal.Body className="upload-body">
            <Upload {...this.props}/>
          </Modal.Body>
        </Modal>
      </div>
    )
  }
}

function mapStateToProps(state) {
  console.log('Dropwndown mapStateToProps state is: ', state);
  const { startDate, endDate } = state.expensesReducer

  return {
    startDate: startDate,
    endDate: endDate
  }
}

export default connect(
  mapStateToProps,
  {
    setVisibilityFilter: setVisibilityFilter
  }
)(DropDownApp)
// <Modal {...this.props} show={this.state.showDropzone} onHide={this.hideDropzone} >
//   <Upload />
// </Modal>
