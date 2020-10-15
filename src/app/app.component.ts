import { Component } from '@angular/core';
import { remote, ipcRenderer } from 'electron';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  remote: typeof remote;
  ipcRender: typeof ipcRenderer;
  fs
  path
  constructor(){
    this.remote = window.require('electron').remote;
    this.ipcRender = window.require('electron').ipcRenderer;
  }

  sendMsg(){
    this.fs = window.require('fs');
    this.path = window.require('path');
    this.ipcRender.send('create-folder');
    this.ipcRender.on('create-folder-result', function(event, data) {
      console.log(data);//finished!
    })
  }

  print() {
    console.log('fs:', this.fs.readdirSync('/'));
    console.log('path:', this.path.join(__dirname, 'dist/index.html'));

  }
}
