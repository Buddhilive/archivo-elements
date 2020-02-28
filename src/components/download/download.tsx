import { Component, Host, h, Prop } from '@stencil/core';

@Component({
  tag: 'archivo-download',
  styleUrl: 'download.css',
  shadow: false
})
export class Download {

  @Prop() artitle: string;
  @Prop() ardata: any;
  @Prop() arfilename: string;
  @Prop() armimetype: string;

  dataURItoBlob(dataURI) {
    var byteString = atob(dataURI.split(',')[1]);
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
  }

  async downloadfile() {
    let blobUrl;
    const mimeType = this.armimetype as string;
    if (mimeType.includes('data:image') || mimeType.includes('data:audio') || mimeType.includes('data:video')) {
      const blobFile = await this.dataURItoBlob(this.ardata);
      blobUrl = URL.createObjectURL(blobFile);
    } else {
      const jsonObj = JSON.stringify(this.ardata);
      const blobFile = new Blob([jsonObj], { type: this.armimetype });
      blobUrl = URL.createObjectURL(blobFile);
    }

    const aEl = document.createElement('a');
    aEl.href = blobUrl;
    aEl.download = this.arfilename;
    aEl.click();
  }

  render() {
    return (
      <Host>
        <button onClick={() => this.downloadfile()}>{this.artitle}</button>
      </Host>
    );
  }

}
