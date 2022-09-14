import { chromium ,firefox, webkit } from 'playwright-webkit';
//import { chromium } from 'playwright-chromium';
//import { firefox } from 'playwright-firefox';
import  bot from './botTelegram.js';


const timerLigas = 12000;
const timerTempoJogos= 9000;

async function callAll() {


 //chromeOptions.excludeSwitches("enable-logging");
//chromeOptions.excludeSwitches("enable-automation");
//chromeOptions.addArguments('--disable-blink-features=AutomationControlled');

// chrome_options.add_experimental_option('excludeSwitches', ['enable-automation'])
// chrome_options.add_experimental_option('excludeSwitches', ['enable-logging'])
// chrome_options.add_experimental_option('useAutomationExtension', False)
// chrome_options.add_argument('--disable-blink-features=AutomationControlled')

    (async () => {

      const browser = await webkit.launch({
      //   headless: true,
        //chromiumSandbox: false,
        chromiumSandbox: true,
        headless: true,
        ignore_https_errors=True,
        args:[
           --webview-enable-modern-cookie-same-site,
        ]
      });  //{headless: false}
      const page = await browser.newPage({
             userAgent: 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.75 Safari/537.36',
             viewport: {
               height:1080,
               width:1920 
             }
       });

        await page.goto('https://www.bet365.com/#/AVR/B146/R^1/');

        await page.waitForLoadState('networkidle');
       // await page.pause()

        //const page = await browser.newContext();

   
        //await page.locator('text=Aceitar').click();
        await page.waitForLoadState('networkidle');
        
        await percorrendoTemposLigas();
        async function percorrendoTemposLigas(){

          // Click text=Euro Cup
          await page.locator('text=Euro Cup').click({delay:101}); 
          await percorrerTempo();
          await page.waitForLoadState('networkidle');
           
  
          // Click text=Campeonato do Mundo
          await page.waitForTimeout(timerLigas)
          await page.locator('text=Campeonato do Mundo').click({delay:101});
          await percorrerTempo()
          await page.waitForLoadState('networkidle');
  
  
          // Click text=Premiership
          await page.waitForTimeout(timerLigas)
          await page.locator('text=Premiership').click({delay:101});
          await percorrerTempo()
          await page.waitForLoadState('networkidle');
  
  
          // Click text=Superliga
          await page.waitForTimeout(timerLigas)
          await page.locator('text=Superliga').click({delay:101});
          await percorrerTempo()
          await page.waitForLoadState('networkidle');
        }


       // await page.pause()
         async function percorrerTempo(){
                const contador =  await page.locator('.vr-EventTimesNavBarButton').count()
                if(contador == undefined || contador == 0){
          
                   await page.waitForLoadState('networkidle');

                }else{
                    try {
                         for (let index = 0; index < contador; index++) {                        
                                                 await page.locator('.vr-EventTimesNavBarButton').nth(index).click({delay:400});
                                                 await page.waitForTimeout(timerTempoJogos)
                                                 await verificarParaTimeMarcarSimNao()
                                                 await page.waitForTimeout(timerTempoJogos)
                                                 //await page.waitForLoadState('networkidle');
                          }
                    } catch (error) {
                        console.log('exceçao-timer')
                        await percorrerTempo()
                    }
                  let liga = await page.locator('.vrl-MeetingsHeaderButton.vrl-MeetingsHeaderButton-selected').textContent()
                  if(liga == 'Superliga'){
                    // recomeçar
                    await percorrendoTemposLigas()
                  }
                }
            return
        }

        async function verificarParaTimeMarcarSimNao(){
                let liga = await page.locator('.vrl-MeetingsHeaderButton.vrl-MeetingsHeaderButton-selected').textContent()
                let time = await page.locator('.vr-EventTimesNavBarButton.vr-EventTimesNavBarButton-selected').textContent()
                let odd = await page.locator('div:nth-child(19) > div.gl-MarketGroup_Wrapper > div > div:nth-child(2) > div:nth-child(4)').textContent()
                 let msgBot = '⚽ '+' ' + liga +'  ' +time + ' => '+ odd + ' ✅'
                await bot.botStrategy(msgBot)
            
            return 

        }   


      await  percorrendoTemposLigas()
      await browser.close();

    })();

}

export default { callAll }
