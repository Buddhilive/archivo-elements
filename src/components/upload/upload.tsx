import { Component, Host, h, Prop, Element, Method } from '@stencil/core';

@Component({
  tag: 'archivo-upload',
  styleUrl: 'upload.css',
  shadow: false
})
export class Upload {

  @Prop() artitle: string;
  @Prop() araccept: string = "*";
  @Prop() armaultiple: boolean = false;

  @Element() elemnt: HTMLElement;

  private fileInput: any;
  private ardata: any;

  uploadFile(evt) {
    let files = evt.target.files;
    let fileObj;
    console.log(evt.target.files);

    for (let i = 0; fileObj = files[i]; i++) {
      let reader = new FileReader();
      reader.onload = e => {
        console.log(e.target.result);
        this.ardata = e.target.result;
      };
      reader.readAsDataURL(fileObj);
    }
  }

  @Method()
  async getFileData() {
    return this.ardata;
  }

  componentDidLoad() {
    this.fileInput = this.elemnt.querySelector('input');
  }

  render() {
    return (
      <Host>
        <button onClick={() => this.fileInput.click()}>{this.artitle}</button>
        <input type="file" multiple={this.armaultiple} accept={this.araccept} onChange={(evt: UIEvent) => this.uploadFile(evt)}></input>
      </Host>
    );
  }

}
