import { Component, OnInit } from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-challange-1-css',
  standalone: true,
  imports: [],
  templateUrl: './challange-1-css.component.html',
  styleUrl: './challange-1-css.component.css'
})

export class FlexboxFroggyComponent implements OnInit {

  ngOnInit(): void {
    this.loadExternalScripts();
  }

  loadExternalScripts(): void {
    const scripts = [
      'assets/js/levels.js',
      'assets/js/docs.js',
      'assets/js/messages.js',
      'assets/js/game.js',
      'https://platform.twitter.com/widgets.js',
      'https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.5&appId=916849395036923'
    ];

    scripts.forEach(src => {
      const script = document.createElement('script');
      script.src = src;
      script.async = true;
      document.body.appendChild(script);
    });
  }
}

export class Challange1CssComponent {

}
