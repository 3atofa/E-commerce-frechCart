import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID, Renderer2, RendererFactory2, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})



export class MyTranslateService {
  private readonly renderer2 = inject(RendererFactory2).createRenderer(null,null);

  constructor(
    private _TranslateService:TranslateService,
    @Inject(PLATFORM_ID) private id:object,
    
    ) { 

    
    // ! check if in browser
    if(isPlatformBrowser(this.id)){
      this._TranslateService.setDefaultLang('en');

      const savedLang = localStorage.getItem('lang');
      if(savedLang){
        this._TranslateService.use(savedLang!)
      }
    }

    this.checkDirection()
  }

  checkDirection():void{
    if(localStorage.getItem('lang') === 'en'){
       this.renderer2.setAttribute(document.documentElement, 'dir', 'ltr')
       this.renderer2.setAttribute(document.documentElement, 'lang', 'en')
    } else if (localStorage.getItem('lang') === 'ar'){
      this.renderer2.setAttribute(document.documentElement, 'dir', 'rtl')
      this.renderer2.setAttribute(document.documentElement, 'lang', 'ar')
    }
  }

  changeLang(lang:string):void{
    localStorage.setItem('lang', lang);
    
    this._TranslateService.use(lang);

    this.checkDirection()
  }

  
}
