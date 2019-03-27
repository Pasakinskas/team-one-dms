package sprint1;

import org.junit.*;
import org.openqa.selenium.Alert;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import java.util.concurrent.TimeUnit;

public class Login {

    WebDriver narsykle; //

    @Before
    public void setUp(){
        //System.setProperty("webdriver.chrome.driver", "/home/acura/Downloads/chromedriver");
        System.setProperty("webdriver.chrome.driver", "C:\\Users\\moksleivis\\Desktop\\chromedriver.exe");
        narsykle =new ChromeDriver();
        narsykle.manage().window().maximize();
        narsykle.manage().deleteAllCookies();
        narsykle.manage().timeouts().implicitlyWait(8, TimeUnit.SECONDS);
        narsykle.manage().timeouts().pageLoadTimeout(15, TimeUnit.SECONDS);
    }

    @Test
    // 1 Vartotojo prisijungimas nieko neįvedant į tuščius formos laukus
    public void loginWithoutData(){
        narsykle.get("http://localhost:3000/login");
        waitForElementByClassName(narsykle,10,"email");
        narsykle.findElement(By.xpath("//*[@id=\"root\"]/div/div[2]/div/form/div[3]/button")).click();
        // Switch the driver context to the alert
        Alert alertDialog = narsykle.switchTo().alert();
        // Get the alert text
        String alertText = alertDialog.getText();
        // Click the OK button on the alert.
        alertDialog.accept();
        System.out.println(alertText);
        Assert.assertEquals("Visi laukai turi būti užpildyti",alertText);

    }

    @Ignore  //REIKIA DB userio iregistruoto
    // 2 Vartotojo prisijungimas įvedant visus teisingus prisijungimo duomenis
    //vartotojas: test@test.lt slaptažodis: Test123
       public void loginWithAllData(){
        narsykle.get("http://localhost:3000/login");
        waitForElementByClassName(narsykle,10,"email");
        narsykle.findElement(By.name("email")).click();
        narsykle.findElement(By.name("email")).sendKeys("test@test.lt");
        narsykle.findElement(By.name("password")).click();
        narsykle.findElement(By.name("password")).sendKeys("Test123");
        narsykle.findElement(By.xpath("//*[@id=\"root\"]/div/div[2]/div/form/div[3]/button")).click();
        // reikia prisijungimo paneles tagu !
    }

    @Ignore //REIKIA DB userio iregistruoto
    // 3 Vartotojo prisijungimas įvedant teisingą el. paštą ir neteisingą slaptažodį
    //varotojas: test@test.lt slaptazodis 1234567no
    public void loginWithWrongPasswd(){
        narsykle.get("http://localhost:3000/login");
        waitForElementByClassName(narsykle,10,"email");
        narsykle.findElement(By.name("email")).click();
        narsykle.findElement(By.name("email")).sendKeys("test@test.lt");
        narsykle.findElement(By.name("password")).click();
        narsykle.findElement(By.name("password")).sendKeys("1234567no");
        narsykle.findElement(By.xpath("//*[@id=\"root\"]/div/div[2]/div/form/div[3]/button")).click();
        // Switch the driver context to the alert
        Alert alertDialog = narsykle.switchTo().alert();
        // Get the alert text
        String alertText = alertDialog.getText();
        // Click the OK button on the alert.
        alertDialog.accept();
        System.out.println(alertText);
        Assert.assertEquals("Vartotojo vardas arba slaptažodis neteisingas",alertText);
    }

    @Ignore //REIKIA DB userio iregistruoto
    // 4 Vartotojo prisijungimas įvedant neteisingą el. paštą ir teisingą slaptažodį
    //varotojas:  testno@test.lt slaptazodis Test123
    public void loginWithWrongUsername(){
        narsykle.get("http://localhost:3000/login");
        waitForElementByClassName(narsykle,10,"email");
        narsykle.findElement(By.name("email")).click();
        narsykle.findElement(By.name("email")).sendKeys("testno@test.lt");
        narsykle.findElement(By.name("password")).click();
        narsykle.findElement(By.name("password")).sendKeys("Test123");
        narsykle.findElement(By.xpath("//*[@id=\"root\"]/div/div[2]/div/form/div[3]/button")).click();
        // Switch the driver context to the alert
        Alert alertDialog = narsykle.switchTo().alert();
        // Get the alert text
        String alertText = alertDialog.getText();
        // Click the OK button on the alert.
        alertDialog.accept();
        System.out.println(alertText);
        Assert.assertEquals("Vartotojo vardas arba slaptažodis neteisingas",alertText);
    }



    @After
    public void exitNarsykle(){
       narsykle.quit();
    }


    static private void waitForElementById (WebDriver narsykle, int timeOutInSec, String id){
        WebDriverWait waitas=new WebDriverWait(narsykle,timeOutInSec);
        waitas.until(ExpectedConditions.elementToBeClickable(By.id(id)));
    }

    static private void waitForElementByClassName (WebDriver narsykle, int timeOutInSec, String className){
        WebDriverWait waitas=new WebDriverWait(narsykle,timeOutInSec);
        waitas.until(ExpectedConditions.elementToBeClickable(By.className(className)));
    }

    static private void waitForElementByName (WebDriver narsykle, int timeOutInSec, String Name){
        WebDriverWait waitas=new WebDriverWait(narsykle,timeOutInSec);
        waitas.until(ExpectedConditions.elementToBeClickable(By.name(Name)));
    }

    static private void waitForElementByXpath (WebDriver narsykle, int timeOutInSec, String Xpath){
        WebDriverWait waitas=new WebDriverWait(narsykle,timeOutInSec);
        waitas.until(ExpectedConditions.elementToBeClickable(By.xpath(Xpath)));
    }
    static private void waitForElementByCssSelector (WebDriver narsykle, int timeOutInSec, String CSSSelector){
        WebDriverWait waitas=new WebDriverWait(narsykle,timeOutInSec);
        waitas.until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector(CSSSelector)));
    }
}
