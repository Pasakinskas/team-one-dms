package sprint1;
import org.apache.commons.lang.RandomStringUtils;
import org.junit.*;
import org.openqa.selenium.Alert;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.Select;
import org.openqa.selenium.support.ui.WebDriverWait;
import java.util.concurrent.TimeUnit;

public class Registration{

    WebDriver narsykle;
    @Before
    public void setUp(){
        //System.setProperty("webdriver.chrome.driver", "/home/acura/Downloads/chromedriver");
        System.setProperty("webdriver.chrome.driver", "C:\\Users\\moksleivis\\Desktop\\chromedriver.exe");
        narsykle =new ChromeDriver();
        narsykle.manage().window().maximize();
        narsykle.manage().deleteAllCookies();
        narsykle.manage().timeouts().implicitlyWait(4, TimeUnit.SECONDS);
        narsykle.manage().timeouts().pageLoadTimeout(4, TimeUnit.SECONDS);
    }
    @Test
    // 2 Vartotojo registracija neįvedant jokių duomenų
    public void registrationWithoutData(){
        narsykle.get("http://localhost:3000/registration");
        waitForElementByClassName(narsykle,4,"name");
        narsykle.findElement(By.className("register")).click();
        // Switch the driver context to the alert
        Alert alertDialog = narsykle.switchTo().alert();
        // Get the alert text
        String alertText = alertDialog.getText();
        // Click the OK button on the alert.
        alertDialog.accept();
        System.out.println(alertText);
        Assert.assertEquals("Visi laukai turi būti užpildyti",alertText);
    }

    @Ignore     //REIKIA DB ir rederictinimo
    // 1 Vartotojo registracija su pilnais duomenimis
    public void registrationWithAllRighDataRandom(){
        narsykle.get("http://localhost:3000/registration");
        waitForElementByClassName(narsykle,4,"name");
        narsykle.findElement(By.name("name")).click();
        narsykle.findElement(By.name("name")).sendKeys("testuotojas");
        narsykle.findElement(By.name("surname")).click();
        narsykle.findElement(By.name("surname")).sendKeys("testuotojas");
        narsykle.findElement(By.name("surname")).click();
        narsykle.findElement(By.name("surname")).sendKeys("testuotojas");
        narsykle.findElement(By.name("email")).click();
        String emailas=("test@"+generateRandomString(4)+".lt");
        System.out.println("Sugeneruotas emailas: "+emailas);
        narsykle.findElement(By.name("email")).sendKeys(emailas);
        Select dropdown = new Select(narsykle.findElement(By.name("position")));
        dropdown.selectByValue("A");
        narsykle.findElement(By.name("password")).click();
        narsykle.findElement(By.name("password")).sendKeys("Test123");
        narsykle.findElement(By.name("passwordrep")).click();
        narsykle.findElement(By.name("passwordrep")).sendKeys("Test123");
        narsykle.findElement(By.className("register")).click();
        waitForElementByClassName(narsykle,5,"login");
        narsykle.findElement(By.className("login"));
        //dar message turi buti veliau dadetas useris prisiregino
    }

    @Ignore  // REIKIA DB USERIO
    // 3 Vartotojo registracija su jau egzistuojančiais elektroninio pašto duomenimis
    // vartotojas test@test.lt jau egzistuoja duomenu bazeje
    public void registrationWithSameUserEmail(){
        narsykle.get("http://localhost:3000/registration");
        waitForElementByClassName(narsykle,10,"name");
        narsykle.findElement(By.name("name")).click();
        narsykle.findElement(By.name("name")).sendKeys("testuotojas");
        narsykle.findElement(By.name("surname")).click();
        narsykle.findElement(By.name("surname")).sendKeys("testuotojas");
        narsykle.findElement(By.name("surname")).click();
        narsykle.findElement(By.name("surname")).sendKeys("testuotojas");
        narsykle.findElement(By.name("email")).click();
        narsykle.findElement(By.name("email")).sendKeys("test@test.lt");
        Select dropdown = new Select(narsykle.findElement(By.name("position")));
        dropdown.selectByValue("A");
        narsykle.findElement(By.name("password")).click();
        narsykle.findElement(By.name("password")).sendKeys("Test123");
        narsykle.findElement(By.name("passwordrep")).click();
        narsykle.findElement(By.name("passwordrep")).sendKeys("Test123");
        narsykle.findElement(By.className("register")).click();
        // Switch the driver context to the alert
        Alert alertDialog = narsykle.switchTo().alert();
        // Get the alert text
        String alertText = alertDialog.getText();
        // Click the OK button on the alert.
        alertDialog.accept();
        System.out.println(alertText);
        Assert.assertEquals("Toks vartotojo elektroninis paštas jau egzistuoja",alertText);

    }

    @Test
    // 4 Vartotojo registracija su netinkamais Vardo Duomenimis
    // vardas 1234567
    public void registrationWithWrongName(){
        narsykle.get("http://localhost:3000/registration");
        waitForElementByClassName(narsykle,10,"name");
        narsykle.findElement(By.name("name")).click();
        narsykle.findElement(By.name("name")).sendKeys("1234567");
        narsykle.findElement(By.name("surname")).click();
        narsykle.findElement(By.name("surname")).sendKeys("testuotojas");
        narsykle.findElement(By.name("surname")).click();
        narsykle.findElement(By.name("surname")).sendKeys("testuotojas");
        narsykle.findElement(By.name("email")).click();
        narsykle.findElement(By.name("email")).sendKeys("test@test.lt");
        Select dropdown = new Select(narsykle.findElement(By.name("position")));
        dropdown.selectByValue("A");
        narsykle.findElement(By.name("password")).click();
        narsykle.findElement(By.name("password")).sendKeys("Test123");
        narsykle.findElement(By.name("passwordrep")).click();
        narsykle.findElement(By.name("passwordrep")).sendKeys("Test123");
        narsykle.findElement(By.className("register")).click();
        // Switch the driver context to the alert
        Alert alertDialog = narsykle.switchTo().alert();
        // Get the alert text
        String alertText = alertDialog.getText();
        // Click the OK button on the alert.
        alertDialog.accept();
        System.out.println(alertText);
        Assert.assertEquals("Galima naudoti tik raides",alertText);
    }


    @Test
    // 5 Vartotojo registracija su netinkamais pavardes Duomenimis
    // pavarde 1234567
    public void registrationWithWrongSurname(){
        narsykle.get("http://localhost:3000/registration");
        waitForElementByClassName(narsykle,10,"name");
        narsykle.findElement(By.name("name")).click();
        narsykle.findElement(By.name("name")).sendKeys("testuotojas");
        narsykle.findElement(By.name("surname")).click();
        narsykle.findElement(By.name("surname")).sendKeys("1234567");
        narsykle.findElement(By.name("surname")).click();
        narsykle.findElement(By.name("surname")).sendKeys("testuotojas");
        narsykle.findElement(By.name("email")).click();
        narsykle.findElement(By.name("email")).sendKeys("test@test.lt");
        Select dropdown = new Select(narsykle.findElement(By.name("position")));
        dropdown.selectByValue("A");
        narsykle.findElement(By.name("password")).click();
        narsykle.findElement(By.name("password")).sendKeys("Test123");
        narsykle.findElement(By.name("passwordrep")).click();
        narsykle.findElement(By.name("passwordrep")).sendKeys("Test123");
        narsykle.findElement(By.className("register")).click();
        // Switch the driver context to the alert
        Alert alertDialog = narsykle.switchTo().alert();
        // Get the alert text
        String alertText = alertDialog.getText();
        // Click the OK button on the alert.
        alertDialog.accept();
        System.out.println(alertText);
        Assert.assertEquals("Galima naudoti tik raides",alertText);
    }

    @Test
    // 6 Vartotojo registracija su netinkamais elektroninio pašto  Duomenimis
    // el pastas be @
    public void registrationWithoutEmailTag(){
        narsykle.get("http://localhost:3000/registration");
        waitForElementByClassName(narsykle,10,"name");
        narsykle.findElement(By.name("name")).click();
        narsykle.findElement(By.name("name")).sendKeys("testuotojas");
        narsykle.findElement(By.name("surname")).click();
        narsykle.findElement(By.name("surname")).sendKeys("testuotojas");
        narsykle.findElement(By.name("surname")).click();
        narsykle.findElement(By.name("surname")).sendKeys("testuotojas");
        narsykle.findElement(By.name("email")).click();
        narsykle.findElement(By.name("email")).sendKeys("test.test.lt");
        Select dropdown = new Select(narsykle.findElement(By.name("position")));
        dropdown.selectByValue("A");
        narsykle.findElement(By.name("password")).click();
        narsykle.findElement(By.name("password")).sendKeys("Test123");
        narsykle.findElement(By.name("passwordrep")).click();
        narsykle.findElement(By.name("passwordrep")).sendKeys("Test123");
        narsykle.findElement(By.className("register")).click();
        waitForElementByXpath(narsykle,3,"//*[@id=\"root\"]/div/div[2]/div/form/div[3]/span");
        WebElement eroroMesage= narsykle.findElement(By.xpath("//*[@id=\"root\"]/div/div[2]/div/form/div[3]/span"));
        String tekstasEroro = eroroMesage.getText();
        System.out.println(tekstasEroro);
    }

    @Test
    // 7 Vartotojo registracija su netinkamais elektroninio pašto  Duomenimis
    // el pastas test@t/`~.est.lt
    public void registrationWithBadEmailDomain(){
        narsykle.get("http://localhost:3000/registration");
        waitForElementByClassName(narsykle,10,"name");
        narsykle.findElement(By.name("name")).click();
        narsykle.findElement(By.name("name")).sendKeys("testuotojas");
        narsykle.findElement(By.name("surname")).click();
        narsykle.findElement(By.name("surname")).sendKeys("testuotojas");
        narsykle.findElement(By.name("surname")).click();
        narsykle.findElement(By.name("surname")).sendKeys("testuotojas");
        narsykle.findElement(By.name("email")).click();
        narsykle.findElement(By.name("email")).sendKeys("test@t/`~.est.lt");
        Select dropdown = new Select(narsykle.findElement(By.name("position")));
        dropdown.selectByValue("A");
        narsykle.findElement(By.name("password")).click();
        narsykle.findElement(By.name("password")).sendKeys("Test123");
        narsykle.findElement(By.name("passwordrep")).click();
        narsykle.findElement(By.name("passwordrep")).sendKeys("Test123");
        narsykle.findElement(By.className("register")).click();
        waitForElementByXpath(narsykle,3,"//*[@id=\"root\"]/div/div[2]/div/form/div[3]/span");
        WebElement eroroMesage= narsykle.findElement(By.xpath("//*[@id=\"root\"]/div/div[2]/div/form/div[3]/span"));
        String tekstasEroro = eroroMesage.getText();
        System.out.println(tekstasEroro);
    }


    @Test
    // 8 Vartotojo registracija su netinkamais elektroninio pašto  Duomenimis
    // el pastas test@test
    public void registrationWithBadEmailNoDomain(){
        narsykle.get("http://localhost:3000/registration");
        waitForElementByClassName(narsykle,10,"name");
        narsykle.findElement(By.name("name")).click();
        narsykle.findElement(By.name("name")).sendKeys("testuotojas");
        narsykle.findElement(By.name("surname")).click();
        narsykle.findElement(By.name("surname")).sendKeys("testuotojas");
        narsykle.findElement(By.name("surname")).click();
        narsykle.findElement(By.name("surname")).sendKeys("testuotojas");
        narsykle.findElement(By.name("email")).click();
        narsykle.findElement(By.name("email")).sendKeys("test@test");
        Select dropdown = new Select(narsykle.findElement(By.name("position")));
        dropdown.selectByValue("A");
        narsykle.findElement(By.name("password")).click();
        narsykle.findElement(By.name("password")).sendKeys("Test123");
        narsykle.findElement(By.name("passwordrep")).click();
        narsykle.findElement(By.name("passwordrep")).sendKeys("Test123");
        narsykle.findElement(By.className("register")).click();
        Alert alertDialog = narsykle.switchTo().alert();
        String alertText = alertDialog.getText();
        alertDialog.accept();
        System.out.println("popup tekstas "+alertText);
        Assert.assertEquals("El. paštą įvedėte neteisingai",alertText);
    }

    @Test
    // 9 Vartotojo registracija su netinkamo ilgio slaptažodžiu
    // slaptazodis Test1
    public void registrationWithBadPasswordLength(){
        narsykle.get("http://localhost:3000/registration");
        waitForElementByClassName(narsykle,10,"name");
        narsykle.findElement(By.name("name")).click();
        narsykle.findElement(By.name("name")).sendKeys("testuotojas");
        narsykle.findElement(By.name("surname")).click();
        narsykle.findElement(By.name("surname")).sendKeys("testuotojas");
        narsykle.findElement(By.name("surname")).click();
        narsykle.findElement(By.name("surname")).sendKeys("testuotojas");
        narsykle.findElement(By.name("email")).click();
        narsykle.findElement(By.name("email")).sendKeys("test@test.lt");
        Select dropdown = new Select(narsykle.findElement(By.name("position")));
        dropdown.selectByValue("A");
        narsykle.findElement(By.name("password")).click();
        narsykle.findElement(By.name("password")).sendKeys("Test1");
        narsykle.findElement(By.name("passwordrep")).click();
        narsykle.findElement(By.name("passwordrep")).sendKeys("Test1");
        narsykle.findElement(By.className("register")).click();
        waitForElementByXpath(narsykle,3,"//*[@id=\"root\"]/div/div[2]/div/form/div[5]/span");
        Alert alertDialog = narsykle.switchTo().alert();
        String alertText = alertDialog.getText();
        alertDialog.accept();
        System.out.println("popup tekstas "+alertText);
        Assert.assertEquals("Slaptažodis neturi būti tuščias / ilgis nuo 7 iki 50",alertText);
    }

    @Test
    // 10 Vartotojo registracija su nevienodais slaptazodziais
    // slaptazodis Test9999 Test99999
    public void registrationWithRepeatedBadPassword(){
        narsykle.get("http://localhost:3000/registration");
        waitForElementByClassName(narsykle,10,"name");
        narsykle.findElement(By.name("name")).click();
        narsykle.findElement(By.name("name")).sendKeys("testuotojas");
        narsykle.findElement(By.name("surname")).click();
        narsykle.findElement(By.name("surname")).sendKeys("testuotojas");
        narsykle.findElement(By.name("surname")).click();
        narsykle.findElement(By.name("surname")).sendKeys("testuotojas");
        narsykle.findElement(By.name("email")).click();
        narsykle.findElement(By.name("email")).sendKeys("test@test.lt");
        Select dropdown = new Select(narsykle.findElement(By.name("position")));
        dropdown.selectByValue("A");
        narsykle.findElement(By.name("password")).click();
        narsykle.findElement(By.name("password")).sendKeys("Test9999");
        narsykle.findElement(By.name("passwordrep")).click();
        narsykle.findElement(By.name("passwordrep")).sendKeys("Test99999");
        narsykle.findElement(By.className("register")).click();

        Alert alertDialog = narsykle.switchTo().alert();
        String alertText = alertDialog.getText();
        alertDialog.accept();
        System.out.println("popup tekstas "+alertText);
        Assert.assertEquals("Slaptažodžiai nesutampa",alertText);
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

    public String generateRandomString(int length){
        boolean useLetters = true;
        boolean useNumbers = false;
        String generatedString = RandomStringUtils.random(length, useLetters, useNumbers);
        return generatedString;
    }
}
