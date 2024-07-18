import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from "next/document";
import { i18n } from "next-i18next";

export default class CustomDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    return Document.getInitialProps(ctx);
  }
  render() {
    const { locale } = this.props.__NEXT_DATA__;
    const dir = locale === "ar" || locale === "he" ? "rtl" : "ltr";
    if (process.env.NODE_ENV !== "production") {
      i18n!.reloadResources(locale);
    }

    return (
      
      <Html>
       <Head>
          {/* Global Site Tag (gtag.js) - Google Analytics */}
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
              page_path: window.location.pathname,
            });
          `,
            }}
          />

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
               
                {/* Facebook login SDK */}
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
               
        </Head>
        <body dir={dir}>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
