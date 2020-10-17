import { Component } from '@angular/core';
import { remote, ipcRenderer } from 'electron';
import { ElectronService } from 'ngx-electron';

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
  constructor(private electronService: ElectronService,){
    this.fs = window.require('fs');
    this.path = window.require('path');
    this.remote = window.require('electron').remote;
    this.ipcRender = window.require('electron').ipcRenderer;
    this.electronService.ipcRenderer.on('create-folder-result', (event, data) => {
      console.log(data);
    })
  }

  sendMsg(){
    this.electronService.ipcRenderer.send('create-folder', {data: '2222'});
   
  }

  print() {
    console.log('fs:', this.fs.readdirSync('/'));
    console.log('path:', this.path.join(__dirname, 'dist/index.html'));

  }

  change() {
    this.electronService.ipcRenderer.send('change', {data: '2222'});
  }
}
