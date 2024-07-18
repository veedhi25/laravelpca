import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from "next/document";
import { i18n } from "next-i18next";
import  Script  from "next/script";

export default class CustomDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    return await Document.getInitialProps(ctx);
  }

  render() {

    const { locale } = this.props.__NEXT_DATA__;
    const dir =  "ltr";

    // if (process.env.NODE_ENV !== "production") {
    //   i18n!.reloadResources(locale);
    // }

    // const envVariable = `${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`

    return (
      
      <Html>
        
        <Head>

        {/* <link rel="canonical" href='https: //retailunnati.com'/> */}
         
            {/* Global Site Tag (gtag.js) - Google Analytics */}
            {/* <script id="chat-init" src="https://cloud.board.support/account/js/init.js?id=156619822"></script> */}
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=UA-190495171-1`}
            />
            

            {/* google analytics */}
            
            <Script
              id="google-analytics"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'UA-190495171-1', {
                page_path: window.location.pathname,
              });
              `,
              }}
            />
              
              {/* Fastbase */}
              <script
               dangerouslySetInnerHTML={{
                __html: `(function () {
                var e,i=["https://fastbase.com/fscript.js","1ThKCRsVmr","script"],a=document,s=a.createElement(i[2]);
                s.async=!0,s.id=i[1],s.src=i[0],(e=a.getElementsByTagName(i[2])[0]).parentNode.insertBefore(s,e)
              })();`
            }}
              /> 

            {/* Microsoft clarity */}
           {/* <script
            dangerouslySetInnerHTML={{
              __html: `(function(c,l,a,r,i,t,y){
                    c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                    t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                    y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
                })(window, document, "clarity", "script", "daka9pmxye");`,
              }}
          /> */}
            

          <meta name="facebook-domain-verification" content="8mvkzpangtng356xvg4hqubj4mbuyq" />

           {/* interakt whatsapp button*/}
          {/* <script
            dangerouslySetInnerHTML={{
              __html: `(function(w,d,s,c,r,a,m){
                w['KiwiObject']=r;
                w[r]=w[r] || function () {
                  (w[r].q=w[r].q||[]).push(arguments)};
                w[r].l=1*new Date();
                  a=d.createElement(s);
                  m=d.getElementsByTagName(s)[0];
                a.async=1;
                a.src=c;
                m.parentNode.insertBefore(a,m)
              })(window,document,'script',"https://app.interakt.ai/kiwi-sdk/kiwi-sdk-17-prod-min.js?v="+ new Date().getTime(),'kiwi');
              window.addEventListener("load",function () {
                kiwi.init('', 'R74PF9xANjTtlgpYCm6WFEpmXvX7ZJ42', {});
              });`
              }}
            /> */}

              {/* Facebook login SDK */}
               <script
                   dangerouslySetInnerHTML={{
                   __html: `
                       window.fbAsyncInit = function() {
                           FB.init({
                           appId      : 381786777315073,
                           cookie     : true,
                           xfbml      : true,
                           version    : v14.0,
                           });
                           
                           FB.AppEvents.logPageView();   
                           
                       };
       
                       `}} 
               />

               {/* Facebook Login SDK */}
       
               <script
       
                   dangerouslySetInnerHTML = {{
                   __html: `
                           (function(d, s, id){
                               var js, fjs = d.getElementsByTagName(s)[0];
                               if (d.getElementById(id)) {return;}
                               js = d.createElement(s); js.id = id;
                               js.src = "https://connect.facebook.net/en_US/sdk.js";
                               fjs.parentNode.insertBefore(js, fjs);
                           }(document, 'script', 'facebook-jssdk'));
       
                       `}}
       
               />
               
              

             {/* Google tag manager */}
          <script
            dangerouslySetInnerHTML={{
              __html: `function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-58NV2K4'`
            }}
          />

            <noscript dangerouslySetInnerHTML={{
               __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-58NV2K4" height="0" width="0" style="display:none;visibility:hidden"></iframe>` }} />

          
          <script
            dangerouslySetInnerHTML={{
              __html: `!function(f,b,e,v,n,t,s)
                      {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                      n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                      n.queue=[];t=b.createElement(e);t.async=!0;
                      t.src=v;s=b.getElementsByTagName(e)[0];
                      s.parentNode.insertBefore(t,s)}(window, document,'script',
                      'https://connect.facebook.net/en_US/fbevents.js');
                      fbq('init', '2308291592787983');
                      fbq('track', 'PageView')`,
                    }}
          />
          
          <noscript
            dangerouslySetInnerHTML={{
              __html: `<img height="1" width="1" style="display:none"
            src="https://www.facebook.com/tr?id=2308291592787983&ev=PageView&noscript=1"/>`,
            }}
          />


          {/* smartlook session recording */}

        {/* <script type='text/javascript' 
          dangerouslySetInnerHTML={{
                      __html:`(
          window.smartlook||(function(d) {
            var o=smartlook=function(){ o.api.push(arguments)},h=d.getElementsByTagName('head')[0];
            var c=d.createElement('script');o.api=new Array();c.async=true;c.type='text/javascript';
            c.charset='utf-8';c.src='https://web-sdk.smartlook.com/recorder.js';h.appendChild(c);
            })(document);
            smartlook('init', 'ce7ff96b3cd23e1268a03d0e3fe60165c7f9de66', { region: 'eu' });
            `}}
        /> */}
         
         {/* Mouse flow */}
        {/* <script 
        type="text/javascript"
        dangerouslySetInnerHTML={{
                              __html:`(
          window._mfq = window._mfq || [];
          (function() {
            var mf = document.createElement("script");
            mf.type = "text/javascript"; mf.defer = true;
            mf.src = "//cdn.mouseflow.com/projects/84ede4e0-65c9-42ed-8763-e2aef53ee3c7.js";
            document.getElementsByTagName("head")[0].appendChild(mf);
          })();
          `}}
          /> */}

          
          {/* hotjar new */}
          <script
              dangerouslySetInnerHTML={{
                  __html:`(function(h,o,t,j,a,r){
            h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
            h._hjSettings={hjid:3368072,hjsv:6};
            a=o.getElementsByTagName('head')[0];
            r=o.createElement('script');r.async=1;
            r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
            a.appendChild(r);
        })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=')
        `,}}
        />

        

        {/* hotjar */}
         {/* <script
          dangerouslySetInnerHTML={{
              __html:`(function(h,o,t,j,a,r){
                  h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
                  h._hjSettings={hjid:2749219,hjsv:6};
                  a=o.getElementsByTagName('head')[0];
                  r=o.createElement('script');r.async=1;
                  r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
                  a.appendChild(r);
              })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=')
            `,}}
            /> */}

        </Head>
       
        <body dir={dir}>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
