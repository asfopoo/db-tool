import React, {
  Component,
} from 'react';
import {
  listLeadGen,
  searchLeadGen,
  uploader,
  downloader,
} from 'services/api';
import FileSaver from 'file-saver';
import {
  XContent,
  XContainer,
  PageHead,
} from 'components';
import LoadingScreen from 'react-loading-screen';

export default class Dashboard extends Component {

  constructor(props) {
    super(props);

    this.state = {
      imageURL: '',
      leads: [],
      count: 0
    };
    this.handleUploadImage = this.handleUploadImage.bind(this);
    this.handleDownloadImage = this.handleDownloadImage.bind(this);
  }

  handleUploadImage(e){ //UPload
    e.preventDefault();

    const data = new FormData();
    console.log(this.uploadInput.files[0]);
    console.log("this.");
    data.append('file', this.uploadInput.files[0]);
    data.append('filename', this.fileName.value);

    console.log(data);
    console.log("data");

    fetch('http://localhost:8091/uploader', {
      method: 'Post',
      body: data,
    }).then((response) => {
      console.log(response);
      console.log("response");
    });
  }

  handleDownloadImage(e){ //download
    e.preventDefault();

    const data = new FormData();
    data.append('leads', this.leads.value);
    console.log(data);

    fetch('http://localhost:8091/downloader', {
      method: 'POST',
      body: data,

    }).then(response => {
      return response.json(); // converts readable stream
    }).then((response) => { // returns the data
      console.log(response.data);
      console.log("response");
      let buffer = new Buffer(response.data, 'binary');
      var byteArray = new Uint8Array(buffer);
      // sting = JSON.stringify(byteArray);
      var file = new Blob([byteArray], {type: response.contentType});
      FileSaver.saveAs(file, response.fileName);
    });
  }

  fetchLeads = id => {
    searchLeadGen(id).then(leads => {
      console.log(leads);
      this.setState({
        leads: leads.data,
      })
    }).catch(err => {
      console.log(err);
    });
  };

  search = e => {
    console.log(e);
    // e.target.value will equal value textbox
    this.fetchLeads(e.target.value);
  };
  renderLeads() {
    const {
      leads,
    } = this.state;
    if(leads === null){
      return null;
    }
    //return leads.map((lead, index) => {
    /*
      return (
        <span key={index}>{lead.city}</span>
      );
    });
  }*/
    return (
      <span>{leads.city}</span>
    );
  }
  /*change = e => {
    this.setState({file: e.target.value});
  }
  upload(e){
    e.preventDefault();
    uploader(this.state.file).then(fileUploadResult => {
      console.log(fileUploadResult.data);
        this.setState({
          file: fileUploadResult.data,
      })
    }).catch(err => {

    });
  }*/
  render(){
      return (
        <div>
          <PageHead>
            <div className="container-fluid">
              <div className="row">
                <div className="pull-left">
                  <h2>Lead Gen Dashboard</h2>
                </div>
              </div>
            </div>
          </PageHead>
          {/*<XContainer>
            <XContent>
              <div>
                <form>
                  <div>
                    <label htmlFor="id">Search the db by id#</label>
                  </div>
                  <input type="text" name="id" onChange={this.search}/>
                  <p></p>
                  <p></p>
                </form>
                <p>City: {this.renderLeads()}</p>
              </div>
            </XContent>
          </XContainer>*/}
          <XContainer>
            <XContent>
              <div>
                <label>Upload your excel sheet to the database</label>
                <form id="uploadForm"
                      encType="multipart/form-data"
                      action="upload"
                      method="post"
                      onSubmit={this.handleUploadImage}
                >
                  <input type="file" name="file" ref={(ref) => { this.uploadInput = ref; }} />
                  <input ref={(ref) => { this.fileName = ref; }} type="text" placeholder="Enter the name of file" />
                  <button type='submit'>Upload</button>
                </form>
              </div>
            </XContent>
          </XContainer>
          <XContainer>
            <XContent>
              <div>
                <label>Downloader</label>
                <p>Enter the number of leads to download from the database</p>
                <form id="downloadForm"
                      encType="multipart/form-data"
                      action="download"
                      method="get"
                      onSubmit={this.handleDownloadImage}
                >
                  <input ref={(ref) => { this.leads = ref; }} type="text" placeholder="Number of leads"/>
                  <button type='submit'>Download</button>
                </form>
              </div>
            </XContent>
          </XContainer>
        </div>
      );
  }
}